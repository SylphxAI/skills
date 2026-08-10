# Incident Response: Website Returns 502 Bad Gateway

This runbook covers a production outage where the public website starts returning
HTTP 502s. It follows the house incident standard: declare, stabilize,
communicate, diagnose, resolve, learn. The order matters — stabilize before
debugging, and never claim recovery without real-traffic evidence.

A 502 means the edge / load balancer / gateway cannot get a *valid* response
from the origin or an upstream dependency. The failing layer is between the edge
and the application (or between the application and its dependencies). Do not
assume the origin is down just because the edge says so, and do not assume the
origin is fine because its `/healthz` returns 200.

---

## 1. What you do first

### 1.1 Confirm and characterize (under 2 minutes, no deep debugging)

Reproduce with a real user request, not a health probe:

```bash
curl -si https://<public-host>/                 # homepage
curl -si https://<public-host>/<deep-endpoint>  # a real user path, e.g. login or search
```

Record:

- Scope: all hosts / one host, all users or a segment (region, tenant, browser/device).
- Start time: first error seen, plus any deploy, config, DNS, or dependency change in the window before it.
- Error shape: only 502, or mixed with 504 / 503 / connection resets? This narrows the cause fast.
- Telemetry: LB error rate, origin response codes, upstream latency. If telemetry is missing, say so — never invent metrics.

### 1.2 Declare the incident

- Classify severity by customer impact + blast radius:
  - **S1** — entire site unusable for all users (typical for a full 502 outage). Response: open the incident immediately, mitigation starts at once, postmortem is a launch gate for the next release on the affected surface.
  - **S2** — a primary workflow unusable for a real customer segment (partial 502s on one path). Response: open the incident, mitigation same working session, postmortem required before close.
- Open the **typed incident record** (incident id, `detectedAt`, `severity`, command owner, impact, evidence links). The record is the command-state authority — the chat thread and status page only *project* it. Every state change updates the record first.
- Assign one **incident commander** who owns the record, decisions, and communications. Everyone else contributes facts to the record.

### 1.3 Stabilize — mitigate user harm first (reversible actions only)

Pick the fastest reversible action that restores real traffic:

1. **Rollback the last deploy** if one landed in the incident window (runtime rollback, or source revert if that is the deployment path).
2. **Failover / reroute**: switch to the last-known-good fleet, region, or replica set.
3. **Shed load**: scale out the origin, drain a hot instance, or route traffic around a failing node.
4. **Fix the dependency** if the origin is fine but an upstream (database, cache, auth, object store) is down or saturated — restore or fail over the dependency.

Debugging comes *after* mitigation is in motion, not before. If no obvious
reversible action exists, go straight to diagnosis (Section 4) while keeping the
incident declared.

### 1.4 Verify recovery with real traffic — health 200 is not proof

A green load balancer or `/healthz` is **not** evidence the site works. Verify
with the same user-facing requests from Section 1.1 and confirm the LB 5xx rate
dropped to baseline. Trace at least one real request end to end:
edge → load balancer → origin → dependencies → response. If the trace fails,
the mitigation has not landed; keep working and keep the incident open.

### 1.5 Quick 502 triage checklist (after mitigation, or if no rollback exists)

| Observation | Likely cause | Check |
| --- | --- | --- |
| Deploy landed just before first 502 | Regression in new release | Compare error window to deploy timestamp; roll back |
| Origin returns 500/OOM/connection refused | Origin crash or resource exhaustion | Origin logs, memory, restart count, connection pool |
| Edge→origin times out | Upstream timeout too short, or origin saturated | Latency percentiles; increase timeout only as a stopgap |
| Dependency down (DB, cache, auth) | Upstream failure | Dependency health + error rate; failover |
| Health checks pass but real requests fail | Health check does not exercise a real path | Compare `/healthz` vs real endpoint; fix check |
| Target pool / DNS changed | Stale or misconfigured targets | Confirm target addresses, ports, SNI, TLS certs |
| No deploy, no config change | Something gradual: leak, capacity, dependency | Check sustained load, connection leaks, upstream saturation |

---

## 2. How you communicate

### 2.1 Principles

