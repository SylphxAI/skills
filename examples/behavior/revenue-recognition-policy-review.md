# revenue-recognition-policy-review behavior example

skill: revenue-recognition-policy-review

## Positive prompt

> Review revenue-recognition impact for a SaaS packaging change with annual prepaid credits, usage overages, onboarding fees, discounts, upgrades, refunds, and contract amendments.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates invoice, payment, entitlement, delivery, usage consumption, and revenue recognition records.
- Includes performance obligations, delivery evidence, refund/credit terms, contract modifications, exception approvals, ledger reconciliation, and finance launch gates.
- Flags invoice-date recognition, hidden side letters, unreviewed bundles/credits, unsupported accounting claims, and revenue drift.

It should also produce the artifact shape requested by `skills/revenue-recognition-policy-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a customer reference program for enterprise sales.

The skill should not load for this prompt unless the user adds an explicit revenue-recognition-policy-review context.

## Expected behavior

- Separates invoice, payment, entitlement, delivery, usage consumption, and revenue recognition records.
- Includes performance obligations, delivery evidence, refund/credit terms, contract modifications, exception approvals, ledger reconciliation, and finance launch gates.
- Flags invoice-date recognition, hidden side letters, unreviewed bundles/credits, unsupported accounting claims, and revenue drift.
