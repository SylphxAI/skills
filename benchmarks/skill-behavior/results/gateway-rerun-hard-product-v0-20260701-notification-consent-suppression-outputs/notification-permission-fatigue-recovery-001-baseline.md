## Notification Strategy Review — Subscription Productivity App

### 1. Guiding Principles
- **User value first:** Notify only when the message helps the user complete onboarding, avoid loss of access, recover payment, or regain productivity value.
- **Lifecycle-aware:** Messaging should reflect trial, active subscription, payment risk, churn, and reactivation states.
- **Permission-respectful:** Never harass users after denial or opt-out. Provide in-app alternatives.
- **Frequency controlled:** Centralized suppression, quiet hours, digesting, and fatigue scoring are required.
- **Compliance-safe:** Renewal, trial, and payment messages must be clear, factual, and jurisdiction-aware.

---

## 2. Notification Lifecycle Matrix

| Lifecycle Moment | Primary Channel | Timing | Purpose | Guardrails |
|---|---:|---|---|---|
| Onboarding permission ask | In-app pre-prompt, then OS prompt | After user experiences first value | Explain benefit of notifications | Do not ask on first screen unless essential |
| Trial started | Push/email/in-app | Immediately or within first session | Confirm trial and key benefits | Avoid misleading “free” language |
| Trial engagement nudges | Push or digest | Day 1–3 if inactive | Help user activate core habits | Max 1/day, suppress if active |
| Trial expiry reminder | Email + optional push | 3 days before, 1 day before, day of expiry | Prevent surprise conversion or loss | Must disclose renewal/payment terms where required |
| Renewal reminder | Email, optional push | 7 days and/or 1 day before renewal depending on plan/regulation | Transparency and retention | Mandatory where legally required |
| Failed payment | Email + in-app + optional push | Immediately, then retry cadence | Recover billing issue | Tone should be service-oriented, not punitive |
| Grace period warning | Email + in-app | Before access downgrade | Explain deadline and next steps | Clear action button |
| Cancellation confirmation | Email/in-app | Immediately | Confirm cancellation and access end date | No dark patterns |
| Win-back campaign | Email, optional push if opted in | 7–30+ days post-churn | Reintroduce value or offer | Frequency cap; suppress recent complaints |
| Feature/productivity digest | Email/push summary | Daily/weekly based on preference | Reduce interruption | Default to digest for low-urgency events |

---

## 3. Onboarding Permission Ask

### Recommended Flow
1. **Do not trigger OS permission immediately on app launch.**
2. First show an **in-app pre-permission screen** after the user completes a meaningful action, e.g.:
   - creates first task,
   - connects calendar,
   - sets first reminder,
   - completes setup checklist.
3. Explain specific value:
   - “Get reminders before tasks are due.”
   - “Receive daily planning summaries.”
   - “Be alerted if your subscription or payment needs attention.”
4. Then trigger platform permission request only if user taps “Enable notifications.”

### If User Declines Pre-Prompt
- Do not show OS prompt.
- Offer “Maybe later.”
- Retry only after a meaningful trigger or after several days.
- Limit to 1–2 re-prompts per month.

---

## 4. Platform Permission Denial Handling

If OS permission is denied:
- Use **in-app inbox**, banners, and email where consent exists.
- Do not repeatedly ask users to open settings.
- Show a settings education prompt only in high-intent moments, e.g. user creates a reminder but notifications are disabled.
- Copy should be neutral:
  - “Notifications are off. To receive task reminders, enable them in system settings.”
- Provide fallback options:
  - email reminders,
  - calendar integration,
  - in-app digest,
  - desktop notifications if available.

---

## 5. Trial Expiry and Renewal Reminders

### Trial Expiry
Recommended cadence:
- **T-3 days:** Email; optional push if engaged.
- **T-1 day:** Email or push.
- **T-0:** Final reminder before conversion or expiry.

Required content:
- Trial end date.
- Price and billing frequency.
- What happens next.
- Cancellation/manage subscription link.

