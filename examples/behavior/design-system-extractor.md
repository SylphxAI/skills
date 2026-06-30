# design-system-extractor behavior example

skill: design-system-extractor

## Positive prompt

> Extract a design system from this SaaS dashboard and pricing page UI.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring decision quality, trust, support, accessibility, or long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Inventories existing surfaces before normalizing tokens and components.
- Separates primitives, semantic tokens, components, states, patterns, and exceptions.
- Includes accessibility, responsive behavior, inconsistencies, and migration plan.

It should also produce the artifact shape requested by `skills/design-system-extractor/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Prioritize revenue opportunities for a marketplace.

The skill should not load for this prompt unless the user adds an explicit design-system-extractor context.

## Expected behavior

- Inventories existing surfaces before normalizing tokens and components.
- Separates primitives, semantic tokens, components, states, patterns, and exceptions.
- Includes accessibility, responsive behavior, inconsistencies, and migration plan.
