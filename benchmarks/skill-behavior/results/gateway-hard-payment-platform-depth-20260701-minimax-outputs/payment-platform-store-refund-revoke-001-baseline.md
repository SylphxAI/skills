# Subscription Entitlement Audit

## 1. Provider Precedence (authoritative order)

| Rank | Source | Authority | Notes |
|------|--------|-----------|-------|
| 1 | Admin/support console override | Explicit human action | Always wins; requires ticket ID |
| 2 | Provider refund/chargeback event | Vendor-of-record truth | Revokes immediately, even mid-period |
| 3 | Provider active subscription (App Store / Play) | Vendor billing state | Source of grant |
| 4 | Stripe active subscription | Web billing state | Treated equal to #3 for web |
| 5 | Cached/last-known good entitlement | Derived | Read-only fallback, max 24h |

**Rules:** Rank 1–2 produce side effects; 3–4 produce grants; 5 only renders UI. Conflicts (e.g., Apple refund + Stripe still paid) resolve to the **most restrictive** state that matches actual money retained.

## 2. Entitlement Projection

Single `EntitlementState` record per `(user_id, product_id)`:

```
status ∈ {active, grace, retrying, revoked, refunded, chargeback, manual, never}
source_trail: [ {provider, txn_id, event, ts, evidence_url} ]
grace_until, retry_until, period_end, revoked_reason
manual_holds: [ {ticket, agent, expires_at} ]
```

**Projection rules (deterministic, idempotent):**
- Refund/chargeback → `revoked` regardless of `period_end`; web access mirrors.
- Restore before webhook → `pending_provider_event`, auto-grant on webhook arrival (≤7d window); expiry = provider `expires_at`.
- Family Sharing on Apple → shareable entitlement, but **no** refund rights for non-purchaser; owner refund revokes all members.
- Retry/billing-retry → `retrying` keeps access until `retry_until`, then `grace` until `grace_until`, then `revoked`.
- Partial refund → no downgrade unless SKU tier change; log only.

## 3. Support-Safe Correction

**Allowed actions** (all write `manual_holds` with mandatory `ticket_id`, `agent_id`, `reason_code`, `duration`):
- `grant_temporary` — max 14 days, auto-expires
- `revoke_immediate` — requires `fraud_confirmed` or `duplicate_purchase` evidence link
- `extend_period` — only when provider outage ticket referenced
- `migrate_provider` — moves entitlements, never duplicates

**Forbidden:** Direct DB edits without audit row. Credit issuance is financial — routes through Finance service, not entitlement table.

**Compensation matrix:**
- Apple refund, web still paid → revoke web, **do not** refund web automatically; queue finance review.
- Google restore pre-webhook → grant pending, then confirm on webhook (idempotency key = `original_order_id`).

## 4. Reconciliation

**Daily job (T+1, 02:00 UTC):**
1. Pull active subs from Apple/Play/Stripe APIs.
2. Join against `EntitlementState` by `original_transaction_id` / Stripe subscription ID.
3. Diffs:
   - Provider active, us inactive → **auto-grant** (grace 24h, page on-call).
   - Provider inactive, us active → flag for review (don't auto-revoke past 24h grace to avoid false positives).
4. **Refund/chargeback sweep:** rescan last 30d events; revoke any web entitlement whose paying subscription was refunded.
5. Orphan detection: `active > 7d` with no provider match → revoke + email.

**Weekly:** Family-sharing member drift, Stripe webhook backlog > 1h, retry-window anomalies.

## 5. Customer Messaging

| Event | Channel | Tone | What we say |
|-------|---------|------|-------------|
| Refund processed | Email + in-app | Neutral, factual | "Refund issued by [Provider]. Premium access ended [date]. Resubscribe: [link]" |
| Web revoked after Apple refund | Email | Apologetic, specific | "Your Apple refund also removed web access. If you also paid via web, contact support with both receipts." |
| Pending restore | In-app banner | Reassuring | "Restoring your purchase—this may take a few minutes." |
| Grace period entered | Push + email | Urgent | "Payment failed. Update billing by [date] to keep access." |
| Manual grant | Internal only | — | No customer email unless ticket closure reply. |

**Never** mention internal states (`retrying`, `manual_holds`) to customers.

## 6. Release Gates (must all pass)

- [ ] **Idempotency test:** same webhook replayed 100× → state unchanged.
- [ ] **Refund cascade:** Apple refund within 60s revokes web entitlement (E2E test).
- [ ] **Restore-before-webhook:** idempotent grant, no duplicate on webhook arrival.
- [ ] **Family sharing:** owner refund revokes 3/3 members; member restore does not grant owner.
- [ ] **Chargeback:** state = `chargeback` (distinct from `refunded`), blocks re-subscribe 180d.
- [ ] **Manual hold expiry:** 14d temporary grant auto-revokes; agent notified T-24h.
- [ ] **Reconciliation drift:** 0 mismatches over 7-day shadow run.
- [ ] **Audit log:** every entitlement mutation has `actor`, `ticket_id`, `prev_hash`.
- [ ] **Messaging:** copy reviewed by Legal for refund/chargeback paths.
- [ ] **Rollback:** feature flag `entitlement_v2` off → falls back to last green version, no data migration required.
