---
name: daily-reward-and-streak-review
description: Design and audit daily rewards, check-ins, streaks, missions, calendars, streak repair, lifecycle notifications, retention loops, live events, game economies, habit formation, and anti-abuse controls for apps and games. Use when building daily login rewards, streak mechanics, reward calendars, return rituals, or retention systems that should increase engagement without coercion.
---

# Daily Reward And Streak Review

Use this skill to make daily retention loops motivating, fair, and economy-safe.

## Workflow

1. Identify the core behavior the product wants to reinforce and the user value of returning.
2. Read `references/daily-reward-streak-systems.md`.
3. Map reward cadence, streak state, missed-day handling, notifications, economy impact, and abuse controls.
4. Separate healthy habit reinforcement from punishment, pressure, or low-value farming.
5. Treat paid repair, VIP multipliers, gacha currency, comeback bonuses, and notification copy as trust-sensitive monetization surfaces.
6. Produce a complete but compact loop design with state model, reward table, metrics, and experiment guardrails. Prefer short bullets over long prose; never omit metrics.

## When not to use

- Do not use for generic advice the base model already handles without this skill's specific artifact contract.

## Guardrails

- Do not make the product depend on anxiety or loss aversion as the main value.
- Do not create rewards that undermine pricing, progression, or marketplace fairness.
- Provide recovery paths for missed days when long-term trust matters more than strict streak purity.
- Do not make paid repair the only practical recovery path or advertise it with panic, countdown, or shame copy.
- Do not let VIP multipliers or gacha-currency ladders become pay-to-win, inflationary, or unfair to non-paying players.

## Output format

```text
Core return behavior:
Reward promise:

Loop design:
- cadence, trigger, reward, recovery, cap

State model:
- <state> -> entry, exit, user message

Metrics:
- activation, repeat, long-term retention, fatigue, economy impact, trust/support, abuse false positives

Economy/support risks:
- <risk> -> mitigation

Trust and monetization pressure:
- paid repair:
- VIP/gacha impact:
- notification copy:
- player support path:
```
