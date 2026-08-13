import assert from 'node:assert/strict';
import test from 'node:test';
import { FORBIDDEN_INSTRUCTION_PATTERNS } from '../scripts/check.mjs';

function labels(text) {
  return FORBIDDEN_INSTRUCTION_PATTERNS.filter((pattern) => pattern.re.test(text)).map((pattern) => pattern.label);
}

test('instruction hygiene hits banned host-search imperatives', () => {
  assert.ok(labels('copy-paste endpoints; do not web-search for these defaults').includes('do not web-search'));
  assert.ok(labels('Agent recipes (no search engine required to start)').includes('no search engine required'));
  assert.ok(labels('Open [references/recipes.md](references/recipes.md) first').includes('open recipes.md first'));
  assert.ok(labels('open recipes.md first — copy-paste').includes('open recipes.md first'));
});

test('instruction hygiene allows evidence language that mentions web search', () => {
  assert.deepEqual(labels('do not claim currentness without web search'), []);
  assert.deepEqual(labels('Use host web search and fetch tools first.'), []);
  assert.deepEqual(labels('Known URL patterns live in references/recipes.md. Open that file when chosen.'), []);
});
