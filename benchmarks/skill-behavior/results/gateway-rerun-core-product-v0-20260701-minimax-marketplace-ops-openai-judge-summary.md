
> benchmark:summarize
> node scripts/summarize-benchmark-results.mjs benchmarks/skill-behavior/results/gateway-rerun-core-product-v0-20260701-minimax-marketplace-ops-openai-judge.json

# Skill Behavior Benchmark Summary

- Samples: 5
- Unique task coverage: 5
- Average baseline score: 3.20
- Average skill-loaded score: 4.40
- Average delta: 1.20 (95% bootstrap CI 1.00 to 1.60)
- Skill win rate: 100.0%
- Non-regression rate: 100.0%
- Critical failure delta: 6 (8 baseline vs 2 skill-loaded)
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Answer input tokens: baseline avg 254, skill-loaded avg 1688, added 1433 (5/5 samples)
- Answer output tokens: baseline avg 1916, skill-loaded avg 1372, delta -544 (5/5 samples)
- Answer total tokens: baseline avg 2170, skill-loaded avg 3060, delta 890 (5/5 samples)
- Quality efficiency: 0.84 score delta per 1k added input tokens
- Answer latency: baseline avg 27.36s, skill-loaded avg 27.06s, delta -0.29s (5/5 samples)
- Claim tier supported by this data: Benchmarked
- Claim depth scope: insufficient
- Useful-claim gates: sampleDepth=fail, winRate=pass, avgDelta=pass, criticalFailures=pass, overTrigger=pass
- SOTA-candidate gates: useful=fail, suiteDepth=fail(1/2 suites >=5), modelOverlap=fail(0/5 shared tasks), ciLowerAboveZero=pass, overTrigger=pass

| Task | Skill | Baseline | Skill-loaded | Delta | Preference |
| --- | --- | ---: | ---: | ---: | --- |
| app-store-launch-readiness-001 | app-store-distribution-readiness | 3.00 | 4.00 | 1.00 | skill |
| marketplace-payouts-creator-001 | marketplace-payouts-review | 4.00 | 5.00 | 1.00 | skill |
| skill-marketplace-creator-001 | skill-marketplace-creator | 4.00 | 5.00 | 1.00 | skill |
| board-metrics-operating-001 | board-metrics-operating-review | 3.00 | 4.00 | 1.00 | skill |
| developer-quota-credit-abuse-001 | developer-quota-credit-abuse-review | 2.00 | 4.00 | 2.00 | skill |
