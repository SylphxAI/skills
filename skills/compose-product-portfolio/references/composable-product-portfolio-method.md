# Composable Product Portfolio Method

## Purpose

Use this method to decide the shape of a portfolio, not to manufacture more
projects. A composable portfolio consists of a small set of independently
valuable products, explicit shared substrate, typed connectors and optional
composed experiences. The parts can evolve separately while still presenting a
coherent suite.

Industry ideas inform the method without becoming slogans:

- MACH describes composable systems as modular, independently deployable and
  able to evolve without disruption, with API-first, real-time,
  interoperable connections.
- Product-mode organizes durable ideate-build-run ownership around a persistent
  business problem and measured outcome rather than a temporary feature list.
- Cell-based architecture limits runtime failure scope for workloads requiring
  extreme resilience. A cell is not a commercial product classification.

## Keep the boundary dimensions independent

| Boundary | Decides | It is not automatically |
| --- | --- | --- |
| Commercial product unit | Standalone user promise, adoption and lifecycle | one feature, SKU, legal entity or P&L |
| Capability / bounded context | Semantic language, invariants, outcomes and data ownership | one product, repository or service |
| Module / package | Compile-time visibility and dependency graph | independently deployed |
| Public contract | Supported behavior another owner may rely on | shared implementation or database |
| Connector | Translation and interaction across owned contracts | semantic or workflow authority |
| Experience shell | Discovery, navigation and presentation across products | owner of the products it displays |
| Bundle | Packaging, entitlement or purchase composition | duplicated product semantics |
| Repository | Source history and contribution boundary | product identity |
| Service / deployment | Scale, release, security, placement and operations | bounded context or product identity |
| Runtime cell | Tenant/resource partition and failure blast radius | product, Capability or microservice |
| Trust boundary | Authentication, authorization and permitted effects | network hop alone |

These mappings are many-to-many. One product can own several cohesive
Capabilities and run in a modular monolith. Several products can share one
repository or experience shell. A high-scale product may run every Capability
in many cells.

## Peer topology, not a feature hierarchy

Selected products are peers in the portfolio registry: each has its own
identity, promise, owner, contract and lifecycle. A suite, marketplace,
dashboard or parent brand may discover and compose them, but it does not become
their semantic parent.

"Flat" does not mean dependency-free or one technical layer. The connector
topology is a directed graph:

- declare every edge and its reason;
- expose transitive dependencies and keep synchronous dependency edges acyclic;
- keep critical shared substrate small, generic and failure-aware;
- allow bidirectional collaboration only through separately owned contracts;
  and
- use asynchronous reconciliation where reciprocal updates must converge
  without lockstep availability.

Each product calls its owned dependencies directly and uses a shared platform
only for capabilities that the platform semantically owns.
Portfolio membership follows from the product identity and contract. Shared
identity, policy distribution, discovery and billing remain explicit
dependencies selected from their real contracts.

## Classification model

Classify a candidate on these axes before selecting a folder or deployment:

| Axis | Questions |
| --- | --- |
| Customer value | Does it solve a recognizable job with an independently measurable outcome? |
| Semantic cohesion | Does it own a stable language, policy and state boundary? |
| Adoption | Can a customer discover, onboard, authorize and use it without buying an unrelated workflow? |
| Lifecycle | Can it version, support, recover, deprecate and retire on its own contract? |
| Change and failure | Is independent release or failure containment valuable, or would separation only add network coupling? |
| Commercial posture | Is it an independent offer, add-on, bundle component, internal substrate or strategic option? |
| Operations | Does it have a coherent SLO, support path, cost model and operational owner? |
| Composition | Can peers use it through one stable typed contract without internal knowledge? |

Then choose exactly one primary classification:

### Standalone product

Select when the unit has a durable independent customer job and can sustain the
complete product lifecycle. It may be sold separately, bundled, free, open
source or internally funded; independent value does not require an independent
invoice or P&L.

### Embedded Capability

Select when the behavior is meaningful only inside the owning product's job,
shares its domain lifecycle, or would expose a weak standalone promise. Keep
the code modular and the semantic boundary explicit without inventing another
product.

### Shared substrate

Select for a deliberately shared platform capability such as identity,
entitlement evaluation, billing primitives, notifications or policy
distribution. Substrate owns its generic contract and state. Each consuming
product retains its user promise and domain policy.

### Connector

Select for a replaceable edge between two owners. A connector may map schemas,
authenticate, authorize, route, meter, retry, reconcile and expose
observability. Each connected product remains the durable owner of its policy
and facts.

### Composed experience

