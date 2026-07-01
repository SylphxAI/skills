# Payout Operations Design — Global AI-Skill Marketplace

## 1. Ledger Model (4-Balance)

Every creator account holds **4 immutable sub-balances**. All movements are double-entry journal entries with `idempotency_key`.

| Sub-balance | Source | Payable out? |
|---|---|---|
| `available` | Earned, cleared jobs | Yes |
| `pending_clear` | Earned, still in dispute/clear window | No |
| `reserved` | Holds (dispute, fraud, tax under-review) | No |
| `refundable_to_buyer` | Chargeback clawback, must be settled | Drained first |

Transitions: `pending_clear → available` after **clear window** (T+7 default, +3 if non-card rail). `available → reserved` on hold event.

## 2. Creator Account States

```
PENDING_KYC → ACTIVE → PAYOUT_HOLD → SUSPENDED → CLOSED
                ↑↓          ↑↓
              REVIEW (fraud/sanctions/tax)
```

State transitions are gated by **all of**: KYC tier reached, sanctions screen = CLEAR, tax form status (see §6), no open `reserved` > $500.

## 3. Payout Lifecycle (State Machine)

```
SCHEDULED → SCREENING → FRAUD_CHECK → APPROVED → DISPATCHED
              ↓            ↓                         ↓
          REJECTED     HOLD                      SETTLED
                                                    ↓ (fail)
                                       RETURNED → RETRY_QUEUED → ESCALATED
```

| Stage | Trigger out | SLA | Owner |
|---|---|---|---|
| `SCREENING` | sanctions hit | <2 min | Sanctions service |
| `FRAUD_CHECK` | risk score ≥ 70 | <4 hr | Trust team queue |
| `APPROVED→DISPATCHED` | bank API ack | same day | Payments |
| `SETTLED` | bank confirm T+1–3 | — | — |

Idempotency: payout_id = hash(creator_id, period_end, amount). Retries only if status ∈ {QUEUED, RETURNED}.

## 4. Thresholds & Holds

| Rule | Value | Effect |
|---|---|---|
| Minimum payout (default) | $50 USD-equiv | Below → rolled into next cycle |
| Minimum payout (new creator <90d) | $200 | Fraud buffer |
| Auto-hold | dispute open OR refund window active OR sanctions re-review | blocks `available` portion |
| Reserve floor | 10% of trailing 30d revenue, capped $2,000 | Held in `reserved` |
| Velocity cap | $10,000/day per creator | Requires manual approval above |

## 5. Failure & Negative Balance Handling

**Failed bank transfer** → status `RETURNED`, funds return to `available`, creator notified, **free retry** for 7 days then $2.50 retry fee from `available`. After 3 failures → account → `ESCALATED`, creator support ticket auto-opened.

**Negative balance** (refund/chargeback > `available`):
1. First attempt: drain `refundable_to_buyer` then `reserved`.
2. If still negative → `available` of next payout **clawed back** until zero.
3. If creator inactive >14d with balance < –$25 → write-off to `bad_debt`, account → `REVIEW`, ticket opened with **30-day recovery** SLA before collections.

## 6. Compliance Gates

- **Tax forms**: W-9/W-8BEN collected at $600 lifetime threshold (US) / $0 for non-US W-8. Payout blocked if `tax_form_status = MISSING` and earnings ≥ $20 in period. Annual 1099/equivalent generated Jan 31.
- **Sanctions screening**: per creator at signup, per payout >$5,000, daily batch for all. Hits → auto-hold + legal review queue, payouts **never** silently dropped.
- **Fraud review**: risk model score (device + velocity + refund rate + chargeback rate). Score ≥ 70 → manual queue; ≥ 90 → immediate freeze.

## 7. Disputes, Refunds & Support Tickets

| Event | Ledger effect | Auto-actions |
|---|---|---|
| Buyer dispute opened | `available → reserved` for disputed amount | Notify creator, start 7-day evidence window |
| Dispute resolved (creator wins) | `reserved → available` | Resume payouts |
| Dispute resolved (buyer wins) | `reserved → refundable_to_buyer` | Refund dispatched |
| Refund pre-clear | Clawback in this order: `available → reserved → negative` | Ticket if clawback from `reserved` |
| Chargeback | Same as refund + $15 fee from `available` | Creator notified; 3+ → `REVIEW` |

**Support ticket SLAs**: payout status inquiries — 24 hr; failed transfer — 48 hr; negative balance — 72 hr; sanctions/fraud freeze — 5 business days (legal-reviewed).

## 8. Audit & Reconciliation

- Daily reconciliation job matches bank settlement file to internal ledger; mismatches auto-file ticket P1.
- Every state change writes to `payout_audit_log` (actor, before, after, reason_code, ticket_ref).
- Reversals only via compensating journal entry; no balance field is ever directly mutated.

**Key invariants** (regression-tested): `sum(sub_balances) = ledger_total`; `available ≥ 0` only after clawback; payout amount ≤ `available + refundable_to_buyer`.
