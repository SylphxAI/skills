# windows-release-readiness behavior example

skill: windows-release-readiness

## Positive prompt

> Audit this Windows tray app installer and auto-update plan before launch.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring trust, support, and long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Covers Windows installer identity, signing, reputation, privilege, startup/services, registry/file associations, updates, uninstall, and diagnostics.
- Separates blockers from enterprise/admin polish and support improvements.
- Requires user-controllable background behavior and safe uninstall/update recovery.

It should also produce the artifact shape requested by `skills/windows-release-readiness/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a Steam wishlist campaign.

The skill should not load for this prompt unless the user adds an explicit windows-release-readiness context.

## Expected behavior

- Covers Windows installer identity, signing, reputation, privilege, startup/services, registry/file associations, updates, uninstall, and diagnostics.
- Separates blockers from enterprise/admin polish and support improvements.
- Requires user-controllable background behavior and safe uninstall/update recovery.
