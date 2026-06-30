# Legal Terms Policy Patterns

## Legal Terms Policy Review state machine

```text
policy_need_detected -> owner_assigned -> wording_reviewed -> surface_updated -> user_notified -> evidence_retained
        |                  |                |                |                |
        v                  v                v                v                v
 legal_review       conflict_found     launch_blocked   notice_failed   dispute_escalated
```

## Rule IDs

- `legal-terms-1` — Map every material product promise, restriction, fee, renewal, cancellation, refund, AI/data use, and marketplace rule to an approved policy source.
- `legal-terms-2` — Separate consumer, SMB, enterprise, marketplace creator, developer, and regional obligations when terms differ.
- `legal-terms-3` — Require user-visible disclosure and acknowledgement for material obligations, paid terms, sensitive processing, and policy changes.
- `legal-terms-4` — Version policy text, effective date, acceptance evidence, notice channel, and affected user population.
- `legal-terms-5` — Keep pricing pages, checkout, onboarding, emails, support macros, sales collateral, store listings, and help center consistent.
- `legal-terms-6` — Define escalation for non-standard contracts, regulated customers, user disputes, takedowns, abuse, and enforcement appeals.
- `legal-terms-7` — Review dark-pattern risk around renewals, trials, cancellation, refunds, data use, and account termination.
- `legal-terms-8` — Treat final policy interpretation and wording as owner/legal responsibility, not agent-generated authority.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Billing disclosure | Show before purchase and retain evidence | Pricing terms and checkout copy | Dispute or regulatory risk |
| Policy change | Notify affected users with version | Change log and audience | Unenforceable change |
| AI disclaimer | Tie to actual feature behavior | Model/data use and limits | Unsupported safety claim |
| Marketplace rule | Define enforcement and appeal | Creator/user policy | Arbitrary moderation |
| Contract exception | Route to legal/commercial owner | Signed agreement and scope | Public terms conflict |

## Legal terms checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `terms_review_started`, `policy_owner_assigned`, `terms_surface_updated`, `user_terms_acknowledged`, `policy_change_notified`, `terms_conflict_detected`, `legal_escalation_opened`.

Recommended properties: `surface, policy_type, user_segment, region, owner_team, effective_date, acknowledgement_required, notice_channel, conflict_type, risk_tier, legal_review_status, support_case_id, decision`.
