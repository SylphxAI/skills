# Skill Behavior Benchmark Summary

- Samples: 1
- Unique task coverage: 1
- Average baseline score: 4.50
- Average skill-loaded score: 4.64
- Average delta: 0.14
- Skill win rate: 100.0%
- Non-regression rate: 100.0%
- Critical failure delta: 0 (0 baseline vs 0 skill-loaded)
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Answer input tokens: baseline avg 93, skill-loaded avg 2262, added 2169 (1/1 samples)
- Answer output tokens: baseline avg 1983, skill-loaded avg 1854, delta -129 (1/1 samples)
- Answer total tokens: baseline avg 2076, skill-loaded avg 4116, delta 2040 (1/1 samples)
- Quality efficiency: 0.06 score delta per 1k added input tokens
- Answer latency: baseline avg 37.90s, skill-loaded avg 34.83s, delta -3.06s (1/1 samples)
- Claim tier supported by this data: Benchmarked
- Claim depth scope: insufficient
- Useful-claim gates: sampleDepth=fail, winRate=pass, avgDelta=fail, criticalFailures=pass, overTrigger=pass
- SOTA-candidate gates: useful=fail, suiteDepth=fail(0/2 suites >=5), modelOverlap=fail(0/1 shared tasks), ciLowerAboveZero=fail, overTrigger=pass

| Task | Skill | Baseline | Skill-loaded | Delta | Preference |
| --- | --- | ---: | ---: | ---: | --- |
| marketplace-payout-tax-hold-001 | marketplace-payouts-review | 4.50 | 4.64 | 0.14 | skill |
