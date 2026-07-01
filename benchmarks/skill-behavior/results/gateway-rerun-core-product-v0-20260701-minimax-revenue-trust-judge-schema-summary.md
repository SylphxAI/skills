
> benchmark:summarize
> node scripts/summarize-benchmark-results.mjs benchmarks/skill-behavior/results/gateway-rerun-core-product-v0-20260701-minimax-revenue-trust-judge-schema.json

# Skill Behavior Benchmark Summary

- Samples: 5
- Unique task coverage: 5
- Average baseline score: 3.86
- Average skill-loaded score: 4.64
- Average delta: 0.78 (95% bootstrap CI 0.24 to 1.28)
- Skill win rate: 80.0%
- Non-regression rate: 100.0%
- Critical failure delta: 2 (2 baseline vs 0 skill-loaded)
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Answer input tokens: baseline avg 262, skill-loaded avg 1461, added 1199 (5/5 samples)
- Answer output tokens: baseline avg 1516, skill-loaded avg 1407, delta -109 (5/5 samples)
- Answer total tokens: baseline avg 1777, skill-loaded avg 2867, delta 1090 (5/5 samples)
- Quality efficiency: 0.65 score delta per 1k added input tokens
- Answer latency: baseline avg 26.12s, skill-loaded avg 22.69s, delta -3.43s (5/5 samples)
- Claim tier supported by this data: Benchmarked
- Claim depth scope: insufficient
- Useful-claim gates: sampleDepth=fail, winRate=pass, avgDelta=pass, criticalFailures=pass, overTrigger=pass
- SOTA-candidate gates: useful=fail, suiteDepth=fail(1/2 suites >=5), modelOverlap=fail(0/5 shared tasks), ciLowerAboveZero=pass, overTrigger=pass

| Task | Skill | Baseline | Skill-loaded | Delta | Preference |
| --- | --- | ---: | ---: | ---: | --- |
| release-freeze-control-001 | release-freeze-change-control-review | 4.00 | 5.00 | 1.00 | skill |
| subscription-price-increase-retention-001 | subscription-price-increase-retention-review | 4.00 | 4.00 | 0.00 | skill |
| payment-platform-webhook-ledger-001 | payment-platform-readiness | 4.00 | 5.00 | 1.00 | skill |
| subscription-entitlement-cross-platform-001 | subscription-entitlement-review | 3.10 | 4.80 | 1.70 | skill |
| notification-lifecycle-growth-001 | notification-strategy-review | 4.20 | 4.40 | 0.20 | skill |
