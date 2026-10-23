"""Whole-app Vue migration: templates, reactive controls and public catalogue."""
from urllib.parse import parse_qs, urlsplit

import pytest
from playwright.sync_api import expect
from test_workshop import BASE, browser, idle, choose_language, expect_language_locked


@pytest.mark.parametrize(('template', 'pages'), [('album', 3), ('blank', 1)])
def test_create_templates_page_controls_and_reader_escape(browser, template, pages):
    context = browser.new_context(viewport={'width': 1440, 'height': 1000})
    page = context.new_page(); page.goto(BASE); choose_language(page, 'va')
    page.click('#new-book'); expect(page.locator('#title')).to_be_focused()
    page.fill('#title', '   '); page.click('#create-form button[type=submit]')
    expect(page.locator('#create-dialog')).to_be_visible()
    page.fill('#title', 'Un llibre que continua')
    page.check(f'input[name="template"][value="{template}"]')
    page.click('#create-form button[type=submit]'); idle(page)
    expect(page.locator('.page-tab')).to_have_count(pages)
    expect(page.locator('#page-count')).to_have_text(str(pages))
    expect_language_locked(page, True)
    expect(page.locator('#move-up')).to_be_disabled()
    if template == 'blank': expect(page.locator('#delete-page')).to_be_disabled()
    page.click('#add-page'); idle(page)
    page.once('dialog', lambda dialog: dialog.accept('La pàgina nova'))
    page.click('#rename-page'); idle(page)
    expect(page.locator('#page-name')).to_have_text('La pàgina nova')
    expect(page.locator('.page-tab').last).to_contain_text('La pàgina nova')
    page.once('dialog', lambda dialog: dialog.accept())
    page.click('#delete-page'); idle(page)
    expect(page.locator('.page-tab')).to_have_count(pages)
    page.click('#advanced'); expect(page.locator('#advanced')).to_have_text('Editor senzill')
    page.click('#advanced'); expect(page.locator('#advanced')).to_have_text('Editor complet')
    page.click('#read'); idle(page)
    expect(page.locator('#reader-title')).to_have_text('Un llibre que continua')
    expect(page.locator('#prev')).to_be_disabled()
    if pages == 1: expect(page.locator('#next')).to_be_disabled()
    page.keyboard.press('Escape'); idle(page)
    expect(page.locator('#reader')).to_be_hidden()
    page.click('#draw'); idle(page)
    frame = page.locator('#engine-host iframe').element_handle().content_frame()
    assert frame.evaluate('__slideEditorCanvas.isDrawingMode')
    page.click('#select'); idle(page)
    page.click('#back'); idle(page)
    expect(page.locator('#books .book-open')).to_have_text('Un llibre que continua')
    expect_language_locked(page, False)
    context.close()


@pytest.fixture
def catalogue(browser):
    context = browser.new_context(viewport={'width': 1200, 'height': 900})
    requests = []
    books = [dict(external_id=letter*32, title=title, author='Aula') for letter, title in
             [('a', '<img src=x onerror=window.__unsafe=1>'), ('b', 'Una altra història')]]
    context.route('**/publication-status', lambda route: route.fulfill(json={'enabled': True}))
    def serve(route):
        query = parse_qs(urlsplit(route.request.url).query)
        requests.append(query)
        offset = int(query['offset'][0])
        empty = query.get('q') == ['no-match']
        route.fulfill(json={'items': [] if empty else books[offset:offset+1],
            'more': not empty and offset == 0, 'bank_url': 'http://bank.test/'})
    context.route('**/api/llibres/books?*', serve)
    context.route('**/api/llibres/public/**', lambda route: route.fulfill(
        content_type='text/html', body='<p>Una història publicada</p>'))
    page = context.new_page(); errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto(BASE)
    yield page, requests
    assert not errors
    context.close()


def test_shared_catalogue_search_pagination_reader_and_translation(catalogue):
    page, requests = catalogue
    page.click('#open-shared'); idle(page)
    expect(page.locator('#shared-books .book-open')).to_have_count(1)
    assert page.locator('#shared-books .book-open img').count() == 0
    page.click('#shared-more'); idle(page)
    expect(page.locator('#shared-books .book-open')).to_have_count(2)
    assert requests[-1]['offset'] == ['1']
    page.locator('#shared-books .book-open').first.click()
    expect(page.locator('#published-title')).to_have_text('<img src=x onerror=window.__unsafe=1>')
    expect(page.locator('#published-frame')).to_have_attribute('sandbox', 'allow-downloads')
    page.keyboard.press('Escape')
    expect(page.locator('#published-reader')).to_be_hidden()
    assert page.locator('#published-frame').get_attribute('src') is None
    page.fill('#shared-search', 'no-match'); page.click('#shared-search-form button'); idle(page)
    expect(page.locator('#shared-books .book-open')).to_have_count(0)
    expect(page.locator('#shared-more')).to_be_hidden()
    assert requests[-1]['offset'] == ['0']
    assert requests[-1]['q'] == ['no-match']
    expect(page.locator('#shared-status')).to_contain_text('Todavía no hay')
    page.click('#close-shared'); choose_language(page, 'va')
    page.click('#open-shared'); idle(page)
    expect(page.locator('#shared-heading')).to_have_text('Històries compartides')
    expect(page.locator('#shared-search')).to_have_attribute('aria-label', 'Buscar llibres')
    assert page.evaluate('window.__unsafe') is None


def test_closed_shared_catalogue_ignores_late_response(catalogue):
    page, requests = catalogue
    held = []
    page.route('**/api/llibres/books?*', lambda route: held.append(route))
    with page.expect_request('**/api/llibres/books?*'): page.click('#open-shared')
    expect(page.locator('#shared-status')).to_contain_text('Preparando')
    page.keyboard.press('Escape'); expect(page.locator('#shared-dialog')).to_be_hidden()
    held.pop().fulfill(json={'items':[dict(external_id='a'*32,title='Late',author='Aula')], 'more':True})
    idle(page)
    expect(page.locator('#shared-books .book-open')).to_have_count(0)
