<script setup>
defineProps({ item: Object, status: String });
defineEmits(["open"]);
</script>

<template>
  <article class="book-card">
    <img
      v-if="
        item.status === 'pending' ||
        item.status === 'returned' ||
        item.published
      "
      :src="
        item.status === 'pending' || item.status === 'returned'
          ? `/api/llibres/reviews/${item.id}/files/cover.png`
          : `/api/llibres/public/${item.id}/cover.png`
      "
      alt=""
      loading="lazy"
      style="width: 100%"
    />
    <button class="review-open" @click="$emit('open', item)">
      {{ item.title }}
    </button>
    <p>{{ [item.author, item.class_name, status].join(" · ") }}</p>
  </article>
</template>
