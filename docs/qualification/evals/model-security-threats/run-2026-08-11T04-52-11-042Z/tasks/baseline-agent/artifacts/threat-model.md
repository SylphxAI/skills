# Threat Model and Security Design Contract: Public Checkout Flow

Status: **Design-stage draft** — proposed controls are not yet implemented or
verified. This document does not claim effectiveness for any control until the
verification matrix in Section 8 has evidence at the stated boundary.

## 1. Subject and Scope

| Field | Value |
| --- | --- |
| Subject | Public web checkout: purchase, payment capture, refund/void, ledger posting |
| Environment | Production, internet-facing (design target) |
| Evidence state | No implementation exists for this model; architecture is a proposed design. Threat likelihood/impact are narrative and evidence-bounded, not measured |
| Intended users | Anonymous and registered customers; support and finance operators; reconciliation jobs |
| Scope | Browser, TLS edge (CDN/WAF/gateway), checkout application service, payment provider (PSP), internal ledger. Build/deploy pipeline and operator access are included as supply-chain/operational paths |
| Non-goals | Malware on user devices (mitigated, not prevented); PSP internal security; fraud investigation procedure; incident response runbooks (referenced, not authored here) |

### Assumptions

- Card entry uses PSP-hosted fields or hosted checkout (raw PAN never reaches
  our servers or logs). If this assumption fails, PCI scope expands and this
  model must be revisited.
- The PSP is a trusted third party: we verify its webhooks and reconcile its
  settlement data, but we do not defend the PSP itself.
- Server-side order/price state exists (client never supplies final prices).
- Ledger is a separate service/database from the checkout application.

## 2. Architecture and Trust Boundaries

```
                TB1: user device          TB2: internet        TB3: internal network
┌──────────────────────┐   TLS   ┌───────────────────┐   ┌────────────────────────────┐
│ Client browser       │◄───────►│ TLS edge          │◄──►│ Checkout application       │
│ (user, attacker-     │         │ CDN/WAF/gateway   │   │ (catalog, orders, payment  │
│  controlled)         │         │ TLS termination   │   │  intents, webhook handler) │
└──────────────────────┘         └───────────────────┘   └─────────────┬──────────────┘
                                                                       │ TB4: outbound mTLS/TLS + secrets
┌──────────────────────────────┐                                        ▼
│ Internal ledger (double-     │        TB5: verified webhook  ┌────────────────────┐
│ entry, balances, audit,      │◄─────────────────────────────►│ Payment provider   │
│ reconciliation)              │                                │ (tokenization,    │
└──────────────────────────────┘                                │ 3DS, capture,     │
        ▲ TB6: operator/admin access (human)                    │ webhooks, refunds)│
        └── support, finance, SRE, break-glass                  └────────────────────┘
```

### Components, identities, and privileges

| Component | Identity | Privilege | Trust boundary |
| --- | --- | --- | --- |
| Client browser | Anonymous or authenticated customer | Create order; initiate payment with a PSP token; view own orders | TB1/TB2 |
| TLS edge | Public endpoint | Terminate TLS, WAF, rate limiting, routing; no business logic | TB2 |
| Checkout application | Service identity (least-privilege) | Create payment intents, process webhooks, call ledger | TB3/TB4/TB5 |
| Payment provider | Third party | Authorize, capture, refund funds; holds card data | TB4/TB5 |
| Internal ledger | Service identity | Post double-entry records; source of truth for balances | TB3/TB6 |
| Operators | Humans (support, finance, SRE) | Read/remediate; refund approval; break-glass | TB6 |

### Data flows

