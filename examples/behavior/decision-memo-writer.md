# decision-memo-writer behavior example

skill: decision-memo-writer

## Positive prompt

> Write a decision memo on whether to launch usage-based pricing next quarter.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring decision quality, trust, support, accessibility, or long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Frames one accountable decision with owner, deadline, options, and decision type.
- Separates facts, assumptions, constraints, unknowns, and preferences.
- Recommends a path with evidence, tradeoffs, success metrics, guardrails, and revisit triggers.

It should also produce the artifact shape requested by `skills/decision-memo-writer/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Audit a form for keyboard accessibility.

The skill should not load for this prompt unless the user adds an explicit decision-memo-writer context.

## Expected behavior

- Frames one accountable decision with owner, deadline, options, and decision type.
- Separates facts, assumptions, constraints, unknowns, and preferences.
- Recommends a path with evidence, tradeoffs, success metrics, guardrails, and revisit triggers.
