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
- `quota-credit-abuse-4` — Detect abuse through velocity, multi-accounting, disposable identity, promo cycling, token churn, endpoint mix, failed jobs, abnormal retries, and shared infrastructure signals without disclosing exact detection thresholds.
- `quota-credit-abuse-5` — Throttle by operation severity and reversibility using policy bands: warn, soft cap, queue, cooldown, require verification, manual review, suspend credits, or block costly endpoints.
- `quota-credit-abuse-6` — Protect legitimate scale-ups with clear upgrade path, usage forecasts, support route, appeal evidence, and temporary limit increases.
- `quota-credit-abuse-7` — Monitor cost, activation, conversion, false positives, support tickets, abuse loss, quota exceptions, and developer retention together.
- `quota-credit-abuse-8` — Feed confirmed abuse and appeal reversals back into quota tiers, promo mechanics, risk models, docs, and support macros.
- `quota-credit-abuse-9` — Every throttle or credit-control change needs a paired success metric and harm metric; never ship only a cost-saving metric.
- `quota-credit-abuse-10` — Manual review and appeals need quality metrics: time to decision, reversal rate, repeat harm after reversal, second-review coverage, and developer retention after appeal.
- `quota-credit-abuse-11` — Graduation paths need measurable health: trial-to-paid conversion, verified-domain activation, payment verification completion, production app certification, committed-use upgrades, and exception-to-contract conversion.
- `quota-credit-abuse-12` — External/public artifacts must redact numeric risk cutoffs, cluster counts, velocity limits, spend caps, percentage triggers, unit multipliers, review thresholds, SLA-hour targets, and ban/reversal limits unless an authorized source of truth supplied those values for an internal-only audience.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Promo credit launch | Add ledger and expiry | Campaign controls | Promo cycling |
| Expensive endpoint spike | Throttle by trust tier | Cost and identity signals, with exact gates redacted | Cost runaway |
| Legitimate scale-up | Offer upgrade path | Usage forecast | Developer churn |
| Multi-account signal | Queue review | Evidence packet, without disclosing linking thresholds | False positive |
| Appeal approved | Restore and learn | Appeal reason and reversal learning | Repeat harm |

## Threshold redaction pattern

For externally shareable output, describe controls as policy bands and internal parameters. Do not invent or reveal concrete numbers such as risk-score cutoffs, number of linked accounts, percentage alert triggers, exact caps, unit multipliers, review thresholds, or SLA-hour promises. Good wording: `risk-band based throttle`, `tier-specific internal cap`, `material metric deterioration`, `review-band breach`, `published support SLA`, `authorized internal config`. Bad wording: concrete cutoffs that an attacker could tune around or that a user did not provide from a source of truth.

Developer/support copy should explain the decision reason category, next safe action, appeal route, and expected status visibility without revealing evasion details. Internal runbooks may store exact parameters separately with owner, version, rollout guardrail, rollback path, and audit log.

## Quota credit abuse checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Measurement matrix

Treat quota controls as a product system, not only a fraud wall.

| Metric family | Examples | Why it matters | Bad sign |
| --- | --- | --- | --- |
| Activation | first successful API call, first successful expensive endpoint after verification, time to first value, docs-to-key completion | Proves controls are not killing legitimate onboarding | credits saved but fewer developers reach first value |
| Conversion | trial-to-paid conversion, payment verification completion, domain verification completion, app certification, committed-use upgrade, temporary lift to contract conversion | Shows whether graduation path works | high throttle rate with flat or falling paid conversion |
| Cost | credit burn by source, cost per activated developer, cost per paid conversion, expensive endpoint spend, storage/bandwidth/GPU burn, cost anomaly MTTR | Keeps generosity commercially bounded | high free-credit cost with low activation quality |
| Abuse loss | confirmed promo cycling value, blocked duplicate credit value, chargeback/credit reversal loss, repeated expensive endpoint abuse | Quantifies prevented loss without exposing thresholds | loss moves to a new campaign/source after control launch |
| False positives | appeal reversal rate, manual-review overturn rate, support-restored credits, legitimate scale-up blocked, trusted developer throttle rate | Protects good developers from silent harm | low abuse loss but high reversal/support restore rate |
| Support load | quota-ticket rate, appeal status latency, time to first response, macro deflection, second-review queue age | Ensures support path is real | throttles push load to support faster than Trust Ops can review |
| Developer retention | retained developers by trust tier and cohort, churn after throttle, churn after denied appeal, return after successful appeal | Measures long-term trust | developers leave after controls even when not abusive |
| Model/review quality | precision/recall on reviewed cases, reviewer disagreement, repeat harm after approved appeal, repeated false-positive feature | Improves controls over time | same false-positive cluster repeats across campaigns |
| Exception health | temporary limit increases, exception expiry compliance, forecast accuracy, exception-to-paid conversion | Keeps legitimate scale-ups safe | many exceptions never expire or never convert |

Minimum reporting slice:

```text
Before / after by trust tier:
- activation: first_value_rate, time_to_first_value
- conversion: trial_to_paid_rate, verification_completion_rate
- cost: credit_burn_per_activated_developer, expensive_endpoint_cost
- abuse: confirmed_abuse_loss, blocked_credit_value
- harm: appeal_reversal_rate, legitimate_scaleup_blocked_rate, support_ticket_rate
- retention: retention_after_throttle, churn_after_denied_appeal
```

## Event schema

Track: `developer_credit_issued`, `developer_quota_applied`, `developer_usage_risk_scored`, `developer_quota_throttled`, `developer_credit_suspended`, `developer_quota_exception_granted`, `developer_quota_appeal_resolved`, `developer_credit_cost_reviewed`, `developer_first_value_reached`, `developer_verification_completed`, `developer_trial_converted`, `developer_scaleup_requested`, `developer_scaleup_granted`, `developer_support_ticket_opened`, `developer_retained_after_throttle`.

Recommended properties: `developer_id, account_id, app_id, credit_source, quota_unit, trust_tier, operation_type, cost_bucket, signal_type, action_type, reviewer_id, appeal_status, exception_status, ledger_status, decision, activation_stage, conversion_stage, support_ticket_id, false_positive_reason, retention_cohort, cost_attribution_id, threshold_policy_version`. Store exact thresholds only in authorized internal configuration, not in public artifacts.
