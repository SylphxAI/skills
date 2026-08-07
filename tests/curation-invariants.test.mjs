import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { buildCatalog, repositoryRoot } from '../scripts/build-catalog.mjs';

const skillsRoot = path.join(repositoryRoot, 'skills');

const packOwners = {
  'project-manifest-standard': 'adopt-repo-standards',
  'enterprise-control-plane-standard': 'adopt-repo-standards',
  'enterprise-profile-standard': 'adopt-repo-standards',
  'engineering-standard': 'build-product',
  'risk-matched-verification-standard': 'build-product',
  'sylphx-platform-first-policy': 'build-product',
  'technology-stack-profile': 'select-dependency-versions',
  'source-authoring-standard': 'drive-to-delivery',
  'delivery-standard': 'drive-to-delivery',
  'ci-admission-standard': 'drive-to-delivery',
  'ci-runner-capacity-standard': 'drive-to-delivery',
  'parallel-change-integration-standard': 'drive-to-delivery',
  'decision-quality-standard': 'record-structured-deliberation',
  'evidence-and-claims-standard': 'synthesize-evidence-brief',
  'commercial-decision-standard': 'compose-product-portfolio',
  'review-solicitation-policy': 'run-product-feedback-loop',
  'specification-control-plane-standard': 'engineer-testable-requirements',
  'work-coordination-standard': 'select-next-work',
  'agent-native-standard': 'engineer-agent-context',
  'agent-first-development-standard': 'engineer-agent-context',
  'instruction-evolution-standard': 'author-skill',
};

test('no methods-bag or retired hide packages', () => {
  for (const banned of ['sylphx-methods', 'consult-sylphx-methods', 'build-keel-title']) {
    assert.equal(existsSync(path.join(skillsRoot, banned)), false, banned);
  }
  assert.equal(existsSync(path.join(skillsRoot, 'adopt-repo-standards', 'references', 'policies')), false);
});

test('constraint packs have exactly one workflow owner under references', () => {
  for (const [pack, owner] of Object.entries(packOwners)) {
    const owned = path.join(skillsRoot, owner, 'references', pack, 'README.md');
    assert.ok(existsSync(owned), `${pack} missing under ${owner}`);
    assert.equal(existsSync(path.join(skillsRoot, pack)), false, `${pack} must not be a listing`);
    // no duplicate trees
    for (const skill of readdirSync(skillsRoot, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)) {
      if (skill === owner) continue;
      assert.equal(
        existsSync(path.join(skillsRoot, skill, 'references', pack)),
        false,
        `duplicate ${pack} under ${skill}`,
      );
    }
  }
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
