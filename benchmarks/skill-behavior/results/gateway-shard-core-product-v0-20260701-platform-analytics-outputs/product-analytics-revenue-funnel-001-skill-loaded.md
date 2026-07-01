Analytics context:  
Audience / source of truth / risk boundary:  
Product, growth, lifecycle, monetization, finance, support, and data teams need trustworthy funnel/cohort data for acquisition → onboarding → activation → trial → paid → retention/cancel. Server/billing systems are source of truth for trials, purchases, refunds, entitlement, and cancellations. Client analytics may measure UX exposure and intent but must not be used as financial or entitlement truth. Consent, attribution identifiers, notification permissions, and cancellation text require privacy review and retention rules.

Instrumentation plan:

| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |
| Landing attribution | Which channels/campaigns drive qualified signups, trials, purchases? | `landing_page_viewed`, attribution touch, UTM/referrer/click IDs, consent state | Lost attribution, PII leakage, over-crediting last touch | Growth + Data |
| Signup / identity | How do anonymous visitors become known users/accounts? | `signup_started`, `signup_completed`, anonymous ID → user ID merge | Double-counted users, broken cohorts | Product + Data Platform |
| Onboarding | Which steps block activation? | Step-level onboarding events with ordered step IDs | Funnel ambiguity, client drop-off noise | Product |
| Paywall | Which paywalls convert? | `paywall_viewed`, `paywall_cta_clicked`, placement, offer, experiment | Impression inflation, missing exposure context | Monetization |
| Trial start | What drives trial conversion? | Server-side `trial_started` plus client intent event | Client-only false positives | Monetization + Backend |
| Purchase | What drives paid conversion and revenue? | Billing/webhook `purchase_completed`, plan, currency, amount, platform | Revenue mismatch, duplicate purchases | Finance + Backend |
| Refund | Why are purchases refunded? | Billing/support `refund_issued`, reason, amount, source | Finance metric drift | Finance + Support |
| Cancellation | Why do users cancel? | `subscription_cancel_started`, `subscription_cancel_completed`, reason code/text-gated | Sensitive text, partial cancels misread | Retention + Support |
| Notification opt-in | Do notifications improve retention/activation? | `notification_permission_prompted`, `notification_permission_changed` | Platform permission mismatch | Lifecycle |
| Activation | What user behavior predicts retention? | Product-defined `activation_completed` derived from feature events | Vanity activation, stale definition | Product Analytics |
| Feature usage | Which features retain/monetize? | Decision-relevant `feature_used` or specific feature events | Instrumenting everything, high cardinality | Feature PMs |
| Cohorts | How do acquisition/onboarding/payment cohorts retain? | Cohort keys: signup date, first activation date, plan, channel | Inconsistent cohort definitions | Analytics |
| Experiments | Which variants affect paywall/onboarding outcomes? | Server/client `experiment_exposed`, assignment ID, variant | Post-treatment exposure bias | Experimentation Owner |
| Dashboards | Are teams using certified metrics? | Funnel, revenue, retention, cancellation dashboards from governed tables | Metric mistrust, duplicate dashboards | BI + Metric Owners |

Event contracts, QA, privacy, and dashboard handoff:

- `landing_page_viewed` -> Client event. Properties: `anonymous_id`, `session_id`, `url_path`, `referrer_domain`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `click_id_present`, `consent_state`. Do not store full referrer if it can contain PII. Dashboard: acquisition funnel.
- `attribution_touch_recorded` -> Server or tag manager event gated by consent. Properties: `touch_type`, `channel`, `campaign_id`, `landing_page`, `attribution_model_version`. Used for cohort/revenue joins, not raw dashboard guesses.
- `signup_started` / `signup_completed` -> Client plus server confirmation for completion. On completion, stitch `anonymous_id` to `user_id`; preserve pre-signup journey. Edge case: multiple devices remain linked only after authenticated login.
- `onboarding_step_viewed` / `onboarding_step_completed` -> Client events. Required: `step_id`, `step_order`, `onboarding_version`, `skipped`, `platform`. QA ordered funnels and null `step_id` below threshold.
- `paywall_viewed` -> Client event. Properties: `placement`, `paywall_id`, `offer_id`, `plan_options`, `currency`, `experiment_id`, `variant_id`, `trigger_feature`. Deduplicate repeated renders with `impression_id`.
- `paywall_cta_clicked` -> Client event. Properties: `paywall_id`, `offer_id`, `cta_type`, `selected_plan`, `billing_platform`.
- `trial_started` -> Server/billing truth. Properties: `user_id`, `account_id`, `subscription_id`, `plan_id`, `trial_length_days`, `billing_platform`, `source_paywall_id`, `started_at`. Client `trial_start_clicked` may exist but is not conversion truth.
- `purchase_completed` -> Billing/webhook truth. Properties: `subscription_id`, `user_id/account_id`, `plan_id`, `amount`, `currency`, `tax_excluded_amount`, `billing_period`, `platform`, `transaction_id_hash`. Deduplicate by transaction/subscription ID.
- `refund_issued` -> Billing/support join. Properties: `refund_id`, `transaction_id_hash`, `amount`, `currency`, `refund_reason_code`, `initiated_by`, `support_ticket_id`. Avoid free-text unless reviewed/redacted.
- `subscription_cancel_started` / `subscription_cancel_completed` -> Client intent plus server truth. Properties: `subscription_id`, `cancel_type`, `effective_date`, `reason_code`, `save_offer_shown`, `save_offer_accepted`. Free-text reason: optional, explicit purpose, retention limit, sensitive scan.
- `notification_permission_prompted` / `notification_permission_changed` -> Client/mobile event. Properties: `platform`, `permission_surface`, `previous_status`, `new_status`, `prompt_context`. Do not infer opt-in from prompt shown.
- `activation_completed` -> Derived metric, not arbitrary client event, unless also emitted server-side after criteria met. Definition example: completed onboarding + used core feature N times within 7 days. Owner must approve changes.
- `feature_used` or specific feature events -> Track only features tied to activation, retention, monetization, or support decisions. Required: `feature_name`, `action`, `object_type`, `workspace_id/account_id`, `platform`; avoid user-entered content.
- `experiment_exposed` -> Fire once when user can actually experience variant. Properties: `experiment_id`, `variant_id`, `assignment_id`, `surface`, `user_id/anonymous_id`, `exposure_time`.

Identity, sessions, and consent:

- Use stable `anonymous_id` before login, canonical `user_id` after signup/login, and `account_id/workspace_id` for subscription/team analysis.
- Maintain identity map with merge timestamp; never overwrite historical anonymous events without audit trail.
- Define sessionization centrally by platform; include `session_id` on client events.
- Consent states: `unknown`, `granted`, `denied`, `withdrawn`. Attribution/marketing pixels and non-essential analytics fire only when allowed.
- Support deletion/export requests across analytics, warehouse, attribution, billing joins where legally required.

QA and release gates:

- Every event must have owner, trigger, schema, allowed values, identity behavior, consent rule, and dashboard dependency.
- Pre-release QA: test users, debug stream screenshots, mobile/web fixtures, server webhook replay, warehouse validation.
- Monitor: event volume, null rates, duplicate rates, schema drift, late arrivals, attribution coverage, revenue reconciliation, funnel breakage.
- Release gate: no dashboard publication until events are QA-verified and metric owner signs off.
- Recovery: rollback bad client events, patch server webhook parser, backfill warehouse tables, mark affected dashboard dates, and deprecate duplicate events with migration notes.
