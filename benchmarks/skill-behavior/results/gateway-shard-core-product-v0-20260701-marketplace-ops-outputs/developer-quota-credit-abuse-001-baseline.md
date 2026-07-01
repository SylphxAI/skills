## Developer Quota & Credit Abuse Controls Review

### 1. Primary Abuse Risks
| Risk | Example | Impact |
|---|---|---|
| Free-trial farming | Repeated accounts using disposable emails/payment methods | Direct compute loss |
| Promo-code abuse | Code sharing, stacking, resale | Marketing budget leakage |
| Expensive endpoint draining | Trial users invoking high-cost models/tools | Unbounded COGS |
| Token laundering | Multiple accounts routing workload through free credits | Revenue loss |
| Credential resale | Selling API keys from credited accounts | Abuse amplification |
| Automated signup | Bots mass-create accounts | Support and infrastructure burden |
| Chargeback / refund abuse | Paid upgrade then dispute | Financial loss |
| Evasion after ban | New identity after enforcement | Persistent abuse |

---

## 2. Recommended Control Model

### A. Account & Identity Controls
**Baseline requirements**
- Email verification required before API key issuance.
- Phone verification or payment method required before meaningful free credits unlock.
- Block disposable email domains and known risky MX providers.
- Device, browser, IP, ASN, payment, and behavioral fingerprinting.
- One free-credit grant per verified person, organization, payment method, and risk cluster.

**Multi-accounting controls**
- Detect shared:
  - IP / subnet / VPN / proxy / datacenter ASN
  - device fingerprint
  - payment instrument
  - phone number
  - billing address
  - GitHub / SSO identity
  - API usage patterns
- Link accounts into abuse clusters.
- Apply cluster-level quotas, not only account-level quotas.

**Decision**
- Free credits should not be purely email-based.
- Higher free-credit amounts should require stronger verification.

---

### B. Free Trial Credit Controls
**Recommended policy**
- Credits expire within 7–30 days.
- No cash value, non-transferable, non-refundable.
- Credits cannot be moved between accounts or organizations.
- Free credits restricted from the most expensive endpoints unless trust threshold is met.
- Daily and hourly burn caps apply even if remaining balance exists.

**Guardrails**
- Per-account maximum free-credit balance.
- Per-day max free-credit spend.
- Per-endpoint max trial spend.
- Automatic suspension when burn rate exceeds expected onboarding behavior.
- Require upgrade/payment verification for continued high-volume use.

**Example**
- Trial credit: $5–$20 equivalent.
- Daily trial burn cap: 20–40% of total grant.
- Expensive endpoint access: disabled by default or capped tightly.

---

### C. Promo Code Controls
**Controls**
- Promo codes must have:
  - campaign owner
  - issuance reason
  - expiration date
  - redemption limit
  - per-user redemption limit
  - allowed geography / segment if applicable
  - max credit value
- Prevent stacking of multiple promo codes unless explicitly approved.
- Bind codes to eligible account attributes where possible.
- Monitor redemption velocity and referral sources.
- Disable leaked codes quickly.

**High-risk patterns**
- Many redemptions from same IP range.
- New accounts redeeming the same code with no legitimate usage.
- Code used across unrelated geographies or disposable domains.

---

### D. Token Usage & Expensive Endpoint Controls
**Quotas should be enforced at multiple levels**
- Requests per minute.
- Tokens per minute.
- Tokens per day.
- Dollars per hour/day/month.
- Endpoint-specific limits.
- Organization-level aggregate limits.
- Cluster-level aggregate limits for linked accounts.

**Expensive endpoints**
- Require elevated trust tier.
- Use lower default limits.
- Add queueing or concurrency caps.
- Hard-stop spend when daily or monthly cap is reached.
- Notify users before cutoff when possible.

**Cost guardrails**
- Real-time metering.
- Prepaid or capped postpaid billing.
- Hard account spend limit configurable by customer.
- Internal emergency kill switch for runaway cost.
- Alerting on anomalous spend spikes.

