# Engineering Standard

## Quality North Star

**Meta:** *Simple concepts, powerful usage.*

Use a few deep concepts; compose them for power. Do **not** fake simplicity by
cutting capability, hiding difficulty in implicit convention, or forcing a
false unification. Depth decides whether a unification is earned; Simplicity
decides whether the result is actually cleaner after composition.

Every durable **product, design, code, documentation, and architecture**
outcome is judged against this **sole engineering quality vocabulary** when
attributes are relevant to the domain and blast radius. Business-model work
prices the same attributes through `commercial-decision-standard`.

Retired phrase: **Modern Technical Bar**. Do not reintroduce it, parallel
ility lists, or a second quality slogan layer. Prefer attribute IDs and binding
rule IDs below. Do not expand the table with Latency rows—latency lives under
Performance. Runtime resource cost (CPU, memory, IO, network, storage, build
minutes, toil) is a budget constraint on Performance/Scalability and is **not**
a separate slogan. Lifecycle / system-entropy / human-attention cost is
`q-economy`: a distinct decision lens below, never a runtime-resource slogan.

### Structure (operating set + memory set)

**Operating set = Meta + 14 primary attributes** (Readability is folded into
Maintainability; `q-readability` remains a compatibility alias for that facet;
Economy = lifecycle / system-entropy / human-attention cost accounting).

```text
Meta     Simple concepts, powerful usage

A. Stance     Depth · Simplicity
B. Quality    Correctness · Security · Reliability · Availability
              Resilience · Performance · Scalability · Economy · Observability
C. Sustainment Maintainability · Evolvability · Testability
```

**Memory set (9):** Depth · Correctness · Simplicity · Evolvability ·
Observability · Performance & Velocity · Reliability · Security · Economy  
(Evolvability folds Maintainability + Testability for memory; Reliability folds
Availability + Resilience; Velocity = delivery speed; Economy = agent-native
lifecycle / entropy / attention / coordination cost)

Usage modes, pocket questions, and anti-examples:
[quality-north-star-usage.md](quality-north-star-usage.md).

### Application law

These properties are **decision tools to price and verify**, not slogans to
paste into every design. Apply the strongest relevant subset. A static docs
change does not need a canary analysis contract; a queue, ledger, permission
system, parser, runtime, AI gateway, or deploy controller must prove the
relevant concurrency, retry, idempotency, observability, security, and recovery
properties explicitly.

For design reviews: pass **Layer A** (Depth / Simplicity) first, then scan B/C
in conflict precedence order. For PRs and design docs: name at most one or two
attributes intentionally strengthened or intentionally sacrificed—not the full
table. For retrospectives: name which attribute was broken, the consequence,
and whether it hardens into a rule.

**Clean-break default.** When a change replaces incomplete quality posture,
migrate or backfill what must be preserved, delete obsolete dual paths and
known-wrong residual states, and leave one model aligned with this north star.
Compatibility shims are exceptional debt under `eng-hard-cut-01/02`, not the
default quality strategy.

**Domain altitude.** Depth is capability and core-concept power first (product
and design). The remaining attributes bind code and architecture always; they
bind product/design/docs insofar as the artifact promises a real path users or
operators depend on. Do not confuse this **Depth** with progressive-disclosure
documentation depth in skill packages.

### Conflict precedence (`eng-quality-precedence-01`)

Absent an explicit business counter-instruction, resolve **engineering-quality**
tradeoffs in this order:

> **Depth / Simplicity (think clearly) → Correctness → Security → Reliability /
> Availability / Resilience → Observability → Performance / Scalability / Economy
> → Maintainability / Evolvability / Testability**

Rationale:

- Optimizing before understanding is prepaid incident.
- Incorrect high availability or high throughput only accelerates wrongness.
- An unobserved system cannot be called stable or resilient with confidence.
- Long-term maintainability matters and cannot replace “right and safe first.”
- Intentional violation of this order must record **tradeoff, owner, and
  rollback or review condition** in the smallest durable home.

This order is the quality-axis default inside the Engineering Standard. It does
**not** override higher-authority decision kernels (legal/safety/ruin floors,
principal objective, commercial EV) owned by Decision Quality / SOTA standards.
Those kernels decide ends and feasibility; this order decides which quality
attribute wins when two quality attributes cannot both be fully satisfied.

When two properties trade off, record the tradeoff in the smallest durable
home: code comment for a local implementation choice, test/benchmark for a
measurable behavior, ADR for material architecture or operational policy, and
Commercial ADR for product/business impact.

### Fourteen primary attributes

Each attribute is selected by relevance, priced against cost, and closed by
evidence—not by naming it in a PR description.

#### Layer A — Stance

| ID | Attribute | Obligation |
| --- | --- | --- |
| `q-depth` | **Depth** | Reach mechanism, boundary, invariant, and failure mode; prefer one powerful core concept or framed capability fully resolved end-to-end (states, recovery, edge paths, feedback, operability) over a shallow tour of many half-concepts. Be able to say why a shallower option was rejected. Growth deepens the same concept; do not invent parallel products for checklist coverage (`eng-depth-01`). |
| `q-simplicity` | **Simplicity** | Reduce concepts, special cases, and entanglement **while maximizing capability surface** — fewest systems covering the full ambition. Prefer **unify / compose** first; deletion of difficulty is last resort and only after coverage is preserved. Good simplicity: fewer primitives, stronger composition, more capability per concept. Bad simplicity: fewer features as virtue, cut edge paths, shallow shells, hide hardness in implicit convention, or false-unify incompatible concerns (`eng-simplicity-01`). |

Depth and Simplicity lock each other: Depth earns the right to integrate;
Simplicity judges whether integration actually cleaned the design. Both must
hold for the meta *Simple concepts, powerful usage.*

#### Layer B — Core quality

