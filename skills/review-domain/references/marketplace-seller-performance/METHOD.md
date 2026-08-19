# Marketplace Seller Performance
Create incentives and interventions that improve buyer outcomes without turning
one opaque score into ranking, payout, and punishment authority.

## Workflow

1. Define marketplace side, seller types, categories/regions, lifecycle stages,
   buyer promise, assessment unit, opportunity denominator, decision surfaces,
   and intended interventions.
2. Read `marketplace-seller-performance-patterns.md`.
3. Verify current sources at use: marketplace policy/version, seller terms,
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

## Source verification

- Resolve the current seller terms, category and buyer promise, enforcement and
  appeal policy, governed signal definitions, ranking interface, payout
  boundary, privacy rules, and decision-owner authority at task time.
- Use canonical transaction, refund, dispute, support, exposure, and policy
  sources with versions, opportunity denominators, maturity, and confidence.
  Authority comes from the current policy and decision owner; ratings, revenue,
  and previous scores are inputs.
- Protect fraud and abuse features from disclosure. Block high-impact action
  when evidence, policy version, confidence, notice, appeal, or action authority
  is unknown rather than manufacturing a threshold or case verdict.

## Path

- Quality uses buyer-harm, exposure, and manipulation controls. Revenue, volume, popularity, and review count are supporting context.
- Sparse or missing evidence stays unknown. Cold-start has its own path.
- A high-impact action carries its own policy, evidence, confidence, notice, review, and appeal.
- Seller-facing explanations use actionable reason categories. Fraud thresholds, linkage logic, and evasion-sensitive features stay operator-only.
- Thresholds and policy come from the current authorized source. Unknown source blocks the decision.
- High-revenue and strategic sellers keep the same evidence bar.

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
