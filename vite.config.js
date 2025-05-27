import { defineConfig } from "vitest/config";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: "/arcgisjsapi/",
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "./index.html"),
          tiles: path.resolve(__dirname, "./3dtiles.html"),
        },
      },
    },
    server: {
      host: "0.0.0.0",
      port: 5713,
    },
  };
});
