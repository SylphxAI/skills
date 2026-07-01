## B2B Analytics SaaS Pricing Model

### Packaging Goals
- Land with low-friction team adoption.
- Monetize by seats and analytics consumption.
- Create clear expansion path to Enterprise.
- Protect gross margin through overages, support boundaries, and contract minimums.

---

# 1. Plans and Pricing

| Plan | Target Customer | Price | Seat Limit | Included Usage | Best For |
|---|---:|---:|---:|---:|---|
| Free Trial | Evaluators | Free for 14 days | Up to 5 seats | 100K events or 10 GB processed | Product validation |
| Team | SMB / department teams | $999/month, billed monthly or annually | Includes 10 seats | 5M events/month or 250 GB processed | Small analytics teams |
| Enterprise | Large orgs / regulated buyers | Starts at $36,000/year | Includes 50 seats | 50M events/month or 2.5 TB processed | Multi-team deployment |

### Annual Discount
- Monthly Team: **$999/month**
- Annual Team: **$9,990/year**  
  - Equivalent to 2 months free / ~17% discount.
- Enterprise: annual-only by default.
- Multi-year Enterprise discount:
  - 2-year: 5% discount
  - 3-year: 10% discount
  - Discount contingent on upfront annual payment or committed billing schedule.

---

# 2. Free Trial

### Trial Terms
- 14-day free trial.
- No credit card required for self-serve trial.
- Trial includes:
  - 5 seats
  - 100K events or 10 GB processed
  - Standard connectors only
  - Sample dashboards
  - Email support only
- Trial excludes:
  - SSO/SAML
  - Custom integrations
  - Production SLA
  - Data residency commitments
  - Security reviews beyond standard documentation

### Conversion Path
- Trial converts to Team plan.
- If customer exceeds trial usage or requires procurement/security review, route to sales-assisted Team or Enterprise.

---

# 3. Seat Model

### Seat Types
| Seat Type | Description | Pricing |
|---|---|---:|
| Admin | Full configuration and billing access | Paid seat |
| Analyst | Full dashboard, query, export, and model access | Paid seat |
| Viewer | View-only dashboard access | Included up to plan limit or discounted |
| Service Account | API / integration user | Counts as paid seat unless Enterprise-negotiated |

### Included Seats
- Team: 10 paid seats included.
- Enterprise: 50 paid seats included.

### Additional Seats
- Team: $79/user/month.
- Enterprise: $60–$100/user/month depending on volume and contract.

### Seat Limits
- Team maximum: 25 total paid seats.
- Enterprise required above 25 seats or for org-wide deployment.

---

# 4. Usage-Based Overage Model

Usage should be based on the most margin-correlated metric. Recommended primary billing metric:

**Events processed per month**, with GB processed as a fallback metric for high-volume data customers.

### Included Usage
| Plan | Included Events | Included Data Processed |
|---|---:|---:|
| Trial | 100K events/month | 10 GB |
| Team | 5M events/month | 250 GB |
| Enterprise | 50M events/month | 2.5 TB |

### Overage Pricing
| Plan | Event Overage | Data Overage |
|---|---:|---:|
| Team | $15 per additional 100K events | $30 per additional 10 GB |
| Enterprise | $8–$12 per additional 100K events | $15–$25 per additional 10 GB |

### Overage Rules
- Customer is charged on the greater of event overage or data overage, not both.
- 10% monthly burst allowance included.
- Overage billed monthly in arrears.
- Enterprise customers may pre-purchase usage blocks at discounted committed rates.
- Usage alerts at 50%, 80%, 100%, and 120%.

---

# 5. Feature Packaging

| Feature | Free Trial | Team | Enterprise |
|---|---|---|---|
| Standard dashboards | Yes | Yes | Yes |
| Custom dashboards | Limited | Yes | Yes |
| Data connectors | Standard only | Standard + selected premium | All + custom |
| API access | Limited | Yes | Higher limits |
| Scheduled reports | Limited | Yes | Yes |
| Role-based access control | Basic | Standard | Advanced |
| SSO/SAML | No | Add-on | Included |
| Audit logs | No | 30 days | 1+ year |
| Data retention | 14 days | 12 months | 24+ months |
| Data residency | No | No | Available |
| SLA | No | No formal SLA | 99.9% SLA |
| Sandbox environment | No | Add-on | Available |
| Dedicated CSM | No | No | Included based on ACV |

