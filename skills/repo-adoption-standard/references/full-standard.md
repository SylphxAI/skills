# Repo Adoption Standard

**Authority:** binding Standard Skill package `repo-adoption-standard` in
`SylphxAI/skills`. Historical predecessor text is lineage only.

## Purpose

Define the smallest complete surface that lets an agent understand, change,
verify, and deliver a durable repository without inventing local policy.
Adoption is not the addition of metadata around unchanged architecture: the
repository must also satisfy the applicable engineering and delivery standards.

## Required surfaces

Rule IDs:

- `repo-entry-01` — runtime entrypoint resolves Skills, local facts, and Control Plane roles.
- `repo-architecture-01` — real product code satisfies the canonical engineering architecture.
- `repo-verify-01` — one proportional exact-candidate verification entrypoint exists.
- `repo-delivery-01` — the repository declares and proves its terminal delivery boundary.
- `repo-adoption-01` — adoption status is derived from facts, never authored around gaps.

Every active durable repository exposes:

1. **Runtime constitution** — `AGENTS.md`, `CLAUDE.md`, or runtime equivalent.
   It projects the compact Skills + Control Plane topology and contains only
   repo-local commands, hazards, and authority additions. It must not copy or
   fork detailed standards.
2. **Project identity** — `PROJECT.md` plus the canonical machine-readable
   project manifest selected by `project-manifest-standard`.
3. **Canonical code architecture** — real product code conforms to
   `engineering-standard`, including Capability-first Modular DDD,
   Clean/Hexagonal boundaries, and FCIS. Docs, manifests, folder names,
   re-exports, or generated reports alone cannot satisfy this surface.
4. **Source integrity** — the repository's selected delivery lane prevents
   unowned destructive history changes and identifies its exact candidate.
5. **Verification entrypoint** — one documented command runs the smallest
   complete deterministic checks for a candidate. Extra gates require a
   distinct material risk; do not accumulate ceremonial checks.
6. **Delivery boundary** — the repo declares whether terminal delivery is
   source landing, package release, deployment, store publication, or another
   product-specific boundary, plus proportional proof and recovery.
7. **Contracts and documentation** — public APIs, events, schemas, CLI/config,
   database changes, generated clients, ADRs, specs, and runbooks have explicit
   authoritative homes where applicable.
8. **Adoption truth** — current gaps are typed and owned. `complete` or
   `converged` must be derived from facts and verification, never authored as a
   substitute for unresolved code or delivery work.

## Authority topology

- `SylphxAI/skills` owns static standards, procedures, and binding profiles.
- The runtime constitution owns compact always-on law and local operating facts.
- The product repository owns its code, contracts, ADRs, specs, and delivery.
- Control Plane owns live fleet, work, ingestion, and effect state.
- Archived Doctrine and GroundAtlas repositories are historical lineage, not
  writable instruction or live-state authorities.

## Proportional adoption

The architecture and semantic boundaries are mandatory from the first durable
commit. Physical artifacts are demand-driven: create a port, adapter, aggregate,
event, migration, or runbook when the corresponding concept or effect exists,
not as an empty placeholder.

Verification scales with actual risk and lifecycle stage. Development-only
structural changes require exact-source tests and architecture evidence, not a
fabricated production soak. A live irreversible data or public-contract change
requires stronger recovery and runtime proof. Optional hardening is backlog,
not a reason to hold a proven terminal indefinitely.

## Migration terminal

A legacy repository is adopted only when all applicable surfaces above are
true on the delivered candidate. In particular:

- required code and dependency boundaries have actually changed;
- superseded architecture and duplicate instruction authorities are retired;
- behavior and public contracts remain verified or intentionally changed;
- remaining gaps are either outside the declared objective or typed, expiring
  exceptions permitted by the owning standard.

Never call a docs-only, metadata-only, audit-only, or mechanical file split a
canonical architecture migration.

## Validation

Run the repository's declared verification entrypoint, then verify the active
delivery boundary. Fleet-wide status is Control Plane readback; it is not a
repo-local completion claim.
