
> benchmark:summarize
> node scripts/summarize-benchmark-results.mjs benchmarks/skill-behavior/results/gateway-rerun-core-product-v0-20260701-lumen-overlap-marketplace-ops.json

# Skill Behavior Benchmark Summary

- Samples: 5
- Unique task coverage: 5
- Average baseline score: 3.47
- Average skill-loaded score: 4.52
- Average delta: 1.05 (95% bootstrap CI 0.07 to 2.25)
- Skill win rate: 80.0%
- Non-regression rate: 80.0%
- Critical failure delta: 0 (0 baseline vs 0 skill-loaded)
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Answer input tokens: baseline avg 93, skill-loaded avg 1414, added 1321 (5/5 samples)
- Answer output tokens: baseline avg 1989, skill-loaded avg 1800, delta -189 (5/5 samples)
- Answer total tokens: baseline avg 2082, skill-loaded avg 3214, delta 1132 (5/5 samples)
- Quality efficiency: 0.79 score delta per 1k added input tokens
- Answer latency: baseline avg 113.03s, skill-loaded avg 43.57s, delta -69.46s (5/5 samples)
- Claim tier supported by this data: Benchmarked
- Claim depth scope: insufficient
- Useful-claim gates: sampleDepth=fail, winRate=pass, avgDelta=pass, criticalFailures=pass, overTrigger=pass
- SOTA-candidate gates: useful=fail, suiteDepth=fail(1/2 suites >=5), modelOverlap=fail(0/5 shared tasks), ciLowerAboveZero=pass, overTrigger=pass

| Task | Skill | Baseline | Skill-loaded | Delta | Preference |
| --- | --- | ---: | ---: | ---: | --- |
| app-store-launch-readiness-001 | app-store-distribution-readiness | 4.00 | 4.13 | 0.13 | skill |
| marketplace-payouts-creator-001 | marketplace-payouts-review | 4.86 | 4.71 | -0.14 | baseline |
| skill-marketplace-creator-001 | skill-marketplace-creator | 2.63 | 4.25 | 1.63 | skill |
| board-metrics-operating-001 | board-metrics-operating-review | 1.25 | 4.50 | 3.25 | skill |
| developer-quota-credit-abuse-001 | developer-quota-credit-abuse-review | 4.63 | 5.00 | 0.38 | skill |
