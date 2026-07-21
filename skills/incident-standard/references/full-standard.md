# Incident and Postmortem Standard

## Purpose

The organization has a rich incident history and no shared home for how an incident
is detected, mitigated, or written up. Absent a standard, every repository
improvises its own severity language, its own "who do we page," and its own
postmortem template — usually a prose document nobody re-derives a mechanism
from. This standard gives incident response the same no-human treatment as
CI: severity is a machine-readable label, mitigation is a recovery decision
the delivery standards already define, and a postmortem is a structured artifact a
gate can check, not a ceremony a human reads once and forgets.

This standard composes with:

- [`agent-first-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/agent-first-development-standard/references/full-standard.md)
  for risk lanes and recovery semantics (source revert / runtime rollback /
  forward-fix) — cited here, not restated;
- [`delivery-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/delivery-standard/references/full-standard.md) for production
  verification signals used to prove a mitigation actually recovered;
- applicable binding security constraints and the current product threat model
  for fail-closed invariants whose breach is always at least S1;
- `documentation-standard` for collision-resistant postmortem identity.

## Scope and Trigger

An explicit request to design or review an incident lifecycle may use this
method before production. Operational adoption applies by selector, not by
exemption prose: a repository is in scope when `project.manifest.json` states
`project.lifecycle` is `production` or `commercial` **and**
`delivery.deployable` is `true` (or the projected deployed/operated-surface
property). A library, CLI-only tool, or research repo with no deployed or
operated surface never satisfies the adoption selector, so it does not need to
run an incident process it has no incidents to write. A pre-live S4 near-miss
may still use the typed artifacts when a gate or floor almost failed.

The canonical project-manifest schema requires both lifecycle and deployable
state, so selector evaluation fails rather than guessing when either fact is
missing.

## Severity Classification

Severity is customer impact plus blast radius, not opinion, and every row
has a machine-actionable required response. The response column describes
what the responding agent does today; alert/SLO-triggered auto-detection and
auto-issue-opening are this table's target automation, not yet shipped
everywhere — see Validation:

| Severity | Customer impact | Blast radius | Required response |
| --- | --- | --- | --- |
| S1 — Critical | Full outage, data loss/corruption, or any breach of a security-floor invariant | Any — from a single tenant to the whole deployed surface | The responding agent opens the incident issue labeled `severity:S1` immediately on detection (paging if paging is configured); mitigation starts inside the alert's SLO where one is wired; a postmortem-record is a launch gate for the next release on the affected surface. |
| S2 — Major | A primary workflow is unusable or materially degraded for a real customer segment | One deployed surface, or a bounded subset of tenants | The responding agent opens the incident issue labeled `severity:S2` on detection; mitigation starts the same working session; a postmortem-record is required before the incident closes. |
| S3 — Minor | Degraded but a workaround exists; no data or security exposure | Limited or non-critical surface | The responding agent opens a machine-actionable issue at the next reconcile cycle; scheduled fix; a postmortem-record is optional unless a mechanism gap is suspected. |
| S4 — Near-miss | No customer-visible impact; a floor or gate almost failed, or failed with no live exposure window | Internal, detection-only | Tracked issue; a postmortem-record is required whenever the near-miss reveals a missing durable mechanism — capturing that signal before it becomes S1 is the entire point of S4. |

A confirmed breach of a protected security property is S1 **regardless of
blast radius** — a single-tenant isolation failure is critical and is never
downgraded for narrow scope. A pre-exposure gate/control failure that prevented
any protected-property breach is an S4 near-miss. Blast radius classifies
everything else; it never overrides a confirmed floor breach.

## The No-Human Incident Loop

Detection through write-up is one machine-checkable pipeline, not a set of
disconnected steps a human bridges by memory:

```text
alert / SLO gate (or manual report)
  -> active-incident-record opens, severity and command owner attached
  -> machine-actionable issue/status adapters project from that record
  -> mitigate: source revert / runtime rollback / forward-fix,
     selected under delivery recovery semantics
  -> verify recovery with evidence (delivery-standard.md production
     verification signals: smoke/health checks, logs, metrics, canary verdict)
  -> postmortem-record artifact (schema below), gate-checkable, not prose
```

