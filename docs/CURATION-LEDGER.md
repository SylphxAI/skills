# Curation ledger

## Principle

Organize skills by **semantics** (requestable job vs depth). Do **not** hard-cap listing count. Migrate knowledge; do not destroy.

## v6 mistake corrected

v6 forced ~20 listings with a 15–25 gate. That demoted many **independently requestable** jobs for size, not for meaning. Those listings are restored.

## Still correct (keep)

| Kind | Treatment |
| --- | --- |
| `*-standard` / policy / profile | references under applying skills (not listings) |
| Domain review packs | `review-domain/references/*` |
| Design shapes (app/game/saas/…) | `design-product/references/*` |
| Keel app tooling | `build-product/references/keel-app` |
| Single-case support depth | `operate-customer-support/references/resolve-one-case` |
| Prompt architecture | `engineer-agent-context/references/prompt-architecture` |

## Restored to listings

prototype/expand/finish product; payment/distribution readiness; craft interface; pursue objective; bound-request-scope; open betterment; frontend-perf; agent-harness; pricing; portfolio; program; architecture-shape; testable-requirements; analyze-*; forecast; optimize-decision; deliberation; store-listing; game-2d sprites/maps; feedback-loop; edit-preserving-voice; distill/evals/curate skill-meta.

## Authority clean-break (2026-08-07)

- Constraint packs live only under applying job skills (`skills/<job>/references/<pack>`).
- Listing paths `skills/<name>-standard/` are retired; do not restore them as top-level skills.
- Restored owner homes: `sota-execution-standard` → `record-structured-deliberation`; `autonomous-execution-standard` → `drive-to-delivery`; `frontier-verification-standard` → `build-product`.
- Quality vocabulary: Engineering Standard **Quality North Star** only; Modern Technical Bar is a retired phrase.
- Quality North Star convergence (2026-08-08): Meta *Simple concepts, powerful usage*; 13 primary attributes (Readability folded into Maintainability as `q-readability` alias); default quality precedence (`eng-quality-precedence-01`); Simplicity locked to compose/unify without cutting capability; usage/anti-examples under `quality-north-star-usage.md`.
- `sylphx-methods` bag remains forbidden.

## Free-provider job skills (2026-08-08)

- Removed listing `apply-instrument-family` (immature Instruments/MCP path).
- Added job listings: `deploy-ephemeral-web-preview`, `provision-agent-workspace`, `share-ephemeral-artifact`, `compose-readme-marks`, `research-public-web`, `wire-managed-backend-services`.
- Provider depth lives under each skill `references/` so agents get recipes without web search.
- Human-only Instruments law + envelope schema retired to `docs/history/retired-instruments-2026-08-08/` (not installable).


## 2026-08-09 — craft-human-agent-language

- New job listing: write/review documents and prompts that humans and agents
  both use (language × structure × format × output contract).
- Model-agnostic by design: durable method in SKILL.md; dated measurements in
  `references/evidence-brief-2026-08.md`; ISO/STE mapping in
  `references/iso-plain-language.md`. No new `*-standard` pack; no routing bag.
- Near-miss boundaries kept: skill packages → `author-skill`; short updates →
  `write-high-signal-update`; agent context packs → `engineer-agent-context`;
  distillation → `distill-source-to-skill`.

## Universal principles + Economy (2026-08-09)

- Adopted the nine-principle universal principles (Depth · Correctness ·
  Simplicity · Evolvability · Observability · Performance & Velocity ·
  Reliability · Security · Economy) as canonical principles for all design,
  development, and business-model work. Full text: `docs/policies/PRINCIPLES.md`;
  compact always-on floor added to `runtime/constitution.md`. Not a second
  quality vocabulary — it maps onto the Quality North Star `q-*` IDs.
- Added `q-economy` as the 14th primary North Star attribute:
  lifecycle / system-entropy / human-attention cost accounting (not dev
  effort). Runtime resource cost stays under Performance/Scalability per the
  #121 guardrail; `q-economy` is the decision lens for lifecycle cost,
  attention, and agent-native economics.
- Memory set grew 8 → 9; operating set Meta + 13 → 14.
- Wired Economy into `commercial-decision-standard` (business models, pricing,
  roadmap, unit economics) and added `eng-economy-01/02` predicates.
- ADR: `docs/history/adr/ADR-20260809-universal-principles-and-q-economy.md`.

## Principles refinement — ambition + agent-native budgets (2026-08-11)