| ID | Flow | Data classes | Crosses |
| --- | --- | --- | --- |
| DF1 | Checkout page + order submission | Items, quantities, price IDs, addresses | TB1→TB2→TB3 |
| DF2 | PSP-hosted card entry → payment token | Tokenized card data | TB1→PSP (direct, not via us) |
| DF3 | Create payment intent / capture | Amount, currency, order ref, idempotency key | TB3→TB4→PSP |
| DF4 | PSP result + webhooks (succeeded, refund, dispute) | Event payloads with signature | PSP→TB5→TB3 |
| DF5 | Ledger postings (order, capture, refund) | Double-entry records | TB3→ledger |
| DF6 | Reconciliation vs PSP settlement files | Settlement, fees, net positions | PSP→ledger jobs |
| DF7 | Refund/void initiated by operator | Refund requests, approvals | TB6→TB3→PSP→ledger |

## 3. Security Objectives and Protected Assets

1. **Money-movement integrity** — every capture and refund is authorized,
   idempotent, and recorded; ledger balances always reconcile to PSP truth.
2. **Cardholder-data minimization** — raw PAN never enters our systems;
   PCI scope stays at the token boundary.
3. **Confidentiality** — customer PII and payment tokens protected at rest and
   in transit.
4. **Availability** — checkout remains usable under attack and provider
   outages; no silent partial failures.
5. **Accountability** — every money event is attributable, tamper-evident, and
   reviewable; refund authority is separated by role.

Assets: payment tokens, charge/refund IDs, idempotency keys, ledger records and
balances, order records, customer PII, webhook secrets and PSP credentials,
refund/void authority.

## 4. Unacceptable Outcomes

- Money leaves the business without valid PSP authorization (fraudulent
  refunds, forged success webhooks, double capture).
- Card data compromise of anything we store or log (PCI breach, notification
  obligations).
- Customer pays but ledger shows no record, or ledger shows payment without
  PSP authorization (unreconciled divergence).
- Attacker obtains goods/services for free (price tampering, payment
  confirmation replay, race-condition capture bypass).
- A single compromised role can both move money and erase the evidence.

## 5. Attacker Model and Misuse Cases

| Actor | Capabilities / access | Primary goals |
| --- | --- | --- |
| Opportunistic web attacker | Can send arbitrary HTTP to the public surface; may have an account | Free goods, price tampering, other-users' data |
| Carding/fraud operator | Automation, valid stolen cards, proxy networks | Abuse stolen cards, bypass 3DS/velocity, resell goods |
| Compromised customer session | Stolen session or saved-payment-method abuse | Purchase on victim's card/account |
| External insider (support) | Legit support account | Fraudulent refunds, order manipulation |
| Internal insider (finance/dev/SRE) | Prod access, possibly secrets | Ledger tampering, cover-up, exfiltration |
| Supply-chain attacker | Compromised dependency/build step | Code injection at deploy time |
| Opportunistic MITM / network attacker | Passive or active on user network | Card data interception, TLS downgrade |
| DDoS / abuse automation | Botnets, scraping | Denial of service, enumeration, payment-intent spam |

Misuse cases derived from goals:

- **MC1 Free purchase**: tamper with amount/currency in the request, or reorder
  line items, or reuse a stale quote, then confirm payment.
- **MC2 Forged success**: send a fake PSP webhook (or replay one) so the order
  is fulfilled without payment.
- **MC3 Fraudulent refund**: abuse a support/session/API path to refund a
  capture to an attacker-controlled destination or credit the wrong account.
- **MC4 Double-dip**: race duplicate submits / retried requests into two
  captures and two ledger postings for one payment.
- **MC5 Stolen card check**: use checkout as a card-validation oracle
  (live carding with velocity evasion).
- **MC6 Victim abuse**: session fixation/CSRF to place orders or drain saved
  payment methods on another user's account.
- **MC7 Insider cover-up**: move money, then edit/delete ledger rows and logs
  so reconciliation shows clean.
- **MC8 Hijack checkout supply chain**: tamper with the payment
  integration/dependency so the page or intent points at an attacker.
- **MC9 Deny competitors of service**: flood checkout/API; also targeted
  "carpet bombing" of payment intents to burn PSP fees.

