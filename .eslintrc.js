const path = require('path');

module.exports = {
  "root": true,
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "./node_modules/eslint-config-airbnb-base/rules/best-practices.js",
    "./node_modules/eslint-config-airbnb-base/rules/errors.js",
    "./node_modules/eslint-config-airbnb-base/rules/node.js",
    "./node_modules/eslint-config-airbnb-base/rules/style.js",
    "./node_modules/eslint-config-airbnb-base/rules/variables.js",
    "./node_modules/eslint-config-airbnb-base/rules/es6.js",
    "prettier",
    "prettier/@typescript-eslint",
    "eslint:all",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/all",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: 'module',
    extraFileExtensions: [".scss"]
  },
  plugins: ["@typescript-eslint", "jest", "prettier"],
  rules: {
    "no-return-assign": 0,
    "no-restricted-syntax": 0,
    "no-cond-assign": 0,
    "no-unused-expressions": 0,
    "no-magic-numbers": 0,
    "no-invalid-this": 0,
    "no-ternary": 0,
    "no-console": 1,
    "no-undefined": 0,
    "id-length": 0,
    "max-params": 0,
    "multiline-ternary": 0,
    "init-declarations": 0,
    "func-style": 0,

    "max-statements": 0,
    "max-lines": 0,
    "max-lines-per-function": 0,
    "function-call-argument-newline": 0,

    "sort-imports": 0,
    "implicit-arrow-linebreak": 0,

    "import/no-cycle": 1,
    "import/extensions": "off",
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,

    "lines-between-class-members": "off",

    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-for-in-array": "warn",
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/indent": 0,
    "@typescript-eslint/strict-boolean-expressions": 0,
    "@typescript-eslint/no-magic-numbers": 0,
    "@typescript-eslint/no-unnecessary-condition": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/quotes": 0,
    "@typescript-eslint/restrict-template-expressions": 0,
    "@typescript-eslint/unbound-method": 1,
    "@typescript-eslint/no-unsafe-assignment": 1,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-unsafe-member-access": 1,
    "@typescript-eslint/no-unsafe-call": 1
  },
  settings: {
    "html/html-extensions": [".html"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"]
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"]
      }
    }
  },
  env: {
    browser: true,
    jest: true,
    jasmine: true,
    node: true
  }
};
