module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ['standard', 'standard-react'],
  env: {
    browser: true
  },
  plugins: [
    'react'
  ],
  rules: {
    'jsx-quotes': ['error', 'prefer-double'],
    'react/self-closing-comp': 0,
    'new-parens': 0
  }
}
