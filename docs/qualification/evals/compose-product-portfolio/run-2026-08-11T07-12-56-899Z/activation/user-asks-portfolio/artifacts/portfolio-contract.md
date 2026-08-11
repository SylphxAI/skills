# Composable Product Portfolio Contract

**Scope:** Platform (core web product), mobile app, dashboard, API SDK, shared auth, billing connector.
**Status:** Accepted portfolio design and decision handoff. Not implementation or live-delivery proof.
**Owner:** Portfolio product leadership. Engineering, lifecycle/support, and commercial owners execute the handoffs in Section 9.

---

## Decision summary

- **One standalone product: the Platform.** It owns the core customer job, all domain semantics and authoritative state, one customer support path, and one product promise. Its public API is its supported contract.
- **Mobile app, dashboard, and API SDK stay embedded** in the Platform product as *surfaces* (client surface, composed-experience surface, contract surface). Each may keep its own repository and release pipeline — that does not make it a product.
- **Auth (identity) is shared substrate**, not a product. It owns identities, sessions, and federation only.
- **Billing is shared substrate + one thin connector.** Billing substrate owns the ledger (charges, invoices, metering). The billing connector translates, routes, and reconciles; it never owns billing truth, entitlement rules, or platform domain policy.
- **Retire:** hidden/private APIs, direct database access from surfaces, hand-maintained SDK forks that drift from the schema, duplicate billing/invoicing logic in the platform, embedded legacy auth, dashboard write paths, and any product ambition (separate pricing, support queues, P&L) for the three surfaces.
- **Extract nothing today.** A conditional path exists for the mobile app if and only if it develops a genuinely distinct customer job (Section 7, decision D-2).

---

## 1. Portfolio objective, customer jobs, constraints, success measures

### Objective
Keep the portfolio at the smallest number of independently meaningful units that preserves ownership and option value: one product, two shared substrates, one connector. Maximize a coherent suite experience (one identity, one navigation, one support path) without creating a hidden monolith or a fragmented distributed system.

### Customer jobs
| Surface | Job it serves | Outcome |
| --- | --- | --- |
| Platform (web) | Run the platform's core domain workflow | Complete the core job end-to-end in the browser |
| Mobile app | Access the same core job from a phone | Complete the same job with mobile-appropriate UX, offline tolerance as declared |
| Dashboard | Oversee and analyze activity | Make decisions from authorized projections; no data entry or workflow ownership |
| API SDK | Integrate or automate the platform programmatically | Drive the same core job through a supported, versioned contract |

All four serve **one** durable job family: "operate and integrate with the platform." None of them names an outcome that exists without the platform.

### Constraints
- One identity system and one billing connector are shared across all surfaces; they must not be duplicated or bypassed.
- Mobile must satisfy app-store release cadence; SDK must satisfy package-release and compatibility expectations.
- The platform's serving path must not synchronously depend on billing.
- The organization today has a single customer support organization and no separate commercial entities per surface.

### Success measures
- Product count: exactly 1 standalone product; 2 shared substrates; 1 connector type.
- Support paths: 1 customer support queue for the product (surfaces route by tag), substrate incidents internal.
- Zero backdoor edges: no surface uses hidden endpoints, direct database access, or customer-impossible privileges (negative tests in Section 6).
- Contract health: 100% of SDK clients generated from the single schema authority; surface and customer traffic on the same API version range.
- Billing reconciliation completeness: every metering event settles to one invoice line; connector holds zero ledger or entitlement state.
- Adoption per surface measurable independently (mobile DAU, dashboard weekly actives, SDK package installs) as product health signals, not as product boundaries.

---

## 2. Candidate classification matrix and orthogonal boundary map

### Classification matrix