### Renewal
Recommended cadence:
- Annual plans: 7–30 days before, depending on legal region.
- Monthly plans: 1–3 days before if required or user-selected.
- Always include:
  - renewal date,
  - renewal amount,
  - payment method if appropriate,
  - manage subscription link.

---

## 6. Failed Payment Recovery

### Cadence
- **Attempt failed:** Immediate email + in-app banner.
- **Day 1–2:** Reminder with payment update link.
- **Day 3–5:** Grace-period warning.
- **Final day before downgrade:** Final reminder.

### Rules
- Use service-oriented wording: “We couldn’t process your payment.”
- Avoid shame, urgency manipulation, or excessive push alerts.
- Suppress marketing and win-back messages during payment recovery.
- Provide direct payment update path.
- Clarify whether access continues during grace period.

---

## 7. Win-Back Campaigns

### Eligible Users
- Cancelled or expired users.
- No unresolved support complaint.
- Not in failed payment retry state.
- Not recently opted out or unsubscribed.

### Cadence
- 1st message: 7–14 days after churn.
- 2nd: 30 days with product improvements or usage value.
- 3rd: 60–90 days, optional offer.
- Then suppress or move to low-frequency newsletter.

### Content
- Reference value, not guilt.
- Highlight new features, saved time, templates, integrations.
- Include clear unsubscribe and preference options.

---

## 8. Quiet Hours and Time-Zone Handling

### Defaults
- Quiet hours: **9 PM–8 AM local time**.
- No non-critical push during quiet hours.
- Billing-critical messages may be sent by email during quiet hours but push should be deferred unless legally or operationally necessary.

### Requirements
- Use user’s local timezone.
- If unknown, infer conservatively or default to account locale.
- Respect weekends for non-urgent productivity nudges.
- Allow user customization.

---

## 9. Digest Mode

Use digest mode for:
- productivity summaries,
- task activity,
- team activity,
- feature education,
- low-priority reminders.

Recommended options:
- Immediate,
- Daily digest,
- Weekly digest,
- Off.

Digest should not include:
- failed payment alerts,
- legal renewal notices,
- security alerts,
- critical account changes.

---

## 10. Notification Fatigue Controls

Centralized frequency caps:
- Max **1–2 push notifications/day** for non-critical messages.
- Max **3–5 marketing/product nudges/week** across channels.
- Separate transactional notices from marketing but still avoid piling on.

Suppression rules:
- Suppress onboarding nudges after activation.
- Suppress upgrade prompts during trial expiry notices.
- Suppress win-back during billing recovery.
- Suppress all non-critical notifications after repeated dismissals.
- Cooldown after opt-out, complaint, or uninstall signal.

Track fatigue indicators:
- push disables,
- email unsubscribes,
- notification dismissals,
- app uninstalls,
- reduced engagement after notification,
- spam complaints.

---

## 11. Opt-Out Recovery

If a user opts out:
- Confirm preference immediately.
- Offer granular controls instead of all-or-nothing:
  - task reminders,
  - billing notices,
  - productivity digests,
  - feature updates,
  - offers.
- Do not try to immediately persuade.
- Re-introduce notification benefits only contextually, e.g. when user sets a reminder.
- Maintain transactional notices where legally permitted/required, but clearly separate from marketing.

---

## 12. Audit Checklist

- [ ] OS permission requested only after value moment.
- [ ] Denial fallback exists through in-app/email/digest.
- [ ] Trial and renewal reminders disclose date, price, and action link.
- [ ] Failed payment cadence is capped and service-oriented.
- [ ] Win-back excludes payment-risk, complaint, and opt-out users.
- [ ] Quiet hours use local timezone.
- [ ] Digest mode available for low-priority events.
- [ ] Global frequency caps and suppression rules implemented.
- [ ] Preference center supports granular opt-outs.
- [ ] Compliance review completed for renewal, trial, consent, and unsubscribe rules.
