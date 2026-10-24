"""Real browser + real resources API, temporary DB and synthetic identities only."""
import importlib
import importlib.util
import json
import mimetypes
from pathlib import Path
from urllib.parse import urlsplit

import pytest
TestClient = pytest.importorskip("fastapi.testclient").TestClient
from playwright.sync_api import expect

from test_workshop import BASE, browser, create, idle
from test_rebost import fixture_api, choose

ROOT=Path(__file__).resolve().parents[2]


@pytest.fixture
def bank(tmp_path,monkeypatch):
    api=ROOT/'recursos-api'
    if not api.exists():pytest.skip('Sibling recursos-api repository is needed for publication integration tests')
    # Use recursos-api requirements; the older Commons vendored package lacks
    # the current bank router contract (admin_unhide_path).
    monkeypatch.syspath_prepend(str(api))
    pytest.importorskip('edutictac_community')
    pytest.importorskip('authlib')
    for k,v in {'RECURSOS_DB':str(tmp_path/'bank.db'),'RECURSOS_SECRET':'synthetic-book-session',
                'RECURSOS_COOKIE_SECURE':'0','EDUTICTAC_ID_APP_TOKEN':'synthetic-book-app-token',
                'LLIBRES_PUBLIC_BASE_URL':'http://bank.test'}.items():monkeypatch.setenv(k,v)
    import app.config,app.db
    importlib.reload(app.config);importlib.reload(app.db)
    spec=importlib.util.spec_from_file_location('publication_test_bank',api/'main.py')
    module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
    with module.get_conn() as db:db.execute('DELETE FROM submissions')
    client=TestClient(module.app)
    client.headers.update({'Authorization':'Bearer synthetic-book-app-token','X-Llibres-Publisher':'synthetic-book-teacher'})
    yield module,client
    client.close()


def routes(context,bank,can_publish=True):
    module,client=bank
    requests=[]
    def serve(route):
        request=route.request;url=urlsplit(request.url);path=url.path
        if path=='/publication-status':return route.fulfill(json={'enabled':True})
        if path=='/api/llibres/me':return route.fulfill(json={'can_publish':can_publish() if callable(can_publish) else can_publish})
        if path.startswith('/api/llibres/') or (url.hostname=='bank.test' and path.startswith('/api/')):
            if path=='/api/resources' and 'provider=eduhoot' in url.query:return route.fulfill(json={'items':[]})
            if path.startswith('/api/llibres/mine/'):
                path=path.replace('/api/llibres/mine/','/api/internal/llibres/')
            headers={k:v for k,v in request.headers.items() if k in ('if-match','content-type')}
            response=client.request(request.method,path+('?' + url.query if url.query else ''),content=request.post_data_buffer,headers=headers)
            requests.append((request.method,path,response.status_code))
            clean={k:v for k,v in response.headers.items() if k not in ('content-length','set-cookie','transfer-encoding','content-encoding')}
            return route.fulfill(status=response.status_code,headers=clean,body=response.content)
        if url.hostname=='bank.test':
            if path in ('/data/games.json','/data/games-home.json'):return route.fulfill(json=[])
            if path.startswith('/reports/'):return route.fulfill(json={})
            bank_root=(ROOT/'recursos').resolve()
            file=(bank_root/path.lstrip('/')).resolve()
            if path=='/':file=bank_root/'index.html'
            if file.is_relative_to(bank_root) and file.is_file() and file.suffix in ('.js','.css','.html','.json','.png','.svg','.ico'):
                return route.fulfill(body=file.read_bytes(),content_type=mimetypes.guess_type(file)[0] or 'application/octet-stream')
            return route.fulfill(status=404)
        route.fallback()
    context.route('**/*',serve)
    return requests


def test_escape_during_publication_loading_restores_editor(browser, bank):
    context = browser.new_context(viewport={'width':1440,'height':1000})
    routes(context, bank)
    page = context.new_page(); create(page)
    held = []
    # Pause after the editor has saved/prepared its cover, while the private
    # publication state is loading. Escape must restore the canvas afterwards.
    context.route('**/api/llibres/mine/*', lambda route: held.append(route))
    with page.expect_request('**/api/llibres/mine/*'): page.click('#publish-book')
    expect(page.locator('#publish-dialog')).to_be_visible()
    page.keyboard.press('Escape')
    expect(page.locator('#publish-dialog')).to_be_hidden()
    held.pop().fulfill(json={'published':False,'revision':0})
    idle(page)
    expect(page.locator('#publish-form')).to_be_hidden()
    page.click('#draw'); idle(page)
    frame = page.locator('#engine-host iframe').element_handle().content_frame()
    assert frame.evaluate('__slideEditorCanvas.isDrawingMode')
    page.click('#select'); idle(page)
    page.fill('#book-title', 'El taller continua')
    page.locator('#book-title').dispatch_event('change')
    page.click('#back'); idle(page)
    expect(page.locator('#books .book-open')).to_have_text('El taller continua')
    context.close()


