"""Built-in example: real Rebost provenance and an isolated editable copy."""
import hashlib
import json
from pathlib import Path
import zipfile
import xml.etree.ElementTree as ET

from playwright.sync_api import expect
from test_workshop import BASE, browser, idle

EXAMPLE=Path(__file__).resolve().parents[1]/'public/examples/la-papallona'


def test_example_is_valencian_and_carries_real_rebost_credits():
    provenance=json.loads((EXAMPLE/'provenance.json').read_text())
    assert provenance['language']=='va'
    assert provenance['pages']==6
    assert len(provenance['images'])==5
    assert hashlib.sha256((EXAMPLE/'la-papallona.elpx').read_bytes()).hexdigest()==provenance['elpx_sha256']
    with zipfile.ZipFile(EXAMPLE/'la-papallona.elpx') as package:
        credits=[json.loads(package.read(name)) for name in package.namelist() if name.endswith('.rebost.txt')]
        assert {c['id'] for c in credits}=={c['id'] for c in provenance['images']}
        assert all(c['source'] and c['licenseText'] and 'scratch' in c['source_repository'] for c in credits)
        root=ET.fromstring(package.read('content.xml'))
        scenes=[json.loads(node.text) for node in root.iter() if node.tag.endswith('}jsonProperties')]
        for scene in scenes:
            for obj in scene.get('fabric',{}).get('objects',[]):
                if str(obj.get('type')).lower()=='textbox':
                    assert obj.get('originX')=='left' and obj.get('left',0)>=0
    html=(EXAMPLE/'index.html').read_text()
    assert 'lang="ca-valencia"' in html and '<script' not in html
    assert 'Crèdits' in html and 'CC-BY-SA-2.0' in html
    assert 'asset://' not in html and 'blob:' not in html


def test_read_and_edit_sample_without_replacing_existing_books(browser):
    context=browser.new_context(viewport={'width':1280,'height':900})
    context.route('**/*',lambda route:route.continue_() if route.request.method in ('GET','HEAD') else route.abort())
    page=context.new_page();page.goto(BASE+'/?lang=va')
    expect(page.locator('#demo-book')).to_be_visible()
    expect(page.locator('#book-count')).to_have_text('0')
    page.click('#read-demo')
    expect(page.locator('main section')).to_have_count(6)
    expect(page.locator('main section').last.locator('h2')).to_have_text('Crèdits')
    page.goto(BASE+'/?lang=va')
    page.evaluate("""async () => (await import('/store.js')).saveBook({id:'existing-book',title:'El meu conte',updatedAt:1,pageCount:1,bytes:new Uint8Array([1]).buffer})""")
    page.reload();page.click('#edit-demo');idle(page)
    expect(page.locator('#book-title')).to_have_value('La papallona i els colors del bosc')
    expect(page.locator('.page-tab')).to_have_count(6)
    expect(page.locator('#language')).to_have_value('va')
    page.fill('#book-title','El meu final');page.locator('#book-title').dispatch_event('change')
    page.click('#back');idle(page)
    expect(page.locator('#book-count')).to_have_text('2')
    expect(page.locator('#books')).to_contain_text('El meu conte')
    expect(page.locator('#books')).to_contain_text('El meu final')
    context.close()


def test_comic_sample_opens_as_an_editable_copy(browser):
    context=browser.new_context(viewport={'width':1500,'height':1100})
    page=context.new_page();page.goto(BASE+'/?lang=va')
    page.click('#edit-comic-demo');idle(page)
    expect(page.locator('#book-title')).to_have_value('La granota i la idea brillant')
    expect(page.locator('.page-tab')).to_have_count(5)
    for page_index,panels in [(1,2),(2,3),(3,4)]:
        page.locator('.page-tab').nth(page_index).click();idle(page)
        frame=page.locator('#engine-host iframe').element_handle().content_frame()
        counts=frame.evaluate('''() => {
          const objects=__slideEditorCanvas.getObjects();
          return {panels:objects.filter(o=>o.slideMeta?.comicPanel).length,bubbles:objects.filter(o=>o.slideMeta?.comicBubble).length};
        }''')
        assert counts=={'panels':panels,'bubbles':panels}
    page.click('#back');idle(page)
    expect(page.locator('#book-count')).to_have_text('1')
    provenance=json.loads((EXAMPLE.parent/'la-granota/provenance.json').read_text())
    assert len(provenance['images'])==4 and provenance['language']=='va'
    context.close()
