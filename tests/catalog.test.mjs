import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { buildCatalog, repositoryRoot } from '../scripts/build-catalog.mjs';

test('catalog is deterministic and covers every canonical package', () => {
  const catalog = buildCatalog(repositoryRoot);
  assert.equal(catalog.schemaVersion, 1);
  assert.ok(catalog.count > 0);
  assert.equal(catalog.skills.length, catalog.count);
  assert.deepEqual(catalog.skills.map((skill) => skill.name), [...catalog.skills.map((skill) => skill.name)].sort());
  assert.equal(new Set(catalog.skills.map((skill) => skill.name)).size, catalog.count);
  const stored = JSON.parse(readFileSync(new URL('../catalog.json', import.meta.url), 'utf8'));
  assert.deepEqual(stored, catalog);
});
