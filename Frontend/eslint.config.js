import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Node config files (fixes module is not defined)
  {
    files: ["*.cjs"],
    languageOptions: {
      globals: globals.node,
    },
  },

  {
    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    rules: {
      // React
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Keep only useful clean rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "warn",

      // TypeScript basics
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off", // turn off for now
    },
  },
];
