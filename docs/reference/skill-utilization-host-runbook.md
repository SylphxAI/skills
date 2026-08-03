# Skill utilization host runbook

## Purpose

Execute **behavior-oracle** utilization cases from
`tests/fixtures/skill-utilization-eval.json` on a real host (Codex / Claude /
Grok). Install green is **not** a substitute.

## Pin before every run

Record in the result sheet:

- Skills source commit (`git rev-parse HEAD` of this repo)
- `catalog.json` package count and sha256 of file bytes
- Host product + version
- Model identity if available
- Date (UTC)

## Case selection

Minimum promotable slice:

1. All `suite: floor` cases
2. At least 10 `critical-skill` cases (include product jobs:
   `prototype-product`, `build-product`, `maintain-product`, `expand-product`,
   `finish-product`, `pursue-product-objective`, `run-open-product-betterment`, `author-skill`)
3. At least 5 `near-neighbour` cases
4. All `abstention` cases
5. At least 1 `compound` case

Prefer the frozen fixture prompts; do not rewrite prompts to make the agent look good.

## Procedure per case

1. Fresh thread/session on the host under test (no prior skill essay).
2. Paste the fixture `prompt` only.
3. Allow normal native skill discovery; do not force-open every skill.
4. Score against `behaviorOracle.mandatoryObservable` and `mustNot`.
5. Tag failure classes from the case `failureTaxonomy` when failing.
6. Optionally note whether the host UI showed a skill open/load (secondary).

## Scoring

- **Pass:** mandatory observable clearly present; no mustNot violation.
- **Fail:** missing mandatory step, wrong skill method, or mustNot hit.
- **Inconclusive:** tool/policy gap prevented the method (tag `tool_policy_gap`).

Do not count install/status, self-report (“I would open X”), or commit count.

## Result sheet (copy)

```text
host:
hostVersion:
model:
skillsCommit:
catalogDigest:
ranAtUtc:
cases:
  - id:
    suite:
    score: pass|fail|inconclusive
    failureClasses: []
    notes:
summary:
  pass:
  fail:
  inconclusive:
  claimLanguage: measured behavior-oracle rates only; utilization not "solved"
```

## Closing the residual

Per `skill-utilization-eval-residual.md`, residual closes only when exit
criteria land (fixtures + green host-class runs or explicit host-incapable
residual + taxonomy). This runbook alone does not close it.
