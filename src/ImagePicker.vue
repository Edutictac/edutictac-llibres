<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { uid } from "/store.js";
import { fetchImage, selection } from "/rebost.js";
const props = defineProps({ core: Object });
const emit = defineEmits(["device"]);
const t = props.core.t,
  dialog = ref(null),
  host = ref(null),
  type = ref("sprite");
let picking = null;
function close() {
  picking?.controller.abort();
  picking = null;
  dialog.value.close();
  host.value.replaceChildren();
}
function show(kind = "sprite") {
  picking?.controller.abort();
  type.value = kind;
  const request = uid(),
    controller = new AbortController(),
    frame = document.createElement("iframe");
  frame.id = "rebost-frame";
  frame.title = t("rebost");
  frame.onload = () => {
    if (
      picking?.frame === frame &&
      !frame.contentDocument?.getElementById("status")
    )
      props.core.notice(t("rebostError"), true);
  };
  frame.src =
    "/assets/?" +
    new URLSearchParams({
      mode: "pick",
      type: kind,
      request,
      lang: props.core.state.locale,
    });
  picking = { request, controller, frame, ...props.core.context() };
  host.value.replaceChildren(frame);
}
function open() {
  dialog.value.showModal();
  show();
}
function device() {
  close();
  emit("device");
}
function receive(event) {
  const target = picking;
  if (!target || !selection(event, target.frame.contentWindow, target.request))
    return;
  if (event.data.cancel) return close();
  props.core.action(async () => {
    const timeout = setTimeout(() => target.controller.abort(), 30000);
    try {
      const result = await fetchImage(
        event.data.id,
        props.core.state.locale,
        target.controller.signal,
      );
      if (picking !== target || !props.core.matches(target)) return;
      await props.core.image(result.file, result.credit);
      close();
    } catch (error) {
      if (picking === target) throw error;
    } finally {
      clearTimeout(timeout);
    }
  });
}
onMounted(() => window.addEventListener("message", receive));
onUnmounted(() => {
  picking?.controller.abort();
  window.removeEventListener("message", receive);
});
defineExpose({ open });
</script>
<template>
  <dialog
    id="image-picker"
    ref="dialog"
    @cancel="close"
    aria-labelledby="image-picker-title"
  >
    <div class="dialog-heading">
      <h2 id="image-picker-title">{{ t("chooseImage") }}</h2>
      <button id="close-image-picker" @click="close">{{ t("close") }}</button>
    </div>
    <div class="image-sources">
      <button id="device-image" @click="device">{{ t("deviceImage") }}</button>
      <button id="rebost-sprites" @click="show('sprite')">
        {{ t("rebostSprites") }}
      </button>
      <button id="rebost-backgrounds" @click="show('background')">
        {{ t("rebostBackgrounds") }}
      </button>
      <button id="refresh-rebost" @click="show(type)">
        {{ t("refreshRebost") }}
      </button>
    </div>
    <p>{{ t("rebostHint") }}</p>
    <div id="rebost-host" ref="host"></div>
  </dialog>
</template>