---

## 3. Trust Tier Framework

| Tier | Requirements | Access |
|---|---|---|
| Tier 0 | Email verified only | Dashboard access, minimal API or none |
| Tier 1 | Phone or payment method verified | Small trial credits, basic endpoints |
| Tier 2 | Successful payment history / low-risk behavior | Higher quotas, broader model access |
| Tier 3 | Business verification / contractual customer | High quotas, expensive endpoints |
| Restricted | Abuse signals or policy violations | Reduced limits, review required |

**Promotion signals**
- Payment history.
- Low dispute rate.
- Stable usage.
- Legitimate app metadata.
- No linked abusive accounts.

**Demotion signals**
- Rapid credit burn.
- Proxy/VPN usage at signup.
- Repeated failed payments.
- Similarity to banned accounts.
- Credential sharing indicators.

---

## 4. Throttling & Enforcement

**Graduated response**
1. Soft warning.
2. Temporary throttle.
3. Disable free-credit use.
4. Require verification/payment.
5. Suspend API keys.
6. Account or cluster ban.
7. Manual review for appealable cases.

**Immediate enforcement triggers**
- Automated signup clusters.
- Known disposable identity infrastructure.
- Key resale evidence.
- Fraudulent payment or chargeback.
- Attempts to bypass limits.
- Safety or policy abuse.

**Important**
- Enforcement should be explainable internally.
- Avoid revealing exact abuse-detection thresholds externally.

---

## 5. Manual Review & Appeals

### Review queue inputs
- High spend velocity.
- Linked-account clusters.
- Promo-code anomaly.
- Expensive endpoint spikes.
- Customer appeal.
- False-positive reports.

### Reviewer checklist
- Account age and verification.
- Payment status and disputes.
- Signup IP / ASN risk.
- Linked accounts.
- Usage purpose and endpoint mix.
- Prior enforcement history.
- Support interactions.
- Business legitimacy evidence.

### Outcomes
- Reinstate.
- Reinstate with lower limits.
- Require verification.
- Remove promotional credits.
- Deny appeal.
- Escalate to fraud/security/legal.

### Appeal standards
- Provide a clear path to appeal.
- Request documentation only when necessary.
- Maintain audit trail of reviewer, evidence, and decision.
- Target SLA: 2–5 business days depending on severity.

---

## 6. Support Messaging

### Suspension / throttle notice
> Your account activity triggered our abuse-prevention systems, so API access or promotional-credit usage has been temporarily limited. If you believe this is an error, you may appeal by providing details about your use case, organization, and expected usage volume.

### Promo credit removal
> Promotional credits were removed because redemption or usage did not meet the campaign eligibility requirements. Paid usage remains available subject to standard billing and policy requirements.

### Verification request
> To continue using trial credits or higher-capacity endpoints, please complete additional verification. This helps protect platform resources and prevent abuse.

**Messaging principles**
- Be specific enough to be useful.
- Do not disclose detection thresholds, fingerprints, or evasion signals.
- Separate billing failures from abuse findings.
- Keep tone neutral and non-accusatory.

---

## 7. Monitoring & Audit Metrics

Track:
- Free-credit cost per activated developer.
- % trial users converting to paid.
- Promo-code redemption anomaly rate.
- Credits consumed by suspended accounts.
- Abuse loss by endpoint/model.
- False-positive appeal rate.
- Manual review SLA.
- Chargeback rate.
- Linked-account cluster size distribution.
- Spend prevented by throttles/caps.

---

## 8. Key Policy Decisions

1. Free credits require verified identity beyond email for meaningful API access.
2. Expensive endpoints are not fully available to low-trust trial accounts.
3. Quotas apply by account, organization, endpoint, and linked-account cluster.
4. Promo codes are campaign-scoped, non-stackable by default, and revocable.
5. Spend caps are enforced in real time with hard stops.
6. Appeals are available, but abuse-detection logic remains confidential.
7. Trust tiers determine credit access, endpoint access, and quota ceilings.
