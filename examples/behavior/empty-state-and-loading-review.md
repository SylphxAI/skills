# empty-state-and-loading-review behavior example

skill: empty-state-and-loading-review

## Positive prompt

> Review empty, loading, offline, and error states for a SaaS dashboard.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies the state type before prescribing UI.
- Includes copy, action, accessibility, layout stability, recovery, and event checks.

It should also produce the artifact shape requested by `skills/empty-state-and-loading-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a subscription entitlement ledger.

The skill should not load for this prompt unless the user adds an explicit empty-state-and-loading-review context.

## Expected behavior

- Classifies the state type before prescribing UI.
- Includes copy, action, accessibility, layout stability, recovery, and event checks.
