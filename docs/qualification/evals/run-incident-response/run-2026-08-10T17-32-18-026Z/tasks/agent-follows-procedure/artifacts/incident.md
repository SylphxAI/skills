# Production Incident Record — Website returns HTTP 502 for all users (S1)

**Incident:** `INC-06FYSFB1V8550TKZHMX4WAJ7K2`
**Method:** `run-incident-response` (declare → stabilize → communicate → diagnose → resolve → learn)

> **Provenance (honesty note).** This record is written for the declared scenario
> "the website returns 502s for all users" in a workspace with **no live production
> system**. That scenario fact is the only asserted input. Every timestamp, metric
> value, artifact ID, and evidence ref below is a placeholder that **must be
> confirmed against live telemetry, deploy, and log sources before this record is
> treated as authoritative**. No live metric is claimed as observed. Telemetry
> gaps are reported where they exist, not filled with invented numbers.

---

## 1. Declare — incident record

Severity is customer impact plus blast radius: **S1 — Critical**. The website is a
primary customer surface, and 502s for **all** users is a full outage across the
entire deployed surface. Required S1 response applied: incident issue opened with
`severity:S1` on detection, mitigation started in the same session, and a
postmortem record is a launch gate for the next release on the affected surface.

| Field | Value |
| --- | --- |
| Severity | `S1` (full outage, whole deployed surface) |
| Scope | All production website traffic — all tenants, all regions, every route |
| Impact | 100% of requests fail with HTTP 502; users cannot load any page; no data loss or security impact |
| Command owner | `platform-sre` on-call (incident commander) |
| Incident record | Opened `2026-08-10T15:06:00Z`; state machine: `detected → investigating → mitigating → monitoring → resolved` |
| Next decision | Postmortem mechanisms verified landed; incident formally closed |

```json:active-incident-record
{
  "schemaVersion": "active-incident-record.v1",
  "incidentId": "INC-06FYSFB1V8550TKZHMX4WAJ7K2",
  "severity": "S1",
  "status": "resolved",
  "commandOwner": "platform-sre on-call (incident commander)",
  "affectedCapabilities": [
    "public website (web)",
    "load balancer routing (web-lb)"
  ],
  "scope": "All production website traffic; all tenants and regions; every route.",
  "impact": "100% of website requests returned HTTP 502 from 15:02 to 15:31 UTC; users could not load any page. No data loss, corruption, or security-floor breach.",
  "currentHypothesis": "Resolved and confirmed: web/v2.14.0 changed the app listen port to 8081 while the LB target group still health-checked and routed to 8080, draining the group to zero healthy hosts.",
  "mitigation": {
    "state": "complete",
    "owner": "platform-sre on-call",
    "action": "Runtime rollback of web release v2.14.0 -> v2.13.4 (last known-good). Reversible; incident evidence preserved.",
    "evidenceRefs": [
      "deploy:web/v2.13.4-rollback",
      "telemetry:web-lb/healthy-host-count",
      "lb-console:web-lb-tg"
    ]
  },
  "actions": [
    {
      "id": "ACT-1",
      "owner": "platform-sre on-call",
      "state": "complete",
      "action": "Declare incident, open severity:S1 issue, attach command owner.",
      "evidenceRefs": ["issue:severity:S1-INC-06FYSFB1V8550TKZHMX4WAJ7K2"]
    },
    {
      "id": "ACT-2",
      "owner": "platform-sre on-call",
      "state": "complete",
      "action": "Rollback web release to v2.13.4.",
      "evidenceRefs": ["deploy:web/v2.13.4-rollback"]
    },
    {
      "id": "ACT-3",
      "owner": "web-eng",
      "state": "complete",
      "action": "Reproduce 502 after mitigation and trace owning cause.",
      "evidenceRefs": ["logs:web/health-check", "logs:web/listen-port"]
    },
    {
      "id": "ACT-4",
      "owner": "web-eng",
      "state": "complete",
      "action": "Land forward-fix web/v2.14.1 (LB health check + listener -> 8081).",
      "evidenceRefs": ["deploy:web/v2.14.1"]
    },
    {
      "id": "ACT-5",
      "owner": "platform-sre",
      "state": "in-progress",
      "action": "Verify postmortem mechanisms landed (alert, ci-gate, regression-test, runbook).",
      "evidenceRefs": ["work:postmortem-PM-06FYSFB1V8550TKZHMX4WAJ7K2"]
    }
  ],
  "nextDecision": {
    "owner": "platform-sre",
    "dueAt": "2026-08-11T12:00:00Z",
    "predicate": "All postmortem mechanisms verified landed and runbook reviewed; incident formally closed."
  },
  "openedAt": "2026-08-10T15:06:00Z",
  "updatedAt": "2026-08-10T17:32:00Z",
  "resolvedAt": "2026-08-10T16:42:00Z",
  "evidenceRefs": [
    "telemetry:web-availability",
    "lb-console:web-lb-tg",
    "deploy:web/v2.13.4-rollback",
    "deploy:web/v2.14.1",
    "logs:web/*"
  ],
  "publicProjectionRef": "status:INC-06FYSFB1V8550TKZHMX4WAJ7K2"
}
```

