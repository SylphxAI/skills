**Analytics context:**
Audience: growth, monetization, retention PMs + lifecycle marketing + finance ops. Source of truth: server billing system for money events; client SDK for behavior; attribution partner for installs; warehouse for cohorts. Risk boundary: money, entitlement, and refund decisions are server-trusted only; client events are directional.

**Instrumentation plan:**

| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |
| Landing attribution | Install + web visit → first-open via partner postback + UTM params | Attribution dashboard, click IDs persisted to first launch | Mis-attributed campaigns, double-count | Growth PM |
| Onboarding steps | Step-level events with step_id, step_index, completed | Funnel + drop-off per step | Swallowed drop-offs hide friction | Onboarding PM |
| Paywall impressions | Server-confirmed `paywall_viewed` (variant, offer_id, price, currency) | Variant exposure funnel | Client block/refresh skews rate | Monetization PM |
| Trial start | Server `trial_started` from billing webhook | Trial-to-paid conversion | Client-only loses 5-10% | Billing Eng |
| Purchase | Server `purchase` (product_id, price, tax, currency, store_receipt) | Revenue LTV | Receipt spoof, FX drift | Billing Eng |
| Refund | Server `refund_issued` + reason taxonomy | Refund rate, fraud | Client cannot detect | Finance Ops |
| Cancellation | Client `cancel_flow_completed` + reason taxonomy; server `subscription_canceled` for truth | Reason cohorts | Reasons often missing | Retention PM |
| Notification opt-in | OS prompt outcome + channel prefs | Opt-in rate, lift | Mis-keyed prompts | Lifecycle Mktg |
| Activation | Defined activation event (e.g., first value action) with owner signoff | Cohort retention curves | Vague definition, no owner | Growth PM |
| Feature usage | Grouped `feature_used` with feature_id, not per-click | Adoption, stickiness | Event sprawl | Product PMs |
| Cohorts | Cohort key = install_date + attribution_source + plan | Warehouse cohorts | Inconsistent keys | Data Eng |
| Privacy consent | Consent state gate on SDK; server events only post-consent for marketing props | CMP logs | Tracking without consent | Privacy/Legal |
| Event naming | `snake_case`, past tense, `<object>_<action>`; central registry | Lint in CI | Schema drift | Data Eng |
| Identity stitching | Anonymous ID → user_id on login; merge rules documented; dedup key in warehouse | Login/signup tests | Double-counted users | Identity Eng |
| Dashboard readiness | Source contract + owner + QA pass + sample query + alert thresholds before publish | Signoff checklist | Broken dashboards | Analytics Lead |

**Event contracts, QA, privacy, and dashboard handoff:**

- `install_attributed` → provider=server-side postback, identity_state=anonymous, consent_state=any, edge=re-engagement flagged, support note: links to click_id.
- `onboarding_step_completed` → properties step_id, step_index, source; QA fixture per step; null rate <2%.
- `paywall_viewed` → variant, offer_id, price, currency, placement; one per view, dedup within 30s; exposure logged for A/B; QA via debug overlay.
- `trial_started` → server billing webhook only; source=subscription_service; client event never trusted; reconciles daily to billing DB.
- `purchase` → server event from billing/store webhook; receipt_id, store, currency; client event suppressed; reconciles to finance ledger.
- `refund_issued` → server event from finance system; reason enum v1; late-arriving tolerated 7d; alert on duplicate_receipt_id.
- `cancel_flow_completed` → reason taxonomy (enum, ≤20 values), free-text hashed; companion server `subscription_canceled` for truth.
- `notification_opt_in` → channel (push/email/sms), prompt_outcome, app_version; gate on consent.
- `activation_achieved` → owner-signed definition; cohort entry event; one per user; migration plan if definition changes.
- `feature_used` → feature_id (closed enum), surface, count debounced server-side; cardinality check weekly.
- `consent_updated` → state, version, timestamp; gates all marketing properties downstream.

QA & release gate:
- Schema lint in CI on event registry; block merge on unknown events.
- Debug build writes to internal endpoint; QA suite asserts presence and shape for top 20 events.
- Pre-release: dashboard owner signs off source contract; null rate <5%, duplicate rate <1%, late-arrival <2% over 7d.
- Post-release: monitor volume, null rates, schema drift, dashboard freshness for 14 days; alert on >20% deviation.

Privacy & identity:
- Consent gate enforced client-side before any marketing property; server events carry `consent_state`.
- Anonymous ID stored until login or 90d idle, then merged under user_id with deterministic key; dedup at warehouse.
- Sensitive properties (location precise, contact info) gated; PII review before new property merge.
- Retention: behavior 13mo; billing records 7yr; user deletion propagates within 30d.

Metric ownership:
- Every dashboard tile has named owner, source event IDs, and refresh SLA; stale tiles deprecated after 60d unused.
