## Mobile Productivity App Notification Strategy

### 1) Principles
- **User value first:** every notification must help users complete work, save time, or avoid loss.
- **Lifecycle-aware:** tailor messages to onboarding, trial, active use, inactivity, and paid usage.
- **Channel-appropriate:** push for timely actions, email for summaries/detail, in-app for contextual education.
- **Respectful by default:** quiet hours, caps, easy opt-out, and preference controls.

---

## 2) Channel Roles

| Channel | Best Use | Avoid |
|---|---|---|
| Push | Time-sensitive reminders, task deadlines, abandoned workflow recovery, trial expiry | Long education, heavy marketing |
| Email | Weekly summaries, trial/billing notices, win-back, onboarding guides | High-frequency reminders |
| In-app | Onboarding nudges, feature tips, opt-in prompts, success confirmations | Urgent off-session alerts |

---

## 3) Lifecycle Notification Matrix

| Trigger / Segment | Message Type | Channel | Timing | Goal |
|---|---|---:|---|---|
| New user installs app | Welcome + setup prompt | In-app | First session | Start activation |
| User has not completed onboarding | Onboarding nudge | Push / email / in-app | 24h, 72h after signup | Complete setup |
| User skips notification permission | Soft opt-in prompt | In-app | After first completed task or saved workflow | Increase push opt-in |
| Trial user | Trial value reminder | Email / in-app | Day 2–3 | Encourage engagement |
| Trial ending | Trial expiry reminder | Push + email | 3 days, 1 day, day of expiry | Convert to paid |
| User abandons workflow | Recovery reminder | Push / in-app | 30–60 min after abandonment | Resume task |
| User completes major task | Positive reinforcement | In-app / push optional | Immediately | Build habit |
| Active user | Weekly productivity summary | Email / in-app | Weekly, user local time | Retain and motivate |
| Inactive 7 days | Win-back nudge | Push / email | Day 7 | Re-engage |
| Inactive 21–30 days | Stronger win-back offer/tip | Email | Day 21 or 30 | Recover dormant user |
| Payment, subscription, security | Transactional alert | Email + push where relevant | Immediately | Inform and protect user |

---

## 4) Key Notification Types

### A) Onboarding Nudges
Purpose: move users to activation milestone, e.g. first task, first project, first reminder, first integration.

Examples:
- In-app: “Create your first focus list in under 60 seconds.”
- Push: “Ready to plan tomorrow? Finish setting up your workspace.”
- Email: “3 quick ways to get more from your productivity dashboard.”

Rules:
- Stop once activation milestone is reached.
- Do not send if user was active in-app in the last 30 minutes.
- Max 3 onboarding nudges in first 7 days.

---

### B) Trial Expiry Reminders
Purpose: reduce accidental churn and drive conversion.

Schedule:
- Trial start: value-focused email.
- 3 days before expiry: email + in-app.
- 1 day before expiry: push + email.
- Day of expiry: email; push only if user highly engaged.
- Post-expiry: one follow-up within 3 days.

Rules:
- Include trial end date, plan, renewal price, and cancellation/management link.
- Avoid misleading urgency.

---

### C) Abandoned Workflow Recovery
Trigger examples:
- Started task creation but did not save.
- Began project setup but abandoned.
- Started focus session setup but exited.

Timing:
- Push after 30–60 minutes if user is opted in.
- In-app reminder on next session.
- Email only for high-value workflows after 24 hours.

Rules:
- Suppress if workflow was completed on another device.
- Max 1 abandoned-workflow notification per day.

---

### D) Weekly Summaries
Purpose: reinforce value and habit formation.

Content:
- Tasks completed.
- Focus time.
- Streaks or progress.
- Upcoming priorities.
- Suggested next action.

Channel:
- Email by default.
- In-app summary card.
- Push teaser only if user has opted into summaries.

Timing:
- Weekly, localized to user’s timezone.
- Allow user to choose day/time.

---

### E) Win-Back Messages
Segments:
- **7 days inactive:** gentle reminder.
- **14 days inactive:** productivity benefit or unfinished item.
- **30+ days inactive:** new feature, template, discount, or reset prompt.

Rules:
- Stop after reactivation.
- Max 3 win-back attempts over 45 days.
- Do not send promotional win-back if user opted out of marketing.

---

### F) Transactional Alerts
Examples:
- Password/security changes.
- Payment success/failure.
- Subscription renewal or cancellation.
- Shared workspace invitation.
- Critical deadline reminders if user configured them.

Rules:
- Not subject to marketing unsubscribe where legally permitted.
- Must be clear, factual, and non-promotional.
- Deliver immediately.

---

## 5) Quiet Hours and Timezone Rules
- Default quiet hours: **9:00 PM–8:00 AM local time**.
- No non-urgent push during quiet hours.
- Transactional/security alerts may bypass quiet hours.
- If timezone unknown, infer from device locale/IP and update from app settings.
- Digest delayed notifications when quiet hours end; do not burst-send multiple messages.

---

## 6) Frequency Caps

| Scope | Cap |
|---|---:|
| Push notifications | Max 1/day, 4/week, excluding transactional/user-set reminders |
| Emails | Max 3/week, excluding transactional |
| In-app messages | Max 1/session, 3/week |
| Win-back | Max 3 over 45 days |
| Trial expiry | Max 4 lifecycle reminders |

Priority order when capped:
1. Transactional/security  
2. User-created reminders/deadlines  
3. Trial expiry  
4. Abandoned workflow  
5. Onboarding  
6. Summaries  
7. Promotional win-back  

---

## 7) Opt-In Prompts
- Use a **soft prompt** before OS push permission.
- Ask only after user experiences value, e.g. completes first task or sets a reminder.
- Explain benefit: “Get reminders before tasks are due.”
- If declined, wait at least 7 days before asking again.
- Provide granular categories before/after opt-in.

Notification categories:
- Task reminders
- Productivity summaries
- Collaboration/activity
- Trial and subscription updates
- Tips and onboarding
- Promotions and offers

---

## 8) Unsubscribe and Preference Center
Users must be able to manage:
- Channel: push, email, in-app.
- Category-level preferences.
- Frequency: real-time, daily digest, weekly digest, off.
- Quiet hours.
- Language and timezone.
- Marketing unsubscribe from every promotional email.

Requirements:
- One-click email unsubscribe for marketing.
- Transactional messages clearly separated from marketing.
- Honor opt-out immediately or within legally required timeframe.

---

## 9) Localization
- Localize language, date/time, currency, pluralization, and tone.
- Use user’s app language first; fallback to device locale, then English.
- Respect regional laws and consent standards.
- Avoid idioms that do not translate well.
- Localize send-time by timezone and workweek norms where possible.

---

## 10) Measurement and Governance

Core metrics:
- Opt-in rate by prompt timing.
- Open/click-through rate by channel.
- Activation completion.
- Trial conversion.
- Workflow recovery rate.
- Weekly active users.
- Churn/reactivation.
- Unsubscribe and complaint rate.

Guardrails:
- Push opt-out rate.
- Email spam complaints.
- Notification-driven churn.
- Frequency cap violations.
- Quiet-hour violations.

Operational controls:
- Maintain notification catalog with owner, purpose, audience, trigger, channel, cap, and legal basis.
- A/B test copy and timing with holdout groups.
- Review underperforming or high-complaint notifications monthly.
