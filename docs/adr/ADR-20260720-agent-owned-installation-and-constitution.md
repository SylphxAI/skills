---
status: accepted
date: 2026-07-20
owners:
  - SylphxAI
---

# ADR-20260720: Make installation an agent-owned outcome

## Context

The original distribution interface exposed package-manager and runtime
commands to the user. That is deterministic for an operator but is not an
agent-native adoption contract: users must choose a target, interpret failures,
and cannot know whether a newly started agent actually loaded the instructions.
Local folder counts also produce false positives when an existing environment
already contains Skills or persistent prompts.

The public repository can safely distribute static instructions. It cannot
grant model access, credentials, remote MCP authority, deployment permissions,
or product state. Those capabilities have separate authenticated owners.

## Decision

1. The public installation interface is the repository locator plus a short
   intent such as `install this`. The receiving agent owns environment
   discovery, execution, recovery, and verification. It must not turn internal
   commands into user work.
2. `INSTALL.md` is the portable installation contract. The repository-owned
   Node adapter remains the preferred deterministic mechanism, not the user
   interface. Native runtime installation may be used only when it proves the
   same outcome.
3. A native installation includes both the complete content-verified Skill
   generation and the compact constitution in that runtime's persistent
   instruction file. The constitution is repository-authored, digest-bound,
   marker-owned, and reconciled without replacing unrelated instructions.
4. Installation preserves unrelated Skills, prompts, settings, and data. It
   fails closed on symbolic links, malformed ownership markers, concurrent
   changes, unsupported persistence, or unsafe permission repair.
5. Completion requires machine-readable exact-candidate status, an idempotent
   second reconciliation, and a fresh-context behavior check. A context loaded
   before installation is not evidence. Source availability, bytes on disk,
   runtime loading, and workflow behavior are separate claims.
6. Scheduled updates remain opt-in. A one-time install is complete for its
   exact source candidate; it does not silently create hooks or background
   work.
7. This public repository does not copy, request, mint, or persist credentials,
   infer deployment endpoints, or configure deployment access, model overrides,
   or product hooks. An explicitly declared remote MCP URL may be validated and
   registered through a runtime's native configuration under
   [ADR-20260720](ADR-20260720-explicit-remote-mcp-enrollment.md). OAuth consent
   and credentials remain owned by the runtime and identity provider.
8. Behavioral evaluation uses a clean runtime home with no prior Skills,
   constitution, memory, checkout, or user configuration. Authentication uses
   an isolated test identity or runtime-native short-lived/device flow. A
   personal long-lived credential must not be baked into an image or exposed
   to the evaluated agent.

## Consequences

- The shortest supported user experience is one prompt containing the public
  repository URL.
- Runtime-specific complexity stays discoverable by agents and deterministic
  automation rather than becoming human ceremony.
- Existing developer machines cannot prove cold-start adoption; exact-source
  isolated evaluations remain external evidence and do not add model outputs
  or credentials to this repository.
- MCP and OAuth onboarding can evolve independently without turning a public
  instruction repository into an authorization authority.

## Verification

- Unit-test install, update, idempotency, malformed ownership, unrelated-file
  preservation, status, and clear behavior for every supported target.
- Validate catalog and package bytes with the repository integrity suite.
- Package the public artifact and prove that `INSTALL.md`, the adapter, the
  constitution, and all Skills are present.
- Run fresh-context black-box installation and workflow-adoption checks for
  each authenticated supported runtime. Report unavailable authentication as a
  typed gap rather than borrowing hidden local state.
