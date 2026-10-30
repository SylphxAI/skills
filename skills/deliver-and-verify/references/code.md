# Code conventions

Trigger: writing or changing code, tests or migrations.

Make behavior, authority and failure handling visible. Keep one authority for each domain fact; derive clients and models where generation prevents drift.

## Types and boundaries

- Parse untrusted input into typed domain values at ingress. Give identity, money, quantities and units explicit types.
- Model lifecycle states explicitly and handle them exhaustively. Return expected failures as typed values and translate them at the boundary.
- Pass dependencies explicitly. Keep deterministic decisions and calculations in a pure domain core; place database, HTTP, clock and other I/O in adapters.
- Keep queries, mutations, round-trips and lock lifetimes visible. Organize by capability rather than collecting unrelated helpers into technical-layer folders.

## Transactions and idempotency

Use transactions for atomic invariants and authority-side uniqueness/guards for retryable commands. An idempotency key identifies the logical operation. Retry a serialization or optimistic conflict as a whole read-decide-write attempt.

Bound resource use and waits according to the operation's cancellation and recovery contract: capacity, batch size, deadline or durable pending state solve different needs. When a committed fact must cross a boundary, write its publication record with the state change and make consumers duplicate-safe.

For durable execution, represent terminal failure through the framework's documented mechanism and test replay. A returned error value and a raised exception can have different persistence semantics; neither is universally correct across frameworks.

## Migrations

Keep migration history truthful: do not record an unverified migration as applied. Follow the repository's supported migration-history procedure; a missing schema object is repaired through the owning migration mechanism.

Choose one final representation and authority. An additive schema change may need no backfill; when existing data must change, transform it in bounded, resumable batches with semantic validation. Where serving continues, expand compatibly, switch readers/writers in a declared order, backfill, retire old consumers and remove the predecessor. Contract changes run after revisions that still need the removed representation are gone.

Readiness checks compatibility with the serving revision rather than demanding the newest schema head. Verify live schema after applying a change; the migration ledger alone does not establish that the intended objects exist.

Keep schema migrations separate from deployment-specific state and record updates. Use the owning product's supported API/CLI. Where an authorized app-owned state change has no method, a dedicated write role with before/after reads can be the documented operational route; it does not authorize changing migration-ledger rows or bypassing a reconciler or owned platform boundary. Record the reason and replace a temporary route with the proper API when needed. Use the [recovery procedure](security.md#recovery-procedure) for restoration.

## Tests

Choose the smallest test that fails on the defect: examples for finite decisions, properties for broad/conserved state, fuzzing for parsers, differential checks for two implementations and deterministic simulation for concurrency, retry or time. Run a regression against the pre-fix and fixed behavior where practical.

Test runtime behavior by calling it. For a declarative/source contract, use a parser, lint or boundary check suited to that contract. Documentation/code drift checks are useful; exact wording pins and tests that reimplement the same logic are weak signals.

A required resource-dependent check fails clearly when the resource is unavailable rather than silently passing. Test selection covers supported configurations. An intentionally excluded or slow test records its reason and a supported execution route; choose scheduling from the workload rather than requiring a daily job or deleting useful coverage when no group exists.

Check SQL against the migrated schema through compiler support where available, generated contracts or database-backed tests for dynamic queries. Share cohesive fixtures and table-driven cases where that improves readability.

Test a distributed artifact in its built environment, including a control that distinguishes the old behavior where applicable. Keep shell scripts in files and feed them to the container, for example `docker run -i --entrypoint /bin/sh <image> -s < test.sh`. This avoids shell-specific heredoc/command-substitution parsing. Verify the actual runner/image tool capabilities when they matter; `mawk` supports POSIX character classes.

## Outbound calls

- Give each remote operation an effective deadline/cancellation policy, configured on the client or request. Reuse clients by connection and security configuration and share retry/redaction policy.
- Avoid holding a database transaction or lock across an external call. Prefer claiming work, committing, calling and then settling when that preserves the invariant.
- Refresh key/token caches without blocking every reader. A refresh failure does not extend a credential's validity or revocation contract.
- Load related rows in set-based queries on a growing list/batch path rather than one query per row.

## Cleanup and review

Use [repository health](../../refactor/references/health.md) to verify unused paths and duplicate authorities before deletion. Keep generated distribution sources reproducible when supported consumers need them; remove scratch output and evidence dumps from source, and link claims to their authoritative result.

Review the failure modes and checks relevant to the change through [prove-it](../../prove-it/SKILL.md). Track throughput and review latency alongside incident/revert rates on a named population and window. A metric change is a signal to investigate, not by itself proof of causation.
