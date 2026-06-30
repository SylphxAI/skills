# billing-reconciliation-review behavior example

skill: billing-reconciliation-review

## Positive prompt

> Design billing reconciliation for a SaaS with Stripe subscriptions, invoices, credits, refunds, entitlements, and support adjustments.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates order, payment, invoice, ledger, entitlement, tax, refund, dispute, and payout states.
- Defines reconciliation keys, invariants, mismatch classes, exception queue, repair actions, and audit evidence.
- Connects billing mismatches to support timelines and customer access impact.

It should also produce the artifact shape requested by `skills/billing-reconciliation-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Plan a localization launch for a new language.

The skill should not load for this prompt unless the user adds an explicit billing-reconciliation-review context.

## Expected behavior

- Separates order, payment, invoice, ledger, entitlement, tax, refund, dispute, and payout states.
- Defines reconciliation keys, invariants, mismatch classes, exception queue, repair actions, and audit evidence.
- Connects billing mismatches to support timelines and customer access impact.
