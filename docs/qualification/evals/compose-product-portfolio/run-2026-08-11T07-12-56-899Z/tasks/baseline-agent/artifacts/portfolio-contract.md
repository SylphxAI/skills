# Composable Product Portfolio Contract

- **Status:** Proposed — design and decision handoff. This is not implementation, merge, or live-delivery proof.
- **Scope:** one platform that also ships a mobile app, a dashboard, and an API SDK.
- **Method:** `compose-product-portfolio` → `references/composable-product-portfolio-method.md`.
- **Headline decision:** exactly **one standalone product** (the Platform). The mobile app and dashboard are **embedded composed-experience surfaces**. The API SDK is a **connector surface with its own release train, not a product**. Shared identity, entitlement, billing, and notifications are **shared substrate** with generic contracts only. Extraction conditions and the evidence that would flip each classification are recorded in §8.

---

## 1. Portfolio objective, customers, constraints, success measures

**Objective.** Keep a coherent portfolio where the Platform is the single durable product with a customer promise, and every other shipped artifact (mobile app, dashboard, SDK) is a surface or connector over the Platform's supported public contract. Internal consumers must use the same supported contract, failure behavior, and observability as external customers — no hidden APIs, no privileged database access.

**Target customers and recurring jobs (to be confirmed with evidence).**

| Customer | Recurring job |
| --- | --- |
| Platform customer | Use the Platform to run its core domain job (TBD: fill with product-specific jobs). |
| Mobile end user | Use the Platform from a phone: on-the-go access, push/timely actions, acceptable offline tolerance. |
| Dashboard operator / analyst | See and act on Platform state through authorized projections, without writing Platform truth directly. |
| Developer | Integrate their own system with the Platform through a supported, versioned contract and generated client. |

**Constraints.**

- One contract authority: the Platform's public contract (schema, semantics, versioning). All surfaces connect through it.
- Surfaces own their presentation, navigation, device-local cache, and projections — never the Platform's domain truth.
- No connector, shell, or shared substrate acquires cross-product business policy or authoritative state.
- No bundle or SKU is invented here; commercial packaging is deferred to the commercial decision standard (§11).
- Minimum viable number of products: a unit is not a product without an independent job, adoption journey, lifecycle, and contract.

**Success measures.**

- Exactly one standalone product unless an extraction condition in §8 is met.
- 100% of internal consumption (mobile app, dashboard) goes through the Platform's public contract, enforced by negative-access CI tests (§7) — zero direct database/module imports.
- The Platform contract's compatibility window (e.g., N supported versions) is honored by all consumers.
- Third-party developer onboarding time to first successful call is below the declared target (TBD).
- Mobile app and dashboard release independently of the Platform, coordinating only through declared contract-version windows.

---

## 2. Candidate surfaces and classification matrix

Each candidate classified on the method's eight axes.

| Axis | Platform | Mobile app | Dashboard | API SDK | Identity / Entitlement / Billing |
| --- | --- | --- | --- | --- | --- |
| Customer value | Owns the core job and measurable outcome | Delivers the Platform job on a phone | Projects Platform state for decision-making | Enables integration with the Platform | Generic preconditions of use, no standalone job |
| Semantic cohesion | Owns domain language, policy, and state | Owns UX and device-local cache only | Owns view semantics and projections only | Owns nothing; mirrors Platform schema | Owns its generic contract only |
| Adoption | Onboard/authz/use/offboard coherently without other products | No standalone journey — job refers to the Platform | No standalone journey — reads Platform data | No standalone journey — exists to call the Platform | Consumed via Platform flows |
| Lifecycle | Owns versioning, support, recovery, retirement | Release train is a packaging/lifecycle detail, not product identity | Same | Own semver/compat/deprecation as an artifact, not as a product | Generic service lifecycle |
| Change & failure | Independent release and failure containment | Changes are mostly client-side; server contract changes are lockstep by declaration | Same | Tracks Platform contract changes | Must be failure-aware, never silently global |
| Commercial posture | The offer | Add-on surface of the offer | Surface or internal ops tool (TBD) | Free artifact of the offer | Internal substrate; no separate invoice |
| Operations | Own SLO, support, cost model | Support via Platform support path + app channel | Same | Support via Platform support path + docs | Owned ops with SLOs |
| Composition | Contract provider | Consumer via typed contract | Consumer via typed contract | Generated adapter from one schema authority | Consumed by Platform through their contracts |

