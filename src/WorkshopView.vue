<script setup>
import { computed, ref } from "vue";
const props = defineProps({ core: Object });
defineEmits(["publish"]);
const model = props.core.state,
  t = props.core.t,
  engineHost = ref(null);
const pageName = computed(() =>
  model.automatic
    ? t("automaticCredits")
    : model.pages.find((p) => p.id === model.selected)?.pageName || "",
);
defineExpose({ host: () => engineHost.value });
</script>

<template>
  <section id="workspace" :hidden="!model.active" :aria-label="t('workshop')">
    <div class="book-toolbar">
      <button id="back" @click="core.action(core.back, 'saving')">
        {{ t("back") }}</button
      ><input
        id="book-title"
        v-model="model.title"
        :aria-label="t('title')"
        @change="core.renameTitle()"
        maxlength="120"
      /><span id="save-status" role="status">{{ t(model.statusKey) }}</span
      ><button id="save-book" @click="core.action(core.persist, 'saving')">
        {{ t("save") }}</button
      ><button id="download" @click="core.action(core.downloadBook, 'saving')">
        {{ t("download") }}</button
      ><button id="read" @click="core.action(core.read)" class="primary">
        {{ t("read") }}
      </button>
      <button
        id="publish-book"
        @click="$emit('publish')"
        :hidden="!model.publicationEnabled"
      >
        {{ t("publishBook") }}
      </button>
    </div>
    <div class="workspace-body">
      <aside class="pages-panel">
        <div class="section-heading">
          <h2>{{ t("pages") }}</h2>
          <span id="page-count">{{ model.pages.length }}</span>
        </div>
        <ol id="pages">
          <li v-for="(page, index) in model.pages" :key="page.id">
            <button
              class="page-tab"
              :data-id="page.id"
              :aria-current="String(page.id === model.selected)"
              @click="core.action(() => core.select(page.id))"
            >
              <small>{{ t("page") }} {{ index + 1 }}</small
              >{{ page.pageName }}
            </button>
          </li>
        </ol>
        <button
          id="add-page"
          :disabled="model.contentCount >= 50"
          @click="core.action(core.addPage)"
          class="add-page"
        >
          {{ t("addPage") }}
        </button>
        <div class="page-actions">
          <button
            id="move-up"
            :disabled="model.automatic || model.contentIndex <= 0"
            @click="core.action(() => core.move(-1))"
          >
            {{ t("up") }}</button
          ><button
            id="move-down"
            :disabled="
              model.automatic || model.contentIndex >= model.contentCount - 1
            "
            @click="core.action(() => core.move(1))"
          >
            {{ t("down") }}</button
          ><button
            id="rename-page"
            :disabled="model.automatic"
            @click="core.action(core.renamePage)"
          >
            {{ t("rename") }}</button
          ><button
            id="delete-page"
            :disabled="model.automatic || model.contentCount <= 1"
            @click="core.action(core.deletePage)"
          >
            {{ t("delete") }}
          </button>
        </div>
        <p class="tip">{{ t(model.automatic ? "creditsHint" : "tip") }}</p>
      </aside>
      <div class="editor-panel">
        <div class="editor-toolbar">
          <span id="page-name">{{ pageName }}</span
          ><button
            id="edit-page"
            :disabled="model.automatic"
            @click="core.action(() => core.select())"
          >
            {{ t("edit") }}</button
          ><button
            id="add-image"
            :disabled="model.automatic"
            @click="core.pickImage()"
          >
            {{ t("image") }}</button
          ><button
            id="draw"
            :disabled="model.automatic"
            @click="core.action(() => core.drawing(true))"
          >
            {{ t("draw") }}</button
          ><button
            id="select"
            :disabled="model.automatic"
            @click="core.action(() => core.drawing(false))"
          >
            {{ t("select") }}</button
          ><button
            id="advanced"
            :disabled="model.automatic"
            @click="core.advanced()"
          >
            {{ t(model.advanced ? "editSimple" : "advanced") }}
          </button>
        </div>
        <div id="engine-host" ref="engineHost"></div>
      </div>
    </div>
  </section>
</template>
