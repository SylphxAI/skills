# execution-simplification behavior example

skill: execution-simplification

## Positive prompt

> Turn this broad product roadmap into a simple execution plan with assumptions, risks, and validation.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates facts, assumptions, decisions, constraints, reversible actions, and proof.
- Produces a sequenced plan with validation and avoids fake phases.

It should also produce the artifact shape requested by `skills/execution-simplification/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review a CSS animation easing curve.

The skill should not load for this prompt unless the user adds an explicit execution-simplification context.

## Expected behavior

- Separates facts, assumptions, decisions, constraints, reversible actions, and proof.
- Produces a sequenced plan with validation and avoids fake phases.
