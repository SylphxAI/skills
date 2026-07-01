# Developer Quota Credit Abuse Review Patterns

## Developer Quota Credit Abuse Review state machine

```text
credit_issued -> quota_applied -> usage_scored -> throttle_decided -> review_resolved -> graduation_or_reversal
       |              |               |              |                   |                 |
       v              v               v              v                   v                 v
 ledger_gap    quota_gap       signal_blindspot false_positive     appeal_gap        cost_runaway
```

## Rule IDs

- `quota-credit-abuse-1` — Define quota units and credit value by cost driver: API calls, tokens, GPU seconds, storage, bandwidth, webhooks, email/SMS, builds, indexing, or payouts.
- `quota-credit-abuse-2` — Maintain a credit ledger with source, campaign, expiry, consumption, refund/reversal, account linkage, and cost attribution.
- `quota-credit-abuse-3` — Use trust tiers for anonymous, email-verified, domain-verified, payment-verified, app-certified, contract, and production developers.
- `quota-credit-abuse-4` — Detect abuse through velocity, multi-accounting, disposable identity, promo cycling, token churn, endpoint mix, failed jobs, abnormal retries, and shared infrastructure signals.
- `quota-credit-abuse-5` — Throttle by operation severity and reversibility: warn, soft cap, queue, cooldown, require verification, manual review, suspend credits, or block costly endpoints.
- `quota-credit-abuse-6` — Protect legitimate scale-ups with clear upgrade path, usage forecasts, support route, appeal evidence, and temporary limit increases.
- `quota-credit-abuse-7` — Monitor cost, activation, conversion, false positives, support tickets, abuse loss, quota exceptions, and developer retention together.
- `quota-credit-abuse-8` — Feed confirmed abuse and appeal reversals back into quota tiers, promo mechanics, risk models, docs, and support macros.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Promo credit launch | Add ledger and expiry | Campaign controls | Promo cycling |
| Expensive endpoint spike | Throttle by trust tier | Cost and identity signals | Cost runaway |
| Legitimate scale-up | Offer upgrade path | Usage forecast | Developer churn |
| Multi-account signal | Queue review | Evidence packet | False positive |
| Appeal approved | Restore and learn | Appeal reason | Repeat harm |

## Quota credit abuse checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `developer_credit_issued`, `developer_quota_applied`, `developer_usage_risk_scored`, `developer_quota_throttled`, `developer_credit_suspended`, `developer_quota_exception_granted`, `developer_quota_appeal_resolved`, `developer_credit_cost_reviewed`.

Recommended properties: `developer_id, account_id, app_id, credit_source, quota_unit, trust_tier, operation_type, cost_bucket, signal_type, action_type, reviewer_id, appeal_status, exception_status, ledger_status, decision`.
