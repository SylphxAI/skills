# Method knowledge index

Migrated from the pre-v3 122-package portfolio into **one library skill**
(`consult-sylphx-methods`) so knowledge is preserved and installed without
100+ listing entries.

## How to use

1. Host loads only this skill's name/description until needed.
2. Open this INDEX, pick a row, then that folder's `README.md`.
3. Open nested files only when required (progressive disclosure).
4. Dedicated task skills under `skills/<id>/` still win when they match the job.
5. Do not dual-publish these folders as separate installable skills unless they
   pass `docs/MODEL.md` and the listing budget.

## Task skills (installed)

| id | path | summary |
| --- | --- | --- |
| `author-skill` | `skills/author-skill/` | Author/revise a Skill: job-shaped id, short description, method body, portable host rules. |
| `build-keel-title` | `skills/build-keel-title/` | Implement a Keel external title/game/app: Title day-1, examples routing, pack shell, doctor floors. |
| `craft-product-interface` | `skills/craft-product-interface/` | Craft one product interface or flow: premium non-generic UI, HUD/overlay, states, responsive, a11y. |
| `execute-hard-cutover` | `skills/execute-hard-cutover/` | Execute a hard cutover migration: destination sole writer, full backfill, retire dual-paths; expand-contract only for proven large-scale live risk. |
| `produce-game-2d-map-assets` | `skills/produce-game-2d-map-assets/` | Produce 2D map tiles/props packs: layered sheets, magenta prop extract, previews for title/Keel assets. |
| `produce-game-2d-sprites` | `skills/produce-game-2d-sprites/` | Produce engine-ready 2D game sprites/sheets: generate, chroma postprocess, loop QC, Keel pack paths. |
| `produce-product-assets` | `skills/produce-product-assets/` | Produce product assets to brief and brand constraints. |
| `remediate-frontend-performance` | `skills/remediate-frontend-performance/` | Fix frontend jank: repro, RAF/timer/listener leaks, before/after same scene. |
| `run-incident-response` | `skills/run-incident-response/` | Run production incident response: command, severity, mitigation, communications, learning/postmortem. |
| `select-dependency-versions` | `skills/select-dependency-versions/` | Select dependency/runtime versions from live authoritative release sources. |
| `verify-local-web-preview` | `skills/verify-local-web-preview/` | Verify a local web/game preview: headless load, screenshot, console gate, honest human-facing report. |
| `write-high-signal-update` | `skills/write-high-signal-update/` | High-signal stakeholder update: decisions, risks, explicit asks, minimal narrative. |

## Author-skill folded references

| id | path | summary |
| --- | --- | --- |
| `curate-skill-repository` | `../../author-skill/references/curate-skill-repository/` | Curate skills portfolio: collisions, merge/split, thickness, retirement. |
| `design-skill-evals` | `../../author-skill/references/design-skill-evals/` | Falsifiable skill evals: suites, behavior oracles, failure taxonomy. |
| `distill-source-to-skill` | `../../author-skill/references/distill-source-to-skill/` | Distill source material into one Skill package (SKILL.md). |

## Standards & profiles (docs)

