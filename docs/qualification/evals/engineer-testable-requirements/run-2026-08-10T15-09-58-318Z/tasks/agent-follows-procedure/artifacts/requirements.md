# Requirements Contract — Password Reset (Secure and Quick)

## 1. Artifact identity and version

| Field | Value |
|---|---|
| Artifact ID | `REQ-CONTRACT-2026-08-001` |
| Title | Password reset: secure and quick re-establishment of account access |
| Version | `0.1-draft` |
| Status | Draft for baseline; numeric parameters pending authority (see §12, §14) |
| Date | 2026-08-10 |
| Change authority | Product owner (need scope, performance envelope); Security authority (security parameters and control objectives); joint approval to baseline |
| Audience | Internal only: product, engineering, security, QA, operations, support |
| Sensitivity | Internal-confidential — contains misuse analysis, control objectives, and security parameter references; not for external distribution |
| Authorized access | Named roles: product owner, engineering leads, security leads, QA lead, operations lead; read access for others by request and need-to-know |
| Retention | Per corporate records policy; superseded versions retained for audit and impact analysis |

## 2. Subject, system boundary, and lifecycle stage

- **Subject:** the password-reset capability of the authentication domain of the product, hereafter "the System".
- **Boundary in:** an unauthenticated user initiates a reset from the sign-in surface.
- **Boundary out:** registration, sign-in, signed-in password change, username/identifier recovery, multi-factor enrollment and recovery, passwordless authentication, and identity-verification infrastructure are outside this contract (see §9).
- **Lifecycle stage:** requirements definition, pre-design. No implementation, test, or delivery evidence exists under this contract; downstream facts are owned by their respective owners (§14, §15).

## 3. Stakeholders and affected parties

| Party | Interest in this contract |
|---|---|
| End user (account holder) | Regains access to own account quickly, without support, when they hold the verification factor; is not a victim of reset-based account takeover |
| Support agent | Handles the residual path (users who cannot complete self-service reset); needs a verifiable, attributable fallback |
| Security / trust & safety | Reset must not become an account-takeover or enumeration vector; abuse must be observable and limitable |
| Product owner | Need acceptance, scope decisions, performance envelope baseline |
| Engineering | Implements the accepted requirements; owns design decisions |
| QA | Designs and executes verification per the verification methods in §12 |
| Operations | Runs the flow, monitors availability and abuse, retains audit data |
| Compliance / legal | Data minimization, breach-of-record handling for reset events (indirect) |
| Email provider | External dependency for outbound delivery; not a stakeholder with decision rights |

## 4. Contexts and operating environments

- **Contexts:** web client, mobile client, and any other surface where sign-in is offered; unauthenticated access; variable network latency; email transit delay; account states including active, suspended, and account without verified contact.
- **External dependency:** outbound notification/verification delivery via email (channel selection is an open decision, §14).
- **Failure envelope:** email delivery outage, transient client or API errors, high request volume (including abuse) — each has defined behavior (§11, §13).

## 5. Intended outcomes

- **O-1** A user who forgot their password regains access to their account without contacting support when they possess the verification factor.
- **O-2** An attacker cannot use the reset flow to take over, lock out, or enumerate an account; security floors are not traded for speed.
- **O-3** A successful reset completes within a measurable, baselined time envelope on the real flow.
- **O-4** Every reset attempt, completion, and failure is observable and auditable without recording secrets.
- **O-5** The reset flow does not increase support volume or require new support tooling beyond the agreed residual path.

## 6. Definitions

| Term | Meaning in this contract |
|---|---|
| Password reset | Re-establishing the password credential of an existing account from an unauthenticated state, after identity verification |
| Verification factor | Evidence the user must present to prove control of the account's registered contact/identity channel (defined by the security authority; channel choice open, §14) |
| Reset token | Single-use, user- and request-bound evidence issued only after factor verification succeeds |
| Completion | The moment the System accepts the new password; post-completion effects (invalidation, sessions) are part of completion |
| Identifier | The account's registered contact (assumed email, A-1) |
| Password policy | The rules governing acceptable new passwords, owned by the security authority (parameter `P-POL`) |
| Session | An authenticated client context created with the pre-reset credential |

