# cost-margin-unit-economics-review behavior example

skill: cost-margin-unit-economics-review

## Positive prompt

> Review unit economics for an AI SaaS plan with inference cost, usage outliers, support burden, refunds, CAC, and gross margin.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies monetization model and separates revenue, variable cost, fixed allocation, gross margin, contribution margin, CAC, retention, and payback.
- Includes payment/platform fees, refunds, support, abuse, AI/cloud cost, partner payouts, and usage outliers.
- Suggests pricing/cost levers with trust guardrails instead of surprise overages or hostile limits.

It should also produce the artifact shape requested by `skills/cost-margin-unit-economics-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Draft an account recovery support script.

The skill should not load for this prompt unless the user adds an explicit cost-margin-unit-economics-review context.

## Expected behavior

- Classifies monetization model and separates revenue, variable cost, fixed allocation, gross margin, contribution margin, CAC, retention, and payback.
- Includes payment/platform fees, refunds, support, abuse, AI/cloud cost, partner payouts, and usage outliers.
- Suggests pricing/cost levers with trust guardrails instead of surprise overages or hostile limits.
