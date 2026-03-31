import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const IMPORT_ALIASES = ['~components', '~contexts', '~hooks', '~models', '~store', '~utils'];

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'public', 'build']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      react.configs.flat.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    settings: {
      react: { version: 'detect' },
    },
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  prettier,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages.
            // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            ['^@?\\w'],
            // Absolute imports and other imports such as Vue-style `@/foo`.
            // Anything not matched in another group.
            ['^'],
            // alias paths
            //? also change in the rule import/no-unresolved
            [`^(${IMPORT_ALIASES.join('|')})/`],
            // Relative imports.
            // Anything that starts with a dot.
            ['^\\.'],
            // (s)css module imports
            ['\\.module\\.s?css$'],
            // Side effect imports.
            ['^\\u0000'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
]);
