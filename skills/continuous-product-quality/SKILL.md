---
name: continuous-product-quality
description: "Bootstrap product betterment / loop engineering: agent self-sets uncapped Goal with per-cycle workflow + idle terminal; host Goal continue re-injects that cycle task."
---

# Continuous Product Quality

## What this Skill is

**Bootstrap only.** Human invoke is the start point so the agent can install a
durable Goal. The **loop is not this Skill** — it is **host Goal continuation**
re-injecting the Goal objective each turn.

| Layer | Owns |
| --- | --- |
| This Skill | One-time setup: `create_goal` with the cycle contract |
| Goal objective | **Per-turn work** (what to do this cycle + when complete) |
| Host continue | Next turn = next cycle under the same Goal |

User:

```text
$continuous-product-quality
```

---

## Bootstrap (once per engagement — NOT part of Goal text)

Run only when binding / repairing Goal. **Do not put this block in the Goal.**

1. `get_goal`
2. If missing or objective is not this cycle contract → `create_goal`  
   - `objective` = **Goal cycle contract** below  
   - **Omit `token_budget`** (uncapped) unless the user explicitly set a budget  
3. Do **not** recreate Goal every cycle. Resume if the same contract is already active.
4. Discover product/repo from the workspace yourself (no user brief required).
5. Run the cycle contract as turn 1. Leave Goal active unless terminal holds.
6. Missing Goal API: note residual once; still run the cycle contract in-process.

---

## Goal cycle contract

**This is the only text for `create_goal` `objective`.**  
It is re-read every host turn → write it as **orders for this turn**, not bootstrap meta.

```text
High-leverage product betterment on the active workspace. Discover product state from the workspace; do not wait for a user brief.

THIS TURN = one cycle:
1. Discover current product/repo/surfaces and evidence.
2. Coverage card (decision-complete, not omniscient) — each cell evidence or unknown+reason:
   (a) outcomes that matter now
   (b) primary journeys/surfaces
   (c) quality/competitive anchor or unknown+why
   (d) hard floors
   (e) highest pains/bets
3. Build candidate set C. Leverage
   L = (expected_outcome_or_frontier_gap_delta × weight × confidence) / full_lifecycle_cost.
4. Admit B = ALL capacity-feasible items with EV ≥ MinOutcomeDelta (not Top-1 only).
   Soft cost (large/hard/engine/multi-day) → slice shippable L0 into B now.
   Park only with evidence: external_wait | authority_pending | dependency_blocked | safety_hold.
5. Execute ALL of B. Independent items parallel by default; shared setup once.
6. Verify: original-oracle per B item; one outcome readback on the subjects you touched.
   Local green / commit count ≠ success.
7. Short log. Do not ask the user to start more work.
8. If TERMINAL is false: keep working with tools this turn as far as useful, then end without completing the Goal.
   Prefer tools over essay-only ends.

TERMINAL — only then mark Goal complete:
After a FRESH re-scout this turn, B is empty AND no residual has unblocked EV ≥ MinOutcomeDelta.
Idle frontier ≠ product perfection. One PR / one cycle / “improved a bit” ≠ complete.

BLOCKED — only after harness blocked rules on a true repeated impasse with a qualified blocker above.
Do not shrink this objective into a one-item backlog.
```

Optional one-line **product pin** may be appended after discovery (e.g. repo name + surfaces).  
Do not replace the contract with a cycle backlog list.

---

## Why Goal text is shaped this way

| In Goal (every turn) | Not in Goal (bootstrap only) |
| --- | --- |
| What to do this cycle | `create_goal` / `get_goal` procedure |
| Admit / execute / verify rules | “Omit token_budget” / uncapped policy |
| Terminal / blocked | “You set this Goal” / “host continue = loop” |
| Discover workspace | “Never recreate Goal each cycle” |

The agent mid-engagement may **not** remember Skill bootstrap. Goal must stand alone as **this-turn instructions + stop rule**. Host already handles multi-turn; Goal does not need to explain the macro loop.

---

## Anti-patterns

- Putting bootstrap/API hygiene into Goal objective
- Recreating Goal every cycle
- Completing after one productive cycle
- Asking the user for north-stars to start
- Essay-only turns with no tools

## When not to use

- One bug / one-shot → direct fix / `autonomous-execution`
- Single release finish → `product-finish`

## Optional depth

[references/product-quality-loop-contract.md](references/product-quality-loop-contract.md)
