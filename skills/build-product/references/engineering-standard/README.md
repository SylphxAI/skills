# engineering-standard

> Constraint depth owned by `build-product` (not a listing skill). Other workflows open this path when their body says so.

# Engineering Standard

Policy constraints—compose onto matching host jobs.

**Quality North Star** (sole **engineering** quality vocabulary—not the Product
North Star in `docs/NORTH-STAR.md`): Meta *Simple concepts, powerful usage* +
**14 primary attributes** (Depth, Simplicity, Correctness, Security,
Reliability, Availability, Resilience, Performance, Scalability, Economy,
Observability, Maintainability, Evolvability, Testability). Readability is a
facet of Maintainability (`q-readability` alias). **Memory set of 9:** Depth ·
Correctness · Simplicity · Evolvability · Observability · Performance &
Velocity · Reliability · Security · Economy.
Full body owns obligations; rule IDs bind selection, proof, and default quality
precedence. A `q-*` pass is never package qualification or Verified Capability
Yield. The phrase **Modern Technical Bar** is retired.

Full progressive-disclosure body: [references/full-standard.md](references/full-standard.md).  
Rule IDs: [references/binding-predicates.md](references/binding-predicates.md).  
Usage / pocket questions / anti-examples: [references/quality-north-star-usage.md](references/quality-north-star-usage.md).

For code structure or architecture migration, also read:

- [Complete system architecture](references/system-architecture.md)
- [Capability-first architecture](references/capability-first-architecture.md)
- [Architecture pattern applicability](references/architecture-pattern-applicability.md)
- [Language mappings](references/capability-first-language-mappings.md)
- [Executable-shape examples](references/capability-first-examples.md)
- [Cross-platform contract architecture](references/cross-platform-contract-architecture.md)

When creating a project, adding a package, or upgrading a runtime, framework,
SDK, generator, plugin, or library, use `select-dependency-versions`. Query
the authoritative live release source; never select a version from model
memory, a stale template, or an old example.

When invariants span a broad generated state or input space, read
[Generative verification](references/generative-verification.md).

When exact expected outputs are unavailable but relations or independent
implementations can falsify behavior, read
[Oracle-free verification](references/oracle-free-verification.md).

When a test, gate, alert, validator, or recovery control claims to catch a
failure, read
[Control-effectiveness verification](references/control-effectiveness.md).

When diagnosing or fixing a defect, changing observable behavior, or
refactoring behavior whose current contract is not yet executable, read
[Reproduction-driven engineering](references/reproduction-driven-engineering.md).

When replacing, migrating, deprecating, folding, or substantially refactoring
an existing implementation, read
[Active source authority and predecessor retirement](references/active-source-authority-and-retirement.md).

When designing, reviewing, or closing automated test coverage, read
[Verification coverage model](references/verification-coverage-model.md).

For critical concurrency, distributed coordination, authorization, or
irreversible-effect state spaces, read
[Formal modelling and model checking](references/formal-modeling.md).

When concurrent or offline replicated state needs an algebraic merge, read
[CRDT convergence](references/crdt-convergence.md).

For a large shared capability catalog, concept scheme, faceted vocabulary, or
cross-domain taxonomy, use `design-semantic-taxonomy`; do not force identity,
hierarchy, and mutable labels into one tree path.

For a new or materially changed trust boundary, privileged action, data flow,
integration, or deployment exposure, use `model-security-threats` to produce
the security-design contract before or alongside implementation.

## Method

1. Load this package for durable engineering work on product code.
2. Read [references/full-standard.md](references/full-standard.md) for the complete standard.
3. Before broad implementation, create or update the owning repository ADR for
   a material durable decision about architecture, ownership, public contracts,
   persistence, security/privacy, delivery semantics, or an enterprise default.
4. Keep ordinary implementation detail governed by an accepted decision in
   code, schemas, and tests; do not create ceremonial ADRs.
5. Apply the strongest relevant subset and prefer executable evidence over
   copying this body into product repositories.
6. Procedure Skills should name this standard as a composition handoff when
   durable product code or runtime behavior changes. Native runtimes select
   matching Skills from metadata; the catalog has no dependency primitive, so
   do not invent one or restate these predicates in every procedure.


## Boundaries

- Does not grant deploy or credential capabilities.
- Does not replace product-local technical ADRs.
- Does not auto-route as a procedure; it is binding policy text with separate conformance evidence.

## Composition and output

Canonical contract: [`author-skill/references/composition-contract.md`](../../../author-skill/references/composition-contract.md).
## Path

- Fail closed on secret material in source and logs.
- Product capability proof is the path you changed (`q-availability` /
  `eng-avail-01`). Health and readiness probes stay characterization.
- Quality vocabulary is the Quality North Star (`q-*`).
- Terminal is sole writer plus predecessor delete. Schema multi-step stays
  inside the destination. Temporary dual-write uses `eng-hard-cut-01`
  risk-class gates. Atlas is the sole production migration applicator
  (`technology-stack-profile`).
- Capability-first architecture starts at the first durable product commit.
