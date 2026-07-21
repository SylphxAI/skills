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
- [`decision-quality-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/decision-quality-standard/references/full-standard.md) for the canonical
  decision precedence, risk, reversibility, evidence, and option-value kernel.

## Canonical Homes

One semantic authority per fact:

| Fact | Canonical home |
| --- | --- |
| Why a pricing, packaging, roadmap, ICP, or market-position decision was made | `docs/adr/` Commercial ADR |
| Current project commercial posture and where to find decisions | `project.manifest.json` optional `commercial` section |
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

## Commercial risk inputs

`decision-quality-standard` owns the general risk-posture, ruin-boundary,
reversibility, evidence, and decision-precedence method;
`autonomous-execution-standard` owns execution and escalation authority. This
standard contributes only commercial inputs such as unit-economics downside,
contractual commitments, pricing reversibility, market timing, customer trust,
and opportunity cost. Record a commercial delegation envelope only when a
pricing, discount, credit, packaging, or commitment limit is itself part of the
commercial decision. Do not create a second general risk-posture authority here.

## Internal settlement and margin topology

When products or business units consume each other through stable APIs, keep
technical metering, cost attribution, managerial reporting, transfer pricing,
cash settlement, and external customer pricing as distinct decisions. There is
no universal `$0`, at-cost, or marked-up default: the correct treatment depends
on legal entities and jurisdictions, tax/transfer-pricing authority, accounting
policy, funding and performance model, product independence, and the objective
of the analysis.

For each material producer-consumer pair, record in the owning commercial ADR:

- legal and economic relationship plus current authoritative policy;
- usage and cost-allocation method, without making telemetry a ledger;
- whether any journal entry, invoice, cash transfer, or margin is real;
- external pricing impact and double-counting/compounding controls;
- owner, review trigger, reconciliation source, and required finance/legal
  approval where applicable.

Use the simplest model that produces decision-useful unit economics and meets
the governing obligations. Do not invent transfer prices, internal invoices, or
profit-center status from a generic Skill, and do not encode one company's
portfolio topology as portable law.

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
  releases, release statuses, and provenance evidence; package
  registry publishing should use the protected workflow's
  OIDC/trusted-publishing identity where the ecosystem supports it;
- the org's automation bot or an equivalent platform app for instruction/policy
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


## Package checklist

| Rule ID | Check |
| --- | --- |
| `commercial-d-01` | Strongest relevant subset applied |
| `commercial-d-02` | Facts in schema/test/ADR homes |
| `commercial-d-03` | Proof layers separated |
| `commercial-d-04` | Unknown authority fails closed |
| `commercial-d-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
