# Benchmark Results

This directory contains public paired baseline-vs-skill result files. A calibration result proves the runner and scoring pipeline work, but it is not enough to claim a skill or the repository is useful.

A valid result file must include:

- model and runner identity;
- benchmark suite name;
- task IDs matching `benchmarks/skill-behavior/tasks/*.json`;
- baseline and skill-loaded scores on the same rubric;
- per-criterion rubric scores for both conditions;
- critical failures for each condition;
- output references or raw output paths when available;
- judge identity and whether judging was blind.
- trigger checks when over-trigger rate is claimed.

Generated results should be produced by a reproducible runner, for example:

```bash
OPENAI_API_KEY=... npm run benchmark:run:openai -- benchmarks/skill-behavior/tasks/core-product-v0.json --out benchmarks/skill-behavior/results/<run-id>.json --output-dir benchmarks/skill-behavior/results/<run-id>-outputs --run-id <run-id>
```

Structural validation and install verification are not behavioral proof. Treat small calibration files as pipeline evidence only; usefulness claims require the sample-depth and claim gates in `docs/skill-benchmark-methodology.md`.
