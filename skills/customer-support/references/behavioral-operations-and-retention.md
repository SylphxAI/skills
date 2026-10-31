# Behavioral operations, retention, and support grant standards

This reference accompanies [customer-support](../SKILL.md). It defines the first-principles methodology and behavioral psychology standards for customer care, goodwill grants, VIP retention, and live-operations support across SaaS/AI/API services, casual/puzzle games, and heavy-IAP/competitive games.

## 1. First-principles objective and anti-cannibalization

Customer support and live operations exist to maximize long-term customer value:

$$\text{LTV} = \text{Retention} \times \text{Paid Conversion} \times \text{ARPPU} - \text{Marginal Cost} - \text{Economy Inflation}$$

Every support interaction, goodwill remedy, or retention grant must satisfy three first-principles constraints:

1. **Preserve paid conversion and economy scarcity.** Never hand out primary currency, full paid tiers, or repeatable high-value grants unconditionally on request. Unconditional handouts train users to ask support instead of paying, attract multi-account abuse, and devalue purchases made by paying customers.
2. **Separate perceived emotional value from marginal inflation.** Deliver care through non-transferable, complementary items or scoped service credits that feel high-value and bespoke to the recipient while carrying near-zero marginal cost and zero primary-currency inflation.
3. **Execute every promised approval, quota, or reservation in the system.** Because the support/operations agent holds delegated company authority, an internal special approval, per-agent VIP quota, endowed progress bonus, or time-limited reservation granted and executed by the agent is a real company approval and action. Ensure the system records and honors what the user is told.

## 2. Three-tier support and retention grant matrix

Structure all discretionary support, onboarding, and retention grants into three strict tiers enforced by account state and cooldown records:

| Tier | Target segment | Eligibility and cooldown | Permitted grant composition | Hard boundary |
| --- | --- | --- | --- | --- |
| **Tier 1 — Starter / non-payer activation** | New or unpaid users (`total_paid = 0`) | One-time per verified account ID | Small starter allowance (capped at 10–20 basic actions or novice rounds) plus non-transferable trial/cosmetic items | Zero repeat grants; strictly below the entry-level paid SKU |
| **Tier 2 — Verified-payer care and VIP quota recovery** | Verified paying users (`total_paid > 0`) experiencing a service hiccup, failed job, or heavy loss streak | Cooldown-enforced (e.g., at most once per 7 days per account) verified in the database | Non-transferable, zero-inflation complementary items (upgrade protection, boosters, retry credits) framed as a dedicated VIP care approval | Zero primary-currency inflation |
| **Tier 3 — Order-backed milestone and VIP care** | Active paying and high-value users | Tied to a verified paid order (`state = paid`) or cumulative spend milestone | Complementary progression assets, exclusive cosmetics, or bounded bonus credits within the product's published marginal rebate cap (e.g., 15%–20%) | Every grant is recorded idempotently against the order or milestone ID |

## 3. Six behavioral psychology mechanisms

Apply behavioral economics and psychology across every support and VIP touchpoint so each interaction maximizes customer happiness and paid conversion.

### 3.1 Labor illusion, bespoke approval, and reciprocity (effort and exclusivity framing)

- **Behavioral mechanism:** Under the **Labor Illusion** (Norton, Mochon & Ariely, 2011) and **Reciprocity** (Cialdini, 2009), an instant, effortless handout feels cheap and disposable, whereas a grant that reflects account review, special approval (`自己批自己` under delegated authority), and a scarce VIP care quota creates strong emotional appreciation and reciprocity.
- **Execution rule:** Check the customer's account/match history, apply the policy-backed VIP care quota, and explicitly communicate the review and special approval performed for them.

| ❌ Bad (instant, robotic handout that feels worthless) | ✅ Good (high-effort bespoke approval and reciprocity framing) |
| --- | --- |
| *"Here is a free code for 1,000B coins."* (Feels like worthless monopoly money; destroys economy scarcity and trains users to beg.) | *"I reviewed your match records from tonight and approved a special VIP care quota pack for your account (10 Upgrade Protection Stones and 10 Treasure Map Shards), now delivered to your in-game inbox so your next upgrades are protected."* |
| *"Gift sent to inbox."* (Zero emotional connection or perceived effort.) | *"Welcome! I have activated your one-time starter allowance (`WELCOME` in Settings -> Gift Code) with 2M starter coins and a 7-day avatar frame to get you started at the novice tables."* |

### 3.2 Endowed progress and goal-gradient framing (milestone acceleration)

- **Behavioral mechanism:** Under the **Goal-Gradient Hypothesis** (Hull, 1932; Kivetz, Urminsky & Zheng, 2006) and **Endowed Progress Effect** (Nunes & Drèze, 2006), people accelerate spending and effort when they see high completion progress (e.g., `80%–90%`) and a small remaining delta to unlock a major reward.
- **Execution rule:** Combine the user's verified cumulative spend or usage with any applicable VIP milestone credit, and present the exact completion percentage and remaining delta to the next tier.

| ❌ Bad (passive tier listing with no personal momentum) | ✅ Good (endowed progress and exact remaining delta) |
| --- | --- |
| *"The HK$1,500 tier gives 15T coins and an outfit."* (Feels distant and impersonal.) | *"Your current cumulative spend in this event is HK$1,352—you have already completed 90.1% of the HK$1,500 milestone! You are only HK$148 away from unlocking the 15T coins, Demon Jacket, and your VIP bonus of 20 Artifact Boxes + 100,000 Gems."* |

### 3.3 Zeigarnik complementary assets (incomplete-set tension without currency inflation)

