import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setup.ts"],
    coverage: {
      provider: "istanbul", // or 'v8'
    },
  },
});
