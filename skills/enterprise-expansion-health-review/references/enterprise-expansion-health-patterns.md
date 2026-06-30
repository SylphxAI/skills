# Enterprise Expansion Health Patterns

## Enterprise Expansion Health Review state machine

```text
active_account -> health_scored -> value_proven -> expansion_hypothesis -> stakeholder_aligned -> expansion_offer
      |               |              |                    |                      |
      v               v              v                    v                      v
 adoption_gap    support_risk    weak_value          champion_loss          procurement_blocked
```

## Rule IDs

- `enterprise-expansion-1` — Assess health from adoption, value outcomes, support burden, incident history, relationship strength, renewal risk, and product fit, not one vanity score.
- `enterprise-expansion-2` — Separate renewal protection, adoption recovery, seat expansion, cross-sell, usage tier upgrade, services, and executive upsell motions.
- `enterprise-expansion-3` — Require business value proof, stakeholder demand, champion strength, and buyer timing before expansion outreach.
- `enterprise-expansion-4` — Use QBRs to review outcomes, risks, roadmap fit, and next value areas before asking for expansion.
- `enterprise-expansion-5` — Coordinate sales, customer success, support, product, and billing before proposing commercial changes.
- `enterprise-expansion-6` — Identify white space by workflow, department, geography, seat pool, feature entitlement, integration, and executive initiative.
- `enterprise-expansion-7` — Record expansion blockers such as low adoption, unresolved tickets, procurement freeze, champion departure, price sensitivity, or missing integration.
- `enterprise-expansion-8` — Post-review lost or delayed expansions to improve onboarding, packaging, support, pricing, and product.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| High usage, open incidents | Stabilize before upsell | Incident and support history | Expansion damages trust |
| New department interest | Validate value and buyer path | Use case and stakeholder map | Unfunded curiosity |
| QBR | Lead with outcomes and risks | Success plan metrics | Sales pitch without proof |
| Champion lost | Rebuild relationship map | Stakeholder changes | Deal surprise |
| Expansion offer | Align pricing, contract, success plan | Commercial and adoption evidence | Shelfware or churn risk |

## Expansion health checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `account_health_scored`, `expansion_signal_detected`, `qbr_completed`, `expansion_blocker_logged`, `expansion_offer_sent`, `expansion_won`, `expansion_lost`.

Recommended properties: `account_id, segment, health_score, adoption_score, value_metric, support_risk, incident_count, champion_status, whitespace_type, expansion_motion, renewal_days, blocker_type, owner_team, decision`.
