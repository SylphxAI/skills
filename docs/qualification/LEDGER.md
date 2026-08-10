# Qualification ledger

Repo-wide, version-scoped qualification state for Sylphx Verified Capabilities.
This is a **projection** of the per-package `qualification.json` records plus
filed evidence; it is not a separate source of truth.

## Current state (2026-08-10, waves 1–3)

- Capability packages: **57**
- Qualified: **12** — analyze-critically, author-skill, bound-request-scope,
  decide-architecture-shape, engineer-testable-requirements,
  forecast-with-calibration, produce-game-2d-map-assets,
  produce-game-2d-sprites, record-structured-deliberation,
  select-dependency-versions, synthesize-evidence-brief,
  write-high-signal-update
- Outcome receipts recorded: **0** (receipts are recorded by user systems and
  the Control Plane against `schemas/outcome-receipt.schema.json`; the
  repository does not fabricate them)
- Verified Capability Yield: no eligible attempts yet (eligibility also
  requires authorization in the actual context; receipts are the live
  recording side)

Wave-1 qualification runs:

| Capability | Run | Tasks | Verdict |
| --- | --- | --- | --- |
| author-skill | `run-2026-08-10T14-33-38-339Z` | 2 (agent with-skill + baseline) | qualified |
| produce-game-2d-map-assets | `run-2026-08-10T14-19-54-574Z` | 2 (deterministic exec) | qualified |
| produce-game-2d-sprites | `run-2026-08-10T14-21-43-928Z` | 4 (2 exec + 2 agent) | qualified |
| select-dependency-versions | `run-2026-08-10T14-37-58-866Z` | 3 (1 exec + 2 agent) | qualified |

All evidence bundles live under `evals/<id>/run-*/` with raw task artifacts,
task-level digests, security-scan results, and `report.json`. Each
qualification expires 90 days after `qualifiedAt`; a stale expiry downgrades
eligibility. Injection state is recorded as **not verified** for agent tasks
(fresh-context behavior tests; no runtime-native selection trace).

## Wave-2 runs (incremental-value controls)

Each wave-2 suite pairs a with-skill agent task with a baseline control
(no skill, same task, same oracle). In every run the baseline **failed** the
strict output-contract oracle while the with-skill run passed, and the
security scan was clean:

| Capability | Run | With-skill | Baseline | Verdict |
| --- | --- | --- | --- | --- |
| write-high-signal-update | `run-2026-08-10T15-07-27-461Z` | pass | fail | qualified |
| bound-request-scope | `run-2026-08-10T15-07-55-630Z` | pass | fail | qualified |
| engineer-testable-requirements | `run-2026-08-10T15-09-58-318Z` | pass | fail | qualified |
| decide-architecture-shape | `run-2026-08-10T15-09-58-823Z` | pass | fail | qualified |

Baseline failures are recorded in the bundles (raw `baseline-agent` task
records) and are the incremental-value evidence — a failing control never
blocks qualification, because it demonstrates the capability's value rather
than a defect. `report.json` carries the `comparison` block.

## Wave-3 runs

| Capability | Run | With-skill | Baseline | Verdict |
| --- | --- | --- | --- | --- |
| record-structured-deliberation | `run-2026-08-10T15-38-52-658Z` | pass | fail | qualified |
| forecast-with-calibration | `run-2026-08-10T15-38-53-178Z` | pass | fail | qualified |
| analyze-critically | `run-2026-08-10T15-42-07-521Z` | pass | **pass** | qualified (no demonstrated delta; incremental-value evidence NOT claimed) |
| synthesize-evidence-brief | `run-2026-08-10T15-42-08-028Z` | pass | fail | qualified |

`analyze-critically`'s baseline met the same oracle, so its record carries only
`compatibility` + `security` evidence — the runner claims `incremental-value`
only when with-skill passes and baseline fails, never to manufacture a delta.

## Wave-1 finding (author-skill)

The first author-skill run (`run-2026-08-10T14-27-35-826Z`, kept as a
regression record) failed: a fresh agent produced a non-conformant
`capability.json` (invented `job` object, `boundary` instead of `boundaries`,
missing `outcome`) and an invented qualification record. Root cause: the
procedure did not teach the exact contract fields. Fixed in the skill body
(exact `capability.json` / `qualification.json` field contract), then the
suite passed. This follows the eval methodology: edit the skill, never the
threshold.

## Updating this ledger

1. Follow [`docs/QUALIFICATION.md`](../QUALIFICATION.md) and
   `skills/design-skill-evals`.
2. Run the harness: `node scripts/run-qualification.mjs --capability <id>`
   (see `docs/QUALIFICATION.md` for environment requirements), then
   `--apply-from <stamp>` after review of the recorded bundle.
3. Record here: capability id, run stamp, evaluator, qualifiedAt, expiresAt,
   and evidence locator. The catalog `qualification` block must match this
   ledger.

## Evaluation evidence

- [`evals/utilization-residual.md`](evals/utilization-residual.md) — the open
  multi-host utilization residual: structural tests and Codex auto-heuristic
  slices are not promotable qualification evidence; Claude/Grok host proof is
  not yet closed.
- `evals/<id>/run-*/` — wave-1 qualification bundles (raw artifacts, digests,
  security scan, report).
