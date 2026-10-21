"""Real central selector and real eXe, synthetic per-browser API responses only."""
import io
import json
import zipfile
from urllib.parse import urlparse, parse_qs

from PIL import Image
import pytest
from playwright.sync_api import expect

from test_workshop import BASE, browser, create, idle, payloads

ID = 'img-' + 'a' * 64


def fixture_api(context, *, race=False, invalid=False, asset_id=ID, name=None, author="Synthetic test author"):
    image = io.BytesIO()
    Image.new('RGBA', (80, 60), (50, 180, 120, 210)).save(image, 'PNG')
    reads = []
    item = dict(id=asset_id, revision=1, collection='scratch', readonly=True, name='Poma',
                names={'ca': name or 'Poma', 'es': name or 'Manzana'}, type='sprite', width=80, height=60,
                source_id='scratch:synthetic.svg', source_revision='synthetic-revision',
                source_path='synthetic.svg', source_repository='https://example.invalid/source',
                license='CC BY-SA 2.0', attribution=author)

    role = 'sprite'
    def serve(route):
        nonlocal role
        path = urlparse(route.request.url).path.removeprefix('/api/assets/v1')
        reads.append(path)
        if path in ['/me', '/catalogs']:
            route.fulfill(json={'capabilities': ['catalog', 'scratch_catalog']})
        elif path == '/items':
            role = parse_qs(urlparse(route.request.url).query).get('type', ['sprite'])[0]
            route.fulfill(json={'items': [{**item, 'type': role}], 'next_cursor': None})
        elif path == '/items/' + asset_id:
            revision = 2 if race and reads.count(path) > 1 else 1
            route.fulfill(json={**item, 'revision': revision, 'type': role})
        elif path.endswith('/content') or path.endswith('/thumbnail'):
            route.fulfill(body=b'not a PNG' if invalid else image.getvalue(), content_type='image/png')
        elif path.endswith('/source'):
            # Deliberately hostile-looking source stays inert in a text attachment.
            route.fulfill(body='<svg><script>window.__unsafe=1</script></svg>', content_type='text/plain')
        elif path.endswith('/license'):
            route.fulfill(body='Synthetic full license text for portability testing.', content_type='text/plain')
        else:
            route.fulfill(status=404)

    context.route('**/rebost-status', lambda r: r.fulfill(json={'enabled': True}))
    context.route('**/api/assets/v1/**', serve)
    return reads


def choose(page):
    picker = page.frame_locator('#rebost-frame')
    picker.locator('#grid .actions button').first.click()
    expect(page.locator('#image-picker')).not_to_be_visible(timeout=30000)
    idle(page)


@pytest.mark.parametrize('lang', ['es', 'va'])
def test_rebost_gallery_portable_images_and_full_credits(browser, tmp_path, lang):
    context = browser.new_context(viewport={'width':1440, 'height':1000}, accept_downloads=True)
    reads = fixture_api(context)
    page = context.new_page()
    frame = create(page, lang)
    # Slide's own existing gallery button now opens the central selector too.
    frame.locator('button[title="Add image"]').click()
    expect(page.locator('#image-picker')).to_be_visible()
    if lang == 'va':
        page.click('#rebost-backgrounds')
    picker = page.frame_locator('#rebost-frame')
    expect(picker.locator('#uploadArea')).to_be_hidden()
    choose(page)
    expect(page.locator('#image-picker')).not_to_be_visible()
    assert frame.evaluate("__slideEditorCanvas.getObjects().some(o=>o.type==='image')")
    assert not frame.evaluate("__slideEditorCanvas.getObjects().some(o=>o.text?.includes('CC BY-SA 2.0'))")
    expect(page.locator('.page-tab').last).to_contain_text('Créditos' if lang == 'es' else 'Crèdits')
    assert reads.count('/items/' + ID) == 2
    with page.expect_download(timeout=90000) as download:
        page.click('#download')
    target = tmp_path / 'rebost.elpx'
    download.value.save_as(target)
    idle(page)
    _, names, xml = payloads(target)
    with zipfile.ZipFile(target) as package:
        attachment = next(n for n in names if n.endswith('.rebost.txt'))
        credit = json.loads(package.read(attachment))
        assert credit['licenseText'].startswith('Synthetic full license')
        assert '<script>' in credit['source']
        assert credit['source_revision'] == 'synthetic-revision'
    assert b'/api/assets/' not in xml and b'blob:' not in xml
    context.close()

    # Fresh browser; no Rebost, no API access, no previous IndexedDB.
    other = browser.new_context(viewport={'width':1440, 'height':1000}, accept_downloads=True)
    other.route('**/api/assets/v1/**', lambda r: r.abort())
    page = other.new_page()
    page.goto(BASE)
    page.set_input_files('#file-input', str(target))
    idle(page)
    frame = page.locator('#engine-host iframe').element_handle().content_frame()
    frame.wait_for_function("__slideEditorCanvas.getObjects().some(o=>o.type==='image')")
    assert frame.evaluate('window.__unsafe') is None
    page.click('#read')
    idle(page)
    expect(page.locator('#reader-page')).not_to_contain_text('Synthetic test author')
    for _ in range(3):page.click('#next')
    expect(page.locator('#reader-page')).to_contain_text('Synthetic test author')
    for button in ['#export-html', '#export-epub']:
        with page.expect_download(timeout=90000) as download:
            page.click(button)
        output = tmp_path / ('output.zip' if button.endswith('html') else 'output.epub')
        download.value.save_as(output)
        idle(page)
        with zipfile.ZipFile(output) as package:
            credits = [n for n in package.namelist() if n.endswith('.rebost.txt')]
            assert credits
            assert json.loads(package.read(credits[0])) == credit
            pages = [n for n in package.namelist() if n.endswith(('.html', '.xhtml'))]
            assert any(b'Synthetic test author' in package.read(n) for n in pages)
    other.close()