| ID | Attribute | Obligation |
| --- | --- | --- |
| `q-correctness` | **Correctness** | The system does what the owned contract says under the stated failure model, and fails in an explicit way when it must. Prefer type-, memory-, concurrency-safe construction; deterministic decision cores where practical; fail-closed floors for auth, integrity, privacy, and recovery. A feature is incomplete if it violates a declared floor. |
| `q-security` | **Security** | Secure-by-default, least-privilege, privacy-conscious, and auditable at trust boundaries. Trust, blast radius, and attack surface are design inputs—not a pre-launch patch. Verify at every boundary; never leave secrets in source, logs, or manifests. Threat modeling for new or changed trust boundaries is not optional ceremony when blast radius is material. |
| `q-reliability` | **Reliability** | Continuously deliver the promised **correct** outcome under normal and expected adverse conditions (not merely “stays up”). Side-effect paths are idempotent or exactly-once with recovery; retries, timeouts, and cancellation are budgeted; workers and jobs have durable transitions. |
| `q-availability` | **Availability** | Preserve service continuity to the declared SLO via health discovery, redundancy, failover, and maintenance/degradation policy—not infinite-uptime superstition or staying online while wrong. Where a control/data-plane split exists, data-plane behavior stays stable through bounded control-plane impairment using admitted last-known-good state when the availability contract requires it. Probes are not capability proof. |
| `q-resilience` | **Resilience** | Faults will happen; isolate, degrade, retry/backoff, recover, and avoid cascades (timeout, bulkhead, circuit breaker, idempotency, backpressure). Blind infinite retry that thrash-kills a dependency is not resilience. |
| `q-performance` | **Performance** | Meet explicit latency, throughput, cost, and resource budgets on critical paths; measure and own p50/p95/p99 where latency matters—not averages alone. Near-native performance only when the domain requires it. Cost-efficiency (CPU, memory, IO, network, storage, build minutes, toil) is part of performance, not a separate slogan. |
| `q-scalability` | **Scalability** | When load, data, or team coordination grows ~10×, the structure still holds with an acceptable cost curve. Design for horizontal scale and elastic load on boundaries that can grow; declare partition, ownership, and hot-path limits for authoritative state. “Add K8s/cache” is not a scalability argument; premature full distribution is not one either. |
| `q-economy` | **Economy** | Cost is priced in **agent-native budgets** — entropy, verification, attention, runtime, coordination, reversal — not human person-days / development effort as the default yardstick. Generating artifacts is cheap; verification and entropy dominate. Entropy is compound interest: every added concept charges lifecycle interest to every future agent and human. A cost claim states which budget, how it is measured, and which principle it trades (`eng-economy-01/02`). Runtime resource budgets stay under Performance/Scalability; Economy is the decision lens, not a second runtime-cost slogan. |
| `q-observability` | **Observability** | Material decisions, actions, and failures leave the minimum correlated, privacy-preserving evidence (logs, metrics, traces, events) needed to explain current state without SSH guesswork. Collection, access, redaction, retention, cardinality, cost, and **actionable** alerts are part of the contract—not success-path dashboards alone. |

#### Layer C — Long-term survival

| ID | Attribute | Obligation |
| --- | --- | --- |
| `q-maintainability` | **Maintainability** | Humans and agents (including six-months-later selves) can read, change, and diagnose safely. **Includes Readability** (alias `q-readability`): names, structure, local reasoning cost, and necessary comments make intent legible without archaeology. No god modules; no unowned dual paths; handoff captures non-obvious invariants; temporary fences name retirement predicates (`eng-maintain-01`, `eng-readability-01`). |
| `q-evolvability` | **Evolvability** | Requirements can change locally without rewrite; boundaries stay stable while interiors replace. Change remains affordable: composable, interoperable, portable, upgradeable, migration-safe, and rollback-safe under sole-writer ownership. Preserve option value without permanent dual systems or speculative dead switches; hard-cut predecessors after migrate/backfill. |
| `q-testability` | **Testability** | Critical behavior is falsifiable by automated semantic oracles at the lowest capable layer. Design seams and boundaries so tests are cheap, stable, and meaningful—contracts and invariants, not implementation trivia or coverage vanity. Pure cores, declared ports, deterministic simulation, and risk-matched verification beat untestable god-paths and source-string change detectors. |

**Alias (not a 14th peer attribute):** `q-readability` → facet of
`q-maintainability`. Prefer `q-maintainability` on new work; keep
`q-readability` / `eng-readability-01` valid for existing references and
comment/docs obligations.

### Subsumed mechanism properties

Older mechanism bullets are not a second list. Map them here and delete parallel
checklists:

- type-/memory-/concurrency-safe, deterministic cores, automated verification →
  **Correctness** + **Testability**
- high-throughput / low-latency / near-native when required / runtime resource
  cost → **Performance** (+ **Scalability** for capacity shape)
- TCO, lifecycle cost, system entropy, human attention, agent-native build
  economics → **Economy**
- horizontally scalable, elastic → **Scalability**
- resilient under production load → **Resilience** (+ **Reliability**)
- observable under production load → **Observability**
- secure-by-default, privacy-conscious, least-privilege, auditable → **Security**
- idempotent, retry-safe, timeout-bounded, cancellation-aware, backpressure-aware →
  **Reliability** + **Resilience**
- composable, interoperable, portable, upgradeable, migration-safe, rollback-safe →
  **Evolvability**
- operable → **Maintainability** + **Observability** + **Reliability**
- readable / legible / documentation-for-intent → **Maintainability**
  (`q-readability` alias)
- testable → **Testability**

### Selection and proof

For each material change:

1. List the attribute IDs in scope (`q-*`) and the binding rule IDs they
   invoke.
2. Prefer executable evidence: types, schemas, tests, benchmarks, traces,
   SLOs, recovery drills, threat models, rollout readback.
3. Explicit residuals name owner, expiry or review trigger, and retirement
   path—never “best effort” as a permanent quality state.
4. Product/design tasks apply **Depth** as core-concept power and **Simplicity**
   as compose-not-cut; implementation must not ship a shallow shell that defers
   Correctness, Security, Reliability, or Observability on the framed path.
5. If the change intentionally violates default quality precedence, record the
   tradeoff and rollback/review condition (`eng-quality-precedence-01`).

## Decision First, Contract And Code Second

Before broad implementation, create or update the owning repository ADR when a
material durable decision changes architecture, ownership, public contracts,
persistence, security/privacy posture, delivery semantics, or an enterprise
default. Record the context, alternatives, selected boundary, consequences,
migration/recovery, and verification intent while the decision can still guide
the implementation rather than explain drift afterward.

