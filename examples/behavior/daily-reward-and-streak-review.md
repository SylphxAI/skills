# daily-reward-and-streak-review behavior example

skill: daily-reward-and-streak-review

## Positive prompt

> Design a daily check-in and streak system for our language learning app.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring trust, support, and long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Connects daily rewards to a meaningful core behavior.
- Defines missed-day, repair, notification, and abuse states.
- Balances retention lift against economy, trust, and fatigue risks.
- Constrains paid repair, VIP multipliers, gacha currency, comeback bonuses, and notification copy so monetization does not become coercive.
- Covers clock manipulation, reinstall/device farming, multi-accounting, bot/emulator behavior, duplicate offline claims, and account-sharing with proportionate remediation.

It should also produce the artifact shape requested by `skills/daily-reward-and-streak-review/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Explain how OAuth scopes should be named.

The skill should not load for this prompt unless the user adds an explicit daily-reward-and-streak-review context.

## Expected behavior

- Connects daily rewards to a meaningful core behavior.
- Defines missed-day, repair, notification, and abuse states.
- Balances retention lift against economy, trust, and fatigue risks.
- Constrains paid repair, VIP multipliers, gacha currency, comeback bonuses, and notification copy so monetization does not become coercive.
- Covers clock manipulation, reinstall/device farming, multi-accounting, bot/emulator behavior, duplicate offline claims, and account-sharing with proportionate remediation.
