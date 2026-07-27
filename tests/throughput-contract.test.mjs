import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

function read(path) {
  return readFileSync(new URL(path, import.meta.url), 'utf8');
}

test('always-on runtime separates Work terminal state from worker occupancy', () => {
  const constitution = read('../runtime/constitution.md');
  assert.match(constitution, /Keep Work terminal state separate from worker occupancy/);
  assert.match(constitution, /register a durable wake-up subscription/);
  assert.match(constitution, /release effects and the active claim\/Run/);
  assert.match(constitution, /do not keep a session alive\s+to poll/);
});

test('work and delivery standards require bounded work and event-driven release', () => {
  const agentFirst = read('../skills/agent-first-development-standard/references/full-standard.md');
  const delivery = read('../skills/delivery-standard/references/full-standard.md');
  const autonomous = read('../skills/autonomous-execution-standard/references/full-standard.md');
  const enact = read('../skills/enact-work-coordination/references/enact-adapter-contract.md');

  assert.match(agentFirst, /One Work Item owns one independently terminal outcome/);
  assert.match(agentFirst, /parent Work with a child outcome DAG/);
  assert.match(delivery, /durable Work's terminal evidence, not how long one agent/);
  assert.match(autonomous, /waiting is not active execution/);
  assert.match(enact, /subscription\.or_get/);
  assert.match(enact, /finish the current Agent Run/);
  assert.match(enact, /must not\s+remain `scheduling=ready` with no active claim and no subscription/);
});

test('CI contract selects and coalesces snapshots without runner bootstrap', () => {
  const ci = read('../skills/ci-admission-standard/references/full-standard.md');
  const integration = read('../skills/parallel-change-integration-standard/references/full-standard.md');

  assert.match(ci, /complete remote verification\s+and artifact builds run only for control-plane-selected immutable snapshots/);
  assert.match(ci, /produced outside the same scarce general runner pool/);
  assert.match(integration, /one useful\s+running snapshot plus the latest eligible pending snapshot/);
  assert.match(integration, /Artifact production consumes only the\s+selected snapshot identity/);
});
