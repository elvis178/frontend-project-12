import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';

export default [
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Точки с запятой — разрешены, но не требуются (можно и с `;`, и без)
      'semi': 'off',                 // Выключаем стандартное правило
      'no-extra-semi': 'off',        // Разрешаем лишние `;` (если вдруг появятся)

      // Круглые скобки у стрелочных функций — опциональны (можно и с `()`, и без)
      'arrow-parens': 'off',         // Выключаем требование скобок
      
      // Разрешаем краткую запись стрелочных функций (без `{}`, если тело в одну строку)
      'arrow-body-style': ['warn', 'as-needed'],

      // Остальные правила
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];