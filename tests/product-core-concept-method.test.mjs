import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => readFileSync(path.join(root, rel), 'utf8');

test('design/build/finish job skills encode one-strong-concept method (not a standard package)', () => {
  for (const rel of [
    'skills/design-app/SKILL.md',
    'skills/design-game/SKILL.md',
    'skills/build-product/SKILL.md',
    'skills/finish-product/SKILL.md',
  ]) {
    const text = read(rel);
    assert.match(
      text,
      /core concept|Core concept power|one core concept|single distinctive core concept/i,
      rel,
    );
    assert.doesNotMatch(text, /concept-power-standard|Concept Power Standard/);
  }
  assert.equal(existsSync(path.join(root, 'skills/concept-power-standard')), false);
});
