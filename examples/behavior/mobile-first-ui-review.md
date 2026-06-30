# mobile-first-ui-review behavior example

skill: mobile-first-ui-review

## Positive prompt

> Review this mobile onboarding and subscription flow for one-handed usability and trust.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Audits reachability, safe areas, inputs, loading, offline, settings, and permission timing.
- Uses rule IDs and separates blockers from polish.

It should also produce the artifact shape requested by `skills/mobile-first-ui-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a Postgres schema for audit logs.

The skill should not load for this prompt unless the user adds an explicit mobile-first-ui-review context.

## Expected behavior

- Audits reachability, safe areas, inputs, loading, offline, settings, and permission timing.
- Uses rule IDs and separates blockers from polish.
