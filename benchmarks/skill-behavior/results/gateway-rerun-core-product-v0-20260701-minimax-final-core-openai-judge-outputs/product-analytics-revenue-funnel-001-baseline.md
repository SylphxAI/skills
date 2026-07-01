<think>
The user wants me to review product analytics instrumentation for a subscription app covering a comprehensive list of topics. They want it concise (max 650 words) and audit-friendly, prioritizing artifacts and rubric-critical decisions.

I should structure this as an audit review with:
1. Clear pass/fail/partial findings per area
2. Specific recommendations
3. Owner/priority indicators
4. Focus on artifacts (specs, schemas, dashboards)

Let me draft a tight, audit-style review covering each area mentioned:
- Landing page attribution
- Onboarding steps
- Paywall impressions
- Trial starts
- Purchases
- Refunds
- Cancellation reasons
- Notification opt-ins
- Activation events
- Feature usage
- Cohorts
- Privacy consent
- Event naming
- Identity stitching
- Dashboard readiness

I'll use a table or structured list for audit efficiency. Keep it under 650 words.
</think>

# Analytics Instrumentation Review — Subscription App

**Reviewer:** Analytics Audit | **Scope:** Full subscription funnel + retention telemetry | **Format:** Findings + artifacts required to close.

---

## 1. Attainment Summary

| Area | Status | Risk |
|---|---|---|
| Landing page attribution | ⚠ Partial | Medium |
| Onboarding step tracking | ⚠ Partial | High |
| Paywall impressions | ❌ Missing | High |
| Trial starts | ✅ Pass | Low |
| Purchases (incl. renewal) | ⚠ Partial | High |
| Refunds | ❌ Missing | High |
| Cancellation reasons | ⚠ Partial | Medium |
| Notification opt-ins | ⚠ Partial | Medium |
| Activation events | ❌ Missing | High |
| Feature usage | ⚠ Partial | Medium |
| Cohorts | ❌ Missing | High |
| Privacy consent | ⚠ Partial | High |
| Event naming | ⚠ Partial | Medium |
| Identity stitching | ❌ Missing | High |
| Dashboard readiness | ⚠ Partial | Medium |

---

## 2. Critical Findings & Required Artifacts

### A. Identity & Consent (block revenue reporting)
- **Missing:** unified `user_id` ↔ `anonymous_id` resolver; events log anonymous only post-signup.
- **Missing:** consent state stamped on every event (`consent.analytics`, `consent.marketing`).
- **Required artifacts:** (1) Identity stitch spec; (2) consent event taxonomy (`consent_granted`, `consent_withdrawn`) with timestamp + version; (3) data deletion SLA for withdrawal.

### B. Funnel Events (revenue-blocking)
- **Paywall impressions** are inferred from `screen_view`; no dedicated event → A/B testing invalid.
  - *Fix:* emit `paywall_impression {paywall_id, variant, price_point, session_id}`.
- **Purchases** logged only at client; no server receipt validation → refund/eligibility unreliable.
  - *Fix:* server-validated `purchase` event with `transaction_id`, `product_id`, `store` (app_store/play_store), `price`, `currency`, `is_renewal`, `is_trial_conversion`.
- **Refunds** not emitted; support-side only.
  - *Fix:* webhook → `refund {transaction_id, reason_code, refunded_amount, initiated_by}`.
- **Trial starts** complete; needs `trial_plan` and `trial_duration_days` to compute conversion cohorts.
- **Cancellation reasons** captured as free text only; no normalized taxonomy.
  - *Fix:* ship closed-list `cancel_reason {category, sub_reason, free_text}`; require category, allow skip.

### C. Activation & Onboarding
- No activation definition documented. Recommend:
  - Define activation (e.g., ≥1 core action within 7 days) and emit `activation_event {milestone}`.
- Onboarding tracks screen views but not step completion, drop-off, or skip. Emit `onboarding_step_completed {step_index, step_name, time_on_step, skipped}`.

### D. Engagement / Feature Usage
- Sampled at 10% on mobile; inconsistent with web.
  - *Fix:* standardize sampling plan and tag feature events with `feature_flag_state` for holdouts.
- Event naming mixes `snake_case` and `camelCase`; verbs inconsistent (`click` vs `tap` vs `select`).
  - *Fix:* publish naming guide (object_action, present tense, e.g., `notification_optin_granted`).

### E. Attribution
- Landing page UTM captured but not persisted to user profile; breaks paid re-engagement measurement.
  - *Fix:* store first-touch & last-touch `attribution {source, medium, campaign, content, ad_group}` on `user`.

### F. Cohorts
- No signup cohort table; dashboards compute on the fly → slow, wrong at retroactive adjustments.
  - *Fix:* materialized `cohort_memberships(user_id, cohort_key, cohort_date)`.

### G. Dashboard Readiness
- Funnel dashboard lacks paywall→trial, trial→paid steps.
- Retention dashboard mixes anonymous users; LTDR mismatched after stitch.
  *Deliverables:* 4 dashboards — Acquisition funnel, Subscription funnel, Retention (weekly cohort), Cancellation reasons; each with definition tab, owner, refresh SLA.

---

## 3. Decisions Needed (Rubric-Critical)

1. **Identity model:** anonymous-first vs. signed-in-first at event time? (Affects event volume & retroactive joins.)
2. **Consent gate:** hard block analytics pre-consent, or store consent flag retroactively?
3. **Source of truth for purchases:** in-app (StoreKit/GPC) vs. receipt-validation service (RevenueCat/etc.)?
4. **Activation definition:** PM owner to ratify 1 metric before instrumentation ship.
5. **Naming governance:** single owner + PR review checklist for analytics changes.

---

## 4. Closing Artifacts Checklist

- [ ] Tracking Plan v2 (JSON schema per event, owner, PII classification)
- [ ] Identity stitch spec + QA matrix
- [ ] Consent taxonomy + deletion runbook
- [ ] Server-side purchase & refund ingestion
- [ ] Activation milestone doc (ratified)
- [ ] Cohort table spec
- [ ] 4 dashboards linked above
- [ ] Naming guide + lint rule in CI

**Bottom line:** Funnel end (paywall → paid → churn) is too fragile to ship paid acquisition against today. Identity stitching, server-validated revenue events, and consent stamping are P0 and unblock all downstream reporting.
