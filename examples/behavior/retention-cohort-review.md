# retention-cohort-review behavior example

skill: retention-cohort-review

## Positive prompt

> Analyze why D7 retention dropped after our mobile app onboarding redesign.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring trust, support, accessibility, economics, or long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines retained action, cohort type, time grain, and meaningful segment cuts before diagnosing.
- Separates measurement artifacts from product mechanisms and acquisition mix.
- Produces product hypotheses with guardrail metrics instead of generic retention advice.

It should also produce the artifact shape requested by `skills/retention-cohort-review/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Audit a marketplace payout ledger.

The skill should not load for this prompt unless the user adds an explicit retention-cohort-review context.

## Expected behavior

- Defines retained action, cohort type, time grain, and meaningful segment cuts before diagnosing.
- Separates measurement artifacts from product mechanisms and acquisition mix.
- Produces product hypotheses with guardrail metrics instead of generic retention advice.