| Candidate | Customer value | Semantic ownership | Independent adoption | Own lifecycle | Change/failure value | Commercial posture | Operational coherence | Composition via contract | **Classification** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Platform | Core job | Owns domain state, policy, language | Yes — standalone journey | Yes | Yes | Product | Yes | Public API | **Standalone product** |
| Mobile app | Real but same job | None — platform state | No (needs platform) | Release only, not product lifecycle | Release independence only | Surface of product | Shares product SLO/support | Via platform API | **Embedded client surface** |
| Dashboard | Real but oversight | None — projections only | No (needs platform) | No | Independent deployment only | Surface of product | Shares product SLO/support | Via platform API (read projections) | **Embedded composed-experience surface** |
| API + SDK | Real but integration to platform job | None — contract of platform | No (needs platform contract) | Package release, not semantic lifecycle | Package release independence | Surface of product | Shares product support | **Is** the product's supported contract | **Embedded contract surface** |
| Auth / identity | Internal enabler | Identities, sessions, federation | Internal only | Own contract | High (blast radius) | Shared substrate | Own SLO/ops | OIDC | **Shared substrate** |
| Billing primitives | Internal enabler | Charges, invoices, metering ledger | Internal only | Own contract | High (money movement) | Shared substrate | Own SLO/ops | Billing API + events | **Shared substrate** |
| Billing connector | Internal enabler | None — translates/routes/reconciles | Internal only | Versioned adapter | Replaceable edge | Connector | Own SLO/ops | Billing charge/statement contract | **Connector** |

### Orthogonal boundary map
Product identity, repository, release unit, deployment, and support path are independent axes. The map is many-to-many:

| Unit | Product identity | Semantic/state owner | Repo | Release unit | Deployment | Support path |
| --- | --- | --- | --- | --- | --- | --- |
| Platform web | Platform product | Platform | `platform` repo | Continuous | Platform cells | Product support |
| Mobile app | Platform product | Platform | `mobile` repo (own repo OK) | App-store release | Store/CDN | Product support, `mobile` tag |
| Dashboard | Platform product | Platform (projections) | `dashboard` frontend (own repo OK) | Continuous | Platform web cells | Product support, `dashboard` tag |
| API SDK | Platform product | Platform (contract authority) | `sdk` repo | Package release | Package registry | Product support, `sdk` tag |
| Identity | Shared substrate | Identity | `identity` repo | Own release | Identity cells | Internal ops (substrate) |
| Billing | Shared substrate | Billing | `billing` repo | Own release | Billing cells | Internal ops (substrate) |
| Billing connector | Connector | Billing (contract owner) | `billing-connector` repo | Own release | Edge workers | Internal ops (substrate) |

**Consequence:** the mobile app having its own repository and store release is not evidence of a product. The dashboard having its own frontend is not evidence of a product. The SDK having a package registry is not evidence of a product. Only the independent product test (Section 3 predicates) decides.

---

## 3. Product-unit registry

### 3.1 Platform (standalone product)

```text
identity            Platform
promise             The durable core job: <platform's core domain outcome> — reliable, integrable, and
                    overseen from any surface.
buyer/user          Buyer: the person who purchases platform access. Users: operators of the core job,
                    overseers on the dashboard, developers integrating via API/SDK.
independent jobs    Complete, operate, and audit the platform's core workflow; integrate and automate it.
owned capabilities  Core domain workflow(s); tenant and user management semantics; domain data;
                    authorization policy for its own domain; read projections for dashboards; public API,
                    events, webhooks, data export.
excluded semantics  Identity storage and sessions (Identity substrate); charges, invoices, metering ledger
                    (Billing substrate); presentation of other products' truth (never).
authoritative state Domain entities and projections derived from them. Write paths only through platform
                    commands; dashboard and mobile never write domain state directly.
standalone journey  Discover, evaluate, onboard, authorize, use, offboard without any other product.
public contracts    Platform API (REST/graph as declared), event stream, webhooks, data export. One schema
                    authority; SDKs generated from it. Versioned with compatibility window.
identity/tenancy    Users authenticate via Identity (OIDC); tenancy is platform-owned; authorization is
                    evaluated in the platform against platform-owned grants.
versioning          API versioning and deprecation policy owned by platform; compatibility window declared.
SLO/support         Product SLO; single customer support queue; incident and recovery per platform SLO.
privacy/security    Data classification, retention, audit, and export obligations owned by platform.
commercial posture  Paid product; packaging/SKU decisions deferred to a Commercial ADR (see Section 9).
exit/retirement     Data export contract; supported deprecation of API versions; documented replacement.
measures            Core-job completion rate; adoption per surface; contract health; support deflection.
```

### 3.2 Embedded surfaces (recorded inside the Platform registry, not separate products)

