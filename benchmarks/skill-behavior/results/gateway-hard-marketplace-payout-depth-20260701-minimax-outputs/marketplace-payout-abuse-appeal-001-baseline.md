# Creator Marketplace Payout Policy & Anti-Fraud Framework

**Version:** v2.4 | **Owner:** Trust & Risk | **Scope:** All seller payouts, refunds, reviews

---

## 1. Payout Hold Policy

| Trigger | Auto-Hold | Hold Duration | Escalation |
|---|---|---|---|
| New seller (<90 days, <$2K GMV) | All payouts | Rolling 14-day reserve | Manual review if spike |
| Refund rate >8% (30-day) | Next 2 payouts | 30 days | Tier-2 review |
| Self-purchase / circular payment signal | Immediate | 90 days | Trust investigation |
| Review manipulation (burst, dup IPs, paid signal) | Immediate | 60 days | Tier-2 |
| Cross-account shared payment instrument | Account-level freeze | 180 days | Trust lead |
| Threshold farming (repeated near-miss payouts) | Next 3 payouts | 45 days | Tier-1 |
| Legitimate launch winner | None — exempt if KYC+tax verified and <2 flags | — | — |

**Rule:** Any **2+ concurrent signals** = automatic Tier-2 case; **3+** = account-level reserve until cleared.

---

## 2. Fraud Evidence Packet (per case)

Required artifacts before reserve/release decision:

1. **Transaction graph** — buyer↔seller clusters, shared payment fingerprints, circular flows
2. **Refund timeline** — cohort vs. seller baseline; spike magnitude & window
3. **Review signals** — velocity, IP/device hash overlap, sentiment anomalies, reviewer history
4. **Payout pattern** — threshold-proximity attempts, cash-out timing vs. refund timing
5. **Account linkage** — device fingerprint, withdrawal destination, email/phone graph
6. **Policy citation** — which clauses were violated, with timestamps
7. **Counter-evidence** — legitimate explainers (ad campaign, viral post, promo code)

Packet must be **reproducible** (re-runnable query IDs) and **exportable** for legal handoff.

---

## 3. Reserve & Release Criteria

**Reserve tiers:**
- **Soft reserve (14d):** New sellers, minor signals → release on clean cycle
- **Hard reserve (60–90d):** Confirmed pattern → release on reinvestment proof or after review window
- **Full reserve (180d):** Multi-vector fraud → release only via written claim with identity re-verification

**Release criteria (all must hold):**
- Refund rate ≤ category median for 2 consecutive 30-day windows
- No new manipulation signals in hold period
- Reinvestment ratio ≥ 40% of held funds (platform re-spend on ads, tools, refunds)
- KYC and tax info current
- For launch winners: documented marketing/PR evidence

**Confiscation rule:** Confirmed fraud funds → **clawback before next payout cycle**; remainder held for 180 days minimum.

---

## 4. Appeal Workflow

| Stage | SLA | Owner | Output |
|---|---|---|---|
| Tier-1 auto-response | 24h | Bot + macros | Acknowledge, list evidence IDs |
| Tier-2 human review | 5 business days | Trust analyst | Provisional ruling |
| Trust-lead review | 10 business days | Trust lead | Final ruling |
| Executive escalation | 15 business days | Risk committee | Binding decision |

**Angry-appeal routing:** Tickets tagged `appeal+angry` auto-prioritized; SLA clock pauses for evidence requests; **decision must cite packet sections** seller can address.

---

## 5. Seller Messaging Templates

- **Hold notification:** Plain-language trigger + link to evidence summary + appeal CTA
- **Evidence request:** Specific items needed + 7-day response window
- **Ruling (upheld):** Cite violated clauses, release date, appeal escalation path
- **Ruling (overturned):** Release ETA, remediation steps, no-fault acknowledgement
- **Proactive update:** Every 14 days during hold; silence is a violation

Templates **must not** disclose other sellers' data or detection algorithm details.

---

## 6. Reviewer QA

- **Dual-review rule:** All Tier-2+ reserves require 2 analysts; disagreement → lead
- **Weekly calibration:** 5 sampled cases reviewed against rubric; track inter-rater agreement (κ ≥ 0.7)
- **Bias guard:** Launch winners and top-1% sellers get random sampling, not skip
- **Audit log:** Every decision stores reviewer ID, packet hash, rationale (≥2 sentences)
- **Reverse review:** Quarterly — overturned cases audited for false-positive root cause

---

## 7. Marketplace Health Metrics

| Metric | Target | Cadence |
|---|---|---|
| Net fraud GMV rate | <0.3% | Weekly |
| False-positive hold rate | <2% of holds | Monthly |
| Appeal overturn rate | <15% | Monthly |
| Median hold resolution | ≤10 business days | Weekly |
| Repeat-offender rate | <5% | Quarterly |
| Legitimate-launch flag rate | <0.5% | Monthly |

**Reporting:** Weekly trust dashboard to leadership; monthly transparency report to top sellers (aggregate only).

---

**Approval:** Trust Lead, Risk Committee, Legal sign-off required for policy changes. All hold/release decisions logged immutably for 7 years.
