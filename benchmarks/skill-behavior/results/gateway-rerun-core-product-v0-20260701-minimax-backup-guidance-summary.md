
> benchmark:summarize
> node scripts/summarize-benchmark-results.mjs benchmarks/skill-behavior/results/gateway-rerun-core-product-v0-20260701-minimax-backup-guidance.json

# Skill Behavior Benchmark Summary

- Samples: 1
- Unique task coverage: 1
- Average baseline score: 4.00
- Average skill-loaded score: 5.00
- Average delta: 1.00
- Skill win rate: 100.0%
- Non-regression rate: 100.0%
- Critical failure delta: 0 (0 baseline vs 0 skill-loaded)
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Answer input tokens: baseline avg 260, skill-loaded avg 1357, added 1097 (1/1 samples)
- Answer output tokens: baseline avg 1453, skill-loaded avg 1117, delta -336 (1/1 samples)
- Answer total tokens: baseline avg 1713, skill-loaded avg 2474, delta 761 (1/1 samples)
- Quality efficiency: 0.91 score delta per 1k added input tokens
- Answer latency: baseline avg 16.89s, skill-loaded avg 17.61s, delta 0.72s (1/1 samples)
- Claim tier supported by this data: Benchmarked
- Claim depth scope: insufficient
- Useful-claim gates: sampleDepth=fail, winRate=pass, avgDelta=pass, criticalFailures=pass, overTrigger=pass
- SOTA-candidate gates: useful=fail, suiteDepth=fail(0/2 suites >=5), modelOverlap=fail(0/1 shared tasks), ciLowerAboveZero=fail, overTrigger=pass

| Task | Skill | Baseline | Skill-loaded | Delta | Preference |
| --- | --- | ---: | ---: | ---: | --- |
| backup-restore-customer-data-001 | backup-restore-design | 4.00 | 5.00 | 1.00 | skill |