## 6. Threat Register

Rating basis: **H/M/L** ordinal by (exposure · impact · reversibility) with
narrative evidence; no numeric precision claimed. `Disp.` = disposition
(Eliminate / Reduce / Prevent / Detect / Contain / Recover / Accept).

### 6.1 Browser / client boundary (TB1)

| ID | STRIDE | Threat | Path / precondition | Consequence | Basis | Disp. |
| --- | --- | --- | --- | --- | --- | --- |
| TH-BRO-01 | T | XSS on checkout page injects payment-token/order tampering or session theft | Unsanitized render, third-party script | Account takeover, altered orders | H if any injection point exists; exposure public | Prevent (CSP, hardening) + Detect |
| TH-BRO-02 | I | Keylogger/screen-scraper malware on user device captures card data | User device compromised | Card data loss (our scope only if data transits us) | L–M; external to our control | Reduce (PSP-hosted fields, 3DS) |
| TH-BRO-03 | S/A | Session fixation or hijacking of logged-in checkout | Weak session cookies, session fixation | Purchases/refund abuse on victim account | M | Prevent (session controls) |
| TH-BRO-04 | T | CSRF on checkout/order/account endpoints | State-changing GET or weak origin checks | Unauthorized order placement, address changes | M | Prevent (CSRF tokens, SameSite) |
| TH-BRO-05 | T | Clickjacking checkout actions | Missing frame protections | Coerced purchases | L | Prevent (frame headers) |
| TH-BRO-06 | I | Saved payment method token exfiltrated from browser storage | Token stored client-side accessible to JS | Reuse of victim's payment method | M | Eliminate (server-side save; token never returned to browser) |

### 6.2 TLS edge / network (TB2)

| ID | STRIDE | Threat | Path / precondition | Consequence | Basis | Disp. |
| --- | --- | --- | --- | --- | --- | --- |
| TH-EDG-01 | I | MITM via cert-validation gap or TLS downgrade (SSL strip) | Client trusts attacker cert; weak TLS config | Token/PII interception | M (HSTS mitigates); classic downgrade | Prevent (TLS1.2+, HSTS preload) |
| TH-EDG-02 | T/I | HTTP request smuggling / protocol desync at edge or origin | Conflicting Content-Length/Transfer-Encoding | Poisoned caching, auth bypass | M | Prevent (edge+origin consistent parsing) |
| TH-EDG-03 | A | DDoS / bot flood of checkout and payment-intent creation | Public surface, no auth on create-intent | Outage, PSP fee burn | H exposure; mitigable | Reduce (rate limit, bot mgmt) + Detect |
| TH-EDG-04 | I | Cache poisoning of checkout/order responses | Edge caching unauthenticated sensitive responses | PII/order leakage across users | M | Prevent (cache rules per path) |
| TH-EDG-05 | I/T | Client tampering with amount, currency, discount, or quantity fields | Client-controlled price in request | Free/cheap goods | H; classic e-commerce flaw | Eliminate (server-side price authority) |
| TH-EDG-06 | A | Replay of order/payment-intent requests | No idempotency on create | Duplicate charges/intents | M | Prevent (idempotency keys) |
| TH-EDG-07 | I | Enumeration of orders/prices via API | Predictable IDs, no rate limit | Competitive/abuse intel, PII leak | M | Reduce (unpredictable IDs, rate limits, auth) |

### 6.3 Checkout application (TB3)

