import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    projects: [
      {
        test: {
          name: "unit",
          include: ["**/*.test.{ts,tsx}"],
          exclude: ["node_modules", "dist"],
          environment: "jsdom",
          css: true,
          setupFiles: ["./utils/config/vitest_setup.ts"],
        },
        plugins: [react()],
        extends: true,
        root: "./",
      },
    ],
  },
});