## 7. Assumptions

| ID | Assumption | Evidence state |
|---|---|---|
| A-1 | The registered identifier is an email address and is the verification channel | Assumption — unverified; must be confirmed before baseline |
| A-2 | The System already authenticates users with stable, unique account identities | Assumption — unverified; no source in workspace |
| A-3 | Outbound email delivery is available and reliable enough for the flow | Assumption — unverified; envelope in §13 |
| A-4 | The user holds access to the registered contact during the flow | Assumption — unverified |
| A-5 | No legacy reset flow exists unless migration evidence says otherwise (REQ-MIG-01 is conditional on this) | Unknown — authority gap, §14 |

## 8. Constraints and external authorities

| ID | Constraint / authority | Binding? |
|---|---|---|
| C-1 | Security authority's policy governs all security parameters (`P-TTL`, `P-RATE`, `P-POL`) and control objectives | Binding |
| C-2 | Applicable data-protection law (e.g., GDPR, PDPL where the product operates) — data minimization for reset records | Binding where jurisdiction applies |
| C-3 | NIST SP 800-63B as reference guidance for password and recovery controls | Reference, not adopted verbatim unless security authority adopts it |
| C-4 | Method authority: ISO/IEC/IEEE 29148:2018 per the skill's method reference; this skill's integrity rules | Binding for this artifact |
| C-5 | No plaintext password storage or transmission; no secret in logs | Binding |
| C-6 | No invented numeric parameters without authority and rationale | Binding |

## 9. Non-goals

- Account registration and email verification of new accounts.
- Sign-in redesign, session-management redesign, or MFA enrollment/recovery.
- Username/identifier recovery ("I forgot which email I used").
- Password change while signed in (distinct flow, distinct subject).
- Passwordless or SSO authentication; biometric recovery.
- Password-manager integration or remembered-password flows.
- Building new identity-verification infrastructure (e.g., identity documents, KYC).
- Public/customer-facing documentation of this contract (separate projection, §11).

## 10. Stakeholder and user need register

| ID | Need | Source | Rationale | Evidence state | Owner | Conflicts | Disposition |
|---|---|---|---|---|---|---|---|
| N-01 | Users who forgot their password can re-establish access without support | Inferred from explicit user statement; standard authentication-domain outcome | O-1; support-cost reduction | Not evidenced — no user research, incident, or contract data in workspace | Product owner | None | Accepted as core need |
| N-02 | Reset must not weaken account security ("securely") | Inferred from explicit user statement | O-2; security floor is non-tradeable (C-1, constitution) | Not evidenced — restated as control objectives, §12 | Security authority | Conflicts with N-04 friction | Accepted; security non-tradeable |
| N-03 | Reset must be quick ("quickly") | Requested preference from explicit user statement | O-3; abandonment and support burden | Not evidenced — requires measurable envelope baseline | Product owner | Conflicts with N-02 at the margin | Accepted as measurable envelope, candidate pending baseline |
| N-04 | Minimal user friction (few steps, clear guidance) | Inferred preference | Abandonment reduction | Not evidenced | Product owner | With N-02 where controls add steps | Accepted within security floors |
| N-05 | Reset attempts and completions are observable and auditable | Inferred operational/security need | O-4; incident response | Not evidenced | Security / ops | None | Accepted |
| N-06 | Residual path for users who cannot self-reset | Inferred stakeholder need (support) | Users without factor access must still have a verifiable path | Not evidenced | Product owner / support | With N-02 (must not bypass verification) | Candidate — conditional on decision CD-04 |

Rejected/deferred needs are recorded in §14 (rejected alternatives) rather than silently deleted.

## 11. Scenario and state model

### 11.1 State model (account credential state)

