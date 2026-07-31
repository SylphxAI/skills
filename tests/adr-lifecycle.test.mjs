import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import {
  checkAdrLifecycle,
  loadAdrRecords,
  matchTypedScope,
  resolveApplicableDecisionBundle,
  repositoryRoot,
  resolverArtifactDigest,
  schemaDigest,
  validateAdrCorpus,
} from '../scripts/adr-lifecycle.mjs';

const fixturesPath = path.join(repositoryRoot, 'tests/fixtures/adr/representative-tasks.json');

function mkRecord(overrides) {
  return {
    file: `docs/adr/${overrides.id}.md`,
    filename: `${overrides.id}.md`,
    filenameId: overrides.id,
    status: 'accepted',
    decision_owner: 't',
    contributors: [],
    decision_mode: 'complementary',
    decision_key: null,
    typed_scope: {
      repository: ['SylphxAI/skills'],
      capability_id: ['x'],
      surface: ['agent'],
    },
    amends: [],
    supersedes: [],
    relates: [],
    contentDigest: overrides.id.padEnd(64, '0').slice(0, 64),
    markdown: '',
    date: '2026-07-31',
    ...overrides,
  };
}

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
      repository: ['Other/repo'],
      capability_id: ['auto-deploy'],
      surface: ['ops'],
    }).match,
    false,
  );
  assert.equal(
    matchTypedScope(selector, {
      capability_id: ['auto-deploy'],
      surface: ['ops'],
    }).unresolved,
    true,
  );
});

test('unregistered custom facet is unresolved even when values match', () => {
  const hit = matchTypedScope(
    { repository: ['SylphxAI/skills'], 'custom.unregistered.foo': ['a'] },
    { repository: ['SylphxAI/skills'], 'custom.unregistered.foo': ['a'] },
  );
  assert.equal(hit.match, false);
  assert.equal(hit.unresolved, true);
});

test('provenance digests hash resolver and schema artifacts, not bundle body', () => {
  const { records } = loadAdrRecords(repositoryRoot);
  const a = resolveApplicableDecisionBundle(
    { typed_scope: { capability_id: ['auto-deploy'], surface: ['ops'] } },
    records,
    { source_revision: 'rev-a' },
  );
  const b = resolveApplicableDecisionBundle(
    { typed_scope: { capability_id: ['runtime-sync'], surface: ['cli'] } },
    records,
    { source_revision: 'rev-b' },
  );
  assert.equal(a.provenance.resolver_artifact_digest, resolverArtifactDigest(repositoryRoot));
  assert.equal(b.provenance.resolver_artifact_digest, a.provenance.resolver_artifact_digest);
  assert.equal(a.provenance.schema_digest, schemaDigest(repositoryRoot));
  assert.equal(b.provenance.schema_digest, a.provenance.schema_digest);
  assert.notEqual(a.provenance.input_digest, b.provenance.input_digest);
});

test('resolve without source_revision is blocked', () => {
  const { records } = loadAdrRecords(repositoryRoot);
  const bundle = resolveApplicableDecisionBundle(
    { typed_scope: { capability_id: ['auto-deploy'], surface: ['ops'] } },
    records,
    {},
  );
  assert.equal(bundle.base_sources.length, 0);
  assert.ok(bundle.unresolved_sources.some((item) => (
    item.reason === 'missing_source_revision' && item.disposition === 'block'
  )));
});

test('base plus exclusive amendment chain is one owner lineage', () => {
  const base = mkRecord({
    id: 'ADR-BASE',
    decision_mode: 'exclusive',
    decision_key: 'k',
  });
  const amendment = mkRecord({
    id: 'ADR-AMEND',
    decision_mode: 'exclusive',
    decision_key: 'k',
    amends: [{ id: 'ADR-BASE', decision_key: null }],
  });
  const { errors } = validateAdrCorpus([base, amendment], []);
  assert.equal(errors.length, 0, errors.join('\n'));
  const bundle = resolveApplicableDecisionBundle(
    { typed_scope: { capability_id: ['x'], surface: ['agent'] } },
    [base, amendment],
    { source_revision: 'unit' },
  );
  assert.deepEqual(bundle.base_sources.map((s) => s.id), ['ADR-BASE']);
  assert.deepEqual(bundle.ordered_amendment_sources.map((s) => s.id), ['ADR-AMEND']);
  assert.equal(
    bundle.unresolved_sources.some((item) => item.reason === 'exclusive_decision_key_conflict'),
    false,
  );
});

test('exclusive same key with disjoint scopes is not a global collision', () => {
  const left = mkRecord({
    id: 'ADR-LEFT',
    decision_mode: 'exclusive',
    decision_key: 'same',
    typed_scope: {
      repository: ['SylphxAI/skills'],
      capability_id: ['alpha'],
      surface: ['agent'],
    },
  });
  const right = mkRecord({
    id: 'ADR-RIGHT',
    decision_mode: 'exclusive',
    decision_key: 'same',
    typed_scope: {
      repository: ['SylphxAI/skills'],
      capability_id: ['beta'],
      surface: ['agent'],
    },
  });
  const { errors } = validateAdrCorpus([left, right], []);
  assert.equal(errors.length, 0, errors.join('\n'));
});

