import { nextTick, reactive } from "vue";
import { Editor } from "/adapter.js";
import { saveBook, uid } from "/store.js";
import { messages } from "/i18n.js";
import { inspectBook } from "/import.js";
import { publicationPackage, coverImage } from "/publication.js";

import { preferredLocale, supportedLanguages } from "/locale.js";

// Vue receives display state only. eXe instances, DOM and project bytes remain
// ordinary objects so they can cross the bridge and IndexedDB unchanged.
export function createWorkshop(view) {
  const state = reactive({
    locale: preferredLocale(),
    active: false,
    busy: false,
    busyKey: "working",
    statusKey: "",
    title: "",
    pages: [],
    selected: null,
    contentIndex: -1,
    contentCount: 0,
    automatic: false,
    comic: false,
    comicPanels: 0,
    comicPanelIndex: 0,
    newComicLayout: 2,
    bubbleSelected: false,
    advanced: false,
    publicationEnabled: false,
    rebostEnabled: false,
    notice: "",
    noticeError: false,
  });
  let editor,
    book,
    selected,
    dirty = false,
    noticeTimer,
    resumePending = false;
  const t = (key) => messages[state.locale][key] || key;
  function notice(message, error = false) {
    state.notice = message;
    state.noticeError = error;
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(
      () => {
        state.notice = "";
      },
      error ? 12000 : 4500,
    );
  }
  async function action(fn, key = "working") {
    if (state.busy) return;
    state.busy = true;
    state.busyKey = key;
    try {
      return await fn();
    } catch (error) {
      console.error("Llibres:", error);
      const known = [
        "invalid",
        "imageError",
        "rebostSession",
        "rebostError",
        "rebostChanged",
        "comicChoosePage",
        "comicSelectBubble",
        "comicTextTooLong",
      ];
      notice(
        t(
          known.includes(error.message) ||
            /^(publication_|review_)/.test(error.message) ||
            error.message === "invalid_publication"
            ? error.message
            : error.name === "QuotaExceededError"
              ? "storageError"
              : "error",
        ),
        true,
      );
      return false;
    } finally {
      if (resumePending && state.active && book) {
        resumePending = false;
        try {
          await select();
        } catch {
          notice(t("error"), true);
        }
      }
      state.busy = false;
      await nextTick();
    }
  }
  function language(value, remember = true) {
    if (!supportedLanguages.includes(value)) return;
    state.locale = value;
    try { localStorage.setItem("llibres-language", state.locale); } catch {}
    if (remember) window.commonsLanguage?.remember(state.locale);
    document.documentElement.lang =
      state.locale === "va" ? "ca-valencia" : state.locale;
  }
  function markDirty() {
    if (!book) return;
    dirty = true;
    state.statusKey = "pending";
  }
  function refreshPages() {
    state.pages = editor.pages().map(({ id, pageName }) => ({ id, pageName }));
    const content = editor.contentPages();
    state.selected = selected;
    state.contentCount = content.length;
    state.contentIndex = content.findIndex((p) => p.id === selected);
    state.automatic = state.contentIndex < 0;
    const comic = editor.comicInfo();
    state.comic = comic.enabled;
    state.comicPanels = state.automatic ? 0 : comic.layout;
    state.comicPanelIndex = Math.min(state.comicPanelIndex, Math.max(0,state.comicPanels-1));
    editor.comicPanelIndex = state.comicPanelIndex;
    state.bubbleSelected = !state.automatic && !!editor.selectedBubble();
    editor.window.document.body.classList.toggle(
      "llibres-credits",
      state.automatic,
    );
    editor.window.frameElement.inert = state.automatic;
  }
  async function mount() {
    state.active = true;
    state.advanced = false;
    await nextTick();
    const prefs = JSON.parse(
      localStorage.getItem("exe_user_preferences") || "{}",
    );
    prefs.userPreferences ||= {};
    prefs.userPreferences.locale = {
      value: state.locale === "va" ? "ca-valencia" : state.locale,
    };
    localStorage.setItem("exe_user_preferences", JSON.stringify(prefs));
    const frame = document.createElement("iframe");
    frame.id = "engine";
    frame.title = t("edit");
    frame.src = "/engine/index.html";
    view.host().replaceChildren(frame);
    editor = new Editor(frame);
    editor.comicSelectionChanged = () => { state.bubbleSelected = !!editor.selectedBubble(); };
    await editor.ready();
    editor.changed = markDirty;
    editor.connectImagePicker(pickImage);
  }
  async function persist(reedit = true) {
    if (!book) return;
    state.statusKey = "saving";
    const bytes = await editor.save();
    const updated = {
      ...book,
      title: editor.title() || t("title"),
      bytes,
      pageCount: editor.pages().length,
      updatedAt: Date.now(),
    };
    await saveBook(updated);
    book = updated;
    dirty = false;
    state.statusKey = "saved";
    if (!editor.pages().some((p) => p.id === selected))
      selected = editor.contentPages()[0].id;
    if (reedit) await editor.select(selected);
    refreshPages();
    dirty = false;
    state.statusKey = "saved";
  }
  async function create({ title, template, layout = 2 }) {
    book = null;
    await mount();
    book = {
      id: uid(),
      template,
      language: state.locale,
      title,
      createdAt: Date.now(),
    };
    state.newComicLayout = [2,3,4].includes(layout) ? layout : 2;
    selected = await editor.create(title, template, state.locale, state.newComicLayout);
    state.title = title;
    refreshPages();
    await persist();
  }
  async function openStored(value) {
    book = null;
    await mount();
    book = value;
    selected = await editor.open(value.bytes);
    state.newComicLayout = editor.comicInfo().defaultLayout;
    state.title = editor.title();
    refreshPages();
    dirty = false;
    state.statusKey = "saved";
  }
  async function importFile(file) {
    if (!file) return;
    const safe = await inspectBook(await file.arrayBuffer());
    book = null;
    await mount();
    book = {
      id: uid(),
      language: state.locale,
      template: "import",
      title: file.name,
      createdAt: Date.now(),
    };
    selected = await editor.open(safe);
    state.newComicLayout = editor.comicInfo().defaultLayout;
    state.title = editor.title();
    refreshPages();
    await persist();
  }
  function renameTitle() {
    const title = state.title.trim();
    if (title) {
      editor.title(title);
      book.title = title;
      markDirty();
    }
  }
  async function back() {
    await persist(false);
    book = null;
    dirty = false;
    state.active = false;
    syncLanguage();
    view.host().replaceChildren();
    await view.refreshShelf();
  }
  async function select(id = selected) {
    await editor.select(id);
    selected = id;
    refreshPages();
  }
  async function addPage() {
    selected = await editor.addPage(
      t("page") + " " + editor.contentPages().length,
      state.comic ? Number(state.newComicLayout) : 0,
    );
    markDirty();
    refreshPages();
  }
  async function move(direction) {
    await editor.move(selected, direction);
    markDirty();
    refreshPages();
  }
  async function renamePage() {
    const old = editor.pages().find((p) => p.id === selected)?.pageName;
    const name = prompt(t("renamePrompt"), old);
    if (name?.trim()) {
      await editor.rename(selected, name.trim().slice(0, 120));
      markDirty();
      refreshPages();
    }
  }
  async function deletePage() {
    if (editor.contentPages().length <= 1) return notice(t("onePage"));
    if (confirm(t("deletePage"))) {
      selected = await editor.delete(selected);
      markDirty();
      refreshPages();
    }
  }
  async function drawing(enabled) {
    await editor.drawing(enabled);
    if (enabled) markDirty();
  }
  function advanced() {
    const simple =
      editor.window.document.body.classList.toggle("llibres-simple");
    state.advanced = !simple;
  }
  function download(bytes, name, type = "application/octet-stream") {
    const url = URL.createObjectURL(new Blob([bytes], { type }));
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }
  const filename = (extension) =>
    (book.title || "llibre").replace(/[^\p{L}\p{N} _-]/gu, "").slice(0, 70) +
    extension;
  async function downloadBook() {
    await persist();
    download(book.bytes, filename(".elpx"), "application/zip");
    notice(t("downloaded"));
  }
  async function exportBook(format, extension) {
    const result = await editor.export(format);
    download(result.bytes, filename(extension), result.mimeType);
  }
  async function read() {
    await persist(false);
    view.read(book.title, await editor.slides());
  }
  function resume() {
    if (state.busy) resumePending = true;
    else action(() => select());
  }
  function pickImage() {
    if (state.busy || !book) return;
    if (state.rebostEnabled) view.pick();
    else view.deviceImage();
  }
  const context = () => ({ bookId: book?.id, pageId: selected, editor });
  const matches = (target) =>
    target.bookId === book?.id &&
    target.pageId === selected &&
    target.editor === editor;
  async function image(file, credit) {
    if (!file) return;
    await editor.image(file, credit);
    if (credit) await editor.select(selected);
    refreshPages();
  }
  function chooseComicPanel(value = state.comicPanelIndex) {
    state.comicPanelIndex = Math.min(Math.max(0,Number(value)||0),Math.max(0,state.comicPanels-1));
    editor.comicPanelIndex = state.comicPanelIndex;
  }
  function bubbleDraft() { return editor.bubbleDraft(); }
  async function writeBubble(draft) {
    await editor.writeBubble(draft);
    markDirty();
    notice('');
  }
  async function publicationData() {
    await persist(false);
    return {
      id: book.id,
      title: book.title,
      cover: await coverImage((await editor.slides())[0].svg),
    };
  }
  const packageBook = (metadata) =>
    publicationPackage(editor, book, {
      ...metadata,
      language: book.language || state.locale,
    });
  function beforeUnload(event) {
    if (dirty) {
      event.preventDefault();
      event.returnValue = "";
    }
  }
  async function start() {
    language(state.locale);
    window.addEventListener("pageshow", syncLanguage);
    window.addEventListener("focus", syncLanguage);
    window.addEventListener("beforeunload", beforeUnload);
    for (const [path, field] of [
      ["publication", "publicationEnabled"],
      ["rebost", "rebostEnabled"],
    ])
      fetch("/" + path + "-status", { cache: "no-store" })
        .then(async (r) => {
          if (r.ok) {
            const enabled = (await r.json()).enabled;
            state[field] = enabled === true || (field === "publication" && Array.isArray(enabled) && enabled.includes("recursos"));
          }
        })
        .catch(() => {});
    try {
      await view.refreshShelf();
    } catch {
      notice(t("storageError"), true);
    }
  }
  function syncLanguage() {
    // Keep an open book and the engine in their current language.
    if (!state.active) language(preferredLocale(true));
  }
  function dispose() {
    window.removeEventListener("pageshow", syncLanguage);
    window.removeEventListener("focus", syncLanguage);
    clearTimeout(noticeTimer);
    window.removeEventListener("beforeunload", beforeUnload);
  }
  return {
    state,
    t,
    notice,
    action,
    language,
    start,
    dispose,
    create,
    openStored,
    importFile,
    renameTitle,
    persist,
    back,
    select,
    addPage,
    move,
    renamePage,
    deletePage,
    drawing,
    advanced,
    downloadBook,
    exportBook,
    read,
    pickImage,
    image,
    chooseComicPanel,
    bubbleDraft,
    writeBubble,
    context,
    matches,
    publicationData,
    packageBook,
    resume,
  };
}