```text
S0 ACTIVE ──T1 request──> S1 REQUESTED ──T2 factor verified──> S2 TOKEN_ISSUED
S2 ──T3 token valid──> S3 VERIFIED ──T4 new password accepted──> S4 COMPLETED
S1/S2 ──T5 fail/expire/cancel/abuse-limit──> S0 (or terminal FAILED, retryable)
S4 ──post-completion──> S0 with new credential; old credential and tokens dead
```

- **S0 ACTIVE:** current password authenticates.
- **S1 REQUESTED:** reset requested; factor submitted; no token yet. Account remains usable with the current password unless the security authority mandates otherwise (open decision).
- **S2 TOKEN_ISSUED:** factor verification succeeded; single-use token issued; user may still authenticate with the current password (same open decision).
- **S3 VERIFIED:** token validated (unused, unexpired, unrevoked, bound to user and request); user may submit a new password.
- **S4 COMPLETED:** new password accepted and active; old password no longer authenticates; outstanding tokens for the user invalidated; session policy applied (§12 REQ-SEC-06).
- **FAILED:** request expired, consumed, canceled, or rate-limited; no state change to the credential; user may re-initiate per abuse limits.

### 11.2 Flows

| Flow | Path | Covered in |
|---|---|---|
| Normal | S0 → S1 → S2 → S3 → S4 → sign-in with new password | REQ-FUN-01..04, REQ-SEC-01..07 |
| Alternate | User remembers password mid-flow; cancel and return to sign-in; re-request after expiry | REQ-FUN-01, REQ-SEC-01, REQ-SEC-02 |
| Failure | Unknown/undeliverable identifier; invalid factor; expired/consumed/revoked token; weak new password; transient errors | REQ-SEC-02, REQ-FUN-03, QA-FAIL |
| Recovery | Retry within abuse limits; re-request after expiry; support-assisted path (if CD-04 accepts) | REQ-SEC-04, REQ-SUP-01, QA-FAIL |
| Misuse | Identifier enumeration; token guessing/brute force; replay; reset-request flood; attacker-completed reset; support impersonation | REQ-SEC-01, REQ-SEC-03, REQ-SEC-04, REQ-OBS-01, §14 risks |
| Migration | Only if a legacy reset flow exists: in-flight legacy tokens invalidated at cutover; legacy flow retired | REQ-MIG-01, REQ-RET-01 |
| Retirement | Decommission of this flow when superseded: notice window, in-flight requests drained or failed with clear message | REQ-RET-01 |

## 12. Requirement register

Requirements are stable, uniquely identified, and versioned with this contract. `shall` is used only for accepted obligations; REQ-PERF-01 is a candidate whose numeric envelope becomes binding on baseline. Parameter values are owned by the security/product authorities and recorded in protected parameter evidence (not in this artifact).

### REQ-FUN-01 — Reset initiation
- **Type / scope:** functional; unauthenticated lifecycle.
- **Normative statement:** From the sign-in surface, an unauthenticated user shall be able to initiate a password reset for their account without prior authentication.
- **Rationale / unacceptable alternative:** N-01; a reset hidden behind authentication is useless. Alternative of support-only reset rejected (§14).
- **Conditions / envelope:** Initiation is available whenever sign-in is available; subject to abuse limits (REQ-SEC-04). No account-existence disclosure at this step (REQ-SEC-03).
- **Success boundary / verification:** The initiation path is reachable from the sign-in surface by an unauthenticated user in every supported client context. Verify by automated UI test on all supported surfaces.
- **Owner / handoff:** Product owner → engineering design; QA verifies.

### REQ-FUN-02 — Factor verification before token issuance
- **Normative statement:** The System shall verify the user's control of the verification factor defined by the security authority before issuing a reset token; incorrect or absent factor evidence shall not produce a token.
- **Rationale:** N-02; token issuance is the security gate of the flow.
- **Conditions:** Factor definition is the security authority's decision (channel open, §14); verification applies regardless of account state except where policy defines suspension behavior.
- **Success boundary / verification:** With correct factor evidence, a token is issued; with incorrect evidence, no token is issued. Verify by security test for correct, incorrect, and absent evidence.
- **Owner / handoff:** Security authority (factor definition) → engineering; QA + security review verify.

