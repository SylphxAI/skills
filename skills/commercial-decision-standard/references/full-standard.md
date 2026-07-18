# commercial-decision-standard (canonical body)

**Authority:** binding Standard Skill package `commercial-decision-standard` in `SylphxAI/skills` (`skills/commercial-decision-standard/`).

**Cutover:** migrated from Doctrine `standards/commercial-decision-standard.md` at digest `sha256:4c9ba4112d86162d1ef7bc4b6a59269b9542575b889a88da43b007b70f60efe9` (doctrine `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7`). Doctrine file is alias-only after cutover.

Author here; do not maintain a second prose SSOT.

---

# Commercial Decision Standard

## Purpose

Use this standard when a task changes or proposes pricing, packaging, business
model, target buyer, monetization, roadmap priority, paid entitlement, discount
policy, release/publish posture, market positioning, or a commercial experiment.

Commercial direction is a decision surface. It is not an owner's taste encoded
in chat, and it is not raw data making a decision without constraints. Humans
own the objective function and hard constraints; agents turn evidence into
decision records, configuration, experiments, gates, and follow-up work.

This standard composes with:

- [`documentation-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/documentation-standard/references/full-standard.md) for ADR altitude
  and source-of-truth rules;
- [`project-manifest-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/project-manifest-standard/references/full-standard.md) for the
  repo-local current-state manifest;
- [`delivery-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/delivery-standard/references/full-standard.md) for release and production
  proof;
- [`agent-first-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/agent-first-development-standard/references/full-standard.md)
  for no-human gates, risk lanes, and recovery.
- [`sota-execution-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/sota-execution-standard/references/full-standard.md) for the canonical
  decision precedence, risk, reversibility, evidence, and option-value kernel.

## Canonical Homes

One semantic authority per fact:

| Fact | Canonical home |
| --- | --- |
| Why a pricing, packaging, roadmap, ICP, or market-position decision was made | `docs/adr/` Commercial ADR |
| Current project commercial posture and where to find decisions | `.doctrine/project.json` optional `commercial` section |
| Live billable prices, products, coupons, and subscriptions | Stripe or the repo's declared billing SSOT |
| Entitlement rules and product capability gates | Code/schema/tests in the owning product |
| Metrics, cohorts, funnels, revenue, churn, CAC, and margin evidence | Analytics/warehouse/dashboard declared by the repo |
| Time-boxed uncertainty | Experiment record with expiry, owner, metrics, and kill criteria |

Do not duplicate a Stripe price, entitlement rule, or analytics metric in prose
as live truth. Prose may cite it as evidence at the time of the decision.

## When A Decision Record Is Required

Create or amend a Commercial ADR before durable work when the change affects:

- public pricing, package tiers, trial length, discounts, credits, overage, or
  usage metering;
- paid entitlement boundaries or feature gating;
- target ICP, positioning, buyer, launch channel, or go-to-market narrative;
- roadmap priority that materially shifts commercial outcome or opportunity
  cost;
- billing or payment behavior;
- package publishing or public artifact release posture;
- designating a product an independent profit center, or classifying a
  product pair's internal settlement row (see "Internal Settlement And
  Margin Topology" below);
- any experiment that may change revenue, conversion, retention, trust,
  compliance, or customer-visible semantics.

Trivial copy fixes, internal-only task ordering, and purely technical fixes do
not need a Commercial ADR unless they change customer expectation or business
outcome.

## Evidence Contract

A Commercial ADR must separate facts, measurements, assumptions, and judgment.
It must include the smallest useful evidence set:

- target buyer, user job, and willingness-to-pay hypothesis;
- competitor set, pricing/packaging comparison, and category expectation;
- value metric candidates such as seats, usage, volume, managed spend, or
  outcome value;
- unit economics: gross margin, infra/API cost, support load, payment fees, and
  expected abuse/fraud pressure;
- conversion, activation, retention, expansion, churn, or revenue evidence
  available today;
- boundary impact across products: which repo owns the capability, which
  public surfaces consumers use, and which project must not receive
  product-specific hacks;
- alternatives rejected, including price war, premium positioning,
  max-margin/harvest, usage-based, seat-based, freemium, and enterprise
  contract where relevant;
- decision, constraints, rollout, metrics, kill criteria, and review date.

If evidence is weak, the correct decision is usually a bounded experiment, not
a permanent price or roadmap change.

## Strategy Selection

Do not choose a pricing posture by preference. Choose it by fit:

| Strategy | Fits when | Required guardrail |
| --- | --- | --- |
| Price war / penetration | market is commoditized, marginal cost is low, network effect or data advantage compounds, and capital/capacity supports lower margin | price floor, time limit, abuse controls, and conversion/retention proof |
| Premium / high anchor | buyer risk is high, trust matters, switching cost is high, or product is meaningfully differentiated | proof of differentiated value, sales friction tracking, and churn monitoring |
| Max-margin / harvest | demand is mature or capacity constrained, switching cost is high, and growth is not the binding constraint | churn, NRR, win-rate, and support burden guardrails |
| Usage-based hybrid | customer value scales with usage and cost also scales with usage | metering correctness, spend caps, invoice explainability, and margin proof |
| Land-and-expand | adoption friction is the bottleneck and expansion signal is measurable | activation-to-paid and expansion metrics with expiry on free/low-price grants |
| Enterprise contract | buyer needs procurement, compliance, support, custom limits, or committed spend | contract boundary, discount approval envelope, and entitlement automation |

An ADR may select a mixed strategy, but it must say which segment each part
serves and what metric would invalidate it.

## Risk Posture And Delegation

Risk posture is a computed decision, not a preference. Agents draft it, the
principal ratifies its inputs, and downstream decisions read it instead of
re-asking.

- **The record.** A risk-posture record conforms to the active schema selected
  by the repository's binding profile:
  the principal's standing parameters (time horizon, ruin boundary,
  non-negotiables, cross-portfolio tradeoffs), current stage parameters,
  per-domain acceptance with rationale and evidence, delegation envelopes,
  and review triggers. Adopt it via a Commercial ADR (or a repo ADR for a
  single-product company) so the decision history stays durable.
- **Computation duty.** Agents produce the posture with research and numbers
  under the canonical decision kernel in
  [`sota-execution-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/sota-execution-standard/references/full-standard.md), with
  [`autonomous-execution-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/autonomous-execution-standard/references/full-standard.md)
  supplying execution authority and escalation mechanics. Dominated options
  never survive to ratification and ruin-level options are screened before
  proposal. Where
  irreversibility times blast radius turns existential, the arithmetic
  itself yields floor items; route those through the heavier admission
  lanes — the security floor and
  [`incident-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/incident-standard/references/full-standard.md) supply the domain mechanism.
