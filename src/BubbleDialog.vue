<script setup>
import {ref} from 'vue';
const props = defineProps({core:Object});
const dialog=ref(null), input=ref(null), text=ref(''), kind=ref('speech');
let id=null, target;
function open(editing=false) {
  const draft=editing?props.core.bubbleDraft():null;
  if (editing && !draft) return;
  id=draft?.id || null;
  text.value=draft?.text || '';
  kind.value=draft?.kind || 'speech';
  target=props.core.context();
  dialog.value.showModal();input.value.focus();
}
async function submit() {
  if (!text.value.trim() || !props.core.matches(target)) return;
  const draft={id,kind:kind.value,text:text.value};
  dialog.value.close();
  const result=await props.core.action(()=>props.core.writeBubble(draft));
  if (result===false && props.core.matches(target)) { dialog.value.showModal();input.value.focus(); }
}
defineExpose({open});
</script>
<template>
  <dialog id="bubble-dialog" ref="dialog" aria-labelledby="bubble-heading">
    <form @submit.prevent="submit">
      <div class="dialog-heading"><h2 id="bubble-heading">{{ core.t('comicBubble') }}</h2>
        <button id="close-bubble" type="button" :aria-label="core.t('close')" @click="dialog.close()">×</button>
      </div>
      <label for="bubble-kind">{{ core.t('comicBubbleKind') }}</label>
      <select id="bubble-kind" v-model="kind">
        <option value="speech">{{ core.t('comicSpeech') }}</option>
        <option value="thought">{{ core.t('comicThought') }}</option>
        <option value="narration">{{ core.t('comicNarration') }}</option>
      </select>
      <label for="bubble-text">{{ core.t('comicBubbleText') }}</label>
      <textarea id="bubble-text" ref="input" v-model="text" maxlength="300" rows="5" required></textarea>
      <p>{{ core.t('comicBubbleHint') }}</p>
      <button id="save-bubble" class="primary" type="submit">{{ core.t('save') }}</button>
    </form>
  </dialog>
</template>
