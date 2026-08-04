---
name: run-open-product-betterment
description: "Run ongoing open product betterment loop (no fixed objective): quality matrix, scout, all high-EV B including UI and performance opportunities, oracle verify; idle at empty high-EV frontier."
---

# Run Open Product Betterment

When product work **mixes** jobs and there is **no single fixed objective**, run
high-leverage betterment cycles on the active workspace.

## When to use

- Mixed betterment across aspects with no fixed outcome bar
- Standing coverage-card / admit-all-high-EV-B loop is the job

Improve the active product/workspace with **high-leverage** changes when work
**mixes** product jobs and there is **no single fixed objective**. Discover state yourself.

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
2. Coverage card / quality matrix — each cell evidence or unknown+reason:
   (a) outcomes that matter now
   (b) primary journeys/surfaces
   (c) quality/competitive anchor or unknown+why
   (d) hard floors
   (e) highest pains/bets
3. Candidates C. L = (expected_outcome_or_frontier_gap_delta × weight × confidence) / full_lifecycle_cost.
4. B = ALL items with EV ≥ MinOutcomeDelta that are runnable now (not Top-1,
   not a small sample). Soft cost → L0 slice into B now.
   Park only with evidence: external_wait | authority_pending | dependency_blocked | safety_hold.
   Capacity is real constraint only—not a preference to drip 1–3 items per cycle.
5. Execute ALL of B this cycle (parallel when independent). Prefer one coherent
   integration unit over many micro-PRs that each re-claim a pass.
6. Verify: original-oracle per item; one outcome readback on touched subjects.
   Local green / commit count / open PR ≠ success.
7. Short log. Do not ask the user to assign the next work.
8. If terminal is false, re-scout and continue; do not mark host objective complete.

Complete the host objective only when a fresh re-scout shows B empty and no residual has unblocked EV ≥ MinOutcomeDelta.
That is an empty high-value frontier, not perfection.
Use host blocked/pause only for true repeated impasse on qualified blockers, per host rules.
Do not replace a fixed continuity objective with a one-item backlog or the latest chat line.
```

Optional after discovery: one-line product pin in working notes—not a host objective rewrite unless the host allows and the objective was empty.

## Rules

- All passers into B each cycle; batch high-EV work—do not drip-feed for tidy commits.
- Soft cost is not a stop; inventing small WIP is not capacity.
- One PR / one cycle / "improved a bit" is not complete.
- Prefer tools over essay-only turns.
- Portable method only—no host tool identifiers in this Skill.

## Depth

[references/product-quality-loop-contract.md](references/product-quality-loop-contract.md)
[references/harness-goal-binding.md](references/harness-goal-binding.md)
