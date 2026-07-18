# specification-control-plane-standard (canonical body)

**Authority:** binding Standard Skill package `specification-control-plane-standard` in `SylphxAI/skills` (`skills/specification-control-plane-standard/`).

**Cutover:** migrated from Doctrine `standards/specification-control-plane-standard.md` at digest `sha256:0f2d4d45cc333290a7bc97002ff16959a13dceeae3846957dc9b6c924ca27126` (doctrine `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7`). Doctrine file is alias-only after cutover.

Author here; do not maintain a second prose SSOT.

---

# Specification Control Plane Standard

## Purpose

Use this standard when a change needs a specification, executable contract,
work packet, eval, exception, telemetry contract, or other durable artifact that
coordinates autonomous agents.

This standard owns artifact roles and executable proof. The active delivery
profile owns the selected coordination adapter; GitHub issue and PR references
below are the current profile projection, not a permanent artifact requirement.

The goal is not to add more prose. The goal is to make every important
constraint either:

- an ADR that records **why** a decision exists;
- a schema, test, policy, eval, generated artifact, or telemetry contract that
  defines **what must be true**;
- a GitHub issue/PR/work packet that coordinates **who is changing what**; or
- a delivery/proof artifact that shows **what happened in reality**.

Spec-driven tools such as Spec Kit and OpenSpec are useful references for
artifact-guided agent workflow. They are not the doctrine's source of truth and
their default `design.md` / phase-document model must not replace ADRs,
GitOps, executable contracts, or CI gates.

## Artifact altitude map

