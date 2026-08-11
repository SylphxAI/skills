---
id: ADR-20260811-principles-ambition-agent-economy
status: accepted
date: 2026-08-11
decision_owner: SylphxAI
supersedes: []
amends:
  - ADR-20260809-universal-principles-and-q-economy
scope:
  - doctrine
  - economy
  - simplicity
---

# ADR-20260811: Ambition-preserving Simplicity and agent-native Economy budgets

## Context

ADR-20260809 adopted the nine-principle doctrine (深正簡 · 改觀快 · 穩安平) and
`q-economy`. Two execution risks remained:

1. **Simplicity misread as fewer features** — ambitious work needs the opposite:
   fewest concepts/systems covering maximum capability. Cutting option value to
   look clean is a failure mode, not simplicity.
2. **Economy misread as human person-days** — agent-native cost is dominated by
   entropy, verification, attention, runtime, coordination, and reversal. A
   vague "lifecycle / entropy / attention" line still lets agents default to
   eng-effort accounting.

The longer quality attribute list (readability, maintainability, scalability,
availability, resilience, testability, …) was also being treated as peer
"principles," which flattens tradeoff decisions into a checklist.

## Decision

1. **Canonical PRINCIPLES body is English-first** and universal for any design
   work (code, product, ops, business). The nine-character memory set remains
   the mnemonic; English definitions are authoritative for execution.
2. **Simplicity** is explicitly ambition-preserving: minimize concept/system
   count while maximizing capability surface; integrate rather than shrink the
   world.
3. **Economy** lists agent-native budgets (entropy, verification, attention,
   runtime, coordination, reversal) and keeps the mandatory three questions.
   Human person-days are not the default yardstick. Runtime resource budgets
   stay under Performance; Economy remains the decision lens.
4. **Facet map** records that longer attributes nest under the nine cores —
   not a second principle set.
5. Compact constitution, `eng-economy-01/02`, `eng-simplicity-01`, Quality North
   Star `q-simplicity` / `q-economy` prose, and commercial Economy law are
   aligned to the same wording.

## Options considered

- **Leave doctrine unchanged**: keeps both misread modes in agent defaults.
- **Add more peer principles** (Readability, HA, …): inflates memory set and
  recreates a parallel checklist against `q-*`.
- **Fold Economy into Performance**: loses lifecycle/entropy/attention/
  coordination accounting (rejected again; same as ADR-20260809).

## Consequences

- Agents and humans share one ambition-preserving Simplicity test and one
  agent-native Economy test.
- Cost claims that only cite "saved eng time" or "fewer features" are
  incomplete under `eng-economy-01` / `commercial-d-06`.
- Memory set stays at 9; operating `q-*` set stays at 14 primaries.

## Verification

- `docs/policies/PRINCIPLES.md` states ambition rule, agent-native budgets,
  facet map, and decision rules.
- `runtime/constitution.md` stays ≤ 6000 chars and still carries miss-class-A
  phrases.
- Engineering and commercial Economy/Simplicity predicates match.
- `npm test` (or targeted constitution + curation tests) green on the change set.
