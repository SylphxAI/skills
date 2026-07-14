---
name: saas-web-platform-blueprint
description: "Design or critically review one complete modern SaaS web platform joining public acquisition surfaces and an authenticated product across value proposition, onboarding, UI/UX, web performance, SEO, PWA disposition, identity, organizations, billing and entitlements, notifications, support, security, privacy, analytics, operations, and global scale. Use when the whole SaaS platform blueprint is the independent artifact; use specialists for one interface, price, payment, refund, notification, identity, marketing, or release job."
---

# SaaS Web Platform Blueprint

Produce one **SaaS Web Platform Blueprint** that connects a truthful public promise, a fast path to first value, a durable authenticated service, a viable value exchange, and autonomous scale operations.

## Atomic boundary

Own the whole-platform composition semantics and integration contracts: product promise, surface map, canonical objects and authorities, journeys, capability dispositions, public-web and authenticated-product relationship, organization and account semantics, value-exchange integration, specialist requests, evidence, and dependency order. Retention, support, trust, global reach, commerce, identity, privacy, analytics, interface implementation, and operations remain with their detailed owners when they are independent artifacts.

Do not replace the detailed owners for interface implementation, pricing, payment ledgers, refunds, notifications, identity recovery, privacy, analytics, marketing, distribution, or support operations. The blueprint decides whether and how those capabilities fit together, then consumes their versioned artifacts.

## Agent-first invariant

Assume production capacity is elastic. Design every selected capability to its complete scale-ready target now, including automation, accessibility, localization, migration, observability, failure handling, recovery, and safe shutdown. Do not defer a selected capability because of staffing, calendar, missing users, speculative ROI, or a conventional MVP phase.

Selection, construction, proof, availability, and prominence are different decisions. A capability may be complete but dormant. Expose it only when its real permission, entitlement, semantic prerequisite, territory, age, security, service-health, liquidity, or current-authority gate passes. Do not use arbitrary tenure, engagement, churn-risk, or spend gates in a SaaS utility.

## Composition contract

Use the [shared product artifact envelope](references/product-artifact-envelope.schema.json). The top level carries `schemaVersion`, `artifactId`, `productId`, `artifactKind`, `ownerSkill`, `artifactVersion`, `artifactRevision`, `artifactState`, `inputArtifacts`, `canonicalFactsOwned`, `handoffOutputs`, `assumptions`, `proofState`, and `proofEvidence`; it never carries its own `artifactDigest`. Every input names the exact producer contract through `fulfillsHandoffId`. Draft input references contain no digest. References to already sealed artifacts additionally carry `artifactDigest` and `digestRule: sha256-exact-bytes`. Use stable producer handoff IDs and keep the dependency graph acyclic.

```text
SaaS Blueprint -> typed specialist requests -> specialist outputs
-> later Product Program Manifest revision indexes blueprint and outputs
```

The blueprint never consumes the later manifest revision that indexes it.

Product, price, provider, entitlement, identity, policy, and runtime facts stay in their canonical owners. Never copy a live plan price, tax rule, provider limit, security requirement, or platform policy into the blueprint as timeless truth.

## Resource routing

- Read all three references for a complete blueprint: [SaaS product and experience](references/saas-product-and-experience.md), [Web discovery, PWA, and global reach](references/web-discovery-pwa-and-reach.md), and [Identity, commerce, and autonomous operations](references/saas-identity-commerce-and-operations.md).
- For a bounded audit, load only the touched references and state exactly which dimensions remain unassessed.

## Capability disposition

Sweep every relevant capability and assign exactly one disposition:

- `integrate-now` — requested or essential to the product promise; specify the complete scale-ready target and verified slices now;
- `reuse-scale-ready` — consume a complete shared primitive and define its exact integration, version, and proof;
- `contract-ready` — preserve and test a zero-runtime extension boundary; this is not deferred implementation;
- `not-applicable` — cite an exact product, audience, business-model, semantic, platform, or physical reason;
- `floor-blocked` — cite an exact law, policy, rights, safety, consent, authority, or trust floor and define the safe alternative.

