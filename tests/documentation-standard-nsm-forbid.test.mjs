import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { repositoryRoot } from '../scripts/build-catalog.mjs';

const docRoot = path.join(
  repositoryRoot,
  'skills/drive-to-delivery/references/source-authoring-standard/references/documentation-standard',
);

const fence = readFileSync(path.join(docRoot, 'references/full-standard.md'), 'utf8');
const method = readFileSync(path.join(docRoot, 'METHOD.md'), 'utf8');
const adopt = readFileSync(
  path.join(repositoryRoot, 'skills/adopt-repo-standards/references/full-standard.md'),
  'utf8',
);
const activeProductLaw = [fence, method, adopt].join('\n');

test('documentation-standard states English quantity and process-word homes', () => {
  assert.match(fence, /English/i);
  assert.match(fence, /industry quantity/i);
  assert.match(fence, /Vision, NSM, OKRs, and the PRD use product language/);
  assert.match(fence, /Name the industry quantity/);
  assert.match(method, /product language/);
});

test('active product-law templates do not teach retired house codes', () => {
  const houseTokens = [
    'Polariss',
    'WMCCU',
    'TKU',
    'NBC',
    'TJC',
    'VCY',
    'UHDA',
    'QRR',
    'VAV',
    'VCCR',
    'RHW',
  ];
  for (const code of houseTokens) {
    assert.equal(
      new RegExp(`\\b${code}\\b`).test(activeProductLaw),
      false,
      `active product-law text must not teach ${code}`,
    );
  }
  assert.equal(
    /\bPolar\s*\/\s*Polaris\s*\/\s*Polariss\b/.test(activeProductLaw),
    false,
    'active product-law text must not catalog the North Star rebrand',
  );
});
