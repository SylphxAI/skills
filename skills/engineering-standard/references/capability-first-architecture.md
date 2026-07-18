# Capability-first Architecture

## Contents

1. Canonical synthesis
2. Semantic hierarchy
3. Mandatory architecture
4. Dependency and ownership rules
5. Capability governance mapping
6. Physical modularity
7. Observability and reactive systems
8. Event-driven reconciliation
9. Immutable ledgers for conserved value
10. Dependency injection and reactive providers
11. Migration terminal

## Canonical synthesis

Every durable product starts and remains on one code architecture:

> **Capability-first Modular DDD with Clean/Hexagonal boundaries and
> Functional Core, Imperative Shell (FCIS)**

It combines five established bodies of practice without treating them as five
independent architectures:

- **Strategic DDD** owns subdomains, bounded contexts, ubiquitous language,
  context relationships, and capability boundaries.
- **Tactical DDD** owns entities, value objects, aggregates, domain services,
  specifications, repository ports, and domain events.
- **Clean Architecture** owns the dependency rule: policy never depends on
  delivery or infrastructure details.
- **Hexagonal Architecture** realizes that rule as inbound/outbound ports and
  adapters.
- **Functional Programming** supplies the coding principles: pure decisions,
  immutable values where practical, composition, and explicit effects.
- **FCIS** is the architectural rule: deterministic domain/application
  decisions form the functional core; database, network, clock, filesystem,
  queue, framework, and UI effects stay in an imperative shell behind ports.

FP is the broad paradigm; FCIS is the concrete system shape. This standard
does not demand a purely functional language and does not force genuinely
effectful orchestration into fake purity.

The complete obligations apply from the first durable product commit. Do not
postpone the architecture because a project is currently small. Agent-native
implementation makes coherent modules, adapters, contracts, migrations, and
tests cheap; later semantic migration and parallel-authoring collisions are
more expensive.

Applying the architecture does not mean generating empty ceremony. A project
must obey every dependency and ownership invariant immediately. It creates a
domain event, repository port, adapter, or aggregate only when the corresponding
domain concept or effect exists; invented placeholders add no architecture.

## Semantic hierarchy

Use these terms consistently:

| Level | Meaning | Test |
| --- | --- | --- |
| Capability | A stable ability the system can promise to a consumer, verify independently, and evolve | Has an outcome, contract/invariant, and independent proof boundary |
| Sub-capability | An independently promiseable and verifiable part of a larger capability | Can be versioned, replaced, reused, or proved separately |
| Feature / use case | A consumer workflow that composes one or more capabilities | Describes how a consumer obtains an outcome |
| Behavior / rule | A specific semantic response or invariant inside a capability | Has examples or tests but no independent consumer promise |
| Surface | Where a capability is exposed: UI, HTTP, MCP, CLI, event, SDK, or job | Translates a published contract; does not own domain meaning |
| Work | A bounded change to any of the above | Tracks execution; never becomes the semantic definition |

Complexity, code size, screen area, or implementation effort does not decide
whether something is a capability. Promote a concept to capability or
sub-capability when it has a stable consumer outcome and an independent
contract/proof/evolution boundary. Keep wording, formatting, branches, and
local algorithms as behaviors or rules unless they meet that bar.

Important detail must not disappear merely because it is not a capability.
Every capability definition can own:

```text
consumer outcome
sub-capabilities
behaviors and invariants
contracts and failure semantics
surfaces
scenarios and examples
evidence requirements
known gaps
related Work and decisions
```

Capabilities may decompose recursively. Use one navigational `part_of` DAG for
containment, typed graph relations for dependencies and effects, controlled
facets for filtering, and saved sets for operational groupings. Do not force
all meaning into one tree or uncontrolled free-form labels.

## Mandatory architecture

At the macro level organize by capability or bounded context. Inside each
capability organize features as vertical application slices:

```text
src/
├── capabilities/
│   └── <capability>/
│       ├── domain/
│       ├── application/
│       │   ├── features/
│       │   └── ports/
│       ├── adapters/
│       ├── interfaces/
│       ├── contracts/
│       └── tests/
├── shared/
│   └── kernel/
└── bootstrap/
```

This is a semantic map, not a demand for empty directories. A language may
express a module without a matching directory; use its idioms while preserving
the same ownership and dependency graph.

Responsibilities:

