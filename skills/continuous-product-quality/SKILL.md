---
name: continuous-product-quality
description: "Multi-cycle product betterment to idle frontier (high-leverage outcomes)—not autonomous-execution closure or self-feeding work-selection."
---

# Continuous Product Quality

Run **outcome-frontier product betterment**: close user/business-visible gaps with
**high leverage**, not hundreds of cosmetic commits.

**Primary class:** `workflow`.  
See [ADR-20260801](https://github.com/SylphxAI/skills/blob/main/docs/adr/ADR-20260801-package-classes-and-standard-composition.md).

Primary artifact: a versioned **Product Quality Loop Contract** plus a
**continuous betterment engagement** (uncapped harness goal when present) that
runs **many cycles** until re-research finds no high-leverage Work.

**Loop engineering means the outer engagement keeps cycling** — not “one B clear
then goal complete.” Clearing B ends a **cycle**, not the **loop**.

## Unit of progress (normative)

| Unit | Meaning |
| --- | --- |
| **Engagement (the loop)** | Continuous betterment for a product/outcome set under one uncapped goal. **Stays active across cycles.** Ends only at engagement idle. |
| **Cycle (inner iteration)** | Coverage card → **C** → admit **B** + **R** → execute **all of B** → verify → **cycle Stop-Audit** → **immediately re-research for next cycle** (unless engagement idle) |
| **Not a cycle** | One micro-fix, one PR, local green, or “improved a bit” |
| **B** | All capacity-feasible above-threshold items this cycle (many OK); clear all |
| **R** | Not-in-B opportunities with EV + blocker |
| **Engagement idle** | After a cycle (or at start), **fresh re-research/coverage card** admits **B=∅** and R has no unblocked EV ≥ MinOutcomeDelta |

**Do all high-value work in each cycle:** if nine candidates pass, admit them into
**B** (not Top-1 only). Overflow → R with `capacity`, same engagement.

**After B is cleared: loop again.** Re-run coverage card / scout → new C → new B.
Do **not** `update_goal(complete)` merely because cycle N finished. Complete the
goal only at **engagement idle** (re-scout found nothing worth doing).

## Outer goal vs cycle (critical)

| Layer | What it is | Stop? |
| --- | --- | --- |
| **Outer engagement objective** | Product/north-star betterment (e.g. vision plane works in dogfood) | Only at **engagement idle** |
| **Inner cycle** | One research→B→execute→verify pass | **Never** the engagement terminal |

**Do not redefine the goal as “finish cycle N” or “ship B8–B10”.** Those are
inner checkpoints. The durable objective stays the **outer** product outcome.

### Between cycles: continue, do not close the turn

When cycle k Stop-Audit passes and engagement is **not** idle:

1. **Immediately** start cycle k+1 (new coverage card / re-scout → new B).
2. **Do not** end the agent turn with a user-facing “Cycle N 報告 / 你點下一步”.
3. **Do not** ask the user whether to continue when R still has unblocked high-EV
   or a fresh card would admit Work.
4. Optional: short durable log in the contract (one line). Not a final answer.
5. User-facing **final** status only at **engagement idle**, hard block, or
   explicit user interrupt.

Harness Goal API (when present) **recovers** the outer engagement after
accidental stop. It does **not** replace self-loop: **even with no Goal API**,
keep cycling in-process until engagement idle.

### Anti-patterns (stop thrash)

- Treating “Cycle 3 完成，要我開 Cycle 4 嗎？” as normal control flow  
- `update_goal(complete)` or “WORK MAY STOP” after one cycle while R/high-EV remains  
- Replacing outer objective text with the cycle backlog list alone  
- Waiting for Goal System to “kick” the next cycle — **you** open k+1  

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

1. **No perfect terminal; yes continuous cycling.** Engagement loops until
   re-research finds no high-leverage Work. Idle = no positive-leverage move
   under policy—not perfection, and **not** “B just cleared once.”
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
12. **B clear ≠ loop done.** Completing one Work ≠ cycle done. Completing one
    cycle ≠ engagement/goal done. After cycle Stop-Audit of B, **start next cycle**
    (re-research) unless engagement idle proves empty.
13. **No freeze-all mega-E.** C → B + R + re-admission—not immutable waterfall.
14. **Two Stop-Audit levels.** (a) **Cycle:** B cleared + verify cadence. (b)
    **Engagement idle:** plus **fresh** coverage card/re-scout with B=∅ and R
    clean. Goal complete only at (b). Slogans invalid.
15. **No continuous independent reviewers.** Exception: irreversible/public-contract, load-bearing SOTA, contested Stop-Audit.
16. **Uncapped harness goal** encodes the **outer** product engagement; stays
    **active across cycles**; complete only at engagement idle. Never rewrite
    the goal to “complete cycle N” alone.
17. **Self-loop without Goal API.** Missing `create_goal` is a residual note, not
    a stop. Continue cycles in-process until engagement idle.
18. **No final user turn between cycles** unless blocked/idle/user interrupt.
19. **No meta-router.** Native discovery only.

## Loop (engagement) and cycle

```text
bind product + north-stars + uncapped goal  (engagement START — goal stays active)
  loop cycles k = 1, 2, 3, ... :
      research coverage card (5 cells) + VoI deepen
      Candidate C
      admit ALL capacity-feasible passers -> B; else R
      if B empty AND R has no unblocked high-EV:
          engagement Stop-Audit -> goal complete -> IDLE  (loop ends)
      else:
          execute all of B (efficiency bar)
          verify cadence
          cycle Stop-Audit (B cleared)   # NOT goal complete
          continue -> cycle k+1          # THIS IS THE LOOP
```

## Method (summary)

1. **Outcome lock + uncapped goal (engagement).** Goal remains active for the whole loop.
2. **Cycle body:** coverage card → C → B/R → if B non-empty execute all B (parallel default) → verify → cycle Stop-Audit.
3. **Loop:** after cycle Stop-Audit, **immediately re-research** (new card/C/B) **in the same turn/run**. Do not park; do not final-response the user.
4. **Engagement idle only when** a post-clear (or initial) re-research yields B=∅ and R has no unblocked EV ≥ MinOutcomeDelta — then Stop-Audit + `update_goal(complete)` (if Goal API) + **then** user-facing final status.
5. **Never** goal-complete or user-final on one PR, one cycle B-clear, cycle report, or “improved a bit.”
6. **No Goal API residual:** still self-loop to engagement idle; record “goal API missing” once, do not use it as a reason to stop between cycles.

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
- **One-cycle-and-stop:** clearing B once then completing the goal without re-research
- Calling “loop engineering” while refusing to open cycle k+1
- End-turn cycle report + “要我開 Cycle N+1 嗎？” while engagement not idle
- Redefining outer goal as the current cycle backlog

## When not to use

- Single bug or one-shot local edit → direct fix / `autonomous-execution` alone  
- One release-grade finish pass on integrated product → `product-finish`  
- Continuous any-Work OS without product matrix → `self-feeding-agent-loop`  
- Portable ledger design only → `work-coordination-standard`
