---
name: select-next-work
description: Select and claim the next high-value work item from current product and repository state. Use when the user wants the agent to choose what to do next from an existing backlog or open opportunity set.
---

# Select Next Work

Choose the valuable feasible node or node set that can materially advance now.

## Method

1. Identify the authoritative Active/Standby lifecycle, coverage evidence, current admitted claims, available capacity, and claim mechanism. Active means continuous betterment duty plus current coverage evidence, not a scheduler cell.
2. Inspect current user impact, incidents, dependencies, deadlines, strategic outcomes, and recently completed work.
3. Combine duplicates into this-tick admission proposals. Do not create a scout because truth is Unknown. Scout only with named actions A/B and observation O that would select, cancel, or recut A/B. Unadmitted candidates are not durable scheduler state.
4. Compare **admitted** and proposed nodes using direct product value, urgency, dependency leverage, feasibility, reversibility, and likely completion cost.
5. For one Worker, select the strongest feasible admitted node. For an Owner dispatch, select the highest-value conflict-free, capacity-feasible subset of admitted ready nodes. Use no fixed worker quota; apply downstream backpressure and age/staleness among admitted nodes only.
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
