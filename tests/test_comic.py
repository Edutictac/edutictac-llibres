"""Comic scenes use the real Slides editor and retain normal book portability."""
import json
import zipfile
from pathlib import Path
import pytest
from playwright.sync_api import expect
from test_workshop import BASE, browser, idle, payloads
from test_publication import bank, routes
from test_rebost import fixture_api, choose


def create_comic(page, layout=2):
    page.goto(BASE+'/?lang=va');page.click('#new-book')
    page.fill('#title','La granota i la idea brillant')
    page.check('input[value=comic]');page.select_option('#comic-layout',str(layout))
    page.click('#create-form button[type=submit]');idle(page)
    expect(page.locator('.page-tab')).to_have_count(2)
    page.locator('.page-tab').nth(1).click();idle(page)
    return page.locator('#engine-host iframe').element_handle().content_frame()


def add_bubble(page, text, kind='speech'):
    page.click('#add-bubble');page.select_option('#bubble-kind',kind)
    page.fill('#bubble-text',text);page.click('#save-bubble');idle(page)


@pytest.mark.parametrize('layout',[2,3,4])
def test_layout_frames_stay_protected_and_new_pages_remember_mode(browser,layout):
    context=browser.new_context(viewport={'width':1500,'height':1100})
    page=context.new_page();frame=create_comic(page,layout)
    frames=frame.evaluate('''() => __slideEditorCanvas.getObjects().filter(o=>o.slideMeta?.comicPanel).map(o=>({left:o.left,top:o.top,selectable:o.selectable,evented:o.evented}))''')
    assert len(frames)==layout and all(not p['selectable'] and not p['evented'] for p in frames)
    assert all(p['left']>=60 and p['top']>=130 for p in frames)
    page.select_option('#new-comic-layout','3' if layout!=3 else '4')
    page.click('#add-page');idle(page)
    assert frame.evaluate('''() => __slideEditorCanvas.getObjects().filter(o=>o.slideMeta?.comicPanel).length''')==(3 if layout!=3 else 4)
    page.click('#back');idle(page);page.locator('#books .book-open').click();idle(page)
    expect(page.locator('#new-comic-layout')).to_be_visible()
    page.locator('.page-tab').nth(1).click();idle(page)
    assert frame.is_detached()
    frame=page.locator('#engine-host iframe').element_handle().content_frame()
    assert frame.evaluate('''() => __slideEditorCanvas.getObjects().filter(o=>o.slideMeta?.comicPanel).every(o=>!o.selectable&&!o.evented)''')
    context.close()


def test_oversized_bubble_keeps_original_text_and_editable_draft(browser):
    context=browser.new_context(viewport={'width':1500,'height':1100})
    page=context.new_page();frame=create_comic(page,4)
    add_bubble(page,'Bon dia!')
    page.click('#edit-bubble');page.fill('#bubble-text','W'*300)
    page.click('#save-bubble');page.wait_for_function('document.getElementById("busy").hidden',timeout=90000)
    expect(page.locator('#bubble-dialog')).to_be_visible()
    expect(page.locator('#bubble-text')).to_have_value('W'*300)
    assert frame.evaluate("__slideEditorCanvas.getObjects().find(o=>o.slideMeta?.comicBubble).slideMeta.comicBubble.text")=='Bon dia!'
    page.fill('#bubble-text','Bon dia, món!');page.click('#save-bubble');idle(page)
    context.close()


def test_comic_rebost_credits_publish_through_existing_bank(browser,bank):
    module,client=bank
    context=browser.new_context(viewport={'width':1500,'height':1100})
    requests=routes(context,bank);fixture_api(context)
    page=context.new_page();create_comic(page)
    add_bubble(page,'El Rebost ens ajuda a fer còmics.')
    page.click('#add-image');choose(page)
    expect(page.locator('.page-tab').last).to_contain_text('Crèdits')
    page.click('#publish-book');idle(page)
    page.fill('#publish-author','Aula de prova');page.check('#publish-confirm')
    page.check('#publish-editable');page.click('#confirm-publish');idle(page)
    assert any(method=='POST' and status==200 for method,_,status in requests)
    books=client.get('/api/llibres/books').json()['items'];assert len(books)==1
    assert client.get('/api/llibres/public/'+books[0]['external_id']+'/index.html').status_code==200
    context.close()


