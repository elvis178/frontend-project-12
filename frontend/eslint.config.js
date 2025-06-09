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
        process: 'readonly',
      },
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/arrow-parens': ['error', 'always'],
    },
  },
  {
    ignores: ['dist/'],
  },
];
