# startup-growth-review behavior example

skill: startup-growth-review

## Positive prompt

> Audit this landing page for growth and conversion issues.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates diagnosis from assumptions.
- Prioritizes actions by impact, confidence, speed, and strategic fit.
- Rejects spammy or deceptive growth tactics.

It should also produce the artifact shape requested by `skills/startup-growth-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Fix this TypeScript type error.

The skill should not load for this prompt unless the user adds an explicit startup-growth-review context.

## Expected behavior

- Separates diagnosis from assumptions.
- Prioritizes actions by impact, confidence, speed, and strategic fit.
- Rejects spammy or deceptive growth tactics.
