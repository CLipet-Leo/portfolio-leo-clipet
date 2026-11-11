import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'next-env.d.ts',
    'public/sitemap*.xml',
    'public/robots.txt',
    '.claude/skills/**',
  ]),
  js.configs.recommended,
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      '@typescript-eslint/no-explicit-any': 'warn',
      // Nommage des identifiants : voir docs/conventions.md.
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          // PascalCase : composants React (`const Comp = asChild ? Slot : 'a'`).
          selector: 'variable',
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        {
          // UPPER_CASE : constantes, au niveau du module seulement.
          selector: 'variable',
          modifiers: ['global'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        // Classes, types, enums et paramètres génériques.
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'interface', format: ['PascalCase'], prefix: ['I'] },
        { selector: 'enum', format: ['PascalCase'], prefix: ['E'] },
        {
          // `T` seul, ou `T` + nom : `TItem`, `TResponse`.
          selector: 'typeParameter',
          format: ['PascalCase'],
          custom: { regex: '^T([A-Z][a-zA-Z0-9]*)?$', match: true },
        },
        { selector: 'enumMember', format: ['PascalCase'] },
        // Noms imposés de l'extérieur : imports (THREE), JSON, en-têtes, aria-*.
        { selector: 'import', format: null },
        {
          selector: [
            'objectLiteralProperty',
            'objectLiteralMethod',
            'typeProperty',
          ],
          format: null,
        },
      ],
      // Les apostrophes du texte français sont valides en JSX.
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
    },
  },
  {
    files: ['**/*.{js,mjs}'],
    rules: { '@typescript-eslint/naming-convention': 'off' },
  },
  {
    files: ['scripts/**'],
    rules: { 'no-console': 'off' },
  },
  {
    files: ['*.config.{js,mjs,ts}'],
    rules: { 'import/no-anonymous-default-export': 'off' },
  },
  // Désactive les règles de style en conflit : Prettier est lancé à part.
  prettier,
]);
