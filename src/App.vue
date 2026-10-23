<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { createWorkshop } from "./workshop.js";
import Bookshelf from "./shelf/Bookshelf.vue";
import ReviewsPanel from "./reviews/ReviewsPanel.vue";
import CreateDialog from "./CreateDialog.vue";
import WorkshopView from "./WorkshopView.vue";
import ReaderDialog from "./ReaderDialog.vue";
import ImagePicker from "./ImagePicker.vue";
import PublicationDialog from "./PublicationDialog.vue";
import SharedStories from "./SharedStories.vue";
import DemoBook from "./DemoBook.vue";
import BubbleDialog from './BubbleDialog.vue';
import {loadExample, exampleSlugs} from '/examples.js';
const shelf = ref(null),
  reviews = ref(null),
  createDialog = ref(null),
  workshop = ref(null),
  reader = ref(null),
  picker = ref(null),
  publication = ref(null),
  shared = ref(null);
const bubble = ref(null);
const imageInput = ref(null),
  fileInput = ref(null);
const core = createWorkshop({
  host: () => workshop.value.host(),
  refreshShelf: () => shelf.value.refresh(),
  read: (title, pages) => reader.value.open(title, pages),
  pick: () => picker.value.open(),
  deviceImage: () => imageInput.value.click(),
});
const state = core.state,
  t = core.t;
function importFile(event) {
  const file = event.target.files[0];
  event.target.value = "";
  core.action(() => core.importFile(file), "loading");
}
function imageFile(event) {
  const file = event.target.files[0];
  event.target.value = "";
  if (file) core.action(() => core.image(file));
}
function openDemo(comic=false) {
  core.action(async () => {
    const slug=comic?'la-granota':'la-papallona';
    const response = await fetch('/examples/'+slug+'/'+slug+'.elpx');
    if (!response.ok) throw new Error('invalid');
    const bytes = await response.arrayBuffer();
    if (bytes.byteLength > 25 * 1024 * 1024) throw new Error('invalid');
    core.language('va', false);
    await core.importFile(new File([bytes], slug+'.elpx', {type:'application/zip'}));
  }, 'loading');
}
function readExample(slug) {
  return core.action(async () => {
    const value=await loadExample(slug);
    core.notice('');
    const url=new URL(location.href);url.searchParams.set('example',slug);
    history.replaceState(null,'',url);
    reader.value.open(value.title,value.slides,{preview:true,download:'/examples/'+slug+'/'+slug+'.elpx'});
  },'loading');
}
function closeExample() {
  const url=new URL(location.href);url.searchParams.delete('example');
  history.replaceState(null,'',url);
}
onMounted(async () => {
  await core.start();
  const slug=new URL(location.href).searchParams.get('example');
  if (exampleSlugs.includes(slug)) await readExample(slug);
});
onUnmounted(core.dispose);
</script>
<template>
  <header class="masthead">
    <a class="brand" href="/">◧ EduTicTac <b>Llibres</b></a
    ><select
      id="language"
      v-model="state.locale"
      :disabled="state.active"
      @change="core.language(state.locale)"
      aria-label="Idioma"
    >
      <option value="es">Castellano</option>
      <option value="ca">Català</option>
      <option value="va">Valencià</option>
      <option value="en">English</option>
    </select>
  </header>
  <main id="home" :hidden="state.active">
    <section class="hero">
      <div>
        <p class="eyebrow">{{ t("eyebrow") }}</p>
        <h1>{{ t("headline") }}</h1>
        <p class="intro">{{ t("intro") }}</p>
        <div class="actions">
          <button id="new-book" @click="createDialog.open()" class="primary">
            {{ t("new") }}</button
          ><button id="open-book" @click="fileInput.click()">
            {{ t("open") }}
          </button>
          <button
            id="open-shared"
            @click="shared.open()"
            :hidden="!state.publicationEnabled"
          >
            {{ t("sharedStories") }}
          </button>
          <button
            id="open-reviews"
            @click="reviews.open()"
            :hidden="!state.publicationEnabled"
          >
            {{ t("reviewBooks") }}
          </button>
        </div>
        <p class="storage-note">{{ t("local") }}</p>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="book-cover">
          <span>{{ t("coverTop") }}<br />{{ t("coverBottom") }}</span>
          <div class="sun"></div>
          <div class="hill"></div>
          <i>{{ t("storySubtitle") }}</i>
        </div>
        <span class="star">✳</span>
      </div>
    </section>
    <DemoBook :locale="state.locale" :busy="state.busy" @edit="openDemo(false)" @read="readExample('la-papallona')" />
    <DemoBook comic :locale="state.locale" :busy="state.busy" @edit="openDemo(true)" @read="readExample('la-granota')" />
    <Bookshelf
      ref="shelf"
      :locale="state.locale"
      :action="core.action"
      :open-book="core.openStored"
    />
    <footer>
      <span>{{ t("footer") }}</span
      ><a href="/about.html">{{ t("about") }}</a>
    </footer>
  </main>

  <WorkshopView ref="workshop" :core="core" @publish="publication.open()" @bubble="editing => bubble.open(editing)" />
  <BubbleDialog ref="bubble" :core="core" />
  <CreateDialog ref="createDialog" :locale="state.locale" :core="core" />
  <ReaderDialog ref="reader" :core="core" @example-close="closeExample" />
  <ImagePicker ref="picker" :core="core" @device="imageInput.click()" />
  <PublicationDialog ref="publication" :core="core" />
  <SharedStories ref="shared" :core="core" />
  <ReviewsPanel
    ref="reviews"
    :locale="state.locale"
    :action="core.action"
    :notice="core.notice"
  />
  <input
    id="image-input"
    ref="imageInput"
    type="file"
    accept="image/png,image/jpeg,image/webp"
    hidden
    @change="imageFile"
  />
  <input
    id="file-input"
    ref="fileInput"
    type="file"
    accept=".elpx"
    hidden
    @change="importFile"
  />
  <div
    id="notice"
    role="status"
    aria-live="polite"
    :class="{ error: state.noticeError }"
    :hidden="!state.notice"
  >
    {{ state.notice }}
  </div>
  <div id="busy" :hidden="!state.busy" role="status">
    <span class="spinner"></span
    ><span id="busy-text">{{ t(state.busyKey) }}</span>
  </div>
</template>
