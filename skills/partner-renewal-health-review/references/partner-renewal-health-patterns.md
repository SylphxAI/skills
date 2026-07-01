# Partner Renewal Health Patterns

## Partner Renewal Health Review state machine

```text
renewal_window_open -> scorecard_refreshed -> risks_reviewed -> decision_made -> plan_executed -> health_monitored
       |                    |                |               |                |
       v                    v                v               v                v
 missing_data        vanity_score     customer_harm   weak_plan        renewal_drift
```

## Rule IDs

- `partner-renewal-1` — Define partner type, renewal date, contract terms, revenue, pipeline, customer outcomes, support quality, certification, compliance, and owner.
- `partner-renewal-2` — Separate reseller, implementation, technology, marketplace, referral, co-marketing, and strategic alliance renewal criteria.
- `partner-renewal-3` — Score both business value and customer trust: revenue, sourced pipeline, influenced pipeline, activation, retention, support load, defects, disputes, and satisfaction.
- `partner-renewal-4` — Require remediation plans for quality, compliance, enablement, support, implementation, or co-selling gaps before renewing at the same or higher tier.
- `partner-renewal-5` — Tie expansion to evidence of repeatable outcomes, certification, support readiness, and low customer harm.
- `partner-renewal-6` — Plan transitions for partner downgrade, decertification, referral pause, contract renegotiation, or exit.
- `partner-renewal-7` — Review contract obligations, data sharing, co-marketing commitments, lead routing, incentives, and marketplace visibility before renewal.
- `partner-renewal-8` — Feed renewal learnings into partner onboarding, certification, scorecards, enablement, and channel strategy.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Strong pipeline, bad delivery | Renew with remediation or downgrade | Customer/support evidence | Revenue over trust |
| Low activity partner | Exit or pause | Pipeline and enablement data | Channel clutter |
| Tier expansion | Require outcome proof | Scorecard and certification | Premature promotion |
| Compliance gap | Block renewal or remediate | Policy evidence | Partner risk |
| Exit partner | Plan transition | Customer/pipeline map | Customer disruption |

## Partner renewal health checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `partner_renewal_window_opened`, `partner_scorecard_refreshed`, `partner_renewal_risk_reviewed`, `partner_renewal_decision_made`, `partner_remediation_plan_started`, `partner_tier_changed`, `partner_health_monitored`.

Recommended properties: `partner_id, partner_type, renewal_date, revenue_band, pipeline_value, customer_outcome_score, support_burden, certification_status, compliance_status, dispute_count, renewal_decision, remediation_status, tier_change, decision`.
