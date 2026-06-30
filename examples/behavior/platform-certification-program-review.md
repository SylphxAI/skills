# platform-certification-program-review behavior example

skill: platform-certification-program-review

## Positive prompt

> Design a certification program for marketplace plugins with eligibility, quality tests, badges, renewal, appeals, revocation, and directory effects.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines certification promise, scope, criteria, evidence, tests, reviewers, thresholds, and renewal cadence.
- Separates paid tiers, editorial featuring, ranking, and quality certification while defining badge meaning and expiry.
- Includes audit, appeal, revocation, restoration, partner enablement, and customer-trust metrics.

It should also produce the artifact shape requested by `skills/platform-certification-program-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design service-level SLOs for an API.

The skill should not load for this prompt unless the user adds an explicit platform-certification-program-review context.

## Expected behavior

- Defines certification promise, scope, criteria, evidence, tests, reviewers, thresholds, and renewal cadence.
- Separates paid tiers, editorial featuring, ranking, and quality certification while defining badge meaning and expiry.
- Includes audit, appeal, revocation, restoration, partner enablement, and customer-trust metrics.
