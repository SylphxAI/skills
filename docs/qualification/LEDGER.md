# Qualification ledger

Repo-wide, version-scoped qualification state for Sylphx Verified Capabilities.
This is a **projection** of the per-package `qualification.json` records plus
filed evidence; it is not a separate source of truth.

## Current state (2026-08-13)

- Capability packages: **60**
- Qualified: **0**. House coverage/yield KPIs (TJC / VCY) and required
  outcome receipts are retired. Every listing stays installable. Prior
  wave tables below are archaeology of what the old runner filed.
- **Retired listing:** `research-public-web` (2026-08-13). Prior wave-6
  qualification and wave-7 activation records remain under
  `evals/research-public-web/` as archaeology. AutoSync onto a host that still
  has this name in `qualifiedNames` requires
  `SYLPHX_SKILLS_ALLOW_QUALIFICATION_REGRESSION=1`.
- **Demoted (2026-08-13):** `compose-readme-marks` (method edit) and
  fourteen further packages whose loaded bytes drifted from the evidence
  source revision: adopt-repo-standards, author-skill, bound-request-scope,
  compose-product-portfolio, craft-human-agent-language,
  decide-architecture-shape, design-product, engineer-agent-context,
  engineer-testable-requirements, execute-hard-cutover,
  optimize-store-listing, record-structured-deliberation,
  run-incident-response, select-dependency-versions. Prior bundles remain
  under `evals/<id>/`. Applying this catalog over a host that still lists
  those names as qualified is a qualification regression.
- **Integrity floor:** `qualified` now requires a live-matching
  `packageDigest`. The runner refuses to file qualification when the package
  or suite prompts ban host web search, and refuses `incremental-value`
  unless a same-prompt agent pair differs only by whether the skill is the
  condition. There are no current `qualified` records. Historical wave
  tables below are not a four-way / multi-family claim.
- Industry bar for a future lift claim: same-prompt paired eval, one
  harness, harm veto. See `docs/QUALIFICATION.md`.

Wave-1 qualification runs:

| Capability | Run | Tasks | Verdict |
| --- | --- | --- | --- |
| author-skill | `run-2026-08-10T14-33-38-339Z` | 2 (agent with-skill + baseline) | qualified |
| produce-game-2d-map-assets | `run-2026-08-10T14-19-54-574Z` | 2 (deterministic exec) | qualified |
| produce-game-2d-sprites | `run-2026-08-10T14-21-43-928Z` | 4 (2 exec + 2 agent) | qualified |
| select-dependency-versions | `run-2026-08-10T14-37-58-866Z` | 3 (1 exec + 2 agent) | qualified |

All evidence bundles live under `evals/<id>/run-*/` with raw task artifacts,
task-level digests, automated pattern-scan results, and `report.json`. Each
qualification expires 90 days after `qualifiedAt`; a stale expiry downgrades
eligibility. Injection state is recorded as **not verified** for agent tasks
(fresh-context behavior tests; no runtime-native selection trace).

## Wave-2 runs (incremental-value controls)

Each wave-2 suite paired a fixture-read with-skill agent task with a
baseline control on a **different** user prompt. The runner then treated a
failing baseline as incremental-value. That claim was withdrawn on
2026-08-13: fixture-read + different prompt is a behavior test, not a
same-prompt causal comparison. Wave tables below remain archaeology of
what the runner filed at the time:

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
`compatibility` + `automated-pattern-scan` evidence — the runner claims `incremental-value`
only when with-skill passes and baseline fails, never to manufacture a delta.

## Wave-4 runs

| Capability | Run | With-skill | Baseline | Verdict |
| --- | --- | --- | --- | --- |
| select-next-work | `run-2026-08-10T16-22-01-818Z` | pass | fail | qualified |
| design-skill-evals | `run-2026-08-10T16-22-02-309Z` | pass | pass | qualified (no delta) |
| curate-skill-repository | `run-2026-08-10T16-41-46-039Z` | pass | pass | qualified (no delta; first run inconclusive, kept as record) |
| synthesize-market-research | `run-2026-08-10T16-29-32-534Z` | pass | fail | qualified |

`curate-skill-repository`'s first with-skill run produced no artifact (empty
agent session) and is kept at
`evals/curate-skill-repository/run-2026-08-10T16-29-32-051Z/` as an
inconclusive record; the capability qualified on the re-run.

## Wave-5 runs

