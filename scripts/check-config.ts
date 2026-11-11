#!/usr/bin/env node

/**
 * Script de vérification de la compatibilité des configurations
 * Vérifie que toutes les configurations sont cohérentes et compatibles
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';

type CheckType = 'passed' | 'warnings' | 'errors';

interface IPackageJson {
  type?: string;
  scripts?: Record<string, string>;
}

interface ITsConfig {
  compilerOptions: {
    jsx?: string;
    paths?: Record<string, string[]>;
  };
}

interface IPrettierConfig {
  plugins?: string[];
  tailwindConfig?: string;
}

interface IComponentsConfig {
  tailwind?: {
    css?: unknown;
    baseColor?: string;
  };
  registries?: Record<string, unknown>;
}

const checks: Record<CheckType, string[]> = {
  passed: [],
  warnings: [],
  errors: [],
};

function addCheck(type: CheckType, message: string): void {
  checks[type].push(message);
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf-8')) as T;
}

// Vérification du package.json
try {
  const pkg = readJson<IPackageJson>('package.json');

  // Vérifier type: module
  if (pkg.type === 'module') {
    addCheck('passed', '✅ package.json: type "module" configuré');
  } else {
    addCheck('warnings', '⚠️  package.json: type "module" manquant');
  }

  // Vérifier les scripts essentiels
  const requiredScripts = [
    'dev',
    'build',
    'lint',
    'format',
    'format:check',
    'typecheck',
    'check',
    'test',
  ];
  const missingScripts = requiredScripts.filter((s) => !pkg.scripts?.[s]);
  if (missingScripts.length === 0) {
    addCheck('passed', '✅ package.json: Tous les scripts essentiels présents');
  } else {
    addCheck(
      'errors',
      `❌ package.json: Scripts manquants: ${missingScripts.join(', ')}`,
    );
  }
} catch (error) {
  addCheck('errors', `❌ Erreur lecture package.json: ${errorMessage(error)}`);
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
  const tsconfig = readJson<ITsConfig>('tsconfig.json');

  if (
    tsconfig.compilerOptions.jsx === 'react-jsx' ||
    tsconfig.compilerOptions.jsx === 'preserve'
  ) {
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
  addCheck('errors', `❌ Erreur lecture tsconfig.json: ${errorMessage(error)}`);
}

// Vérification .prettierrc
try {
  const prettier = readJson<IPrettierConfig>('.prettierrc');

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
  addCheck('errors', `❌ Erreur lecture .prettierrc: ${errorMessage(error)}`);
}

// Vérification globals.css
const cssPath = 'src/app/global.css';
const cssTailwind = [
  '@import "tailwindcss"',
  "@import 'tailwindcss'",
  '@tailwind',
];

function checkCss(css: string, label: string): void {
  if (
    css.includes(cssTailwind[0]) ||
    css.includes(cssTailwind[1]) ||
    css.includes('@tailwind')
  ) {
    addCheck('passed', `✅ ${label}: Configuration Tailwind v4 détectée`);
  } else {
    addCheck('errors', `❌ ${label}: Import Tailwind non détecté`);
  }
}

if (!existsSync(cssPath)) {
  addCheck('errors', `❌ Fichier ${cssPath} manquant`);
} else {
  const css = readFileSync(cssPath, 'utf-8');
  checkCss(css, cssPath);
}

// Vérification components.json + tailwind.css shadcn
function checkComponentsConfig(): void {
  if (!existsSync('components.json')) {
    addCheck('errors', '❌ Fichier components.json manquant');
    return;
  }

  let cfg: IComponentsConfig;
  try {
    cfg = readJson<IComponentsConfig>('components.json');
  } catch (error) {
    addCheck('errors', `❌ components.json invalide: ${errorMessage(error)}`);
    return;
  }

  if (!cfg.tailwind || typeof cfg.tailwind !== 'object') {
    addCheck(
      'errors',
      '❌ components.json: objet `tailwind` manquant ou invalide',
    );
    return;
  }

  const cssValue = cfg.tailwind.css;
  if (typeof cssValue !== 'string' || cssValue.trim().length === 0) {
    addCheck(
      'errors',
      '❌ components.json: `tailwind.css` absent ou de type invalide',
    );
    return;
  }

  if (!existsSync(cssValue)) {
    addCheck(
      'errors',
      `❌ components.json: ` + JSON.stringify(cssValue) + ` n'existe pas`,
    );
    return;
  }

  const css = readFileSync(cssValue, 'utf-8');
  checkCss(css, cssValue);

  // Source canonique attendue
  if (cssValue === 'src/app/global.css') {
    addCheck(
      'passed',
      '✅ components.json: `tailwind.css` désigne `src/app/global.css` (source canonique)',
    );
  } else {
    addCheck(
      'errors',
      `❌ components.json: ` +
        JSON.stringify(cssValue) +
        ` ne désigne pas la source canonique src/app/global.css`,
    );
  }

  // Registre @dotmatrix préservé
  const registries = cfg.registries || {};
  const dotmatrix = registries['@dotmatrix'];
  if (typeof dotmatrix !== 'string' || !dotmatrix.includes('{name}')) {
    addCheck(
      'errors',
      '❌ components.json: registre `@dotmatrix` absent ou mal formé (attendu https://dotmatrix.zzzzshawn.cloud/r/{name}.json)',
    );
  } else {
    addCheck('passed', '✅ components.json: registre `@dotmatrix` préservé');
  }

  // baseColor non modifié
  if (cfg.tailwind.baseColor === 'stone') {
    addCheck('passed', '✅ components.json: `baseColor` inchangé (stone)');
  }
}

try {
  checkComponentsConfig();
} catch (error) {
  addCheck(
    'errors',
    `❌ Vérification components.json interrompue: ${errorMessage(error)}`,
  );
}

try {
  checkLayoutImportCss();
} catch (error) {
  addCheck(
    'errors',
    `❌ Vérification de l'import layout interrompue: ${errorMessage(error)}`,
  );
}

// Vérification de l'import effectif du CSS dans le layout
function checkLayoutImportCss(): void {
  const layoutPath = resolve('src/app', 'layout.tsx');
  if (!existsSync(layoutPath)) {
    addCheck('errors', `❌ Fichier ${layoutPath} manquant`);
    return;
  }

  const layoutSource = readFileSync(layoutPath, 'utf-8');
  const imports = [
    ...layoutSource.matchAll(
      /import\s*(?:\s*['"]([^'"]+)['"])?(?:\s*from\s*['"]([^'"]+)['"])?/g,
    ),
  ]
    .map((m) => m[1] || m[2])
    .filter((p): p is string => p !== undefined && p.includes('css'));

  const canonical = 'src/app/global.css';
  if (imports.length === 0) {
    addCheck('errors', `❌ ${layoutPath} ne contient aucun import CSS`);
    return;
  }

  // Résolution manuelle du chemin relatif, sans dépendance ni parseur.
  // Les alias `@/*` ne sont pas résolus : ils ne pointent pas vers de CSS.
  const importedCssFiles = [
    ...new Set(
      imports
        .map((p) => {
          const abs = resolve(dirname(layoutPath), p);
          return existsSync(abs) ? abs.replace(/\\/g, '/') : null;
        })
        .filter((f): f is string => f !== null),
    ),
  ];

  if (importedCssFiles.length === 0) {
    addCheck('errors', '❌ Aucun import CSS résolu dans le layout');
  } else {
    importedCssFiles.forEach((f) =>
      addCheck('passed', `✅ ${layoutPath} importe ${f}`),
    );
  }

  const canonicalNormalized = canonical.replace(/\\/g, '/');
  if (importedCssFiles.some((f) => f.endsWith(canonicalNormalized))) {
    addCheck('passed', `✅ ${layoutPath} importe bien ${canonical}`);
  } else {
    addCheck(
      'errors',
      `❌ ${layoutPath} ne possède pas d'import de ${canonical} (import CSS résolu : ${importedCssFiles.join(', ') || 'aucun'})`,
    );
  }
}

// Nommage : tout fichier et dossier en kebab-case (voir docs/conventions.md)
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function checkNaming(): void {
  const bad: string[] = [];
  const entries = ['src', 'scripts'].flatMap((root) =>
    readdirSync(root, { recursive: true, withFileTypes: true }),
  );
  for (const entry of entries) {
    const dir = relative('.', entry.parentPath).replace(/\\/g, '/');
    // Segments de route Next.js : (groupe), [param], [...slug], _privé, @slot,
    // (.)intercepté. Pour un fichier, seul le nom avant le premier point compte.
    const name = entry.isDirectory()
      ? entry.name
          .replace(/^(\(\.{1,3}\))+/, '')
          .replace(/^[(@_[]+(\.\.\.)?|[)\]]+$/g, '')
      : entry.name.split('.')[0];
    if (!KEBAB.test(name)) bad.push(`${dir}/${entry.name}`);
  }

  if (bad.length === 0) {
    addCheck(
      'passed',
      '✅ Nommage des fichiers de src/ et scripts/ conforme (kebab-case)',
    );
  } else {
    bad.forEach((p) =>
      addCheck('errors', `❌ Nommage (kebab-case attendu) : ${p}`),
    );
  }
}

try {
  checkNaming();
} catch (error) {
  addCheck(
    'errors',
    `❌ Vérification du nommage interrompue: ${errorMessage(error)}`,
  );
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