An ADR records **why** and the durable boundary. Specs, schemas, tests, and
executable policies define **what must be true**; source candidates implement
it. Investigation, comparison, and bounded prototypes may precede the ADR when
they are needed to make the decision, but broad implementation must not become
the accidental authority before the decision is recorded.

Do not create an ADR for ordinary implementation detail already governed by an
accepted decision or testable contract. Keep local algorithm choices, refactors,
and measurable behavior in code, comments, schemas, tests, or benchmarks at the
smallest durable altitude. Raw chat and brainstorming are evidence inputs, not
decision authority.

The bar is language- and tool-independent. The active matching engineering
profile selects current languages and tool classes; every selected stack proves
the same obligations with its native compiler, static analysis, lint,
dependency, test, contract, security, and runtime evidence.

## Language and tool selection

Load the active profile before choosing a language, framework, protocol, SDK,
database tool, or migration engine. Selection follows the Decision Quality
decision kernel: capability fit, ecosystem maturity, safety, interoperability,
portability, delivery cost, operational proof, and migration surface precede a
default. A deviation uses the profile's exception contract and repo ADR; a
repeated or clearly dominated default is amended centrally.

All selected stacks prove:

- schema-derived boundary contracts with one semantic authority;
- exhaustive typed handling of expected failures and loud unexpected defects;
- a pure decision core separated from external effects where it improves
  reasoning and replay;
- automated type/static, lint, test, dependency, contract, and silent-failure
  gates appropriate to the language;
- an observability, recovery, and supply-chain contract for production paths.

### Version currency and reproducibility

Use `select-dependency-versions` whenever a project is created or a runtime,
framework, SDK, generator, plugin, or library is added or upgraded. Query the
authoritative live release source during the task and target the newest eligible
stable production release. Model memory, static templates, existing manifest
ranges, installed prevalence, and migration effort are not version-selection
evidence. Existing projects cross major versions and migrate by default rather
than stopping at the newest release allowed by an obsolete range.

"Use latest" is a selection rule, not a floating-build mechanism. Commit exact
resolved versions and integrity-bearing lock graphs and verify frozen or locked
installation. Published libraries may expose intentional bounded consumer and
peer ranges, but their own development graph stays locked and their promised
lower and newest eligible compatibility points are tested.

Stable, long-term-support, and preview channels are different choices. Stable
is the default unless the active profile selects another production channel;
preview, beta, release-candidate, nightly, and canary releases require an
explicit bounded experiment. A retained older direct version requires exact
blocking evidence, owner, expiry, recheck trigger, and forward replacement
condition and may not be described as current. Yanked, retracted, deprecated,
end-of-life, revoked, or known-exploitable versions are ineligible even when an
old lockfile still resolves.

### Static verification floor

No-human engineering moves every decidable defect as far left as the selected
ecosystem can prove it. A production path must fail before canonical landing
or effect promotion at the active lane's admission boundary when its
compiler, static analyzer, schema compiler, query analyzer, contract generator,
or build-time semantic check can determine that the path is invalid. Strict
language modes and warnings-as-errors are the default; unchecked casts,
untyped boundary values, generated-code staleness, ignored diagnostics, and
dynamic escape hatches may not silently reduce the proof surface.

The required outcome is compile-time **or admission-time** proof, not identical
compiler mechanics across languages. Where a language cannot express a proof
natively, CI runs the strongest deterministic schema-aware generator or
analyzer against the exact candidate inputs and treats its result as blocking.
Generated types and metadata remain derived artifacts: they bind their source
digest and tool version and fail freshness checks. A stack that cannot provide
an equivalent pre-landing admission proof for a critical boundary does not own that new
boundary without a repo ADR, measured evidence, containment, and a replacement
trigger.

Static success is never promoted into a broader runtime claim. Authorization,
live drift, data-dependent invariants, scheduling and transaction
interleavings, external availability, and performance remain runtime or
integration obligations and keep their own constraints, tests, telemetry, and
recovery proof.

### No runtime-first defect discovery

Production runtime must not be the first oracle for any known defect class. A
defect that is statically decidable blocks through compilation or deterministic
admission. A defect that depends on state, time, concurrency, distribution, or
an external system blocks promotion through the strongest pre-production
contract test, ephemeral integration environment, property/model test,
deterministic simulation, fault injection, replay, security check, load test,
or eval capable of exercising that failure class.

Inherently live facts still require runtime validation; removing those checks
would weaken the system. Their failure behavior is designed and proved before
promotion: inputs decode before use, authorization and invariants fail closed,
effects are timeout/cancellation/backpressure aware, mutations are idempotent,
expected failures are typed and exhaustive, unexpected failures are loud, and
telemetry plus automated recovery prove containment. A novel runtime condition
opens a typed defect class and a regression oracle before the next promotion;
it may not remain an accepted runtime-only surprise.

Language or tool limitations do not lower this floor. Compose a stronger
analyzer, generator, verifier, simulator, or boundary adapter, or select a
different stack for the boundary. A critical boundary with no credible
pre-production oracle is inadmissible except as a bounded experiment with an
explicit exposure cap, kill condition, owner, expiry, and recovery.

## Architecture

All durable product code uses the canonical
[Capability-first architecture](capability-first-architecture.md) from its first
generation. The architecture combines Strategic DDD, Tactical DDD,
Clean/Hexagonal dependency boundaries, Feature-first vertical slices inside
capabilities, and Functional Core, Imperative Shell (FCIS). Functional-
programming principles shape the core; they do not require every language or
effectful orchestration path to pretend to be purely functional. Small project size,
file count, or historical human implementation cost is not an exemption.

Apply the
[Complete System Architecture](system-architecture.md) when state, runtime,
failure, deployment, interoperability, or extension boundaries exist. It keeps
Capability/bounded context, module/package/crate, contract, state authority,
process, cell, service/deployment, and trust boundaries as orthogonal
dimensions. None is inferred one-to-one from another.

Use cohesive capability modules with dependency direction toward stable domain
policy. Domain decisions do not depend on framework, transport, persistence,
provider SDKs, or UI implementation. Application code orchestrates use cases;
ports publish required effects; adapters implement those ports; interfaces
translate external inputs and outputs. Cross-capability access uses published
contracts, application ports, or domain events rather than internals.

