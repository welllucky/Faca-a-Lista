// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettierConfig = require("eslint-config-prettier");
const eslintReact = require("@eslint-react/eslint-plugin");

module.exports = defineConfig(
  [
    expoConfig,
    prettierConfig,
    eslintReact,
    {
      ignores: ["dist/*"],
    },
  ],
  {
    plugins: ["react", "react-native"],
    rules: {
      "react-native/no-unused-styles": 2,
      "react-native/split-platform-components": 2,
      "react-native/no-inline-styles": 2,
      "react-native/no-color-literals": 2,
      "react-native/no-raw-text": 2,
      "react-native/no-single-element-style-arrays": 2,
    },
    extends: [
      "plugin:react-native/all",
      eslintReact.configs["recommended-typescript"],
    ],
  },
);
