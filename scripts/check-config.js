#!/usr/bin/env node

/**
 * Script de vérification de la compatibilité des configurations
 * Vérifie que toutes les configurations sont cohérentes et compatibles
 */

import { existsSync, readFileSync } from 'fs';

const checks = {
  passed: [],
  warnings: [],
  errors: [],
};

function addCheck(type, message) {
  checks[type].push(message);
}

// Vérification du package.json
try {
  const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));

  // Vérifier type: module
  if (pkg.type === 'module') {
    addCheck('passed', '✅ package.json: type "module" configuré');
  } else {
    addCheck('warnings', '⚠️  package.json: type "module" manquant');
  }

  // Vérifier les scripts essentiels
  const requiredScripts = ['dev', 'build', 'lint', 'format'];
  const missingScripts = requiredScripts.filter((s) => !pkg.scripts[s]);
  if (missingScripts.length === 0) {
    addCheck('passed', '✅ package.json: Tous les scripts essentiels présents');
  } else {
    addCheck(
      'errors',
      `❌ package.json: Scripts manquants: ${missingScripts.join(', ')}`,
    );
  }
} catch (error) {
  addCheck('errors', `❌ Erreur lecture package.json: ${error.message}`);
}

// Vérification des fichiers de configuration requis
const requiredFiles = [
  'tsconfig.json',
  'next.config.ts',
  'eslint.config.mjs',
  '.prettierrc',
  'postcss.config.mjs',
];

requiredFiles.forEach((file) => {
  if (existsSync(file)) {
    addCheck('passed', `✅ Fichier ${file} présent`);
  } else {
    addCheck('errors', `❌ Fichier ${file} manquant`);
  }
});

// Vérification tsconfig.json
try {
  const tsconfig = JSON.parse(readFileSync('tsconfig.json', 'utf-8'));

  if (tsconfig.compilerOptions.jsx === 'react-jsx' || tsconfig.compilerOptions.jsx === 'preserve') {
    addCheck('passed', '✅ tsconfig.json: JSX configuré pour Next.js');
  } else {
    addCheck(
      'warnings',
      `⚠️  tsconfig.json: JSX = "${tsconfig.compilerOptions.jsx}" (devrait être "react-jsx" pour Next.js)`,
    );
  }

  if (tsconfig.compilerOptions.paths?.['@/*']) {
    addCheck('passed', '✅ tsconfig.json: Path aliases configurés');
  }
} catch (error) {
  addCheck('errors', `❌ Erreur lecture tsconfig.json: ${error.message}`);
}

// Vérification .prettierrc
try {
  const prettier = JSON.parse(readFileSync('.prettierrc', 'utf-8'));

  if (prettier.plugins?.includes('prettier-plugin-tailwindcss')) {
    addCheck('passed', '✅ .prettierrc: Plugin Tailwind configuré');
  } else {
    addCheck('warnings', '⚠️  .prettierrc: Plugin Tailwind manquant');
  }

  if (prettier.tailwindConfig) {
    addCheck(
      'warnings',
      '⚠️  .prettierrc: tailwindConfig défini (non nécessaire avec Tailwind v4)',
    );
  }
} catch (error) {
  addCheck('errors', `❌ Erreur lecture .prettierrc: ${error.message}`);
}

// Vérification globals.css
if (existsSync('src/styles/globals.css')) {
  const css = readFileSync('src/styles/globals.css', 'utf-8');
  if (
    css.includes('@import "tailwindcss"') ||
    css.includes("@import 'tailwindcss'") ||
    css.includes('@tailwind')
  ) {
    addCheck('passed', '✅ globals.css: Configuration Tailwind v4 détectée');
  } else {
    addCheck('warnings', '⚠️  globals.css: Import Tailwind non détecté');
  }
} else {
  addCheck('errors', '❌ Fichier globals.css manquant');
}

// Affichage des résultats
console.log('\n📋 VÉRIFICATION DE COMPATIBILITÉ DES CONFIGURATIONS\n');
console.log('='.repeat(60));

if (checks.passed.length > 0) {
  console.log('\n✅ SUCCÈS:\n');
  checks.passed.forEach((msg) => console.log(`  ${msg}`));
}

if (checks.warnings.length > 0) {
  console.log('\n⚠️  AVERTISSEMENTS:\n');
  checks.warnings.forEach((msg) => console.log(`  ${msg}`));
}

if (checks.errors.length > 0) {
  console.log('\n❌ ERREURS:\n');
  checks.errors.forEach((msg) => console.log(`  ${msg}`));
}

console.log('\n' + '='.repeat(60));
console.log(
  `\n📊 Résumé: ${checks.passed.length} succès, ${checks.warnings.length} avertissements, ${checks.errors.length} erreurs\n`,
);

// Code de sortie
process.exit(checks.errors.length > 0 ? 1 : 0);
