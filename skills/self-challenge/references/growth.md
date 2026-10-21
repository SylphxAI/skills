# Growth standard

Trigger: designing a return loop, acquisition, a campaign, or support.

Growth follows delivered value: people return, pay, and recommend because the
product gave them a useful result. Promises live in [product.md](product.md),
money in [commercial.md](commercial.md), patterns in [mechanics.md](mechanics.md)
and its [catalogue](mechanics-catalogue.md).

## Hard lines

- No false urgency, hidden costs, hard-to-find cancellation, review gating, or
  paid ratings; law and stores ban them. Cancellation, export, and deletion stay
  easy. Real limited-time offers, energy timers, and paid streak protection are
  normal tools (business judgement).
- Promotion posts are factual, identify the brand, and disclose promotion where
  the platform requires it; never fabricate first-person experiences.
- Every public statistic (users, ratings, prices, benchmarks) is rendered from
  its source (price list, benchmark file, analytics query) or removed, because a
  stale number is a false claim. A benchmark names its sample; a forecast is
  labelled as one. Vision and roadmap selling follows
  [commercial.md](commercial.md#legal-surface).
- An AI support agent never claims to be a person, and a customer can always
  reach support or leave.

## Practices

- Retention counts people who come back for a useful result; opens, logins, and
  installs are diagnostics. Count gains net of refunds and support cost.
- Run a holdout when the result would change a real decision; a stopped campaign
  stops spending. Paid promotion starts once the product is done and is funded
  from the daily budget in the strategy record.
- Support uses the product's own records for entitlement and billing; how
  support runs is under [Support](#support).
- Read the [mechanics catalogue](mechanics-catalogue.md) once
  per design, state target metrics, and record which entries you used, skipped,
  and invented.
- Products are run by agents: every title ships event tracking, a metrics
  pipeline and remote A/B config, and an agent loop (data, analysis, change,
  measure) tunes prices and offers within store policy, odds disclosure and
  fairness.

## Campaigns and gifts

Small gifts and freebies are a deliberate engagement strategy in every
product, not only games. The reference is Braze's
lifecycle campaigns with a global control group and frequency caps, and the
scheduled live-ops overrides games run; the platform's design is the
platform campaigns specification.

- **One mechanism.** Every seasonal event, offer, sale and gift runs as a
  platform campaign (the platform notification service): an occasion from the platform's
  calendar per market or the product's own dates, a Config segment as the
  audience, a Money promotion or entitlement grant as the value, a creative
  per channel, a holdout and a budget. A product builds no campaign,
  coupon or event-scheduling code of its own; a product-local copy moves
  onto the platform once it serves the effect, and runs under these rules
  until then.
- **Seasonal by default.** Each product's agent reads the upcoming
  occasions for its markets on a schedule, drafts and launches campaigns,
  and reuses what won for the same occasion and market the year before.
  The guards below are server-side and are the only gate: no approval step
  is added.
- **Holdout when a result will change a decision.** A campaign whose result
  will change a decision carries a holdout (5-50%, default 10%) that sees none
  of it, and a 5% global control group never receives campaigns. A one-off gift
  or a fix needs no holdout. The result
  records incremental revenue and retention against the holdout, net of
  refunds and the campaign's cost; a result below the minimum sample counts
  as no evidence.
- **Cost and frequency caps on the server.** A real-money effect cannot
  launch without a budget held in the ledger with no overdraft, and a
  virtual gift needs a unit cap, so a giveaway cannot outrun its cap or
  inflate an economy. Our own products' real-money campaign budgets come
  from their share of the promotion budget;
  an agent spends inside it and never raises it. Messages, live offers and
  gifts per person are capped per environment at the tier default; an agent
  may tighten a cap, never loosen it. Transactional messages are never
  capped.
- **Truthful reference prices only.** A "was" price is never typed: the
  only reference price is computed from prices actually charged in that
  market, the lowest of the previous 30 days in the EU, EEA and UK, the
  regular price charged before the offer elsewhere, and none without price
  history. Bonus claims render from the granted amounts and countdowns from
  the real end time; an ended offer never returns as a "last chance"
  (the accepted risks record).
- **Each market's consent.** A marketing message goes only to a person who
  has the consent that market requires (opt-in for push and email in the EU,
  UK and Hong Kong; opt-out elsewhere where the law allows it), with its
  quiet hours. Gifts and inbox items seen inside the product are not
  marketing messages. An effect unlawful in a market leaves that market out
  and never blocks the others.
- **Gifts give once.** Every gift and discount is a ledger record or grant
  with a deterministic id per person ([commercial.md](commercial.md)), so a
  retried claim or replayed webhook gives once, and given value stays given
  when a campaign ends.

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
  and Android while revenue is iOS-only, a calculation using all activity is an
  all-players-on-iOS scenario, not measured iOS revenue. An approximate historic
  DAU is an assumption, not a measured multi-month denominator. Record the
  window, missing split, central scenario and sensitivity; never replace
  missing activity with downloads. At low purchase volume, zero paid units in
  a short after-window alone does not prove the purchase path is broken.

**Input guard:** before publishing any revenue-based `WSJF-INPUTS` or `work
impact`, Growth records the source rows and window, transaction classification,
activity definition and coverage, matched population (or explicit scenario),
formula, units, affected/recoverable share, and measured-versus-estimated status.
An input missing these is not published as measured revenue. When the method
changes an existing estimate, append a replacement sourced input on the original
item and read `work score` once to confirm the computed input changed; correcting
only a narrative run note leaves the old score active. Acquisition forecasts
use incremental activated players and a sourced conversion/retention model (or
the store's controlled experiment), not total installs times historical revenue
per download.

## Support

Support is agent-native, not a reply pipeline; the reference to beat is
Intercom Fin and Decagon, built on our own platform (Identity, Notify, Search).

- **One profile per contact.** Every contact on any channel resolves to one
  account; email, phone and game uid are identities on that profile, keyed by
  the stable account id. An unknown contact starts as a lead and is linked
  once evidence appears; an automatic merge needs a verified sign-in (Zendesk
  multi-identity users, Intercom users and leads).
- **One agent decides.** One support agent per company receives every case
  with its context (profile, account and game data, past cases, product
  knowledge) and its tools (look up an account, file a problem, grant per
  written policy, schedule a reply), and decides whether, what and when to
  reply: a high-value customer at once, others after a natural delay, a
  repeated flood slowed or left unanswered. Before the agent, the system
  rate-limits each sender, folds duplicates and floods, and filters spam and
  abuse, so repetition cannot spend agent time.
- **Answers come from the source of truth.** Product behaviour is answered
  only from the product's own configuration, code and per-title docs, read
  through a read-only knowledge tool, never guessed (Intercom Fin answers
  only from verified sources). What cannot be verified is escalated as a
  problem ([quality-signals.md](../../author-item/references/quality-signals.md)).
- **Company stance and case remedies** follow
  [conduct](conduct.md#customers-and-players); this section owns the support
  mechanism, not a separate conduct policy.
- **Support learns.** Every resolved case feeds the product's knowledge, and a
  frequent question becomes a help-centre article automatically (Fin content
  gap detection).
- **One case alone.** An agent answering a player uses
  [support-agent](../../support-agent/SKILL.md): the fixed lines,
  the lock, the reset and no-time rules, and the replay table.

## How it is judged

By the target metrics: net retention, conversion, and support load after refunds.
