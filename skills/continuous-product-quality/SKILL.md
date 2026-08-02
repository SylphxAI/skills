---
name: continuous-product-quality
description: "Operate high-leverage continuous product betterment: 5-cell research coverage card, admit all above-threshold B items, residual R, parallel-efficient execute, Work+cycle verify cadence, Stop-Audit idle, uncapped goal. Not micro-polish thrash, shallow research-as-done, serial busywork, freeze-all waterfall, or perfection."
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
3. **~70% then move (Type-2).** On reversible work, do not wait for perfect information. Stop research when VoI cannot change B/idle. Irreversible/public-contract still needs authority depth.
4. **Minimal research coverage card before admit.** Five cells (contract). Each cell: evidence **or** `unknown`+reason. Decision-complete, not omniscient. Stop-Audit fails if card incomplete.
5. **Leverage, not ease.**  
   `L = (expected_outcome_or_frontier_gap_delta × weight × confidence) / full_lifecycle_cost`  
   Difficulty alone does not disqualify. Ease alone must not promote polish.
6. **MinOutcomeDelta.** Non-floor Work below threshold → residual/reject, not B.
7. **Matrix serves outcomes.** Multi-aspect cells; never hide a failed floor in one score.
8. **All passers into B.** Admit every capacity-feasible above-threshold item (many OK)—not Top-1 only. Overflow → R with `capacity`, same engagement.
9. **Execution efficiency bar.** Independent B items default **parallel**; shared setup once; serial only with explicit dependency. Forbid serial-for-safety-only.
10. **Verify cadence.** Per B item: original-oracle at terminal. Per cycle: one outcome/north-star readback on exact subjects. Not every-commit full suite; not PR-green-as-done.
11. **Evidence before claims.** Local green ≠ betterment.
12. **B then clear.** Completing one Work ≠ completing the cycle/goal.
13. **No freeze-all mega-E.** C → B + R + re-admission—not immutable waterfall.
14. **Stop-Audit before idle/goal complete.** Falsifiable package; slogans invalid.
15. **No continuous independent reviewers.** Exception: irreversible/public-contract, load-bearing SOTA, contested Stop-Audit.
16. **Uncapped harness goal** when Goal API exists; complete only with Stop-Audit package at idle.
17. **No meta-router.** Native discovery only.

## Cycle

```text
bind product + north-star outcomes + uncapped goal
  -> research coverage card (5 cells) + VoI-limited deepen
  -> Candidate C (+ claim-grade frontier only if SOTA language used)
  -> admit ALL capacity-feasible passers into B; R for the rest
  -> execute B with efficiency bar (parallel default)
  -> re-admit R→B when capacity/evidence changes
  -> verify cadence (per-Work oracle + cycle outcome)
  -> Stop-Audit package
  -> idle / goal complete OR continue same engagement
```

## Method (summary)

1. **Outcome lock + uncapped goal.** 1–3 north-stars, non-goals, contract pointer.
2. **Research coverage card (mandatory, thin).** Fill five cells fast; then expand only if VoI says ranking/idle would change. Produce Candidate **C**.
3. **Score and admit.** All ≥ MinOutcomeDelta & positive L under capacity → **B**; rest → **R** with EV/blocker.
4. **Execute efficiently.** Parallelize independent B items; one shared setup; dependency-serial only. Drive each with `autonomous-execution`.
5. **Verify on cadence.** Oracle each terminal; one cycle outcome readback; then Stop-Audit.
6. **Idle or continue same engagement.** Never goal-complete on one polish PR.

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
- Shallow research-as-done (coverage card missing/skipped)
- Serial busywork on independent B items without dependency
- Full re-verify every commit as ceremony (unless risk demands)
- Waiting for 90%+ information on reversible Type-2 work

## When not to use

- Single bug or one-shot local edit → direct fix / `autonomous-execution` alone  
- One release-grade finish pass on integrated product → `product-finish`  
- Continuous any-Work OS without product matrix → `self-feeding-agent-loop`  
- Portable ledger design only → `work-coordination-standard`
