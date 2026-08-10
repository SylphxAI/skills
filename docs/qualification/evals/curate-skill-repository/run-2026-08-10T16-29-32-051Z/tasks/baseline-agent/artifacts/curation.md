# Skill curation — write-high-signal-update and compose-readme-marks

Repository: `/home/codex/src/github.com/SylphxAI/skills` (public first-class Agent
Skills catalog for Codex, Claude Code, Grok Build; one skill = one requestable
job; depth in references; delivery = `npm run build:catalog && npm test`).
Scope of this curation: the two named skills only. Method: `curate-skill-repository`
workflow + `docs/CURATION-LEDGER.md` conventions; demand inputs ("used often",
"rarely used") come from the requester, not from telemetry.

## Verdicts

| Capability | Job value | Package value | Route value | Evidence | Owner | Decision | Exact change |
| --- | --- | --- | --- | --- | --- | --- | --- |
| write-high-signal-update | High — recurring job (short updates/replies) whose mishandling buries asks and risks | Strong — compact procedure, template, gotchas, research basis | Distinct — short-update route is canonically owned here; no other listing accepts it | Qualified — eval record `qualifications/records/write-high-signal-update.json` (2026-08-10, harness vs baseline, cases pass); referenced as depth by `runtime/constitution.md:60` | Repo (universal communication floor routes here) | **Keep** | None. Optional hygiene: rename shared historical filename `references/pre-v3-entry-method.md` (same name exists in author-skill with different content) to avoid a false shared-source impression |
| compose-readme-marks | Medium — niche but real job (README/docs badges/banners via public no-key mark APIs); presentation-vs-evidence boundary is strategically useful | Strong — non-derivable provider knowledge: Mark L1 API surface (`mark.sylphx.com/api/v1/...`), probed live 2026-08-08 (200 + `image/svg+xml`), shields.io recipes, hotlink/rate-limit boundaries, markdown patterns | Distinct — independently requestable, independently accepted artifact (markdown embeds + live-probed URLs) | Declared only — evals exist (`skills/compose-readme-marks/evals/evals.json`, 2 cases) but no qualification record; listing is 2 days old (#117, 2026-08-08); low observed usage | Repo | **Keep** (reject merge/retire); qualify next | Run the qualification harness to match sibling skills; re-evaluate only after a longer window if usage stays ~zero |

## Why not merge compose-readme-marks into author-skill

- The overlap is nominal. `author-skill` owns one job: author/revise an Agent
  Skill package (artifact: a skill package; acceptance: repo validation).
  `compose-readme-marks` owns a different job: compose README/docs marks from
  public mark APIs (artifact: markdown embeds; acceptance: probe 200 + paste).
  Its `references/composition-contract.md` is about constraint-pack READMEs,
  not README badges.
- Repo model and ledger are explicit: merge only when job, artifact, and
  acceptance authority coincide (see 2026-08-09 objective-loop merge precedent).
  Merging here would be a topic-only merge and would bury unique provider
  recipes under a skill that does not accept the job.

## Why not retire compose-readme-marks

- Retirement needs positive evidence the knowledge is generic. It is not:
  an agent without this package would web-search or invent the Mark L1
  endpoints, shield-style params, and hotlink failure modes. The recipes are
  probed, non-derivable, and exist nowhere else in the repo (no other skill
  references `mark.sylphx.com`/shields recipes).
- "Rarely used" two days after a deliberate addition is missing-demand, which
  the curation patterns explicitly reject as retirement evidence. A plausible
  route with unknown demand gets a time-boxed investigation, not deletion.

## Why write-high-signal-update is keep

- High recurring job value; `runtime/constitution.md` names it as the depth
  for compressed communication, and the 2026-08-09 ledger keeps the near-miss
  boundary "short updates → write-high-signal-update" (vs
  craft-human-agent-language, author-skill, engineer-agent-context).
- Qualified: harness record with passing assertions for answer-first,
  facts-vs-inference, owner+date risks, explicit asks, fluff-cut.
- No collision: distinct artifact, distinct acceptance, no stronger owner.

## Absorption map

- None. No mechanisms move. If a future disposition is ever considered for
  compose-readme-marks, every recipe/endpoint/failure-mode must first map to an
  explicit destination (no owner exists today).

## False-negative review

- What would be lost by folding compose-readme-marks into author-skill:
  the Mark API provider recipes, shields recipes, probe procedure, hotlink and
  rate-limit boundaries, and the badges-are-presentation-not-evidence boundary.
  author-skill's body has no when-to-open path for any of these. Nothing about
  the readme-marks job is covered by author-skill today.
- What would be lost by retiring it: same list, with no destination at all.
- Disagreement with the stated premise ("overlaps with author-skill") is
  resolved by source inspection, not a label: the two packages share only the
  README/docs domain and a coincidental historical reference filename.

## Validation and delivery state

- Validation performed: read SKILL.md bodies, references, evals, qualification
  records, catalog entries, CURATION-LEDGER, and per-skill git history; diffed
  the two `pre-v3-entry-method.md` files (different content — no shared source).
- Not performed (not required for a recommendation): `npm run build:catalog && npm test`
  — no files in the repo were changed.
- Delivery truth: this `curation.md` is a recommendation artifact in the task
  workspace; nothing is committed, merged, or deployed. Follow-up actions owned
  by the repo: (1) run qualification for compose-readme-marks; (2) optional
  rename of `write-high-signal-update/references/pre-v3-entry-method.md` for
  hygiene; (3) re-check compose-readme-marks usage after 30–60 days if demand
  stays ~zero.

## Bottom line

- write-high-signal-update → **keep** (qualified, canonical, used often).
- compose-readme-marks → **keep** (distinct job + non-derivable knowledge;
  neither merge into author-skill nor retire is supported by the evidence);
  run qualification and re-evaluate on a later date if usage remains zero.