- `domain`: ubiquitous language, immutable values, aggregates, invariants,
  policies, specifications, typed failures, and domain events;
- `application/features`: commands, queries, use-case orchestration,
  transaction intent, authorization intent, and result types;
- `application/ports`: capabilities the application requires from storage,
  clocks, queues, AI, payments, delivery providers, or other contexts;
- `adapters`: implementations of outbound ports and translations to external
  providers or persistence;
- `interfaces`: inbound HTTP, UI, MCP, CLI, event, and job adapters;
- `contracts`: the language-neutral or package-public boundary authority and
  generated projections;
- `bootstrap`: dependency composition, configuration binding, and runtime
  startup only;
- `shared/kernel`: a deliberately small set of genuinely cross-context stable
  primitives. It may not become a dumping ground for utilities or domain
  models.

Feature-first and capability-first are therefore complementary:

> **Capability-first at macro level; Feature-first vertical slices inside each
> capability.**

## Dependency and ownership rules

The allowed direction is:

```text
interfaces ─┐
adapters ───┼──> application ──> domain
bootstrap ──┘          │
                       └──> ports (implemented by adapters)
```

- Domain imports no UI, framework, database, network, provider SDK, runtime
  configuration, clock, randomness, or filesystem implementation.
- Application imports domain and declared ports, not adapter implementations.
- Adapters and interfaces translate at the edge and do not redefine domain
  models or failures.
- Bootstrap wires implementations but owns no business decision.
- One capability never imports another capability's private domain or adapter.
  Communicate through a published application port, schema contract, or domain
  event translated at the boundary.
- Each persistent aggregate has one write authority. Other capabilities keep
  references or projections, not shared table-helper ownership.
- Expected failures are tagged domain/application facts and are translated
  exhaustively at interfaces. Do not match error strings.
- Effects are explicit. Pure decisions accept values and return values or
  effect intents; the shell performs IO with timeout, cancellation,
  idempotency, backpressure, and recovery semantics.

## Capability governance mapping

FCCP and code architecture are related but distinct:

- FCCP governs capability identity, definition, relationships, claims,
  contracts, surfaces, gaps, and proof.
- This standard governs how implementation code expresses those capabilities.
- Control Plane governs Work and live execution state.

The mapping is many-to-many, never `one capability = one file`:

```text
governed Capability
  -> bounded context / capability module(s)
  -> feature/use-case slices
  -> published contracts and surfaces
  -> tests and evidence
```

A large capability may require several cohesive modules. Several small related
capabilities may share one bounded context while retaining distinct definitions
and proof. The governing capability definition records the mapping; physical
file count does not define semantics.

## Physical modularity

The invariant applies at every scale:

> **No size-based exemption; no god responsibility in a file, module, package,
> crate, service, or bounded context.**

Create or extract a boundary when a new responsibility, invariant, contract,
adapter, claim, proof, ownership, volatility, or independent test surface
appears. Do not create one file per behavior, split only to satisfy LOC, or
retain a god module merely because its file is short. LOC, fan-in/out, cycle,
public-surface, and concentration metrics are backstops; semantic ownership is
the primary rule.

Brownfield work has no permanent exemption. Every durable project converges to
the current architecture generation. During an explicitly staged migration,
touched code may not worsen structural concentration, dependency direction, or
contract duplication; the destination remains full convergence.

## Observability and reactive systems

Observability is a cross-cutting evidence obligation, not another architectural
layer. Domain/application code emits semantic facts, decision reasons, domain
events, effect intents, and correlation identities without importing logging,
metrics, tracing, or vendor SDKs. The imperative shell translates them into
privacy-preserving traces, metrics, logs, profiles, and audit records.

Name telemetry by capability, use case, invariant, contract, and external
effect—not by incidental file or class. A healthy process is not proof that a
capability outcome occurred. Each critical capability declares its success,
expected failure, unexpected failure, latency/cost, and recovery signals.

Functional Reactive Programming (FRP) is an applicable specialized pattern for
time-varying values and event-driven projections such as UI state, progress
timelines, streaming analytics, or collaborative state. It is not a mandatory
fleet-wide top-level architecture. In an FRP slice, pure event-to-state or
event-to-view transformations form the functional core; subscriptions, clocks,
sockets, queues, UI frameworks, backpressure, and cancellation remain in the
imperative shell. Do not let a framework stream become domain truth or force
ordinary request/response logic into FRP ceremony.

