---
name: incident-standard
description: "Apply the operational incident lifecycle: detection, severity, command state, mitigation, recovery verification, communication, and machine-checkable postmortem. Use when responding to or reviewing an active/recent service incident, or designing that incident lifecycle. Do not use for general proactive observability, resilience design, or an ordinary defect with no incident or customer/service impact."
---
# Incident Standard

**Requirement:** apply this standard when the task matches its scope.

Read [references/full-standard.md](references/full-standard.md) for the full
method and predicates.

Record schema: [references/postmortem-record.schema.json](references/postmortem-record.schema.json).

## Method

1. Read [references/full-standard.md](references/full-standard.md) for the full method and predicates.
2. Apply the strongest relevant subset; record material tradeoffs in ADR/tests as required.
3. Prefer schema/test/ADR homes over copying this body into product repos.


## Composition and output

Apply this standard as constraints on the artifact requested by the user or
owned by the primary procedure. Do not emit a separate per-standard compliance
report merely because this Skill was injected.

Integrate only material obligations, deviations, evidence, and gaps into the
primary artifact or final status. When conformance assessment is itself the
requested job, produce one standalone domain conformance record from this
standard.

## Boundaries

- Does not grant deploy, credential, or MCP capabilities.
- Does not replace product-local ADRs where those own decisions.

## When not to use

- Product-specific live coordination operations → the matching adapter Skill
  and that product's current API or tool schema.
- Unrelated commercial packaging alone → commercial-decision-standard when in scope.
