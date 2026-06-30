# Pricing Page Patterns

## Rule IDs

- `pricing-page-1` — State the value metric in plain language before asking users to compare tiers.
- `pricing-page-2` — Plan names should map to customer maturity or usage, not internal segmentation jokes.
- `pricing-page-3` — The recommended plan must have a reason tied to the target customer, not just a visual highlight.
- `pricing-page-4` — Show billing period, renewal, trial, cancellation, taxes/fees caveat, and refund/support path where relevant.
- `pricing-page-5` — Comparison tables should prioritize differentiating limits; do not drown users in identical checkmarks.
- `pricing-page-6` — Freemium and trial pages need activation paths, not just feature restrictions.
- `pricing-page-7` — Enterprise CTA should explain procurement value: security, admin, support, compliance, volume, or custom terms.
- `pricing-page-8` — Usage-based pricing needs calculators, alerts, caps, and overage explanations.
- `pricing-page-9` — Upgrade and downgrade consequences must be clear before the user commits.
- `pricing-page-10` — Localize currency, tax expectations, app-store billing constraints, and payment-method availability.

## Decision table

| Business model | Page emphasis | Risk reducer |
| --- | --- | --- |
| Self-serve SaaS | Value metric, tiers, trial, FAQ | Cancellation clarity, support, comparison |
| Usage-based | Calculator, caps, examples | Spend alerts, budgets, overage explanation |
| Team SaaS | Seats, roles, admin controls | Seat management and invoice clarity |
| Consumer subscription | Benefits, renewal, restore, platform billing | Trial/cancel/refund explanation |
| Developer tool | Free limits, docs, API usage | Usage examples and migration path |
| Enterprise | Security, SSO, support, SLA | Procurement docs and contact path |

## Measurement

Track `pricing_viewed`, `billing_period_toggled`, `plan_compared`, `plan_selected`, `calculator_used`, `trial_started`, `checkout_started`, `checkout_completed`, `contact_sales_started`, `faq_expanded`, `cancel_policy_clicked`.
