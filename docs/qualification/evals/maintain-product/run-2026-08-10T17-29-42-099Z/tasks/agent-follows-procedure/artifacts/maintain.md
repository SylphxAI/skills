# Maintain: Checkout 500 for ~5% of users after last release

Cycle type: regression / live harm cut. Method: `maintain-product` (one cycle).

## 1. Frame

- **Symptom:** `POST /v1/checkout` returns HTTP 500 for ~5% of checkout attempts. Started immediately after the last release; pre-release baseline was ~0.1%.
- **Severity:** High — customer-facing purchase failure on the revenue path. No automatic retry; affected orders are lost unless the user retries manually.
- **Audience:**
  - Users: blocked purchases, double-attempt confusion.
  - Ops: error-rate spike, alert noise, triage load.
  - Data: incomplete/abandoned orders distort revenue and funnel metrics.
- **Health signal that must improve this cycle:** checkout 500 rate returns to the pre-release baseline (≤0.1%) and stays green for 7 days of soak; the regression oracle below passes on the fixed revision.
- **Non-goals:** feature expansion, checkout UX redesign, unrelated performance work, generic error-handling refactor.

## 2. Research

- **Reproduce / evidence:**
  - Pull checkout service error logs for the release window; group 500s by request shape (payment method, coupon applied, cart line types, region, session kind).
  - Confirm the ~5% is a stable, identifiable subset rather than random load failure (e.g., errors correlate with a specific request shape, not with peak traffic).
- **Bisect:** diff the last release against the previous release for the checkout service and its shared dependencies (cart, coupon, entitlement, payment payload builders). Flag any change that adds a required field, changes serialization, or tightens validation on a path previously tolerant.
- **Owning layer:** checkout/order service (API layer). Confirm from stack traces before fixing: expected signature is an unhandled exception on a newly required input/field that only a subset of users actually sends (e.g., a new coupon/entitlement field missing from older clients or cached carts).
- **Stop condition:** root-cause hypothesis is actionable (specific change + specific request shape + stack-trace confirmation). If reproduction is blocked, add targeted instrumentation first — but only as an admitted in-scope step.

## 3. Admit

- **In:**
  - Root-cause fix on the owning layer with minimal blast radius.
  - Regression lock: automated test that reproduces the failing request shape (the oracle).
  - Alert/health check on checkout 500 rate if not already present (detectability, not a fix).
- **Out:**
  - Unrelated refactors, "improve all error handling", client-side redesign, payment-provider migrations, feature expansion.

## 4. Implement

- Land the fix at the root cause, not in a catch-all wrapper:
  - If the bad change introduced a required field/validation that older valid traffic does not send: make the contract back-compatible (default/normalize at the owning layer) or drop the offending change and re-land it with a migration for existing carts/clients.
  - No papering over the shared floor in the wrong layer (e.g., no blanket 500→200 mapping, no retry loop hiding the defect).
- **Regression lock:** add a test that reproduces the exact failing request shape (red on the released revision), plus a health-check/alert assertion on the checkout 500 rate.
- Landing discipline: L1 batch this cycle's admitted work, L2 atomic valid commits, L3 one revert-safe complete PR outcome for the fix + regression lock.

## 5. Deliver / verify

- **Re-run the failing oracle:** must be red on the released revision and green on the fixed revision; record both runs with SHAs in the cycle evidence.
- Spot-check the touched path (successful checkout for the previously failing shape and one previously working shape) for new regressions.
- If harm cannot be fully closed this cycle, name the residual owner and the mitigation (e.g., targeted alert, monitored workaround) — mitigation alone does not complete the cycle.

## Cycle done

1. Framed harm fixed or mitigated with evidence: **pending — attach oracle before/after runs**.
2. Reproduction closed or residual owner named: reproduction from logs + bisect diff + stack trace.
3. No obvious new regression on the touched path: spot-checked paths listed.
4. Scope stayed harm-linked: only admitted in-scope items landed.

---

## Output

**Harm:** ~5% of checkout attempts fail with HTTP 500 after the last release — users cannot complete purchases (revenue and trust loss), ops carry alert/triage load, and data sees inflated abandoned orders. Health signal: checkout 500 rate back to ≤0.1% baseline and green for 7-day soak.

**Cause:** last release tightened/touched the checkout request path (serialization or validation on a new field) such that a stable ~5% subset of valid traffic (identified by request shape in step 2) now throws an unhandled exception; confirmed by stack trace + bisect diff. (Record the actual change + trace here once reproduced; no fix lands without that confirmation.)

**Fix:** root-cause change at the checkout service owning layer — make the contract back-compatible (default/normalize the newly required input) or revert-and-re-land with a migration — small blast radius, no wrapper-level masking. Regression lock: automated test reproducing the failing request shape + checkout 500-rate alert.

**Oracle:** the failing request shape as an automated checkout test — must be red on the released revision and green on the fixed revision; plus a monitored checkout 500-rate health check that must return to baseline and stay green for 7 days.

**Residual risk:** unverified edge shapes adjacent to the fixed one (e.g., other combinations of the new field with coupons/regions) until soak completes; older cached client payloads not covered by the oracle may resurface the defect — tracked as a follow-up if the 7-day soak or post-release logs show them.