@pytest.mark.parametrize('failure', ['revision', 'invalid-png'])
def test_failed_rebost_import_preserves_page(browser, failure):
    context = browser.new_context(viewport={'width':1440, 'height':1000})
    fixture_api(context, race=failure == 'revision', invalid=failure == 'invalid-png')
    page = context.new_page()
    frame = create(page)
    before = frame.evaluate('__slideEditorCanvas.getObjects().length')
    page.click('#add-image')
    picker = page.frame_locator('#rebost-frame')
    picker.locator('#grid .actions button').first.click()
    expect(page.locator('#notice.error')).to_be_visible()
    assert frame.evaluate('__slideEditorCanvas.getObjects().length') == before
    assert frame.evaluate('window.__unsafe') is None
    context.close()


def test_picker_rejects_wrong_source_nonce_and_closed_requests(browser):
    context = browser.new_context(viewport={'width':1440, 'height':1000})
    reads = fixture_api(context)
    page = context.new_page()
    frame = create(page)
    page.click('#add-image')
    picker = page.frame_locator('#rebost-frame')
    expect(picker.locator('#grid article')).to_have_count(1)
    page.evaluate('''id => {
      const f=document.querySelector('#rebost-frame');
      const d={format:'rebost-selection',version:1,request:new URL(f.src).searchParams.get('request'),id};
      window.postMessage(d,location.origin); // wrong source
    }''', ID)
    picker.locator('body').evaluate('''(_, id) => parent.postMessage({format:'rebost-selection',version:1,request:'wrong',id},location.origin)''', ID)
    # A matching nonce from an unexpected origin must also be ignored.
    page.evaluate('''id => {
      const f=document.querySelector('#rebost-frame');
      const data={format:'rebost-selection',version:1,request:new URL(f.src).searchParams.get('request'),id};
      window.dispatchEvent(new MessageEvent('message',{source:f.contentWindow,origin:'https://example.invalid',data}));
      window.__closedPickerMessage={source:f.contentWindow,origin:location.origin,data};
    }''', ID)
    page.wait_for_timeout(150)
    assert '/items/' + ID not in reads
    page.click('#close-image-picker')
    page.evaluate("window.dispatchEvent(new MessageEvent('message',window.__closedPickerMessage))")
    assert frame.evaluate("__slideEditorCanvas.getObjects().every(o=>o.type!=='image')")
    context.close()


def test_expired_session_shows_commons_login_without_changing_book(browser):
    context = browser.new_context(viewport={'width':1440, 'height':1000})
    fixture_api(context)
    context.route('**/api/assets/v1/me', lambda r: r.fulfill(status=401, json={'detail': 'session_required'}))
    page = context.new_page()
    frame = create(page)
    page.click('#add-image')
    picker = page.frame_locator('#rebost-frame')
    expect(picker.locator('#grid article')).to_have_count(1)
    expect(picker.locator('#access')).to_be_hidden()
    picker.locator('#mineTab').click()
    expect(picker.locator('#access')).to_be_visible()
    expect(picker.locator('#studentLogin')).to_have_attribute('target', '_blank')
    page.click('#close-image-picker')
    assert frame.evaluate("__slideEditorCanvas.getObjects().every(o=>o.type!=='image')")
    context.close()


def test_standalone_picker_uses_device_without_commons(browser):
    context = browser.new_context(viewport={'width':1440, 'height':1000})
    context.route('**/rebost-status', lambda r: r.fulfill(status=404))
    page = context.new_page()
    frame = create(page)
    with page.expect_file_chooser():
        frame.locator('button[title="Add image"]').click()
    expect(page.locator('#image-picker')).not_to_be_visible()
    context.close()
