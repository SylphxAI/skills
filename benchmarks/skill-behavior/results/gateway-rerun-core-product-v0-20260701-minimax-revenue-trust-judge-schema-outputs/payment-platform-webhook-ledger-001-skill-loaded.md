```
Payment surfaces:
- Checkout: Stripe Payment Element (web), Stripe Terminal fallback, Apple Pay (web + mobile web), Google Pay (web + mobile web)
- Billing engine: Stripe Subscriptions (renewals, trials, pauses), Stripe Invoices (Hosted Invoice + invoice PDF), Stripe Tax, Stripe Coupons/Promotion Codes, Stripe Customer Portal
- Confirmation: Stripe webhooks (events v1, signing secret, raw payload archive), Stripe Dashboard backfill, fallback poll via /v1/events
- Entitlement: server-derived plan, seats, feature flags, trial state, overdue/paused access
- Support: Stripe Sigma + Dashboard, internal ledger joined by stripe_customer_id, order_id, invoice_id, charge_id, subscription_item_id
- Reconciliation: daily Stripe Reports + payouts vs ledger; monthly tax report to finance
Billing model:
- Recurring subscription (monthly/annual, multi-seat tiered), optional one-time add-ons, free trial, prorated upgrades/downgrades, dunning with grace window, no marketplace payouts
```

```
Readiness matrix:
- Catalog: Stripe Products/Prices immutable to history (payment-3); region/currency matrix reviewed; tax codes set per Stripe Tax rules; coupon eligibility and stack policy documented; A/B price tests version-controlled.
- Checkout: Apple Pay/Google Pay exposed only when Stripe Payment Method availability allows (payment-5); 3DS/SCA handled by Stripe; invoice-required customers (B2B) routed to Hosted Invoice URL; failure UI explains retry vs update-card; SCA re-try path tested for EU cards.
- Confirmation: Stripe webhook endpoint signed; idempotency key on every internal write (payment-2); raw payload archived; replay tool tested; out-of-order events handled (charge.succeeded before invoice.created tested).
- Entitlement: source-of-truth is webhook-driven server job, never client token (payment-1); entitlement IDs decoupled from Price IDs (payment-3); mid-cycle upgrade/downgrade proration correct; trial-end, past_due, unpaid, canceled, paused states mapped to access policy; restore-purchase path is N/A for web, but Customer Portal restores method-update and resume (payment-4).
- Refund/revoke: refunds only via Stripe API with reason metadata; partial refunds supported; disputed charges trigger read-only access pending outcome (payment-6 mirror); revocations idempotent and logged in immutable ledger.
- Support/reconciliation: support tool searches by stripe_customer_id, email, invoice.id, charge.id, subscription.id, entitlement.id, internal order_id (payment-10); finance can export Stripe Balance Summary, payouts, tax transactions; dispute alerts feed support queue.
```

```
Blockers (must be green before real money):
- B1 Webhook signature verification + raw payload archive in production (payment-1, payment-2).
- B2 Idempotent grant and revoke handlers tested with replay including out-of-order delivery (payment-2).
- B3 Stripe Tax enabled for every active jurisdiction; tax IDs collected where required (payment-7).
- B4 Dunning + grace policy coded and tested: past_due keeps degraded access, unpaid revokes on day X (payment-1).
- B5 Customer Portal live with plan change, cancel, payment-method update, invoice history (payment-7).
- B6 Invoice-to-collect path for B2B customers (NET terms) verified end-to-end.
- B7 Refund/dispute macros attached to support cases; audit trail of reason + actor (payment-9).
- B8 Finance reconciliation job: Stripe reports vs internal ledger, variance tolerance defined (payment-2, payment-10).
- B9 Coupon abuse guardrails: redemption limits, eligibility windows, stacking rules enforced server-side.
- B10 Disclosure copy on checkout: renewal, trial length, price, period, cancel path, refund policy (payment-9).
```

```
Launch gates (highest-risk, pass before flipping live):
G1 Money gate
   - Stripe live keys in separate vault from test; webhook endpoint points to prod URL with live signing secret.
   - Feature flag "real_money" off; only G1 admin can flip per region.
G2 Catalog gate
   - Price IDs in production match signed-off matrix; currency rounding verified; tax reviewed by finance.
G3 Confirmation gate
   - 72-hour shadow mode: webhooks processed in prod against sandbox-equivalent replay; ledger diff = 0.
   - Chaos test: drop, duplicate, and reorder invoice.*, customer.subscription.*, charge.dispute.created events; no duplicate grants, no missed revokes.
G4 Entitlement gate
   - Trial-expired, past_due, unpaid, canceled, paused access states reviewed by product + support.
   - Upgrade/downgrade proration verified against a spreadsheet from finance for 3 representative plans.
G5 Dunning + failure gate
   - Smart Retries enabled; after final retry, access downgrade timing matches policy; customer email sequence live; update-card link functional.
G6 Refund + dispute gate
   - Refund test on live-mode $1 invoice, ledger entry created, entitlement adjusted, support sees event.
   - Dispute webhook fan-out to support queue verified; access policy during dispute confirmed.
G7 Reconciliation gate
   - Three consecutive daily reconciliation runs show zero unmatched transactions, or all variances logged in finance tracker with owner + ETA.
G8 Compliance gate
   - Terms, Privacy, DPA, refund policy, tax disclosure published; PCI scope confirmed via Stripe SAQ-A; GDPR data-export/delete covers Stripe objects.
G9 Support readiness gate
   - Runbook covers: failed renewal, stuck webhook, dispute, refund, double-charge, tax miscalc, promo abuse, chargeback.
   - Support tooling can resolve a paid customer by email in <60 seconds (payment-10).

Rollback:
- Disable "real_money" flag per region; preserve entitlements already granted; refund queue drained; post-mortem within 5 business days.
```