| Surface | Role | Delivery cadence | Owns state? | Support |
| --- | --- | --- | --- | --- |
| Mobile app | Client of the platform's public contract | App-store release pipeline | No | Product support, `mobile` tag |
| Dashboard | Composed experience; read-only authorized projections | Continuous | No (no write path) | Product support, `dashboard` tag |
| API SDK | Generated client artifacts from the platform schema | Package release pipeline | No | Product support, `sdk` tag |

### 3.3 Identity (shared substrate)

```text
promise            One identity, session, and federation contract for every product and surface.
owns               Identities, sessions, federation, token issuance, key rotation. Not per-product roles.
contract           OIDC/OAuth2 (discovery document); tokens carry subject, tenant, and minimal claims.
SLO/ops            Own SLO; internal incident/recovery; no customer support queue of its own.
static stability  Token validation must not require a synchronous substrate call per request (cached JWKS,
                   declared degradation).
exit/retirement    Not a customer product; retirement only via portfolio-level migration plan.
```

### 3.4 Billing (shared substrate) + Billing Connector (connector)

```text
promise            One ledger of charges, invoices, metering, and provider statements.
owns               Billing ledger, invoice state, metering contract, reconciliation status. Not product
                   feature semantics, not entitlement rules, not usage meaning.
contract           Billing API + charge/metering events; provider statements via connector.
connector          The billing connector is an adapter owned by Billing that translates platform metering
                   events into charge requests, routes to the external provider, ingests provider
                   statements/webhooks, and reconciles. It holds no ledger, no entitlement grants, and no
                   platform domain facts.
SLO/ops            Own SLO (ledger), connector SLO (delivery + reconciliation); internal support.
```

---

## 4. Typed connector graph

Nodes: **P** Platform, **I** Identity, **B** Billing, **C** Billing Connector, **X** external payment provider (PSP). Customer/developer consumption of P's public API is the product contract, not a connector.

```text
[customers / developers] ──▶ P ──▶ I        (OIDC; identity owns tokens; platform owns authz)
   surfaces (mobile, dashboard, SDK) ──▶ P (same public contract as customers — dogfooding)
P ──▶ C ──▶ B ──▶ X                        (metering events → charges → provider; statements back)
B ◀── C ◀── X                              (webhooks/statements, reconciled)
```

### Edge E1: P → I (and callbacks) — authentication

- Producer/consumer: P consumes I. Contract owner: **Identity**.
- Schema authority: Identity (OIDC discovery); generated clients from one source.
- Semantics: authorize requests, issue/refresh tokens, federated login; supported version range declared by Identity.
- Identity propagation: subject + tenant propagate; P enriches with platform roles from its own grants (Identity does not own platform role models).
- Idempotency/ordering: token issuance is idempotent per auth-code; no ordering concern.
- Failure behavior: login is an interactive path (bounded sync dependency); serving path is static-stable via cached JWKS; on substrate outage, active sessions continue, new logins degrade with declared message.
- Observability: correlated request IDs; token validation metrics; customer-visible errors only at login.
- Replacement: rotate keys, versioned discovery, contract tests; retirement only with portfolio migration.

### Edge E2: P → C → B — metering and charges

- Producer/consumer: P produces usage/metering facts; C adapts; B owns the charge ledger. Contract owner: **Billing** (charge/metering contract).
- Schema authority: Billing owns the metering/charge schema; C is the generated adapter; P never implements provider protocol itself.
- Semantics: P emits domain-meaningful metering events (e.g., seats, API calls) with a stable event schema; C translates to B's charge contract. Event semantics, not provider semantics, are the platform's responsibility; charge semantics are Billing's.
- Identity/tenancy: tenant id and required metering dimensions only; no PII beyond what billing legally requires.
- Idempotency/ordering/consistency: platform-side outbox; events carry idempotent event IDs; at-least-once delivery; B deduplicates. Eventually consistent; no distributed transaction.
- Timeout/retry/quota: bounded retry with backoff; C applies backpressure and quota per tenant; overload must not block platform serving.
- Reconciliation: daily reconciliation job (B-owned) matches events → charges → provider statements; missing/duplicate lines surface as exceptions with owner and SLA.
- Entitlement source: entitlement grants are evaluated in P from platform-owned policy. C and B never decide what a tenant is entitled to; they bill what P reports.
- Privacy/audit: metering classification and retention owned by Billing; full audit trail; no telemetry treated as a billing ledger.
- Failure/static stability: P never blocks serving on B; if B/C are impaired, events accumulate in the outbox and reconcile later; customer sees no billing-related serving failure.
- Replacement: connector is replaceable without changing P's event contract or B's ledger; compatibility and migration tests required per connector version.

