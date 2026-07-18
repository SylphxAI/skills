# roleless-speculative-development-standard (canonical body)

**Authority:** binding Standard Skill package `roleless-speculative-development-standard` in `SylphxAI/skills` (`skills/roleless-speculative-development-standard/`).

**Cutover:** migrated from Doctrine `standards/roleless-speculative-development-standard.md` at digest `sha256:f46bb48bf8a12c92384d451401bd73ea3ef8430229972afc6b04c70a3f6602aa` (doctrine `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7`). Doctrine file is alias-only after cutover.

Author here; do not maintain a second prose SSOT.

---

# Roleless Speculative Development Standard

## Purpose

Use this standard when universal agents generate repository changes faster than
per-candidate pull-request, CI, merge-queue, preview, or deployment capacity can
admit them. It defines the target no-human operating protocol for up to 10,000
interchangeable agents without a central task orchestrator.

This standard does not make unverified code safe. It separates cheap candidate
generation from expensive proof and effects, then canonicalizes both through
deterministic selection, compare-and-swap, scoped verification watermarks, and
verified-only promotion.

It composes with:

- [`agent-first-development-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/agent-first-development-standard.md)
  for the overall no-human engineering loop;
- [`mission-control-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/mission-control-standard.md) for durable
  internal work state and proof-chain links;
- [`ci-admission-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/ci-admission-standard.md) for verification,
  affected selection, flakes, and recovery;
- [`delivery-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/delivery-standard.md) for release, deployment, and
  production proof;
- [`frontier-verification-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/frontier-verification-standard.md) for
  nondeterministic or adversarial oracles;
- [`doctrine-profile-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/doctrine-profile-standard.md) for binding
  selection and compatibility; and
- the introducing roleless-speculative-development ADR for why this replaces
  role/PR/merge-queue assumptions where its successor profile is active.

## Constitutional invariant

> Speculate cheaply; canonicalize deterministically; verify cumulatively;
> serialize only irreversible effects; promote only immutable green snapshots.

Agent count and candidate count are not delivery proof. Optimize the rate and
cost of verified, recovered, deployed, and production-proven outcomes.

## Roleless execution

Any eligible agent may observe, attempt, challenge, verify, integrate, or repair
any work item. Permanent Builder, Reviewer, Integrator, and Recovery roles are
not correctness dependencies.

- Bind obligations to deterministic work and evidence identities, not a durable
  agent identity.
- Use a short-lived fenced lease only when one non-commutative effect needs one
  current executor.
- Require independent evidence lineage where risk requires a second view; a
  different declared role name is not independence.
- Recover agent death by expiry and reconciliation. Hidden session state cannot
  be required to continue.
- Capability, locality, or cost may influence eligibility, but must not create
  an irreplaceable named-agent dependency.

## Canonical work identity

Before starting an attempt, derive a `workId` from a canonical envelope that
includes at least:

- normalized objective and non-goals;
- owning repository and boundary/collision scopes;
- base-state or compatibility-frontier identity;
- applicable policy, profile, contract, toolchain, and oracle digests;
- required proof and effect classes; and
- declared privacy and authority scope.

Use canonical JSON and a collision-resistant digest. Equivalent envelopes must
produce one identity; materially different boundaries or policy inputs must not.
The closed `work-envelope` artifact is the identity material. It carries the
normalization contract and normalized objective/non-goals, repository,
boundary/collision scopes, compatibility frontier, policy/profile/contract/
toolchain/oracle digests, proof/effect classes, privacy/authority scope, and
parent-work lineage. Its `workId` is the RFC 8785 digest of the complete
envelope with only `workId` removed. Producer principal and attempt derivation
belong to `work-attempt`, not the envelope, because attribution must not prevent
independent agents from converging on the same work identity.

The Work Ledger admits a work envelope with atomic create-if-absent keyed by
`workId`. Replaying byte-equivalent canonical material returns the existing
record. The same `workId` with different canonical material fails closed; no
last-writer-wins update may redefine work identity. An explicit versioned alias
or successor relation is required to converge envelopes that were not byte-
equivalent at admission.
The Work Ledger owns current work state. Git, CI, deployment systems, and
telemetry remain the authorities for their own facts and are linked by observed
version and staleness.

