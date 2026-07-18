# Architecture Pattern Applicability

## Purpose

Place established patterns inside the canonical Capability-first Modular DDD,
Clean/Hexagonal, FCIS architecture without treating every pattern as a parallel
top-level architecture or generating infrastructure without a domain need.

## Applicability matrix

| Pattern | Obligation | Activation predicate | Explicit non-requirement |
| --- | --- | --- | --- |
| Modular Monolith + evidence-driven service extraction | Mandatory deployment default | Every durable product; extract only on a proven deployment boundary | No microservices because modules/files are cheap to generate |
| Dependency Injection + Composition Root | Mandatory when effects/adapters exist | A port has one or more runtime implementations | No global service locator or DI framework requirement |
| Vertical Slice Architecture | Mandatory | Every consumer use case/feature | No repository-wide feature folders outside capability ownership |
| Resilience Engineering | Mandatory, risk-proportionate | External effect, concurrency, distribution, load, or recovery risk | No circuit breaker/retry/canary without a failure mode it controls |
| Security by Design | Mandatory floor | Every durable product; stronger at trust, tenant, data, identity, and effect boundaries | No hostile-system machinery unrelated to the real threat model |
| CQRS | Mandatory semantic separation when responsibilities differ; physical split conditional | Commands and queries have materially different invariants, authorization, models, consistency, or scale | No automatic second service/database/bus |
| Event Sourcing | Conditional | Ordered domain events are the authoritative history needed to reconstruct state and answer temporal/audit requirements | Event-driven integration alone does not activate it |
| Saga / Process Manager | Conditional | One business process spans capability authorities and cannot be one atomic transaction | No distributed transaction illusion; no engine required for a local atomic use case |
| State Machine | Mandatory for non-trivial lifecycle | Valid states/transitions, guards, timeouts, or terminal outcomes matter | No workflow platform required for a small in-process state machine |
| Workflow Orchestration | Conditional | Durable long-running execution, timers, retries, external waits, recovery, or visibility exceed local state-machine/process lifetime | Engine is an adapter, never domain authority |
| Actor Model | Conditional | Isolated mutable state, single-writer ownership, mailbox ordering, supervision, or massive independent concurrency materially simplify correctness | No actor-per-object or distributed actor runtime by default |
| Data-Oriented Design | Conditional | Profiling proves layout, locality, batching, allocation, vectorization, or throughput dominates the hot path | No replacement of ubiquitous language or capability ownership |

## Modular monolith and service extraction

Implement the full capability, domain, port, adapter, and contract graph from
the first durable commit, but keep one deployable modular monolith until an
independent scale, failure, security, data-authority, release, technology, or
placement boundary is demonstrated. A module is a semantic boundary; a service
is an operational and distributed-systems commitment.

When extraction is justified, preserve the capability contract and add proof
for network failure, consistency, latency, versioning, rollout, recovery, and
observability. Agent-native generation removes much of the authoring cost; it
does not remove the permanent coordination cost of distributed state and
operations.

## Dependency Injection and Composition Root

Application/domain code declares ports. A single explicit composition root in
bootstrap selects adapter implementations, configuration, scope, ownership, and
lifecycle. Constructor/function injection or an equivalent explicit mechanism
keeps dependencies visible. A framework container is optional and remains in
the shell. Domain code never resolves dependencies from ambient global state.

Reactive providers complement DI for time-varying projections; they do not
replace the composition root or become durable state authority.

## Vertical slices inside capabilities

Vertical Slice Architecture is the application/use-case shape inside the
owning capability:

```text
capability / bounded context
  -> feature or use-case slice
     -> input contract -> application decision -> ports -> result contract
```

A slice may contain command/query handlers, domain policies, ports, and tests,
but it does not privately duplicate cross-capability contracts or bypass the
domain model. Shared technical `controllers/services/repositories` folders are
not the macro architecture.

## Resilience Engineering

Design failure behavior before adding recovery mechanisms. Declare failure
domains, dependency budgets, timeout/cancellation, idempotency, retry eligibility
and budget, backpressure, bounded queues, overload/load-shedding behavior,
degraded modes, recovery objective, and observability. Use bulkheads, circuit
breakers, hedging, failover, redundancy, or progressive exposure only when they
control a named failure mode and their own failure behavior is tested.

Retries never wrap non-idempotent effects blindly or multiply across layers.
Health is not capability correctness. Prove resilience with property/model
tests, deterministic simulation, fault injection, replay, and stage-appropriate
runtime readback.

## Security by Design

