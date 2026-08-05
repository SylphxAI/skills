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

## Codex auto-heuristic runner (this repo)

```bash
node scripts/run-utilization-host-codex.mjs --suite=floor --out-stem=codex-floor
node scripts/run-utilization-host-codex.mjs --ids=id1,id2 --out-stem=codex-slice
# optional per-case timeout (ms), default 180000
UTIL_CODEX_TIMEOUT_MS=120000 node scripts/run-utilization-host-codex.mjs --suite=floor
```

Sheets write under `tests/fixtures/skill-utilization-host-results/` with
`promotable: false` by default. Auto-heuristic scores are **not** multi-host
closure.

## Promotion (promotable: true)

A sheet may be marked `promotable: true` only when **all** hold:

1. Pinned Skills SHA + catalog digest + host version recorded on the sheet.
2. Minimum promotable slice above is fully scored (not a partial convenience subset).
3. Scoring is **human-reviewed** against `behaviorOracle` (not only auto-heuristic).
4. Host class is capable (authenticated CLI / paid balance as required).
5. No silent rewrite of fixture prompts.

Closing the residual requires promotable evidence for **each** supported host
class **or** a dated host-incapable residual for that class, plus explicit
owner acceptance that incomplete multi-host coverage is acceptable policy—not
claimed by auto-heuristic alone.

## Current environment residual (re-check live)

Re-probe before claiming host capability:

- Claude: `claude auth status` must show logged in.
- Grok: non-interactive prompt must not return 402/403 billing/spending errors.
- Codex: `codex --version` and runner sheets at the pin.

