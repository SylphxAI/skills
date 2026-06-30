# game-economy-review behavior example

skill: game-economy-review

## Positive prompt

> Review a mobile puzzle game economy with daily rewards, rewarded ads, IAP bundles, refunds, and live events.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Maps currencies, sources, sinks, offers, events, refunds, and abuse risks.
- Balances monetization with fairness, trust, and live-ops measurement.

It should also produce the artifact shape requested by `skills/game-economy-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Create a desktop installer checklist.

The skill should not load for this prompt unless the user adds an explicit game-economy-review context.

## Expected behavior

- Maps currencies, sources, sinks, offers, events, refunds, and abuse risks.
- Balances monetization with fairness, trust, and live-ops measurement.
