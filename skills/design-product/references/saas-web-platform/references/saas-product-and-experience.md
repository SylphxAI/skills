# SaaS Product And Experience

## Contents

1. Success model
2. Surface architecture
3. First value and onboarding
4. Modern experience system
5. Retention and durable investment
6. Capability sweep

## 1. Success model

A successful SaaS product repeatedly produces a valuable customer outcome, makes that outcome easier to discover and trust, captures a fair share of the value, and remains operable under growth and failure.

Use an objective hierarchy rather than one engagement number:

```text
North-star outcome = verified recurring customer value
Commercial outcome = retained contribution after support, refunds, fraud, fees and variable service cost
Trust floors = security, privacy, accessibility, truth, consent, rights, recoverability
Operational outcome = reliable autonomous delivery and recovery inside declared envelopes
Diagnostics = acquisition, activation, feature use, retention, expansion, cancellation and support signals
```

Do not treat visits, registrations, clicks, time spent, notification opens, trial starts, gross MRR, or gross retention as success alone. Segment customer outcomes and commercial results by plan, cohort, acquisition source, company/user type, locale, platform, tenure, and meaningful use case.

Frame the product with:

```text
customer job and trigger:
buyer / user / beneficiary:
current alternative and switching cost:
promised outcome and evidence:
first-value event:
recurring-value event and natural cadence:
value metric and credible willingness to pay:
reasons to remain and legitimate reasons to leave:
failure, trust and exclusion countermetrics:
```

## 2. Surface architecture

Separate surfaces because their truth, performance, security, and discovery contracts differ.

| Surface | Primary job | Default discovery/auth stance | Canonical dependencies |
| --- | --- | --- | --- |
| Home and product pages | explain verified value and route intent | public, indexable when useful | product promise, claims, release availability |
| Pricing and comparison | explain approved value exchange | public; no invented plan facts | Pricing Decision and current catalog |
| Content/docs/changelog | educate, support, demonstrate expertise | public selectively; version/locale aware | documentation and release owners |
| Authentication | enter or recover safely | public route, never indexed as content | identity authority |
| Product workspace | perform the recurring job | authenticated, private by default | product and tenant state |
| Account, security and billing | control identity, plan, money and exit | authenticated; step-up for risk | identity, payment and entitlement owners |
| Admin and support | diagnose and execute authorized actions | privileged, audited, tenant-scoped | support and owning systems |
| Status and incident | communicate observed service state | public or customer-scoped deliberately | incident authority |
| Developer/API | integrate and automate | public docs plus authenticated controls | API contract and developer governance |
| Legal/trust center | explain current commitments and controls | public or customer-gated by artifact | approved legal, privacy and assurance truth |

Custom tenant domains are a separate lifecycle, not a DNS text field. When selected, define ownership verification and re-verification, TLS issuance/renewal, cookie and origin boundaries, redirects/canonical URLs, search indexing, email/deep links, tenant transfer, expiry, dangling-domain/takeover prevention, certificate/provider failure, support and safe removal.

Each route declares audience, user job, canonical source, freshness, render mode, cache policy, authentication/authorization, index/noindex, locale, analytics consent, loading/error/empty state, degradation, and support route.

Do not make one universal frontend cache, personalization rule, data loader, or search policy govern all surfaces. Public marketing freshness, private product consistency, billing authority, and status truth have different failure costs.

## 3. First value and onboarding

The first session should prove the promise with the least necessary commitment.

Choose deliberately among:

- direct use with local or guest state;
- guided interactive demo or safe sandbox;
- realistic sample workspace or template;
- import/connect existing data;
- signup first because identity, security, collaboration, or paid cost is intrinsic;
- sales/provisioned entry for a governed enterprise environment.

Do not demand email verification, organization creation, teammate invites, avatar/profile work, permissions, payment method, notification consent, long tutorials, or questionnaires before value unless the task intrinsically requires them.

Define:

```text
entry intent -> smallest necessary input -> first useful result
-> save/continue decision -> account or workspace continuity
-> next recurring-value action
```

Preserve entered work across authentication, checkout, errors, back navigation, refresh, device change, and account merge. Explain why a permission or sensitive field is needed at the moment of use. Let users skip optional setup and return later.

Measure time to first meaningful outcome, completion and failure by step, resume success, activation quality, early support/refund signals, and retained outcome—not onboarding completion alone.

## 4. Modern experience system

Modern means clear, fast, adaptive, trustworthy, and distinctive—not glass effects or constant motion.

### Information architecture

