# Scope — Add a Payment Feature to the App

Status: bound contract for the request as stated ("Add a payment feature to the
app"). The app is not identified in the request, so this scope holds the
generic contract and lists the decisions that re-bind it before implementation.

## 1. Objective

Allow a customer of the app to pay for a product or service, with provider-confirmed
charges, correct entitlement, and no loss or duplication of money records.

## 2. Owning boundary

- The app's backend owns webhook ingestion, the money ledger, and entitlement
  projection. The payment provider is the authority for money truth.
- The client (app UI) only renders provider-native checkout (hosted checkout or
  provider-hosted elements) and states derivable from server truth.

## 3. Terminal condition (done means)

- A customer completes a real end-to-end payment in test mode: checkout ->
  provider confirmation -> verified webhook -> idempotent ledger record ->
  entitlement granted -> correct UI state.
- Provider events (paid, failed, refunded, disputed) project correctly into
  ledger and entitlement, including out-of-order and duplicate delivery.
- No durable value is ever granted from client-only confirmation.

## 4. In scope

- One billing model (one-time purchase, subscription, or credits — decided in
  Open Decisions) and the catalog mapping (product/price IDs).
- Checkout via provider-native hosted checkout or hosted elements; the app never
  touches raw card data.
- Server-side webhook endpoint: signature verification, event-ID idempotency,
  out-of-order handling, retry/dead-letter handling.
- Minimal append-only money ledger recording provider-confirmed events
  (payment, refund, dispute) with idempotency keys.
- Entitlement projection from verified events; UI shows server truth only.
- Test-mode provider account, secret handling, and test/live separation.
- Failure handling: failed payments, webhook retries, duplicate events,
  provider-unavailable behavior (fail closed).
- Basic observability: payment event log/metrics, alert on unprocessed webhook
  backlog.
- Tests: webhook signature/idempotency/ordering, checkout success and failure,
  entitlement projection.

## 5. Not in scope

- Refund, dispute, chargeback, and customer-support resolution flows beyond
  recording the provider-confirmed event (own scope, with support tooling).
- Subscription management UI (upgrade/downgrade/pause/cancel portal) unless the
  chosen billing model requires it — then it is a named sub-scope.
- Tax, invoice, coupon, promo, gift-card, admin-grant, and finance-close
  automation.
- Wallet, Apple IAP, or Google Play Billing — only if the app is a store app
  (Open Decisions); multi-provider support is out of scope.
- Migration of existing customers or historical payment data.
- Loyalty, points, or using payment confusion as retention.
- Unrelated app architecture or feature changes.

## 6. Limits (floors — not negotiable)

- No raw card data (PAN) in app or server; use provider-hosted checkout or
  elements to stay out of PCI DSS scope.
- Webhook signature must be verified; unverifiable events are rejected.
- Provider event ID is the idempotency key. No dual-write: provider events are
  the sole billing truth.
- Never grant durable value from client-only confirmation.
- Ledger and entitlement changes are append-only; no silent edits — corrective
  events are appended and the projector replayed.
- Fail closed: checkout/readiness returns errors (e.g., 503) when the provider
  or required dependencies are unavailable — no silent success paths.
- Live-mode keys never ship in the client; test and live accounts are separate.
- Release is not complete without reconciliation evidence: every money,
  fee, tax, settlement, refund, and dispute check names its source, cadence,
  owner, and exception action.

## 7. Open decisions (re-bind this contract when resolved)

- Which app, its platform (web / mobile / store app), and existing backend —
  determines provider choice and whether store billing applies.
- Billing model: one-time purchase, subscription, or credits.
- Provider (default: Stripe, hosted checkout).
- Jurisdiction and tax obligations (determines whether tax/invoice work enters
  scope).
- Whether the app already has payment code to reuse (verify in the repository
  before implementation; this scope assumes none exists).

## 8. Assumptions

- The app has a backend that can receive webhooks and persist state.
- A provider account in test mode is available or can be created.
- No existing payment code in the app (to be verified before implementation).

## 9. Smallest complete first delivery

One billing model, one provider, hosted checkout, one webhook endpoint, and a
minimal ledger + entitlement projector. Add subscription management, refunds,
tax, and finance close only when the chosen model requires them.

## 10. Residuals

- Test-mode proof is not live-money proof. Live release needs a separate gate:
  provider live-mode activation, one real transaction, and reconciliation
  evidence — outside this scope's delivery but required before production.
