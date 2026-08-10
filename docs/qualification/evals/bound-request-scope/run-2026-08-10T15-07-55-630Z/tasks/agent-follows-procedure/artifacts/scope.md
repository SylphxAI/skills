# Scope — Add a payment feature to the app

Method: `bound-request-scope` (SKILL.md + full-method.md). Ceremony level: **deep** —
real money movement and a public contract are irreversible material changes, so
a stable contract precedes implementation.

## Objective

A customer can complete a one-time payment for a defined product/entitlement
inside the app, and the app reliably grants the entitlement and shows a receipt,
with every money claim verified from the payment provider — never from the
client. Deliver the smallest end-to-end path that proves this, then stop.

## Owning boundary

- The **app** owns: checkout UX, server-side provider verification, entitlement
  grant, receipt record, and failure/cancel recovery.
- The **payment provider** owns: card capture, charge processing, fraud
  screening, and money movement. The app never holds, stores, or processes card
  data (no PCI scope).
- The **app's existing identity/entitlement store** is the sole authority for
  who receives what; no second entitlement authority is created.

## In scope

- One purchaseable item with one price, on the provider-native checkout
  surface (no custom payment UI).
- Server-side verification of provider events/webhooks (signature-checked),
  with idempotent entitlement grant and receipt persisted once per payment.
- Cancel, expired-session, and failed-payment states handled with a clear
  outcome to the user; duplicate and replayed events are no-ops.
- Minimal receipt record (payment id, amount, currency, item, user, timestamp)
  visible to the user and queryable by the app owner.
- A narrow test that exercises the real claim: a test payment produces
  provider charge + entitlement grant + receipt, and a forged/client-only claim
  is rejected.

## Out of scope

- Subscriptions, plans, upgrades, trials, and proration.
- Refunds, chargebacks, disputes, and tax/invoice management (provider-side
  tooling may be used manually; no app automation).
- Multi-currency, promotions, coupons, gifting, or a storefront catalog.
- Payment admin UI beyond the minimal receipt view.
- Any custom ledger, billing engine, wallet, or balance system.

## Non-goals

- No custom card handling or any path that would put the app in PCI scope.
- No trust of client-side success payloads; the provider's signed event is the
  only money authority.
- No fraud engine beyond what the provider ships by default.
- No second payment provider, abstraction layer, or payment platform until a
  named requirement forces it.
- No cross-app or multi-tenant billing.

## Cut lines (decided exclusions)

- Cut all subscription/complex-billing behavior now, even if "payments" is
  later read broadly; this contract is for one-time payment only.
- Cut refund/chargeback automation, tax documents, and invoicing — manual
  provider tooling is sufficient for the terminal below.
- Cut any custom provider abstraction: call the chosen provider directly.
- Cut analytics, dashboards, and marketing instrumentation.
- Defer any marketplace/merchant-of-record questions; the app is the merchant
  of record in this scope.

## Smallest complete path

1. **Avoid**: no custom payment code, no self-hosted checkout, no custom
   ledger. Provider-native checkout is the complete design for one item at one
   price.
2. **Reuse**: the app's existing identity, session, and entitlement store; no
   new user or entitlement system.
3. **Platform/provider native**: the chosen provider's hosted checkout and
   signed webhook/verification API (established, maintained, security-sensitive
   boundary — an ecosystem primitive beats local code here).
4. **Existing dependency**: add the provider's official SDK only; no other new
   dependency.
5. **Custom code only where required**: one server endpoint that verifies the
   provider event and grants the entitlement idempotently, plus one receipt
   view. That is the full custom surface.

Terminal condition: with provider test mode, a real test purchase completes;
the app shows the entitlement and receipt; a forged success or replayed event
does not double-grant; canceled/expired purchases leave no entitlement.

Risk floor: money-correctness and idempotency (never double-grant, never grant
unverified), zero card data on app surfaces, provider keys least-privileged and
server-only, receipts append-only, and a documented recovery path for
duplicate/missing webhooks.

## Residuals (must confirm before implementation)

- **App identity**: this workspace contains no app source; the contract assumes
  an app with existing auth and an entitlement store. Confirm the repo/boundary.
- **Provider and market**: Stripe, platform IAP, or other depends on the app's
  store/market; provider choice is the one decision that changes this path.
- **Item and price**: what is being sold, and its price, are not yet defined.
- **Compliance owner**: who handles refunds, disputes, and tax obligations in
  the operating jurisdiction.

Change this contract only when the user changes the objective or evidence
proves the terminal unsafe; otherwise these are the standing in/out lines.
