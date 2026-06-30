# Customer Reference Program Patterns

## Customer Reference Program Review state machine

```text
reference_need_received -> customer_matched -> consent_checked -> proof_prepared -> reference_used -> followup_logged
          |                    |                 |                |              |
          v                    v                 v                v              v
 no_match              health_blocked       approval_missing  claim_blocked  fatigue_review
```

## Rule IDs

- `customer-reference-1` — Define proof need by buyer persona, segment, industry, use case, company size, geography, integration, risk concern, and deal stage.
- `customer-reference-2` — Check customer health, renewal timing, support incidents, executive relationship, consent scope, and advocacy history before asking.
- `customer-reference-3` — Separate logo rights, public quote, private reference call, case study, webinar, analyst reference, procurement evidence, and anonymized aggregate proof.
- `customer-reference-4` — Require approval for claims, metrics, implementation timelines, ROI, regulated use cases, and named customer outcomes.
- `customer-reference-5` — Limit reference frequency and rotate advocates to avoid fatigue, coercion, or relationship damage.
- `customer-reference-6` — Track request intake, matching reason, owner, approval scope, usage date, expiration, outcome, and thank-you/follow-up.
- `customer-reference-7` — Retire or refresh references when product version, customer status, consent, metric, logo, or relationship changes.
- `customer-reference-8` — Feed reference gaps back into marketing, product proof, security evidence, onboarding, and customer success programs.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Logo use | Check explicit scope and expiry | Approval record | Unauthorized logo |
| Reference call | Match segment and protect fatigue | Health and usage history | Overused advocate |
| ROI claim | Require evidence and approval | Metric source and customer signoff | Misleading proof |
| Renewal risk | Delay or use alternate proof | Health and renewal status | Damaged relationship |
| Sales request | Route through intake and matching | Deal stage and proof need | Random customer ask |

## Customer reference checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `reference_request_received`, `reference_customer_matched`, `reference_consent_approved`, `reference_asset_published`, `reference_call_completed`, `reference_fatigue_detected`, `reference_retired`.

Recommended properties: `account_id, segment, industry, proof_type, consent_scope, approval_status, health_status, renewal_days, request_source, usage_count, expiry_date, claim_type, owner_team, decision`.
