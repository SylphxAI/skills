# SaaS Subscription Pricing — B2B Analytics Product

## 1. Plan Structure

| Plan | Target | List Price | Annual Price | Trial |
|------|--------|-----------|--------------|-------|
| **Trial** | Evaluation | $0 | n/a | 14-day, no CC |
| **Team** | SMB / Mid-Mkt ≤50 seats | $80/seat/mo | $68/seat/mo (–15%) | 14-day |
| **Business** | Mid-Mkt 51–250 seats | $120/seat/mo | $102/seat/mo (–15%) | Extendable |
| **Enterprise** | 250+ seats / custom | Custom quote | Custom | Custom POC |

## 2. Seat Limits
- **Trial:** 5 seats, 90-day data window
- **Team:** 5–50 (soft cap); hard cap at 50 → upgrade trigger
- **Business:** 51–250
- **Enterprise:** Unlimited (contract-bound)

## 3. Usage-Based Overages

Each plan bundles a **platform fee + committed usage**. Overage billed monthly in arrears at **1.3× list** (penalty pricing deters sprawl).

| Resource | Team (incl.) | Overage |
|----------|-------------|---------|
| Events ingested | 10M/mo | $0.50 / 1K events |
| Queries executed | 50K/mo | $0.02 / query |
| Data stored | 100 GB | $0.10 / GB-mo |
| Dashboard refreshes | 5K/mo | $0.05 / refresh |

Enterprise replaces per-event metering with **committed-spend drawdown** (pre-purchased credits).

## 4. Annual Discount
- **15%** annual commit
- **20%** 2-year commit
- **+5%** if paid upfront (Q1 incentive)

## 5. Procurement Requirements (Enterprise, ≥$50K ACV)

- MSA (click-through ≤$250K; paper above)
- DPA + Standard Contractual Clauses (EU)
- SOC 2 Type II required; ISO 27001 preferred
- InfoSec questionnaire (CAIQ / SIG-Lite)
- Order Form: usage commit, **OLG cap 1.5× commit**, ramp clause
- Redlines accepted ≤3 rounds
- Net 30 default; Net 60 at 250+ seats

## 6. Support Tiers

| Tier | Sev-1 Response | Channels | Pricing |
|------|----------------|----------|---------|
| **Standard** | 8 business hrs | Email, in-app | Bundled (Team/Business) |
| **Premium** | 2 hrs, 24/7 | + Slack Connect, phone | +20% on ARR |
| **Enterprise** | 30 min, 24/7 | + dedicated TAM, CSM | Bundled in Enterprise |
| **Mission Critical** | 15 min, 24/7 | + war-room, QBR | +35% on Enterprise |

## 7. Expansion Path (Land → Expand)

1. **Land:** Trial → Team (PLG)
2. **Convert:** Seat expansion at 70% cap → CSM trigger
3. **Expand:** **Workspaces** module (+$500/mo flat), **API** pack (+usage tier)
4. **Elevate:** Team→Business at 50 seats; Business→Enterprise at 250 seats or $100K ARR
5. **Strategic:** AI/ML add-on, dedicated cluster, white-glove onboarding

## 8. Unit Economics (Target Model)

| Metric | Target |
|--------|--------|
| Gross margin | 78–82% blended |
| CAC payback | ≤14 months |
| LTV / CAC | ≥3.5× |
| NRR | 120–130% |
| Trial→paid | 18–22% |
| Seat utilization | ~70% of purchased |
| Overage ARR mix | 8–12% (signal, not bloat) |

**Cost stack:** infrastructure ~35%, support/CSM ~20%, GTM ~25%, G&A ~20%.

---

## Pricing Guardrails (Audit-Critical)

- **Floor:** never discount >25% off list without CRO approval
- **Ceiling:** Enterprise ACV must exceed Team-equivalent by ≥40% (avoid commoditization)
- **Renewal:** price increase ≤5% YoY; usage tiers renegotiated annually
- **Stacking cap:** max 30% combined discount (annual + multi-year + promo)
- **OLG:** contractually cap customer overage liability at 1.5× monthly commit to control tail risk

## Audit Notes

- List prices benchmarked against **3-tier competitor median** (Databricks, Snowflake, Mixpanel)
- Usage rates set to **cost + 70% margin floor**
- 15% annual discount sized to recover ~6 months of churn risk (validated vs. LTV model)
- Trial length (14d) calibrated to P50 activation at day 11
- Support tiering (+20%/+35%) reflects real on-call cost, not list-padding
