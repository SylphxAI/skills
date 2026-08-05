import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function read(rel) {
  return readFileSync(path.join(root, rel), 'utf8');
}

const CORE = [
  'skills/source-authoring-standard/references/full-standard.md',
  'skills/source-authoring-standard/SKILL.md',
  'skills/pursue-product-objective/SKILL.md',
  'skills/run-open-product-betterment/SKILL.md',
];

const COMPOSE = [
  'skills/drive-to-delivery/SKILL.md',
  'skills/build-product/SKILL.md',
  'skills/maintain-product/SKILL.md',
  'skills/expand-product/SKILL.md',
  'skills/finish-product/SKILL.md',
  'skills/prototype-product/SKILL.md',
  'skills/execute-hard-cutover/SKILL.md',
  'skills/author-skill/SKILL.md',
  'skills/build-distribution-readiness/SKILL.md',
  'skills/decide-architecture-shape/SKILL.md',
  'skills/run-product-feedback-loop/SKILL.md',
];

test('source-authoring defines L1 batch, L2 atomic commits, L3 revert-safe PR', () => {
  const body = read('skills/source-authoring-standard/references/full-standard.md');
  assert.match(body, /Three layers/i);
  assert.match(body, /\*\*L1 Implementation\*\*/);
  assert.match(body, /\*\*L2 History\*\*/);
  assert.match(body, /\*\*L3 Integration \/ revert\*\*/);
  assert.match(body, /atomic commit/i);
  assert.match(body, /independently revertible|revert-safe|safe revert/i);
  assert.match(body, /squash/i);
  const entry = read('skills/source-authoring-standard/SKILL.md');
  assert.match(entry, /atomic PR commits|revert-safe PR/i);
});

test('pursue and open-betterment encode three-layer backbone', () => {
  for (const rel of [
    'skills/pursue-product-objective/SKILL.md',
    'skills/run-open-product-betterment/SKILL.md',
  ]) {
    const text = read(rel);
    assert.match(text, /\bL1\b/);
    assert.match(text, /\bL2\b/);
    assert.match(text, /\bL3\b/);
    assert.match(text, /source-authoring-standard/);
    assert.match(text, /atomic commit/i);
  }
});

test('high-EV mutating workflows compose source-authoring three layers', () => {
  for (const rel of COMPOSE) {
    const text = read(rel);
    assert.match(text, /source-authoring-standard/, `${rel} missing source-authoring compose`);
    assert.match(text, /\bL1\b/, `${rel} missing L1`);
    assert.match(text, /\bL2\b|\batomic\b/i, `${rel} missing L2/atomic`);
    assert.match(text, /\bL3\b|revert-safe|independently revertible/i, `${rel} missing L3/revert`);
  }
});

test('product-job-skills documents three source integration layers', () => {
  const text = read('docs/reference/product-job-skills.md');
  assert.match(text, /Source integration layers/);
  assert.match(text, /\*\*L1\*\*/);
  assert.match(text, /\*\*L2\*\*/);
  assert.match(text, /\*\*L3\*\*/);
});
