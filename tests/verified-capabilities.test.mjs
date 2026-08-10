import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { fileURLToPath } from 'node:url';
import { buildCatalog, repositoryRoot } from '../scripts/build-catalog.mjs';
import { outcomeReceiptSchema } from '../scripts/check.mjs';

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const contractSchema = ajv.compile(JSON.parse(readFileSync(path.join(repositoryRoot, 'schemas/capability-contract.schema.json'), 'utf8')));
const qualificationSchema = ajv.compile(JSON.parse(readFileSync(path.join(repositoryRoot, 'schemas/qualification-record.schema.json'), 'utf8')));
const receiptSchema = ajv.compile(JSON.parse(readFileSync(path.join(repositoryRoot, 'schemas/outcome-receipt.schema.json'), 'utf8')));

const skillsRoot = path.join(repositoryRoot, 'skills');
const folders = readdirSync(skillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

test('every listing package carries a schema-valid capability contract', () => {
  assert.ok(folders.length >= 50, `expected a real catalog, got ${folders.length}`);
  for (const folder of folders) {
    const record = JSON.parse(readFileSync(path.join(skillsRoot, folder, 'capability.json'), 'utf8'));
    assert.equal(record.name, folder, folder);
    assert.equal(contractSchema(record), true, `${folder}: ${JSON.stringify(contractSchema.errors)}`);
    assert.equal(record.outcome.receiptSchema, 'outcome-receipt.schema.json', folder);
  }
});

test('every listing package carries a schema-valid qualification record', () => {
  for (const folder of folders) {
    const record = JSON.parse(readFileSync(path.join(skillsRoot, folder, 'qualification.json'), 'utf8'));
    assert.equal(record.name, folder, folder);
    assert.equal(qualificationSchema(record), true, `${folder}: ${JSON.stringify(qualificationSchema.errors)}`);
    if (record.status === 'qualified') {
      assert.ok(Date.parse(record.expiresAt) > Date.now(), `${folder}: qualified needs future expiry`);
      assert.ok(record.evidence.length > 0, `${folder}: qualified needs evidence`);
      assert.ok(record.evidence.every((item) => item.digest && item.uri), `${folder}: evidence needs digest+uri`);
    }
  }
});

test('catalog qualification projection matches package records', () => {
  const catalog = buildCatalog(repositoryRoot);
  assert.equal(catalog.count, folders.length);
  const qualifiedFromPackages = folders
    .filter((folder) => JSON.parse(readFileSync(path.join(skillsRoot, folder, 'qualification.json'), 'utf8')).status === 'qualified')
    .sort();
  assert.deepEqual(catalog.qualification.qualifiedNames, qualifiedFromPackages);
  assert.equal(catalog.qualification.qualified, qualifiedFromPackages.length);
  assert.equal(catalog.qualification.total, folders.length);
  for (const skill of catalog.skills) {
    assert.equal(skill.qualified, skill.qualificationStatus === 'qualified');
    assert.ok(skill.capability.job);
    assert.ok(skill.capability.outcomeObservable);
  }
});

test('outcome-receipt schema accepts a valid receipt and rejects invalid ones', () => {
  const valid = {
    schemaVersion: 1,
    receiptId: 'rcpt_01HZX',
    capability: { name: 'author-skill', packageDigest: `sha256:${'a'.repeat(64)}`, sourceRevision: '7d6f7ab', qualified: false },
    context: { runtime: 'codex', model: 'test-model', attemptId: 'attempt-1' },
    oracle: { owner: 'user-system', declaredAt: '2026-08-10T00:00:00.000Z' },
    result: { status: 'succeeded', observedAt: '2026-08-10T00:01:00.000Z', evidenceRef: 'urn:test:1' },
    recordedAt: '2026-08-10T00:02:00.000Z',
    recordedBy: 'control-plane',
  };
  assert.equal(receiptSchema(valid), true, JSON.stringify(receiptSchema.errors));
  assert.equal(outcomeReceiptSchema(valid), true);

  const bad = { ...valid, result: { status: 'invented', observedAt: '2026-08-10T00:01:00.000Z' } };
  assert.equal(receiptSchema(bad), false);
  const noCapability = { ...valid };
  delete noCapability.capability;
  assert.equal(receiptSchema(noCapability), false);
});

test('unqualified default is honest: a claim requires evidence', () => {
  const record = {
    schemaVersion: 1,
    name: 'author-skill',
    status: 'qualified',
    evaluator: null,
    qualifiedAt: null,
    expiresAt: null,
    evidence: [],
    compatibility: [],
  };
  assert.equal(qualificationSchema(record), false, 'qualified without evaluator/evidence must fail');
  const honest = { ...record, status: 'unqualified' };
  assert.equal(qualificationSchema(honest), true);
});
