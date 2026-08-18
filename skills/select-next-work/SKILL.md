---
name: select-next-work
description: Select and claim the next high-value work item from current product and repository state. Use when the user wants the agent to choose what to do next from an existing backlog or open opportunity set.
---

# Select Next Work

Choose the valuable feasible node or node set that can advance now.

## Method

1. Read Owner `PORTFOLIO.md` (Active/Standby), `DASHBOARD.md` (current
   nodes), and the product `docs/prd.md` Capability IDs. Do not invent
   a second graph.
2. Inspect current user impact, incidents, and real dependencies.
3. Form nodes from named capabilities. Do not create a scout because a
   product is Unknown. A scout exists only with two mutually exclusive
   actions A/B and an observation O that would select, cancel, or recut
   one of them.
4. Lock a shared contract before two repos implement the same interface.
   One Worker per write-set. Integration is a later node.
5. Run **every** ready node whose write-set is free. No 1-product-1-agent
   rule. No headcount cap. JIT only blocks nodes that need official
   runners.
6. Claim through the existing mechanism when one exists. Default Worker
   terminal is implement-to-PR. Return. Do not poll CI.

Labor law: `SylphxAI/owner` `decisions/ADR-012-CONCISE-OWNER.md`.
Depth: [work coordination](references/work-coordination/METHOD.md).

## Output

- selected node or ready set
- Capability ID and owning repo
- write-set and real dependencies
- claim / PR locator
- next event if the Worker returned
