import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { buildCatalog, repositoryRoot } from '../scripts/build-catalog.mjs';

const skillsRoot = path.join(repositoryRoot, 'skills');

const ACTIONS = [
  'adopt-repo-standards',
  'author-skill',
  'build-product',
  'design-product',
  'drive-to-delivery',
  'engineer-agent-context',
  'execute-hard-cutover',
  'maintain-product',
  'model-security-threats',
  'operate-customer-support',
  'produce-product-assets',
  'research-user-needs',
  'review-domain',
  'run-incident-response',
  'select-dependency-versions',
  'select-next-work',
  'synthesize-evidence-brief',
  'synthesize-market-research',
  'verify-local-web-preview',
  'write-high-signal-update',
];

const DEMOTE_MARKERS = [
  'prototype-product',
  'finish-product',
  'expand-product',
  'pursue-product-objective',
  'analyze-critically',
  'distill-source-to-skill',
  'curate-skill-repository',
  'design-skill-evals',
  'build-payment-readiness',
  'craft-product-interface',
];

test('atomic action catalog is finite and exact', () => {
  const folders = readdirSync(skillsRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
  assert.deepEqual(folders, [...ACTIONS].sort());
  assert.ok(folders.length <= 25, `too many actions: ${folders.length}`);
  assert.ok(folders.length >= 15, `too few actions: ${folders.length}`);
});

test('demoted jobs are not listings and exist as owner references', () => {
  for (const banned of DEMOTE_MARKERS) {
    assert.equal(existsSync(path.join(skillsRoot, banned)), false, banned);
  }
  assert.ok(existsSync(path.join(skillsRoot, 'build-product', 'references', 'prototype', 'METHOD.md')));
  assert.ok(existsSync(path.join(skillsRoot, 'build-product', 'references', 'finish', 'METHOD.md')));
  assert.ok(existsSync(path.join(skillsRoot, 'author-skill', 'references', 'distill-source', 'METHOD.md')));
  assert.ok(existsSync(path.join(skillsRoot, 'author-skill', 'references', 'curate-repository', 'METHOD.md')));
  assert.ok(existsSync(path.join(skillsRoot, 'synthesize-evidence-brief', 'references', 'critical-analysis', 'METHOD.md')));
  assert.ok(existsSync(path.join(skillsRoot, 'produce-product-assets', 'references', 'game-2d-sprites', 'METHOD.md')));
});

test('no methods bag or standards bag', () => {
  for (const banned of ['sylphx-methods', 'consult-sylphx-methods', 'build-keel-title']) {
    assert.equal(existsSync(path.join(skillsRoot, banned)), false, banned);
  }
  assert.equal(existsSync(path.join(skillsRoot, 'adopt-repo-standards', 'references', 'policies')), false);
  assert.equal(existsSync(path.join(skillsRoot, 'delivery-standard')), false);
  assert.equal(existsSync(path.join(skillsRoot, 'engineering-standard')), false);
});

test('author-skill encodes atomic-action model', () => {
  const body = readFileSync(path.join(skillsRoot, 'author-skill', 'SKILL.md'), 'utf8');
  for (const needle of [
    'atomic action',
    'Requestable',
    'Independent outcome',
    'Org constraint packs are **never** listing skills',
    'Lifecycle fragment',
    '15–25',
  ]) {
    assert.ok(body.includes(needle), needle);
  }
});

test('constraint packs remain under applying owners', () => {
  assert.ok(existsSync(path.join(skillsRoot, 'build-product', 'references', 'engineering-standard', 'README.md')));
  assert.ok(existsSync(path.join(skillsRoot, 'drive-to-delivery', 'references', 'source-authoring-standard', 'README.md')));
  assert.ok(existsSync(path.join(skillsRoot, 'build-product', 'references', 'keel-app', 'METHOD.md')));
  assert.ok(existsSync(path.join(skillsRoot, 'review-domain', 'references', 'INDEX.md')));
});

test('catalog matches folders under budget', () => {
  const catalog = buildCatalog(repositoryRoot);
  const folders = readdirSync(skillsRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
  assert.equal(catalog.count, folders.length);
  assert.equal(catalog.count, ACTIONS.length);
  const descSum = catalog.skills.reduce((n, s) => n + String(s.description || '').length, 0);
  assert.ok(descSum <= 8000, `description sum ${descSum}`);
  for (const skill of catalog.skills) {
    assert.ok(!skill.name.endsWith('-standard'), skill.name);
    assert.ok(!skill.name.startsWith('review-') || skill.name === 'review-domain', skill.name);
    assert.ok(!skill.name.startsWith('analyze-'), skill.name);
  }
  const stored = JSON.parse(readFileSync(path.join(repositoryRoot, 'catalog.json'), 'utf8'));
  assert.deepEqual(stored, catalog);
});
