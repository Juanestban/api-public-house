module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['standard', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    yoda: 0,
    'multiline-ternary': 0,
    'no-unused-vars': 0,
    'no-useless-return': 0,
    'no-return-assign': 0,
    'no-unused-expressions': 0,
    'no-undef': 0,
    'space-before-function-paren': 0,
  },
}
