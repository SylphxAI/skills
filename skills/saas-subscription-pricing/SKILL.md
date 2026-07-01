---
name: saas-subscription-pricing
description: Design SaaS and subscription pricing, packaging, trials, freemium limits, usage metrics, plan tiers, cancellation, downgrade, expansion, win-back, and enterprise readiness. Use when creating or reviewing pricing pages, SaaS packaging, subscription strategy, billing UX, monetization experiments, or revenue model design.
---

# SaaS Subscription Pricing

Use this skill to design pricing that matches customer value, supports growth, and avoids trust-destroying traps.

## Workflow

1. Identify buyer, user, value metric, cost driver, and expansion path.
2. Read `references/pricing-packaging-patterns.md`.
3. Decide the packaging model: free trial, freemium, usage-based, seat-based, tiered, hybrid, or enterprise.
4. Design plan boundaries, limits, upgrade moments, downgrade/cancel states, and support paths.
5. Run a pricing arithmetic pass before publishing: seat minimums vs included seats, included usage vs overage rates, gross margin, annual discount, and procurement terms must be internally consistent.
6. Define exact usage rates, unit economics, margin guardrails, rollout experiments, grandfathering, customer communications, sales enablement, and objection handling before proposing discounts.

## Guardrails

- Do not mix "per seat" pricing with ambiguous "included base seats"; state either a minimum seat commitment or a bundled-seat package.
- Do not set overage prices below marginal cost plus target gross margin.
- Do not hide annual terms, usage caps, downgrade consequences, or procurement friction behind sales-only language.
- Do not propose discounts without approval rules, CRM logging, renewal impact, and rollback criteria.

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
- Grandfathering/migration:
- Customer communications:
- Guardrails:
Risks:
```
