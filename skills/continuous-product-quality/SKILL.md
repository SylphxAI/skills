---
name: continuous-product-quality
description: "Bootstrap product betterment / loop engineering: agent self-sets uncapped Goal containing the full cycle workflow + idle terminal; host Goal continue runs later cycles."
---

# Continuous Product Quality

## What this Skill is

**Bootstrap only.** Humans cannot paste a long operating contract every time.
Invoking this Skill means: **set up your own environment**, then work under it.

| Layer | Owns |
| --- | --- |
| **This Skill** | Start point: agent binds Goal with the full workflow text |
| **Goal objective** | The **real workflow** (re-shown every host continuation) |
| **Host Goal continue** | The **loop** (next turn = next cycle under that Goal) |

After Goal is set, **do not depend on re-reading this Skill** for the loop.
Execute from the **Goal contract**. Complete only when the Goal’s terminal holds.

User invoke is enough, e.g.:

```text
$continuous-product-quality
```

No user project brief. No user-authored north-star essay.

## Bootstrap (do this first)

1. `get_goal`
2. If missing or not the workflow below → `create_goal` with **Goal workflow contract** as `objective`
3. **Omit `token_budget`** unless the user explicitly set one
4. Optionally write a short local state note in-repo; not required for continuation
5. Immediately run **cycle 1** under that Goal (tools, not essays)
6. If terminal not met → leave Goal **active** (host continue = next cycle)
7. If terminal met → evidence Stop-Audit → `update_goal(complete)`

Missing Goal API: residual once; still run the workflow in-process as far as the host allows.

---

## Goal workflow contract

**Put the following block in `create_goal` `objective` (verbatim or strict paraphrase that keeps every rule).**  
This block **is** the loop. Host re-prompt carries it; that is enough.

```text
WORKFLOW: High-leverage product betterment on the active workspace.
You set this Goal; discover product state yourself from the workspace.

EACH HOST TURN = ONE CYCLE:
1. Discover current product/repo/surfaces from the workspace.
2. Research coverage card (5 cells, decision-complete not omniscient):
   (a) outcomes that matter now (b) primary journeys/surfaces
   (c) quality/competitive anchor or unknown+why (d) hard floors
   (e) highest pains/bets. Evidence or unknown+reason each cell.
3. Candidate set C. Score leverage
   L = (expected_outcome_or_frontier_gap_delta × weight × confidence) / full_lifecycle_cost.
4. Admit into B: ALL capacity-feasible items with EV ≥ MinOutcomeDelta (not Top-1 only).
   Soft cost (large/hard/engine/multi-day/not-title-only) → slice L0 into B now.
   Only qualified park: external_wait | authority_pending | dependency_blocked | safety_hold (with evidence).
5. Execute ALL of B. Independent items parallel by default; shared setup once.
6. Verify: original-oracle per B item; one cycle outcome readback on exact subjects.
   Local green / commit count ≠ success.
7. Short log. Do not ask the user to start the next cycle.
8. End turn with Goal still active unless TERMINAL holds. Host continue starts the next cycle.
   Prefer tool work every turn; essay-only turns risk stopping auto-continue.

TERMINAL — only then update_goal(complete):
After a FRESH re-scout, B is empty AND no residual has unblocked EV ≥ MinOutcomeDelta.
This is an idle high-value frontier, NOT product perfection (perfection does not exist).
One cycle done / one PR / progress report / “improved a bit” is NOT terminal.

BLOCKED: only per harness rules for true repeated impasse on qualified blockers.
Never rewrite this Goal into a single-cycle task list.
No default token budget.
```

---

## Bootstrap anti-patterns

- Treating this Skill body as the ongoing loop motor after Goal exists
- Asking the user to type the workflow or north-stars
- Completing Goal after cycle 1
- Putting a tiny backlog in Goal instead of the workflow contract
- Default `token_budget`
- Automation-first on hosts where Goal continue works

## When not to bootstrap this

- One bug / one-shot → fix directly / `autonomous-execution`
- Single release finish pass → `product-finish`

## Optional deeper fields

Only if needed mid-work (not required to start):  
[references/product-quality-loop-contract.md](references/product-quality-loop-contract.md)
