# creator-onboarding-review behavior example

skill: creator-onboarding-review

## Positive prompt

> Review creator onboarding for an AI skill marketplace with submissions and quality gates.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring decision quality, trust, support, accessibility, or long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines creator activation as accepted supply or demand success, not signup.
- Maps onboarding, quality checklist, review feedback, publishing, analytics, payout/support, and abuse controls.
- Produces quality gates, creator metrics, and marketplace feedback loops.

It should also produce the artifact shape requested by `skills/creator-onboarding-review/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Audit checkout payment retry errors.

The skill should not load for this prompt unless the user adds an explicit creator-onboarding-review context.

## Expected behavior

- Defines creator activation as accepted supply or demand success, not signup.
- Maps onboarding, quality checklist, review feedback, publishing, analytics, payout/support, and abuse controls.
- Produces quality gates, creator metrics, and marketplace feedback loops.