| Capability | Run | With-skill | Baseline | Verdict |
| --- | --- | --- | --- | --- |
| execute-hard-cutover | `run-2026-08-10T17-29-41-586Z` | pass | pass | qualified (no delta) |
| maintain-product | `run-2026-08-10T17-29-42-099Z` | pass | fail | qualified |
| run-incident-response | `run-2026-08-10T17-32-18-026Z` | pass | pass | qualified (no delta) |
| craft-human-agent-language | `run-2026-08-10T17-32-18-592Z` | pass | fail | qualified |

## Wave-6 runs

| Capability | Run | With-skill | Baseline | Verdict |
| --- | --- | --- | --- | --- |
| optimize-decision-model | `run-2026-08-10T18-20-38-297Z` | pass | pass | qualified (no delta) |
| research-public-web | `run-2026-08-10T18-20-38-775Z` | pass | fail | qualified |
| analyze-system-dynamics | `run-2026-08-10T18-23-41-030Z` | pass | fail | qualified |
| run-product-feedback-loop | `run-2026-08-10T18-23-41-604Z` | pass | fail | qualified |

## Wave-7 runs (native activation)

Wave-7 added native-activation cases to the harness: the eval suite may
declare `activation.cases`, the runner installs the capability as the **only
native skill** of a fresh session under the always-on search-before-act floor,
and the user prompt never names the skill. A case passes only when the agent's
transcript **or produced artifacts** reference a declared selection keyword
and every oracle assertion holds; `injectionState` becomes `verified` only
when every declared case passes. Honest semantics: a model saying it used a
skill is not proof of native context load — the record keeps the method and
limitation, and selection stays per-model, per-skill evidence, never a fleet
claim.

| Capability | Runs (2026-08-11) | Selection observed | Oracle | Activation verdict |
| --- | --- | --- | --- | --- |
| analyze-critically | `run-2026-08-11T02-26-25-834Z` (applied); `run-2026-08-11T02-17-23-022Z` kept as record | yes — transcript: "following the `analyze-critically` procedure" + 3/3 keywords | pass | **verified** — record updated (compatibility + activation + automated-pattern-scan) |
| research-public-web | `run-2026-08-11T02-17-23-019Z`, `run-2026-08-11T02-26-25-855Z`, `run-2026-08-11T02-40-36-355Z` | 1/3 explicit (artifact method note "per the research-public-web skill"); 2/3 no reference | mixed | **not verified** — qualification record unchanged |
| bound-request-scope | `run-2026-08-11T02-17-23-029Z`, `run-2026-08-11T02-26-25-841Z` | none — no skill reference; output lacks the non-goals/cut-line contract | fail | **not verified** — qualification record unchanged |

Notes on the runs:

- analyze-critically's activation output passed the corrected oracle
  (`calibrat` — the first run produced a fully calibrated conclusion using
  "Calibration"/"Confidence ~65–70%" without the literal word "calibrated";
  the initial run is kept as a record of the narrower oracle).
