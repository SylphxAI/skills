---
id: ADR-20260731T191027Z-continuous-product-quality-loop
status: accepted
date: 2026-07-31
decision_owner: SylphxAI/skills
supersedes: []
amends:
  - ADR-0032-bounded-agent-loop-engineering
scope:
  - better-product
  - product-improvement
  - agent-work-loops
---

# Add a distinct continuous product-quality loop contract

## Context

The existing loop methods intentionally separate one bounded objective from a
continuous operating system. `drive-to-delivery` closes one
accepted Work Item. `select-next-work` discovers, qualifies,
claims, executes, and re-enters recurring Work. Specialist Skills review one
quality domain, while `remediate-agent-harness` changes prompts, Skills,
context, tools, evaluators, or workflow after a recurring agent-system failure.

None of those owners defines the cross-domain product artifact that says which
surfaces and quality dimensions matter, how scouts produce observations, how
observations become deduplicated findings, when a finding deserves Work, how
the original quality oracle is replayed after delivery, or when the product
quality frontier is healthy and idle. Leaving that contract implicit either
requires humans to find every defect or encourages an unbounded “improve
everything” agent, a universal CI gate, and a growing backlog of unactionable
warnings.

## Decision

1. Add `better-product` as the owner of one independently accepted
   **Product Quality Loop Contract**.
2. Model quality as a surface-by-dimension matrix with explicit promises,
   hard floors or objectives, required source/Candidate/artifact/live subject
   layer, oracles, evidence freshness, and residuals. Evidence from one layer
   cannot silently satisfy another. Do not use one aggregate green score to
   hide failed cells.
3. Keep Quality Observation, Quality Finding, Work, and Quality Coverage
   distinct. Observations are immutable evidence; findings are normalized and
   dispositioned interpretations; Work is an accepted action; coverage is a
   rebuildable projection. Operational contract heads advance under
   predecessor CAS; historical contract findings cannot create new Work.
4. A normal finding becomes Work only when it is reproducible or measurable,
   material, actionable, owned, novel, replayable, positive-net under an
   agent-native lifecycle cost model, and admitted within integration capacity.
   Hard-floor violations bypass opportunity ranking but not authority and
   safe-effect boundaries.
5. Use change-triggered, delivery-triggered, event-triggered, and scheduled
   scouts. Keep fast deterministic candidate invariants in CI; broad,
   expensive, subjective, and exploratory discovery stays asynchronous unless
   a product contract explicitly makes it admission-critical.
6. Create domain-specific bounded Work so native Skill discovery selects the
   relevant specialist. Do not inject the whole catalog or build a meta-router,
   keyword engine, or Skill dependency graph.
7. The product repository owns versioned quality intent and local oracles.
   Enact may own live observations, findings, Work, Runs, relations, and
   subscriptions. The delivery platform retains candidate, artifact, deploy,
   rollback, and live-delivery authority. No new queue, service, or delivery
   evaluator is introduced by this decision.
8. Continuous operation uses bounded coordinator ticks and durable wake
   triggers. “Perfect” means a falsifiable healthy idle frontier for the exact
   current product state, not an immortal session or a claim that no future
   defect can exist.

## Rejected directions

### Extend the self-feeding loop with every product-quality rule

Rejected because Work scheduling and product-quality qualification produce
different accepted artifacts. Combining them would make the operating loop a
catalog of UI, SEO, accessibility, security, performance, and product methods.

### Create one Skill or agent per quality dimension

Rejected because specialist Skills already own those methods. The missing
artifact is their cross-domain composition and Finding-to-Work contract.

### Run every quality method in merge CI

Rejected because it couples candidate admission to slow, volatile, subjective,
or unrelated signals and recreates the CI complexity the repository rejects.

### Let one agent run until the product is perfect

Rejected because sessions are not durable authority, theoretical perfection is
not falsifiable, and unbounded execution ignores WIP, integration capacity,
external waits, and changing product state.

## Consequences

- A product can declare complete quality intent once and add new scout adapters
  without changing Work, delivery, or specialist boundaries.
- Agents can discover useful Work autonomously without converting every warning
  into backlog or requiring humans to inspect every page manually.
- Quality closure remains exact-subject and evidence-based while the operating
  loop can park and re-enter after session loss.
- Enact can add a first-class Finding module inside its modular monolith when
  product implementation begins; no microservice or second queue is implied.

## Verification

- Native-routing fixtures distinguish continuous product quality from one bug,
  customer-feedback intake, service observability, one release review, agent
  learning, and generic continuous Work scheduling.
- The package contains one concise entry method and one progressive-disclosure
  reference; specialist procedures are linked rather than copied.
- The existing catalog, repository check, package dry-run, and whitespace check
  validate the exact source candidate without adding a CI workflow.