| id | path | summary |
| --- | --- | --- |
| `agent-first-development-standard` | `standards/agent-first-development-standard/` | Policy: multi-agent delivery packets—attribution, collision scopes, machine acceptance. |
| `agent-native-standard` | `standards/agent-native-standard/` | Policy: agent-operable products—typed state, schema tools, recoverable workflows, run traces. |
| `ci-admission-standard` | `standards/ci-admission-standard/` | Policy: protected-branch CI admission—required checks, risk-matched gates, flake/preview. |
| `ci-runner-capacity-standard` | `standards/ci-runner-capacity-standard/` | Policy: CI runner pools—fairness, isolation, scaling, queue pressure. |
| `commercial-decision-standard` | `standards/commercial-decision-standard/` | Policy: durable commercial decisions—pricing, packaging, entitlements, licensing. |
| `decision-quality-standard` | `standards/decision-quality-standard/` | Policy: decision quality—framing, alternatives, tradeoffs, commitment, learning. |
| `delivery-standard` | `standards/delivery-standard/` | Policy: delivery honesty—source vs artifact vs desired/current vs live proof. |
| `documentation-standard` | `standards/documentation-standard/` | Policy: docs create/retire—minimal sufficient, freshness, low prose drift. |
| `engineering-standard` | `standards/engineering-standard/` | Policy: engineering method—design, verification, change safety, repro-driven fixes. |
| `enterprise-control-plane-standard` | `standards/enterprise-control-plane-standard/` | Policy: multi-repo control plane—rulesets, reconcilers, audits, status. |
| `enterprise-profile-standard` | `standards/enterprise-profile-standard/` | Policy: versioned enterprise profiles—selectors, defaults, exceptions, migration. |
| `evidence-and-claims-standard` | `standards/evidence-and-claims-standard/` | Policy: evidence before claims—local vs candidate vs landed vs live. |
| `instruction-evolution-standard` | `standards/instruction-evolution-standard/` | Policy: evolve Skills/constitutions/profiles—owner, migration, retirement. |
| `parallel-change-integration-standard` | `standards/parallel-change-integration-standard/` | Policy: parallel change integration—branches, rebase, collision, exact-SHA. |
| `project-manifest-standard` | `standards/project-manifest-standard/` | Policy: project manifest—ownership, surfaces, delivery terminals, machine facts. |
| `review-solicitation-policy` | `standards/review-solicitation-policy/` | Policy: public in-app review request—eligibility, native surfaces, cooldowns, anti star-steering. |
| `risk-matched-verification-standard` | `standards/risk-matched-verification-standard/` | Policy: verification depth matched to failure risk—evidence class, gates, residuals. |
| `source-authoring-standard` | `standards/source-authoring-standard/` | Policy: source authoring—atomic PR commits, revert-safe PR outcomes, worktrees, concurrent-edit safety. |
| `specification-control-plane-standard` | `standards/specification-control-plane-standard/` | Policy: executable specs lifecycle—packets, eval manifests, telemetry, exceptions. |
| `sylphx-platform-first-policy` | `standards/sylphx-platform-first-policy/` | Policy: prefer Sylphx Platform capabilities before inventing parallel infrastructure on company-owned work. |
| `technology-stack-profile` | `standards/technology-stack-profile/` | Policy profile: technology-stack selection rules for matching repos (not a product job). |
| `work-coordination-standard` | `standards/work-coordination-standard/` | Policy: portable work-ledger—claims, leases, checkpoints, handoff; runtime-agnostic. |

## Domain reviews (playbooks)

