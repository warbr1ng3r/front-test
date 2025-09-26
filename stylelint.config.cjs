module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
  plugins: ['@stylistic/stylelint-plugin'],
  ignoreFiles: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.next/**', '**/.vite/**'],

  rules: {
    '@stylistic/indentation': 2,
    'selector-class-pattern': [
      /^[a-z][a-zA-Z0-9]+$/,
      { resolveNestedSelectors: true, message: 'Use camelCase for class names' },
    ],
    'keyframes-name-pattern': [
      /^[a-z][a-zA-Z0-9]+$/,
      { resolveNestedSelectors: true, message: 'Use camelCase for class names' },
    ],
    'no-descending-specificity': null,
  },
};
