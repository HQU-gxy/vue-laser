module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "plugin:vue/essential",
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    indent: [
      "warn",
      2,
    ],
    quotes: [
      "warn",
      "double",
    ],
    semi: [
      "warn",
      "never",
    ],
    "array-bracket-spacing": ["warn", "never"],
    "brace-style": ["warn", "1tbs"],
    "linebreak-style": ["off", "unix"],
    "@typescript-eslint/ban-ts-comment": "off",
    "no-trailing-spaces": "warn",
    camelcase: "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "no-plusplus": "off",
    "no-param-reassign": "warn",
    "max-len": "warn",
    "no-empty-function": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "no-underscore-dangle": "warn",
    "vue/no-unused-components": "warn",
  },
}
