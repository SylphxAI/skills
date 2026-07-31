import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import {
  checkAdrLifecycle,
  loadAdrRecords,
  matchTypedScope,
  resolveApplicableDecisionBundle,
  repositoryRoot,
  sha256Hex,
} from '../scripts/adr-lifecycle.mjs';

const fixturesPath = path.join(repositoryRoot, 'tests/fixtures/adr/representative-tasks.json');

test('ADR corpus is structurally valid', () => {
  const { errors, records } = checkAdrLifecycle(repositoryRoot);
  assert.equal(errors.length, 0, errors.join('\n'));
  assert.ok(records.length >= 35);
});

test('typed_scope uses AND across facets and OR within facet', () => {
  const selector = {
    repository: ['SylphxAI/skills'],
    capability_id: ['auto-deploy'],
    surface: ['api', 'ops'],
  };
  assert.equal(
    matchTypedScope(selector, {
      repository: ['SylphxAI/skills'],
      capability_id: ['auto-deploy'],
      surface: ['ops'],
    }).match,
    true,
  );
  assert.equal(
    matchTypedScope(selector, {
      repository: ['SylphxAI/skills'],
      capability_id: ['runtime-sync'],
      surface: ['ops'],
    }).match,
    false,
  );
  // same surface alone is not enough without repository/capability
  assert.equal(
    matchTypedScope(selector, {
      repository: ['Other/repo'],
      capability_id: ['auto-deploy'],
      surface: ['ops'],
    }).match,
    false,
  );
  const missing = matchTypedScope(selector, {
    capability_id: ['auto-deploy'],
    surface: ['ops'],
  });
  assert.equal(missing.unresolved, true);
});

test('sibling amendment lex order does not invent semantic winners', () => {
  // Construct mini-corpus: base + two exclusive sibling amendments same key
  const base = {
    id: 'ADR-BASE',
    file: 'docs/adr/ADR-BASE.md',
    filename: 'ADR-BASE.md',
    status: 'accepted',
    decision_owner: 't',
    decision_mode: 'exclusive',
    decision_key: 'k',
    typed_scope: { repository: ['SylphxAI/skills'], capability_id: ['x'], surface: ['agent'] },
    amends: [],
    supersedes: [],
    relates: [],
    contentDigest: 'b',
  };
  const a = {
    ...base,
    id: 'ADR-A',
    file: 'docs/adr/ADR-A.md',
    decision_key: 'k',
    amends: [{ id: 'ADR-BASE', decision_key: null }],
    contentDigest: 'a',
  };
  const c = {
    ...base,
    id: 'ADR-C',
    file: 'docs/adr/ADR-C.md',
    decision_key: 'k',
    amends: [{ id: 'ADR-BASE', decision_key: null }],
    contentDigest: 'c',
  };
  const bundle = resolveApplicableDecisionBundle(
    { typed_scope: { capability_id: ['x'], surface: ['agent'] } },
    [base, a, c],
    { source_revision: 'unit' },
  );
  assert.ok(bundle.unresolved_sources.some((item) => item.reason === 'sibling_amendment_conflict_requires_explicit_chain'
    || item.reason === 'exclusive_decision_key_conflict'));
});

test('supersession does not resurrect earlier targets', () => {
  const mk = (id, supersedes = [], scopeCap = 'x') => ({
    id,
    file: `docs/adr/${id}.md`,
    filename: `${id}.md`,
    status: 'accepted',
    decision_owner: 't',
    decision_mode: 'complementary',
    decision_key: null,
    typed_scope: { repository: ['SylphxAI/skills'], capability_id: [scopeCap], surface: ['agent'] },
    amends: [],
    supersedes: supersedes.map((target) => ({ id: target, decision_key: null })),
    relates: [],
    contentDigest: id,
  });
  const a = mk('ADR-A');
  const b = mk('ADR-B', ['ADR-A']);
  const c = mk('ADR-C', ['ADR-B']);
  const bundle = resolveApplicableDecisionBundle(
    { typed_scope: { capability_id: ['x'], surface: ['agent'] } },
    [a, b, c],
    { source_revision: 'unit' },
  );
  assert.deepEqual(bundle.base_sources.map((s) => s.id), ['ADR-C']);
  assert.ok(bundle.excluded_sources.some((e) => e.id === 'ADR-A' && e.reason === 'full_superseded'));
  assert.ok(bundle.excluded_sources.some((e) => e.id === 'ADR-B' && e.reason === 'full_superseded'));
});

test('representative task fixtures match exact source ids and reason codes', () => {
  const { records } = loadAdrRecords(repositoryRoot);
  const doc = JSON.parse(readFileSync(fixturesPath, 'utf8'));
  for (const fixture of doc.fixtures) {
    const bundle = resolveApplicableDecisionBundle(fixture.task, records, {
      source_revision: 'fixture-corpus',
    });
    assert.deepEqual(
      bundle.base_sources.map((s) => s.id),
      fixture.expect.base_ids,
      fixture.task.id,
    );
    assert.deepEqual(
      bundle.ordered_amendment_sources.map((s) => s.id),
      fixture.expect.amendment_ids,
      fixture.task.id,
    );
    assert.deepEqual(
      bundle.excluded_sources.filter((e) => e.reason === 'full_superseded').map((e) => e.id).sort(),
      fixture.expect.full_superseded_ids,
      fixture.task.id,
    );
    assert.deepEqual(bundle.applicable_decision_keys, fixture.expect.applicable_decision_keys, fixture.task.id);
    assert.deepEqual(
      [...new Set(bundle.unresolved_sources.map((u) => u.reason))].sort(),
      fixture.expect.unresolved_reasons,
      fixture.task.id,
    );
  }
});

test('resolver replay is stable for identical inputs', () => {
  const { records } = loadAdrRecords(repositoryRoot);
  const task = { typed_scope: { capability_id: ['runtime-sync'], surface: ['cli'] } };
  const a = resolveApplicableDecisionBundle(task, records, { source_revision: 'rev' });
  const b = resolveApplicableDecisionBundle(task, records, { source_revision: 'rev' });
  assert.equal(a.provenance.input_digest, b.provenance.input_digest);
  assert.equal(a.provenance.resolver_artifact_digest, b.provenance.resolver_artifact_digest);
});

test('bundle and record schemas validate sample output', () => {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  const recordSchema = JSON.parse(readFileSync(path.join(repositoryRoot, 'schemas/adr-record.schema.json'), 'utf8'));
  const bundleSchema = JSON.parse(readFileSync(path.join(repositoryRoot, 'schemas/applicable-decision-bundle.schema.json'), 'utf8'));
  const validateRecord = ajv.compile(recordSchema);
  const validateBundle = ajv.compile(bundleSchema);
  const { records } = loadAdrRecords(repositoryRoot);
  const sample = records[0];
  assert.equal(validateRecord({
    id: sample.id,
    status: sample.status,
    decision_owner: sample.decision_owner,
    contributors: sample.contributors,
    decision_mode: sample.decision_mode,
    decision_key: sample.decision_key,
    typed_scope: sample.typed_scope,
    amends: sample.amends.map((x) => x.id),
    supersedes: sample.supersedes.map((x) => x.id),
    relates: sample.relates.map((x) => x.id),
  }), true, JSON.stringify(validateRecord.errors));
  const bundle = resolveApplicableDecisionBundle(
    { typed_scope: { capability_id: ['documentation-authority'], surface: ['agent'] } },
    records,
    { source_revision: 'schema-check' },
  );
  assert.equal(validateBundle(bundle), true, JSON.stringify(validateBundle.errors));
});
