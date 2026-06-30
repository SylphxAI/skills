# Localization Quality Program Patterns

## Localization Quality Program Review state machine

```text
source_ready -> pseudo_localized -> translated -> in_context_reviewed -> functional_lqa -> market_review -> released
     |                 |              |                    |                 |                |
     v                 v              v                    v                 v                v
 source_churn      string_bug      glossary_gap       layout_defect     cultural_risk    feedback_triaged
```

## Rule IDs

- `localization-quality-1` — Scope all customer-facing surfaces: product UI, onboarding, billing, cancellation, notifications, emails, help center, support macros, store listings, legal/privacy, and marketing pages.
- `localization-quality-2` — Prepare source strings with stable keys, screenshots/context, placeholders, plural rules, gender/context notes, glossary, style guide, and owner review.
- `localization-quality-3` — Use pseudo-localization and automated checks to catch hard-coded strings, truncation, encoding, layout, and placeholder errors before vendor translation.
- `localization-quality-4` — Run linguistic review, in-context review, functional LQA, accessibility checks, RTL checks, device/browser coverage, and critical-flow validation.
- `localization-quality-5` — Classify defects by severity, market impact, legal/support risk, conversion impact, and release-blocking status.
- `localization-quality-6` — Localize price, currency, dates, units, payment methods, regulatory copy, support expectations, and culturally sensitive examples.
- `localization-quality-7` — Keep translation memory, terminology, screenshots, and feedback loops current across release trains.
- `localization-quality-8` — Monitor market-specific conversion, retention, refunds, support contacts, store reviews, and localization defect trends after launch.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| New market launch | Gate critical flows before release | Surface inventory and LQA results | Translated but unusable product |
| RTL language | Test layout and interaction direction | Device/browser matrix | Broken navigation or forms |
| Legal/support content | Require owner and reviewer approval | Policy and macro coverage | Unsupported user obligations |
| Vendor delivery | Run in-context validation | Screenshots and defect log | Literal translation misses product meaning |
| String freeze slip | Reassess quality risk | Changed strings and launch date | Unreviewed late copy ships |

## Localization quality checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `localization_scope_defined`, `pseudo_localization_completed`, `translation_delivered`, `lqa_defect_logged`, `localization_release_blocked`, `market_feedback_triaged`, `translation_memory_updated`.

Recommended properties: `locale, market, surface, platform, reviewer_type, defect_severity, defect_category, release_blocking, string_key, owner_team, vendor, status, conversion_impact, support_case_id`.