| id | path | summary |
| --- | --- | --- |
| `review-accessibility-conformance-program` | `reviews/review-accessibility-conformance-program/` | Review: accessibility conformance program design, evidence, residual risk. |
| `review-account-recovery` | `reviews/review-account-recovery/` | Review: account recovery—security, UX, abuse, recovery proof. |
| `review-ad-monetization` | `reviews/review-ad-monetization/` | Review: ad monetization—inventory, UX harm, policy, measurement, net revenue. |
| `review-agent-planning-system` | `reviews/review-agent-planning-system/` | Review: agent planning—goals, tools, memory, evals, failure handling. |
| `review-ai-product-risk` | `reviews/review-ai-product-risk/` | Review: AI product risk—safety, abuse, evals, oversight, residual claims. |
| `review-board-metrics-operating` | `reviews/review-board-metrics-operating/` | Review: board/metrics rhythm—definitions, cadence, decision use. |
| `review-customer-data-migration` | `reviews/review-customer-data-migration/` | Review: customer data migration—correctness, downtime, rollback, proof. |
| `review-customer-success-operations` | `reviews/review-customer-success-operations/` | Review: customer success ops—health, playbooks, escalation, expansion. |
| `review-daily-reward-and-streak` | `reviews/review-daily-reward-and-streak/` | Review: daily reward/streak systems—incentives, abuse, retention lift. |
| `review-data-quality-observability` | `reviews/review-data-quality-observability/` | Review: pipeline quality—freshness, completeness, drift, backfill safety. |
| `review-data-rights-operations` | `reviews/review-data-rights-operations/` | Review: data-rights ops—access, export, deletion, audit evidence. |
| `review-developer-product-experience` | `reviews/review-developer-product-experience/` | Review: developer product UX—onboarding, APIs, docs, time-to-value. |
| `review-developer-quota-credit-abuse` | `reviews/review-developer-quota-credit-abuse/` | Review: developer quota/credit systems—fairness, abuse, metering. |
| `review-enterprise-access-governance` | `reviews/review-enterprise-access-governance/` | Review: enterprise access—roles, JML, reviews, least privilege. |
| `review-enterprise-contract-operations` | `reviews/review-enterprise-contract-operations/` | Review: enterprise contract ops—obligations, renewals, compliance hooks. |
| `review-game-economy` | `reviews/review-game-economy/` | Review: game economy—sources/sinks, balance, progression, abuse. |
| `review-game-soft-launch` | `reviews/review-game-soft-launch/` | Review: game soft-launch—markets, KPIs, kill/scale, live-ops plan. |
| `review-launch-readiness` | `reviews/review-launch-readiness/` | Review: launch readiness—product, ops, support, risk, go/no-go evidence. |
| `review-marketplace-payouts` | `reviews/review-marketplace-payouts/` | Review: marketplace payouts—eligibility, calc, holds, tax/compliance. |
| `review-marketplace-seller-performance` | `reviews/review-marketplace-seller-performance/` | Review: seller performance—quality evidence, tiers, ranking inputs. |
| `review-marketplace-trust-operations` | `reviews/review-marketplace-trust-operations/` | Review: marketplace trust ops—detection, enforcement, appeals, evidence. |
| `review-multi-review-synthesis` | `reviews/review-multi-review-synthesis/` | Review: Synthesize multiple reviews into ranked actions and residuals (not general evidence synthesis). |
| `review-notification-strategy` | `reviews/review-notification-strategy/` | Review: notifications—channels, cadence, consent, fatigue, measurement. |
| `review-offline-sync-conflict` | `reviews/review-offline-sync-conflict/` | Review: offline sync and conflict resolution across devices. |
| `review-operational-observability` | `reviews/review-operational-observability/` | Review: observability—SLOs, telemetry, alerting, on-call diagnosability. |
| `review-optimization-objective` | `reviews/review-optimization-objective/` | Review: optimization objective well-posed, aligned, measurable. |
| `review-privacy-data-lifecycle` | `reviews/review-privacy-data-lifecycle/` | Review: privacy lifecycle—collection, purpose limits, retention, deletion. |
| `review-product-abuse-risk` | `reviews/review-product-abuse-risk/` | Review: product abuse—fraud, spam, exploitation, enforcement. |
| `review-product-analytics-instrumentation` | `reviews/review-product-analytics-instrumentation/` | Review: product analytics instrumentation—events, identity, data quality. |
| `review-product-experiment` | `reviews/review-product-experiment/` | Review: experiment design/readout—hypothesis, assignment, metrics, decisions. |
| `review-product-recovery-contract` | `reviews/review-product-recovery-contract/` | Review: post-failure user recovery—repair, compensation, trust rebuild. |
| `review-promotion-campaign` | `reviews/review-promotion-campaign/` | Review: promotion campaign—offer, eligibility, abuse, measurement, net impact. |
| `review-reference-originality` | `reviews/review-reference-originality/` | Review: originality/derivation risk for designs, content, or code references. |
| `review-referral-loop` | `reviews/review-referral-loop/` | Review: referral loops—incentives, fraud controls, viral mechanics, measurement. |
| `review-refund-and-support-flow` | `reviews/review-refund-and-support-flow/` | Review: refund/support money flows—policy, authority, ledger, customer path. |
| `review-retention-cohort` | `reviews/review-retention-cohort/` | Review: retention cohorts—measurement, drivers, interventions. |
| `review-revenue-operations` | `reviews/review-revenue-operations/` | Review: revenue ops—pipeline hygiene, handoffs, forecast process, systems. |
| `review-search-discovery-quality` | `reviews/review-search-discovery-quality/` | Review: search/discovery—relevance, ranking, evaluation, abuse resistance. |
| `review-security-assurance-operations` | `reviews/review-security-assurance-operations/` | Review: security assurance ops—scanning, triage, SLAs, evidence packs. |
| `review-social-media-operations` | `reviews/review-social-media-operations/` | Review: official social ops—authority, publishing, listening, crisis. |
| `review-subscription-price-increase-retention` | `reviews/review-subscription-price-increase-retention/` | Review: retention-safe subscription price increase—cohorts, notices, grandfathering. |

