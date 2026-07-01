# Payment Webhook Backlog Incident Runbook (Stripe / Apple / Google)

**Severity:** SEV-2 (monetary & entitlement exposure) · **Owner:** Incident Commander (IC) · **Scribe:** Comms Lead

---

## 0. Triage & Freeze (T+0 to T+15m)

- Page IC, Payments Lead, Entitlements Lead, Finance Ops, Support Lead, Security.
- **Global freeze:** pause auto-fulfillment, disable `client_success → entitlement` projector until replay window closes.
- Snapshot ledger state, entitlement state, settlement inbox, and webhook DLQ counters per provider. Record T0 epoch.
- Open war room channel; declare single source of truth: `incident/<id>/state.md`.

---

## 1. Replay Strategy (T+15m to T+90m)

**Sequence (per provider, isolated):**

1. **Settlement file first** (already arrived) — ingest before events; this is the financial baseline.
2. **Refunds issued during outage** — pull from `refunds_outbox` (operator action ledger), queue for replay with `priority=high`.
3. **Webhook DLQ replay** in provider-timestamp order, **not arrival order**:
   - Stripe: replay by `event.created`, de-dup on `event.id`.
   - Apple App Store: App Store Server Notifications by `signedDate`; verify JWS; de-dup on `notificationUUID`.
   - Google Play: Pub/Sub messages by `eventTimeMillis`; de-dup on `message.messageId`.
4. **Out-of-order handling:** buffer events in a `pending_events` table keyed by `(provider, merchant_order_id, sequence_no)`; release in sequence only after parent event lands.
5. **Throttle:** ≤ 200 events/sec/provider; circuit-break on 5xx surge.

---

## 2. Idempotency Contract

Every event handler **must** be idempotent on `(provider, provider_event_id)`.

- Insert into `event_processed` before side effects; commit first, then act.
- Ledger entries use composite key `(provider, provider_event_id, attempt_no)` — attempt_no=0 wins; higher attempts no-op.
- Entitlements use `(user_id, sku, grant_id)`; duplicate grants reconcile to one row.
- A `dry_run=true` mode replays into a shadow ledger for diffing before commit.

---

## 3. Ledger Repair

- Reconcile each `payment_intent` / `transaction_id` against expected state (charge → capture → refund → fee).
- For out-of-order: if `refund` arrives before `charge.succeeded`, queue refund until charge lands; never auto-fail.
- Generate `ledger_diff_<run>.csv`: `expected_amount`, `actual_amount`, `delta`, `remediation`.
- Apply repairs via **double-entry correction** entries (not in-place mutation) to preserve audit trail.
- Flag any `delta > $0.01` for human review.

---

## 4. Entitlement Correction

- Re-derive entitlements from **authoritative ledger**, not webhook-derived flags.
- For each `grant_id` from projector: verify backing charge is captured and not refunded.
- **Revoke** entitlements where (a) charge refunded post-grant, (b) charge disputed/chargeback, (c) duplicate grant reconciled.
- **Preserve** legitimate grants (charge succeeded post-outage via retry, retries not yet captured).
- Produce `entitlement_deltas.json`; apply via idempotent `entitlement.correct(grant_id, action)` API.

---

## 5. Finance Reconciliation

- Match settlement file line items to internal ledger totals per provider, per day.
- Reconcile refunds issued during outage against `refunds_outbox` + provider confirmation.
- Produce `recon_report_<date>.xlsx`: gross volume, fees, refunds, net, variance, sign-off line.
- Hold any **unmatched settlement lines > $100** for Finance Manager approval before close.

---

## 6. Customer & Support Communications

- **Status page:** "Some payment confirmations delayed; access for paid features may be intermittent. No action required."
- **Support macros:** refund-during-outage, duplicate-charge, delayed-access — each tied to ticket tag `incident/<id>`.
- **Internal:** Support Lead briefed hourly; top 10 FAQ updated.
- **External (paid users):** proactive email only if access was wrongly granted then revoked > 24h.

---

## 7. Recovery Gates (Go / No-Go to close)

| Gate | Criterion | Owner |
|---|---|---|
| G1 Replay complete | DLQ depth = 0; shadow ledger diff = 0 | Payments |
| G2 Ledger balanced | All deltas ≤ $0.01 or human-signed | Finance Ops |
| G3 Entitlements correct | 100% projector grants verified vs ledger | Entitlements |
| G4 Settlement reconciled | recon_report variance = 0 (or signed) | Finance |
| G5 Comms updated | Status page → operational; CS briefed | Comms |
| G6 Postmortem scheduled | Within 5 business days | IC |

**Closeout** requires all six gates green; unfreeze projector only after G3. Archive `incident/<id>/` to cold storage with 7-year retention.