**Classification result.**

| Candidate | Primary classification | Owner |
| --- | --- | --- |
| Platform | **Standalone product** | Platform product owner |
| Mobile app | **Composed experience** (embedded surface of the Platform) | Platform product owner (app team) |
| Dashboard | **Composed experience** (embedded surface of the Platform) | Platform product owner (dashboard team) |
| API SDK | **Connector surface** (thin generated/curated client, own release train) | Platform contract authority |
| Identity, Entitlement, Billing, Notifications | **Shared substrate** | Respective substrate owners |

---

## 3. Orthogonal boundary map

Boundaries are deliberately not one-to-one. This portfolio maps them explicitly.

| Boundary | What it is here | Deliberately not |
| --- | --- | --- |
| Product | Platform only (one) | the mobile app, dashboard, SDK, or any service |
| Capability / bounded context | Platform-internal contexts (TBD: to be enumerated by the Platform team) | a product, repository, or service |
| Public contract | Platform API (REST + events, versioned), one schema authority | shared implementation or database |
| Connector | SDK (generated client); surface-side adapters; webhook delivery | semantic or workflow authority |
| Experience shell | Mobile app and dashboard: discovery, navigation, presentation | owner of the products/data they present |
| Bundle | None yet — only after a commercial decision (§11) | duplicated product semantics |
| Repository | Any layout that fits contribution and CI (monorepo or split); does not define product identity | product identity |
| Service / deployment | Platform may run one or several services; surfaces are separate deployables | bounded context or product identity |
| Runtime cell | Tenant/resource partition and failure blast radius for the Platform | product, Capability, or microservice |
| Trust boundary | OIDC + entitlement grants; surfaces are separate clients with no privileged network position | network hop |

---

## 4. Product-unit registry

### 4.1 Platform — standalone product

- **Identity and promise:** The Platform is the product that delivers the core customer job end-to-end (TBD: write the durable promise, e.g., "run and operate your <domain> reliably at scale").
- **Target buyer / user / independent jobs:** as in §1; the jobs must be nameable without referring to the mobile app, dashboard, or SDK.
- **Owned Capabilities:** the Platform's domain capabilities (TBD: enumerate); plus the public contract, identity/entitlement integration, metering, and lifecycle.
- **Excluded semantics:** presentation and device behavior of the mobile app; dashboard projection/UX decisions; client-library packaging; generic substrate contracts (identity, billing, notifications).
- **Authoritative state and write owners:** the Platform is the sole authoritative writer of domain state. All writes from surfaces arrive through its command endpoints. Device-local mobile state is authoritative only for offline UX (see §8, condition M1) and is reconciled through the Platform's sync contract.
- **Standalone journey:** discover, evaluate, onboard, authorize, use, offboard, and export — all coherent without the mobile app, dashboard, or SDK.
- **Public contracts:** versioned REST/GraphQL API and event stream (contract authority: Platform); generated SDK and webhook delivery; data export and documented deprecation.
- **Identity, tenancy, authorization, entitlement:** OIDC identity; tenant-scoped authorization; entitlement grants evaluated against platform-owned grants (evaluated by the entitlement substrate, authored by the Platform).
- **Versioning / compatibility / deprecation:** declared compatibility window; additive-first contract changes; deprecation policy with migration guides; clients generated from the schema authority.
- **SLO / capacity / cost / support / incident / recovery:** declared per-tier SLOs; capacity and cost model; support and incident ownership; documented recovery, including static-stability behavior when substrates degrade (§6).
- **Privacy / security / audit / compliance:** declared data classification, retention, audit events, and compliance obligations (TBD by domain).
- **Commercial posture:** the offer; pricing/packaging/SKU decisions deferred to the commercial decision standard.
- **Release / withdrawal / retirement:** versioned release train; data export window and documented replacement/retirement path.
- **Measures:** outcome adoption, retention, SLO attainment, third-party integration count, internal-consumption compliance (§7).

### 4.2 Non-product units

