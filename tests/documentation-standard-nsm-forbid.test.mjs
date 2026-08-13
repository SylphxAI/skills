import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { repositoryRoot } from '../scripts/build-catalog.mjs';

const fencePath = path.join(
  repositoryRoot,
  'skills/drive-to-delivery/references/source-authoring-standard/references/documentation-standard/references/full-standard.md',
);
const fence = readFileSync(fencePath, 'utf8');

test('documentation-standard forbids house NSM brands in shipped fence', () => {
  assert.match(
    fence,
    /Do not mint house score acronyms/,
    'fence must ban invented house score acronyms',
  );
  for (const code of ['WMCCU', 'TKU', 'NBC', 'TJC', 'VCY']) {
    assert.match(
      fence,
      new RegExp(`\\b${code}\\b`),
      `fence must name retired house code ${code} in the forbid list`,
    );
  }
  assert.match(
    fence,
    /Rebranding the North Star as \*\*Polar \/ Polaris \/ Polariss\*\*/,
    'fence must forbid Polar/Polaris/Polariss as an NSM rebrand',
  );
  assert.match(
    fence,
    /`\*Grade` string as progress or NSM/,
    'fence must forbid residual *Grade as progress',
  );
  assert.match(
    fence,
    /never as\s+current law, never as a JSON field/,
    'fence must forbid house names as current law or JSON fields',
  );
  assert.equal(
    /\*\*Polariss\*\* is the (North Star|product NSM|living name)/i.test(fence),
    false,
    'fence must not teach Polariss as the living NSM',
  );
});
