# Refund And Support Flow Patterns

## Refund flow state machine

```text
refund_requested -> refund_pending -> refund_confirmed -> entitlement_adjusted -> user_notified -> support_closed
        |                 |                    |                    |
        v                 v                    v                    v
platform_redirect   refund_rejected      review_required      appeal_opened
```

Abuse review is an overlay, not the default path.

For subscriptions, keep entitlement states explicit:

```text
active -> refund_confirmed -> pending_revoke -> grace_elapsed -> revoked
active -> cancellation_requested -> cancel_at_period_end -> period_end_elapsed -> expired
cancel_at_period_end -> restore_or_resubscribe -> active
active -> chargeback_opened -> disputed_hold -> dispute_won -> active
disputed_hold -> dispute_lost -> revoked
revoked -> repurchase_or_appeal_approved -> active
```

## Rule IDs

- `refund-flow-1` — Identify who controls the refund: app store, payment processor, marketplace, or internal support.
- `refund-flow-2` — Separate refund confirmation from entitlement revocation and account punishment.
- `refund-flow-3` — Use an abuse ladder: inform, reconcile, limit commerce, review, suspend only after evidence.
- `refund-flow-4` — Support should see purchase, grant, spend/use, refund, revoke, messages, and prior cases in one timeline.
- `refund-flow-5` — Consumable refunds need careful handling of spent value; avoid surprise negative balances by default.
- `refund-flow-6` — Repurchase offers must restore value, not threaten punishment.
- `refund-flow-7` — Chargebacks and fraud signals justify stronger commerce limits than normal refunds, but still need review paths.
- `refund-flow-8` — Refund copy should be factual, non-accusatory, and specific about access consequences.
- `refund-flow-9` — Appeals need evidence requirements, expected timeline, and a reversible hold state.
- `refund-flow-10` — Refund data should feed product quality loops: accidental purchase, unclear pricing, support gaps, or policy mismatch.
- `refund-flow-11` — Apple App Store, Google Play, Stripe, chargebacks, and internal goodwill refunds need separate authority, webhook/notification signal, dedupe key, entitlement action, and support route.
- `refund-flow-12` — Entitlement changes must be driven by a server-side entitlement ledger/history, not client state or support notes.
- `refund-flow-13` — Abuse enforcement needs score bands, evidence, false-positive review, approval thresholds for bans, and appeal timelines.
- `refund-flow-14` — Support dashboards should expose refund source, order/transaction IDs, entitlement state, grace/revoke time, chargeback status, goodwill history, abuse tier, and prior cases.
- `refund-flow-15` — Cancellation is not refund: cancellation normally stops renewal while preserving paid-through access; refund returns money and may change entitlement immediately or after a grace period.
- `refund-flow-16` — Restore-purchase flows must reconcile provider truth, entitlement ledger, prior refunds, cancellations, chargebacks, and support overrides before granting access.
- `refund-flow-17` — Event schemas need stable purchase, provider, refund, entitlement, support case, abuse tier, actor, source event, and policy version fields so support and analytics can replay decisions.

## Decision table

| Scenario | Entitlement action | Account action | Support action |
| --- | --- | --- | --- |
| Accidental subscription purchase | Revoke after confirmed refund or at provider-defined time | None | Explain platform refund route and restore path |
| Cancellation without refund | Keep access until paid-through period end | None | Explain renewal stopped, access-through date, and resubscribe path |
| Non-consumable refund | Revoke feature/license | None | Confirm access ended; show repurchase path |
| Consumable spent before refund | Reconcile ledger, avoid surprise debt by default | Risk score if repeated | Route repeated high-value cases to review |
| Chargeback | Pause disputed entitlement | Commerce-limited pending review | Ask user to resolve dispute or contact support |
| Repeated refund abuse | Revoke where possible | Commerce limit or manual review | Use evidence-based macro and appeal path |

## Provider table

| Provider/channel | Signal | Dedupe key | Entitlement action |
| --- | --- | --- | --- |
| Apple App Store | App Store Server Notifications such as revoke/refund events | original_transaction_id + notification id | Set pending_revoke or revoked according to product grace policy |
| Apple cancellation/expiration | subscription status / expiration signal | original_transaction_id + status event id | Keep access until provider-paid-through date, then expire unless renewed/restored |
| Google Play | Real-time developer notifications and voided purchases | purchase_token + notification id | Set pending_revoke/revoked and reconcile restore-purchase state |
| Google cancellation/expiration | RTDN subscription cancellation/expiration status | purchase_token + notification id | Keep paid-through access, then expire or restore based on provider truth |
| Stripe refund | `charge.refunded` / refund webhook | charge/refund id | Apply refund policy and entitlement grace/revoke state |
| Stripe cancellation | subscription deleted/updated/cancel_at_period_end event | subscription id + event id | Keep access through current period unless immediate cancellation/refund is confirmed |
| Stripe chargeback | dispute opened/won/lost webhooks | dispute id | Move entitlement to disputed_hold, then restore or revoke after outcome |
| Internal goodwill | support-approved adjustment | ticket id + approval id | Usually preserve entitlement or maintain until current period end |

## Abuse score pattern

Use explainable scoring rather than one-off judgment:

- recent refund count and value;
- refund timing after purchase;
- usage/consumption after purchase;
- repeated chargebacks;
- linked devices/payment methods/accounts;
- prior support and appeal outcomes.

Example bands: low = inform only; medium = warning and skip future grace; high = commerce limit/manual review; severe = suspension only with approval and appeal route.

## Support macro pattern

Use: acknowledge, state what happened, explain access impact, provide next action, provide appeal/support route.

```text
We received confirmation that this purchase was refunded. The refunded premium access has ended, but your account remains active. If you believe this is wrong, reply with the order ID and we will review it.
```

## Event schema

Track: `refund_requested`, `refund_redirect_shown`, `refund_detected`, `cancellation_detected`, `restore_purchase_requested`, `restore_purchase_resolved`, `entitlement_state_changed`, `entitlement_adjusted_after_refund`, `refund_user_notified`, `refund_support_case_opened`, `commerce_limited`, `abuse_tier_changed`, `appeal_opened`, `appeal_resolved`, `repurchase_completed`.

Required properties: `provider`, `provider_event_id`, `purchase_id`, `original_transaction_id_or_purchase_token`, `refund_id`, `chargeback_or_dispute_id`, `subscription_id`, `entitlement_id`, `user_id`, `previous_entitlement_state`, `next_entitlement_state`, `paid_through_at`, `grace_until`, `revoke_at`, `reason_code`, `abuse_tier`, `support_case_id`, `actor`, `source_event_id`, `policy_version`, `decision`.

Dashboards should include refund rate by provider, entitlement revocation lag, chargeback open/win/loss, goodwill usage, abuse-tier transitions, support volume, appeal outcomes, churn after refund, and product quality reason codes.