| ID | STRIDE | Threat | Path / precondition | Consequence | Basis | Disp. |
| --- | --- | --- | --- | --- | --- | --- |
| TH-APP-01 | I | Broken object-level authorization (view/modify another user's order) | Direct object refs without ownership check | PII disclosure, order tampering | H if unchecked | Prevent (server-side ownership checks) |
| TH-APP-02 | I/A | Refund endpoint callable by low-privilege actor or client | Refund API exposed without role+limits | Money loss | H | Eliminate (refund authority out of client path; RBAC + dual control) |
| TH-APP-03 | I/A | Forged or replayed PSP webhook marks unpaid order as paid | Missing/weak signature verification, no dedup | Goods shipped unpaid | H | Prevent (HMAC verify + event dedup) |
| TH-APP-04 | T | Race condition: concurrent capture + refund, or double-submit capture | Non-atomic state transitions | Double capture or over-refund | M–H | Prevent (atomic transitions, locks, idempotency) |
| TH-APP-05 | I | Amount rounding/currency mistakes (negative, zero, integer overflow) | Bad validation of server-derived values | Pricing errors, abuse | M | Prevent (validation, integer minor units) |
| TH-APP-06 | I | Sensitive data in logs (tokens, webhook secrets, PAN fragments) | Verbose logging | Credential/card exposure | M | Prevent (log hygiene, redaction) |
| TH-APP-07 | I | SSRF via webhook URLs, receipt URLs, or provider-configured callbacks | Server fetches user-controlled URL | Internal network access | M | Prevent (allowlist, no user-controlled fetch) |
| TH-APP-08 | S | Vulnerable dependency in checkout app | Unpinned/unsigned deps | Remote code execution | M (supply chain) | Prevent (SBOM, scans, pinning) |

### 6.4 Payment provider boundary (TB4/TB5)

| ID | STRIDE | Threat | Path / precondition | Consequence | Basis | Disp. |
| --- | --- | --- | --- | --- | --- | --- |
| TH-PSP-01 | I | PSP API key or webhook secret leaked (code, logs, client bundle) | Secret in frontend or repo | Attacker drives refunds/captures as us | H | Prevent (server-side secrets, vault, rotation) |
| TH-PSP-02 | A | Webhook replay (old event replayed after refund) | No dedup/ordering guard | Stale state: order marked paid after refund | M | Prevent (event dedup, state-machine guard) |
| TH-PSP-03 | I | Refund/destination manipulation (amount > capture, wrong currency) | Unvalidated refund request fields | Over-refund, exchange-rate loss | M | Prevent (validate against capture record) |
| TH-PSP-04 | I | Carding oracle: success/failure responses reveal card validity at scale | Verbose PSP error mapping, no velocity limits | Card fraud enabler | M | Reduce (uniform errors, velocity rules) |
| TH-PSP-05 | A | 3DS bypass for high-risk transactions | No risk-based step-up | Chargeback/fraud losses | M | Reduce (risk rules, 3DS) |
| TH-PSP-06 | A | Provider outage or settlement delay | External dependency | Failed checkouts, reconciliation drift | M | Recover (fallback providers, monitoring) + Accept |

### 6.5 Internal ledger (TB3/TB6)

| ID | STRIDE | Threat | Path / precondition | Consequence | Basis | Disp. |
| --- | --- | --- | --- | --- | --- | --- |
| TH-LED-01 | I | Ledger divergence from PSP (missed webhook, partial capture, fee mismatch) | No reconciliation job or drift alert | Books wrong; theft hidden | H | Detect + Recover (daily reconciliation, alerting) |
| TH-LED-02 | I/T | Ledger row tampering or deletion without trace | Mutable records, no audit trail | Insider cover-up | H | Prevent (append-only audit, hash chain, RBAC) |
| TH-LED-03 | I | Double-entry violation (refund without capture, capture without authorization) | No invariant checks | Money movement mismatch | H | Prevent (invariant enforcement, constraints) |
| TH-LED-04 | T | Lost update / race on balances and order state | Concurrent writers, no locking | Divergent balances, double post | M | Prevent (atomic tx, single-writer, optimistic locking) |
| TH-LED-05 | I | Insider abuse: operator approves and executes own refund | Single role holds initiate+approve | Fraudulent refunds | H | Prevent (separation of duties, dual control) |
| TH-LED-06 | D | Ledger DB loss with unproven restore | Backup exists but never restored | Full financial history loss | M | Recover (tested restore drills) |
| TH-LED-07 | I | Retention/compliance failures (PII, financial records) | No retention policy | Regulatory exposure | M | Prevent (retention policy, deletion jobs) |

### 6.6 Operations and supply chain

| ID | STRIDE | Threat | Path / precondition | Consequence | Basis | Disp. |
| --- | --- | --- | --- | --- | --- | --- |
| TH-OPS-01 | I | Secret exfiltration via build/deploy pipeline compromise | Weak CI/CD controls, unsigned artifacts | Full money-movement compromise | M | Prevent (sigstore/verification, least-privilege CI) |
| TH-OPS-02 | D | Detection gap: no monitoring of money events, velocity, or anomalies | Logs exist but no rules | Attack completes unnoticed | M–H | Detect (rules, anomaly signals, on-call) |
| TH-OPS-03 | A | Mass abuse via automation (intent spam, address-poisoning) | No per-IP/account quotas | Fee burn, operational noise | M | Reduce (quotas, bot management) |

## 7. Control Design

Each control lists: enforcement point, owner, failure/degradation behavior, and
traced threats. **None of these are claimed effective until Section 8
verification has evidence.**

### C1. Server-side price authority (TH-EDG-05, TH-APP-05)
- Enforcement: checkout application recomputes all amounts from catalog +
  order state; client submits only identifiers (price IDs, quantities).
- Owner: checkout application team.
- Failure mode: if client price is ever trusted, threat returns — covered by
  invariant test.
- Also: amounts in integer minor units; validation rejects negative/zero/overflow.

### C2. PSP-hosted card entry and tokenization (TH-BRO-01/02/06)
- Enforcement: card fields load in PSP iframe/hosted surface; our origin never
  sees PAN; saved methods stored server-side as PSP tokens, never returned to
  browser JS.
- Owner: checkout + security.
- Failure mode: if card entry moves into our origin, PCI scope expands — model
  revisit trigger.

### C3. Transport security (TH-EDG-01, TH-EDG-02)
- Enforcement: TLS 1.2+ only, HSTS + preload, valid certs verified
  server-side; edge and origin use identical HTTP parser semantics.
- Owner: platform/SRE.
- Failure: TLS misconfiguration degrades to HTTP — prevented by HSTS + redirect
  monitoring.

### C4. Webhook authentication and dedup (TH-APP-03, TH-PSP-02)
- Enforcement: PSP HMAC signature verified (constant-time) on a dedicated
  endpoint; raw event stored once; handlers idempotent by event ID; state
  machine rejects stale events (e.g., `succeeded` after `refunded`).
- Owner: checkout application team.
- Failure: signature verification must fail closed (reject on any
  verification error, never process unverified).

### C5. Idempotency and atomicity (TH-EDG-06, TH-APP-04, TH-LED-04)
- Enforcement: idempotency keys on create-intent, capture, refund; unique
  constraints in ledger; state transitions atomic (single transaction:
  order-state + ledger postings); single-writer/lock per order.
- Owner: checkout + ledger teams.
- Failure: if idempotency key is dropped/regenerated per retry, duplicates
  return — covered by negative tests.

### C6. Refund authority isolation (TH-APP-02, TH-LED-05)
- Enforcement: no client-triggered refunds; refund API requires
  `refund.initiate` role; approvals require a second role; per-operator limits;
  all refunds logged with approver+executor; break-glass requires
  acknowledged audit.
- Owner: finance operations + engineering.
- Failure: dual control fails open (one compromised account can't move money
  alone).

### C7. Ledger integrity and audit (TH-LED-02, TH-LED-03)
- Enforcement: double-entry invariants (sum of entries = 0; refund ≤ capture;
  capture requires authorized payment); append-only audit log with hash-chain
  or WORM storage; DB users have no direct write to audit rows; deletion
  requires break-glass + audit.
- Owner: ledger team.
- Failure: invariant violations must block the posting, not warn.

### C8. Reconciliation and drift detection (TH-LED-01, TH-PSP-06)
- Enforcement: daily job compares ledger vs PSP settlement files
  (captures, refunds, fees, disputes); drift > threshold pages finance on-call;
  failed runs alert rather than silently skip.
- Owner: finance ops.
- Failure: no alerting = no detection — alert delivery is itself monitored.

### C9. Authentication, session, and authorization (TH-BRO-03/04, TH-APP-01)
- Enforcement: HttpOnly+Secure+SameSite cookies, session rotation on login,
  server-side ownership checks on every object access, MFA for accounts with
  saved payment methods, CSRF tokens on state-changing endpoints.
- Owner: checkout application team.
- Failure: authorization checks must be server-side only; client-side checks
  are never the enforcement point.

### C10. Edge hardening (TH-EDG-03/04/07, TH-OPS-03)
- Enforcement: WAF rules, rate limits per IP/account/endpoint, bot management,
  cache rules (no caching of authenticated/PII responses), unpredictable
  order IDs, create-intent quotas.
- Owner: platform/SRE.
- Failure: rate-limit bypass degrades to DDoS/fee-burn — monitored as anomaly.

### C11. Browser hardening (TH-BRO-01/05, TH-BRO-06)
- Enforcement: strict CSP, no third-party scripts on checkout (except PSP
  hosted fields), `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy`,
  no sensitive values in URLs.
- Owner: frontend + security.
- Failure: CSP exception added for a third-party script reopens XSS — change
  review gate.

### C12. Secrets management (TH-PSP-01, TH-OPS-01)
- Enforcement: PSP keys/webhook secrets in a vault, per-environment, rotated
  on schedule and on suspicion; never in client bundles, source, or logs;
  CI/CD least privilege with verified artifacts.
- Owner: platform/security.
- Failure: rotation must not require downtime (overlap window), else operators
  defer rotation — tested rotation runbook.

### C13. Fraud and abuse controls (TH-PSP-04/05, TH-EDG-07, TH-OPS-03)
- Enforcement: 3DS with risk-based step-up, uniform PSP error mapping (no
  card-validity oracle), velocity rules (attempts per card/IP/account),
  manual review queue for high-risk orders, chargeback tracking.
- Owner: fraud/finance ops.
- Failure: false-positive economics — review queue tuning is an operational
  loop, not a one-time setting.

### C14. Observability and detection (TH-OPS-02, TH-LED-01)
- Enforcement: structured events for every money event (create/capture/
  refund/approve), dashboards for drift/velocity/anomaly, alert rules with
  owners, on-call coverage.
- Owner: SRE + finance ops.
- Failure: logging is not detection — every alert rule has a tested trigger
  condition (see verification).

### C15. Data protection and retention (TH-EDG-04, TH-LED-07)
- Enforcement: encryption at rest; PII/order retention schedule with deletion
  jobs; backups with quarterly restore drills.
- Owner: platform + DPO.
- Failure: backup exists but never restored is not recovery — drills are the
  control.

## 8. Verification Matrix

| Control | Falsifiable claim | Method / oracle | Environment | Evidence required |
| --- | --- | --- | --- | --- |
| C1 | Client price/amount fields are ignored; catalog is sole authority | Negative test: tampered price → rejected/overridden; property test: final amount always equals catalog computation | Test + prod | Passing adversarial tests, code review |
| C2 | No PAN ever transits our origin or logs | Packet/network capture on our side; log scan for PAN pattern | Staging | Capture evidence + log scan green |
| C3 | Only TLS 1.2+ accepted; HSTS served | `openssl`/SSL Labs-style scan; response header check | Prod edge | Scan report, header check |
| C4 | Tampered or unsigned webhook rejected; replay of consumed event no-ops | Negative tests (bad HMAC, replayed event); fail-closed test | Test | Passing tests |
| C5 | N parallel duplicate capture requests → exactly 1 charge + 1 ledger row | Concurrency/property test (e.g., 50 parallel retries) | Test | Test results + ledger counts |
| C6 | Single role cannot refund without second approval; limits enforced | Negative tests per role; audit log shows approver+executor | Staging | Test results + sample audit rows |
| C7 | Every posting preserves double-entry invariants; audit rows immutable | Property tests (sum=0, refund≤capture); tamper test on audit log | Test | Test results |
| C8 | Recon drift = 0 for N days; injected synthetic mismatch triggers alert | Seed mismatch in staging job; verify page + alert | Staging | Job report + alert receipt |
| C9 | Cross-user object access returns 403; session cookies are HttpOnly/Secure/SameSite | Negative authz tests; header inspection | Test + prod | Test results + headers |
| C10 | Rate limits and WAF block scripted floods; no PII cached | Load/abuse test against staging edge; cache-inspection test | Staging | Test results |
| C11 | CSP blocks inline/third-party execution outside allowlist | CSP violation report test; browser check | Staging | Violation report sample |
| C12 | Secrets absent from source/logs/client; rotation completes within window | Secret scan (CI + repo), log scan, rotation drill | All | Scan reports, drill log |
| C13 | Uniform PSP errors; velocity rule trips on scripted carding | Abuse test with N attempts → block; error-body comparison | Staging | Test results |
| C14 | Each alert rule fires on its trigger and pages an owner | Fault injection per rule | Staging | Alert receipts |
| C15 | Restore from backup completes within RTO | Quarterly restore drill | Staging | Drill report with time |

## 9. Residual Risk, Owners, and Review Triggers

| Residual risk | Affected parties | Compensating control | Decision authority | Review trigger |
| --- | --- | --- | --- | --- |
| Chargeback/friendly fraud losses | Business | C13 review queue, 3DS, chargeback tracking; economics owned by fraud ops | Finance head | Quarterly loss review |
| User-device compromise (keyloggers) | Customers | C2 hosted fields, 3DS; cannot be eliminated | Security | On new card-entry design change |
| PSP outage/insolvency | Business, customers | C8 reconciliation, provider monitoring, fallback provider option | CTO/finance | On provider SLA/contract change |
| Insider collusion (two roles cooperate) | Business | C7 hash-chain audit, C6 dual control; residual accepted | CEO/security | On org/role changes |
| 0-day in dependencies | Business, customers | C8 supply-chain scanning, SBOM, incident runbook | Security | On dependency policy change |
| Reconciliation gap between settlement cycles | Business | C8 daily job; residual is timing only | Finance ops | On provider change |

**Model revisit triggers:** change to a trust boundary, new data class (e.g.,
raw card entry), new privilege (e.g., client refunds), new provider, deployment
topology change, or any material threat change. This document expires if
unreviewed for 12 months.

## 10. Artifact Sensitivity and Handling

- This document is an **internal security artifact**, not a public document.
  Repository visibility is not approval to publish.
- Contains design-level (not exploit-level) detail; still, any public
  derivative (e.g., assurance summary for customers) must be a separate,
  redacted document reviewed by security before release.
- Store under normal internal access control; no secrets or URLs to live
  environments are included by design.

## 11. Handoffs

- Implementation: checkout, ledger, and platform teams own controls C1–C15;
  each control requires its Section 8 evidence before claiming effectiveness.
- Assurance: security team owns adversarial re-testing (penetration test
  objectives: forged webhook, refund abuse, price tampering, race conditions).
- Incident: `run-incident-response` owns live incidents; this model feeds
  triage, not the other way around.
- Fraud/economics: fraud ops owns adaptive abuse rules and false-positive
  tuning (product-abuse domain).
