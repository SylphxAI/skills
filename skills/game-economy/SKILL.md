---
name: game-economy
description: "Use when checking reward-route support, choosing a game's pack contents or price, designing bottleneck-first VIP bespoke tiers from inventory and recipe cliffs, verifying item template table container type payloads, auditing transitive reward graphs and recursive containers before reusing or repricing items, governing server-wide public campaign redemption codes (limited, unlimited, time-limited) with universal equal treatment and zero single-player codes, comparing value per unit of money, raising a cap or adding a growth line, setting a gift or gift budget, preventing positional leaderboard spillover, checking virtual-currency inflation, drafting or reviewing VIP thanks, rank/tier wording or care-mail titles/bodies, or diagnosing why game sales fell. Use ambassador for relationship conversations, customer-support for an individual entitlement or refund case, challenge for general product or commercial strategy, deliver-and-verify to implement a change, and clear-writing for unrelated copy."
---

# Game economy

Keep players enjoying the game and choosing to return. Within that goal, earn
sustainable revenue from things they value. Fairness serves enjoyment, trust
and participation; mathematical equality alone does not establish a good
outcome. Honor advertised rules and purchased promises while improving the
experience for everyone affected.

This is a chosen decision method, not a claim that more rewards, higher limits
or longer progression always improve a game. Change a default when measured
player outcomes, contribution or a broken assumption favor another action.

## Step 0: Read for the decision

- **Currency balance, a cap, a growth line or pack contents:** read the
  [economy model](references/economy-model.md).
- **A price, gift budget, complaint-related gift or falling sales:** read
  [offers, gifts and experiments](references/offers-gifts-and-experiments.md).
- **An outside explanation or methodological claim:** read the
  [sources and limitations](references/sources.md). They distinguish source
  findings from the operating choices made here.
- **Talking with a player:** use [ambassador](../ambassador/SKILL.md) for the
  relationship and [customer-support](../customer-support/SKILL.md) for an
  owed remedy. The economy decision does not prescribe a sales script.

## 1. Establish what is happening

Name the decision, affected population, currency, live configuration, complete
measurement window and next meaningful content release. Separate observations,
assumptions and proposed changes. Read the serving offer and actual settlement
path before blaming a price or economy.

A reward type accepted by a generic helper can be silently skipped by mail,
shop or item-use dispatch; check each entry against the selected serving channel
and version, including whether receipt or claim status can advance after partial
credit. Resolve item definitions through the runtime-selected baseline and override
precedence—an empty override table does not prove absence—and include every bundled
effect, automatic or manual use, and quantity limit before substituting a container.
**Wrong:** treat a stored or claimed mixed-reward message as complete; **Right:**
reconcile each promised leaf reward with its durable consumer effect, preserve
credited entries and repair only the verified missing entitlement through a
supported route.

For each currency and progression system, collect:

| Input | Required distinction |
| --- | --- |
| Sources and sinks | Purchases, play rewards, gifts, passive production and conversions; permanent destruction versus transfers between players or reserves |
| Hoards and use | Balance and spending distributions by tenure, activity and payer cohort; dormant balances separately from spendable active balances |
| Limits | Number and share of eligible active payers at each cap, their share of receipts, time to cap and whether another worthwhile goal remains |
| Purchasing power | What a unit buys in play and what one unit of real money buys, including bonuses, restrictions and all relevant offers |
| Player outcomes | Enjoyment or frustration signals, meaningful play completion, return rates and voluntary purchasing over matched full windows |
| Commercial outcomes | Offer exposure, settled purchases, fulfillment, refunds and cohort contribution across the whole catalog |

Missing exposure is unknown conversion. A rising aggregate balance is not, by
itself, proof of inflation or a reason to remove value. Use the reconciliation
and diagnostic checks in the economy model.

## 2. Choose the change from the constraint

- **Players run out of worthwhile goals:** extend meaningful progression,
  collections, mastery or social content. Compare time to exhaust reachable
  goals with the next verified content release. Preserve completed goals and
  purchased promises; test whether the extension creates enjoyable choices
  rather than compulsory repetition.
- **Resources accumulate without attractive uses:** add wanted uses and
  content, or tune future issuance where evidence favors it. Recheck the core
  experience and accessibility before adding a compulsory sink.
- **An offer has poor value or a broken purchase path:** repair that mechanism.
  Lowering price cannot repair missing exposure, failed payment or fulfillment.
