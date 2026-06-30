# referral-loop-review behavior example

skill: referral-loop-review

## Positive prompt

> Design a referral program for a B2B SaaS with account credits and team invites.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring trust, support, accessibility, economics, or long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Starts from value moment, inviter/invitee fit, reward type, qualification, and attribution.
- Defines pending rewards, reversal, fraud controls, support evidence, and retained-value metrics.
- Separates referral, affiliate, team invite, and spammy growth patterns.

It should also produce the artifact shape requested by `skills/referral-loop-review/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review Microsoft Store certification risk.

The skill should not load for this prompt unless the user adds an explicit referral-loop-review context.

## Expected behavior

- Starts from value moment, inviter/invitee fit, reward type, qualification, and attribution.
- Defines pending rewards, reversal, fraud controls, support evidence, and retained-value metrics.
- Separates referral, affiliate, team invite, and spammy growth patterns.
