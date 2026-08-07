import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { buildCatalog, repositoryRoot } from '../scripts/build-catalog.mjs';

const skillsRoot = path.join(repositoryRoot, 'skills');

test('no methods-bag package hides jobs from listing', () => {
  for (const banned of ['sylphx-methods', 'consult-sylphx-methods']) {
    assert.equal(existsSync(path.join(skillsRoot, banned)), false, banned);
  }
});

test('distill and design-skill-evals are first-class listings', () => {
  for (const id of ['distill-source-to-skill', 'design-skill-evals']) {
    assert.ok(existsSync(path.join(skillsRoot, id, 'SKILL.md')), id);
    assert.equal(
      existsSync(path.join(skillsRoot, 'author-skill', 'references', id)),
      false,
      `${id} must not remain only under author-skill`,
    );
  }
});

test('privacy reviews merged to one assessment skill', () => {
  assert.equal(existsSync(path.join(skillsRoot, 'review-privacy-data-lifecycle')), false);
  assert.equal(existsSync(path.join(skillsRoot, 'review-data-rights-operations')), false);
  assert.ok(existsSync(path.join(skillsRoot, 'review-privacy-and-data-rights', 'SKILL.md')));
});

test('documentation-standard demoted under source-authoring-standard', () => {
  assert.equal(existsSync(path.join(skillsRoot, 'documentation-standard')), false);
  assert.ok(existsSync(path.join(skillsRoot, 'source-authoring-standard', 'references', 'documentation-standard', 'METHOD.md')));
});

test('every review skill ships shared playbook skeleton', () => {
  const reviews = readdirSync(skillsRoot).filter((name) => name.startsWith('review-'));
  assert.ok(reviews.length >= 30);
  for (const name of reviews) {
    const skel = path.join(skillsRoot, name, 'references', 'review-playbook-skeleton.md');
    assert.ok(existsSync(skel), skel);
  }
});

test('catalog matches folders and stays inside listing budget', () => {
  const catalog = buildCatalog(repositoryRoot);
  const folders = readdirSync(skillsRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
  assert.equal(catalog.count, folders.length);
  assert.deepEqual(catalog.skills.map((s) => s.name), folders);
  const descSum = catalog.skills.reduce((n, s) => n + String(s.description || '').length, 0);
  assert.ok(descSum <= 8000, `description sum ${descSum}`);
  const stored = JSON.parse(readFileSync(path.join(repositoryRoot, 'catalog.json'), 'utf8'));
  assert.deepEqual(stored, catalog);
});
