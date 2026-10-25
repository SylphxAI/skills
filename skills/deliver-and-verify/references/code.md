# Code conventions

Trigger: writing or changing code, tests, or migrations.

Goal: code whose behavior is visible in the code, whose failures are typed, and
whose tests fail when behavior is wrong. Each capability has one implementation
and one authority; less code is better code.

## Hard lines

- Nobody inserts, edits, or deletes a migration-ledger row by hand (no
  hand-written `INSERT` into `atlas_schema_revisions`, no `atlas migrate set`,
  no `--baseline` of unverified objects). The ledger records only what ran, and
  a forged row hides a missing object: on 2026-09-16 a hand-recorded, never-run
  revision failed a title's purchases for 11 days. Fix a missing or wrong
  object with a new idempotent migration.
- A migration does not make the serving revision unready (see Migrations).

## Types, control flow, and failures

- Parse untrusted input into a typed domain value at ingress. Wrap identity,
  money, quantities, and units in dedicated types.
- Model lifecycle state as enum variants and match exhaustively, so a new state
  fails compilation at every decision point.
- Return expected failures as typed values, translated exhaustively at edges.
- Pass dependencies explicitly. Reflection, runtime DI containers, and runtime
  proxies hide control flow.
- Write queries, transactions, and mutations explicitly so each round-trip and
  lock lifetime is visible.
- Derive clients and reference models by generation where that prevents drift.

## Transactions and idempotency

A transaction supplies atomicity for invariants; an idempotency key supplies
replay safety for any retryable command. Enforce uniqueness and guards at the
authority itself. Retry the whole read-decide-write attempt on a serialization
or optimistic conflict, and bound every lock, wait, batch, queue, and pool with
a timeout. When a committed fact must cross a boundary, write the state change
and its publication record in one transaction, and make the consumer
duplicate-safe.

A durable step's terminal failure is stored state, and replay re-raises it: it
never becomes a success and never silently re-runs. A failure returned as an
ordinary value would be memoized as a success (found in production coding agents,
2026-09-21), so cross the durable boundary with a raised or terminal-typed
failure, and test that replay reproduces it.

## Migrations

Choose one final representation and one authority. An additive change needs no
backfill. When existing data must change, transform it with semantic
validation in bounded, resumable batches. Where serving must continue: expand,
switch readers and writers in a declared order, backfill, retire old
consumers, remove the predecessor, so one writer decides each fact.

A schema change is expand, then contract. The expand step keeps the running
revision working; the contract step, which removes what an older revision still
reads, marks itself as a contract and runs only after that revision is gone.
Readiness checks that the schema is compatible with the service, not that it is
the newest head. After every apply the Release checks the live schema against
what the migrations declare and fails on a missing object (post-apply schema
diff), because the ledger alone is not proof.