Published contracts include schemas, application ports, domain events, API
clients, and documented package exports. Do not import another capability's
domain internals, adapter internals, private UI components, or database helpers.

Keep modules cohesive, explicit, and replaceable. No size-based exemption may
hide a god responsibility at file, module, package, crate, service, or bounded-
context level. Split on a new responsibility, invariant, contract, adapter,
claim, proof, or ownership boundary—not mechanically on every behavior or an
arbitrary line count. Module semantics outrank physical filename count.

Use [language mappings](capability-first-language-mappings.md) for idiomatic
Rust, TypeScript, Python, and Dart shapes and
[examples](capability-first-examples.md) for the shared reference model. When
more than one implementation language, application platform, or independently
versioned SDK crosses a boundary, apply the
[cross-platform contract architecture](cross-platform-contract-architecture.md)
from the first contract revision.

Keep authoritative state explicit and horizontally scalable when the boundary
requires it. Process-local caches or coordination state must never masquerade
as durable truth. Persistent state, queues, blobs, indexes, and replicated
views declare ownership, consistency, recovery, and freshness.

Classify non-trivial state as authoritative durable, durable workflow,
derived/rebuildable projection, ephemeral process/cache, coordination/lease,
client/session, or configuration/secret state. Each applicable set declares
one semantic write authority, readers, consistency/transaction boundary,
partition, durability, recovery/rebuild, freshness/reconciliation, retention,
privacy, and failure behavior. Prefer interchangeable stateless compute; do not
pretend intentionally stateful authorities are stateless.

Where a real control/data-plane boundary exists and the availability contract
requires it, established data-plane behavior remains statically stable through
a bounded control-plane impairment using admitted last-known-good state. Cell
topology is conditional on demonstrated multi-tenant or ultra-scale fault
isolation; a cell is not a Capability or service synonym.

Cross-boundary integration events use a schema-owned payload in a CloudEvents
envelope. Operational telemetry uses OpenTelemetry at the adapter shell and
remains protected evidence by default. Static composition is the extension
default; a WebAssembly Component Model boundary is conditional on a proven
cross-language or untrusted-plugin need and an explicit capability/resource
grant.

## Implementation Shape

Binding rule IDs: `eng-quality-01`, `eng-quality-02`,
`eng-quality-precedence-01`, `eng-depth-01`, `eng-simplicity-01`,
`eng-readability-01`, `eng-maintain-01`, `eng-growth-01`, `eng-deps-01` (with
`eng-hard-cut-01` / `eng-hard-cut-02` when retiring predecessors). Select other
`q-*` attributes and rule IDs by blast radius.

Prefer the simplest design that **preserves capability** and expresses the
domain cleanly through fewer composed primitives. One clear function, schema,
query, module, or generated contract beats a framework of helpers that does not
protect a real boundary. Unify and compose before deleting coverage. Add an
abstraction only when it removes demonstrated duplication, protects a stable
boundary, or names a domain concept that future code will reuse—and never as a
false unification of incompatible concerns.

Ship thin vertical slices on a path that already works end to end; do not trade
a working product for unfinished layered complexity (`eng-growth-01`). Long-term
shape means the **destination** is sole writer and ownership is correct—not a
stopgap dual-path left for later. Prefer hard-cut with migrate/backfill and
predecessor deletion over permanent compatibility layers (`eng-hard-cut-01/02`).
Migration is the cutover method; forever backward-compat shims are the debt.

Before adding code, check whether the right move is to delete, fold, derive, or
move existing code to its canonical owner. Remove dead code, stale comments,
duplicated constants, unnecessary dependencies, and hand-maintained mirrors in
the same slice when they are on the touched path and safe to retire.

Keep pure decisions separate from side effects. Use functional composition,
typed effect systems, serverless, workers, or other architecture styles only
when they reduce state, clarify ownership, improve recovery, or lower
operational cost for the repo boundary; do not force them into glue code where
native primitives are clearer.

### Established mechanisms before custom architecture

Product and domain behavior may be novel. Commodity engineering machinery
defaults to the simplest applicable published standard, language/runtime
primitive, protocol, provider capability, actively maintained ecosystem
library or reference implementation, or established reference design.
Before introducing a custom framework, controller, gate, queue, status model,
deployment stage, coordination service, or architecture term, compare it with
that baseline and record:

- the exact requirement the baseline cannot meet;
- the semantic or measurable quality property added by the custom mechanism;
- the extra state, coupling, dependencies, latency, failure modes, operations,
  migration, support, and proof it creates; and
- how standard clients, tools, operators, or a future replacement can cross its
  boundary without learning private implementation vocabulary.

For commodity code, make an explicit build-versus-adopt comparison rather than
treating a new dependency as inherently worse than locally owned code. Search
the existing codebase, standard library, platform/provider primitives, and
mature ecosystem implementations. Compare maintenance and security response,
API stability, interoperability, license, transitive supply-chain and runtime
surface, performance, edge-case burden, and replacement cost. Prefer a mature
library when it removes non-trivial protocol, parser, serialization, security,
or compatibility ownership. Prefer direct local code when the behavior is
genuinely small and stable and the dependency would create the larger lifecycle
surface. The ability to build a component is not evidence that owning it is the
better design.

This is proportional engineering, not a mandatory literature review. An
obvious local use of a native primitive needs clear code and a narrow oracle;
durable shared, cross-boundary, or operational custom machinery needs an ADR
and explicit comparative evidence.

If the input/output behavior, guarantees, failure handling, and measured
quality are materially equivalent, use the established mechanism and its
standard terminology. A wrapper, dashboard, status light, generated diagram,
or renamed sequence is not an architecture improvement by itself. Delete or
fold a custom layer that adds explanation and operating cost without a distinct
capability or guarantee.

Do not stack patterns for completeness. Select one coherent baseline, then add
only complementary mechanisms whose activation predicates are independently
satisfied. Architecture review compares observable outcomes and failure
behavior against the baseline; a custom mechanism cannot validate itself only
through its own authored statuses, vocabulary, or internal gates.

## Sources Of Truth

