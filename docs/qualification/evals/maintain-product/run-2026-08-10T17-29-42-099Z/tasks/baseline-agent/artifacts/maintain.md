# Maintain: Checkout fails with HTTP 500 for some users

Runbook for cutting live harm from the intermittent checkout 500. Follow the
steps in order and stop when the root-cause hypothesis is actionable. Do not
skip to a patch; the goal is a root-cause fix on the owning layer, with a
regression lock and measurable harm reduction.

## 1. Frame

- **Symptom:** `POST`/`PUT` checkout or confirm endpoint returns 500 for a
  subset of users; the rest succeed.
- **Severity:** production, revenue path. Treat as P1/P2 until the subset is
  understood.
- **Health signals that must improve:** checkout success rate returns to
  baseline, 5xx rate on the checkout path drops to ~0 for the affected subset,
  no new 4xx/duplicate-order regressions on the touched path.
- **Non-goals:** checkout UI redesign, unrelated refactors, feature expansion.

## 2. Diagnosis

### 2.1 Pin the symptom to a layer

For one known-affected user, walk the request end to end and record what each
layer observed:

1. Client: HTTP status, response body, request payload, `X-Request-Id` /
   trace ID.
2. API: exception stack and the exact handler that returned 500 (controller,
   service, or gateway timeout).
3. Payment provider: the outbound call result — declined, ambiguous, timeout,
   or never sent.
4. Data layer: DB constraints, locks, and rows touched for that order/session.

A 500 is the symptom, not the cause. The same status can come from an
unmapped provider error, a race on an idempotency key, a stale cart, a
deployment, or a config subset.

### 2.2 Characterize the affected subset

Answer at least these questions with data before forming hypotheses:

- **Which users?** New vs returning, specific country/currency, specific
  payment method, specific SKU/merchant, logged-in vs guest.
- **When did it start?** Overlay error-rate onset on deploys, config/feature-flag
  changes, and upstream provider incidents.
- **Is it deterministic or random?** Same user + same cart + same method —
  stable failure means state/data; intermittent means race, timeout, or
  upstream.
- **Which release/flag?** Check the deployed SHA and effective flag values for
  the affected users, not just the latest CI green.

### 2.3 Reproduce with evidence

- Replay the failing request from logs against staging with the same payload,
  user state, and provider mode if possible.
- If it is not reproducible locally, add the minimal instrumentation needed to
  see the failure (exception context, idempotency-key state, provider response
  body/status) and ship it as a guarded, low-noise change — instrumentation
  is in scope only because diagnosis is blocked.
- Do not classify "some users" as random until the subset is truly random;
  most subset bugs are flag-, state-, or provider-determined.

### 2.4 Common root causes to check

1. **Unmapped upstream errors:** payment provider returns a decline/3DS
   challenge/timeout and the code maps it to 500 instead of 402/4xx. Check
   which provider responses are handled and which fall into the catch-all.
2. **Idempotency/race:** two confirm attempts (double submit, retry, webhook
   vs API) collide on an order; unique-constraint violation surfaces as 500.
3. **Stale/mutated state:** cart total, price, currency, or stock changed
   between create and confirm; validation throws mid-transaction.
4. **Config/flag subset:** a feature flag, merchant config, or pricing config
   that only some users hit is missing or malformed.
5. **Deployment subset:** a partial rollout or canary serving a broken
   revision to part of the traffic.
6. **Dependency health:** DB connection pool exhaustion, cache misses, or
   provider latency spikes that only trip under load.

### 2.5 Admit the fix scope

- **In:** the fix for the identified cause, a regression test or smoke, and
  fail-closed behavior for the failure mode.
- **Out:** "improve error handling everywhere", unrelated cleanups, and
  retry-forever or silent-retry shims that hide the failure.

## 3. Fix

1. **Fix the cause on the owning layer.** If the provider decline is unmapped,
   map it to the correct 4xx with a user-actionable message and stop it
   reaching the 500 handler. If the cause is an idempotency race, serialize
   or lock on the order and return the existing result instead of throwing.
   If the cause is flag/config, correct the config and add a schema/validation
   gate so a bad value fails fast at load time rather than at checkout.
2. **Fail closed for ambiguous payment outcomes.** If the outcome is unknown
   (timeout, dropped webhook), do not silently mark the order paid or unpaid:
   record `pending`, reconcile against the provider, and expose the state to
   the user. Never fabricate success.
3. **Add the regression lock.** A test that reproduces the original failure
   (same input, same state) and asserts the new behavior, plus a smoke on the
   checkout path. If the failure was config- or provider-shaped, the lock is a
   config-validation test or a provider-mock test for that response class.
4. **Small blast radius.** One revert-safe change set per root cause. Land as
   an atomic, revert-safe unit; keep source, CI, and deploy steps separate so
   the fix can be traced through each.

## 4. Verify

1. **Re-run the failing oracle:** execute the exact reproduction that failed
   before and show it now succeeds or returns the correct non-500 result.
2. **Check the touched path for regressions:** run the checkout test suite
   plus the smoke covering happy path, decline, 3DS, retry/double-submit, and
   webhook reconciliation.
3. **Deploy to canary first:** ship to a small real-traffic slice, confirm
   checkout success rate and 5xx rate on the checkout path at that slice, then
   expand. A green CI or deployed artifact alone is not proof — verify live
   behavior at the deployed SHA.
4. **Watch the health signals after full rollout:** checkout success rate
   back to baseline, 5xx rate at ~0, no increase in 4xx, no duplicate orders,
   and p95 latency unchanged — for at least 24–72h, or one full business
   cycle for the affected subset.
5. **Name residuals:** if provider timeouts still exist, state the residual
   risk and the follow-up (e.g., async reconciliation), and who owns it.

## 5. Done

- The framed harm is fixed or mitigated with evidence at the live layer.
- The reproduction is closed and covered by a regression lock.
- No new regression observed on the touched path.
- Scope stayed harm-linked; residuals and owners are named.
