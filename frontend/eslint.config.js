/* eslint-disable @stylistic/semi */
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,jsx}'] },
  { ignores: ['/node_modules/', 'dist/'] },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      sourceType: 'module',
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  pluginReact.configs.flat.recommended,
  {
    rules: {
    'semi': 'error',
    'arrow-parens': ['error', 'always'],
  },
  },
];