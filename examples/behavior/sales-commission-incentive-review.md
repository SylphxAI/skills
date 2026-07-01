# sales-commission-incentive-review behavior example

skill: sales-commission-incentive-review

## Positive prompt

> Review a sales commission plan for enterprise SaaS with new-logo quota, expansion credit, renewal ownership, accelerators, clawbacks, discount guardrails, partner conflict, and multi-year usage commits.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines commissionable event, source of truth, eligible roles, deal types, payout timing, quota credit, exception approval, disputes, clawbacks, and finance reconciliation.
- Includes guardrails for discounting, margin, customer fit, contract exceptions, payment terms, support burden, early churn, and channel conflict.
- Flags incentives that reward bad-fit customers, inflated commits, unsupported terms, spreadsheet payout truth, and short-term behavior over retention.

It should also produce the artifact shape requested by `skills/sales-commission-incentive-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a data deletion erasure workflow.

The skill should not load for this prompt unless the user adds an explicit sales-commission-incentive-review context.

## Expected behavior

- Defines commissionable event, source of truth, eligible roles, deal types, payout timing, quota credit, exception approval, disputes, clawbacks, and finance reconciliation.
- Includes guardrails for discounting, margin, customer fit, contract exceptions, payment terms, support burden, early churn, and channel conflict.
- Flags incentives that reward bad-fit customers, inflated commits, unsupported terms, spreadsheet payout truth, and short-term behavior over retention.