- **Behavioral mechanism:** Under the **Zeigarnik Effect** (Zeigarnik, 1927), partial progress toward a high-value composite goal (such as upgrade protection materials, partial character/artifact shards, or SaaS workflow templates) creates constructive tension to complete the set, driving paid bundle conversion without flooding the economy with primary currency.
- **Execution rule:** Deliver non-transferable, complementary upgrade materials or partial shards in care packs and milestone bonuses so at least 80% of high-tier bonus value sits in non-inflationary assets.

| ❌ Bad (inflationary currency dump) | ✅ Good (complementary non-currency assets that stimulate conversion) |
| --- | --- |
| *"Here are 500T free coins."* (Satisfies currency demand for free and kills future coin purchases.) | *"Congratulations on reaching the HK$3,000 milestone! Along with your panel reward, I have delivered your VIP bonus of 50 Artifact Upgrade Boxes and 300,000 Gems to your inbox so you can push your artifact to the next tier."* |

### 3.4 Prospect theory and time-limited reservation (loss-aversion framing)

- **Behavioral mechanism:** Under **Prospect Theory** (Kahneman & Tversky, 1979), losing an active multiplier or reserved VIP bonus quota hurts roughly twice as much as gaining an equivalent unreserved offer.
- **Execution rule:** Highlight active stacked multipliers (such as `+300%` consecutive-purchase bonuses), expiring event windows, or time-locked VIP double-bonus reservations so the customer captures the benefit before expiration.

| ❌ Bad (open-ended generic promotion) | ✅ Good (loss-aversion framing on active multiplier and time window) |
| --- | --- |
| *"You can buy packs in the shop anytime during the event."* (Zero urgency.) | *"Your account currently holds the maximum +300% consecutive-purchase multiplier, and I have reserved your VIP double-material bonus for this window—completing your next tier step before the window closes locks in both the 4x coin multiplier and the extra upgrade chests."* |

### 3.5 Peak-end timing (emotional soothing and momentum conversion)

- **Behavioral mechanism:** Under the **Peak-End Rule** (Kahneman, Fredrickson, Schreiber & Redelmeier, 1993), users judge an experience by its most intense peak (positive or negative) and how the interaction ends.
- **Execution rule:**
  - **At a negative peak (loss streak, bad beat, service hiccup):** Intervene with warm hospitality, reassure fairness via the public verifier, and grant a cooldown-enforced zero-coin care pack (`定風珠` / protection stones / gift boxes) to turn frustration into gratitude, followed by a tailored recovery path when appropriate.
  - **At a positive peak (big win, leaderboard climb, milestone completion):** Celebrate the win and immediately present the next milestone's endowed progress and VIP bonus.

| ❌ Bad (cold denial at a loss peak) | ✅ Good (Peak-End emotional turnaround) |
| --- | --- |
| *"All hands are random. We do not give compensation for losing."* (Leaves the user angry at a negative peak, causing churn.) | *"That last hand was tough! Every shuffle can be verified anytime at our public verifier, and I have approved a VIP luck-turnaround care pack (10 Protection Stones and 10 Gift Boxes) in your inbox to help you bounce back strong."* |

### 3.6 Pre-flight live-ops and release verification gate

- **Operational rule:** A broken promotion or uninitialized event room destroys trust faster than any support script can repair it. Before any scheduled event, promotion, or config reload crosses its start boundary:
  1. Verify that all serving nodes (gateway, lobby/API, and execution/room workers) have loaded the active configuration in memory.
  2. Verify the complete user path end-to-end (`UI entry -> core execution loop -> settlement/grant -> inbox delivery`) against the live environment.
  3. If a player reports a verified live-ops anomaly, repair the root cause across all serving nodes first, verify the fix, restore the affected player's attempts or state, and confirm the resolution with a non-currency appreciation grant.

## 4. Cross-product adaptation matrix

Apply the same first-principles architecture across product categories while adapting the concrete assets to each product's domain:

| Dimension | Archetype A: SaaS, AI & Cloud Platforms | Archetype B: Casual & Puzzle Games | Archetype C: Heavy-IAP & Competitive Games |
| --- | --- | --- | --- |
| **Core paid unit (never cannibalize)** | Paid seat subscriptions and metered API/compute top-ups | Paid coin bundles, ad-removal pass, and season pass | Paid currency packs, VIP tiers, and high-tier event bundles |
| **Tier 1 (Non-payer starter)** | One-time sandbox credits or 7-day feature trial on verified signup | One-time starter booster pack (e.g., 3 hints / 1 shuffle) via settings code | One-time starter code capped at 10–20 novice hands plus a 7-day cosmetic frame |
| **Tier 2 (Frustration / hiccup care)** | Approved credit restoration + bonus retry quota after a failed job or transient error | Cooldown-enforced non-currency life/booster care pack after a tough level streak | Cooldown-enforced non-coin VIP care pack (upgrade protection stones, gift boxes) delivered to in-game inbox |
| **Tier 3 (Milestone & VIP care)** | Proactive architecture review, workflow templates, and volume-tier usage bonuses | Season-pass milestone celebration and complementary cosmetic badges | Verified cumulative-spend milestone delivery (80%+ value in exclusive cosmetics, shards, and upgrade boxes) |
| **Goal-Gradient / Endowed Progress trigger** | Customer approaches 80%–90% of a volume discount tier or annual upgrade | Player inspects a collection set or seasonal pass milestone | Player reaches 70%–90% of a cumulative rebate tier or asks about an active event |
| **Public fairness / metering verification** | Usage dashboard and request-ID log verifier | Deterministic level seed or public rules FAQ | Cryptographic shuffle verifier URL and official in-game notice odds |
