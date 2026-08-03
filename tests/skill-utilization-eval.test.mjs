import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildCatalog } from '../scripts/build-catalog.mjs';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fixturePath = path.join(repositoryRoot, 'tests/fixtures/skill-utilization-eval.json');
const residualPath = path.join(repositoryRoot, 'docs/reference/skill-utilization-eval-residual.md');

const REQUIRED_SUITES = ['floor', 'critical-skill', 'near-neighbour', 'abstention', 'compound'];
const FAILURE_CLASSES = new Set([
  'l0_miss',
  'skill_miss',
  'tool_policy_gap',
  'model_limit',
  'listing_truncation',
]);

test('utilization residual document still declares open residual and exit criteria', () => {
  const text = readFileSync(residualPath, 'utf8');
  assert.match(text, /Open residual/i);
  assert.match(text, /behavior oracles/i);
  assert.match(text, /Exit criteria/i);
  assert.match(text, /Must not claim/i);
  assert.match(text, /Open residual/i);
  assert.match(text, /not\*\* close the residual|does \*\*not\*\* close the residual|still not\nutilization proof|still not utilization proof/i);
});

test('skill utilization eval fixtures cover required suites with behavior oracles', () => {
  const program = JSON.parse(readFileSync(fixturePath, 'utf8'));
  assert.equal(program.schemaVersion, 1);
  assert.ok(Array.isArray(program.cases));
  assert.ok(program.cases.length >= 20, `expected >=20 cases, got ${program.cases.length}`);

  const catalog = buildCatalog(repositoryRoot);
  const catalogNames = new Set(catalog.skills.map((skill) => skill.name));
  const bySuite = Object.fromEntries(REQUIRED_SUITES.map((suite) => [suite, 0]));
  const ids = new Set();

  for (const item of program.cases) {
    assert.ok(item.id && !ids.has(item.id), `duplicate or missing id: ${item.id}`);
    ids.add(item.id);
    assert.ok(REQUIRED_SUITES.includes(item.suite), `unknown suite ${item.suite} on ${item.id}`);
    bySuite[item.suite] += 1;
    assert.ok(typeof item.prompt === 'string' && item.prompt.length >= 12, `${item.id}: prompt too short`);
    assert.ok(Array.isArray(item.expectedSkills), `${item.id}: expectedSkills must be array`);
    for (const skill of item.expectedSkills) {
      assert.ok(catalogNames.has(skill), `${item.id}: expected skill missing from catalog: ${skill}`);
    }
    if (item.suite === 'abstention' || item.suite === 'floor') {
      // Floor/abstention may still mention skills in prose, but expected set is empty for pure L0/ordinary cases.
      // Allow critical floor cases that expect no domain skills.
      assert.equal(item.expectedSkills.length, 0, `${item.id}: floor/abstention must expect no domain skills`);
    }
    if (item.suite === 'critical-skill') {
      assert.ok(item.expectedSkills.length >= 1, `${item.id}: critical-skill needs expectedSkills`);
    }
    assert.ok(item.behaviorOracle?.mandatoryObservable, `${item.id}: missing behavior oracle`);
    assert.ok(
      item.behaviorOracle.mandatoryObservable.length >= 40,
      `${item.id}: oracle too shallow`,
    );
    assert.ok(Array.isArray(item.failureTaxonomy) && item.failureTaxonomy.length >= 1, `${item.id}: failure taxonomy`);
    for (const code of item.failureTaxonomy) {
      assert.ok(FAILURE_CLASSES.has(code), `${item.id}: unknown failure class ${code}`);
    }
    if (Array.isArray(item.nearNeighbours)) {
      for (const skill of item.nearNeighbours) {
        assert.ok(catalogNames.has(skill), `${item.id}: neighbour missing from catalog: ${skill}`);
      }
    }
  }

  assert.ok(bySuite.floor >= 3, `floor cases ${bySuite.floor}`);
  assert.ok(bySuite['critical-skill'] >= 10, `critical-skill cases ${bySuite['critical-skill']}`);
  assert.ok(bySuite['near-neighbour'] >= 5, `near-neighbour cases ${bySuite['near-neighbour']}`);
  assert.ok(bySuite.abstention >= 3, `abstention cases ${bySuite.abstention}`);
  assert.ok(bySuite.compound >= 1, `compound cases ${bySuite.compound}`);

  assert.ok(program.hostRuntimeResidual?.codex, 'codex host residual required');
  assert.ok(program.hostRuntimeResidual?.claude, 'claude host residual required');
  assert.ok(program.hostRuntimeResidual?.grok, 'grok host residual required');
  assert.equal(program.status, 'design-contract-and-oracle-fixtures');
  assert.match(
    JSON.stringify(program.hostRuntimeResidual).toLowerCase(),
    /not utilization proof|not automated|residual/,
  );
});

test('utilization fixtures are distinct from install-status claims', () => {
  const program = JSON.parse(readFileSync(fixturePath, 'utf8'));
  assert.ok(program.metricHierarchy.includes('behaviorOracle'));
  assert.ok(program.metricHierarchy.includes('notInstallStatusAlone'));
  assert.ok(program.pinnedAtAuthoring?.skillsCommit);
  assert.ok(program.pinnedAtAuthoring?.catalogDigestSha256OfCatalogJson?.startsWith('sha256:'));
});

test('utilization fixtures cover core product job Skills', () => {
  const program = JSON.parse(readFileSync(fixturePath, 'utf8'));
  const catalog = buildCatalog(repositoryRoot);
  const catalogNames = new Set(catalog.skills.map((skill) => skill.name));
  const required = [
    'prototype-product',
    'build-product',
    'maintain-product',
    'expand-product',
    'finish-product',
    'pursue-product-objective',
    'better-product',
    'author-skill',
    'drive-to-delivery',
    'select-next-work',
  ];
  const expected = new Set();
  for (const item of program.cases) {
    for (const skill of item.expectedSkills || []) expected.add(skill);
  }
  for (const skill of required) {
    assert.ok(catalogNames.has(skill), `catalog missing ${skill}`);
    assert.ok(expected.has(skill), `utilization fixtures missing expectedSkills coverage for ${skill}`);
  }
});

