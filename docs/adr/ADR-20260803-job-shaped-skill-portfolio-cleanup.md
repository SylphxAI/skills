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
   - `product-lifecycle-architect` → `compose-product-program`
   - `scope-discipline` → `bound-task-scope`
2. **Betterment routing (unique defaults):**
   - single product job → `prototype-product` / `build-product` / `maintain-product` / `expand-product` / `finish-product`
   - declared outcome to completion → `pursue-product-objective`
   - mixed open betterment, no fixed objective → `better-product`
   - next Work from evidence/ledger (not product matrix) → `select-next-work`
   - multi-phase engineering delivery → `drive-to-delivery`
3. Mark `technology-stack-profile` and `prefer-sylphx-platform` as **policy/profile**, not product job Skills (ids kept for tooling pins).

## Non-goals

- Mass-renaming every `*-standard` package in one change
- Multi-agent staffing inside Skills

## Verification

- Renamed packages install and catalog
- CPQ/pursue descriptions exclude each other by layer
- Stack/platform Skills declare policy class in entry body
