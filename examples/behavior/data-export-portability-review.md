# data-export-portability-review behavior example

skill: data-export-portability-review

## Positive prompt

> Design a SaaS workspace data export and account deletion flow with admin exports, billing records, backups, and support copy.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates export, deletion, backup restore, migration, and legal/privacy request flows.
- Defines requester authority, data classes, formats, delivery, expiry, and retention exceptions.
- Avoids exporting secrets or other users’ private data without authority.

It should also produce the artifact shape requested by `skills/data-export-portability-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Create a product launch narrative for Product Hunt.

The skill should not load for this prompt unless the user adds an explicit data-export-portability-review context.

## Expected behavior

- Separates export, deletion, backup restore, migration, and legal/privacy request flows.
- Defines requester authority, data classes, formats, delivery, expiry, and retention exceptions.
- Avoids exporting secrets or other users’ private data without authority.