- **Ratification.** The principal ratifies the standing parameters and the
  first record once. Review triggers (stage-parameter thresholds, elapsed
  review date, friction telemetry) recompute the posture without the
  principal's voice; re-ratification is needed only when a standing
  parameter itself changes.
- **Delegation envelopes are the materiality thresholds.** Each decision
  class carries a limit and an escalation condition: decisions inside the
  envelope proceed without the principal, decisions outside escalate the
  narrow question. This is the artifact the execution standard's
  escalation-by-exception rule reads.
- **Validation.** No conformance audit ships with this section, and no
  review-trigger type is automatically detected today: a posture record is
  validated by schema shape only, and an agent must notice a stage-parameter
  change, an elapsed review date, or accumulating exceptions and recompute by
  hand. Trigger detection, floor-item admission-lane wiring, and
  envelope-breach counting remain follow-up mechanisms owned by the relevant
  policy and incident controls.

## Internal Settlement And Margin Topology

Extends `P-PORTFOLIO`: when products consume
each other through public APIs, that clause already requires paying-customer
treatment (scoped keys, metered boundaries, no backdoors) but says nothing
about money — whether metering settles as a real internal charge or stays
  observability-only. Left unstated, the gap resolves badly: margin gets
assumed implicitly in code, or compounds silently across layers as each
consuming product marks up what it did not produce, and neither failure is
visible until an external price looks wrong or someone asks where a margin
assumption came from.

- **Margin capture point.** Margin is captured once: at the boundary where
  the portfolio sells to an external, paying customer. Internal-to-internal
  consumption between products in the same portfolio passes through at cost
  by default — no compounding, no per-layer markup. This follows from "one
  engine, many storefronts": a storefront resells the engine; it does not
  also buy low internally and sell high internally on top of the price the
  external customer already pays.
- **The one deliberate exception.** A product explicitly designated an
  **independent profit center** may charge real margin on internal
  consumption, because its economics are meant to stand on their own
  regardless of who the customer is. This is an explicit architectural
  decision recorded as an ADR in the owning product's own repo — never an
  implicit default, and never invented unilaterally by a consuming product.
- **When $0 settlement is acceptable vs. when a real charge is required.**

  | Relationship | Settlement |
  | --- | --- |
  | Both products are consolidated under one P&L — neither is funded, evaluated, or reported on independently. | **$0 settlement.** Usage is metered for cost attribution and capacity planning, not billed — the metering exists so `P-BOUNDARY` and observability hold, not to move money. |
  | Either product is (or is being evaluated to become) independently sellable, fundable, or reportable on its own. | **Real transfer-priced settlement is required**, at the same metered-cost basis an external customer of that engine would pay (at cost, per the rule above, unless the producing product is itself the deliberate profit-center exception). Skipping this hides that product's true unit economics — the anonymous-paying-customer test applied to an internal customer instead of an external one. |

  Which relationship applies to a given product pair is a per-portfolio,
  per-pair fact recorded in the consuming or producing product's own ADR —
  doctrine states the rule and the two rows; it never lists product names.
