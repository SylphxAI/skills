# Behavioral operations, retention, and support grant standards

This reference accompanies [customer-support](../SKILL.md). It defines the first-principles methodology and behavioral psychology standards for customer care, goodwill grants, VIP retention, and live-operations support across SaaS/AI/API services, casual/puzzle games, and heavy-IAP/competitive games.

## 1. First-principles objective and anti-cannibalization

Customer support and live operations exist to maximize long-term customer value:

$$\text{LTV} = \text{Retention} \times \text{Paid Conversion} \times \text{ARPPU} - \text{Marginal Cost} - \text{Economy Inflation}$$

Every support interaction, goodwill remedy, or retention grant must satisfy three first-principles constraints:

1. **Preserve paid conversion and economy scarcity.** Never hand out primary currency, full paid tiers, or repeatable high-value grants unconditionally on request. Unconditional handouts train users to ask support instead of paying, attract multi-account abuse, and devalue purchases made by paying customers.
2. **Separate perceived emotional value from marginal inflation.** Deliver care through non-transferable, complementary items or scoped service credits that feel thoughtful to the recipient while carrying near-zero marginal cost and zero primary-currency inflation.
3. **Verify before granting or stating progress.** Read the authoritative account, order, usage, and cooldown records before issuing any grant or quoting any milestone progress.

## 2. Three-tier support and retention grant matrix

Structure all discretionary support, onboarding, and retention grants into three strict tiers enforced by account state and cooldown records:

| Tier | Target segment | Eligibility and cooldown | Permitted grant composition | Hard boundary |
| --- | --- | --- | --- | --- |
| **Tier 1 — Starter / non-payer activation** | New or unpaid users (`total_paid = 0`) | One-time per verified account ID | Small starter allowance (capped at 10–20 basic actions or novice rounds) plus non-transferable trial/cosmetic items | Zero repeat grants; strictly below the entry-level paid SKU |
| **Tier 2 — Verified-payer care and frustration recovery** | Verified paying users (`total_paid > 0`) experiencing a verified service hiccup, failed job, or heavy loss streak | Enforced cooldown (e.g., at most once per 7 days per account) verified in the database | Non-transferable, zero-inflation complementary items (upgrade protection, boosters, retry credits) | Zero primary currency; **zero sales pitch attached** at a moment of loss or frustration |
| **Tier 3 — Order-backed milestone and VIP care** | Active paying and high-value users | Tied to a verified paid order (`state = paid`) or verified cumulative spend milestone | Complementary progression assets, exclusive cosmetics, or bounded bonus credits within the product's published marginal rebate cap (e.g., 15%–20%) | Every grant is recorded idempotently against the order or milestone ID |

## 3. Six truthful behavioral psychology mechanisms

Apply behavioral economics and psychology using **100% verified facts**. Never invent a false story, fake scarcity, or unverified progress number.

### 3.1 Operational transparency and reciprocity (real verification effort, zero fabricated authority)

- **Behavioral mechanism:** Under the **Labor Illusion** (Norton, Mochon & Ariely, 2011) and **Reciprocity** (Cialdini, 2009), users value a remedy more when they see the concrete verification steps performed on their behalf than when they receive an instant, generic canned reply.
- **Compliance and conduct hard line:** State only the real verification and policy-backed care action performed. Never invent a fake supervisor exception, personal monthly quota, or manual override that does not exist (prohibited under consumer protection laws governing false trade descriptions and misleading practices, such as Hong Kong Trade Descriptions Ordinance Cap. 362 s.7A and s.13E).

| ❌ Bad (fabricated supervisor story or robotic handout) | ✅ Good (truthful verification transparency and policy-backed care) |
| --- | --- |
| *"I went to my manager and used my own personal monthly quota to get you this special exception pack!"* (False statement; violates consumer protection law.) | *"I checked your account's match history from this evening and confirmed your VIP care eligibility. I have sent a complimentary care pack (10 Upgrade Protection Stones and 10 Treasure Map Shards) to your in-game inbox so you can Upgrade your gear safely."* |
| *"Here is a free code for 1,000B coins."* (Destroys economy scarcity and trains users to beg.) | *"Welcome! You can redeem starter code `WELCOME` in Settings -> Gift Code once per account for 2M starter coins and a 7-day avatar frame."* |

### 3.2 Endowed progress and goal-gradient framing (verified milestones)

- **Behavioral mechanism:** Under the **Goal-Gradient Hypothesis** (Hull, 1932; Kivetz, Urminsky & Zheng, 2006) and **Endowed Progress Effect** (Nunes & Drèze, 2006), people accelerate effort when they see how much of a milestone they have already completed and the exact remaining delta.
- **Hard line:** Query the authoritative billing or activity record first. Quote the user's exact verified progress and exact remaining amount; never guess or inflate a percentage.

