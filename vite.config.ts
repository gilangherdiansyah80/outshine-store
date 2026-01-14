import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@outshine/hooks": path.resolve(__dirname, "./src/hooks"),
      "@outshine/store": path.resolve(__dirname, "./src/store"),
      "@outshine/lib": path.resolve(__dirname, "./src/lib"),
      "@outshine/middleware": path.resolve(__dirname, "./src/middleware"),
      "@outshine/services": path.resolve(__dirname, "./src/services"),
      "@outshine/container": path.resolve(__dirname, "./src/container"),
      "@outshine/components": path.resolve(__dirname, "./src/components"),
      "@outshine/pages": path.resolve(__dirname, "./src/pages"),
      "@outshine/ui": path.resolve(__dirname, "./src/ui"),
    },
  },
});
