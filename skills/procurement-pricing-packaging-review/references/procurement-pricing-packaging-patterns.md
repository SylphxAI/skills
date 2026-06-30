# Procurement Pricing Packaging Patterns

## Procurement Pricing Packaging Review state machine

```text
package_defined -> buyer_value_proven -> quote_prepared -> procurement_review -> order_signed -> billing_ready
       |                   |                 |                    |              |
       v                   v                 v                    v              v
 sku_gap            value_gap          discount_exception    security_blocker invoice_blocker
```

## Rule IDs

- `procurement-packaging-1` — Define SKU, tier, entitlement, value metric, seat/usage unit, included limits, add-ons, minimums, commits, overages, and services separately.
- `procurement-packaging-2` — Align packaging with buyer value, procurement language, billing system support, tax/invoice needs, support promises, and renewal path.
- `procurement-packaging-3` — Set discount approval, price hold, ramp, co-terming, true-up, renewal uplift, cancellation, and non-standard term rules.
- `procurement-packaging-4` — Prepare procurement proof: value case, security pack, legal terms, DPA/subprocessors, vendor forms, tax/invoice details, and implementation plan.
- `procurement-packaging-5` — Model margin and operational impact of discounts, services, support SLAs, credits, marketplace fees, and payment terms.
- `procurement-packaging-6` — Keep quote, order form, CRM, billing, entitlements, and customer-facing pricing consistent.
- `procurement-packaging-7` — Record procurement objections and lost reasons to improve packaging, sales collateral, security evidence, and pricing pages.
- `procurement-packaging-8` — Escalate bespoke packaging only when strategic value justifies complexity and lifecycle ownership exists.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Seat vs usage metric | Choose buyer-aligned supportable unit | Usage/value evidence | Confusing package |
| Discount request | Apply approval and margin model | Deal desk policy | Margin leakage |
| Procurement security ask | Provide approved evidence pack | Trust/security artifacts | Unsupported promise |
| Custom SKU | Assess lifecycle cost | Billing/entitlement support | Operational debt |
| Renewal uplift | Disclose and model early | Order terms and renewal policy | Renewal dispute |

## Procurement packaging checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `package_review_started`, `quote_prepared`, `discount_exception_requested`, `procurement_objection_logged`, `order_form_approved`, `billing_readiness_confirmed`, `package_exception_retired`.

Recommended properties: `deal_id, segment, sku, pricing_metric, commit_level, discount_percent, exception_type, margin_impact, procurement_stage, security_review_status, billing_support_status, renewal_term, owner_team, decision`.