A migration carries schema only. It never carries data or one deployment's
operational state: a record, a backfill, a tenant plan status, a token, an
environment's policy row, a deployed version, or a flag. Change that state live, through
the product's operator API or CLI where one exists, otherwise with one direct
write under a dedicated operator role. Read the rows before and after, and
note the statement and the reason on the item. The target is an
authorized, audited operator API and CLI for every such change; a direct write
is a workaround used while that API is missing, never a reason to wait. Each
workaround is tracked until the API replaces it and is then cleaned up. The
hard line above (no hand-written ledger rows) and
objects a reconciler owns (write those through their owner) stay unchanged.
This direct-write allowance applies only to app-owned data, never
platform-managed objects or control-plane recovery. Products never use this
allowance to work around our own engines; the engine owner fixes the gap
upstream first. Platform recovery follows the
[recovery procedure](security.md#recovery-procedure) on the same customer path.

## Tests

Pick the smallest test that fails when behavior is wrong: examples for finite
decisions, properties for large or conserved state, fuzz for untrusted parsers,
differential tests for two implementations or migration paths (deleted with the
predecessor), and deterministic simulation when concurrency, retry, or time
matter. Reproduce a defect first, then run the same test on the fix.

- A test calls the code; it does not read it. Asserting on the text of a
  source, doc, or workflow file passes while behavior is broken and fails on a
  harmless rename. Express a structural rule as a lint or boundary rule
  (clippy `disallowed_methods`, `cargo-deny`, the engine's module boundary
  rule, or a query over the source tree) and delete the text test. A check
  that compares a documentation table with the values the code exports is a
  real drift guard and stays.
- Skip tautologies, constant-equals-literal pins, and tests that re-implement
  the logic they check.
- A test that needs a database or other resource fails in CI when it is
  missing; a silent skip hides the gap.
- CI selects tests with one selector (nextest filters, a glob), not a
  hand-kept list. An **ignored test is not a skipped test**: every `#[ignore]`
  test (and its equivalent in another runner) runs in a separate test group: CI runs
  it on any change that touches it and a scheduled run re-runs it daily, so the
  ignore only moves it out of the fast gate; the test names its reason and the
  test group in a comment beside the attribute. A test with no group is deleted,
  because an ignored test with nowhere to run is a check that passes by not
  existing.
- A query against the schema is verified by the compiler, not discovered in
  production: the database build (a migrated schema or a live database in CI)
  is available at compile time, and a query naming a missing table or column
  fails the build. Runtime string-built SQL is not exempt; it is either
  generated from the schema, checked the same way, or refused.
- Repeated setup becomes a fixture builder; repeated cases become a table.
- A test of a shipped artifact runs against the artifact, inside the built
  image, with a negative control that fails against the old build. Keep the
  script in a file and pipe it in (`docker run -i --entrypoint /bin/sh <image>
  -s < test.sh`): in dash, closing a `$( )` on the same line as the heredoc
  operator makes it run the body as top-level commands on the runner (seen as
  `/docker-entrypoint.sh: not found`, exit 127). Runner tools differ from the
  image's (mawk has no POSIX character classes), so match fixed-format lines by
  fields.

## Less code

[health.md](../../refactor/references/health.md) owns reachability and one implementation: delete code no
production path reaches, and keep one implementation. A test reference does not
keep code alive, and Git history is the archive. Generator output is regenerated
in CI or not committed. Committed logs, scratch
directories, archives, evidence dumps, and build output are removed; a claim
links to its pull request, CI run, or production check.

## Outbound calls

- Every client has a connect and a total timeout; a default-constructed client
  (`reqwest::Client::new()`, a bare `fetch`) on a server path is a defect.
- No network call while holding a database transaction, advisory lock, or
  mutex: claim with a leased row, commit, call, then settle.
- A key-set or token cache reads without a lock, refreshes once in the
  background, and serves the stale value when a refresh fails.
- A list or batch path loads related rows with one set-based query
  (`= ANY($1)`, a join, `unnest`), not one per row.
- One HTTP client per language and product carries the timeouts, retry policy,
  and redaction.

## Review

Review asks what could go wrong with this change and which check, automated or
human, is the right one to catch it; whether a person read the code is not the
question. The layers stack on purpose — each imperfect, the holes not aligned —
and the last layer is fast detection and fast rollback, which is what keeps the
earlier layers from blocking (Anthropic's Claude Code review practice, read
2026-10-18; adapted, not copied). The steps of a review are a method and live in
the review skills; this section owns how review is judged.

- The change sets the review tier, not the author.
- Our incidents and reverts are the reviewer's eval: a confirmed defect with its
  fix-forward joins the set, and any change to how review happens is scored
  against all of it. Noise is measured by what authors do with findings (fixed,
  wrong, intentional, irrelevant) and by runs on changes known to be clean.
- The guardrail numbers are revert and incident rates beside reviews-to-pass and
  wait-on-person time. If reverts rise, time was moved, not saved.

## How it is judged

CI's lint and boundary checks, a test that fails against the pre-fix code, the
post-apply schema diff, and [health.md](../../refactor/references/health.md)'s dead-code and duplication
signals. For review itself: the guardrail numbers above, and the reviewer eval
set.