One concept has one semantic authority. The project declares the authoritative
schema, decision log, manifest, persistent model, design-token source, memory
surface, and implementation history appropriate to its boundary.

Derive validators, types, clients, transport projections, fixtures,
documentation, indexes, and read models from the authority where possible.
When a derived copy is necessary, record lineage, source version, freshness,
reconciliation, and rebuild or retirement behavior. A copy becomes drift only
when it can be authored independently or loses its provenance.

Do not maintain parallel contract definitions, database shapes, constants, or
client models by hand when generation or a single adapter can express them. If
a repository already has a different explicit authority, use it consistently
unless the task includes a migration.

### Active source authority and predecessor retirement

A successor-bearing change must leave one normal implementation and write
authority. Target availability alone is not cutover: the same objective must
dispose of every predecessor as deleted source, a narrowly justified one-way
compatibility adapter, or immutable historical material isolated from ordinary
implementation discovery. An active-looking old module, export, route, job,
configuration path, generator input, or runtime registration is an authority
defect even when current traffic is believed not to use it.

Git history is the default recovery surface for deleted implementation. A
compatibility adapter may remain only for demonstrated current consumers; it
delegates to the current authority, owns no independent domain policy or
authoritative writes, is unavailable to new consumers by default, exposes
protected usage or contract-support evidence, and has an exact retirement
predicate. Preserve immutable migrations, supported schema/protocol history,
and required audit or legal records when their lifecycle requires them, but do
not let historical artifacts re-enter mutable policy or runtime ownership.

Enforce current ownership through compiler/module visibility, package exports,
dependency/build graphs, generated-contract ownership, route/job registration,
and semantic behavior proof. Do not infer it from source spelling or a folder
named `legacy`. Apply the full
[active-source authority and retirement contract](active-source-authority-and-retirement.md)
whenever an implementation is replaced, migrated, deprecated, folded, or
substantially refactored.

## Source-Controlled Artifact Identity

Parallel-authored artifacts must not use self-assigned sequential numbers as
primary identity. This applies to ADRs, migrations, instruction migration packets,
generated issue markers, catalogs, registries, package version edits, route or
tool registries, env/config keys, queue/event names, and any other artifact that
multiple branches or agents may create concurrently.

Use one of these identity sources instead:

- allocator-backed identity such as the active delivery profile's candidate or
  issue locator, a release allocator, or a database sequence allocated by the
  database at runtime;
- collision-resistant generated identity such as timestamp plus slug plus hash,
  ULID/UUIDv7, content hash, or tool-native migration version;
- generated post-merge display ordering for registries and reports.

Do not treat display order as identity. A generated registry may sort items as
`1, 2, 3`, but branches edit the canonical source and let the registry
regenerate after merge.

Database row auto-increment is not banned when the database is the allocator.
Avoid leaking those IDs into public, cross-environment, offline-sync,
multi-region merge, or long-lived integration contracts unless the domain
explicitly accepts allocator-local identity. Use globally stable IDs when data
must move between allocators or survive environment merges.

Use the repository's declared artifact-identity conformance entrypoint for
read-only local, target-repository, or portfolio readback before claiming a repo's
parallel-authored artifact identity surface is clean.

## No-Human Engineering Patterns

No-human development rewards designs that are easy for tools to understand,
split, verify, and recover. Prefer these patterns when they fit the repo:

- **Functional Core, Imperative Shell**: keep domain decisions as pure functions and
  move IO, clocks, randomness, secrets, network calls, and database access to
  infrastructure adapters or typed effect runtimes at the boundary.
- **Typed failure algebra**: model expected failures as tagged errors and make
  route/job/tool boundaries exhaustively translate them into user-facing,
  API-facing, or retryable outcomes.
- **Silent-swallow gates**: swallowed errors are the defect class CI is
  otherwise blind to — a fallback turns a loud failure into green tests over
  wrong behavior, and no human reviewer exists to ask why a catch returns a
  default. Lint/gate the patterns mechanically: empty catch blocks, catch or
  catch-all returning a default value without a typed decision, error-channel
  narrowing without exhaustive handling, and retries that discard the final
  failure. Treat test-assertion weakening as a policy-grade diff, not a fix —
  Engineering owns whether the repair evidence is valid, while
  [`ci-admission-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/drive-to-delivery/references/ci-admission-standard/references/full-standard.md)
  "Reward-hacking and execution-trace integrity" owns candidate-trace review
  and the heightened lane for gate-weakening diffs.
- **Schema-derived surfaces**: derive validators, types, interface descriptions, clients,
  fixtures, forms, and docs from the same schema source.
- **Declarative policy**: express permissions, rollout rules, config, manifests,
  and deployment intent as data that can be linted, diffed, and reconciled.
- **Architecture fitness functions**: enforce dependency direction, public
  surface, generated freshness, migration safety, compatibility, and measured
  budgets through the semantic enforcement hierarchy below. Do not turn source
  spelling or file shape into a permanent product contract.
- **Property and model-based tests**: use them for state machines, concurrency,
  queues, billing/ledger invariants, permissions, and parsers where examples
  alone miss interleavings.
- **Deterministic simulation**: use a controlled clock, randomness, scheduler,
  network/storage model, and replayable seed corpus for distributed,
  concurrent, or irreversible workflows whose important bugs require fault
  ordering or long-running interleavings. Keep it targeted by blast radius; see
  [`risk-matched-verification-standard.md`](../../risk-matched-verification-standard/references/full-standard.md).
- **Idempotent, replayable jobs**: every queue worker, cron, migration helper,
  and external side-effect path should have idempotency keys, retry policy,
  timeout policy, and replay/debug evidence.
- **Build graph awareness**: use affected-task detection, dependency graphs,
  caching, and remote execution where practical so merge queues stay fast
  without weakening required checks. Affected selection is a presubmit *speed*
  optimization safe only with a postsubmit full-suite backstop and a complete
  dependency graph; it is never a correctness or security control. See
  [`ci-admission-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/drive-to-delivery/references/ci-admission-standard/references/full-standard.md) for the two-tier model,
  the never-skip global gate
  classes, and merge-queue flake/quarantine signal integrity.

## Active engineering profile