### REQ-FUN-03 — New password selection
- **Normative statement:** A user whose token is valid (state S3) shall be able to submit a new password, and the System shall accept it only if it conforms to the password policy `P-POL`.
- **Rationale:** N-01, N-02; completion requires a usable credential that meets policy.
- **Conditions:** `P-POL` owned by security authority; applies to reset-created passwords identically to other credential-creation paths.
- **Success boundary / verification:** Conforming password completes; each non-conformance class in `P-POL` is rejected with an actionable message. Verify by automated policy-class test matrix.
- **Owner / handoff:** Security authority (`P-POL`) → engineering; QA verifies.

### REQ-FUN-04 — Completion confirmation
- **Normative statement:** Upon accepting the new password, the System shall present a clear completion outcome to the user and direct them to sign in with the new credential.
- **Rationale:** N-03, N-04; users must know the flow ended and what to do next.
- **Conditions:** Applies to successful completion; failure paths have their own messages (QA-FAIL).
- **Success boundary / verification:** Completion message and sign-in direction are present after acceptance. Verify by automated UI test and usability walkthrough.
- **Owner / handoff:** Product owner → engineering; QA verifies.

### REQ-SEC-01 — Token single-use and binding
- **Normative statement:** The reset token shall be usable at most once and shall be bound to exactly one user and one reset request; a consumed, revoked, or foreign token shall not complete a reset.
- **Rationale:** N-02; replay of a captured token is the primary takeover vector.
- **Conditions:** Applies for the token's whole lifetime; re-issuance is a new request.
- **Success boundary / verification:** Reuse, cross-user use, and cross-request use all fail; first use succeeds. Verify by security test for replay, cross-user, and cross-request cases.
- **Owner / handoff:** Security authority → engineering; security review verifies.

### REQ-SEC-02 — Token lifetime
- **Normative statement:** A reset token shall expire after the lifetime set by the security authority (`P-TTL`), and an expired token shall not complete a reset.
- **Rationale:** N-02; bounded exposure window for captured tokens. Value is authority-owned, not invented here (C-6).
- **Conditions:** `P-TTL` is recorded in protected parameter evidence; expiry behavior is identical in all consuming paths.
- **Success boundary / verification:** Token use before `P-TTL` succeeds and after `P-TTL` fails, measured at the boundary. Verify by time-boundary security test.
- **Owner / handoff:** Security authority → engineering; QA verifies.

### REQ-SEC-03 — No account-existence disclosure
- **Normative statement:** The System's responses (content, timing, and any outbound behavior) to a reset initiation shall be indistinguishable between an unknown identifier and a known identifier for an unauthenticated observer, except as explicitly allowed by the security authority.
- **Rationale:** N-02; enumeration feeds targeted attacks. Trade-off accepted: genuine users may not know whether the request succeeded (CD-02).
- **Conditions:** Applies to initiation and to any identifier validation in the flow; support path behavior is governed by REQ-SUP-01 if accepted.
- **Success boundary / verification:** Differential testing of response content and timing over a sample of known/unknown identifiers shows no distinguishing signal above the authority's threshold. Verify by security test with statistical comparison.
- **Owner / handoff:** Security authority → engineering; security review verifies.

### REQ-SEC-04 — Abuse limits
- **Normative statement:** The System shall limit reset initiations and token validation attempts per identifier, per account, and per source at the rates set by the security authority (`P-RATE`), and shall refuse further attempts without issuing tokens once a limit is reached.
- **Rationale:** N-02; limits brute force, enumeration, and flood abuse without breaking the flow for genuine users.
- **Conditions:** `P-RATE` authority-owned; limit refusal must not lock out the legitimate user permanently (recovery path, §11.2).
- **Success boundary / verification:** Attempt series exceeding `P-RATE` yields refusals with no token issuance; refusals are observable (REQ-OBS-01) and lift per policy. Verify by automated attempt-series test.
- **Owner / handoff:** Security authority → engineering; QA + security review verify.

