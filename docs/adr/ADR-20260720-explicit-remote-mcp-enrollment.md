---
status: accepted
date: 2026-07-20
owners:
  - SylphxAI
---

# ADR-20260720: Enroll remote Control Plane only from an explicit deployment declaration

## Context

Static working methods and live work coordination have different owners.
`SylphxAI/skills` can install public instructions, while a deployed Control
Plane owns tenant-scoped Work, claims, runs, evidence, and effects. A useful
agent environment may need both from the same `install this` request, but the
public repository cannot safely guess a deployment hostname, tenant, identity
provider, or credential.

Historical local stdio adapters are not evidence of the canonical remote
deployment. Copying a bearer token into runtime configuration would also turn a
public installer into a credential broker and would bypass OAuth lifecycle,
audience, scope, and revocation controls.

## Decision

1. Control Plane integration is applicable only when the current environment
   exposes an existing remote entry or the non-secret
   `SYLPHX_CONTROL_PLANE_MCP_URL` declaration. Absence is `not_applicable`, not
   an instruction-installation failure.
2. The canonical endpoint is remote HTTPS `/api/mcp`. HTTP is accepted only on
   loopback for isolated evaluation. Userinfo, query strings, fragments,
   redirects, historical hostnames, repository-derived hosts, and implicit
   company defaults are rejected.
3. Before changing runtime configuration, fetch the origin's RFC 9728
   `/.well-known/oauth-protected-resource` document without credentials. It
   must bind the exact MCP resource and endpoint, declare at least observe,
   propose, claim, checkpoint, and evidence scopes, name one or more safe HTTPS
   authorization servers, and declare streamable HTTP transport.
4. Registration delegates to the current runtime's native MCP command at user
   scope and preserves unrelated entries. The adapter passes only the verified
   endpoint and OAuth resource; it never passes headers, tokens, client
   secrets, or customer identifiers.
5. Codex and Claude Code continue through their native OAuth login command;
   Grok starts its native browser authorization flow when the remote server
   connects. Identity consent may require user approval, but the agent owns
   initiation and never asks the user to type an installation command or paste
   a token. A runtime without a safe native OAuth flow remains a typed
   integration gap; static bearer headers are not a fallback.
6. Integration completion requires a fresh context that initializes the remote
   server, loads its instructions, and obtains an authenticated tool catalog.
   Connectivity does not require creating or mutating a Work item.
7. Legacy stdio or differently named entries are not deleted automatically.
   Removal requires separate ownership proof and verified remote replacement.

## Consequences

- One prompt can install static methods and enroll an explicitly provided live
  authority without conflating their ownership.
- Public distribution remains tenant-neutral and credential-free.
- Dead or spoofed endpoints fail before runtime configuration is changed.
- OAuth support differences stay visible instead of being hidden by insecure
  long-lived tokens.
- A Control Plane deployment must publish correct protected-resource metadata
  and inject or otherwise declare its public endpoint to managed agents.

## Verification

- Unit-test URL, redirect, metadata, resource, scope, authorization-server,
  transport, runtime-command, no-secret, and native-command failure boundaries.
- Exercise enrollment against an isolated RFC 9728 fixture for every supported
  runtime.
- Run authenticated fresh-context discovery against a deployed Control Plane
  before claiming a specific deployment or organization is adopted.
