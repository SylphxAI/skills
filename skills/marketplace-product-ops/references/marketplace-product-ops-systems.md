# Marketplace Product Ops Systems

Marketplaces fail when discovery grows faster than trust, quality, and operations. Design the operating system before scaling supply.

## Rule IDs

- `marketplace-1` — Define the supply unit precisely: app, plugin, skill, template, service, listing, creator profile, or inventory item.
- `marketplace-2` — Submission requirements should match buyer risk: metadata, screenshots, tests, permissions, privacy, support, and update policy.
- `marketplace-3` — Review queues need states, SLAs, rejection reasons, resubmission, escalation, and audit history.
- `marketplace-4` — Ranking should balance relevance, quality, freshness, trust, conversion, retention, and policy safety.
- `marketplace-5` — Buyers need confidence signals: install count, reviews, verification, changelog, permissions, refund/support terms, and compatibility.
- `marketplace-6` — Creator incentives should reward durable buyer success, not only acquisition or keyword stuffing.
- `marketplace-7` — Disputes need evidence, user messaging, temporary actions, appeals, and final resolution states.
- `marketplace-8` — Payouts require identity, tax/compliance posture where applicable, ledger trace, clawback policy, and support route.
- `marketplace-9` — Abuse controls should cover spam submissions, fake reviews, refund abuse, malware, impersonation, and policy evasion.
- `marketplace-10` — Removal or delisting should protect existing users with migration, refund, warning, or compatibility guidance when needed.

## Operating decision table

| Area | Design question | Strong answer | Weak answer |
| --- | --- | --- | --- |
| Submission | What must creators provide? | Risk-based metadata, tests, support, policy attestations | Free text upload only |
| Review | How are decisions made? | Queue states, reasons, audit trail, appeal | Private ad hoc judgment |
| Discovery | What should rank? | Relevance plus quality/trust outcomes | Clicks or recency only |
| Transaction | What is promised? | Clear fulfillment, entitlement, refund, support | Ambiguous listing copy |
| Payout | When are creators paid? | Ledgered, reversible windows, dispute handling | Manual spreadsheet |
| Moderation | How are harms contained? | Reports, triage, temporary action, appeal | Delete or ignore |

## State machine

```text
submission_created -> automated_checks -> human_review -> approved -> listed
human_review -> changes_requested -> resubmitted -> human_review
approved -> listed -> installed_or_purchased -> support_window
listed -> reported -> investigation -> action_none_or_warning_or_delist
installed_or_purchased -> dispute_opened -> evidence_collected -> resolved_refund_or_uphold
creator_earnings_accrued -> payout_pending -> payout_sent
payout_pending -> hold_or_clawback
```

## Event schema

Recommended events:

- `marketplace_submission_created`: creator_id, supply_type, category, risk_tier.
- `marketplace_review_decision`: submission_id, decision, reasons, reviewer_type, elapsed_ms.
- `marketplace_listing_viewed`: listing_id, query, rank, filters, trust_badges.
- `marketplace_install_or_purchase`: listing_id, version, price, buyer_segment, compatibility.
- `marketplace_report_created`: listing_id, reason, reporter_type, severity.
- `marketplace_dispute_resolved`: dispute_id, outcome, refund_amount, creator_action.
- `marketplace_payout_changed`: creator_id, amount, hold_reason, payout_state.

## Review checklist

- Submission, review, approval, delisting, dispute, and payout states are explicit.
- Ranking has quality and trust guardrails, not only growth metrics.
- Listings include compatibility, permissions, support, changelog, and refund/usage terms.
- Creators receive actionable rejection reasons and appeal/resubmission paths.
- Abuse/fraud controls protect buyers without opaque creator punishment.
- Metrics cover demand success, supply quality, creator health, trust incidents, revenue, and support load.
