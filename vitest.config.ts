import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    pool: "threads",
    projects: [
      {
        test: {
          name: "unit",
          include: ["**/*.test.{ts,tsx}"],
          exclude: ["node_modules", "dist"],
          environment: "happy-dom",
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
