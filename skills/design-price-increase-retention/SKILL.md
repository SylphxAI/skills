---
name: design-price-increase-retention
description: 'Design a subscription price increase so contract, notice, consent, billing channel, and no-action default stay truthful. Use when the job is a live price change, not first-time packaging.'
---

# Design Price Increase Retention

Protect long-term net revenue and trust while an approved price change moves through real contracts and billing channels.

## Method

1. Name the cohort: plan, tenure, discount, region, channel, renewal window, and who has authority to change the price.
2. Grandfathering, sunset, and forced migration are different decisions. Each needs notice, consent or contract basis, and a no-action default.
3. Direct billing, app stores, and invoices have different notice and consent machines. Do not assume one channel’s default applies to another.
4. Measure retention with an assigned cohort and a declared no-change comparison. Complaints and refunds are guardrails, not the decision metric alone.
5. Open [price increase patterns](references/subscription-price-increase-retention-patterns.md) for the cohort × channel × consent matrix.

First-time packaging stays with `price-saas-subscription`. Ledger movement stays with `build-payment-readiness`.

## Output

Price-change contract: cohorts, notice/consent, no-action default, billing-channel behavior, and retention readout.
