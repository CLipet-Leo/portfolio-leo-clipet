#!/usr/bin/env node

/**
 * Vérifie le titre des commits (voir docs/conventions.md).
 *
 *   node scripts/check-commit.ts <fichier>         hook commit-msg
 *   node scripts/check-commit.ts --range <a>..<b>  CI (commits d'une PR)
 */

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

export const TYPES = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'revert',
];

const MAX_LENGTH = 72;
const PATTERN =
  /^(?<type>[a-z]+)(?:\((?<scope>[a-z0-9-]+)\))?!?: (?<subject>.+)$/u;
// Titres produits par git lui-même, qui disparaissent ou ne se réécrivent pas.
const IGNORED = /^(Merge |(fixup|squash|amend)! )/;

/** Retourne la liste des erreurs du titre ; vide s'il est conforme. */
export function lint(title: string): string[] {
  if (IGNORED.test(title)) return [];

  const match = PATTERN.exec(title);
  if (!match?.groups) {
    return ['format attendu : « <type>(<portée>)?: <Sujet> »'];
  }

  const { type, subject } = match.groups;
  const errors: string[] = [];
  if (!TYPES.includes(type)) {
    errors.push(`type inconnu « ${type} » (${TYPES.join(', ')})`);
  }
  if (!/^\p{Lu}/u.test(subject)) {
    errors.push('le sujet commence par une majuscule');
  }
  if (subject.endsWith('.')) {
    errors.push('le sujet ne finit pas par un point');
  }
  const length = [...title].length;
  if (length > MAX_LENGTH) {
    errors.push(`titre trop long (${length} > ${MAX_LENGTH} caractères)`);
  }
  return errors;
}

/** Première ligne utile d'un message (git ignore les lignes en « # »). */
function titleOf(message: string): string {
  return (
    message
      .split('\n')
      .find((line) => line.trim() !== '' && !line.startsWith('#'))
      ?.trim() ?? ''
  );
}

function main(args: string[]): number {
  const titles =
    args[0] === '--range'
      ? execFileSync('git', ['log', '--format=%s', args[1]], {
          encoding: 'utf-8',
        })
          .split('\n')
          .filter(Boolean)
      : [titleOf(readFileSync(args[0], 'utf-8'))];

  let failed = 0;
  for (const title of titles) {
    const errors = lint(title);
    if (errors.length === 0) continue;
    failed++;
    console.error(`✗ ${title}`);
    errors.forEach((e) => console.error(`    ${e}`));
  }
  if (failed > 0) {
    console.error('\nConvention de commit : docs/conventions.md');
  }
  return failed > 0 ? 1 : 0;
}

if (import.meta.main) {
  process.exit(main(process.argv.slice(2)));
}
