# Winback Campaign Patterns

## Win-back state machine

```text
active -> at_risk -> dormant -> churned -> eligible_for_winback -> contacted -> reactivated -> retained
   |          |          |          |              |              |             |
   v          v          v          v              v              v             v
suppressed  saved   no_consent  bad_fit      holdout_group   unsubscribed  churned_again
```

## Rule IDs

- `winback-1` — Define churn by product value, not only login absence.
- `winback-2` — Segment by reason: price, missing feature, low activation, seasonality, competitor, support failure, payment failure, or bad fit.
- `winback-3` — Match the win-back promise to what changed: new feature, lower friction, better plan, event, content, or support fix.
- `winback-4` — Use offers only when unit economics and customer expectation support them.
- `winback-5` — Preserve trust: clear terms, real expiry, easy unsubscribe, no guilt copy.
- `winback-6` — Send to a landing path that removes the original friction.
- `winback-7` — Suppress users with recent complaints, refunds, legal requests, or no marketing consent.
- `winback-8` — Include holdouts and measure incremental retained revenue or retained activity.
- `winback-9` — Stop after fatigue thresholds; repeated silence is a signal.
- `winback-10` — Feed churn reasons back into product, pricing, onboarding, and support.

## Decision table

| Segment | Trigger | Message | Offer | Guardrail |
| --- | --- | --- | --- | --- |
| Trial expired without activation | No key action by day N | Show quickest value path | Extend trial only with guided setup | Do not extend indefinitely |
| Cancelled paid SaaS | Cancellation reason captured | Acknowledge reason and show fix | Downgrade, pause, or targeted discount | Avoid trapping cancellation |
| Dormant mobile app user | No retained action for N days | New value or unfinished job | In-app bonus or feature reminder | Cap notifications |
| Lapsed game payer | Event fit and prior spend | Event/reward relevance | Comeback bundle | Protect economy and fairness |
| B2B champion lost | Workspace active but no owner | Help transfer ownership | Success call or admin checklist | Do not spam end users |
| Bad-fit churn | Explicit mismatch | Thank and route resources | None | Exclude from paid win-back |

## Campaign checklist

- Segment includes churn reason, value history, channel permission, and expected economics.
- Copy states what changed and why returning is worth it now.
- Landing path resumes work, restores context, or fixes setup friction.
- Offer terms are clear, reversible where needed, and support-readable.
- Holdout group and stop criteria are defined before launch.

## Event schema

Track: `user_marked_at_risk`, `user_marked_dormant`, `churn_reason_captured`, `winback_eligible`, `winback_message_sent`, `winback_offer_viewed`, `winback_offer_redeemed`, `account_reactivated`, `retained_after_winback`, `winback_unsubscribed`, `winback_suppressed`.

Minimum properties: segment, churn reason, prior plan/value, channel, consent basis, offer ID, message version, landing path, holdout flag, and retained-action window.