### Edge E3: B ↔ X — provider statements (through C)

- Contract owner: **Billing** on the B side; external PSP contract on the X side. C translates between them.
- Semantics: C submits charge requests, ingests provider webhooks/statements, and normalizes them into B's ledger.
- Reconciliation: statement-level reconciliation is B-owned; C surfaces provider discrepancies as exceptions; compensation/refunds are B-owned workflows, never connector-side.
- Failure: provider outage → bounded retry, statement replay, no silent charge loss; static stability for B and P.
- Replacement: PSP swap is a connector change plus B-side statement mapping; no P change.

### Cross-product workflows

- **Invoicing** is a long-running process owned by B: timers, retries, compensation, visible state. P only emits events.
- **Entitlement activation** on purchase is an event-driven flow: B emits purchase/change events; P ingests idempotently and updates its own grants. No distributed transaction; convergence via reconciliation.
- **Login/SSO** is the only synchronous cross-unit flow, and it is bounded to the interactive login path.

---

## 5. Shared substrate, experience shell, and bundle boundaries

- **Identity** owns identities, sessions, and federation — not platform roles, not surface preferences.
- **Billing** owns charges, invoices, and the metering contract — not product feature semantics, not roadmap.
- **Entitlement infrastructure** (when it grows beyond one product): evaluates product-owned grants; grants remain authored and owned by P. Today, entitlement is an embedded Capability of P.
- **The dashboard** is a composed-experience *surface* of P, not an experience shell over multiple products (there is only one product). If a second product graduates, the dashboard may become a shell presenting authorized projections from each product's contract — it still never owns their truth.
- **No bundle exists today** (one product). If packaging combines platform tiers with add-ons later, the bundle references product and entitlement authorities; it does not copy entitlement, price, or catalog truth.
- **Shared shell:** one identity, one navigation, one design system, consistent API/SDK conventions across surfaces are encouraged — they reduce friction and do not change ownership.

---

## 6. Dogfooding matrix

Every internal consumer-producer edge uses the same supported contract, lifecycle, failure behavior, and observability as external consumption.

| Internal edge | Supported edge used | Privileged path forbidden | Evidence required |
| --- | --- | --- | --- |
| Mobile app → P | Platform public API (same version range as customers) | Hidden mobile-only endpoints; direct DB access; internal service identity with extra powers | Negative-access tests; traffic parity checks; failure-injection tests |
| Dashboard → P | Platform public API read projections | Dashboard writes; direct DB reads; unpublished projection endpoints | Read-only contract tests; write-denial tests; projection freshness tests |
| SDK team → schema | Generated from the single schema authority | Hand-maintained parallel clients; private schema access | Generation reproducibility; contract tests per language |
| Platform → Billing | Billing charge/metering contract via C | Platform writing to billing DB; platform calling PSP directly; unmetered billing | Outbox tests; idempotency tests; reconciliation readback; negative DB-access tests |
| Platform → Identity | OIDC contract | Session store owned by platform; privileged token issuance | OIDC conformance tests; JWKS rotation tests |

**Claims are not evidence.** Each row requires the listed tests to pass in CI, plus quarterly backdoor audits (search for hidden endpoints, database connections, and privileged service identity grants).

---

## 7. Keep / extract / merge / retire decisions

### 7.1 Keep embedded (merge product identity, not repositories)

| Decision | Expected value | Permanent cost | Gate / evidence |
| --- | --- | --- | --- |
| Keep mobile app embedded in Platform product | One promise, one support path; no new identity/entitlement/billing surface; mobile-specific UX still free | App-store release cadence managed inside the product | Mobile users name the same core job; no independent state. **Extract only if** a distinct user class (e.g., offline-first field workers) with a distinct outcome and standalone onboarding is demonstrated — then re-run the independent product test. |
| Keep dashboard embedded as composed experience | Oversight value without a second product; no state duplication | Frontend maintenance; projection freshness | Dashboard has zero write paths and owns no domain state. |
| Keep API SDK embedded as contract surface | One schema authority; no API drift; one compatibility story | Contract governance; generated-client pipeline | 100% of clients generated from schema; no hand-written parallel clients; contract tests green. |