test('sibling exclusive amendments without chain fail corpus admission', () => {
  const base = mkRecord({ id: 'ADR-BASE' });
  const a = mkRecord({
    id: 'ADR-A',
    decision_mode: 'exclusive',
    decision_key: 'k',
    amends: [{ id: 'ADR-BASE', decision_key: null }],
  });
  const b = mkRecord({
    id: 'ADR-B',
    decision_mode: 'exclusive',
    decision_key: 'k',
    amends: [{ id: 'ADR-BASE', decision_key: null }],
  });
  const { errors } = validateAdrCorpus([base, a, b], []);
  assert.ok(errors.some((error) => error.includes('sibling amendment conflict')), errors.join('\n'));
});

test('supersession does not resurrect earlier targets', () => {
  const a = mkRecord({ id: 'ADR-A' });
  const b = mkRecord({
    id: 'ADR-B',
    supersedes: [{ id: 'ADR-A', decision_key: null }],
  });
  const c = mkRecord({
    id: 'ADR-C',
    supersedes: [{ id: 'ADR-B', decision_key: null }],
  });
  const bundle = resolveApplicableDecisionBundle(
    { typed_scope: { capability_id: ['x'], surface: ['agent'] } },
    [a, b, c],
    { source_revision: 'unit' },
  );
  assert.deepEqual(bundle.base_sources.map((s) => s.id), ['ADR-C']);
  assert.ok(bundle.excluded_sources.some((e) => e.id === 'ADR-A' && e.reason === 'full_superseded'));
  assert.ok(bundle.excluded_sources.some((e) => e.id === 'ADR-B' && e.reason === 'full_superseded'));
});

test('unknown frontmatter fields fail closed at load', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'adr-unknown-'));
  mkdirSync(path.join(dir, 'docs', 'adr'), { recursive: true });
  mkdirSync(path.join(dir, 'schemas'), { recursive: true });
  mkdirSync(path.join(dir, 'scripts'), { recursive: true });
  writeFileSync(
    path.join(dir, 'docs/adr/ADR-FAKE-unknown-field.md'),
    `---
id: ADR-FAKE-unknown-field
status: accepted
date: 2026-07-31
decision_owner: SylphxAI
contributors: []
decision_mode: complementary
unexpected_semantic_field: true
typed_scope:
  repository:
    - SylphxAI/skills
  capability_id:
    - x
  surface:
    - agent
amends: []
supersedes: []
relates: []
---

# Fake
`,
  );
  // copy schemas + resolver for validator paths
  writeFileSync(
    path.join(dir, 'schemas/adr-record.schema.json'),
    readFileSync(path.join(repositoryRoot, 'schemas/adr-record.schema.json')),
  );
  writeFileSync(
    path.join(dir, 'schemas/applicable-decision-bundle.schema.json'),
    readFileSync(path.join(repositoryRoot, 'schemas/applicable-decision-bundle.schema.json')),
  );
  writeFileSync(
    path.join(dir, 'scripts/adr-lifecycle.mjs'),
    readFileSync(path.join(repositoryRoot, 'scripts/adr-lifecycle.mjs')),
  );
  const { errors } = loadAdrRecords(dir);
  assert.ok(errors.some((error) => error.includes('unexpected_semantic_field')), errors.join('\n'));
});

test('unresolved sources carry block|warn|scoped-block disposition', () => {
  const { records } = loadAdrRecords(repositoryRoot);
  const bundle = resolveApplicableDecisionBundle(
    { typed_scope: { capability_id: ['auto-deploy'], surface: ['ops'] } },
    records,
    { source_revision: 'disp' },
  );
  for (const item of bundle.unresolved_sources) {
    assert.ok(['block', 'warn', 'scoped-block'].includes(item.disposition), JSON.stringify(item));
  }
});

test('representative task fixtures match exact source ids and reason codes', () => {
  const { records } = loadAdrRecords(repositoryRoot);
  const doc = JSON.parse(readFileSync(fixturesPath, 'utf8'));
  for (const fixture of doc.fixtures) {
    const bundle = resolveApplicableDecisionBundle(fixture.task, records, {
      source_revision: 'fixture-corpus',
    });
    assert.deepEqual(bundle.base_sources.map((s) => s.id), fixture.expect.base_ids, fixture.task.id);
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
    supersedes: sample.supersedes.map((x) => (
      x.decision_key ? { id: x.id, decision_key: x.decision_key } : x.id
    )),
    relates: sample.relates.map((x) => x.id),
  }), true, JSON.stringify(validateRecord.errors));
  const bundle = resolveApplicableDecisionBundle(
    { typed_scope: { capability_id: ['documentation-authority'], surface: ['agent'] } },
    records,
    { source_revision: 'schema-check' },
  );
  assert.equal(validateBundle(bundle), true, JSON.stringify(validateBundle.errors));
});

