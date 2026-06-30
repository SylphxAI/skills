# release-health-dashboard-review behavior example

skill: release-health-dashboard-review

## Positive prompt

> Design a release health dashboard and rollback gates for a mobile app staged rollout with payments and onboarding risk.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates build/deploy success from real user health, business health, support, and channel status.
- Defines metrics with baselines, segments, thresholds, owners, and actions.
- Includes hold, rollback, hotfix, communication, and post-release review gates.

It should also produce the artifact shape requested by `skills/release-health-dashboard-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a referral reward program.

The skill should not load for this prompt unless the user adds an explicit release-health-dashboard-review context.

## Expected behavior

- Separates build/deploy success from real user health, business health, support, and channel status.
- Defines metrics with baselines, segments, thresholds, owners, and actions.
- Includes hold, rollback, hotfix, communication, and post-release review gates.
