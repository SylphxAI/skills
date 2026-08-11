# Composable Product Portfolio Contract — Platform, Mobile, Dashboard, SDK, Auth Substrate, Billing Connector

- Status: **design and decision handoff** (per `compose-product-portfolio` completion check). This document is not implementation or live-delivery proof.
- Method: `SKILL.md` → `references/composable-product-portfolio-method.md` (all predicates, classification model, connector contract, dogfooding contract, anti-fragmentation review applied).
- Scope: portfolio topology, unit classification, connector graph, keep/extract/merge/retire decisions. Product-local domain semantics, prices, SKUs, entitlements, deployment topology, runtime cells and delivery evidence stay with their owning product and matching Standards/ADRs.

---

## 1. Portfolio objective, customer jobs, constraints, success measures

### 1.1 Objective

One platform product that an organization adopts to **run, observe and govern its operations from one workspace**, delivered through four consumption surfaces (web dashboard, mobile app, API/SDK) over two shared support units (auth substrate, billing connector). The portfolio's job is to maximize the platform's independent value and surface coverage while keeping the **number of independently meaningful units and public concepts minimal** (Core invariant 6).

### 1.2 Target customers and recurring jobs

| Customer | Recurring job | Outcome measure |
| --- | --- | --- |
| Operator (end user) | Run and track work items, runs and domain objects; get alerts; act from phone or desktop | Work completed per week; time-to-first-value |
| Manager / admin | Observe progress, cost and usage; govern access and audit | Decision latency; audit completeness |
| Developer / integrator | Automate and integrate the workspace with their own systems | Integration count; API call success; time-to-integration |
| Buyer (org) | Buy, entitle and renew one workspace; manage identity and billing | Activation rate; D30/D90 retention; renewal |

### 1.3 Constraints