test('ADR-0001 body partial supersessions are machine relations on superseders', () => {
  const { records } = loadAdrRecords(repositoryRoot);
  const byId = new Map(records.map((record) => [record.id, record]));
  const three = byId.get('ADR-0003-configurable-scheduled-synchronization');
  const install = byId.get('ADR-20260720-agent-owned-installation-and-constitution');
  assert.ok(three.supersedes.some((edge) => (
    edge.id === 'ADR-0001-public-agent-instruction-source' && edge.decision_key === 'autosync-schedule-and-hooks'
  )));
  assert.ok(install.supersedes.some((edge) => (
    edge.id === 'ADR-0001-public-agent-instruction-source'
    && edge.decision_key === 'installation-ownership-and-command-first-ui'
  )));
  const one = byId.get('ADR-0001-public-agent-instruction-source');
  assert.deepEqual(one.relates, []);
});


test('divergent exclusive descendant branches collide (not same lineage)', () => {
  const base = mkRecord({ id: 'ADR-BASE' });
  const a = mkRecord({
    id: 'ADR-A',
    amends: [{ id: 'ADR-BASE', decision_key: null }],
  });
  const b = mkRecord({
    id: 'ADR-B',
    amends: [{ id: 'ADR-BASE', decision_key: null }],
  });
  const a2 = mkRecord({
    id: 'ADR-A2',
    decision_mode: 'exclusive',
    decision_key: 'k',
    amends: [{ id: 'ADR-A', decision_key: null }],
  });
  const b2 = mkRecord({
    id: 'ADR-B2',
    decision_mode: 'exclusive',
    decision_key: 'k',
    amends: [{ id: 'ADR-B', decision_key: null }],
  });
  const records = [base, a, b, a2, b2];
  const { errors } = validateAdrCorpus(records, []);
  assert.ok(
    errors.some((error) => error.includes('exclusive decision_key k') || error.includes('sibling amendment conflict')),
    errors.join('\n'),
  );
  const bundle = resolveApplicableDecisionBundle(
    { typed_scope: { capability_id: ['x'], surface: ['agent'] } },
    records,
    { source_revision: 'unit' },
  );
  assert.ok(
    bundle.unresolved_sources.some((item) => item.reason === 'exclusive_decision_key_conflict'),
    JSON.stringify(bundle.unresolved_sources),
  );
});

test('disjoint-scope full superseder does not hide target exclusive conflict', () => {
  const x = mkRecord({
    id: 'ADR-X',
    decision_mode: 'exclusive',
    decision_key: 'k',
    typed_scope: {
      repository: ['SylphxAI/skills'],
      capability_id: ['alpha'],
      surface: ['agent'],
    },
  });
  const y = mkRecord({
    id: 'ADR-Y',
    decision_mode: 'exclusive',
    decision_key: 'k',
    typed_scope: {
      repository: ['SylphxAI/skills'],
      capability_id: ['alpha'],
      surface: ['agent'],
    },
  });
  const s = mkRecord({
    id: 'ADR-S',
    supersedes: [{ id: 'ADR-X', decision_key: null }],
    typed_scope: {
      repository: ['SylphxAI/skills'],
      capability_id: ['beta'],
      surface: ['agent'],
    },
  });
  const { errors } = validateAdrCorpus([x, y, s], []);
  assert.ok(
    errors.some((error) => error.includes('exclusive decision_key k')),
    `expected corpus fail, got: ${errors.join('\n')}`,
  );
  const bundle = resolveApplicableDecisionBundle(
    { typed_scope: { capability_id: ['alpha'], surface: ['agent'] } },
    [x, y, s],
    { source_revision: 'unit' },
  );
  // X is not full-superseded for alpha task because S is beta-only
  assert.ok(bundle.base_sources.some((ref) => ref.id === 'ADR-X' || ref.id === 'ADR-Y'));
  assert.ok(bundle.unresolved_sources.some((item) => item.reason === 'exclusive_decision_key_conflict'));
});

test('provenance binds only singular exact source_revision (no plural list field)', () => {
  const { records } = loadAdrRecords(repositoryRoot);
  const task = { typed_scope: { capability_id: ['runtime-sync'], surface: ['cli'] } };
  const a = resolveApplicableDecisionBundle(task, records, { source_revision: 'rev-1' });
  const b = resolveApplicableDecisionBundle(task, records, { source_revision: 'rev-2' });
  assert.equal(Object.prototype.hasOwnProperty.call(a.provenance, 'source_revisions'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(b.provenance, 'source_revisions'), false);
  assert.notEqual(a.provenance.input_digest, b.provenance.input_digest);
  assert.equal(a.provenance.source_revision, 'rev-1');
  assert.equal(b.provenance.source_revision, 'rev-2');
});