def test_comic_export_html_and_epub(browser,tmp_path):
    context=browser.new_context(viewport={'width':1500,'height':1100},accept_downloads=True)
    page=context.new_page();create_comic(page)
    add_bubble(page,'Un còmic portable.')
    page.click('#read');idle(page)
    for button,extension in [('#export-html','.zip'),('#export-epub','.epub')]:
        with page.expect_download(timeout=90000) as pending:page.click(button)
        target=tmp_path/('comic'+extension);pending.value.save_as(target);idle(page)
        with zipfile.ZipFile(target) as package:
            html=[name for name in package.namelist() if name.endswith(('.html','.xhtml','.htm'))]
            assert html and any(b'portable' in package.read(name) for name in html)
            if extension=='.epub':assert package.read('mimetype')==b'application/epub+zip'
    context.close()


def test_bubbles_move_with_text_edit_download_and_reimport(browser,tmp_path):
    context=browser.new_context(viewport={'width':1500,'height':1100},accept_downloads=True)
    page=context.new_page();frame=create_comic(page)
    for kind,text in [('speech','Hola, granota!'),('thought','Tinc una idea.'),('narration','Un matí al bosc…')]:
        page.select_option('#comic-panel',index=1);add_bubble(page,text,kind)
    before=frame.evaluate('''() => {
      const c=__slideEditorCanvas,o=c.getObjects().find(o=>o.slideMeta?.comicBubble?.kind==='speech');
      o.set({left:o.left+45,top:o.top+65});o.setCoords();c.setActiveObject(o);
      c.fire('object:modified',{target:o});c.requestRenderAll();
      return {left:o.left,top:o.top,id:o.slideMeta.comicBubble.id,children:o.getObjects().length};
    }''')
    assert before['left']>600 and before['children']>=3
    expect(page.locator('#edit-bubble')).to_be_enabled();page.click('#edit-bubble')
    expect(page.locator('#bubble-text')).to_have_value('Hola, granota!')
    page.fill('#bubble-text','<Hola> & bon dia!');page.click('#save-bubble');idle(page)
    after=frame.evaluate('''() => {const o=__slideEditorCanvas.getObjects().find(o=>o.slideMeta?.comicBubble?.kind==='speech');return {left:o.left,top:o.top,id:o.slideMeta.comicBubble.id};}''')
    assert all(after[k]==before[k] for k in ['left','top','id'])
    frame.get_by_role('button',name='Desfés',exact=True).click()
    frame.wait_for_function("__slideEditorCanvas.getObjects().some(o=>o.slideMeta?.comicBubble?.text==='Hola, granota!')")
    frame.get_by_role('button',name='Refés',exact=True).click()
    frame.wait_for_function("__slideEditorCanvas.getObjects().some(o=>o.slideMeta?.comicBubble?.text==='<Hola> & bon dia!')")
    with page.expect_download() as pending:page.click('#download')
    source=tmp_path/'comic.elpx';pending.value.save_as(source);idle(page)
    scenes,_,_=payloads(source)
    bubbles=[o for scene in scenes for o in scene.get('fabric',{}).get('objects',[]) if o.get('slideMeta',{}).get('comicBubble')]
    assert len(bubbles)==3
    assert all(o['type'].lower()=='group' for o in bubbles)
    page.click('#back');idle(page);page.set_input_files('#file-input',str(source));idle(page)
    expect(page.locator('#new-comic-layout')).to_be_visible()
    page.locator('.page-tab').nth(1).click();idle(page)
    frame=page.locator('#engine-host iframe').element_handle().content_frame()
    texts=frame.evaluate('''() => __slideEditorCanvas.getObjects().filter(o=>o.slideMeta?.comicBubble).map(o=>o.getObjects().find(c=>c.type==='textbox').text)''')
    assert sorted(texts)==sorted(['<Hola> & bon dia!','Tinc una idea.','Un matí al bosc…'])
    page.click('#read');idle(page);page.click('#next')
    expect(page.locator('#reader-page')).to_contain_text('<Hola> & bon dia!')
    expect(page.locator('#reader-page script')).to_have_count(0)
    context.close()
