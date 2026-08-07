# Complete System Architecture

## Purpose

This reference completes the code architecture with state, runtime, failure,
deployment, interoperability, and extension boundaries. It does not introduce a
new architecture brand. Apply the concerns that exist in the product and keep
their dimensions separate.

The code-level owner remains
[Capability-first Architecture](capability-first-architecture.md). Pattern
activation remains in
[Architecture Pattern Applicability](architecture-pattern-applicability.md).
The active Technology Profile selects current libraries; this reference owns
the stable architecture and proof obligations.

## Concern stack

| Concern | Required shape |
| --- | --- |
| Semantic ownership | Capability-first organization plus Strategic DDD bounded contexts, language, ownership, and context relationships |
| Use-case organization | Feature-first Vertical Slices inside the owning Capability |
| Domain protection | Tactical DDD proportional to real identity, lifecycle, invariants, aggregates, values, policies, and domain events |
| Dependencies and effects | Clean/Hexagonal dependency direction plus Functional Core/Imperative Shell |
| Composition | One explicit composition root; static composition by default |
| State | Explicit class, owner, write authority, consistency, partition, recovery, retention, and freshness |
| Runtime convergence | Declarative desired state and idempotent desired/observed reconciliation when convergence is required |
| Availability | Fault isolation and static stability selected from declared availability and blast-radius requirements |
| Interoperability | One schema authority, CloudEvents cross-boundary event envelope, OpenTelemetry operational telemetry |
| Extensions | Static module, deployment selection, process isolation, then WebAssembly Component Model only as predicates justify |

These are complementary concerns, not ten architectures to implement
independently. A project creates no empty aggregate, workflow engine, event bus,
cell, service, or plugin host merely to fill the table.

## Simple surface, deep capability

Prefer the smallest coherent mental model that preserves the complete product
capability and quality floor. The primary path should be explainable with
standard domain terms as:

```text
intent or input
  -> owning Capability
  -> decision and effects
  -> observable outcome
```

This is a navigation path, not a second source of truth and not a requirement
to pretend that a branching, asynchronous, or distributed system is linear.
Reveal state authority, recovery, branches, contracts, failure modes, and
implementation detail progressively from that path where they are material.

Keep public interfaces and primary workflows simple. Put unavoidable domain,
distributed-systems, security, and operational complexity behind narrow owned
boundaries so each consumer does not need to understand or reproduce it. Every
additional concept, layer, or named mechanism must own a distinct Capability,
contract, state authority, failure or lifecycle boundary, or material measured
quality improvement. If it only renames, wraps, or visualizes equivalent
behavior, fold it into the existing owner or remove it.

Simple does not mean untyped, stateless at all costs, one file, one service, no
dependencies, or missing validation, observability, recovery, and security.
Measure conceptual and lifecycle complexity rather than physical artifact
count. The goal is deep capability behind a small stable surface, not a shallow
system.

## Orthogonal boundaries

Do not infer one boundary from another:

| Boundary | Decides | Does not imply |
| --- | --- | --- |
| Commercial product unit | Standalone customer promise, adoption and product lifecycle | one Capability, repository, site, SKU, service, database or cell |
| Capability / bounded context | Semantic outcome, language, invariant and data ownership | one file, crate, service, process, database, or cell |
| Module / package / crate | Compile-time visibility, internal API, allowed dependency graph | independent deployment |
| Contract | Typed behavior another owner may rely upon | shared implementation or state |
| Connector | Translation and interaction across owned contracts | semantic, state or distributed-workflow authority |
| Experience shell / bundle | Discovery, presentation, purchase or entitlement composition | ownership of the products being composed |
| State authority | Who may decide and write truth, under which consistency model | one physical replica or process |
| Process | Interchangeable compute replica or stateful execution owner | Capability identity |
| Cell | Partition and failure blast radius | one Capability or microservice |
| Service / deployment | Independent scale, release, placement, security, and operations | bounded-context correctness |
| Trust boundary | Authentication, authorization, tenant/data isolation, and permitted effects | network hop alone |

Mappings are many-to-many. A product may own several Capabilities, share a
repository or experience shell with peers, and run in one modular monolith. A
cell may contain several services, products and Capabilities. One Capability
may be deployed in every cell. A service may host several cohesive modules
until an independent deployment predicate appears.

Document the mapping where it materially affects ownership or operations. Never
use folder names or deployment count as the semantic authority.

Use `design-product` (see references/portfolio) when the requested artifact is the
portfolio-level decision about which Capabilities become independently
valuable products and how products compose. This Engineering Standard owns the
implementation boundaries after that decision; it does not decide pricing,
SKU, profit-center or product-portfolio posture.

## Enforceable module graph

Every durable codebase has a directed module graph whose allowed edges are
explicit and machine-verifiable:

