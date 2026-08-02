---
name: continuous-product-quality
description: "Operate high-leverage continuous product betterment cycles: deep research, candidate set, admit multi-item backlog B of all above-threshold opportunities, residual R, execute whole program, outcome/frontier readback, Stop-Audit before idle; bind uncapped harness goal. Not micro-polish thrash, one tiny fix per loop, freeze-all waterfall, or vague 'make it perfect'."
---

# Continuous Product Quality

Run **outcome-frontier product betterment**: close user/business-visible gaps with
**high leverage**, not hundreds of cosmetic commits.

**Primary class:** `workflow`.  
See [ADR-20260801](https://github.com/SylphxAI/skills/blob/main/docs/adr/ADR-20260801-package-classes-and-standard-composition.md).

Primary artifact: a versioned **Product Quality Loop Contract** plus one
**betterment cycle** that clears a **committed backlog B** (or legally rejects
items) under an uncapped harness goal when present.

## Unit of progress (normative)

| Unit | Meaning |
| --- | --- |
| **Cycle** | Research → Candidate **C** → admit **B ⊆ C** → track residual **R** → execute **all of B** → outcome readback → **Stop-Audit** → idle or wake |
| **Not a cycle** | Landing one micro-fix, one PR, or local green |
| **B (committed backlog)** | All admitted **positive-leverage** Work for this engagement under capacity; **may be many items**; must clear or Stop-Audit-reject each |
| **R (residual register)** | Known opportunities not in B, each with EV/leverage and blocker class |
| **Program/engagement** | Same goal + contract identity across capacity splits; do not restart random scout after doing only Top-1 of B |

**Do all high-value work in the cycle:** if nine candidates pass threshold, do not
admit only one and re-loop. Admit the capacity-feasible high-leverage set into
**B** and put the rest in **R** with reasons; **idle is illegal** while R holds
unblocked EV ≥ MinOutcomeDelta items.

## Soft composition

| Need | Open |
| --- | --- |
| Ranking / stop quality | `decision-quality-standard` |
| Complete / SOTA / frontier claims | `evidence-and-claims-standard` |
| One Workstream → delivery terminal | `autonomous-execution` |
| Continuous any-Work OS (not product matrix alone) | `self-feeding-agent-loop` |
| Land/live proof | `delivery-standard` |
| Live Enact | `enact-work-coordination` |
| Domain method | specialist skill for that aspect |

## Read before operating

- [references/product-quality-loop-contract.md](references/product-quality-loop-contract.md)
- [references/multi-aspect-betterment-loop.md](references/multi-aspect-betterment-loop.md)
- [references/harness-goal-binding.md](references/harness-goal-binding.md)

## Non-negotiable laws

1. **No perfect terminal.** Idle = no positive-leverage move under policy—not perfection.
2. **Outcomes over activity.** Maximize Δ north-star / frontier gap per full cost. Commit count is not progress.
3. **Leverage, not ease.**  
   `L = (expected_outcome_or_frontier_gap_delta × weight × confidence) / full_lifecycle_cost`  
   Difficulty alone does not disqualify. Ease alone must not promote polish.
4. **MinOutcomeDelta.** Non-floor Work below contract threshold → residual/reject, not B.
5. **Matrix serves outcomes.** Multi-aspect cells; never hide a failed floor in one score.
6. **Evidence before claims.** Original-oracle readback on delivered subjects. Local green ≠ betterment.
7. **B then clear.** Completing one Work ≠ completing the cycle/goal.
8. **No freeze-all mega-E.** Use C → B + R + re-admission when evidence/capacity changes—not an immutable waterfall list.
9. **Stop-Audit before idle/goal complete.** Falsifiable package required; slogans invalid.
10. **No continuous independent reviewers** in the operating loop. Reviewers only for irreversible/public-contract authority, load-bearing SOTA claims, or **contested** Stop-Audit.
11. **Uncapped harness goal** when Goal API exists; complete only with Stop-Audit package at idle.
12. **No meta-router.** Native discovery only.

## Cycle

```text
bind product + north-star outcomes + uncapped goal
  -> deep research (VoI stop)
  -> Candidate set C + frontier map (claim-grade if SOTA language used)
  -> admit B ⊆ C under leverage + capacity + WIP
  -> residual R for the rest (EV + blocker)
  -> execute all of B (parallel workstreams OK; small commits OK)
  -> re-admit R→B when capacity/evidence changes
  -> original-oracle per Work + cycle outcome readback
  -> Stop-Audit package
  -> idle / goal complete OR continue same engagement
```

## Method (summary)

1. **Outcome lock + goal.** 1–3 north-star outcomes, non-goals, contract.  
   `get_goal` / `create_goal` uncapped per harness-goal-binding.
2. **Research gate.** Build frontier/opportunity map until VoI no longer changes
   B ranking or idle verdict enough to justify delay. Unknowns → R with freshness.
3. **Score C; admit B.** All items ≥ MinOutcomeDelta and positive L under capacity
   enter B (many OK). Hard floors outrank but still need authority/safety.
4. **Execute program.** Drive each B item with `autonomous-execution` (or durable
   Work). Small engineering commits allowed; product batch is B, not one padding fix.
5. **Verify.** Original oracle per Work; cycle-level outcome/frontier readback on
   exact delivered subjects before Stop-Audit.
6. **Stop-Audit then idle.** See contract. Default is finish B; reject/idle needs
   falsifiable reasons. Do not abuse “over-engineering” to quit high-L work.
7. **Wake.** New signal → new or resumed engagement with updated contract; do not
   silently shrink to last patch.

## Anti-patterns

- Micro-polish thrash (many commits, no user-visible Δ)
- One finding / one Work as the **cycle** boundary
- Admit only Top-1 while other unblocked high-L items exist → restart scout
- Freeze immutable mega-E and force tail low-value work
- Idle while R has unblocked EV ≥ MinOutcomeDelta
- Ease-first ranking; difficulty-as-veto for high-L bets
- Goal complete on one PR / local green / “improved a bit”
- Continuous independent reviewer ceremony every tick
- SOTA/frontier claims without claim-grade fields
- Research essays with no admission impact (no VoI stop)

## When not to use

- Single bug or one-shot local edit → direct fix / `autonomous-execution` alone  
- One release-grade finish pass on integrated product → `product-finish`  
- Continuous any-Work OS without product matrix → `self-feeding-agent-loop`  
- Portable ledger design only → `work-coordination-standard`
