/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      tsdoc: require("eslint-plugin-tsdoc"),
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    }
  },
  {
    files: ["*.ts", "*.tsx"],
    extends: [
      require("@eslint/js").configs.recommended,
      "plugin:@typescript-eslint/recommended",
    ]
  },
];