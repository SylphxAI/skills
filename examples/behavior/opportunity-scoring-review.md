# opportunity-scoring-review behavior example

skill: opportunity-scoring-review

## Positive prompt

> Score these ten roadmap opportunities for a SaaS product with limited engineering capacity.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring decision quality, trust, support, accessibility, or long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Normalizes feature ideas into opportunities/outcomes before scoring.
- Scores impact, confidence, effort, risk, fit, urgency, and learning with evidence caveats.
- Produces ranking, sensitivity analysis, sequencing, and next validation steps.

It should also produce the artifact shape requested by `skills/opportunity-scoring-review/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Draft App Store reviewer notes for a subscription app.

The skill should not load for this prompt unless the user adds an explicit opportunity-scoring-review context.

## Expected behavior

- Normalizes feature ideas into opportunities/outcomes before scoring.
- Scores impact, confidence, effort, risk, fit, urgency, and learning with evidence caveats.
- Produces ranking, sensitivity analysis, sequencing, and next validation steps.
