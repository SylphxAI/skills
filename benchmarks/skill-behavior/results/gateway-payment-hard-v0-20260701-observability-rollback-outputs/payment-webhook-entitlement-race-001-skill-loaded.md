```text
Payment surfaces:
- Apple App Store IAP (auto-renewable subscriptions, non-renewing)
- Google Play Billing (auto-renewable, RTDN)
- Stripe Checkout + Subscriptions (web)
- Promo codes, support/admin grants, restore purchases
- Refund webhooks, chargebacks, partial refunds, billing retry/grace

Billing model:
- Cross-platform tiered subscriptions (monthly/annual), trials, paused plans, promo overlays
- One-time consumables optional
- Web (Stripe) bypasses store IAP for non-store-eligible users (web-direct), but never marketed to bypass store rules

Authority boundary:
- Source of truth for money: signed store/webhook events (App Store server notifications, RTDN, Stripe webhooks with verified signatures)
- Source of truth for entitlement: append-only ledger projected into entitlement table
- Client confirmation is non-authoritative; restore is a lookup trigger, not money
```

```text
Readiness matrix:
- Catalog: separate provider_sku (Apple/Google/Stripe price ID) from entitlement_id; region/currency/tax class pinned per SKU; version mapping table for re-pricing
- Checkout: server-verified receipt/token before grant; price/tax/renewal disclosed per payment-9; failure UI exposes restore and retry paths
- Confirmation and ledger: durable queue, idempotent ingest (dedupe by provider_event_id + lineage), all fields per ledger schema, raw payload hash stored
- Entitlement projection: replay from ledger using effective_at, no "last webhook wins"; merge overlapping periods per lineage; projection_version bumped
- Refund/revoke/dispute: full refund revokes affected provider period; partial refund = no silent revoke; chargeback suspends paid access pending review; never collapse refund/dispute/cancel/revoke
- Support/reconciliation: lookup by user/order/provider/entitlement/case; role-gated correction emits ledger event with actor, reason, expiry; no provider payload mutation
```

```text
Payment and entitlement state model:
- inactive -> no provider/grant evidence; no access
- trialing -> verified trial entitlement with end date; access
- active -> paid period covers now; access
- grace -> provider billing_retry/pause window; access with status message
- billing_retry -> access per policy; payment update CTA
- paused -> store pause; no access unless policy grants
- refund_pending -> refund webhook seen, decision pending policy; no silent revoke
- disputed -> chargeback open; restricted access, manual review
- revoked -> provider revocation or policy-driven revoke; restore/support path shown
- expired -> paid-through elapsed without renewal
- manual_review -> ambiguous state; expiring support grace issued
```

```text
Provider precedence rules (append-only ledger; recompute by lineage, not arrival):
- Apple IAP notification UUID + transaction/original_transaction_id -> grant/renew/grace/revoke by Apple lineage; effective_at = provider time
- Google RTDN purchase_token + order_id + notification_id -> grant/renew/account_hold/grace/pause/revoke by token lineage
- Stripe event_id + subscription/invoice/payment_intent/charge id -> grant on paid; update on refund/dispute/cancel
- Wallet (Apple Pay/Google Pay) -> only confirms checkout method; never owns subscription policy
- Promo redemption_id -> grant promo-only period; never overrides paid chargeback unless policy
- Restore -> refresh/recompute only; relink provider ownership; no money event
- Support/admin adjustment_id -> expiring manual grant/revoke/correction; role-gated, reason-coded, audited
Ordering: dedupe by provider-native key; conflict resolution by lineage + provider effective_at, not receipt arrival
```

```text
Reconciliation and finance close:
- Realtime: webhook/notification ingest, idempotency, DLQ; owner payments-on-call
- Hourly: provider confirmations vs grants; refunds vs revokes; mismatch alert
- Daily: active subs renewing/expiring/retry/restored; provider status refresh for ambiguous states
- Weekly: sample active paid entitlements, settlement, tax, fee, refund, dispute, overrides
- Finance close: provider settlement = internal revenue + tax + fee + refunds + disputes + adjustments; exceptions block signoff; entitlement edits only if provider money state changes
- Out-of-order rules: replay projector from ledger zero; never mutate history; reconciliation runbook for paid-no-grant, grant-no-provider, duplicate webhook, DLQ replay, restore conflict, settlement mismatch
```

```text
Support-safe correction flow:
- Missing purchase -> verify provider by order/token/charge id; if paid-no-grant, append entitlement_corrected_grant with evidence
- Duplicate charge -> show both receipts; refund path on confirmed duplicate; never delete ledger row
- Failed renewal -> confirm billing_retry/grace per provider; issue expiring support grace if policy permits
- Refund request -> full: revoke affected period; partial: per policy, no surprise revoke
- Chargeback/dispute -> mark disputed, restrict new promo, preserve appeal route
- Restore conflict -> block auto-transfer, require provider proof
- All actions: role-gated, reason code, approval, expiry, customer-visible message; ledger event + replay projector
```

```text
Blockers:
- No signed-verification path for any provider channel
- Catalog reuses entitlement_id for pricing changes
- Auto-revoke on refund without partial/full distinction
- Support console mutates provider payloads or ledger history
- No DLQ, no idempotency store, no projection_version field
- Finance reconciliation missing tax/fee/settlement diff
```

```text
Observability and rollback controls:
- Webhook ingestion (lag, retry, dup rate, DLQ) -> SLO breach -> pause fulfillment per provider, replay queue, status message; owner payments-on-call
- Entitlement projection (grant latency, provider/entitlement mismatch, projector errors) -> mismatch > 0 -> replay projector, disable risky grant path, support grace; owner payments-on-call
- Refund/dispute (refund-to-revoke latency, dispute-to-review, false revoke) -> latency or support spike -> pause auto-revoke for lineage, manual review; owner payments+support
- Restore/linking (failure, identity conflict) -> spike -> disable auto-transfer, require proof; owner support+payments
- Finance close (settlement/tax/fee mismatch) -> block signoff; owner finance
- Customer trust (missing-entitlement, false revoke) -> theme spike -> status page, macro, policy-approved grace; owner support
Rollback: provider kill switch (pause new grants), projector rollback (pin version, replay), auto-revoke pause, promo kill switch, support grace control (expiring), customer messaging (pending/restore/refund/dispute/degraded)
```

```text
Release gates (each: fixture + dashboard/alert + rollback + owner + approval evidence):
- Apple/Google/Stripe purchase -> grant
- Client callback before webhook; webhook before client
- Duplicate webhook replay (idempotency)
- Out-of-order renewal/cancel/refund/restore
- Delayed renewal, provider grace, account hold, pause, expiration
- Full refund, partial refund, revocation, dispute open/close
- Promo overlap with paid subscription; paid refund after promo
- Manual grant with expiry + compensating revoke
- Restore conflict / blocked transfer
- Provider API outage / stale status
- DLQ replay; projector rebuild from zero
- Settlement, tax, fee, refund, dispute reconciliation
- Dashboard drill: webhook lag, DLQ, mismatch, grant latency, refund-to-revoke, dispute-to-review, restore failure, support tickets
- Rollback drill: provider kill switch, projector rollback, auto-revoke pause, promo kill switch, support grace control, customer notice
```
