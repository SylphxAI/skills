# Harness Goal Binding for Product Betterment Loops

## Purpose

Many agent harnesses expose a **Goal System** that persists objectives across
turns and can auto-continue after an accidental stop. Continuous product
betterment must use that system when present so the **engagement** is not lost
when a session ends mid-cycle, and so `complete` cannot be claimed without
evidence.

This is **harness recovery + termination gate**, not product Work authority.
Enact (when available) still owns Work/claims/runs; Git owns source; delivery
systems own deploy/live proof. The Goal API status write is **not** an automatic
evidence verifier—the agent must attach a Stop-Audit package in durable
contract/output.

## Outer objective only

The goal `objective` is the **outer engagement** (product outcomes / betterment
north-stars). **Illegal:** setting or completing a goal whose sole meaning is
“finish cycle 3” or “land B8–B10.” Cycle backlogs live in the contract log;
the goal text stays outer until **engagement idle**.

Goal API is a **recovery + terminal gate**, not the motor of the loop. If tools
are missing, **self-loop anyway** until engagement idle.

## Rule: uncapped betterment goals

When the runtime provides goal APIs:

| Step | Action |
| --- | --- |
| Start / resume | `get_goal`. If none or wrong objective, `create_goal` |
| Budget | **Omit budget caps** (for Codex: omit `token_budget`) unless the user explicitly sets a budget |
| Resume | Every cycle/tick begins with `get_goal` and continues the same engagement |
| Complete | Only at **engagement idle** (fresh re-scout B=∅ + R clean + Stop-Audit)—**not** after a single cycle B-clear |
| Blocked | Only after the harness strict blocked audit (repeated hard impasse) |

**Do not** attach a token/time budget “for safety” by default. A budget cap
stops recovery precisely when long betterment needs continuation.

## Objective string contract

The goal `objective` must be self-contained for recovery. Include:

1. **Job:** high-leverage continuous product betterment (not one bug/polish pass)
2. **Product identity:** repo/product/release/surfaces in scope
3. **North-star outcomes (1–3)** and explicit non-goals
4. **Aspect set** / matrix families in scope
5. **EV policy:** MinOutcomeDelta; leverage ranking (not ease-first)
6. **Research:** 5-cell coverage card each cycle; VoI stop; ~70% on Type-2
7. **Loop:** multi-cycle engagement; after each B-clear, re-research next cycle
8. **Definition of Done / engagement idle:** floors fresh; **fresh** card shows
   B=∅; R has no unblocked EV ≥ threshold; verify cadence met on last cycle;
   engagement Stop-Audit passed; wake durable—**not** product perfection, **not**
   “one cycle done”
9. **Validation gates:** per-Work original-oracle; per-cycle outcome readback;
   cycle Stop-Audit after B; engagement Stop-Audit only before goal complete
10. **Contract pointer:** Product Quality Loop Contract revision (B/R live there)
11. **Authority floors:** no meta-router; no invented credentials/deploy
12. **Efficiency:** parallel default for independent B items
13. **Current next safe action** (which cycle, what’s next)
14. **Composition:** `continuous-product-quality`; decision-quality + evidence;
    `autonomous-execution` per Workstream; specialists via native discovery

### Template (adapt; keep compact but complete)

```text
Operate high-leverage continuous product betterment for <PRODUCT/REPO>.
North-star outcomes: <O1..O3>. Aspects: <ASPECTS>. Non-goals: <...>.
Maintain Product Quality Loop Contract <CONTRACT_ID/REV>. Run continuous
multi-cycle betterment: each cycle = coverage card → C → B/R → execute all B →
verify → cycle Stop-Audit → RE-RESEARCH next cycle. Goal STAYS ACTIVE across
cycles. Complete goal ONLY at engagement idle (fresh re-scout B empty + R clean).
Not one-cycle-and-stop; not perfection; not one PR. No token budget. Next: <ACTION>.
```

## Lifecycle

```text
get_goal
  -> missing/mismatch -> create_goal(objective, NO budget)  # engagement
  -> active ->
        run cycle k (card → B → execute → verify → cycle Stop-Audit)
        -> if B was non-empty: leave goal ACTIVE, start cycle k+1 (re-research)
        -> if fresh re-scout B empty and R clean: engagement Stop-Audit
             -> update_goal(complete)
        -> true multi-turn impasse -> update_goal(blocked) only after audit
```

**Critical:**

- `update_goal(complete)` is **illegal** after only clearing B once without a
  subsequent empty re-research pass.
- Emitting a **final user answer** after cycle k while engagement is not idle is
  **illegal** control flow (use durable contract log; continue cycle k+1).
- Do not wait for the harness to “kick” you — open the next cycle yourself.

On a later wake (new signal, owner request, freshness miss):

- if previous goal completed at engagement idle, `create_goal` a new uncapped
  engagement for the same product with updated outcomes;
- do not silently shrink the objective to the last patch;
- capacity splits and multi-cycle work keep the **same engagement/goal**.

## Goal vs reviewer

| Layer | Role |
| --- | --- |
| Goal + Stop-Audit package | Primary termination authority for the engagement |
| Oracles / delivery evidence | Proof Work actually improved the product |
| Independent reviewer | **Exception only:** irreversible/public-contract, load-bearing SOTA claim, contested Stop-Audit |
| Continuous in-loop reviewer | **Forbidden** as default architecture |

## Mapping across harnesses

| Harness capability | Betterment binding |
| --- | --- |
| Explicit Goal API (e.g. Codex `create_goal`/`get_goal`/`update_goal`) | Required when operating this Skill |
| Goal API with optional budget field | Omit budget unless user explicitly requests one |
| No Goal API | Residual noted once; **still multi-cycle self-loop** to engagement idle |
| Enact Work Graph also present | Goal recovers the **loop engagement**; Enact owns individual Work items |

## Anti-patterns

- Creating a goal with a token budget “just in case”
- Completing the goal when one Work lands, CI is green, “a few polishes shipped”,
  or **one cycle B-clear without re-research**
- Objective that only says “improve the product” with no outcomes/idle/EV policy
- Putting the entire frozen mega-list as sole SSOT in the goal with no contract pointer
- Replacing Enact/Git/delivery authority with the harness goal
- Using goal completion to claim the product is perfect or SOTA without claim-grade evidence
- Skipping `get_goal` on resume and starting a narrower ad-hoc task
- Treating Goal API success as proof without Stop-Audit package
- Completing without research coverage card or verify cadence
- Final user turn after each cycle (“Cycle N 報告，要繼續嗎？”) while not idle
- Goal objective rewritten to the cycle backlog alone
- Ending turn on soft-R parking (“B empty, residuals open”) without L0 B slices

## Minimum evidence in Skill output

When a Goal System exists, the operating output must state:

- goal created vs resumed;
- budget omitted (or user-explicit budget, if any);
- active objective digest/summary;
- whether coverage card, B/R summary, verify cadence, and Stop-Audit ran;
- whether the goal remains active, completed at idle frontier, blocked, or
  unavailable.
