"""Browser acceptance tests against the unmodified official eXe static engine."""
import io
import json
import os
from pathlib import Path
import shutil
import struct
import zipfile
import xml.etree.ElementTree as ET

from PIL import Image
import pytest
from playwright.sync_api import sync_playwright, expect

BASE = os.environ.get('LLIBRES_TEST_URL', 'http://127.0.0.1:8098')


@pytest.fixture(scope='module')
def browser():
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=shutil.which('chromium'), args=['--no-sandbox'])
        yield browser
        browser.close()


# Amb Commons, l'idioma es tria dins del xip de compte; sense, amb el selector propi.
LANGUAGE_READY = ("document.querySelector('#language') || "
                  "document.querySelector('edutictac-account [data-lang-option]')")


def _language_chip(page):
    page.wait_for_function(LANGUAGE_READY)
    return None if page.locator('#language').count() else page.locator('edutictac-account')


def _open_chip(chip):
    if not chip.locator('details').evaluate('node => node.open'):
        chip.locator('summary').click()


def choose_language(page, lang):
    chip = _language_chip(page)
    if chip is None:
        page.select_option('#language', lang)
        return
    _open_chip(chip)
    chip.locator(f'[data-lang-option="{lang}"]').click()
    page.keyboard.press('Escape')


def expect_language(page, lang):
    chip = _language_chip(page)
    if chip is None:
        expect(page.locator('#language')).to_have_value(lang)
    else:
        expect(chip.locator(f'[data-lang-option="{lang}"]')).to_have_attribute('aria-checked', 'true')


def expect_language_locked(page, locked):
    chip = _language_chip(page)
    if chip is None:
        target = expect(page.locator('#language'))
        target.to_be_disabled() if locked else target.to_be_enabled()
        return
    _open_chip(chip)
    option = expect(chip.locator('[data-lang-option="ca"]'))
    option.to_be_disabled() if locked else option.to_be_enabled()
    page.keyboard.press('Escape')


def idle(page):
    page.wait_for_function('document.getElementById("busy").hidden', timeout=90000)
    assert page.locator('#notice.error:visible').count() == 0, page.locator('#notice').inner_text()


def create(page, lang='es'):
    page.goto(BASE)
    choose_language(page, lang)
    page.click('#new-book')
    page.fill('#title', 'El bosc i la música')
    page.click('#create-form button[type=submit]')
    idle(page)
    assert page.locator('.page-tab').count() == 3
    return page.locator('#engine-host iframe').element_handle().content_frame()


def payloads(archive):
    with zipfile.ZipFile(archive) as z:
        root = ET.fromstring(z.read('content.xml'))
        data = [json.loads(x.text) for x in root.iter() if x.tag.endswith('}jsonProperties')]
        return data, z.namelist(), z.read('content.xml')


@pytest.mark.parametrize('lang', ['es', 'va'])
def test_create_edit_images_drawing_reorder_download_and_reopen(browser, tmp_path, lang):
    context = browser.new_context(viewport={'width':1440,'height':1000}, accept_downloads=True)
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    frame = create(page, lang)
    # Actual browser text input through Fabric's editing textarea.
    frame.evaluate('''() => {const c=__slideEditorCanvas,o=c.getObjects().find(o=>o.type==='textbox');c.setActiveObject(o);o.enterEditing();o.selectAll();}''')
    page.keyboard.insert_text('Una aventura amb ànecs i cançons')
    page.keyboard.press('Escape')
    png = tmp_path / 'dibuix.png'
    Image.new('RGBA', (96,64), (240,120,50,180)).save(png)
    page.set_input_files('#image-input', str(png))
    idle(page)
    assert frame.evaluate("__slideEditorCanvas.getObjects().some(o=>o.type==='image')")
    page.click('#draw')
    idle(page)
    bounds = frame.locator('.upper-canvas').bounding_box()
    page.mouse.move(bounds['x']+40,bounds['y']+80)
    page.mouse.down()
    page.mouse.move(bounds['x']+90,bounds['y']+120,steps=8)
    page.mouse.up()
    page.click('#select')
    idle(page)
    assert frame.evaluate("__slideEditorCanvas.getObjects().some(o=>o.type==='path')")
    page.click('#save-book')
    idle(page)
    page.click('#add-page')
    idle(page)
    assert page.locator('.page-tab').count() == 4
    added = page.locator('.page-tab[aria-current=true]').get_attribute('data-id')
    page.click('#move-up')
    idle(page)
    assert page.locator('.page-tab').nth(2).get_attribute('data-id') == added
    page.click('#read')
    idle(page)
    expect(page.locator('#reader')).to_be_visible()
    expect(page.locator('#reader-page')).to_contain_text('Una aventura amb ànecs i cançons')
    assert page.locator('#reader-page svg image').count() == 1
    assert page.locator('#reader-page svg image').get_attribute('href')
    page.click('#next')
    expect(page.locator('#reader-position')).to_have_text('2 / 4')
    page.click('#close-reader')
    idle(page)
    with page.expect_download(timeout=90000) as download:
        page.click('#download')
    project = tmp_path / ('book-' + lang + '.elpx')
    download.value.save_as(project)
    idle(page)
    data, names, xml = payloads(project)
    assert len(data) == 4 and any(name.endswith('.png') and 'resources/' in name for name in names)
    assert 'Una aventura amb ànecs i cançons' in json.dumps(data, ensure_ascii=False)
    assert b'blob:' not in xml and b'/api/assets/' not in xml
    page.click('#back')
    idle(page)
    assert page.locator('.book-open').count() == 1
    page.reload()
    page.locator('.book-open').click()
    idle(page)
    assert page.locator('.page-tab').count() == 4
    assert not errors
    context.close()
    # A different browser identity can open the downloaded source with all assets.
    other = browser.new_context(viewport={'width':1440,'height':1000})
    page = other.new_page()
    page.goto(BASE)
    page.set_input_files('#file-input', str(project))
    idle(page)
    assert page.locator('.page-tab').count() == 4
    frame = page.locator('#engine-host iframe').element_handle().content_frame()
    frame.wait_for_function("__slideEditorCanvas.getObjects().some(o=>o.type==='image')")
    assert frame.evaluate("__slideEditorCanvas.getObjects().some(o=>o.type==='path')")
    page.click('#read')
    idle(page)
    with page.expect_download(timeout=90000) as download:
        page.click('#export-html')
    html = tmp_path / ('reading-' + lang + '.zip')
    download.value.save_as(html)
    idle(page)
    with zipfile.ZipFile(html) as package:
        assert 'index.html' in package.namelist()
        assert any('resources/' in x and x.endswith('.png') for x in package.namelist())
    with page.expect_download(timeout=90000) as download:
        page.click('#export-epub')
    epub = tmp_path / ('reading-' + lang + '.epub')
    download.value.save_as(epub)
    idle(page)
    with zipfile.ZipFile(epub) as package:
        assert package.read('mimetype') == b'application/epub+zip'
        assert 'META-INF/container.xml' in package.namelist()
    other.close()


