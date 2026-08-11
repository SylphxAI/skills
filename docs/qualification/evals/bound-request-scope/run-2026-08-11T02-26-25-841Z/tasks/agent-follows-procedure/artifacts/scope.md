# Scope — Add a payment feature to the app

Status: stable contract (change only if the objective changes or evidence proves the terminal unsafe/impossible).
Method: `bound-request-scope` (objective, owning boundary, in/out, non-goals, cut lines, smallest complete path).

## Objective

Let a user pay for an eligible order/item in the app, with the app durably
recording the verified payment result as the authority for order fulfillment.

## Owning boundary

The app's existing purchase/order flow owns this feature end-to-end: checkout
initiation → provider-hosted payment → verified payment notification → order
state update → user-facing confirmation.

The payment provider owns card processing, PCI scope, and funds settlement.
The app owns integration, notification verification, idempotency, and order
state authority. No code outside the purchase flow changes.

## Observable terminal condition

A user completes a real payment end-to-end in provider test mode and the order
transitions to `paid` **only** via signature-verified notification, is safe
under duplicate/late notifications, and the user sees confirmation. Invalid or
unverified callbacks change no state.

## In scope

- Checkout entry from existing order/cart state
- Provider-hosted payment page (provider-native primitive; no custom card form)
- Verified payment notification (webhook signature check) + success/cancel return handling
- Idempotent order transition (`pending → paid` / `canceled`), payment record with provider reference
- Confirmation on success; clear failure/cancel path
- Minimal observability: payment event log and failed-verification alerting

## Out of scope

- Processing or storing card data (PCI) — provider-hosted page only
- Multi-provider gateway abstraction
- Subscriptions/recurring billing
- Payouts, marketplace splits, escrow
- Fraud/risk platform, chargeback management
- Saved payment methods, wallets, one-click pay
- Admin refunds UI, invoicing, receipts/PDF
- Multi-currency, taxes (unless the order model already prices them)

## Non-goals

- No auth, order-model, or data-platform redesign
- No new service, queue, or control plane
- No new abstraction layer beyond the provider's official SDK
- No custom payment UI beyond redirect/confirmation surfaces

## Cut lines

Under scope thrash, cut in order: multi-currency → saved methods → refunds UI →
receipts/admin tooling → multi-provider support. Never cut: signature
verification, idempotency, verified-only state transition, or the provider-hosted
page (PCI floor). If a cut removes the terminal condition, stop and re-scope
instead.

## Smallest complete path

Ladder result (first rung that meets the floor):

1. **Avoid** — no payment processor, gateway abstraction, or new service.
2. **Reuse** — existing cart/order state, auth/session, and DB; reuse an
   already-admitted payment SDK if one exists.
3. **Provider-native primitive** — provider-hosted Checkout + signed webhook
   events (removes PCI scope; no custom card form).
4. **Existing dependency** — the provider's official SDK is the only new
   dependency, and only if one is not already admitted.
5. **Direct local code** for the small glue: signature verification,
   idempotency handling, and the order state transition — narrow, no wrapper.
6. **No custom service or abstraction.**

Resulting path: existing order flow → create provider Checkout → redirect →
verified webhook marks order `paid` (idempotent) → confirmation.
Verification: end-to-end test in provider test mode covering success, cancel,
duplicate notification, and invalid signature.

## Assumptions and residuals

- This workspace contains no app code; the contract is app-agnostic and must be
  re-grounded against the actual app before implementation.
- Assumed: single one-time payment per order, single currency matching the app
  locale, provider selected by existing org account.
- Hard external prerequisites (do not fabricate): live/staging provider
  account, credentials, and any jurisdiction-specific tax/legal requirements.
- Unverified in this run: actual app stack, order state model, admitted
  dependencies, provider account availability. Decision-critical evidence to
  acquire at grounding: order model, auth boundary, dependency list, provider
  account status.