A failure gets a deterministic `failureId` from the failed snapshot, proof,
scope, and policy inputs. Recovery is ordinary roleless work against that ID.

## Attempt and candidate protocol

Attempt material is immutable after publication. It records:

- `attemptId`, `workId`, parent/derivation lineage, and producer principal;
- exact input and policy digests;
- candidate content/tree digest and declared collision scopes;
- local evidence bundle and reproducible commands;
- risk, effect, migration, and public-contract classification;
- estimated shared-proof and effect cost.

Attempt lifecycle, cancellation, supersession, and terminal outcome are
append-only events. The Work Ledger may publish a rebuildable current-state
projection, but that projection is not part of the immutable attempt identity.

Content-identical attempts collapse by digest. Agents may discard duplicate or
losing work; they may not discard unique failure evidence needed for diagnosis,
audit, security, or a declared retention contract.

No attempt receives remote CI, preview infrastructure, release work, or external
effects merely because it exists.

The canonical machine contract is
`schemas/roleless-speculative-artifact.schema.json`. It is one closed, atomic
version and policy-lifecycle family containing `work-envelope`, `work-attempt`,
`work-attempt-event`, `work-candidate`, `work-selection-evidence`,
`green-watermark`, and `effect-authorization` kinds. The templates under
`templates/` form one content-addressed example proof chain. Identity is the
RFC 8785 digest of the complete artifact with only its own identity field
removed; mutable status never enters immutable attempt or candidate material.
Every family member advances the same policy ratchet. If one kind needs an
independent lifecycle, it must first split into a new schema family.

`scripts/roleless-speculative-artifact-audit.py` validates the local templates:
closed schemas, local content identities, bounded and replayable selection,
example cross-ID links, all-pass green semantics, release artifact presence,
monotonic expiry, fence generation, and exact template-byte links. It does not
produce live fleet completeness or runtime authority. In schema v1,
`green-watermark`, `effect-authorization`, `adr-locator-allocation`, and
`adr-locator-landing-attempt` are
`authorityMode: spec-only`; they are contract examples and cannot authorize
promotion, deployment, or another effect. Live use requires a separately
registered issuer/attestation authority, protected capture producer, exact-byte
resolver, effect-owner readback, and the corresponding successor profile.

The identity rule is machine-owned by
`profiles/roleless-artifact-identity-policy.json`, which maps every artifact
kind to its self-identity field and the canonicalization contract consumed by
the audit. ADR numeric reservation and CAS provenance are different artifacts:
one idempotent `adr-locator-allocation` survives replay; every
`adr-locator-landing-attempt` immutably binds one candidate, policy generation,
observed head, and CAS result. Repository cutover fences PR-number allocation
for new ADRs before the successor allocator becomes authoritative.

`scripts/roleless-throughput-simulator.py` is the deterministic reference model
for bounded rendezvous eligibility, duplicate collapse, frozen-set selection,
exact-head CAS, scoped latest-pending coalescing, and parallel build/proof
fan-in. Its 10,000-arrival scenario is a correctness and stress model, not a
capacity forecast or activation proof; measured pilot telemetry remains
required for profile selection.

## Deterministic bounded selection

Every work class selects exactly one policy:

| Policy | Use | Required controls |
| --- | --- | --- |
| `first-admissible` | low-risk work where additional search has negative value | local proof floor, deterministic close-on-first CAS |
| `bounded-best-of-k` | quality/performance work where comparison adds value | bounded K, frozen close condition, versioned oracle and tie-break |
| `independent-proof` | high-risk or nondeterministic work | producer-independent evidence lineage and frontier-verification contract |

The selection record binds candidate-set digest, policy and oracle digest,
scores or admissibility facts, deterministic tie-break, winner digest, and CAS
generation. Replaying the record from its immutable inputs must produce the same
winner.

Selection comparison inputs are canonical integers, never platform floats. The
record binds closure mode to exactly one versioned algorithm and ordering:
`first-admissible` selects the lowest admission ordinal then lowest candidate
ID; `bounded-best-of-k` selects the lexicographically greatest score vector then
lowest candidate ID; `independent-proof` applies the same score ordering only
after each admissible candidate binds at least two independent proof digests.
The declared score-dimension vector fixes vector length and meaning. An opaque
score-evidence digest is provenance, not sufficient winner evidence.

