# Commercial standard

Trigger: changing price, entitlement, billing, or a customer contract.

What the customer sees, pays, and gets always agree. Legal texts follow
[conduct](conduct.md). This standard covers how prices, tiers, unit economics,
money, entitlements, and legal text are built.

## Hard lines

- Only the ledger grants value: a client event or analytics signal never grants
  an entitlement, and a payment processor is an adapter.
- A refund or correction adds a ledger entry and leaves the past transaction and
  its price intact, because rewriting history breaks audit and reconciliation.
- Use an appropriate business contact address and publish the entity and
  contact information required for the applicable market.
- Never take money for something the customer cannot get when the contract or
  purchase says they will.
  Accurate status is judged when a customer pays or relies, not when copy is written.
- State material terms plainly at the point of reliance and use enforceable
  terms for the applicable market. Forward-looking promotion identifies the
  delivery scope and commitment accurately before purchase.

## Pricing, mechanism design, and unit economics

Define the cohort, horizon and net contribution before selecting prices or
monetization. For candidate offer `x`, a useful decision model is:

$$\Pi(x)=\sum_i n_i(x)\left[\sum_{t=0}^{T}d_t\,\mathbb{E}(r_{it}(x)-c_{it}(x))\right]-A(x)-F(x)$$

`n_i` is the number of acquired customers in segment `i`; receipts `r` and
variable costs `c` are per acquired customer, including zero-revenue periods,
refunds and fees. `A` is total acquisition spending and `F` incremental fixed
cost. Keep every term in the same currency and population. Model retention,
conversion, cross-price effects and referrals where they can change the choice.
Distinguish observed inputs from assumptions and show the decisive sensitivity.

Read competitor offers on the decision day as evidence of the market. Compare
candidate prices, free entry, tiers and metering against contribution, cash
exposure and the product promise. Low unit cost alone does not select a price;
neither positive acquisition cost nor a competitor's price proves a universal
price floor. Keep a preferred offer as a testable default.

Define whether LTV is revenue or contribution before comparing it with CAC.
Compute cash payback from cumulative cohort cash contribution. A ratio target
such as `3 × CAC` is a stage/funding heuristic, not a survival identity; applying
gross margin again to contribution LTV double-counts costs.

Price in a unit the customer associates with value. Make the entry tier useful,
and size resource limits from measured economics and the published commitment.
An authorized loss-leader or bundle is assessed at the offer/cohort level,
including its funded exposure.

## Always take the money

Keep payment intake and entitlement fulfillment decoupled through a durable
order ledger: record every paid order durably (receipt, order id, account) at
checkout so transient downstream fulfillment failures never lose a customer's
payment, and replay or fulfill the grant automatically as soon as the grant
path recovers. If fulfillment cannot complete within the promised window,
notify or remedy according to the product's published terms and
[conduct](conduct.md#customers-and-players).

## Free-tier commitments

Honor contractual and purchased rights and preserve user data. Assess a change
to a live free tier by measured user impact, retention, economics and migration
cost. An explicit permanent-free promise belongs in that product's offer record;
a pre-launch product changes directly.

## Open data, sticky value

Choose documented self-service export and useful import paths as part of the
product promise. Preserve statutory access and portability rights. UK/EU data
portability covers qualifying personal data provided by the person and processed
by automated means under consent or contract; it does not require every inferred
datum, a competitor import or an API. An API is one implementation option
([ICO portability guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-data-portability/)).
Keep customers through useful interoperability and product quality; make exit
usable.

## Compensation follows a request or proof

Compensation and the distinction from fulfilment live in
[conduct](conduct.md#customers-and-players). Small goodwill gifts are fine.
Ledger mechanics remain here.

## Money and entitlement

The price shown, the amount charged, and what the customer gets agree. The live
price comes from the billing system, not from copied prose.

### Shared and individual purchasing

For shared purchasing, attach the subscription, purchase and entitlements to the
workspace, team or family that bought them. Check the entitlement for the
workspace in which the person acts. A member leaving does not transfer the
workspace's purchase to that person; a personal purchase stays personal.

An individual product can bill its account directly. If it adds workspaces,
migrate existing purchases to the correct personal workspace without a lapse.
Define membership and seat changes according to the published plan.

## Getting paid for usage

Choose bounded collection risk from prepayment, credits, postpaid thresholds or
contracted invoice terms. A stored payment method enables collection but does
not guarantee it. Set exposure and retry/suspension rules from measured economics
and approved risk; preserve user data if paid compute is suspended.

A free or discounted allocation is an auditable credit grant naming its scope,
amount, expiry and authority. Meter actual usage and apply the grant through the
published entitlement path ([architecture.md](architecture.md#hard-lines)).
The owning offer record sets eligibility. Invoice credit terms need a recorded
limit and contract.

## Usage and billing disclosure

Show the details needed to understand and predict the actual offer's charge:
price, billing period, included entitlement, material limits, overage units,
renewal, cancellation and applicable remedies. Verify the current rules and
commencement for the market and type of sale.

Plan shares, reset times, credits and fair-use summaries can make usage clear.
Provide detailed metering and exports when customers need them to allocate or
predict costs. Keep the summary consistent with the billing authority.

Distinguish a customer-selected spend cap from a collection-risk limit. Choose
defaults and alerts for the product's actual exposure and user-harm model, and
explain a reached limit and its recovery path.

## What we say outside

Give the recipient the information needed for its product, contract or incident.
Keep unrelated private sourcing and economics out. Use the audience, purpose and
channel method in [clear-writing](../../clear-writing/SKILL.md).

## Legal surface

Provide the applicable entity, privacy and contract information at the points
where people need it, including before an account, regulated data processing or
purchase. Use the actual market's cancellation, pricing, tax and data-protection
requirements. Drafting stance and claim handling follow
[conduct](conduct.md#methods-table).

- State delivery and remedy commitments accurately. Separate statutory remedies
  from discretionary goodwill and voluntary commercial guarantees.
- Distinguish digital content from ongoing services. For UK immediate digital
  content, regulation 37 requires prior express consent, acknowledgment of the
  cancellation consequence and the required confirmation; it does not erase
  remedies for defective content or every service cancellation right
  ([regulation 37](https://www.legislation.gov.uk/uksi/2013/3134/regulation/37)).
- Use the protections, liability allocation and change rights that the applicable
  law enforces while preserving mandatory consumer and data-subject rights.
- Use confident sales copy and working demos. A pre-sale or roadmap offer states
  material scope and timing in context, especially before self-serve purchase.
  Deliver what the contract promises when it promises it.

## How it is judged

A live purchase shows the same price on the page, in the charge, and in the
granted entitlement, and each legal page names the entity and fits the market it
serves.

## Decision record

Record the offer, source date, population, assumptions, contribution and cash
exposure, decisive alternative, and observed result. The formulas above are
chosen decision models; validate them against the actual cohort before using
them to rank materially different offers. Durable orders, idempotent grants and
append-only adjustments are the ledger method used here.