- Canonical PRINCIPLES body is English-only; non-English slogans retired from
  principles, constitution, and quality vocabulary surfaces.
- Simplicity clarified as **ambition-preserving**: fewest concepts/systems
  covering maximum capability — not fewer features.
- Economy budgets made explicit for agent-native work: entropy, verification,
  attention, runtime, coordination, reversal (not person-days default).
- Facet map: longer attributes (readability, maintainability, scalability,
  availability, resilience, testability, …) nest under the nine cores.
- Aligned constitution, `eng-simplicity-01`, `eng-economy-01/02`, North Star
  `q-simplicity` / `q-economy`, and commercial Economy law.
- ADR: `docs/history/adr/ADR-20260811-principles-ambition-agent-economy.md`.

## Objective-loop consolidation + composition contract (2026-08-09)

- Merged `pursue-product-objective` into `drive-to-delivery`: same job (one
  accepted objective → terminal evidence), same artifact, same acceptance
  authority, same loop mechanism (MODEL.md merge rule: job/artifact/authority/
  mechanism coincide). Capability preserved: host-continuity, research-depth,
  and objective-terminal rules moved to
  `skills/drive-to-delivery/references/product-objective-mode.md`.
- Listing `pursue-product-objective` retired; `drive-to-delivery` description
  now covers engineering and product objectives. One sole writer for the
  objective loop (no dual path).
- Composition-and-output contract consolidated: 19 near-identical pack sections
  → one canonical `skills/author-skill/references/composition-contract.md`;
  packs link instead of restating (entropy / future-edit interest reduction).
- Self-audit record: `docs/PRINCIPLES-SELF-AUDIT-2026-08-09.md`.

## Verified Capabilities clean break (2026-08-10)

- Product identity is now **Sylphx Verified Capabilities** (open foundation):
  Capability and Qualification. The 2026-08-10 house yield KPI and required
  outcome-receipt field were **retired 2026-08-13** (ADR-20260813;
  `docs/NORTH-STAR.md`). Evaluation follows paired industry practice.
- Every listing package carries `capability.json` (contract) and
  `qualification.json` (record; honest default `unqualified`). Catalog projects
  qualification state (0/57 qualified, 0 receipts at adoption).
- Quality North Star remains the authoring quality vocabulary and is explicitly
  **not** qualification evidence.
- Utilization residual moved to live qualification evidence:
  `docs/qualification/evals/utilization-residual.md` (history keeps a stub).
- Integrity gate now validates contracts, qualification records (expiry +
  evidence), and catalog projection; AutoSync promotion refuses qualification
  downgrade.

## Stage-honest Product North Star (2026-08-12)

- Full rewrite of `docs/NORTH-STAR.md` (superseded the next day): briefly
  steered with house coverage/yield KPIs. **Do not restore.** See
  ADR-20260813 and the 2026-08-13 ledger entry below.
- Naming hygiene: Product North Star vs Quality North Star (`q-*`) vs
  universal Principles (9) — three layers, not one slogan.
- ADR: `docs/history/adr/ADR-20260812-stage-honest-product-north-star.md`
  (amends ADR-20260810).
- Quality North Star surfaces rewritten for depth and separation:
  `quality-north-star-usage.md`, engineering-standard README / full-standard /
  binding-predicates openings; cross-refs in README, PROJECT, MODEL,
  AUTHORITY-MAP, QUALIFICATION, LEDGER, PRINCIPLES.

## Project documentation model (2026-08-12)

- Initial product/repo doc altitude under `documentation-standard`.

## Industry documentation layers (2026-08-12)

- `documentation-standard` rewritten to **global industry names and layers**:
  **Product Vision · North Star Metric · OKRs/Goals · PRD · Specs/API reference ·
  ADR · README/`PROJECT.md` entry · Diátaxis** (no proprietary “End state”
  taxonomy as the law).
- Exemplar: `PROJECT.md` projection; **`docs/prd.md`** as PRD; `docs/PRODUCT.md`
  is a one-line redirect. Wired across adopt-repo, design-product,
  craft-human-agent-language, engineer-testable-requirements, author-skill,
  build-product, bound-request-scope, drive-to-delivery, MODEL, AUTHORITY-MAP.

## 2026-08-13 — retire research-public-web; strip host-search ban

- Retired listing `research-public-web`. Public-page lookup is a host
  search/fetch job, not a skill. The package opened `recipes.md` first, said
  **do not web-search**, and shipped copy-paste `curl` as the method — a
  fleet regression. Do not restore as a listing or as a "use host search
  first" wrapper.
