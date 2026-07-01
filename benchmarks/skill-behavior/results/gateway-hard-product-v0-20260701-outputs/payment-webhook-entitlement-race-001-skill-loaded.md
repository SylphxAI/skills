Payment surfaces:
- iOS/macOS: Apple App Store IAP subscriptions, restore purchases, App Store Server Notifications.
- Android: Google Play Billing subscriptions, restore purchases, Real-time Developer Notifications.
- Web: Stripe Checkout subscriptions, customer portal/payment method updates, Stripe webhooks.
- Internal: promo codes, manual support adjustments, backend entitlement grants.

Billing model:
- Recurring subscriptions with trials/promos, renewals, grace/hold states, refunds, chargebacks, delayed renewals, and entitlement restore.
- Entitlements must be derived from verified provider/internal ledger events, never from client-only confirmation.

Readiness matrix:
- Catalog:
  - Separate `product_id`/`price_id`/store SKU from `entitlement_id`.
  - Maintain canonical plan mapping: Apple product IDs, Google product/base plan/offer IDs, Stripe price IDs, promo campaign IDs.
  - Version catalog entries; never mutate historical meaning.
  - Track region, currency, tax, trial, renewal period, and eligibility rules.
  - Block launch if one entitlement can be granted by unmapped or ambiguous SKUs.

- Checkout:
  - Apple/Google: client may start purchase, but backend grants only after verified receipt/purchase token/server notification.
  - Stripe: use Checkout/Portal; grant only after trusted webhook such as `checkout.session.completed` plus paid invoice/subscription state.
  - Promo codes: issue signed, auditable redemption events with campaign, actor, expiry, entitlement, and revocation policy.
  - Use client result only as “payment pending / refresh status,” not as money truth.
  - Payment UI must disclose price, period, trial, renewal, cancellation, limits, and refund path.

- Confirmation:
  - Provider events are source of money movement; internal entitlements are derived state.
  - All inbound Apple, Google, Stripe, promo, support, and admin events enter one immutable ledger.
  - Require idempotency using provider-native unique IDs:
    - Apple: `originalTransactionId`, `transactionId`, notification UUID.
    - Google: purchase token, order ID, notification ID.
    - Stripe: event ID, subscription ID, invoice ID, charge/payment intent ID.
    - Promo/admin: redemption ID / adjustment ID.
  - Process events with monotonic entitlement recomputation, not “last write wins.”
  - Store raw payload, verification result, received timestamp, provider effective timestamp, user/account binding, and processing outcome.
  - Out-of-order handling: ledger accepts all valid events, then recomputes current entitlement from ordered effective periods and revocation events.

- Entitlement:
  - Model as derived state from ledger: `inactive`, `trialing`, `active`, `grace`, `billing_retry`, `paused`, `expired`, `revoked`.
  - Entitlement records should reference ledger event IDs, provider subscription IDs, and effective access window.
  - Renewal extends access only if provider confirms renewal/payment or valid grace policy applies.
  - Refund/chargeback/revoke events shorten, remove, or mark disputed entitlement according to product policy.
  - Restore purchases creates no new money event; it links verified existing store ownership to the account and triggers recomputation.
  - Backend/manual grants must be explicit adjustment events with actor, reason, expiry, and audit trail.

- Refund/revoke:
  - Apple/Google/Stripe refund, cancellation, revocation, chargeback, dispute, and payment-failed webhooks must be first-class ledger events.
  - Chargebacks should immediately mark payment as disputed and optionally revoke access depending on policy.
  - Delayed renewals/payment retry should move user to grace/hold, not create duplicate grants.
  - Partial refunds require explicit policy: no entitlement change, proportional adjustment, or immediate revoke.
  - Never delete historical purchases; append adjustment/reversal events.

- Support/reconciliation:
  - Support tools must search by user ID, email, order ID, provider customer ID, subscription ID, purchase token, Apple transaction ID, Stripe invoice/payment ID, product ID, entitlement ID, and support case.
  - Show timeline: checkout, provider confirmation, grant, renewal, refund, chargeback, restore, promo, manual adjustment.
  - Provide “recompute entitlement” and “sync provider status” tools; manual override must append ledger adjustment.
  - Nightly reconciliation:
    - Apple: verify latest transaction/subscription status for active original transaction IDs.
    - Google: query subscription purchase status for active purchase tokens.
    - Stripe: compare subscriptions, invoices, charges, disputes, and refunds against internal ledger.
  - Alert on mismatches: provider active but internal inactive, internal active without valid provider/promo/admin basis, duplicate active subscriptions, unprocessed webhook, failed grant, unexpected refund state.

Safest ledger design:
- Append-only `payment_ledger_events`.
- Required fields:
  - `ledger_event_id`
  - `source`: apple/google/stripe/promo/admin/support/reconciliation
  - `event_type`: purchase, renewal, trial_started, payment_failed, grace_started, cancel_scheduled, expired, refund, chargeback, revoke, restore, promo_redeemed, manual_grant, manual_revoke
  - `provider_event_id`
  - `provider_transaction_id`
  - `provider_subscription_id`
  - `account_id`
  - `product_catalog_id`
  - `entitlement_id`
  - `effective_at`
  - `received_at`
  - `access_start_at`
  - `access_end_at`
  - `amount`, `currency`, `tax`, `country`
  - `verification_status`
  - `raw_payload_ref`
  - `idempotency_key`
  - `causation_id` / `correlation_id`
  - `processed_status`
- Create immutable ledger first, then asynchronously derive entitlement snapshot.
- Use deterministic replay to rebuild entitlement state.
- Idempotency key must prevent duplicate grants even if webhook, client receipt submission, restore, and reconciliation all report the same purchase.

Blockers:
- Client purchase success grants entitlement without server verification.
- No idempotency across webhooks, receipt validation, restore, and reconciliation.
- Entitlement state is directly mutable without ledger event history.
- Catalog SKUs are used as entitlement identifiers.
- Refunds, chargebacks, revocations, grace, and delayed renewals are not modeled.
- Manual support grants lack actor, reason, expiry, and audit trail.
- No searchable transaction timeline for support.
- No scheduled reconciliation against Apple, Google, and Stripe.
- Restore purchase path is hidden, untested, or creates duplicate subscriptions.
- Webhook processing is non-retryable or not monitored.

Release-readiness checklist:
- Sandbox/prod credentials separated for Apple, Google, Stripe.
- All products mapped to canonical entitlements.
- Server-side Apple receipt/App Store Server API verification complete.
- Server-side Google purchase token verification complete.
- Stripe webhook signature verification complete.
- Idempotent processing tested for duplicate and out-of-order events.
- Entitlement replay test passes from ledger-only data.
- Refund, chargeback, cancellation, renewal failure, delayed renewal, grace, restore, promo, and manual adjustment tested.
- Support ledger timeline and lookup tools ready.
- Reconciliation jobs and mismatch alerts live.
- Metrics cover checkout started, provider confirmed, grant success/failure, renewal, refund, dispute, restore, reconciliation mismatch, and support contact.
