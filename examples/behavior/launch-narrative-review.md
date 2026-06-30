# launch-narrative-review behavior example

skill: launch-narrative-review

## Positive prompt

> Sharpen the launch narrative for a public AI skills repository.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring decision quality, trust, support, accessibility, or long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Builds a narrative around audience, old way, new way, proof, objections, and CTA.
- Separates shipped facts from roadmap and reviews unsupported claims.
- Adapts message by channel and defines qualified-action metrics.

It should also produce the artifact shape requested by `skills/launch-narrative-review/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Score internal product roadmap opportunities.

The skill should not load for this prompt unless the user adds an explicit launch-narrative-review context.

## Expected behavior

- Builds a narrative around audience, old way, new way, proof, objections, and CTA.
- Separates shipped facts from roadmap and reviews unsupported claims.
- Adapts message by channel and defines qualified-action metrics.
