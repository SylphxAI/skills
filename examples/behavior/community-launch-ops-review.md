# community-launch-ops-review behavior example

skill: community-launch-ops-review

## Positive prompt

> Design launch operations for a developer tool community with Discord channels, beta feedback, support routing, moderation, events, and health metrics.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines community purpose, platform, channels, roles, moderation, support routing, feedback loops, events, and owner coverage.
- Separates community, support, marketing, beta, creator, and advocacy jobs.
- Measures health with retained contribution, helpfulness, signal quality, moderation load, response time, and safety incidents.

It should also produce the artifact shape requested by `skills/community-launch-ops-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design an A/B test for a checkout button.

The skill should not load for this prompt unless the user adds an explicit community-launch-ops-review context.

## Expected behavior

- Defines community purpose, platform, channels, roles, moderation, support routing, feedback loops, events, and owner coverage.
- Separates community, support, marketing, beta, creator, and advocacy jobs.
- Measures health with retained contribution, helpfulness, signal quality, moderation load, response time, and safety incidents.
