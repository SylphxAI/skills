# Growth standard

Trigger: designing a return loop, acquisition, a campaign, or support.

Growth follows delivered value: people return, pay, and recommend because the
product gave them a useful result. Promises live in [product.md](product.md),
money in [commercial.md](commercial.md), patterns in [mechanics.md](mechanics.md)
and its [catalogue](mechanics-catalogue.md).

## Hard lines

- Use truthful urgency and clear prices, cancellation, export and deletion.
  Protect review integrity; apply the actual market and store requirements.
  Assess genuine limited offers and retention incentives by their contribution
  and effect on the product promise.
- Promotion posts are factual, identify the brand, and disclose promotion where
  the platform requires it; never fabricate first-person experiences.
- Generate changing commercial values from their authority. Give historical
  statistics their source, date and population; refresh when the claim requires
  current data. Label forecasts and name benchmark samples. Roadmap selling
  follows [commercial.md](commercial.md#legal-surface).
- Describe the responder's identity truthfully and provide the product's actual
  support and exit paths.

## Practices

- Retention counts people who come back for a useful result; opens, logins, and
  installs are diagnostics. Count gains net of refunds and support cost.
- Run decision-relevant experiments inside an authorized budget once the
  advertised acquisition-to-value or purchase journey works. A stopped campaign
  stops spending; current allocations live in the owning commercial record.
- Support uses the product's own records for entitlement and billing; how
  support runs is under [Support](#support).
- When designing acquisition, retention, or monetisation loops, review the relevant sections of the [mechanics catalogue](mechanics-catalogue.md), state target metrics, and record the chosen mechanics and material alternatives considered.
- Choose instrumentation and experiment support for decisions the product will
  actually make. Reuse shared capabilities when present.

## Campaigns and gifts

Treat gifts and seasonal campaigns as candidates. Compare incremental
contribution, retention and support cost. Reuse the owning shared campaign
capability; its service design and current rollout belong in its repository.

- **Decision-relevant control.** Size a holdout and observation window from the
  decision, variance, interference and cost of withholding treatment. Report
  estimates and uncertainty; use a control when it can change the decision.
- **Authorized exposure.** Enforce approved real-money budgets. Set or resize
  resource, economic and messaging limits from measured exposure and channel
  requirements, recording the rationale. A virtual reward's effect depends on
  its issuance, sinks and use; choose its limit from that economy.
- **Truthful reference prices.** Derive a reference price from actual price
  history under the selected market's current rules and product scope. For UK
  savings claims, use a genuine established usual selling price
  ([ASA guidance](https://www.asa.org.uk/advice-online/promotional-savings-claims.html)).
  Bonus claims reflect granted amounts and a countdown reflects a real end time.
- **Applicable consent.** Classify purpose, channel, recipient and market; apply
  the relevant consent or objection rule and exceptions. Classify in-product
  inbox messages by their actual purpose and the applicable channel rules.
- **One intended grant.** Key an award by stable account and campaign, award or
  source event. Persist its request/result so a retry returns the same grant
  ([commercial.md](commercial.md)). Ending a campaign preserves granted value.

## Revenue inputs for cost of delay

Use active-player monetisation, not install counts, to estimate revenue at risk
for an existing game. The references are Unity Analytics' [IAP ARPDAU](https://docs.unity.com/en-us/analytics/dashboards/dashboards)
(revenue divided by daily active players) and Apple's [product type identifiers](https://developer.apple.com/help/app-store-connect/reference/reporting/product-type-identifiers).
Our cost-of-delay input uses **net** proceeds after store fees, not Unity's gross
IAP revenue; the work system still computes CD3 ([priority.md](../../author-item/references/priority.md)).

- **Classify before counting.** Apple's `3F` is a re-download, `7F` an update,
  `1F` a free or paid app download, and `IA1` an in-app purchase. Read product
  type, SKU, customer price and proceeds together; app units and a roll-up's
  generic `orders` column are not paid orders, payers or active players. Other
  stores need the same explicit separation. Keep the source ledger unchanged.
- **Use player-days.** Deduplicate successful game sessions by stable player ID
  within each complete calendar day, with a named timezone. Sum those daily
  counts across the baseline window; a window's distinct players (MAU/WAU),
  authentication attempts, reconnects and downloads are not player-days. State
  whether successful logins are a proxy for play, and check logging coverage.
- **Match the population.** Use the same title, store/platform, revenue scope
  and timezone for paid units, net proceeds and activity. For a healthy
  pre-outage window, let `P` be paid purchase units (refunds reconciled), `N`
  net USD proceeds and `A` player-days. Then `q = P / A` is paid units per
  player-day and `v = N / P` is net USD per paid unit. With expected affected
  daily active players `D`, estimated recoverable net USD/day is
  `D * q * v = D * N / A`. With no paid units, do not divide by zero or invent
  conversion; state what cannot be estimated. An average DAU-month needs its
  explicit day count before conversion to USD/day.
- **Size the affected revenue only.** Exclude partial outage months from a
  healthy baseline, or use their measured healthy days and matching revenue.
  Use current complete-day activity for a monetisation-path fix; a login
  restoration instead sizes players prevented from playing from a matched
  healthy baseline. Do not use post-outage zero activity to value restoring
  login at zero. Apply the affected share and the expected recoverable fraction
  once, and do not add lost revenue again as value per person.
- **Unmatched or sparse evidence stays an estimate.** If activity combines iOS
  and Android while revenue is iOS-only, a calculation using all activity is a
  ratio of iOS proceeds to all-platform player-days, not measured iOS revenue
  per iOS player-day. Modelling all players on iOS needs an explicit conversion
  assumption. An approximate historic
  DAU is an assumption, not a measured multi-month denominator. Record the
  window, missing split, central scenario and sensitivity; never replace
  missing activity with downloads. At low purchase volume, zero paid units in
  a short after-window alone does not prove the purchase path is broken.

Before publishing revenue-based priority inputs, record the source/window,
transaction classification, activity definition and coverage, matched population
or explicit scenario, formula and units, affected/recoverable share, and what is
measured versus estimated. Correct the authoritative input and verify its
recomputed value; a narrative note alone leaves the old input active.
Acquisition forecasts use incremental activated players and a sourced conversion
and retention model, rather than total installs times revenue per download.

## Support

Use [customer-support](../../customer-support/SKILL.md) for live case handling
and [conduct](conduct.md#customers-and-players) for company stance and remedies.

Give the support agent current scoped account records, prior case context,
authoritative product knowledge and tools appropriate to its remedies. Link a
contact to an account with verified evidence; preserve uncertain identities and
duplicate provenance. Choose assignment and backpressure from measured workload
and response obligations, keeping authorized case context available.

Extract reusable, non-personal lessons from resolved cases. Publish material
knowledge corrections through the owning workflow; keep case-specific data out
of general guidance. A frequent question is evidence for a help article, not an
automatic policy change.

## How it is judged

By the target metrics: net retention, conversion, and support load after refunds.
