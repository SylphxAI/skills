---
name: run-incident-response
description: Coordinate a production incident from declaration through mitigation, recovery, and learning. Use for live outages, elevated errors, security events, or material data-integrity risk.
---

# Run Incident Response

Restore safe service quickly while preserving clear ownership and truthful communication.

## Method

1. Admit the incident from a firsthand Human Owner report of active customer harm; do not require the reporter to reproduce or prove complete blast radius or root cause first. Record the commander, severity, affected users, current impact, start time, and communication channel.
2. Before a reversible mitigation, perform only hard safety checks: target, authorization, reversibility, and immediate collateral, data-loss, or security risk.
3. Stabilize users and conserved data with the fastest safe reversible mitigation available. Restoration precedes complete blast-radius or root-cause proof.
4. Communicate observed facts, actions underway, user guidance, and the next update time.
5. Preserve logs, traces, metrics, deploy identities, and relevant state needed for diagnosis.
6. Locate the owning failure through current telemetry, recent changes, reproduction, and dependency status after mitigation is underway.
7. Apply the durable repair or permanent mitigation at the owning layer.
8. Confirm recovery through the affected customer path and the telemetry that originally showed impact.
9. Close active response when user impact is resolved and operational ownership is clear.
10. Record cause, contributing conditions, detection and response improvements, and follow-up owners in the team's incident system.

## Active response continuity

An active incident turn must not end at a nonterminal checkpoint. A checkpoint is observability, not closure: retain the current-turn finite wait/readback until recovery or hand off to an explicitly active supported monitor with an owner, scope, cadence, and resume predicate. Do not leave the lifecycle dependent on a future Owner wakeup or an unproved monitor promise; if no supported monitor exists, report that capability gap and keep ownership explicit.

## Incident updates

Each update should state:

- current user impact and scope;
- confirmed observations;
- mitigation or repair in progress;
- current service state; and
- next update time or closure condition.

Keep estimates labeled as estimates. Keep security-sensitive and personal data in authorized incident channels.
