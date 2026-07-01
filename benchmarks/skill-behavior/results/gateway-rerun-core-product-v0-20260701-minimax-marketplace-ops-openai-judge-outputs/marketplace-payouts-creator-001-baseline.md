# AI Template Marketplace – Payouts Operating Manual

## 1. Account States (Lifecycle Gates)

| State | Allowed Actions | Blocked Actions |
|---|---|---|
| `PENDING_KYC` | Browse, submit KYC | List, sell, withdraw |
| `ACTIVE` | List, sell, request payout | — |
| `HOLD_REVIEW` | Sell (funds held) | Withdraw until cleared |
| `SUSPENDED` | Read-only | All financial actions |
| `CLOSED` | Tax docs download only | All actions |

State transitions are immutable, logged, and reversible only via Support Level 2 with reason code.

## 2. Creator Onboarding → KYC → Tax

- **KYC**: Government ID + selfie + address proof via Persona/Onfido. Re-verify every 24 months or on profile change.
- **Threshold triggers**: KYC required before first listing; bank verification required before first payout >$0.
- **Tax**: W-9 (US) / W-8BEN (non-US) collected via Stripe Connect. 1099-K issued at $600+ US earnings (configurable). VAT/GST collected at checkout, remitted by platform.
- **Sanctions**: OFAC/UN/EU list screening at onboarding + per payout batch.

## 3. Revenue Share & Fee Structure

| Tier | Creator Share | Platform Fee | Notes |
|---|---|---|---|
| Standard | 70% | 30% | Default |
| Pro (>$5k/yr) | 80% | 20% | Annual review |
| Enterprise | 90% | 10% | Negotiated, SLA |

- **Atomic fees**: Platform fee deducted at sale capture; refunds reverse fee proportionally.
- **Minimum payout**: $50 (lower to $10 for Pro+ to support emerging creators).
- **Currency**: Native USD; FX conversion at payout time using mid-market + 0.5% spread.

## 4. Refunds & Chargebacks

- **Refund window**: 14 days from purchase (template files may be revoked on refund).
- **Refund sourcing**: Deducted from seller's available balance first → pending balance → platform reserve → negative balance (collections).
- **Chargebacks**: Stripe webhook → seller account → `HOLD_REVIEW`. Seller has 7 days to submit evidence. Win/loss tracked.
- **Negative balance**: Blocks new listings; auto-deducts from next payouts until cleared. 90-day collections, then written off per policy.

## 5. Payout Holds & Fraud Review

**Automatic hold triggers** (funds frozen for X days after capture):
- New seller: 14 days rolling hold
- New bank account: 7 days
- Velocity >3σ from baseline
- IP/geo mismatch with KYC country
- Template flagged by content moderation

**Manual holds**: Trust & Safety only, with required reason code + expiry timestamp. Holds >30 days require Director approval.

## 6. Payout Schedule

- **Cadence**: Weekly (Tuesday 00:00 UTC) for balances ≥ minimum.
- **Same-day rush**: Available for Pro+ sellers, 1% fee, $100 max.
- **Rails**: ACH (US, T+2), SEPA (EU, T+1), Wise local (RoW, T+0–1).
- **Idempotency**: Stripe transfer ID is single source of truth; retries use original ID.

## 7. Seller Dashboard (Required Fields)

1. Lifetime earnings / pending / available / on hold (with reason)
2. Per-template performance: views → conversion → revenue → refunds
3. Payout history with transfer IDs + downloadable CSV
4. Refund/chargeback log with dispute status
5. Tax documents (YTD summary, 1099-K/W-8BEN archive)
6. KYC status + next re-verification date
7. Reserve balance & policy explanation

## 8. Disputes Workflow

| SLA | Action | Owner |
|---|---|---|
| T+0 | Buyer files dispute → freeze payout on related txn | System |
| T+1 | Notify seller via dashboard + email | System |
| T+7 | Seller submits evidence (template preview, license terms, usage logs) | Seller |
| T+10 | Platform submits to processor with evidence | Trust & Safety |
| T+30 | Decision logged; ledger adjusted; seller notified | System |

Loss → funds clawed back from seller balance. Win → hold released, sale stands.

## 9. Support Operations

- **Tier 1**: FAQ + chatbot for status ("Where's my payout?").
- **Tier 2**: KYC re-submission, payout trace, refund inquiries. SLA: 24h.
- **Tier 3**: Holds, chargebacks, disputes, sanctions, negative balance. SLA: 72h; Trust & Safety team.
- **Tier 4**: Legal, law enforcement requests, bankruptcy, AML flags. Legal counsel only.
- **Audit trail**: Every state change, hold, payout, and refund writes a row to `payout_audit_log` with `actor_id`, `reason_code`, `before_state`, `after_state`, `timestamp`. Retention: 7 years (tax) / 5 years (operational).

## 10. Key Rubric Decisions

- **Source of truth**: Stripe Connect for money movement; internal ledger for accounting; daily reconciliation job.
- **Reversibility**: All financial ops reversible only via explicit reversal entry (never UPDATE), preserving audit trail.
- **Segregation**: Platform never holds seller funds beyond float window required for chargeback coverage; reserves held in segregated account.
