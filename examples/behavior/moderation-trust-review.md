# moderation-trust-review behavior example

skill: moderation-trust-review

## Positive prompt

> Design moderation and appeal flows for a public plugin marketplace with creator submissions.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates content state, visibility, enforcement, appeal, evidence, and policy ownership.
- Uses queue types and enforcement ladders instead of one-size-fits-all bans.
- Includes metrics for false positives, false negatives, queue age, appeals, and trust impact.

It should also produce the artifact shape requested by `skills/moderation-trust-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Write a SaaS pricing page headline.

The skill should not load for this prompt unless the user adds an explicit moderation-trust-review context.

## Expected behavior

- Separates content state, visibility, enforcement, appeal, evidence, and policy ownership.
- Uses queue types and enforcement ladders instead of one-size-fits-all bans.
- Includes metrics for false positives, false negatives, queue age, appeals, and trust impact.