- **Facts only, no false ETAs.** If you do not know the cause or a recovery time, say exactly that. An honest "we are investigating, no ETA" beats a fabricated ETA every time.
- **One channel as the projection, one record as the truth.** All updates are written from the incident record; the status page / thread never invents state.
- **Name the commander.** Every update names who owns the response, so anyone can escalate to one person.
- **Set a cadence.** Update at every state change and at a fixed interval (e.g., every 30 minutes) even when nothing changed — "no change, still investigating" is an update.
- **Report telemetry gaps.** If an alert should have fired but did not, state it in the update and log it for the postmortem. Do not invent metrics.

### 2.2 Audience tiers

**Internal command channel** (full detail, but label hypotheses as hypotheses):

- What is affected, since when, error codes, blast radius.
- What was tried, what was verified, what failed.
- Unconfirmed hypotheses explicitly marked `[hypothesis]`.
- Raw logs, traces, and topology are fine here.

**Customer-facing status page / public update** (strict allowlist — negative leakage tests):

- What is affected and the impact (e.g., "website is returning errors").
- When the incident started and the incident reference.
- Safe workaround or action, if one exists.
- When the next update will be published.
- Exclude: raw logs, traces, internal topology, control knobs, unconfirmed hypotheses, exploit-enabling detail, and other tenants' data.

### 2.3 State changes to announce

1. **Declared** — "We are investigating errors on the website; no ETA yet."
2. **Mitigation applied** — what was done, and that verification is running.
3. **Recovery verified** — real-traffic check passed, error rate back to baseline; only now say "resolved."
4. **Postmortem published** — cause, what changed, what prevents recurrence.

Never announce "resolved" on a green health check alone.

---

## 3. What you learn afterward (postmortem)

For S1, the postmortem is required **before the next release** on the affected
surface; for S2, before the incident closes. Blameless by construction: the
write-up contains mechanisms and evidence, not names.

### 3.1 Timeline with real timestamps

- `detectedAt` — when the first error was observed (and when the alert would have fired, if later).
- `mitigatedAt` — when user harm stopped (real-traffic verified).
- `resolvedAt` — when the incident closed.
- Detection-to-recovery latency is the headline number; closing the gap is the goal.

### 3.2 Root cause with evidence

A root cause claim requires: **reproduce → trace the actual code/config path →
fix → re-verify**, with checkable evidence at each step. A plausible story is
not a root cause. Record contributing factors (conditions that widened blast
radius or slowed detection) separately — informational, not the accountability
surface.

### 3.3 Durable mechanisms — every root cause yields at least one

"Improve monitoring" or "be more careful" is not a mechanism. Each action item
must be a typed change that makes the next occurrence behave differently:

| Mechanism type | Example for a 502 outage |
| --- | --- |
| `alert` | SLO alert on LB 5xx rate and availability; alert on health-check/real-path divergence |
| `ci-gate` | Canary smoke after deploy: fail promotion if 5xx rate rises post-deploy |
| `regression-test` | End-to-end test that exercises the exact failing user path against a red build |
| `reconciler` | Auto-rollback on error-rate breach; target-pool/health-check reconciliation |
| `runbook` | This document, updated with the actual incident's triage path |
| `policy` | Deploy windows, canary requirements, or upstream timeout standards |

### 3.4 Detection-gap review

- Why was this found by a user/report rather than an alert? Which signal was missing?
- Build the missing signal and **prove it fires** (test the alert against a synthetic failure — do not close the item on "alert configured").

### 3.5 Close-out

- Verify every mechanism shipped and observed firing in the next deploy.
- Review communication: were updates timely and accurate? Update stakeholder lists and the status-page playbook if needed.
- Track all action items with owners and a follow-up date; the incident closes only when the record, postmortem, and mechanisms are all in place.

---

## 4. Definition of done

The incident is done when, in order:

1. User harm is stopped and **verified with real traffic** (not a health probe).
2. The incident record is complete (timeline, impact, communications).
3. The postmortem records a root cause with evidence.
4. At least one durable mechanism per root cause is shipped and proven to fire.
5. The runbook is updated with anything the incident taught us.