Use deterministic rendezvous eligibility to prevent herd execution. Begin with
the smallest configured ring and expand only when no admissible candidate arrives
before the declared deadline. Candidate and compute budgets are hard limits, not
recommendations.

An agent may challenge an open selection with evidence. After candidate-set
closure, new evidence creates a new generation; it cannot mutate the old winner
or silently change the oracle.

## Landing and collision control

The selected candidate may land only through compare-and-swap against the exact
observed Git head and policy generation.

- A stale base triggers deterministic replay, rebase, re-evaluation, or loss.
- Never force-push or blind-overwrite shared default-branch state.
- Use declared write and compatibility scopes to batch independent candidates.
- Serialize schema, dependency, lockfile, generated-code, root build, policy,
  migration, and other graph-wide collision classes conservatively.
- If the collision graph is unknown, use the broader scope; uncertainty cannot
  be laundered into independence.
- Git conflict-free is not semantic conflict-free. Contract and dependency
  scopes decide compatibility.

The default branch under this profile is an optimistic integration log. It is
not automatically a deployable, releasable, or green state.

## Scoped cumulative verification

For each compatibility scope, maintain one authoritative watermark record:

- `verified`: latest immutable snapshot with complete required green proof;
- `running`: zero or one immutable snapshot under verification;
- `pending`: zero or one latest snapshot, replacing older unstarted snapshots;
- `failing`: current failed snapshot and proof bundle, if any; and
- `quarantined`: typed bounded gaps with owner, expiry, and replacement control.

When `running` completes, verify the newest eligible `pending` snapshot.
Intermediate snapshots may be skipped only when their effects are fully
represented by the newer snapshot and no audit, culprit-isolation, migration,
release, or irreversible boundary requires individual proof.

Affected-scope selection must be a sound over-approximation. Unknown edges widen
the scope. Full and policy-triggered backstops audit selector misses. A selector
miss is a dependency-model defect and creates repair work.

A red scope blocks only its dependency and collision cone. Independent green
scopes remain eligible. The verifier must publish pending age, unverified-head
distance, failure age, coalescing ratio, scope-selection reason, and proof cost.

## Recovery

Verification failure atomically:

1. marks the scope failing at the exact snapshot and proof digest;
2. prevents that scope from verified promotion;
3. derives or updates a deterministic failure work item;
4. starts bounded roleless repair attempts;
5. chooses source revert, runtime rollback, or forward-fix from the effect and
   migration contract; and
6. verifies recovery and advances the watermark only from new proof.

Do not require the original author, a designated recovery agent, or a human
reviewer. Do not auto-revert non-revertible migrations, data effects, published
artifacts, public contract removals, or changes whose inverse is unproven.

Flakes follow the CI Admission Standard. Retry budgets are bounded and
observable; retry-until-green cannot create a verified watermark.

## Verified promotion

Release and deployment automation consume immutable verified snapshots, never
raw default-branch events. Eligibility requires:

- snapshot/tree and artifact digest;
- applicable profile/policy and dependency-frontier digest;
- complete required proof bundle for the environment;
- provenance and supply-chain evidence;
- compatible migration/effect state; and
- no current fence, exception, or failure that excludes promotion.

The promotion reconciler selects the newest eligible green snapshot. It may
skip superseded green snapshots. Deployment success, health/readiness, canary
analysis, rollback readiness, and production readback remain separate evidence.

Development auto-deploy may use a declared weaker proof class only if the target
cannot cause production, customer, financial, legal, credential, destructive,
or public-contract effects.

## Parallel build and proof fan-in

Building before all verification finishes is allowed and recommended when its
expected latency benefit exceeds bounded wasted compute. This is speculative
build or pre-staging, not optimistic production deployment.

For each selected or coalesced immutable snapshot:

1. run the build, tests/evals, security/supply-chain scans, and other independent
   proof lanes in parallel after the cheapest mandatory preflight;
2. publish the built OCI image/index into a non-serving candidate channel by
   immutable digest with build-definition, material, platform, SBOM,
   provenance, and signature/attestation identities;
