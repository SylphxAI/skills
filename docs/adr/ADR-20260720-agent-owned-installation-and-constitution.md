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

1. The public installation interface is the repository locator plus the short
   intent `install this`. Root `SKILL.md` is a non-catalog discovery bootstrap
   for clients that pre-route repository installation through a generic Skill
   installer. It points to `INSTALL.md` and carries no independent installation
   semantics. The receiving agent owns runtime discovery, execution, recovery,
   and verification, and may not configure another detected runtime unless the
   user explicitly includes it.
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
   changes, unsupported persistence, or unsafe permission repair. The sole
   symlink/import migration exception is an exact per-user retired Doctrine
   projection whose path, legacy Sylphx constitution shape, size, and content
   snapshot all validate. POSIX ownership and permission bits are additionally
   fenced where the host exposes authoritative metadata; Windows ACLs are not
   misclassified through synthetic POSIX mode bits. The adapter replaces only the
   runtime instruction entry with a regular managed file, preserves local
   notes, leaves the retired target untouched, and reports the pre-install
   state as `retired_doctrine_projection`. Unknown legacy shapes fail closed.
5. Completion requires machine-readable exact-candidate status, an idempotent
   second reconciliation, and a fresh-context behavior check. A context loaded
   before installation is not evidence. Source availability, bytes on disk,
   runtime loading, and workflow behavior are separate claims.
6. AutoSync is a required installation surface. The receiving runtime is added
   to a ten-minute OS-scheduled reconciliation set backed by the canonical
   public repository. Existing explicitly selected runtimes remain selected;
   runtime discovery never expands or shrinks that set. Offline clients keep a
   verified last-known-good generation. A one-shot static copy is partial, not
   a complete Sylphx installation.
7. The canonical Enact MCP resource is the stable Sylphx SaaS endpoint
   `https://enact.sylphx.com/api/mcp`. The public hostname is product identity and
   service discovery, not a credential, tenant grant, or authorization secret.
   Every installation validates its RFC 9728 metadata and registers it through
   the receiving runtime's native remote-MCP configuration. An override exists
   only for controlled staging and isolated evaluation; there is no alternative
   self-hosted production topology. OAuth account, tenant, scopes, expiry, and
   revocation remain owned by the runtime, identity provider, and Enact.
   The repository never copies, requests, mints, prints, or persists a bearer
   token or client secret. Product naming and endpoint identity follow
   `SylphxAI/enact:docs/adr/ADR-0043-sylphx-enact-product-identity-cutover.md`.
8. Behavioral evaluation uses a clean runtime home with no prior Skills,
   constitution, memory, checkout, or user configuration. Authentication uses
   an isolated test identity or runtime-native short-lived/device flow. A
   personal long-lived credential must not be baked into an image or exposed
   to the evaluated agent.
9. The always-on constitution names Doctrine and Mission Control as retired
   historical lineage. They cannot be inferred or selected as current static or
   live authority merely because old files, imports, aliases, or memories remain
   reachable during convergence.
10. A generic installer result containing every `SKILL.md` but no managed
    source manifest and current compact constitution is a typed partial, never
    completion. External clean-runtime evaluation must include the exact public
    prompt because deterministic adapter tests cannot prove client routing.
11. The root bootstrap is a packaging adapter, not a 106th managed Skill. It is
    shipped in the public artifact, excluded from `catalog.json`, and forbidden
    from duplicating the installation contract. Its only job is to make the
    repository root self-describing to native Skill installers.
12. Before mutation, the agent binds the supplied canonical repository to an
    exact commit and executes only the adapter inside that checkout. A cached,
    path-discovered, temporary, historical, previously managed, or unrelated
    checkout is not a fallback authority. Native `install`, `sync`, `clear`,
    and scheduled-update enablement require an explicit runtime selector;
    custom sync and clear require an explicit destination. Runtime detection is
    read-only evidence and never expands a persisted selection. The command
    with no operation is read-only help. Runtime scope and default-command
    behavior are executable fail-closed boundaries, not prompt-only guidance;
    exact locator binding is additionally checked by source/readback evidence.

## Consequences

- The shortest supported user experience is one prompt containing the public
  repository URL and the intent “install this.”
- Runtime-specific complexity stays discoverable by agents and deterministic
  automation rather than becoming human ceremony.
- Existing developer machines cannot prove cold-start adoption; exact-source
  isolated evaluations remain external evidence and do not add model outputs
  or credentials to this repository.
- Public distribution remains the Sylphx product client rather than becoming a
  vendor-neutral framework: every user reaches the same SaaS resource, while
  OAuth remains the authorization boundary.
- Every completed install has a bounded-freshness update path; instruction
  drift is not deferred to a later manual prompt.
- Existing Sylphx developer homes converge away from the retired Doctrine
  runtime without granting the installer generic symlink-following authority.
- An agent cannot accidentally update another runtime merely because that
  runtime is installed or because a stale checkout remains discoverable.

## Verification

- Unit-test install, required AutoSync, additive runtime selection, update,
  idempotency, malformed ownership, unrelated-file
  preservation, status, clear behavior, bounded retired-projection migration,
  arbitrary-link rejection, and concurrent-target-change fencing for every
  supported target.
- Validate catalog and package bytes with the repository integrity suite.
- Package the public artifact and prove that `INSTALL.md`, the adapter, the
  constitution, and all Skills are present.
- Run fresh-context black-box installation and workflow-adoption checks for
  each authenticated supported runtime. Verify the canonical MCP resource and
  AutoSync readback. Report unavailable authentication as a typed gap rather
  than borrowing hidden local state.