```text
interfaces / adapters / bootstrap -> application -> domain
                              application -> declared ports
cross-capability access -> published contract or application port only
```

The proof must establish:

- no dependency cycle between application modules or bounded contexts;
- no import of another module's internal packages or private exports;
- dependencies outside an explicit allowlist are rejected;
- public APIs are narrow, intentional, and owned;
- domain/application modules do not depend on framework, persistence,
  transport, provider, telemetry SDK, or composition-container internals; and
- one contract owner supplies each cross-boundary semantic shape.

Use the lowest semantic enforcement layer available:

1. language privacy, package exports, type system, and separate compile units;
2. compiler/build/package dependency graph and allowed-edge rules;
3. AST/import architecture checks where the language cannot enforce the edge;
4. architecture tests that execute the graph model; and
5. CI only to aggregate the authoritative result.

Do not permanently scan source text for filenames, import spelling, annotations,
or symbols when compiler or graph data can decide the invariant. Spring
Modulith's verification model—acyclic application modules, API-only access, and
optional allowed dependencies—is an industry example of the semantics, not a
mandatory Java dependency or a reason to adopt Spring.

## State architecture

### State classes

Classify every non-trivial state surface:

| Class | Meaning | Required authority behavior |
| --- | --- | --- |
| Authoritative durable state | Business or system truth that survives process loss | One semantic write authority; integrity, consistency, backup/recovery, retention, and migration contract |
| Durable workflow state | Long-running execution progress, timers, retries, waits, compensation, or orchestration | Durable engine or owned store; replay/recovery; domain transition rules remain framework-neutral |
| Derived rebuildable projection | Query model, index, cache, materialized view, search projection, or denormalized read model | Source identity, checkpoint/freshness, rebuild, reconciliation, and degraded behavior |
| Ephemeral process/cache state | In-memory optimization, connection state, memoization, local buffers | Never required for correctness after process loss; bounded lifetime and invalidation |
| Coordination/lease state | Lock, lease, claim, fencing token, leader or ownership hint | Explicit expiry/recovery; monotonic fencing or authoritative constraint for correctness |
| Client/session state | UI interaction, authenticated session projection, local draft, offline outbox | Client ownership, privacy, expiry, conflict/reconciliation, and server-authority boundary |
| Configuration/secret state | Desired configuration, policy input, credential, key, or rollout parameter | Versioned authority, least privilege, rotation, safe refresh, and no public/telemetry disclosure |

For each applicable state set declare:

```text
semantic owner / state class / write authority / readers /
consistency and transaction boundary / partition key /
durability and replication / recovery and rebuild /
freshness and reconciliation / retention and deletion /
privacy and trust boundary / failure behavior
```

One semantic write authority does not require one machine. Replicated databases,
consensus groups, partitioned writers, and admitted CRDT multi-writer systems
may implement one authority contract. What is forbidden is two independently
defined writers or conflict rules for the same fact.

### Stateless compute

Prefer interchangeable stateless compute for request handling and workers:
identity, authorization truth, idempotency, durable workflow progress, leases,
and replay cursors live in declared state authorities rather than one process's
memory. A replica may keep ephemeral cache or connection state if losing it
does not lose or corrupt the product outcome.

Do not pursue "everything stateless." Databases, ledgers, workflow histories,
actor persistence, offline stores, and configuration authorities are
intentionally stateful. The target is:

> stateless interchangeable compute where possible; explicit,
> capability-owned durable state where required.

Durable workflow, Actor Model, Event Sourcing, CQRS, CRDTs, and double-entry
ledgers activate only through their predicates in the applicability matrix.

## Declarative convergence

When correctness includes eventual convergence, drift repair, desired-state
application, or external observed state:

```text
event or resync
  -> read authoritative desired + observed state
  -> pure reconcile(desired, observed) -> effect plan
  -> idempotent, timeout-bounded execution
  -> observe again until predicate holds
```

An event is a wake-up hint and immutable fact, not completion proof or the only
recovery path. Periodic or provider-driven resync repairs lost, delayed,
duplicated, and reordered events. The reconciler is pure where practical;
subscriptions, reads, retries, backoff, effect execution, and telemetry stay in
the imperative shell.

Do not introduce a reconciliation loop for a local synchronous invariant that
one transaction can enforce. Conversely, do not use an immortal process, one
message delivery, or process memory as the convergence authority.

## Availability topology

### Cell-based fault isolation

A cell is an independently operable instance of a workload that handles a
partition of tenants or resources. It is an availability and blast-radius
boundary, not a Capability boundary.

Activate cell architecture only when evidence shows at least one of:

- a critical multi-tenant or ultra-scale workload cannot accept global impact;
- RTO/RPO or error-budget objectives require bounded customer/resource impact;
- tenant or regulatory isolation requires a dedicated workload instance; or
- poison requests, deployments, overload, or infrastructure faults must be
  contained to a stable partition.