The canonical active record is a protected operator artifact matching
[`active-incident-record.schema.json`](active-incident-record.schema.json). It
owns current status, affected capability/scope, command owner, impact,
mitigation state, actions, next decision, timestamps, and evidence references.
Adapters may project a minimum safe public status update, but the issue, status
page, or chat thread is never the command-state authority. Every state change
updates the record before a public projection claims it.

Mitigation choice is not a fresh decision per incident: it is the same
source-revert / runtime-rollback / forward-fix classification
`agent-first-development-standard.md`'s Recovery Semantics section already
makes for postsubmit failure. An incident is a recovery decision with a
customer-facing trigger, not a different decision tree.

The incident record and raw response evidence are protected operational state.
Public status updates, customer notices, and published post-incident reports
are separate reviewed projections with a named audience, subject/tenant
authorization where applicable, a versioned minimum allowlist, and negative
leakage tests. That allowlist may include the affected logical capability,
scope, impact, time, safe workaround or action, update cadence, correction path,
and opaque incident reference. It excludes raw logs/traces, topology, control
knobs, unconfirmed internal hypotheses, other tenants, and exploit-enabling
detail. S4 near-misses remain internal unless a legal, contractual, or
deliberate public-learning decision creates a separately authorized safe
publication.

## Postmortem Is a Machine Artifact

A postmortem is a `postmortem-record` matching the active schema selected by
the binding profile,
not a prose document a human reads once. Shape, at a glance:

| Field | Content |
| --- | --- |
| `id` | Follows `engineering-standard` artifact identity: an allocator-backed identity (e.g. the tracking issue number) or a collision-resistant generated identity (ULID/UUIDv7/content hash) — never a hand-picked sequential number. |
| `severity` | One of the table above. |
| `detectedAt` / `mitigatedAt` / `resolvedAt` | Timeline timestamps proving detection-to-recovery latency, not narrated after the fact. |
| `rootCause.mechanism` + `rootCause.evidence[]` | The traced mechanism Evidence First requires for any root-cause claim: reproduce, trace through the actual code/config path, fix, re-verify — with checkable evidence, not a plausible story. |
| `contributingFactors` | Secondary conditions that widened blast radius or slowed detection/mitigation; informational, not the accountability surface. |
| `mechanisms[]` | One or more durable fixes, each typed `regression-test`, `ci-gate`, `alert`, `reconciler`, `policy`, or `runbook`. |
| `links` | Issue, PR, dashboard, and alert references. |

Every root cause **must** yield at least one entry in `mechanisms[]`. An
"action item" with no mechanism type is non-conforming: "improve monitoring"
or "be more careful" is not a mechanism, it is the exact judgment-call
failure mode no-human delivery exists to eliminate. A conforming mechanism
changes what happens automatically next time: a test or gate that would
have caught it, an alert that would have paged for it, a reconciler that
would have self-healed it, an evidence-backed runbook
(`agent-first-development-standard.md`'s Doc Tree already recognizes this
class) that would have told the responder exactly what to do, or a policy
that closes the gap by rule.

## Blameless by Construction

The no-human operating model makes
postmortems blameless by construction rather than by norm. A `mechanisms[]`
entry is a fix to a test, gate, alert, reconciler, runbook, or policy —
never a note about which agent, session, or runtime performed an action.
Accountability lives in the mechanism that now exists, not in a name
attached to the incident.

## Validation

The canonical active-command and postmortem schemas ship with this package at
[`active-incident-record.schema.json`](active-incident-record.schema.json) and
[`postmortem-record.schema.json`](postmortem-record.schema.json). Each selected
repository validates its records against the applicable exact schema and checks that
every closed S1/S2 incident links a valid record with at least one durable
mechanism. Sylphx Enact may reconcile portfolio coverage from repository facts and
incident adapters; it does not re-author the record.

Alert/SLO-triggered issue creation is an adapter capability, not a condition for
the semantic standard. Where the adapter exists, it must be idempotent and bind
the alert identity, severity inputs, and source observation. Otherwise the
responding agent opens the same typed record path directly.


## Package checklist

| Rule ID | Check |
| --- | --- |
| `incident-sta-01` | Strongest relevant subset applied |
| `incident-sta-02` | Facts in schema/test/ADR homes |
| `incident-sta-03` | Proof layers separated |
| `incident-sta-04` | Unknown authority fails closed |
| `incident-sta-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
