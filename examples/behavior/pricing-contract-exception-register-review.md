# pricing-contract-exception-register-review behavior example

skill: pricing-contract-exception-register-review

## Positive prompt

> Review a pricing contract exception register for enterprise SaaS with custom discounts, credits, payment terms, ramp deals, usage-cap exceptions, grandfathered clauses, invoice mapping, revenue recognition, approvers, expiry dates, and renewal review.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines exception type, standard policy, deviation, approver, margin/revenue impact, contract clause, billing/invoice mapping, expiry, renewal trigger, and cleanup path.
- Separates discounts, credits, free periods, ramps, payment terms, usage caps, minimum commits, price-book exceptions, and grandfathering.
- Flags PDF-only exceptions, margin-blind approvals, perpetual commercial debt, invoice/entitlement/CRM divergence, and renewal surprises.

It should also produce the artifact shape requested by `skills/pricing-contract-exception-register-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review integration sandbox certification.

The skill should not load for this prompt unless the user adds an explicit pricing-contract-exception-register-review context.

## Expected behavior

- Defines exception type, standard policy, deviation, approver, margin/revenue impact, contract clause, billing/invoice mapping, expiry, renewal trigger, and cleanup path.
- Separates discounts, credits, free periods, ramps, payment terms, usage caps, minimum commits, price-book exceptions, and grandfathering.
- Flags PDF-only exceptions, margin-blind approvals, perpetual commercial debt, invoice/entitlement/CRM divergence, and renewal surprises.
