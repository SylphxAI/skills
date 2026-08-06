import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { catalogBytes, repositoryRoot } from '../scripts/build-catalog.mjs';

const constitution = readFileSync(path.join(repositoryRoot, 'runtime/constitution.md'), 'utf8');

test('constitution stays thin and miss-class-A', () => {
  assert.ok(constitution.length <= 6000, `constitution too large: ${constitution.length}`);
  for (const phrase of [
    'Evidence precedes claims',
    'Done means delivered',
    'progressive disclosure',
    'Skills do not grant tools',
  ]) {
    assert.ok(constitution.includes(phrase), `missing ${phrase}`);
  }
});

test('catalog stays inside Codex listing budget class', () => {
  const catalog = JSON.parse(catalogBytes(repositoryRoot));
  const descChars = catalog.skills.reduce((sum, skill) => sum + String(skill.description || '').length, 0);
  assert.ok(catalog.count <= 200, `catalog unexpectedly huge: ${catalog.count}`);
  assert.ok(descChars <= 8000, `description sum ${descChars} exceeds 8k listing class`);
  for (const skill of catalog.skills) {
    assert.ok(String(skill.description || '').length <= 1024, skill.name);
  }
});
