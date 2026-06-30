# backup-restore-design behavior example

skill: backup-restore-design

## Positive prompt

> Design backup and restore for a SaaS project management product.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies data types and durability needs.
- Defines RPO/RTO, restore states, conflicts, export, and support tooling.
- Treats restore drills as required, not optional.

It should also produce the artifact shape requested by `skills/backup-restore-design/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Make this landing page copy punchier.

The skill should not load for this prompt unless the user adds an explicit backup-restore-design context.

## Expected behavior

- Classifies data types and durability needs.
- Defines RPO/RTO, restore states, conflicts, export, and support tooling.
- Treats restore drills as required, not optional.