- Absorption: registry URL patterns stay under
  `select-dependency-versions`; citation/gap hygiene stays with
  `synthesize-evidence-brief` and ordinary evidence honesty. Snapshot:
  `docs/history/retired-research-public-web-2026-08-13/`.
- Same 2026-08-08 free-provider boilerplate ("Open recipes.md first — do not
  web-search") removed from `compose-readme-marks`,
  `share-ephemeral-artifact`, `wire-managed-backend-services`,
  `provision-agent-workspace`, and `deploy-ephemeral-web-preview`. Those
  jobs stay; recipes are known URL/CLI patterns, not a search ban.
- Integrity gate rejects those instruction phrases under `skills/`.
- `compose-readme-marks` demoted to `unqualified` because the method digest
  changed; wave-11 bundle is archaeology. Residual: re-qualify on the new
  digest.

## 2026-08-13 — qualification digest integrity

- `qualified` now requires `packageDigest` equal to the live package
  identity (`SKILL.md`, `references/`, `scripts/`, `capability.json`,
  `agents/`). The integrity gate fails closed on drift; `--apply-from`
  refuses a run whose candidate digest is not the current package.
- Fourteen packages still marked `qualified` after material edits were
  reset to `unqualified` (same class as `compose-readme-marks`):
  adopt-repo-standards, author-skill, bound-request-scope,
  compose-product-portfolio, craft-human-agent-language,
  decide-architecture-shape, design-product, engineer-agent-context,
  engineer-testable-requirements, execute-hard-cutover,
  optimize-store-listing, record-structured-deliberation,
  run-incident-response, select-dependency-versions. Jobs stay listed;
  evidence is archaeology until a new run on the current bytes.
- Fourteen further records had report-digest drift only from the
  identity-algorithm change (evals/qualification excluded). Those stay
  `qualified` and are rebound to the current-algorithm digest.
- The runner pattern scan now treats host-search bans as findings, so
  the `research-public-web` class cannot be filed as qualified again.

## 2026-08-13 — incremental-value is same-prompt only

- Fixture-read `Read ./SKILL.md` tasks are fresh-context behavior tests.
  Incremental-value now requires an identical user prompt on a with-skill
  agent task and a baseline agent task, with no SKILL.md fixture.
- Fifteen qualified records had fixture-read `incremental-value` filings
  withdrawn. Status stays `qualified` (compatibility + scan, plus
  activation where already verified). Zero packages currently claim
  incremental-value.
- Integrity gate rejects a later hand-edit that puts `incremental-value`
  back onto an ineligible suite.

## 2026-08-13 — Platform customer method (industry grain)

- Industry sources agree: a skill is one coherent requestable job. Extract
  from real tasks. Do not pre-create one listing per feature noun. Do not
  fold every verb into a fat `build-product`. Progressive disclosure holds
  thickness. Record: `skills/author-skill/references/skill-grain.md`.
- Rewrote `build-product/references/sylphx-platform-first-policy/` as the
  **how-to** (classify → one family recipe). One home; listings open a recipe.
- New listings for independently requested verbs: `authenticate-app-users`,
  `persist-app-data`, `run-background-work`, `deliver-app-events`. All
  `unqualified`.
- Narrowed `build-product` and `wire-managed-backend-services` descriptions
  so they do not steal sign-in / persist / cron / delivery routes.
- Thin constitution **Platform apps** floor: public contracts, `type=web`,
  durable memory in Platform families.
- Owner when-to-open: `drive-to-delivery`, `adopt-repo-standards`,
  `craft-product-interface`, `build-payment-readiness`.

## 2026-08-13 — retire house NSM; follow industry eval

- Removed TJC, VCY, Stage A/B, and required `outcome.receiptSchema` from
  active product surfaces. Outcome-receipt schema moved to
  `docs/history/retired-outcome-receipt-2026-08-13/`.
- All 56 packages reset to `unqualified` (capability bytes changed). They
  remain listed and installable.
- `design-skill-evals` contract, suite, and runner now follow SkillsBench /
  NVIDIA T3: same user prompt, isolated with-skill vs empty baseline home,
  harm veto, one harness. Four-way / holdout program archived under
  `docs/history/retired-four-way-eval-program-2026-08-13/`.
- Foreign Platform-first recipe files and a constitution Platform floor that
  were not part of this cut were dropped. They are not listings.
- ADR: `docs/history/adr/ADR-20260813-retire-house-nsm-follow-industry-eval.md`.
