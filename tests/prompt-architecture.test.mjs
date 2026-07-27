import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const CASES = JSON.parse(readFileSync(
  new URL('./fixtures/agent-brief-specificity-cases.json', import.meta.url),
  'utf8',
));

function classifyBrief(facts) {
  if (facts.substitutesPromptForMissingCapability) return 'invalid-capability';
  if (!facts.outcome || !facts.scope || !facts.acceptanceEvidence) return 'underspecified';
  if (facts.prescribesMethodOrSequence && !facts.methodIsCorrectnessBoundary) {
    return 'overprescribed';
  }
  return 'valid';
}

test('agent-to-agent brief specificity is outcome-owned and capability-calibrated', () => {
  assert.ok(CASES.length >= 8);
  assert.equal(new Set(CASES.map(({ id }) => id)).size, CASES.length);

  for (const fixture of CASES) {
    assert.equal(classifyBrief(fixture.facts), fixture.expected, fixture.id);
  }

  const verdicts = new Set(CASES.map(({ expected }) => expected));
  assert.deepEqual(
    [...verdicts].sort(),
    ['invalid-capability', 'overprescribed', 'underspecified', 'valid'],
  );
});

test('canonical prompt policy avoids micromanaging capable agents without losing boundaries', () => {
  const promptArchitecture = readFileSync(
    new URL('../skills/prompt-architecture/references/full-standard.md', import.meta.url),
    'utf8',
  );
  const autonomous = readFileSync(
    new URL('../skills/autonomous-execution-standard/references/full-standard.md', import.meta.url),
    'utf8',
  );

  assert.match(promptArchitecture, /whenever one agent writes a task brief for another agent/i);
  assert.match(promptArchitecture, /task-appropriate tools, access, and discoverable context/i);
  assert.match(promptArchitecture, /capable reasoning peer by default/i);
  assert.match(promptArchitecture, /Calibrate extra detail to observed\s+capability limits when material/i);
  assert.match(promptArchitecture, /not to a marketing label such as `SOTA`/i);
  assert.match(promptArchitecture, /A longer prompt cannot\s+grant a missing tool, permission, authority, source, or runtime capability/i);
  assert.match(promptArchitecture, /By default, omit step-by-step methods/i);
  assert.match(promptArchitecture, /method or sequence only\s+when omitting it would change correctness, safety, reproducibility, collision\s+control, or a machine-consumed artifact/i);
  assert.match(promptArchitecture, /without a bounded outcome, scope, or evidence contract is not autonomy/i);

  assert.match(autonomous, /Treat a capable child as a reasoning peer with bounded outcome ownership/i);
  assert.match(autonomous, /By default, omit step-by-step methods/i);
  assert.match(autonomous, /Method detail is binding only when the method itself is part of correctness/i);
});
