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
  assert.match(constitution, /short, bounded,\s+or “one last” polling window is not an exception/);
  assert.match(constitution, /Do not cancel, reprioritize,\s+or consume unrelated work, force deployment/);
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
  assert.match(enact, /fixed-minute polling are still passive waits/);
  assert.match(agentFirst, /Candidate acceptance releases the producer/);
});

test('Enact owns work and review state instead of session-local pairs', () => {
  const constitution = read('../runtime/constitution.md');
  const agentFirst = read('../skills/agent-first-development-standard/references/full-standard.md');
  const enact = read('../skills/enact-work-coordination/references/enact-adapter-contract.md');
  const selfFeeding = read('../skills/self-feeding-agent-loop-standard/references/full-standard.md');
  const adr = read('../docs/adr/ADR-0020-enact-authoritative-work-and-review-pools.md');

  assert.match(constitution, /disposable execution context, not work authority/);
  assert.match(constitution, /proposal, admission, and claim distinct/);
  assert.match(constitution, /not permanent agent roles or\s+one-to-one pairs/);
  assert.match(agentFirst, /A session is not a work ledger/);
  assert.match(agentFirst, /Review is an obligation selected from the candidate's risk/);
  assert.match(enact, /Do not model an Advisor as a permanent supervisor of one Executor/);
  assert.match(enact, /publish the typed verdict, findings, attestation, or correction Work/);
  assert.match(selfFeeding, /shared Work graph, not a set of permanent paired\s+agents/);
  assert.match(selfFeeding, /Executor release boundary/);
  assert.match(selfFeeding, /durable Work terminal is separate/);
  assert.doesNotMatch(selfFeeding, /Reviewers discover evidence-backed issues and verify fixes they opened/);
  assert.match(adr, /Provider-native truth remains federated/);
});

test('CI contract selects and coalesces snapshots without runner bootstrap', () => {
  const ci = read('../skills/ci-admission-standard/references/full-standard.md');
  const integration = read('../skills/parallel-change-integration-standard/references/full-standard.md');

  assert.match(ci, /complete remote verification\s+and artifact builds run only for control-plane-selected immutable snapshots/);
  assert.match(ci, /produced outside the same scarce general runner pool/);
  assert.match(integration, /one useful\s+running snapshot plus the latest eligible pending snapshot/);
  assert.match(integration, /Artifact production consumes only the\s+selected snapshot identity/);
});

test('agents publish one Candidate while central admission selects the adapter', () => {
  const constitution = read('../runtime/constitution.md');
  const agentFirst = read('../skills/agent-first-development-standard/references/full-standard.md');
  const delivery = read('../skills/delivery-standard/references/full-standard.md');
  const ci = read('../skills/ci-admission-standard/references/full-standard.md');
  const integration = read('../skills/parallel-change-integration-standard/references/full-standard.md');
  const enact = read('../skills/enact-work-coordination/references/enact-adapter-contract.md');
  const sourceAuthoring = read('../skills/source-authoring-standard/references/full-standard.md');
  const selfFeeding = read('../skills/self-feeding-agent-loop-standard/references/full-standard.md');
  const adr = read('../docs/adr/ADR-0020-enact-authoritative-work-and-review-pools.md');

  for (const source of [
    constitution,
    agentFirst,
    delivery,
    ci,
    integration,
    enact,
    sourceAuthoring,
    selfFeeding,
    adr,
  ]) {
    assert.match(source, /immutable (?:source )?Candidate/i);
    assert.match(source, /do(?:es)? not choose|never\s+choose(?:s)?|do not make the agent choose/i);
  }
  assert.match(delivery, /Platform is the delivery authority and performs one central admission/);
  assert.match(delivery, /external-contributor collaboration projection/);
  assert.match(delivery, /Semantically equivalent internal and external inputs must receive\s+the same obligations/);
  assert.match(enact, /Platform owns and fences source landing, promotion,\s+deployment, and release/);
  assert.match(integration, /Platform owns Candidate identity and readback, selection evidence, landing CAS/);
  assert.match(adr, /It is never an alternative\s+Work queue, review authority, completion state, or safety tier/);
});
