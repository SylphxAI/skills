---
id: ADR-20260802-outcome-leverage-betterment-cycle
status: accepted
date: 2026-08-02
decision_owner: SylphxAI
supersedes: []
amends:
  - ADR-20260731T191027Z-continuous-product-quality-loop
scope:
  - static-instruction-packages
  - continuous-product-quality
---

# Outcome-leverage betterment cycle

## Context

Independent review task `indep_review_cpq_loop` returned accept-with-amendments.

Operating `continuous-product-quality` produced long cycles of micro-polish,
many commits, and little user-visible product change. Agents optimized for easy
findings and treated one Work land as loop completion.

Industry prioritization (RICE/WSJF/cost of delay), kaizen-vs-kaikaku plateau
behavior, claim-grade frontier discipline, and closed-loop re-planning
(MAPE-K/PDSA) support high-leverage programs—not ease-first polish factories.
DORA small-batch delivery constrains **engineering commit** size, not product
program size.

Independent review accepted the redesign intent and rejected freeze-all
eligible mega-lists and continuous in-loop independent reviewers.

## Decision

1. A betterment **cycle** advances **committed backlog B** of all
   above-threshold leverage opportunities under capacity, tracks **residual R**,
   re-admits when evidence/capacity change, then **Stop-Audits** before idle.
2. Completing one Work is not completing the cycle or harness goal.
3. Leverage `L = (Δoutcome_or_frontier_gap × weight × confidence) / full_cost`;
   difficulty alone does not disqualify; ease alone does not promote polish.
4. MinOutcomeDelta rejects cosmetic non-floor work from B.
5. Harness Goal (when present) is uncapped; objective carries idle DoD, EV
   policy, and contract pointer; `complete` only with Stop-Audit package.
6. No continuous independent reviewers in the operating loop; reviewers only for
   irreversible/public-contract, load-bearing SOTA, or contested Stop-Audit.
7. Research uses VoI stop; frontier/SOTA language requires claim-grade fields.

## Consequences

- Agents must clear multi-item high-value programs before idle.
- Anti-lazy residual tests block fake idle; EV thresholds block infinite work.
- Goal recovery and termination align without reviewer ceremony by default.

## Verification

- Skill + contract + multi-aspect + harness-goal-binding match this decision.
- `npm test` / CI green; install readback for supported agents.
