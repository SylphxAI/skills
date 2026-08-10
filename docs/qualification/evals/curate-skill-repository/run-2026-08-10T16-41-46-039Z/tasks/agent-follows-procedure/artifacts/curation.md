# Skill repository curation: write-high-signal-update and compose-readme-marks

Repository boundary and users:

- Repository: SylphxAI/skills, the installed static skill catalog (constitution source of record). This curation covers two capabilities named in the request — `write-high-signal-update` and `compose-readme-marks` — plus their nearest neighbour `author-skill` for the collision review. No other skills were curate-d.
- Users: Sylphx agents on Codex CLI (verified target `codex-cli 0.147.0`, `node >= 20`) and humans who request short updates or README/docs markdown polish.
- Boundary note: this workspace contains only `./SKILL.md`; packages were inspected at their installed revision under `/home/codex/.codex/skills/`. Default-branch history, retirement records, and closed unmerged proposals were not available here, so the corpus reconstruction is partial (recorded under unresolved evidence).

Audience, sensitivity, and publication authority:

- Public catalog, installable by anyone under the repo license; no secrets, customer data, or private topology in either package.
- `compose-readme-marks` references a first-party public mark service (`mark.sylphx.com`, no-key basic tier) and shields.io/simple-icons; nothing here is private or non-reconstructable-sensitive. Keep it that way; do not add brand kits or tokens to the package.
- Publication authority: the SylphxAI/skills repository owns install and delivery. This file is a curation proposal, not a merge; no package edits were made in this run.

Portfolio verdict:

- Keep both capabilities. The claimed overlap is domain-level (both produce markdown/docs content), not job-level: jobs, accepted artifacts, and acceptance authority differ. `write-high-signal-update` is a high-value, freshly qualified route with a distinct job (answer-first updates) and should not be absorbed anywhere. `compose-readme-marks` is a narrow but real presentation job (README/docs badges and banners) with non-derivable provider knowledge; it is honestly `unqualified` and rarely requested, which makes it a candidate needing demand evidence — not a merge into `author-skill` and not retirement (missing usage is not positive evidence that its procedure is generic).
- No count-driven consolidation: absorbing into `author-skill` would fail that skill's own listing gate logic ("Do not demote a real requestable job just to shrink the catalog") and the curation collision rule ("same topic, different accepted artifacts → keep both").

Skill decisions:

| Capability | Job value | Package value | Route value | Evidence | Owner | Decision | Exact change |
| --- | --- | --- | --- | --- | --- | --- | --- |
| write-high-signal-update | High — recurring job; updates that bury the ask produce no action, and claimed live status without evidence is a trust failure | Medium-high — compact template + gotchas, `references/research-basis.md`, `references/pre-v3-entry-method.md` depth; thin entry is sufficient for the job | High — independently requested ("rewrite my update", "status report"); artifact is an update ready to send, accepted on its own; distinct from `author-skill` (skill-package authoring) and from `compose-readme-marks` (badge/banner embeds) | Qualified 2026-08-10, expires 2026-11-08: incremental-value, compatibility, security evals filed; verified on `codex-cli 0.147.0` and `node >= 20`; consistent with "used often" observation | Communication/update owner (user-system oracle); catalog owner holds the package | Keep | No package change required. Optional, only if forward tests show false positives: add near-miss exclusion "not for authoring or curating skill packages (`author-skill`, `curate-skill-repository`)" to the description |
| compose-readme-marks | Low-medium — real recurring presentation job (consistent README/docs badges, brand-colored banners); no safety/revenue stakes, so not strategically material | Medium — non-derivable knowledge: provider INDEX (Sylphx Mark, shields.io, simple-icons), URL recipes, live probe rule (curl `-sI` → image content-type 200), markdown patterns, hotlink and GitHub rate-limit residuals, and the "badges are not delivery evidence" boundary | Low — rarely requested as a standalone named job; typically a sub-step of README polish or asset jobs; artifact (probed markdown embeds) is independently acceptable but demand is thin | Unqualified (honest default), `evidence: []`; no demand benchmark, no forward-test record; only install presence plus the "rarely used" observation | README/docs presentation owner (user-system oracle); `author-skill` does NOT own this job | Keep — not absorb; label as unproven candidate | 1) No merge: add to `When not to use`: "Skill-package authoring or catalog curation (→ `author-skill`, `curate-skill-repository`)" — boundary clarification only. 2) Keep frontmatter description as-is (already front-loaded); re-check after forward tests. 3) File `unqualified` status unchanged; open a time-boxed demand check (below) before any future rewrite or retirement |

