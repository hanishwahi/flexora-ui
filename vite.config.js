import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext", // ✅ VERY IMPORTANT
    lib: {
      entry: "src/index.tsx",
      formats: ["es"],
      fileName: () => "flexora-ui.js",
    },
    rollupOptions: {
      external: [/^react($|\/)/, /^react-dom($|\/)/],
    },
  },
});