### REQ-SEC-05 — Old credential invalidation
- **Normative statement:** On completion, the previous password shall no longer authenticate, and all outstanding reset tokens for that user shall be invalidated.
- **Rationale:** N-02; a changed password that still works is a takeover backdoor.
- **Conditions:** Applies immediately on acceptance of the new password; applies regardless of which path completed the reset.
- **Success boundary / verification:** After completion, the old password fails and previously issued tokens fail. Verify by post-completion security test.
- **Owner / handoff:** Security authority → engineering; QA verifies.

### REQ-SEC-06 — Session handling after reset
- **Normative statement:** After completion, each session authenticated with the pre-reset credential shall be terminated or shall require re-authentication, per the decision in CD-03.
- **Rationale:** N-02; a takeover attacker holding a live session must not persist after the victim resets.
- **Conditions:** Behavior selected in CD-03 is binding once decided; both options are observable.
- **Success boundary / verification:** Post-completion, pre-reset sessions are either terminated or forced to re-authenticate, verifiable in each session type the System supports.
- **Owner / handoff:** Product owner + security authority (decision) → engineering; QA verifies.

### REQ-SEC-07 — Secret handling
- **Normative statement:** The System shall not store or transmit passwords in plaintext; passwords shall be stored only as one-way, salted, iterated digests per the security authority's policy, and no reset token, new password, or verification factor shall appear in logs, metrics, or outbound messages other than the allowlisted fields in IF-03.
- **Rationale:** N-02, N-05, C-5; secret leakage in storage or observability is a critical control failure.
- **Conditions:** Applies to all storage, transport, and observability paths in the flow.
- **Success boundary / verification:** Static and dynamic inspection shows no plaintext password anywhere, and no secret in log/metric samples. Verify by code/configuration review and log-sample inspection.
- **Owner / handoff:** Security authority → engineering; security review verifies.

### REQ-OBS-01 — Observability and audit
- **Normative statement:** The System shall record, for each reset initiation, token issuance, successful completion, failure, and abuse-limit refusal, an auditable event with identifier (as permitted), timestamp, outcome, and source, excluding secrets, with retention per the security authority's audit policy.
- **Rationale:** N-05, O-4; incident response and misuse detection require the event stream.
- **Conditions:** Event content is allowlisted per IF-04; retention is authority-owned.
- **Success boundary / verification:** Each event class is produced with required fields and no secrets across normal, failure, and misuse runs. Verify by instrumentation test and audit-log inspection.
- **Owner / handoff:** Security + ops → engineering; ops verifies.

### REQ-PERF-01 — Completion within a time envelope *(candidate)*
- **Type:** quality attribute (performance).
- **Normative statement:** A successful reset shall complete within the performance envelope `P-PERF`, measured on the real flow across supported clients and network conditions, where `P-PERF` is defined as the p95 end-to-end time from completion of the final password submission to the completion confirmation, excluding outbound email transit time.
- **Rationale:** N-03; "quickly" is otherwise unverifiable. Proposed envelope: p95 ≤ 60 s excluding email transit, with rationale that abandonment rises sharply beyond ~1–2 minutes for recovery flows; this proposal is subject to baseline by the product owner after measurement (C-6).
- **Conditions:** Measurement on the real flow (not a synthetic health check); `P-PERF` becomes binding on baseline; email transit has its own envelope in QA-PERF.
- **Success boundary / verification:** Instrumented measurement of the real flow over a defined sample (e.g., ≥ 200 completed resets) shows p95 within `P-PERF`. Verify by performance measurement of the production-shaped flow.
- **Owner / handoff:** Product owner (baseline) → engineering; QA measures.

### REQ-SUP-01 — Support-assisted reset *(conditional)*
- **Normative statement:** If the support-assisted path is accepted (CD-04), a support agent shall be able to complete a reset only after identity verification per the security authority's policy, and every such action shall be attributable to the agent and audited per REQ-OBS-01.
- **Rationale:** N-06; residual path must not bypass the security floor.
- **Conditions:** Binding only if CD-04 accepts the path; otherwise this requirement is dormant.
- **Success boundary / verification:** Unverified support resets are impossible; completed support resets carry agent attribution and audit events. Verify by access-control test and audit inspection.
- **Owner / handoff:** Product owner + security authority → engineering; security review verifies.

