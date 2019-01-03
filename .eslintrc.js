module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: [
    "airbnb",
  ],
  // add your custom rules here
  rules: {
    "max-len": "off",
    "no-underscore-dangle": "off",
    quotes: ["error", "double"],
    "react/jsx-one-expression-per-line": "off",
  },
};
