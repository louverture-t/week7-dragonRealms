import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/__tests__/**/*.test.ts"],
    coverage: {
      reporter: ["text", "html"],
      reportsDirectory: "./coverage"
    }
  }
});
