# SaaS Identity, Commerce, And Autonomous Operations

## Contents

1. Identity and organizations
2. Subscription and entitlement lifecycle
3. Notifications and email subscriptions
4. Support, CRM and customer operations
5. Security, privacy and data continuity
6. Scale-ready autonomous operations
7. Current-authority sources

## 1. Identity and organizations

### Account lifecycle

Model guest/anonymous state where applicable, signup, verification, sign-in, federation/passkey, password setup, password reset, MFA/2FA enrollment and recovery, device/session review, step-up, lock/rate limit, suspected takeover, account merge, email/identifier change, logout, closure, deletion, export and post-closure retention.

Password reset must not reveal account existence, send passwords, rely on security questions, or create unbounded reusable tokens. Bind tokens to purpose, account, expiry and single use; rate-limit requests; preserve sessions deliberately; notify through trusted channels; and provide a safe path when the email or factor is unavailable.

MFA is risk- and audience-aware, not a checkbox. Prefer phishing-resistant methods where applicable, support more than one recovery path, protect factor replacement, expose active sessions/devices, and avoid turning lost-factor recovery into a weaker takeover route. Require stronger controls for administrators, money movement, security settings, tenant ownership and high-impact exports.

### Organizations and tenancy

Define user, account, person, organization, workspace, membership, role, invitation, group, service account, API credential and billing account as distinct objects where they differ. Specify:

- tenant key and isolation at authorization, database/query, cache, search/vector, logs, jobs, files, exports and analytics boundaries;
- owner/admin/member/guest/custom-role capabilities and separation of billing, security and content authority;
- invite create/accept/expire/revoke, wrong-account handling, domain claims, transfer of ownership, last-admin and orphaned-workspace behavior;
- cross-tenant switching, deep links, account merge, duplicate identities and shared-email edge cases;
- audit event, actor, target, before/after, reason, source, policy version and retention;
- SSO, SCIM, directory sync, just-in-time provisioning, service accounts and delegated admin only when enterprise semantics select them.

Frontend hiding is not authorization. Every request and background job carries verified actor, tenant, permission and resource context.

## 2. Subscription and entitlement lifecycle

Keep five canonical domains separate:

1. Pricing owns buyer, value metric, packages, limits and approved offers.
2. Catalog owns versioned saleable products/prices and channel mappings.
3. Payment owns provider events, money ledger, invoices, tax, settlement and reconciliation.
4. Entitlement projection owns what capability/limit is available from authoritative events.
5. Product owns the user-visible behavior of each entitlement and limit.

Model trial eligibility/start/end/conversion, coupon/promotion qualification, checkout, payment success/failure, pending/asynchronous confirmation, renewal, seat/usage changes, upgrade/downgrade, proration/credit, pause, cancellation at period end, immediate termination where lawful/approved, grace, dunning, invoice/credit note, refund, dispute/chargeback, restore/reconcile, manual goodwill and account closure as distinct states.

### Plan and promotion rules

- Choose packages and a value metric through `saas-subscription-pricing`; do not make a UI tier table the decision.
- Give every offer a version, audience, eligibility, start/end, stacking/exclusion, qualification, grant, reversal, abuse, locale/currency/tax, disclosure, renewal and support contract.
- A trial should demonstrate the recurring value. Decide whether a payment method is intrinsic, disclose conversion and renewal, remind where required or trust-beneficial, and provide simple cancellation.
- Long-tenure, win-back, education, migration and targeted offers may be useful, but must be deterministic, explainable, non-discriminatory on protected/vulnerable traits, supportable and measured for retained contribution and regret.
- Build pricing, payment and entitlement adapters completely when selected; keep unapproved price experiments and live spend/exposure dormant.

### Refund and proration rules

Cancellation stops or changes future renewal; refund returns money; entitlement consequence changes access. They are not the same event.

Do not promise “half back” or proration universally. Determine current law, contract, platform/provider authority, plan type, service period, usage/consumption, company fault, duplicate/error, goodwill envelope and tax/fee treatment. Make the policy understandable before purchase, apply it consistently, and route provider truth and consequences to their specialists.

After paid access ends, define read-only, export, deletion, collaboration, API, storage, retention and restoration behavior. Never hold user-created data hostage to force renewal.

## 3. Notifications and email subscriptions

Separate:

- transactional/service messages necessary to deliver or secure the requested service;
- requested result or collaboration messages;
- product education and lifecycle messages;
- marketing newsletters and promotions;
- legal, billing, security and incident notices with their own authority.

When the product has asynchronous work, collaboration, security history, or consequential background changes, provide a durable in-product inbox or activity history as the customer-visible source of state. External messages deep-link into that source rather than becoming the only record.

For every category and channel define consent or other current authority, eligibility event, user value, payload sensitivity, locale, sender identity, frequency/cooldown, quiet hours, cross-channel dedupe, batching/digest, preference, unsubscribe/stop, suppression, bounce/complaint handling, retries, expiry, provider failover, archive and outcome/countermetric.

Use an accessible preference center with granular categories. One global unsubscribe must not silently suppress legally or operationally necessary messages, and a marketing opt-out must propagate to every sender/export. Do not make notification permission a first-use toll or condition core service on marketing consent.

Email subscriptions require verified ownership or appropriate confirmation, sender/domain authentication such as current SPF, DKIM and DMARC configuration, transport protection, list provenance, suppression truth, one-click unsubscribe where applicable, complaint/bounce handling, retention, vendor exit and deliverability monitoring. Purchased or scraped lists are not growth infrastructure.

## 4. Support, CRM and customer operations

