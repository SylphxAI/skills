---
id: ADR-20260811-principles-ambition-agent-economy
status: accepted
date: 2026-08-11
decision_owner: SylphxAI
supersedes: []
amends:
  - ADR-20260809-universal-principles-and-q-economy
scope:
  - principles
  - economy
  - simplicity
  - presentation
---

# ADR-20260811: Ambition-preserving Simplicity, agent-native Economy, English-only principles

## Context

ADR-20260809 adopted the nine principles and `q-economy`. Three
execution risks remained:

1. **Simplicity misread as fewer features** — ambitious work needs the opposite:
   fewest concepts/systems covering maximum capability. Cutting option value to
   look clean is a failure mode, not simplicity.
2. **Economy misread as human person-days** — agent-native cost is dominated by
   entropy, verification, attention, runtime, coordination, and reversal. A
   vague "lifecycle / entropy / attention" line still lets agents default to
   eng-effort accounting.
3. **Non-English slogans on principles surfaces** — parallel mnemonics and mixed-
   language branding reduce clarity for international agents and readers, and
   look unprofessional next to the English `q-*` vocabulary.

The longer quality attribute list (readability, maintainability, scalability,
availability, resilience, testability, …) was also being treated as peer
"principles," which flattens tradeoff decisions into a checklist.

## Decision

1. **Canonical PRINCIPLES body is English-only** and universal for any design
   work (code, product, ops, business). Memory set of 9 uses English names only:
   Depth · Correctness · Simplicity · Evolvability · Observability ·
   Performance & Velocity · Reliability · Security · Economy, grouped as
   Think / Build / Operate. Non-English slogans are retired from principles,
   constitution, README, and quality vocabulary surfaces.
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

- **Leave principles unchanged**: keeps both misread modes and mixed-language
  branding in agent defaults.
- **Keep a non-English mnemonic alongside English**: still pollutes always-on
  and quality surfaces; rejected.
- **Add more peer principles** (Readability, HA, …): inflates memory set and
  recreates a parallel checklist against `q-*`.
- **Fold Economy into Performance**: loses lifecycle/entropy/attention/
  coordination accounting (rejected again; same as ADR-20260809).

## Consequences

- Agents and humans share one ambition-preserving Simplicity test and one
  agent-native Economy test.
- Cost claims that only cite "saved eng time" or "fewer features" are
  incomplete under `eng-economy-01` / `commercial-d-06`.
- Doctrine, constitution, and North Star memory set present as clean English
  professional language only.
- Memory set stays at 9; operating `q-*` set stays at 14 primaries.

## Verification

- `docs/policies/PRINCIPLES.md` states ambition rule, agent-native budgets,
  facet map, decision rules, and English-only presentation rule.
- Active principles surfaces contain no non-English principle slogans.
- `runtime/constitution.md` stays ≤ 6000 chars and still carries miss-class-A
  phrases.
- Engineering and commercial Economy/Simplicity predicates match.
- Targeted constitution + curation tests green on the change set.