| Unit | Classification | Promise / boundary | State owned | Lifecycle | Exit path |
| --- | --- | --- | --- | --- | --- |
| Mobile app | Composed experience | "Use the Platform from a phone" — client over the public contract | Device preferences and cache only (offline queue if §8-M1 is met) | App release train; contract-window coordination | Retire as a client; consumers move to the contract |
| Dashboard | Composed experience | "See and act on Platform state" — read projections + authorized commands | View preferences only; never domain state | Release train; contract-window coordination | Retire or re-skin; consumers move to the contract |
| API SDK | Connector surface | "Integrate with the Platform from language X" — generated/curated client | None (mirrors Platform schema) | Semver + compatibility window + deprecation as an artifact | Deprecate versions per policy; replace with generated clients |
| Identity | Shared substrate | Identities, sessions, federation | Identity records only | Generic service lifecycle | Replacement via federation standard |
| Entitlement | Shared substrate | Evaluates product-owned grants | Grants metadata only | Generic service lifecycle | Replacement via grant-export + re-import |
| Billing | Shared substrate | Charges, invoices, metering contracts | Billing records only | Generic service lifecycle | Replacement via billing data export |
| Notifications | Shared substrate | Delivery of notifications | Delivery state only | Generic service lifecycle | Replacement via webhook re-delivery |

---

## 5. Connector graph

Directed graph. Every edge has one contract owner and one state owner. Surfaces are peers of the Platform through contracts, not children of a feature hierarchy.

```text
                      ┌──────────────────────────────┐
                      │        Identity (OIDC)       │◄───┐
                      └──────────────────────────────┘    │ E4
┌─────────────┐  E1   ┌────────────────────┐  E4/E5/E6   │
│ Mobile app  │──────►│                    │─────────────┘
└─────────────┘       │      Platform      │
┌─────────────┐  E2   │  (public contract) │
│  Dashboard  │──────►│                    │───► Events  (E7, to surfaces/consumers)
└─────────────┘       └────────────────────┘
┌─────────────┐  E3   ▲        │
│  API SDK    │───────┘        │ E4-E6
│ (generated  │                ▼
│  client)    │      ┌──────────────────────────────┐
└─────────────┘      │ Entitlement / Billing /      │
                     │ Notifications (substrates)   │
                     └──────────────────────────────┘
```

**Edge semantics (one row per edge; exact values are TBD and versioned with the contract).**

| Edge | Producer → Consumer | Contract owner | Semantics |
| --- | --- | --- | --- |
| E1 | Mobile app → Platform | Platform | Queries + commands over the public contract; OIDC identity propagation; tenant scoping; idempotent writes; client-side backoff and offline queue (if M1); quota + metering from Platform; versioned per compatibility window; correlated observability; declared degradation on Platform outage (cached/offline UX) |
| E2 | Dashboard → Platform | Platform | Read projections + authorized command endpoints only; same identity/tenant/authz as E1; no direct database access; rate limits + pagination; read-model freshness declared (eventual); degraded mode = stale projection banner, no write |
| E3 | SDK ↔ Platform | Platform (schema authority) | Generated client from the Platform's schema; the SDK translates/authenticates/routes only; it owns no policy or facts; schema compatibility tests in CI; replacement = regenerate from schema |
| E4 | Platform → Identity | Identity substrate | OIDC/SSO, sessions, federation; contract generic — Identity does not own Platform roles beyond what is declared; failure = fallback to cached admitted sessions with declared static-stability |
| E5 | Platform → Entitlement | Entitlement substrate | Evaluates grants authored by the Platform; grants cached with declared TTL; failure = deny-closed or last-admitted per declared policy, never silent grant |
| E6 | Platform → Billing | Billing substrate | Metering events, charges, invoices; telemetry is not a billing ledger; metering has idempotent submission + reconciliation |
| E7 | Platform → Consumers (events) | Platform | Domain events on the public contract; delivery via webhooks/stream with replay, ordering per key, idempotent consumer handling; no events exposing privileged internals |

**Cross-product workflows.** Any long-running flow spanning Platform + surface (e.g., mobile-initiated onboarding or approval) is coordinated by one explicit owner — the Platform process manager for server-side outcomes, or a customer-owned sequence where products stay independent. No distributed transaction hides in the connector layer.

**Explicit non-edges (enforced by tests, §7):** mobile ↔ dashboard direct; any surface → Platform database; any surface → Platform internal service; surface → substrate (all substrate access goes through the Platform contract, except identity login which uses the declared OIDC flow).

---

## 6. Shared substrate and experience-shell boundaries

**Shared substrate — generic contracts only.**

- Identity owns identities, sessions, and federation — not the Platform's role model.
- Entitlement evaluates Platform-authored grants — not product roadmaps or feature semantics.
- Billing owns charges, invoices, and metering contracts — not Platform feature semantics.
- Notifications own delivery — not the domain decision to notify.

