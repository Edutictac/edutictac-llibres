<script setup>
import { nextTick, ref, shallowRef } from "vue";
import { allBooks, removeBook } from "/store.js";
import { messages } from "/i18n.js";
import BookCard from "./BookCard.vue";

const props = defineProps({
  locale: String,
  action: Function,
  openBook: Function,
});
const t = (key) => messages[props.locale][key] || key;
// Keep stored project objects and their binary .elpx payloads out of deep
// reactivity: IndexedDB must receive cloneable data, never Vue proxies.
const books = shallowRef([]);
const busy = ref(false),
  list = ref(null);
let serial = 0;

async function refresh() {
  const sequence = ++serial;
  const stored = await allBooks();
  if (sequence !== serial) return;
  books.value = stored.sort((a, b) => b.updatedAt - a.updatedAt);
  await nextTick();
}
function task(fn, message = "working") {
  if (busy.value) return;
  return props.action(async () => {
    busy.value = true;
    try {
      return await fn();
    } finally {
      busy.value = false;
      await nextTick();
    }
  }, message);
}
function open(book) {
  return task(() => props.openBook(book), "loading");
}
function remove(book) {
  return task(async () => {
    if (!confirm(t("deleteBook"))) return;
    const index = books.value.findIndex((item) => item.id === book.id);
    await removeBook(book.id);
    await refresh();
    const remaining = list.value.querySelectorAll(".book-open");
    const target =
      remaining[Math.min(index, remaining.length - 1)] ||
      document.getElementById("new-book");
    // Wait for disabled controls to be enabled before restoring keyboard focus.
    busy.value = false;
    await nextTick();
    target.focus();
  });
}
defineExpose({ refresh });
</script>

<template>
  <section class="shelf" aria-labelledby="shelf-heading">
    <div class="section-heading">
      <h2 id="shelf-heading">{{ t("myBooks") }}</h2>
      <span id="book-count" role="status">{{ books.length }}</span>
    </div>
    <div id="books" ref="list" class="books">
      <div v-if="!books.length" class="empty">{{ t("empty") }}</div>
      <BookCard
        v-for="book in books"
        :key="book.id"
        :book="book"
        :locale="locale"
        :busy="busy"
        @open="open"
        @remove="remove"
      />
    </div>
  </section>
</template>
