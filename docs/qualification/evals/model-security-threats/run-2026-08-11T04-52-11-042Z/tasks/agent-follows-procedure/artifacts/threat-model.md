# Threat Model and Security Design Contract — Public Checkout Flow

| Field | Value |
|---|---|
| Subject | Public checkout flow: client browser → TLS edge → payment provider → internal ledger → admin refund path |
| Subject version | v0.1-design (proposed design; no implementation exists) |
| Document version | v0.1-draft |
| Date | 2026-08-11 |
| Classification | Internal — Restricted (see §8) |
| Method | `model-security-threats` skill, 8-step method from `SKILL.md` |
| Evidence state | **Design-only.** Workspace contains `SKILL.md` and no source code, CI, deployment, or live system. All ratings below are design-time analysis anchored to industry base rates where stated; none are measured. |

> Reading note: `SKILL.md` references `references/threat-modeling-method.md` for depth; that file was not present in this workspace or in the installed skill directory, so the enumeration approach follows the method embedded in `SKILL.md` directly (STRIDE used as a coverage aid only, never as completeness proof).

---

## 1. Subject, scope, evidence state, objectives, assets, and boundaries

### 1.1 Subject and environment

- **Subject**: the public checkout flow of a merchant web store, including the
  payment acceptance path, the internal ledger of orders/payments/refunds, and
  the administrative refund path.
- **Environment**: public internet (customers), corporate-managed network
  (support, finance, SRE), cloud-hosted services, one payment provider (PSP),
  single currency initially, single deployment region.
- **Intended users**:
  - Anonymous and registered customers (purchase, view own orders, request refunds).
  - Support agents (view orders, initiate refunds within policy limits).
  - Finance admins (approve high-value refunds, reconcile, manage refund policy).
  - SRE/operators (deploy, operate, break-glass access).
  - Build/CI identities (build and deploy artifacts).
- **Observed vs proposed**: there is **no observed implementation**. Everything
  modeled here is a **proposed design**. The word "current" is never used to
  claim implemented controls; design commitments are labeled as such.

### 1.2 Security objectives

1. **Money integrity**: every ledger entry corresponds to a real, verifiable
   payment-provider event; double-entry invariants hold; refunds cannot exceed
   captured amounts and cannot be created by client-side access.
