---
name: run-open-product-betterment
description: "Run open product betterment: scout high-EV work, land, re-measure."
---

# Run Open Product Betterment

When product work **mixes** jobs and there is **no single fixed objective**, run
high-leverage betterment on the active workspace until a fresh scout shows no
unblocked high-EV work left (empty high-value frontier—not perfection).

## When to use

- Standing betterment across aspects without one declared outcome bar
- Mixed UI, performance, product, platform, or content improvement

## Host continuity (portable)

Some hosts expose a persistent objective/goal/mission surface.

- **No hard-coded tool names.** Use only the host’s continuity APIs if present.
- If replace is forbidden: do not rewrite the active objective mid-flight.
- If setting an objective when empty is allowed: set a **standing betterment
  contract** (method below), not the latest chat line as the whole goal.
- If no continuity surface: run batches in-process; do not fake a goal store.
- Budgets: host/user only; do not invent caps.

## Backbone

```text
while high-EV unblocked work remains:
  1. Discover product/repo/surfaces and evidence
  2. Scout enough to rank leverage (decision-complete, not omniscient)
  3. Admit every item with material outcome/frontier delta that is runnable now
  4. Implement that full batch (L1)
  5. Atomic commits (L2); revert-safe PR outcome(s) (L3)
  6. Original-oracle verify on touched subjects
  7. Short log; re-scout—do not stop because one PR landed
```

Compose `source-authoring-standard` for Git/PR. Three layers:

| Layer | Meaning here |
| --- | --- |
| **L1** | Batch: all high-EV unblocked items this scout—not Top-1, not a drip sample |
| **L2** | Atomic commits inside each PR |
| **L3** | Each PR is one complete, independently revertible outcome (queue/squash unit) |

Leverage:

`L = (expected_outcome_or_frontier_gap_delta × weight × confidence) / full_lifecycle_cost`

- Soft cost (large/hard) → shippable L0 slice in this batch.
- Park only with evidence: external_wait | authority_pending | dependency_blocked | safety_hold.
- Real capacity limits (tools, auth, safety, true integration saturation) may
  defer a **named** item with reason; preference for “small tidy PRs” is not capacity.
- Prefer tools over essay-only turns.

## Scout checklist

Enough evidence or unknown+reason on:

1. outcomes that matter now  
2. primary journeys/surfaces  
3. quality/competitive anchor  
4. hard floors  
5. highest pains/bets  

Deepen only when it would change what you admit.

## Idle / complete

Mark host complete only after a **fresh** re-scout shows no unblocked item with
material EV remains. That is an empty high-value frontier, not perfection.

One PR, one batch, local green, or “improved a bit” is not idle.

## Depth

[references/product-quality-loop-contract.md](references/product-quality-loop-contract.md)  
[references/harness-goal-binding.md](references/harness-goal-binding.md)
