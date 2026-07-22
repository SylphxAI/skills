# Reproduction-driven engineering

Use this method to turn an observed defect, requested behavior change, or
behavior-preserving refactor into causal, executable evidence. It includes the
useful discipline of test-driven development without forcing every change into
unit-test-first ceremony.

## Core contract

A defect is not fixed because a plausible code path changed or because the
candidate test suite is green. Before claiming or landing a permanent repair,
bind the observed symptom to an exact unmodified baseline and establish the
lowest semantic boundary with a faithful oracle capable of reproducing the
failure class. Compare cost only between equally capable oracles. The oracle
MUST fail on that baseline for the expected reason. After the owning-cause
correction, the same oracle MUST pass on the exact candidate. Immediate
reversible containment of active harm may precede reproduction and proves only
mitigation, not a permanent repair.

Use this loop:

1. **Bind the observation.** Record the externally observable symptom,
   affected contract, exact baseline revision or artifact, relevant inputs and
   environment, and the lifecycle layer actually observed. Separate facts
   from interpretations. Expected behavior comes from an authoritative
   contract, schema, accepted decision, or explicit user requirement. Without
   that authority, treat the work as a proposed behavior or contract change,
   not a confirmed defect.
2. **Reproduce before repairing.** Create or select a deterministic compiler,
   static-analysis, unit, contract, integration, property, differential,
   replay, simulation, security, performance, or end-to-end oracle. Demonstrate
   that it fails on the unchanged baseline and that the failure corresponds to
   the reported symptom rather than an unrelated setup error.
   When no single oracle both reproduces the observed contract failure and
   isolates its cause, retain two linked proofs: a symptom-level regression
   oracle and the narrower causal oracle. The candidate must pass both.
3. **Discriminate causes.** When materially credible competing explanations
   remain, obtain the smallest observation, known-good/known-bad comparison,
   counterfactual, ablation, or fault-injection experiment that distinguishes
   them. Listing hypotheses is not causal proof. A failing test localizes a
   contract violation; it does not by itself prove which implementation caused
   it. A compiler or existing exact test that already localizes a trivial cause
   does not require invented alternatives.
4. **Repair the owning cause.** Change the narrowest owning boundary that
   restores the contract. Do not add an alias, fallback, retry, suppression,
   duplicate path, or special case merely to bypass the symptom. Keep the
   candidate focused enough that unrelated material changes cannot explain the
   red-to-green result; otherwise use an ablation, counterfactual candidate, or
   equivalent comparison to isolate the repair's effect.
5. **Prove red to green.** Run the unchanged oracle execution bundle against
   the exact candidate. The bundle includes the test or analyzer plus relevant
   fixtures, goldens, mocks, configuration, toolchain, seed or schedule corpus,
   thresholds, observation budget, and decision rule. If any part changes,
   disclose the change and replay that same revised bundle against both the
   unmodified baseline and candidate. Preserve the pre-fix failure reason and
   post-fix result so the causal contrast is reviewable.
6. **Challenge the correction.** Run the risk-selected affected regression
   suites plus relevant negative, boundary, property, concurrency, security,
   or failure-path cases. Run a broader suite when the dependency graph, blast
   radius, or uncertainty makes it informative. A targeted green result does
   not establish unaffected contracts.
7. **Refactor and clean up.** Remove failed attempts, temporary probes,
   redundant guards, obsolete compatibility paths, and containment that the
   root-cause repair supersedes. Re-run the same proofs after cleanup.
8. **Claim only the proven layer.** Local reproduction, exact-candidate green,
   admitted source, deployment, live recovery, and long-window reliability are
   different claims.

This is a **red - understand - green - refactor - verify** loop. Understanding
is explicit because an agent can easily make an incorrectly scoped test green
without correcting the cause.

## Select the oracle by change class

| Change class | Required starting proof | Completion proof |
| --- | --- | --- |
| Confirmed defect | Faithful reproducer fails on the exact unmodified baseline | Same oracle passes after the owning-cause repair; relevant regression suite passes |
| New observable behavior | Executable contract, example, property, or acceptance test before or alongside implementation | New oracle and affected existing contracts pass on the exact candidate |
| Behavior-preserving refactor | Existing behavior tests plus characterization, differential, snapshot, or equivalence proof where the contract is incomplete | Before/after observable behavior remains equivalent and structure-specific temporary characterization is retired when no longer useful |
| Production incident | Contain immediate harm when necessary; preserve a sanitized observation or replay input | Containment is not called a fix; reproduce, repair the owning cause, verify recovery, and retire temporary containment before closure unless it is a justified durable control |
| Compiler, schema, lint, build, config, or documentation defect | The owning compiler, schema validator, semantic lint, build, link checker, or rendered-contract check may be the failing oracle | Same owner rejects the baseline defect and accepts the candidate; do not invent a unit test for ceremony |
| Nondeterministic, concurrent, distributed, time-dependent, or live-only defect | Replayable seed, virtual clock, model/property test, deterministic simulation, fault injection, integration environment, or bounded live observation at the lowest capable layer | The same predeclared harness, failure model, corpus or observation budget, and decision rule distinguish baseline from candidate; retain runtime detection and report residual uncertainty for inherently live facts |

