# Partner Risk Due Diligence Patterns

## Partner Risk Due Diligence state machine

```text
partner_proposed -> fit_reviewed -> risk_reviewed -> terms_defined -> launch_approved -> monitored -> renewed_or_exited
       |                 |                |               |                 |             |
       v                 v                v               v                 v             v
 rejected          misfit_detected   risk_blocked    terms_blocked    launch_paused  exit_triggered
```

## Rule IDs

- `partner-risk-1` — Classify partner motion and dependency depth before estimating upside.
- `partner-risk-2` — Review data sharing, subprocessors, privacy, security, legal, brand, operational, support, and commercial risk.
- `partner-risk-3` — Define ownership for customer support, incident response, refunds, disputes, and communications.
- `partner-risk-4` — Map incentives to avoid spam, low-quality referrals, channel conflict, or marketplace abuse.
- `partner-risk-5` — Contract terms should cover data use, SLAs, audit, termination, IP/brand, and customer notice.
- `partner-risk-6` — Launch needs degradation and exit plan for partner outage, breach, policy violation, or business failure.
- `partner-risk-7` — Monitor partner quality, support burden, conversion quality, customer complaints, and compliance drift.
- `partner-risk-8` — Renewal should revisit evidence and customer value, not auto-extend stale partnerships.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| AI provider | Data/privacy and quality review | DPA, evals, fallback | Vendor lock-in |
| Affiliate partner | Incentive and fraud controls | Terms and attribution | Spam/refund abuse |
| Integration partner | Dependency and support model | SLA/support contacts | Customer confusion |
| Marketplace creator | Quality and policy review | Listing evidence | Brand trust loss |
| Co-marketing partner | Claim approval | Approved assets | Overclaimed endorsement |

## Partner risk checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `partner_risk_review_started`, `partner_risk_blocked`, `partner_terms_approved`, `partner_launch_approved`, `partner_quality_alerted`, `partner_incident_opened`, `partner_exit_started`.

Recommended properties: `surface`, `owner_team`, `segment`, `risk_tier`, `status`, `evidence_type`, `review_due_days`, `exception_type`, `decision`, `customer_impact`, `support_case_id`, `outcome`.
