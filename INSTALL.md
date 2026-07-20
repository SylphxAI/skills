# Install for agents

This file is addressed to the agent that received this repository with a short
request such as **“install this into your current agent runtime.”** Own the
installation outcome. Do not turn the repository's internal commands into work
for the user.

The words “current agent runtime” distinguish this repository-level outcome
from installing one or more independent Skills and explicitly fence the target
to the receiving runtime. A generic Skill installer that only copies
`skills/*` is not completion; installing every detected runtime also exceeds
scope. Read and follow this contract even when the client initially routes the
request through a built-in Skill installer.

## Required outcome

Install or update the complete Sylphx-managed Skill catalog and compact runtime
constitution for the agent runtime receiving this request. When the environment
explicitly declares a Sylphx Control Plane remote MCP deployment, validate and
enroll that integration through the runtime's native HTTPS/OAuth surface.
Configure other supported runtimes only when the user explicitly asks for them.
Preserve unrelated instructions, Skills, configuration, and data. Finish with
effective readback, not a folder-count claim.

## Procedure

1. Resolve the supplied locator to an exact commit of the canonical public
   repository `https://github.com/SylphxAI/skills`. This file is the
   self-contained operational contract; consult other repository documents or
   runtime help only when needed to resolve a conflict or capability boundary.
2. Identify the current runtime and its native home. Honor its native home
   environment variable and `SYLPHX_SKILLS_HOME` when set. Do not scan or
   mutate unrelated users or runtime homes. Never infer success from another
   home or a previously loaded context.
3. Use the repository-owned runtime adapter because it applies the complete
   catalog as one verified managed generation, preserves third-party Skills,
   and safely reconciles a marked constitution block without replacing
   unrelated instructions. Invoke its quiet `install` operation for the current
   runtime from the exact checkout. Bind the resolved commit through
   `SYLPHX_SKILLS_COMMIT_SHA` when the execution mechanism strips Git metadata.
   The user does not run it. An older Sylphx installation may still project its
   constitution from the retired Doctrine runtime. The adapter reports that as
   a typed migration and replaces only an exact, structurally recognized
   per-user legacy link or Claude import with a regular managed instruction
   file. It preserves local notes and leaves the retired target untouched.
   Owner and permission bits are also fenced where the operating system exposes
   authoritative POSIX metadata. Arbitrary links, imports, unsafe metadata, or
   content remain fail-closed.
   Do not substitute a per-Skill download loop for this operation. Presence of
   all `SKILL.md` files without the managed manifest and current constitution is
   a typed partial installation, not success.
4. If that adapter cannot execute, use the runtime's documented native Skill
   installation and persistent-instruction mechanisms to achieve the same
   result. Do not invent unsupported files, silently overwrite instructions,
   copy credentials, install hooks, or weaken host policy. A runtime that cannot
   persist one of the required surfaces is `partial`, not complete.
5. Run machine-readable status from the exact installed candidate. Every
   explicitly in-scope runtime must report the complete catalog current and its
   managed constitution installed and current. Re-run installation once and
   verify that generation identity, manifest timestamp, and instruction bytes
   did not change. A missing or different `sourceCommit` is not complete.
6. Verify behavior in a fresh context or the runtime's closest supported
   readback boundary. The new context must identify `SylphxAI/skills` as static
   instruction source, distinguish product Git truth from Control Plane live
   work, claim work rather than files, resolve the active delivery lane, and
   separate source, admission, landing, deployment, and live proof. An active
   context that predates installation is not evidence.
7. Resolve the optional live integration separately from static installation:
   - Treat an existing remote MCP entry or `SYLPHX_CONTROL_PLANE_MCP_URL` as a
     deployment declaration. The URL is not a credential. Do not infer a URL
     from a repository name, retired stdio adapter, historical hostname, tenant,
     or company default.
   - Validate the endpoint with the repository adapter's `integration discover`
     operation. It must use HTTPS (except loopback evaluation), expose RFC 9728
     protected-resource metadata, bind the exact `/api/mcp` resource, advertise
     the required Control Plane scopes, and declare streamable HTTP transport.
     Discovery follows no redirects and sends no credential.
   - If discovery is `ready_for_enrollment`, use the adapter's `integration
     enroll` operation for the current runtime. It delegates configuration to
     the runtime's native MCP command and never writes an authorization header.
     Preserve unrelated MCP entries and do not delete a legacy adapter unless
     its ownership and replacement are both proven.
   - Complete the runtime's native OAuth flow when it supports one. The agent
     starts and owns the flow; the user may approve identity-provider consent
     but must not be asked to type an installation command or paste a token.
     Never substitute an MCP session id, Work claim, static header, or copied
     bearer token for OAuth.
   - Verify the integration in a new context: the server initializes over
     remote HTTPS, its instructions load, authenticated `tools/list` succeeds,
     and the expected Work tools are visible. Do not mutate Work merely to prove
     connectivity. A declared integration that cannot authenticate is `partial`.
     If the runtime has no safe OAuth capability, report that capability gap
     instead of persisting a bearer token. With no deployment declaration, the
     integration disposition is `not_applicable` and static installation may
     still be complete.

## Boundaries

- Do not ask the user to paste or execute a shell command.
- If the runtime protects its own home, request the runtime's normal write
  authorization or report that capability as blocked. Do not offer a shell
  command as the completion path.
- Do not use or repair package-manager caches with privileged commands.
- Do not enable scheduled synchronization unless the request includes managed
  updates or the existing environment already selected it. A one-time install
  remains complete for the exact installed candidate.
- Do not copy, request, mint, print, or persist credentials; infer deployment
  endpoints; configure deployment access, hooks, or model overrides; or embed a
  company/customer hostname in this public repository. An explicitly declared
  remote MCP URL may be metadata-validated and registered through the runtime's
  native configuration. OAuth consent and credentials remain owned by the
  runtime and identity provider.
- Do not load Doctrine, Mission Control, generated projections, or any retired
  repository as current instruction authority. A bounded installer migration
  may read the exact retired Doctrine projection solely to preserve local notes
  and remove that runtime dependency; it does not admit Doctrine as an
  authority.

## Completion response

Return `complete`, `partial`, or `blocked`; the exact repository commit; each
runtime's catalog and constitution readback; fresh-context verification; the
Control Plane integration disposition (`not_applicable`, authenticated, or a
typed gap); and any capability or authorization gap. Keep internal commands and
routine logs out of the user-facing response unless they are necessary to
diagnose a typed failure. Never end by offering installation commands to the
user.