### 7.2 Keep as shared substrate / connector

| Unit | Expected value | Permanent cost | Gate / evidence |
| --- | --- | --- | --- |
| Identity substrate | One identity for all surfaces/products | Substrate SLO, ops, key rotation | No per-surface auth; no role-model drift into Identity. |
| Billing substrate | One ledger; money-movement blast radius contained | Billing SLO, reconciliation ops | No charge creation outside B; no invoice truth in P or C. |
| Billing connector | Replaceable PSP adapter; P and B stay decoupled | Connector versioning and reconciliation | Connector state audit shows zero ledger/entitlement/domain facts; reconciliation completeness 100%. |

### 7.3 Retire

| # | Retire | Why | Expected value | Permanent cost | Gate / evidence |
| --- | --- | --- | --- | --- | --- |
| R-1 | Hidden/private APIs and direct DB access used by surfaces | Backdoors violate the supported-contract rule | Security, dogfooding, single compatibility window | Migration of surface call sites | Audit finds zero private endpoints and zero surface DB connections |
| R-2 | Hand-maintained SDK forks / per-language hand-written clients | Drift creates a second API surface | One contract authority, less support load | Migrating consumers to generated clients | Generation reproducible; contract tests per language |
| R-3 | Duplicate billing/invoicing logic or ledger in the platform | Two ledgers cannot reconcile | Single billing truth, cleaner P | Migrating invoicing workflows to B | No charge/invoice creation outside B (negative tests) |
| R-4 | Embedded/legacy auth (sessions, login owned by P or a surface) | Duplicate identity is a security and trust hazard | One identity contract | Token/session migration | All sessions issued via Identity; no surface-local auth stores |
| R-5 | Dashboard write paths and dashboard-owned state | Dashboard must not become semantic owner | Projection-only guarantees, no state divergence | API read-projection changes | Write-denial tests; no dashboard-owned tables |
| R-6 | "Product ambition" for surfaces: separate pricing, SKUs, support queues, P&L, or websites for mobile/dashboard/SDK | Violates the independent product test | Portfolio simplicity; one support path; no cross-sell confusion | Org discipline; rejecting proposals | No surface-level commercial or support artifacts in roadmaps |

### 7.4 Rejected alternatives (recorded)

- **Mobile app as a standalone product today** — rejected: no independent job, state, or lifecycle; only release cadence differs (orthogonal boundary). Revisit only under the extraction gate in 7.1.
- **SDK as a developer platform product** — rejected: no third-party build-on-platform job is declared; SDK is a client of P's contract. Revisit only if an "embed/build on the platform" offer with its own onboarding and support is created.
- **Dashboard as a separate analytics product** — rejected: no independent semantics; projections over P's data would require duplicating authority.
- **Auth or billing as customer-visible products** — rejected: no standalone customer job; they are substrate with internal contracts.
- **One giant deployment (everything in one cell)** — rejected: substrate and connector keep independent failure and release scope; this does not create products.
- **One product per repository/site/SKU** — rejected: orthogonal boundary map (Section 2) governs instead.

---

## 8. Anti-fragmentation and shared-critical-path review

### Permanent complexity after this portfolio
- Customer concepts: 1 product (+3 surfaces).
- Support queues: 1 customer queue (+ routing tags); substrate internal.
- Public contracts: platform API, identity OIDC, billing charge/metering, connector edges (4 typed contracts total).
- Connector edges: 3 (P→I, P→C→B, B↔X).
- Identity/entitlement/billing interactions: one identity, one entitlement Capability (P-owned), one billing ledger.
- Distributed failure modes: bounded — login and billing are the only cross-unit flows, both with declared degradation.

### Shared critical paths
- **Identity at login** is the only synchronous cross-unit dependency; it is interactive and bounded. Serving requests are static-stable (cached JWKS, active sessions continue).
- **Billing is never on the platform serving path.** Metering events flow asynchronously through the outbox; impairment of B/C degrades billing freshness only, with declared customer-visible behavior.
- **Dashboard projections** tolerate stale data with declared freshness SLO; dashboard outage never affects the core job.