Current technology, typed-effect, contract/transport, database-change, and
AI-runtime selections resolve from the binding profile packages in
`SylphxAI/skills` plus current the live work system organization-wide adoption state. This standard owns the
bar and proof obligations; the selected profile owns replaceable choices.
Repositories record only their local selected stack and exceptions, not a copy
of the technology stack profile.

## Frontend

Build the actual product experience first unless explicitly asked for a
landing page. Preserve the existing design system when one exists. For new UI,
make it intentional, accessible, responsive, and domain-specific, using the
repo's documented stack and the Quality North Star with stable component
dimensions and responsive layout constraints.

Respect accessibility, i18n, and motion requirements: no hardcoded user-facing
strings when the repo uses i18n; motion respects reduced-motion preferences;
layouts stay stable across mobile and desktop. Use stable dimensions for
boards, grids, toolbars, counters, controls, and repeated UI so hover states,
labels, icons, pieces, loading text, or dynamic content cannot resize or shift the
layout.

Operational SaaS and enterprise tools prioritize dense, scannable, repeatable
workflows over marketing-style layouts. Games and expressive consumer
experiences may be more visual and animated, but must still be usable and
responsive.

For meaningful frontend changes, validate the rendered UI when practical:
check desktop and mobile behavior, text overflow, overlapping UI, missing
assets, layout shift, and reduced-motion behavior — and reject generic
template aesthetics (nested cards, decorative gradient blobs, one-note
palettes, visible instructional copy explaining obvious interactions).

## Boundaries

### Boundary contract system

Every public, cross-repo, cross-runtime, persistent, or independently versioned
boundary has one canonical contract representation. Generate consumer-native
types, validators, fixtures, documentation, compatibility analysis, and
transport bindings from it. Choose transport by consumer and operational needs;
do not create a second API design per client.

JSON is an encoding, not an application or domain state model. Decode external
or persisted JSON into an explicit versioned typed DTO at the boundary, validate
its presence, discriminator, and value semantics, then map it into domain values
before applying policy. Raw or dynamic JSON may remain only when the payload is
intentionally opaque, provider-owned, or pass-through; contain it in a typed
wrapper with declared size, sensitivity, and access bounds, and do not branch
domain policy on ad hoc keys. Public or cross-runtime boundaries use generated
contract types and ProtoJSON instead of independently authored Rust JSON
schemas.

A durable snapshot DTO declares its schema version, subject identity, source or
replay position, and migration or rebuild behavior. When an event stream or
ledger is the semantic write authority, its snapshot is a rebuildable
projection rather than a second authority.

When a boundary supports more than one implementation language, its canonical
representation is language-neutral. Rust structs, TypeScript or Effect schemas,
Python models, Ruby classes, Dart classes, framework decorators, and
transport-specific request objects are generated projections or local adapters;
none may independently re-author the shared field, method, validation, error,
or lifecycle semantics. The backend implementation language does not become
the cross-language contract authority.

The authority carries field presence, validation rules, stable error details,
method semantics, and lifecycle metadata. Method semantics include
idempotency, authorization and tenancy scope, pagination, deadlines,
retryability, streaming/backpressure, and deprecation or sunset behavior where
applicable. Expected failures map through typed error details and protocol
status, never error-string matching.

CI gates source compatibility, semantic validation changes, generated
freshness, and a compile matrix for every supported consumer language. Code
generators and plugins are exact-version pinned; generated artifacts bind the
source and generator identities. High-risk or published contracts also prove
old-client/new-server and new-client/old-server behavior with wire/JSON fixtures
or an equivalent compatibility matrix.

Generated SDKs separate three concerns. A generated wire core owns serialization,
service signatures, and protocol errors. A thin language-native facade owns
ergonomics such as authentication configuration, pagination iteration,
cancellation, retries, and the language's typed failure model without copying
payload definitions. A public HTTP SDK may instead derive from the canonical
HTTP projection. Do not publish two independently evolving model sets in one
language. Every supported SDK language is named in the generation manifest and
must compile, package, decode the shared fixture corpus, and pass the same
ephemeral-server contract suite before the contract can land.

Public HTTP and event descriptions remain lineage-bound projections unless the
profile explicitly assigns them a distinct semantic slice. Projection-specific
paths, operations, broker bindings, security, and presentation metadata may be
owned there, but payload fields are not re-authored. Their linters and semantic
breaking checks compose with—rather than substitute for—the canonical contract
gate. A single-language private boundary may use a repo-local authority until
publication or another runtime justifies extraction. The active engineering
profile owns the current technology contract, protocol, generator, runtime, and
per-platform client selections.

Validation coverage is recorded per generated language and constraint class.
A constraint annotation is not universal proof merely because one runtime can
execute it. Structurally decidable incompatibility blocks through schema and
generated-consumer admission. Constraints without an admitted implementation
in every SDK language remain server-authoritative, fail closed at the service
boundary, and carry cross-language positive/negative fixtures; the SDK surface
must not claim local validation it cannot perform. Runtime validation remains
necessary for data-dependent, authorization, state, and external facts.

### AI and framework adapters

Select AI and application SDKs by required capability, boundary fit, maturity,
interoperability, data policy, runtime cost, and eval evidence. Framework
schemas and async shapes stay in infrastructure adapters and do not become a
second domain contract. Model/provider/runtime/policy choices bind exact
versions and requalification triggers through the eval contract in the
Risk-Matched Verification Standard.

For persistence work, declare one schema and migration authority. The active
technology-stack profile selects **Atlas** as the sole production schema-change
applicator for relational product databases (cross-language, every repository
size). Migration identity is collision-resistant and changes are replay-tested.
ORM push to live databases and a second production migration runner are
forbidden. Pin the OS/arch-matching Atlas CLI for apply images; regenerate
directory integrity hashes only with that binary. Ordinary recovery is
forward-only; do not use migrate-down as the ordinary path.

