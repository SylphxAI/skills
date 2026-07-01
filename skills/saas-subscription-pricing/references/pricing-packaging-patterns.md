# Pricing and Packaging Patterns

## Model selection

| Model | Good for | Risks |
| --- | --- | --- |
| Free trial | Fast time-to-value, clear paid product | low-intent trials, support load |
| Freemium | viral/team products, habit formation | free users consume cost without conversion |
| Seat-based | collaboration and admin value | punishes adoption if overused |
| Usage-based | variable value and cost | bill shock, hard forecasting |
| Tiered | simple buying and packaging | arbitrary limits if not value-aligned |
| Enterprise | security, compliance, procurement | sales complexity and long cycles |
| Hybrid | complex products with usage + seats | pricing comprehension risk |

## Packaging rules

- `pricing-1` — Choose a value metric customers already understand.
- `pricing-2` — Gate scale, collaboration, compliance, automation, or advanced control; do not gate first value too early.
- `pricing-3` — Make the upgrade reason visible before the paywall moment.
- `pricing-4` — Put cancellation and renewal truth near subscription actions.
- `pricing-5` — Do not train loyal users to churn for discounts.
- `pricing-6` — Enterprise pricing needs proof: SSO/SAML, audit, DPA, support/SLA, security docs, admin controls.
- `pricing-7` — Any pricing change needs a rollout plan: audience, hypothesis, holdout or staged exposure, guardrail metrics, rollback trigger, owner, and review date.
- `pricing-8` — Migration must name who is grandfathered, for how long, what changes at renewal, what support can offer, and how customers export or downgrade before enforcement.
- `pricing-9` — Per-seat pricing must distinguish seat minimums from bundled included seats. Do not say "$X/seat includes 20 seats" unless the invoice mechanics are explicit.
- `pricing-10` — Overage rates must clear marginal cost at the target gross margin after discounts, credits, infrastructure spikes, and support load.
- `pricing-11` — Annual discounts and multi-year concessions must be translated into effective ARR, margin, payback, renewal risk, and sales approval thresholds.

## Pricing page requirements

- Who each plan is for.
- Monthly and annual price, including discount clarity.
- Trial length and renewal behavior.
- Usage limits and overage behavior, including explicit metered rate, volume tier, cap, alert threshold, and throttle/degrade behavior.
- Cancellation and downgrade consequences.
- Data export and retention after cancellation.
- Support level by plan.
- Security/compliance route for enterprise.
- Sales/support enablement: approved objection handling, save offers, discount authority, escalation path, and procurement checklist.

## Pricing arithmetic checklist

Before presenting a pricing table, run this consistency pass.

| Item | Required check | Failure to avoid |
| --- | --- | --- |
| Seat pricing | State per-seat price, minimum paid seats, included admin/viewer seats, and added-seat price separately | "$49/seat with 20 seats included" ambiguity |
| Usage allowance | State included monthly usage, metered unit, overage tier, alert levels, hard cap/degrade mode, and prepaid pack discount | Bill shock or undefined throttling |
| Overage margin | Overage price >= marginal cost / (1 - target gross margin), with support and burst costs considered | Overage that loses money at scale |
| Annual discount | Show monthly equivalent, annual invoice amount, renewal date, cancellation/refund boundary, and effective discount | Confusing annual savings or discount leakage |
| Procurement | State PO/invoice, tax, DPA/MSA, security review, SLA, billing contact, and approval owner | Enterprise deal stalls after pricing page |
| Expansion | Define seat expansion, usage expansion, feature expansion, and sales-assist trigger | No path from Team to Business/Enterprise |
| Downgrade/cancel | Explain timing, retained data, exports, disabled features, and overage true-up | Surprise loss of data or trust-breaking renewal |

Use placeholders when actual prices are unknown, but make the math structure explicit:

```text
Plan price:
- Team: $X/seat/month, minimum N paid seats, includes Y rows/month.
- Additional seats: same seat price or $Z/viewer if viewer seats are distinct.
- Overage: $A per B rows after 80/90/100% alerts; cap/degrade at C%.

Margin sanity:
- Marginal cost per B rows:
- Required price at target gross margin:
- Proposed overage price:
- Discount-adjusted floor:
```

## Rollout and migration plan

Include this whenever creating or changing subscription pricing:

```text
Hypothesis:
Audience:
Excluded users:
Experiment or staged rollout:
- Control / holdout:
- Exposure ramp:
- Success metrics:
- Guardrails:
Grandfathering:
- Existing paid customers:
- Existing trials:
- Annual contracts:
- Enterprise contracts:
Communications:
- In-product notice:
- Email sequence:
- Sales/support enablement:
Rollback trigger:
Decision date:
Owner:
```

Default rules:

- Do not force existing annual or enterprise customers onto new terms mid-contract unless the contract allows it and support/legal review is complete.
- Prefer renewal-bound migration for paid customers; use clear notice windows and explain exact changes.
- Grandfather forever only when the operational cost is low; otherwise set a sunset date, migration offer, and support exception path.
- Hold out a comparable cohort or run a staged rollout when price sensitivity, churn risk, or sales-cycle impact is uncertain.
- Give support approved save offers, objection handling, refund boundaries, and escalation criteria before launch.

## Metrics

Track:

```text
pricing_page_viewed
pricing_experiment_assigned
plan_compared
trial_started
checkout_started
subscription_started
upgrade_clicked
upgrade_completed
downgrade_started
cancellation_started
cancellation_completed
winback_offer_shown
winback_accepted
pricing_notice_seen
pricing_notice_acknowledged
pricing_migration_started
pricing_migration_completed
```

Evaluate pricing by activation, conversion, retention, expansion, support load, refund rate, and long-term revenue.

## B2B analytics defaults

Use concrete numbers only as placeholders to be validated, but do not omit the mechanics:

- Seat expansion: include base seats per plan and an incremental seat price or sales-assist trigger.
- Usage overages: price the value metric in tiers, for example events, rows scanned, reports, or seats, with 80/90/100% alerts and a hard cap or throttled degrade mode.
- Unit economics: state gross margin target, cost driver, marginal usage cost, overage margin floor, CAC payback target, NRR target, and support-cost guardrail.
- Enterprise route: require SSO/SAML, audit logs, DPA/MSA, PO/invoice support, security review, SLA, admin controls, and named support escalation.
- Enablement: give sales/support the main objections, approved concessions, refund/credit boundary, and when to escalate to finance/legal.

## Common B2B analytics packaging pattern

For analytics products, a clear hybrid usually reads better than a dense table:

| Plan | Buyer | Seat rule | Usage rule | Enterprise gate |
| --- | --- | --- | --- | --- |
| Trial | evaluator | temporary seats, no paid commitment | limited usage and export watermark | none |
| Team | team lead | per-seat price with a minimum seat commitment or explicit starter bundle | included rows/events, metered overage, alerts | no custom contract |
| Business | department owner | higher minimum, admin/viewer rules, annual default | higher included usage, cheaper overage, prepaid packs | SAML/audit/basic security docs |
| Enterprise | procurement/security buyer | negotiated annual or multi-year commitment | committed usage band, true-up, custom caps | SSO/SCIM, DPA/MSA, SLA, security review, invoice/PO |

When using a minimum commitment, write "minimum 5 paid seats" rather than "includes 5 seats." When using a bundle, write "$X/month includes 5 seats; extra seats are $Y/seat/month." Do not use both patterns in the same row.