### Fragmentation check
Rejected splits (Section 7.4) would each add discovery, auth, entitlement, billing, networking, support, and compatibility surfaces with no material option value today. The portfolio proves composition (surfaces and substrate via typed contracts) and resistance to fragmentation (one product, one support path, no duplicated semantic truth). Future extraction proposals must show permanent-complexity math, not construction ease.

---

## 9. Accepted ADRs and implementation handoffs

### Accepted ADRs (referenced, not duplicated here)
| ADR | Decision | Owner |
| --- | --- | --- |
| ADR-001 | Platform is the sole standalone product; surfaces are embedded | Portfolio leadership |
| ADR-002 | Surfaces keep own repos/releases but share product identity, promise, support | Platform product |
| ADR-003 | Billing connector is an adapter owned by Billing; holds no cross-product truth | Billing |
| ADR-004 | Dashboard is read-only projections over the platform contract | Platform product |
| ADR-005 | SDK is generated from the single schema authority | Platform API |
| ADR-006 | Dogfooding enforcement: supported-contract-only internal edges with negative tests | Engineering standard |
| ADR-007 (deferred) | Packaging/SKU/commercial posture of the platform | Commercial — write a Commercial ADR before any durable pricing work |

### Handoffs
- **Engineering:** schema authority and generated-client pipeline (ADR-005); outbox + idempotency for metering events (E2); contract tests, negative-access tests, and failure-injection tests per the dogfooding matrix (Section 6); dashboard read-projection endpoints with write-denial (ADR-004).
- **Lifecycle/support:** one product support queue with `mobile`/`dashboard`/`sdk` routing tags; substrate incident and recovery runbooks; deprecation calendar for API versions and old app clients.
- **Commercial:** Commercial ADR for platform packaging; explicit decision that surfaces carry no SKUs or pricing (ADR-001/ADR-007).
- **Delivery:** app-store release pipeline for mobile; package release pipeline for SDK; continuous delivery for platform web and dashboard; connector and substrate release with compatibility fixtures.
- **Security/compliance:** backdoor audit program (quarterly), identity key rotation, billing data classification and retention.

---

## 10. Assumptions, unresolved evidence, next discriminating actions

### Assumptions (stated because this contract is written from the portfolio brief, not a domain walkthrough)
- A-1: The platform has one core domain job; the concrete outcome is unspecified here and belongs in the Platform registry before implementation.
- A-2: Mobile serves the same user classes as the platform, with mobile-appropriate UX but no distinct offline-first job.
- A-3: The dashboard is an oversight/analytics surface, not an admin console that writes domain state.
- A-4: The SDK integrates only the platform's API; no third-party "build on the platform" offer exists.
- A-5: One billing provider and one billing substrate; the connector adapts to that provider.
- A-6: Auth is centralized identity today; any embedded legacy auth is to be retired (R-4).
- A-7: A single support organization exists; per-surface support queues are not required by contract.
- A-8: No other products exist in the portfolio; if one appears, this contract is revised, not silently extended.

### Unresolved evidence and discriminating actions
| # | Open question | Discriminating action | Resolves |
| --- | --- | --- | --- |
| D-1 | Are there hidden endpoints, direct DB accesses, or privileged internal edges today? | Full backdoor audit (network, code, DB grants, service identity) | R-1, R-5, Section 6 |
| D-2 | Does mobile serve a distinct job (offline field use, distinct roles) with independent onboarding? | Mobile job/usage study: offline session share, role segmentation, outcome measurement | Extraction gate in 7.1 |
| D-3 | Do hand-written SDK clients exist and how much do they drift? | Schema-drift audit; per-language contract test coverage | R-2 |
| D-4 | Does the billing connector hold ledger, entitlement, or domain state? | Connector state/table audit; reconciliation completeness report | 7.2, E2 |
| D-5 | Are support tickets routed by surface today, and would tags suffice? | Support routing review and ticket taxonomy | 3.2, handoff 9 |
| D-6 | Where are entitlement grants evaluated today? | Entitlement code/schema audit | E2, Section 5 |

### Completion note
This contract satisfies the portfolio completion check: every candidate surface has one justified classification; the single selected product has an independently usable lifecycle; every cross-product edge has one typed owner and failure contract; shared substrate owns no hidden product truth; and the design proves both composition and resistance to unnecessary fragmentation. It is a design and decision handoff — implementation, delivery, and live-delivery proof are out of scope here.