---

# 6. Support Tiers

| Support Tier | Included In | Response Target | Channels |
|---|---|---:|---|
| Basic | Trial | 2 business days | Email |
| Standard | Team | 1 business day | Email + chat |
| Premium | Enterprise <$75K ARR | 8 business hours | Email + chat + shared Slack/Teams optional |
| Strategic | Enterprise $75K+ ARR | 4 business hours | Named CSM, QBRs, escalation path |

### Paid Support Add-On
- Premium Support for Team: $500/month.
- Strategic Support add-on: 15% of annual contract value, minimum $12K/year.

---

# 7. Procurement and Contract Requirements

### Team Plan
- Self-serve or sales-assisted.
- Credit card or ACH.
- Standard online terms.
- No redlines below $12K ARR.
- Security packet available:
  - SOC 2 report or roadmap
  - DPA
  - Subprocessor list
  - Standard security questionnaire responses

### Enterprise Plan
Required for any of:
- More than 25 seats.
- SSO/SAML requirement.
- Custom MSA or DPA.
- Security/legal review.
- Data residency requirement.
- Custom retention period.
- SLA requirement.
- HIPAA, FINRA, GDPR-heavy, or regulated use case.
- Invoice billing / purchase order requirement.
- Annual contract value above $25K.

### Enterprise Procurement Terms
- Annual contract minimum: $36K.
- Net 30 payment terms standard.
- PO required if customer process mandates it.
- Redlines allowed for contracts above $50K ARR.
- Vendor onboarding supported.
- Security review supported for qualified opportunities.
- Mutual NDA available.

---

# 8. Expansion Path

### Natural Upgrade Triggers
Move from Trial to Team when:
- More than 5 seats needed.
- Production data connected.
- Scheduled reporting required.
- Usage exceeds trial cap.

Move from Team to Enterprise when:
- More than 25 seats.
- Usage consistently exceeds 10M events/month.
- SSO, audit logs, SLA, or advanced RBAC required.
- Multiple departments need access.
- Customer requires procurement/legal/security review.
- Custom integrations or data residency required.

### Expansion Motions
- Add seats.
- Add event/data usage blocks.
- Add premium connectors.
- Add SSO/SAML.
- Add longer retention.
- Add premium support.
- Add additional workspaces/business units.
- Convert department contract to enterprise-wide agreement.

---

# 9. Unit Economics Guardrails

### Target Metrics
| Metric | Target |
|---|---:|
| Gross margin | 75–85% |
| CAC payback | <12 months for Team, <18 months for Enterprise |
| Net revenue retention | 115%+ |
| Logo retention | 85%+ SMB, 90%+ Enterprise |
| Support cost as % of ARR | <10% |
| Cloud/data processing COGS | <15–20% of ARR |
| Discount ceiling | 20% without executive approval |

### Pricing Guardrails
- Do not offer unlimited data processing.
- Usage overages must cover cloud compute, storage, and support load.
- Enterprise contracts must include committed usage or overage terms.
- Heavy API, export, or refresh workloads require throttling or usage-based pricing.
- Custom integrations require paid professional services or Enterprise minimum.
- Below $25K ARR, avoid custom legal terms and complex procurement.
- Below $50K ARR, avoid bespoke security, data residency, or custom SLAs.
- Annual discounts should not exceed margin improvement from upfront/committed billing.
- Discounts should be exchanged for:
  - Annual prepay
  - Multi-year term
  - Larger seat commitment
  - Public reference
  - Reduced support/legal burden

---

# 10. Recommended Add-Ons

| Add-On | Price |
|---|---:|
| SSO/SAML for Team | $300/month |
| Premium connector | $200–$1,000/month |
| Extra workspace | $250/month |
| Additional data retention | $100/month per extra 6 months |
| Sandbox environment | $500/month |
| Professional services | $200–$300/hour or fixed-scope package |
| Onboarding package | $2,500–$10,000 one-time |

---

# 11. Summary Recommendation

Use **Team at $999/month** as the primary land motion and **Enterprise starting at $36K/year** for procurement-heavy, security-sensitive, or multi-team customers. Charge for both seats and usage, include a clear annual discount, and avoid unlimited consumption. Expansion should come from additional seats, higher usage, premium integrations, support, retention, and enterprise controls.
