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
maVersion: 'latest',
      globals: globals.browser,
      sourceType: 'module',
    },
  },
  {
    settings: {
      react: {
        version: '18.3',
      },
    },
  },
  pluginReact.configs.flat.recommended,
  {
    rules: {
      semi: ['error', 'always'],
      '@stylistic/semi': ['error', 'never'],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'arrow-parens': ['error', 'as-needed'],
    },
  },
];
