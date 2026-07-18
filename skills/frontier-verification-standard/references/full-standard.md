# frontier-verification-standard (canonical body)

**Authority:** binding Standard Skill package `frontier-verification-standard` in `SylphxAI/skills` (`skills/frontier-verification-standard/`).

**Cutover:** migrated from Doctrine `standards/frontier-verification-standard.md` at digest `sha256:cd1e0427ec947891bbc4f0bf1131649db9834c891724dafcfc837da931945d20` (doctrine `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7`). Doctrine file is alias-only after cutover.

Author here; do not maintain a second prose SSOT.

---

# Frontier Verification Standard

## Purpose

Use this standard when selecting advanced verification methods for high-risk
correctness, AI behavior, runtime rollout, or VCS authoring experiments.

The goal is to strengthen the existing ADR-29 admission/recovery control plane
without making every PR pay for every expensive method. This standard
implements ADR-66 (frontier verification backstops).

This standard composes with:

- [`agent-first-development-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/agent-first-development-standard.md)
  for risk lanes, admission manifests, the active delivery profile's integration
  serializer, postsubmit proof, and recovery;
- [`engineering-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/engineering-standard.md) for pure cores,
  Effect, testing ladder, observability, and state-machine correctness;
- [`agent-native-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/agent-native-standard.md) "AI Agents" for AI
  evals, tracing, and guardrails;
- [`delivery-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/delivery-standard.md) for deploy proof and
  production verification.
- [`doctrine-profile-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/doctrine-profile-standard.md) for current
  model/runtime and delivery-adapter selections and their review lifecycle.

## Core Rule

Frontier verification is targeted by blast radius. It is not a universal
presubmit tax and not a replacement for the active delivery profile's admission
and integration controls, postsubmit proof, deploy proof, or recovery.

Use this selection matrix:

| Surface | Required evidence |
| --- | --- |
| Distributed protocols, queues, locks, ledgers, billing, permissions, durable agent runtimes, irreversible workflows | Property/model tests first; deterministic simulation testing when interleavings, faults, or long-running behavior dominate risk |
| Public API/tool/event/package contracts, generated clients, schema-derived surfaces | Spec/contract gate from the schema source of truth, generated artifact freshness, compatibility proof |
| AI product behavior, model/provider routing, agent workflows, prompt/tool policies | Versioned capability/substitution eval manifest, thresholded status, traces, drift budgets, safety/privacy checks, failure examples, requalification and recovery |
| Runtime/user-visible behavior, infra/config, feature flags, auth/billing/security behavior | Automated canary or progressive analysis with SLO/error-budget guardrails and automatic promote/pause/rollback |
| Local branch/stack/conflict authoring | Optional change-centric VCS experiment; final delivery conforms to the active delivery profile |

## Deterministic Simulation Testing

Use deterministic simulation testing when ordinary tests cannot cover the
important interleavings or failure ordering. Good candidates:

- distributed coordination and queues;
- locks, leases, and fencing;
- billing, ledgers, entitlement transitions, and reconciliation;
- migration/recovery workflows;
- long-running agent runtimes and schedulers;
- storage systems, caches, replication, and retries;
- provider side effects with idempotency and replay.

A simulation harness must define:

- boundary: modules/services/state machines under simulation;
- deterministic controls: clock, randomness, scheduler, network, storage, and
  external side-effect doubles;
- oracle: invariant, model, property, or executable spec that decides pass/fail;
- fault model: crash, restart, timeout, reordering, duplication, partial write,
  provider error, or data corruption classes;
- reproducibility: seed, corpus, replay command, candidate SHA, dependency
  versions, and artifact retention;
- lane placement: presubmit smoke, postsubmit deep, nightly, pre-release, or
  incident reproduction;
- recovery: issue/PR generation and whether failure blocks deploy, release, or
  only future promotion.

Default placement is postsubmit/continuous. Presubmit simulation is only for a
small deterministic seed corpus or when the repo has measured the lane inside
the merge-queue latency budget.

## Spec And Eval Gates

A spec/eval gate is valid only when it is versioned and bound to the exact
candidate.

For contracts, require:

- schema source of truth;
- generated artifact freshness;
- backward/forward compatibility result;
- consumer-impact classification where consumers exist;
- candidate SHA or provenance binding;
- clear failure examples.

For AI behavior, require an eval manifest conforming to
[`../schemas/eval-manifest.schema.json`](https://github.com/SylphxAI/doctrine/blob/main/schemas/eval-manifest.schema.json)
(required capabilities, incumbent baseline, exact candidate/provider/runtime/
policy binding, dataset and contamination control, oracle, sampling,
thresholds, cost/latency/privacy constraints, substitution margin,
requalification triggers, canary/fallback, evidence, and owner/expiry for
exceptions); see
[`specification-control-plane-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/specification-control-plane-standard.md)
for the field walkthrough.