3. fan in a typed proof bundle bound to the exact source/tree, artifact digest,
   policy digest, scopes, and build inputs;
4. advance the green watermark only when every required proof passes;
5. let the promotion reconciler atomically select that exact digest for the
   environment; and
6. apply progressive rollout, health analysis, runtime digest readback, and
   automatic rollback/forward repair.

If `B` is build time and `V` is independent verification time, safe parallel
prebuild changes the pre-promotion critical path from approximately `B + V` to
`max(B, V)`. It does not remove either obligation. A red verdict leaves a
quarantined/cacheable image and no deployable pointer.

Build once for the canonical identity `(tree digest, build-definition digest,
resolved materials, target platform)`. Reuse the same content-addressed artifact
across environments; environment configuration and secrets bind at promotion or
runtime rather than producing a new untraceable image. Tags are discovery
aliases, never promotion identity.

At high arrival rates, do not prebuild every commit. Apply the same latest-
pending coalescing, eligibility, singleflight, cache, and budget controls as
verification. Non-cancelable audit, migration, provenance, security, and
already-started irreversible obligations survive supersession.

## Platform control-plane contract

Company Doctrine decides the invariant, selector, risk lane, proof floor,
authority boundary, red budget, and promotion policy. Platform owns the reusable
mechanism:

- durable revision ingestion keyed by repository, ref, source SHA, and tree;
- a scope/policy coalescer with repair/rollback and promotion ahead of new
  feature verification, plus bounded latest-wins behavior;
- affected DAG planning and content-addressed build/test/scan execution;
- OCI artifact, SBOM, provenance, signature, and retention/GC services;
- scoped and composite release-green proof evaluation;
- exact-digest environment promotion through GitOps desired state;
- canary/blue-green analysis, rollback/forward repair, and runtime readback;
- quota, fair share, admission, cancellation, and cost telemetry; and
- stable public APIs/status events for repositories and Mission Control.

Repositories own their build definition, dependency/write/effect scopes, local
proof entrypoints, environment policy, migration contract, and health/readback
criteria. Platform must not infer those product facts from repository names.

Platform controllers are stateless in the execution sense: level-driven,
idempotent, at-least-once reconcilers with no correctness dependency on
in-memory ordering or a durable process identity. Durable state belongs in the
Work Ledger, database/CRDs, Git desired state, object/evidence store, and OCI
registry. Every write uses idempotency, CAS or fencing, observed generation, and
rebuildable projections.

Runtime proof follows this chain:

```text
verified source/tree + proof root + artifact digest
  -> GitOps desired revision
  -> reconciler observed revision/generation
  -> rollout stable/candidate analysis
  -> ready replicas' resolved image IDs
  -> declared health window and production readback
```

For multi-platform images, retain both the OCI index digest and each node-
resolved manifest digest. “Desired image changed” is not deployed proof.

## Industry contracts and precedents

No single industry standard is named “optimistic deploy” and safely covers this
whole model. Compose established contracts instead:

- DORA trunk-based development for small frequent trunk integration and rapid
  repair: <https://dora.dev/capabilities/trunk-based-development/>;
- OCI descriptors and Kubernetes digest-pinned images for immutable artifact
  identity: <https://specs.opencontainers.org/image-spec/descriptor/> and
  <https://kubernetes.io/docs/concepts/containers/images/>;
- SLSA build provenance and digest signing for artifact/material identity:
  <https://slsa.dev/spec/v1.2/build-provenance> and
  <https://github.com/sigstore/cosign>;
- OpenGitOps declarative, versioned, pulled, continuously reconciled desired
  state: <https://opengitops.dev/>;
- Kubernetes controller reconciliation and work-queue collapse:
  <https://github.com/kubernetes/community/blob/master/contributors/devel/sig-api-machinery/controllers.md>;
- latest-wins concurrency controls in GitHub Actions and GitLab pipelines:
  <https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency>
  and <https://docs.gitlab.com/ci/pipelines/settings/#auto-cancel-redundant-pipelines>;
- progressive analysis and rollback through tools such as Argo Rollouts:
  <https://argo-rollouts.readthedocs.io/en/stable/features/analysis/>; and
