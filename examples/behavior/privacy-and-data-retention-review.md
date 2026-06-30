# privacy-and-data-retention-review behavior example

skill: privacy-and-data-retention-review

## Positive prompt

> Review privacy and retention for a SaaS app with analytics, billing, support tickets, backups, and account deletion.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Maps collection, use, storage, sharing, retention, deletion/export, backups, and disclosures.
- Flags sensitive data, support access, third-party SDKs, and store form consistency.

It should also produce the artifact shape requested by `skills/privacy-and-data-retention-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Optimize Steam capsule art.

The skill should not load for this prompt unless the user adds an explicit privacy-and-data-retention-review context.

## Expected behavior

- Maps collection, use, storage, sharing, retention, deletion/export, backups, and disclosures.
- Flags sensitive data, support access, third-party SDKs, and store form consistency.
