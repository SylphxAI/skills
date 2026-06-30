# game-soft-launch-review behavior example

skill: game-soft-launch-review

## Positive prompt

> Plan a mobile game soft launch with test markets, FTUE, retention, IAP, rewarded ads, economy, crashes, and scale gates.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines segmented gate metrics across retention, session quality, economy, IAP, ads, crashes, store conversion, support, and sentiment.
- Separates product learning, monetization, technical readiness, acquisition quality, and listing tests.
- Produces scale, iterate, hold, or kill decisions with caveats and player-trust guardrails.

It should also produce the artifact shape requested by `skills/game-soft-launch-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Prepare security questionnaire answers for an enterprise buyer.

The skill should not load for this prompt unless the user adds an explicit game-soft-launch-review context.

## Expected behavior

- Defines segmented gate metrics across retention, session quality, economy, IAP, ads, crashes, store conversion, support, and sentiment.
- Separates product learning, monetization, technical readiness, acquisition quality, and listing tests.
- Produces scale, iterate, hold, or kill decisions with caveats and player-trust guardrails.