- hermetic remote CAS/execution through BuildKit or the Bazel Remote Execution
  API: <https://github.com/moby/buildkit> and
  <https://github.com/bazelbuild/remote-apis>.

These are mechanism evidence, not permission to install every named tool. The
active fleet profile selects one coherent stack and preserves tool-neutral
contracts.

## Effect serialization

Optimistic multi-writer execution ends at an irreversible or non-commutative
effect boundary. The effect record requires:

- typed effect class, authority principal, and permitted scope;
- current fencing generation and expiry;
- idempotency key and exact preconditions;
- immutable selected input and proof digest;
- expected result and recovery/compensation contract; and
- result readback from the system that owns the effect.

Any eligible agent may acquire the next valid generation. Only that generation
may perform the effect. A stale or duplicated executor must be rejected by the
effect owner, not merely asked to stop.

## Backpressure and fallback

Each scope declares budgets for attempts, candidate age, CAS retry rate,
unverified-head distance, green-watermark age, verifier concurrency, repair
churn, flakes, compute, previews, and deployments.

On breach, reduce speculative pressure for that scope through smaller eligibility
rings, lower K, larger verification batches, candidate freeze, independent
proof, or the compatibility delivery adapter. Do not globally stop unrelated
work. Do not add compute before measuring whether duplication, coalescing,
selection, or scope errors own the backlog.

## Repository adoption contract

A repository selecting the successor profile must expose machine-readable:

- Doctrine and profile resolution with exact digests;
- project lifecycle, layer, policy pool, capabilities, and task surfaces;
- boundary, dependency, compatibility, write, and effect scopes;
- deterministic local verification and affected-scope entrypoints;
- raw-main-to-production separation;
- verified-promotion and rollback/readback entrypoints;
- Work Ledger adapter and proof/event publication;
- compute and staleness budgets; and
- compatibility/fallback state.

Missing or ambiguous facts keep the repository on the compatibility profile.
They are adoption gaps, not permission to invent local defaults.

## Fleet rollout and authority

Adoption follows expand → reconcile → ratchet → contract:

1. central Doctrine publishes candidate contracts and read-only desired-state
   audits;
2. the enterprise control plane inventories and reconciles repositories through
   their owning project boundaries;
3. pilots prove duplicate, race, stale-base, verifier, failure, rollback, and
   promotion behavior;
4. an attested authority activates the successor profile by exact digest;
5. repositories emit selection evidence; and
6. legacy PR/MQ-only fields and settings contract only after coverage proof.

Doctrine does not directly mutate every organization from this repository. The
platform control plane owns organization/repository GitHub and runtime mutations.
Doctrine owns the policy, schemas, generated projections, desired-state plan,
conformance findings, and migration evidence contract.

## Required conformance tests

At minimum test:

- deterministic identity and content deduplication;
- concurrent attempt publication and winner CAS;
- frozen-set oracle replay and deterministic ties;
- eligibility-ring expansion without a 10,000-agent herd;
- stale-head landing and semantic collision rejection;
- latest-pending verifier coalescing and required no-skip cases;
- dependency uncertainty widening and selector-miss detection;
- split-scope failure isolation and repair convergence;
- agent death and lease/fence expiry;
- stale fence and duplicate effect rejection;
- raw-main deploy rejection and verified-snapshot promotion;
- rollback/readback and non-revertible forward-fix selection;
- bounded fallback under verifier and compute pressure; and
- fleet profile selection, exception, and compatibility readback.

## Reporting

Report these states separately:

- observed work and attempt state;
- selected candidate and selection proof;
- landed default-branch snapshot;
- running/pending/failing/verified scope watermarks;
- release and deployment eligibility;
- deployed artifact/environment state;
- production readback; and
- compatibility profile, exception, fallback, and unresolved adoption gaps.

Never report “main is green” without naming the exact immutable snapshot, scope,
proof bundle, policy digest, and staleness.


## Package checklist (Skills cutover)

| Rule ID | Check |
| --- | --- |
| `roleless-spe-01` | Strongest relevant subset applied |
| `roleless-spe-02` | Facts in schema/test/ADR homes |
| `roleless-spe-03` | Proof layers separated |
| `roleless-spe-04` | Unknown authority fails closed |
| `roleless-spe-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
