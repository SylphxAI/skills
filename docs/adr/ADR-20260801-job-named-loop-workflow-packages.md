---
id: ADR-20260801-job-named-loop-workflow-packages
status: accepted
date: 2026-08-01
decision_owner: SylphxAI
supersedes: []
amends:
  - ADR-0016-architecture-and-verification-package-names
  - ADR-20260801-package-classes-and-standard-composition
scope:
  - static-instruction-packages
---

# Job-named loop workflow packages

## Context

[ADR-20260801-package-classes-and-standard-composition](ADR-20260801-package-classes-and-standard-composition.md)
classifies single-objective closure and continuous work-selection as
**workflow** packages. They were still installed under prestige `*-standard`
ids (`drive-to-delivery-standard`, `select-next-work-standard`), which
falsely implies pure policy / always-on excellence law and collides with true
policy packs in human and routing language.

[ADR-0016](ADR-0016-architecture-and-verification-package-names.md) already
requires hard renames when a package name misroutes the job: no discoverable
alias; update catalog, fixtures, and live cross-links in the same candidate;
leave historical install projection digests frozen.

## Decision

1. Hard-rename `drive-to-delivery-standard` → `drive-to-delivery`.
2. Hard-rename `select-next-work-standard` → `select-next-work`.
3. Do **not** keep discoverable aliases under the predecessor ids.
4. Primary class remains `workflow` (execution / work-selection OS methods with
   embedded predicates). Do not reintroduce a pure-policy `*-standard` suffix
   on these packages.
5. Update native routing fixtures, utilization fixtures, README families,
   composition guides, and live skill/ADR cross-links in the same candidate.
6. `runtime/legacy-agents-projection.mjs` keeps predecessor directory names as
   **frozen historical install digests only**, not current catalog discovery.

## Consequences

- Loop engineering packages are discoverable as jobs, not fake standards.
- Cached installs using predecessor names require normal package reconciliation.
- Git history preserves lineage without dual discovery.

## Verification

- Catalog contains the new ids and not the predecessors.
- `npm test` / CI green on the rename candidate.
- Install readback shows job-named packages for supported agents.
