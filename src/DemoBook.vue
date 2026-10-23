<script setup>
import {messages} from '/i18n.js';
defineProps({locale:String,busy:Boolean});
defineEmits(['edit']);
</script>
<template>
  <section id="demo-book" class="demo-book" aria-labelledby="demo-heading">
    <a href="/examples/la-papallona/" :aria-label="messages[locale].demoRead">
      <img :src="'/examples/la-papallona/cover.png'" alt="La papallona i els colors del bosc" width="320" height="180" loading="lazy" />
    </a>
    <div>
      <p class="eyebrow">{{ messages[locale].demoLabel }}</p>
      <h2 id="demo-heading">La papallona i els colors del bosc</h2>
      <p>{{ messages[locale].demoDescription }}</p>
      <div class="actions">
        <a id="read-demo" class="demo-link" href="/examples/la-papallona/">{{ messages[locale].demoRead }}</a>
        <button id="edit-demo" :disabled="busy" @click="$emit('edit')">{{ messages[locale].demoEdit }}</button>
        <a id="download-demo" class="demo-link" href="/examples/la-papallona/la-papallona.elpx" download>{{ messages[locale].demoDownload }}</a>
      </div>
    </div>
  </section>
</template>
