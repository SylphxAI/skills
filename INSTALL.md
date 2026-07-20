# Install for agents

This file is addressed to the agent that received this repository with a short
request such as **“install this.”** Own the installation outcome. Do not turn
the repository's internal commands into work for the user.

## Required outcome

Install or update the complete Sylphx-managed Skill catalog and compact runtime
constitution for the agent runtime receiving this request. Configure other
supported runtimes only when the user explicitly asks for them. Preserve
unrelated instructions, Skills, configuration, and data. Finish with effective
readback, not a folder-count claim.

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
   The user does not run it.
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

## Boundaries

- Do not ask the user to paste or execute a shell command.
- If the runtime protects its own home, request the runtime's normal write
  authorization or report that capability as blocked. Do not offer a shell
  command as the completion path.
- Do not use or repair package-manager caches with privileged commands.
- Do not enable scheduled synchronization unless the request includes managed
  updates or the existing environment already selected it. A one-time install
  remains complete for the exact installed candidate.
- Do not configure credentials, remote MCP servers, deployment access, hooks,
  or model overrides from this public repository. Those are runtime or product
  integrations with their own authenticated authority. Preserve and verify an
  existing integration when available; otherwise report it separately.
- Do not load Doctrine, Mission Control, generated projections, or any retired
  repository as current instruction authority.

## Completion response

Return `complete`, `partial`, or `blocked`; the exact repository commit; each
runtime's catalog and constitution readback; fresh-context verification; and
any capability or authorization gap. Keep internal commands and routine logs
out of the user-facing response unless they are necessary to diagnose a typed
failure. Never end by offering installation commands to the user.
