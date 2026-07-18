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
  const fleetProfile = catalog.skills.find((skill) => skill.name === 'fleet-engineering-profile').profile;
  assert.deepEqual(fleetProfile, {
    id: 'fleet-engineering-profile',
    revision: '2026-07-18.2',
    contentDigest: 'sha256:5aecef66e247ef87249dffd950e8b998139eac6bfb65ca7b48252bd9c1b9fec1',
    lifecycle: 'active',
    authorityClass: 'governance-constraint',
  });
  const stored = JSON.parse(readFileSync(new URL('../catalog.json', import.meta.url), 'utf8'));
  assert.deepEqual(stored, catalog);
});
