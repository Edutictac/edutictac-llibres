"""Read-only smoke checks of the private VPS preparation profile."""
import os
from urllib.error import HTTPError
from urllib.request import Request, urlopen
import json

import pytest

BASE = os.environ.get('LLIBRES_PRODUCTION_TEST_URL', '').rstrip('/')
pytestmark = pytest.mark.skipif(not BASE, reason='Private production candidate URL required')


def response(path, method='GET'):
    try:
        with urlopen(Request(BASE + path, method=method), timeout=20) as r:
            return r.status, r.read(), r.headers
    except HTTPError as error:
        return error.code, error.read(), error.headers


@pytest.mark.parametrize('path', ['/', '/engine/index.html', '/assets/?picker=1&lang=en',
    '/assets/commons.css', '/rebost-i18n.js', '/language-preference.js', '/source/llibres-source.zip'])
def test_editor_and_shared_picker_available(path):
    status, body, _ = response(path)
    assert status == 200
    assert body


def test_publication_ui_stays_closed_with_anonymous_api_connected():
    assert json.loads(response('/publication-status')[1]) == {'enabled': False}
    status, body, _ = response('/api/llibres/me')
    assert status == 200
    permissions = json.loads(body)
    assert not any(permissions.get(key) for key in ['can_publish', 'can_submit', 'can_review'])
    assert response('/api/llibres/books')[0] == 200
    assert response('/api/llibres/mine/01234567-89ab-cdef-0123-456789abcdef', 'POST')[0] == 401


@pytest.mark.parametrize('method', ['POST', 'PATCH', 'DELETE'])
def test_editor_cannot_write_to_shared_library(method):
    assert response('/api/assets/v1/items', method)[0] == 403


@pytest.mark.parametrize('path', ['/api/setup/status', '/admin/', '/.env'])
def test_administration_and_configuration_are_not_exposed(path):
    assert response(path)[0] == 404


def test_real_rebost_image_is_copied_with_credits_without_server_writes():
    from playwright.sync_api import sync_playwright, expect
    import shutil
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path=shutil.which('chromium'), args=['--no-sandbox'])
        context = browser.new_context(viewport={'width': 1440, 'height': 1000})
        writes = []
        def read_only(route):
            if route.request.method in ('GET', 'HEAD'):
                route.continue_()
            else:
                writes.append(route.request.method)
                route.abort()
        context.route('**/*', read_only)
        page = context.new_page()
        page.goto(BASE + '/?lang=va')
        page.click('#new-book'); page.fill('#title', 'Prova privada del candidat')
        page.click('#create-form button[type=submit]')
        page.wait_for_function('document.getElementById("busy").hidden', timeout=90000)
        page.click('#add-image')
        picker = page.frame_locator('#rebost-frame')
        picker.locator('#grid .actions button').first.click(timeout=30000)
        page.wait_for_function('document.getElementById("busy").hidden', timeout=90000)
        expect(page.locator('#image-picker')).not_to_be_visible()
        expect(page.locator('#notice.error')).not_to_be_visible()
        expect(page.locator('.page-tab').last).to_contain_text('Crèdits')
        page.click('#save-book')
        page.wait_for_function('document.getElementById("busy").hidden', timeout=90000)
        expect(page.locator('#notice.error')).not_to_be_visible()
        assert not writes
        context.close(); browser.close()
