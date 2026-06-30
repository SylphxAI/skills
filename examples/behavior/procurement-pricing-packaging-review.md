# procurement-pricing-packaging-review behavior example

skill: procurement-pricing-packaging-review

## Positive prompt

> Review enterprise pricing and packaging for a SaaS product with seat tiers, usage commits, add-ons, discounts, order forms, PO/invoice needs, security review, renewal uplift, and true-ups.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines SKU/tier/entitlement/value metric, included limits, add-ons, minimums, commits, overages, services, discount rules, procurement proof, order/billing handoff, and renewal path.
- Includes margin/operational impact, deal-desk controls, security/legal/tax/invoice readiness, quote/order/CRM/billing consistency, and objection tracking.
- Flags bespoke SKU sprawl, hidden overages/uplifts, unapproved discounts, procurement proof gaps, billing unsupported terms, and trust-damaging concessions.

It should also produce the artifact shape requested by `skills/procurement-pricing-packaging-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design incident status page update templates.

The skill should not load for this prompt unless the user adds an explicit procurement-pricing-packaging-review context.

## Expected behavior

- Defines SKU/tier/entitlement/value metric, included limits, add-ons, minimums, commits, overages, services, discount rules, procurement proof, order/billing handoff, and renewal path.
- Includes margin/operational impact, deal-desk controls, security/legal/tax/invoice readiness, quote/order/CRM/billing consistency, and objection tracking.
- Flags bespoke SKU sprawl, hidden overages/uplifts, unapproved discounts, procurement proof gaps, billing unsupported terms, and trust-damaging concessions.