@pytest.mark.parametrize('lang',['es','va','ca','en'])
def test_publish_read_update_bank_and_shared_withdraw_without_losing_draft(browser,bank,lang):
    module,client=bank
    context=browser.new_context(viewport={'width':1440,'height':720},accept_downloads=True)
    requests=routes(context,bank)
    fixture_api(context, author="Synthetic test author · See http://scratch.mit.edu")
    page=context.new_page();create(page,lang)
    page.click('#add-image');choose(page)
    page.click('#publish-book');idle(page)
    expect(page.locator('#publish-form')).to_be_visible()
    expect(page.locator('#publish-editable')).not_to_be_checked()
    page.fill('#publish-author','Aula de prova')
    page.fill('#publish-description','La història compartida de la classe.')
    page.check('#publish-confirm');page.click('#confirm-publish');idle(page)
    expect(page.locator('#publication-current')).to_be_visible()
    expect(page.locator('#publication-success-title')).to_be_in_viewport()
    expect(page.locator('#publication-success-title')).to_be_focused()
    expect(page.locator('#copy-publication')).to_be_in_viewport()
    if lang == 'va':
        (Path(__file__).resolve().parents[1]/'artifacts').mkdir(exist_ok=True)
        page.screenshot(path=str(Path(__file__).resolve().parents[1]/'artifacts/publication-va.png'))
    url=page.locator('#publication-link').get_attribute('href')
    key=url.split('/')[-2]
    assert len(client.get('/api/llibres/books').json()['items'])==1
    assert client.get('/api/llibres/public/'+key+'/source.elpx').status_code==404
    # Updating reuses the publication and can explicitly offer its editable.
    page.check('#publish-editable');page.check('#publish-confirm');page.click('#confirm-publish');idle(page)
    expect(page.locator('#publication-current')).to_be_visible()
    expect(page.locator('#publication-success-title')).to_have_text(
        {'es':'Publicación actualizada en el banco de recursos.', 'va':'Publicació actualitzada en el banc de recursos.', 'ca':'Publicació actualitzada en el banc de recursos.', 'en':'Publication updated in the resource bank.'}[lang])
    expect(page.locator('#publication-success-title')).to_be_in_viewport()
    assert page.locator('#publication-link').get_attribute('href')==url
    assert client.get('/api/llibres/public/'+key+'/source.elpx').status_code==200
    assert len(client.get('/api/llibres/books').json()['items'])==1
    # The bank's exact editable must reopen in a fresh browser, including the
    # final credits slide whose attribution contains an ordinary website URL.
    other = browser.new_context(viewport={'width':1440,'height':1000})
    imported = other.new_page(); imported.goto(BASE)
    source = client.get('/api/llibres/public/'+key+'/source.elpx').content
    imported.set_input_files('#file-input', {'name':'llibre.elpx',
        'mimeType':'application/octet-stream', 'buffer':source})
    idle(imported)
    expect(imported.locator('.page-tab')).to_have_count(4)
    imported.click('#read'); idle(imported)
    expect(imported.locator('#reader-page svg image')).to_have_count(1)
    other.close()
    page.click('#close-publish');idle(page)
    page.click('#back');idle(page)
    expect(page.locator('.book-open:visible')).to_have_count(1)
    page.click('#open-shared');idle(page)
    expect(page.locator('#shared-books .book-open')).to_have_count(1)
    page.locator('#shared-books .book-open').click()
    reader=page.frame_locator('#published-frame')
    expect(reader.locator('#page-1')).to_be_visible()
    expect(reader.locator('html')).to_have_attribute('lang', 'ca-valencia' if lang == 'va' else lang)
    source_link = reader.locator('a[href="../../source.zip"]')
    expect(source_link).to_be_hidden()
    reader.locator('footer > details').last.locator('summary').click()
    expect(source_link).to_be_visible()
    reader.locator('footer > details').last.locator('summary').click()
    for _ in range(3):reader.locator('.page:visible nav a').last.click()
    expect(reader.locator('.page:visible')).to_contain_text('Synthetic test author')
    assert any('/images/' in path and status==200 for _,path,status in requests)
    page.click('#close-published-reader');page.click('#close-shared')
    # The real bank frontend shows the same single publication with its embedded reader.
    catalogue=context.new_page();catalogue.goto('http://bank.test/')
    expect(catalogue.locator('#grid article')).to_have_count(1,timeout=15000)
    catalogue.locator('#grid .card-image-link').click()
    expect(catalogue.locator('#iframeDialog')).to_be_visible()
    expect(catalogue.locator('#iframeContainer iframe')).to_have_attribute('sandbox','allow-downloads')
    expect(catalogue.frame_locator('#iframeContainer iframe').locator('#page-1')).to_be_visible()
    # Withdrawal removes files and both catalogue views; local draft stays editable.
    page.locator('.book-open:visible').click();idle(page);page.click('#publish-book');idle(page)
    page.once('dialog',lambda dialog:dialog.accept())
    page.click('#withdraw-publication');idle(page)
    expect(page.locator('#publication-current')).to_be_hidden()
    assert client.get('/api/llibres/books').json()['items']==[]
    assert client.get('/api/llibres/public/'+key+'/index.html').status_code==404
    catalogue.reload();expect(catalogue.locator('#grid article')).to_have_count(0)
    page.click('#close-publish');idle(page);page.click('#back');idle(page)
    expect(page.locator('.book-open:visible')).to_have_count(1)
    page.click('#open-shared');idle(page)
    expect(page.locator('#shared-books .book-open')).to_have_count(0)
    context.close()


