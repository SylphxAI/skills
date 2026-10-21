# Commercial standard

Trigger: changing price, entitlement, billing, or a customer contract.

What the customer sees, pays, and gets always agree. Legal texts follow
[conduct](conduct.md). Pricing is a company decision
(the decisions record, "Price follows the market");
this standard covers how money, entitlements, and legal text are built.

## Hard lines

- Only the ledger grants value: a client event or analytics signal never grants
  an entitlement, and a payment processor is an adapter.
- A refund or correction adds a ledger entry and leaves the past transaction and
  its price intact, because rewriting history breaks audit and reconciliation.
- No personal or home address in legal text; a registered office appears only
  where the company's law requires it (decision).
- Never take money for something the customer cannot get when the contract or
  purchase says they will (the accepted risks record).
  Accurate status is judged when a customer pays or relies, not when copy is written.
- A term we rely on is stated plainly where the customer sees it, and no clause
  is unlawful, because one can void the clauses around it.
- Prices and marketing show the product as it will be at launch; features are
  built to match, and copy is never trimmed to today's state.

## Always take the money

Keep payment intake and entitlement fulfillment decoupled through a durable
order ledger: record every paid order durably (receipt, order id, account) at
checkout so transient downstream fulfillment failures never lose a customer's
payment, and replay or fulfill the grant automatically as soon as the grant
path recovers. If fulfillment cannot complete within the promised window,
notify or remedy according to the product's published terms and
[conduct](conduct.md#customers-and-players).

## Free stays free

Once real users rely on a free capability it stays free: paid tiers sell new
value (team, private, hosted, higher limits, support), never a feature taken
back, because a paywall on what users already rely on costs more trust than it
earns. Lower free limits only for new accounts, and never below what keeps the
free product useful. A product with no real users changes directly.

## Open data, sticky value

Customers can take their data with them: every product exports everything a
customer put in, or that is about them, in a documented open format, with
self-service export and an API, and imports from the main competitors too.
UK and EU law requires this for personal data, and an easy exit lowers the
fear that stops people from signing up. We keep customers through value, not
by holding their data: one account across products, one bill, agents and
integrations that work best together, and the quality of the product. Never
make leaving deliberately hard.

## Compensation follows a request or proof

Compensation and the distinction from fulfilment live in
[conduct](conduct.md#customers-and-players). Small goodwill gifts are fine.
Ledger mechanics remain here.

## Money and entitlement

The price shown, the amount charged, and what the customer gets agree. The live
price comes from the billing system, not from copied prose.

### Plans belong to workspaces

A subscription, a purchase and the entitlements they grant belong to a
workspace (a team, family or organisation, or a person's personal workspace),
never to a user, as Vercel, Linear and Slack bill; it is the only shape in which
a team pays once for its members.

- A personal workspace carries individual plans (Free, Pro); a team or family
  workspace carries team plans, managed by its owners and not any one member's.
  One person can be Pro in their personal workspace and a member of a team
  workspace on another plan; the two never mix.
- A product's server checks the entitlement of the workspace the person is
  acting in, never a sum of their plans across workspaces.
- A person who leaves a workspace loses its entitlements at once and keeps
  their personal plan; what the workspace bought stays with it, including what
  the leaver paid for while in it, and a per-seat plan frees the seat.
- A product without workspaces (games, single-person tools) bills the account
  itself; when it turns workspaces on, each account's purchases move to that
  person's personal workspace without a lapse.

## Getting paid for usage

We are small, so we take bounded collection risk, not zero risk. Every product
and the platform use the same mechanism, driven by data, with no per-customer
exception in code:

- **Subscriptions and one-off purchases are paid upfront.**
- **Metered usage is postpaid, but never unsecured:**
  - paid usage needs a payment method on file; without one an account gets only
    the free tier, hard-capped;
  - unbilled usage is charged when it reaches the account's threshold, not only
    at month end;
  - each account has a spend limit that starts low and rises with its payment
    history, like the usage tiers of the major AI and cloud platforms;
  - a failed payment retries, then suspends paid resources (data is kept) until
    it is paid.
- **Free or discounted service is a ledger record, never a code path:** a credit
  grant naming the account, the amount or monthly cap, the expiry and the
  approver. Usage is still metered and invoiced at full price, and the credit
  offsets the invoice. To start charging, the credit is simply not renewed.
  Our projects and companies qualify only for the same published offers as
  outside customers, never free or discounted internal use
  ([ONE PATH](architecture.md#hard-lines)).
- **Invoice terms** (pay later than usage) need a contract record with a credit
  limit.

## Usage and billing disclosure

What we show about usage and billing follows each market's law and the
industry practice of category leaders, and nothing stricter, under
[conduct](conduct.md).

- **Consumer and prosumer products** (games, developer tools, coding agents, web apps) show usage
  abstractly: a share of the plan, a reset time, credits or fair use, as
  ChatGPT, Claude, Gemini and Cursor do. Per-request metering is not shown, and
  exact limits may flex with capacity. A fair-use limit is described plainly,
  and reaching it shows the limit and when it resets, not an unexplained
  failure.
- **Platform and API products** (AI gateways and cloud platform services) give a detailed
  usage and cost dashboard and an export, because developers and enterprises
  allocate cost by project, as with
  [AWS Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer/)
  and the [OpenAI usage API](https://platform.openai.com/docs/api-reference/usage).
  Pay-as-you-go may bill by usage without a per-request breakdown on the
  invoice.
- **Spend caps and alerts** are a setting the customer may turn on; none is
  imposed by default. This is separate from the account spend limit above, which
  bounds our collection risk.
- **The floor is each market's law:** the price and billing period, what the
  plan includes, any overage unit price, when and how renewals charge, how to
  cancel, and refunds where the law gives them, with no drip pricing or hidden
  fees (EU consumer price rules, the UK DMCC Act's subscription and drip-pricing
  rules, the US FTC rules on negative options and junk fees, as each applies in
  its market).

## What we say outside

An outside party (partner, customer or community) hears only its own product's
progress, public prices and limits, never platform internals, infrastructure
state, sourcing, subscription pools or coupon economics.

## Legal surface

A product that takes an account, personal data, or money ships Privacy and Terms
naming the legal entity before launch, linked from every page; contact goes
through support channels. Where we sell to consumers, include that market's
required cancellation, refund, tax-inclusive price, and data-protection text (UK:
the 14-day cancellation right, VAT, UK GDPR with the ICO).

Drafting stance, market-specific obligations and responses to claims follow
[conduct](conduct.md#methods-table). The contract implementation below applies
that stance.

- **Promise the legal minimum:** its deadlines, notice thresholds, and refund
  rules. A voluntary promise stays only when it sells ("we never train models on
  your content"). There is no voluntary money-back guarantee: digital content
  supplied at once takes the customer's express consent at checkout,
  acknowledging the loss of the cancellation right, and a refund is decided case
  by case when the customer insists (decision).
- **Take the widest protection the law enforces:** disclaimers, exclusions, the
  liability cap, and discretion to change features, prices, limits, and terms,
  and to suspend or end service. Keep what the law makes mandatory (consumer and
  data-subject rights, death, injury, and fraud carve-outs) and stop at the
  enforceable limit.
- **Marketing, demos, and pitches sell the product as it will be when
  delivered,** in a confident sales voice: no "coming soon" labels or dates, no
  volunteered weaknesses, demos show the working parts. Pre-selling, roadmap
  selling, fake-door tests, and puffery (vague superlatives are not factual
  claims) are standard practice. Contracts and order forms state the delivery
  scope and dates we will meet; a self-serve purchase delivers what was bought at
  the moment of payment.

## How it is judged

A live purchase shows the same price on the page, in the charge, and in the
granted entitlement, and each legal page names the entity and fits the market it
serves.
