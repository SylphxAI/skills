---
name: select-next-work
description: Select and claim the next high-value work item from current product and repository state. Use when the user wants the agent to choose what to do next from an existing backlog or open opportunity set.
---

# Select Next Work

Choose one bounded outcome that can materially advance now.

## Method

1. Identify the authoritative backlog, product state, active commitments, available capacity, and claim mechanism.
2. Inspect current user impact, incidents, dependencies, deadlines, strategic outcomes, and recently completed work.
3. Combine duplicate items and express each candidate as an independently useful outcome.
4. Compare candidates using direct product value, urgency, dependency leverage, feasibility, reversibility, and likely completion cost.
5. Select the strongest unblocked candidate that fits current capacity. Explain the decisive reasons in plain language.
6. Claim it through the team's existing tracker when claim authority is available.
7. Classify the work and hand one writer to one write set, or one review or repair slice to its owner. Do not put two implementers on the same write set.

Open [work coordination](references/work-coordination/METHOD.md) when
dispatching labor that would wait on CI or own an outcome end-to-end.
Labor law: `SylphxAI/owner` `decisions/ADR-009-IMPLEMENT-TO-PR.md`
revision `2026-08-17.2`. Causal chain stays until un-advanceable;
independent slice keeps going on a free write set. Publish a pull
request for visibility. Return only if you would sit.

## Output

Return:

- selected outcome;
- why it is the best current choice;
- owning product or repository;
- relevant dependencies and constraints;
- claim state; and
- immediate next action.

Repeat the method from fresh state whenever another selection is requested.
