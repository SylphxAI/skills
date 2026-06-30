# Lifecycle Email System Patterns

## Lifecycle Email System state machine

```text
event_captured -> eligibility_checked -> suppression_checked -> message_sent -> action_taken -> fatigue_reviewed
       |                  |                    |              |              |
       v                  v                    v              v              v
 missing_event      no_consent           suppressed      bounced       complaint_spike
```

## Rule IDs

- `lifecycle-email-1` — Classify messages as transactional, lifecycle, marketing, trust/safety, billing, community, or product education.
- `lifecycle-email-2` — Define consent/legal basis, unsubscribe/preference handling, suppression, regional rules, and deletion state.
- `lifecycle-email-3` — Use journey triggers tied to product events, not arbitrary blasts.
- `lifecycle-email-4` — Frequency caps and cooldowns should consider all channels, not only email.
- `lifecycle-email-5` — Deliverability needs sender domain, bounce handling, complaint monitoring, list hygiene, and content QA.
- `lifecycle-email-6` — Measure downstream product outcomes and negative signals, not just opens and clicks.
- `lifecycle-email-7` — Personalization should avoid sensitive inference and stale data.
- `lifecycle-email-8` — Support should know what messages users received and why.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Onboarding sequence | Trigger from activation gap | Consent and event evidence | Spammy generic drip |
| Billing notice | Transactional boundary | Invoice/subscription state | Promo contamination |
| Winback campaign | Eligibility and suppression | Churn reason and consent | Harassment after cancellation |
| Product education | Behavior trigger | Feature usage gap | Masking poor UX |
| Complaint spike | Pause and investigate | Complaint rate and segment | Reputation damage |

## Lifecycle email checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `lifecycle_email_eligible`, `lifecycle_email_suppressed`, `lifecycle_email_sent`, `lifecycle_email_opened`, `lifecycle_email_clicked`, `lifecycle_email_unsubscribed`, `lifecycle_email_complained`, `lifecycle_email_converted`.

Recommended properties: `surface`, `owner_team`, `segment`, `risk_tier`, `status`, `evidence_type`, `review_due_days`, `exception_type`, `decision`, `customer_impact`, `support_case_id`, `outcome`.
