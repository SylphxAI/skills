# Threat Model and Security Design Contract — Public Checkout Flow

| Field | Value |
| --- | --- |
| Status | **Proposed design, pre-implementation.** No control is claimed effective until its verification row (Section 7) passes. |
| Version / date | 0.1 / 2026-08-11 |
| Owner | Security engineering (product security lead) |
| Classification | Internal — security-sensitive. Not for public release. See Section 11. |
| Review trigger | Any change to a trust boundary, payment provider, data class, admin privilege, or deployment topology; at minimum quarterly, and before launch sign-off. |

---

## 1. Subject, scope, and evidence state

### 1.1 Subject

The public checkout flow: a customer-facing browser checkout integrated with an external payment provider, an internal append-only ledger, and a privileged admin refund path. Launch scope names these components: client browser, TLS edge, payment provider, internal ledger, admin refund path.

### 1.2 Environment

- Public internet; hostile-by-default browser clients (desktop and mobile).
- TLS edge terminates external traffic (CDN/WAF assumed available; confirm — Open Evidence OE-02).
- Payment provider is an external dependency: hosted payment capture, provider API, signed webhooks. Provider is TBD (OE-01).
- Ledger and admin console are internal, on the trusted network, used by employees.

### 1.3 Security objectives

| ID | Objective |
| --- | --- |
| O1 | **Money movement integrity:** every ledger money event corresponds to a real, verified provider event; no money event is forged, duplicated, lost, or altered. |
| O2 | **Order correctness:** customers are charged the server-computed amount for what they receive; fulfillment occurs only for verified payment. |
| O3 | **Cardholder data protection:** cardholder data never enters our systems (token-only); customer PII is minimized and protected. |
| O4 | **Refund authority isolation:** only authenticated, authorized, MFA-protected personnel reach refund authority; an attacker with client access cannot reach it. |
| O5 | **Detectability and accountability:** every money event and privileged admin action is auditable and reconciled; anomalies alert. |
| O6 | **Availability and recoverability:** checkout survives load and provider outages; ledger and refund path recover within agreed RTO/RPO, with proven restore. |

### 1.4 Protected assets

- A1 — Payment credentials (PAN, CVC): must never reach our systems.
- A2 — Payment tokens, provider API keys, webhook signing secrets.
- A3 — Order data, cart, receipts, customer PII (name, email, address).
- A4 — Ledger records (money-movement truth).
- A5 — Refund authority (admin accounts and the provider refund capability they control).
- A6 — Admin credentials and sessions.
- A7 — Production code, build artifacts, and deployment identity.

### 1.5 Affected parties

Customers, the merchant/company, the payment provider, card networks and acquirers, admin and support staff, and incident responders.

### 1.6 Unacceptable outcomes

- UO1 — Unauthorized money movement: forged, replayed, or insider-initiated refunds; fulfillment without payment; payment without a ledger entry.
- UO2 — Over-refund or refund to the wrong party (beyond captured amount, wrong order, wrong account/currency).
- UO3 — PAN or full-payload disclosure in logs, databases, or third-party scripts.
- UO4 — Admin account takeover that enables any of the above.
- UO5 — Undetected drift between provider, ledger, and orders beyond the reconciliation window.
- UO6 — Checkout outage during launch windows with no tested recovery path.

### 1.7 Assumptions (each must be confirmed; owner in parentheses)

- A-01 — Provider offers hosted payment capture (redirect or hosted iframe) and tokenization; we never touch PAN (confirm in contract — drives C-01 and PCI scope).
- A-02 — Provider webhooks are signed (HMAC) and delivered over TLS, with documented at-least-once retry semantics (OE-01).
- A-03 — The ledger is our own append-only store with uniqueness constraints.
- A-04 — Admin console is a separate trust domain from checkout: its own authentication, MFA, sessions.
- A-05 — A deployment pipeline with review, scanning, and least-privilege deploy identity exists (OE-02).
- A-06 — Monitoring/alerting with on-call routing exists and alerts are testable (OE-02).
- A-07 — A compliance owner determines PCI DSS 4.0.1 SAQ A vs SAQ A-EP eligibility with the chosen provider (see T-20).
- A-08 — Checkout volume and refund thresholds are unspecified at model time (OE-03).

### 1.8 Non-goals (owned elsewhere; no duplication here)

- Adaptive fraud engine and product-abuse loss economics — owned by the product-abuse risk domain (card-testing loss tolerance is their decision).
- Incident response execution — a downstream runbook handoff, Section 12.
- Full PCI DSS audit and legal/compliance review — compliance owner.
- Cryptographic review of the provider's protocol — we verify signatures per provider spec, we do not redesign it.
- Implementation and test authoring — downstream build handoff, Section 12.

### 1.9 Evidence state

- **Observed:** the component list and trust-boundary intent in the launch scope (the subject of this document).
- **Not observed:** provider choice and webhook semantics, existing organizational controls (secrets manager, SIEM, CI), the current admin access model, volume, prior incident history. These are Open Evidence OE-01..OE-06 (Section 10).
- **Consequence:** all likelihood ratings are design-time estimates with stated confidence; all controls are designed and unverified; the verification matrix (Section 7) is the acceptance contract. Per the model-security-threats skill integrity rules, a control is never called effective without implementation and verification evidence at the claimed boundary.

---

## 2. System model

### 2.1 Components, identities, privileges

| Component | Identity | Privileges | Trust |
| --- | --- | --- | --- |
| Client browser | Anonymous shopper / admin user | Reads own orders, initiates checkout; admin sessions carry elevated rights | Untrusted |
| TLS edge / CDN / WAF | Edge service | Terminates TLS, serves static content, rate limits, injects security headers | Partially trusted (network boundary) |
| Checkout API | Server service identity | Cart/order creation, webhook processing, provider API calls, ledger writes | Trusted internal |
| Payment provider | External TPSP | Captures PAN, processes charges/refunds, emits signed webhooks | External dependency |
| Internal ledger | Append-only store | Money truth; written only by the verified-event and refund paths | Trusted internal |
| Fulfillment | Internal service | Reads orders; ships only on verified PAID | Trusted internal |
| Admin console / refund API | Admin identities (MFA) | Initiates refunds within bounds, views orders | Privileged internal |
| Secrets manager | Service + human identities | Holds provider keys, webhook secrets, DB credentials | Trusted, vaulted |
| Monitoring / alerting | Service identity | Reads logs/metrics, routes alerts | Trusted, read-only |
| CI/CD | Deploy identity | Builds, scans, deploys with least privilege | Trusted pipeline |

### 2.2 Data and control flows

- D1 — Shopper → Checkout API: create order/cart. API returns order ID plus a **signed cart snapshot**; price, quantity, and coupon value are computed server-side (C-03).
- D2 — Browser → Payment provider: redirected to the provider-hosted payment page; the provider captures PAN and returns a token. Our code never sees the PAN (C-01).
- D3 — Provider → Checkout API: signed webhooks (payment succeeded/failed, refund, dispute). Signature and replay window are verified before any processing (C-05).
- D4 — Checkout API → Ledger: append paid/refunded events with unique constraints; fulfillment is triggered only from the verified PAID state (C-06, C-08, C-17).
- D5 — Admin → Refund API → Provider: idempotent refund with server-side bounds; the provider's refund webhook drives the ledger reversal (C-07, C-09).
- D6 — Reconciliation: daily job compares provider settlement/payout reports against ledger and orders; diffs are queued and alerted (C-18).
- D7 — Secrets, logs, monitoring: vault access, structured logs, alert routing (C-14, C-15).

