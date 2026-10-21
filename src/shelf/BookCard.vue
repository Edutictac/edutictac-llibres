<script setup>
import { computed } from "vue";
import { messages } from "/i18n.js";

const props = defineProps({ book: Object, locale: String, busy: Boolean });
defineEmits(["open", "remove"]);
const t = (key) => messages[props.locale][key] || key;
const date = computed(() =>
  new Date(props.book.updatedAt).toLocaleDateString(
    props.locale === "va" ? "ca-ES" : "es-ES",
  ),
);
</script>

<template>
  <article class="book-card">
    <button class="book-open" :disabled="busy" @click="$emit('open', book)">
      {{ book.title }}
    </button>
    <p>{{ date }} · {{ book.pageCount }} {{ t("pages").toLowerCase() }}</p>
    <button
      class="delete-book"
      :disabled="busy"
      :aria-label="t('deleteLabel') + ': ' + book.title"
      @click="$emit('remove', book)"
    >
      ×
    </button>
  </article>
</template>
