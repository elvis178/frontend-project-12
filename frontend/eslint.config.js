import globals from 'globals';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

export default [
  stylistic.configs.recommended,
  pluginJs.configs.recommended,
  {
    files: [
      '**/*.{js,ts,tsx}',
    ],
    languageOptions: {
      globals: {
        ...globals.node,

        document: 'readonly',
        localStorage: 'readonly',
      },
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      'semi': ['error', 'always'], // Обязательные точки с запятой
      'arrow-parens': ['error', 'always'], // Скобки для стрелочных функций при одном параметре
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@stylistic/semi': 'off',
      '@stylistic/arrow-parens': 'off',
    },
  },
  {
    ignores: ['dist/'],
  },
];
