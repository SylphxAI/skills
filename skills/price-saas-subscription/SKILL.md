---
name: price-saas-subscription
description: "Price a SaaS subscription: packaging, meters, fences, migration."
---

# Price SaaS Subscription

Choose SaaS packaging and pricing that align customer value, expansion, cost,
margin, purchasing motion, and trust.

## Method

1. Open [pricing and packaging patterns](references/pricing-packaging-patterns.md).
2. Define the decision, buyer, user, purchasing motion, customer value, value
   metric, cost driver, expansion path, constraints, and assumptions.
3. Use current competitor, substitute, customer, usage, conversion, churn,
   support, cost, and margin sources appropriate to the decision.
4. Choose the package model: trial, freemium, seat, usage, tiered, hybrid, or
   enterprise.
5. Define plan boundaries, included value, usage units, overages, upgrade
   moments, downgrade/cancellation behavior, support, and procurement path.
6. Reconcile seat minimums and included seats, included usage and overage,
   marginal cost and gross margin, annual terms and discount, and enterprise
   commitments.
7. Define discount authority, sales enablement, objection handling, migration,
   customer notice, and rollback conditions where applicable.
8. Hand the approved catalog, prices, meters, renewal, cancellation, and
   downgrade semantics to payment, entitlement, interface, listing, and support
   owners.

## Output

Return a Pricing and Packaging Decision with value metric, plan architecture,
usage and overages, procurement, upgrade moments, cancellation/downgrade,
commercial arithmetic, assumptions, measures, migration, and owner handoffs.

Payment and ledger execution belongs to `build-payment-readiness`.
