import perfectionist from "eslint-plugin-perfectionist";
import { dirname } from "path";
import { fileURLToPath } from "url";

import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

import { defineConfig, globalIgnores } from "eslint/config";

import tseslint, { parser } from "typescript-eslint";

import nextPlugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig([
  globalIgnores([
    "node_modules",
    "dist",
    "build",
    "coverage",
    "public",
    "scripts",
    "test",
    "tests",
    "tmp",
    "vendor",
    ".next",
    ".vercel",
    "next-env.d.ts",
    "prisma/seed.ts",
    "generated/**",
  ]),
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      perfectionist,
      react,
      "@next/next": nextPlugin,
      "react-hooks": reactHooks,
    },
    extends: [tseslint.configs.recommended, prettier],
    rules: {
      "block-scoped-var": "error",
      "default-case-last": "error",
      eqeqeq: "error",
      "no-alert": "error",
      "no-eval": "error",
      "no-return-assign": "error",
      "no-useless-concat": "error",
      "no-useless-return": "warn",
      "prefer-const": "warn",
      "no-unneeded-ternary": "error",
      "prefer-object-spread": "warn",
      "no-undef-init": "warn",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          types: ["array", "string", "number", "boolean"],
          leadingUnderscore: "allow",
          trailingUnderscore: "forbid",
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
        {
          selector: "enumMember",
          format: ["UPPER_CASE"],
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
          leadingUnderscore: "allow",
        },
      ],
      "max-classes-per-file": ["error", 1],
      "no-empty-function": [
        "error",
        {
          allow: ["arrowFunctions", "functions", "methods"],
        },
      ],
      "max-classes-per-file": ["error", 1],
      "no-empty-function": [
        "error",
        {
          allow: ["arrowFunctions", "functions", "methods"],
        },
      ],
      "perfectionist/sort-imports": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
          fallbackSort: { type: "unsorted" },
          ignoreCase: true,
          specialCharacters: "keep",
          internalPattern: ["^~/.+"],
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: "always",
          maxLineLength: undefined,
          groups: [
            "type",
            "internal-type",
            ["builtin", "external"],
            "internal",
            ["parent", "sibling", "index"],
            "style",
            "object",
            "unknown",
          ],
          customGroups: { type: {}, value: {} },
          environment: "node",
          tsconfigRootDir: ".",
        },
      ],
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
]);