### REQ-MIG-01 — Migration of legacy reset state *(conditional)*
- **Normative statement:** If a legacy reset flow or outstanding legacy tokens exist at cutover, the System shall invalidate all in-flight legacy tokens and provide a defined transition (continue in the new flow or fail with a clear message) for in-flight requests, per the cutover plan.
- **Rationale:** A-5 is unknown; silent token breakage without notice is a support and security hazard.
- **Conditions:** Binding only if legacy evidence is found; cutover plan owned by engineering with product approval.
- **Success boundary / verification:** Post-cutover, no legacy token completes a reset and no in-flight request hangs. Verify by migration rehearsal and post-cutover sample checks.
- **Owner / handoff:** Engineering (cutover plan) → QA verifies.

### REQ-RET-01 — Retirement
- **Normative statement:** When this reset capability is superseded or retired, the System shall provide a notice window and a defined end-state for in-flight requests (drained or failed with a clear message), and shall not silently remove the capability from users mid-flow.
- **Rationale:** Lifecycle obligations in the method; silent capability removal breaks users.
- **Conditions:** Applies at decommission; trigger is a product decision.
- **Success boundary / verification:** Retirement plan executed; no in-flight request left in an unknown state. Verify by retirement rehearsal.
- **Owner / handoff:** Product owner → engineering; ops verifies.

## 13. Interface and quality-attribute contracts

### 13.1 Interface contract

| IF | Interface | Allowed fields / behavior | Failure envelope |
|---|---|---|---|
| IF-01 | Reset request (unauthenticated) | Identifier only; initiation outcome per REQ-SEC-03 | Abuse-limit refusal per REQ-SEC-04; transient errors retryable |
| IF-02 | Token use + new password | Token, new password; outcome per REQ-SEC-01/02, REQ-FUN-03 | Expired/consumed/revoked/weak-password outcomes with actionable messages |
| IF-03 | Outbound message | Allowlist only: one-time reset link/token per interface contract, identifier, sender identity, expiry statement. Never: new password, plaintext factor evidence | Delivery failure is retried per ops policy and surfaced as a failure outcome, not a false success |
| IF-04 | Observability events | Event classes per REQ-OBS-01 with allowlisted fields; no secrets | Loss of event stream is a monitoring alert, not a silent gap |

### 13.2 Quality-attribute envelopes

| QA | Scenario (source / stimulus / environment / response / measure) | Envelope |
|---|---|---|
| QA-PERF | User / completes final password step / supported client on a typical network / completion confirmation / p95 end-to-end time | ≤ `P-PERF` (candidate 60 s; baseline pending, REQ-PERF-01). Email transit envelope: p95 delivery per carrier under ops agreement, owned by ops |
| QA-SEC | Attacker / enumeration, replay, brute force, flood / unauthenticated / no token, no disclosure, refusals observable / differential and attempt-series signals | Parameters `P-TTL`, `P-RATE`, `P-POL` per security authority (protected evidence) |
| QA-UX | User / complete reset with no prior knowledge / typical client / successful completion or clear failure / task success and message-actionability | Success without support (REQ-FUN-01..04); failure messages actionable without disclosing account existence (REQ-SEC-03). Measured by usability walkthrough, not invented metrics |
| QA-ACC | User with keyboard-only and screen-reader use / complete reset / all supported clients / completion / WCAG conformance level adopted by the product | Reset flow meets the product's adopted accessibility standard, same floor as sign-in; verified by a11y audit including screen-reader pass |
| QA-AVAIL | Users incl. abuse traffic / high request volume / production / correct outcomes within limits / error rate and availability | Reset availability floor equals the sign-in availability floor (platform SLO, authority-owned); abuse traffic absorbed by REQ-SEC-04 without degrading genuine users |
| QA-FAIL | User / transient error, undeliverable email, expired token / any context / clear retryable or terminal outcome / message accuracy and no state corruption | No false success; retryable vs terminal outcomes distinct; no credential-state corruption (state model §11.1) |

