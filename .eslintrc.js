module.exports = {
  env: {
    node: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 6
  },
  ecmaFeatures: {
    impliedStrict: true
  },
  env: {
    es6: true
  }
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', windows],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'eol-last': ['error', 'always']
  }
}