Absorption map:

- No absorption executed: `author-skill` accepts the job "author/revise an Agent Skill package", not "compose README/docs badges", so the canonical-owner condition fails. If the owner ever accepted the full job, the map would be:
  - `references/recipes.md` (URL recipes, no-search defaults) -> `author-skill/references/readme-marks/recipes.md`
  - `references/providers/INDEX.md`, `providers/shields.md`, `providers/mark-sylphx.md` (provider choice, params) -> `author-skill/references/readme-marks/providers/`
  - Probe rule (curl `-sI` → image content-type 200, done-for-run acceptance) -> entry method of the absorbing body
  - `references/markdown-patterns.md` -> `author-skill/references/readme-marks/markdown-patterns.md`
  - Failure modes (hotlink dependency, GitHub rate limits, stats endpoints) -> absorbed boundaries
  - "Badges are not delivery or release evidence" rule -> absorbing body boundaries
  - Route metadata (name, description, openai.yaml, capability.json) -> removed only after every item above is placed and checked
- This map is intentionally not executed now; it documents what would be lost if the route were retired prematurely.

Missing or weak capabilities:

- `compose-readme-marks`: no qualification evals, no demand benchmark, no forward-test log (positive, near-neighbour, abstention, compound, multilingual, misleading-keyword), and no check that its description survives listing-budget truncation. It is a valid unproven candidate, not a restored shell.
- `write-high-signal-update`: no material gaps; only a minor absence of explicit near-miss tests against `author-skill` and `compose-readme-marks`.
- Corpus level: no inventory of closed unmerged proposals or retirement records was possible from this workspace; that reconstruction is a gap before any wider portfolio claim.

False-negative review and disagreements:

- Loss review of the rejected material (compose-readme-marks absorbed into author-skill) found a real capability would be hidden: the concrete job "compose badge/banner markdown for README/docs", its acceptance ("live image URL probed to content-type 200"), provider-specific recipes, and the hotlink/rate-limit residuals. `author-skill`'s procedure (capability.json shapes, qualification records, package layout) cannot serve that job, so absorption would be a false-negative for badge-composition requests.
- Disagreement: demand is disputed. One view: "rarely used" means the route is marginal; the other: it is a recurring sub-step of README polish jobs that surfaces through other routes. Resolution: time-boxed demand check plus forward tests, not a batch label.
- Noted non-collision: `author-skill` lists "write an update" as an example of a listing-skill kind; that is an example, not an ownership claim, so it does not create a collision with `write-high-signal-update`.

Validation run:

- Performed in this run: read `./SKILL.md` and `references/repository-curation-patterns.md`; inspected the installed packages, `capability.json`, and `qualification.json`; ran `scripts/check_skill_folder.py` on both packages (passed — hygiene only, not behavior or demand proof); verified all local reference links and the `../edit-preserving-voice/` cross-link resolve.
- Not performed: repo hygiene checks (`npm run build:catalog && npm test`) — no repo checkout exists in this workspace; forward tests on a native runtime — no edits landed, so no re-test was due.
- Proposed forward tests for `compose-readme-marks` (on fresh Codex CLI after the description/body change): positive ("make our README badges consistent"), near-neighbour ("rewrite my status update" → must not select it; "create a skill for X" → must select `author-skill`), abstention ("offline-only docs"), compound ("polish the README and add badges"), multilingual, and misleading-keyword ("mark" as grading, "shields" as security).

Delivery state and unresolved evidence:

- Delivery state: proposal only. No source edits, commits, merges, or installs were made in this run; package state is the installed revision. `write-high-signal-update` qualified evidence is current until 2026-11-08; `compose-readme-marks` remains `unqualified`.
- Unresolved evidence: (1) demand benchmark for badge/banner composition, (2) forward-test results for the boundary description change, (3) listing-budget truncation behavior on Codex/Claude for both descriptions, (4) full corpus reconstruction (default-branch history, closed unmerged proposals, retirement records) was not possible from this workspace, (5) no reviewer sign-off on the keep decision beyond this single-agent loss review.