- research-public-web produced method-consistent research in all three runs
  (primary sources, retrieved times, free/paid labeling, gaps), but named the
  skill in only one artifact; two runs show no observable reference, so
  selection is **not** considered verified. The first two runs also exposed
  oracle narrowness ("free path" vs "free L0/L1 paths"/"free public
  endpoints"); the activation oracle now measures free/paid labeling and the
  earlier runs are kept as records.
- bound-request-scope is a consistent two-run negative: with the same floor
  and model, the agent produced a scope contract without referencing the
  skill and without the non-goals/cut-line contract. This is direct evidence
  that the always-on floor does not reliably cause selection for every skill
  on deepseek-v4-flash.
- Capability-identity contract (2026-08-11): `packageDigest` now covers only
  what agents load and host discovery consumes (SKILL.md, references/,
  scripts/, capability.json, agents/); `qualification.json` and `evals/`
  are excluded so re-qualification or evidence relabeling never changes
  capability identity. Historical report `candidate.packageDigest` values
  are point-in-time records under the prior contract; the current catalog is
  authoritative.

## Wave-8 runs

Wave-8 qualified four more capabilities and fixed a runner sandbox bug:

| Capability | Run | With-skill | Baseline | Activation | Verdict |
| --- | --- | --- | --- | --- | --- |
| adopt-repo-standards | `run-2026-08-11T05-17-33-694Z` | pass | fail | not declared | qualified (incremental-value) |
| analyze-causal-inference | `run-2026-08-11T05-27-02-454Z` | pass | fail | **verified** | qualified (incremental-value + activation) |
| model-security-threats | `run-2026-08-11T04-52-11-042Z` | pass | pass | **verified** | qualified (activation; no delta) |
| distill-source-to-skill | `run-2026-08-11T05-17-33-689Z` | pass | fail | not declared | qualified (incremental-value) |

Notes:

- Runner sandbox paths are now capability-scoped
  (`sylphx-qualify-<capability>-<run>-<task>`): two capabilities launched in
  the same second previously shared a temp sandbox path derived only from the
  run stamp and corrupted each other's fixtures. The two corrupted runs were
  removed; the fix is part of this wave.
- adopt-repo-standards: an earlier run (`run-2026-08-11T05-06-04-934Z`) is
  kept as a record of the stricter oracle (constitution is projected by link
  per the skill's own contract, and the manifest nests under `project.name`;
  the oracle now measures that intent).
- analyze-causal-inference: the output expressed the counterfactual contrast
  as "two worlds"/"potential outcomes" without the literal word
  "counterfactual"; the oracle now accepts the equivalent expressions and the
  capability is activation-verified (agent natively selected the skill).
- model-security-threats: activation-verified — the agent natively selected
  the skill and produced a 673-line Threat Model and Security Design Contract.

## Wave-9 runs

Wave-9 qualified four more capabilities; three of them are
activation-verified:

| Capability | Run | With-skill | Baseline | Activation | Verdict |
| --- | --- | --- | --- | --- | --- |
| edit-preserving-voice | `run-2026-08-11T06-12-27-676Z` | pass | fail | not verified (selection unobservable) | qualified (incremental-value) |
| engineer-agent-context | `run-2026-08-11T05-58-54-250Z` | pass | pass | **verified** | qualified (activation; no delta) |
| review-domain | `run-2026-08-11T05-58-54-258Z` | pass | pass | **verified** | qualified (activation; no delta) |
| operate-customer-support | `run-2026-08-11T05-58-54-251Z` | pass | fail | **verified** | qualified (incremental-value + activation) |

Notes:

- **Gate semantics aligned**: activation cases are now recorded evidence and
  never gate qualification, because selection is model/host-contextual and
  belongs to the actual-context eligibility layer (same treatment as
  baseline controls). `injectionState: verified` still requires every
  declared case to pass; a failing case keeps the capability qualified with
  `not-verified` selection. This is why edit-preserving-voice qualifies on
  strong with-skill/baseline evidence while its activation outcome (the
  agent produced a fact-preserving rewrite) had no observable selection
  keyword — the run is kept as a record.
- An earlier edit-preserving-voice run (`run-2026-08-11T06-09-45-213Z`)
  predates the gate alignment and is kept as a record of the stricter gate.

## Wave-10 runs

Wave-10 qualified four more capabilities, all four activation-verified:

| Capability | Run | With-skill | Baseline | Activation | Verdict |
| --- | --- | --- | --- | --- | --- |
| research-user-needs | `run-2026-08-11T06-37-03-230Z` | pass | fail | **verified** | qualified (incremental-value + activation) |
| price-saas-subscription | `run-2026-08-11T06-37-03-222Z` | pass | pass | **verified** | qualified (activation; no delta) |
| optimize-store-listing | `run-2026-08-11T06-37-03-225Z` | pass | fail | **verified** | qualified (incremental-value + activation) |
| design-product | `run-2026-08-11T06-37-03-229Z` | pass | fail | **verified** | qualified (incremental-value + activation) |

All four activation cases show the agent natively referencing the skill
(e.g. "per the research-user-needs procedure", "Pricing and Packaging
Decision", "conversion experiment", "core concept") while producing the
declared output contract.

## Wave-11 runs

Wave-11 qualified four more capabilities, all four activation-verified:

| Capability | Run | With-skill | Baseline | Activation | Verdict |
| --- | --- | --- | --- | --- | --- |
| compose-product-portfolio | `run-2026-08-11T07-12-56-899Z` | pass | pass | **verified** | qualified (activation; no delta) |
| compose-product-program | `run-2026-08-11T07-12-56-899Z` | pass | pass | **verified** | qualified (activation; no delta) |
| craft-product-interface | `run-2026-08-11T07-12-56-897Z` | pass | fail | **verified** | qualified (incremental-value + activation) |
| compose-readme-marks | `run-2026-08-11T07-26-42-713Z` | pass | pass | **verified** | qualified (activation; no delta) |

Note: compose-readme-marks' first run
(`run-2026-08-11T07-12-56-898Z`) used an unescaped `![` oracle regex
(invalid pattern); the oracle was corrected to `!\\[` and the run re-done;
the first run is kept as a record.

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
  automated pattern scan, report).