### 2.3 Diagram

```
                    ┌───────────────────────┐
                    │   Client browser      │   untrusted (shopper / admin)
                    │  (cart, checkout,     │
                    │   admin console)      │
                    └──────────┬────────────┘
                               │ HTTPS (TLS 1.2+)
                    ┌──────────▼────────────┐
                    │  TLS edge / CDN / WAF │   partially trusted
                    └──────────┬────────────┘
                               │
        ┌──────────────────────┼───────────────────────┐
        │                      │                       │
┌───────▼───────┐    ┌─────────▼─────────┐   ┌─────────▼────────┐
│ Checkout API  │    │ Payment provider  │   │ Admin console /  │
│ (orders, cart,│◄──►│ (hosted payment,  │   │ refund API (MFA) │
│  webhooks)    │    │  API, webhooks)   │   │                  │
└───────┬───────┘    └─────────┬─────────┘   └─────────┬────────┘
        │                      │                       │
        │   verified events    │                       │ refund events
┌───────▼───────┐              │              ┌───────▼────────┐
│ Internal      │◄─────────────┘              │  Audit log     │
│ ledger        │                             │  (append-only) │
│ (append-only) │                             └────────────────┘
└───────┬───────┘
        │
┌───────▼────────┐   ┌────────────┐   ┌──────────────┐
│ Fulfillment    │   │ Secrets    │   │ Monitoring / │
│ (only on PAID) │   │ manager    │   │ reconciliation│
└────────────────┘   └────────────┘   └──────────────┘
```

### 2.4 Trust boundaries and entry points

- TB-1 — Browser ↔ Edge: internet; attacker-controlled client; TLS only.
- TB-2 — Edge ↔ Checkout API: internal; the API must not be reachable except through the edge.
- TB-3 — Checkout API ↔ Provider: external API plus inbound signed webhooks; the signature is the only authentication for inbound events.
- TB-4 — Checkout API ↔ Ledger: money truth; only the verified-event path writes.
- TB-5 — Admin ↔ Refund authority: privileged; MFA + RBAC; client access must never reach refund authority.
- TB-6 — Internal ↔ secrets/monitoring/CI: least privilege, vaulted, audited.

Entry points: EP-1 checkout page/API (public), EP-2 provider webhook endpoint (public, signed), EP-3 admin console (employees, MFA), EP-4 reconciliation job (internal), EP-5 CI/CD (internal).

---

## 3. Attacker and misuse cases

### 3.1 Actors and goals

| Actor | Typical goals |
| --- | --- |
| External automated attacker | Free goods, pay less, card testing at scale, order/PII scraping |
| External opportunistic | Credential stuffing on admin, session theft, CSRF |
| External sophisticated | Webhook forgery/replay, MITM, supply-chain JS injection, provider account compromise |
| Abusive customer | Coupon abuse, refund abuse, dispute abuse |
| Insider — support | Accidental or malicious refund abuse, data browsing |
| Insider — admin/dev | Elevated access, secrets, production data, refund authority |
| Operational failure | Webhook retries, partial writes, misconfiguration, provider outage, bad deploy |
| Supply chain | Compromised dependency, build pipeline, third-party script |

### 3.2 Misuse and abuse cases

- UC-01 — Tamper price/quantity/coupon in the client to pay less.
- UC-02 — Forge a provider "success" (webhook forgery/replay or return-URL forgery) to get fulfillment without payment.
- UC-03 — Double-submit or browser retry to cause double charge or double fulfillment.
- UC-04 — Refund beyond captured amount, cross-order, or replay a refund to extract money.
- UC-05 — Card testing at scale: fees, chargebacks, reputation.
- UC-06 — Admin takeover → mass refunds / data exfiltration.
- UC-07 — Malicious site triggers an admin refund (CSRF).
- UC-08 — Operational: webhook retry storm, ledger partial write, silent reconciliation failure.

### 3.3 Coverage aids (prompts only, not completeness proof)