**Static stability.** No substrate is a synchronous global dependency of every serving request. Admitted state is cached or degraded explicitly (declared TTLs, deny-closed vs. last-admitted policies, offline UX). The only synchronous critical path is the Platform's own public contract (§9).

**Experience shells.** The mobile app and dashboard own navigation, presentation, projections, and (mobile) device cache. Neither owns or writes Platform domain state; neither is the semantic parent of the Platform. A future suite shell or brand hub may discover and compose both, but it never becomes their owner.

**Bundles.** None are defined in this contract. Any bundle must reference product and entitlement authorities without copying their semantics; that decision belongs to the commercial decision standard.

---

## 7. Dogfooding matrix

Dogfooding is a proof obligation, not a privilege. The mobile app, dashboard, and the Platform's own services must consume the same supported contract and client as the declared customer class.

| Internal consumer | Contract used | Allowed differences | Required evidence (CI + live) |
| --- | --- | --- | --- |
| Mobile app | Public mobile-facing contract (same schema as third parties) | Internal service identity / private networking | Auth required; no hidden endpoints; offline cache behaves identically for third-party clients; quota and failure telemetry visible; negative-access tests |
| Dashboard | Public read/command endpoints | Internal service identity | No direct DB, no privileged service calls; stale-projection behavior declared and tested; write path only via command endpoints |
| Platform services ↔ SDK | Public SDK (generated from schema) | Internal build path | SDK used by at least one real Platform-side consumer; schema-compat fixtures; replacement test (regenerate SDK, suite passes) |
| All | Same versioning, deprecation, incident, and support lifecycle as external customers | — | Compatibility window enforcement; failure-injection tests; observability parity |

**Hard negative tests (fail CI if violated):** direct database access from any surface; import of Platform private modules from surfaces; calls to unversioned/internal-only endpoints; surface-to-substrate bypass; entitlement bypass; undocumented privileged grants. These tests are mandatory for every release, not a one-time audit.

---

## 8. Decisions: keep / extract / merge / replace / retire

| Unit | Decision | Expected value of the decision | Permanent cost | Flip conditions (extract) |
| --- | --- | --- | --- | --- |
| Platform | **Keep as the sole standalone product** | Single contract authority, one lifecycle, coherent domain ownership | Platform release/contract changes are the portfolio's shared critical path | Not applicable |
| Mobile app | **Keep embedded as composed experience** | No second identity/entitlement/support/compat surface; one product promise | App must coordinate contract-version windows | **M1:** real offline-first job with device-local authoritative state (e.g., offline data capture) that must sync — then the app owns device-side state and its own sync contract; **M2:** a distinct buyer class with an independent job not nameable through the Platform — then re-run the independent product test in §2 before extracting |
| Dashboard | **Keep embedded as composed experience** | No duplicated lifecycle; projections stay close to contract | Dashboard semantics must stay projections, not a second data model | **D1:** dashboard serves an independent analytics job over multiple authoritative sources with its own buyers and contract — then extract as a read-only product over Platform projections |
| API SDK | **Keep as connector, own release train, not a product** | Generated from one schema authority; no product overhead (identity, billing, support queue) | SDK compatibility windows and deprecation policy must be maintained | Only if the SDK becomes a standalone developer platform with its own customer job — not evidenced today |
| Identity/Entitlement/Billing/Notifications | **Keep as generic shared substrate** | One consistency/economics point per generic capability | Substrates must stay generic; failure modes declared | If any substrate accumulates Platform domain policy — then it has become a hidden product and must be cut back |

**Rejected alternatives (with reason).**

- **Four-product portfolio** (Platform + mobile + dashboard + SDK as products): adds four identities, entitlement models, support queues, and compatibility windows for surfaces that have no standalone journey; permanent cost far exceeds option value. Rejected under the independent product test.
- **Platform as semantic parent of the surfaces**: violates peer topology; the shell is not the owner of the product it presents.
- **Connector as workflow owner** (e.g., SDK or gateway holding cross-product business truth): violates invariant 4 — connectors translate and reconcile; they do not own policy or facts.
- **Dashboard as a second write path** (direct state or "dashboard DB"): would duplicate Platform authority and fail the no-hidden-authority gate.

**Merge/replace/retire:** nothing in scope today; retirement paths are recorded per unit in §4.2. This section must be revisited when evidence from §10 arrives.

