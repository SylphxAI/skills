import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { fileURLToPath } from 'node:url';
import { packageDigest } from '../runtime/package-digest.mjs';
import { buildCatalog, repositoryRoot } from '../scripts/build-catalog.mjs';
import { incrementalValueEvidenceError, qualifiedDigestError } from '../scripts/qualification-integrity.mjs';

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const qualificationSchema = ajv.compile(JSON.parse(readFileSync(path.join(repositoryRoot, 'schemas/qualification-record.schema.json'), 'utf8')));

const skillsRoot = path.join(repositoryRoot, 'skills');
const folders = readdirSync(skillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const evalSuiteSchema = ajv.compile(JSON.parse(readFileSync(path.join(repositoryRoot, 'schemas/eval-suite.schema.json'), 'utf8')));

test('listing packages do not carry a parallel capability.json contract', () => {
  assert.ok(folders.length > 0, 'catalog is empty');
  for (const folder of folders) {
    assert.equal(
      existsSync(path.join(skillsRoot, folder, 'capability.json')),
      false,
      `${folder}: capability.json is retired; job lives in SKILL.md`,
    );
  }
  assert.equal(
    existsSync(path.join(repositoryRoot, 'schemas/capability-contract.schema.json')),
    false,
    'house capability-contract schema must not stay under schemas/',
  );
  const author = readFileSync(path.join(skillsRoot, 'author-skill', 'SKILL.md'), 'utf8');
  assert.match(author, /Do \*\*not\*\* write `capability\.json`/);
  assert.match(author, /Do \*\*not\*\* write `project\.manifest\.json`/);
  assert.equal(/capability\.json\s+# required/.test(author), false);
  assert.equal(author.includes('.doctrine/project.json'), false);
  assert.equal(author.includes('PROJECT.json'), false);
});

test('skills do not ship a product-artifact-envelope schema', () => {
  assert.equal(
    existsSync(path.join(repositoryRoot, 'schemas/product-artifact-envelope.schema.json')),
    false,
  );
  for (const folder of folders) {
    assert.equal(
      existsSync(path.join(skillsRoot, folder, 'references', 'product-artifact-envelope.schema.json')),
      false,
      `${folder}: leftover envelope schema`,
    );
  }
  const author = readFileSync(path.join(skillsRoot, 'author-skill', 'SKILL.md'), 'utf8');
  assert.match(author, /product-artifact-envelope/);
});

function readQualification(folder) {
  const file = path.join(skillsRoot, folder, 'qualification.json');
  if (!existsSync(file)) return { name: folder, status: 'unqualified' };
  return JSON.parse(readFileSync(file, 'utf8'));
}

test('qualification.json is optional; missing means unqualified', () => {
  for (const folder of folders) {
    const file = path.join(skillsRoot, folder, 'qualification.json');
    if (!existsSync(file)) continue;
    const record = JSON.parse(readFileSync(file, 'utf8'));
    assert.equal(record.name, folder, folder);
    assert.equal(qualificationSchema(record), true, `${folder}: ${JSON.stringify(qualificationSchema.errors)}`);
    if (record.status === 'qualified') {
      assert.ok(Date.parse(record.expiresAt) > Date.now(), `${folder}: qualified needs future expiry`);
      assert.ok(record.evidence.length > 0, `${folder}: qualified needs evidence`);
      assert.ok(record.evidence.every((item) => item.digest && item.uri), `${folder}: evidence needs digest+uri`);
      assert.match(record.packageDigest || '', /^sha256:[0-9a-f]{64}$/, `${folder}: qualified needs packageDigest`);
    }
  }
});

test('catalog qualification projection matches package records', () => {
  const catalog = buildCatalog(repositoryRoot);
  assert.equal(catalog.count, folders.length);
  const qualifiedFromPackages = folders
    .filter((folder) => readQualification(folder).status === 'qualified')
    .sort();
  assert.deepEqual(catalog.qualification.qualifiedNames, qualifiedFromPackages);
  assert.equal(catalog.qualification.qualified, qualifiedFromPackages.length);
  assert.equal(catalog.qualification.total, folders.length);
  for (const skill of catalog.skills) {
    assert.equal(skill.qualified, skill.qualificationStatus === 'qualified');
    assert.equal(skill.capability, undefined);
    assert.ok(skill.name);
    assert.ok(skill.description);
  }
});

test('every eval suite is schema-valid and bound to its capability', () => {
  const withSuites = folders.filter((folder) => existsSync(path.join(skillsRoot, folder, 'evals', 'suite.json')));
  assert.ok(withSuites.length > 0, 'wave-1 suites expected');
  for (const folder of withSuites) {
    const suite = JSON.parse(readFileSync(path.join(skillsRoot, folder, 'evals', 'suite.json'), 'utf8'));
    assert.equal(suite.capability, folder, folder);
    assert.equal(evalSuiteSchema(suite), true, `${folder}: ${JSON.stringify(evalSuiteSchema.errors)}`);
  }
});

test('qualified packages carry suites, on-disk evidence, and future expiry', () => {
  const qualified = folders.filter((folder) => readQualification(folder).status === 'qualified');
  for (const folder of qualified) {
    const record = readQualification(folder);
    assert.ok(existsSync(path.join(skillsRoot, folder, 'evals', 'suite.json')), `${folder}: suite`);
    assert.ok(Date.parse(record.expiresAt) > Date.now(), `${folder}: future expiry`);
    assert.ok(record.evidence.length > 0, `${folder}: qualified needs evidence`);
    for (const item of record.evidence) {
      assert.match(item.digest, /^sha256:[0-9a-f]{64}$/, `${folder}: ${item.id}`);
      assert.ok(existsSync(path.join(repositoryRoot, item.uri)), `${folder}: evidence on disk ${item.uri}`);
    }
    const current = packageDigest(path.join(skillsRoot, folder));
    assert.equal(qualifiedDigestError(record, current), null, `${folder}: live digest bind`);
    const suite = JSON.parse(readFileSync(path.join(skillsRoot, folder, 'evals', 'suite.json'), 'utf8'));
    assert.equal(incrementalValueEvidenceError(record, suite), null, `${folder}: incremental-value honesty`);
  }
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
