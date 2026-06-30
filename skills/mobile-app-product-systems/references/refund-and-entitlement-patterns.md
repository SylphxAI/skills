# Refund and Entitlement Patterns

Refund handling is a trust and fraud-control system, not only a payment callback.

## Core position

Do **not** automatically ban a user for a single refund. A legitimate refund can happen for accidental purchase, family purchase, product misunderstanding, billing issue, or platform support flow.

Default behavior:

1. Confirm the refund/revocation event from the platform or payment processor.
2. Reconcile entitlement state.
3. Remove or downgrade access to refunded value when appropriate.
4. Explain the state in product/support language.
5. Escalate to abuse controls only when there is a repeated or high-confidence abuse pattern.

Threatening "buy again before X or get banned" is usually a bad product and trust pattern. A win-back offer can be appropriate; a coercive repurchase threat is not.

## Entitlement state machine

Use these states or map to equivalent app states:

```text
unknown -> pending -> active -> grace -> expired
                         |        |
                         v        v
                      refunded  billing_retry
                         |
                         v
                      revoked
                         |
                         v
                      eligible_to_repurchase
```

Additional states for support/fraud systems:

```text
review_required -> commerce_limited -> account_suspended
```

Use `account_suspended` only for abuse, fraud, safety, or policy violations. Do not use it for ordinary refunds.

## Decision table

| Scenario | Entitlement action | Account action | User messaging | Notes |
| --- | --- | --- | --- | --- |
| Subscription refund for current period | End premium access when refund/revocation is confirmed, unless platform semantics say access continues | No ban | "Your subscription was refunded, so premium access has ended. You can resubscribe anytime." | Do not pretend cancellation and refund are the same. |
| Subscription billing failure without refund | Move to grace or billing retry if supported | No ban | "We could not renew. Update billing to keep access." | Grace is for failed renewal, not refund abuse. |
| Non-consumable refund | Revoke the non-consumable entitlement after confirmation | No ban | "This purchase was refunded, so this feature is no longer active." | Provide restore path if user buys again. |
| Consumable refund, item unspent | Remove the unspent currency/item | No ban | "Refund processed; unused refunded items were removed." | Keep ledger idempotent. |
| Consumable refund, item already spent | Do not create surprise negative balances by default | Maybe commerce limit if repeated | "Refund processed. Some consumed benefits cannot be reversed." | For games, use risk scoring before any negative balance or restriction. |
| Accidental purchase reported quickly | Revoke/refund path + support explanation | No ban | "We can help you find the platform refund route." | This is trust-building. |
| Repeated refund pattern across high-value consumables | Revoke where possible; freeze risky grants pending verification | Commerce-limited or review-required | "Purchases are temporarily limited while we review refund activity." | Require evidence and human/support path. |
| Chargeback or processor fraud signal | Revoke disputed entitlement | Commerce-limited pending review | "Payment dispute detected; access to disputed items is paused." | Stronger than normal refund, still avoid instant full-account ban unless clear fraud. |

## Repurchase and win-back

A repurchase prompt is acceptable when it is framed as restoring value, not avoiding punishment.

Good:

```text
Your premium access ended after the refund. Resubscribe by Friday to keep your saved premium settings active.
```

Bad:

```text
Buy again within 24 hours or your account will be banned.
```

Use repurchase windows for reversible product state, such as:

- preserving premium settings for a short period;
- holding a discounted win-back offer;
- keeping cloud assets read-only before deletion;
- allowing a support appeal.

Do not use repurchase windows to coerce users or hide refund consequences.

## Product and data handling

- `refund-entitlement-1` — Receipt/refund processing must be idempotent.
- `refund-entitlement-2` — Keep an immutable ledger of purchase, grant, spend, refund, revoke, support, and adjustment events.
- `refund-entitlement-3` — Separate entitlement removal from account punishment.
- `refund-entitlement-4` — Support tools should show platform, product ID, transaction ID, refund time, entitlement state, and grant ledger.
- `refund-entitlement-5` — User-facing messages should avoid accusatory language unless abuse is confirmed.
- `refund-entitlement-6` — If refund removes access to user-created assets, provide read-only/export/deletion timelines where practical.

## Abuse policy ladder

Use a ladder, not a cliff:

1. **Inform**: explain refund effect.
2. **Reconcile**: remove refunded entitlement or unspent grants.
3. **Limit commerce**: block risky purchases temporarily after repeated refund signals.
4. **Manual review**: route high-risk patterns to support/fraud review.
5. **Suspend**: only for confirmed abuse, fraud, safety issues, or terms violations.

## Events

Track separate events:

```text
purchase_started
purchase_confirmed
entitlement_granted
refund_detected
entitlement_revoked
refund_message_shown
repurchase_offer_shown
repurchase_completed
commerce_limited
refund_review_opened
refund_review_resolved
```

Important properties:

```text
platform, product_id, transaction_id, entitlement_id, user_state,
refund_reason_if_available, grant_consumed_state, amount, currency,
source_event_id, support_case_id, risk_score_bucket
```
