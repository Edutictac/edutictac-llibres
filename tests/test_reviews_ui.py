"""Vue island regressions; synthetic queue, no accounts or real publications."""
import json
from urllib.parse import parse_qs, urlsplit

import pytest
from playwright.sync_api import expect
from test_workshop import BASE, browser, idle, choose_language


@pytest.fixture
def queue(browser):
    context = browser.new_context(viewport={'width': 1200, 'height': 900})
    state = {'allowed': True, 'calls': [], 'decisions': [], 'conflict': False}
    malicious = '<img src=x onerror=window.__unsafe=1>'
    state['items'] = [dict(id=letter * 32, title=title, author='Aula de prova',
        class_name='Classe', license='CC BY-SA 4.0', status='pending',
        revision=7, published=False) for letter, title in [('a', malicious), ('b', 'Segon llibre')]]

    def serve(route):
        request = route.request
        url = urlsplit(request.url)
        if url.path == '/publication-status':
            return route.fulfill(json={'enabled': True})
        if url.path == '/api/llibres/me':
            return route.fulfill(json={'can_review': state['allowed']})
        if url.path == '/api/llibres/reviews':
            query = parse_qs(url.query)
            state['calls'].append(query)
            offset = int(query['offset'][0])
            return route.fulfill(json={'items': state['items'][offset:offset+1], 'more': offset == 0})
        if request.method == 'POST':
            state['decisions'].append((json.loads(request.post_data), request.headers.get('if-match')))
            return route.fulfill(status=409 if state['conflict'] else 200,
                json={'detail': 'publication_conflict'} if state['conflict'] else {})
        if url.path.endswith('index.html'):
            return route.fulfill(content_type='text/html', body='<p>Vista de prova</p>')
        return route.fulfill(status=404)

    context.route('**/publication-status', serve)
    context.route('**/api/llibres/**', serve)
    page = context.new_page()
    state['errors'] = []
    page.on('pageerror', lambda error: state['errors'].append(str(error)))
    page.goto(BASE + '?lang=es')
    yield page, state
    assert not state['errors']
    context.close()


def test_pagination_filter_translation_and_untrusted_text(queue):
    page, state = queue
    page.click('#open-reviews'); idle(page)
    expect(page.locator('.review-open')).to_have_count(1)
    expect(page.locator('.review-open')).to_have_text(state['items'][0]['title'])
    assert page.locator('.review-open img').count() == 0
    page.click('#reviews-more'); idle(page)
    expect(page.locator('.review-open')).to_have_count(2)
    assert state['calls'][-1]['offset'] == ['1']
    page.check('#reviews-all'); idle(page)
    expect(page.locator('.review-open')).to_have_count(1)
    assert state['calls'][-1] == {'offset': ['0'], 'all': ['1']}
    page.click('#close-reviews'); choose_language(page, 'va')
    page.click('#open-reviews'); idle(page)
    expect(page.locator('#reviews-heading')).to_contain_text('Revisa')
    expect(page.locator('#reviews-sign-in')).to_have_attribute('href',
        '/api/auth/oidc/login?next=%2Fllibres-login.html%3Flang%3Dva')
    page.click('.review-open')
    expect(page.locator('#review-title')).to_have_text(state['items'][0]['title'])
    expect(page.locator('#review-dialog img')).to_have_count(0)
    assert page.evaluate('window.__unsafe') is None
    assert page.locator('#review-frame').get_attribute('sandbox') == 'allow-same-origin allow-downloads'
    page.keyboard.press('Escape')
    expect(page.locator('#review-dialog')).to_be_hidden()
    assert page.locator('#review-frame').get_attribute('src') is None
    page.click('.review-open')
    expect(page.locator('#review-confirm')).not_to_be_checked()
    expect(page.locator('#approve-review')).to_be_disabled()


def test_login_return_refreshes_and_revocation_clears_queue(queue):
    page, state = queue
    state['allowed'] = False
    page.click('#open-reviews'); idle(page)
    expect(page.locator('#reviews-login')).to_be_visible()
    expect(page.locator('.review-open')).to_have_count(0)
    state['allowed'] = True
    page.evaluate("window.dispatchEvent(new Event('focus'))"); idle(page)
    expect(page.locator('.review-open')).to_have_count(1)
    expect(page.locator('#reviews-login')).to_be_hidden()
    state['allowed'] = False
    page.click('#refresh-reviews'); idle(page)
    expect(page.locator('.review-open')).to_have_count(0)
    expect(page.locator('#reviews-login')).to_be_visible()
    expect(page.locator('#reviews-more')).to_be_hidden()


def test_conflicting_revision_does_not_claim_approval_or_lose_comment(queue):
    page, state = queue
    state['conflict'] = True
    page.click('#open-reviews'); idle(page); page.click('.review-open')
    page.fill('#review-comment', 'Revisa esta versió.')
    page.check('#review-confirm'); page.click('#approve-review')
    page.wait_for_function('document.getElementById("busy").hidden')
    expect(page.locator('#review-dialog')).to_be_visible()
    expect(page.locator('#review-comment')).to_have_value('Revisa esta versió.')
    expect(page.locator('#review-feedback')).not_to_be_empty()
    assert state['decisions'] == [({'decision': 'approve', 'feedback': 'Revisa esta versió.'}, '"7"')]


def test_closing_queue_ignores_late_response(queue):
    page, state = queue
    held = []
    page.route('**/api/llibres/reviews?*', lambda route: held.append(route))
    with page.expect_request('**/api/llibres/reviews?*'):
        page.click('#open-reviews')
    expect(page.locator('#reviews-status')).to_contain_text('Preparando')
    assert held
    # Escape is available even while the host's busy overlay is visible.
    page.keyboard.press('Escape')
    expect(page.locator('#reviews-dialog')).to_be_hidden()
    held.pop().fulfill(json={'items': state['items'], 'more': True})
    idle(page)
    expect(page.locator('.review-open')).to_have_count(0)


def test_invalid_resource_id_cannot_create_preview_url(queue):
    page, state = queue
    state['items'][0]['id'] = '../../other/private'
    page.click('#open-reviews'); idle(page)
    expect(page.locator('.review-open')).to_have_count(0)
    expect(page.locator('#reviews-status')).to_contain_text('No hay solicitudes')
