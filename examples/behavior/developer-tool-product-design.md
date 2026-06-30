# developer-tool-product-design behavior example

skill: developer-tool-product-design

## Positive prompt

> Review our API docs and SDK onboarding for developer activation.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring trust, support, and long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Maps developer adoption from discovery to first success and production use.
- Treats docs, examples, errors, limits, pricing, and support as one product system.
- Defines activation and trust metrics beyond signup.

It should also produce the artifact shape requested by `skills/developer-tool-product-design/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Plan a daily login reward calendar for a mobile game.

The skill should not load for this prompt unless the user adds an explicit developer-tool-product-design context.

## Expected behavior

- Maps developer adoption from discovery to first success and production use.
- Treats docs, examples, errors, limits, pricing, and support as one product system.
- Defines activation and trust metrics beyond signup.
