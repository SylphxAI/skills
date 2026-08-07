import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { buildCatalog, repositoryRoot } from '../scripts/build-catalog.mjs';

const skillsRoot = path.join(repositoryRoot, 'skills');

test('no methods bag or standards bag', () => {
  for (const banned of ['sylphx-methods', 'consult-sylphx-methods', 'build-keel-title']) {
    assert.equal(existsSync(path.join(skillsRoot, banned)), false, banned);
  }
  assert.equal(existsSync(path.join(skillsRoot, 'adopt-repo-standards', 'references', 'policies')), false);
  assert.equal(existsSync(path.join(skillsRoot, 'delivery-standard')), false);
  assert.equal(existsSync(path.join(skillsRoot, 'engineering-standard')), false);
});

test('constraint packs stay under applying skills, not listings', () => {
  assert.ok(existsSync(path.join(skillsRoot, 'build-product', 'references', 'engineering-standard', 'README.md')));
  assert.ok(existsSync(path.join(skillsRoot, 'drive-to-delivery', 'references', 'source-authoring-standard', 'README.md')));
  assert.ok(existsSync(path.join(skillsRoot, 'build-product', 'references', 'keel-app', 'METHOD.md')));
  assert.ok(existsSync(path.join(skillsRoot, 'review-domain', 'references', 'INDEX.md')));
  assert.ok(existsSync(path.join(skillsRoot, 'design-product', 'references', 'app', 'METHOD.md')));
});

test('requestable jobs are listings (not size-demoted)', () => {
  for (const id of [
    'finish-product',
    'prototype-product',
    'analyze-critically',
    'distill-source-to-skill',
    'curate-skill-repository',
    'design-skill-evals',
    'produce-game-2d-sprites',
    'craft-product-interface',
    'run-open-product-betterment',
  ]) {
    assert.ok(existsSync(path.join(skillsRoot, id, 'SKILL.md')), id);
  }
});

test('author-skill forbids hard count caps and size-only demotion', () => {
  const body = readFileSync(path.join(skillsRoot, 'author-skill', 'SKILL.md'), 'utf8');
  for (const needle of [
    'Do not invent a hard global skill count cap',
    'Do not demote a real requestable job just to shrink the catalog',
    'progressive disclosure',
    'Org constraint packs are **never** listing skills',
  ]) {
    assert.ok(body.includes(needle), needle);
  }
  assert.equal(body.includes('15–25'), false);
  assert.equal(body.includes('15-25'), false);
});

test('catalog is workflow listings under description budget only', () => {
  const catalog = buildCatalog(repositoryRoot);
  const folders = readdirSync(skillsRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
  assert.equal(catalog.count, folders.length);
  // soft sanity only — not a product cap
  assert.ok(catalog.count >= 40, `unexpectedly small catalog: ${catalog.count}`);
  const descSum = catalog.skills.reduce((n, s) => n + String(s.description || '').length, 0);
  assert.ok(descSum <= 12000, `description sum ${descSum}`);
  for (const skill of catalog.skills) {
    assert.ok(!skill.name.endsWith('-standard'), skill.name);
    assert.ok(!skill.name.startsWith('review-') || skill.name === 'review-domain', skill.name);
  }
  const stored = JSON.parse(readFileSync(path.join(repositoryRoot, 'catalog.json'), 'utf8'));
  assert.deepEqual(stored, catalog);
});

test('Quality North Star is sole engineering quality vocabulary', () => {
  const full = readFileSync(
    path.join(
      skillsRoot,
      'build-product',
      'references',
      'engineering-standard',
      'references',
      'full-standard.md',
    ),
    'utf8',
  );
  const predicates = readFileSync(
    path.join(
      skillsRoot,
      'build-product',
      'references',
      'engineering-standard',
      'references',
      'binding-predicates.md',
    ),
    'utf8',
  );
  assert.ok(full.includes('## Quality North Star'));
  assert.ok(predicates.includes('## Quality North Star'));
  assert.equal(full.includes('## Modern Technical Bar'), false);
  assert.equal(predicates.includes('## Modern technical bar'), false);
  for (const id of [
    'q-depth',
    'q-correctness',
    'q-simplicity',
    'q-readability',
    'q-maintainability',
    'q-scalability',
    'q-performance',
    'q-reliability',
    'q-availability',
    'q-resilience',
    'q-observability',
    'q-security',
    'q-testability',
    'q-evolvability',
  ]) {
    assert.ok(full.includes(id), id);
    assert.ok(predicates.includes(id), id);
  }
  for (const id of [
    'eng-quality-01',
    'eng-quality-02',
    'eng-depth-01',
    'eng-readability-01',
    'eng-maintain-01',
    'eng-avail-01',
  ]) {
    assert.ok(predicates.includes(id), id);
  }
});

