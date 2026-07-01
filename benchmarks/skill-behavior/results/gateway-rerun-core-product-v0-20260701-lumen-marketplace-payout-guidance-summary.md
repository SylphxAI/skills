
> benchmark:summarize
> node scripts/summarize-benchmark-results.mjs benchmarks/skill-behavior/results/gateway-rerun-core-product-v0-20260701-lumen-marketplace-payout-guidance.json

# Skill Behavior Benchmark Summary

- Samples: 1
- Unique task coverage: 1
- Average baseline score: 4.14
- Average skill-loaded score: 5.00
- Average delta: 0.86
- Skill win rate: 100.0%
- Non-regression rate: 100.0%
- Critical failure delta: 0 (0 baseline vs 0 skill-loaded)
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Answer input tokens: baseline avg 89, skill-loaded avg 2885, added 2796 (1/1 samples)
- Answer output tokens: baseline avg 2186, skill-loaded avg 2462, delta 276 (1/1 samples)
- Answer total tokens: baseline avg 2275, skill-loaded avg 5347, delta 3072 (1/1 samples)
- Quality efficiency: 0.31 score delta per 1k added input tokens
- Answer latency: baseline avg 131.78s, skill-loaded avg 55.30s, delta -76.48s (1/1 samples)
- Claim tier supported by this data: Benchmarked
- Claim depth scope: insufficient
- Useful-claim gates: sampleDepth=fail, winRate=pass, avgDelta=pass, criticalFailures=pass, overTrigger=pass
- SOTA-candidate gates: useful=fail, suiteDepth=fail(0/2 suites >=5), modelOverlap=fail(0/1 shared tasks), ciLowerAboveZero=fail, overTrigger=pass

| Task | Skill | Baseline | Skill-loaded | Delta | Preference |
| --- | --- | ---: | ---: | ---: | --- |
| marketplace-payouts-creator-001 | marketplace-payouts-review | 4.14 | 5.00 | 0.86 | skill |
