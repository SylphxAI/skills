# skill-catalog-generator behavior example

skill: skill-catalog-generator

## Positive prompt

> Turn this AI skills repo into a searchable public catalog with groupings, quality scores, and coverage gaps.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Builds a catalog from source-of-truth skill artifacts rather than ad hoc copy.
- Scores quality with observable signals and calls out missing evidence.
- Produces groupings, coverage gaps, and publish/verification steps.

It should also produce the artifact shape requested by `skills/skill-catalog-generator/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design refund handling for a mobile game purchase.

The skill should not load for this prompt unless the user adds an explicit skill-catalog-generator context.

## Expected behavior

- Builds a catalog from source-of-truth skill artifacts rather than ad hoc copy.
- Scores quality with observable signals and calls out missing evidence.
- Produces groupings, coverage gaps, and publish/verification steps.
