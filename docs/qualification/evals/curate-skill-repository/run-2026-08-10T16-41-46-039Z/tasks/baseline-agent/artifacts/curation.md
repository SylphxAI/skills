# Skill curation: `write-high-signal-update` and `compose-readme-marks`

Repository: `SylphxAI/skills` (public skills catalog + runtime constitution; installed via
`catalog.json` to native hosts). Scope: the two named skills only, judged by the repo's
curation method (job value / package value / route value / evidence state as four separate
verdicts).

## Portfolio verdict

- `write-high-signal-update` — **KEEP** as a first-class listing.
- `compose-readme-marks` — **MERGE (absorb)** its knowledge into `author-skill` references
  and retire the standalone listing. Nothing is deleted.

## Skill decisions

| Capability | Job value | Package value | Route value | Evidence | Owner | Decision | Exact change |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `write-high-signal-update` | High — recurring job (every short update/reply/decision note); mishandling buries asks and invites fabricated live-status claims | Good — 5-step procedure, template, gotchas, progressive disclosure, research basis, archived depth | High — requested standalone ("write a short update"); artifact (update ready to send) independently accepted; job distinct from `craft-human-agent-language` (docs/prompts) and `edit-preserving-voice` (voice) | 2 eval iterations on disk (baseline vs with-skill); qualification record 2026-08-10; verdict `unqualified`, delta 0 (2/4 both sides on `status-update`) | `write-high-signal-update` | **KEEP** | None structural. Rebuild eval cases with traps (unverifiable claims, missing owners, buried asks) so the delta is demonstrated; keep `unqualified` until then |
| `compose-readme-marks` | Moderate-low as a standalone — badges/banners are a real but narrow sub-step, usually inside package authoring or repo finishing; no evidence of recurring standalone requests | Good — non-derivable knowledge: probed `mark.sylphx.com` and `shields.io` recipes, provider INDEX, markdown patterns, probe-before-paste rule, "badges are presentation, not delivery evidence" boundary | Low — rarely used; added 2026-08-08 in the free-provider batch; no dedicated commits, no eval runs, no other skill links it; triggers ("README", "badges") collide with `author-skill`'s package-authoring job | No eval workspace, no qualification runs; catalog status only `declared` | `author-skill` (after absorb) | **MERGE / absorb, retire listing** | Move `references/` under `skills/author-skill/references/readme-marks/`; add when-to-open line + near-miss note in `author-skill` SKILL.md and description; drop catalog entry for the old route |

## Reasons

### `write-high-signal-update` — keep

- It is wired into the runtime floor: `runtime/constitution.md` designates it as the
  compression skill, and it is linked from `drive-to-delivery`, `edit-preserving-voice`,
  `craft-human-agent-language` (near-miss boundary already recorded in
  `docs/CURATION-LEDGER.md`, 2026-08-09), plus support/review/context depth. This is
  in-repo evidence of frequent use, matching the observed usage.
- Its unique mechanism — answer-first, facts separated from inference, risks with owners
  and dates, explicit asks, never claiming live/production status without evidence — is
  not duplicated by any neighbour. Merging it would lose the route for a recurring,
  independently accepted job.
- Evidence caveat: the current eval shows no delta over baseline (2/4 on both sides),
  so the skill's value is plausible but not yet proven. Keep the listing, sharpen the
  evals, and keep the honest `unqualified` status.

### `compose-readme-marks` — absorb into `author-skill`, retire listing

- The package quality is good, so this is not a deletion: the probed provider endpoints,
  parameters, probe commands, and the presentation-vs-evidence boundary are
  non-derivable knowledge that must survive.
- The route value is the deciding fact: the job is rarely requested standalone, has no
  eval runs or qualification runs, and its trigger words overlap `author-skill`, which
  owns package authoring (including pack READMEs per `references/composition-contract.md`)
  in this repository. `author-skill` currently holds no README-mark recipes, so
  absorption adds missing depth rather than duplicating it.
- Per the curation pattern "put subordinate techniques and medium-specific depth in the
  owner's references instead of publishing a route for every topic", badge/banner
  composition is subordinate depth for package authoring in this repo.

## Absorption map

- `references/recipes.md` (mark.sylphx.com endpoints, shields.io, probe commands)
  → `skills/author-skill/references/readme-marks/recipes.md`
- `references/providers/INDEX.md`, `mark-sylphx.md`, `shields.md`
  → `skills/author-skill/references/readme-marks/providers/`
- `references/markdown-patterns.md`
  → `skills/author-skill/references/readme-marks/markdown-patterns.md`
- Probe-before-paste rule and "badges are presentation, not delivery evidence" boundary
  → kept in the absorbed entry and cross-linked from `author-skill` SKILL.md
- Eval `badge-row` → move into `author-skill` evals; eval `presentation-vs-evidence` is
  already covered by `write-high-signal-update`'s no-fabricated-live-status rule and the
  capability fail-closed semantics
- `catalog.json` entry for `compose-readme-marks` → removed; `author-skill` description
  gains a "README/docs badges" trigger so the job still routes

## Missing or weak capabilities

None new. At execution time `author-skill` needs the when-to-open line
("open `references/readme-marks/` when badges/banners are needed") added to its body —
this is the one gap the absorption must close.

## False-negative review

Removal risk: "compose README badges" must stay discoverable after the route is gone.
Mitigation: (a) `author-skill` description mentions README/docs badges; (b) its body
points to `references/readme-marks/` with when-to-open language. Loss check: endpoints
and params (kept), probe method (kept), boundary rules (kept), evals (moved/covered).
No unique mechanism is lost. Material disagreement: `finish-product`/`expand-product`
could also claim product-README ownership; resolution — the recipes are generic and can
be cross-linked from those skills later; within this repo, `author-skill` is the stated
overlap and the canonical package-authoring owner.

## Validation run

This file is a recommendation only; no repo files were changed. If executed:
1. Move `references/` as mapped above and add the when-to-open line.
2. Update `author-skill` description and `catalog.json`.
3. Run `scripts/check_skill_folder.py`, then `npm run build:catalog && npm test`.
4. Forward-test on a fresh native runtime: "add badges to our README" must route to
   `author-skill` and the near-miss "release proof" ask must abstain.

## Delivery state and unresolved evidence

- Recommendation only; execution and delivery checks are the follow-up.
- Usage premise (frequent vs rare) is provided by the requester; the repo contains no
  live usage telemetry. In-repo corroboration: `write-high-signal-update` is referenced
  across the constitution and multiple skills and has eval runs; `compose-readme-marks`
  has none.
- Both skills are catalogued as `declared`/`unqualified`; `compose-readme-marks` has no
  qualification runs, `write-high-signal-update` has a record with zero demonstrated
  delta. Neither is qualified until fresh, discriminating evidence is filed.
