# market-research-synthesis behavior example

skill: market-research-synthesis

## Positive prompt

> Research the market for a new Mac utility and synthesize what we should build.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Uses multiple source surfaces, not one competitor.
- Separates table stakes from differentiation opportunities.
- Produces original synthesis rather than copied competitor structure.

It should also produce the artifact shape requested by `skills/market-research-synthesis/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Generate a random SVG icon.

The skill should not load for this prompt unless the user adds an explicit market-research-synthesis context.

## Expected behavior

- Uses multiple source surfaces, not one competitor.
- Separates table stakes from differentiation opportunities.
- Produces original synthesis rather than copied competitor structure.
