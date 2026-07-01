## Notification Strategy Review — Subscription Productivity App

### 1. Core Principles
- **User value first:** Send notifications only when they help users preserve progress, avoid disruption, recover access, or get meaningful value from the product.
- **Lifecycle-aware:** Messaging should change based on onboarding status, trial state, subscription status, payment state, engagement, and notification permissions.
- **Channel hierarchy:** Prefer in-app and email for non-urgent messages; use push for timely, high-value events.
- **Respect user control:** Provide granular preferences, quiet hours, digest mode, and easy opt-out.
- **Compliance-sensitive:** Renewal, trial, and billing messages must be accurate, timely, and legally compliant by region and platform policy.

---

## 2. Notification Lifecycle Matrix

| Moment | Goal | Channel | Timing | Notes |
|---|---|---:|---|---|
| Onboarding permission ask | Secure push permission with context | In-app pre-prompt → OS prompt | After user experiences value | Do not ask on first launch unless needed |
| Trial started | Confirm benefits and next steps | Email + in-app | Immediately | Include trial length, renewal date, price if required |
| Trial activation nudges | Drive habit formation | Push/in-app/email | Day 1–3, based on inactivity | Focus on unfinished setup or first productivity win |
| Trial expiry reminder | Prevent surprise billing or churn | Email + push/in-app | Typically 7 days and 1–2 days before expiry | Include expiry/renewal date, price, cancellation path where required |
| Subscription renewal reminder | Transparency and trust | Email, optionally push | Based on billing cycle and legal requirements | Required in many jurisdictions for annual/long trials |
| Successful renewal | Reassure continuity | Email/in-app | At renewal | Push usually unnecessary unless user expects confirmation |
| Failed payment | Recover revenue and access | Email + in-app + push if permitted | Immediately, then spaced retries | Clear CTA to update payment; avoid blame language |
| Grace period warning | Prevent service interruption | Email + push/in-app | Mid-grace and before cutoff | Be specific about loss of access/features |
| Cancellation confirmation | Reduce confusion | Email + in-app | Immediately | Confirm access end date; offer feedback |
| Win-back | Reactivate lapsed users | Email, in-app if returning, push only if opted in | 7–30+ days after churn | Offer relevant value, not generic discounts only |
| Long inactivity | Re-engagement | Digest/email/push | After meaningful inactivity threshold | Tie to saved projects, goals, streaks, or missed productivity value |

---

## 3. Onboarding Permission Ask

### Recommended Flow
1. **Delay OS permission prompt** until the user completes a meaningful action, e.g. creates first task, schedules focus session, or sets a goal.
2. Show a **pre-permission screen** explaining the value:
   - “Get reminders for your planned focus sessions and task deadlines.”
   - “We’ll only send important productivity updates.”
3. If user accepts, trigger OS prompt.
4. If user declines pre-prompt, do not trigger OS prompt; offer later from settings or when enabling a notification-dependent feature.

### Avoid
- Asking on first launch without context.
- Framing as mandatory unless notifications are essential.
- Repeated prompts after denial.

---

## 4. Trial Expiry and Renewal Reminders

### Trial Expiry
- Send at least one reminder before automatic conversion.
- Recommended cadence:
  - **7 days before expiry** for longer trials.
  - **24–48 hours before expiry**.
  - Optional same-day in-app banner.
- Message must include:
  - Trial end date.
  - Renewal price and billing period.
  - What happens next.
  - Manage/cancel subscription link where applicable.

### Renewal
- For monthly plans: avoid excessive push reminders unless required or high-value.
- For annual/high-value plans: send advance reminder.
- Ensure regional compliance for auto-renewal laws.

---

## 5. Failed Payment Recovery

### Cadence
- Immediate: “Payment issue — update to keep access.”
- Day 2–3: Reminder with grace period info.
- Day 5–7: Final warning before downgrade/suspension.
- Post-suspension: Recovery CTA.

### Tone
- Helpful and neutral.
- Avoid shame or urgency manipulation.
- Mention access impact clearly.

### Channels
- Email is primary.
- In-app banner for active users.
- Push only for active users who opted in and where payment recovery is appropriate.

---

## 6. Win-Back Campaigns

### Segmentation
- Canceled during trial.
- Canceled paid subscription.
- Inactive but still subscribed.
- Payment-failed churn.
- Permission-denied users.

### Messaging
- Highlight new features, recovered value, unfinished goals, or personal productivity insights.
- Use discounts selectively; do not train users to churn for offers.
- Suppress win-back if user explicitly requested no marketing.

### Cadence
- 1st message: 7–14 days after churn.
- 2nd: 30 days.
- Optional later seasonal/product update campaign.
- Cap frequency aggressively.

---

## 7. Quiet Hours, Digest Mode, and Fatigue Controls

### Quiet Hours
- Default: no non-critical push during local **9pm–8am**.
- Respect user-configured quiet hours.
- Critical exceptions: payment cutoff, account/security, user-created reminders if explicitly scheduled.

### Digest Mode
Offer digest options:
- Daily productivity summary.
- Weekly progress review.
- Upcoming deadlines/tasks.
- Missed activity recap.

Digest mode should replace low-priority pushes, not add more volume.

### Fatigue Rules
- Global push cap: e.g. max **1–2 marketing/re-engagement pushes per week**.
- Lifecycle transactional messages excluded but still spaced reasonably.
- Suppress nudges if user recently dismissed, ignored, or disabled notifications.
- Stop repeated reminders once user completes target action.

---

## 8. Opt-Out Recovery and Preference Center

### Preference Center
Provide granular controls:
- Task reminders.
- Focus/session reminders.
- Trial and billing notices.
- Product updates.
- Promotional offers.
- Digest frequency.
- Quiet hours.

### Opt-Out Recovery
- Do not dark-pattern users back into push.
- Use in-app education when user tries to enable a notification-dependent feature:
  - “To remind you before focus sessions, enable notifications.”
- For OS-level push denial, provide a deep link to system settings where supported.
- Continue using email/in-app for essential account and billing notices where legally permitted.

---

## 9. Platform Permission Denial Handling

If OS push permission is denied:
- Record status: not determined, provisional, denied, authorized.
- Do not repeatedly trigger prompts.
- Show contextual in-app prompts only when relevant.
- Use alternative channels:
  - In-app banners.
  - Email.
  - Calendar integration.
  - Widgets or badges where supported.
- Avoid labeling the app experience as broken; explain specific missed benefits.

---

## 10. Measurement and Governance

### Key Metrics
- Permission opt-in rate after pre-prompt.
- Push open/action rate.
- Trial-to-paid conversion.
- Renewal retention.
- Failed-payment recovery rate.
- Unsubscribe/disable rate.
- Notification-driven churn.
- Complaint/spam rate.
- Digest adoption.
- Quiet-hours violations.

### Governance
- Maintain a notification inventory with owner, trigger, audience, channel, frequency cap, and legal basis.
- A/B test copy and timing, but not compliance-critical disclosures.
- Review monthly for fatigue, opt-outs, and low-performing notifications.
- Require approval for any new push campaign targeting broad audiences.

---

## Priority Recommendations
1. Use **contextual onboarding permission ask**, not first-launch OS prompt.
2. Treat **trial expiry, renewal, and payment messages as trust-critical**, with clear dates, prices, and actions.
3. Implement **quiet hours, digest mode, and global frequency caps** before scaling campaigns.
4. Build a **granular preference center** and respect opt-outs.
5. Use push sparingly for win-back; prioritize relevance and suppression rules.
