# marketplace-quality-scoring-review behavior example

skill: marketplace-quality-scoring-review

## Positive prompt

> Design marketplace quality scoring for an AI skill marketplace with listing completeness, eval results, reviews, installs, support burden, freshness, moderation, ranking boosts, badges, appeals, and anti-gaming controls.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines quality dimensions, scoring inputs, thresholds, confidence, eligibility/ranking/badge actions, anti-gaming controls, explanations, appeals, fairness, and monitoring.
- Includes reviews, usage success, refunds/disputes, support burden, moderation, freshness, expert audit, cold-start, and category normalization.
- Flags opaque punishment, engagement/revenue over quality, incumbent lock-in, biased signals, review manipulation, and no appeal path.

It should also produce the artifact shape requested by `skills/marketplace-quality-scoring-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review API versioning deprecation.

The skill should not load for this prompt unless the user adds an explicit marketplace-quality-scoring-review context.

## Expected behavior

- Defines quality dimensions, scoring inputs, thresholds, confidence, eligibility/ranking/badge actions, anti-gaming controls, explanations, appeals, fairness, and monitoring.
- Includes reviews, usage success, refunds/disputes, support burden, moderation, freshness, expert audit, cold-start, and category normalization.
- Flags opaque punishment, engagement/revenue over quality, incumbent lock-in, biased signals, review manipulation, and no appeal path.