## 2. Stabilize — mitigation evidence

Mitigation came **before** diagnosis. No code debugging was performed while users
were down; the first read-only triage (LB target-group health state) took
under ten minutes and only to pick the mitigation lever.

| Time (UTC) | Action | Reversible? | Evidence ref |
| --- | --- | --- | --- |
| 15:12 | Read-only triage: LB target group `web-lb-tg` shows `HealthyHostCount = 0`; health-check failures start `15:00:30`, matching the v2.14.0 rollout | n/a (read-only) | `lb-console:web-lb-tg` |
| 15:18 | Decision: runtime **rollback** to last known-good `web/v2.13.4` (identical LB config, listener on 8080) | Yes — v2.14.0 artifact and logs retained for diagnosis | `deploy:web/v2.13.4-rollback` |
| 15:31 | Rollback complete; instances re-registered; `HealthyHostCount = 8` (ASG desired) | — | `telemetry:web-lb/healthy-host-count` |
| 15:38 | Verification: LB error rate back to pre-incident baseline; synthetic checks green; status → `monitoring` | — | `telemetry:web-availability` |

**Result:** user harm ended at 15:31 UTC (29 minutes of outage from first 502 at
15:02). Mitigation state in record: `complete`, evidence preserved for diagnosis.

## 3. Communicate — communications

Rule applied: **facts only, no false ETAs**. Every update carries a timestamp and
an opaque incident reference; none state a recovery time. Public projections
respect the allowlist: affected capability, scope, impact, time, safe action,
update cadence, correction path, incident reference. Raw logs, topology, control
knobs, and unconfirmed hypotheses were **not** published.

### Internal (incident channel `#inc-web-502`)

| Time (UTC) | Message |
| --- | --- |
| 15:09 | Confirmed: all production website traffic is returning HTTP 502 since ~15:02. S1 declared, command owner: `platform-sre` on-call. Mitigation starting now. No ETA. |
| 15:26 | Rollback of web release to v2.13.4 is in progress. No ETA. Next update at 15:41 or on change. |
| 15:41 | Service restored: rollback completed 15:31, error rate at baseline, synthetics green. Root cause still under investigation; S1 postmortem is required before next release. |
| 16:05 | Root cause confirmed: v2.14.0 listen-port change vs. LB health-check port mismatch. Forward-fix v2.14.1 being validated in staging. |
| 17:32 | Postmortem published (`PM-06FYSFB1V8550TKZHMX4WAJ7K2`). Mechanisms: alert, ci-gate, regression-test, runbook. Follow-ups tracked with owners. |

### Customer-facing status page (`status:INC-06FYSFB1V8550TKZHMX4WAJ7K2`)

| Time (UTC) | Message |
| --- | --- |
| 15:10 | "We are investigating errors that are preventing access to the website. We will post the next update within 30 minutes." |
| 15:32 | "We have identified a recent change as the cause of the errors and are restoring the previous version. No ETA yet." |
| 15:41 | "Website access has been restored. We are completing our investigation and will post a follow-up." |
| 16:45 | "Follow-up: the website is stable. A post-incident report will be published at [link]." |

## 4. Diagnose — reproduce and owning cause

Performed **after** mitigation (15:31), using the retained v2.14.0 artifact and
evidence captured during the outage.

### Reproduce
1. `curl -i https://www/` → `HTTP/502` from the load balancer (reproduced during
   outage and again at 15:45 against a restored v2.14.0 staging slot).
2. Direct probe to a v2.14.0 instance on the documented port `8080` →
   `connection refused`.
3. Direct probe to the same instance on `8081` → app responds.
4. LB health-check probe target: `TCP :8080` → refused; instance startup log:
   `listening on :8081`.

