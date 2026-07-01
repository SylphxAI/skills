# Notification Incident — Recovery Decision & Future Policy

**App:** Subscription product (trial → paid → lapsed lifecycle)
**Channels in scope:** Push, Email, In-app, SMS
**Messages in scope:** Trial-ending, Renewal-reminder, Failed-payment, Win-back
**Severity:** High (user complaints, regulatory exposure on quiet-hours, support load)

---

## 1. Incident Summary

Same users received overlapping transactional + marketing messages across 4 channels, with no deduplication, no suppression for paying/support-contacted users, and no local quiet-hours enforcement. CTR remained high (campaign kept on), but complaint rate and unsubscribe rate spiked.

---

## 2. Root Causes (audit findings)

| # | Root cause | Evidence |
|---|---|---|
| R1 | No cross-channel dedup key (user_id × topic × day) | Duplicate payloads logged within <1 min |
| R2 | Eligibility not filtered against billing/support state | Users with active sub or open ticket received "trial ending" |
| R3 | Quiet-hours rule hard-coded to a single TZ (UTC) | Complaints concentrated in APAC & EU evening windows |
| R4 | No frequency cap per user per channel | Up to 6 messages/day observed |
| R5 | SMS used as fallback for non-transactional (win-back) | Violates internal SMS policy & TCPA/CTIA norms |
| R6 | Marketing team has unilateral send authority | No lifecycle owner review/approval |
| R7 | "High CTR" used as sole guardrail | Vanity metric; ignores complaint + opt-out rate |

---

## 3. Recovery Decision (T+0 to T+72h)

**Containment — execute now:**

1. **Pause** all non-transactional (win-back, trial-up-sell) sends across **all channels** until gating in §4 ships. **Keep** only:
   - Failed-payment retry notice (transactional, payment-required)
   - Account/access/security notices
2. **Suppress** all queued messages for users meeting **any** of these:
   - Active paid subscription (billing state = `active` or `grace`)
   - Open support ticket on the same topic (tier ≥ P3 or <48h old)
   - Opted out of channel (per-channel, per-topic)
   - Contacted support about notifications in last 30 days
3. **Send apology + correction email** (≤1 send) acknowledging duplicate/after-hours messages; offer one-click channel preferences and a $0/credit where policy requires.
4. **Reset frequency counters** to zero for all suppressed users.
5. **Freeze new campaigns** until policy §4 is implemented and signed off by Lifecycle Lead + Legal + Engineering.

**Communication:**
- Support macro published for refund/credit handling.
- Trust & Safety log entry with user-counts, channels affected, and suppression outcomes.
- Notify Legal (TCPA/CAN-SPAM/GDPR review window).

**Exit criteria to re-enable marketing sends:**
- Dedup service deployed (R1)
- Quiet-hours service deployed (R3)
- Frequency cap deployed (R4)
- Eligibility filter wired to billing + support (R2)
- Lifecycle owner sign-off on campaign taxonomy

---

## 4. Future Policy (going-forward)

### 4.1 Message taxonomy & rules

| Type | Channel allow-list | Eligible audience | Max/user/day | Quiet-hours required | Approval |
|---|---|---|---|---|---|
| Transactional (failed-payment, access) | Email + Push + SMS | All users in matching state | 3 | Yes | Auto |
| Renewal reminder | Email + Push | `active` w/ renewal in 72h | 2 | Yes | Auto |
| Trial ending | Email + Push + In-app | `trialing`, not converted | 2 | Yes | Auto |
| Win-back | Email + Push + In-app | `lapsed` ≥7d, no suppression | 1 | Yes | Lifecycle Lead |

**SMS rule:** SMS is **transactional-only**. Win-back and renewal via SMS are prohibited.

### 4.2 Dedup & suppression (hard requirements)

- **Dedup key:** `user_id × topic × channel_group × 24h`. Channel group = {push, email, in-app, sms}. Same topic within window → suppressed.
- **Cross-topic dedup:** If 2+ topics eligible same day, prefer the one with highest business priority (transactional > renewal > trial > win-back); keep one **summary** message per channel where possible.
- **Suppression flags:**
  - Billing state (`active`, `grace`, `trial`, `lapsed`, `refunded`)
  - Support contact ≤30 days on same topic
  - Per-channel opt-out
  - Recent complaint in ≤60 days
  - Delivered-but-errored last 7 days (avoid hammering)

### 4.3 Quiet-hours & timezone

- User-level quiet hours default to **22:00–08:00 local**, derived from `user.timezone` (fallback to Geo-IP).
- Transactional security/access messages may override, but **logged** for review.
- Win-back may **not** override.

### 4.4 Frequency caps

| Channel | Cap/user/day | Cap/user/week |
|---|---|---|
| Push | 2 | 6 |
| Email | 1 | 4 |
| In-app | 1 | 5 |
| SMS | 1 (transactional only) | 2 |

### 4.5 Authority & governance

- **Lifecycle Owner** owns taxonomy, eligibility, caps, quiet-hours. **Marketing** may propose campaigns but **cannot** self-launch.
- Every campaign requires: audience eligibility proof, channel allow-list match, suppression justification, frequency-cap check.
- **Legal review** mandatory if SMS used or audience includes EU/UK/CA minors.

### 4.6 KPIs (replace CTR-only dashboard)

| KPI | Target |
|---|---|
| Complaint rate | < 0.05% |
| Channel opt-out rate | < 0.1% |
| Duplicate-message rate | < 0.5% |
| Quiet-hour violation rate | 0 |
| Support contacts / notification | trending down |

**Hard stop rule:** any KPI breach ×2 weeks → auto-pause campaigns and root-cause review.

---

## 5. Sign-off Required

Lifecycle Lead • Engineering (notifications platform) • Legal • Support Operations • Trust & Safety.

---
**Decision:** Pause non-transactional sends now; deploy suppression+d+QH+caps within 72h; resume marketing only when all gating checks pass and policy §4 is enforced. CTR is not a sufficient success metric.
