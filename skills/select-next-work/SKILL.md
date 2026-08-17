---
name: select-next-work
description: Select and claim the next high-value work item from current product and repository state. Use when the user wants the agent to choose what to do next from an existing backlog or open opportunity set.
---

# Select Next Work

Choose the valuable feasible node or node set that can materially advance now.

## Method

1. Identify the authoritative Active/Standby lifecycle, product frontiers, current claims, available capacity, and claim mechanism. Active products remain enrolled even when no Worker is resident.
2. Inspect current user impact, incidents, dependencies, deadlines, strategic outcomes, and recently completed work.
3. Combine duplicate items and express each candidate as an independently terminal node. For an Active product with unknown or stale truth, create a bounded scout candidate instead of treating the product as dark or complete.
4. Compare candidates using direct product value, urgency, dependency leverage, feasibility, reversibility, and likely completion cost.
5. For one Worker, select the strongest feasible node. For an Owner dispatch, select the highest-value conflict-free, capacity-feasible subset across all Active-product frontiers. Use no fixed worker quota; apply downstream backpressure and age/staleness among otherwise comparable nodes.
6. Claim the selected node or complete set atomically through the team's existing mechanism when claim authority is available.
7. Hand one Worker to one claimed node and one write/effect set. Do not put two implementers on the same mutation surface or assign a resident Worker merely because a product is Active.

Open [work coordination](references/work-coordination/METHOD.md) when
dispatching labor that would wait on CI or own an outcome end-to-end.
Labor law: `SylphxAI/owner` `decisions/ADR-012-CONCISE-OWNER.md`.
The default implementation terminal is pull request submitted with the named
local oracle. CI, review, merge, deploy, and live readback are event-triggered
later nodes; the Worker returns instead of waiting.

## Output

Return:

- selected node or feasible node set;
- why it is the best current choice;
- owning product or repository;
- relevant dependencies and constraints;
- claim state; and
- immediate next action.

Repeat the method from fresh state whenever another selection is requested.