Select for one shell that presents multiple products through navigation,
search, dashboard projections or cross-product workflows. The shell owns its
experience semantics and projections, not the underlying product truth.

### Bundle

Select when products are purchased, entitled, marketed or activated together
while retaining their own identity, contracts and lifecycle. A bundle
references product and entitlement authorities; it does not copy them.

## Independent product test

Extract a product only when the evidence supports most of these predicates and
none of the hard negatives:

1. **Independent job** — users can name the outcome without referring to a
   parent screen or implementation detail.
2. **Independent adoption** — discovery, evaluation, onboarding,
   authentication/authorization, use and offboarding form a coherent journey.
3. **Independent semantics** — the unit owns durable capabilities and state,
   not merely presentation over another owner.
4. **Supported contract** — another product or customer can integrate without
   source, database or deployment knowledge.
5. **Lifecycle completeness** — versioning, compatibility, support, recovery,
   deprecation, export and retirement are owned.
6. **Operational coherence** — the unit can declare meaningful SLOs, cost,
   capacity, privacy/security and failure behavior.
7. **Commercial or strategic value** — separate positioning, packaging,
   adoption, partner ecosystem, option value or accountability exceeds the
   permanent cost.
8. **Change independence** — roadmap or release independence is real rather
   than a speculative preference.

Keep the unit inside its product when any cohesion condition holds:

- its useful journey or outcome belongs to the parent product;
- it is primarily UI, configuration, or orchestration of one owning product;
- operation requires synchronous access to parent internals;
- its state and invariants remain under the parent's authority;
- most changes require lockstep release with the parent;
- cohesion avoids extra discovery, auth, entitlement, billing, networking,
  support, and compatibility surfaces with little option value; or
- code modularity addresses the large file, team boundary, architecture, code
  volume, or feature-count concern.

The test decides product separation, not code modularity. A kept-together
product still applies Capability-first modules and narrow contracts internally.

## Product-unit contract

For each standalone product record:

```text
product identity and durable promise
target buyer, user and independent jobs
owned Capabilities and excluded semantics
authoritative state and write owners
standalone discovery, onboarding, use and offboarding
public APIs, events, SDKs, UI and data export
identity, tenancy, authorization and entitlement boundary
versioning, compatibility and deprecation
SLO, capacity, cost, support, incident and recovery
privacy, security, audit and compliance obligations
pricing/package posture and commercial ADR references
release, withdrawal, replacement and retirement
measures of value, adoption and lifecycle health
```

Portability means supported independent consumption, explicit contracts,
export/exit semantics and absence of hidden parent dependencies. It does not
automatically mean self-hosting, offline use, cross-cloud deployment or one
binary; those are separate product decisions.

## Connector contract

Every directed product edge names:

- producer and consumer plus the exact contract owner;
- schema and generated-client authority;
- request/command/event semantics and supported version range;
- identity propagation, authentication, authorization, tenancy and consent;
- idempotency, ordering, concurrency and consistency;
- timeout, retry, backpressure, quota and overload behavior;
- delivery, reconciliation, replay and compensation where applicable;
- metering, cost attribution and entitlement source without treating
  telemetry as a billing ledger;
- privacy classification, retention and audit;
- correlated protected observability and intentional customer-visible errors;
- outage, partial failure, stale state and static-stability behavior; and
- replacement, compatibility, migration and retirement tests.

Prefer generated clients and adapters from one schema authority so consumers
share protocol policy.

### Cross-product workflows

One product may initiate a workflow that spans peers, but coordination needs
one explicit owner. Use:

- synchronous composition for short operations with a compatible transaction
  and failure boundary;
- events plus idempotent reconciliation for eventually consistent propagation;
- a durable process manager when a long-running multi-product outcome needs
  timers, retries, compensation and visible state; or
- a customer-owned sequence when products remain intentionally independent.

Assign distributed progress and compensation to the process manager while each
product retains authority over its own state transitions. Keep connectors as
transport and translation edges.

## Shared substrate without a new monolith

Shared substrate is justified when consistency, economics or customer
experience benefits from one generic capability. Keep it narrow:

- identity owns identities, sessions and federation—not every product's role
  model;
- billing owns charges, invoices and metering contracts—not product feature
  semantics;
- entitlement infrastructure evaluates product-owned grants—not the product
  roadmap;
- catalog/discovery owns indexed descriptions—not live product behavior;
- a notification service owns delivery—not the domain decision to notify; and
- an experience shell owns navigation and projections—not peer state.

Keep serving requests independent of a synchronous global substrate when
the product availability contract requires static stability. Distribute
admitted state, cache safely or degrade explicitly while preserving one
semantic authority.