Security is a design input from the first durable commit:

- explicit trust boundaries, assets, actors, abuse cases, and tenant isolation;
- authentication at the edge and authorization on the owning operation/object;
- deny-by-default, least privilege, safe defaults, input/output validation, and
  typed security failures;
- secrets outside source/logs, protected data minimization, encryption and
  retention appropriate to the data, and auditable privileged effects;
- dependency/build/provenance controls proportional to the supply-chain risk;
- security invariants in domain/application tests plus boundary and adversarial
  verification.

Security controls must match the real threat model. Internal trust does not
waive tenant, credential, privacy, public-contract, or irreversible-effect
boundaries, but it also does not justify inventing unrelated authorization
infrastructure.

## CQRS

Commands express intent, enforce invariants, authorize mutation, and return a
typed outcome. Queries return projections and never smuggle mutation. Separate
their contracts whenever responsibilities differ, even if one module and one
database remain sufficient.

Split read/write models, stores, services, or scaling only when independent
consistency, performance, availability, security, or ownership requires it.
Every derived read model declares source identity, freshness/lag, rebuild,
schema evolution, and degraded behavior. CQRS does not imply Event Sourcing.

## Event Sourcing

Use Event Sourcing only when the ordered event history is itself the domain
state authority. The design then requires:

- stable stream/aggregate identity and optimistic concurrency;
- immutable versioned events and invariant-checked command decisions;
- deterministic replay, upcasting/migration, snapshots as rebuildable
  optimizations, and projection checkpoints;
- idempotent subscribers, privacy/retention strategy, backup/recovery, and
  correction through new events rather than history rewrite.

Integration events are not automatically domain-source events. A CRUD model
that emits events through an outbox is EDA, not Event Sourcing.

## Saga and Process Manager

When one business outcome crosses independent transaction authorities, model a
Saga as an explicit state machine. Each step declares command, success event,
timeout, retry/idempotency, compensation or forward recovery, and terminal
outcomes. A Process Manager owns correlation and next-step decisions; it never
mutates another capability's data directly.

Prefer orchestration when global process state, timeout, recovery, and
explainability matter. Choreography is acceptable for small acyclic reactions
with no hidden global invariant. Avoid unbounded event chains whose business
process exists only in operators' heads.

## State machines and workflow orchestration

Represent every non-trivial lifecycle as an explicit transition function or
table with named states, events, guards, actions/effect intents, timeouts, and
terminal outcomes. Illegal transitions fail rather than becoming boolean
combinations.

Use a durable workflow engine only when execution must survive process loss,
wait on external time/events, coordinate retries or compensation, or expose
long-running progress. Workflow definitions call application ports and persist
execution mechanics; domain transition rules remain framework-neutral and
virtual-time/replay testable.

## Actor Model

An actor owns isolated mutable state and processes messages through a declared
mailbox contract. Specify message identity/version, ordering scope, delivery
semantics, mailbox bounds/backpressure, supervision/restart, passivation,
persistence/recovery, placement, and observability.

Actors are a concurrency implementation inside a capability, not a substitute
for bounded contexts, durable storage, or published contracts. Do not leak
actor references as long-lived public identity unless the contract explicitly
supports relocation and recovery.

## Data-Oriented Design

For a measured hot path, organize data and execution around access patterns:
contiguous layouts, structure-of-arrays where beneficial, batching, cache
locality, reduced allocation/indirection, vectorization/SIMD, and parallel
partitioning. Bind the optimization to representative benchmark thresholds and
correctness/property tests.

Keep a translation boundary between domain-rich types and optimized internal
layouts when their needs differ. DOD may shape an algorithm, simulation,
rendering, analytics, codec, or inference kernel; it does not erase capability
ownership, contracts, or domain language elsewhere.

## Selection record

For every conditional heavy pattern, record the smallest durable decision:

| Field | Requirement |
| --- | --- |
| Problem | Concrete invariant, scale, latency, concurrency, history, or recovery need |
| Selected pattern | Exact semantic responsibilities being adopted |
| Rejected simpler option | Evidence that the simpler shape is insufficient |
| Authority boundaries | State owner, contracts, consistency, and effect owner |
| Proof | Tests, simulation, benchmarks, security analysis, or recovery drill |
| Exit trigger | Condition under which the mechanism should simplify or be replaced |

Use a focused owning-repository ADR before broad implementation when the
selection is a material durable architecture choice. Use code/test evidence for
a local implementation choice already governed by an accepted decision. Do not
create one ADR per ordinary use case or one infrastructure product per pattern
name.
