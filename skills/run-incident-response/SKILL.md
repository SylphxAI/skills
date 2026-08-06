---
name: run-incident-response
description: "Run production incident response: severity, command, mitigation, communications, and learning. Use for live outages or user-visible production failures."
---

# Run Incident Response

Coordinate a production incident to mitigation and truthful close.

## When to use

- Live outage, elevated error rate, data loss risk, or security incident
- User-visible production failure needing command and mitigation

## Workflow

1. **Declare.** Severity, scope, impact, command owner. Start an incident record.
2. **Stabilize.** Mitigate user harm first (rollback, disable, shed load). Prefer reversible actions.
3. **Communicate.** Status to stakeholders with facts only; no false ETAs.
4. **Diagnose.** Reproduce and find owning cause after mitigation is underway.
5. **Resolve.** Land the fix or permanent mitigation with evidence.
6. **Learn.** Short postmortem: cause, detection gaps, action items with owners.

## Record

Prefer the schema in [references/active-incident-record.schema.json](references/active-incident-record.schema.json) when machine form helps.

Read [references/full-standard.md](references/full-standard.md) only for extended severity definitions and communication templates.

## Gotchas

- Debugging before mitigation extends outages.
- "Working as designed" is not resolution if users are still harmed.
- Never invent live metrics; report telemetry gaps.

## Output

Incident record · mitigation evidence · communications · follow-ups