## 14. Conflict decisions, rejected alternatives, unresolved authority, risks, and handoffs

### 14.1 Conflict decisions

| CD | Conflict | Decision | Rationale |
|---|---|---|---|
| CD-01 | Speed (N-03) vs security (N-02) | Security floors are non-tradeable; speed is a measured envelope that may not be met by bypassing verification (REQ-SEC-01..05, REQ-PERF-01) | Constitution: correctness and security are non-tradeable floors; speed is bounded and measurable |
| CD-02 | No-account-disclosure (REQ-SEC-03) vs user clarity | No disclosure at initiation; genuine users receive the standard outcome message; support path (if accepted) is the mitigation | Enumeration risk outweighs the marginal UX cost; recorded, not silently deleted |
| CD-03 | Session termination vs re-authentication after reset (REQ-SEC-06) | Unresolved — product + security authority decide; both options satisfy REQ-SEC-06 | Depends on session architecture not yet designed under this contract |
| CD-04 | Self-service only vs support-assisted path | Unresolved — product owner + support decide; REQ-SUP-01 is conditional | Requires support-tooling and identity-verification policy not yet evidenced |
| CD-05 | Verification channel (email vs additional factors) | Unresolved — security authority decides; A-1 assumes email pending confirmation | Channel choice is a security-authority decision, not a requirements invention |

### 14.2 Rejected alternatives

| Alternative | Reason rejected |
|---|---|
| Email the new password directly | Transmits a usable credential in plaintext (violates C-5, N-02) |
| Security questions as verification | Weak, often-public secrets; fails N-02 |
| Support-only reset | Fails N-01, N-03, O-5 (friction, support burden) |
| SMS-only verification | SIM-swap takeover risk; cost and delivery variance; rejected pending authority decision on channels |
| Immediate account lockout on reset request | Denies legitimate users with remembered passwords; rejected unless security authority mandates |

### 14.3 Unresolved authority and risks

| Item | Type | Owner | Current state |
|---|---|---|---|
| `P-TTL`, `P-RATE`, `P-POL`, channel choice | Security parameters | Security authority | Not baselined; recorded in protected parameter evidence |
| `P-PERF` and measurement sample | Performance envelope | Product owner | Candidate proposal (60 s, rationale stated) pending baseline |
| Legacy flow existence (A-5) | Fact | Engineering (discovery) | Unknown — REQ-MIG-01 conditional |
| No user-research evidence for N-01..N-06 | Evidence | Product owner | Gap; needs confirmation before final baseline |
| Session architecture | Design input | Engineering | Needed for CD-03 |
| Support tooling and identity policy | Design input | Support + security | Needed for CD-04 |

**Risks:** reset-based account takeover (mitigated by REQ-SEC-01/02/04/05/06, notification per IF-03); identifier enumeration (REQ-SEC-03); email compromise enabling token capture (REQ-SEC-01/02, REQ-SEC-06, audit); support impersonation (REQ-SUP-01 if accepted); abuse floods degrading availability (REQ-SEC-04, QA-AVAIL).

### 14.4 Downstream handoffs

| Handoff | Owner | Deliverable |
|---|---|---|
| Design | Engineering design lead | Design decisions resolving CD-03/04/05, interface realization of IF-01..04 |
| Implementation evidence | Engineering | Implementation state at the repository delivery boundary |
| Verification | QA lead | Acceptance tests per verification methods in §12; a11y audit (QA-ACC) |
| Security review | Security lead | Review of REQ-SEC-01..07 and parameter evidence |
| Operations | Ops lead | Monitoring per REQ-OBS-01, QA-AVAIL, delivery-readiness |
| Delivery evidence | Delivery owner | Live observation of the flow at the release boundary |

This artifact does not own those downstream facts; it records the links (§15).

## 15. Bidirectional traceability

