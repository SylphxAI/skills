---
name: continuous-product-quality
description: "One high-leverage product betterment cycle: coverage card, admit B, residual R, execute, verify, write engagement state for the next invoke."
---

# Continuous Product Quality

> **Boundary (ADR-20260803):** this Skill owns the **cycle method** (research →
> admit B → execute → verify → write state). **Multi-cycle continuity** is the
> **outer harness runner** (re-invoke / automation / Goal resume as insurance)—see
> [betterment-engagement-runner.md](https://github.com/SylphxAI/skills/blob/main/docs/reference/betterment-engagement-runner.md).
> Do not treat Skill prose alone as a portable forever-while-loop motor.

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

1. **Immediately** start cycle k+1 in the **same turn** (new card → C → B).
2. Promote soft-blocked high-EV R into **sliced B** (L0/next shippable).
3. **Do not** end the agent turn with “Cycle N 報告” / residual essay / “點 Cycle N+1”.
4. **Do not** declare “title-only B empty” while soft-only high-EV residuals remain.
5. Optional: one-line durable contract log. Not a final answer.
6. User-facing **final** status only at **engagement idle**, **qualified hard wait**
   (all remaining high-EV truly external/authority-blocked), or user interrupt.

Harness Goal API (when present) **recovers** the outer engagement after
accidental stop. It does **not** replace self-loop: **even with no Goal API**,
keep cycling in-process until engagement idle.

### Anti-patterns (stop thrash)

- Treating “Cycle 3 完成，要我開 Cycle 4 嗎？” as normal control flow  
- `update_goal(complete)` or “WORK MAY STOP” after one cycle while R/high-EV remains  
- Replacing outer objective text with the cycle backlog list alone  
- Waiting for Goal System to “kick” the next cycle — **you** open k+1  


## B empty, R, and soft blockers (critical)

Agents fail the loop by writing **“title-only B empty, R still high-EV”** then
**ending the turn** with a cycle report. That is **illegal** when any residual is
only soft-blocked.

### Qualified blockers (may keep item in R)

Only these (with concrete evidence) may keep high-EV work out of B:

| Class | Meaning | Example |
| --- | --- | --- |
| `external_wait` | Needs a human/owner artifact or credential **this agent cannot produce** | User must confirm visual OK in their browser; missing deploy credentials |
| `authority_pending` | Explicit owner/legal approval required and already requested | Commercial default-on; public contract change awaiting owner |
| `capacity` | Hard concurrency/CI envelope **after** B already has a full capacity load | Overflow while other high-L items are actively executing this cycle |
| `duplicate` / `negative_ev` / `below_min_delta` | True policy rejects | Cosmetic below MinOutcomeDelta |

### Soft blockers (illegal as sole reason to park high-EV in R and stop)

**Never** treat these as engagement pause or B-empty:

- “multi-day engine work” / “large” / “expensive” / “not title-only”
- “needs a proper Port later” without opening an **L0 shippable slice** as B now
- “wait for user visual” when **other** unblocked high-EV items still exist
- “ROI of micro-polish is low” (correct for polish; **incorrect** for high-EV R)
- “spawn_agent unavailable” (run serial; still execute B)
- “no Goal API” (self-loop residual only)

**Rule:** high-EV + only soft cost → **admit a capacity-sliced B item and execute**
(e.g. skinned walk **L0**, not “whole engine Port or nothing”).

### When the turn may end

| Situation | Allowed end-of-turn? | Message shape |
| --- | --- | --- |
| More unblocked or soft-only high-EV work | **No** — continue cycle k+1 in-process | Durable contract log only |
| **Every** remaining high-EV item has a **qualified** external/authority blocker and no other Work | **Yes** — hard wait | Engagement **ACTIVE**, blocked on \<ids\>; **not** idle; **not** “WORK MAY STOP”; **not** “要開 Cycle N 嗎？” |
| Fresh re-scout B=∅ and R clean | **Yes** — engagement idle | Stop-Audit + goal complete if API |

**Illegal message shape while engagement active:** long “Cycle N 報告” + residual table + “如果你要，下一句開 Cycle N+1”.

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
- [Betterment engagement runner (outer loop)](https://github.com/SylphxAI/skills/blob/main/docs/reference/betterment-engagement-runner.md)

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
18. **No final user turn between cycles** unless qualified hard wait, idle, or user interrupt.
19. **Soft blockers ≠ stop.** Large/slow/high-cost high-EV work becomes sliced B, not R+essay.
20. **No meta-router.** Native discovery only.

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

1. **Bind outer engagement** (product outcomes + state path). Create/resume
   uncapped Goal **if present** (insurance only).
2. **Run one cycle well:** coverage card → C → B/R → execute all B (parallel
   default; slice large work) → verify → cycle Stop-Audit → **write state**
   (`next_action`, B/R, cycle id).
3. **Continuity:** prefer **same-turn** start of cycle k+1 when context allows
   and work remains. Portable guarantee of multi-cycle is the **outer runner**
   re-invoke—not Skill text alone (ADR-20260803).
4. **Do not** end with “要開 Cycle N+1 嗎？” when unblocked/soft-only high-EV
   work remains; either continue or leave state for the runner.
5. **Engagement idle** only after fresh re-scout B=∅ and R has no unqualified
   high-EV—then Goal complete if API + user-facing final.
6. **Never** treat cycle B-clear, PR green, or cycle essay as outer done.

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
- “B empty / R open high-EV” then stop (soft parking)
- “multi-day / engine Port / not title-only” as sole blocker without L0 B slice
- Redefining outer goal as the current cycle backlog

## When not to use

- Single bug or one-shot local edit → direct fix / `autonomous-execution` alone  
- One release-grade finish pass on integrated product → `product-finish`  
- Continuous any-Work OS without product matrix → `self-feeding-agent-loop`  
- Portable ledger design only → `work-coordination-standard`
