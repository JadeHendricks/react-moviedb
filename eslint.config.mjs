import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['build/**', 'node_modules/**', 'coverage/**', 'test-results/**', 'playwright-report/**', '.agents/**', '.worktrees/**'],
  },
  js.configs.recommended,
  // Ready for Phase 2 (TypeScript): these only apply to .ts/.tsx files, of which there are few today.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [tseslint.configs.recommended],
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { react, 'react-hooks': reactHooks, 'jsx-a11y': jsxA11y },
    rules: {
      // Marks JSX-used imports as used (core no-unused-vars cannot see JSX).
      'react/jsx-uses-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Accessibility rules are errors (they were warnings until this phase). The plugin's own recommended
      // set is used as it ships, so the severities and options are the plugin's, not a blanket 'error'.
      ...jsxA11y.configs.recommended.rules,
      // React is imported in every file; the JSX transform no longer needs it.
      'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }],
    },
  },
  {
    // TypeScript sources: the core rule cannot read type positions (function type params, type imports),
    // so the typescript-eslint version takes over.
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }],
      // Statements like `cond && dispatch(...)` and the search ternary are existing code; Phases 3 and 4 remove them.
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    },
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', 'src/test/**'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ['*.{js,mjs,ts}', 'e2e/**/*.{js,mjs,ts}'],
    languageOptions: { globals: { ...globals.node } },
  },
  prettier,
);