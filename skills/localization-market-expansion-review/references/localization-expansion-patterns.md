# Localization Expansion Patterns

## Market expansion state machine

```text
market_hypothesis -> demand_research -> localization_scope -> readiness_review -> limited_launch -> market_learning -> scale_or_pause
        |                 |                  |                   |               |
        v                 v                  v                   v               v
 no_fit_found       evidence_gap       translation_blocker   launch_hold     rollback_or_retarget
```

## Rule IDs

- `loc-market-1` — Start with market demand and distribution channel, not a language list.
- `loc-market-2` — Separate i18n infrastructure from translation quality and market operations.
- `loc-market-3` — Localize value proposition, examples, screenshots, units, dates, currencies, taxes, and support expectations.
- `loc-market-4` — Price localization must consider purchasing power, taxes, payment methods, refunds, and arbitrage.
- `loc-market-5` — App store listings, SEO, and ads need local search intent and proof, not literal translation.
- `loc-market-6` — Support must cover language, time zone, escalation, refunds, abuse, and legal requests.
- `loc-market-7` — Cultural, regulated, health/finance/child, game content, and user-generated content risks need review.
- `loc-market-8` — Test text expansion, truncation, RTL, pluralization, input formats, and accessibility.
- `loc-market-9` — Launch with a learning loop: cohort quality, conversion, retention, refund rate, support load, reviews.
- `loc-market-10` — Pause expansion if support debt, payment failure, policy rejection, or retention quality invalidates demand.

## Decision table

| Need | Market action | Product action | Risk control |
| --- | --- | --- | --- |
| Early demand unknown | Landing/listing smoke test | Minimal locale metadata | Do not overbuild translation |
| Strong organic demand | Localize onboarding and core loop | Translation QA and formatting | Monitor retention/support |
| Paid launch planned | Channel-specific creative | Pricing/payment/refund readiness | Holdout and CAC guardrails |
| Game launch | Local store assets and events | Economy/cultural content review | Soft-launch metrics by region |
| B2B SaaS expansion | Local buyer proof and procurement | Support hours, invoice/tax review | Legal/privacy review |
| Marketplace expansion | Supply and demand balance | Moderation and payout localization | Fraud and policy review |

## Readiness checklist

- Market thesis, local alternatives, target segment, and channel are defined.
- Product supports locale, language fallback, formats, search, and accessibility.
- Store/listing/SEO/ads are locally researched.
- Pricing, payments, tax/invoice, refund, and support flows are ready.
- Launch metrics separate acquisition quality from localization friction.

## Event schema

Track: `market_hypothesis_created`, `locale_enabled`, `translation_review_completed`, `localized_listing_published`, `localized_price_shown`, `local_payment_attempted`, `localized_support_case_opened`, `market_launch_started`, `market_cohort_reviewed`, `market_expansion_decision_recorded`.

Minimum properties: market, locale, channel, product surface, translation version, price/currency, payment method, support language, cohort, metric, and decision.
