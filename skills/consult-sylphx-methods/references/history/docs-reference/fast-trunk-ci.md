# Agent-Native Queued Trunk CI

> Supersedes the historical "Fast Trunk CI" note. Ordinary integration is
> **PR + Merge Queue** per
> [ADR-20260803-agent-native-queued-trunk](../adr/ADR-20260803-agent-native-queued-trunk.md).
> Keep this filename as a stable reference path; do not reintroduce Direct Trunk
> as the ordinary agent path.

## Authority split

| Concern | Owner |
| --- | --- |
| Work / attempt identity | Git branch + GitHub PR (one complete outcome) |
| Source history | Git |
| Candidate feedback | PR head CI (`pull_request` / latest-wins cancellation) |
| Source admission | Merge Queue CI (`merge_group`) + branch rules |
| Production artifact build | Sylphx Platform (after landed main tip; once per landed unit) |
| Deploy / health / rollback | Sylphx Platform |

## Paths

- **Ordinary agents (all orgs):** short-lived branch → draft PR immediately →
  arbitrary commit frequency → ready when Work terminal complete → Merge Queue →
  squash merge → main always production-ready and green.
- **External contributors:** same PR path; no special DT lane.
- **Direct trunk:** break-glass only (explicit incident authority). Not ordinary.
- **Merge Queue:** required ordinary writer of main. Workflows must handle
  `merge_group` for required checks.

## Work boundary

```text
1 Work = 1 complete outcome = 1 branch = 1 PR
       = arbitrary phases/commits inside the PR
       = 1 Merge Queue candidate when ready
       = normally 1 main integration unit (squash)
```

Phases, checkpoints, and subtasks stay inside the PR. Do not open a PR per
phase. Do not merge incomplete outcomes.

## CI layers

| Layer | Trigger | Purpose |
| --- | --- | --- |
| **PR CI** | `pull_request` (and pushes to the PR branch) | Fast deterministic feedback on latest PR head; cancel obsolete same-PR runs |
| **Merge Queue CI** | `merge_group` | Authoritative integration against latest main + queue predecessors |
| **Main push** | `push` to default branch | Landed identity/readback, production build/deploy, narrow smoke — not a full re-run of Merge Queue source suite by default |

Blocking source checks: lint/typecheck, affected tests, schema/migration safety,
narrow security. Production Docker/release image builds belong to Platform after
land, not every PR branch commit.

## Runners

- **Self-hosted only** (`sylphx-linux-*`, `[self-hosted, sylphx, macos, …]`).
- GitHub-hosted `ubuntu-*` / `windows-*` / `macos-*` labels are forbidden.
- Thin Linux images intentionally omit language runtimes; workflows must call
  `actions/setup-node` / toolchain actions as needed.
- System native build deps for openssl-sys (`pkg-config`, `libssl-dev`) live on
  the runner image SSOT (`docker/runner`), not as per-repo apt workarounds.

## Auto-deploy

Main is always production-ready. Platform production environments use
`autoDeploy=true` with mode **`after_ci`**: build follows the landed tip;
deploy only when CI is green. Do not require waiting for full CI before the
build starts when Platform mode already builds on tip.

## Claim / worker systems

Not source admission. Do not gate Git landing on external claim/lease Work IDs.
Optional Work trackers may describe intent; Git/PR/MQ remain integration authority.