## Event-driven reconciliation

Use versioned domain or integration events for asynchronous communication
across capability boundaries when decoupling, fan-out, or long-running work is
material. An event reports an immutable fact; it does not grant another
capability ownership of the producer's model.

Where correctness requires convergence, drift repair, or interaction with
external observed state, combine events with a level-triggered reconciliation
loop:

```text
event or periodic resync -> read desired + observed authoritative state
                         -> reconcile(desired, observed) -> effect plan
                         -> idempotently execute -> observe again
```

Events are wake-up hints, not completion proof or the only recovery path.
Periodic resync repairs lost, duplicated, delayed, or reordered delivery.
`reconcile` belongs in the functional core; subscriptions, state reads, retries,
effect execution, and backoff belong in the imperative shell.

Reliable event boundaries declare schema/version, producer, ordering scope,
correlation and causation identity, deduplication/idempotency, transactional
outbox or equivalent publish atomicity, retry/backoff, poison handling, replay,
and observability. Event-Driven Architecture does not imply Event Sourcing; use
an event log as state authority only when the domain explicitly requires that
model and its operational cost is justified.

## Immutable ledgers for conserved value

When a capability owns conserved value—money, credits, tokens, quota,
inventory quantity, settlement, or entitlement units—use an immutable
append-only double-entry journal as its write authority. Every transaction has
a stable identity and idempotency key; postings balance per unit/currency; and
account, sign, precision, authorization, and lifecycle rules are validated
before atomic commit.

Committed entries are never edited or deleted. Corrections use linked reversal
and replacement transactions. Balances and statements are projections that can
be rebuilt from the journal or verified checkpoints; a mutable cached balance
cannot replace ledger truth. Publish integration events only after commit via a
transactional outbox or equivalent atomic boundary.

The posting decision and balance invariants belong in the functional core.
Atomic persistence, CAS/transaction isolation, outbox, and external settlement
belong in the imperative shell. Reconcile periodically against processors,
banks, inventory providers, or other external authorities; differences become
typed exception/adjustment workflows rather than silent mutation.

Append-only history, Event Sourcing, and double-entry accounting are distinct
patterns. Combine them only where their predicates apply. Ordinary UI state,
capability metadata, domain events, and Work status do not become double-entry
ledgers merely for auditability.

## Dependency injection and reactive providers

Traditional dependency injection and reactive provider models are
complementary:

- the bootstrap/composition root uses DI to bind stable application ports to
  adapter implementations and own their explicit scopes/lifecycles;
- interface/application projection code may use reactive providers for
  time-varying derived values, invalidation, caching, subscription, disposal,
  and async loading/error state;
- the functional core accepts ordinary values and explicit interfaces and knows
  neither a DI container nor a provider framework.

Do not use a container/provider as a service locator from domain code. Provider
state is process/session projection state unless a declared durable adapter
backs it; it cannot masquerade as authoritative Work, financial, or product
state. Ordinary one-shot use cases do not need a reactive provider merely for
consistency of style.

DI owns effect-implementation wiring. Reactive providers own ephemeral reactive
projection wiring. Neither owns domain semantics.

## Migration terminal

An architecture migration is complete only when:

1. the denominator includes capabilities plus their important behaviors,
   invariants, contracts, scenarios, surfaces, and external effects;
2. real code is organized into capability/bounded-context ownership with
   Feature-first application slices;
3. domain/application policy is independent of interfaces and adapters;
4. Tactical DDD concepts and functional-core rules are represented in code and
   tests, not merely named in folders or documents;
5. cross-capability and external boundaries use published contracts/ports;
6. god responsibilities and duplicated semantic authorities are removed;
7. tests prove domain invariants, use cases, boundary contracts, adapter
   behavior, and migration equivalence where predecessor behavior exists;
8. obsolete structure and compatibility paths are retired; and
9. exact-candidate compiler, static, test, architecture, and delivery gates
   pass.

Metadata-only, docs-only, folder-only, re-export-only, or mechanical file-split
changes cannot satisfy this terminal. In development or internal dogfood
without real-user state risk, prefer a verified one-step cutover. Use
expand/contract or runtime canaries only for a demonstrated live compatibility,
data, or external-effect risk—not as a default calendar delay.
