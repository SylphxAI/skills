# Offers, gifts and experiments

Read when choosing a price menu, setting gift authority or investigating sales.
These are operating choices informed by the [sources and their limits](sources.md).

## Compare usable value per unit of money

For the same resource and restrictions, compute:

```text
unit value = usable quantity received / actual money the player must pay
```

Include guaranteed bonuses, minimum qualifying purchases, repeat limits,
expiry, unlock requirements and conversions. Show conditional or randomized
value separately from guaranteed value. Compare the same market, tax basis,
channel and time; a bonus unavailable to that player does not improve their
offer.

By default, comparable higher-priced packs give at least as much usable value
per unit of money. State a justified difference, such as exclusive content or
a distinct promotion, rather than obscuring worse unit value. Test changes
against demand, catalog substitution, player trust and cohort contribution.
The default changes when those outcomes favor another transparent menu.

For mixed packs, compare component quantities and useful outcomes side by
side. Use a scalar valuation only when observed exchanges or purchasing
behavior support its weights; an invented shop list price does not establish
player value. A depleted entry tier, an inaccessible premium offer and a large
pack that finishes all content require different repairs.

Use genuine price history for savings claims, clear eligibility and real end
times. Keep the purchased offer version with its order. On off-store or web
top-up surfaces, keep the permanent standing baseline at 1:1 with the in-app
storefront (`baseBonus = 0%`, with no permanent off-store discount or fixed
weekday standing rebate); deliver promotional bonuses (`<= 12%` total stacked
cap) strictly through truthful, time-bounded rotating named campaign
combinations (`startsAt`/`endsAt`) whose names and percentage compositions
genuinely rotate across calendar windows and lock immutably into the checkout
quote at purchase initiation. The general
[commercial standard](../../challenge/references/commercial.md) owns
payment, entitlement and ledger mechanics.

## Give attention, repair loss and budget optional care

Distinguish someone venting after a bad moment, someone owed a real repair,
and someone still unhappy after attention or repair. These are service needs,
not mandatory stages before a gift. Acknowledge and help promptly; an optional
gift may help at any point. Use [ambassador](../../ambassador/SKILL.md) for the
relationship, without turning every complaint into a formal claim or an offer.

Measure how often attention alone resolves the expressed concern, repeat
complaints and subsequent return. Define resolution from the interaction and
later evidence; silence alone is not proof of satisfaction. Record owed repair
separately from discretionary gifts, so fulfillment does not become a sales
incentive or an experiment's withheld benefit.

The budget holder establishes a standing program before delegating gifts:

| Decision | Derive it from |
| --- | --- |
| Eligible recipients and occasions | The player need, expected reach and observed abuse, without assuming only payers deserve care |
| Allowed assets and quantities | Meaningful use, substitution, transferability, time to cap and competition effects |
| Per-recipient and aggregate exposure | Eligible population × likely uptake × quantity, plus overlapping programs and an explicit uncertainty margin |
| Funded commercial cost | Direct service cost, plausible foregone contribution and the retention value or learning benefit being funded |
| Delivery and review | Economic admission before configuration, then idempotent grants, recipient checks, exact intended and zero unwanted-currency deltas, complete observation window and measured triggers to resize or stop future issuance |

The person speaking to players chooses within that authority. No fresh
approval is needed for each covered gift. A changed exposure or an exhausted
budget is a reason for the budget holder to resize it from current evidence,
not for inventing a universal rebate percentage or prohibiting a reward type.

### 100% System Monetization, Universal Equal Treatment & Public Campaign Codes Only

When operating live games and companion channels, manual database grants, ad-hoc
inbox attachments, single-player soothing codes, and two-track whale whitelists
create price arbitrage, train players to bargain for freebies, and erode paid
store unit economics. Enforce a 100% systematized monetization and public
campaign code architecture across every title:

1. **100% System Monetization & Zero Single-Player Codes or Micro-Gifts:**
   - Ambassadors and support agents provide emotional value, onboarding help,
     and gameplay guidance only.
   - Every promotion, event, and reward across all titles must execute 100%
     through automated product/platform systems; if an event or reward cannot be
     executed through a legitimate automated system channel, do not run the
     event or issue the reward.
   - Never issue individual soothing codes, personal care codes, free
     micro-gifts, manual inbox grants, or ad-hoc database rewards to placate
     individual players, and never offer top-up-linked or player-negotiated
     gifts. Purchases grant strictly the advertised in-game store or automated
     activity-template contents.