- Organize by customer jobs and objects, not company departments.
- Keep global, workspace, object, and account navigation distinct.
- Preserve useful URLs, history, deep links, back behavior, search, and breadcrumbs.
- Make tenant/workspace context visible before consequential actions.
- Provide sensible defaults, templates, undo/history, batch actions, and recovery.
- Surface state, owner, permission, cost, time, and consequence before commitment.

### Feedback and state

Every action needs proportionate feedback:

| Action | Feedback contract |
| --- | --- |
| Immediate reversible change | visible local result and undo where safe |
| Network mutation | pending state, duplicate-submit protection, retained input, success/failure and retry |
| Background job | queued/running/progress/partial/failure/completion, owner and notification preference |
| Destructive or costly action | consequence preview, explicit confirmation or step-up, audit and recovery policy |
| Cross-system action | authoritative status rather than optimistic fiction |

Design loading, skeleton only when structure is stable, empty, zero-result, partial, stale, offline, permission-denied, rate-limited, conflict, expired-session, dependency-down, success, error, and recovery states.

### Motion and transitions

Use motion to preserve spatial continuity, show causality, confirm state, or focus attention. Keep frequent paths quiet. Respect reduced-motion preference and preserve meaning without animation. Do not delay navigation, hide loading, create motion sickness, animate layout instability, or make route transitions depend on high-end hardware.

Treat browser transition APIs as progressive enhancement. A transition must be interruptible, preserve navigation/history and focus, survive unsupported browsers, and never become a data-consistency or task-completion dependency.

### Accessibility and input

Design semantic structure, visible focus, keyboard order, screen-reader names/states, text scaling/zoom, contrast, target size, captions/transcripts, reduced motion, error identification, and recovery from the start. Support touch, keyboard, pointer, voice, switch, and other applicable input without hover-only or gesture-only meaning.

### Low-end and failure quality

Declare budgets for startup, interaction, layout stability, transferred bytes, JavaScript execution, memory, storage, background work, battery, slow networks, API latency, large tenants, and long content. Test representative low-end hardware and degraded conditions; a desktop synthetic score is not device proof.

## 5. Retention and durable investment

Retention should come from compounding utility:

- saved work, history, preferences and reliable continuity;
- integrations and automations that remove repeated effort;
- collaboration, shared context and accountable handoffs;
- accumulated expertise, templates, configuration and insights;
- trust in security, recovery, support and predictable pricing;
- fresh value, improving outcomes and credible roadmap delivery.

Design legitimate ownership without hostage value. Users must retain recovery, export, deletion, documented downgrade behavior, migration paths, and understandable exit.

Use lifecycle contact only for a specific user job: finish setup, receive a requested result, avoid a real failure, learn a relevant capability, collaborate, renew an expiring commitment, or recover after inactivity. Every contact declares eligibility, consent/basis, value, frequency/cooldown, quiet hours, dedupe, locale, preference, unsubscribe/stop, failure, and outcome/countermetric.

Do not use streak loss, fake deadlines, hidden cancellation, sunk-cost pressure, inaccessible export, social obligation, or noisy notifications to make departure harder.

## 6. Capability sweep

Disposition at least these categories:

- product objects, workflows, search, import/export, history, automation and integrations;
- public marketing, pricing, content/docs, changelog, status, trust and developer surfaces;
- accounts, sessions, organizations, teams, roles, invites, audit and enterprise access;
- billing, entitlements, trials, promotions, invoices, tax, cancellation, refund and dunning;
- collaboration, sharing, comments, mentions, presence, notifications and email subscriptions;
- support, CRM/revenue handoffs, feedback, review solicitation and customer success;
- analytics, experimentation, observability, admin, jobs, webhooks and data operations;
- responsive web, PWA, mobile/desktop adapters, accessibility, i18n/RTL and low-end reach;
- privacy, security, abuse, child/regulated modes, backup/restore, incidents, migrations and shutdown;
- AI/agents, UGC/community, marketplace or API/developer ecosystem only where product semantics select them.

For a developer SaaS, also disposition public/API contracts, SDKs, service accounts, scoped/expiring credentials, sandbox/test mode, webhook delivery and replay, quotas/rate limits, usage and spend logs, budget caps/alerts, audit, deprecation/versioning, abuse controls, support diagnostics, and customer migration.

The sweep prevents omission. It does not require every feature. A narrow single-job SaaS may correctly reject community, push, native apps, AI, social, and complex enterprise access while still meeting all cross-cutting quality floors for what it selects.
