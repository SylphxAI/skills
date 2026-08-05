# Skill utilization eval residual

## Status

**Open residual.** Architecture (thin dual-layer progressive instructions) is
decided. Acceptable automatic Skill utilization is **not** proven and must not
be claimed from installation, AutoSync green, catalog integrity, or authored
fixtures alone (ADR-0009, ADR-0011,
ADR-20260731-thin-dual-layer-progressive-instruction-system).


### 2026-08-04 authoring follow-up

- Codex host runner `scripts/run-utilization-host-codex.mjs`: `--ids=` now selects from the **full** fixture corpus (not only the default subset).
- Codex remaining-slice sheet at tip `711d30b` still non-promotable auto-heuristic.
- Positive-writing strip continued: ban neighbour-id dumps in workflow Boundaries; description templates no longer teach `Not <neighbours>`.
- Mechanical-rename pollution from `migrate`→`execute-hard-cutover` verb substitution cleaned (restored English *migrate/migrated*; eng predicates `eng-hard-cut-0N`).
- Residual still **open** for promotable multi-host proof (Claude auth / Grok billing).


### 2026-08-05 three-layer + host follow-up

- Three-layer integration model landed on main (`0c97bf9` / PR #86): L1 batch,
  L2 atomic commits, L3 revert-safe PR outcomes in `source-authoring-standard`,
  `pursue-product-objective`, `run-open-product-betterment`.
- Compose alignment: `drive-to-delivery` + `author-skill` point at the same layers.
- Codex auto-heuristic @ `0c97bf9`: three-layer + pursue slice
  `codex-three-layer-0c97bf9` **4/4 pass** (non-promotable).
- New fixtures: `critical-source-authoring-three-layer`,
  `neighbour-source-authoring-vs-drive`.
- Utilization residual remains **open**: Claude `loggedIn: false`; Grok binary
  present but promotable multi-host proof not closed; Codex sheets stay
  auto-heuristic / non-promotable unless human-promoted.


### 2026-08-05 compose + host slices @ `cd2e5c6`

- Product jobs (`prototype/build/maintain/expand/finish-product`) compose
  three-layer source landing; package-classes composition bullet updated.
- Codex auto-heuristic (non-promotable):
  - `codex-floor-cd2e5c6` **4/4**
  - `codex-product-jobs-cd2e5c6` **6/6** (drive/finish/betterment/build/source-authoring)
- Claude still **not logged in** → multi-host residual open.

## Goal

Measure whether agents **behave** as if the correct Skill method was applied,
on pinned Skills revisions and host versions.

## Non-goals

- Proving L0 token optimality
- Replacing host native discovery with a meta-router
- Using model self-report ("I opened the skill") as a pass
- Flaky full-catalog perfection as a hard release gate

## Metric hierarchy

1. **Primary — behavior oracles.** Tasks require a Skill-unique, non-obvious
   mandatory step that is not present in L0. Score whether the agent performs
   that step (or correctly abstains).
2. **Secondary — load traces.** When a host exposes Skill open/load events,
   record them. Absence of traces does not forbid behavior-oracle eval.
3. **Not sufficient alone:** install status, package digests, fixture corpora.

## Suites

| Suite | Intent |
| --- | --- |
| Floor | L0 miss-class-A invariants hold without loading domain Skills |
| Critical skill | Top binding methods open/follow under positive prompts |
| Near-neighbour | Discriminate adjacent Skills |
| Abstention | Do not load an irrelevant Skill / do not invent authority |
| Compound | Multi-domain tasks load the needed subset without dumping the catalog |

## Pinning

Every run records:

- Exact Skills source commit / package digests
- Host product and version (Codex / Claude / Grok)
- Model identity when available
- Prompt fixtures and oracle definitions

## Pass language

- **May claim:** measured behavior-oracle pass rate for a named suite at a
  pinned revision.
- **Must not claim:** "utilization solved," "agents always load Skills," or
  catalog-wide automatic use without suite coverage and pins.

## Progress at pinned authoring

Documented fixtures now live at
`tests/fixtures/skill-utilization-eval.json` with structural coverage for
floor, critical-skill, near-neighbour, abstention, and compound suites, plus a
failure taxonomy and host-runtime residual block. Structural tests in
`tests/skill-utilization-eval.test.mjs` validate fixture integrity against the
current catalog.

This advances residual exit criterion 1 (documented fixtures/oracles). It does
**not** close the residual: automated green behavior-oracle runs on each
supported host class remain outstanding, and install/status green is still not
utilization proof.

## Failure taxonomy

Fixture cases tag one or more of:

- `l0_miss` — always-on floor violated
- `skill_miss` — wrong/missing Skill selection or failure to follow method
- `tool_policy_gap` — missing tools/credentials/policy, not cognition alone
- `model_limit` — model capability/context limitation
- `listing_truncation` — host listing budget shortened/omitted descriptions

These codes satisfy residual exit criterion 3 as a documented taxonomy. Assigning
a code in a real host run is still required for measured utilization claims.

## Exit criteria for closing this residual

1. Documented fixture set with behavior oracles for floor, critical-skill, and
   abstention suites.
2. At least one green run per supported host class at a pinned Skills SHA, or
   an explicit residual that a host cannot support reliable eval.
3. Failure taxonomy: L0 miss vs Skill miss vs tool/policy gap vs model limit.

Until exit criteria land, utilization remains an honest open residual.

Host execution procedure: [skill-utilization-host-runbook.md](./skill-utilization-host-runbook.md).

## Corpus notes (2026-08-03)

Pinned suite includes critical/neighbour cases for product job Skills:
`prototype-product`, `build-product`, `maintain-product`, `expand-product`,
`finish-product`, `pursue-product-objective`, `run-open-product-betterment`, `author-skill`,
plus delivery/select-next-work neighbours. Fixtures alone are not utilization
proof (see Goal above).

## Related catalog pressure (not utilization proof)

Description character budget is a separate listing-capacity concern
(`docs/reference/catalog-listing-budget-policy.md`). Agent-facing description
tightening reduces truncation risk; it does **not** close host behavior-oracle
utilization.

## Authoring progress (2026-08-03)

- Product job Skills covered in fixtures; run-open-product-betterment oracles aligned to portable continuity and admit-all-B.
- Host runbook added; live host behavior-oracle green runs still required to close residual.
- All 118 packages ship `agents/openai.yaml` UI metadata.

Result sheet drop: `tests/fixtures/skill-utilization-host-results/` (see README there).

Pack generator: `node scripts/prepare-utilization-host-run.mjs` (printable minimum slice; not a green claim).

## Authoring progress (continued)

- Structural description discrimination guards for critical-skill and near-neighbour suites.
- Host-run pack generator (`scripts/prepare-utilization-host-run.mjs`).
- Non-promotable structural L0 floor-marker sheet under `tests/fixtures/skill-utilization-host-results/`.
- **Still open:** green behavior-oracle runs on Codex/Claude/Grok hosts at a pinned SHA.

## Host run progress (Codex CLI, tip a18984c)

- Runner: `scripts/run-utilization-host-codex.mjs` (heuristic auto-score, `promotable: false`).
- Floor suite: **4/4 pass** (`codex-floor-a18984c`).
- Critical product + abstention slice: **14/14 pass** after framing rescoring (`codex-critical-product-a18984c`); combined sheet `codex-combined-a18984c`.
- **Not closed:** Claude Code and Grok host classes unmeasured; scores are automatic heuristics, not human-promoted utilization proof.

## Host capability residual (Claude / Grok) @ 1d76fa6

Evidence sheet: `tests/fixtures/skill-utilization-host-results/host-capability-residual-1d76fa6.md`.

- **Claude:** CLI present; not logged in → cannot run reliable eval here.
- **Grok:** CLI symlink dangling (binary missing) → cannot run reliable eval here.
- **Codex:** floor 4/4; critical product+abstention 14/14; near-neighbour 9/9 (after framing rescoring under tool limits); auto-heuristic only.

Utilization residual remains open for **promotable multi-host proof**; Codex measured progress does not close it alone.

