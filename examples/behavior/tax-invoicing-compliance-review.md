# tax-invoicing-compliance-review behavior example

skill: tax-invoicing-compliance-review

## Positive prompt

> Audit tax and invoicing flows for a SaaS with B2B invoices, VAT IDs, refunds, credits, and app-store subscriptions.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Identifies seller/merchant of record, buyer type, jurisdiction, document type, tax metadata, and finance owner.
- Separates receipts, B2B invoices, app-store receipts, marketplace statements, credit notes, and corrections.
- Routes legal/tax decisions to qualified owners and links documents to ledger/reconciliation.

It should also produce the artifact shape requested by `skills/tax-invoicing-compliance-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Plan a feature flag cleanup campaign.

The skill should not load for this prompt unless the user adds an explicit tax-invoicing-compliance-review context.

## Expected behavior

- Identifies seller/merchant of record, buyer type, jurisdiction, document type, tax metadata, and finance owner.
- Separates receipts, B2B invoices, app-store receipts, marketplace statements, credit notes, and corrections.
- Routes legal/tax decisions to qualified owners and links documents to ledger/reconciliation.
