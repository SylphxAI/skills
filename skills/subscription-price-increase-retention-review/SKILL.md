---
name: subscription-price-increase-retention-review
description: Plan, audit, diagnose, or recover the retention-safe rollout of an already proposed subscription price change across cohorts, contracts, discounts, billing channels, regions, renewal windows, notices, consent, grandfathering, offers, cancellation, refunds, support, experiments, and net revenue. Use when the price-change program owns sequencing, renewal-maturity cohort readback, or recovery. Do not use to choose the underlying price/package architecture, analyze retention unrelated to a price change, operate refunds alone, or create a general notification strategy.
---

# Subscription Price Increase Retention Review

Protect long-term net revenue and customer trust while an approved or proposed
price change moves through real contracts and billing channels.

## Workflow

1. Define the decision: preflight, staged rollout, grandfathering sunset, annual
   migration, regional/channel migration, or noisy-live-rollout recovery.
2. Identify affected product/catalog versions, plans, entitlements, price deltas,
   tenure, value realization, usage, discounts, contracts, region, billing
   channel, renewal window, churn/support history, and price authority.
3. Read `references/subscription-price-increase-retention-patterns.md`.
4. Run the current-authority-at-use protocol. Verify current billing catalog,
   contract/discount state, direct-billing rules, store-console configuration,
   official platform guidance, notice/consent behavior, server signals,
   cancellation/refund routes, and region-specific requirements. Unknown channel
   states block that channel; model memory never fills them.
5. Build cohort, contract/discount, and channel-state matrices before selecting
   notices, grandfathering, migration, or save offers.
6. Model net retained value by eligible cohort: incremental price receipts minus
   incremental churn/contraction, refunds, credits/offers, failed payments,
   payment/servicing effects, support cost, and downstream LTV/NRR impact.
7. Define transparent value narrative, notice timeline, accessible cancellation,
   support/refund scripts, exception authority, and offer register. Never make
   cancellation harder or support less truthful to protect conversion.
8. Pre-register launch sequence, holdout or credible comparison, intention-to-
   treat readout, renewal maturity window, guardrails, pause/rollback decisions,
   owners, and evidence needed to resume.
9. If the rollout is live, read back region × channel × plan × contract/discount
   × renewal window × consent/no-action/payment state before expanding it.
10. Produce the authority ledger, matrices, communication/support package,
    offer governance, experiment, net-revenue readout, and recovery decisions.

## When not to use

- For price metric, package, entitlement, packaging, or willingness-to-pay
  design, use `saas-subscription-pricing`. This artifact consumes that decision.
- For a retention-cohort diagnosis unrelated to a price increase, use
  `retention-cohort-review`.
- For refund ledger and support operations beyond this change, use
  `refund-and-support-flow-review`.
- For general notification permission, channel, cadence, and quiet-hour policy,
  use `notification-strategy-review`; mandatory price notices remain in scope.
- For contract or legal interpretation, identify evidence and defer the
  conclusion to the authorized account/legal owner.

## Source verification

- Resolve current catalog and entitlement versions, signed contract and
  discount state, channel/region configuration, official provider guidance,
  notice and consent behavior, server signals, renewal/no-action semantics,
  cancellation/refund routes, and approval authority for each cohort at use.
- Prefer signed customer terms, canonical billing and entitlement ledgers,
  provider consoles/APIs, primary provider documentation, and exact observed
  renewal evidence. Prior rollouts and model memory do not prove current channel
  behavior.
- Unknown or conflicting authority blocks that exact cohort or channel. Never
  generalize consent, renewal, refund, legal, tax, or store behavior across
  regions, plans, contracts, or billing adapters.

## Guardrails

- Never optimize headline uplift while ignoring incremental churn, contraction,
  refunds, credits, support, failed payments, trust, and long-term value.
- Never state current App Store, Google Play, direct-billing, country, tax, or
  consent behavior without current primary/console/API evidence for that cohort.
- Never auto-change a negotiated, enterprise, protected, discounted, or
  grandfathered cohort whose authority or effective-date path is unresolved.
- Never hide a price increase, obstruct cancellation, preselect consent, or use
  misleading scarcity, shame, or repeated save-offer pressure.
- Never compare offer accepters with non-accepters as causal proof; preserve the
  eligible/assigned cohort and intention-to-treat readout.
- Never invent thresholds. Record named unset guardrails, owner, and evidence
  source, then block scale until approved values exist.
- Never resume a paused channel from aggregate recovery while its affected
  cohort or no-action state remains unresolved.

## Output

```text
Decision and current-authority ledger:
| Channel/region/cohort | Catalog/contract | Notice/consent source | No-action/renewal signal | Refund/cancel source | Status |
| --- | --- | --- | --- | --- | --- |

Cohort and contract matrix:
| Cohort | Value/tenure | Discount/contract | Channel/region | Renewal window | Treatment | Owner |
| --- | --- | --- | --- | --- | --- | --- |

Channel state model:
| Channel | Notice delivered | Consent states | No response | Renewal/payment | Cancel/refund | Evidence |
| --- | --- | --- | --- | --- | --- | --- |

Communication, support, and offer register:
- audience / exact change / effective date / value evidence / allowed action / expiry

Experiment and rollout:
- eligibility / assignment / launch tranche / maturity window / guardrails / stop-resume rule

Net retained value readout:
- receipts / churn-contraction / refunds-credits / failed payment / support / LTV-NRR / decision
```
