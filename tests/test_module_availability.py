"""Publishing controls follow either standalone flags or local Commons modules."""
import pytest
from playwright.sync_api import expect
from test_workshop import BASE, browser, idle


@pytest.mark.parametrize(('enabled', 'available'), [
    (True, True), (False, False),
    (['blocs', 'llibres'], False), (['llibres', 'recursos'], True),
])
def test_publishing_controls_follow_the_resource_bank_module(browser, enabled, available):
    context = browser.new_context()
    context.route('**/publication-status', lambda route: route.fulfill(json={'enabled': enabled}))
    page = context.new_page(); page.goto(BASE + '?lang=va')
    if available:
        expect(page.locator('#open-shared')).to_be_visible()
    else:
        expect(page.locator('#open-shared')).to_be_hidden()
    page.click('#new-book'); page.fill('#title', 'Disponibilitat de publicació')
    page.click('#create-form button[type=submit]'); idle(page)
    if available:
        expect(page.locator('#publish-book')).to_be_visible()
    else:
        expect(page.locator('#publish-book')).to_be_hidden()
    context.close()
