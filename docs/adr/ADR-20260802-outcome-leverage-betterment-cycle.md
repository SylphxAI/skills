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

1. A betterment **engagement** is multi-cycle **loop engineering**: after each
   cycle clears **B**, re-research and open the next cycle. Goal stays active.
2. A **cycle** advances committed backlog B (all above-threshold items under
   capacity) + residual R, then cycle Stop-Audit — **not** goal complete.
3. Completing one Work or one cycle is not completing the engagement/goal.
   Goal complete only at engagement idle (fresh empty re-scout).
4. Leverage `L = (Δoutcome_or_frontier_gap × weight × confidence) / full_cost`;
   difficulty alone does not disqualify; ease alone does not promote polish.
5. MinOutcomeDelta rejects cosmetic non-floor work from B.
6. Harness Goal is uncapped and **stays active across cycles**; `complete` only
   at engagement idle (fresh empty re-scout + Stop-Audit)—not after one cycle.
7. No continuous independent reviewers; exception paths only.
8. Research: 5-cell coverage card each cycle + VoI stop; claim-grade frontier.
9. Efficiency bar: parallel default; shared setup once; serial only with dependency.
10. Verify cadence: original-oracle per Work; one cycle outcome readback.

## Consequences

- Agents must **keep looping** (re-research after each B clear) until engagement idle.
- One-cycle-and-stop is rejected as a false reading of loop engineering.
- Agents must clear multi-item high-value programs each cycle before re-loop or idle.
- Anti-lazy residual tests block fake idle; EV thresholds block infinite work.
- Shallow research and serial busywork are explicit anti-patterns.
- Goal recovery and termination align without reviewer ceremony by default.

## Verification

- Skill + contract + multi-aspect + harness-goal-binding match this decision.
- `npm test` / CI green; install readback for supported agents.
