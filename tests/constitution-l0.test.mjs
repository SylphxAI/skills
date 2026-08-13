import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { catalogBytes, repositoryRoot } from '../scripts/build-catalog.mjs';
import { checkRepository, retiredSloganFindings, retiredSloganMatches } from '../scripts/check.mjs';

const constitution = readFileSync(path.join(repositoryRoot, 'runtime/constitution.md'), 'utf8');
const principles = readFileSync(path.join(repositoryRoot, 'docs/policies/PRINCIPLES.md'), 'utf8');

test('constitution stays thin and miss-class-A', () => {
  assert.ok(constitution.length <= 6000, `constitution too large: ${constitution.length}`);
  for (const phrase of [
    'Search before you act',
    'Claim landed or live',
    'Reversible local work is done when the change is correct',
    'progressive disclosure',
    'Skills do not grant tools',
    'Lead with the answer',
  ]) {
    assert.ok(constitution.includes(phrase), `missing ${phrase}`);
  }
  assert.equal(/outcome receipt/i.test(constitution), false);
  assert.equal(/Evidence First/i.test(constitution), false);
  assert.equal(/Evidence precedes claims/i.test(constitution), false);
  assert.equal(/evidence discipline/i.test(constitution), false);
  assert.equal(/unqualified/i.test(constitution), false);
  assert.equal(/\bTJC\b/.test(constitution), false);
  assert.equal(/\bVCY\b/.test(constitution), false);
  assert.equal(constitution.includes('Correct method first'), false);
  assert.equal(constitution.includes('## Platform apps'), false);
});

test('principles do not define Correctness as evidence discipline', () => {
  assert.equal(/evidence discipline/i.test(principles), false);
  assert.equal(/Evidence precedes claims/i.test(principles), false);
  assert.match(principles, /right results/);
});

test('shipped slogan detector flags retired phrases and ignores honest local-done text', () => {
  assert.deepEqual(
    retiredSloganMatches('Evidence precedes claims. Evidence-First Reporting. Evidence First requires a pack.'),
    ['Evidence precedes claims', 'Evidence-First', 'Evidence First'],
  );
  assert.deepEqual(
    retiredSloganMatches('Reversible local work is done when the change is correct. Claim landed or live only when that layer is actually true.'),
    [],
  );
});

test('shipped check reports no retired slogans in active instruction', () => {
  const findings = retiredSloganFindings(repositoryRoot);
  assert.deepEqual(findings, []);
  const { errors } = checkRepository();
  assert.equal(
    errors.some((error) => /retired slogan|retired phrase/i.test(error)),
    false,
    errors.filter((error) => /retired slogan|retired phrase/i.test(error)).join('\n'),
  );
});

test('catalog stays inside Codex listing budget class', () => {
  const catalog = JSON.parse(catalogBytes(repositoryRoot));
  const descChars = catalog.skills.reduce((sum, skill) => sum + String(skill.description || '').length, 0);
  assert.ok(catalog.count <= 200, `catalog unexpectedly huge: ${catalog.count}`);
  assert.ok(descChars <= 8000, `description sum ${descChars} exceeds 8k listing class`);
  for (const skill of catalog.skills) {
    assert.ok(String(skill.description || '').length <= 1024, skill.name);
  }
});