Do not instantiate accounts, PWA, push, collaboration, community, AI, commerce, or another system merely because it appears in the sweep. Cross-cutting floors still govern every selected capability.

## Workflow

1. **Frame success.** Define the recurring customer job, buyer, user, beneficiary, first-value event, promised outcome, differentiation hypothesis, business model, audiences, territories, platforms, constraints, non-goals, and falsifiable success/countermetric contract.
2. **Separate surfaces.** Map public marketing, content/docs, authentication, product workspace, account/billing, admin, support, status, developer/API, and legal/trust surfaces. Give each route an audience, indexability, authority, authentication, cache, data, and failure contract.
3. **Model the product.** Define canonical objects, tenants, identities, roles, entitlements, workflows, state owners, history, import/export, deletion, audit, and cross-system handoffs. Do not let the CRM, payment provider, browser client, or support ticket become universal truth.
4. **Design first value.** Remove needless signup, setup, permissions, profile work, tours, and notification prompts. Choose guest/demo/sample/import or direct signup deliberately. Specify resume, recovery, cross-device continuation, empty/error/offline states, and measurable time-to-value.
5. **Craft the experience system.** Establish information architecture, responsive shell, visual hierarchy, feedback, motion, loading, accessibility, content design, long/RTL text, keyboard/touch/pointer behavior, and low-end budgets. Route bounded screens and implementation to `interface-craft`.
6. **Decide web reach.** Design semantic public pages, metadata, canonical and locale relationships, crawl/index controls, sitemaps, structured data only when truthful, social previews, performance, resilience, and measurement. Keep private or personalized product routes out of search unless a deliberate public artifact exists.
7. **Decide PWA explicitly.** Responsive, accessible, fast, secure web is universal; PWA is conditional. Select it only when installability, repeated use, offline/local-first work, resumable workflows, push, sharing, or device integration creates real value. Capability-test and provide fallbacks; define service-worker update, stale-cache, storage-eviction, offline-mutation, and uninstall behavior.
8. **Design identity and tenancy.** Cover signup/sign-in, verification, password reset, passkeys/federation where applicable, MFA/2FA, sessions/devices, recovery, account merge/closure, organizations/workspaces, invites, roles, tenant isolation, audit, and enterprise SSO/SCIM only where the promise or buyer requires them.
9. **Join pricing to access.** Define the intended value exchange and hand pricing to `saas-subscription-pricing`. Compose catalog, checkout, trials, promotions, invoices, tax, renewals, upgrades/downgrades, proration, pause/cancel, grace/dunning, refunds/disputes, entitlement projection, reconciliation, and support through Payment and Refund specialists. For metered products, define customer-visible usage, units, latency, forecast, threshold/cap, correction, dispute, and invoice reconciliation semantics. Never make browser, provider UI, or a raw webhook the entitlement authority.
10. **Create durable retention.** Design recurring value, saved work, history, collaboration, integrations, mastery, and trustworthy continuity before reminders. Use lifecycle education, notifications, email subscriptions, trials, promotions, referrals, and win-back only when consented, explainable, suppressible, measurable, and tied to real user value.
11. **Design trust and operations.** Cover privacy/data lifecycle, abuse, security, backup/restore, support, CRM boundaries, diagnostics, admin actions, observability, capacity, queues/jobs/webhooks, incidents, migrations, dependency drift, status communication, feature exposure, rollback, recovery, and shutdown. Routine maintenance should reconcile desired and observed state autonomously within bounded authority.
12. **Prove the blueprint.** Define numeric workload and failure envelopes, representative device/network/locale/tenant fixtures, exact acceptance evidence, dangerous-interaction tests, specialist handoffs, dependency order, rollout gates, live readback, learning loops, and automatic hold/pause/recovery behavior.

## Source verification

