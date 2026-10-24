"""Shared footer on the home page: translations, links and narrow screens."""
import pytest
from playwright.sync_api import expect
from test_workshop import BASE, browser


@pytest.mark.parametrize('width', [390, 1280])
@pytest.mark.parametrize(('lang', 'home', 'privacy', 'source'), [
    ('ca', 'Inici', 'Privacitat', 'Codi font'),
    ('va', 'Inici', 'Privacitat', 'Codi font'),
    ('es', 'Inicio', 'Privacidad', 'Código fuente'),
    ('en', 'Home', 'Privacy', 'Source code'),
])
def test_shared_footer(browser, width, lang, home, privacy, source):
    context = browser.new_context(viewport={'width': width, 'height': 900})
    page = context.new_page()
    page.goto(BASE + '?lang=' + lang)
    footer = page.locator('footer.ett-footer')
    expect(footer).to_have_count(1)
    expect(footer).to_be_visible()
    expect(footer.locator('.ett-footer__brand')).to_have_text('EduTicTac')
    expect(footer.locator('.ett-footer__service')).to_have_text('Llibres')
    expect(footer.locator('a[href="https://edutictac.es/"]')).to_have_text(home)
    expect(footer.locator('a[href$="/privacitat.html"]')).to_have_text(privacy)
    expect(footer.locator('a[href$="/edutictac-llibres"]')).to_have_text(source)
    expect(footer.locator('a[href$="/LICENSE"]')).to_have_text('AGPL-3.0')
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    context.close()