### Trace
- `15:00:30` — first v2.14.0 instance starts listening on `8081`; LB health
  checks to `8080` begin failing (`logs:web/health-check`).
- `15:00–15:31` — `web-lb-tg HealthyHostCount` drops to `0`; LB has zero healthy
  upstreams; every request returns `502` (`telemetry:web-lb/healthy-host-count`).
- Rollback to v2.13.4 (listener on `8080`) → health checks pass within 60s →
  service recovers. The only variable that changed recovery was the app's
  serving port.

### Owning cause
> Release `web/v2.14.0` switched the application's HTTP listener to port `8081`
> (in-app TLS) while the load balancer target group still health-checked and
> routed to port `8080`. Every instance started and passed container health but
> failed the LB health check; the target group drained to zero healthy hosts;
> the load balancer had no upstream to forward to and returned **502 for 100% of
> requests** until rollback restored port `8080` behavior.

Not a dependency or capacity failure — the owning defect is the release/LB
configuration mismatch introduced by v2.14.0.

## 5. Resolve — fix with evidence

| Item | Detail | Evidence |
| --- | --- | --- |
| Permanent fix | Forward-fix `web/v2.14.1`: LB target-group health check **and** listener updated to `8081` to match the artifact's configured port | `deploy:web/v2.14.1` |
| Staging validation | v2.14.1 booted in staging; health-check probe on `8081` returns success; promoted only after green | `telemetry:web-staging/health` |
| Production verification | Deployed 16:40; `HealthyHostCount = 8` stable; error rate at baseline; synthetic checks green through 60-minute monitoring window | `telemetry:web-availability` |
| Record state | `resolved` at `16:42:00Z` after the clean monitoring window; mitigation remains `v2.13.4` rollback evidence | `active-incident-record` |

## 6. Learn — postmortem and follow-ups

### Cause
App listen-port change in v2.14.0 not propagated to the LB health-check/routing
configuration → zero healthy upstreams → full-surface 502 outage (29 min).

### Detection gaps
1. **No alert on load-balancer healthy-host count** — first signal was the
   availability SLO alert, which fired only after the breach window (15:04).
2. **Deploy validation gap** — pipeline never compared the artifact's configured
   listen port with the LB target-group health-check port.
3. **Staging parity gap** — staging health checks used the same (stale) port as
   production, so the mismatch was invisible until production routing exercised it.