## Design methods

| id | path | summary |
| --- | --- | --- |
| `design-app` | `design/design-app/` | Whole-app design: jobs, IA, activation, retention, multi-surface blueprint. |
| `design-game` | `design/design-game/` | Whole-game design: thesis, loops, progression, economy, social, live-ops. |
| `design-marketing-automation` | `design/design-marketing-automation/` | Marketing automation design: journeys, triggers, consent, measurement. |
| `design-prompt-architecture` | `design/design-prompt-architecture/` | Design prompt/context architecture: always-on constitution, Skill metadata, subagent briefs, layers without policy duplication. |
| `design-provenance-system` | `design/design-provenance-system/` | Provenance design: lineage, attestation, retention, consumer contracts. |
| `design-saas-web-platform` | `design/design-saas-web-platform/` | SaaS web platform design: identity, billing, tenancy, ops, multi-surface. |
| `design-semantic-taxonomy` | `design/design-semantic-taxonomy/` | Governed taxonomy/ontology: terms, relations, migration. |
| `design-space-exploration` | `design/design-space-exploration/` | Design-space map: alternatives, dimensions, kill criteria, ranked options. |
| `design-system-extractor` | `design/design-system-extractor/` | Extract design-system tokens/components/rules from live UI. |

## Other methods & workflows

