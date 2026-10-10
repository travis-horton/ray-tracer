import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['data'] }],
    },
  },
  {
    files: ['test/**', 'scripts/**', 'eslint.config.mjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
];
