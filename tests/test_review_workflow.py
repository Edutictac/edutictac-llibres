"""Real HTTP sessions, classroom ACL, editor and review iframe; temporary data."""
import importlib.util
import json
import socket
import sys
import threading
import time
from pathlib import Path
from types import SimpleNamespace
from urllib.parse import urlsplit

import pytest
from PIL import Image
from playwright.sync_api import expect
StaticFiles = pytest.importorskip("starlette.staticfiles").StaticFiles

from test_workshop import browser, idle
from test_publication import bank, ROOT


@pytest.fixture
def school(bank,tmp_path,monkeypatch):
    import uvicorn
    bank_module, bank_client=bank
    core=ROOT/'edutictac-commons/services/id-api'
    monkeypatch.syspath_prepend(str(core));monkeypatch.syspath_prepend(str(core/'vendor'))
    for key,value in {'EDUTICTAC_ID_DB':str(tmp_path/'school.db'),'EDUTICTAC_ID_SECRET':'synthetic-school-session',
          'EDUTICTAC_ID_APP_TOKEN':'synthetic-book-app-token','EDUTICTAC_ID_COOKIE_SECURE':'0',
          'EDUTICTAC_ID_OIDC_ISSUER_URL':'https://synthetic.identity/application/o/commons'}.items():monkeypatch.setenv(key,value)
    spec=importlib.util.spec_from_file_location('school_review_api',core/'main.py')
    school=importlib.util.module_from_spec(spec);monkeypatch.setitem(sys.modules,spec.name,school);spec.loader.exec_module(school)
    from fastapi import Response
    response=Response();school.set_oidc_cookie(response,{'iss':school.OIDC_ISSUER_URL,'sub':'synthetic-class-teacher'},'profesor')
    cookie=response.headers['set-cookie'].split(';')[0];name,value=cookie.split('=',1)
    # The teacher ID is the same opaque identifier used by Commons classroom ownership.
    import hmac,hashlib
    teacher_id='oidc:'+hmac.new(school.SESSION_SECRET.encode(),f'{school.OIDC_ISSUER_URL}:synthetic-class-teacher'.encode(),hashlib.sha256).hexdigest()[:20]
    with school.get_conn() as db:
        db.execute("INSERT INTO groups (id,name,created_by_teacher_id,created_at,updated_at) VALUES ('class-one','Aula de prova',?,'2026','2026')",(teacher_id,))
        db.execute("INSERT INTO student_identities (id,group_id,public_code,pin_hash,created_at,updated_at) VALUES ('pupil-one','class-one','ABC',?,'2026','2026')",(school.hash_pin('1234'),))
    import books as boundary
    class BankConnection:
        def __init__(self,**kwargs):pass
        async def __aenter__(self):return self
        async def __aexit__(self,*args):pass
        async def request(self,method,url,**kwargs):
            path=urlsplit(url)
            response=bank_client.request(method,path.path+('?' + path.query if path.query else ''),headers=kwargs.get('headers'),content=kwargs.get('content'))
            return SimpleNamespace(status_code=response.status_code,headers=response.headers,content=response.content)
    monkeypatch.setattr(boundary.httpx,'AsyncClient',BankConnection)
    @school.app.get('/publication-status')
    def status():return {'enabled':True}
    @school.app.get('/rebost-status')
    def no_rebost():return {'enabled':False}
    root=Path(__file__).resolve().parents[1]
    school.app.mount('/engine',StaticFiles(directory=root/'vendor/exelearning/static'))
    school.app.mount('/',StaticFiles(directory=root/'public',html=True))
    listener=socket.socket();listener.bind(('127.0.0.1',0));listener.listen(128)
    address='http://127.0.0.1:'+str(listener.getsockname()[1])
    server=uvicorn.Server(uvicorn.Config(school.app,log_level='error'))
    thread=threading.Thread(target=server.run,kwargs={'sockets':[listener]},daemon=True);thread.start()
    for _ in range(100):
        if server.started:break
        time.sleep(.03)
    assert server.started
    yield address,{'name':name,'value':value,'url':address,'httpOnly':True,'sameSite':'Lax'},bank_client,school
    server.should_exit=True;thread.join(timeout=8);listener.close()


