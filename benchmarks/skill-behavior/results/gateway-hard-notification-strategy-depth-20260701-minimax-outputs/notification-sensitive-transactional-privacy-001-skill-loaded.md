**Notification objective:** Deliver security, billing, family activity, safety, education, and promotional notifications across push/email/SMS/in-app with strict privacy redaction, separated consent, and minor-safe handling on shared devices.

**Channels:** push, email, SMS, in-app, auth-gated deep links.

### Taxonomy and channel policy

- **security_login_alert** → new-device login, MFA challenge. **Channel:** push+email; SMS for high-risk only. **Priority:** P0. **Frequency:** event-based. **Suppression:** never digest; dedupe `security_login:<user>:<device>:<ts>` 10 min.
- **security_password_change** → trigger password reset. **Push+email**, fact-only subject, never SMS body. P0.
- **refund_status** → factual service update. **Email+in-app.** P1. Suppress after open, support contact, or `refund_status:<refund_id>` dedupe 7 days.
- **support_update** → case progress. **Email+in-app.** P1. Audit-versioned copy; suppress after resolution.
- **billing_failed** → payment retry. **Email+in-app;** push only with explicit ops. P1. Cap 1/day/incident, max 4 before support review; stop on payment update/cancel/support.
- **family_activity** → minor-safe summary (e.g., "Alex completed chore"). **Email+in-app;** push opt-in only. P2. Never include amount, balance, precise location, or health. Dedupe `family_activity:<child>:<event>` per day.
- **location_safety_alert** → neighborhood/card-adjacent update. **Push+in-app;** SMS only when user opted into critical safety. P1. Generic copy; deep-link for map.
- **education_tip** → budgeting/feature. **In-app;** email digest. P3. Digest when >2 queued.
- **promo_offer** → subscription discount. **Email+in-app;** push only if user opted into marketing pushes. P3. Eligibility, expiry, refund path in body.

### Lifecycle matrix

| Lifecycle state | Trigger | User value | Channel priority | Consent/preference | Frequency/suppression | Metric |
| --- | --- | --- | --- | --- | --- | --- |
| Onboarding | First value moment (link card, invite child) | Explain alert value, soft ask | In-app soft → push contextually | Not-asked → granted | Max 1 prompt/30d; stop on deny | Opt-in rate by ask context |
| Trial ending | Trial expires in 3d, usage≥1 | Avoid surprise charge | Email+in-app; push only high-value | Marketing allowed | 2/cap; suppress on conversion/cancel | Conversion lift |
| Abandoned setup | KYC or bank-link incomplete after 24h | Resume | In-app first, email fallback | Implied within onboarding flow | 2 attempts, 24h cooldown | Completion rate |
| Family active | Child/family event emitted | Awareness | Email+in-app; push if granted | Family activity allowed | 1/day/family member | Family retention |
| Billing recovery | Payment fails | Continuity | Email+in-app; push for imminent risk | Billing allowed | 1/d/incident, 4 max | Recovery rate |
| Renewal | Auto-renew in 7d | Transparency | Email+in-app | Marketing allowed | 1 reminder | Renewal retention |
| Win-back | Dormant 60–120d | Re-engage | Email only | Re-quote consent each send | 2/month, 3/90d | Reactivation |
| Security event | Login, change, anomaly | Protect account | Push+email; SMS risk | Security-mandatory | Event-only, no cap | Time-to-ack |

### Consent and regional control matrix

| Channel/region | Permission timing | Required consent | Unsubscribe/opt-out | Fallback if denied | Evidence |
| --- | --- | --- | --- | --- | --- |
| Push (minor-linked acct) | After first parent-acknowledged value moment | Parented consent gate + OS permission | In-app per category | In-app + email only | `consent_state`, `parent_verified` |
| Push (adult) | After first security-relevant action | OS permission | Category toggles | In-app + email | OS token, `permission_result` |
| Email marketing | Double opt-in | Explicit opt-in | List-Unsubscribe header | None | `email_subscribed`, suppression scope |
| SMS marketing | Explicit keyword opt-in with STOP/HELP confirmation | `sms_opted_in` per scope | STOP keyword | Email fallback | `sms_opted_in`, audit log |
| SMS transactional/security | Per-region legal basis | Legal/contractual basis | Limited opt-out where allowed | Email + push | Region policy version |
| In-app | Default on, low priority | Category toggles | In-app controls | n/a | Preference center state |
| Region: EU/UK | Pre-collection | Consent or legitimate-interest basis + policy version | Granular | Locale-aware copy | `consent_policy_version` |
| Region: US minors | COPPA/parental consent gate | Parent-only grant | Parent UI only | Email-only to parent | `parent_verified_at` |

**Critical:** Security/login consent is mandatory and separate from marketing consent; never infer cross-channel.

### Privacy/redaction and deep-link policy

