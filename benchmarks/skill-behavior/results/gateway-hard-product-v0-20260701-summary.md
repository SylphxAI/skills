# Skill Behavior Benchmark Summary

- Samples: 5
- Unique task coverage: 5
- Average baseline score: 4.53
- Average skill-loaded score: 4.73
- Average delta: 0.21 (95% bootstrap CI -0.20 to 0.48)
- Skill win rate: 80.0%
- Non-regression rate: 80.0%
- Critical failure delta: 0 (0 baseline vs 0 skill-loaded)
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Answer input tokens: baseline avg 230, skill-loaded avg 1180, added 949 (5/5 samples)
- Answer output tokens: baseline avg 1651, skill-loaded avg 1475, delta -176 (5/5 samples)
- Answer total tokens: baseline avg 1881, skill-loaded avg 2655, delta 774 (5/5 samples)
- Quality efficiency: 0.22 score delta per 1k added input tokens
- Answer latency: baseline avg 37.55s, skill-loaded avg 29.78s, delta -7.77s (5/5 samples)
- Claim tier supported by this data: Benchmarked
- Claim depth scope: insufficient
- Useful-claim gates: sampleDepth=fail, winRate=pass, avgDelta=fail, criticalFailures=pass, overTrigger=pass
- SOTA-candidate gates: useful=fail, suiteDepth=fail(1/2 suites >=5), modelOverlap=fail(0/5 shared tasks), ciLowerAboveZero=fail, overTrigger=pass

| Task | Skill | Baseline | Skill-loaded | Delta | Preference |
| --- | --- | ---: | ---: | ---: | --- |
| payment-webhook-entitlement-race-001 | payment-platform-readiness | 4.70 | 5.00 | 0.30 | skill |
| marketplace-payout-tax-hold-001 | marketplace-payouts-review | 4.70 | 4.10 | -0.60 | baseline |
| notification-permission-fatigue-recovery-001 | notification-strategy-review | 4.50 | 4.80 | 0.30 | skill |
| steam-demo-refund-review-risk-001 | steam-launch-readiness | 4.43 | 4.93 | 0.50 | skill |
| subscription-price-increase-grandfathering-001 | subscription-price-increase-retention-review | 4.30 | 4.84 | 0.54 | skill |
