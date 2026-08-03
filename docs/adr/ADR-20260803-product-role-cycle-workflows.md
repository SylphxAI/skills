---
id: ADR-20260803-product-role-cycle-workflows
status: accepted
date: 2026-08-03
decision_owner: SylphxAI
supersedes: []
amends: []
scope:
  - static-instruction-packages
  - product-prototyper
  - product-builder
  - product-maintainer
  - product-expander
  - product-finisher
---

# Five product-role cycle workflows

## Context

Products never finish in a single linear life story. Prototype, build, maintain,
expand, and finish work coexist and feed each other. Encoding that as one
meta-router or one forever OS skill confuses admit rules and stop conditions.

## Decision

Ship **five separate workflow Skills**, each owning **one cycle** for one role:

| Skill | Role cycle |
| --- | --- |
| `product-prototyper` | Learn: hypothesis → cheap probe → go/kill/pivot |
| `product-builder` | Ship capability: gap → correct boundary → oracle |
| `product-maintainer` | Harm↓: symptom → cause → fix → reliability oracle |
| `product-expander` | Scale: validated core ×N → metric + non-regression |
| `product-finisher` | Burr removal: inspect → above-threshold fixes → recapture |

Shared skeleton only: **Frame → Research → Admit → Implement → Deliver/Verify → Cycle-done**.

### Explicit non-goals

- Not a multi-cycle orchestration skill (no loop-engineering OS in these packages).
- Not a stage waterfall (roles may run in parallel as separate agent engagements).
- Not host tool names for goals/missions (portable method only).
- Not a replacement for deep doctrine already in `product-finish` (finisher may compose it).

### Relation to continuous-product-quality

`continuous-product-quality` remains a general betterment cycle. Prefer a
**role skill** when the engagement has a clear identity (harm vs scale vs learn
vs ship vs finish). Prefer CPQ when the work is mixed high-leverage betterment
without a single role.

## Consequences

- Agents can specialize without one skill rewriting another’s terminal.
- Parallel product agents can each load one role skill.
- Catalog grows by five thin workflows; duplication of full OS prose is avoided.

## Verification

- Five packages exist under `skills/product-{prototyper,builder,maintainer,expander,finisher}/`.
- Each defines one-cycle steps and cycle-done criteria.
- No host-specific goal tool identifiers in those Skill bodies.
