# macos-release-readiness behavior example

skill: macos-release-readiness

## Positive prompt

> Audit this macOS menu bar utility before public release.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring trust, support, and long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Covers macOS identity, signing, notarization, sandbox, permissions, local data, keychain, updates, and diagnostics.
- Separates blockers from polish and support improvements.
- Requires user-controllable background/login behavior and safe update recovery.

It should also produce the artifact shape requested by `skills/macos-release-readiness/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Plan a Google Play subscription renewal experiment.

The skill should not load for this prompt unless the user adds an explicit macos-release-readiness context.

## Expected behavior

- Covers macOS identity, signing, notarization, sandbox, permissions, local data, keychain, updates, and diagnostics.
- Separates blockers from polish and support improvements.
- Requires user-controllable background/login behavior and safe update recovery.