CRM is canonical only for declared relationship and commercial workflow facts. Product usage, identity, contracts, invoices, entitlements, incidents, support cases and finance remain with their owners. Use stable IDs and timestamps rather than copied snapshots.

Provide support with bounded account, tenant, plan, entitlement, provider trace, product version, device/browser, recent job, incident and audit context so users do not repeatedly send screenshots. Redact sensitive data and require step-up or specialist authority for money, identity, deletion, security and enforcement actions.

If support impersonation or “view as customer” is selected, make it scoped, time-limited, purpose-bound, customer/tenant-policy aware, visibly distinguishable, non-exportable by default, strongly authenticated, recorded with actor/reason/ticket, unable to reveal secrets or authentication factors, and automatically terminated. Prefer diagnostic projections over impersonation.

Compose:

- `customer-support-operations` for channels, taxonomy, queues, service objectives, knowledge, QA and product-feedback closure;
- `customer-support-case-resolution` for one customer's facts, reply, remedy, protected handoff and verified closure;
- `revenue-operations-review` for lead/account/opportunity/renewal commercial workflow;
- `customer-success-operations-review` when proactive adoption, health and renewal intervention is the independent system.

Also route exact enterprise access, revenue/CRM, formal accessibility conformance, customer data migration, data residency, audit export, developer quota/credit abuse, and security assurance artifacts to their available specialists rather than hiding them inside the blueprint.

## 5. Security, privacy and data continuity

Threat-model public content, authentication, recovery, tenant authorization, APIs/webhooks, sessions, admin/support, billing, files, integrations, exports, deletion, logs, analytics, AI, supply chain and third parties.

Define secure defaults, secrets/credential boundaries, least privilege, authorization tests, rate/abuse limits, TLS and current security-header/content-security policy, CSRF/XSS/injection controls, dependency and content security, encryption/key ownership, audit, vulnerability intake, detection, incident, recovery and security communication. Do not claim security from TLS, a login page, a framework default or a one-time scanner.

Create a purpose-bound data inventory covering collection, derived data, SDKs, vendors/subprocessors, access, region, retention trigger, deletion/anonymization, backup expiry, legal/security hold, export and evidence. Unselected or disabled modules must not initialize SDKs, collect data, request permissions or create retention.

Backups are not recovery until restore is tested. Define numeric RTO and RPO plus object/database/file/config/secret/index recovery objectives, tenant-scoped restore, corruption, partial restore, schema/version compatibility, deletion/retention interaction, incident ownership and observed restore proof.

## 6. Scale-ready autonomous operations

### Numeric envelopes

Declare expected and maximum tenants, users, roles, objects, storage, requests, jobs, webhook events, notifications, messages, imports/exports, API keys, integrations, regions/locales and billing events. Include burst, skew, hot tenant/key, retry storm, provider backlog, poison event, large export, migration and regional dependency failure.

### Reliable async work

Every job/webhook declares stable identity and idempotency, source event/version, tenant, ordering, dedupe, retry budget/backoff, expiry, dead-letter/quarantine, side-effect ledger, observability, replay, cancellation, customer state, support trace and recovery. “Retry later” is not a state machine.

### Exposure automation

Availability policies may use role, entitlement, contract, territory, age, capability, dependency health, migration, capacity, security, support, legal and evidence state. Use versioned desired state, canaries, cohort stickiness, caps, hysteresis/cooldown, observed readback, automatic hold/pause/rollback/forward-fix and immutable decision history.

The builder, evaluator, exposure controller and evidence recorder should have separate identities and authority. No agent may approve its own high-impact change, raise its own cap, rewrite outcome truth or delete the audit trail.

### Operations portfolio

Cover:

- health/readiness, customer-journey service-level indicators and objectives, traces/logs/metrics and synthetic plus real task probes;
- capacity prediction, rate limits, quotas, tenant fairness and degraded modes;
- schema/data/config/entitlement migrations, compatibility and rollback/forward-fix;
- dependency/API/browser/search/provider drift and automatic withdrawal of stale adapters;
- incident detection, containment, status, support, correction, recovery verification and post-incident prevention;
- admin/support tooling with typed actions, preview, confirmation, reason, approval, idempotency, audit and reversal;
- data export/deletion, vendor exit, product sunset, billing stop, customer communication and durable artifact handoff.

Generated designs, tests and dashboards are candidate evidence. `scale-verified` requires representative measured workload and recovery; `production-proven` requires an exact released identity and observed live behavior.

## 7. Current-authority sources

Retrieve current rules from the applicable authorities, including:

- [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OWASP Forgot Password Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html)
- [NIST Digital Identity Guidelines](https://pages.nist.gov/800-63-4/)
- [FIDO Alliance passkey resources](https://fidoalliance.org/passkeys/)
- [RFC 8058 one-click unsubscribe](https://www.rfc-editor.org/rfc/rfc8058)
- [Google email sender guidelines](https://support.google.com/a/answer/81126)
- [AWS SaaS tenant isolation](https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/tenant-isolation.html)
- [OpenTelemetry observability primer](https://opentelemetry.io/docs/concepts/observability-primer/)
- [Google SRE workbook on SLOs](https://sre.google/workbook/implementing-slos/)
- [Stripe subscription lifecycle](https://docs.stripe.com/billing/subscriptions/overview), [webhooks](https://docs.stripe.com/webhooks), and [refunds](https://docs.stripe.com/refunds) as provider-specific examples, never universal product policy
- [EU Consumer Rights Directive](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32011L0083)
- [EU General Data Protection Regulation](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng)
- the selected payment processor, tax service, email provider, identity provider, app marketplace and regulator documentation.

These sources do not decide product scope or certify compliance. Record the exact source/version, jurisdiction, retrieval date, uncertainty and owning specialist decision.
