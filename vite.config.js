import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// One precompiled application, served by the existing static nginx.
export default defineConfig({
  plugins: [vue()],
  publicDir: false,
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  build: {
    outDir: "public",
    emptyOutDir: false,
    lib: { entry: "src/ui.js", formats: ["es"], fileName: () => "ui.js" },
    rollupOptions: {
      external: [
        "/publication.js",
        "/i18n.js",
        "/store.js",
        "/adapter.js",
        "/import.js",
        "/rebost.js",
        "/examples.js",
      ],
    },
    minify: true,
    sourcemap: false,
  },
});
