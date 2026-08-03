---
name: continuous-product-quality
description: "High-leverage product betterment: coverage card, admit all B, execute, verify; uncapped Goal with per-cycle contract until no unblocked high-EV work remains."
---

# Continuous Product Quality

Improve the active product/workspace with **high-leverage** changes. Discover state yourself.

## Start

1. `get_goal`. If missing or wrong, `create_goal` with the **Goal objective** below. Omit `token_budget` unless the user set one. Do not recreate every cycle.
2. Run the cycle. Keep the Goal active until terminal.

## Goal objective

```text
High-leverage product betterment on the active workspace. Discover product state from the workspace.

This turn:
1. Discover product/repo/surfaces and evidence.
2. Coverage card — each cell evidence or unknown+reason:
   (a) outcomes that matter now
   (b) primary journeys/surfaces
   (c) quality/competitive anchor or unknown+why
   (d) hard floors
   (e) highest pains/bets
3. Candidates C. L = (expected_outcome_or_frontier_gap_delta × weight × confidence) / full_lifecycle_cost.
4. B = all capacity-feasible items with EV ≥ MinOutcomeDelta (not Top-1).
   Soft cost (large/hard/engine/multi-day) → L0 slice into B.
   Park only with evidence: external_wait | authority_pending | dependency_blocked | safety_hold.
5. Execute all of B (parallel when independent).
6. Verify: original-oracle per item; one outcome readback on touched subjects.
   Local green / commit count ≠ success.
7. Short log. Do not ask the user to assign the next work.
8. If terminal is false, do not complete the Goal.

Complete only when a fresh re-scout shows B empty and no residual has unblocked EV ≥ MinOutcomeDelta.
That is an empty high-value frontier, not perfection.
Blocked only after harness rules on a repeated qualified impasse.
Do not replace this objective with a one-item backlog.
```

Optional: append one line naming the discovered product/surfaces after bind.

## Rules

- All passers into B each cycle; leverage over ease.
- Soft cost is not a stop.
- One PR / one cycle / "improved a bit" is not complete.
- Prefer tools over essay-only turns.

## Out of scope

- Single bugfix → fix directly / `autonomous-execution`
- One release-grade finish pass → `product-finish`

## Depth

[references/product-quality-loop-contract.md](references/product-quality-loop-contract.md)
