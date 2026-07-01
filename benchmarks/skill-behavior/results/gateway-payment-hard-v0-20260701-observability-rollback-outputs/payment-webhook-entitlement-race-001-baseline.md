# Cross-Platform Subscription Payment Audit Plan

## 1. Safest Ledger — Event-Sourced, Idempotent, Causality-Aware

**Single source of truth: append-only ledger (`subscription_events`).** Never store derived state; compute entitlements by replaying events per subscription ID. This makes out-of-order arrival safe — final state is order-independent.

**Schema (minimal):**
| Field | Purpose |
|---|---|
| `event_id` (UUID) | Primary key, dedupe |
| `subscription_id` | Owned by backend, generated *before* first platform event |
| `idempotency_key` | UNIQUE; = platform-native txn/renewal/refund ID + event_type |
| `event_type` | enum: `purchase`, `renewal`, `expiry`, `refund`, `chargeback`, `promo_apply`, `restore`, `entitlement_grant`, `entitlement_revoke`, `correction` |
| `platform` | `apple`, `google`, `stripe`, `backend` |
| `payload` | JSONB: raw + normalized (price, currency, period_end) |
| `causal_parent_ids` | array of `event_id` — establishes dependency graph |
| `received_at`, `effective_at` | Differ when delivery is delayed |
| `replay_safe` | bool — flags events that must be re-evaluated against full chain |

**Rules:**
- **No state mutation outside the ledger.** Entitlement service is a pure projection (materialized view) rebuilt from events.
- **Idempotency on ingestion:** INSERT … ON CONFLICT (`idempotency_key`) DO NOTHING. Duplicate webhooks are no-ops.
- **Out-of-order:** if `effective_at < latest_seen`, queue for **re-evaluation pass** that walks `causal_parent_ids` and re-applies the projection. Never skip; never assume latest-wins.
- **Backend grants** must reference a prior platform event via `causal_parent_ids`; orphan grants are quarantined to a `pending_review` table and never auto-activate entitlements.
- **Refund/chargeback** events carry negative economics; projection applies them *retroactively* and recomputes proration — ledger entries are append-only, derived counters are rebuilt.
- **Promo codes** modeled as a separate `promo_grant` event with `causal_parent_id` → first paid event; expiry independent of renewal chain.
- **Restore purchases** is a *replay* operation, not a new grant: triggers a full per-user event-chain reconstruction from the earliest `purchase`.

## 2. Reconciliation — Daily, Automated, Disputable

Run three jobs nightly, each writes a `recon_report` row:

1. **Internal vs. platform** — sum of `event_payload.amount` per platform matches dashboard totals (Apple Sales/Reports, Google Fin Reports, Stripe payouts). Variance > 0.1% → alert.
2. **Ledger vs. entitlements** — count of active entitlements equals count of projections whose `status = active`. Drift = ledger bug.
3. **Refund aging** — refunds unaccompanied by downstream `entitlement_revoke` within 24h = SLA breach; auto-quarantine the subscription.

All discrepancies route to a **dispute queue** with: event_id, platform receipt URL, diff, suggested correction. Corrections are new `correction` events, never in-place edits.

## 3. Support Tooling

| Tool | Capability | Safety control |
|---|---|---|
| **Customer 360** | Full event timeline + entitlement projection snapshot | Read-only by default |
| **Replay button** | Rebuild projection from event N | Diffs against current; requires justification comment + ticket |
| **Manual grant** | Creates `entitlement_grant` with required `causal_parent_id` | Two-person approval, manager if grant > 7 days |
| **Refund issuance** | Records `refund` event; auto-revokes if active | Mirrors what webhook would have done; logged separately |
| **Dispute viewer** | Shows chain `causality` for any subscription | Used for chargeback evidence packets |

**No "edit ledger" UI exists.** Everything is an additive event.

## 4. Release-Readiness Plan

**Pre-launch gates (all must pass):**
- [ ] Idempotency test: 10× duplicate webhooks → 1 ledger row
- [ ] Out-of-order test: refund arriving before purchase webhook → final state = refunded
- [ ] Restore test on fresh device → entitlements match prior state
- [ ] Chargeback + active entitlement → revoke within 60s
- [ ] Reconciliation dry-run for 14 days of sandbox data, zero un-explained drift

**Rollout:**
1. **Shadow mode (2 wk):** Ingest all four platforms, log projections, do *not* gate features. Diff shadow vs. legacy system.
2. **Internal cohort (1 wk):** Employees only, full feature gating.
3. **1% canary (1 wk):** Monitor entitlement_grant lag, refund-revoke lag, recon variance.
4. **10% → 100%** in 10% steps, 3 days each; rollback trigger = recon variance >0.5% or any orphan grant.

**Post-launch (90 days):** weekly ledger-integrity audit, monthly platform reconciliation review, quarterly disaster-recovery drill (rebuild projection DB from raw events).
