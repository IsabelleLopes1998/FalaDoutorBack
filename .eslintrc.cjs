module.exports = {
  env: { node: true, es2021: true },
  extends: ["eslint:recommended", "plugin:node/recommended", "prettier"],
  parserOptions: { ecmaVersion: 2021, sourceType: "module" },
  rules: {
    "no-console": "off"
  }
};
