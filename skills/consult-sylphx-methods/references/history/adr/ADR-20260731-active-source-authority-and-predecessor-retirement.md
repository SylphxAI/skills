---
id: ADR-20260731-active-source-authority-and-predecessor-retirement
status: accepted
date: 2026-07-31
decision_owner: SylphxAI
supersedes: []
amends: []
scope:
  - engineering-methods
  - source-authority
  - code-lifecycle
---

# Active source authority and predecessor retirement

## Context

Leaving old and new implementations together in the normal source tree looks
reversible, but it makes authority ambiguous to agents, compilers, maintainers,
and future changes. A deprecated comment or an ADR does not stop an old module,
route, job, export, configuration path, or generated surface from appearing
current. The result is duplicate fixes, edits to dead paths, accidental
reintroduction, and permanent migration machinery.

Git already preserves source history. Live compatibility sometimes requires an
old interface to remain temporarily, but that need does not justify retaining a
second implementation or write authority.

This decision applies the contraction terminal from established Branch by
Abstraction, Parallel Change, and Strangler-style replacement: introduce the
successor boundary, move authority, then remove the predecessor instead of
turning the migration seam into steady-state architecture.

## Decision

1. `engineering-standard` owns active-source authority and predecessor
   retirement for ordinary durable code changes. `decide-architecture-shape`
   applies the same terminal to substantial architecture cutovers. No separate
   cleanup or residual-management Skill is created.
2. Source that has been replaced has exactly one disposition:
   - **current authority** — the sole implementation that may receive new domain
     logic and authoritative writes;
   - **compatibility adapter** — a temporary one-way translation to the current
     authority for demonstrated live consumers; or
   - **historical artifact** — immutable history required for replay,
     compatibility, audit, legal, or data reconstruction and excluded from the
     normal implementation graph.
3. A change that establishes a successor includes predecessor disposition in
   the same completion terminal. In development or without demonstrated live
   compatibility risk, the verified candidate removes the predecessor
   immediately.
4. A compatibility adapter may remain only when it names current consumers,
   delegates one way to the current authority, owns no independent domain
   policy or authoritative writes, has protected usage or contract-support
   evidence, and declares an exact retirement predicate. It is not a place for
   new behavior.
5. Historical artifacts such as immutable database migrations, supported wire
   versions, event schemas, and audit records remain only where their lifecycle
   requires them. They are isolated from ordinary imports, exports, routing,
   registration, generation input, and mutable policy ownership.
6. Enforce the boundary at the lowest semantic layer: compiler/module
   visibility, package exports, dependency/build graphs, generated-contract
   ownership, route/job registration, and behavior tests. Do not create a
   repository-wide word ban, source-token scanner, or separate CI workflow to
   infer retirement.
7. The runtime constitution carries only the compact always-on rule. Detailed
   method and examples stay in the Engineering reference package.

## Consequences

- Git history, not dead active code, is the default recovery surface.
- Agents can resolve one normal modification path before editing.
- Necessary compatibility remains possible without creating a second semantic
  authority.
- Deletion, dependency cleanup, and removal of migration-only proof machinery
  become part of the original change instead of unowned follow-up work.
- Existing repositories may still contain ambiguity; discovering two
  active-looking implementations is an engineering defect to resolve, not
  permission to choose one by guesswork.

## Verification

- Engineering exposes one progressive-disclosure retirement contract and one
  binding predicate.
- Architecture Convergence defines retained adapters and `source_retired` in
  terms of the active source graph.
- Autonomous completion treats predecessor disposition as part of the original
  terminal.
- The compact constitution projects the same rule without adding a router,
  service, lexical gate, or CI workflow.
