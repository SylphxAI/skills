import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const CASES = JSON.parse(readFileSync(
  new URL('./fixtures/delegation-policy-cases.json', import.meta.url),
  'utf8',
));

function decision(facts) {
  if (
    facts.workClass === 'atomic'
    || facts.confidenceOnly
    || facts.resourcePressure
    || facts.integrationBackpressure
    || !facts.capacityAvailable
    || !facts.collisionSafe
    || facts.hiddenSiblingState
    || (facts.boundedChildTask && !facts.discoveredNewLane)
  ) return 'local';

  return (
    facts.boundedOutcome
    && facts.independentlyUseful
    && facts.materiallyComplex
    && facts.evidenceContract
    && facts.materialAdvantage
    && facts.positiveNetBenefit
  ) ? 'delegate' : 'local';
}

test('delegation is selected from task semantics and net benefit', () => {
  assert.ok(CASES.length >= 10);
  assert.equal(new Set(CASES.map(({ id }) => id)).size, CASES.length);

  for (const fixture of CASES) {
    assert.equal(decision(fixture.facts), fixture.expected, fixture.id);
  }

  assert.ok(CASES.some(({ facts, expected }) =>
    facts.boundedChildTask && !facts.discoveredNewLane && expected === 'local'));
  assert.ok(CASES.some(({ facts, expected }) =>
    facts.boundedChildTask && facts.discoveredNewLane && expected === 'delegate'));
  assert.ok(CASES.some(({ facts, expected }) => facts.resourcePressure && expected === 'local'));
  assert.ok(CASES.some(({ facts, expected }) => facts.integrationBackpressure && expected === 'local'));
  assert.ok(CASES.some(({ facts, expected }) => facts.confidenceOnly && expected === 'local'));
});

test('canonical instructions reject depth counters and role-driven atomic fanout', () => {
  const autonomous = readFileSync(
    new URL('../skills/autonomous-execution-standard/references/full-standard.md', import.meta.url),
    'utf8',
  );
  const agentFirst = readFileSync(
    new URL('../skills/agent-first-development-standard/references/full-standard.md', import.meta.url),
    'utf8',
  );
  const constitution = readFileSync(new URL('../runtime/constitution.md', import.meta.url), 'utf8');

  assert.match(autonomous, /semantic work type and material complexity/i);
  assert.match(autonomous, /Atomic operations stay local/i);
  assert.match(autonomous, /execution\s+leaf by default/i);
  assert.match(autonomous, /without relying on unavailable global-depth state/i);
  assert.match(autonomous, /host CPU and memory/i);
  assert.match(autonomous, /Role names never make a lane delegable/i);
  assert.match(autonomous, /highest-value feasible subset/i);
  assert.doesNotMatch(autonomous, /launch every qualified independent subagent/i);
  assert.doesNotMatch(autonomous, /Good subagent tracks:/i);
  assert.doesNotMatch(autonomous, /repository's versioned delegation eval traces/i);

  assert.match(agentFirst, /semantic task type and\s+material complexity come before role assignment/i);
  assert.match(agentFirst, /presumptively a leaf/i);
  assert.match(agentFirst, /Do not require global\s+tree-depth knowledge/i);

  assert.match(constitution, /materially complex, bounded, independently useful lane/i);
  assert.match(constitution, /confidence-only duplication stay local/i);
  assert.match(constitution, /host-resource pressure or\s+integration backlog/i);
  assert.match(constitution, /do not rely on global depth counters/i);
});
