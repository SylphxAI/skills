# desktop-os-integration behavior example

skill: desktop-os-integration

## Positive prompt

> Create a macOS and Windows readiness checklist for a desktop AI utility with tray/menu bar, auto-update, backup, and local credentials.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Covers install, update, uninstall, startup, permissions, storage, credentials, files, notifications, and backup.
- Separates macOS, Windows, and shared behavior.

It should also produce the artifact shape requested by `skills/desktop-os-integration/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Improve a mobile daily check-in reward economy.

The skill should not load for this prompt unless the user adds an explicit desktop-os-integration context.

## Expected behavior

- Covers install, update, uninstall, startup, permissions, storage, credentials, files, notifications, and backup.
- Separates macOS, Windows, and shared behavior.
