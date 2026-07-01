# Subscription Entitlement Design

## 1. Identity & Entitlement Model
- **Canonical identity**: one internal `user_id`; external IDs (`stripe_customer_id`, `apple_original_transaction_id`, `google_purchase_token`, `team_membership_id`) linked as `entitlement_sources`.
- **Entitlement record** = `(user_id, source_id, plan_tier, status, valid_from, valid_until, flags)`.
- **Service**: `Entitlement Service` computes current access as the union of non-revoked records. No source is "primary"; conflicts resolved by **most-recent qualifying event**, not channel priority.

## 2. Channel Behaviors

| Channel | Receipt source | Validation |
|---|---|---|
| **Web (Stripe)** | `customer.subscription.*`, `invoice.paid`, `charge.refunded`, `radar.early_fraud_warning` | Stripe SDK + webhook signature |
| **App Store** | App Store Server Notifications **v2** (JWS) + App Store Server API lookup | Apple-issued JWS, original_transaction_id |
| **Google Play** | Real-time Developer Notifications (RTDN) + Play Developer API | Signed Pub/Sub messages, order_id + purchase_token |
| **Team invoice** | Billing provider webhook (Stripe Invoicing or external) | HMAC + idempotency key |

All receipts stored with `receipt_hash`, `verified_at`, `provider_tx_id`.

## 3. Restore Purchases
- **Mobile** → client triggers `restoreTransactions` (iOS) / `queryPurchasesAsync` (Android); server reconciles each linked store account and returns merged entitlement set.
- **Web** → implicit via `stripe_customer_id` lookup by email.
- UI exposes "Linked Subscriptions" showing all sources; duplicate auto-detection flags overlap on the same tier.

## 4. Family Sharing (Apple only)
- Shared App Store subs create a **pool entitlement** (not per-user). Per-seat features apply to organizer-managed sub-accounts only.
- **In-app plan changes disabled** for family-shared subs; user must leave family or organizer upgrades.
- Organizer revocation → entitlement continues to period end, then drops. No mid-cycle revoke.

## 5. Team Seat Changes
- Seat grant = immediate entitlement, **prorated charge** mid-cycle.
- Seat removal = entitlement retained **until period end**.
- User voluntarily leaves team → entitlement continues to paid-through date (smooth transition window).
- Admin **reassigns seat** → old user gets **7-day read-only grace**, then revoke; new user granted immediately.

## 6. Plan Downgrades
- Default: scheduled at **period end**; UI shows feature delta.
- Immediate downgrade requires explicit confirmation and forfeit of prorated credit.
- Single downgrade per 30 days to prevent churn gaming.

## 7. Grace Periods

| Channel | Soft block | Hard revoke |
|---|---|---|
| Stripe card | Day 3 (dunning email) | Day 7 |
| Stripe 3DS/SEPA | Day 7 | Day 14 |
| App Store | Mirrors Apple retry (≤60d) | Mirror |
| Google Play | Mirrors Google retry (≤30d) | Mirror |
| Team invoice | Day 7 post-due | Day 14 |

During grace: read access retained, write/premium features disabled at soft-block.

## 8. Refunds
- Provider-issued refund webhook → **immediate revoke**, no proration (system-initiated refunds are full).
- Self-serve refunds (admin-only tool) → prorate remaining days as account credit.
- Persist `refund_id`, `reason_code`, `actor` for audit. Re-purchase allowed after 24h.

## 9. Chargebacks
- `charge.dispute.created` → flag account, **soft revoke** (read-only), notify user with evidence link.
- Dispute won → restore + backdate entitlement.
- Dispute lost → permanent revoke; block payment method for 90 days; preserve IP, receipt hash, timestamps as evidence bundle.
- Repeat-offender heuristic: ≥2 chargebacks → manual review gate.

## 10. Offline Mobile Access
- Server issues **signed entitlement token** (JWS, 7-day TTL) on each login/entitlement change; cached by client.
- **Existing entitlements**: honored offline up to **14 days** past token expiry.
- **New entitlements**: never granted offline; require online verification.
- On reconnect: client POSTs delta events; server reconciles; mismatches trigger re-validation, never silently downgrade offline.
- Failed reconciliation → mark account for support review.

## 11. Audit Surface
Every entitlement transition logs `actor`, `source`, `reason_code`, `before/after_state`, `receipt_hash`. Admin console exposes immutable ledger; user-visible timeline shows status changes with provider attribution (e.g., "Apple renewed", "Stripe retry failed").
