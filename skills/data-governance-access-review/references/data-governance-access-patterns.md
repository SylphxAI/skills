# Data Governance Access Patterns

## Data Governance Access state machine

```text
access_requested -> data_classified -> owner_approved -> access_granted -> usage_logged -> review_due -> access_removed
       |                  |                 |                |              |              |
       v                  v                 v                v              v              v
 denied            classification_missing approval_blocked excessive_scope suspicious_use stale_access
```

## Rule IDs

- `data-access-1` — Classify data by sensitivity, purpose, residency, retention, and customer impact.
- `data-access-2` — Access grants need actor, purpose, dataset, role, owner approval, duration, and review date.
- `data-access-3` — Prefer least-privilege roles and derived datasets over raw production access.
- `data-access-4` — Support/admin access needs customer context, ticket link, audit log, and masking where possible.
- `data-access-5` — AI datasets need consent/privacy status, retention, vendor routing, and leakage review.
- `data-access-6` — Break-glass requires emergency reason, expiry, notification/audit, and post-incident review.
- `data-access-7` — Offboarding and stale-access reviews should be automated or scheduled.
- `data-access-8` — Data catalog ownership should map datasets to stewards and downstream users.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Support needs account view | Ticket-scoped access | Case ID and masked fields | Overbroad admin access |
| Analyst requests raw PII | Deny or derive dataset | Purpose and minimization | Privacy drift |
| AI training dataset | Privacy review | Consent and retention | Vendor leakage |
| Emergency debugging | Break-glass | Incident ID and expiry | Silent permanent access |
| Employee leaves | Revoke access | Offboarding proof | Stale credentials |

## Data governance checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `data_access_requested`, `data_access_approved`, `data_access_denied`, `data_access_granted`, `data_access_used`, `break_glass_started`, `access_review_completed`, `data_access_revoked`.

Recommended properties: `surface`, `owner_team`, `segment`, `risk_tier`, `status`, `evidence_type`, `review_due_days`, `exception_type`, `decision`, `customer_impact`, `support_case_id`, `outcome`.
