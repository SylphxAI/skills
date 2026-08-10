---
id: ADR-20260810-verified-capabilities-model
status: accepted
date: 2026-08-10
decision_owner: SylphxAI
supersedes: []
amends:
  - ADR-20260731-thin-dual-layer-progressive-instruction-system
scope:
  - product-identity
  - capability-contract
  - qualification
---

# ADR-20260810: Verified Capabilities clean-break model

## Context

The repository shipped a disciplined static Agent Skills catalog with excellent
reconciliation engineering (exact revisions, package digests, atomic
generations, ownership checks, crash recovery, scheduler health, fail-closed
mutation). A live review at `main` 7d6f7ab found the decisive weakness: none of
that proves an installed capability is correctly selected, materially improves
an agent's work, remains safe in context, or produces the user's intended
outcome. Structural and runtime CI prove consistency, not capability value.

The repository therefore adopts **Sylphx Verified Capabilities** as its product
identity and North Star. This ADR records the clean break and what it retires.

## Decision

1. **Three durable concepts.** *Capability* (one portable user job with
   boundaries, inputs/outputs, required tools/data/permissions, failure
   semantics, and an externally observable outcome contract; package source
   owns the declaration, never the truth of its claims), *Qualification*
   (reproducible, version-scoped evidence of incremental value, compatibility,
   provenance, security and currentness in declared environments; a named
   evaluator or attestor owns the result), and *Outcome receipt* (evidence the
   user's actual result satisfied the declared oracle — or failed, recovered,
   or remained unresolved; the user's product/system owns the oracle and the
   Control Plane owns live recording).

2. **North Star metric.** Verified Capability Yield = value-weighted,
   externally verified successful outcomes ÷ value-weighted eligible attempts.
   Eligibility requires current + qualified + authorized; Correctness and
   Security are hard gates that make an attempt ineligible for a positive
   result rather than lowering a score.

3. **Repository role.** This repository is the open foundation: portable
   capability packages, public qualification records, and the outcome-receipt
   recording contract. It is not a marketplace, runtime, policy encyclopedia,
   or Control Plane. Composition is the application of capability contracts,
   not another product object.

4. **Package contract.** Every listing carries `capability.json` and
   `qualification.json` (honest default `unqualified`). The catalog projects
   qualification state per package and repo-wide. `unqualified` packages
   remain installable; their attempts are not eligible for positive yield.

5. **Qualification gates.** `qualified` requires a named evaluator,
   version-scoped evidence (digest + uri), a declared compatibility matrix,
   and a future expiry. Security review is mandatory. Structural green is
   never qualification evidence. AutoSync must not downgrade an installed
   `qualified` capability to `unqualified` (fail-closed promotion gate).

6. **Vocabulary.** A Skill is the host-standard package format carrying a
   Capability. The Quality North Star (`q-*`) remains the authoring quality
   vocabulary and is explicitly not qualification evidence. The phrase
   "industry-aligned Agent Skills catalog" as the product identity is retired
   in favor of Verified Capabilities; the repository remains a public static
   source with no hosted service.

7. **Commercial boundary.** Open foundation stays free and inspectable; paid
   assurance (private portfolios, context-specific qualification, policy and
   evidence projections) belongs to the Control Plane. No price is published
   without buyer research and observed willingness to pay.

## Retired or replaced

- Product identity claims that breadth or structural green imply capability
  value ("industry-aligned catalog", install counts, CI green as product
  proof).
- Any claim of qualified capability without version-scoped evidence (none
  existed; all packages are now explicitly `unqualified`).
- The docs/history copy of the utilization residual as an active authority; it
  moves to `docs/qualification/evals/` as live qualification evidence.

## Consequences

- The catalog, integrity gate, qualification ledger, and promotion gate now
  distinguish "exists" from "safe, applicable, current and outcome-positive".
- Authors must file contracts and honest qualification records; CI enforces
  schema and expiry semantics.
- The repo's honest current projection is 0/57 qualified and 0 outcome
  receipts; Verified Capability Yield has no eligible attempts yet.
- Future qualification work follows `skills/design-skill-evals` and
  `docs/QUALIFICATION.md`; any byte change invalidates matching evidence.
