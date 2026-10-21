import { createApp } from "vue";
import App from "./App.vue";

export function mountLlibres() {
  return createApp(App).mount("#app");
}