- The platform is the only revenue-bearing product; the mobile app, dashboard and SDK are **surfaces of that product**, not separate products (independent product test applied in §7).
- Auth is shared substrate owning **authentication only**; the platform owns tenancy, membership, roles and entitlement decisions (method: "identity owns identities, sessions and federation — not every product's role model").
- Billing is a **thin connector**: it translates and reconciles between the platform's usage meter and an external billing provider. It owns no money ledger and no usage truth.
- No surface, substrate or connector may read another unit's database, import another unit's private modules, or call hidden endpoints (§6).
- Composition must not create a hidden monolith (one unit silently owning another's truth) or a fragmented system (unit count for its own sake) (§8).

### 1.4 Success measures

| Measure | Target (defaults to ratify, not evidence) | Owner |
| --- | --- | --- |
| Activated workspaces and D30/D90 retention | Set by product leadership | Product |
| Surface adoption (dashboard/mobile MAU share) | Set by product leadership | Product |
| API consumers and integration success | Measured via platform telemetry | Product |
| Billing reconciliation accuracy (zero unbilled usage) | 100% of metered events billed or explicitly excluded | Ops/Commercial |
| Auth availability on the serving path | Static-stability model per §5.4 (no sync substrate call on hot path) | Security/Ops |
| No hidden-path violations in audits (negative-access tests) | 0 in CI + quarterly red-team | Security |
| Portfolio unit count | 1 product + 2 surfaces + 1 artifact + 1 substrate + 1 connector (no drift) | Architecture |

---

## 2. Candidate classification matrix and orthogonal boundary map

### 2.1 Classification axes

| Axis | Question |
| --- | --- |
| Customer value | Independent, recognizable, measurable job? |
| Semantic cohesion | Owns stable language, policy, state boundary? |
| Adoption | Discover/onboard/authorize/use without an unrelated purchase? |
| Lifecycle | Version, support, recover, deprecate, retire on its own contract? |
| Change/failure | Independent release/failure containment valuable? |
| Commercial posture | Independent offer, add-on, substrate, connector, or included surface? |
| Operations | Coherent SLO, support, cost, operational owner? |
| Composition | Peers consume through one stable typed contract? |

### 2.2 Matrix

| Unit | Value | Cohesion | Adoption | Lifecycle | Change/failure | Commercial | Ops | Composition | **Primary classification** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Platform | High — durable job: run/observe/govern | High — owns domain semantics and state | Full standalone journey | Full own lifecycle | Real release independence | Revenue product (SKUs via Commercial ADR) | Own SLO/support/cost | Stable public API + events | **Standalone product** |
| Dashboard | Medium — value only as platform UI | None beyond presentation/projections | Requires platform subscription | Client release cadence, contract-bound | Client-only changes; no semantic split | Included; no SKU | Client telemetry; inherits platform SLO | Consumes platform API; never writes other truth | **Embedded capability** (experience shell) |
| Mobile app | Medium — platform "in my pocket"; offline read cache | None beyond presentation + device cache | Requires platform account | App-store train; OS support window; API compat-bound | Client-only changes | Included; store fees are cost | Crash/performance budgets; inherits platform SLO | Consumes platform API + events | **Embedded capability** (client surface) |
| API SDK | Medium — developer ergonomics for platform API | None — stateless generated client | Requires platform account/API key | Semver + API compat window; schema-generated | Tracks API; no independent semantics | Included; license decision via ADR | Build/test matrix; package hygiene | Implements platform contract | **Embedded capability** (supported client artifact) |
| Auth substrate | Low — no standalone customer outcome | High — identity/session/federation semantics | Internal-only adoption | Own lifecycle (standards, keys, federation) | Own release/failure | Internal cost center; no SKU | Own SLO/support within platform ops | One narrow contract (OIDC + admin API) | **Shared substrate** |
| Billing connector | None — no user job | Translation semantics only; no domain truth | Not adoptable standalone | Provider-version-bound; replaceable | Independent release/failure containment | Internal cost center; provider fees | Reconciliation SLO; no customer SLO | Async edges; never on serving path | **Connector** |
| "Platform + surfaces" as a bundle | — | — | — | — | — | Would duplicate entitlements/catalog | — | — | **Not a bundle** — one product, one entitlement model |

### 2.3 Orthogonal boundary map (many-to-many, never forced one-to-one)

| Unit | Commercial unit | Capability | Module/package | Public contract | Experience shell | Connector | Bundle | Repository (suggested, not required) | Service/deployment | Runtime cell | Trust boundary |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Platform | 1 product | Owns all domain Capabilities (work, state, governance, usage meter) | Many modules; Capability-first | Platform Public API vN; Platform Events vN | Is the semantic owner | Consumes AUTH/BIL | — | 1+ (core; release unit) | Own serving plane | May partition by tenant later (decision deferred) | Internet-facing + private service edge |
| Dashboard | none | none (projections) | client modules | none owned — consumes | Owns shell + projections | — | — | separate repo OK | Static + client bundle | — | Internet-facing client |
| Mobile app | none | none (device cache) | client modules | none owned — consumes | Mobile surface | — | — | separate repo OK | App-store binary | — | Internet-facing client |
| API SDK | none | none | packages | none owned — generated from platform schema | — | — | — | separate repo OK | packages only | — | client-side library |
| Auth substrate | none | authentication, sessions, federation, MFA | substrate modules | OIDC vN; Auth Substrate Admin API vN | — | federation edges only | — | own repo recommended | own service | may cell later | private service boundary |
| Billing connector | none | translation, metering intake, reconciliation | adapter modules | Usage/Billing API vN; Billing Events vN | — | yes | — | own repo recommended | own service or worker | — | private service boundary |

---

## 3. Product-unit registry

For every proposed unit: classification, standalone job, contract, lifecycle, operational/commercial obligations, support path.

### 3.1 Platform (PLT) — Standalone product

- **Promise**: one workspace where an organization runs, observes and governs its operations; durable product promise = "your operations, their outcomes, and the evidence, in one governed workspace."
- **Buyer/user**: org buyer; operators, admins, developers.
- **Standalone job**: yes — users can run work, track outcomes and govern access without any other portfolio unit. Independently measurable: work throughput, audit completeness, time-to-value.
- **Owned Capabilities (excluded semantics)**: work execution and runs; domain objects/state; observability projections; governance, roles, permissions, tenancy, memberships; audit; entitlement decisions over its own grants; usage meter. **Excluded**: identity verification/sessions/federation (AUTH); money ledger, invoices, payment methods (BIP via BIL); catalog/prices (Commercial ADR).
- **Authoritative state and write owners**: PLT is sole writer of work/run/object/audit/member/role/usage-meter truth. AUTH writes identities/sessions only. BIP writes money ledger only. BIL writes translation/cursor state only.
- **Public contracts**: Platform Public API vN (commands + queries; schema authority = PLT); Platform Events vN (outbox-published domain events); data export (all tenant data, documented format).
- **Standalone journey**: sign up → onboard org → invite members (via AUTH) → run first work → invite an integration via API. Offboarding: full export + deletion.
- **Lifecycle**: API semantic versioning; 12-month deprecation notice default; compatibility window = current + previous API minor; sunset = 90-day export window; incident/recovery runbooks.
- **Operational/commercial obligations**: product SLO (default 99.9%, to ratify), latency/capacity budgets, cost model, SOC2/GDPR/audit obligations; revenue product — SKUs/plans/entitlements owned by Commercial ADR (this contract does not set prices).
- **Support path**: single customer support queue (tiers), status page, incident comms; escalation to platform engineering; surface tickets routed by tag (dashboard/mobile/API).
- **Exit/retirement**: replace with successor contract only through API deprecation + export; never by silent internal migration.

### 3.2 Dashboard (DSH) — Embedded capability (experience shell of PLT)

- **Standalone job**: none — "monitor the platform" is the platform's job viewed through a shell. No independent outcome without PLT.
- **Contract**: none owned. Consumes Platform Public API vN (read projections, issue commands) and OIDC (login via AUTH). All domain writes go through PLT commands — the shell never writes another unit's state.
- **Lifecycle**: evergreen web releases; release train decoupled from PLT but bound to API compatibility window; no version promise beyond the API contract it targets.
- **Operational/commercial obligations**: client telemetry, accessibility, projections TTL and staleness labels; included in platform subscription (no SKU); no separate SLO — inherits PLT API SLO plus static-asset availability.
- **Support path**: platform customer queue, tag "dashboard"; UX/a11y feedback to surface team.
- **Classification note**: reclassify to **composed experience** only if a second portfolio product appears (declared trigger, not a current fact).

### 3.3 Mobile app (MOB) — Embedded capability (client surface of PLT)

- **Standalone job**: none — the job is "stay on top of and act on the platform from my phone". Offline cache serves reads only; all writes and authoritative reads come from PLT contract.
- **Contract**: none owned. Consumes Platform Public API vN, Platform Events vN (push triggers), OIDC via AUTH.
- **Lifecycle**: app-store release train; OS support = current N−2 for iOS/Android (ratify); forced-update policy aligned with API compatibility window; crash/performance budgets; store-review turnaround as release constraint.
- **Operational/commercial obligations**: push-notification deliverability; offline cache consistency (stale-until-refresh labels); app-store compliance; store fees = cost, not SKU; included in platform subscription.
- **Support path**: platform customer queue, tag "mobile"; version-specific triage via crash reports; forced-update communications.
- **Exit**: retired when its target API version leaves the compatibility window.

### 3.4 API SDK (SDK) — Embedded capability (supported client artifact of PLT)

- **Standalone job**: none — the SDK exists only to make the platform API consumable. A developer adopting the SDK is adopting the platform contract, not a second product.
- **Contract**: none owned. Generated from the PLT OpenAPI schema (one schema authority). OIDC client helpers for AUTH.
- **Lifecycle**: semver; generated release per platform API minor; breaking changes only in majors; LTS for one major; deprecation aligned to PLT API window; CVE/security patches on maintained versions.
- **Operational/commercial obligations**: build/test matrix (languages ratify — TypeScript first), package-registry hygiene, license decision (proprietary or OSS) via ADR; no separate commercial posture.
- **Support path**: developer support queue (docs, issues if OSS); version-specific guidance; compatibility matrix published.
- **Exit**: retired with the API version it wraps; replacement = next generated major.

### 3.5 Auth substrate (AUTH) — Shared substrate

- **Standalone job**: none as a product — no customer outcome without a consuming product. Its generic job (prove who a user is) serves all surfaces equally.
- **Contract**: OIDC vN (authorize/token/userinfo/discovery), Auth Substrate Admin API vN (identity, credential, MFA, federation management), introspection for high-risk operations.
- **Owned state (narrow)**: identities, credentials, sessions, MFA factors, federation links, signing keys. **Explicitly not owned**: tenants, memberships, roles, permissions, entitlement decisions, plan limits (all PLT domain state).
- **Lifecycle**: standards-versioned; signing-key rotation without downtime; federation provider deprecation with 12-month notice; breach-response runbook; session policy owned here.
- **Operational/commercial obligations**: substrate SLO and token-issuance latency budget; key management; cost center; no SKU (unless Commercial ADR later sells identity — then full product test applies, see §7.4).
- **Support path**: internal ops queue; customer-visible auth incidents via platform status page; security contact for federated-IdP incidents.
- **Failure model**: see §5.4 — never a synchronous global dependency on the hot serving path (local JWKS validation with cached keys; bounded revocation lag, declared).

### 3.6 Billing connector (BIL) — Connector

- **Standalone job**: none — no user job, no standalone outcome. Exists only to translate between PLT and the external billing provider.
- **Contract**: Usage/Billing API vN (ingest metered usage async; query billing status projection), Billing Events vN (subscription/invoice events emitted to PLT).
- **Owned state (thin)**: SKU↔provider-price translation mappings, ingestion cursors, reconciliation state. **Explicitly not owned**: usage truth (PLT meter), money ledger (BIP), plan definitions (Commercial ADR).
- **Lifecycle**: connector versioning tied to provider API versions; provider deprecation triggers connector migration, never platform changes; replacement test = swap to a mock/alternate provider with unchanged platform behavior.
- **Operational/commercial obligations**: reconciliation accuracy (metered events == billed or explicitly excluded); dispute evidence retained; provider fees = cost center; internal settlement decision → Commercial ADR; no customer-visible SLO (not a product).
- **Support path**: internal ops queue; billing disputes via commercial support with BIL evidence; provider escalation path.
- **Failure model**: never on the serving path (§5.4); metering queues, billing status goes stale with declared TTL, provider outage absorbed by retries.

### 3.7 Bundle — not selected

- No second independent product exists to bundle. Platform plans (e.g., Starter/Pro) are **packaging tiers of one product**, owned by the Commercial ADR; the surfaces are included, not sold separately.
- Classifying "platform + mobile + dashboard + SDK" as a bundle would duplicate entitlement/catalog semantics (hard gate) and invent a second purchase composition with no independent product behind it.

---

## 4. Typed connector graph

### 4.1 Graph

Main flow (clients → product → connector → product projection; artifact release):

```
   ┌────────┐  E1 API  ┌────────────────┐
   │  DSH   │─────────▶│                │
   └────────┘          │                │
   ┌────────┐  E2 API  │     PLT        │
   │  MOB   │─────────▶│   (product)    │
   └────────┘  +events │                │
   ┌────────┐  E3 API  │                │
   │  SDK   │─────────▶│                │
   └────────┘          └───────┬────────┘
        ▲                      │ E10 usage events (async) + billing-status
        │ E4 SDK releases      │     query (cached projection; never on
        └──────────────────────┤     serving path)
                               ▼
                      ┌────────────────┐
                      │      BIL       │   (connector)
                      └───────┬────────┘
                              │ E13 billing events (async)
                              ▼
                           PLT (billing-status projection only)
```

Remaining edges (each is a single typed edge; the table in §4.2 is the
authoritative contract and state-owner registry):

```
   [DSH] [MOB] [SDK] ──E5/E6/E7 OIDC vN (login)──────────▶ [AUTH]   shared substrate
   [PLT] ──E8 Auth Substrate API vN (introspection/admin)▶ [AUTH]   off hot path
   [AUTH] ──E9 federation (OIDC/SAML outbound)──────────▶ [EIDP]    external IdP
   [BIL] ──E11 Billing Provider API vN──────────────────▶ [BIP]     external provider
   [BIP] ──E12 provider webhooks────────────────────────▶ [BIL]     translated, not owned
```

The graph is a DAG: no synchronous cycles. The only loop
(PLT→BIL→BIP→BIL→PLT via E10/E11/E12/E13) is asynchronous with idempotent
reconciliation and is never on the serving path.

### 4.2 Edge registry (contract + state owner per edge)

| Edge | Direction / type | Contract | Contract owner | State owner | Auth/tenancy/versioning | Idempotency, failure, static stability | Observability | Replacement |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| E1 DSH→PLT | sync | Platform Public API vN | PLT (schema authority) | PLT | OIDC bearer from AUTH; tenant via PLT membership; API versioned semver | Commands idempotent (client-generated keys); PLT outage = declared error + retry; no fallback to other writers | Trace + dashboard telemetry | Contract tests + mock PLT |
| E2 MOB→PLT | sync + async | Platform Public API vN; Platform Events vN | PLT | PLT (events outbox) | Same as E1; events filtered per tenant + membership | Events: at-least-once, idempotent handlers, cursor replay | Same signals as customer edges | Same contract as any customer client |
| E3 SDK→PLT | sync (artifact) | Platform Public API vN | PLT | PLT | SDK generated from one schema; token handling via OIDC helpers | Inherits E1 semantics; SDK adds retries with same policy | SDK emits standard tracing | Replace SDK with raw HTTP client; behavior must match |
| E4 PLT→SDK | release | SDK Release Contract (semver, schema-derived) | PLT | PLT (release registry) | none (public artifact) | Compatibility window = API window | Release notes + compat matrix | Schema change → regenerated SDK in CI |
| E5 DSH→AUTH | sync | OIDC vN (authorize/token/userinfo) | AUTH | AUTH (identities/sessions) | Standard OIDC; PKCE; tenant stays PLT-side | Login blocked on AUTH outage; existing sessions validated by PLT via cached JWKS | Auth telemetry, audit of login events | Swap to any OIDC provider for contract tests |
| E6 MOB→AUTH | sync | OIDC vN | AUTH | AUTH | Same as E5 | Same as E5 | Same | Same |
| E7 SDK→AUTH | sync (artifact) | OIDC vN (client helper) | AUTH | AUTH | Same as E5 | Same as E5 | Same | Same |
| E8 PLT→AUTH | sync (off hot path) | Auth Substrate Admin API vN; introspection | AUTH | AUTH (identities/sessions); PLT keeps member↔subject mapping (PLT-owned) | Service identity (mTLS/private); admin ops scoped; no consumer impersonation | Hot path validates JWKS locally (cached, no sync call); introspection only for high-risk ops; revocation lag declared (default ≤5 min, ratify) | Audit of admin ops; auth availability metric | Abstracted behind one internal client; contract tests |
| E9 AUTH→EIDP | sync/redirect | OIDC/SAML federation | AUTH (AUTH-side adapter) | EIDP (external identity); AUTH (federation link) | Standard federation; consent per IdP | IdP outage = login fallback to platform credentials, declared | Federation failure telemetry | Second IdP in contract tests |
| E10 PLT→BIL | async meter + sync status query | Usage/Billing API vN | BIL (surface); usage event schema owned by PLT | Usage facts: PLT; cursors/mappings: BIL | Service identity; tenant-scoped usage; versioned | Metering: outbox → queue, at-least-once, idempotent by event key; status query reads PLT-cached projection, never blocks serving on BIL/BIP | Meter lag + reconciliation metrics | Mock provider adapter; connector replacement tests |
| E11 BIL→BIP | sync (outbound) | Billing Provider API vN | BIP (external) | BIP (charges, invoices, payments) | Provider credentials, scoped; provider tenancy | Retry with backoff; overload → queue hold; never on PLT serving path | Provider latency, error codes, dispute evidence | Provider swap = connector migration, platform unchanged |
| E12 BIP→BIL | async webhook | Provider webhook contract | BIP | BIP (source truth); BIL (translation) | Signature verification; replay protection | At-least-once; dedupe by webhook ID; reconciliation job covers gaps | Webhook acceptance/lag | Reconciliation job + replay |
| E13 BIL→PLT | async | Billing Events vN | BIL (schema derived from provider); money truth stays BIP | PLT (billing-status **projection** only — no second money ledger) | Tenant-scoped events; subscription status model owned by PLT projection | At-least-once; idempotent handlers; stale projection has declared TTL and label | Same signals as external consumers (dogfooding, §6) | Emit-to-file replay test |

### 4.3 Cross-product workflow rules

- The **only workflow owner is PLT**. DSH/MOB/SDK initiate platform workflows through E1/E2/E3; AUTH and BIL never orchestrate platform domain workflows.
- No edge hides a distributed transaction. Metering and billing converge by **events + idempotent reconciliation** (E10/E12/E13), never by lockstep calls.
- Bidirectional collaboration (PLT↔AUTH, PLT↔BIL) exists only through **separately owned contracts** (E8, E10, E13) — never shared state.

---

## 5. Shared substrate, experience-shell and bundle boundaries

### 5.1 Shared substrate (AUTH) stays narrow

- Owns: identities, credentials, sessions, federation, MFA, signing keys.
- Does **not** own: tenant/org records, memberships, roles, permissions, entitlement decisions, plan limits (PLT domain); usage or charges (PLT/BIP); catalog or prices (Commercial ADR).
- Boundary test: AUTH cannot answer "may this user run this work?" — that is PLT's role model.

### 5.2 Experience shells (DSH, MOB) are presenters, not owners

- Own: navigation, projections, device cache, UI state.
- Do **not** own: any domain truth; the shells write only through PLT commands. No shell-to-shell hidden path; DSH and MOB never call BIL or AUTH admin APIs.

### 5.3 Bundle boundary

- No bundle exists. Plan tiers are one product's packaging (Commercial ADR). Entitlement evaluation is PLT-owned over its own grants; no copied entitlement/catalog/price semantics anywhere (§3.7).

### 5.4 Shared-critical-path and static-stability model

| Dependency | On the serving path? | Failure behavior |
| --- | --- | --- |
| AUTH (token validation) | No hot-path sync call — PLT validates via **cached JWKS**; introspection only for high-risk ops | AUTH outage: logins blocked; existing sessions continue with declared bounded revocation lag; platform availability contract preserved |
| BIL / BIP | Never synchronous on serving path | Metering queues (outbox); billing status projection goes stale with declared TTL and is labeled stale; no customer request fails due to billing outage |
| EIDP (external IdP) | Login path only | Login fallback to platform credentials, declared; no data-plane impact |
| DSH/MOB/SDK | Clients, not dependencies of PLT | Client outage affects only that surface; PLT continues to serve all other clients |

This satisfies "no optional peer or control plane becomes a synchronous global dependency without a declared failure and static-stability model."

---

## 6. Dogfooding matrix and required evidence

| Internal consumer → provider | Supported contract used (same as customer class) | Privileges that must NOT exist | Evidence required |
| --- | --- | --- | --- |
| DSH → PLT | Platform Public API vN + OIDC | No PLT database access, no internal modules, no admin bypass of authorization | Typed contract tests; negative DB-access tests; authz parity tests |
| MOB → PLT | Same | Same | Same + offline-cache staleness tests |
| Platform team → PLT (own ops dogfooding) | Same | Same; no unmetered usage | Usage-meter parity for internal tenants |
| PLT → AUTH | Auth Substrate Admin API + OIDC | No direct credential store access; no embedded legacy session bypass | Legacy-auth negative tests (retired path returns 404); key-rotation drills |
| PLT → BIL → BIP (platform's own billing) | Usage/Billing API + Billing Events | No direct provider API calls from PLT; no bypass of connector reconciliation | Idempotency + reconciliation tests; mock-provider replacement test |
| E13 BIL→PLT | Billing Events vN | No second money ledger in PLT; no direct BIP webhook consumption by PLT | Projection-only tests; ledger-singleton audit |

Acceptance rule (method): "a diagram or claim of dogfooding is not evidence." Green CI for all rows above plus quarterly failure-injection drills (AUTH outage, BIL outage, provider outage, IdP outage) are required before any internal path may be called production-grade.

---

## 7. Keep / extract / merge / retire decisions with evidence and handoffs

### 7.1 KEEP — Platform as the single standalone product

- **Evidence**: passes all independent-product predicates (job, adoption, semantics, supported contract, lifecycle, operations, commercial value, change independence). All other units fail at least one hard negative (§7.2).
- **Rejected alternative**: splitting platform Capabilities into products — rejected: no independent jobs, would multiply identity/entitlement/billing/support surfaces with zero option value; violates "simplicity = smallest number of independently meaningful units."
- **Permanent cost**: one product lifecycle + one API compatibility window + one support queue.
- **Handoff**: Product leadership owns promise/roadmap; Platform engineering owns Capability-first modules and contracts; Commercial ADR owns plans/SKUs.

### 7.2 KEEP-TOGETHER (merge) — Dashboard, mobile app, SDK inside the PLT product unit

- **Evidence**: each fails the independent product test by hard negatives — no standalone journey/outcome (UI/orchestration of one owning product); no state or invariants assignable without duplicating PLT authority; changes are lockstep with API compatibility; separation adds discovery/auth/entitlement/support surfaces with no material option value.
- **Rejected alternative**: three extra products (4 products total) — permanent complexity: 4× identity, entitlement, billing, onboarding, support, compatibility and security surfaces for zero new customer jobs; violates the fragmentation hard gate.
- **Permanent cost**: surface release trains (web, app store, SDK packages) still bound to one API contract — intentional, minimal.
- **Handoff**: Platform engineering owns surface teams as **one product**; lifecycle owner publishes the API compatibility + deprecation calendar; delivery owner runs surface release trains (store/distribution readiness per `build-distribution-readiness` routing).

### 7.3 KEEP — AUTH as narrow shared substrate, BIL as thin connector

- **Evidence**: AUTH has a generic shared job but no standalone customer outcome; BIL has no job at all — both fail the independent product test. Their value is composition, and keeping them narrow preserves PLT's ownership of roles/membership/usage/money truth.
- **Rejected alternative**: making BIL a "billing product" — rejected: it would need to own a second ledger/price model (hard gate: connector owns cross-product truth). Making AUTH own roles — rejected: substrate absorbs product role model (method warning).
- **Permanent cost**: two internal SLOs, one connector migration surface (provider changes), one key-management surface.
- **Handoff**: Security owns AUTH boundary and key management; Ops owns reconciliation jobs and runbooks; Commercial ADR owns provider choice and internal settlement (not invented here).

### 7.4 EXTRACT — none now; declared triggers

- **SDK → product** only if the portfolio gains a second API-bearing product (then a shared developer contract product becomes economically meaningful; full product test + Commercial ADR required).
- **AUTH → product** only if identity is sold externally (then independent onboarding, SLO, support queue and SKU must be proven; Commercial ADR required).
- **No speculative extraction**: option value today does not exceed permanent lifecycle cost; triggers are recorded so the decision is revisited, not frozen.

### 7.5 RETIRE — three legacy paths (clean cut, no dual path)

| Legacy unit/path | Evidence of problem | Action | Handoff |
| --- | --- | --- | --- |
| Embedded session/cookie auth inside PLT | Hidden second auth path violates dogfooding rule 3; bypasses AUTH policy | Migrate all clients to OIDC via AUTH, then **delete** the legacy path; negative test: legacy endpoint 404 | Security + Platform eng (migration plan with deletion gate) |
| Direct PLT→provider billing calls | Second billing path outside connector; no reconciliation, no idempotency | Migrate metering/status through BIL (E10/E13), then delete direct calls; negative test: no provider credentials in PLT | Platform eng + Ops |
| Shell-only write paths (DSH/MOB writing domain state directly) | Hidden writer violates "shell owns projections only" | Route all writes through PLT commands; remove direct write endpoints | Platform eng (contract tests prove shell is projection-only) |

---

## 8. Anti-fragmentation and shared-critical-path review

### 8.1 Permanent-complexity account

| Surface | This design (1 product) | Fragmented alternative (4 products + 3 services) |
| --- | --- | --- |
| Customer concepts / onboarding paths | 1 | 4+ |
| Public contracts + compatibility windows | 1 API + 1 event + OIDC + connector API (internal) | 4 APIs + per-product events + SDKs per product |
| Connector edges | 8 internal + 2 external | ~18 with transitive pairs |
| Identity/entitlement/billing interactions | 1 model each, single owner | duplicated per product |
| Support queues | 1 customer + 1 internal ops | 4 customer queues + per-product ops |
| Sync critical paths | client→PLT only (AUTH off hot path) | multiple cross-product sync calls |
| Duplicated data/policy/UI | none (single ownership map) | entitlements, catalog, usage, UI each duplicated |

### 8.2 Composition does not create a hidden monolith

- **One owner per truth**: work/run/object/audit/membership/role/usage → PLT; identity/session/federation → AUTH; money ledger → BIP; translation → BIL; projections → DSH/MOB; no unit silently owns another's truth (state-owner map §4.2 + §3).
- **No hidden contracts**: every cross-unit edge is a named typed contract with one owner; no shared database, no private imports, no cluster-topology reliance (enforced by negative tests §6).
- **The single product is deliberate, not accidental**: internal modularity is Capability-first and implementation-owned; "one product" ≠ "one module/one binary" (orthogonal boundaries §2.3).
- **Substrate and connector stay generic**: AUTH holds no roles/membership; BIL holds no usage/money truth; DSH/MOB/SDK hold no domain state.

### 8.3 Composition does not create fragmentation

- Smallest justified unit set: 1 product + 2 surfaces + 1 artifact + 1 substrate + 1 connector (§2.2, §7). Every unit earns its place; no menu-item or repository-count product inflation.
- One API schema authority, one entitlement model, one support queue, one commercial offer (tiers via ADR) — no duplicated semantics (hard gate check).
- Surfaces share the product lifecycle and compatibility calendar; the connector is replaceable without platform changes (provider swap test).

### 8.4 Shared-critical-path conclusion

- AUTH is off the hot serving path (cached JWKS + declared revocation lag); BIL/BIP are never synchronous on the serving path; EIDP affects login only; no synchronous cycles exist in the DAG (§4.1, §5.4). All failure models are declared, not assumed.

---

## 9. Accepted ADRs and implementation handoffs

### 9.1 Decisions recorded here (to be ratified as ADRs by owners — facts are not duplicated in this contract)

| ADR | Decision | Owner | Status |
| --- | --- | --- | --- |
| Portfolio shape | Single product PLT; DSH/MOB/SDK embedded; AUTH substrate; BIL connector; no bundle | Product leadership + Architecture | Accepted in this contract; ratify as ADR |
| Auth boundary | AUTH = authentication; PLT = tenancy/membership/roles/entitlement | Security + Platform eng | Accepted in this contract; security review |
| Billing topology | Async metering; provider ledger authority; connector translation; PLT projection only | Ops + Commercial | Accepted in this contract; Commercial ADR for prices/settlement |
| Packaging | Surfaces included; plans are tiers not bundles | Commercial | Accepted in this contract; Commercial ADR |
| SDK posture | Schema-generated, semver, LTS; license decision pending | Platform eng | Pending |

### 9.2 Implementation handoffs (without duplicating their facts)

- **Engineering**: one OpenAPI schema authority + SDK generation pipeline; Capability-first modules in PLT; connector adapter with idempotent metering; negative-access and replacement tests (§6).
- **Lifecycle/support**: API compatibility + deprecation calendar; single customer support queue with surface routing; app-store/OS support policy; export + sunset runbooks.
- **Commercial**: plans/SKUs/prices, provider selection, internal settlement, license decision (ADR).
- **Security**: AUTH boundary audit, key rotation, legacy-auth deletion gate, quarterly failure-injection drills.
- **Ops**: reconciliation jobs, billing-status TTL, status page, runbooks for AUTH/BIL/BIP/EIDP outages.
- **Delivery**: surface release trains and store/distribution readiness (`build-distribution-readiness` routing owns externally observed delivery evidence).

---

## 10. Assumptions, unresolved evidence, next discriminating actions

### 10.1 Assumptions (placeholders to ratify, not facts)

- Platform domain semantics (work/run/object/governance) are described at portfolio level; the owning product's procedures define them.
- SLO 99.9%, 12-month API deprecation, 90-day export, ≤5 min revocation lag, OS N−2 support: **defaults for ratification**.
- SDK first language: TypeScript; provider and push-notification provider: unselected.

### 10.2 Unresolved evidence

- No live portfolio telemetry (adoption, surface mix, reconciliation accuracy) — success measures in §1.4 are targets, not results.
- No prices/SKUs/entitlements (Commercial ADR not yet written).
- No contract/negative-test suite exists yet for any edge in §4.2.
- App-store distribution readiness and OS version policy unverified.

### 10.3 Next discriminating actions (highest value first)

1. Adopt ADRs (§9.1) and stand up the schema authority + SDK generation (proves E3/E4).
2. Implement and green the negative-access and dogfooding test matrix (§6) — proves no hidden authority.
3. Run failure-injection drills for AUTH/BIL/BIP/EIDP outages — proves declared failure models (§5.4).
4. Write the Commercial ADR (plans, provider, settlement) — resolves all "Commercial ADR owns" references.
5. Re-run this review when a second product candidate appears — reclassify DSH to composed experience and re-apply extraction predicates before any split.

---

*This contract is a design and decision handoff, not implementation or live-delivery proof. Claims of independently useful/operable/composable/dogfooded units require the evidence in §6 and §8 before they are asserted.*