- **STRIDE** as a coverage prompt: Spoofing — T-03, T-04; Tampering — T-02, T-05, T-07; Repudiation — T-12, T-15; Information disclosure — T-01, T-12, T-16; Denial of service — T-13, T-18, T-20; Elevation of privilege — T-06, T-08. Category coverage does not prove path feasibility; feasibility is argued in the threat records.
- **Attack-tree sketch for refund authority** (the skill's example constraint: an attacker with client access must not reach refund authority):

```
Refund authority reached
├── (a) Stolen admin session            → T-08  (C-10, C-22, C-16)
├── (b) CSRF while admin is logged in   → T-09  (C-11)
├── (c) Insider abuse of refund rights  → T-10  (C-12, C-13, C-09)
├── (d) Provider key/secret compromise  → T-11  (C-14, C-13)
├── (e) API bug bypassing refund bounds → T-07  (C-09, C-13)
└── (f) Replayed refund webhook         → T-04/T-07 (C-05, C-06, C-09)
```

Each leaf maps to a threat record, controls, and verification; the tree is the coverage check for O4.

---

## 4. Severity model

Ordinal only; no numeric scoring (evidence-bounded per NIST SP 800-30 framing).

- **Likelihood (pre-control, design-time):** High = expected without controls or trivially automatable at scale; Medium = plausible given attacker capability or a single bug; Low = requires privileged access or a multi-step failure chain; Rare = requires multiple independent failures.
- **Impact:** Critical = direct money loss, PAN breach, admin takeover, money-truth corruption; High = large-scale data exposure, compliance failure, significant financial loss; Medium = limited exposure, abuse costs, availability degradation; Low = nuisance.
- **Confidence:** High/Medium/Low, reflecting the evidence in Section 1.9. Missing evidence is stated in each record and in Section 10. Severity is inherent (pre-control); disposition shows how it is reduced.

---

## 5. Threat register

### 5.1 Summary

| ID | Threat | Impact | Likelihood | Conf. | Disposition | Controls | Verify |
| --- | --- | --- | --- | --- | --- | --- | --- |
| T-01 | Payment credential theft (skimming, XSS, MITM) | Critical | Medium | Med-High | Mitigate | C-01, C-02, C-19 | V-01, V-02, V-18 |
| T-02 | Client-side price/cart tampering | Medium | High | High | Mitigate | C-03 | V-03 |
| T-03 | Cross-user order access/mutation (IDOR) | High | Medium | High | Mitigate | C-04, C-22 | V-04 |
| T-04 | Webhook forgery or replay | Critical | Medium | High | Mitigate | C-05, C-06 | V-05, V-06 |
| T-05 | Double charge / double fulfillment (races, retries) | High | Med-High | High | Mitigate | C-06, C-07, C-17 | V-06, V-16 |
| T-06 | Payment-state bypass (fulfillment without payment) | Critical | Low-Med | Med | Mitigate | C-08, C-06 | V-07 |
| T-07 | Refund abuse (bounds, cross-order, replay) | Critical | Medium | Med | Mitigate | C-09, C-13 | V-08, V-12 |
| T-08 | Admin account takeover | Critical | Medium | Med | Mitigate | C-10, C-22, C-16 | V-09, V-21, V-15 |
| T-09 | Admin CSRF (malicious site) | High | Low-Med | High | Mitigate | C-11 | V-10 |
| T-10 | Insider refund fraud | Critical | Low | Low | Mitigate + accept residual | C-12, C-13, C-09 | V-11, V-12, V-08 |
| T-11 | Provider account/secret compromise | Critical | Low | Med | Mitigate | C-14, C-13 | V-13, V-12 |
| T-12 | Sensitive data in logs/observability | Med-High | Medium | High | Mitigate | C-15, C-14 | V-14, V-13 |
| T-13 | Card testing / bulk enumeration | Medium | High | High | Mitigate + accept residual | C-16, C-01 | V-15, V-01 |
| T-14 | Ledger integrity failure (lost/partial/duplicate entries) | Critical | Low-Med | Med | Mitigate | C-17, C-18, C-21 | V-16, V-17, V-20 |
| T-15 | Reconciliation gaps (undetected money drift) | High | Low | Med | Mitigate | C-18, C-13 | V-17, V-12 |
| T-16 | Session hijacking / fixation | Med-High | Low | Med | Mitigate | C-22, C-02 | V-21, V-02 |
| T-17 | Supply-chain compromise (deps, scripts, pipeline) | Critical | Medium | Med | Mitigate | C-19, C-14 | V-18, V-13 |
| T-18 | Checkout unavailability (DoS, provider outage) | Med-High | Medium | Med | Mitigate | C-20, C-21 | V-19, V-20 |
| T-19 | TLS/edge misconfiguration | Medium | Low | High | Mitigate | C-02, C-20 | V-02, V-19 |
| T-20 | PCI scope breach / compliance failure | High | Medium | Med | Mitigate | C-01, C-15, C-19 | V-01, V-14, V-22 |

### 5.2 Detailed records

#### T-01 Payment credential theft (skimming, XSS, MITM)

- **Source/boundary/assets:** Browser, TB-1/TB-2; A1, A3.
- **Actor/capability/preconditions:** External; script injection (XSS, compromised third-party JS), network position (MITM), or client malware; requires PAN to be visible on a page we control or weak TLS.
- **Path:** Injected script reads card fields or sessions → exfil; TLS downgrade/interception; malicious CDN script.
- **Property/parties:** Confidentiality (PCI DSS), trust; customers and merchant (compliance).
- **Consequence/likelihood:** PAN breach, card fraud, SAQ failure, reputation. Inherent Likelihood Medium (design removes PAN from our pages; residual from session/PII theft and third-party JS). Confidence Medium-High.
- **Existing controls:** None observed (design stage).
- **Disposition/controls:** Mitigate — C-01 (provider-hosted capture, no PAN), C-02 (TLS/HSTS/CSP/SRI), C-19 (supply-chain hygiene).
- **Enforcement points:** Payment page hosting (provider domain), TLS edge, script loading.
- **Bypass assumptions:** If an embedded iframe is chosen instead of a redirect (SAQ A-EP), PAN-adjacent risk returns and C-02/C-19 become critical; see T-20.
- **Verification:** V-01, V-02, V-18.
- **Residual risk:** Card-testing and chargeback losses; confidence in residual until launch evidence (R-01).

#### T-02 Client-side price/cart tampering

- **Source/boundary/assets:** Browser, TB-1; A3, A4 (indirect).
- **Actor/capability/preconditions:** Any shopper or automated client; no special capability; requires the server to trust client-supplied amounts.
- **Path:** Modify price/quantity/coupon fields in request bodies or client state before submit.
- **Property/parties:** Integrity (O2); merchant revenue, customer fairness.
- **Consequence/likelihood:** Underpayment or free goods. Inherent Likelihood High (trivially automatable). Impact Medium if server recomputes; Critical if not — the design removes the path, so residual is Low. Confidence High.
- **Existing controls:** None observed.
- **Disposition/controls:** Eliminate — C-03: amounts are always computed server-side from a signed cart snapshot; client-provided amounts are ignored.
- **Enforcement points:** Checkout API input handling.
- **Bypass assumptions:** If any endpoint accepts a client amount (coupon override, manual price adjustment), the path reopens; C-03 covers all money-affecting endpoints.
- **Verification:** V-03.
- **Residual:** Low; coupon/catalog logic bugs are outside this control (product-abuse domain).

#### T-03 Cross-user order access or mutation (IDOR)

- **Source/boundary/assets:** Checkout API, EP-1; A3, A4.
- **Actor/capability/preconditions:** Any unauthenticated or authenticated client; requires guessable/sequential order IDs or missing ownership checks.
- **Path:** Enumerate order IDs; read or mutate another user's order (address, email, status).
- **Property/parties:** Confidentiality/integrity; customers.
- **Consequence/likelihood:** PII disclosure, account/order tampering, downstream refund confusion. Inherent Likelihood Medium. Confidence High.
- **Existing controls:** None observed.
- **Disposition/controls:** C-04 unguessable IDs (UUIDv4) plus server-side authorization on every order resource read/write; C-22 session binding.
- **Enforcement points:** Checkout API resource handlers.
- **Bypass assumptions:** Authorization must be enforced per-request, not in the UI; admin and shopper scopes must not share an order-lookup path without checks.
- **Verification:** V-04.
- **Residual:** Low-Medium until authz matrix evidence exists (OE-04).

#### T-04 Payment webhook forgery or replay

- **Source/boundary/assets:** Provider → Checkout API, TB-3, EP-2; A2, A4, A5.
- **Actor/capability/preconditions:** External attacker able to reach the public webhook endpoint; requires missing/weak signature verification or an unbounded replay window.
- **Path:** Craft or replay a `payment.succeeded` / `refund` event → ledger and fulfillment treat fake money movement as real.
- **Property/parties:** Integrity (O1, O2); merchant direct financial loss.
- **Consequence/likelihood:** Goods shipped without payment; forged refunds. Inherent Likelihood Medium (public endpoint, automatable). Confidence High.
- **Existing controls:** None observed.
- **Disposition/controls:** C-05 verify HMAC signature (constant-time compare) and timestamp within the replay window (provider default ≈ 5 minutes; confirm OE-01) **before any processing**; C-06 event-ID deduplication.
- **Enforcement points:** Webhook handler, before parsing or side effects.
- **Bypass assumptions:** Signature verification must not be skippable (test-mode switch, debug endpoint); window must match provider retry semantics or legitimate retries break.
- **Verification:** V-05, V-06.
- **Residual:** Low; depends on provider signing scheme being correct (OE-01).

#### T-05 Double charge or double fulfillment (races, retries)

- **Source/boundary/assets:** Browser ↔ Checkout API ↔ Provider ↔ Ledger, TB-1/TB-3/TB-4; A3, A4.
- **Actor/capability/preconditions:** Shopper double-submit/refresh, provider at-least-once webhook retries, concurrent API requests.
- **Path:** Two payment intents created for one order; or one provider event processed twice; or two fulfillment triggers from a race.
- **Property/parties:** Integrity, consistency; customers, merchant.
- **Consequence/likelihood:** Customer charged twice, duplicate shipment, reconciliation noise. Inherent Likelihood Medium-High (retries are normal). Confidence High.
- **Existing controls:** None observed.
- **Disposition/controls:** C-07 idempotency keys on intent creation and refunds; C-06 unique constraints on provider event IDs plus atomic (CAS) order-state transitions; C-17 ledger uniqueness on payment/refund references.
- **Enforcement points:** Checkout API, ledger write path.
- **Bypass assumptions:** Unique constraints must be in the database, not application locks only; state transitions must be compare-and-set.
- **Verification:** V-06, V-16.
- **Residual:** Low; provider retry semantics must be documented (OE-01).

#### T-06 Payment-state bypass (fulfillment without payment)

- **Source/boundary/assets:** Checkout API, Provider return URL, TB-3; A3, A4.
- **Actor/capability/preconditions:** Attacker or bug; requires trusting client-observable signals (return-URL redirect) or a missing state machine.
- **Path:** User completes the provider redirect and the browser is sent back to a "success" URL; if the return URL is treated as payment confirmation, fulfillment triggers without a verified provider event.
- **Property/parties:** Integrity (O2); merchant direct loss.
- **Consequence/likelihood:** Goods shipped without payment. Inherent Likelihood Low-Medium (needs a specific design bug, which is the default in many checkouts). Confidence Medium.
- **Existing controls:** None observed.
- **Disposition/controls:** C-08 payment confirmation only via verified webhook events, with a provider-API pull confirmation as backstop; the return URL is display-only. C-06 state machine gates fulfillment on verified PAID.
- **Enforcement points:** Order state machine, fulfillment trigger.
- **Bypass assumptions:** No code path may transition to PAID without a verified provider event or API pull.
- **Verification:** V-07.
- **Residual:** Low; this is the highest-value correctness bug to hunt in review (handoff H-02).

#### T-07 Refund abuse (bounds, cross-order, replay)

- **Source/boundary/assets:** Admin console / refund API, TB-5, EP-3; A4, A5.
- **Actor/capability/preconditions:** Admin, compromised admin session, or API bug; requires missing server-side bounds.
- **Path:** Refund more than the remaining captured amount; refund a different order/payment than the one purchased; replay the same refund; refund in a different currency.
- **Property/parties:** Integrity (O1), authorization; merchant direct loss.
- **Consequence/likelihood:** Direct money extraction. Inherent Likelihood Medium. Confidence Medium.
- **Existing controls:** None observed.
- **Disposition/controls:** C-09 server-side bounds: refund ≤ remaining captured amount, currency match, refund bound to the payment that belongs to the order, unique refund idempotency key, approval workflow above thresholds; C-13 audit trail.
- **Enforcement points:** Refund API, before provider call.
- **Bypass assumptions:** Bounds must be enforced in the API, not the UI; the provider refund must be idempotent by key.
- **Verification:** V-08, V-12.
- **Residual:** Low-Medium; see R-04 for approval thresholds.

#### T-08 Admin account takeover

- **Source/boundary/assets:** Admin console, TB-5, EP-3; A5, A6.
- **Actor/capability/preconditions:** External; credential stuffing, phishing, session theft; requires weak authentication.
- **Path:** Obtain admin credentials/session → refunds, data exfiltration.
- **Property/parties:** Confidentiality, integrity, authorization; merchant and customers.
- **Consequence/likelihood:** Mass refunds, PII exfiltration, provider account access. Inherent Likelihood Medium. Confidence Medium.
- **Existing controls:** None observed.
- **Disposition/controls:** C-10 mandatory phishing-resistant MFA (FIDO2 preferred), short-lived sessions, session binding, anomaly detection; C-22 session lifecycle; C-16 rate limits on login.
- **Enforcement points:** Admin authentication, session issuance.
- **Bypass assumptions:** MFA must cover API tokens/service accounts that can refund, not just the UI; no backdoor credentials.
- **Verification:** V-09, V-21, V-15.
- **Residual:** Low-Medium; credential attacks remain possible via phishing-resistant MFA gaps (OE-04).

#### T-09 Admin CSRF (malicious site)

- **Source/boundary/assets:** Admin browser, TB-5; A5.
- **Actor/capability/preconditions:** Any site the admin visits while logged in; requires missing CSRF defenses.
- **Path:** Malicious page issues a refund request using the admin's ambient session.
- **Property/parties:** Integrity, authorization; merchant.
- **Consequence/likelihood:** Unauthorized refunds. Inherent Likelihood Low-Medium. Confidence High.
- **Existing controls:** None observed.
- **Disposition/controls:** C-11 SameSite cookies, CSRF tokens, origin checks on all state-changing admin endpoints; refunds additionally require a confirm step.
- **Enforcement points:** Admin middleware.
- **Bypass assumptions:** Tokens must be per-session and validated server-side; same-site checks must not be bypassable via subdomain confusion (strict-origin).
- **Verification:** V-10.
- **Residual:** Low.

#### T-10 Insider refund fraud

- **Source/boundary/assets:** Admin, support staff, TB-5; A4, A5.
- **Actor/capability/preconditions:** Insider with refund access; malicious intent or coercion.
- **Path:** Direct refund abuse using legitimate access.
- **Property/parties:** Integrity, accountability; merchant.
- **Consequence/likelihood:** Direct loss. Inherent Likelihood Low (requires intent; no insider-controls evidence exists — confidence Low). Impact Critical.
- **Existing controls:** None observed.
- **Disposition/controls:** C-12 RBAC separation of duties (support cannot refund; refund role distinct from finance), two-person rule above thresholds, quarterly access reviews; C-13 immutable audit log; C-09 bounds.
- **Enforcement points:** Refund role grants, refund workflow.
- **Bypass assumptions:** Audit log is write-once; approvers are distinct from requesters.
- **Verification:** V-11, V-12, V-08.
- **Residual:** Accept residual above thresholds with two-person rule; decision authority R-04.

#### T-11 Provider account or secret compromise

- **Source/boundary/assets:** Provider console, secrets manager, TB-3/TB-6; A2, A5.
- **Actor/capability/preconditions:** External (phishing, leaked key) or insider; requires weak key hygiene.
- **Path:** Provider API key used to create refunds/direct charges; webhook secret used to forge events.
- **Property/parties:** Integrity, confidentiality; merchant.
- **Consequence/likelihood:** Direct money movement, forged events. Inherent Likelihood Low (provider + org controls assumed). Confidence Medium.
- **Existing controls:** None observed.
- **Disposition/controls:** C-14 secrets in vault, provider key least privilege (scoped), IP allowlist, MFA on provider console, rotation schedule, usage alerts; C-13 audit.
- **Enforcement points:** Secrets manager, provider console.
- **Bypass assumptions:** Keys must not appear in code, CI logs, or developer machines; rotation must be drilled.
- **Verification:** V-13, V-12.
- **Residual:** Low-Medium; supply-chain and credential risks outside our boundary are accepted (R-02).

#### T-12 Sensitive data in logs/observability

- **Source/boundary/assets:** Checkout API, edge, CI logs; A1, A3.
- **Actor/capability/preconditions:** Insider, incident responders, log consumers; requires verbose error logging of request bodies.
- **Path:** Webhook payloads, PII, or tokens logged as debug output; PAN if ever handled.
- **Property/parties:** Confidentiality, compliance; customers.
- **Consequence/likelihood:** PII/PAN exposure, SAQ failure. Inherent Likelihood Medium (error logs commonly include payloads). Confidence High.
- **Existing controls:** None observed.
- **Disposition/controls:** C-15 structured logging with token-only data, redaction, retention limits, no request-body dumping; C-14 no secrets in config/logs.
- **Enforcement points:** Logging framework, log pipeline.
- **Bypass assumptions:** Redaction must be verified by negative tests, not convention.
- **Verification:** V-14, V-13.
- **Residual:** Low-Medium; log pipelines change often — retest on pipeline changes.

#### T-13 Card testing / bulk enumeration

- **Source/boundary/assets:** Checkout page, EP-1; A3 (incidental).
- **Actor/capability/preconditions:** Automated external; public checkout makes this trivially automatable.
- **Path:** Bulk attempts with test/stolen cards; provider fees, chargebacks, account holds.
- **Property/parties:** Availability, cost; merchant.
- **Consequence/likelihood:** Fees, chargebacks, provider account risk, reputation. Inherent Likelihood High. Impact Medium.
- **Existing controls:** None observed.
- **Disposition/controls:** C-16 rate limits and velocity rules on checkout endpoints, CAPTCHA escalation, provider fraud tooling (e.g., Radar-class), anomaly alerts; C-01 keeps PAN out of our scope.
- **Enforcement points:** Edge and provider.
- **Bypass assumptions:** Velocity rules must not block legitimate bursts (volume evidence needed, OE-03).
- **Verification:** V-15, V-01.
- **Residual:** Accept residual loss tolerance — owned by product-abuse domain (R-01).

#### T-14 Ledger integrity failure (lost, partial, or duplicate entries)

- **Source/boundary/assets:** Checkout API ↔ Ledger, TB-4; A4.
- **Actor/capability/preconditions:** Operational failure (process kill between provider event and ledger write, retries, partial transactions).
- **Path:** Provider event processed but ledger write lost → customer paid, no record; or duplicate write.
- **Property/parties:** Integrity (O1), availability; merchant, customers.
- **Consequence/likelihood:** Money truth corrupted, silent drift. Inherent Likelihood Low-Medium. Confidence Medium.
- **Existing controls:** None observed.
- **Disposition/controls:** C-17 append-only ledger with transactional outbox (provider-event processing and ledger entry in one transaction, or outbox table with dispatcher), uniqueness constraints, checksums; C-18 reconciliation catches residue; C-21 backups.
- **Enforcement points:** Ledger write path.
- **Bypass assumptions:** Outbox dispatch must be idempotent; manual DB writes must be impossible (no ad-hoc prod DB access without audit).
- **Verification:** V-16, V-17, V-20.
- **Residual:** Low-Medium; restore-drill evidence required before launch (V-20).

#### T-15 Reconciliation gaps (undetected money drift)

- **Source/boundary/assets:** Ledger ↔ Provider reports, D6; A4.
- **Actor/capability/preconditions:** Operational; reconciliation absent, silent, or unchecked.
- **Path:** Provider settled amounts diverge from ledger/orders and nobody notices.
- **Property/parties:** Integrity, accountability (O1, O5); merchant.
- **Consequence/likelihood:** Undetected loss or overcharging. Inherent Likelihood Low if reconciliation exists. Confidence Medium.
- **Existing controls:** None observed.
- **Disposition/controls:** C-18 daily automated reconciliation (provider payout report vs ledger vs orders), unresolved-diff queue, alerting with on-call routing, monthly attestation; C-13 audit trail supports investigation.
- **Enforcement points:** Reconciliation job.
- **Bypass assumptions:** Reconciliation must run on real production reports, not test-mode; diffs must not be silently auto-closed.
- **Verification:** V-17, V-12.
- **Residual:** Low; depends on provider report formats (OE-01).

#### T-16 Session hijacking / fixation

- **Source/boundary/assets:** Browser ↔ Checkout API, TB-1; A3, A6.
- **Actor/capability/preconditions:** External with network or XSS position; requires weak session handling.
- **Path:** Steal or fixate a checkout/admin session cookie.
- **Property/parties:** Confidentiality, integrity; customers.
- **Consequence/likelihood:** Order/account access, payment details view. Inherent Likelihood Low with TLS and cookie flags. Confidence Medium.
- **Existing controls:** None observed.
- **Disposition/controls:** C-22 rotation on auth, HttpOnly/Secure/SameSite cookies, idle+absolute timeouts; C-02 TLS.
- **Enforcement points:** Session middleware.
- **Bypass assumptions:** Cookies must not be readable by scripts; sessions must not survive privilege change.
- **Verification:** V-21, V-02.
- **Residual:** Low.

#### T-17 Supply-chain compromise (dependencies, scripts, pipeline)

- **Source/boundary/assets:** Third-party JS, dependencies, CI/CD, TB-6; A7.
- **Actor/capability/preconditions:** External; compromised npm package, CDN script, or build tool.
- **Path:** Malicious JS on the checkout page (skimming), compromised dependency in the API, tampered build artifact.
- **Property/parties:** Confidentiality, integrity; customers, merchant.
- **Consequence/likelihood:** Skimming or code injection. Inherent Likelihood Medium. Confidence Medium.
- **Existing controls:** None observed.
- **Disposition/controls:** C-19 lockfiles, SCA scanning, SRI + CSP for third-party scripts, minimal third-party JS on checkout pages, signed artifacts, least-privilege CI with review; C-14 no secrets in builds.
- **Enforcement points:** Dependency resolution, build pipeline, page script loading.
- **Bypass assumptions:** SRI hashes must be pinned and reviewed on change; CI must not accept unsigned/unreviewed artifacts.
- **Verification:** V-18, V-13.
- **Residual:** Medium until SCA/SRI evidence exists (OE-05); reviewed quarterly.

#### T-18 Checkout unavailability (DoS, provider outage)

- **Source/boundary/assets:** Edge, Checkout API, Provider, EP-1/EP-2; A4, A7.
- **Actor/capability/preconditions:** Bot flood, provider outage, misconfigured deploy.
- **Path:** Checkout unavailable during peak; webhook endpoint overwhelmed; provider incident.
- **Property/parties:** Availability (O6); revenue, customers.
- **Consequence/likelihood:** Revenue loss, support load, launch impact. Inherent Likelihood Medium. Confidence Medium.
- **Existing controls:** None observed.
- **Disposition/controls:** C-20 CDN/WAF rate limits, autoscaling, graceful degradation, load/chaos tests, provider status monitoring; C-21 recovery runbook.
- **Enforcement points:** Edge, orchestration.
- **Bypass assumptions:** Rate limits must not break legitimate checkout; capacity must be load-tested at expected peak (OE-03).
- **Verification:** V-19, V-20.
- **Residual:** Medium; single-provider dependence accepted (R-02).

#### T-19 TLS/edge misconfiguration

- **Source/boundary/assets:** Edge, TB-1/TB-2; A3.
- **Actor/capability/preconditions:** Network position; requires weak TLS config or missing HSTS.
- **Path:** Downgrade, interception, stripping of security headers.
- **Property/parties:** Confidentiality, integrity; customers.
- **Consequence/likelihood:** Interception of PII/session data. Inherent Likelihood Low with automation. Confidence High.
- **Existing controls:** None observed.
- **Disposition/controls:** C-02 TLS 1.2+ (1.3 preferred), HSTS, automated certificate management, strict security headers; C-20 edge hygiene.
- **Enforcement points:** Edge configuration.
- **Bypass assumptions:** Backend-to-backend TLS with proper certificate validation (no `verify=None`); HSTS preload.
- **Verification:** V-02, V-19.
- **Residual:** Low.

#### T-20 PCI scope breach / compliance failure

- **Source/boundary/assets:** Payment capture design, D2; A1.
- **Actor/capability/preconditions:** Design/operational drift: merchant-hosted iframe without SAQ A-EP controls, PAN in logs, card data at rest.
- **Path:** Scope creep from redirect (SAQ A) to embedded capture (SAQ A-EP) without the required script-integrity controls (PCI DSS 4.0.1 Req 6.4.3 / 11.6.1); PAN retention.
- **Property/parties:** Compliance, confidentiality; merchant, acquirer.
- **Consequence/likelihood:** Fines, acquirer action, breach liability. Inherent Likelihood Medium (scope creep is common). Confidence Medium.
- **Existing controls:** None observed.
- **Disposition/controls:** C-01 hosted payment page redirect (SAQ A-eligible) or, if embedded, explicit SAQ A-EP controls including script integrity; C-15 no card data at rest or in logs; C-19 script allowlisting.
- **Enforcement points:** Payment page architecture, data-retention policy.
- **Bypass assumptions:** Compliance owner must confirm eligibility with the provider before launch (A-07).
- **Verification:** V-01, V-14, V-22.
- **Residual:** Low if SAQ A redirect confirmed; Medium if embedded capture is chosen without A-EP controls.

---

## 6. Controls design

Design principles: eliminate the path first (C-01 removes PAN entirely), then reduce privilege/exposure (C-09, C-12), then prevent (C-03..C-08), detect (C-15, C-18), contain and recover (C-20, C-21). Controls are bounded to the checkout path; no org-wide gates are proposed. Every control lists its enforcement point, owner, failure/degradation behavior, and bypass assumptions. **None of these are effective until the corresponding verification row (Section 7) passes.**

### 6.1 Client and edge

**C-01 Provider-hosted payment capture, token-only.** PAN is captured only on the provider-hosted page; our systems see only payment tokens. Enforcement point: payment page architecture (redirect preferred for SAQ A). Owner: checkout engineering + compliance. Failure mode: if embedded iframe is chosen, PCI scope expands and script-integrity controls become mandatory (see T-20). Bypass assumptions: no internal tool, log, or test harness ever touches real PAN. Traceability: T-01, T-13, T-20.

**C-02 TLS 1.2+/HSTS/headers/cert automation.** TLS 1.2+ (1.3 preferred), HSTS with preload, automated certificate renewal, strict security headers (CSP, frame-ancestors, SRI where applicable), backend TLS with real certificate validation. Enforcement point: TLS edge and all internal service calls. Owner: platform engineering. Failure mode: if headers drift, pages degrade security posture silently — verify with automated checks (V-02). Bypass assumptions: no `verify=None` backend calls; no plaintext internal fallback. Traceability: T-01, T-16, T-19.

**C-03 Server-side price/cart integrity.** Amounts, quantities, and coupon values are computed from a server-side signed cart snapshot; client-supplied amounts are ignored everywhere. Enforcement point: Checkout API input handling for every money-affecting endpoint. Owner: checkout engineering. Failure mode: if any endpoint accepts a client amount, underpayment path reopens. Bypass assumptions: manual price overrides, if ever needed, go through the admin path with audit, never through client input. Traceability: T-02.

**C-04 Unguessable IDs + per-request authorization.** UUIDv4 order/payment identifiers and server-side ownership checks on every order resource; shopper and admin scopes never share an unauthenticated lookup path. Enforcement point: Checkout API resource handlers. Owner: checkout engineering. Failure mode: a missing check on a new endpoint is invisible until tested — hence the authz matrix (V-04). Bypass assumptions: authorization lives in the API layer, not the UI. Traceability: T-03.

**C-16 Rate limiting and velocity controls.** Per-IP/per-session limits on checkout, login, and webhook endpoints; velocity rules for payment attempts; CAPTCHA escalation; provider-side fraud tooling enabled. Enforcement point: edge/WAF and provider. Owner: platform engineering + fraud domain. Failure mode: overly tight limits break legitimate bursts — tune with volume evidence (OE-03). Bypass assumptions: limits apply to all entry points, including new ones added post-launch. Traceability: T-08, T-13, T-18.

**C-22 Session management.** Session rotation on privilege change, HttpOnly/Secure/SameSite cookies, idle + absolute timeouts, session binding, no session persistence beyond intended lifetime. Enforcement point: session middleware for checkout and admin. Owner: platform engineering. Failure mode: rotated sessions can interrupt in-flight checkout — acceptable; test UX impact. Bypass assumptions: cookies are not readable by scripts; sessions do not survive privilege change. Traceability: T-03, T-08, T-16.

**C-20 Availability engineering.** CDN/WAF rate limiting, autoscaling, graceful degradation (checkout holds state, does not corrupt), provider status monitoring, load and chaos tests. Enforcement point: edge, orchestration. Owner: platform engineering. Failure mode: during provider outage, checkout degrades to "unavailable" cleanly rather than half-processing orders. Bypass assumptions: capacity is sized from real volume evidence (OE-03). Traceability: T-18, T-19.

### 6.2 Checkout API and provider integration

**C-05 Webhook signature verification.** Every inbound provider event is authenticated by HMAC signature verification with constant-time comparison, timestamp within the replay window (provider default ≈ 5 minutes), before any parsing or side effect. Enforcement point: webhook handler, first line of processing. Owner: checkout engineering. Failure mode: if the window is too short vs provider retry semantics, legitimate retries fail and reconciliation noise grows — confirm provider semantics (OE-01). Bypass assumptions: no test-mode switch or debug path skips verification. Traceability: T-04.

**C-06 Event idempotency and atomic order state machine.** Unique constraints on provider event IDs in the database; order state transitions are compare-and-set; a transition to PAID/REFUNDED occurs exactly once. Enforcement point: order state machine, database constraints. Owner: checkout engineering. Failure mode: a duplicate event is logged as duplicate and ignored, never re-processed. Bypass assumptions: constraints are in the database, not application locks only. Traceability: T-04, T-05, T-06.

**C-07 Idempotency keys.** Payment-intent creation and refund calls carry unique idempotency keys (per order/payment), so provider retries and double-submits cannot double-charge or double-refund. Enforcement point: provider API client. Owner: checkout engineering. Failure mode: if the key is reused across distinct logical operations, a genuine second charge is suppressed — keys must be unique per operation. Bypass assumptions: provider honors the key (confirm in contract, OE-01). Traceability: T-05.

**C-08 Payment confirmation only from verified events.** Client return-URL redirects are display-only; PAID state and fulfillment are driven only by verified webhook events, with a provider-API pull confirmation as backstop. Enforcement point: order state machine, fulfillment trigger. Owner: checkout engineering. Failure mode: if webhooks are delayed, fulfillment lags until the backstop confirms — acceptable; alert on latency (C-18). Bypass assumptions: no code path marks PAID without a verified provider event. Traceability: T-06.

**C-19 Supply-chain hygiene.** Lockfiles, dependency scanning (SCA), SRI + CSP for any third-party scripts, minimal third-party JS on checkout pages, signed/reproducible artifacts, least-privilege CI with review. Enforcement point: build pipeline, page script loading. Owner: platform engineering. Failure mode: dependency updates land unreviewed if scanning is not wired into CI gates. Bypass assumptions: SRI hashes are pinned and change-controlled. Traceability: T-01, T-17, T-20.

**C-14 Secrets management.** Provider API keys and webhook secrets in a vault with least privilege, IP allowlist, rotation schedule, MFA on provider console, usage alerts; no secrets in code, config, or logs. Enforcement point: secrets manager, provider console. Owner: platform engineering. Failure mode: a leaked key is contained only if rotation is drilled and alerts are tested. Bypass assumptions: keys never appear in CI logs or developer machines. Traceability: T-11, T-12, T-17.

**C-15 Log and observability hygiene.** Structured logging, token-only card data, PII minimization, redaction, retention limits, no request-body dumping; alerting wired to on-call (logging is not detection — alerts must be tested). Enforcement point: logging framework, log pipeline. Owner: platform engineering. Failure mode: verbose error logging can reintroduce PII — negative tests are the gate (V-14). Bypass assumptions: redaction is verified by test, not convention. Traceability: T-12, T-20.

### 6.3 Ledger and reconciliation

**C-17 Append-only ledger with transactional outbox.** Money events are written append-only; provider-event processing and ledger entry share a transaction or an outbox table with an idempotent dispatcher; uniqueness constraints on payment/refund references; no ad-hoc prod writes without audit. Enforcement point: ledger write path. Owner: ledger/backend engineering. Failure mode: dispatcher retries must be idempotent; duplicates are prevented by constraints, not by luck. Bypass assumptions: nobody can write the ledger outside the API (DB access is bastioned and audited). Traceability: T-05, T-14.

**C-18 Daily reconciliation with escalation.** Automated daily comparison of provider settlement/payout reports vs ledger vs orders; unresolved diffs go to a queue with on-call alerting; monthly human attestation. Enforcement point: reconciliation job. Owner: finance ops + platform engineering. Failure mode: if the job silently stops, money drift goes undetected — job health is itself monitored and alerted. Bypass assumptions: reconciliation runs against real production reports and diffs are never auto-closed. Traceability: T-14, T-15.

**C-21 Backups and restore drills.** Ledger/DB backups meeting agreed RPO/RTO; periodic restore drills that actually recover and pass reconciliation; refund-path recovery runbook exercised. Enforcement point: backup infrastructure, incident runbook. Owner: platform engineering + incident response. Failure mode: a backup that cannot restore is not a backup — drills are the proof. Bypass assumptions: RPO/RTO targets are set and agreed before launch (OE-03). Traceability: T-14, T-18.

### 6.4 Admin and refund path

**C-09 Refund server-side bounds and approval.** Refund API enforces: amount ≤ remaining captured amount, currency match, refund bound to the payment belonging to the order, unique refund idempotency key, and approval workflow above thresholds (with two-person approval for high-value refunds). Enforcement point: refund API, before the provider call. Owner: finance ops + checkout engineering. Failure mode: on approval-queue outage, refunds pause — safer than unapproved refunds; alert immediately. Bypass assumptions: bounds are enforced in the API, not the UI. Traceability: T-07, T-10.

**C-10 Admin MFA and session hardening.** Mandatory phishing-resistant MFA (FIDO2 preferred) for all admin and refund access, including service accounts that can refund; short-lived sessions; anomaly detection on admin logins/actions. Enforcement point: admin authentication. Owner: identity/security engineering. Failure mode: if MFA is enforced on the UI but not API tokens, the path is open — MFA coverage is part of V-09. Bypass assumptions: no backdoor credentials. Traceability: T-08.

**C-11 CSRF protection on admin.** SameSite cookies, CSRF tokens, origin checks on every state-changing admin endpoint; refunds require a confirm step. Enforcement point: admin middleware. Owner: security engineering. Failure mode: tokens expire mid-form — acceptable friction; retry UX handled. Bypass assumptions: strict-origin checks are not bypassable via subdomains. Traceability: T-09.

**C-12 RBAC separation of duties.** Support staff cannot refund; refund role is distinct from finance; high-value refunds require two approvers; quarterly access reviews. Enforcement point: role grants, refund workflow. Owner: security engineering + finance ops. Failure mode: role sprawl reintroduces insider risk — reviews and V-11 keep it in check. Bypass assumptions: approvers are distinct from requesters. Traceability: T-10.

**C-13 Immutable audit log.** Every money event and privileged admin action (including failed attempts) is written to a write-once, tamper-evident audit log with alerting on tamper; retained per retention policy. Enforcement point: audit writer on every money/admin path. Owner: security engineering. Failure mode: if the audit writer fails, money actions must fail closed (no silent audit loss). Bypass assumptions: storage is WORM/append-only at the infrastructure level. Traceability: T-07, T-10, T-11, T-15.

## 7. Verification matrix

Each row is a falsifiable claim. A control "holds" only when its row has passing evidence in the stated environment. All rows must pass before launch sign-off unless explicitly waived in Section 9.

| ID | Claim (falsifiable) | Method | Oracle (what falsifies the claim) | Environment | Required evidence |
| --- | --- | --- | --- | --- | --- |
| V-01 | No PAN ever reaches our systems | Code review of payment path; staging traffic capture; DB/log scan for PAN-format data | Any PAN in app traffic, DB, or logs | Staging + prod scan | Review record, capture log, scan report |
| V-02 | TLS config holds: 1.2+, HSTS, no weak ciphers | Automated TLS/header scan (SSL Labs class), header assertions in CI | Any weak cipher, missing HSTS, or downgrade | Prod | Scan report + header test output |
| V-03 | Client amount tampering rejected | Negative tests: tamper price/qty/coupon in request; property test: charged amount == server-cart amount | Any tampered request accepted or amount differs from server cart | CI/staging | Test report |
| V-04 | Cross-user order access denied | Automated authz matrix: every role × every order resource; pen-test objective | Any read/mutation of another user's order succeeds | Staging + pen test | Matrix results, pen-test report |
| V-05 | Forged/replayed webhooks rejected | Negative tests: tampered payload, wrong key, expired timestamp, replay of a consumed event | Any forged/replayed event causes a side effect | Staging | Test report |
| V-06 | Duplicate events/requests processed exactly once | Concurrency tests (parallel double-submit, simulated provider retries); DB constraint checks | More than one charge/ledger entry per idempotency key or event ID | Staging | Test report + constraint review |
| V-07 | Fulfillment only from verified PAID | Negative tests: illegal transitions (PAID without verified event, return-URL forgery) | Any fulfillment without a verified provider event | Staging | Test report |
| V-08 | Refund bounds hold | Property tests: refund > remaining, currency mismatch, cross-order, replay — all rejected | Any over-refund, wrong-currency, or cross-order refund succeeds | Staging | Test report |
| V-09 | Admin actions require MFA | MFA enforcement tests on UI, API tokens, and service accounts; access control review | Any admin/refund action without MFA | Staging | Test report + review |
| V-10 | Admin CSRF blocked | Automated CSRF tests on all state-changing admin endpoints | Cross-origin state change succeeds | Staging | Test report |
| V-11 | RBAC + two-person rule enforced | Access-matrix tests per role; workflow test for high-value refunds | Role escalation or single-person high-value refund possible | Staging | Test report + role review |
| V-12 | Audit log complete and tamper-evident | Completeness test (every money/admin action logged); tamper test | Missing entries or undetected tampering | Staging | Test report |
| V-13 | Secrets never in code/CI; rotation works | Secret scan (gitleaks class) on repo and CI logs; rotation drill | Any secret found; rotation fails | CI + staging | Scan report, drill log |
| V-14 | No PII/PAN in logs | Negative test triggering errors with card/PII data; log-pipeline assertions | PAN or PII in produced logs | Staging | Test report + log sample |
| V-15 | Rate/velocity limits enforced and alert | Load tests vs limits; alert-firing test | Limits bypassed, or alerts fail to fire | Staging | Load report + alert test |
| V-16 | Ledger write survives failures | Fault injection: kill process between provider event and ledger write; outbox retry test | Lost or duplicated ledger entries | Staging | Fault-injection report |
| V-17 | Reconciliation detects drift | Inject synthetic mismatch into staging/prod test-mode report | Drift not detected or not alerted | Staging + prod | Reconcile test + alert output |
| V-18 | Supply chain holds: no known vulns, scripts pinned | SCA scan evidence; SRI integrity test; build provenance review | Known unfixed vuln; unpinned/unhashed script on checkout page | CI + staging | Scan report, SRI check |
| V-19 | Checkout survives load and provider outage | Load test at ≥5× expected peak (OE-03); chaos test simulating provider endpoint failure | Requests fail corrupt state, or checkout corrupts orders under load/outage | Staging | Load + chaos report |
| V-20 | Restore actually recovers | Restore drill: recover ledger/DB from backup, run reconciliation | Recovery exceeds RTO or reconciliation fails post-restore | Staging | Drill report with timings |
| V-21 | Session lifecycle holds | Tests: rotation on auth, fixation rejected, timeouts enforced, cookie flags asserted | Fixated/stolen session accepted; flags missing | Staging | Test report |
| V-22 | PCI eligibility confirmed | SAQ A vs A-EP determination with provider; retention scan for card data | No documented eligibility decision, or card data retained | Compliance review | Assessment + sign-off |

## 8. Threat ↔ control ↔ verification traceability

| Threat | Controls | Verification |
| --- | --- | --- |
| T-01 | C-01, C-02, C-19 | V-01, V-02, V-18 |
| T-02 | C-03 | V-03 |
| T-03 | C-04, C-22 | V-04 |
| T-04 | C-05, C-06 | V-05, V-06 |
| T-05 | C-06, C-07, C-17 | V-06, V-16 |
| T-06 | C-08, C-06 | V-07 |
| T-07 | C-09, C-13 | V-08, V-12 |
| T-08 | C-10, C-22, C-16 | V-09, V-21, V-15 |
| T-09 | C-11 | V-10 |
| T-10 | C-12, C-13, C-09 | V-11, V-12, V-08 |
| T-11 | C-14, C-13 | V-13, V-12 |
| T-12 | C-15, C-14 | V-14, V-13 |
| T-13 | C-16, C-01 | V-15, V-01 |
| T-14 | C-17, C-18, C-21 | V-16, V-17, V-20 |
| T-15 | C-18, C-13 | V-17, V-12 |
| T-16 | C-22, C-02 | V-21, V-02 |
| T-17 | C-19, C-14 | V-18, V-13 |
| T-18 | C-20, C-21 | V-19, V-20 |
| T-19 | C-02, C-20 | V-02, V-19 |
| T-20 | C-01, C-15, C-19 | V-01, V-14, V-22 |

## 9. Residual risk, decisions, and review triggers

Per the skill integrity rule, this model does not accept its own material residual risk: each decision below names an acceptance authority outside the author of this document.

| ID | Residual risk | Decision | Authority | Owner | Review trigger / expiry | Safe response if assumption fails |
| --- | --- | --- | --- | --- | --- | --- |
| R-01 | Card-testing and fraud losses below a launch threshold are accepted; adaptive fraud is out of scope | Accept losses up to threshold set by fraud domain | Product + fraud domain lead | Product-abuse domain | Quarterly, or when losses exceed threshold | Raise threshold review; escalate to fraud tooling; tighten C-16 |
| R-02 | Single-provider dependence (outage = checkout down) is accepted | Accept; monitor provider status and track exit options | CTO / platform lead | Platform engineering | Provider contract change or material outage | Execute degradation plan; re-evaluate provider redundancy |
| R-03 | Webhook replay window (≈5 min) and reliance on provider retry semantics are accepted | Accept once provider semantics confirmed (OE-01) | Security lead | Checkout engineering | Provider change or observed webhook failures | Reconcile out-of-window events via C-18; verify manually per runbook |
| R-04 | Refund approval thresholds define the boundary between single-approver and two-person approval | Thresholds set by finance ops; two-person above | Finance ops | Finance ops + security | Volume or loss-pattern change | Lower threshold; add anomaly detection on refund velocity |
| R-05 | Admin takeover residual below MFA/audit controls is accepted | Accept; monitor auth anomalies | Security lead | Identity team | New admin surface or auth tooling change | Force MFA re-enrollment; incident runbook |
| R-06 | PCI posture depends on provider-hosted capture choice (SAQ A vs A-EP) | Decide before launch; default to redirect/SAQ A | Compliance owner | Compliance + checkout engineering | Provider or capture-method change | Re-run V-22 assessment before any capture change |

## 10. Open evidence needs

- OE-01 — Provider choice; webhook signing scheme, timestamp tolerance, and at-least-once retry semantics; idempotency-key support; report/payout formats for reconciliation. Owner: checkout engineering. Blocks: V-05, V-06, V-17.
- OE-02 — Existing organizational controls inventory: secrets manager, SIEM/alerting, CI/CD, CDN/WAF. Owner: platform engineering. Blocks: C-14, C-15, C-16, C-20 sizing.
- OE-03 — Expected checkout volume, peak rate, refund volume, and agreed RPO/RTO. Owner: product + finance ops. Blocks: V-15, V-19, V-20.
- OE-04 — Current admin access model and account inventory (needed to scope C-10, C-12 and V-09, V-11). Owner: security engineering.
- OE-05 — Current dependency inventory and existing SCA coverage for the checkout surfaces. Owner: platform engineering. Blocks: V-18.
- OE-06 — Prior incident history for this product class (chargebacks, fraud, webhook incidents) to calibrate likelihood. Owner: security engineering.

## 11. Artifact sensitivity and handling

- This document is a detailed threat model: **internal, security-sensitive**. It contains exploit-relevant design detail (paths, enforcement points, bypass assumptions).
- Repository visibility alone is not approval to share. Any public or customer-facing derivative (e.g., a security overview) is a separate document with redaction and disclosure review; this file must not be published as-is.
- Storage: the repo holding it must be access-restricted to employees with a need to know. Retention: as long as the checkout flow lives, plus the company's standard retention period, and reviewed whenever Section 0's review trigger fires.
- Distribution: no copying into public wikis, screenshots in slide decks, or vendor RFPs without the security lead's redaction review.

## 12. Handoffs (downstream ownership, not duplicated here)

- **H-01 Implementation:** the owning build team implements controls C-01..C-22 and the test cases backing V-01..V-22; this contract is the acceptance spec.
- **H-02 Security testing:** a penetration test before launch targets T-01..T-20 with the objectives in Section 7 (notably T-06 state bypass, T-04 webhook forgery, T-07 refund bounds, T-08 admin takeover, V-04 authz).
- **H-03 Product-abuse/fraud domain:** owns adaptive fraud, card-testing loss thresholds (R-01), refund-abuse appeals, and false-positive economics.
- **H-04 Security assurance operations:** owns what may truthfully be claimed to customers about current controls; do not cite this contract externally without their review.
- **H-05 Incident response:** owns the runbook for webhook failure, ledger drift, refund incidents, and provider outage; this contract supplies the system model and controls they rely on.
- **H-06 Compliance:** owns the PCI DSS 4.0.1 SAQ A vs A-EP assessment (V-22) and card-data retention attestation.
