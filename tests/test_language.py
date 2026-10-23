"""Shared language preference and translated book creation, without real accounts."""
import json
import pytest
from playwright.sync_api import expect
from test_workshop import BASE, browser, idle, choose_language, expect_language


@pytest.mark.parametrize(('languages', 'expected'), [
    (['en-GB', 'es'], 'en'),
    (['ca-ES-valencia', 'es-ES'], 'va'),
    (['ca-ES'], 'ca'),
    (['es-MX'], 'es'),
    (['fr-FR', 'en-US'], 'en'),
    (['fr-FR'], 'es'),
])
def test_first_visit_uses_browser_language(browser, languages, expected):
    context = browser.new_context()
    context.add_init_script('Object.defineProperty(navigator, "languages", {get: () => ' + json.dumps(languages) + '})')
    page = context.new_page(); page.goto(BASE)
    expect_language(page, expected)
    expect(page.locator('html')).to_have_attribute('lang', 'ca-valencia' if expected == 'va' else expected)
    choose_language(page, 'ca' if expected == 'en' else 'en')
    page.reload()
    expect_language(page, 'ca' if expected == 'en' else 'en')
    context.close()


def test_explicit_language_overrides_browser(browser):
    context = browser.new_context(locale='en-GB')
    page = context.new_page(); page.goto(BASE + '?lang=va')
    expect_language(page, 'va')
    context.close()


@pytest.mark.parametrize(('lang', 'headline', 'cover'), [
    ('es', 'Tu próxima historia empieza aquí.', 'Portada'),
    ('va', 'La teua pròxima història comença ací.', 'Portada'),
    ('ca', 'La teva pròxima història comença aquí.', 'Portada'),
    ('en', 'Your next story starts here.', 'Cover'),
])
def test_shared_language_and_new_book(browser, lang, headline, cover):
    context = browser.new_context()
    context.add_cookies([dict(name='edutictac_language', value=lang, url=BASE)])
    context.add_init_script("localStorage.setItem('llibres-language','es')")
    page = context.new_page()
    page.goto(BASE)
    expect_language(page, lang)
    expect(page.locator('h1')).to_have_text(headline)
    page.reload()
    expect_language(page, lang)
    page.click('#new-book')
    page.fill('#title', 'Language test')
    page.click('#create-form button[type=submit]')
    idle(page)
    expect(page.locator('.page-tab').first).to_contain_text(cover)
    frame = page.locator('#engine-host iframe').element_handle().content_frame()
    metadata = frame.evaluate("eXeLearning.app.project._yjsBridge.documentManager.getMetadata().get('language')")
    assert metadata == ('ca-valencia' if lang == 'va' else lang)
    page.click('#add-page'); idle(page)
    expect(page.locator('#page-name')).to_have_text(('Page' if lang == 'en' else 'Página' if lang == 'es' else 'Pàgina') + ' 3')
    page.click('#save-book'); idle(page)
    page.click('#back'); idle(page)
    expect(page.locator('#books .book-open')).to_have_text('Language test')
    context.close()


def test_language_change_on_return_preserves_open_book(browser):
    context = browser.new_context()
    page = context.new_page()
    page.goto(BASE + '?lang=en')
    expect_language(page, 'en')
    choose_language(page, 'ca')
    assert 'lang=ca' in page.url
    assert next(c['value'] for c in context.cookies() if c['name'] == 'edutictac_language') == 'ca'
    page.click('#new-book'); page.fill('#title', 'Keep my book')
    page.click('#create-form button[type=submit]'); idle(page)
    # Production shares this preference across subdomains. Replace the actual
    # cookie rather than adding a second, host-only cookie with the same name.
    preference = next(c for c in context.cookies() if c['name'] == 'edutictac_language')
    context.add_cookies([{**preference, 'value': 'en'}])
    page.evaluate("window.dispatchEvent(new Event('focus'))")
    expect_language(page, 'ca')
    page.click('#back'); idle(page)
    expect_language(page, 'en')
    expect(page.locator('#books .book-open')).to_have_text('Keep my book')
    page.reload()
    expect_language(page, 'en')
    context.close()


def test_all_four_dictionaries_cover_all_keys(browser):
    context = browser.new_context()
    page = context.new_page(); page.goto(BASE)
    missing = page.evaluate('''async () => {
      const {messages} = await import('/i18n.js');
      return Object.fromEntries(['es','ca','va','en'].map(lang => [lang,
        Object.keys(messages.es).filter(key => !messages[lang][key])
      ]));
    }''')
    assert all(not keys for keys in missing.values()), missing
    context.close()
