import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { repositoryRoot } from '../scripts/build-catalog.mjs';
import { retiredSloganMatches } from '../scripts/check.mjs';

test('constitution stays inside the L0 size ceiling', () => {
  const constitution = readFileSync(path.join(repositoryRoot, 'runtime/constitution.md'), 'utf8');
  assert.ok(constitution.length <= 6000, `constitution too large: ${constitution.length}`);
});

test('retired-slogan detector flags Evidence First variants and ignores honest local-done text', () => {
  assert.deepEqual(
    retiredSloganMatches('Evidence precedes claims. Evidence-First Reporting. Evidence First requires a pack.'),
    ['Evidence precedes claims', 'Evidence-First', 'Evidence First'],
  );
  assert.deepEqual(
    retiredSloganMatches('Reversible local work is done when the change is correct. Claim landed or live only when that layer is actually true.'),
    [],
  );
});