---

## 9. Anti-fragmentation and shared-critical-path review

**Permanent complexity of the accepted shape:** 1 product, 1 public contract (schema authority), 2 experience surfaces, 1 SDK connector, 4 generic substrate contracts, 7 typed edges, 1 trust model (OIDC + grants).

**Comparison — extract everything:** 4 products → 4 customer concepts, 4 onboarding journeys, 4 support queues, 4 compatibility windows, duplicated entitlement/billing/export interactions, and 4× the distributed failure modes — for surfaces whose jobs are only nameable through the Platform. No material option value today. Rejected.

**No hidden monolith:** all state write paths and cross-surface interactions flow through the Platform's public contract; substrates own only generic state; shells own only projections. Composition is explicit, not emergent.

**No fragmented distributed system:** one schema authority and generated clients; every edge has one contract owner, versioning, idempotency, quota, failure, and replacement behavior (§5). No synchronous dependency cycles (graph is acyclic; events are one-way from Platform to consumers).

**Shared critical path:** the Platform's public contract is the single synchronous dependency of both surfaces. Declared behavior: platform SLO is the portfolio floor; surfaces degrade to cached/offline/stale-projection states with visible banners; identity/entitlement are cached with declared TTLs so a substrate outage does not take down the serving path.

---

## 10. Assumptions, unresolved evidence, next discriminating actions

**Assumptions (unverified).**

- The Platform's domain, jobs, and buyers are unspecified — product identity, capabilities, and SLO values are placeholders (TBD) to be filled by the Platform product owner.
- The mobile app is today a thin client over the Platform (no offline-first requirement confirmed).
- The dashboard is an internal/ops surface (audience unconfirmed).
- The SDK is a generated client (language matrix unconfirmed).
- No bundle/SKU exists; commercial posture is intentionally left open.

**Unresolved evidence.**

- Whether the mobile app has an independent offline-first job (M1) or distinct buyer class (M2).
- Whether the dashboard serves an independent analytics job (D1) or only the Platform operator.
- Third-party developer adoption of the SDK — measured onboarding time.
- The Platform's entitlement model and whether grants are tenant-scoped by default.
- Data classification, retention, and compliance obligations for the Platform domain.

**Next discriminating actions (with owners).**

1. Platform product owner: enumerate Capabilities and write the Platform's durable promise; fill all TBD placeholders in §4.1.
2. Mobile team: run the independent product test (M1/M2) with real usage data — measure offline sessions, device-local state needs, and job naming.
3. Dashboard team: decide audience (internal ops vs. customer analytics) — this resolves D1.
4. Platform engineering: publish the schema authority (OpenAPI), generate the SDK from it, and enforce SDK-compat fixtures in CI.
5. Platform engineering: add the negative-access CI suite from §7 and make it release-blocking.
6. Commercial: run the commercial decision standard for packaging/SKUs and any bundle; register the outcome as an ADR.
7. Lifecycle: declare the contract compatibility window, SLOs, and static-stability policies; register as ADRs.

---

## 11. ADR and implementation handoffs

This contract is the accepted-shape proposal; it must be adopted through ADRs without duplicating their facts:

- **ADR-P1 Portfolio shape:** one product (Platform); mobile app and dashboard as composed experiences; SDK as connector surface; shared substrate list. Owner: Platform product owner.
- **ADR-P2 Public contract authority:** schema authority, versioning/compatibility window, deprecation policy, event contract. Owner: Platform engineering.
- **ADR-P3 Trust and entitlement:** OIDC identity, tenant-scoped grants, substrate static-stability policies. Owner: Platform security/engineering.
- **ADR-P4 Commercial packaging (future):** SKU/bundle decisions via the commercial decision standard; must reference product and entitlement authorities, not copy semantics. Owner: Commercial.

**Handoffs (do not duplicate their facts here):** commercial → `commercial-decision-standard`; delivery/CI of the negative-access suite → `delivery`/`production-review`; product-specific promise and experiences → `design-product`; live delivery evidence → `build-distribution-readiness`/`drive-to-delivery`.

**Completion note:** this contract is complete as a design and decision handoff when every candidate has one justified classification, the selected product has an independently usable lifecycle, every edge has one typed owner and failure contract, shared substrate owns no hidden product truth, and composition and fragmentation-resistance are both demonstrated. It is not implementation or live-delivery proof.
