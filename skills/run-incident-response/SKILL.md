---
name: run-incident-response
description: "Run production incident response: command, severity, mitigation, communications, learning/postmortem."
---

# Run Incident Response

When production is impaired and you must **command the incident to mitigation and
learning**, run this response method—not a policy essay.

## When to use

- Live or imminent production harm with unclear owner/command
- Severity triage, mitigation, customer/comms, and postmortem are in scope

## Method

**Command → mitigate → communicate → learn.** Depth:
[references/full-standard.md](references/full-standard.md).
Records: [active-incident-record.schema.json](references/active-incident-record.schema.json),
[postmortem-record.schema.json](references/postmortem-record.schema.json).

### 1. Frame
- Impact, severity, command owner, next decision time
- Customer-visible vs internal-only harm

### 2. Research
- Current blast radius, recent deploys/changes, health signals
- Stop when more reading will not change mitigation

### 3. Admit work
- **In:** mitigation, comms, evidence capture, postmortem obligations
- **Out:** unrelated refactors; silent “wait and see” without command

### 4. Implement
- Mitigate with smallest safe action; fence shared effects
- Honest status (no fabricated green)
- Capture timeline/evidence for postmortem

### 5. Deliver / verify
- Harm reduced or contained with evidence
- Comms match reality
- Postmortem/learning path owned if required

## Cycle done

Incident slice done when command, mitigation state, and next decision are
explicit; residual risk is named; learning artifact is scheduled or completed
when the framed bar requires it.

## Soft composition

- `evidence-and-claims-standard` — claim grades
- `delivery-standard` — no false live/deploy claims
- `execute-hard-cutover` — only if mitigation is a true cutover

## Boundaries

- Does not grant deploy or credential capabilities.
- Does not invent CI/deploy authority when tools are missing.
