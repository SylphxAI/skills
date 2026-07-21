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
artifact-guided agent workflow. They are not independent sources of truth and
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
perfect memory and high-capability models still need a durable boundary before fanning out.

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

An eval manifest must name the smallest complete replay contract:

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
- authority class and a content digest over immutable eval intent; a replayable
  specification is not by itself release authority;
- digest-bound deterministic checker, golden-output, or property-oracle
  implementation, plus negative-control corpus and executable entrypoint;
- any LLM-judge identity, prompt, rubric, calibration, independence, and
  variance contract. A judge is non-blocking unless its lineage and error
  characteristics are independently qualified for the decision;
- sampling policy, seed, retries, and allowed variance;
- thresholds plus cost, latency, privacy, and safety constraints;
- digest-bound replay plan and failure examples;
- a result shape conforming to the active eval-result schema selected by the
  binding profile, with mechanically recomputable comparisons and source
  observations sufficient to reproduce the verdict;
- substitution margin, shadow/canary comparison, fallback and recovery;
- scheduled and drift-triggered requalification conditions;
- owner and scheduled requalification date.

Schema evolution has one declared policy authority. Every governed artifact
kind maps to an admitted schema version; unclassified or unknown versions fail
closed. An admitted version is immutable, closed where practical, and selected
explicitly. A successor adds a separate semantic branch and positive/negative
fixtures rather than silently rewriting its predecessor. Contract identity
uses a declared portable canonicalization algorithm, and projection traverses
the complete reachable reference graph rather than hashing one convenient
file.

Version ratchets retain immutable history and declare activation, consumer
selection, compatibility, retirement, and recovery predicates. In development
or when no live consumer/state compatibility exists, verification may justify
one-step replacement. Live consumers or shared state require expand/contract
until readback proves convergence. No fixed number of days is evidence by
itself. A model/provider/runtime change can trigger requalification without a
source commit; an expired evidence contract fails admission.

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

For every signal and readback, name the audience and access path. Raw telemetry,
topology, internal process/migration state, implementation identifiers, and
diagnostics are protected operator evidence. Customer/public state is a
separate intentional allowlisted product, status, support, incident, audit, or
protocol contract; it may not become a projection of the internal telemetry
object. Use `operational-observability-review` when the full service
observability and diagnostic-access model is the independent artifact.

A green deploy object only proves the controller rolled out. It does not prove
behavior. A dashboard is evidence only when a machine-readable verdict or status
consumes it through the intended authorized channel.

## Exception records

Any temporary bypass of a binding instruction, security control, delivery gate,
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

1. Add schema/template support in the owning Skills package or product repo.
2. Audit for drift without blocking.
3. Open generated issues/PRs for selected repos.
4. Ratchet to required status only after the gate producer exists and default
   branch readback proves the migration path.

Do not blanket-block old repos before the corresponding status publisher,
doctor check, generator, or reconciler exists.


## Package checklist

| Rule ID | Check |
| --- | --- |
| `specificatio-01` | Strongest relevant subset applied |
| `specificatio-02` | Facts in schema/test/ADR homes |
| `specificatio-03` | Proof layers separated |
| `specificatio-04` | Unknown authority fails closed |
| `specificatio-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
