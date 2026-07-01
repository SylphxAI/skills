# lifecycle-pricing-experiment-review behavior example

skill: lifecycle-pricing-experiment-review

## Positive prompt

> Design a lifecycle pricing experiment for a SaaS product testing annual upgrade discounts, renewal save offers, usage-threshold upgrade prompts, holdouts, billing QA, margin guardrails, and support handling.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines lifecycle stage, hypothesis, eligibility, variants, holdouts, billing QA, revenue metrics, retention metrics, and stop conditions.
- Includes invoice, tax, entitlement, proration, refund, support, customer messaging, and readout requirements.
- Flags conversion-only optimization, unfair pricing exposure, unverifiable billing, cohort overrides, and trust-damaging offers.

It should also produce the artifact shape requested by `skills/lifecycle-pricing-experiment-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review a data deletion runbook.

The skill should not load for this prompt unless the user adds an explicit lifecycle-pricing-experiment-review context.

## Expected behavior

- Defines lifecycle stage, hypothesis, eligibility, variants, holdouts, billing QA, revenue metrics, retention metrics, and stop conditions.
- Includes invoice, tax, entitlement, proration, refund, support, customer messaging, and readout requirements.
- Flags conversion-only optimization, unfair pricing exposure, unverifiable billing, cohort overrides, and trust-damaging offers.