An admitted cell design declares:

- stable tenant/resource partition key and placement authority;
- thin routing that can reach the assigned cell without a synchronous
  high-complexity lookup on every request;
- no shared mutable state on the cell critical path that recreates a global
  failure domain;
- cell size/capacity limits, overload behavior, and safe placement;
- independent failure, deployment, rollback, and observability scope;
- cross-cell operation policy and explicit global-service dependencies; and
- tenant/resource migration, recovery, and routing reconciliation.

Cell routing and placement are control-plane concerns. The serving cell and
router are data-plane concerns. One cell may contain several Capabilities and
services; each Capability may be replicated across many cells.

Cell architecture is not the default for ordinary projects. It adds routing,
duplicated infrastructure, placement, migration, testing, and operational cost.
Use a modular monolith, zones, bulkheads, queues, or ordinary partitioning when
those meet the declared failure contract with lower permanent cost.

### Control/data-plane static stability

Where a real control/data-plane split exists:

- the control plane creates, changes, removes, places, and distributes desired
  state;
- the data plane performs the product's established work from admitted
  distributed state.

The data plane must continue last-known-good established behavior through a
bounded control-plane impairment when its availability objective requires it.
Existing requests must not synchronously depend on control-plane availability.
During impairment, new mutations may fail closed or remain pending; stale
behavior must have explicit safety, freshness, expiry, and recovery semantics.

Static stability requires pre-provisioned capacity and locally available
admitted state where the failure model demands them. Recovery must not first
require the impaired control plane to provision new capacity, distribute
credentials, or reconstruct essential routing.

Do not label every admin API a control plane or duplicate infrastructure merely
to use the term. Apply the split where change authority and serving authority
have materially different availability, scale, or failure requirements.

## Interoperability

### Schema-first contracts

Use the
[Cross-platform Contract Architecture](cross-platform-contract-architecture.md)
for public, cross-runtime, cross-repository, and independently versioned
boundaries. Generated DTOs and clients remain projections; domain types remain
owned by their Capability.

### Product connectors

A connector is a replaceable adapter between explicitly owned contracts. It may
translate schemas, authenticate, authorize, route, meter, retry and reconcile,
but it cannot become the source of business policy, authoritative state or an
implicit distributed workflow.

Every cross-product connector declares producer, consumer, contract owner,
identity and tenant propagation, version compatibility, idempotency, timeout,
retry/backpressure, failure and stale-state behavior, privacy, protected
observability, and replacement/retirement tests. Internal consumers use the
same supported semantic contract as external consumers; private networking or
service identity does not authorize direct database access, private imports or
hidden product semantics.

When a multi-product outcome needs durable progress, timers, retries or
compensation, assign a process manager as the explicit workflow owner. Do not
hide that authority in an API gateway, event broker or connector.

### Integration events

Use a CloudEvents-compliant envelope for asynchronous integration events that
cross Capability, process, runtime, repository, or external-consumer
boundaries. The envelope owns interoperable occurrence context such as event
identity, source, type, specification version, subject, time, and data content
type. The schema-first domain/integration contract owns the payload.

Do not wrap an in-process domain event in CloudEvents merely for consistency.
Do not let broker headers, a CloudEvents SDK object, or an observability event
become domain state. Ordering, causation, idempotency, delivery, replay,
transactional publication, and failure semantics remain explicit contract
obligations; the envelope does not solve them.

### Operational telemetry

Use OpenTelemetry signals and stable semantic conventions for traces, metrics,
logs, context propagation, and profiles where supported. Domain/application
code emits semantic outcomes and effect facts without depending on an
OpenTelemetry SDK; adapter/bootstrap code binds APIs, SDKs, exporters,
sampling, and resource identity.

Operational telemetry is protected evidence by default. Public or
customer-visible state is a separate allowlisted product, status, incident,
support, audit, legal, or protocol contract. OpenTelemetry compatibility never
authorizes raw topology, migration state, diagnostics, secrets, or
cross-tenant evidence to cross that boundary.

CloudEvents and OpenTelemetry solve different problems. A business integration
event may carry trace context, but it is not a trace span; a telemetry event is
not automatically a business contract.

## Extension boundary

Use this composition ladder:

| Level | Select when | Default |
| --- | --- | --- |
| Static module composition | Internal implementations share release/trust/runtime and compile together | **Default** |
| Build/deployment-time selection | Product variants need a bounded known implementation set | Conditional |
| Out-of-process adapter/service | Independent failure, security, scale, technology, or release is proven | Conditional |
| WebAssembly Component Model | A cross-language or untrusted plugin must be portable, typed, capability-limited, and composable | Conditional |
| Remote third-party extension API | External owners require independent deployment and network contract | Conditional |