- **A player is unhappy:** attention, a real repair and an optional gift serve
  different needs. A gift can be appropriate at any point within the standing
  budget; neither a complaint nor a purchase automatically requires one.
- **Positional Leaderboard Currency vs. Non-Positional Progression Grants (`Zero Leaderboard Spillover`):**
  In any economy with a public wealth or power leaderboard, top spenders (`T0`)
  purchase relative rank and visible status gaps (a positional good). Never
  issue large grants of positional leaderboard currency to mid-tier payers
  (`T1/T2`) in retention or goodwill flows, which compresses the rank gap and
  dilutes top spenders' rank; instead, use non-positional progression items
  (upgrade materials, skill cards, bound gems, cosmetics) that deliver high
  perceived value to the recipient with zero spillover onto the positional
  leaderboard. When a game has no public balance or wealth leaderboard, or when
  restoring a verified paid order, evaluate the grant by progression coverage
  and purchase displacement instead.

Content generation can make expansion cheaper, but relevance, quality,
delivery and service still cost resources. Size the road to player demand and
delivery capacity. A fixed prohibition on a growth line or a reward amount
cannot replace that calculation.

| ❌ Bad | ✅ Good |
| --- | --- |
| Reject a reward because it is a large multiple of the base pack. | Include every concurrent reward and use path, simulate time to cap, and choose an amount and content extension from measured player and sales effects. |
| Issue a large goodwill grant of positional leaderboard currency to a mid-tier (`T1/T2`) payer in a retention flow. | Use non-positional progression items (upgrade materials, skill cards, bound gems, cosmetics) that deliver high perceived value to the recipient with zero spillover onto top spenders' (`T0`) positional leaderboard rank. |
| Reduce an earned balance to make a leaderboard equal again. | Absorb the service mistake, preserve holdings, repair future issuance and assess additional care or new goals for affected players. |
| Call a non-transferable item free because it creates no coins. | Measure whether it replaces purchases, accelerates exhaustion or changes competition, as well as its direct service cost. |
| Treat a cosmetic or item as "never sold" after checking only direct cash SKU rows, and reuse it on new VIP or progression tiers. | Expand the full transitive reward graph (activity trigger-currency handlers + recursive chest/choice-box payloads) and live payer-cohort holdings before reusing any asset; create net-new art when prior cash-event containers already granted it. |
| Offer "Server-wide #1 Cumulative Spender" recognition or a permanent "No.1-payer +20%" privilege. | Keep paid-rank analysis internal and use non-positional personal recognition such as "Senior VIP" or "Thank you for your long-term support", with benefits based on the verified order or personal milestone rather than paid rank. |

## 3. Set offers and gift authority in advance

Make comparable larger packs at least as good in usable value per unit of money
as smaller packs by default. Compare identical eligibility, timing and
restrictions; show distinct promotional terms explicitly. Use observed demand
and cohort contribution to revise this default, without misleading reference
prices or changing an offer already purchased.

### Confidential spending comparisons and player-ready mail

Internal spend and LTV cohorts guide budgets; they never become player-facing
status claims. Across grant specs, ambassador chats, support replies, in-game
mail (mail title / mail body) and public/community copy, never disclose, confirm
or hint at server-wide real-money spending rank, cumulative-spend standing,
spend percentile or rank-differentiated rebate percentages, even to the verified
account owner. Public gameplay, tournament and collection scores are distinct
from confidential spending comparisons. Describe bespoke care solely as personal
VIP appreciation ("Personal Exclusive VIP Appreciation"), without comparative hints such as
“nobody contributes more” or “only the top few qualify.”

Flattery creates a commercial leak: a payer knows their own cumulative spend;
confirming first place reveals the single-payer LTV ceiling and gives a screenshot
viewer a basis to estimate revenue scale. Confirming an undisputed leader can
remove upward competitive tension and discourage challengers. Rank-linked rebate
labels also become portable screenshot evidence for cross-player price arbitrage.
Private delivery and verified ownership do not remove these effects.

Where mail delivery is append-only, source copy is the correction boundary:
least-privilege writers may have only `SELECT` and `INSERT`, while deleting and
re-inserting attachment mail can enable duplicate claims. Every signed mail spec
therefore contains final, natural player-facing mail title and mail body: no spend
or LTV ranks, internal tier/track labels, Markdown formatting symbols (such as
`**`), internal order/ticket IDs or raw warehouse/inventory integers. Keep audit
metadata outside those fields; use player-readable units when a quantity is
needed. Never assume the delivery operator can sanitize an already-inserted mail.

