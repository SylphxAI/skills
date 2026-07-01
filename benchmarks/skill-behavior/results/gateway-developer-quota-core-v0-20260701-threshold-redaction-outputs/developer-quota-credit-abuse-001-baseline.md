# Developer Quota & Credit Abuse Controls — Review

## 1. Control Inventory & Effectiveness

| Domain | Control | Type | Owner | Effectiveness |
|---|---|---|---|---|
| Free trial credits | Phone + email + domain verification | Preventive | Onboarding | M |
| Free trial credits | Hard cap + 14–30d expiry, non-extendable | Preventive | Billing | H |
| Promo codes | Single-use per `developer_id` + payment method | Preventive | Billing | M |
| Promo codes | Velocity check (≥3 codes/account/90d → flag) | Detective | Risk | H |
| Token usage | Real-time meter, per-`api_key` per-`model` | Detective | Platform | H |
| Token usage | Hard cap enforced **before** request (not after) | Preventive | Gateway | H |
| Expensive endpoints | Tier-gated access (e.g., top-tier only) | Preventive | Platform | H |
| Expensive endpoints | Per-endpoint $ budget with 80% soft warn | Detective | Billing | H |
| Multi-accounting | Device fingerprint + IP/ASN graph | Detective | Risk | M |
| Multi-accounting | Block duplicate payment instruments, phone, KYC doc | Preventive | Identity | H |
| Cost guardrails | Auto-kill at 100% spend; manual override required | Preventive | Billing | H |
| Cost guardrails | Anomaly alert if 3× rolling 7-day spend | Detective | Risk | M |

## 2. Trust Tier Matrix

| Tier | Verify | Trial | TPM | RPS | Expensive endpoints | Manual review |
|---|---|---|---|---|---|---|
| T0 Unverified | Email only | $5 / 7d | 10k | 5 | None | Yes, every top-up |
| T1 Verified | Email + phone | $25 / 30d | 60k | 20 | None | Sampled |
| T2 Paid (low) | + payment method | — | 250k | 50 | Mid-tier | On signal |
| T3 Paid (high) | + KYC-light / $1k+ history | — | 1M+ | 200 | All incl. premium | Exception only |
| T4 Enterprise | Contract + DPA | — | Custom | Custom | All | Pre-approved |

**Promotion gates:** T0→T1 on phone verify; T1→T2 on first $10 paid; T2→T3 after 60d clean history + $1k spend.

## 3. Multi-Accounting Signals (Detective Layer)

- Shared device fingerprint across ≥2 accounts
- Same payment instrument or KYC document hash
- ≥N accounts from one ASN within 24h
- Identical request timing/shape across accounts
- **Action:** merge to one account, void bonus credits, preserve billing trail.

## 4. Throttling & Cost Guardrails

- **Per-key:** TPM, RPM, concurrency (model-aware).
- **Per-account aggregate:** daily $ cap overrides per-key cap (defense-in-depth).
- **Burst:** token bucket with 2× burst then smooth.
- **Kill switch:** gateway returns `429` and stops new streams; in-flight allowed to finish to billable boundary.
- **Soft warn:** email + dashboard at 80%; in-API `X-Quota-Warning` header.
- **Hard stop:** 100% + 5-min grace; no overage by default.

## 5. Manual Review Workflow

```
Signal (auto) → Queue (Risk) → Triage SLA: 4h
   ├─ Legit → annotate, unlock, log
   ├─ Abuse → suspend, void credits, notify
   └─ Ambiguous → freeze top-ups, request evidence (7d)
```
Sampled daily review of T1 conversions and promo-code velocity for calibration.

## 6. Appeals Process

- **Channel:** in-product form + email ticket (linked); no Slack/DM.
- **Required:** developer_id, evidence, requester match on account.
- **SLA:** first response 24h, decision 5 business days.
- **Escalation:** L1 Support → L2 Risk → L3 Policy Committee.
- **Audit log:** immutable; stores decision rationale, evidence hash, reviewer.
- **Abuse-of-appeals cap:** ≥3 denied appeals/90d → appeals route to L3 only.

## 7. Support Messaging Controls

- Macro library only; **no** manual credits, refunds, or limit lifts via chat.
- All monetary changes require **dual approval** (Support + Billing) via admin console.
- Sensitive actions tokenized (no real card numbers, no internal flags exposed).
- Every conversation tagged `support_ticket_id`; PII redaction on export.

## 8. Key Findings & Decisions

1. **Enforce caps before request, not after** — billable overrun is the largest leak.
2. **Aggregate per-account cap > per-key cap** — multi-accounting bypasses per-key limits.
3. **KYC-light at T3** is the minimum for expensive endpoints; no exceptions.
4. **Appeals must not be a back-door credit path** — channel restriction + dual approval.
5. **Auto-kill requires manual override** — prevents silent overspend but needs on-call runbook.

**Top residual risks:** (a) residential proxy multi-accounting; (b) trial-credit farming via virtual cards; (c) appeal channel bypass. Recommend quarterly purple-team exercise and monthly control drift review.
