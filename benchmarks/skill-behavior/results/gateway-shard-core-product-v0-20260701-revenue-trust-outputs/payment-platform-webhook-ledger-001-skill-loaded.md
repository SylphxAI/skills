Payment surfaces:
- Stripe-hosted/custom web checkout for SaaS plans.
- Apple Pay and Google Pay as Stripe wallet payment methods, not standalone billing systems.
- Stripe invoices for subscription billing, failed payment recovery, refunds, disputes, tax, coupons, credits, and reconciliation.
- Stripe webhooks as authoritative payment/settlement signals.

Billing model:
- Recurring SaaS subscriptions, likely with coupons/trials/tax.
- Possible one-time invoice items, credits, prorations, refunds, and adjustments.
- Entitlements derived from subscription/invoice/payment state, not from client checkout success.

Readiness matrix:
- Catalog:
  - Define stable internal entitlement IDs separately from Stripe product/price IDs.
  - Review plans, billing periods, trials, coupons, tax behavior, region/currency coverage, and proration rules.
  - Lock launch catalog before production payments.
  - Gate: every purchasable Stripe price maps to exactly one internal entitlement package and downgrade/upgrade rule.

- Checkout:
  - Apple Pay/Google Pay enabled only through Stripe-supported flows.
  - Payment UI must disclose price, billing period, renewal terms, tax estimate/finality, coupon duration, cancellation path, and refund policy.
  - Support card, wallet, invoice, SCA/3DS, and payment failure paths.
  - Gate: no customer can enter checkout for a product/region/tax case the backend cannot fulfill and reconcile.

- Confirmation:
  - Stripe webhook events are the source of payment truth, not browser redirects or client callbacks.
  - Verify webhook signatures, use idempotency keys, persist immutable event records, and handle out-of-order/duplicate events.
  - Required events include:
    - `checkout.session.completed`
    - `customer.subscription.created/updated/deleted`
    - `invoice.created/finalized/paid/payment_failed/voided`
    - `payment_intent.succeeded/payment_failed/processing/canceled`
    - `charge.succeeded/refunded/dispute.created/dispute.closed`
    - `customer.updated`
    - `credit_note.created`
  - Gate: entitlement grant/revoke works correctly when webhooks are delayed, duplicated, missing temporarily, or received out of order.

- Entitlement:
  - Grant access only after confirmed paid invoice or approved business rule for trial/grace.
  - Maintain internal entitlement state derived from Stripe subscription, invoice, and dispute/refund status.
  - Define states: trialing, active, past_due, grace, paused, canceled, unpaid, refunded, disputed, revoked.
  - Gate: failed payment, subscription cancellation, refund, chargeback, coupon expiry, plan change, and proration each produce the correct entitlement update.

- Refund/revoke:
  - Define refund policy by product, time window, partial refund, coupon/credit behavior, tax reversal, and entitlement consequence.
  - Disputes must create a support/finance case and optionally restrict entitlement based on policy.
  - Gate: full refund, partial refund, credit note, invoice void, and dispute loss are reflected in customer access and finance ledger.

- Support/reconciliation:
  - Support can search by user ID, email, Stripe customer ID, subscription ID, invoice ID, payment intent ID, charge ID, coupon, entitlement ID, and support case.
  - Finance can reconcile Stripe balance transactions, payouts, fees, taxes, refunds, disputes, invoices, credits, and internal revenue/entitlement ledger.
  - Gate: daily reconciliation identifies unmatched Stripe events, unmatched internal ledger entries, settlement delays, failed payouts, and tax/reporting exceptions.

Blockers:
- Client-side checkout success grants entitlement without server-side Stripe confirmation.
- No idempotent webhook processing or immutable payment/event ledger.
- No tested handling for duplicate, delayed, failed, or out-of-order webhooks.
- Stripe product/price IDs are used directly as durable entitlement IDs.
- Tax configuration, customer tax location, exemption handling, or invoice tax reporting is unresolved.
- Coupon duration, proration, credits, or invoice adjustments do not match product/legal terms.
- No clear rule for entitlement during `past_due`, delayed settlement, SCA pending, payment processing, or invoice retry.
- Refunds, partial refunds, credit notes, and disputes do not update access and finance records.
- No support lookup across Stripe IDs, user IDs, invoice IDs, and entitlement IDs.
- No reconciliation process between Stripe balance transactions/payouts and internal ledger.
- Production and test Stripe keys/webhooks/catalog are not isolated.
- Payment UI omits renewal, cancellation, refund, tax, coupon, or material product limits.

Highest-risk launch gates before accepting real customer money:
1. Production Stripe isolation complete: live keys, live webhook endpoint, restricted API keys, webhook signature verification, alerting, and test-mode data excluded.
2. Catalog freeze complete: every live Stripe product/price/coupon/tax behavior maps to approved product terms and internal entitlement IDs.
3. Server-side payment truth complete: no durable access from client redirect, Apple Pay, Google Pay, or checkout session alone.
4. Webhook reliability test passed: duplicate, delayed, missing, and out-of-order events remain idempotent and reconcile.
5. Entitlement state-machine test passed for purchase, trial, renewal, upgrade, downgrade, cancellation, failed payment, grace, refund, dispute, and reactivation.
6. Invoice/tax test passed for all launch regions, including tax calculation, invoice email, customer billing details, coupons, credits, and exemptions if applicable.
7. Failed-payment recovery test passed: retries, dunning emails, payment method update, SCA recovery, grace/lockout timing, and support visibility.
8. Refund/dispute operations ready: documented policy, support macros, credit note handling, access revocation/adjustment, and finance treatment.
9. Reconciliation ready: daily job/dashboard compares Stripe events, invoices, charges, balance transactions, payouts, fees, taxes, refunds, disputes, and internal ledger.
10. Go/no-go monitoring ready: metrics and alerts for checkout starts, payment confirmations, invoice failures, webhook failures, entitlement grants, refunds, disputes, and reconciliation mismatches.
