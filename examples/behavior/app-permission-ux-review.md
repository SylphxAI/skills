# app-permission-ux-review behavior example

skill: app-permission-ux-review

## Positive prompt

> Audit permission UX for a mobile app that asks for notifications, location, camera, and photo library access.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Maps each permission to value moment, data use, fallback, denial recovery, settings path, and review risk.
- Avoids cold-start permission spam and coercive re-prompting.
- Covers sensitive permissions such as tracking, contacts, background location, notifications, camera, and photos.

It should also produce the artifact shape requested by `skills/app-permission-ux-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Create a billing reconciliation ledger table.

The skill should not load for this prompt unless the user adds an explicit app-permission-ux-review context.

## Expected behavior

- Maps each permission to value moment, data use, fallback, denial recovery, settings path, and review risk.
- Avoids cold-start permission spam and coercive re-prompting.
- Covers sensitive permissions such as tracking, contacts, background location, notifications, camera, and photos.
