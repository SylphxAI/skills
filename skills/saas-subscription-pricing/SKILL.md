---
name: saas-subscription-pricing
description: "Make or audit a SaaS subscription pricing and packaging decision: buyer, value metric, tiers, limits, trials, seats or usage, enterprise path, unit economics, trust constraints, and validation. Use when the primary artifact is what to charge and package. Do not use for billing implementation, entitlement state, listing/interface copy, broad market research, or an already-approved price migration."
---

# SaaS Subscription Pricing

Produce a **Pricing and Packaging Decision** that matches customer value,
expansion, cost, and trust constraints.

## Workflow

1. Identify the decision, buyer, user, purchasing motion, value metric, cost
   driver, expansion path, constraints, and assumptions.
2. Read `references/pricing-packaging-patterns.md`.
3. Decide the packaging model: free trial, freemium, usage-based, seat-based, tiered, hybrid, or enterprise.
4. Design plan boundaries, exact limits, upgrade moments, downgrade/cancel
   promises, and enterprise/procurement path.
5. Run a pricing arithmetic pass before publishing: seat minimums vs included seats, included usage vs overage rates, gross margin, annual discount, and procurement terms must be internally consistent.
6. Define exact usage rates, unit economics, margin guardrails, a bounded
   validation or rollout, sales enablement, objection handling, and kill criteria
   before proposing discounts.

## Handoffs

- Market Research Synthesis supplies current competitor, substitute, buyer, and
  demand evidence; this skill owns the resulting price/package decision.
- Payment Platform Readiness owns billing, ledger, entitlement, invoice,
  collection, tax, reconciliation, and finance-close execution.
- Store Listing Optimization and Interface Craft own channel copy, creative, and
  UI implementation after the commercial decision is stable.
- An already-approved price increase needs a separate migration artifact for
  cohorts, notice, consent where required, grandfathering, retention, and rollback.

## When not to use

- Do not use when the primary artifact is billing, ledger, invoice, or
  access/entitlement state after provider events.
- Do not use for an already-decided price increase whose main job is cohort migration, consent, grandfathering, and retention response.
- Do not use for broad competitor/demand research whose output is not yet a
  price/package decision.
- Do not use as accounting, tax, competition-law, or jurisdiction-specific
  pricing advice.

## Source verification

- Consume or research current competitor pricing, package boundaries, currencies,
  contract terms, and customer evidence at use; record source URL, access date,
  geography, and plan.
- Obtain current internal cost, margin, usage, conversion, churn, and support data from the owning systems. Mark missing values as assumptions and make the recommendation a bounded experiment.

## Guardrails

- Do not mix "per seat" pricing with ambiguous "included base seats"; state either a minimum seat commitment or a bundled-seat package.
- Do not set overage prices below marginal cost plus target gross margin.
- Do not hide annual terms, usage caps, downgrade consequences, or procurement friction behind sales-only language.
- Do not propose discounts without approval rules, CRM logging, renewal impact, and rollback criteria.
- Do not let pricing copy or billing implementation silently change the approved
  value metric, limits, price, renewal, cancellation, or downgrade semantics.

## Output format

```text
Recommended model:
Value metric:
Plan architecture:
- Free/trial:
- Core paid:
- Team/business:
- Enterprise:
- Usage and overages:
- Procurement:
- Support and sales enablement:

Upgrade moments:
Cancellation/downgrade:
Metrics:
Unit economics:
- Gross margin target:
- CAC payback / NRR target:
- Cost and abuse controls:
Pricing arithmetic:
- Seat minimums / included seats:
- Included usage and overage rate:
- Annual discount and contract term:
- Margin sanity check:
Experiment/rollout plan:
- Test design:
- Handoff for any approved migration:
- Customer communications:
- Guardrails:
Risks:
```