2. **Public Campaign Codes Only (Three-Layer Separation of Duties):**
   - Apply one universal standard across all players with zero whale-whitelist
     vs. non-whitelist tracks and zero per-order or milestone ambassador rebate
     quotas.
   - Redemption codes are restricted strictly to server-wide public campaigns
     that benefit all players equally (configured as `limited` total-claim cap,
     `unlimited`, or `time-limited` window, 1 claim per account). Governance
     uses three strict layers:
     1. **Economy / CI Automated Cap & Blacklist Layer:** Machine-readable
        Clean-USD valuation SSOT and CI checks enforce hard per-player value
        ceilings (e.g., `<= US$1.50` Clean-USD for public festival/campaign
        codes) and block premium currencies, high-tier progression bottlenecks,
        and unpriced containers before merge.
     2. **Product / Game Design Configuration Layer:** Only the game/product
        engineering flow configures public campaign code templates within
        CI-enforced caps.
     3. **Ambassador / Support / Marketing Distribution Layer:** Frontline
        channels hold zero code-generation, reward-configuration, or
        single-player grant authority; they only announce and share
        already-published server-wide public campaign codes.
   - Valuation caps and mechanical redemption proof do not replace economic
     admission. Before configuration or announcement, apply
     [Admit a grant by progression, not delivery](economy-model.md#admit-a-grant-by-progression-not-delivery):
     progression-band balances and the current faucet/sink direction must support
     the fixed amount and intended stock trajectory. Production must show the
     exact intended deltas and zero unwanted-currency delta, not merely a
     successful credit or duplicate no-op.
   - Keep in-game pack openings, gacha pulls, slot jackpots, and auction wins on
     automated system broadcasts (`100%` marquee/fanfare for social proof) with
     a user-facing privacy toggle (`stealth = true` masking the actor as
     "A Mysterious Player" and disabling profile inspection while keeping the
     broadcast active).
### Non-Retroactive Commitment Boundary
   - The non-retroactive commitment boundary applies **only to a closed
     historical population of verified pre-cutoff player-visible written
     obligations**. Each verified obligation in that closed set settles **exactly
     once** with its original promised content and requires **post-claim or
     in-game consumer effect evidence** (such as inventory, currency, or
     equipped-item state read back after claim) — inbox message insertion alone
     is not completed settlement. Preserve reliance and purchase history: never
     call a verified pre-cutoff obligation a misunderstanding, substitute zero,
     or redirect the player to a cold email instead of the promised delivery. If
     visibility is genuinely uncertain, read the actual outbound object first;
     never relabel an already-public pre-cutoff promise as an unauthorized
     internal proposal.
   - Actual prior settlement is the dedup key: an already fulfilled commitment
     must not be granted twice. Read authoritative settlement and claim state
     before any repeat, and never use idempotent delivery as a reason to renege
     on a verified pre-cutoff obligation.
   - Once the closed legacy population is settled, **zero new private
     negotiation, zero new private written promises, and zero custom or bespoke
     packs** are permitted. All cumulative top-up progression and VIP tier
     rewards must run through published, automated in-game ladders
     (`cumulative_charge` and permanent VIP tiers) where every player reaching
     the same threshold receives the exact same reward automatically.
   - Ambassadors share **only published server-wide small campaign redemption
     codes** with system-enforced caps; official customer support handles
     **only verified missing-purchase fulfillment, account-recovery, statutory,
     and technical remedies**. New economic admission governs all future
     campaigns, codes, packages, and replies; new large-currency promises remain
     inadmissible under the progression and faucet/sink model.

Synthetic contrast:

| ❌ Bad | ✅ Good |
| --- | --- |
| A player lies in the verified pre-cutoff written-commitment set for 10,000 coins; reject the amount as excessive, offer zero, or treat an unclaimed inbox row as final consumer verification. Later, an ambassador negotiates a new post-cutoff custom VIP pack in private chat. | Settle the closed pre-cutoff obligation for 10,000 coins exactly once, verify post-claim in-game consumer effect, and grant nothing again once settled. Refuse all post-cutoff private promises or custom packs; route cumulative progression through automated `cumulative_charge` / VIP ladders, limit ambassadors to server-wide campaign codes, and restrict support to verified missing-purchase, account-recovery, statutory, and technical remedies. |


## Measure a gift's real cost

A digital asset's low copying cost does not establish a low economic cost.
It can replace a purchase, defer the next one, finish useful progression,
change competition or add service costs. Non-transferable assets can do all
of these. A shop face value is not cash lost.

For a randomized optional-gift experiment, estimate the net sales effect as
foregone receipts over horizon `H`:

```text
N_treated × (mean net receipts_control,H - mean net receipts_treated,H)
```

Use receipts per eligible assigned player, including zero purchasers; measure
the whole catalog and matched follow-up, not only the gifted SKU. Define net
receipts consistently after refunds and payment costs. Report uncertainty and
leave negative estimates visible as possible uplift. Separate immediate
displacement from later retention effects when timing matters.

This comparison includes any retention-driven receipts within `H`; it does
not identify gross purchase substitution separately from that benefit.

For the decision, compare contribution after incremental serving, support and
content cost. Do not add estimated lost sales again if the measured
contribution difference already includes them. Model wider economy effects
separately only where the experiment's population or horizon misses them.
Without a credible control, give scenario bounds and label causal cost unknown.

## Test and review

1. Define the eligible population and the proposed mechanism. Predeclare the
   primary return and contribution outcomes, enjoyment indicators, harm limits,
   allocation, duration and smallest effect worth acting on.
2. Compare optional gifts plus attention with attention alone when useful;
   provide owed repair in both arms. Stratify on pretreatment tenure, payer
   history and progression where they materially affect outcomes.
3. Randomize at a unit that limits spillover. Shared markets, teams and social
   groups can expose a control to another player's gift. Use suitable clusters
   or a credible alternative, and account for the smaller effective sample.
   When different prices for otherwise identical offers would damage trust,
   compare suitable products, menus or markets instead of secretly assigning
   different prices to comparable players.
4. Cover complete purchase, reward, return and content cycles with mature
   cohorts. Include weekday and seasonal differences, delayed purchases and
   novelty. A fixed day count is not a substitute for that cycle.
5. Check assignment balance, exposure and fulfillment. Analyze all assigned
   eligible players for the main comparison; conditioning on gift claimers or
   later payers changes the population. Report uptake as a diagnostic.
6. State sample size, event counts, intervals and sensitivity to concentrated
   spending. Size a test from variance and the decision-relevant effect. With
   sparse payers or few independent groups, label the result inconclusive when
   it cannot separate useful benefit from harm. Repeated purchases by one
   person are not independent people.
7. Use a planned fixed stopping rule or a valid sequential method. Repeatedly
   checking ordinary significance and stopping at the first win invalidates
   that inference; see [experiment sources](sources.md#experiments). Observe
   operational harm continuously without calling an early stop a proven win.

When randomization is infeasible, compare matched pre-change and post-change
windows with an unaffected comparison population where possible. Name
selection, concurrent changes and calendar effects; such a comparison does
not acquire randomization's causal guarantee. Use a bounded reversible pilot
when the uncertainty and funded downside support learning by acting.

## Diagnose falling sales before changing a price

Read complete matched windows, serving versions and the actual funnel:
eligible active players → offer exposure → checkout → settled payment → grant.
Check measurement coverage, payment and fulfillment failures before inferring
changed willingness to pay.

Compare acquisition mix, returning players, payer cohorts, offer availability,
unit value, concurrent promotions, recent gifts, time to cap, useful goals,
calendar effects and the largest orders. Separate fewer players, fewer exposed
players, lower conversion, smaller baskets and substitution into other offers.
A missing count of exposed players leaves conversion unknown. A first evening with
no purchases, or one unusually large previous order, cannot establish a price
failure. Choose the smallest diagnostic change that distinguishes the leading
explanations, then review full-window retention and contribution.
