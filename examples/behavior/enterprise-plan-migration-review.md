# enterprise-plan-migration-review behavior example

skill: enterprise-plan-migration-review

## Positive prompt

> Review an enterprise SaaS migration from legacy Pro and custom Enterprise plans into a new packaging model with changed seats, feature gates, usage caps, discounts, invoices, support tiers, and renewal exceptions.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Maps cohorts, contracts, entitlements, billing objects, discounts, invoices, notices, exceptions, and renewal triggers.
- Includes rehearsal, customer communication, support readiness, rollback, post-migration access verification, and revenue checks.
- Flags hidden grandfathering debt, silent feature loss, invoice disputes, spreadsheet entitlement truth, and access/billing mismatches.

It should also produce the artifact shape requested by `skills/enterprise-plan-migration-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design an App Store rejection appeal.

The skill should not load for this prompt unless the user adds an explicit enterprise-plan-migration-review context.

## Expected behavior

- Maps cohorts, contracts, entitlements, billing objects, discounts, invoices, notices, exceptions, and renewal triggers.
- Includes rehearsal, customer communication, support readiness, rollback, post-migration access verification, and revenue checks.
- Flags hidden grandfathering debt, silent feature loss, invoice disputes, spreadsheet entitlement truth, and access/billing mismatches.
