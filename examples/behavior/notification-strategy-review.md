# notification-strategy-review behavior example

skill: notification-strategy-review

## Positive prompt

> Design notification strategy for a mobile game with daily rewards, promos, and support-safe refund messages.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Builds a taxonomy by channel, consent, frequency, and user value.
- Includes quiet hours, preferences, event schema, and negative-signal metrics.

It should also produce the artifact shape requested by `skills/notification-strategy-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Create a pricing plan table.

The skill should not load for this prompt unless the user adds an explicit notification-strategy-review context.

## Expected behavior

- Builds a taxonomy by channel, consent, frequency, and user value.
- Includes quiet hours, preferences, event schema, and negative-signal metrics.