| Content type | Sensitive fields excluded | Lock-screen/SMS/subject copy | Deep-link auth | Support-safe evidence |
| --- | --- | --- | --- | --- |
| Login/security | IP, device fingerprint, token, OTP, geocoords | "New sign-in to your account. Tap to review." | Auth-gated session list, short token | `notification_sent`, consent, version; no payload |
| Billing/refund | Full PAN, bank, CVV, dispute text, child-amount detail | "We processed a refund. Tap to review." | Auth-gated billing record | Receipt ID + status only |
| Family activity | Child balance, exact location, vendor name for minors, diagnosis | "Family update from [display name]." Parent-only lock-screen preview suppressed by default for users <18 family link. | Auth-gated family view, role-checked | Event type + child ID hash |
| Location safety | Exact address, precise coordinates, identifiable location history | "Safety alert near your saved area." | Auth-gated map view | Region polygon, no PII |
| Education/promo | Sensitive inferred traits, minor profile | "Tip: try budgeting tools." | Auth-gated or marketing landing | Campaign ID, eligibility, expiry, refund |

**Channel mechanics:** SMS STOP/HELP honored immediately and recorded; email carries List-Unsubscribe; push tokens invalidated on bounce; shared-device lock-screen previews default to generic copy; per-category preview richness opt-in.

### Frequency and suppression budget

- **Global cap:** ≤3 non-transactional/day, ≤1 non-transactional push/day, ≤3 non-transactional/week unless user-requested reminders.
- **Category caps:** Security event-only; billing failed 1/d/incident, 4 max; trial/renewal 2-3/window; utility 2/day; digest weekly default; marketing 2/month, 3/90d.
- **Cooldowns:** 48h between non-urgent lifecycle reminders; 10-min dedupe on identical security events.
- **Quiet hours (per user timezone):** Suppress all non-critical; queue to next acceptable local time; P0 security may bypass with logged `override_reason`.
- **Emergency override:** Reserved for active compromise, customer-impacting outage, user-requested critical reminder. Never for promos, education, family nudges, or location upsells. Log reason and audit.

### Cross-channel dedupe and stop rules

| Lifecycle event | Dedupe key | Priority order | Stop condition | Suppression reason | Owner |
| --- | --- | --- | --- | --- | --- |
| Login anomaly | `login:<user>:<device>:<ts>` | push>email>SMS | acknowledge/password change | dedupe/cooldown | Security |
| Billing failed | `billing_fail:<sub>:<date>` | email>in-app>push | payment_success/cancel/support | stop_conversion | Billing |
| Trial ending | `trial:<sub>:<date>` | email>in-app | conversion/cancel/opt-out | stop_conversion | Lifecycle |
| Family activity | `family:<child>:<event>` | email>in-app>push | view/complete | dedupe_daily | Family |
| Location safety | `safety:<region>:<event>` | push>in-app>SMS | view/expire | stale | Safety |
| Promo | `promo:<campaign>:<user>` | email>in-app>push | convert/opt-out | stop_conversion | Growth |

Stop conditions: convert, cancel, pay, complete, unsubscribe, complaint, support ticket, or stale trigger.

### Fatigue/incident readback (when triggered)

| Cohort | Channel | Lifecycle event | Frequency bucket | Harm signal | Decision | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| New parents | push | onboarding trial | global_cap=hit | opt-out +5pp vs holdout | reduce cap, soft-ask delayed | Lifecycle |
| Minors linked | all | family_activity | category_cap=near | complaint | pause cohort, redact, parent-only | Family |
| Dormant paid | email | win-back | marketing_cap=near | unsubscribe | reduce frequency, no push | Growth |

### Trust metrics

- **Delivery & bounce** by channel, region, lifecycle.
- **Opt-in rate** by ask context and lifecycle moment (especially parenting gate).
- **Opt-out, unsubscribe, complaint/spam** by campaign and cohort.
- **Support contacts after notification** with case → notification linkage.
- **Notification-attributed churn and permission revocation.**
- **Redaction compliance:** % of shared-device lock-screens with generic copy; minor-event redaction checks.
- **Dedupe rate** of avoided duplicate sends.
- **Override audit:** every emergency override carries `override_reason`, expirer, and reviewer.

### Risks and guardrails

- Shared-device leakage → generic lock-screen defaults + per-category preview opt-in.
- Minor over-disclosure → parent gate, child-balance/location suppression, P3 only.
- Cross-channel fatigue → strict global/category caps, digest-first low urgency.
- Marketing bundled in transactional → structural separation with distinct templates and consent.
- Repeated push prompts after denial → soft-ask cooldown, preference-center recovery, user-initiated OS path.
- Sensitive payload in URL/Push → minimal copy, auth-gated deep links with short-lived tokens.
- Support exposure of sensitive data → evidence payload limited to message ID, consent version, delivery state, suppression reason.
