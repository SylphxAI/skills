# engineering-standard

> Constraint depth owned by `build-product` (not a listing skill). Other workflows open this path when their body says so.

# Engineering Standard

Policy constraints—compose onto matching host jobs.

Full progressive-disclosure body: [references/full-standard.md](references/full-standard.md).  
Rule IDs: [references/binding-predicates.md](references/binding-predicates.md).

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

Apply this standard as constraints on the artifact requested by the user or
owned by the primary procedure. Do not emit a separate per-standard compliance
report merely because this Skill was injected.

Integrate only material obligations, deviations, evidence, and gaps into the
primary artifact or final status. When conformance assessment is itself the
requested job, produce one standalone domain conformance record from this
standard.

## Guardrails

- Fail closed on secret material in source and logs.
- Never treat health/readiness probes as product capability proof.
- In development or without live compatibility/state risk, prefer a verified
  one-step cutover. Use expand-contract only when a demonstrated live data,
  compatibility, availability, or external-effect boundary requires it.
- Apply the canonical Capability-first architecture from the first durable
  product commit; project size and migration cost are not exemptions.