| Need | Requirements | Downstream (design / test / delivery-evidence owner) |
|---|---|---|
| N-01 | REQ-FUN-01, REQ-FUN-03, REQ-FUN-04, REQ-PERF-01 | Engineering design / QA / Delivery |
| N-02 | REQ-FUN-02, REQ-SEC-01..07 | Engineering design / Security review |
| N-03 | REQ-PERF-01, QA-PERF | Product owner baseline / QA measurement |
| N-04 | REQ-FUN-01, REQ-FUN-04, QA-UX | Engineering design / QA usability walkthrough |
| N-05 | REQ-OBS-01, IF-04 | Ops / QA instrumentation test |
| N-06 | REQ-SUP-01 (conditional) | Support + security / QA |
| Authority C-1..C-6 | REQ-SEC-01..07, REQ-PERF-01, QA-SEC | Security review / QA |
| Migration A-5 | REQ-MIG-01, REQ-RET-01 | Engineering / QA rehearsal |

Reverse direction: every requirement above lists its source need/authority in its record; every accepted need maps to at least one requirement. No requirement exists without a source; no accepted need is orphaned.

## 16. Validation record

- **Walkthroughs performed (this version):** normal flow (§11.2), alternate (cancel, re-request, remembered password), failure (unknown identifier, invalid factor, expired/consumed token, weak password, transient error), recovery (retry, re-request, support path conditional), misuse (enumeration, replay, brute force, flood, attacker-completed reset), migration and retirement (conditional).
- **Counterexamples used:** "secure" is not an observation — decomposed into REQ-SEC-01..07 with concrete failure signals; "quick" is not an observation — decomposed into REQ-PERF-01 with a measurable p95 envelope; "reset email contains the new password" violates REQ-SEC-07 and is excluded via IF-03.
- **Acceptance-test design sketch:** AT-01 initiation reachability (REQ-FUN-01); AT-02 factor matrix (REQ-FUN-02); AT-03 token replay/cross-user/cross-request (REQ-SEC-01); AT-04 time-boundary expiry (REQ-SEC-02); AT-05 enumeration differential (REQ-SEC-03); AT-06 attempt-series limits (REQ-SEC-04); AT-07 post-completion old-credential and token invalidation (REQ-SEC-05); AT-08 session post-change behavior (REQ-SEC-06); AT-09 secret-leakage inspection (REQ-SEC-07); AT-10 audit-event completeness (REQ-OBS-01); AT-11 real-flow p95 measurement (REQ-PERF-01); AT-12 a11y audit (QA-ACC); AT-13 migration rehearsal (REQ-MIG-01).
- **Validation limits (honest):** requirements do not validate themselves — no user research, no system, no parameter baseline, and no security review exist yet; these are recorded open items (§14.3), and this contract must not be treated as validated behavior until the downstream evidence exists.
- **Integrity self-check:** no implementation choices stated as requirements except where an authority or accepted decision fixes them; no invented numeric parameters without rationale and authority; adjectives decomposed into observable envelopes; stakeholder preferences kept non-binding until resolved.

## 17. Baseline, change authority, impact analysis, and supersession

- **Baseline:** version `0.1-draft` is not yet baselined. Baseline requires: (a) product owner acceptance of need register and non-goals; (b) security authority parameter evidence for `P-TTL`, `P-RATE`, `P-POL`; (c) product owner baseline of `P-PERF`; (d) resolution or explicit deferral of CD-03/04/05; (e) confirmation of A-1 and A-5.
- **Change authority:** changes to need scope → product owner; changes to security requirements or parameters → security authority; technical edits → engineering with QA impact note; baseline approval joint. Any proposed change requires impact analysis over needs, requirements, interfaces, tests, risks, migration, operations, and downstream commitments before superseding the baseline.
- **Impact analysis template:** changed IDs → affected needs and requirements → affected interfaces (IF-01..04) → affected verification (AT list) → affected risks and parameters → migration/ops impact → superseded version record.
- **Supersession history:** none (first version). Superseded versions are retained per §1 retention.

---
*End of Requirements Contract `REQ-CONTRACT-2026-08-001` v0.1-draft.*
