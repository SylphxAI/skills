---
name: game-economy
description: "Use when choosing a game's pack contents or price, designing bottleneck-first VIP whale bespoke tiers from live inventory and upgrade-recipe cliffs, verifying ItemTemplate funType payloads before offering bundles, comparing value per unit of money, raising a cap or adding a growth line, setting a gift or gift budget, preventing positional leaderboard spillover from retention grants, checking virtual-currency inflation, or diagnosing why game sales fell. Use ambassador for relationship conversations, customer-support for an individual entitlement or refund case, challenge for general product or commercial strategy, and deliver-and-verify to implement a change."
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

## 3. Set offers and gift authority in advance

Make comparable larger packs at least as good in usable value per unit of money
as smaller packs by default. Compare identical eligibility, timing and
restrictions; show distinct promotional terms explicitly. Use observed demand
and cohort contribution to revise this default, without misleading reference
prices or changing an offer already purchased.

### Bottleneck-First High-Ticket VIP Bespoke Pricing & Primary-Source `ItemTemplate` Verification

When pricing or structuring bespoke high-ticket packs (`HK$1,500+ / US$200+`) for high-LTV payers (`T0`):
1. **Cross-reference live slot levels, warehouse balances, and upgrade-recipe cliffs (`ArtifactSkillTemplate` / progression tables) before choosing contents:**
   - Never reuse a low-ticket starter/comfort ration (`100–300` units) on a high-ticket purchase ask; size quantities to clear concrete progression milestones (`2 / 6 / 10` slots across the player's actual level cliff) with progressive unit-value step-ups (`+12.5% -> +20% -> +25%`) that still leave `>= 40%` of total progression depth for subsequent repeat purchases (**Anti-Cheapening**).
   - **Zero Overstock Dilution:** Exclude any secondary currency or material the player already holds in large surplus (`10,000+` units in inventory) and allocate 100% of the pack's budget to the specific bottleneck items blocking their next upgrade step.
   - **Warehouse-Unlock Value Framing:** When crossing a mid-tier recipe cliff (e.g., `Lv.30 -> Lv.31`) unlocks tens of thousands of high-tier materials already sitting idle in the player's inventory, compute the exact reachable level from the serving template and present the pack as unlocking their existing warehouse hoard.
2. **Verify `ItemTemplate` (`funType`) and schema permanence before quoting any item or gift box ID:**
   - Read the authoritative `ItemTemplate` (`funType` JSON payload), `ArtifactTemplate` (`quality`, `skillId`), and database table schema (`day: -1` permanence vs. expiring columns) before placing any item ID into an offer config. Never assume an item is a "30-day trial card" or a top-tier item from its name alone.
3. **1:1 Cross-Channel Price Unity & Dynamic Mail Split:**
   - Keep price and item quantities `1:1` identical between self-serve personalized web offers and 1-to-1 VIP concierge quotes, and derive multi-mail delivery counts (`2 / 5 / 10` mails) directly from each tier's configuration rather than hardcoded labels.

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
