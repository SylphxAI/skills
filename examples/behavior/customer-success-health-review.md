# customer-success-health-review behavior example

skill: customer-success-health-review

## Positive prompt

> Build a customer health score and renewal risk playbook for a B2B SaaS with onboarding, support, and usage data.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates activation, adoption, outcome, sentiment, support load, renewal risk, and expansion readiness.
- Maps each health state to an owner action and proof of recovery.
- Calls out data quality gaps instead of pretending every account can be scored.

It should also produce the artifact shape requested by `skills/customer-success-health-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Create a Steam capsule art checklist.

The skill should not load for this prompt unless the user adds an explicit customer-success-health-review context.

## Expected behavior

- Separates activation, adoption, outcome, sentiment, support load, renewal risk, and expansion readiness.
- Maps each health state to an owner action and proof of recovery.
- Calls out data quality gaps instead of pretending every account can be scored.
