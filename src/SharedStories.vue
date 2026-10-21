<script setup>
import { ref, onUnmounted, nextTick } from "vue";
import { publicationRequest, safeWebURL } from "/publication.js";
const props = defineProps({ core: Object });
const t = props.core.t,
  dialog = ref(null),
  reader = ref(null);
const query = ref(""),
  items = ref([]),
  bank = ref(""),
  more = ref(false);
const status = ref(""),
  selected = ref(null);
let offset = 0,
  serial = 0;
function task(fn) {
  return props.core.action(async () => {
    try {
      await fn();
    } catch (error) {
      if (dialog.value.open) status.value = "publication_unavailable";
      throw error;
    } finally {
      await nextTick();
    }
  });
}
async function load(append = false) {
  const sequence = ++serial;
  if (!append) {
    offset = 0;
    items.value = [];
    bank.value = "";
  }
  more.value = false;
  status.value = "loading";
  const result = await publicationRequest(
    "/books?" + new URLSearchParams({ q: query.value, offset, limit: 24 }),
  );
  if (sequence !== serial || !dialog.value.open) return;
  if (result.bank_url) bank.value = safeWebURL(result.bank_url);
  items.value.push(
    ...result.items.filter((item) => /^[a-f0-9]{32}$/.test(item.external_id)),
  );
  offset += result.items.length;
  more.value = !!result.more;
  status.value = items.value.length ? "" : "sharedEmpty";
}
function open() {
  dialog.value.showModal();
  task(() => load());
}
function close() {
  serial++;
  dialog.value.close();
}
function read(item) {
  selected.value = item;
  reader.value.showModal();
}
function closeReader() {
  reader.value.close();
  selected.value = null;
}
onUnmounted(() => serial++);
defineExpose({ open });
</script>
<template>
  <dialog
    id="shared-dialog"
    ref="dialog"
    aria-labelledby="shared-heading"
    @cancel="serial++"
  >
    <div class="dialog-heading">
      <h2 id="shared-heading">{{ t("sharedStories") }}</h2>
      <button id="close-shared" @click="close">{{ t("close") }}</button>
    </div>
    <p>{{ t("sharedIntro") }}</p>
    <a
      id="shared-bank"
      :hidden="!bank"
      :href="bank || undefined"
      target="_blank"
      rel="noopener"
      >{{ t("openBank") }}</a
    >
    <form id="shared-search-form" @submit.prevent="task(() => load())">
      <input
        id="shared-search"
        v-model="query"
        type="search"
        maxlength="200"
        :aria-label="t('searchBooksLabel')"
      />
      <button>{{ t("searchBooks") }}</button>
    </form>
    <p id="shared-status" role="status">{{ t(status) }}</p>
    <div id="shared-books" class="books">
      <article v-for="item in items" :key="item.external_id" class="book-card">
        <img
          :src="`/api/llibres/public/${item.external_id}/cover.png`"
          alt=""
          loading="lazy"
        />
        <button class="book-open" @click="read(item)">{{ item.title }}</button>
        <p>{{ item.author }}</p>
      </article>
    </div>
    <button id="shared-more" :hidden="!more" @click="task(() => load(true))">
      {{ t("moreBooks") }}
    </button>
  </dialog>
  <dialog
    id="published-reader"
    ref="reader"
    aria-labelledby="published-title"
    @cancel="selected = null"
  >
    <div class="dialog-heading">
      <h2 id="published-title">{{ selected?.title }}</h2>
      <button id="close-published-reader" @click="closeReader">
        {{ t("close") }}
      </button>
    </div>
    <iframe
      id="published-frame"
      :src="
        selected
          ? `/api/llibres/public/${selected.external_id}/index.html`
          : undefined
      "
      :title="t('publishedBook')"
      sandbox="allow-downloads"
    ></iframe>
  </dialog>
</template>
