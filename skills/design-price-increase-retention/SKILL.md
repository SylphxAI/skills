---
name: design-price-increase-retention
description: "Design a live subscription price increase so contract, notice, consent, billing channel, and no-action default stay truthful. Use when raising prices on existing contracts. Do not use for first-time packaging or for implementing checkout."
---

# Design Price Increase Retention

Direct billing, app stores, and invoices have different notice and consent machines. The no-action default must be explicit. Silence is not consent unless the current contract and channel already say it is, and then the customer-facing copy has to say the same thing.

Open [price increase patterns](references/subscription-price-increase-retention-patterns.md) when the channel machine needs depth.

Use `price-saas-subscription` for first-time packaging. Use `build-payment-readiness` to implement checkout.
