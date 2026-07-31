---
id: ADR-0023-complete-system-architecture-concerns
status: accepted
date: 2026-07-29
decision_owner: SylphxAI/skills
contributors: []
decision_mode: complementary
typed_scope:
  repository:
    - SylphxAI/skills
  capability_id:
    - system-architecture
  surface:
    - agent
amends: []
supersedes: []
relates: []
---

# Complete code and system architecture without inventing another architecture brand

## Context

The Engineering Standard already combines Capability-first organization,
Strategic and Tactical DDD, Vertical Slices, Clean/Hexagonal dependency
boundaries, Functional Core/Imperative Shell, explicit composition, event-driven
reconciliation, and conditional distributed-system patterns.

That code-level synthesis is sound, but it does not yet make all system-level
boundaries equally explicit. Agents can consequently collapse unrelated
dimensions into one decision:

- one Capability becomes one crate, service, database, process, or cell;
- "stateless" is applied to authoritative state rather than interchangeable
  compute;
- a control plane becomes a synchronous dependency of every data-plane request;
- cell architecture or microservices are selected because they sound advanced;
- an internal plugin registry is introduced where static composition is enough;
- CloudEvents, transport DTOs, domain events, and telemetry events become
  competing schemas; or
- raw observability details cross a public contract boundary.

The standard needs one complete system-architecture reference that keeps these
concerns orthogonal, makes state and failure ownership explicit, and preserves
conditional activation predicates for mechanisms with permanent operational
cost.

## Decision

`engineering-standard` remains the single owner of durable code and system
architecture semantics. No new top-level architecture brand or independently
routable architecture Skill is introduced.

The complete architecture is expressed through ten concerns:

1. Semantic ownership: Capability-first plus Strategic DDD.
2. Use-case organization: Feature-first Vertical Slices inside each Capability.
3. Domain protection: Tactical DDD proportional to invariants, identity, and
   lifecycle.
4. Dependency and effect boundaries: Clean/Hexagonal plus Functional
   Core/Imperative Shell.
5. Composition: one explicit composition root, with static composition by
   default.
6. State architecture: explicit state classification, one semantic write
   authority, interchangeable stateless compute where possible, and durable
   workflow/actor/ledger mechanisms only when their predicates apply.
7. Runtime convergence: declarative desired state and idempotent reconciliation
   where systems must repair drift or converge asynchronously.
8. Availability topology: cell-based fault isolation only for demonstrated
   critical multi-tenant or ultra-scale requirements, plus static stability
   across a real control/data-plane boundary.
9. Interoperability: schema-first contracts, CloudEvents as the outer envelope
   for cross-boundary integration events, and OpenTelemetry for operational
   telemetry.
10. Extension boundaries: static modules first; WebAssembly Component Model
    only for a proven cross-language or untrusted plugin boundary.

Capability, module/package/crate, contract, state authority, process, cell,
service/deployment, and trust boundary are separate dimensions. They may map
many-to-many and must not be inferred from one another.

The Engineering Standard gains:

- one complete system-architecture reference;
- compiler/build-graph-enforced module-boundary obligations;
- a seven-class state taxonomy;
- explicit compute-versus-state and control-versus-data-plane rules;
- conditional cell and WebAssembly activation predicates; and
- architecture fitness checks that prove semantic boundaries rather than
  filename conventions.

The Project Manifest schema gains optional, machine-readable intended
architecture facts for state authorities, module-graph enforcement,
availability topology, and extension boundaries. Their absence does not invent
conformance; applicable projects declare them or retain a typed architecture
gap.

The active Technology Profile selects CloudEvents and OpenTelemetry roles
alongside its schema-first cross-platform contract stack. Local in-process
domain events remain native typed domain facts; CloudEvents is the
cross-boundary envelope, not another domain model. OpenTelemetry remains an
adapter-shell concern and never authorizes public disclosure.

Architecture Convergence includes the applicable state, process, failure,
deployment, trust, and extension dimensions in its denominator. A folder-only
or code-only refactor cannot claim complete system convergence while an
applicable state or runtime boundary remains implicit.

## Rejected directions

### One Capability equals one service, cell, or database

Rejected because semantic ownership, deployment, fault isolation, and state
placement change for different reasons. A cell may host several Capabilities;
one Capability may be replicated across many cells.

### Universal microservices, universal cells, or universal statelessness

Rejected because they pay distributed-system, routing, duplicated
infrastructure, and operational costs without necessarily improving a product
boundary. Modular monolith and interchangeable stateless compute remain
defaults; stateful authorities and isolated cells activate from explicit
predicates.

### Runtime plugin registry by default

Rejected because internal static composition is easier to type-check, optimize,
deploy, secure, and operate. Deployment-time selection, out-of-process
isolation, and WebAssembly are progressively stronger boundaries selected only
when their benefit exceeds their lifecycle and compatibility cost.

### CloudEvents as domain state or OpenTelemetry as a public API

Rejected because both are interoperability/observability mechanisms rather
than business truth. Domain payloads retain their schema authority, while
public and customer-visible operational facts remain separately allowlisted
contracts.

## Consequences

- Architecture reviews can reason about semantic, code, state, runtime,
  failure, deployment, and trust boundaries without forcing one-to-one
  topology.
- Projects can start with the final semantic structure while delaying only
  mechanisms whose ongoing operational cost lacks an activation predicate.
- Stateful systems remain explicit rather than being hidden behind a
  "stateless" slogan.
- Data planes can continue serving last-known-good behavior through a control
  plane impairment when that availability contract applies.
- Cross-boundary event and telemetry ecosystems gain standard envelopes without
  becoming competing business schemas.
- Plugin systems remain simple by default and obtain typed cross-language
  isolation only when there is a real plugin job.

## Verification

- The Engineering entrypoint links the complete system-architecture reference.
- Binding predicates cover module graphs, state classes, static stability,
  cells, interoperability, and extension selection.
- Rust, TypeScript, Python, and Dart mappings name native enforceable module
  boundaries.
- The Project Manifest schema accepts complete intended architecture facts and
  rejects unknown state classes or extension modes.
- The Technology Profile schema, digest, tests, and catalog agree on the
  interoperability selection.
- Architecture Convergence carries applicable system dimensions through its
  denominator and terminal.
- Repository integrity, catalog freshness, package inspection, and all tests
  pass on the exact candidate.

## Primary sources

- [CNCF Cloud Native Definition v1.1](https://github.com/cncf/toc/blob/main/DEFINITION.md)
- [AWS: Reducing the Scope of Impact with Cell-Based Architecture](https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/reducing-scope-of-impact-with-cell-based-architecture.html)
- [AWS Builders' Library: Static stability using Availability Zones](https://aws.amazon.com/builders-library/static-stability-using-availability-zones/)
- [Spring Modulith: Verifying Application Module Structure](https://docs.spring.io/spring-modulith/reference/verification.html)
- [CloudEvents specification](https://github.com/cloudevents/spec)
- [OpenTelemetry specification](https://opentelemetry.io/docs/specs/otel/)
- [WebAssembly Component Model documentation](https://component-model.bytecodealliance.org/)
