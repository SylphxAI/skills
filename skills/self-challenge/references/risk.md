# Risk scoring standard

Trigger: evaluating legal, regulatory, platform, contractual, commercial, or operational risk; deciding whether an issue blocks shipping; or prioritizing mitigation work.

Every engineering hour, legal concession, or self-imposed delay has an opportunity cost against product survival and revenue. Score risks from first principles using outside-view enforcement likelihood and realistic bounded impact rather than worst-case imagination.

## Hard lines vs. scored exposure

1. **Unscored hard lines (never crossed):**
   - **No criminal acts:** Never knowingly commit fraud, theft, money laundering, child exploitation, unauthorized computer intrusion, distribution of cracked software, or any act carrying criminal liability.
   - **No loss of customer money or data:** Never take payment without delivering the promised value or refunding it, and never lose unique customer or player data.
2. **Everything else is scored ($1\text{–}5 \times 1\text{–}5$):**
   - Civil claims, third-party terms of service (ToS), end-user license agreements (EULAs), vendor seat or resale clauses, open-source license obligations, trademark similarity, and regulatory gray areas are **commercial and contractual trade-offs**, not criminal law.
   - Evaluate them with the $5 \times 5$ matrix below. Never treat a civil, contractual, or third-party policy question as an automatic blocker without scoring its outside-view likelihood and realistic impact.

## 1. Likelihood (within the next 12 months)

Score what the external counterparty, platform, or regulator can **actually observe, measure, and economically justify pursuing** within a year—never what an insider with source-code or database access knows:

- **Outside-view detectability:** An internal implementation detail, backend model choice, or private workspace workflow that produces no external signal has a much lower likelihood of action than a public storefront surface.
- **Counterparty economics and target value:** Civil litigation and formal audits are expensive, slow, and public-facing. Counterparties rarely bring civil suits against early-stage or low-asset entities where expected recovery is smaller than legal costs. For third-party vendor terms or software licenses, the realistic first step is almost always an automated notice, an account/seat restriction, or a sales request to upgrade to a commercial tier—not a lawsuit.
- **App stores and automated platforms:** Storefront review policies (Apple App Store, Google Play, browser web stores) and payment processor chargeback thresholds are enforced quickly by automated checks or reviewers and cost little to follow. Score store-removal triggers by their immediate distribution impact and comply with applicable store rules.

| Score | Band | Annual probability | Reference interpretation |
| --- | --- | --- | --- |
| **1** | Remote | `< 5%` | Internal-only use, unobservable backend detail, or no comparable enforcement against similar entities |
| **2** | Unlikely | `5% – 20%` | Publicly visible only on close inspection; counterparty has low economic incentive to act before scale |
| **3** | Possible | `20% – 50%` | Automated platform check or active vendor monitoring exists; comparable notices occur in the market |
| **4** | Likely | `50% – 80%` | Routine automated enforcement (e.g., store review gate or provider rate/seat detector) |
| **5** | Near-certain | `> 80%` | Active notice received, deterministic automated block, or ongoing user-visible failure |

## 2. Impact (realistic consequence if triggered)

Measure impact against the organization's **current monthly operating cost** and the **reversibility** of the choice—never the theoretical statutory maximum written for billion-dollar incumbents:

- **Bounded entity and asset exposure:** When an operation runs inside an isolated account, seat, or limited-liability entity with minimal assets, the realistic worst case of a vendor or civil dispute is replacing that seat/provider or settling out of future product revenue.
- **Reversibility reduces impact:** If a model, data source, brand name, or vendor integration sits behind a clean interface and can be swapped or licensed within days once revenue arrives or a notice is received, its impact is `1` or `2`.

| Score | Band | Realistic consequence |
| --- | --- | --- |
| **1** | Negligible | `< 0.2×` monthly cost, or a single replaceable seat/account closed with a ready fallback |
| **2** | Minor | `0.2× – 1×` monthly cost, or a reversible change (e.g., swapping a model, renaming a listing, or upgrading to a paid API plan upon notice) |
| **3** | Moderate | `1× – 3×` monthly cost, or temporary disruption to a non-core feature |
| **4** | Major | `3× – 10×` monthly cost, store removal of a live revenue-generating title, or temporary checkout halt |
| **5** | Severe | `> 10×` monthly cost, permanent loss of customer data/funds, or survival-threatening enforcement |

## 3. Priority bands (`score = likelihood × impact`)

| Score | Band | Action |
| --- | --- | --- |
| **16 – 25** | Critical | Mitigate immediately before or alongside rollout |
| **10 – 15** | High | Mitigate in the current release cycle or place behind a fast kill-switch |
| **6 – 9** | Medium | Record in the workspace risk register with a clear fix trigger (e.g., revenue threshold or counterparty contact); ship without delay |
| **1 – 5** | Low / Accepted | Proceed directly; no mitigation or extra review gate needed |

## 4. Expected value and present value

When comparing a mitigation cost against a scored risk, compare present values over the relevant horizon:
$$\text{Expected Cost} = P(\text{event}) \times \text{Realistic Settlement or Switch Cost}$$
If the upfront cost of compliance or re-architecture exceeds the expected cost of waiting until the product has revenue or receives a notice—and no hard line is crossed—ship now and record the trigger (such as reaching a revenue milestone or receiving vendor contact) that will fund the commercial license or migration.

## 5. Pre-launch vs. live products

- **Pre-launch products (no real users or real-money transactions):** Carry zero customer-data or live-revenue exposure. Skip discretionary security hardening, compliance audits, grandfathering, and migration ceremony until the launch gate (`deliver-and-verify/references/security.md#when-security-work-happens`).
- **Live products with real users:** Protect existing accounts, paid entitlements, and user data; apply rolling updates and reversible switches.

## 6. Market scope and contractual terms

Evaluate legal and regulatory rules only for the markets the product actively targets, using region-gating where a jurisdiction's cost outweighs its revenue contribution. Keep criminal law (hard line) strictly separate from contractual vendor terms and civil exposure (scored). When a risk is already recorded in the workspace's accepted-risk register or scores below `10`, execute directly without re-arguing the decision, self-blocking, or adding unsolicited disclaimers.

## 7. A fix stops at its target

Design every mitigation to be the smallest mechanism that brings the score into the acceptable band without slowing unrelated work:
- Prefer an interface boundary, a runtime configuration switch, or a region gate over a blanket prohibition.
- Remove a control when the underlying risk changes or when measured reality shows the failure mode does not occur.

## Method sources

| Concept | Reference | Scope in this standard |
| --- | --- | --- |
| Likelihood × Impact matrix | [ISO 31000 risk management principles](https://www.iso.org/iso-31000-risk-management.html); [NIST SP 800-30 Rev. 1](https://csrc.nist.gov/pubs/sp/800/30/r1/final) | Adapted to a $1\text{–}5 \times 1\text{–}5$ scale calibrated against monthly operating cost and reversibility |
| Reference-class forecasting (outside view) | Kahneman & Tversky (1979); Flyvbjerg (2006) | Score likelihood from empirical external enforcement rates, not internal visibility |
| Asymmetric limited-liability payoff & risk of ruin | Jensen & Meckling (1976); Taleb, *Antifragile* (2012) | Distinguish survival-threatening tail risks and criminal hard lines from bounded civil/contractual trade-offs |
