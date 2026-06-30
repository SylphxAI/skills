# form-ux-review behavior example

skill: form-ux-review

## Positive prompt

> Audit our SaaS signup and checkout forms for conversion, accessibility, and trust.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring decision quality, trust, support, accessibility, or long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Maps user goal, field necessity, validation timing, errors, accessibility, and recovery.
- Separates useful friction from internal-only friction.
- Defines form events, abandonment diagnosis, and downstream quality guardrails.

It should also produce the artifact shape requested by `skills/form-ux-review/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Write a launch narrative for a new API product.

The skill should not load for this prompt unless the user adds an explicit form-ux-review context.

## Expected behavior

- Maps user goal, field necessity, validation timing, errors, accessibility, and recovery.
- Separates useful friction from internal-only friction.
- Defines form events, abandonment diagnosis, and downstream quality guardrails.
