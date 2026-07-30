import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

function read(path) {
  return readFileSync(new URL(path, import.meta.url), 'utf8');
}

test('always-on runtime separates Work terminal state from worker occupancy', () => {
  const constitution = read('../runtime/constitution.md');
  assert.match(constitution, /Keep Work terminal state separate from worker occupancy/);
  assert.match(constitution, /use Enact `work\.defer` to atomically checkpoint/);
  assert.match(constitution, /`next_state_change` when waiting for a future provider observation/);
  assert.match(constitution, /release effects\s+and the active claim\/Run/);
  assert.match(constitution, /Do not approximate the atomic transition/);
  assert.match(constitution, /do not keep a session alive\s+to poll/);
  assert.match(constitution, /short, bounded, or “one last” polling\s+window is not an exception/);
  assert.match(constitution, /Do not cancel,\s+reprioritize, or consume unrelated work, force deployment/);
});

test('objective continuity distinguishes checkpoints, shippable source, and the delivery terminal', () => {
  const constitution = read('../runtime/constitution.md');
  const autonomous = read('../skills/autonomous-execution-standard/references/full-standard.md');
  const delivery = read('../skills/delivery-standard/references/full-standard.md');
  const adr = read('../docs/adr/ADR-0025-objective-continuity-and-delivery-terminal.md');

  assert.match(constitution, /plan, phase, local diff, commit, open pull request, or partial validation is\s+a checkpoint/i);
  assert.match(constitution, /re-check the original objective and active delivery target/i);
  assert.match(constitution, /while that terminal is unsatisfied, advance the highest-value safe\s+positive-net in-scope action/i);
  assert.match(constitution, /residual list,\s+or one blocked lane as completion/i);
  assert.match(autonomous, /The plan is disposable; the objective is not/);
  assert.match(autonomous, /Before any done, wait, blocked, handoff, or final-response claim/);
  assert.match(autonomous, /A residual is truthful status, not a scope waiver/);
  assert.match(autonomous, /does not make the parent complete while\s+the parent still owns that outcome/);
  assert.match(autonomous, /do not expand a satisfied\s+objective indefinitely/);
  assert.match(delivery, /Shippable state is a property, not a universal terminal/);
  assert.match(delivery, /Shippable does \*\*not\*\* mean shipped/);
  assert.match(delivery, /A commit is a source checkpoint/);
  assert.match(delivery, /A pull request is a collaboration or landing\s+adapter/);
  assert.match(delivery, /active repository delivery\s+declaration selects the terminal/);
  assert.match(adr, /Independent\s+review remains risk-selected/);
  assert.match(adr, /retired `sota-execution-standard` stays retired/);
});

