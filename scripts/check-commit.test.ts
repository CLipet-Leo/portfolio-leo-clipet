import assert from 'node:assert/strict';
import { test } from 'node:test';

import { lint } from './check-commit.ts';

test('titres conformes', () => {
  for (const title of [
    'feat: Add timeline section',
    'fix(navbar): Close menu on route change',
    'refactor!: Rename project data keys',
    'style: Migrate components to the « Schéma » design system',
    'Merge branch main into rework',
    'fixup! feat: Add timeline',
  ]) {
    assert.deepEqual(lint(title), [], title);
  }
});

test('titres refusés', () => {
  for (const title of [
    'Update favicon.ico',
    '✨ feat: Add timeline',
    'feat:Add timeline',
    'Feat: Add timeline',
    'feature: Add timeline',
    'feat: add timeline',
    'feat: Add timeline.',
    'feat(Navbar): Add timeline',
    `feat: ${'A'.repeat(70)}`,
  ]) {
    assert.notDeepEqual(lint(title), [], title);
  }
});