def test_publishing_needs_teacher_but_shared_books_do_not_need_login(browser,bank):
    context=browser.new_context(viewport={'width':1440,'height':1000})
    requests=routes(context,bank,can_publish=False)
    page=context.new_page();create(page)
    page.click('#publish-book');idle(page)
    expect(page.locator('#publication-login')).to_be_visible()
    expect(page.locator('#publish-form')).to_be_hidden()
    assert not any(method=='POST' for method,_,_ in requests)
    page.click('#close-publish');idle(page);page.click('#back');idle(page)
    page.click('#open-shared');idle(page)
    expect(page.locator('#shared-dialog')).to_be_visible()
    expect(page.locator('#publication-login')).to_be_hidden()
    context.close()


@pytest.mark.parametrize('lang', ['es', 'va'])
def test_login_returns_to_llibres_and_refreshes_publication_without_opening_rebost(browser, bank, lang):
    context = browser.new_context(viewport={'width':1440,'height':1000})
    permission = {'ready': False}
    requests = routes(context, bank, can_publish=lambda: permission['ready'])
    portal = ROOT / 'edutictac-commons/services/portal/public'
    def identity_login(route):
        from urllib.parse import parse_qs
        destination = parse_qs(urlsplit(route.request.url).query)['next'][0]
        assert destination == '/llibres-login.html?lang=' + lang
        permission['ready'] = True
        route.fulfill(status=302, headers={'Location':'http://commons.test'+destination})
    context.route('**/api/auth/oidc/login?*', identity_login)
    context.route('http://commons.test/llibres-login.html?*', lambda route: route.fulfill(
        body=(portal/'llibres-login.html').read_bytes(), content_type='text/html'))
    context.route('http://commons.test/llibres-login.js', lambda route: route.fulfill(
        body=(portal/'llibres-login.js').read_bytes(), content_type='application/javascript'))
    context.route('http://commons.test/styles.css', lambda route: route.fulfill(body='', content_type='text/css'))
    # The completion page now loads the shared account chip and synchronous
    # theme bootstrap. Keep its synthetic origin entirely inside this fixture.
    def portal_asset(route):
        root = portal.resolve()
        file = (root / urlsplit(route.request.url).path.lstrip('/')).resolve()
        if file.is_relative_to(root) and file.is_file():
            return route.fulfill(body=file.read_bytes(),
                content_type=mimetypes.guess_type(file)[0] or 'application/octet-stream')
        return route.fulfill(status=404)
    context.route('http://commons.test/assets/**', portal_asset)
    context.route('http://commons.test/api/auth/session?*', lambda route: route.fulfill(json={
        'authenticated': permission['ready'], 'kind': 'oidc' if permission['ready'] else 'anonymous',
        'role': 'profesor' if permission['ready'] else None, 'display_name': 'Docent de prova',
        'login_available': True, 'links': {'teacher': '/teacher.html', 'student': '/student.html',
            'logout': '/api/auth/session/logout', 'account': None}}))
    page = context.new_page(); create(page, lang)
    page.click('#publish-book'); idle(page)
    expect(page.locator('#publication-login')).to_be_visible()
    with page.expect_popup() as opened:
        page.click('#publication-sign-in')
    completion = opened.value
    expect(completion.locator('#login-title')).to_have_text(
        'Ja pots publicar el teu llibre' if lang == 'va' else 'Ya puedes publicar tu libro')
    assert urlsplit(completion.url).path == '/llibres-login.html'
    with completion.expect_event('close'):
        completion.click('#login-close')
    page.bring_to_front()
    page.evaluate("window.dispatchEvent(new Event('focus'))")
    expect(page.locator('#publish-form')).to_be_visible(timeout=30000); idle(page)
    expect(page.locator('#publication-login')).to_be_hidden()
    assert not any(method == 'POST' for method, _, _ in requests)
    context.close()