If the reported behavior cannot be reproduced, do not guess at a permanent
repair. Improve observation fidelity, reduce the input, compare known-good and
known-bad candidates, instrument the owning boundary privately, or state that
the cause remains unproven. A bounded reversible diagnostic change or emergency
containment remains labelled as such.

## Reproducer fidelity

A valid reproducer:

- exercises the public contract or lowest semantic boundary that still
  contains the defect, rather than asserting source spelling or private call
  order;
- retains a linked symptom-level oracle when the narrower causal oracle alone
  cannot reproduce the originally observed contract failure;
- fails on the exact baseline before any production repair and for the
  expected semantic reason;
- contains the minimum environment, timing, state, identity, and dependency
  conditions needed to distinguish the failure;
- uses sanitized or synthetic fixtures and never copies secrets, unrestricted
  operator telemetry, or customer data into source control;
- mocks only outside the boundary under test and does not mock away the
  suspected cause;
- remains deterministic where practical, or records replay inputs, seeds,
  clocks, schedules, harness, run count or observation budget, acceptance
  threshold, decision rule, and uncertainty when determinism is not
  achievable; and
- would fail again if the material regression were reintroduced.

Never retry until one convenient green sample appears. Apply the same
predeclared protocol to baseline and candidate. Prefer replay, virtual clocks,
model/property tests, simulation, and fault injection over arbitrary calendar
soak. A bounded live observation proves only its sampled window, not absence of
the failure or long-window reliability.

For a security vulnerability, reproduce the violated security property with a
least-privilege negative or control test in an authorized isolated
environment. Never require exploit replay against production or an
unauthorized target. Detailed exploit inputs, traces, and hypotheses remain
protected evidence; public regression tests encode only the safe invariant.
Active exposure composes with `incident-standard`.

When many candidate causes or a large code surface exist, agents may explore
hypotheses, generate cases, inspect files, or run differential experiments in
parallel. Parallelism increases search coverage; it does not relax the need for
one exact baseline, a discriminating oracle, and an owning-cause proof.

## Unacceptable green results

The following do not prove a fix:

- writing the test after the repair and never demonstrating that it fails on
  the unchanged baseline;
- changing the test, expected output, golden file, mock, timeout, threshold, or
  environment until the candidate passes without proving the contract changed;
- skipping, deleting, quarantining, filtering, or weakening the failing
  assertion;
- asserting that a source token, file path, private symbol, or call order
  exists when that detail is not the product contract;
- adding retries, fallback values, error swallowing, duplicate implementations,
  or compatibility branches that hide the original failure;
- fixing a copy, adapter, caller, or deployment symptom while leaving the
  authoritative owning boundary wrong;
- proving only a health response, process start, compilation, or unrelated
  test suite; or
- treating inability to reproduce as evidence that the issue disappeared.

If the intended contract itself changes, update its authoritative decision or
schema and explain why the old oracle is no longer valid. That is a reviewed
contract change, not a silent test repair.

## Minimum completion evidence

Keep the following in the repository's normal test output, change record,
incident record, or delivery evidence; do not create a separate ceremony when
the existing artifacts already carry it:

- observed symptom and affected contract;
- exact unmodified baseline;
- reproducer or semantic oracle and pre-fix failure reason;
- material competing causes, if any, and the discriminating evidence used;
- owning-cause change and exact candidate;
- unchanged-oracle post-fix result;
- relevant broader regression and adversarial results;
- cleanup of failed attempts, temporary diagnostics, workarounds, and obsolete
  containment; and
- lifecycle layers not yet verified.

For a trivial, deterministic failure already localized by a compiler, type
checker, schema validator, or existing exact regression test, that failing
output is the reproducer. Do not add a duplicate test or a long investigation
merely to satisfy this method.

## Composition boundaries

- `engineering-standard` owns reproduction, repair, regression, and cleanup.
- `incident-standard` owns command, mitigation, recovery, communication, and
  incident closure while service or customer harm is active.
- `critical-analysis` owns a requested analysis artifact or a material
  investigation while multiple credible causes remain unresolved.
- `evidence-and-claims-standard` adjudicates a material or disputed causal,
  fixed, delivery, or completion claim.
- `ci-admission-standard` owns candidate trace integrity and heightened review
  when tests, fixtures, thresholds, or gates change.
- `agent-first-development-standard` owns multi-agent attribution, collision,
  and parallel delivery mechanics, not the defect-repair method.

These are conditional ownership handoffs, not a mandatory stack for every
repair. Do not duplicate their methods or create a meta-router.

## References

- Kent Beck, *Test-Driven Development: By Example* (red-green-refactor and
  test-first feedback).
- Andreas Zeller, *Why Programs Fail* (scientific debugging, observation,
  cause-effect chains, and failure-inducing input reduction).
- ISO/IEC/IEEE 29119-1, *Software and systems engineering -- Software testing*
  (test concepts and evidence boundaries).
