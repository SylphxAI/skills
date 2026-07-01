# SaaS Subscription Pricing — B2B Analytics Product

## 1. Plan Structure

| Element | **Free Trial** | **Team** | **Business** | **Enterprise** |
|---|---|---|---|---|
| Duration / Term | 14-day, no CC | Month-to-month or annual | Annual required | Annual, multi-year option |
| Seats included | 3 (read-only) | 5 seats | 25 seats | 100 seats (pooled) |
| Seat add-on | — | $25/seat/mo | $20/seat/mo | Custom (volume tiers) |
| Monthly queries (events) | 10K | 1M | 10M | 50M+ |
| Dashboards | 3 | 25 | Unlimited | Unlimited |
| Data sources | 1 | 5 | 25 | Unlimited |
| Retention | 7 days | 90 days | 1 year | Custom (3+ years) |
| **List price** | $0 | **$499/mo** | **$1,999/mo** | **Starting $8K/mo** |

## 2. Usage-Based Overages (metered, billed monthly)

- **Overage unit:** events processed beyond plan allotment.
- **Rate:** $0.50 per 1,000 events (Team), $0.35 (Business), $0.20 (Enterprise).
- **Hard cap:** 1.5× plan allotment → soft alert at 80%; auto-throttle at cap (Enterprise = never throttled, billed true-up).
- **Committed-use discount:** prepay $5K/yr usage credit → 20% off overage rate.

## 3. Annual Discount

| Term | Discount vs. monthly list |
|---|---|
| Annual, paid monthly | 15% |
| Annual, paid upfront | 20% |
| 2-year prepay | 25% |
| 3-year prepay (Enterprise only) | 30% + price-lock clause |

## 4. Support Tiers

| Tier | Response (Sev-1) | Channels | Included with |
|---|---|---|---|
| Standard | 8 biz hrs | Email, in-app | Team, Business |
| Premium | 2 hrs, 24/7 | + Phone, Slack Connect | Business (add $300/mo), Enterprise |
| White-Glove | 30 min, 24/7 | + Dedicated CSM, named TAM | Enterprise only |
| Onboarding fee | — | $0 (Team) / $2.5K (Business) / $15K (Enterprise implementation) |

## 5. Procurement Requirements (Enterprise gate)

- SSO/SAML, SCIM, audit logs (90+ days), SOC 2 Type II, HIPAA BAA optional (+12%), GDPR DPA, custom MSA, data residency (US/EU/APAC).
- Payment terms: Net 30; wire/ACH; PO required ≥$25K ACV.
- Procurement cycle target: 60–120 days; deal desk approves discounts >20%.
- Sales-led; no self-serve above Business tier.

## 6. Expansion Path

1. **Trial → Team:** triggered by 3+ seats invited or 50% query quota consumed.
2. **Team → Business:** >20 seats, multi-source, SLA need → CSM motion.
3. **Business → Enterprise:** >$50K ACV, SSO/SCIM request, custom retention.
4. **Land-and-expand:** usage overages >20% of ACV for 2 consecutive months → usage commit upsell.
5. **Cross-sell:** Embedded dashboards SKU (+30%), Data share API (+25%), AI insights add-on (+40%) on top of base.

## 7. Unit Economics (audit view, per dollar of ACV)

| Metric | Target | Note |
|---|---|---|
| Gross margin | **78%** | COGS: infra (35%), support (12%), onboarding amort. (5%) |
| CAC payback | **<14 mo** | S&M / (ACV × GM) |
| LTV : CAC | **3.5 : 1** | 30% gross churn, 110% net retention |
| Net Revenue Retention | **110–115%** | Seat + usage expansion, minus 8% logo churn |
| ARPA (Business) | ~$24K ARR | |
| ARPA (Enterprise) | ~$120K ARR | |

**Pricing risk flags**
- Usage volatility: cap soft-limits at 1.5× to protect margin; Enterprise commits include floor + ceiling bands.
- Discount governance: max 30% off list without CFO sign-off; deal desk approves multi-year.
- Procurement drag: offer "Enterprise Lite" ($4K/mo, annual only, fewer custom terms) to compress sales cycle 60→30 days.

**Bottom line:** Hybrid seat + usage model with annual prepay default; overages priced to monetize expansion without throttling growth; support and procurement features priced into Enterprise tier to cover white-glove cost-to-serve.
