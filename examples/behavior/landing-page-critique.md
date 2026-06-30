# landing-page-critique behavior example

skill: landing-page-critique

## Positive prompt

> Critique this SaaS landing page and propose higher-converting sections without making false claims.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Diagnoses audience, promise, proof, CTA, objections, and measurement.
- Proposes experiments with hypotheses and metrics.

It should also produce the artifact shape requested by `skills/landing-page-critique/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a backup retention policy.

The skill should not load for this prompt unless the user adds an explicit landing-page-critique context.

## Expected behavior

- Diagnoses audience, promise, proof, CTA, objections, and measurement.
- Proposes experiments with hypotheses and metrics.
