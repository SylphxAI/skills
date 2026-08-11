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

- Adopted the nine-principle universal doctrine (Depth · Correctness ·
  Simplicity · Evolvability · Observability · Performance & Velocity ·
  Reliability · Security · Economy) as canonical doctrine for all design,
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
  doctrine, constitution, and quality vocabulary surfaces.
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
  Capability, Qualification, Outcome receipt; North Star metric = Verified
  Capability Yield (see `docs/NORTH-STAR.md`, ADR-20260810).
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