Retrieve current search, browser/PWA, accessibility, authentication, privacy, email, payment, tax, subscription, consumer, platform, and security authority at use. Prefer official standards, regulators, platform owners, and provider documentation. Record publisher, URL, scope/jurisdiction, retrieval date, applicable version, uncertainty, and expiry. Treat remembered browser support, numeric thresholds, prices, fees, refund rights, and provider behavior as unverified.

## Hard gates

Reject or redesign a blueprint that:

- equates a polished landing page with a complete SaaS product, or a responsive page with a PWA;
- forces PWA, accounts, social, push, AI, or commerce without a product-semantic reason;
- indexes private, personalized, secret, duplicate, thin, or untruthful product surfaces;
- uses animation, hydration, analytics, ads, consent tooling, or third-party SDKs to delay first value or break low-end access;
- lets marketing claims, CRM fields, client state, checkout success pages, or support notes redefine product, money, identity, or entitlement truth;
- selects accounts, multi-tenancy, billing, webhooks, or another consequential capability but omits its recovery, isolation, authorization, deletion/export, failure, replay, support, migration, incident, or shutdown states, or fails to give an exact disposition when the capability is not selected;
- uses dark patterns, hidden renewal/cancellation terms, artificial urgency, notification spam, hostage data, or engagement pressure as retention;
- claims accessibility, SEO, security, compliance, scale, or production readiness from intent, generated copy, one viewport, synthetic-only tests, or an unobserved deployment;
- defers selected automation, localization, recovery, performance, or scale quality to a later human-maintained phase.

## Output contract

Return one SaaS Web Platform Blueprint containing:

1. artifact identity, evidence labels, scope, product promise, buyer/user/beneficiary, first-value event, business model, audiences, platforms, non-goals, assumptions, and success/countermetrics;
2. public, authenticated, account/billing, admin, support, status, API, and trust surface map with route-level index, auth, data, cache, and failure semantics;
3. canonical object, tenant, identity, role, entitlement, usage/quota, workflow, state-authority, data-lifecycle, and handoff graph;
4. first-use, onboarding, core workflow, navigation/search, lifecycle, cancellation/exit, recovery, and support journeys;
5. complete capability ledger with dispositions, scale-ready selected targets, availability gates, dormant contracts, dependencies, and exact reasons;
6. experience, responsive/input, accessibility, motion/feedback, startup/low-end, public-web/SEO, PWA, i18n/RTL, locale, and social-preview decisions;
7. identity/organization, pricing/value exchange, billing/entitlement, notification/email, support/CRM, privacy/security, analytics, admin, and autonomous-operations integration contracts;
8. numeric scale/failure budgets, validation matrix, specialist requests, rollout/exposure controls, live evidence, learning loop, recovery, migration, and shutdown plan.

## Routing boundaries

- Use `app-design-blueprint` for a complete non-SaaS app whose web route is only one platform; use this skill when public acquisition plus an authenticated, usually multi-tenant subscription/service platform is the independent whole. A compound SaaS app may use App Design for experience coherence and this skill for the public-to-service platform contract, with one declared primary artifact.
- Use `interface-craft` for one landing page, dashboard, settings, onboarding, checkout, or account flow.
- Use `saas-subscription-pricing`, `payment-platform-readiness`, and `refund-and-support-flow-review` for their detailed commercial artifacts.
- Use `notification-strategy-review`, `account-recovery-review`, `enterprise-access-governance-review`, `privacy-data-lifecycle-review`, `product-analytics-instrumentation-review`, and `customer-support-operations` when one of those systems is the primary artifact.
- Use `marketing-automation-blueprint` for the whole go-to-market control plane, `social-media-operations-review` for recurring social channel operations, and `app-store-distribution-readiness` for release-channel proof.
- Use `product-lifecycle-architect` only when a separate cross-domain Product Program Manifest is required; it indexes the SaaS blueprint and specialist outputs without absorbing their semantics.

## Completion check

Complete only when another agent can trace every selected capability from user value through canonical state, interface, entitlement, failure, metric, authority, specialist owner, proof, availability, recovery, and shutdown—without inventing live facts or leaving a conventional later-hardening project.
