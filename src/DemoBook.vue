<script setup>
import {computed} from 'vue';
import {messages} from '/i18n.js';
const props=defineProps({locale:String,busy:Boolean,comic:Boolean});
const base=computed(()=>'/examples/'+(props.comic?'la-granota':'la-papallona'));
const title=computed(()=>props.comic?'La granota i la idea brillant':'La papallona i els colors del bosc');
const prefix=computed(()=>props.comic?'comic-demo':'demo');
defineEmits(['edit']);
</script>
<template>
  <section :id="comic?'demo-comic':'demo-book'" class="demo-book" :aria-labelledby="prefix+'-heading'">
    <a :href="base+'/'" :aria-label="messages[locale].demoRead">
      <img :src="base+'/cover.png'" :alt="title" width="320" height="180" loading="lazy" />
    </a>
    <div>
      <p class="eyebrow">{{ messages[locale][comic?'demoComicLabel':'demoLabel'] }}</p>
      <h2 :id="prefix+'-heading'">{{ title }}</h2>
      <p>{{ messages[locale].demoDescription }}</p>
      <div class="actions">
        <a :id="comic?'read-comic-demo':'read-demo'" class="demo-link" :href="base+'/'">{{ messages[locale].demoRead }}</a>
        <button :id="comic?'edit-comic-demo':'edit-demo'" :disabled="busy" @click="$emit('edit')">{{ messages[locale].demoEdit }}</button>
        <a :id="comic?'download-comic-demo':'download-demo'" class="demo-link" :href="base+'/'+(comic?'la-granota':'la-papallona')+'.elpx'" download>{{ messages[locale].demoDownload }}</a>
      </div>
    </div>
  </section>
</template>