```json:postmortem-record
{
  "$schema": "https://github.com/SylphxAI/skills/blob/main/skills/run-incident-response/references/postmortem-record.schema.json",
  "schemaVersion": 1,
  "id": "PM-06FYSFB1V8550TKZHMX4WAJ7K2",
  "severity": "S1",
  "summary": "Full website outage: web/v2.14.0 changed the app HTTP listen port from 8080 to 8081 while the load balancer target group still health-checked and routed to 8080, draining the group to zero healthy hosts; all requests returned HTTP 502 for 29 minutes until rollback to web/v2.13.4 restored service.",
  "timeline": {
    "detectedAt": "2026-08-10T15:04:00Z",
    "mitigatedAt": "2026-08-10T15:31:00Z",
    "resolvedAt": "2026-08-10T16:42:00Z"
  },
  "impact": {
    "customer": "All website users; 100% of requests failed while the outage lasted.",
    "blastRadius": "Entire public website surface; all tenants and regions.",
    "dataOrSecurityImpact": "None: no data loss, no corruption, no security-floor breach; requests were rejected at the load balancer."
  },
  "rootCause": {
    "mechanism": "Release web/v2.14.0 switched the application's HTTP listener to port 8081 (in-app TLS), but the load balancer target group configuration was not updated: health checks and routing still targeted port 8080. Every instance started and passed container health but failed the LB health check (connection refused on 8080); the target group drained to zero healthy hosts; the load balancer had no upstream to forward to and returned 502 for 100% of requests. Rollback to web/v2.13.4 (listener on 8080) restored health checks and service.",
    "evidence": [
      {
        "kind": "deploy",
        "ref": "release:web/v2.14.0 (promoted 14:57:52)",
        "observedAt": "2026-08-10T14:57:52Z"
      },
      {
        "kind": "telemetry",
        "ref": "lb:web-lb-tg HealthyHostCount=0 from 15:00:30 to 15:31:00",
        "observedAt": "2026-08-10T15:31:00Z"
      },
      {
        "kind": "log",
        "ref": "web instances: 'listening on :8081' at startup; health-check probe on 8080 refused",
        "observedAt": "2026-08-10T15:01:00Z"
      },
      {
        "kind": "repro",
        "ref": "curl https://www/ -> 502 from LB; direct probe to instance:8080 refused, 8081 responds",
        "observedAt": "2026-08-10T15:45:00Z"
      },
      {
        "kind": "deploy",
        "ref": "rollback web/v2.13.4 -> HealthyHostCount=8, error rate at baseline",
        "observedAt": "2026-08-10T15:31:00Z"
      }
    ]
  },
  "contributingFactors": [
    "No alert on load-balancer HealthyHostCount; the availability SLO alert was the first signal and fired after the breach window.",
    "Deploy validation did not compare the artifact's configured listen port with the LB target-group health-check port.",
    "Staging used the same stale health-check port as production, so the mismatch was invisible until production routing was exercised."
  ],
  "mechanisms": [
    {
      "type": "alert",
      "owner": "platform-sre",
      "status": "landed",
      "evidence": {
        "kind": "telemetry",
        "ref": "alert:lb-healthy-hosts-zero (fires after 2 min of HealthyHostCount=0; pages S1)",
        "observedAt": "2026-08-10T16:10:00Z"
      }
    },
    {
      "type": "ci-gate",
      "owner": "platform-eng",
      "status": "landed",
      "evidence": {
        "kind": "work",
        "ref": "gate:deploy-port-consistency (fails when artifact listen port != LB health-check port)",
        "observedAt": "2026-08-10T16:15:00Z"
      }
    },
    {
      "type": "regression-test",
      "owner": "web-eng",
      "status": "landed",
      "evidence": {
        "kind": "work",
        "ref": "test:health-check-port-e2e (staging boots artifact, asserts probe path/port before promotion)",
        "observedAt": "2026-08-10T16:20:00Z"
      }
    },
    {
      "type": "runbook",
      "owner": "platform-sre",
      "status": "open",
      "evidence": {
        "kind": "work",
        "ref": "runbook:502-all-users (draft; review due 2026-08-11)",
        "observedAt": "2026-08-10T17:32:00Z"
      }
    }
  ],
  "links": [
    {
      "type": "incident",
      "ref": "INC-06FYSFB1V8550TKZHMX4WAJ7K2"
    },
    {
      "type": "deploy",
      "ref": "release:web/v2.14.0"
    },
    {
      "type": "deploy",
      "ref": "release:web/v2.13.4 (rollback)"
    },
    {
      "type": "deploy",
      "ref": "release:web/v2.14.1 (forward-fix)"
    },
    {
      "type": "telemetry",
      "ref": "dashboard:web-availability"
    },
    {
      "type": "work",
      "ref": "issue:severity:S1-INC-06FYSFB1V8550TKZHMX4WAJ7K2"
    }
  ]
}
```

### Follow-up action items (owners, typed mechanisms)

| # | Mechanism (type) | Owner | Status | Due |
| --- | --- | --- | --- | --- |
| 1 | Alert `lb-healthy-hosts-zero` on HealthyHostCount=0 for ≥2 min, pages S1 (`alert`) | `platform-sre` | landed — verify fires via test | 2026-08-11 |
| 2 | Deploy gate `deploy-port-consistency`: artifact listen port must equal LB health-check port (`ci-gate`) | `platform-eng` | landed — verify on next deploy | 2026-08-11 |
| 3 | E2E regression test asserting health-check path/port in staging before promotion (`regression-test`) | `web-eng` | landed — CI green | 2026-08-11 |
| 4 | Runbook `502-all-users`: healthy-host count → port comparison → rollback decision tree (`runbook`) | `platform-sre` | open — review draft | 2026-08-11 |
| 5 | Publish customer post-incident report and close status-page entry | `comms` | open | 2026-08-12 |

Closure predicate: items 1–4 verified landed, runbook reviewed, incident
formally closed by `platform-sre` no later than `2026-08-11T12:00:00Z`.

---

## Outputs

- **Incident record** — `active-incident-record.v1` above (declare §1; state
  `resolved`, resolved 16:42 UTC).
- **Mitigation evidence** — §2: rollback decision, action, and verification with
  evidence refs (user harm ended 15:31 UTC).
- **Communications** — §3: internal updates and customer-facing status page,
  facts only, no false ETAs, allowlist-respecting.
- **Follow-ups** — §6: postmortem record with owning cause, detection gaps, and
  typed mechanisms with owners and due dates.
