# Product Lifecycle Matrix

## Product blueprint dimensions

Every serious product plan should cover:

- **User**: target segment, job-to-be-done, trigger, urgency, willingness to pay.
- **Promise**: what changes for the user after adopting the product.
- **System**: product capabilities, states, data, permissions, operations.
- **Distribution**: stores, SEO, content, marketplace, community, paid acquisition, sales.
- **Monetization**: pricing, packaging, payment, refund, renewal, expansion.
- **Trust**: privacy, support, backup, cancellation, abuse/fraud, incident response.
- **Measurement**: activation, retention, revenue, support load, quality, churn.

## Lifecycle rows

| Stage | Required decisions | Required artifacts |
| --- | --- | --- |
| Plan | user, problem, wedge, business model, risks | one-page product thesis, non-goals, success metric |
| Research | competitor set, category norms, reviews, pricing, complaints | market map, opportunity table, feature parity/defensibility matrix |
| Design | core loops, onboarding, UI principles, data model, edge cases | product system map, state machines, wireflow, event taxonomy |
| Build | architecture, platform integrations, permissions, payment, backup | implementation roadmap, validation plan, launch blockers |
| Distribute | store/channel readiness, listing, screenshots, launch content, SEO | channel checklist, launch calendar, metadata pack |
| Monetize | price, plan limits, trial, promotion, refund, expansion | pricing table, entitlement matrix, billing/refund rules |
| Operate | backups, observability, support tooling, admin, abuse review | runbook, support console requirements, incident playbook |
| Grow | lifecycle messaging, promotions, referrals, content, partnerships | experiment backlog, measurement plan, guardrails |
| Support | help center, ticket triage, refund flows, trust recovery | macros, escalation ladder, support metrics |

## Product type specifics

### Mobile app

- Permission timing and rationale.
- Push notification value before asking.
- Restore purchases and subscription state.
- Offline and background behavior.
- App Store / Google Play policy and metadata.

### Game

- Core loop and meta loop.
- Economy sources and sinks.
- Ads, IAP, subscriptions, battle passes, live events.
- Refund, chargeback, negative balance, anti-abuse.
- Daily check-in and streak repair.

### SaaS

- Free/trial/paid/team/enterprise packaging.
- Usage limits and expansion path.
- Data export, backup, audit, admin, support.
- Cancellation, downgrade, reactivation.
- Procurement and trust artifacts.

### Desktop utility

- Local-first data and backup.
- OS settings: startup, tray/menu bar, file association, shortcuts, permissions.
- Auto-update and rollback.
- Crash recovery.
- Store vs direct distribution.

## P0 completeness test

A P0 roadmap is not complete until it answers:

1. How does a new user reach first value?
2. How does money flow and what happens when it fails?
3. How does data survive device loss, app deletion, or user mistakes?
4. How does support diagnose the most common failures?
5. How does the product grow without spam or dark patterns?
6. How do we know the system is healthy?
