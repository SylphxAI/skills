import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { buildCatalog, repositoryRoot } from '../scripts/build-catalog.mjs';

const skillsRoot = path.join(repositoryRoot, 'skills');
const policiesRoot = path.join(
  skillsRoot,
  'adopt-repo-standards',
  'references',
  'policies',
);

test('no methods-bag or retired hide packages', () => {
  for (const banned of ['sylphx-methods', 'consult-sylphx-methods', 'build-keel-title']) {
    assert.equal(existsSync(path.join(skillsRoot, banned)), false, banned);
  }
});

test('policies install under adopt-repo-standards references, not as listings', () => {
  assert.ok(existsSync(path.join(policiesRoot, 'delivery-standard', 'README.md')));
  assert.ok(existsSync(path.join(policiesRoot, 'engineering-standard', 'README.md')));
  assert.ok(existsSync(path.join(policiesRoot, 'source-authoring-standard', 'README.md')));
  assert.equal(existsSync(path.join(skillsRoot, 'delivery-standard')), false);
  assert.equal(existsSync(path.join(skillsRoot, 'engineering-standard')), false);
  assert.equal(existsSync(path.join(skillsRoot, 'source-authoring-standard')), false);
  // docs/policies is a human pointer only
  assert.ok(existsSync(path.join(repositoryRoot, 'docs', 'policies', 'README.md')));
  assert.equal(existsSync(path.join(repositoryRoot, 'docs', 'policies', 'delivery-standard')), false);
});

test('user-job consolidations exist', () => {
  assert.ok(existsSync(path.join(skillsRoot, 'design-product', 'SKILL.md')));
  assert.ok(existsSync(path.join(skillsRoot, 'design-product', 'references', 'app', 'METHOD.md')));
  assert.ok(existsSync(path.join(skillsRoot, 'design-product', 'references', 'game', 'METHOD.md')));
  assert.ok(existsSync(path.join(skillsRoot, 'build-product', 'references', 'keel-app', 'METHOD.md')));
  assert.ok(existsSync(path.join(skillsRoot, 'review-domain', 'SKILL.md')));
  assert.ok(existsSync(path.join(skillsRoot, 'review-domain', 'references', 'INDEX.md')));
  assert.equal(existsSync(path.join(skillsRoot, 'design-app')), false);
  assert.equal(existsSync(path.join(skillsRoot, 'design-game')), false);
  assert.equal(existsSync(path.join(skillsRoot, 'review-launch-readiness')), false);
  assert.equal(existsSync(path.join(skillsRoot, 'resolve-support-case')), false);
  assert.ok(existsSync(path.join(skillsRoot, 'operate-customer-support', 'references', 'resolve-one-case', 'METHOD.md')));
});

test('skill-meta workflows remain first-class', () => {
  for (const id of ['author-skill', 'distill-source-to-skill', 'design-skill-evals', 'curate-skill-repository']) {
    assert.ok(existsSync(path.join(skillsRoot, id, 'SKILL.md')), id);
  }
});

test('catalog is workflow-only listing under budget', () => {
  const catalog = buildCatalog(repositoryRoot);
  const folders = readdirSync(skillsRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
  assert.equal(catalog.count, folders.length);
  assert.ok(catalog.count <= 80, `catalog too large for user-job model: ${catalog.count}`);
  const descSum = catalog.skills.reduce((n, s) => n + String(s.description || '').length, 0);
  assert.ok(descSum <= 8000, `description sum ${descSum}`);
  for (const skill of catalog.skills) {
    assert.ok(!skill.name.endsWith('-standard'), skill.name);
    assert.ok(!skill.name.startsWith('review-') || skill.name === 'review-domain', skill.name);
  }
  const stored = JSON.parse(readFileSync(path.join(repositoryRoot, 'catalog.json'), 'utf8'));
  assert.deepEqual(stored, catalog);
});
