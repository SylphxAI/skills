# Password Reset — Requirements & Acceptance Criteria

**Version:** 0.1 (draft) · **Owner:** product/auth engineering · **Status:** proposed

## Purpose & boundary

Authenticated-account users must be able to regain access when they forget their
password. Scope: self-service password reset for existing accounts via email
verification, from request through sign-in with the new password. Out of scope:
account registration, admin-forced resets, password change while logged in,
and phone/SMS-based resets.

## Assumptions

- Users have a verified email address on file and access to it.
- The flow is served over TLS only; insecure transport is rejected.
- A password policy exists; reset enforces the same policy as registration.

## Requirements

### REQ-01 — Request a reset
The user can request a password reset with their account email address and
receives a single-use reset link at that address.

**Acceptance criteria**
- Submitting a valid email sends a reset link within 30 s (p95 measured over a
  production-like run).
- The link is usable only once and expires 15 minutes after issuance; both
  conditions are enforced server-side.
- The email identifies the service, does not contain the token in plain text
  in headers/subject, and offers no clickable link other than the reset link.

### REQ-02 — No account enumeration
The request response must not reveal whether an account exists.

**Acceptance criteria**
- A request for an unknown email returns the same message and comparable
  response time as a request for a known email (within 5% p95).
- This holds for both the request step and the token-submission step.

### REQ-03 — Token security
Reset tokens must resist guessing, capture, and reuse.

**Acceptance criteria**
- Tokens are generated with a cryptographically secure source (≥ 128 bits of
  entropy) and stored only as a one-way hash.
- Tokens are invalidated on successful use, on expiry, and on a new reset
  request for the same account.
- Tokens and password values never appear in logs, analytics, or error
  responses.

### REQ-04 — Set a new password
The user can set a new password from the token link and immediately sign in
with it.

**Acceptance criteria**
- The new password must satisfy the password policy and must differ from the
  current password.
- Submitting the token consumes it (a second submission fails) and returns the
  user to a sign-in path in ≤ 3 steps from the original request.
- After a successful reset, the previous password stops working immediately
  and all existing sessions and remember-me tokens for that account are
  invalidated.
- The user can sign in with the new password immediately after reset, verified
  by an end-to-end test.

### REQ-05 — Failure and abuse handling
Invalid, expired, or attacked tokens fail safely without leaking account state.

**Acceptance criteria**
- Expired or already-used tokens show a clear, actionable error with a link to
  request a new reset — the same message regardless of account existence.
- Token-submission attempts are limited (e.g., token is invalidated after 5
  failed attempts); reset requests are rate-limited per account and per
  IP/proxy identity to prevent token brute-force and email flooding.
- Failed, expired, and abused attempts are counted and surfaced to operations
  without exposing user identity in the response.

### REQ-06 — Speed and usability
"Quickly" is bounded: a typical user completes the flow within 2 minutes of
receiving the link, on any supported device.

**Acceptance criteria**
- The flow is completable in ≤ 3 steps (request → set password → sign in) and
  all steps render correctly on current desktop and mobile browsers.
- All screens are keyboard-navigable, meet WCAG 2.1 AA contrast, and announce
  errors via accessible labels.
- A successful reset sends a confirmation email within 30 s (p95) so the user
  knows the change took effect.

### REQ-07 — Auditability
Reset activity is observable without exposing secrets.

**Acceptance criteria**
- Audit events exist for request, success, failure (with reason), and expiry,
  including timestamp and a non-secret correlation ID, retrievable by
  operations within 5 minutes.
- Audit records contain no plaintext tokens, passwords, or full reset links.

## Verification summary

| Requirement | Primary verification |
| --- | --- |
| REQ-01 | Timing harness + mail capture e2e |
| REQ-02 | Differential timing/response test for known vs unknown email |
| REQ-03 | Token-generation/expiry/single-use security tests + log scan |
| REQ-04 | E2E reset-and-sign-in test + session-invalidation test |
| REQ-05 | Brute-force/expiry/replay tests + rate-limit check |
| REQ-06 | Cross-browser and a11y checks; measured step count and timings |
| REQ-07 | Audit query test + log-content scan |
