# Help Center Architecture Patterns

## Help center taxonomy

| Category | Typical articles |
| --- | --- |
| Getting started | onboarding, setup, first value, imports, permissions |
| Account and billing | login, plans, invoices, cancellation, refunds, restore purchases |
| Troubleshooting | errors, offline, performance, notifications, devices |
| Data and privacy | export, deletion, retention, permissions, security |
| Product workflows | core jobs, advanced features, integrations |
| Developer docs | API keys, quickstart, SDKs, limits, changelog, migration |
| Game support | purchases, rewards, events, account recovery, fair play |
| Contact and escalation | support routes, incident status, appeals, abuse/fraud review |

## Rule IDs

- `help-center-1` — Structure by user problem and lifecycle stage, not internal team ownership.
- `help-center-2` — Each article needs audience, applicability, steps, expected result, failure path, and escalation route.
- `help-center-3` — Trust-sensitive topics such as billing, refunds, deletion, privacy, and account access must be findable.
- `help-center-4` — Product UI should link to the most relevant article at moments of confusion or failure.
- `help-center-5` — Support macros and help articles should share facts but differ in tone and context.
- `help-center-6` — Search synonyms should reflect user language from tickets, reviews, and store complaints.
- `help-center-7` — Articles should have owner, last reviewed date, product version/scope, and stale-content alerts.
- `help-center-8` — Developer docs require runnable examples, version compatibility, limits, and error references.
- `help-center-9` — Game/live ops articles need event time windows, reward rules, compensation, and fair-play policy.
- `help-center-10` — Help center analytics should feed product fixes, not only deflect tickets.

## Decision table

| Signal | Action |
| --- | --- |
| High ticket volume on one topic | Create/improve article and fix product friction |
| Article high views but low resolution | Improve steps, screenshots, or escalation clarity |
| Search no-results | Add synonyms, redirect, or new article |
| Refund/cancel article buried | Move to billing/trust top level |
| Product update changes flow | Update article and support macro before release |

## Event schema

Track: `help_search_performed`, `help_article_viewed`, `help_article_feedback_submitted`, `support_contact_from_article`, `article_resolved_issue`, `article_stale_flagged`, `macro_used`, `product_feedback_from_support_created`.
