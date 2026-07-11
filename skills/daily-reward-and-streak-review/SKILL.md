---
name: daily-reward-and-streak-review
description: Design or audit one daily reward, check-in, streak, calendar, mission, repair, comeback, or return-ritual system for apps and games, including time semantics, progression gates, reward economy, notifications, paid repair/VIP/gacha interaction, abuse, fairness, recovery, experiments, and support. Use when the recurring artifact is a return-loop state machine; use Game/App Design for whole-product retention and Notification Strategy for channel delivery.
---

# Daily Reward And Streak Review

Produce a **Return Loop Contract** that reinforces real recurring value and
voluntary mastery without anxiety, hostage progress, or economy damage.

## Atomic boundary

Own one daily/streak/calendar/mission loop: cadence, clock authority, eligibility,
claim/grant/reversal, missed-day recovery, reward table, economy handoff,
notification intent, abuse, support, and measurement. Do not own the whole game
or app retention architecture, channel delivery, payment provider, or complete
economy.

Begin with the [shared product artifact envelope](references/product-artifact-envelope.schema.json)
and reference sibling artifacts by ID/version/digest.

## Agent-first invariant

Build all declared states, recovery modes, timezone/DST handling, server clock,
ledger, notification intents, abuse controls, experiments, canaries, and
support tools now. In games, exposure may follow real progression/level gates;
in utility apps, do not gate core functionality behind streak or tenure. A
disabled loop has zero timers, notifications, background work, or reward grants.

## Workflow

1. Define the recurring user value and behavior worth reinforcing. Reject a
   loop whose only reason is opening the product.
2. Read `references/daily-reward-streak-systems.md`; define audience, age mode,
   cadence, reset authority, locale/timezone, progression context, reward types,
   economy/inventory owners, and commercial interactions.
3. Model `eligible -> available -> claim_pending -> grant_committed -> claimed`
   plus missed, grace, frozen, repaired, expired, duplicate, offline, reversal,
   migration, and support-corrected states.
4. Define server-authoritative time, DST/timezone travel, device-clock abuse,
   late/out-of-order events, idempotency, restore/merge, and season/version
   migration semantics.
5. Specify reward curve, caps, duplicate ownership treatment, sources/sinks,
   baseline reachability, paid repair, VIP/gacha impact, comeback grants, and
   inflation/fairness simulations.
6. Hand notification intents to `notification-strategy-review` with user value,
   exact reminder request, consent/preference, cooldown, quiet hours, and stop
   conditions. The streak does not create emergency-message authority.
7. Define false-positive-safe abuse bands, support evidence, appeal/correction,
   experiments, countermetrics, canaries, and automatic pause/rollback.

## Source verification

Retrieve current notification, payment, child/age, chance-based reward, store,
privacy, and promotion authority for the exact product/platform/territory. Paid
repair or gacha-linked rewards require transparent terms and current authority.

## When not to use

- Use `game-design-blueprint` or `app-design-blueprint` for the complete
  retention/value architecture rather than one return loop.
- Use `game-economy-review` when sources, sinks, inflation, progression, and
  payer fairness are the primary artifact.
- Use `notification-strategy-review` when the job is permission, channel,
  frequency, privacy, deliverability, or cross-channel suppression.
- Use `promotion-campaign-review` for a time-bounded offer/event whose recurrence
  is campaign-driven rather than a durable daily state machine.

## Guardrails

- Never make anxiety, shame, irreversible loss, or paid repair the main value.
- Preserve creations, earned ownership, purchases, relationships, and core app
  utility independently of streak state.
- No silent clock correction, duplicate grant, surprise expiry, pay-to-win
  multiplier, or gacha-currency inflation.
- Missed-day recovery must be proportionate and accessible; repeated deliberate
  churn/rejoin cannot become the optimal earning strategy.
- Measure D7/D30 retained value, core behavior, fatigue, support/trust, economy,
  payer/non-payer fairness, and abuse false positives—not claims alone.

## Output contract

Return one typed Return Loop Contract with:

1. recurring value hypothesis and audience/progression/age modes;
2. cadence, clock/reset, eligibility, claim/grant/reversal, grace/repair, and
   migration state machine;
3. reward calendar/table with economy, inventory, paid/VIP/gacha, cap, and
   duplicate-ownership effects;
4. notification intent and suppression handoff;
5. abuse, support, correction, appeal, offline/restore, and idempotency rules;
6. event schema and cohort/economy/trust countermetrics;
7. simulation, experiment, canary, pause, rollback, and live-readback plan.

Complete only when every clock, missed-day, duplicate, offline, migration,
refund/reversal, and support path has deterministic behavior and evidence.
