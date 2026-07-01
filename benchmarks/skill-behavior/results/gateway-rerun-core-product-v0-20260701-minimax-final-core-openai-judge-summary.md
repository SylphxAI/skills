
> benchmark:summarize
> node scripts/summarize-benchmark-results.mjs benchmarks/skill-behavior/results/gateway-rerun-core-product-v0-20260701-minimax-final-core-openai-judge.json

# Skill Behavior Benchmark Summary

- Samples: 5
- Unique task coverage: 5
- Average baseline score: 3.82
- Average skill-loaded score: 4.50
- Average delta: 0.68 (95% bootstrap CI 0.12 to 1.00)
- Skill win rate: 80.0%
- Non-regression rate: 80.0%
- Critical failure delta: 3 (3 baseline vs 0 skill-loaded)
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Answer input tokens: baseline avg 263, skill-loaded avg 1301, added 1038 (5/5 samples)
- Answer output tokens: baseline avg 1575, skill-loaded avg 1251, delta -324 (5/5 samples)
- Answer total tokens: baseline avg 1838, skill-loaded avg 2551, delta 714 (5/5 samples)
- Quality efficiency: 0.66 score delta per 1k added input tokens
- Answer latency: baseline avg 29.08s, skill-loaded avg 25.50s, delta -3.58s (5/5 samples)
- Claim tier supported by this data: Benchmarked
- Claim depth scope: insufficient
- Useful-claim gates: sampleDepth=fail, winRate=pass, avgDelta=pass, criticalFailures=pass, overTrigger=pass
- SOTA-candidate gates: useful=fail, suiteDepth=fail(1/2 suites >=5), modelOverlap=fail(0/5 shared tasks), ciLowerAboveZero=pass, overTrigger=pass

| Task | Skill | Baseline | Skill-loaded | Delta | Preference |
| --- | --- | ---: | ---: | ---: | --- |
| daily-reward-streak-economy-001 | daily-reward-and-streak-review | 3.60 | 4.40 | 0.80 | skill |
| backup-restore-customer-data-001 | backup-restore-design | 4.50 | 4.10 | -0.40 | baseline |
| steam-launch-commercial-readiness-001 | steam-launch-readiness | 3.00 | 4.00 | 1.00 | skill |
| desktop-os-integration-release-001 | desktop-os-integration | 4.00 | 5.00 | 1.00 | skill |
| product-analytics-revenue-funnel-001 | product-analytics-instrumentation-review | 4.00 | 5.00 | 1.00 | skill |