test('agent-native economics produce durable progress without maximum-caution proof', () => {
  const constitution = read('../runtime/constitution.md');
  const scope = read('../skills/scope-discipline/SKILL.md');
  const autonomous = read('../skills/autonomous-execution-standard/references/full-standard.md');
  const decision = read('../skills/decision-quality-standard/references/full-standard.md');
  const verification = read('../skills/risk-matched-verification-standard/references/full-standard.md');
  const adr = read('../docs/adr/ADR-0026-agent-native-durable-progress.md');

  assert.match(constitution, /agent-native verified lifetime value/);
  assert.match(constitution, /Investigate only plausible material\s+uncertainty that can change the action or claim/);
  assert.match(constitution, /workaround, duplicate authority, or weak intermediate target\s+that creates predictable reversal work is not durable progress/);

  assert.match(decision, /### Agent-native cost repricing/);
  assert.match(decision, /Estimate critical-path elapsed time and durable lifecycle cost rather than\s+person-hours/);
  assert.match(decision, /Never reject a stronger architecture merely because it contains more typed\s+files, adapters, generated projections, or tests/);

  assert.match(scope, /The value-and-risk principle applies to every task, but the ceremony scales/);
  assert.match(scope, /### Preserve durable forward progress/);
  assert.match(scope, /A workaround is\s+containment, never evidence that the owning terminal is satisfied/);
  assert.doesNotMatch(scope, /exhaustive (?:search|file|agent review)/i);

  assert.match(autonomous, /## Durable Progress And Anti-Regression/);
  assert.match(autonomous, /rollback may restore the known-good state as recovery/);
  assert.match(autonomous, /Do not\s+rebrand the predecessor as the destination/);

  assert.match(verification, /Do not attempt to eliminate every logically imaginable failure/);
  assert.match(verification, /Ordinary deterministic local behavior with low blast radius/);
  assert.match(verification, /Start with the least-cost decisive evidence/);

  assert.match(adr, /Adding a generic\s+“work faster”, “work attitude”, or “SOTA execution” Skill would collide/);
  assert.match(adr, /decision kernel is universal but its artifact ceremony is\s+not/);
});

test('work and delivery standards require bounded work and event-driven release', () => {
  const agentFirst = read('../skills/agent-first-development-standard/references/full-standard.md');
  const delivery = read('../skills/delivery-standard/references/full-standard.md');
  const autonomous = read('../skills/autonomous-execution-standard/references/full-standard.md');
  const enact = read('../skills/enact-work-coordination/references/enact-adapter-contract.md');

  assert.match(agentFirst, /One Work Item owns one independently terminal outcome/);
  assert.match(agentFirst, /parent Work with a child outcome DAG/);
  assert.match(delivery, /durable Work terminal is separate from worker occupancy/);
  assert.match(autonomous, /waiting is not active execution/);
  assert.match(enact, /call `work\.defer`/);
  assert.match(enact, /checkpoint disposition is `external_wait`/);
  assert.match(enact, /current Agent Run is finished/);
  assert.match(enact, /Do not approximate the transition with separate `subscription\.or_get`/);
  assert.match(enact, /must not\s+remain `scheduling=ready` with no active claim and no subscription/);
  assert.match(enact, /fixed-minute polling are still passive waits/);
  assert.match(agentFirst, /Source landing releases the producer/);
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
  assert.match(agentFirst, /Review is an obligation selected from the exact revision's risk/);
  assert.match(enact, /Do not model an Advisor as a permanent supervisor of one Executor/);
  assert.match(enact, /publish the typed verdict, findings, attestation, or correction Work/);
  assert.match(selfFeeding, /temporary perspectives from\s+shared capability pools/);
  assert.match(selfFeeding, /source release boundary/);
  assert.match(selfFeeding, /Work terminal may remain/);
  assert.doesNotMatch(selfFeeding, /Reviewers discover evidence-backed issues and verify fixes they opened/);
  assert.match(adr, /Provider-native truth remains federated/);
});

test('CI uses exact-SHA repository evidence without a candidate control plane', () => {
  const ci = read('../skills/ci-admission-standard/references/full-standard.md');
  const integration = read('../skills/parallel-change-integration-standard/references/full-standard.md');

  assert.match(ci, /one stable aggregate verdict/);
  assert.match(ci, /CI must not reject a valid change solely because it arrived through a pull\s+request or direct trunk/);
  assert.match(ci, /newer default-branch SHA includes its ancestors/);
  assert.match(ci, /not a selected-snapshot product\s+or watermark system/);
  assert.match(integration, /fix runner capacity, caching, test selection, and sharding first/);
  assert.match(integration, /Do not create Platform Candidate, landing-controller, selected-snapshot, or\s+verification-watermark authorities/);
});

test('repository owns PR or direct-trunk while Platform owns simple deploy', () => {
  const constitution = read('../runtime/constitution.md');
  const agentFirst = read('../skills/agent-first-development-standard/references/full-standard.md');
  const delivery = read('../skills/delivery-standard/references/full-standard.md');
  const ci = read('../skills/ci-admission-standard/references/full-standard.md');
  const integration = read('../skills/parallel-change-integration-standard/references/full-standard.md');
  const enact = read('../skills/enact-work-coordination/references/enact-adapter-contract.md');
  const sourceAuthoring = read('../skills/source-authoring-standard/references/full-standard.md');
  const selfFeeding = read('../skills/self-feeding-agent-loop-standard/references/full-standard.md');
  const adr = read('../docs/adr/ADR-0020-enact-authoritative-work-and-review-pools.md');

  assert.match(constitution, /Follow the repository's native source-integration policy/);
  assert.match(constitution, /CI must not hard-fail solely because a valid\s+change arrived through PR or direct trunk/);
  assert.match(agentFirst, /Platform does not choose\s+or execute the landing adapter/);
  assert.match(delivery, /Platform does not select or execute a PR\/direct-trunk landing adapter/);
  assert.match(delivery, /`On Commit`, `After Verification`, and `Off`/);
  assert.match(ci, /External contributors use pull requests/);
  assert.match(integration, /Enable merge queue only when/);
  assert.match(enact, /repository owns source landing; Platform owns\s+promotion, deployment, and release/);
  assert.match(sourceAuthoring, /external contributors use pull requests/);
  assert.match(selfFeeding, /Platform does not select the source adapter/);
  assert.match(adr, /There is one source authority: Git/);
});

test('generated source follows repository policy and queue waits release workers', () => {
  const agentFirst = read('../skills/agent-first-development-standard/references/full-standard.md');
  const delivery = read('../skills/delivery-standard/references/full-standard.md');
  const enterprise = read('../skills/enterprise-control-plane-standard/references/full-standard.md');
  const commercial = read('../skills/commercial-decision-standard/references/full-standard.md');
  const autonomous = read('../skills/autonomous-execution-standard/references/full-standard.md');
  const runner = read('../skills/ci-runner-capacity-standard/references/full-standard.md');
  const selfFeeding = read('../skills/self-feeding-agent-loop-standard/references/full-standard.md');
  const adr = read('../docs/adr/ADR-0020-enact-authoritative-work-and-review-pools.md');

  assert.match(delivery, /repository's native path: direct trunk or PR/);
  assert.match(enterprise, /Release intent follows the\s+repository's declared source-integration path/);
  assert.match(commercial, /Generated commercial, release, pricing-config, and policy-sync changes follow\s+the repository's declared direct-trunk or PR path/);
  assert.match(autonomous, /repository's\s+declared direct-trunk or PR integration path/);
  assert.match(runner, /subscribe, release worker capacity, and let the next provider event re-enter/);
  assert.match(adr, /System-generated source follows repository policy/);
  assert.doesNotMatch(agentFirst, /bot-owned version PR/);
  assert.doesNotMatch(delivery, /normal path is release intent in source control, a generated version PR/);
  assert.doesNotMatch(enterprise, /Findings become migration issues or generated PRs/);
  assert.doesNotMatch(runner, /Keep polling/);
  assert.doesNotMatch(selfFeeding, /prompt-change PR/);
});