- **Validation.** No conformance audit ships with this section: no schema
  field yet records a product pair's settlement row, and nothing compares
  declared settlement against actual metering or ledger records. A
  `.doctrine/project.json` fact for this and a matching audit are follow-up
  mechanisms; until they land, the decision remains explicitly advisory rather
  than pretending to be an enforced ledger fact.

## Roadmap Decisions

A roadmap item is not "important" because an agent or owner wants it. It is
important because it improves an explicit objective under constraints.

Roadmap ADRs must state:

- objective function: revenue, retention, activation, cost reduction, risk
  reduction, reliability, strategic option value, or required compliance;
- expected commercial outcome and leading indicator;
- opportunity cost versus the next best alternative;
- owner repo and product boundary;
- what will be shipped as verified slices;
- what evidence will cause the roadmap bet to be stopped, narrowed, or
  reprioritized.

## Machine Gates

Commercial decisions must become enforceable mechanisms:

- Pricing changes use the billing SSOT. For Stripe, create new Prices; do not
  mutate historical prices in place.
- Product/tier identifiers are schema-backed and tested. UI, API, SDK, billing,
  entitlement, and docs must derive from the same source or be freshness-gated.
- Entitlement changes need unit/contract tests for every paid boundary.
- Pricing pages, checkout, upgrade/downgrade, invoice, and customer-visible
  copy need smoke or screenshot/e2e proof when they change.
- Experiments have owner, scope, metrics, start date, review date, and kill
  criteria. Expired experiments fail a check or open a machine-actionable issue.
- Commercial exceptions such as manual discounts, grandfathering, free credits,
  or custom contracts require an explicit envelope: scope, max value, expiry,
  approver mechanism, and audit trail.

Advisory dashboards are not governance. A metric that determines whether a
decision continues must feed a check, issue, alert, or scheduled review record.

## Automation Identity

Generated commercial, release, pricing-config, and policy-sync PRs must use a
dedicated GitHub App or bot identity where the PR must trigger ordinary CI. Do
not rely on a human account, long-lived personal access token, or repository
`GITHUB_TOKEN` as the normal path for PRs that need downstream workflow runs.

Use separate identities for separate risk boundaries:

- the org's designated release bot for package version PRs, Changesets
  releases, release statuses, and provenance evidence (see ADR-59); package
  registry publishing should use the protected workflow's
  OIDC/trusted-publishing identity where the ecosystem supports it;
- the org's automation bot or an equivalent platform app for doctrine/policy
  sync, generated commercial config PRs, and conformance remediation;
- Renovate/Dependabot remain dependency-update identities, not release or
  pricing authorities.

The bot is not a reviewer. It is the auditable actor that creates generated
diffs and emits statuses; branch protection and required gates still decide.

## Approval Boundary

Inside an accepted Commercial ADR's constraints, agents may implement pricing,
packaging, roadmap, or experiment slices through normal PRs.

Outside that envelope, stop only the commercial decision and create or amend
the ADR. Examples:

- changing price floor/ceiling, discount authority, billing SSOT, or payment
  provider;
- changing public contract, legal terms, data use, regulated claims, or
  customer commitments;
- adopting a materially different target buyer, product category, or roadmap
  objective;
- spending new budget, creating new infrastructure, or accepting new legal or
  compliance risk.

Recurring stops should become machine policy gates, signed exception files, or
explicit commercial envelopes. Repeated chat approvals are a missing mechanism.

## Commercial ADR Template

Use this shape for pricing, packaging, roadmap, and market-position decisions:

```md
# ADR-DRAFT: <Decision>

## Status

Draft.

## Context

What commercial decision is being made, which repo owns it, and what customer
or market pressure makes it necessary.

## Objective Function And Constraints

What we optimize and what cannot be violated.

## Evidence

- Buyer / ICP:
- Competitor set:
- Current metrics:
- Unit economics:
- Customer risk / compliance:
- Boundary impact:

## Options

| Option | Expected upside | Cost/risk | Evidence needed |
| --- | --- | --- | --- |

## Decision

The selected strategy, scope, rollout, and owning repo.

## Machine Gates

Tests, policy checks, generated diffs, Stripe drift checks, entitlement tests,
analytics readback, experiment expiry, or release gates.

## Kill Criteria And Review

Metrics, threshold, review date, and automatic follow-up.

## Consequences

Tradeoffs and rejected alternatives.
```


## Package checklist (Skills cutover)

| Rule ID | Check |
| --- | --- |
| `commercial-d-01` | Strongest relevant subset applied |
| `commercial-d-02` | Facts in schema/test/ADR homes |
| `commercial-d-03` | Proof layers separated |
| `commercial-d-04` | Unknown authority fails closed |
| `commercial-d-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
