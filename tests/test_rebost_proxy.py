"""Actual nginx permissions; anonymous requests, no accounts or credentials."""
import json
import os
from urllib.request import Request, urlopen
from urllib.error import HTTPError

import pytest
from test_workshop import BASE, browser, create, idle
from playwright.sync_api import expect


def status(path, method='GET'):
    try:
        with urlopen(Request(BASE + path, method=method), timeout=8) as response:
            return response.status, response.read()
    except HTTPError as error:
        return error.code, b''


def enabled():
    code, body = status('/rebost-status')
    if code != 200 or not json.loads(body).get('enabled'):
        pytest.skip('Optional Rebost proxy is disabled')


def test_actual_proxy_preserves_anonymous_access_controls():
    enabled()
    assert status('/api/assets/v1/me')[0] == 401
    code, html = status('/assets/')
    assert code == 200 and b'/rebost-i18n.js' in html
    # Both translation modules remain distinct and usable.
    assert b'export const messages' in status('/i18n.js')[1]
    assert b'i18nPortal' in status('/rebost-i18n.js')[1]
    assert status('/api/assets/v1/catalogs')[0] == 200
    assert status('/api/assets/v1/items?collection=catalog')[0] == 200
    assert status('/api/assets/v1/items')[0] == 401


@pytest.mark.parametrize('method', ['POST', 'PATCH', 'DELETE'])
def test_actual_proxy_rejects_rebost_writes(method):
    enabled()
    assert status('/api/assets/v1/items/img-' + 'a' * 64, method)[0] == 403


def test_real_anonymous_catalogue_can_insert_an_image_without_login(browser):
    enabled()
    context=browser.new_context(viewport={'width':1440,'height':1000})
    page=context.new_page()
    frame=create(page,'va')
    page.click('#add-image')
    picker=page.frame_locator('#rebost-frame')
    expect(picker.locator('#access')).to_be_hidden()
    picker.locator('#grid article .actions button').first.wait_for()
    picker.locator('#mineTab').click()
    expect(picker.locator('#access')).to_be_visible()
    picker.locator('#scratchTab').click()
    expect(picker.locator('#access')).to_be_hidden()
    picker.locator('#grid > article .actions button').first.click()
    idle(page)
    expect(page.locator('#image-picker')).not_to_be_visible()
    assert frame.evaluate("__slideEditorCanvas.getObjects().some(o=>o.type==='image')")
    assert not frame.evaluate("__slideEditorCanvas.getObjects().some(o=>o.slideMeta?.rebostCreditsFooter)")
    expect(page.locator('.page-tab').last).to_contain_text('Crèdits')
    page.click('#save-book');idle(page)
    context.close()


@pytest.mark.parametrize('destination', ['/llibres-login.html?lang=va', '/assets/'])
@pytest.mark.parametrize('endpoint', ['/api/auth/oidc/login', '/student.html'])
def test_login_proxy_preserves_requested_destination(destination, endpoint):
    from urllib.request import build_opener, HTTPRedirectHandler
    from urllib.parse import urlsplit, parse_qs, quote
    enabled()
    class NoRedirect(HTTPRedirectHandler):
        def redirect_request(self, *args): return None
    try:
        build_opener(NoRedirect).open(BASE+endpoint+'?next='+quote(destination, safe=''))
    except HTTPError as response:
        assert response.code == 302
        target = urlsplit(response.headers['Location'])
        assert target.port == int(os.environ.get('LLIBRES_TEST_PORTAL_PORT', '8082'))
        assert target.path == endpoint
        assert parse_qs(target.query)['next'] == [destination]
    else:
        pytest.fail('Expected login to redirect to Commons')
