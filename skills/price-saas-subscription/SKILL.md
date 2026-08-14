---
name: price-saas-subscription
description: "Price a SaaS subscription: packaging, meters, fences, migration."
---

# Price SaaS Subscription

Produce a **Pricing and Packaging Decision** that matches customer value,
expansion, cost, and trust constraints.


## When to use
- A SaaS price/package decision needs packaging, meters, fences, migration, or enterprise path
- Pricing arithmetic must be internally consistent before publication
- Not for billing/ledger execution (`build-payment-readiness`)

## Workflow

1. Identify the decision, buyer, user, purchasing motion, value metric, cost
   driver, expansion path, constraints, and assumptions.
2. Read `references/pricing-packaging-patterns.md`.
3. Decide the packaging model: free trial, freemium, usage-based, seat-based, tiered, hybrid, or enterprise.
4. Design plan boundaries, exact limits, upgrade moments, downgrade/cancel
   promises, and enterprise/procurement path.
5. Run a pricing arithmetic pass before publishing: seat minimums vs included seats, included usage vs overage rates, gross margin, annual discount, and procurement terms must be internally consistent.
6. Define exact usage rates, unit economics, margin floors, a bounded
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

## Source verification

- Consume or research current competitor pricing, package boundaries, currencies,
  contract terms, and customer evidence at use; record source URL, access date,
  geography, and plan.
- Obtain current internal cost, margin, usage, conversion, churn, and support data from the owning systems. Mark missing values as assumptions and make the recommendation a bounded experiment.

## Path

- Per-seat prices name either a minimum seat commitment or a bundled-seat package.
- Overage sits at or above marginal cost plus the target gross margin.
- Annual terms, usage caps, downgrade consequences, and procurement friction live in the published offer.
- A discount proposal includes approval rules, CRM logging, renewal impact, and rollback criteria.
- Copy and billing implement the approved value metric, limits, price, renewal, cancellation, and downgrade semantics.


## Progressive disclosure

- [references/pricing-packaging-patterns.md](references/pricing-packaging-patterns.md) — open when needed for depth

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
- Holds:
Risks:
```
