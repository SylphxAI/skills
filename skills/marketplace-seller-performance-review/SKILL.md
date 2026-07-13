---
name: marketplace-seller-performance-review
description: Design or audit a marketplace seller-performance system covering opportunity-normalized quality evidence, confidence, cold start, category baselines, explanations, coaching, badges, ranking inputs, enforcement referrals, appeals, recovery, anti-gaming, fairness, buyer harm, and marketplace health. Use when the primary artifact is recurring seller assessment and performance-intervention governance. Do not use for one seller's content-policy, moderation, fraud, or dispute case; payout-ledger design; a general search-ranking algorithm; or transaction refund operations.
---

# Marketplace Seller Performance Review

Create incentives and interventions that improve buyer outcomes without turning
one opaque score into ranking, payout, and punishment authority.

## Workflow

1. Define marketplace side, seller types, categories/regions, lifecycle stages,
   buyer promise, assessment unit, opportunity denominator, decision surfaces,
   and intended interventions.
2. Read `references/marketplace-seller-performance-patterns.md`.
3. Verify current authority at use: marketplace policy/version, seller terms,
   category promises, enforcement and appeal rules, ranking contract, payout
   boundary, privacy rules, and current governed signal definitions.
4. Build a signal registry with eligibility, direction, window, lag, source,
   confidence, missingness, manipulation risk, explanation safety, and owner.
5. Separate eligibility gates, performance evidence, quality badges, ranking
   inputs, coaching, enforcement referrals, and payout-risk referrals. Give each
   decision its own evidence bar and authorized owner.
6. Normalize for real opportunities and category/lifecycle conditions. Define
   cold-start exploration, sparse-data confidence, delayed outcomes, seasonality,
   and changed-policy/version treatment.
7. Design a proportional intervention ladder: insight -> coaching -> warning ->
   bounded visibility change -> review/referral -> suspension -> reinstatement.
   Preserve notice, evidence, appeal, expiry, and recovery criteria.
8. Test gaming, popularity bias, protected-proxy risk, strategic-seller override,
   buyer-harm blind spots, feedback loops, and liquidity/supply-diversity effects.
9. Produce the signal registry, decision architecture, seller explanation,
   intervention and appeal state model, fairness/health readout, and monitoring plan.

## When not to use

- For payout ledger, reserve, settlement, refund clawback, or reconciliation,
  use `marketplace-payouts-review`. This artifact may emit a risk referral but
  cannot place or release funds.
- For general retrieval or recommendation ranking, hand off calibrated seller
  evidence and confidence; do not design the whole ranking system here.
- For transaction refund/support operations, use
  `refund-and-support-flow-review`.
- For fraud detection, protect signal secrecy and refer evidence to the trust
  owner; seller-performance explanations expose safe reason categories only.
- For one seller policy violation, moderation action, dispute, enforcement
  appeal, or fraud review, use `marketplace-trust-operations-review`; this skill
  may supply governed performance evidence but does not decide that case.
- For onboarding or marketplace product architecture, consume this system as a
  bounded specialist artifact rather than expanding the skill.

## Source verification

- Resolve the current seller terms, category and buyer promise, enforcement and
  appeal policy, governed signal definitions, ranking interface, payout
  boundary, privacy rules, and decision-owner authority at task time.
- Use canonical transaction, refund, dispute, support, exposure, and policy
  sources with versions, opportunity denominators, maturity, and confidence.
  Ratings, revenue, or a previous score are never authority by themselves.
- Protect fraud and abuse features from disclosure. Block high-impact action
  when evidence, policy version, confidence, notice, appeal, or action authority
  is unknown rather than manufacturing a threshold or case verdict.

## Guardrails

- Never use revenue, volume, popularity, or review count as a quality proxy
  without buyer-harm, exposure, and manipulation controls.
- Never punish sparse or missing evidence as if it proved poor performance.
- Never take a high-impact action from a composite score without the action's
  own policy, evidence, confidence, notice, review, and appeal.
- Never reveal fraud thresholds, linkage logic, or evasion-sensitive features in
  seller-facing explanations.
- Never invent current thresholds or policy. Use named parameters and mark the
  decision blocked until the current authorized source is available.
- Never exempt a high-revenue or strategic seller from the evidence bar.

## Output

```text
Decision scope and authority:
- seller/category/lifecycle / policy versions / assessment unit / decisions owned

Signal registry:
| Signal | Opportunity denominator | Window/lag | Source/version | Confidence/missingness | Gaming/fairness risk | Explanation |
| --- | --- | --- | --- | --- | --- | --- |

Decision architecture:
| Surface | Evidence bar | Confidence rule | Action owner | Seller notice | Appeal/recovery |
| --- | --- | --- | --- | --- | --- |

Intervention and appeal model:
- trigger -> proportional action -> review -> appeal -> expiry/recovery

Marketplace-health readout:
- buyer harm / seller success / appeal error / cold start / diversity / liquidity

Blocked facts and handoffs:
- current source needed / owner / affected decision / specialist handoff
```