Default cutover terminal is hard-cut: build destination, migrate/backfill with
oracles, sole writer, delete predecessor. **Schema multi-step inside the
destination** (nullable → backfill → constrain; create-new → swap) is required
when live DDL/lock/data-depend risk exists and is **not** a product dual system.
Temporary dual-write or shadow is allowed only under `eng-hard-cut-01` risk-class
and procedure gates (money/conserved value, multi-tenant shared blast, large
online DDL, external un-updatable clients, irreversible external effects) with
owner, dated contract, readiness oracles, and recovery drill. Permanent
dual-write, forever flags, and “support both” are forbidden. Agent wall-clock
speed does not skip risk-class gates; dual-system entropy is the expensive
budget (`eng-entropy-cutover-01`). See
[`execute-hard-cutover/references/database-cutover-and-migration.md`](../../../../execute-hard-cutover/references/database-cutover-and-migration.md).

Every static relational query is compile-time or admission-time checked against
the exact migration-derived schema, database dialect, and relevant server
version. Inputs and outputs carry exact native or generated types for
nullability, domains/enums, and row shape; untyped row maps, unchecked result
assertions, and independently authored ORM models do not cross the persistence
boundary.

Query layers use parameterized operations, indexed access paths, bounded
pagination or streaming, and idempotent mutation where the failure model
requires it. Unchecked static SQL and dynamically assembled SQL are
default-deny; schema-checked static SQL is allowed. A necessary dynamic query
uses a typed builder or a bounded exception that allowlists
identifiers, validates parse/prepare and result decoding against the candidate
schema, and records owner, expiry, evidence, and replacement trigger.

Admission reconstructs an ephemeral database from the complete migration
history, rejects drift, rebuilds and compares schema-derived projections, checks
all eligible queries, and runs the database contract suite. Prefer a
destructive/data-depend gate on candidates; use `atlas migrate lint` when the
admitted Atlas edition can evaluate the schema source. Database constraints and
runtime proof still own data-dependent integrity, permissions, transaction
isolation, locks, live schema drift, and query-plan behavior. The active profile
owns current tool selections and escape-hatch inventory.

For performance-sensitive touched paths:

- State the expected time and space complexity when it is not obvious from the
  code shape.
- Prefer indexed, batched, streaming, or database-side work over avoidable
  O(n²), unbounded memory, N+1 IO, or client-side filtering on growing data.
- Add or preserve a benchmark, query plan, metric, load test, or documented
  performance budget when the path can affect latency, throughput, cost, build
  minutes, bundle size, or resource saturation.
- Optimize only against a real constraint or measured baseline; do not add
  clever code that makes the common path harder to verify.

## Observability And Recovery

Design for horizontal scale and operational diagnosis:

- Structured JSON logs
- Trace IDs at external boundaries
- Metrics for important counters and latency
- Explicit retry schedules and timeouts at effect/runtime boundaries
- Transactional boundaries around state changes
- Idempotency for high-risk operations
- Health checks and clear failure modes
- Validation at every external boundary
- Least-privilege access
- Secrets only in environment variables or secret managers
- Structured error mapping with no swallowed failures

For no-human operations, observability is a contract:

- Propagate W3C trace context or an equivalent trace/span correlation scheme
  across HTTP, jobs, queues, tools, and external provider calls.
- Required log fields: timestamp, level, service, environment, version or commit,
  trace/span/request ID, actor/tenant where safe, operation, outcome, duration,
  error tag/cause, retry/attempt, and correlation IDs for external systems.
- Redact secrets and protected personal data at the boundary; do not rely on log
  consumers to filter sensitive fields later.
- Define purpose, field allowlist, access scope, retention/TTL, residency, and
  deletion or cryptographic-erasure behavior before collecting production
  evidence. Legal hold is explicit and scoped; “append-only” is not an excuse
  to retain protected payloads forever.
- Treat raw internal/operator logs, traces, profiles, topology,
  migration/cutover state, implementation identifiers, stack details, control
  knobs, and unrestricted diagnostics as protected evidence. Authentication
  alone does not grant operator visibility, and observability never authorizes
  unrelated publication. Tenant-authorized customer-owned telemetry
  intentionally exposed by an observability product is customer product data,
  not operator leakage.
- Customer or public operational state is a separate intentional product,
  status, support, incident, audit, legal, or protocol contract. It requires a
  named audience and purpose, subject/tenant authorization where applicable,
  an allowlisted versioned minimum schema, stable semantics, and negative tests
  for secrets, internal details, cross-tenant state, and exploit-enabling fields.
- Preserve legitimate external diagnostics such as protocol-defined error
  fields, retry guidance, documented rate limits, public incident state, and a
  caller's own operation status. Link public errors to protected evidence with
  an opaque occurrence identifier; do not expose raw telemetry or internal
  process state as an ad hoc `debug`, `metadata`, or “honesty” object.
- Metrics need stable names, units, labels with bounded cardinality, and owners.
- Production-bound changes should state which traces, metrics, logs, SLOs,
  synthetic checks, or smoke checks prove the change.
- Logs without trace correlation are acceptable only for local tooling or
  intentionally offline scripts.

When the independently accepted artifact is a complete logs/metrics/traces,
SLO, alert, diagnostic-access, and operator-action design, compose
`review-operational-observability` rather than expanding this standard into a
second observability report.

Concurrency and worker correctness:

- Queue workers, crons, and durable jobs need idempotency keys, durable state
  transitions, retry/timeout policy, cancellation behavior, and replay evidence.
- Locks used for correctness need fencing tokens, database constraints,
  transactional enforcement, or another monotonic guard. A lease that relies
  only on elapsed time is a coordination hint, not a correctness mechanism.
- CRDTs are reference tools for offline or true multi-writer collaboration; they
  are not the default consistency model for server-side product state.

## Comments And Code Documentation

Comments are part of **Maintainability** (`q-maintainability`), including the
**Readability** facet (alias `q-readability`), and agent handoff. Write comments
when they preserve information that is not obvious from names, types, schemas,
or tests.

Comment required:

- Public APIs, exported functions, tools, CLI commands, events, config keys,
  migrations, and operational runbooks when future callers/operators need
  contract semantics.
- Domain invariants, business rules, permission rules, privacy/security
  constraints, and cross-project boundary assumptions.
- Non-obvious algorithms, performance choices, concurrency behavior, retry or
  timeout policy, failure modes, recovery paths, and compatibility shims.
- Any surprising omission: explain why a tempting feature, validation branch,
  abstraction, or error case is intentionally not present.