@pytest.mark.parametrize('attack', ['traversal','absolute','windows','symlink','zipbomb','script','entity'])
def test_import_rejects_dangerous_archives_without_running_content(browser, attack):
    output = io.BytesIO()
    with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED) as z:
        filename = {'traversal':'../evil.png','absolute':'/tmp/evil.png','windows':'C:/evil.png'}.get(attack,'safe.txt')
        info = zipfile.ZipInfo(filename)
        if attack == 'symlink':
            info.create_system = 3
            info.external_attr = 0o120777 << 16
        z.writestr(info,b'x')
        xml = '<ode><odeNavStructure/><odeIdeviceTypeName>slide</odeIdeviceTypeName>'
        if attack == 'script':xml += '<htmlView><![CDATA[<script>window.__unsafe=1</script>]]></htmlView>'
        if attack == 'entity':xml = '<!DOCTYPE ode [<!ENTITY x SYSTEM "file:///etc/passwd">]>' + xml
        z.writestr('content.xml',xml+'</ode>')
    raw = bytearray(output.getvalue())
    if attack == 'zipbomb':
        offset = raw.index(b'PK\x01\x02')
        struct.pack_into('<I',raw,offset+24,101*1024*1024)
    context = browser.new_context()
    page = context.new_page()
    page.goto(BASE)
    result = page.evaluate('''async bytes => {const {inspectBook}=await import('/import.js');try{await inspectBook(Uint8Array.from(bytes).buffer);return false;}catch{return true;}}''',list(raw))
    assert result
    assert page.evaluate('window.__unsafe') is None
    context.close()


def test_failed_storage_does_not_claim_saved_or_leave_the_book(browser):
    context=browser.new_context(viewport={'width':1440,'height':1000})
    page=context.new_page()
    create(page)
    page.fill('#book-title','Cambios que no caben')
    page.locator('#book-title').blur()
    page.evaluate("() => {IDBObjectStore.prototype.put=()=>{throw new DOMException('full','QuotaExceededError');};}")
    page.click('#back')
    page.wait_for_function('document.getElementById("busy").hidden',timeout=90000)
    expect(page.locator('#workspace')).to_be_visible()
    expect(page.locator('#notice')).to_contain_text('Descarga una copia')
    assert 'Guardado en este navegador' not in page.locator('#save-status').inner_text()
    context.close()


def test_import_discards_archive_runtime_and_preserves_only_validated_data(browser):
    output=io.BytesIO()
    with zipfile.ZipFile(output,'w') as z:
        z.writestr('content.xml','<ode><odeNavStructure/><odeIdeviceTypeName>slide</odeIdeviceTypeName></ode>')
        z.writestr('theme/style.js','window.__unsafe=1')
        z.writestr('index.html','<script>window.__unsafe=1</script>')
        z.writestr('idevices/slide/slide.js','window.__unsafe=1')
    context=browser.new_context()
    page=context.new_page()
    page.goto(BASE)
    names=page.evaluate('''async bytes=>{const {inspectBook}=await import('/import.js');const safe=await inspectBook(Uint8Array.from(bytes).buffer);return Object.keys(fflate.unzipSync(new Uint8Array(safe)));}''',list(output.getvalue()))
    assert names==['content.xml']
    assert page.evaluate('window.__unsafe') is None
    context.close()


def test_book_title_is_text_in_editor_and_shelf(browser):
    context=browser.new_context(viewport={'width':1440,'height':1000})
    page=context.new_page()
    page.goto(BASE)
    page.click('#new-book')
    title='<img src=x onerror=window.__unsafe=1>'
    page.fill('#title',title)
    page.click('#create-form button[type=submit]')
    idle(page)
    assert page.evaluate('window.__unsafe') is None
    assert page.locator('#engine-host iframe').element_handle().content_frame().evaluate('window.__unsafe') is None
    page.click('#back')
    idle(page)
    expect(page.locator('.book-open')).to_have_text(title)
    assert page.locator('.book-open img').count()==0
    context.close()
