---
id: ADR-20260809-universal-principles-and-q-economy
status: accepted
date: 2026-08-09
decision_owner: SylphxAI
supersedes: []
amends:
  - ADR-20260801T010819Z-simple-surface-deep-capability
scope:
  - doctrine
  - quality-vocabulary
  - economy
  - commercial-decisions
---

# ADR-20260809: Universal Principles and q-economy

## Context

Sylphx work spans design, development, and business models, but the always-on
instruction floor and the engineering quality vocabulary did not carry one
memorable, universal set of principles. The team's operating doctrine is the
nine-principle system **Depth · Correctness · Simplicity · Evolvability ·
Observability · Performance & Velocity · Reliability · Security · Economy**,
with decision rules (Correctness and Security are non-tradeable floors; other
conflicts name the traded principle and when it returns; default to Simplicity
when unsure; keep source/CI/deploy/live states distinct) and a 60-second
pre-flight checklist.

The Quality North Star (merged in #121) is the sole `q-*` vocabulary with a
memory set of 8 buckets. It deliberately excluded cost as a separate attribute:
runtime resource cost is a budget constraint on Performance/Scalability. That
guardrail is correct for runtime budgets but does not cover the new doctrine's
**Economy**: lifecycle / system-entropy / human-attention cost accounting,
agent-native economics, and entropy as compound interest.

## Decision

1. **Adopt the nine-principle doctrine as canonical universal doctrine** for
   all design, development, and business-model work. Full text:
   `docs/policies/PRINCIPLES.md`. The compact always-on floor goes into
   `runtime/constitution.md` (still under the 6000-char L0 ceiling).
2. **Add `q-economy` as the 14th primary Quality North Star attribute**:
   lifecycle / system-entropy / human-attention cost accounting, priced not by
   development effort. Runtime resource cost remains a budget constraint under
   Performance/Scalability (the #121 guardrail is re-scoped to that exact
   meaning, not weakened).
3. **Grow the memory set 8 → 9**, mapping each principle to `q-*` IDs.
   Operating set Meta + 13 → 14.
4. **Wire Economy into the commercial side**: `commercial-decision-standard`
   gains an Economy law (which budget / how measured / what traded) and rule
   `commercial-d-06`; business-model, pricing, packaging, and roadmap work
   price verification, attention, entropy, and retirement cost — not dev
   effort.
5. **New binding predicates** `eng-economy-01/02` under `engineering-standard`.
6. This is doctrine, **not a second quality vocabulary**: PRINCIPLES maps onto
   `q-*` and does not re-author a parallel list.

## Options considered

- **Reject the addition (keep 13 primaries, no doctrine doc)**: fails the
  user's explicit requirement that the latest guidance be added; Economy would
  remain absent from both engineering and commercial vocabulary.
- **Add PRINCIPLES as a top-level listing skill**: violates the repo model
  (doctrine is not a requestable job; `*-standard` listing paths are retired).
- **Fold Economy into Performance only**: loses lifecycle/attention/entropy
  accounting and the agent-native economics rule; "cost" claims would keep
  defaulting to dev effort.
- **Second parallel quality list**: explicitly forbidden by the repo doctrine
  ("do not reintroduce a second quality slogan layer").

## Consequences

- Constitution grows ~0.8 KB (2161 → 2990 bytes), still well under the
  6000-char floor and the L0 test.
- `full-standard.md` / `binding-predicates.md` / `quality-north-star-usage.md`
  / `tests/curation-invariants.test.mjs` updated consistently
  (14 primaries, 9-item memory set, q-economy rows and anti-examples,
  precedence chain includes Economy after Performance/Scalability).
- Every future cost claim — engineering or commercial — must state which
  budget, how measured, and which principle is traded.

## Verification

- `npm run build:catalog && node scripts/check.mjs` green.
- `node --test` green (including updated curation invariants).
- Catalog count unchanged (57 listings); no listing paths added.
