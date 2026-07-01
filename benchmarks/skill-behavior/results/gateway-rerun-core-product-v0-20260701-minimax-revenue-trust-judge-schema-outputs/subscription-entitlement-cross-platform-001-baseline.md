# Subscription Entitlement Design — Single User, Multi-Source

## 1. Canonical Entitlement Model (Server-Side Source of Truth)

| Field | Type | Notes |
|---|---|---|
| `user_id` | UUID | Stable identity across channels |
| `entitlement_status` | enum | `active`, `grace`, `lapsed`, `revoked`, `refunded`, `chargeback` |
| `plan_id` | string | Logical plan; channel-specific SKUs map to it |
| `period_end` | timestamp | Hard expiry; grace extends `grace_end` |
| `grace_end` | timestamp | Up to 7 days for web/team, platform-rules for stores |
| `source` | enum | `stripe`, `appstore`, `play`, `team_invoice` |
| `source_ref` | string | Subscription/transaction ID |
| `cross_source_priority` | int | Determines conflicting grants |
| `family_shared` | bool | True for Apple Family Sharing; affects transferability |
| `seat_link` | UUID | Present iff `source=team_invoice`; resolves to team |

**Rule:** Device reads are *never* authoritative. Server-issued signed entitlement token (JWT, 24h, refresh on auth) is the only grant the client trusts.

## 2. Source Priority & Precedence

When multiple grants exist for one user, resolve deterministically:
1. `team_invoice` (contractual — B2B overrides)
2. `stripe` (direct, user-paid)
3. `appstore` / `play` (platform-managed)

Family-shared App Store grants rank **below** a directly held paid plan from any channel — the user owns both; the owned plan wins for feature parity, the shared one wins for cross-household content access (per Apple policy).

## 3. Channel-Specific Validation

| Channel | Validator | Cadence | Credential |
|---|---|---|---|
| Stripe | `GET /v1/subscriptions/:id` + signature webhook | Real-time on event + nightly reconcile | `customer.subscription.*` |
| App Store | App Store Server API v2 + JWS signedTransactions | On purchase + App Store Server Notifications v2 | `signedTransactions` |
| Google Play | Real-time Developer Notifications + Purchases.subscriptionsv2 | RTD + on launch | `purchaseToken` |
| Team invoice | Internal AR system webhook | On issued/invoice change | invoice_id → seat |

## 4. Edge Case Matrix

| Event | Behavior |
|---|---|
| **Restore purchases** | Client sends all receipts/tokens; server validates each, upserts `entitlements` rows, returns merged canonical state. Web/team are server-known, no restore needed. |
| **Plan downgrade** | Downgrade takes effect at `period_end`; user keeps current tier until then. Mid-cycle downgrade from Pro→Basic does not refund, retains credits/usage already earned. |
| **Grace period** | Web/team: 7 days `card_failed` → `grace`; full feature access. App Store: deferred by Apple billing retry (up to ~16 days) — mirror as `grace`. Play: up to 30 days per Play policy. Client treats `grace` ≡ `active`. |
| **Refund (voluntary)** | App Store/Play: validate `notificationType=REFUND`; flip to `refunded`; revoke at period end (per store policy) or immediately for fraud signal. Stripe: revoke immediately on refund webhook; prorate in ledger. |
| **Chargeback** | Stripe dispute webhook → `chargeback` state for **30 days**, no entitlement changes yet; if lost: revoke + mark `fraud_score++`. App Store/Play: rare but treat identically via refund/consumer-rights revocation. |
| **Family sharing edge cases** | Purchaser leaves family → shared entitlements drop at next renewal. Shared Apple sub cannot be transferred cross-household. Server re-checks `family_shared` flag on App Store notifications. If user has both a personal Play sub and a shared iOS sub, surface **both** in account UI with clear labels. |
| **Team seat changes** | Admin removes user → `seat_link` nulled, `period_end` flagged for soft-expiry at current period_end (no mid-term penalty unless contract says so). Admin reduces seats → reconcile active members; over-allocation does not auto-evict, admin must select. New seat added mid-term → pro-rate. |

## 5. Offline Mobile Access

On launch without network:
1. **Cache:** last signed JWT, last `entitlement_status`, `period_end`.
2. **Behavior:** grant access if `now < period_end + min(grace, 24h_buffer)`. Cap offline-grace at 7 days.
3. **Hard fail** (read/write premium content) if cached `period_end` is past and no network for re-check. Never silently extend offline indefinitely.
4. **Restore path:** next online tick triggers `restorePurchases`; if server says `revoked`, client purges offline cache and forces re-auth.

## 6. Audit & Reconciliation

- All grant/revoke events append-only in `entitlement_ledger` with `actor`, `source_ref`, `prev_state`, `new_state`.
- Nightly job reconciles server state vs. Stripe / App Store / Play / invoice systems.
- Discrepancies > 1% trigger alert; manual review queue for chargebacks and refunds.
- Per-channel revenue recognized independently (ASC 606); refunds/chargebacks reduce recognized revenue in the period they occur.

**Single decision rule for every edge case:** the state that maximizes user trust (no false lapses) within the constraint that *only validated receipts can mint entitlements*.
