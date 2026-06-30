# product-positioning behavior example

skill: product-positioning

## Positive prompt

> Sharpen positioning for a SaaS product that currently says AI productivity platform for everyone.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Identifies segment, job, alternative, category, differentiator, proof, and bad-fit boundary.
- Rejects unsupported uniqueness and vague taglines.

It should also produce the artifact shape requested by `skills/product-positioning/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a backup restore drill.

The skill should not load for this prompt unless the user adds an explicit product-positioning context.

## Expected behavior

- Identifies segment, job, alternative, category, differentiator, proof, and bad-fit boundary.
- Rejects unsupported uniqueness and vague taglines.
