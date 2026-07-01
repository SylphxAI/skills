<think>
The user wants a refund handling design for a mobile subscription app with App Store, Google Play, and Stripe. They want:
- Entitlement revocation
- Grace period
- Chargebacks
- Refund abuse
- One-time goodwill refunds
- Support macros
- Analytics
- Whether to warn, downgrade, or ban repeat abusers

I need to use the skill context (refund-and-support-flow-review) to produce a concise, audit-friendly answer under 650 words. The skill specifies an output format with:
- Purchase/refund context
- Authority
- Provider table
- Entitlement state machine
- Decision table
- Abuse and trust ladder
- Support macros/events
- Metrics/dashboard

Let me structure this tightly.
</think>

```text
PURCHASE/REFUND CONTEXT
- Products: mobile subscription (auto-renewing) + consumables + non-consumables.
- Providers: Apple App Store, Google Play, Stripe (web).
- Authority: Apple/Google own subscription refunds → entitlement follows provider truth. Stripe refunds owned by internal support with policy thresholds. Goodwill refunds require support agent approval, capped per user/year.

PROVIDER TABLE
- Apple refund -> App Store Server Notification (REFUND, REVOKE) -> dedupe: original_transaction_id + notificationUUID -> pending_revoke -> revoked after 24h grace.
- Apple cancel/expire -> subscription status change -> keep access through paidThroughDate -> expired on date unless restore.
- Google refund -> RTDN voidedPurchases / oneTimeProductNotification canceled -> dedupe: purchaseToken + notification id -> pending_revoke -> revoked after 24h grace.
- Google cancel/expire -> RTDN subscription canceled/expired -> keep paid-through access, then expire or restore.
- Stripe refund -> charge.refunded / refund webhook -> dedupe: charge id + refund id -> pending_revoke -> revoked at period end or immediately for non-consumables.
- Stripe chargeback -> dispute.created / won / lost -> dedupe: dispute id -> disputed_hold immediately; won = restore, lost = revoked + commerce_limited.
- Internal goodwill -> support ticket approval -> dedupe: ticket id + approval id -> preserve entitlement or extend grace, never punish.

ENTITLEMENT STATE MACHINE
- active -> refund_pending -> pending_revoke (24h grace, access retained) -> revoked.
- active -> cancel_at_period_end -> expired (on paid_through_at).
- cancel_at_period_end -> restore_or_resubscribe -> active.
- active -> disputed_hold (immediate) -> won -> active; lost -> revoked + commerce_limited.
- revoked -> appeal_approved -> active | grace_extended -> active.
- revoked -> repurchase -> active (re-billed through new provider transaction).
All transitions written to server-side entitlement ledger; no client truth.

DECISION TABLE
- Accidental subscription -> revoke after provider refund; keep base tier; send restore guidance.
- Cancellation only -> keep paid-through access; no money movement.
- Non-consumable refund -> revoke license immediately; offer repurchase.
- Consumable spent -> reconcile ledger; no surprise negative balance; one-time grace.
- Chargeback -> disputed_hold; ask user to resolve or contact support.
- Goodwill refund (one-time/year) -> preserve or extend access; tag in ledger.
- Repeat abuse -> commerce_limited or review tier; never auto-ban from refund alone.

ABUSE & TRUST LADDER (score = refund_count_90d + chargeback_count + timing_score + usage_low_score)
- 0–2 (low) -> inform only; no action.
- 3–4 (medium) -> warning email; skip future auto-grace for consumables; flag in dashboard.
- 5–7 (high) -> commerce_limited (no new premium purchases until manual review); support macro with evidence.
- 8+ (severe) -> suspension requires Trust Lead approval + reversible hold; 14-day appeal window; never permanent without second approval.
False-positive guard: any user with support-resolved dispute or provider error is excluded from score for 90 days.

SUPPORT MACROS / EVENTS
Macro A (provider refund confirmed):
"We received confirmation that purchase <ORDER_ID> was refunded through <PROVIDER>. Premium access ends on <GRACE_UNTIL>. Your account remains active. If this is incorrect, reply with the order ID and we will review. Restore/Resubscribe: <LINK>."

Macro B (chargeback opened):
"A dispute was opened for <ORDER_ID>. Access to premium features is paused while we review. To restore, resolve the dispute with your bank or reply here. If the dispute is found valid, access will end."

Macro C (goodwill one-time):
"As a one-time courtesy we have refunded <AMOUNT> and preserved your access until <DATE>. Future refunds follow our standard policy <LINK>."

Macro D (commerce limit warning):
"Based on recent account activity, new premium purchases require support review. Reply with context and we will respond within 48h. Appeal: <LINK>."

Events: refund_requested, refund_detected, entitlement_state_changed, disputed_hold_opened, abuse_tier_changed, commerce_limited, appeal_opened, appeal_resolved, repurchase_completed. Required fields: provider, provider_event_id, purchase_id, original_transaction_id_or_purchase_token, refund_id, chargeback_id, entitlement_id, user_id, previous_state, next_state, paid_through_at, grace_until, revoke_at, reason_code, abuse_tier, support_case_id, actor, source_event_id, policy_version, decision.

METRICS / DASHBOARD
- Refund rate by provider & product (owner: Finance).
- Entitlement revoke lag p50/p95 (owner: Platform).
- Chargeback open / won / lost % (owner: Trust).
- Goodwill usage per agent & per user (owner: Support Ops).
- Abuse-tier transitions and false-positive rate (owner: Trust).
- Churn within 30 days post-refund (owner: Growth).
- Product-quality reason codes from refund notes (owner: Product).
- Appeal outcome & SLA (owner: Support Ops).

GUARDRAILS
- No auto-ban from a single refund or chargeback; trust ladder only.
- Refund copy is factual; no coercion to repurchase.
- All entitlement changes driven by server ledger with audit trail.
- Apple, Google, Stripe, chargebacks, and goodwill tracked separately.
- Cancellation ≠ refund; renewals stop while paid access remains.
```
