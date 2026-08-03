---
name: continuous-product-quality
description: "One high-leverage product betterment cycle: coverage card, admit B, residual R, execute, verify, write engagement state for the next invoke."
---

# Continuous Product Quality

> **Boundary ([ADR-20260803](https://github.com/SylphxAI/skills/blob/main/docs/adr/ADR-20260803-betterment-outer-loop-vs-cycle-method.md)):** this Skill owns **one cycle method**. Multi-cycle continuity is the **outer harness runner** (re-invoke / automation / Goal resume as insurance)—see [betterment-engagement-runner.md](https://github.com/SylphxAI/skills/blob/main/docs/reference/betterment-engagement-runner.md). Do not treat this Skill as a forever-while motor.

Run **outcome-frontier product betterment**: close user/business-visible gaps with **high leverage**, not hundreds of cosmetic commits.

**Primary class:** `workflow`.  
See [ADR-20260801](https://github.com/SylphxAI/skills/blob/main/docs/adr/ADR-20260801-package-classes-and-standard-composition.md).

## Unit of progress

| Unit | Meaning |
| --- | --- |
| **Engagement** | Outer continuous betterment for a product/outcome set. Owned by durable state + outer runner (+ Goal as insurance). Ends only at engagement idle. |
| **Cycle (this Skill)** | Coverage card → Candidate **C** → admit **B** + **R** → execute **all of B** → verify → cycle Stop-Audit → **write state** for next invoke |
| **Not a cycle** | One micro-fix, one PR, local green, or “improved a bit” |
| **B** | All capacity-feasible above-threshold items this cycle (many OK); clear all |
| **R** | Not-in-B opportunities with EV + honest blocker |
| **Engagement idle** | After a **fresh** re-scout: **B=∅** and R has no unblocked EV ≥ MinOutcomeDelta |

**Do all high-value work in each cycle:** if nine candidates pass, admit them into **B** (not Top-1 only). Overflow → R with `capacity`.

## Outer objective vs this cycle

| Layer | What it is | Who stops it |
| --- | --- | --- |
| **Outer engagement objective** | Product/north-star betterment | Runner + idle predicate (Goal complete only then) |
| **This cycle** | One research→B→execute→verify pass | Cycle Stop-Audit ends **this invoke’s method work** |

**Do not redefine the outer objective as “finish cycle N” or “ship B8–B10.”** Those are checkpoints in state/contract logs.

## This invoke (normative)

1. **Bind context:** product identity, outer objective, state path. `get_goal` / `create_goal` **if present** (uncapped outer objective; insurance only—missing Goal API is not a stop).
2. **Research:** five-cell coverage card + VoI deepen until admission won’t change.
3. **Admit:** Candidate C → every capacity-feasible passer into **B**; rest **R** with EV + blocker class.
4. **Execute all of B:** independent items default parallel; shared setup once; slice large work into L0 shippable B items (soft cost is not a qualified blocker).
5. **Verify:** original-oracle per B item at its terminal; one outcome/north-star readback for the cycle subjects.
6. **Cycle Stop-Audit + write state:** B cleared evidence, coverage card, B/R, `cycle`, `next_action`, `status` (`active` \| `hard_wait` \| `idle` per runner rules).
7. **End of this Skill’s contract:** leave a clean handoff for the **outer runner**. Prefer short state write over a long “Cycle N 報告.” Do **not** ask “要開 Cycle N+1 嗎？” when a runner exists.

If context still has budget **and** B/R clearly leave unblocked high-EV work, you **may** start another cycle in the same turn as an optimization—not as a portable guarantee. The portable multi-cycle motor is the runner.

## Blockers (admit truthfully)

### Qualified blockers (may park high-EV in R)

| Class | Meaning | Example |
| --- | --- | --- |
| `external_wait` | Human/owner artifact or credential this agent cannot produce | Browser visual OK from user; missing credentials |
| `authority_pending` | Explicit owner/legal approval already requested | Public contract / commercial default-on |
| `dependency_blocked` | Hard external dependency not under this engagement’s authority | Upstream API not shipped |
| `safety_hold` | Explicit safety/risk hold with evidence | Live prod mutation without authority |

### Soft (not a stop — slice into B)

Not qualified alone: multi-day, hard, expensive, “engine later,” “not title-only,” missing Goal API, “polish later,” or desire to write a cycle essay.

| After honest admit | Action |
| --- | --- |
| B non-empty | Execute all B; write state `status=active` |
| B empty, R has soft-only high-EV | Slice L0 into B and execute; do not park+essay |
| B empty, R only qualified-blocked | `status=hard_wait`; record what unblocks |
| B empty, R clean after fresh re-scout | `status=idle`; Goal complete **only then** if API present |

## Non-negotiable laws

1. **Outcomes over activity.** Maximize Δ north-star / frontier gap per full cost. Commit count is not progress.
2. **Coverage card before admit.** Five cells; each evidence or `unknown`+reason. Decision-complete, not omniscient.
3. **Leverage, not ease.**  
   `L = (expected_outcome_or_frontier_gap_delta × weight × confidence) / full_lifecycle_cost`  
   Difficulty alone does not disqualify; ease alone must not promote polish.
4. **MinOutcomeDelta.** Below threshold → residual/reject, not B.
5. **All passers into B.** Not Top-1 only. Overflow → R with `capacity`.
6. **Execution efficiency.** Parallel default; forbid serial-for-safety-only on independent items.
7. **Verify cadence.** Per B item original-oracle; per cycle one outcome readback. Local green ≠ betterment.
8. **B clear ≠ engagement done.** Cycle Stop-Audit ≠ Goal complete. Outer idle only after fresh empty re-scout.
9. **No freeze-all mega-E.** C → B + R + re-admission.
10. **No continuous independent reviewers.** Exception: irreversible/public-contract, load-bearing SOTA, contested idle.
11. **Goal = insurance + terminal gate.** Outer objective text only; complete only at engagement idle.
12. **Soft blockers ≠ stop.** Large high-EV becomes sliced B.
13. **No meta-router.** Native discovery only.
14. **Runner owns multi-cycle.** Skill owns cycle quality + state handoff.

## Cycle shape

```text
bind product + outer objective + state (+ optional uncapped Goal)
research coverage card (5 cells) + VoI deepen
Candidate C
admit ALL capacity-feasible passers -> B; else R
if B empty after honest admit + one re-scout:
    set status hard_wait | idle per runner rules; write state; stop THIS cycle
else:
    execute all of B (efficiency bar; slice large work)
    verify cadence
    cycle Stop-Audit
    write state (next_action, B/R, cycle id, status=active)
    # outer runner re-invokes for next cycle
```

## Anti-patterns

- Micro-polish thrash (many commits, no user-visible Δ)
- One finding / one Work treated as the cycle boundary
- Admit only Top-1 while other unblocked high-L items exist
- Goal complete / “WORK MAY STOP” after one cycle B-clear
- Redefining outer goal as the cycle backlog list
- “B empty / R open high-EV” then stop (soft parking)
- “multi-day / engine / not title-only” as sole blocker without L0 slice
- End-turn “要我開 Cycle N+1 嗎？” as control protocol when a runner exists
- Claiming Skill prose alone guarantees multi-cycle continuity
- Continuous reviewer ceremony every tick
- SOTA/frontier claims without claim-grade evidence
- Research essays with no admission impact

## When not to use

- Single bug or one-shot local edit → direct fix / `autonomous-execution`
- One release-grade finish pass → `product-finish`
- Continuous any-Work OS without product matrix → `self-feeding-agent-loop`
- Portable ledger design only → work-coordination skills

## Compose with (native discovery)

| Need | Skill |
| --- | --- |
| Decision / stop quality | `decision-quality-standard` |
| Complete / SOTA / frontier claims | `evidence-and-claims-standard` |
| One Workstream → delivery terminal | `autonomous-execution` |
| Continuous any-Work OS | `self-feeding-agent-loop` |
| Land/live proof | `delivery-standard` |
| Live Enact | `enact-work-coordination` |
| Domain method | specialist skill for that aspect |

## Read when operating

- [references/product-quality-loop-contract.md](references/product-quality-loop-contract.md) — card, admit, verify fields
- [references/multi-aspect-betterment-loop.md](references/multi-aspect-betterment-loop.md) — aspect catalog + leverage sketch
- [references/harness-goal-binding.md](references/harness-goal-binding.md) — Goal insurance fields
- [Betterment engagement runner](https://github.com/SylphxAI/skills/blob/main/docs/reference/betterment-engagement-runner.md) — multi-cycle continuity
