# changelog-and-release-notes behavior example

skill: changelog-and-release-notes

## Positive prompt

> Write release notes for a SaaS pricing and API change with migration and support implications.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates public notes, technical changelog, store notes, and support notes.
- Calls out breaking changes, action required, support routes, and security/privacy constraints.

It should also produce the artifact shape requested by `skills/changelog-and-release-notes/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a store listing screenshot sequence.

The skill should not load for this prompt unless the user adds an explicit changelog-and-release-notes context.

## Expected behavior

- Separates public notes, technical changelog, store notes, and support notes.
- Calls out breaking changes, action required, support routes, and security/privacy constraints.