Avoid comments that repeat the code, narrate trivial assignments, preserve old
history already visible in Git, or excuse unclear names. If code needs a
paragraph to explain a simple idea, first simplify the code or improve the
names; keep the comment only for the remaining non-obvious intent.

## Testing

Test coverage is a multidimensional claim-to-oracle model, not one scalar
percentage. Cover the material contracts and requirements, implementation
decisions, oracle sensitivity, input and state spaces, compatibility boundaries,
critical user journeys, failure and recovery behavior, and relevant
non-functional properties selected by the actual failure model. Each material
claim needs an automated semantic oracle capable of failing on regression, or
an explicit residual. Structural coverage and complexity help locate risk; they
do not prove correctness.

Use [Verification coverage model](verification-coverage-model.md) to derive
cases, select methods and lanes, preserve generated counterexamples, and decide
when further testing no longer changes the delivery decision. Do not impose a
universal coverage percentage, test pyramid, or tool checklist.

### Reproduction-driven engineering

Defect fixes and material behavior changes follow
[Reproduction-driven engineering](reproduction-driven-engineering.md). A
confirmed defect binds an exact unmodified baseline and a faithful semantic
oracle that fails for the expected reason before the production repair. The
owning-cause correction then makes that same oracle pass on the exact candidate,
followed by risk-selected affected regression proof and broader proof when the
dependency graph, blast radius, or uncertainty makes it informative. When a
narrow causal oracle cannot reproduce the original contract symptom, retain a
linked symptom-level regression oracle and pass both. A green
test written only after the change, a weakened assertion, a mocked-away cause,
or a retry/fallback that hides the symptom is not fix evidence.

This is not a universal unit-test-first mandate. New behavior starts from an
executable contract, example, or property where practical; refactors start
from characterization, differential, or equivalence proof; compiler/schema
failures may use their existing diagnostic as the oracle; and concurrent,
distributed, time-dependent, or live-only defects may require replay,
simulation, fault injection, integration, or bounded live evidence. Emergency
containment may precede reproduction when harm is active, but containment is
not closure and temporary controls are retired after the owning cause is
proved and repaired.

### Semantic enforcement hierarchy

An invariant is valuable; an arbitrary new gate is not. Express each invariant
once at the lowest layer that understands its semantics:

1. language compiler, type system, schema, module/crate/package visibility, or
   generated contract;
2. AST-aware lint, dependency/build graph, query analyzer, or package export
   checker;
3. executable behavior, contract, property, differential, integration, replay,
   simulation, security, or performance proof; and
4. CI execution and stable aggregation of the selected proof.

Prefer strengthening code boundaries over observing violations from outside.
For example, separate crates or package exports beat scanning Rust or
TypeScript text; a dependency graph rule beats searching import strings; an
executable route inventory beats requiring a handler name to appear in a file.

Durable tests and gates MUST NOT read production source as plain text to require
or forbid implementation tokens, symbol names, call order, comments, file
placement, or import spelling. These change-detector tests produce false
positives during valid refactors and false negatives through aliases,
re-exports, macros, generation, or equivalent syntax. Source parsing is valid
only when source syntax is the product contract, or as an expiring migration
fence where no semantic tool can yet express the temporary condition.

One material invariant has one proof owner. Before adding a lint, test, script,
report, workflow, or required context, verify that existing compiler, static,
contract, or behavior proof does not already cover the failure. A new mechanism
must name the material defect it detects, why lower semantic layers cannot
decide it, its false-positive/negative boundary, execution cost, and whether it
is durable or temporary. Do not test a gate a second time in product CI merely
to prove that the same gate exists; unit-test non-trivial analyzer logic in its
own owner and execute one authoritative result.

Temporary migration fences declare the active compatibility condition, owner,
and exact retirement predicate. Once target authority is established and the
old path is removed, delete source-parity checks, no-old-path scans, migration
ledgers, rebind workflows, and fixtures that no longer protect live behavior.
Keep durable product contracts and behavior tests.

Default method ladder (select the relevant rungs with each language's native
test/type tools; this is not a universal checklist):

1. Unit tests for pure logic.
2. Blocking type-level or static-analysis proof for every eligible contract and
   production boundary.
3. Integration tests with fakes or test doubles at infrastructure boundaries.
4. Property-based tests for edge-heavy logic.
5. Contract/schema validation at boundaries.
6. Mutation tests where assertion quality matters.
7. Browser E2E for user-facing workflows.
8. Load tests for scale-sensitive paths.
9. Fault-injection tests for recovery behavior.
10. Deterministic simulation tests for distributed, concurrent, or irreversible
    high-blast-radius behavior.
11. SAST/security checks for sensitive surfaces.

Select proof by changed risk, not by habit. Every material behavior, contract,
data, auth, billing, security, concurrency, recovery, migration, or user-workflow
change needs an automated oracle that would fail if the important behavior
regressed; reuse or strengthen an existing oracle before creating another.
Docs-only, generated-only, and tooling-only changes use the existing freshness,
generation, or conformance owner when the claimed source of truth requires it;
they do not automatically justify a new gate.

Target the expensive rungs by blast radius rather than applying them everywhere.
Mandate diff-scoped mutation testing (rung 6) on changed lines in high-blast
modules (billing, auth, permissions); property/model-based tests (rung 4) on
invariant-rich logic (billing arithmetic, permission monotonicity,
queues/locks/state machines, parsers); and a fuzz harness on every
untrusted-input boundary (parsers, deserializers, protocol/file handlers, crypto),
run continuously off the PR critical path. Add deterministic simulation harnesses
for high-blast-radius distributed/concurrent/stateful behavior where ordinary
property/model tests cannot explore enough interleavings. Keep them optional for
CRUD/UI glue.
Which rungs are blocking vs continuous follows the two-tier model in
[`agent-first-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/engineer-agent-context/references/agent-first-development-standard/references/full-standard.md).

## Naming

Use names that reveal domain intent and follow the selected language or
protocol's established casing conventions. Booleans are predicates, operations
are verbs, data/types are nouns, and expected failures are tagged facts. Avoid
ambiguous abbreviations, use symmetric lifecycle verbs, and give the same
concept the same name across contracts and projections.

When a name is vague, inconsistent, incorrectly scoped, or exposes implementation instead of domain intent, treat it as a bug.
