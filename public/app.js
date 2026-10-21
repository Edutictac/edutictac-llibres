import { Editor } from "./adapter.js";
import { allBooks, saveBook, removeBook, uid } from "./store.js";
import { messages } from "./i18n.js";
import { inspectBook } from "./import.js";
import { fetchImage, selection } from "./rebost.js";
import {
  publicationRequest,
  publicationPackage,
  coverImage,
  safeWebURL,
} from "./publication.js";
const $ = (id) => document.getElementById(id);
let lang = localStorage.getItem("llibres-language") === "va" ? "va" : "es";
let editor,
  book,
  selected,
  dirty = false,
  working = false,
  readerSlides = [],
  readerIndex = 0,
  noticeTimer;
const t = (key) => messages[lang][key] || key;
let rebostEnabled = false,
  picking = null;
let currentPublication = null,
  publicationCoverURL = "",
  sharedOffset = 0,
  sharedSerial = 0;
fetch("/publication-status", { cache: "no-store" })
  .then(async (r) => {
    if (!r.ok || (await r.json()).enabled !== true) return;
    $("publish-book").hidden = false;
    $("open-shared").hidden = false;
  })
  .catch(() => {});
fetch("/rebost-status", { cache: "no-store" })
  .then(async (r) => {
    rebostEnabled = r.ok && (await r.json()).enabled === true;
  })
  .catch(() => {});
