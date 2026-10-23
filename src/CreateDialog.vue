<script setup>
import { ref } from "vue";
import { messages } from "/i18n.js";
const props = defineProps({ locale: String, core: Object });
const t = (key) => messages[props.locale][key] || key;
const dialog = ref(null),
  input = ref(null),
  title = ref(""),
  template = ref("story"),
  layout = ref(2);
function open() {
  dialog.value.showModal();
  input.value.focus();
}
function submit() {
  const name = title.value.trim();
  if (!name || !["story", "album", "blank", "comic"].includes(template.value)) return;
  dialog.value.close();
  props.core.action(
    () => props.core.create({ title: name, template: template.value, layout: Number(layout.value) }),
    "loading",
  );
}
defineExpose({ open });
</script>

<template>
  <dialog id="create-dialog" ref="dialog" aria-labelledby="create-heading">
    <form id="create-form" @submit.prevent="submit">
      <div class="dialog-heading">
        <h2 id="create-heading">{{ t("createTitle") }}</h2>
        <button
          type="button"
          class="icon-button"
          id="close-create"
          :aria-label="t('close')"
          @click="dialog.close()"
        >
          ×
        </button>
      </div>
      <label for="title">{{ t("title") }}</label
      ><input
        id="title"
        ref="input"
        v-model="title"
        :placeholder="
          t('firstBook')
        "
        required
        maxlength="120"
        autocomplete="off"
      />
      <fieldset>
        <legend>{{ t("template") }}</legend>
        <div class="templates">
          <label><input type="radio" v-model="template" name="template" value="comic" />
            <span class="template-card sage"><b>{{ t('comic') }}</b><small>{{ t('comicHelp') }}</small></span>
          </label>
          <label
            ><input
              type="radio"
              v-model="template"
              name="template"
              value="story"
            /><span class="template-card peach"
              ><b>{{ t("story") }}</b
              ><small>{{ t("storyHelp") }}</small></span
            ></label
          ><label
            ><input
              type="radio"
              v-model="template"
              name="template"
              value="album"
            /><span class="template-card sage"
              ><b>{{ t("album") }}</b
              ><small>{{ t("albumHelp") }}</small></span
            ></label
          ><label
            ><input
              type="radio"
              v-model="template"
              name="template"
              value="blank"
            /><span class="template-card cream"
              ><b>{{ t("blank") }}</b
              ><small>{{ t("blankHelp") }}</small></span
            ></label
          >
        </div>
      </fieldset>
      <label v-if="template === 'comic'" for="comic-layout">{{ t('comicLayout') }}
        <select id="comic-layout" v-model.number="layout">
          <option v-for="count in [2,3,4]" :key="count" :value="count">{{ count }} {{ t('comicPanels') }}</option>
        </select>
      </label>
      <button class="primary" type="submit">{{ t("start") }}</button>
    </form>
  </dialog>
</template>
