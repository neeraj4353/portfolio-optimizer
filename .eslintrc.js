module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    // 'standard-with-typescript',
    'plugin:react/jsx-runtime'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
    // project: ['./tsconfig.json']
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 0,
    'react/no-unescaped-entities': 0
  }
};
