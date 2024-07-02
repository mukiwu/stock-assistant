import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginImport from 'eslint-plugin-import'
import tsParser from '@typescript-eslint/parser'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import { fixupConfigRules } from '@eslint/compat'

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  ...fixupConfigRules(pluginReactConfig),
  {
    files: ['**/*.{js,mjs,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    plugins: { import: pluginImport },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'error',
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'space-before-function-paren': ['error', 'always'],
      'no-magic-numbers': ['error', { ignore: [0, 1, 2.718281828459045, Math.PI] }],
      'no-throw-literal': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'import/order': ['error', { groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'] }],
      'import/named': 'error',
      'import/namespace': 'error',
      'import/default': 'error',
      'import/export': 'error'
    }
  }
]