| ❌ Bad (unverified or fabricated progress) | ✅ Good (exact verified progress and remaining delta) |
| --- | --- |
| *"With the extra progress I added for you, you are now at 85% toward the top reward!"* (False statement when no progress was added.) | *"I checked your current event record: your cumulative spend in this window is HK$1,352 (90.1% of the HK$1,500 milestone). Completing the remaining HK$148 before the event closes on Nov 3 at 07:59 automatically unlocks the HK$1,500 tier reward in your inbox."* |

### 3.3 Zeigarnik complementary assets (incomplete-set momentum without currency inflation)

- **Behavioral mechanism:** Under the **Zeigarnik Effect** (Zeigarnik, 1927), partial progress toward a composite goal (such as upgrade protection materials, partial character/artifact shards, or workflow templates) creates constructive engagement without flooding the economy with primary currency.
- **Hard line:** Pair VIP care and tier bonuses with non-transferable, complementary upgrade materials or cosmetics so at least 80% of high-tier bonus value sits in non-inflationary assets.

| ❌ Bad (inflationary currency dump) | ✅ Good (complementary non-currency assets) |
| --- | --- |
| *"Here are 500T free coins on top of your purchase."* (Cannibalizes future coin purchases.) | *"Congratulations on reaching the HK$3,000 milestone! Along with your panel reward, your VIP bonus of 50 Artifact Upgrade Boxes and 300,000 Gems has been delivered to your inbox to help you complete your next artifact tier."* |

### 3.4 Real window and loss-aversion framing (prospect theory on actual deadlines)

- **Behavioral mechanism:** Under **Prospect Theory** (Kahneman & Tversky, 1979), people weigh forfeiting an earned or active benefit more heavily than acquiring an equivalent new one. Highlighting the real expiration time of an active event, stacked multiplier, or billing-cycle credit helps the user capture value they would otherwise miss.
- **Hard line:** Reference only real, system-enforced deadlines and earned multipliers. Never invent a fake countdown or fictitious queue (such as claiming a quota is locked for 2 hours and will be released to a "next candidate").

| ❌ Bad (fabricated scarcity countdown) | ✅ Good (real system deadline and earned state) |
| --- | --- |
| *"I locked a 2-hour VIP double quota for you; if you don't pay within 2 hours it will be released to the next candidate!"* (False statement and aggressive practice.) | *"Your current +300% purchase multiplier and the Halloween cumulative rebate window remain active until Nov 3 at 07:59 HKT. Any eligible purchase before that cutoff counts toward your current tier."* |

### 3.5 Peak-end care and strict separation of comfort from sales

- **Behavioral mechanism:** Under the **Peak-End Rule** (Kahneman, Fredrickson, Schreiber & Redelmeier, 1993), users judge an experience by its most intense moment (positive or negative) and how it ends.
- **Compliance and conduct hard line:** Never exploit a customer's misfortune, bankruptcy, or heavy loss streak to push a sale (prohibited under consumer protection laws against aggressive commercial practices, such as Cap. 362 s.13F(3)(c)).
  - **At a negative peak (loss streak, bankruptcy, service hiccup, failed job):** Deliver pure empathy, verify that the system is healthy, and—if eligible under Tier 2—provide a non-currency care pack or retry credit **with zero commercial offer attached**.
  - **At a positive peak or customer-initiated inquiry (big win, milestone completion, asking about a promotion):** Celebrate the achievement and share verified milestone progress or active event details.

| ❌ Bad (attaching a sales push to a player's loss) | ✅ Good (pure non-commercial care at a loss; commercial info only on inquiry/milestone) |
| --- | --- |
| *"Sorry you lost all your coins! Buy the HK$388 pack right now in the next 2 hours to win it all back!"* (Exploits a loss moment with an aggressive sales push.) | **On a loss complaint:** *"I know a cold streak is frustrating. Every match shuffle can be independently verified at our public verifier, and I have sent a complimentary care pack (10 Protection Stones and 10 Gift Boxes) to your inbox. Take a breather whenever you need, and may your next hands go smoothly!"* |

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
| **Tier 2 (Frustration / hiccup care — no sales push)** | Idempotent credit restoration for a verified failed job or transient API error | Cooldown-enforced non-currency life/booster refill after a verified bug or streak | Cooldown-enforced non-coin care pack (upgrade protection stones, gift boxes) delivered to in-game inbox |
| **Tier 3 (Milestone & VIP care)** | Proactive onboarding architecture review, workflow templates, and volume-tier usage alerts | Season-pass milestone celebration and complementary cosmetic badges | Verified cumulative-spend milestone delivery (80%+ value in exclusive cosmetics, shards, and upgrade boxes) |
| **Goal-Gradient / Endowed Progress trigger** | Customer asks about plan limits or approaches 80%–90% of a volume discount tier | Player inspects a collection set or seasonal pass milestone | Player asks about an active event or reaches 70%–90% of a cumulative rebate tier |
| **Public fairness / metering verification** | Usage dashboard and request-ID log verifier | Deterministic level seed or public rules FAQ | Cryptographic shuffle verifier URL and official in-game notice odds |
