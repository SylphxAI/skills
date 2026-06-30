# microsoft-store-readiness behavior example

skill: microsoft-store-readiness

## Positive prompt

> Prepare a Microsoft Store submission checklist for a Windows subscription utility.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring trust, support, accessibility, economics, or long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates Microsoft Store submission requirements from general Windows release readiness.
- Covers package identity, manifest capabilities, listing truth, monetization, certification quality, support, and rollout.
- Requires current policy verification and reviewer notes for sensitive behavior.

It should also produce the artifact shape requested by `skills/microsoft-store-readiness/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a Google Play daily reward calendar.

The skill should not load for this prompt unless the user adds an explicit microsoft-store-readiness context.

## Expected behavior

- Separates Microsoft Store submission requirements from general Windows release readiness.
- Covers package identity, manifest capabilities, listing truth, monetization, certification quality, support, and rollout.
- Requires current policy verification and reviewer notes for sensitive behavior.
