// eslint.config.mjs
import pluginJs from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { prettier: eslintPluginPrettier },
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      'prettier/prettier': 'error',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    },
    ignores: [
      // Fichiers de config
      '*.config.*',
      '*.rc',
      '*.json',
      '*.mjs',
      '*.cjs',
      '*.js',
      '*.ts',

      // Dossiers d'environnement
      'node_modules/',
      '.next/',
      '.vscode/',
      '.vercel/',
      'build/',
      'out/',
      'coverage/',
      '.env*',
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
