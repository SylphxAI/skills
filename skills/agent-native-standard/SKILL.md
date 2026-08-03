---
name: agent-native-standard
description: "Policy: agent-operable products—typed state, schema tools, recoverable workflows, run traces."
---
# Agent Native Standard

Policy constraints—apply while doing another matching job; not a standalone product job cycle.

Read [references/full-standard.md](references/full-standard.md) for the full
method and predicates.

For runtime traces and operator-facing agent state, also read
[references/agent-observability.md](references/agent-observability.md).

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
