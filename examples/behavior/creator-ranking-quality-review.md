# creator-ranking-quality-review behavior example

skill: creator-ranking-quality-review

## Positive prompt

> Audit ranking quality for a plugin marketplace with new creators, paid promotion, reviews, installs, retention, and abuse risk.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates eligibility, ranking, editorial featuring, paid promotion, and moderation enforcement.
- Uses quality, relevance, freshness, reliability, retained value, fairness, and abuse-resistant signals.
- Includes creator feedback, appeals, governance cadence, experiments, and user-trust guardrails.

It should also produce the artifact shape requested by `skills/creator-ranking-quality-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design personal theme and notification preferences.

The skill should not load for this prompt unless the user adds an explicit creator-ranking-quality-review context.

## Expected behavior

- Separates eligibility, ranking, editorial featuring, paid promotion, and moderation enforcement.
- Uses quality, relevance, freshness, reliability, retained value, fairness, and abuse-resistant signals.
- Includes creator feedback, appeals, governance cadence, experiments, and user-trust guardrails.
