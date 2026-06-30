# steam-launch-readiness behavior example

skill: steam-launch-readiness

## Positive prompt

> Audit our Steam coming-soon page and demo plan before Next Fest.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring trust, support, and long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Connects Steam store assets, wishlist growth, demo, build quality, pricing, and community ops.
- Identifies launch blockers around promise mismatch, platform claims, refunds, and review risk.
- Creates a pre-launch through first-week operations matrix.

It should also produce the artifact shape requested by `skills/steam-launch-readiness/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design an App Store subscription restore flow.

The skill should not load for this prompt unless the user adds an explicit steam-launch-readiness context.

## Expected behavior

- Connects Steam store assets, wishlist growth, demo, build quality, pricing, and community ops.
- Identifies launch blockers around promise mismatch, platform claims, refunds, and review risk.
- Creates a pre-launch through first-week operations matrix.
