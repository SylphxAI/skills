## Subscription App Analytics Instrumentation Review

### 1. Core Instrumentation Coverage

| Area | Required Events | Key Properties |
|---|---|---|
| Landing page attribution | `landing_page_viewed`, `signup_started` | `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `referrer`, `landing_url`, `device_type`, `country`, `session_id` |
| Onboarding | `onboarding_started`, `onboarding_step_viewed`, `onboarding_step_completed`, `onboarding_completed`, `onboarding_skipped` | `step_id`, `step_name`, `step_index`, `total_steps`, `skip_reason`, `time_on_step` |
| Paywall | `paywall_viewed`, `paywall_cta_clicked`, `paywall_dismissed` | `paywall_id`, `placement`, `experiment_id`, `variant`, `plan_shown`, `price`, `currency`, `trial_available` |
| Trial | `trial_started`, `trial_converted`, `trial_cancelled` | `plan_id`, `trial_length_days`, `price_after_trial`, `currency`, `payment_provider`, `trial_start_source` |
| Purchase | `subscription_started`, `subscription_renewed`, `subscription_upgraded`, `subscription_downgraded`, `subscription_expired` | `plan_id`, `billing_period`, `price`, `currency`, `transaction_id`, `store`, `revenue_net`, `revenue_gross` |
| Refunds | `refund_issued` | `transaction_id`, `refund_amount`, `refund_reason`, `refund_type`, `days_since_purchase` |
| Cancellation | `subscription_cancelled`, `cancellation_reason_submitted` | `cancel_reason`, `cancel_reason_detail`, `days_subscribed`, `save_offer_shown`, `save_offer_accepted` |
| Notifications | `notification_permission_prompted`, `notification_permission_granted`, `notification_permission_denied`, `notification_clicked` | `channel`, `prompt_location`, `campaign_id`, `message_type` |
| Activation | `activation_event_completed` or specific events | `activation_type`, `time_to_activation`, `source_flow` |
| Feature usage | `feature_viewed`, `feature_used`, or specific feature events | `feature_name`, `usage_depth`, `content_id`, `success`, `error_code` |
| Consent/privacy | `privacy_consent_viewed`, `privacy_consent_updated` | `analytics_consent`, `marketing_consent`, `region`, `consent_version` |

---

## 2. Event Naming Standards

Use a consistent verb-based convention:

- Recommended format: `object_actioned`
- Examples:
  - `paywall_viewed`
  - `subscription_started`
  - `onboarding_step_completed`
  - `notification_permission_granted`

Rules:

- Use lowercase snake_case.
- Avoid vague events like `button_clicked` without context.
- Avoid duplicate names across client, backend, and payment provider.
- Separate user actions from system events:
  - User: `paywall_cta_clicked`
  - System: `subscription_renewed`
- Maintain an event dictionary with owner, description, trigger, properties, and downstream dashboards.

---

## 3. Identity Stitching

Required identifiers:

| Identifier | Purpose |
|---|---|
| `anonymous_id` | Pre-login behavior, landing page, onboarding |
| `user_id` | Authenticated user behavior |
| `account_id` or `subscriber_id` | Subscription-level analysis |
| `device_id` | Cross-session/device debugging |
| `transaction_id` | Purchase, renewal, refund reconciliation |
| `session_id` | Funnel and attribution analysis |

Critical decisions:

- Preserve `anonymous_id` after signup and alias it to `user_id`.
- Do not create a new user profile on login.
- Backend billing events must include `user_id` or a reliable subscription/account ID.
- Store original acquisition attribution separately from latest-touch attribution.
- Handle app reinstall and cross-device login carefully to avoid duplicate users.

---

## 4. Attribution Requirements

Track both:

### First-touch attribution
Used for CAC, cohort quality, LTV by source.

Properties:

- `first_utm_source`
- `first_utm_medium`
- `first_utm_campaign`
- `first_landing_page`
- `first_referrer`
- `first_seen_at`

### Latest-touch attribution
Used for conversion optimization.

Properties:

- `last_utm_source`
- `last_utm_medium`
- `last_utm_campaign`
- `last_landing_page`
- `last_referrer`

Also capture:

- App install source where available.
- Deep link parameters.
- Web-to-app handoff identifiers.
- Ad click IDs such as `gclid`, `fbclid`, `ttclid`, where legally permitted.

---

## 5. Subscription Lifecycle Coverage

Minimum lifecycle states:

1. Visitor
2. Signup started
3. Account created
4. Onboarding started
5. Onboarding completed
6. Paywall viewed
7. Trial started
8. Paid subscriber
9. Renewal
10. Cancelled
11. Expired
12. Refunded
13. Reactivated

Recommended events:

- `subscription_reactivated`
- `payment_failed`
- `payment_recovered`
- `grace_period_started`
- `grace_period_ended`

Billing events should come from server-side or payment-provider webhooks, not only client-side events.

---

## 6. Cohort Readiness

Required cohort dimensions:

- Signup date
- Trial start date
- Purchase date
- Acquisition channel
- Campaign
- Country/region
- Platform: iOS, Android, web
- Plan type
- Billing period
- Onboarding completion status
- Activation status
- Paywall variant
- Notification permission status
- Consent status

Core cohort metrics:

- Visitor-to-signup conversion
- Signup-to-onboarding completion
- Onboarding-to-paywall view
- Paywall view-to-trial
- Trial-to-paid conversion
- D1/D7/D30 retention
- Activation rate
- Trial cancellation rate
- Paid cancellation rate
- Refund rate
- LTV by cohort
- ARPU/ARPPU
- Churn and reactivation rate

---

## 7. Privacy and Consent

Required controls:

- Do not fire non-essential analytics before consent where legally required.
- Store `consent_version`, timestamp, and consent categories.
- Support deletion requests and data export requests.
- Avoid sending raw PII such as email, phone, name, or address to analytics tools.
- Hashing PII is not automatically sufficient for privacy compliance.
- Respect ATT, GDPR, CCPA/CPRA, and regional consent requirements.
- Suppress marketing attribution or ad identifiers when consent is denied.

---

## 8. Dashboard Readiness

Minimum dashboards:

1. Acquisition dashboard  
   - Traffic, signup rate, source/campaign performance.

2. Onboarding funnel  
   - Step conversion, drop-off, time per step.

3. Paywall dashboard  
   - Impressions, CTA clicks, dismissals, trial starts, purchases by placement and variant.

4. Subscription revenue dashboard  
   - Trials, paid conversions, MRR, ARR, renewals, upgrades, downgrades, refunds.

5. Churn dashboard  
   - Cancellation rate, reasons, tenure, save-offer performance.

6. Activation and retention dashboard  
   - Activation rate, feature adoption, D1/D7/D30 retention.

7. Notification dashboard  
   - Opt-in rate, clicks, downstream conversion.

8. Data quality dashboard  
   - Event volume, missing properties, duplicate transactions, anonymous-to-user stitch rate.

---

## 9. QA Checklist

Before launch, verify:

- Events fire once per intended action.
- Paywall impressions are not double-counted on reloads.
- Purchases are reconciled with payment-provider records.
- Refunds and renewals are captured server-side.
- Anonymous users are stitched after signup/login.
- Required properties are populated consistently.
- Events respect consent settings.
- Test users and sandbox purchases are excluded from production metrics.
- Dashboard totals match source-of-truth billing reports.

---

## 10. Priority Gaps to Watch

Highest-risk issues:

1. Missing identity stitching from anonymous visitor to subscriber.
2. Client-only purchase tracking.
3. Incomplete attribution persistence.
4. Paywall views without placement, variant, or plan metadata.
5. Cancellation events without structured reasons.
6. Feature usage events too generic to measure activation.
7. Consent state not attached to user/session.
8. Dashboards built before event QA and billing reconciliation.