@pytest.mark.parametrize('language',['es','va'])
def test_pupil_submission_teacher_return_approval_and_private_images(browser,school,tmp_path,language):
    address,teacher_cookie,bank_client,api=school
    pupil=browser.new_context(viewport={'width':1440,'height':900})
    login=pupil.request.post(address+'/api/auth/student',data={'public_code':'ABC','pin':'1234'},headers={'Origin':address})
    assert login.status==200
    page=pupil.new_page();page.goto(address);page.select_option('#language',language)
    page.click('#new-book');page.fill('#title','La història de la classe');page.click('#create-form button[type=submit]');idle(page)
    image=tmp_path/'drawing.png';Image.new('RGBA',(96,64),(255,100,0,255)).save(image)
    page.set_input_files('#image-input',str(image));idle(page)
    page.click('#publish-book');idle(page)
    expect(page.locator('#submission-intro')).to_be_visible()
    expect(page.locator('#confirm-publish')).to_have_text('Enviar a mi docente' if language=='es' else 'Envia al meu docent')
    page.fill('#publish-author','Aula de prova');page.check('#publish-confirm');page.click('#confirm-publish');idle(page)
    expect(page.locator('#submission-heading')).to_contain_text('enviado' if language=='es' else 'enviat')
    expect(page.locator('#publication-current')).to_be_hidden()
    assert bank_client.get('/api/llibres/books').json()['items']==[]
    # A pupil cannot inspect the private review queue or approve its own work.
    assert pupil.request.get(address+'/api/llibres/reviews').status==401
    teacher=browser.new_context(viewport={'width':1440,'height':1000});teacher.add_cookies([teacher_cookie])
    review=teacher.new_page();image_responses=[]
    review.on('response',lambda response:image_responses.append(response.status) if '/files/images/' in response.url else None)
    review.goto(address);review.select_option('#language',language);review.click('#open-reviews');idle(review)
    expect(review.locator('#reviews-list .review-open')).to_have_count(1)
    review.locator('.review-open').click()
    frame=review.frame_locator('#review-frame');expect(frame.locator('#page-1')).to_be_visible()
    expect(frame.locator('image')).to_have_count(1)
    if language=='va':
        (Path(__file__).resolve().parents[1]/'artifacts').mkdir(exist_ok=True)
        review.screenshot(path=str(Path(__file__).resolve().parents[1]/'artifacts/review-teacher-preview-va.png'))
    review.wait_for_function("document.getElementById('review-frame').contentDocument?.querySelector('image') !== null")
    assert 200 in image_responses, 'Private image must load using the real HTTP teacher session'
    expect(review.locator('#approve-review')).to_be_disabled()
    review.fill('#review-comment','Revisa el títol.');review.click('#return-review');idle(review)
    expect(review.locator('#review-dialog')).to_be_hidden()
    expect(review.locator('#reviews-list .review-open')).to_have_count(0)
    page.click('#refresh-submission');idle(page)
    expect(page.locator('#submission-feedback')).to_have_text('Revisa el títol.')
    page.check('#publish-confirm');page.click('#confirm-publish');idle(page)
    review.click('#refresh-reviews');idle(review);review.locator('.review-open').click()
    expect(review.frame_locator('#review-frame').locator('#page-1')).to_be_visible()
    review.check('#review-confirm');review.click('#approve-review');idle(review)
    expect(review.locator('#reviews-status')).to_contain_text('aprobado' if language=='es' else 'aprovat')
    items=bank_client.get('/api/llibres/books').json()['items'];assert len(items)==1
    key=items[0]['external_id']
    page.click('#refresh-submission');idle(page)
    expect(page.locator('#publication-current')).to_be_visible()
    expect(page.locator('#submission-heading')).to_contain_text('aprobada' if language=='es' else 'aprovada')
    # Submitting changes leaves the previously approved public version intact.
    page.click('#close-publish');idle(page);page.fill('#book-title','Una nova versió');page.locator('#book-title').dispatch_event('change')
    page.click('#publish-book');idle(page);page.check('#publish-confirm');page.click('#confirm-publish');idle(page)
    assert bank_client.get('/api/llibres/books').json()['items'][0]['title']=='La història de la classe'
    expect(page.locator('#submission-message')).to_contain_text('anterior')
    page.once('dialog',lambda dialog:dialog.accept());page.click('#cancel-submission');idle(page)
    assert bank_client.get('/api/llibres/books').json()['items'][0]['external_id']==key
    # The responsible teacher can withdraw an already approved public version.
    review.check('#reviews-all');idle(review);review.locator('.review-open').click()
    review.once('dialog',lambda dialog:dialog.accept());review.click('#withdraw-review');idle(review)
    assert bank_client.get('/api/llibres/books').json()['items']==[]
    assert bank_client.get('/api/llibres/public/'+key+'/index.html').status_code==404
    if language=='va':
        page.click('#refresh-submission');idle(page)
        (Path(__file__).resolve().parents[1]/'artifacts').mkdir(exist_ok=True)
        page.screenshot(path=str(Path(__file__).resolve().parents[1]/'artifacts/review-pupil-va.png'))
        review.screenshot(path=str(Path(__file__).resolve().parents[1]/'artifacts/review-teacher-va.png'))
    pupil.close();teacher.close()