| ❌ Bad | ✅ Good |
| --- | --- |
| “Server-wide #1 cumulative spender: +20% extra privilege”; mail titled “Track A order <order_id> **VIP**”. | “Personal Exclusive VIP Appreciation”; natural copy describing the recipient's approved benefit without comparative standing or internal metadata. |

Billing disclosure is role-specific: ambassadors never answer or quote cumulative
recharge totals, order numbers or top-up amounts, even when the verified owner
asks or LTV is known internally. Warmly route those inquiries to in-game official
support or the published support address in the product profile. Payment
concierge help removes checkout friction; it does not authorize billing disclosure.
Only official support may answer an explicitly requested own total and explicitly
requested order breakdown, after both account-identity and payment receipt
verification. Provide only the requested verified total, currency and relevant
period, or requested per-order details, with zero rank, percentile, comparison
or unrequested inventory, recipes or other account details. Legitimate own-order,
receipt and missing-payment help remains available through that verified official
path; own billing records are private, never public recognition. See the [support disclosure boundary](../customer-support/SKILL.md#minimum-necessary-disclosure-and-paid-rank-confidentiality).
Explicit disinterest or a spending complaint stops the outbound sales sequence
under [ambassador's stop-sales rule](../ambassador/SKILL.md#3-emotional-care-first-and-the-adversarial-turing-self-test).

### Bottleneck-First High-Ticket VIP Bespoke Pricing & Primary-Source Item Template Verification

When pricing or structuring bespoke high-ticket packs (`US$200+`) for high-LTV payers (`T0`):
1. **Cross-reference live slot levels, warehouse balances, and upgrade-recipe cliffs (skill template / progression tables) before choosing contents:**
   - Never reuse a low-ticket starter/comfort ration (`100–300` units) on a high-ticket purchase ask; size quantities to clear concrete progression milestones (`2 / 6 / 10` slots across the player's actual level cliff) with progressive unit-value step-ups (`+12.5% -> +20% -> +25%`) that still leave `>= 40%` of total progression depth for subsequent repeat purchases (**Anti-Cheapening**).
   - **Zero Overstock Dilution:** Exclude any secondary currency or material the player already holds in large surplus (`10,000+` units in inventory) and allocate 100% of the pack's budget to the specific bottleneck items blocking their next upgrade step.
   - **Warehouse-Unlock Value Framing:** When clearing a mid-tier recipe cliff (e.g., `Lv.30 -> Lv.31`) unlocks tens of thousands of high-tier materials already sitting idle in the player's inventory, compute the exact reachable level from the serving template and present the pack as unlocking their existing warehouse hoard.
2. **Verify the item template table (`container type`), transitive reward-graph closure, and schema permanence before quoting or reusing any item, container, or cosmetic ID:**
   - Read the authoritative item template table (`container type` JSON payload), artifact template (`quality`, `skillId`), and database table schema (`day: -1` permanence vs. expiring columns) before placing any item ID into an offer config. Never assume an item is a "30-day trial card" or a top-tier item from its name alone.
   - **Transitive Reward-Graph Closure & Live Cohort Ownership (`Zero Devaluation & Zero Duplicate Milestone Grants`):** Before classifying an item or cosmetic as "unmonetized" or reusing it in new progression, VIP, or bundle tiers, compute the fixed-point transitive closure across (a) direct cash and shop SKUs, (b) activity and event trigger-currency handlers (reading the server handler that credits each activity to check whether a cost-type flag binds progress to real-money recharges rather than gameplay currency), and (c) recursive chest, random-box, and choice-box (`container type`) payloads down to leaf IDs, then verify live player holdings across the target payer cohort. When top spenders already unlocked an asset through prior cumulative-recharge containers, reusing it on new or retroactive VIP tiers both devalues past paid events and delivers duplicate zero-utility grants; create net-new tier-exclusive assets whenever transitive cash provenance or payer holdings overlap.
3. **1:1 Cross-Channel Price Unity & Dynamic Mail Split:**
   - Keep price and item quantities `1:1` identical between self-serve personalized web offers and 1-to-1 VIP concierge quotes, and derive multi-mail delivery counts (`2 / 5 / 10` mails) directly from each tier's configuration rather than hardcoded labels.
4. **100% System Monetization, Universal Equal Treatment & Public Campaign Codes Only ([offers, gifts and experiments](references/offers-gifts-and-experiments.md#100-system-monetization-universal-equal-treatment-public-campaign-codes-only)):**
   - **100% System Monetization & Zero Single-Player Codes or Micro-Gifts:** Ambassadors and support agents provide emotional value, onboarding help, and gameplay guidance only. Every promotion, event, and reward across all titles must execute 100% through automated product/platform systems; if an event or reward cannot be executed through a legitimate automated system channel, do not run the event or issue the reward. Never issue individual soothing codes, personal care codes, free micro-gifts, manual inbox grants, or ad-hoc database rewards to placate individual players, and never offer top-up-linked or player-negotiated gifts.
   - **Public Campaign Codes Only (Three-Layer Separation of Duties):** Apply one universal standard across all players with zero whale-whitelist vs. non-whitelist tracks and zero per-order or milestone ambassador rebate quotas. Redemption codes are restricted strictly to server-wide public campaigns that benefit all players equally (configured as `limited` total-claim cap, `unlimited`, or `time-limited` window, 1 claim per account). Governance uses three strict layers:
     1. **Economy / CI Automated Cap & Blacklist Layer:** Machine-readable Clean-USD valuation SSOT and CI checks enforce hard per-player value ceilings (e.g., `<= US$1.50` Clean-USD for public festival/campaign codes) and block premium currencies, high-tier progression bottlenecks, and unpriced containers before merge.
     2. **Product / Game Design Configuration Layer:** Only the game/product engineering flow configures public campaign code templates within CI-enforced caps.
     3. **Ambassador / Support / Marketing Distribution Layer:** Frontline channels hold zero code-generation, reward-configuration, or single-player grant authority; they only announce and share already-published server-wide public campaign codes.
   - **Pre-Transition Commitment Sunset via Automated System Settlement:** Preserve already-claimed player holdings (no clawback) and settle any explicit, verified pre-transition commitment one final time strictly through automated system settlement (never via single-player codes or manual inbox/DB writes), after which zero new individual promises or exceptions are permitted.

Before running a gift program, whoever holds its budget sets the eligible
population, allowed reward types, per-recipient and aggregate exposure,
overlap rules, delivery window, funding and review conditions. Derive quantities
from the economy, expected uptake, sales displacement and measured ability to
add useful content. The person serving the player chooses within that standing
authority without asking for each case. Update the budget when its measured
inputs change; a proposed gift outside it needs a budget decision.

For ambassador retention, VIP care and Save-to-Upsell bundles, apply the
[live retail valuation and discretionary grant caps](../ambassador/SKILL.md#retail-valuation-and-discretionary-grant-caps)
before choosing quantities; synthetic internal conversions cannot replace
matching direct-cash store SKUs.

Keep owed fulfillment and repairs separate from optional generosity. When a
service mistake grants too much, absorb its cost and preserve what the player
holds. Correct future grants and fund the repair. Fraud, abuse or chargebacks
are separate, evidence-based exception paths handled under the applicable
policy; an ordinary complaint or staff error is not evidence of them.

## 4. Test the commercial result

Predeclare the population, allocation unit, outcomes, window, smallest useful
effect and downside that would change the decision. Compare a treatment with a
credible holdout where it is useful and ethical. Include the complete purchase,
reward, return and content cycle; a launch night is not a general stopping rule.

Track attention-only resolution and compare optional gifts plus attention with
attention alone among comparable eligible players. Deliver owed repairs to
both groups. Measure return, voluntary paid purchases, whole-catalog
contribution, complaints, gift uptake, resource supply and time to cap. The
[experiment reference](references/offers-gifts-and-experiments.md#test-and-review)
defines interference, small-sample and stopping limits.

If evidence cannot distinguish benefit from material harm, report the range
and choose a reversible action within funded exposure. A single large purchase,
a pleasing reply or unchanged average balances cannot establish success.

## 5. Record and verify the decision

Record the live version and window, alternatives, decisive measurements,
uncertainty, chosen offer or budget, accountable function, and conditions for
review. Keep product prices, identities, current limits and company facts in
the product or workspace record.

Use [deliver-and-verify](../deliver-and-verify/SKILL.md) for implementation.
Check the displayed price and contents, purchase, settlement, intended grant
and preserved holdings at the real surface. Reconcile issued quantities with
the approved exposure, then review the complete outcome window. Stop or change
future issuance when the decision's measured limits are crossed; preserve
already granted value.