function notice(message, error = false) {
  $("notice").textContent = message;
  $("notice").classList.toggle("error", error);
  $("notice").hidden = false;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(
    () => ($("notice").hidden = true),
    error ? 12000 : 4500,
  );
}
function language() {
  document.documentElement.lang = lang === "va" ? "ca-valencia" : "es";
  $("language").value = lang;
  document
    .querySelectorAll("[data-i18n]")
    .forEach((n) => (n.textContent = t(n.dataset.i18n)));
  $("title").placeholder =
    lang === "va" ? "El meu primer llibre" : "Mi primer libro";
  $("book-title").setAttribute("aria-label", t("title"));
  $("close-create").setAttribute("aria-label", t("close"));
  $("shared-search").setAttribute("aria-label", t("searchBooksLabel"));
  $("published-frame").title = t("publishedBook");
  $("publication-sign-in").href =
    "/api/auth/oidc/login?next=" +
    encodeURIComponent("/llibres-login.html?lang=" + lang);
}
function markDirty() {
  if (!book) return;
  dirty = true;
  $("save-status").textContent = t("pending");
}
async function action(fn, message = "working") {
  if (working) return;
  working = true;
  $("busy-text").textContent = t(message);
  $("busy").hidden = false;
  try {
    return await fn();
  } catch (error) {
    console.error("Llibres:", error);
    if ($("publish-dialog").open)
      $("publication-feedback").textContent =
        t(error.message) === error.message
          ? t("publication_unavailable")
          : t(error.message);
    if ($("shared-dialog").open)
      $("shared-status").textContent = t("publication_unavailable");
    notice(
      t(
        [
          "invalid",
          "imageError",
          "rebostSession",
          "rebostError",
          "rebostChanged",
        ].includes(error.message) ||
          error.message.startsWith("publication_") ||
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
    working = false;
    $("busy").hidden = true;
  }
}
function renderPages() {
  const pages = editor.pages();
  $("pages").replaceChildren();
  $("page-count").textContent = pages.length;
  for (const [i, p] of pages.entries()) {
    const li = document.createElement("li"),
      button = document.createElement("button");
    button.className = "page-tab";
    button.dataset.id = p.id;
    button.setAttribute("aria-current", String(p.id === selected));
    button.textContent = p.pageName;
    const number = document.createElement("small");
    number.textContent = t("page") + " " + (i + 1);
    button.prepend(number);
    button.onclick = () =>
      action(async () => {
        await editor.select(p.id);
        selected = p.id;
        renderPages();
      });
    li.append(button);
    $("pages").append(li);
  }
  $("page-name").textContent =
    pages.find((p) => p.id === selected)?.pageName || "";
  const content = editor.contentPages();
  const i = content.findIndex((p) => p.id === selected);
  const automatic = i < 0;
  if (automatic) $("page-name").textContent = t("automaticCredits");
  document.querySelector(".pages-panel .tip").textContent = t(
    automatic ? "creditsHint" : "tip",
  );
  editor.window.document.body.classList.toggle("llibres-credits", automatic);
  $("move-up").disabled = automatic || i <= 0;
  $("move-down").disabled = automatic || i >= content.length - 1;
  $("delete-page").disabled = automatic || content.length <= 1;
  $("rename-page").disabled = automatic;
  $("add-page").disabled = content.length >= 50;
  for (const id of ["edit-page", "add-image", "draw", "select", "advanced"])
    $(id).disabled = automatic;
  $("engine").inert = automatic;
}
async function renderShelf() {
  const books = (await allBooks()).sort((a, b) => b.updatedAt - a.updatedAt);
  $("books").replaceChildren();
  $("book-count").textContent = books.length;
  if (!books.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = t("empty");
    $("books").append(empty);
  }
  for (const b of books) {
    const card = document.createElement("article");
    card.className = "book-card";
    const open = document.createElement("button");
    open.className = "book-open";
    open.textContent = b.title;
    open.onclick = () => action(() => openStored(b), "loading");
    const date = document.createElement("p");
    date.textContent =
      new Date(b.updatedAt).toLocaleDateString(
        lang === "va" ? "ca-ES" : "es-ES",
      ) +
      " · " +
      b.pageCount +
      " " +
      t("pages").toLowerCase();
    const remove = document.createElement("button");
    remove.className = "delete-book";
    remove.textContent = "×";
    remove.setAttribute("aria-label", t("deleteLabel") + ": " + b.title);
    remove.onclick = () =>
      action(async () => {
        if (confirm(t("deleteBook"))) {
          await removeBook(b.id);
          await renderShelf();
        }
      });
    card.append(open, date, remove);
    $("books").append(card);
  }
}
async function mount() {
  $("home").hidden = true;
  $("workspace").hidden = false;
  $("language").disabled = true;
  const prefs = JSON.parse(
    localStorage.getItem("exe_user_preferences") || "{}",
  );
  prefs.userPreferences ||= {};
  prefs.userPreferences.locale = {
    value: lang === "va" ? "ca-valencia" : "es",
  };
  localStorage.setItem("exe_user_preferences", JSON.stringify(prefs));
  const frame = document.createElement("iframe");
  frame.id = "engine";
  frame.title = t("edit");
  frame.src = "/engine/index.html";
  $("engine-host").replaceChildren(frame);
  editor = new Editor(frame);
  await editor.ready();
  editor.changed = markDirty;
  editor.connectImagePicker(pickImage);
}
async function persist(reedit = true) {
  if (!book) return;
  $("save-status").textContent = t("saving");
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
  $("save-status").textContent = t("saved");
  if (!editor.pages().some((p) => p.id === selected))
    selected = editor.contentPages()[0].id;
  if (reedit) await editor.select(selected);
  renderPages();
  dirty = false;
  $("save-status").textContent = t("saved");
}
async function openStored(value) {
  book = null;
  await mount();
  book = value;
  selected = await editor.open(value.bytes);
  $("book-title").value = editor.title();
  renderPages();
  dirty = false;
  $("save-status").textContent = t("saved");
}
function download(bytes, name, type = "application/octet-stream") {
  const url = URL.createObjectURL(new Blob([bytes], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
function filename(extension) {
  return (
    (book.title || "llibre").replace(/[^\p{L}\p{N} _-]/gu, "").slice(0, 70) +
    extension
  );
}
function renderReader() {
  const slide = readerSlides[readerIndex];
  $("reader-page").replaceChildren();
  if (slide?.svg) {
    const clean = DOMPurify.sanitize(slide.svg, {
      USE_PROFILES: { svg: true, svgFilters: true },
      ADD_TAGS: ["image"],
      ADD_DATA_URI_TAGS: ["image"],
      ADD_ATTR: ["href"],
      ALLOW_UNKNOWN_PROTOCOLS: false,
    });
    const doc = new DOMParser().parseFromString(clean, "image/svg+xml");
    const root = doc.documentElement;
    if (root.localName === "svg") {
      $("reader-page").append(document.importNode(root, true));
      root.setAttribute("role", "img");
      root.setAttribute("aria-label", slide.title);
    }
  } else $("reader-page").textContent = t("readEmpty");
  $("reader-position").textContent =
    readerIndex + 1 + " / " + readerSlides.length;
  $("prev").disabled = readerIndex <= 0;
  $("next").disabled = readerIndex >= readerSlides.length - 1;
}
$("new-book").onclick = () => {
  $("create-dialog").showModal();
  $("title").focus();
};
$("close-create").onclick = () => $("create-dialog").close();
$("create-form").onsubmit = (event) => {
  event.preventDefault();
  const title = $("title").value.trim();
  if (!title) return;
  const template = new FormData(event.target).get("template");
  $("create-dialog").close();
  action(async () => {
    book = null;
    await mount();
    book = {
      id: uid(),
      template,
      language: lang,
      title,
      createdAt: Date.now(),
    };
    selected = await editor.create(title, template, lang);
    $("book-title").value = title;
    renderPages();
    await persist();
  }, "loading");
};
$("open-book").onclick = () => $("file-input").click();
$("file-input").onchange = () =>
  action(async () => {
    const file = $("file-input").files[0];
    $("file-input").value = "";
    if (!file) return;
    const bytes = await file.arrayBuffer();
    const safeBytes = await inspectBook(bytes);
    book = null;
    await mount();
    book = {
      id: uid(),
      language: lang,
      template: "import",
      title: file.name,
      createdAt: Date.now(),
    };
    selected = await editor.open(safeBytes);
    $("book-title").value = editor.title();
    renderPages();
    await persist();
  }, "loading");
$("save-book").onclick = () => action(() => persist(), "saving");
$("download").onclick = () =>
  action(async () => {
    await persist();
    download(book.bytes, filename(".elpx"), "application/zip");
    notice(t("downloaded"));
  }, "saving");
$("book-title").onchange = () => {
  const title = $("book-title").value.trim();
  if (title) {
    editor.title(title);
    book.title = title;
    markDirty();
  }
};
$("back").onclick = () =>
  action(async () => {
    await persist(false);
    book = null;
    dirty = false;
    $("workspace").hidden = true;
    $("home").hidden = false;
    $("language").disabled = false;
    $("engine-host").replaceChildren();
    await renderShelf();
  }, "saving");
$("add-page").onclick = () =>
  action(async () => {
    selected = await editor.addPage(
      t("page") + " " + editor.contentPages().length,
    );
    markDirty();
    renderPages();
  });
$("move-up").onclick = () =>
  action(async () => {
    await editor.move(selected, -1);
    markDirty();
    renderPages();
  });
$("move-down").onclick = () =>
  action(async () => {
    await editor.move(selected, 1);
    markDirty();
    renderPages();
  });
$("rename-page").onclick = () => {
  const old = editor.pages().find((p) => p.id === selected)?.pageName;
  const name = prompt(t("renamePrompt"), old);
  if (name?.trim())
    action(async () => {
      await editor.rename(selected, name.trim().slice(0, 120));
      markDirty();
      renderPages();
    });
};
$("delete-page").onclick = () => {
  if (editor.contentPages().length <= 1) return notice(t("onePage"));
  if (confirm(t("deletePage")))
    action(async () => {
      selected = await editor.delete(selected);
      markDirty();
      renderPages();
    });
};
$("edit-page").onclick = () => action(() => editor.select(selected));
$("draw").onclick = () =>
  action(async () => {
    await editor.drawing(true);
    markDirty();
  });
$("select").onclick = () => action(() => editor.drawing(false));
$("advanced").onclick = () => {
  const simple = editor.window.document.body.classList.toggle("llibres-simple");
  $("advanced").textContent = t(simple ? "advanced" : "editSimple");
};
$("read").onclick = () =>
  action(async () => {
    await persist(false);
    readerSlides = await editor.slides();
    readerIndex = 0;
    $("reader-title").textContent = book.title;
    renderReader();
    $("reader").showModal();
  });
$("close-reader").onclick = () => {
  $("reader").close();
  action(() => editor.select(selected));
};
$("reader").addEventListener("cancel", () =>
  action(() => editor.select(selected)),
);
$("prev").onclick = () => {
  readerIndex--;
  renderReader();
};
$("next").onclick = () => {
  readerIndex++;
  renderReader();
};
for (const [id, format, extension] of [
  ["export-html", "html5", ".zip"],
  ["export-epub", "epub3", ".epub"],
])
  $(id).onclick = () =>
    action(async () => {
      const result = await editor.export(format);
      download(result.bytes, filename(extension), result.mimeType);
    }, "exporting");
$("language").onchange = async () => {
  lang = $("language").value;
  localStorage.setItem("llibres-language", lang);
  language();
  await renderShelf();
};
window.addEventListener("beforeunload", (event) => {
  if (dirty) {
    event.preventDefault();
    event.returnValue = "";
  }
});
language();
renderShelf().catch(() => notice(t("storageError"), true));

function closePicker() {
  picking?.controller.abort();
  picking = null;
  $("image-picker").close();
  $("rebost-host").replaceChildren();
}
function showRebost(type = "sprite") {
  picking?.controller.abort();
  const request = uid(),
    controller = new AbortController();
  const frame = document.createElement("iframe");
  frame.id = "rebost-frame";
  frame.title = t("rebost");
  frame.onload = () => {
    if (
      picking?.frame === frame &&
      !frame.contentDocument?.getElementById("status")
    )
      notice(t("rebostError"), true);
  };
  frame.src =
    "/assets/?" + new URLSearchParams({ mode: "pick", type, request, lang });
  picking = {
    request,
    controller,
    frame,
    bookId: book.id,
    pageId: selected,
    editor,
  };
  $("rebost-host").replaceChildren(frame);
}
function pickImage() {
  if (working || !book) return;
  if (!rebostEnabled) return $("image-input").click();
  $("image-picker").showModal();
  showRebost();
}
$("add-image").onclick = pickImage;
$("close-image-picker").onclick = closePicker;
$("image-picker").addEventListener("cancel", closePicker);
$("device-image").onclick = () => {
  closePicker();
  $("image-input").click();
};
$("rebost-sprites").onclick = () => showRebost("sprite");
$("rebost-backgrounds").onclick = () => showRebost("background");
$("refresh-rebost").onclick = () =>
  showRebost(new URL(picking.frame.src).searchParams.get("type"));
window.addEventListener("message", (event) => {
  const target = picking;
  if (!target || !selection(event, target.frame.contentWindow, target.request))
    return;
  if (event.data.cancel) return closePicker();
  action(async () => {
    const timeout = setTimeout(() => target.controller.abort(), 30000);
    try {
      const result = await fetchImage(
        event.data.id,
        lang,
        target.controller.signal,
      );
      if (
        picking !== target ||
        book?.id !== target.bookId ||
        selected !== target.pageId ||
        editor !== target.editor
      )
        return;
      await editor.image(result.file, result.credit);
      await editor.select(selected);
      renderPages();
      closePicker();
    } catch (error) {
      if (picking === target) throw error;
    } finally {
      clearTimeout(timeout);
    }
  });
});
$("image-input").onchange = () =>
  action(async () => {
    const file = $("image-input").files[0];
    $("image-input").value = "";
    if (file) await editor.image(file);
  });

function publicationStatus(value) {
  currentPublication = value;
  $("publication-current").hidden = !value.published;
  $("publication-success-title").textContent = t("publicationDone");
  if (value.url) $("publication-link").href = safeWebURL(value.url);
  $("confirm-publish").textContent = t(
    value.published ? "updatePublication" : "publishBook",
  );
}
async function preparePublication() {
  $("publication-feedback").textContent = "";
  $("publication-login").hidden = true;
  $("publish-form").hidden = true;
  $("publication-current").hidden = true;
  currentPublication = null;
  const permission = await publicationRequest("/me");
  if (!permission.can_publish) {
    $("publication-login").hidden = false;
    if (permission.reason === "publication_teacher_required")
      $("publication-feedback").textContent = t(permission.reason);
    return;
  }
  await persist(false);
  const value = await publicationRequest(
    "/mine/" + encodeURIComponent(book.id),
  );
  publicationStatus(value);
  $("publish-title").textContent = book.title;
  $("publish-author").value = value.author || "";
  $("publish-description").value = value.description || "";
  $("publish-license").value = value.license || "CC-BY-SA-4.0";
  $("publish-editable").checked = !!value.editable;
  $("publish-confirm").checked = false;
  const pages = await editor.slides();
  const cover = await coverImage(pages[0].svg);
  URL.revokeObjectURL(publicationCoverURL);
  publicationCoverURL = URL.createObjectURL(cover);
  $("publish-cover").src = publicationCoverURL;
  $("publish-form").hidden = false;
}
$("publish-book").onclick = () => {
  $("publish-dialog").showModal();
  action(preparePublication);
};
$("check-publication-login").onclick = () => action(preparePublication);
function refreshPublicationAfterLogin() {
  if (
    !working &&
    document.visibilityState !== "hidden" &&
    $("publish-dialog").open &&
    !$("publication-login").hidden
  )
    action(preparePublication);
}
window.addEventListener("focus", refreshPublicationAfterLogin);
document.addEventListener("visibilitychange", refreshPublicationAfterLogin);
function closePublication() {
  $("publish-dialog").close();
  URL.revokeObjectURL(publicationCoverURL);
  publicationCoverURL = "";
  action(() => editor.select(selected));
}
$("close-publish").onclick = closePublication;
$("publish-dialog").addEventListener("cancel", closePublication);
$("publish-form").onsubmit = (event) => {
  event.preventDefault();
  if (!currentPublication || !$("publish-confirm").checked) return;
  action(async () => {
    const wasPublished = currentPublication.published;
    $("publication-feedback").textContent = "";
    const bytes = await publicationPackage(editor, book, {
      author: $("publish-author").value.trim(),
      description: $("publish-description").value.trim(),
      license: $("publish-license").value,
      language: book.language || lang,
      editable: $("publish-editable").checked,
    });
    publicationStatus(
      await publicationRequest("/mine/" + encodeURIComponent(book.id), {
        method: "POST",
        headers: {
          "Content-Type": "application/zip",
          "If-Match": '"' + currentPublication.revision + '"',
        },
        body: bytes,
      }),
    );
    $("publish-confirm").checked = false;
    $("publication-success-title").textContent = t(
      wasPublished ? "publicationUpdated" : "publicationDone",
    );
    $("publication-success-title").focus({ preventScroll: true });
    $("publish-dialog").scrollTop = 0;
    notice(t(wasPublished ? "publicationUpdated" : "publicationDone"));
  }, "publishing");
};
$("withdraw-publication").onclick = () => {
  if (!currentPublication?.published || !confirm(t("withdrawConfirm"))) return;
  action(async () => {
    publicationStatus(
      await publicationRequest("/mine/" + encodeURIComponent(book.id), {
        method: "DELETE",
        headers: { "If-Match": '"' + currentPublication.revision + '"' },
      }),
    );
    notice(t("publicationWithdrawn"));
  });
};
$("copy-publication").onclick = () =>
  action(async () => {
    const url = safeWebURL(currentPublication.url);
    if (navigator.clipboard?.writeText)
      await navigator.clipboard.writeText(url);
    else {
      const input = document.createElement("textarea");
      input.value = url;
      document.body.append(input);
      input.select();
      const copied = document.execCommand("copy");
      input.remove();
      if (!copied) throw new Error("publication_copy_failed");
    }
    notice(t("publicationCopied"));
  });
function openPublished(item) {
  if (!/^[a-f0-9]{32}$/.test(item.external_id)) return;
  $("published-title").textContent = item.title;
  $("published-frame").src =
    "/api/llibres/public/" + item.external_id + "/index.html";
  $("published-reader").showModal();
}
async function sharedBooks(more = false) {
  const serial = ++sharedSerial;
  if (!more) {
    sharedOffset = 0;
    $("shared-books").replaceChildren();
  }
  $("shared-status").textContent = t("loading");
  const result = await publicationRequest(
    "/books?" +
      new URLSearchParams({
        q: $("shared-search").value,
        offset: sharedOffset,
        limit: 24,
      }),
  );
  if (serial !== sharedSerial || !$("shared-dialog").open) return;
  if (result.bank_url) {
    $("shared-bank").href = safeWebURL(result.bank_url);
    $("shared-bank").hidden = false;
  }
  for (const item of result.items) {
    if (!/^[a-f0-9]{32}$/.test(item.external_id)) continue;
    const card = document.createElement("article");
    card.className = "book-card";
    const image = document.createElement("img");
    image.src = "/api/llibres/public/" + item.external_id + "/cover.png";
    image.alt = "";
    image.loading = "lazy";
    const button = document.createElement("button");
    button.className = "book-open";
    button.textContent = item.title;
    button.onclick = () => openPublished(item);
    const author = document.createElement("p");
    author.textContent = item.author;
    card.append(image, button, author);
    $("shared-books").append(card);
  }
  sharedOffset += result.items.length;
  $("shared-more").hidden = !result.more;
  $("shared-status").textContent = $("shared-books").childElementCount
    ? ""
    : t("sharedEmpty");
}
$("open-shared").onclick = () => {
  $("shared-dialog").showModal();
  action(() => sharedBooks());
};
$("close-shared").onclick = () => {
  $("shared-dialog").close();
  sharedSerial++;
};
$("shared-dialog").addEventListener("cancel", () => sharedSerial++);
$("shared-search-form").onsubmit = (e) => {
  e.preventDefault();
  action(() => sharedBooks());
};
$("shared-more").onclick = () => action(() => sharedBooks(true));
$("close-published-reader").onclick = () => {
  $("published-reader").close();
  $("published-frame").removeAttribute("src");
};
$("published-reader").addEventListener("cancel", () =>
  $("published-frame").removeAttribute("src"),
);
