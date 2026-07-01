**Subscription price-increase context:**
Audience: B2B SaaS subscribers across direct and store channels, US/EU/UK.
Source of truth: Billing system of record + signed MSAs/order forms. Risk boundary: protect net revenue, trust, and contract integrity over headline uplift.

**Channel rule matrix:**

| Channel | Notice/consent | Renewal/no-action outcome | Cancellation/refund route | Evidence to verify |
| --- | --- | --- | --- | --- |
| Direct billing | Email T-60 + T-30 + T-7; in-app banner at login; explicit consent required if region mandates | Renewal at new price on next term; no response = auto-roll at renewal date | In-product cancel; prorated refund policy; chargeback escalation | Contract ToS, region notice law, payment-retry config |
| App Store | Apple price-change flow; subscription-group notice | Platform notice controls; user no-action retains renewal at tier's effective price | Store-managed cancellation/refund; receipt signal via App Store Server Notification | Current App Store console guidance per territory |
| Google Play | Play base-plan/offer setup; user confirmation if base-plan price raised | RTDN signal; account-hold/grace per policy; no-action outcome per current rules | Play-managed refund; support macro | Current Play Console/API docs, RTDN verification |

Mark all store behavior `verify before rollout` until console evidence captured.

**Priority cohort matrix:**

| Cohort | Channel/region/renewal | Churn risk | Treatment | Guardrail |
| --- | --- | --- | --- | --- |
| Legacy annual contract | Direct; renewal in window | Low | Hold price through term; migrate at renewal with value narrative | Zero unilateral contract edits |
| Enterprise MSA | Direct; multi-year | Low | Amendment at renewal only | Account owner sign-off, Legal review |
| Monthly self-serve power user | Direct; rolling | Medium | Phased increase + annual migration offer (10–15% lock) | Annual-migration conversion ≥ 25% |
| Monthly self-serve low usage | Direct; rolling | High | One save offer (downgrade or 3-month pause) before raise | Save-offer eligibility gate |
| Grandfathered plan | Mixed | Medium | 90-day sunset notice; protected cohort for hardship/nonprofit | Pricing council approves size |
| Usage overage customer | Direct | Medium | Decouple base from overage; usage alert + plan upgrade | No surprise overage increase |
| Store-billed users | App Store/Play | Medium | Flow per channel matrix; channel-specific notice | Channel consent verifiable |

**Discount, contract, and exception matrix:**

| Segment | Current discount/contract | Treatment | Migration/exception | Approval |
| --- | --- | --- | --- | --- |
| Legacy discounted self-serve | Coupon, expires < term end | Preserve to term end, then migrate | Loyalty credit or annual lock | Growth/Pricing |
| Sales exception | Negotiated discount in CRM | No auto-change; manual review | Account-owner proposal | Sales/RevOps |
| Enterprise annual | MSA + notice clause | Renewal/amendment only | Contract re-negotiation | Account owner + Legal |
| Grandfathered | Protected cohort list | Phased sunset | Hardship/nonprofit shield | Pricing council |
| Usage overage | Overage bill risk | Base-only change; overage left | Plan upgrade, usage alerts | Product + Finance |
| Hardship/nonprofit/edu | Verified status | Protected or 0% increase | Manual exception logged | Support/Finance |

**Support and sales scripts:**

- Legacy annual "why did price change?" → explain renewal date and contract term; honor contract; offer renewal migration. Escalate non-standard pricing: Account owner.
- Monthly low-usage cancel threat → acknowledge fit; offer downgrade, pause, or annual lock; one save offer if eligible; cancel without friction. Threshold: Retention owner above 20% discount.
- Grandfathered sunset complaint → state sunset timeline, protected period, migration benefit; do not extend ad hoc. Threshold: Pricing council for extensions.
- Usage bill shock → separate base from overage; set usage alert; plan upgrade. Threshold: Finance/Product for credits above policy cap.
- Enterprise exception → route to account owner; no pricing promises in chat. Threshold: Sales/Legal for amendment.
- Post-notice refund/complaint → cite notice version and effective date; goodwill refund per policy; log reason code. Threshold: Support lead above published cap.

**Retention and trust plan:**

| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |
| Value narrative | Tie to shipped product gains, no exaggeration | Release notes, usage data | Trust erosion | Marketing + PMM |
| Notice cadence | T-60/T-30/T-7 + in-app | Open and consent rates | Surprise charges | Lifecycle |
| Grandfathering | Phase over 2 cycles | Cohort margin model | Margin leakage | Pricing council |
| Save offers | Eligibility-gated, expiring | Experiment vs. holdout | Churn training | Retention |
| Cancellation | One-click, no dark patterns | Recovery rate, sentiment | Trust damage | Product |
| Refunds | Policy version on every notice | Refund reason codes | Chargebacks | Support |
| Store channels | Block until console-verified | RTDN/SN evidence | Compliance gap | Billing |

**Rollback and mitigation triggers:**

- Logo churn / downgrade > threshold → pause next cohort; extend notice; add migration.
- Refunds / failed renewals / disputes spike → pause channel; audit notice; activate refund macro.
- Support volume or complaint sentiment > threshold → freeze noisy cohort; publish clarification.
- Sales exception budget overrun → stop self-serve automation; account-owner review.
- Net revenue (post-churn/refund/save/support) < control → rollback cohort or revise step.
- Store consent unverifiable → block channel until verified.

**Cohorts → guardrails:**

- Trigger: scope → policy: segment and source-of-truth; metric: 100% cohort coverage; edge: dormant accounts; support: outreach if >90 days inactive.
- Trigger: notice → policy: cadence + consent; metric: open/consent rate; edge: bounced email; support: resend and confirm.
- Trigger: renewal → policy: window sequencing; metric: renewal success; edge: failed payment; support: retry + macro.
- Trigger: cancellation → policy: transparent recovery; metric: save rate vs. control; edge: repeat threat; support: only one save offer.
- Trigger: refund → policy: published rule; metric: reason-code mix; edge: goodwill; support: lead approval.
- Trigger: churn → policy: cohort readback; metric: net revenue; edge: backlash; owner: Pricing + CS.
