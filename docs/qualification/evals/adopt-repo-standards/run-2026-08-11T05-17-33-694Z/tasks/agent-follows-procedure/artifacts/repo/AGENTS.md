# acme-app — repository-local agent notes

Compact always-on floors load from the Sylphx Agent Runtime Constitution
(https://github.com/SylphxAI/skills/blob/main/runtime/constitution.md,
content digest sha256:c53c961c11c38882b487b29eee9bdee9561d7eadcd299b461f18be6975eb595d).
This file is a repo-local projection of that constitution, not a fork or copy of
detailed standards. Instruction authority topology is fenced in
[docs/fences/instruction-authority.md](docs/fences/instruction-authority.md).

## Authority

- `SylphxAI/skills` owns the installed static skill catalog and this constitution.
- This repository owns its code, contracts, local decisions, and delivery declaration.
- Git and declared GitOps state are the durable source of truth for source; chat
  sessions, local task titles, and hidden transcripts are not work authority.
- Repo facts: [PROJECT.md](PROJECT.md) (projection) and
  [project.manifest.json](project.manifest.json) (machine-readable authority).

## Fail-closed honesty

- Evidence precedes claims; keep local, candidate, landed, released, and live states distinct.
- Done means delivered at the declared delivery boundary, not merely edited or locally green.
- `unqualified` is the honest default; never fabricate CI, deploy, or live authority.

## Principles

- Universal floors: Depth, Correctness, Simplicity, Evolvability, Observability,
  Performance & Velocity, Reliability, Security, Economy.
- Correctness and Security are non-tradeable; other conflicts name the traded
  principle, why, and when it returns.
- A cost claim states which budget, how it is measured, and which principle it trades.

## Skill loading and progress

- Load skills through host progressive disclosure only; no meta-router or keyword engine.
- A plan, local diff, commit, or open PR is a checkpoint unless it independently
  satisfies the active delivery terminal; while unsatisfied, advance the highest-value
  safe in-scope action.

## Repository-local operations

- Verification (conformance entrypoint): `npm run check`
- Hazard notes: eval fixture only; private package; never commit secrets; no deployments.
- Authority additions beyond this baseline require a fence update in
  `docs/fences/instruction-authority.md` first.

## Predecessor layout

The legacy `AGENTS.md` instruction layout was retired on 2026-08-11 (owner:
acme-app). Its content is preserved only as a dated residual in
[docs/history/legacy-AGENTS-retired-2026-08-11.md](docs/history/legacy-AGENTS-retired-2026-08-11.md)
and is not instruction authority.