## Experience, packaging and commercial independence

Independent products can share a coherent customer experience. A suite may
provide:

- one identity and organization model;
- one navigation shell and design system;
- cross-product search and authorized projections;
- consistent SDK and API conventions;
- one marketplace, catalog or admin surface; and
- bundles with unified checkout and entitlement activation.

Keep these axes separate:

```text
product identity
customer-facing brand and site
SKU / price / entitlement
legal entity and accounting owner
repository and release unit
deployment and runtime cell
```

A Commercial ADR selects independent SKU, add-on, free companion, bundle,
profit center, cost center, internal settlement or external pricing. The
commercial decision owner selects those outcomes separately from architecture.

## Dogfooding contract

Dogfooding exercises the supported product contract with ordinary integration
authority:

1. Internal consumers use the same versioned semantic contract and supported
   SDK or connector available to the declared customer class.
2. Internal service identity, private networking and negotiated commercial
   terms may differ when intentional; authorization semantics, tenant
   isolation, quotas, failure behavior and auditability remain explicit.
3. No consumer imports private code, reads another product's database, writes
   hidden state, bypasses entitlement or relies on cluster topology.
4. Internal usage emits the same product-quality signals and enters the same
   support, compatibility, deprecation and incident lifecycle.
5. Contract, negative-access, failure-injection and replacement tests prove the
   boundary. A diagram or claim of dogfooding is not evidence.

Products should prefer one another when the peer is a valid product-grade fit.
Dogfooding selects an internal product when it meets the declared need and
preserves a provider-neutral consumer boundary in every case.

## Portfolio cohesion review

Before accepting the portfolio, calculate permanent complexity rather than
construction effort:

- number of customer concepts, onboarding paths and support queues;
- public contracts, compatibility windows and connector edges;
- identity, entitlement, billing and data-export interactions;
- deployment, SLO, incident, recovery and security surfaces;
- distributed failure modes and synchronous critical paths;
- duplicated data, policy, UI and operational logic; and
- discoverability, positioning and cross-sell confusion.

Merge or keep together when one product promise and lifecycle removes more
permanent complexity than separation creates. Extract when the option value,
customer value, independent evolution or fault/ownership boundary clearly
exceeds the full lifecycle cost.

Agentic implementation reduces construction cost while public concepts,
latency, consistency, compatibility, support, security, and operational cost
remain lifecycle inputs. Use agents aggressively to build and verify the
selected architecture and decide fragmentation from full lifecycle cost.

## Evidence and acceptance

| Claim | Decisive evidence |
| --- | --- |
| Independently useful | Standalone journey and outcome measurement without parent internals |
| Independently operable | Owned SLO, support, recovery, cost and lifecycle evidence |
| Composable | Typed consumer contract tests, compatibility fixtures and replacement proof |
| No hidden authority | State/contract owner map plus negative private-import and database-access tests |
| Dogfooded | Real internal consumption through the supported edge, with auth, quota, failure and telemetry readback |
| Bundle correctness | Entitlements and catalog derive from owners; no copied semantic truth |
| Fault independence | Peer outage and shared-substrate impairment produce declared bounded behavior |
| Portfolio simplicity | Rejected split/merge alternatives and permanent-complexity comparison |

## Worked example

Consider a software delivery suite with work coordination, repository
ingestion, evidence storage and a portfolio dashboard.

- Work coordination can be a standalone product if customers can create,
  claim, progress and audit work without the dashboard or ingestion system.
- Repository ingestion may remain shared substrate if its only job is to feed
  other products and it lacks an independent customer outcome. It becomes a
  product only when it has its own supported ingestion, query, export,
  lifecycle and measurable user promise.
- Evidence storage is a Capability of the product that owns evidence semantics
  unless it offers a genuinely independent evidence product contract.
- The portfolio dashboard is a composed experience over authorized projections,
  not the writer of work, repository or evidence truth.
- Connectors subscribe, translate, and reconcile owned contracts while work and
  repository state remain with their current owners.
- Runtime cells may later partition any high-scale product by tenant for fault
  isolation. That deployment choice does not create or rename a product.

## Primary sources

- [MACH Alliance: MACH Explained](https://machalliance.org/mach-explained)
- [MACH Alliance Standards: Reference Architecture Introduction](https://github.com/machalliance/standards/blob/main/reference/architecture-intro.md)
- [AWS: Reducing the Scope of Impact with Cell-Based Architecture](https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/reducing-scope-of-impact-with-cell-based-architecture.html)
- [Martin Fowler / Thoughtworks: Products Over Projects](https://martinfowler.com/articles/products-over-projects.html)
