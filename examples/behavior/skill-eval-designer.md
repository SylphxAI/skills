# skill-eval-designer behavior example

skill: skill-eval-designer

## Positive prompt

> Design eval prompts and expected behavior for a new checkout conversion skill.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring decision quality, trust, support, accessibility, or long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines behavior boundary before writing prompts.
- Includes positive, negative, edge, artifact-shape, safety, and regression cases.
- Keeps assertions observable without leaking a full expected answer.

It should also produce the artifact shape requested by `skills/skill-eval-designer/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Write a marketplace payout policy memo.

The skill should not load for this prompt unless the user adds an explicit skill-eval-designer context.

## Expected behavior

- Defines behavior boundary before writing prompts.
- Includes positive, negative, edge, artifact-shape, safety, and regression cases.
- Keeps assertions observable without leaking a full expected answer.
