# account-based-marketing-review behavior example

skill: account-based-marketing-review

## Positive prompt

> Design an ABM program for enterprise SaaS targeting 50 strategic accounts with buying committee mapping, intent signals, executive outreach, SDR plays, events, ads, sales alignment, and attribution.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines target account selection, tiering, buying committee, intent/trigger signals, personalized offers, channel orchestration, sales handoff, suppression rules, and measurement.
- Separates one-to-one, one-to-few, programmatic, expansion, partner, and reactivation ABM motions.
- Flags generic lead-gen labeled ABM, creepy personalization, double-counted attribution, unsupported account targeting, and sales-capacity mismatch.

It should also produce the artifact shape requested by `skills/account-based-marketing-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design admin audit log retention for enterprise customers.

The skill should not load for this prompt unless the user adds an explicit account-based-marketing-review context.

## Expected behavior

- Defines target account selection, tiering, buying committee, intent/trigger signals, personalized offers, channel orchestration, sales handoff, suppression rules, and measurement.
- Separates one-to-one, one-to-few, programmatic, expansion, partner, and reactivation ABM motions.
- Flags generic lead-gen labeled ABM, creepy personalization, double-counted attribution, unsupported account targeting, and sales-capacity mismatch.
