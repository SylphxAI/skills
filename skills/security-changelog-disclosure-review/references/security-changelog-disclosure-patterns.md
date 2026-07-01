# Security Changelog Disclosure Patterns

## Security Changelog Disclosure Review state machine

```text
change_identified -> severity_triaged -> disclosure_scoped -> wording_approved -> notice_published -> customer_action_tracked -> review_closed
       |                   |                  |                   |                  |                         |
       v                   v                  v                   v                  v                         v
 unknown_scope       overclassified      embargo_blocked     wording_risk      customer_confusion       followup_needed
```

## Rule IDs

- `security-disclosure-1` — Classify the change by severity, exploitability, affected versions, customer exposure, remediation state, and disclosure obligation.
- `security-disclosure-2` — Separate routine hardening, dependency updates, vulnerability fixes, advisories, incidents, CVE coordination, and trust-center updates.
- `security-disclosure-3` — Coordinate security, legal, engineering, support, sales, and customer success wording before publication.
- `security-disclosure-4` — State affected scope, remediation status, required customer action, mitigation, detection guidance, and timeline without unnecessary exploit detail.
- `security-disclosure-5` — Use embargoes or staged disclosure when premature detail increases risk or coordination with vendors/customers is required.
- `security-disclosure-6` — Update release notes, trust center, status page, security advisories, support macros, and sales answers from one approved source.
- `security-disclosure-7` — Monitor customer actions, support questions, exploit signals, upgrade adoption, and misunderstanding after disclosure.
- `security-disclosure-8` — Run post-disclosure review for missed detections, slow remediation, unclear ownership, or repeated dependency risk.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Routine hardening | Mention generally | No customer action needed | Noise or fear |
| Vulnerability fix | Publish actionable note | Severity and affected versions | Customers cannot patch |
| Embargoed issue | Delay details | Coordination plan | Exploit acceleration |
| Customer action required | Direct notification | Exposure and mitigation | Unmitigated risk |
| Scope uncertain | Hold or caveat wording | Investigation status | False assurance |

## Security disclosure checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `security_change_identified`, `security_severity_triaged`, `security_disclosure_scoped`, `security_wording_approved`, `security_notice_published`, `security_customer_action_tracked`, `security_disclosure_review_closed`.

Recommended properties: `change_id, severity, exploitability, affected_version, affected_customer_count, disclosure_type, embargo_status, remediation_status, customer_action_required, notice_channel, support_volume, upgrade_adoption, monitoring_signal, decision`.
