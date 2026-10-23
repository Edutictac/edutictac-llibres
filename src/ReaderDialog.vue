<script setup>
import { ref, shallowRef } from "vue";
const emit = defineEmits(['example-close']);
const props = defineProps({ core: Object });
const t = props.core.t,
  dialog = ref(null),
  title = ref(""),
  slides = shallowRef([]),
  index = ref(0),
  preview = ref(false),
  download = ref('');
function renderSlide(el, { value: slide }) {
  el.replaceChildren();
  if (!slide?.svg) {
    el.textContent = t("readEmpty");
    return;
  }
  const clean = DOMPurify.sanitize(slide.svg, {
    USE_PROFILES: { svg: true, svgFilters: true },
    ADD_TAGS: ["image"],
    ADD_DATA_URI_TAGS: ["image"],
    ADD_ATTR: ["href"],
    ALLOW_UNKNOWN_PROTOCOLS: false,
  });
  const doc = new DOMParser().parseFromString(clean, "image/svg+xml");
  if (doc.documentElement.localName === "svg") {
    doc.documentElement.setAttribute("role", "img");
    doc.documentElement.setAttribute("aria-label", slide.title);
    el.append(document.importNode(doc.documentElement, true));
  }
}
const vSafeSlide = { mounted: renderSlide, updated: renderSlide };
function open(name, pages, options = {}) {
  title.value = name;
  slides.value = pages;
  index.value = 0;
  preview.value = options.preview === true;
  download.value = options.download || '';
  dialog.value.showModal();
}
function restore() {
  if (preview.value) emit('example-close');
  else props.core.resume();
}
function close() {
  dialog.value.close();
  restore();
}
defineExpose({ open });
</script>

<template>
  <dialog
    id="reader"
    ref="dialog"
    aria-labelledby="reader-title"
    @cancel="restore"
  >
    <div class="reader-toolbar">
      <button id="close-reader" @click="close">{{ t(preview ? 'close' : "returnEdit") }}</button
      ><strong id="reader-title">{{ title }}</strong
      ><button
        id="export-html"
        v-if="!preview"
        @click="
          core.action(() => core.exportBook('html5', '.zip'), 'exporting')
        "
      >
        {{ t("html") }}</button
      ><button
        id="export-epub"
        v-if="!preview"
        @click="
          core.action(() => core.exportBook('epub3', '.epub'), 'exporting')
        "
      >
        EPUB
      </button>
      <a v-if="preview" id="reader-download-example" :href="download" download>{{ t('demoDownload') }}</a>
    </div>
    <div
      id="reader-page"
      v-safe-slide="slides[index]"
      class="reader-page"
    ></div>
    <div class="reader-navigation">
      <button id="prev" :disabled="index <= 0" @click="index--">
        {{ t("prev") }}</button
      ><span id="reader-position">{{ index + 1 }} / {{ slides.length }}</span
      ><button
        id="next"
        :disabled="index >= slides.length - 1"
        @click="index++"
      >
        {{ t("next") }}
      </button>
    </div>
  </dialog>
</template>
