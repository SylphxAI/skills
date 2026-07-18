# incident-standard (canonical body)

**Authority:** binding Standard Skill package `incident-standard` in `SylphxAI/skills` (`skills/incident-standard/`).

**Cutover:** migrated from Doctrine `standards/incident-standard.md` at digest `sha256:da889126bcf57ec5cf8cb42013b151178804c211dabf27a2f6dadfc0fef70330` (doctrine `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7`). Doctrine file is alias-only after cutover.

Author here; do not maintain a second prose SSOT.

---

# Incident and Postmortem Standard

## Purpose

The fleet has a rich incident history and no shared home for how an incident
is detected, mitigated, or written up. Absent a standard, every repository
improvises its own severity language, its own "who do we page," and its own
postmortem template — usually a prose document nobody re-derives a mechanism
from. This standard gives incident response the same no-human treatment as
CI: severity is a machine-readable label, mitigation is a recovery decision
this doctrine already defines, and a postmortem is a structured artifact a
gate can check, not a ceremony a human reads once and forgets.

This standard composes with:

- [`agent-first-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/agent-first-development-standard/references/full-standard.md)
  for risk lanes and recovery semantics (source revert / runtime rollback /
  forward-fix) — cited here, not restated;
- [`delivery-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/delivery-standard/references/full-standard.md) for production
  verification signals used to prove a mitigation actually recovered;
- the binding security profile for fail-closed invariants whose breach is
  always at least S1;
- `documentation-standard` for collision-resistant postmortem identity.

## Scope and Trigger

This standard applies by selector, not by exemption prose. A repository is in
scope when `.doctrine/project.json` states `project.lifecycle` is
`production` or `commercial` **and** `delivery.deployable` is `true` (or the
projected deployable fleet property). A library,
CLI-only tool, or research repo with no deployed or operated surface never
satisfies that selector, so it is out of scope by construction — it does not
need exemption language, and it does not need to adopt a postmortem process
it has no incidents to write.

`project-manifest-standard.md` already discloses that `delivery.deployable`
(like `project.policyPool`) is optional during the expand phase: a
repository cannot be fully projected into selector values until both facts
are populated. This selector inherits that same limitation — an in-scope
repository whose manifest hasn't populated `delivery.deployable` yet will
under-select rather than adopt early, not the other way around.

## Severity Classification

Severity is customer impact plus blast radius, not opinion, and every row
has a machine-actionable required response. The response column describes
what the responding agent does today; alert/SLO-triggered auto-detection and
auto-issue-opening are this table's target automation, not yet shipped
everywhere — see Validation:

| Severity | Customer impact | Blast radius | Required response |
| --- | --- | --- | --- |
| S1 — Critical | Full outage, data loss/corruption, or any breach of a security-floor invariant (ADR-136) | Any — from a single tenant to the whole deployed surface | The responding agent opens the incident issue labeled `severity:S1` immediately on detection (paging if paging is configured); mitigation starts inside the alert's SLO where one is wired; a postmortem-record is a launch gate for the next release on the affected surface. |
| S2 — Major | A primary workflow is unusable or materially degraded for a real customer segment | One deployed surface, or a bounded subset of tenants | The responding agent opens the incident issue labeled `severity:S2` on detection; mitigation starts the same working session; a postmortem-record is required before the incident closes. |
| S3 — Minor | Degraded but a workaround exists; no data or security exposure | Limited or non-critical surface | The responding agent opens a machine-actionable issue at the next reconcile cycle; scheduled fix; a postmortem-record is optional unless a mechanism gap is suspected. |
| S4 — Near-miss | No customer-visible impact; a floor or gate almost failed, or failed with no live exposure window | Internal, detection-only | Tracked issue; a postmortem-record is required whenever the near-miss reveals a missing durable mechanism — capturing that signal before it becomes S1 is the entire point of S4. |

A security-floor breach (ADR-136) is S1 **regardless of blast radius** — a
single-tenant isolation failure is a critical incident, never downgraded for
narrow scope. Blast radius classifies everything else; it never overrides a
floor breach.

## The No-Human Incident Loop

Detection through write-up is one machine-checkable pipeline, not a set of
disconnected steps a human bridges by memory:

```text
alert / SLO gate (or manual report)
  -> machine-actionable issue opens, severity label attached (table above)
  -> mitigate: source revert / runtime rollback / forward-fix,
     selected per ADR-29's recovery semantics (not restated here)
  -> verify recovery with evidence (delivery-standard.md production
     verification signals: smoke/health checks, logs, metrics, canary verdict)
  -> postmortem-record artifact (schema below), gate-checkable, not prose
```

Mitigation choice is not a fresh decision per incident: it is the same
source-revert / runtime-rollback / forward-fix classification
`agent-first-development-standard.md`'s Recovery Semantics section already
makes for postsubmit failure. An incident is a recovery decision with a
customer-facing trigger, not a different decision tree.

## Postmortem Is a Machine Artifact

A postmortem is a `postmortem-record` matching the active schema selected by
the binding profile,
not a prose document a human reads once. Shape, at a glance:

| Field | Content |
| --- | --- |
| `id` | Follows ADR.md's general rule for source-controlled artifacts: an allocator-backed identity (e.g. the tracking issue number) or a collision-resistant generated identity (ULID/UUIDv7/content hash) — never a hand-picked sequential number. |
| `severity` | One of the table above. |
| `detectedAt` / `mitigatedAt` / `resolvedAt` | Timeline timestamps proving detection-to-recovery latency, not narrated after the fact. |
| `rootCause.mechanism` + `rootCause.evidence[]` | The traced mechanism Evidence First (PRINCIPLES.md) already requires for any root-cause claim: reproduce, trace through the actual code/config path, fix, re-verify — with checkable evidence, not a plausible story. |
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

The fleet has no human reviewers (ADR-18); the same reasoning makes
postmortems blameless by construction rather than by norm. A `mechanisms[]`
entry is a fix to a test, gate, alert, reconciler, runbook, or policy —
never a note about which agent, session, or runtime performed an action.
Accountability lives in the mechanism that now exists, not in a name
attached to the incident.

## Validation

No conformance audit ships with this standard; this section states what
would prove adoption later, the same honesty pattern ADR-136 uses for its
own not-yet-shipped enforcement:

- A future `scripts/incident-conformance-audit.py`, following the existing
  `scripts/repo-selector-*` pattern, would select repositories by the
  lifecycle/deployable selector above and check: every closed S1/S2 incident
  issue links a `postmortem-record`; every record validates against
  `schemas/postmortem-record.schema.json`; every `rootCause` has at least one
  `mechanisms[]` entry.
- Until that audit exists, adoption is read-time discovery: an agent handling
  an incident on an in-scope repository reads this standard (routed from
  `AGENTS.md`) and writes a conforming record; nothing currently blocks a
  non-conforming one.
- Alert/SLO-triggered auto-detection and auto-issue-opening (Severity
  Classification) are not shipped: today the responding agent performs
  detection-to-issue-open by hand, labeled per the severity table. Wiring
  alerts/SLO gates to open a labeled issue automatically is future work, the
  same "advisory now, mechanism later" pattern as ADR-136.


## Package checklist (Skills cutover)

| Rule ID | Check |
| --- | --- |
| `incident-sta-01` | Strongest relevant subset applied |
| `incident-sta-02` | Facts in schema/test/ADR homes |
| `incident-sta-03` | Proof layers separated |
| `incident-sta-04` | Unknown authority fails closed |
| `incident-sta-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
