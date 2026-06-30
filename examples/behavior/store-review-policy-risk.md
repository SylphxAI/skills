# store-review-policy-risk behavior example

skill: store-review-policy-risk

## Positive prompt

> Audit our App Store and Google Play submission for subscriptions, UGC, ads, and privacy policy risk.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring trust, support, accessibility, economics, or long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Builds a channel-specific risk register across metadata, payments, privacy, permissions, UGC, ads, and regulated claims.
- Requires reviewer notes, evidence, demo paths, and current policy verification.
- Separates hard blockers, clarifications, metadata fixes, product fixes, and post-approval monitoring.

It should also produce the artifact shape requested by `skills/store-review-policy-risk/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Analyze SaaS monthly retention cohorts.

The skill should not load for this prompt unless the user adds an explicit store-review-policy-risk context.

## Expected behavior

- Builds a channel-specific risk register across metadata, payments, privacy, permissions, UGC, ads, and regulated claims.
- Requires reviewer notes, evidence, demo paths, and current policy verification.
- Separates hard blockers, clarifications, metadata fixes, product fixes, and post-approval monitoring.