For a WebAssembly Component Model boundary:

- WIT owns typed imports and exports; composition satisfies imports from
  explicit exports;
- the host grants only required capabilities and resource limits;
- plugin identity, version compatibility, lifecycle, timeout, cancellation,
  memory/CPU limits, persistence, upgrade, rollback, and observability are
  declared;
- domain contracts map at the host adapter rather than becoming WIT-only
  business truth; and
- hostile input, denial of service, resource exhaustion, and host-call abuse
  are tested.

WebAssembly's sandbox and the Component Model's typed interface graph improve
isolation and static analysis, but do not make an over-permissioned host,
vulnerable runtime, unbounded resource grant, or unsafe native embedding secure.
Composition tooling and ecosystem maturity are requalified when this level is
selected.

Do not compile every internal Capability to WebAssembly. If static composition
meets the job, a runtime plugin boundary is unnecessary complexity.

## Worked mapping: multi-tenant product

This example demonstrates that the boundaries are related without being
identical:

```text
Capabilities / bounded contexts
  identity        billing        work-coordination        notifications

Compile-time modules
  each Capability owns domain + application + ports
  one bootstrap module composes selected adapters
  cross-Capability calls use published contracts

State
  identity users/sessions            authoritative durable
  billing ledger                     authoritative durable
  workflow history and timers        durable workflow
  search/dashboard views             derived rebuildable projections
  request caches                     ephemeral
  execution claims                   coordination/lease

Processes and deployments
  stateless API replicas             several Capabilities may share one deployment
  workflow workers                   resume from durable workflow state
  projection consumers               rebuild from source identity and checkpoints

Availability
  ordinary scale                     multi-zone deployment without cells
  demonstrated blast-radius need     cells partitioned by tenant_id
  control plane                      assigns admitted tenant placement
  data-plane router and cells        serve from locally available placement snapshots

Interoperability and extensions
  Protobuf/schema payload            contract authority
  CloudEvents                        cross-boundary occurrence envelope
  OpenTelemetry                      protected operator telemetry
  internal implementations           static composition
  customer-supplied untrusted code   WIT + WASM component only after predicate review
```

Adding a Capability does not automatically add a database, process, service, or
cell. Splitting a deployment does not change semantic ownership. Introducing a
cell does not fork the Capability contract or state authority; it partitions an
already declared workload and state-placement model.

## Architecture fitness and acceptance

Select proof from the actual boundary:

| Claim | Decisive evidence |
| --- | --- |
| Capability ownership | Ubiquitous language, invariants, contract owner, code map, and use-case tests agree |
| Module boundary | Compiler/package visibility and dependency-graph verification reject cycles, internal imports, and undeclared edges |
| State authority | Every material state set has one class and authority contract; duplicate writers and unowned recovery fail |
| Stateless compute | Process loss/replacement preserves authoritative outcomes and resumable progress |
| Reconciliation | Lost/duplicate/reordered wake-ups plus drift converge idempotently from desired/observed truth |
| Cell isolation | Fault/deployment/poison/overload injection affects only the intended partition and shared dependencies do not recreate global impact |
| Static stability | Data-plane established work continues during bounded control-plane impairment and safely reconciles afterward |
| Event interoperability | CloudEvents envelope and schema payload pass compatibility, idempotency, ordering, and replay fixtures |
| Telemetry | Critical paths produce correlated protected evidence and public negative tests reject internal disclosure |
| Plugin isolation | WIT compatibility, capability allowlist, resource limits, failure containment, and upgrade/rollback tests pass |

Architecture conformance is not a folder checklist. Tests and fitness functions
bind to the semantic graph, state catalog, contracts, and runtime failure model.
Health, successful compilation, generated diagrams, or the presence of a
pattern-named directory cannot independently satisfy a product outcome.

## Primary sources

- [CNCF Cloud Native Definition v1.1](https://github.com/cncf/toc/blob/main/DEFINITION.md)
- [AWS: What is a cell-based architecture?](https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/what-is-a-cell-based-architecture.html)
- [AWS: When to use a cell-based architecture](https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/when-to-use-a-cell-based-architecture.html)
- [AWS: Control plane and data plane](https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/control-plane-and-data-plane.html)
- [AWS Builders' Library: Static stability using Availability Zones](https://aws.amazon.com/builders-library/static-stability-using-availability-zones/)
- [Spring Modulith verification](https://docs.spring.io/spring-modulith/reference/verification.html)
- [CloudEvents specification](https://github.com/cloudevents/spec)
- [OpenTelemetry specification](https://opentelemetry.io/docs/specs/otel/)
- [WebAssembly Component Model: Why components?](https://component-model.bytecodealliance.org/design/why-component-model.html)
- [WebAssembly Component Model: Composing components](https://component-model.bytecodealliance.org/composing-and-distributing/composing.html)
