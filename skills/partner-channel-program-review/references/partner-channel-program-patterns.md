# Partner Channel Program Patterns

## Partner Channel Program Review state machine

```text
partner_recruited -> qualified -> enabled -> lead_registered -> deal_progressed -> customer_live -> partner_reviewed
       |              |          |              |                 |               |
       v              v          v              v                 v               v
 no_fit        compliance_gap training_gap  conflict_review   support_escalation  tier_changed
```

## Rule IDs

- `partner-channel-1` — Choose partner motion by customer need, channel economics, sales complexity, implementation burden, and customer trust risk.
- `partner-channel-2` — Define qualification criteria, tier benefits, obligations, certification, enablement, demo assets, and ongoing health review.
- `partner-channel-3` — Document lead registration, deal protection, attribution, commissions, discounts, MDF, renewal/expansion credit, and clawback rules.
- `partner-channel-4` — Set partner claims policy for pricing, security, compliance, roadmap, integrations, SLAs, and implementation timelines.
- `partner-channel-5` — Define customer handoff, implementation responsibility, support escalation, success ownership, and issue-resolution SLA.
- `partner-channel-6` — Monitor partner quality through accepted leads, conversion, time-to-live, retention, support load, NPS, margin, and complaint signals.
- `partner-channel-7` — Manage channel conflict with transparent rules for direct sales, marketplace, affiliates, agencies, and strategic partners.
- `partner-channel-8` — Remove or downgrade partners who create customer harm, unsupported promises, compliance risk, or low-quality pipeline.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Referral partner | Reward qualified accepted demand | Lead quality and source | Spam incentives |
| Reseller | Define support and billing ownership | Contract and customer journey | Customer confusion |
| Implementation partner | Require certification and escalation | Training and quality proof | Bad deployment experience |
| Deal conflict | Apply registration rules | CRM/source timestamps | Channel distrust |
| MDF request | Fund measurable campaign | Plan and attribution | Wasted spend |

## Partner channel checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `partner_qualified`, `partner_certified`, `lead_registered`, `channel_conflict_opened`, `partner_deal_won`, `partner_support_escalated`, `partner_tier_changed`.

Recommended properties: `partner_id, partner_type, tier, region, lead_source, deal_stage, incentive_type, conflict_status, certification_status, support_owner, customer_segment, margin_impact, quality_score, decision`.
