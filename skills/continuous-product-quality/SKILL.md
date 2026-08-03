---
name: continuous-product-quality
description: "High-leverage product betterment: coverage card, admit all B, execute, verify; continue until no unblocked high-EV work remains."
---

# Continuous Product Quality

Improve the active product/workspace with **high-leverage** changes. Discover state yourself.

When the work is clearly one kind of product job, prefer that Skill for the
cycle: `prototype-product`, `build-product`, `maintain-product`,
`expand-product`, `product-finish`. Use this Skill when betterment mixes those
jobs or has no single job kind.


## Continuity (host-defined)

Some hosts expose a **persistent objective / goal / mission** surface. Rules:

- **Do not hardcode tool names.** Use only the host’s documented continuity APIs and names.
- **Do not invent** create/replace/update if the host does not expose them.
- If the host **forbids replace** (e.g. only complete / pause / block): never try to rewrite the objective mid-flight; keep working under the active objective or stop per host rules.
- If the host allows setting an objective **once** when empty: set it to the **cycle contract** below (fixed text). Do not inject the latest user message as the whole objective.
- If no continuity surface exists: run cycles in-process; do not fake a goal store.
- Budgets: follow host defaults and user-set limits only; do not invent budget fields.

The cycle contract is **method text**, not a call to a named tool.

## Cycle contract

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
8. If terminal is false, do not mark the host objective complete.

Complete the host objective only when a fresh re-scout shows B empty and no residual has unblocked EV ≥ MinOutcomeDelta.
That is an empty high-value frontier, not perfection.
Use host blocked/pause only for true repeated impasse on qualified blockers, per host rules.
Do not replace a fixed continuity objective with a one-item backlog or the latest chat line.
```

Optional after discovery: one-line product pin in working notes—not a host objective rewrite unless the host allows and the objective was empty.

## Rules

- All passers into B each cycle; leverage over ease.
- Soft cost is not a stop.
- One PR / one cycle / "improved a bit" is not complete.
- Prefer tools over essay-only turns.
- Portable method only—no Codex/Spiron/Claude tool identifiers in this Skill.

## Out of scope

- Single bugfix → fix directly / `autonomous-execution`
- One release-grade finish pass → `product-finish`

## Depth

[references/product-quality-loop-contract.md](references/product-quality-loop-contract.md)
[references/harness-goal-binding.md](references/harness-goal-binding.md)
