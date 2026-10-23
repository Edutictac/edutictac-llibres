"""Shelf migration: existing IndexedDB data, deletion and editor round trips."""
import pytest
from playwright.sync_api import expect
from test_workshop import BASE, browser, create, idle, choose_language


@pytest.fixture
def shelf(browser):
    context = browser.new_context(viewport={'width': 1280, 'height': 900})
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto(BASE)
    expect(page.locator('#book-count')).to_have_text('0')
    yield page
    assert not errors
    context.close()


def seed(page):
    page.evaluate('''async () => {
      const {saveBook} = await import('/store.js');
      for (const [id, title, updatedAt] of [
        ['old', 'El primer conte', 1000],
        ['recent', '<img src=x onerror=window.__unsafe=1>', 3000],
        ['middle', 'La segona història', 2000],
      ]) await saveBook({id, title, updatedAt, pageCount: 2,
        bytes: new Uint8Array([1, 2]).buffer});
    }''')
    page.reload()
    expect(page.locator('#book-count')).to_have_text('3')


def stored_count(page):
    return page.evaluate("async () => (await (await import('/store.js')).allBooks()).length")


def test_existing_books_sort_translate_and_delete_with_confirmation(shelf):
    page = shelf
    seed(page)
    expect(page.locator('#books .book-open')).to_have_text([
        '<img src=x onerror=window.__unsafe=1>', 'La segona història', 'El primer conte'])
    assert page.locator('#books .book-open img').count() == 0
    assert page.evaluate('window.__unsafe') is None
    choose_language(page, 'va')
    expect(page.locator('#shelf-heading')).to_have_text('Els meus llibres')
    expect(page.locator('#books .book-card p').first).to_contain_text('2 pàgines')
    expect(page.locator('#books .delete-book').first).to_have_attribute(
        'aria-label', 'Elimina el llibre: <img src=x onerror=window.__unsafe=1>')
    page.once('dialog', lambda dialog: dialog.dismiss())
    page.locator('#books .delete-book').first.click(); idle(page)
    assert stored_count(page) == 3
    expect(page.locator('#book-count')).to_have_text('3')
    page.once('dialog', lambda dialog: dialog.accept())
    page.locator('#books .delete-book').first.click(); idle(page)
    assert stored_count(page) == 2
    expect(page.locator('#books .book-open').first).to_be_focused()
    for remaining in [1, 0]:
        page.once('dialog', lambda dialog: dialog.accept())
        page.locator('#books .delete-book').first.click(); idle(page)
        expect(page.locator('#book-count')).to_have_text(str(remaining))
    expect(page.locator('#books .empty')).to_contain_text('Ací viuran')
    expect(page.locator('#new-book')).to_be_focused()
    page.reload()
    expect(page.locator('#book-count')).to_have_text('0')
    assert stored_count(page) == 0


def test_failed_deletion_keeps_stored_book_and_allows_retry(shelf):
    page = shelf
    seed(page)
    page.evaluate('''() => {
      window.originalDelete = IDBObjectStore.prototype.delete;
      IDBObjectStore.prototype.delete = () => {
        throw new DOMException('synthetic deletion failure', 'UnknownError');
      };
    }''')
    page.once('dialog', lambda dialog: dialog.accept())
    page.locator('#books .delete-book').first.click()
    page.wait_for_function('document.getElementById("busy").hidden')
    expect(page.locator('#notice.error')).to_be_visible()
    expect(page.locator('#book-count')).to_have_text('3')
    expect(page.locator('#books .delete-book').first).to_be_enabled()
    assert stored_count(page) == 3
    page.evaluate('() => { IDBObjectStore.prototype.delete = window.originalDelete; }')
    page.once('dialog', lambda dialog: dialog.accept())
    page.locator('#books .delete-book').first.click()
    page.wait_for_function('document.getElementById("busy").hidden')
    expect(page.locator('#book-count')).to_have_text('2')
    assert stored_count(page) == 2


@pytest.mark.parametrize('locale', ['es', 'va'])
def test_open_from_vue_shelf_edit_save_and_reload_without_proxy_data(browser, locale):
    context = browser.new_context(viewport={'width': 1440, 'height': 1000})
    page = context.new_page()
    create(page, locale)
    page.click('#back'); idle(page)
    page.locator('#books .book-open').click(); idle(page)
    page.fill('#book-title', 'Una història que continua')
    page.locator('#book-title').dispatch_event('change')
    page.click('#save-book'); idle(page)
    page.click('#back'); idle(page)
    expect(page.locator('#books .book-open')).to_have_text('Una història que continua')
    page.reload()
    expect(page.locator('#books .book-open')).to_have_text('Una història que continua')
    page.locator('#books .book-open').click(); idle(page)
    expect(page.locator('#book-title')).to_have_value('Una història que continua')
    expect(page.locator('.page-tab')).to_have_count(3)
    context.close()