Semantic authoring authorities per fact live in
[`documentation-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/documentation-standard/references/full-standard.md)'s "One semantic
authority per fact" table; this standard owns the machine gate for each fact,
and specifies its own artifact shapes (work packets, eval manifests, telemetry
contracts, exception records) in the sections below.

| Fact | Machine gate |
| --- | --- |
| Why this architecture, public contract, persistence, migration, security, AI-workflow, commercial, or operational decision exists | ADR convention check, PR number binding, one new ADR per PR |
| What an API, SDK, CLI, tool, event, config, manifest, route, form, or package surface accepts/returns | contract diff, generated artifact freshness, compatibility tests |
| What behavior must hold | test/eval/simulation status bound to candidate SHA |
| What a non-trivial slice is trying to do before implementation | freshness/expiry and linked ADR/schema/test/PR check |
| How agents coordinate parallel work | claim/lease/status checks and collision audit |
| What AI/model/agent behavior is acceptable | thresholded eval status, replay command, failure examples |
| What production behavior proves success | deploy admission, canary/SLO verdict, trace/log/metric readback |
| What temporary policy gap is tolerated | exception-expiry check; expired exceptions fail CI |
| How humans understand a shipped surface | docs freshness/generation check |

If a prose document repeats a machine-checkable current-state fact, either
generate it from the canonical home or delete the repeated fact and link to the
home. A prose file that agents treat as current truth without a freshness gate is
drift waiting to happen.

## Prose specs

Prose specs are allowed only as **temporary execution contracts** before the
canonical homes exist. They are useful because parallel agents do not share
perfect memory and SOTA models still need a durable boundary before fanning out.

Required fields for a prose spec:

- status: `draft`, `active`, `shipped`, `superseded`, or `archived`;
- owner: repo, product, or issue responsible for closure;
- scope and non-goals;
- domain vocabulary and invariants;
- changed public/shared/persistent/generated/runtime surfaces;
- linked ADR when a material decision exists;
- linked schema/test/eval/catalog/source that will become the durable home;
- acceptance criteria and validation plan;
- expiry or review date for `draft` and `active`.

Rules:

- `draft` and `active` specs must expire or link to an active PR/issue.
- `shipped` specs must link to their canonical homes and may not restate
  current-state contracts.
- `superseded` specs must link to the replacement.
- `archived` specs are historical; agents must not treat them as current
  operating truth.

## Spec-as-code

Spec-as-code is the default for current-state contracts.

Use the smallest mature mechanism that can be the source of truth:

- TypeScript product domains: Effect Schema when the repo standard allows it.
- HTTP APIs: generate OpenAPI from the route/schema source of truth.
- Evented/message contracts: AsyncAPI or event schemas.
- Cross-language binary compatibility: Protocol Buffers with Buf-style breaking
  change checks when the cost is justified.
- Agent tools and MCP surfaces: JSON Schema or typed tool contracts.
- Manifests/config: JSON Schema, CUE, or equivalent typed validators.
- Policy: OPA/Rego, Conftest, Kyverno, GitHub rulesets, or repo-native
  policy-as-code.
- Independent consumers: Pact-style consumer-driven contract tests when
  providers and consumers version independently.

Do not hand-maintain OpenAPI, AsyncAPI, SBOM, generated clients, SDK reference,
or command reference when they can be derived. Generated output is a build
artifact or checked freshness artifact, not the editing surface.

## Work packets

Before broad parallel implementation, create or identify a durable work packet
when the change touches any public, shared, persistent, generated, cross-repo,
cross-runtime, operational, security, billing, migration, or high-risk AI
surface.

A work packet may be a GitHub issue, PR body metadata block, or JSON file. It
must include:

- stable id and owning repo;
- role or agent lane;
- goal and non-goals;
- affected surfaces and write boundaries;
- linked ADR/spec/schema/eval/test issue or PR;
- risk class and required gates;
- parallelization plan and collision risks;
- validation, rollback/recovery, and delivery proof;
- claim/lease metadata if multiple agents may work the same queue.

Hidden chat state, a local todo list, or a branch name is not enough ownership
when collision risk is real.

## Evals and simulation

AI behavior, agent workflows, provider routing, prompt/tool policies, and
model-dependent product behavior need eval manifests when correctness cannot be
fully expressed as deterministic unit tests.

An eval manifest must name:

- required capabilities, known failure modes, and incumbent baseline evidence;
- dataset/scenario suite version, repository-relative location, and content
  digest;
- task family and non-goals;
- immutable candidate revision plus artifact digest;
- requested alias separated from resolved model/provider/runtime identity,
  resolution time, endpoint/config fingerprint, and provenance;
- exact runtime, tool-catalog, prompt/policy, and data-policy revisions plus
  content digests;
- contamination or benchmark-leakage controls;
- `spec-only` authority and a content digest over immutable eval intent; schema
  v2 is replayable specification, never release authority;
- digest-bound deterministic checker, golden-output, or property-oracle
  implementation, plus negative-control corpus and executable entrypoint;
- optional LLM-judge output only as external, non-authoritative research. Schema
  v2 does not govern it, and it cannot be the v2 blocking oracle because
  self-declared family labels/aliases do not prove
  independent lineage. A future blocking form requires a trusted,
  content-addressed identity registry and attestation producer in a new schema
  version;
- sampling policy, seed, retries, and allowed variance;
- thresholds plus cost, latency, privacy, and safety constraints;
- digest-bound replay plan and failure examples;
- a result shape conforming to
  [`../schemas/eval-result.schema.json`](https://github.com/SylphxAI/doctrine/blob/main/schemas/eval-result.schema.json) and
  mechanically recomputable finite numeric/exact scalar comparisons. This is
  not a v2 promotion proof. Blocking authority requires per-scenario and
  per-negative-control source observations, an immutable evaluator/harness, and
  a registered attested producer in a future semantic schema version plus
  staged ratchet;
- substitution margin, shadow/canary comparison, fallback and recovery;
- scheduled and drift-triggered requalification conditions;
- owner and scheduled requalification date.

Schema v2 owns this substitution contract. The machine policy in
`profiles/artifact-schema-policy.json` rejects new v1 artifacts from its staged
future activation date and
ratchets selected legacy artifacts after its declared compatibility date;
`scripts/spec-control-plane-audit.py --base-ref <sha>` treats added, copied,
modified, and renamed artifacts as new admissions, preventing legacy paths from
laundering new content. Every canonical `schemas/*.schema.json` path has
exactly one policy classification; a newly discovered unclassified schema fails
admission regardless of where it declares `schemaVersion`. Each policy has an
ordered, append-only ratchet for every supported version above its baseline.
Each ratchet
binds its own accepted, non-superseded ADR metadata, future new-artifact
activation date, legacy window, selected-artifact required date, and at least
30 days of declared reconciliation. The policy registry is itself a selected
governed artifact:
its own ratchet is applied to `profiles/artifact-schema-policy.json`, so an
explicit semantic branch and ratchet can stage a successor but the registry
cannot remain on an expired predecessor after `minimumRequiredFrom`. A newly
supported version also needs an explicit semantic schema branch.
Candidate-vs-base audit forbids removing policy/ratchet history
or changing any admitted date or duration in either direction; emergency
acceleration is a separate decision path. Ordered ratchets cannot overlap. The
immutable initial version and retained ratchet history allow the contract phase
to remove retired old versions from the live schema enum while the historical
ratchet head prevents downgrade of the latest version. Expansion and
contraction are separate admissions: one candidate may not both add a successor
and remove a predecessor, and a predecessor may be removed only after its
successor's `minimumRequiredFrom` floor is active. Per-version schema
contracts are closed `#/$defs/versionN` modules selected by a root `oneOf`;
vNext adds a sibling module and may not rewrite an admitted predecessor.
Contract projection resolves the complete reachable local-reference graph with
RFC 6901 pointer decoding, including array-index traversal. It prunes only a
mechanically proved exact root `oneOf` version dispatcher; ambiguous
conditionals and all other combinators remain in every affected version
identity. Runtime selection likewise replaces only that proved dispatcher with
the selected branch while preserving every other root constraint, and falls
back to full-schema validation when the dispatcher is ambiguous. A nested child object's own
`schemaVersion` dispatcher remains part of its outer contract; escaped or
nested references cannot evade identity, while unreachable root vNext
definitions cannot rewrite v1. Schema-keyword audits traverse actual schema
positions, not instance property names or JSON data that merely resemble
keywords. Validators select the declared branch for
field-level diagnostics, and executable fixtures must prove vNext-only fields
remain forbidden to older versions. `$dynamicRef`, `$dynamicAnchor`, and
`$anchor` are forbidden until a successor projection contract and ADR define
their dynamic-scope identity semantics. Nested `$id` resource scopes are also
forbidden until that projection models URI-base changes rather than assuming
one document-local root. Per-version schema contract identity and
every JSON semantic/claim digest use the portable RFC 8785 JCS
contract in
[`../docs/specs/canonical-json-identity.md`](https://github.com/SylphxAI/doctrine/blob/main/docs/specs/canonical-json-identity.md),
not a runtime-specific JSON serializer. Selected
CI passes the merge base through `--base-ref`. A provider or
model change can trigger requalification even when no source commit changed,
and an expired requalification date is a gate failure.

High-risk state machines, queues, ledgers, permissions, schedulers, migrations,
and distributed workflows should prefer property/model tests or deterministic
simulation when example tests cannot cover the important interleavings. The
simulation harness is itself a spec-as-code artifact: deterministic controls,
fault model, oracle, seed corpus, replay command, lane placement, and recovery
policy must be declared.

## Telemetry and canary contracts

Production-bound changes must state which runtime signals prove success:

- smoke/synthetic check;
- health/readiness endpoint;
- trace/span or request correlation;
- structured log fields;
- metric names, units, labels, windows, and thresholds;
- SLO/error-budget inputs;
- canary or progressive rollout decision;
- automatic promote/pause/rollback/forward-fix action;
- readback status or deployment verdict.

A green deploy object only proves the controller rolled out. It does not prove
behavior. A dashboard is evidence only when a machine-readable verdict or status
consumes it.

## Exception records

Any temporary bypass of a doctrine rule, security control, delivery gate,
freshness gate, eval threshold, telemetry requirement, or generated artifact
must be a machine-readable exception, not a comment.

Required fields:

- id, owner, scope, affected rule/gate, and reason;
- replacement control or follow-up issue/PR;
- risk and blast radius;
- created date and expiry;
- evidence required while the exception is active.

Exceptions without expiry are policy changes and require an ADR. Expired
exceptions fail CI. Repeated exceptions against the same rule mean the
mechanism is wrong: replace them with a better policy, gate, generator, or
platform capability.

## Adoption

This standard is `new-default` for new repos and new high-risk surfaces. Existing
repos migrate by selector:

1. Add schema/template support in doctrine.
2. Audit for drift without blocking.
3. Open generated issues/PRs for selected repos.
4. Ratchet to required status only after the gate producer exists and default
   branch readback proves the migration path.

Do not blanket-block old repos before the corresponding status publisher,
doctor check, generator, or reconciler exists.


## Package checklist (Skills cutover)

| Rule ID | Check |
| --- | --- |
| `specificatio-01` | Strongest relevant subset applied |
| `specificatio-02` | Facts in schema/test/ADR homes |
| `specificatio-03` | Proof layers separated |
| `specificatio-04` | Unknown authority fails closed |
| `specificatio-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
