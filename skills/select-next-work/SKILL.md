---
name: select-next-work
description: Select and claim the next high-value work item from current product and repository state. Use when the user wants the agent to choose what to do next from an existing backlog or open opportunity set.
---

# Select Next Work

Choose one bounded outcome that can materially advance now.

## When to use

- The user asks what to do next, or to pick from an existing backlog
- Queue, issues, PRs, or a project ledger already exist

If the current repository is the Sylphx Owner notebook, open that
repo's project skill `run-owner-tick` instead.

## Method

1. Identify the authoritative backlog, product state, active commitments, available capacity, and claim mechanism.
2. Inspect current user impact, incidents, dependencies, deadlines, strategic outcomes, and recently completed work.
3. Combine duplicate items and express each candidate as an independently useful outcome.
4. Compare candidates using direct product value, urgency, dependency leverage, feasibility, reversibility, and likely completion cost.
5. Select the strongest unblocked candidate that fits current capacity. Explain the decisive reasons in plain language.
6. Claim it through the team's existing tracker when claim authority is available.
7. Hand the accepted item to the appropriate implementation or delivery skill.

## Output

Return:

- selected outcome;
- why it is the best current choice;
- owning product or repository;
- relevant dependencies and constraints;
- claim state; and
- immediate next action.

Repeat the method from fresh state whenever another selection is requested.

## Boundaries

- Do not invent a second graph, coverage table, or company ledger
- Do not encode one organization's titles, dashboard files, or CI
  topology as universal method
