# Notification Policy — Fintech-Family Subscription App

## 1. Notification Taxonomy

| Code | Category | Subtype | Default Severity | Channels (default) | Minor-safe copy? | Quiet-hours honored | Evidence artifact |
|---|---|---|---|---|---|---|---|
| **AUTH-A1** | Security | New device login | Critical | Push, Email, SMS | Yes | No (always sent) | Login audit hash |
| **AUTH-A2** | Security | Password reset / MFA change | Critical | Push, Email, SMS | Yes | No | Event ID + device fingerprint |
| **AUTH-A3** | Security | Suspicious transaction block | Critical | Push, SMS, In-app | Yes | No | Case token, masked amount/merchant |
| **TXN-R1** | Refund/Support | Refund approved/denied | High | Push, Email, In-app | Yes | Yes (≥21:00) | Ticket ID, masked amount |
| **TXN-R2** | Refund/Support | Support reply / new message | Medium | Push, Email, In-app | Yes | Yes | Ticket ID only |
| **BIL-B1** | Billing | Payment due (T-3d) | Medium | Push, Email, In-app | Yes | Yes | Last4 + amount |
| **BIL-B2** | Billing | Payment failed | High | Push, SMS, Email | Yes | No | Failure code + masked amount |
| **BIL-B3** | Billing | Subscription renewed | Low | In-app, Email | Yes | Yes | Plan + masked amount |
| **FAM-F1** | Family | Minor spend request | High | Push, In-app (parent only) | N/A — parent-only | No (immediate) | Request ID, masked merchant |
| **FAM-F2** | Family | Minor spend approved/declined | High | Push, In-app (parent + minor) | Yes (templated) | No | Decision record |
| **FAM-F3** | Family | Parental control change | High | Email + In-app (both parents) | Yes | No | Change summary hash |
| **SAF-S1** | Safety | Card-used near unusual geo | High | Push, SMS | Yes | No | Distance band, masked merchant |
| **SAF-S2** | Safety | Card left behind / lost-and-found | Medium | Push, Email | Yes | No | Time/zone only, no coords |
| **EDU-E1** | Education | Feature tip / lesson | Low | In-app, Email (digest) | Yes | Yes | None |
| **PRM-P1** | Promotional | Offer / upsell | Low | In-app, Email | Yes | Yes | None |

**Channel routing rules:**
- **Critical (AUTH-*) → all 3 outbound channels**, SMS mandatory if push unacknowledged >2 min.
- **High → push + email**, SMS only if no push ack within 5 min.
- **Medium/Low → in-app inbox by default**; outbound channels require explicit opt-in per category.
- **Minor-initiated events** route to the verified parent account holder only; minor sees a templated, non-sensitive confirmation.

---

## 2. Privacy / Redaction Policy

**Field classification:**
- **Restricted (never in payload):** full PAN, CVV, full account number, SSN, biometrics, raw GPS coords, full email/phone of other family members, free-text support body.
- **Masked (allowed):** PAN last4, amount band (e.g., "$XX–$XX"), merchant category, city/zone (≥1 km grid), relative time ("2 min ago").
- **Safe (allowed verbatim):** product names, ticket IDs, plan names, templated copy.

**Redaction matrix by channel:**
| Channel | Restricted | Masked | Safe |
|---|---|---|---|
| SMS | Stripped | Banded only | Allowed |
| Push title | Stripped | Allowed | Allowed |
| Push body | Stripped | Banded | Allowed |
| Email | Stripped | Allowed | Allowed |
| In-app inbox | Behind PIN/biometric + role gate | Allowed | Allowed |

**Shared-device mitigation:** In-app inbox requires device-scoped biometric or 6-digit PIN; minors see only their own category (FAM-F2, EDU-E1); parents see full inbox. Push payloads contain no account identifiers beyond a category hint; deep links require re-auth.

**Support evidence handoff:** When a user opens a ticket from a notification, the system passes a **scoped, short-lived evidence token** (JWT, ≤15 min) containing only: notification ID, category, timestamp, masked merchant/amount, and server-side audit hash. Support agents see **redacted views** by default; full unmasking requires dual-control approval (agent + supervisor) and is logged.

**Retention:** Notification payload 30 days; audit hash 7 years; raw events never sent to client beyond what redaction permits.

---

## 3. Consent Model

**Consent objects (per user, per category):**
1. `critical_security` — **implied, non-revocable** while account exists (regulatory).
2. `transactional` — **implied at signup**, channel-level opt-in (SMS is a sub-consent per TCPA/equivalent).
3. `family_activity` — **explicit, per relationship**; both adult parties and verified guardian for minors; re-prompted annually.
4. `location_safety` — **explicit, granular**; consent is per feature (geo-alerts vs. lost-and-found) and revocable without losing card function.
5. `education` — **opt-in default**, weekly digest cap.
6. `promotional` — **opt-in only**, double opt-in for SMS, easy one-tap unsubscribe in every message.

**Minor-specific rules:**
- No promotional or third-party marketing to <16.
- Education only; frequency ≤2/week; quiet-hours enforced 21:00–08:00 local.
- Minor consent cannot authorize commercial data sharing.
- Family activity consent captured from a **verified adult guardian**; revocable from parent dashboard.

**Consent receipts:** Every opt-in/opt-out generates a signed receipt (timestamp, version, channel, scope) viewable by the user and exportable.

---

## 4. Trust Metrics (monthly, audit-exportable)

| Metric | Target | Source |
|---|---|---|
| Notification opt-out rate (per category) | ≤8% non-critical | Telemetry |
| Critical alert delivery (push+SMS, <60s) | ≥99.5% | Carrier + push logs |
| False-positive security alerts | ≤5% of AUTH-* | User feedback + case review |
| Redaction compliance (sensitive fields leaked in payload) | 0 / 1M | Automated scanner |
| Minor-safe copy violations | 0 | NLP classifier review |
| Support evidence dual-control adherence | 100% | Access logs |
| Quiet-hours violation rate | ≤0.1% | Scheduler audit |
| Consent-receipt completeness | 100% | Consent store |
| Time-to-resolution for security notifications (median) | ≤15 min | Ticketing |
| Channel-mix cost-per-notified-user | Within ±10% plan | Finance |

**Governance:** Quarterly review of taxonomy, redacted-but-decisionable for every incident ≥High severity; publish an internal trust report; minors-only sub-report reviewed by a designated child-safety officer.