| id | path | summary |
| --- | --- | --- |
| `adopt-repo-standards` | `methods/adopt-repo-standards/` | Adopt engineering standards into a repo: constitution, manifest, fences, conformance entrypoints; hard-cut predecessor instruction layouts. |
| `analyze-causal-inference` | `methods/analyze-causal-inference/` | Estimate causal effects: identification, estimators, robustness, claim bounds. |
| `analyze-critically` | `methods/analyze-critically/` | Adversarially critique a claim/plan/design with kill criteria and residuals. |
| `analyze-system-dynamics` | `methods/analyze-system-dynamics/` | Map stubborn loops: stocks, delays, incentives, policy resistance. |
| `bound-request-scope` | `methods/bound-request-scope/` | Bound this request: objective, in/out, non-goals, cut lines, right-sized ceremony. |
| `build-distribution-readiness` | `methods/build-distribution-readiness/` | Build software distribution readiness: artifacts, install/upgrade/uninstall, channels, live readback evidence. |
| `build-payment-readiness` | `methods/build-payment-readiness/` | Build production-ready payments: providers, ledger, webhooks, refunds, support adjustments, reconciliation. |
| `build-product` | `methods/build-product/` | Ship a missing capability end-to-end on the correct boundary; original-oracle verify. |
| `compose-product-portfolio` | `methods/compose-product-portfolio/` | Compose multi-product portfolio: product vs platform, connectors, bundles, dogfood edges. |
| `compose-product-program` | `methods/compose-product-program/` | Compose multi-work product program: phases, dependencies, milestones, kill/scale. |
| `decide-architecture-shape` | `methods/decide-architecture-shape/` | Decide one architecture shape from options with tradeoffs and residuals (not open design-space mapping alone). |
| `drive-to-delivery` | `methods/drive-to-delivery/` | Drive one multi-phase engineering objective through land/live terminal evidence without re-prompt between phases. |
| `edit-preserving-voice` | `methods/edit-preserving-voice/` | Edit text preserving voice, constraints, and factual claims. |
| `engineer-agent-context` | `methods/engineer-agent-context/` | Engineer agent context packs: load rules, budgets, refresh. |
| `engineer-testable-requirements` | `methods/engineer-testable-requirements/` | Turn requirements into testable acceptance criteria with traceability. |
| `expand-product` | `methods/expand-product/` | Scale a validated core (×N) with metrics and core-path non-regression. |
| `finish-product` | `methods/finish-product/` | Release-grade finish/deburr of an integrated product with re-captured evidence. |
| `forecast-with-calibration` | `methods/forecast-with-calibration/` | Produce calibrated probabilistic forecasts with base rates and scoring rules. |
| `maintain-product` | `methods/maintain-product/` | Cut framed live/regression harm: repro, root-cause fix, prove harm reduced. |
| `model-security-threats` | `methods/model-security-threats/` | Threat-model assets, adversaries, entry points, mitigations, residual risk. |
| `operate-customer-support` | `methods/operate-customer-support/` | Operate support: triage, resolution path, escalation, quality loops. |
| `optimize-decision-model` | `methods/optimize-decision-model/` | Model a decision for optimization: objective, constraints, sensitivity, recommendation (not deliberation record alone). |
| `optimize-store-listing` | `methods/optimize-store-listing/` | Optimize store listing: metadata, creatives, conversion evidence, compliance. |
| `price-saas-subscription` | `methods/price-saas-subscription/` | Price SaaS subscription: packaging, value metric, fences, migration, net revenue. |
| `prototype-product` | `methods/prototype-product/` | Learning probe only: cheapest real experiment and go/kill/pivot—not shipping durable capability yet. |
| `pursue-product-objective` | `methods/pursue-product-objective/` | Pursue a fixed declared product objective to evidence-backed completion: keep going until that named outcome is reached and proved. |
| `record-structured-deliberation` | `methods/record-structured-deliberation/` | Record a structured deliberation: options, criteria, decision record, next actions (not decision-quality policy alone). |
| `remediate-agent-harness` | `methods/remediate-agent-harness/` | Remediate an agent harness/system with measured deltas: tools, evals, failure modes (not open-ended improve forever). |
| `research-user-needs` | `methods/research-user-needs/` | Research user needs: questions, methods, synthesis, decision-ready findings. |
| `resolve-support-case` | `methods/resolve-support-case/` | Resolve one support case to closure with correct authority and outcome. |
| `run-open-product-betterment` | `methods/run-open-product-betterment/` | Run ongoing open product betterment (no fixed objective): scout high-EV work, batch implement, atomic commits, revert-safe PRs; idle at empty high-EV frontier. |
| `run-product-feedback-loop` | `methods/run-product-feedback-loop/` | Run feedback learning loop: private feedback and public reviews, cluster, route, product actions, truthful close. |
| `select-next-work` | `methods/select-next-work/` | Select/claim next high-value Work from evidence/ledger under WIP and backpressure. |
| `synthesize-evidence-brief` | `methods/synthesize-evidence-brief/` | Synthesize multi-source evidence into one bounded brief with residuals (not claim-policy alone, not multi-review rollup). |
| `synthesize-market-research` | `methods/synthesize-market-research/` | Synthesize market research: segments, competitors, demand, implications. |

## Migration note

Source revision for extracted bodies: `1ba07c46dce3f448e84374ba2b52aafc65e861ce` (pre-cut main). Old package IDs are document paths only; they are not skill listing entries and must not be dual-published.