An eval manifest with `authorityMode: spec-only` proves only that an immutable,
digest-resolved test can be replayed. It is never a green admission result;
schema v2 has no blocking mode. The
[`eval-result`](https://github.com/SylphxAI/doctrine/blob/main/schemas/eval-result.schema.json) shape binds future result
records and supports mechanical comparator checks, but a self-authored result or
status is not truth. Blocking authority requires per-scenario and
per-negative-control observations, an immutable evaluator/harness, and a
registered attested producer. It must arrive through a future semantic schema
version and staged ratchet.

Requalification is required even without a source diff when an upstream model,
provider, runtime, prompt policy, tool catalog, data-use policy, price, latency,
capability, or safety behavior changes or crosses its declared drift budget.
Model aliases and “latest” channels are observations, not immutable candidate
identity. Promotion requires exact resolved identity plus the declared
substitution and recovery proof.

Schema v2 does not govern an LLM judge. An LLM observation may exist outside
the governed artifact as non-authoritative research, but it is not v2 evidence
and cannot decide admission.
Self-declared family names, aliases, provider labels, or punctuation-normalized
strings do not mechanically prove judge independence. Blocking admission uses
a deterministic checker, golden output, or property oracle with a
content-addressed dataset. A future schema may make an LLM judge blocking only
after a trusted content-addressed model-lineage registry and attestation
producer exist; it must arrive through an explicit semantic schema branch and
staged ratchet, not a prose claim or self-attested manifest field.
Repos may carry a local eval manifest schema; the doctrine schema above is the
default.

## Automated Canary Analysis

Canary/progressive rollout is a closed-loop controller, not a dashboard.

Every canary-required candidate must declare:

- baseline and candidate cohorts;
- metric source, query, labels, and bounded cardinality;
- SLO/error-budget inputs;
- analysis window, warmup, timeout, and minimum sample size;
- pass/marginal/fail thresholds;
- automatic action: promote, pause, rollback, lower flag, freeze rollout, or
  open forward-fix work;
- recovery owner and issue/PR link;
- readback status or deployment verdict.

Do not promote based on a green Kubernetes rollout alone. Promotion requires
the analysis verdict or an explicit signed exception with expiry.
When no repo-local telemetry/canary contract schema exists, use
[`../schemas/telemetry-contract.schema.json`](https://github.com/SylphxAI/doctrine/blob/main/schemas/telemetry-contract.schema.json)
and [`../schemas/exception-policy.schema.json`](https://github.com/SylphxAI/doctrine/blob/main/schemas/exception-policy.schema.json).

## Change-Centric VCS Watch Policy

The active delivery profile owns the enterprise source and audit adapter.
Change-centric authoring tools are allowed only when they export an ordinary
candidate into that profile and preserve exact-candidate admission, provenance,
serialization, and recovery.

Under the current GitHub delivery profile, examples of allowed experiments are:

- local Jujutsu authoring for stacked diffs or conflict management;
- local branch/stack manipulation that exports ordinary Git branches and PRs;
- prototype tooling that improves ADR-58 stack metadata.

Forbidden without a successor delivery profile and migration ADR:

- bypassing or replacing the active profile's change-admission surface or
  integration serializer;
- treating an identity outside the active profile's provenance contract as
  release provenance;
- requiring downstream repositories to adopt a new VCS;
- hiding conflicts from the active profile's required admission status or
  integration serializer.

## Adoption

Adoption is by selector, not blanket policy.

Use `required-future` doctrine migration packets only after:

- the harness or controller exists;
- the status context producer exists for PR, merge-group, postsubmit, or deploy
  as appropriate;
- the target repo selector is narrow and justified by blast radius;
- replay/readback evidence is defined;
- recovery path is documented.

Until then, these methods are `new-default` or `optional-adoption`.


## Package checklist (Skills cutover)

| Rule ID | Check |
| --- | --- |
| `frontier-ver-01` | Strongest relevant subset applied |
| `frontier-ver-02` | Facts in schema/test/ADR homes |
| `frontier-ver-03` | Proof layers separated |
| `frontier-ver-04` | Unknown authority fails closed |
| `frontier-ver-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