2. **Refund authority isolation**: an attacker with client/browser access must
   never reach refund authority (the skill's example boundary).
3. **Data protection**: customer PII and payment data are protected in transit,
   at rest, and in logs; raw card data never touches merchant systems (PSP
   tokenization).
4. **Non-repudiation of money movement**: all money-moving actions are bound to
   an authenticated identity and an immutable audit trail.
5. **Continuity**: ledger and refund capability survive provider webhook loss,
   operator error, and infrastructure failure within defined RPO/RTO.

### 1.3 Protected assets

| Asset | Class | Owner |
|---|---|---|
| Customer PII (name, email, address, order history) | Confidential | Privacy/compliance |
| Payment tokens/references (never PAN if PSP-hosted fields used) | Confidential, regulated | PCI scope |
| Ledger records (orders, payments, refunds, balances) | Integrity-critical | Finance systems |
| Provider API keys and webhook signing secrets | Confidential, integrity-critical | Security |
| Admin credentials and sessions | Confidential, integrity-critical | Security |
| Build/deploy artifacts and provenance | Integrity-critical | Supply chain |
| Backups (encrypted) | Confidential, integrity-critical | SRE |

### 1.4 Unacceptable outcomes (any single one is a failure of this contract)

- UO1: A forged or replayed provider webhook marks an unpaid order as paid, or
  posts a refund the provider never executed.
- UO2: An actor without refund authority (customer, stolen session, or attacker
  with client access) causes a refund to be executed.
- UO3: A refund is executed more than once for the same charge, or exceeds the
  captured amount.
- UO4: Ledger records are modified outside the double-entry service and the
  change is not detected.
- UO5: Customer PII or payment data is exfiltrated or exposed via
  authorization or transport flaws.
- UO6: The ledger cannot be restored after loss (backup that is not proven
  recoverable).
- UO7: Money movement happens with no auditable identity and no detection
  signal (logging without detection).

### 1.5 Assumptions

- A1: PSP provides hosted/tokenized payment fields or iframe so the merchant
  never collects raw card data (PCI DSS SAQ-A eligible). If this changes, the
  model must be revisited (trigger R1).
- A2: PSP webhooks are signed with a merchant-specific secret and carry a
  unique event ID and timestamp.
- A3: Admin access uses corporate SSO with MFA; admin API is not reachable from
  the public internet.
- A4: A single payment provider and single currency at launch.
- A5: Refund policy: refunds go back to the original payment method; cash
  refunds require finance approval and are out of normal scope.
- A6: Daily automated reconciliation between provider records and ledger is
  operationally feasible.

### 1.6 Non-goals (owned elsewhere)

- Adaptive fraud/incentive abuse economics, appeals, and false-positive tuning:
  owned by `review-domain/references/product-abuse-risk/`.
- What may be truthfully claimed to customers about controls: owned by
  `security-assurance-operations`.
- Implementation and testing of controls: owning engineering team (handoff §10).
- Active incident response: `run-incident-response`.
- Mobile apps, marketplace multi-seller payouts, credit-extension, and gift-card
  issuance are out of scope.

### 1.7 Decision boundary

This document is the **security design contract**. It does not accept material
residual risk on behalf of the system owner (see §7). It specifies controls,
verification that could falsify them, and the authority that must own residual
decisions.

---

## 2. System model

### 2.1 Component and data-flow graph

```
                        TB1 — untrusted client
 ┌──────────────────┐   (TLS 1.2+, HSTS)
 │ Customer browser │──────────────────────┐
 └──────────────────┘                      ▼
                              ┌────────────────────────┐
                              │ TLS edge / WAF /       │  entry: public HTTP(S)
                              │ rate limit / bot mgmt  │  identity: none (edge term)
                              └───────────┬────────────┘
                                          │ TB2 — private ingress, mTLS/ACL
                                          ▼
 ┌──────────────────┐      ┌──────────────────────────────┐
 │ Admin browser    │      │ Checkout / order API service │  entry: POST /checkout,
 │ (SSO + MFA)      │      └──────┬───────────────┬───────┘  GET /orders/{id}
 └────────┬─────────┘             │ TB3a outbound │ TB4
          │ TB5 — admin net/SSO   │ (TLS + API key)│ (service auth,
          ▼                       ▼                │  idempotent writes)
 ┌──────────────────┐   ┌────────────────┐         ▼
 │ Admin console +  │   │ Payment        │  ┌──────────────────┐
 │ refund API       │──▶│ provider (PSP) │  │ Ledger service + │
 │ (RBAC, MFA,      │   └───────┬────────┘  │ DB (double-entry)│
 │ approval flow)   │           │ TB3b      └──────────────────┘
 └──────────────────┘           │ inbound   (delete/truncate denied,
                    refunds via │ signed     audit triggers)
                    provider API│ webhooks   ▲
                                ▼            │ TB4
                     ┌────────────────────┐  │
                     │ Webhook receiver   │──┘  entry: POST /payments/webhook
                     │ (verify → dedupe → │
                     │  apply state)      │
                     └────────────────────┘

 Build/deploy (TB6): CI/CD ─▶ signed artifacts ─▶ deploy gate ─▶ prod
 Recovery (TB7): ledger ─▶ encrypted off-site backups ─▶ tested restore
 Observability: audit log (append-only, off-box) ─▶ reconciliation + alerting
```

### 2.2 Components, identities, privileges

| Component | Identities | Privileges | Source evidence |
|---|---|---|---|
| Customer browser | anonymous / registered customer | initiate checkout, view own orders, submit refund *requests*; **no refund execution** | none — design |
| TLS edge | none (edge terminates) | terminate TLS, rate-limit, WAF; must not bypass origin authN | none — design |
| Checkout/order API | service identity | create orders, call provider, write ledger via service auth | none — design |
| Payment provider | external dependency | authoritative payment/refund outcomes; never trusted without signature verification | none — design |
| Webhook receiver | service identity | verify signature → dedupe → apply state transitions | none — design |
| Ledger service + DB | service accounts | double-entry writes only; no human direct-write path; delete/truncate denied | none — design |
| Admin console / refund API | support agents, finance admins | initiate/approve refunds per RBAC and policy; never direct DB write | none — design |
| CI/CD | build identity | build, sign, promote artifacts; deploy requires approval | none — design |
| SRE/ops | operator identity (break-glass) | deploy, operate, restore; break-glass logged and reviewed | none — design |

### 2.3 Data stores and external dependencies

| Store/dependency | Data | Protection requirements |
|---|---|---|
| Ledger DB | orders, payments, refunds, balances | encryption at rest; integrity constraints; audit triggers; immutable history (append + state machine, no update of settled rows) |
| Secrets store | provider API keys, webhook secret, DB creds | KMS/Vault, short-lived, rotated, never in logs |
| Audit log store | money moves, admin actions, authz denials | append-only, off-box, retention per compliance |
| Backups | ledger + config | encrypted at rest and in transit, off-site, tested restore |
| Payment provider | payment tokens, chargebacks, refunds | outbound TLS + API key; inbound signed webhooks only |

### 2.4 Trust boundaries

| ID | Boundary | Rule |
|---|---|---|
| TB1 | Client ↔ internet ↔ edge | Client is untrusted; all public entry points authenticated/authorized server-side |
| TB2 | Edge ↔ origin | Private ingress only (no public origin), mTLS or equivalent; origin never exposed |
| TB3 | Checkout ↔ provider (a: outbound; b: inbound) | Outbound: TLS + API key, least-privilege provider account. Inbound: signature + freshness + replay check **before** business logic |
| TB4 | Checkout/webhook ↔ ledger | Service-to-service auth, least-privilege, idempotency keys, state-machine-only writes |
| TB5 | Admin ↔ refund API ↔ ledger | SSO + MFA + RBAC; admin API on separate network segment; refunds only via policy engine |
| TB6 | Build pipeline ↔ production | Signed artifacts, provenance, digest pinning, deploy approval |
| TB7 | Data stores ↔ services | DB auth per service, no human direct-write, encrypted backups |

### 2.5 Entry points

| Entry point | Exposure | AuthZ gate |
|---|---|---|
| `POST /checkout` | public | anonymous allowed; server-side price authority (C4) |
| `GET /orders/{id}` | public | ownership check (C5) |
| `POST /orders/{id}/refund-request` | public | authenticated customer, creates request only (C6) |
| `POST /payments/webhook` | public (must be) | signature + freshness + replay (C2) |
| Provider return URL | public | redirect allowlist + state binding (C14) |
| `POST /admin/refunds` | private segment | SSO + MFA + RBAC + policy (C5, C6) |
| `POST /admin/refunds/{id}/approve` | private segment | separation of duties (C6) |
| Deploy/artifact promotion | internal | signed artifacts, approval (C11) |

### 2.6 Administrative paths

1. **Standard refund**: support agent initiates refund via `POST /admin/refunds`
   → policy engine validates (amount ≤ captured − prior refunds, original method,
   one open refund, self-refund block) → below threshold: executes via provider
   API → provider webhook returns → ledger reversal (double-entry) → customer
   notified. Above threshold: enters approval queue for finance admin.
2. **High-value/exception refund**: approval queue, separation of duties
   (initiator ≠ approver), reason required, audit both sides.
3. **Break-glass**: SRE uses logged break-glass credentials for declared
   incidents only; immediate alert; mandatory retro-review; does not create a
   direct DB-write habit (ledger writes still via service with dual control).

### 2.7 Build/deploy path

CI builds from locked dependencies → SCA scan → signed artifact + provenance →
digest-pinned promotion → deploy approval → canary → prod. Production secrets
are injected at runtime from the secrets store, never baked into artifacts.

### 2.8 Recovery paths

- **Webhook loss**: provider-side retries + merchant dead-letter queue +
  reconciliation detects drift; manual re-injection requires dual control and
  full audit.
- **Stuck order/refund state**: reconciliation alerts; state-machine repair via
  service API with audit, not raw DB edits.
- **Ledger loss**: encrypted off-site backups, defined RPO/RTO, quarterly
  restore drill; replication for the primary store.
- **Provider decline of a valid refund**: escalation to finance ops; manual
  resolution tracked as a known limitation (RR7).

---

## 3. Misuse and abuse cases

Attacker goals: unpaid goods, money out (refunds), money in (false payments),
data (PII/payment), denial (competitor/abuse), reputation harm.
Capabilities/access: public internet only (external), stolen customer
credentials, compromised admin device/session, malicious insider, compromised
dependency/CI, provider-side failure.
Affected parties: merchant (money, compliance, reputation), honest customers
(availability, PII), staff (liability).

| ID | Abuse case (STRIDE category is coverage aid only) | Attacker | Goal | Affected |
|---|---|---|---|---|
| M1 | Forge payment-success webhook (Spoofing/Integrity) | external | goods without payment | merchant |
| M2 | Forge/replay refund webhook or duplicate refund events (Tampering/Replay) | external, insider | money out without provider execution / double money out | merchant |
| M3 | Insider refund fraud to own or colluding accounts (Elevation/Repudiation) | insider | money out | merchant |
| M4 | Admin takeover via phishing/credential stuffing/MFA bypass (Spoofing) | external, organized | refund authority, PII export | merchant, customers |
| M5 | Price/currency/quantity tampering at checkout (Tampering) | external | underpay or over-refund | merchant |
| M6 | Double-refund race: two requests/duplicate webhook deliveries both process (Tampering/Replay) | external, insider, accident | double money out | merchant |
| M7 | Card testing / checkout automation / credential stuffing (DoS/abuse) | external, fraud rings | validation of stolen cards, availability degradation, chargebacks | merchant, network |
| M8 | IDOR on orders/refund-request endpoints (Information disclosure) | external | other customers' PII/order history | customers |
| M9 | Session fixation/CSRF/open redirect in provider return (Spoofing/Elevation) | external | session/payment token theft | merchant, customers |
| M10 | Direct ledger tampering by operator or compromised service account (Tampering/Repudiation) | insider, compromised service | money integrity failure | merchant |
| M11 | Supply-chain compromise: malicious dependency or CI artifact (Tampering) | external, organized | RCE in money path, backdoored refund API | merchant, customers |
| M12 | Secrets exposure: webhook secret/API key in logs, git, env dumps (Info disclosure) | external, insider, accident | enables M1/M2/M10 | merchant |
| M13 | Refund-policy abuse: false non-receipt, refund-to-different-method, repeated partial refunds (abuse) | external, fraud rings | money out via policy edge cases | merchant |
| M14 | Webhook delivery loss/worker crash mid-state (Availability) | accident/ops | paid-but-unpaid or refunded-but-unposted states | merchant, customers |
| M15 | Backup/DR failure: untested restore, RPO breach (Availability) | accident/ops | total ledger loss | merchant, customers |
| M16 | Provider-side compromise or outage (External dependency) | external | provider breach/outage propagates to ledger truth | merchant, customers |
| M17 | Audit gap: logs exist but nothing detects or reviews them (Detection failure) | cross-cutting | every M1–M16 becomes undetectable | merchant |

---

## 4. Threat register (ranked, evidence-bounded)

Rating language: qualitative (H/M/L) only, with the basis for each rating and
the uncertainty. No numeric precision is claimed. Where a rating depends on
design choices not yet made, it is marked `design-dependent`. Likelihood bases:
`base-rate` = well-documented industry failure/attack classes (OWASP Top 10,
PSP integration guidance, fraud industry reporting); `design-analysis` =
reasoning from this design; `no-data` = no evidence available.

Tiers: **P1** = direct, poorly reversible money loss or refund-authority
compromise (must be closed before go-live). **P2** = material money/PII/
integrity/availability risk with compensating detection. **P3** = lower
likelihood/impact, manage or accept with authority.

| ID | Threat (path) | Preconditions | Consequence | L | I | D | Reversibility | Uncertainty | Disposition |
|---|---|---|---|---|---|---|---|---|---|
| T1 | Forged payment webhook marks order paid (M1) | webhook endpoint reachable; signature check missing/weak or secret leaked (T10); or verification ordering flaw | goods shipped without payment | M (`base-rate`: webhook verification defects are a common PSP-integration failure class; no impl evidence) | H (direct loss, unbounded by single event) | M (reconciliation catches if run and compared; else silent) | L (goods shipped) | Med — depends on C2/C9 implementation | **P1 — mitigate** (C2, C9, C7) |
| T2 | Insider refund fraud, no dual control (M3) | refund-capable admin; no self-refund block; no approval threshold; audit unreviewed | money out; reputation/legal | L–M (`base-rate`: insider fraud is rarer but high-impact; depends on org controls — `design-dependent`) | H | L–M (audit exists but review SLA decides) | L | High — org-specific | **P1 — mitigate** (C6, C7, C8) |
| T3 | Admin account takeover reaches refund authority (M4) | SSO/MFA bypass, phishing, credential stuffing; admin API exposed | refunds, PII export | M (`base-rate`: admin-target phishing is common) | H | M (session risk signals; depends on C16) | L | Med | **P1 — mitigate** (C5, C16, C6) |
| T4 | Ledger tampering outside double-entry service (M10) | direct DB access, over-privileged service account, compromised service identity | balances/orders falsified undetected | L–M (`design-analysis`; operator error more likely than malice) | H | L–M (audit triggers + reconciliation; depends on C7/C8) | M (reversal possible if detected) | Med | **P1 — mitigate** (C8, C7) |
| T5 | Double refund processing (race, duplicate webhook, double submit) (M2/M6) | idempotency missing; no unique constraint; replay cache absent; race in refund API | money out twice | M (`base-rate`: idempotency failures are a known payment-integration defect class) | H | M (reconciliation detects within window) | M (reclaim possible) | Low-Med | **P1 — mitigate** (C3, C2, C7) |
| T6 | Price/amount tampering or capture mismatch (M5) | client-submitted totals trusted; capture amount not bound to order | underpaid orders, over-refunds | M (`design-analysis`; trivially exploited if flaw exists) | H | M (reconciliation of amounts) | M | Low | **P1 — mitigate** (C4, C7) |
| T7 | Card testing / checkout automation (M7) | no velocity/rate controls; provider risk checks disabled | chargebacks, network fines, availability | H (`base-rate`: card testing is high-volume, cheap, automated) | M (loss per card low; aggregate high) | M (velocity alerts; depends on C10) | L (chargebacks irreversible) | Low | **P2 — mitigate** (C10) |
| T8 | IDOR on orders/refund requests (M8) | missing ownership checks on `GET /orders/{id}` etc. | customer PII exposure | M (`base-rate`: IDOR is a top web flaw class; only if authz omitted) | M (PII, regulatory) | L (silent read) | n/a (exposure) | Low | **P2 — mitigate** (C5) |
| T9 | Supply-chain compromise (M11) | unlocked dependencies; unsigned/unpinned artifacts; CI over-privileged | RCE in money path; backdoored refund API | L–M (`base-rate`: dependency/CI compromises rising; `design-dependent`) | H | M (SCA + provenance review) | M (redeploy + rotate) | Med | **P2 — mitigate** (C11, C12) |
| T10 | Secrets exposure (M12) | secrets in logs/git/env; no rotation | enables T1, T2, T4 | M (`base-rate`: secret leakage is a common finding) | H (as enabler) | M (secret scanning; depends on cadence) | M (rotate) | Low-Med | **P2 — mitigate** (C9) |
| T11 | Refund-policy abuse (M13) | policy edges: repeated partials, method swaps, false non-receipt | money out via policy; ops load | H (`base-rate`: refund/return abuse is endemic in e-commerce) | M (per-case small; aggregate significant) | M (policy engine + velocity; depends on C6/C10) | L | Med | **P3 — mitigate + accept floor** (C6, C10, RR7) |
| T12 | Webhook loss / stuck states (M14) | provider delivery failure; crash between states | paid-but-unpaid, refunded-but-unposted; customer harm | M (`base-rate`: webhook delivery loss is a known operational failure class) | M (availability/integrity drift) | M (reconciliation alert; depends on C7/C15) | H (replay/re-inject with dual control) | Low-Med | **P2 — mitigate** (C15, C7) |
| T13 | Backup/DR failure (M15) | untested restore, RPO breach, encryption key loss | ledger unrecoverable (UO6) | L (probability), H (consequence) (`design-analysis`; drills decide) | H | L until a drill is run (`no-data`: no drills exist in design state) | n/a | High — unmeasured | **P2 — mitigate** (C13) |
| T14 | Session/CSRF/open redirect (M9) | session hardening missing; redirect allowlist missing; state param absent | session/payment-token theft | L–M (`design-analysis`; standard protections are cheap) | M | M | M | Low | **P3 — mitigate** (C5, C14, C16) |
| T15 | Provider compromise/outage (M16) | provider-side breach or misconfiguration | ledger truth corrupted; availability | L (`base-rate`: single-provider events are rare but real) | H | M (provider notices; reconciliation) | M | Med | **P3 — transfer/accept** (RR3) |
| T16 | Audit gap: logs without detection (M17) | alerts/review SLA missing; logs mutable or on-box | all of the above undetected (UO7) | M (`design-analysis`; common failure: logging ≠ detection) | H (amplifier) | L (the gap itself) | M | Low | **P2 — mitigate** (C7) |

**Coverage note**: STRIDE categories are listed per case as a coverage aid only.
No taxonomy proves completeness; the open-evidence items in §9 are the honest
statement of what is unknown.

---

## 5. Control design

Every control is a **design commitment (unverified)**. Owner names are roles;
each must be bound to a named individual before implementation. Each control
lists its threat traceability, enforcement point, failure mode, and the bypass
assumptions that would invalidate it.

| ID | Control | Threats | Enforcement point | Owner (role) | Failure mode | Bypass assumptions |
|---|---|---|---|---|---|---|
| C1 | Transport: TLS 1.2+ with HSTS at edge; origin on private ingress with mTLS/ACL; no public origin route | T1 (transport part), T14 | TLS edge; network policy | Edge/Platform team | Misconfig exposes origin or downgrades TLS; HSTS missing | Attacker already inside TB2 network; edge terminator itself compromised (RR4) |
| C2 | Webhook authenticity: verify provider signature with rotated secret, reject outside freshness window (e.g., ≥5 min), replay cache on event ID, **before** any business logic | T1, T2, T5, T12 | Webhook receiver (first instruction executed) | Payment integration owner | Signature lib misused; secret rotates but cache/signature not re-checked; verification after state read/write | Secret leaked (C9 must hold); provider signs with shared-secret scheme an attacker could replay verbatim (freshness window closes this) |
| C3 | Idempotency: unique idempotency keys on order/payment-intent/refund creation; unique DB constraints; whitelisted state transitions only; provider-event dedupe by (provider, event_id) | T5, T6, T12 | Checkout/refund API; ledger DB constraints | Checkout service owner; Ledger owner | Key collision handling wrong; constraint dropped in migration; two services write same order | Two independent code paths write the same ledger row without the key (code review + tests must cover) |
| C4 | Server-side pricing authority: totals recomputed from catalog server-side; signed/tamper-evident checkout context; capture amount echoed by provider must equal order total | T6 | Checkout API on order create; webhook receiver on apply | Checkout service owner | Signed context not actually verified; amount comparison is string/type-lossy | Client-side price in any persisted field (must not exist); currency conversion introduces rounding drift (test boundary) |
| C5 | AuthN/AuthZ: customer sessions (httpOnly, Secure, SameSite, CSRF token); object-ownership checks on every order/refund-request read/write; admin SSO + MFA + short sessions + RBAC; admin API only on private segment | T3, T8, T14 | Session middleware; per-handler authz; admin gateway | Security team; Checkout service owner | Ownership check missing on one handler (IDOR); admin session too long; MFA not enforced for all admins | Admin device already compromised with a valid session (RR2); new admin role added without RBAC review (trigger R6) |
| C6 | Refund policy engine: amount ≤ captured − prior refunds; refund to original payment method only; one open refund per order; approval threshold + separation of duties (initiator ≠ approver); self-refund prohibited; reason required; client endpoints create requests only, never execute | T2, T5, T6, T11 | Refund API inside private segment; policy evaluation before provider call | Finance ops; Support owner | Threshold bypassed via partial-refund splitting; "original method" check keyed on wrong field; approver colludes (RR1) | Refund executed from any code path that skips the policy engine (single choke point required; no parallel refund path) |
| C7 | Immutable audit + detection: append-only, off-box audit for money moves, admin actions, authz denials; daily provider↔ledger reconciliation; alerts + review SLA on mismatch/anomaly | T1–T6, T10, T12, T16 | Audit pipeline; reconciliation job | Finance ops; Security team | Logs on-box/mutable; reconciliation not run or not alerted; review SLA unowned | Detection latency accepted as residual (RR7); audit store itself compromised (RR1/RR2 escalation) |
| C8 | Least privilege + data integrity: per-service DB accounts with minimal grants; delete/truncate denied; no human direct-write path; DB triggers enforce double-entry sum-zero per transaction; settled rows append-only | T4, T10 | Ledger DB grants/triggers; break-glass policy | Ledger owner; SRE | Grants drift; break-glass becomes routine; triggers bypassed by privileged account | Privileged actor (DB admin) intentionally edits both rows and audit (RR6) |
| C9 | Secrets management: KMS/Vault; short-lived credentials; automatic rotation; no secrets in logs/env dumps; CI secret scanning; per-environment keys | T10, T1, T2, T4 | Secrets store; CI scanner | Security team | Rotation breaks webhook verification (must be additive/dual-secret window); scanner misses formats | Attacker with memory/process access to the running service reads secrets at runtime (RR2/RR4) |
| C10 | Abuse/velocity: edge rate limits; WAF; bot management; velocity rules on cards/accounts/IPs; provider risk checks (AVS/CVV/3DS) enabled | T7, T11 | TLS edge; checkout API; provider config | Edge/Platform team; Payment integration owner | Thresholds too loose (fraud) or too tight (false positives); 3DS disabled for conversion | Distributed botnets stay under per-IP limits (product-abuse-risk owns tuning) |
| C11 | Build integrity: signed artifacts + provenance; digest-pinned promotion; CI least privilege; deploy approval; immutable tags | T9 | CI/CD pipeline | SRE; Supply-chain owner | Signing key in CI rather than KMS; approval is rubber-stamp | Compromised build machine with access to signing key (RR4 extension) |
| C12 | Dependency assurance: lockfiles; SCA scanning; SBOM; runtime scanning; upgrade SLA | T9 | CI; runtime registry | Supply-chain owner; Security team | Scan cadence lapses; known-vuln exception process untracked | Zero-day in a dependency before scan signatures exist (RR4) |
| C13 | Backup/DR: encrypted off-site backups; defined RPO/RTO; quarterly restore drill with recorded evidence; replication for primary store | T13 | Backup infrastructure; DR runbook | SRE | RPO/RTO never validated; restore drill skipped; encryption keys lost | Backup store compromised with valid key material (RR4/RR6) |
| C14 | Redirect hardening: return_url allowlist; state parameter bound to session; no open redirects | T14 | Checkout API return handling | Checkout service owner | Allowlist regex-bypassable; state param not verified | Attacker controls a domain on the allowlist (must be impossible by policy) |
| C15 | Delivery reliability: provider webhook retries + merchant DLQ; reconciliation detects drift; manual re-injection only via dual control with full audit | T12, T5 | Webhook receiver; reconciliation job | Payment integration owner; Finance ops | DLQ unmonitored; manual re-injection skips dedupe | Provider silently drops events with no retry signal (reconciliation is the backstop) |
| C16 | Session lifecycle: logout, inactivity timeout, revocation on password change/role change; admin device posture and session risk monitoring; step-up for refund actions | T3, T14 | Session manager; admin gateway | Security team | Timeout too long; revocation not propagated to all sessions; risk signals unmonitored | Attacker controls a compliant managed device with a live session (RR2) |

Cross-cutting integrity notes (per skill integrity rules):

- **Authentication is not authorization**: SSO login (C5) does not grant refund
  authority; RBAC + policy engine (C6) is the authorization gate.
- **Encryption is not integrity**: TLS (C1) protects transport; webhook
  signature (C2) and ledger constraints (C3, C8) protect authenticity/integrity.
- **Logging is not detection**: audit (C7) only counts if reconciliation,
  alerts, and review SLA are operated.
- **Backup is not recovery**: C13 counts only with an executed, evidenced restore drill.

---

## 6. Verification matrix (falsification objectives)

Design state: every row is an **unverified claim** that the owning team must
falsify or fail to falsify before go-live. "Oracle" is the deciding signal.

| Control | Exact claim to verify | Falsifying method | Oracle | Environment | Required evidence |
|---|---|---|---|---|---|
| C1 | No public route to origin; TLS ≥1.2 with HSTS on all public entry points | External scan + negative test: request origin host/IP from public side; TLS scanner; HSTS header check | Request to origin from public network fails; HSTS present | Staging + prod (post-deploy) | Scan report; test output; network policy review |
| C2 | A webhook with invalid signature, expired timestamp, or replayed event ID is rejected before any state read/write | Negative tests: bad signature, stale timestamp, replay of captured event; property test: fuzz signature space; code review of verification ordering | 401/403, no ledger write, alert emitted | Staging with PSP sandbox | Test results; review note; alert sample |
| C3 | Two identical refund/order requests produce exactly one ledger effect; illegal state transitions fail | Negative/concurrency test: parallel duplicate submits; property test over state machine; unique-constraint test | One row created; second call returns idempotent result; transition rejected | Staging | Concurrency test output; DB constraint check |
| C4 | Order total equals server-side catalog total; provider capture amount equals order total on every success | Adversarial test: tampered price/currency/quantity in request; negative test: webhook amount ≠ order total | Tampered request rejected; mismatch fails the order | Staging | Test outputs; amount-binding check in code review |
| C5 | Anonymous/client session cannot read or mutate another customer's order; client cannot reach refund API | Negative tests: IDOR attempts on all order/refund-request handlers; network test: admin API from public segment | 403/404; connection refused from public | Staging | Authz test matrix; network policy proof |
| C6 | Refund over capture, to a non-original method, self-refund, or without approval where required is impossible through any exposed path | Negative tests for each policy rule; adversarial scenario: split-partial refunds summing past capture; code review for single choke point | Policy rejection + audit entry; no provider call | Staging | Policy test outputs; review note |
| C7 | Every money move has an immutable audit entry; reconciliation detects a deliberately injected drift within SLA | Fault-injection: inject phantom ledger row or provider record; attempt tamper of audit store | Alert fires within SLA; tamper fails | Staging + prod | Drill report; alert timestamps; audit immutability test |
| C8 | No human identity can write ledger rows directly; delete/truncate denied; double-entry invariant holds | Grant review; negative test: human creds attempt write; property test: sum-zero per transaction | Writes fail; invariant holds across random operations | Staging | Grant review; test output |
| C9 | No secrets in logs/git/CI output; rotation works without webhook verification breakage | Secret scanning on repo+CI logs; rotation drill with dual-secret window | Scanner clean; webhook verification passes during and after rotation | CI + staging | Scan report; rotation drill record |
| C10 | Velocity/rate rules detect a simulated card-testing burst and provider risk checks are enabled | Adversarial load scenario: burst of low-value attempts | Block/flag within threshold; provider config shows AVS/CVV/3DS on | Staging | Load test output; provider config snapshot |
| C11 | Artifacts are signed, digest-pinned, and promotion is approval-gated | Attempt to promote unsigned or non-pinned artifact; review CI least privilege | Promotion blocked | CI | Pipeline policy test; review note |
| C12 | Dependency scan blocks known-vuln introduction; SBOM generated per artifact | Negative test: introduce known-vuln dependency in branch; verify SBOM emission | CI fails; SBOM present | CI | CI run output; SBOM artifact |
| C13 | Ledger can be restored to RPO with RTO from encrypted off-site backup | Recovery drill: delete/replace ledger in staging, restore from backup | Restore succeeds within RTO; reconciliation validates no drift | Staging DR env | Dated drill report + restore evidence |
| C14 | Return URL outside allowlist or without valid state param is rejected; no open redirect | Negative tests: allowlist bypass candidates, missing/stale state | Redirect blocked; no 3xx to foreign host | Staging | Test outputs |
| C15 | Simulated webhook loss is detected and safely re-injected under dual control | Fault-injection: drop a webhook; verify DLQ, alert, dual-control re-injection | Alert + audited re-injection, single ledger effect | Staging | Drill report |
| C16 | Sessions expire, log out, and revoke on role/password change; refund step-up requires re-auth | Timeout test; revocation test; step-up test | Session invalid after each event | Staging | Test outputs |

---

## 7. Residual risk and decision authority

| ID | Residual risk | Affected parties | Compensating controls | Decision authority | Review trigger / expiry | Safe response if assumptions fail |
|---|---|---|---|---|---|---|
| RR1 | Two colluding insiders defeat separation of duties (C6/C8) | merchant, staff | Anomaly detection on refund patterns; periodic independent audit sampling; background checks; finance oversight | Security + Finance leadership | Annual; on hiring/role change; on detected fraud pattern | Escalate to incident response; revoke refund authority; retain evidence |
| RR2 | Admin device compromise with a live, valid MFA session (C5/C16 bypass) | merchant, customers | Device posture checks; session risk scoring; step-up for refunds; short session TTL | Security team | On new device-class or admin tooling change | Force re-auth + step-up; revoke sessions; alert |
| RR3 | Provider-side breach, misconfiguration, or outage (T15) | merchant, customers | Contractual liability; least-privilege provider account; key rotation; provider status monitoring; reconciliation backstop | Legal/Finance + CISO | On provider contract change or incident | Switch to manual payment-hold mode; notify customers per policy; engage provider incident process |
| RR4 | Zero-day in edge/WAAP/OS/dependency (C1/C9/C11/C12 bypass) | merchant, customers | Patch SLA; egress restrictions; WAF rules; canary deploys; runtime monitoring | Security team | On public disclosure or CVE feed hit | Apply emergency patch path; consider payment-flow freeze until patched |
| RR5 | Customer account takeover with stolen credentials enables refunds of the victim's orders | customers, merchant | Step-up on refund requests; velocity caps; customer notification on refund; transaction anomaly alerts | Fraud/Product owner | On fraud pattern change | Freeze account; reverse via provider; notify customer |
| RR6 | Break-glass DB access is misused (C8 bypass) | merchant | Break-glass credential with immediate alert; mandatory retro-review; declared-incident-only policy; automatic expiry | SRE + Security | Quarterly review of break-glass usage log | Revoke access; audit trail preserved; incident response if abuse found |
| RR7 | Up-to-24h reconciliation window allows small-scale fraud to persist briefly (C7 latency) | merchant | Real-time alerts on high-risk events; finance-defined acceptable-loss threshold; faster reconciliation if threshold breached | Finance ops | Quarterly; on fraud trend change | Tighten window; add real-time checks; escalate |

**Decision authority statement (per skill rule):** this document **does not
accept** any of the above residual risks. Each row requires acceptance by the
named authority **after** the §6 verification evidence exists. The model author
must not accept material residual risk on its own behalf; until acceptance is
recorded (with name, date, and evidence reference), every residual risk is
**unaccepted and open**.

---

## 8. Artifact sensitivity, audiences, storage, retention

- **Classification**: Internal — Restricted. This document contains attack
  paths, bypass assumptions, and control-failure details; it is **protected by
  default** and is not a public document.
- **Authorized audiences**: owning engineering team, security team, finance
  ops, support leads, SRE, privacy/compliance (need-to-know only).
- **Storage/access**: stored with restricted ACL (private repo/branch or
  access-controlled location); no copy on shared drives or chat channels.
- **Retention**: life of the system plus applicable compliance period
  (finance/PCI retention applies), then secure deletion or archive per policy.
- **Publication**: any public assurance or learning derivative must be a
  separately authored, redacted minimum derivative with its own audience and
  disclosure review. Repository visibility alone is not approval to publish.
- **Exploit-enabling detail**: threat paths in §3–§4 and bypass assumptions in
  §5 must be redacted or abstracted in any derivative.

## 9. Review triggers, expiry, and open evidence needs

**Revisit triggers** (per method step 8): any change to a trust boundary, data
class, privilege, dependency, deployment topology, exposure, or material
threat; new payment method/provider; PCI scope change; new admin role; post
incident; or transition from design to implemented state.

**Expiry**: this contract expires **90 days from 2026-08-11** or at
implementation start, whichever is earlier, unless re-validated. A dated
re-validation record must be attached on renewal.

**Open evidence needs** (explicitly not yet available):

- No source code, CI, deployment, or live behavior exists to anchor any rating
  as measured; all likelihood/impact/detectability ratings are analysis-based.
- No org chart: control owners are roles that must be bound to named
  individuals.
- No PSP contract/SDK version: webhook signing scheme, idempotency semantics,
  and retry behavior must be confirmed against the chosen provider.
- No compliance baseline: PCI SAQ-A eligibility and audit-retention
  requirements must be confirmed.
- No restore drill has ever been run (T13 detectability is `no-data` until it has).

## 10. Downstream handoffs (without duplicating their artifacts)

| Handoff | To | What moves |
|---|---|---|
| Implementation | Owning engineering team | Build C1–C16 with the §6 verification matrix as acceptance tests; single choke point for refund execution |
| Assurance | Security team | Pen-test objectives from §6 (webhook forgery, IDOR, refund-policy bypass); SCA cadence; audit review SLA |
| Fraud/false-positive economics | Product-abuse-risk owner | T7/T11 tuning, appeals, and false-positive thresholds (owned outside this contract) |
| Operations | Finance ops + SRE | Reconciliation job ownership, refund approval workflow, break-glass policy, DR drill schedule |
| Incident response | Incident-response runbook | Playbook seeds: webhook forgery (T1), refund fraud (T2/T3), admin takeover (T3), ledger tampering (T4) |
| Privacy/compliance | Privacy + compliance | DPIA for PII; PCI SAQ-A eligibility; audit retention; customer notification templates (RR5) |

---

### Appendix A. STRIDE coverage map (coverage aid only — proves nothing)

| Category | Threats |
|---|---|
| Spoofing | T1, T3, T14 |
| Tampering | T2, T5, T6, T10, T11 (source integrity) |
| Repudiation | T2, T4 |
| Information disclosure | T8, T10 |
| Denial of service | T7, T12, T15 (availability) |
| Elevation of privilege | T3, T4 |
| Non-taxonomy abuse | T11, T13, M13, M17 (abuse/operational) |
