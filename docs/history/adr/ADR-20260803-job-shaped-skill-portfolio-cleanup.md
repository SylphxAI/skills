---
id: ADR-20260803-job-shaped-skill-portfolio-cleanup
status: accepted
date: 2026-08-03
decision_owner: SylphxAI
supersedes: []
amends:
  - ADR-20260801-package-classes-and-standard-composition
  - ADR-20260803-product-role-cycle-workflows
scope:
  - static-instruction-packages
---

# Job-shaped skill portfolio cleanup

## Decision

1. Rename OS/role packages to **job verbs** where agents trigger them as techniques:
   - `self-feeding-agent-loop` → `select-next-work`
   - `product-lifecycle-architect` → `design-product` (see references/program)
   - `scope-discipline` → `drive-to-delivery` (see references/bound-request-scope)
2. **Betterment routing (unique defaults):**
   - single product job → `build-product` (see references/prototype) / `build-product` / `maintain-product` / `build-product` (see references/expand) / `build-product` (see references/finish)
   - declared outcome to completion → `drive-to-delivery` (see references/pursue-objective)
   - mixed open betterment, no fixed objective → `maintain-product` (see references/open-betterment)
   - next Work from evidence/ledger (not product matrix) → `select-next-work`
   - multi-phase engineering delivery → `drive-to-delivery`
3. Mark `technology-stack-profile` and `sylphx-platform-first-policy` as **policy/profile**, not product job Skills (ids kept for tooling pins).

## Non-goals

- Mass-renaming every `*-standard` package in one change
- Multi-agent staffing inside Skills

## Verification

- Renamed packages install and catalog
- CPQ/pursue descriptions exclude each other by layer
- Stack/platform Skills declare policy class in entry body
