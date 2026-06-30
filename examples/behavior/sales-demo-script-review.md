# sales-demo-script-review behavior example

skill: sales-demo-script-review

## Positive prompt

> Create a 20-minute sales demo script for a developer tool selling to a product leader and developer champion.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Builds the demo around buyer pain, outcome, proof, objections, and next commitment instead of feature touring.
- Tailors talk track by persona and separates verified proof from roadmap claims.
- Includes timing, click path, buyer checks, follow-up owners, and deal learning.

It should also produce the artifact shape requested by `skills/sales-demo-script-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a data export JSON schema.

The skill should not load for this prompt unless the user adds an explicit sales-demo-script-review context.

## Expected behavior

- Builds the demo around buyer pain, outcome, proof, objections, and next commitment instead of feature touring.
- Tailors talk track by persona and separates verified proof from roadmap claims.
- Includes timing, click path, buyer checks, follow-up owners, and deal learning.
