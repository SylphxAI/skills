# AI Product Risk Systems

## Contents

- [Current-authority protocol](#current-authority-protocol)
- [Product behavior topology](#product-behavior-topology)
- [Autonomy and consequence classes](#autonomy-and-consequence-classes)
- [Rule IDs](#rule-ids)
- [Failure and affected-party matrix](#failure-and-affected-party-matrix)
- [Data and trust contract](#data-and-trust-contract)
- [UX and action-state contract](#ux-and-action-state-contract)
- [Control selection](#control-selection)
- [Launch-state automation](#launch-state-automation)
- [Owner handoffs](#owner-handoffs)
- [Signals and learning](#signals-and-learning)

## Current-authority protocol

AI behavior and provider facts drift. At use time retrieve the exact product
specification, route/model/provider configuration, tool schemas and permissions,
retrieval/memory scope, data-flow inventory, privacy and enterprise controls,
current evidence artifacts, support capability, unit-cost source, latency
telemetry, policy version, and release state.

Classify each input:

| State | Meaning | Product use |
| --- | --- | --- |
| `verified_current` | exact current source and scope are known | may support a decision |
| `verified_with_caveat` | evidence is current but bounded | state the caveat visibly |
| `stale` | source predates a material behavior change | block the affected claim |
| `not_verified` | no authoritative source is available | open an owner handoff |
| `not_applicable` | excluded with evidence and reason | retain the disposition |

Do not convert an authored scenario, vendor marketing claim, historical model
benchmark, or product intention into current operating evidence.

## Product behavior topology

```text
user_need -> input_and_context -> route_and_inference -> output_presented
output_presented -> user_interprets -> optional_action_authorized
optional_action_authorized -> external_effect -> result_observed -> recovery_or_learning

context_unavailable -> honest_degraded_state
route_failed -> bounded_fallback_or_stop
authorization_missing -> no_action
effect_uncertain -> pending_not_success
```

Audit each boundary independently. A safe model cannot repair an overbroad tool
permission; a perfect answer cannot repair deceptive UI; an approved action is
not successful until the authoritative downstream result is observed.

## Autonomy and consequence classes

| Class | Product behavior | Default product posture |
| --- | --- | --- |
| Inform | summarize, explain, retrieve, answer | cite scope and uncertainty; easy correction |
| Draft | generate content or proposed change | visibly editable; no external effect |
| Recommend | classify, rank, prioritize, suggest | show basis/limits; preserve alternative and appeal |
| Prepare | construct a bounded action or transaction | preview exact effect; validate current authority |
| Act | invoke tool or change external state | scoped permission, authorization, idempotency, result readback |
| Continue | plan and execute multiple dependent actions | bounded objective, per-boundary authority, stop and recovery states |

Consequence is separate from autonomy. A low-autonomy recommendation can still
harm access, finance, safety, reputation, livelihood, or third parties. Increase
control and evidence with consequence, scale, opacity, and recovery difficulty.

## Rule IDs

- `ai-product-risk-1` — Prove the user job and incremental value over the best
  deterministic or non-AI path before accepting AI-specific risk.
- `ai-product-risk-2` — Version the exact route, model/provider, prompt/context,
  retrieval, memory, tool, policy, data, and product-surface contract.
- `ai-product-risk-3` — Decompose inference, presentation, authorization,
  external effect, observed result, and recovery; never label intent as success.
- `ai-product-risk-4` — Classify autonomy and consequence independently across
  users, non-users, operators, customers, creators, and ecosystem participants.
- `ai-product-risk-5` — State intended use, foreseeable misuse, overreliance,
  accessibility, localization, and unequal-failure risks.
- `ai-product-risk-6` — Minimize data by purpose and define collection, retrieval,
  provider use, training, logging, retention, access, deletion, and user controls.
- `ai-product-risk-7` — Make generated, inferred, uncertain, pending, failed,
  fallback, and verified states distinguishable in the product experience.
- `ai-product-risk-8` — Require a preview and explicit current authorization for
  consequential actions; preserve idempotency, audit, undo, and appeal as relevant.
- `ai-product-risk-9` — Choose controls that reduce harm at its earliest boundary:
  eliminate, narrow, prevent, detect, contain, recover, then learn.
- `ai-product-risk-10` — Keep fallback within the same or a stricter data, safety,
  permission, cost, and disclosure envelope; otherwise stop honestly.
- `ai-product-risk-11` — Route eval, red-team, threat-model, implementation, and
  release-proof work to canonical owners; consume evidence by exact version.
- `ai-product-risk-12` — Bind launch states to machine-readable evidence and
  predeclared hold/narrow/resume/withdraw actions with retained decision traces.
- `ai-product-risk-13` — Treat every material model, prompt, retrieval, memory,
  tool, policy, or provider change as a product behavior candidate.
- `ai-product-risk-14` — Monitor user correction, abandonment, escalation,
  contested decisions, support, harm, latency, cost, and fallback—not usage alone.
- `ai-product-risk-15` — Never infer professional, legal, compliance, safety, or
  model capability claims from the skill; verify current authority at use.

## Failure and affected-party matrix

| Failure family | Product question | Typical product controls |
| --- | --- | --- |
| Wrong or fabricated output | can the user detect and correct it before harm? | provenance, bounded claims, editable draft, verify step |
| Material omission | what must never be silently absent? | completeness contract, missing-state disclosure, escalation |
| Misunderstood intent | what happens when the job or target is ambiguous? | clarification, preview, no-action default |
| Unsafe external effect | can an output trigger money, access, deletion, or communication? | scoped tool, current permission, confirmation, readback, undo |
| Data boundary failure | can context, logs, memory, or provider use exceed purpose? | minimization, isolation, retention/access/deletion controls |
| Abuse or manipulation | can a user or content source steer the system toward harm? | constrained surface, policy owner, detection, containment, report path |
| Overreliance | can presentation cause users to defer beyond evidence? | generated-state cues, alternatives, contestability, professional boundary |
| Unequal failure | who receives systematically worse access or outcomes? | representative product requirements, accessibility, segment evidence, appeal |
| Degraded route | what changes under fallback, timeout, or partial outage? | explicit degraded state, stricter permissions, deterministic path, stop |
| Cost/latency runaway | can value disappear under slow or expensive operation? | budget/state limits, visible progress, cancellation, bounded fallback |

Affected parties include direct users, people represented in input, recipients of
generated communication, marketplace participants, account members, support
operators, customers whose data is retrieved, and people subject to a decision.

## Data and trust contract

For every data class, record:

| Data stage | Required fields |
| --- | --- |
| Collection | source, purpose, consent/contract, sensitivity, minimization |
| Context/retrieval | eligible corpus, tenant/permission scope, freshness, provenance |
| Provider/inference | route, region, retention/training terms, subprocessors, controls |
| Memory | opt-in/out, write criteria, visibility, correction, expiry, deletion |
| Logging/support | content versus metadata, access, redaction, retention, user trace |
| Feedback/learning | destination, review purpose, privacy state, deletion propagation |

Keep customer content, credentials, secrets, protected attributes, private
documents, and sensitive support traces out of generic analytics properties.

## UX and action-state contract

The product surface should represent:

- why AI is present and what job it owns;
- whether content is retrieved, generated, inferred, edited, or verified;
- source/provenance and material limits without fake precision;
- editable draft versus recommendation versus pending or completed action;
- exact action target, scope, permissions, side effects, and confirmation state;
- progress, timeout, partial success, failure, retry, dedupe, and cancellation;
- fallback route and any changed data/quality/permission contract;
- undo, dispute, appeal, report, support, and durable result evidence;
- keyboard, assistive-technology, localization, low-bandwidth, and low-end-device
  behavior appropriate to the product.

## Control selection

Apply controls in this order:

1. Remove AI or the unsafe capability when it adds no defensible product value.
2. Narrow users, data, corpus, task, output, autonomy, tools, or scale.
3. Prevent harm through permissions, deterministic constraints, validation, and
   safe defaults owned by the implementation boundary.
4. Detect product-visible failure and contested outcomes.
5. Contain through bounded action, rate/volume controls, limited exposure, or
   honest degraded state.
6. Recover through undo, correction, reprocessing, appeal, support, withdrawal,
   and authoritative state repair.
7. Feed observed failures to the canonical product, eval, security, and support
   owners without turning anecdotes into proof.

## Launch-state automation

```text
proposed -> scoped -> evidence_blocked_or_ready -> limited_exposure
limited_exposure -> hold | narrow | expand
expanded -> monitor -> continue | narrow | withdraw
material_change -> evidence_expired -> requalify
```

For each transition record exact candidate identity, allowed cohort, required
evidence IDs, product guardrails, decision rule, action, owner, expiry, and
recovery. A reconciler may automate predeclared safe holds, narrowing, or
withdrawal. It must not fabricate evidence, broaden permissions, or convert an
unknown state into approval.

## Owner handoffs

| Need | Canonical owner output consumed here |
| --- | --- |
| Eval, judge, replay, simulation, adversarial verification | `frontier-verification-standard` artifact |
| Threat model, prompt/tool security, vulnerability work | security owner artifact |
| Data rights, privacy, retention, deletion | privacy/data lifecycle authority |
| Tool schemas, permissions, implementation, observability | owning engineering project |
| Event and identity pipeline | `product-analytics-instrumentation-review` artifact |
| Release, rollout, recovery, production proof | `delivery-standard` artifact |
| Support taxonomy and customer recovery | `customer-support-operations` artifact |
| Whole-product product/commercial design | app/game/product/pricing specialist artifact |

The handoff states an exact question, artifact ID/version, blocked product
decision, and acceptance condition. Do not paste another owner's standard into
this skill.

## Signals and learning

Measure successful user outcomes, user edits/corrections, rejected outputs,
verification/escalation, contested actions, undo/appeal, support cases, reported
harm, fallback/degraded use, latency to value, cost per successful outcome, and
retention/trust appropriate to the feature. Segment only where authorized and
statistically meaningful. Product telemetry is observation, not proof of safety
or causality; route those conclusions to the correct evidence owner.
