# interface-craft behavior example

skill: interface-craft

## Positive prompt

> Review this React form and make it feel more polished without changing the product direction.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Identifies concrete UI surfaces before suggesting details.
- Prioritizes accessibility and reduced-motion constraints.
- Uses rule IDs when reviewing.

It should also produce the artifact shape requested by `skills/interface-craft/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Explain OAuth 2.0 token exchange.

The skill should not load for this prompt unless the user adds an explicit interface-craft context.

## Expected behavior

- Identifies concrete UI surfaces before suggesting details.
- Prioritizes accessibility and reduced-motion constraints.
- Uses rule IDs when reviewing.
