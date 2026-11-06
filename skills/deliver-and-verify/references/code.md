# Code conventions

Trigger: writing or changing code, tests, deployment configuration or migrations; changing recovery
references, rollback pins or asynchronous reconcilers.

Make behavior, authority and failure handling visible. Keep one authority for each domain fact; derive clients and models where generation prevents drift.

## Types and boundaries

- Parse untrusted input into typed domain values at ingress. Give identity, money, quantities and units explicit types.
- Model lifecycle states explicitly and handle them exhaustively. Return expected failures as typed values and translate them at the boundary.
- Pass dependencies explicitly. Keep deterministic decisions and calculations in a pure domain core; place database, HTTP, clock and other I/O in adapters.
- Keep queries, mutations, round-trips and lock lifetimes visible. Organize by capability rather than collecting unrelated helpers into technical-layer folders.

## Deployment configuration

For a shared runtime setting, render each supported deployment overlay or
release profile before changing live state. A base declaration does not prove
that a consumer receives it: replacement environment lists, arguments or
volume mounts can discard new shared entries. Assert the required effective
values and preserve intentional target-specific omissions; changing replacement
to merging can also import settings that belong only to another target.

Verify the rendered configuration reaches the deployed process, then exercise
the behavior that consumes it. **Wrong:** find a setting in the shared base and
assume every region inherits it. **Right:** test each assembled target, reproduce
the missing setting before the fix, and read back its live value and behavior.
The same check applies to a game-server profile overriding shared worker
settings. A prose-only edit needs no deployment rendering.

## Transactions and idempotency

Use transactions for atomic invariants and authority-side uniqueness/guards for retryable commands. An idempotency key identifies the logical operation. Retry a serialization or optimistic conflict as a whole read-decide-write attempt.

For a lock-order change, audit from every caller that owns the transaction,
including batches and helpers that acquire locks implicitly. A helper's local
order cannot undo an account or row lock its caller already holds. Reserve the
complete set of advisory or idempotency keys in a stable sorted order before
the dependent account and row locks; sorting each item separately can still
deadlock across a batch. Use the same account ordering in every path. If the
required key changes after reservation, roll back the logical operation and
retry from discovery rather than waiting for a new key while holding row locks.

When a nested helper accepts proof of a held lock, bind the proof to the key,
tenant and current transaction's live ownership. An opaque value alone can
outlive a commit or savepoint rollback that releases the lock. Test wrong-key,
foreign-transaction and released-lock proofs. Keep compound state changes
atomic when a later helper refuses; a caller must not accidentally commit an
earlier release or partial batch after receiving an error.

Prove a lock fix with concurrent connections through the actual entry points.
Use the database's wait graph, such as PostgreSQL `pg_blocking_pids`, to observe
which operation is blocked before releasing the competing transaction. A sleep
or eventual success alone does not prove the intended interleaving. Assert the
final conserved state and rollback behavior as well as completion. Apply this
audit to other transactional domains, such as stock reservation and cancellation;
a pure formatter change needs no lock-order proof.

Bound resource use and waits according to the operation's cancellation and recovery contract: capacity, batch size, deadline or durable pending state solve different needs. When a committed fact must cross a boundary, write its publication record with the state change and make consumers duplicate-safe.

For durable execution, represent terminal failure through the framework's documented mechanism and test replay. A returned error value and a raised exception can have different persistence semantics; neither is universally correct across frameworks.

Track failure cause separately from certainty about effects. Once a request may
have reached its worker, a lost connection, timeout or subsequent worker death
can explain the missing response without proving the command did not run.
Preserve the unknown outcome, typed cause and original idempotency key. Replay
or reconcile through the operation's supported contract without starting a
second logical operation. Classify a failure as a rejection before dispatch
only when dispatch was conclusively prevented. An authoritative terminal
receipt can resolve an unknown outcome.

Verify this boundary through the real transport: have the peer receive the
request, then close the connection before response headers. Assert the typed
cause, unknown effect and a single dispatch after replay. Include a confirmed
terminal result and a rejection before any send as controls. A mock returning
a prebuilt error cannot establish which side of dispatch the failure occurred.

With PgBouncer transaction pooling, a backend connection belongs to the client
only for one transaction. Do not rely on session `SET`, `LISTEN`, or
session-level advisory locks across transactions. Use transaction-local settings
and transaction-scoped locks where appropriate; route genuinely session-bound
work through a supported session or direct connection. Verify the deployed pool
mode, driver and prepared-statement configuration with concurrent database-backed
tests, not just a direct connection. Protocol-level prepared statements are not
the same as SQL `PREPARE`; support depends on the pool configuration
([PgBouncer feature map](https://www.pgbouncer.org/features.html), read 2026-11-05).

## Controller handover

When changing which controller owns a resource's generated children, inspect
the old controller's behavior after the parent changes. A controller that stops
reconciling may leave its children serving indefinitely; updating the parent
does not prove that the old routing, credentials or jobs have disappeared.
Inventory the children by authoritative ownership metadata and cover every
writer that can cause the handover, including adoption and no-op reconciliation.

For a populated serving resource, establish that the replacement carries the
required membership and readiness before retiring the predecessor. An empty
withdrawal may need immediate removal instead. Bound deletion to the intended
parent and old controller; use identity/version preconditions where supported
so a concurrent replacement is not deleted. Repeated reconciliation accepts
already-absent children and preserves children owned by the replacement.

Choose failure handling by the effect of leaving the old child. If it is optional
hygiene, report a scoped error and counter, continue unrelated realization, and
retry on normal reconciliation. If it continues exposing revoked access or
unsafe traffic, preserve the required withdrawal guarantee and report failure.
Account for permission and code rollout order rather than assuming both arrive
together.

**Wrong:** remove a parent selector and assume its former controller removes
all generated routes. **Right:** test the transition with old routes present,
prove replacement membership, and remove only the old controller's routes.
Also test delayed or partial replacement, deletion failure, repeated cleanup,
and a parent that still belongs to the old controller. A queue-worker handover
uses the same ownership and readiness checks for generated subscriptions; a
text-formatting change needs none of these cleanup controls.

## Recovery references and desired state

Keep three facts separate: a target exists according to the provider, desired
state selects that target, and observed state shows what is serving now.
Existence does not prove readiness; a stale serving observation does not cancel
a valid pending rollback. Read the provider's validation and convergence
contract before choosing target selection and write order.

- Validate every recovery, retention or warm-up target before adding or
  preserving its reference. A provider can validate zero-weight or inactive
  entries and reject the whole resource when one target is missing. A stored
  name or desired version alone does not prove existence. Treat a failed lookup
  as unknown, rather than missing, and use the supported retry/error path.
- When an optional recovery target is absent, fall back only to an actual
  serving target confirmed by provider observation and existence checks, or
  omit the optional reference with a reason. Do not invent a target or silently
  substitute a fallback for desired rollout or rollback intent. A required
  target's absence is an explicit failure to resolve.
- Preserve a valid pending desired rollback pin while served-state observations
  lag. Reconcile toward that intent and use observations to measure convergence.
  Clear its pending status only when the matching operation/version is observed
  applied; replace the intent only on explicit supersession or authoritative
  invalidation, rather than copying the currently served version over it.
- For a new target, write the template/resource first. Add its retention or
  warm-up reference only after a provider read confirms existence; a computed
  name or accepted create request is insufficient. Keep incomplete creation
  retryable without emitting a dangling reference. Promotion still requires
  the target's separate readiness checks.
- Search every related recovery writer, including rollback, adoption, retry and
  no-op reconciliation paths. Apply the same rules within the owned boundary
  and identify separately owned affected paths.

**Bad:** preserve a missing target at zero weight, or replace a pending rollback
with the version returned by a lagging status read. **Good:** verify the optional
target before referencing it, preserve valid desired intent, and wait for the
matching serving observation before reporting convergence.

Verify missing and existing inactive targets, a valid pending rollback with stale
served state and later convergence, explicit supersession, required-target
absence, lookup failure, delayed creation visibility and repeat reconciliation.
Assert provider-call order and the entire submitted
resource, including optional references; test both an existing serving fallback
and no eligible fallback. A SaaS deployment can retain a previous release and a
game fleet can warm a recovery server under the same checks. A text formatter
without provider-managed references needs none of these reconciliation controls.

## Publication time and expiry

When the contract promises a lifetime from becoming ready or being granted,
set expiry in the same atomic update that publishes that state, after slow
capture, generation or transfer completes. Use one authoritative timestamp for
related fields. Keep the start of work separately when the API needs it.
An absolute deadline or a lifetime explicitly measured from the request keeps
that origin; publication and retries must not extend it.

In PostgreSQL, `now()` and `CURRENT_TIMESTAMP` name the transaction start.
Moving them to the final update of a long transaction still consumes the new
resource's retention. Use the final statement's `statement_timestamp()` or
capture one `clock_timestamp()` value for the publication update; repeated wall
clock calls can disagree within a statement
([PostgreSQL 18 date/time functions](https://www.postgresql.org/docs/18/functions-datetime.html),
read 2026-11-06).

**Wrong:** set a report's download expiry before generating and storing it.
**Right:** publish its ready state and full promised availability atomically.
Test through the real entry point with work lasting at least the minimum
retention. Assert that the returned resource is ready, remains gettable and
usable, and has the full promised lifetime from publication. A mocked application
clock alone cannot expose a database clock fixed at transaction start. Include
an absolute-deadline control when that contract also exists.

## Migrations

Keep migration history truthful: do not record an unverified migration as applied. Follow the repository's supported migration-history procedure; a missing schema object is repaired through the owning migration mechanism.

Before copying an older migration, read the currently pinned guard and the actual
runner's transaction, timeout and partial-resume contract. A resumed file can
skip earlier `SET` or `DROP` statements on a fresh connection, losing session
settings or cleanup. `CREATE INDEX CONCURRENTLY IF NOT EXISTS` can also accept
an invalid leftover index. Use the repository's supported recovery and validity
contract. Where supported, pair concurrent creation with a later assertion that
fails if the index is missing, unready or invalid; do not invent a guard exemption
or assume one SQL pattern works with every runner. Verify clean apply, interrupted
resume and missing/invalid-index cases through that runner.

Choose one final representation and authority. An additive schema change may need no backfill; when existing data must change, transform it in bounded, resumable batches with semantic validation. Where serving continues, expand compatibly, switch readers/writers in a declared order, backfill, retire old consumers and remove the predecessor. Contract changes run after revisions that still need the removed representation are gone.

Pre-deploy migrations acquire locks while the old revision still serves.
Check that revision's transaction boundaries and lock lifetimes, including
external calls made inside transactions. A lock-release fix shipped with the
migration cannot make its own earlier DDL safe. If DDL depends on that fix,
deploy and verify the fix first; otherwise document why the migration works
independently of it. Bound lock waits using the migration system's supported
timeout, and test contention against the old behavior when it affects safety.
**Wrong:** justify a new column's lock with transaction code that is not deployed.
**Right:** establish the old caller releases the conflicting lock in time, or
ship that prerequisite separately before applying the migration.

Check both directions during a rolling cutover: new readers must understand old
writes, and old readers must understand new writes. If backfill publishes a
validity marker, an old writer must invalidate or update it. A one-time database
projection can preserve the old representation without buffering it in the API.
Keep source bytes until the destination is verified; missing data is an error
rather than an empty replacement. Before contract, verify actual serving
revisions and drain old in-flight requests; zero assigned traffic alone does
not establish that a previous writer has finished.

A new migration's version sorts above the newest migration on the target branch at merge time, not only above its neighbours in the change. Check it again after every refresh from the target, and have a reviewer compare it with the target's newest migration: a merge queue can test later entries on top of an earlier entry, so a version below the base can pass by accident. When the version must move, rename only your own unreleased migration, upward, and update its references and the checksums owned by that migration store.

Determine checksum ownership from `git ls-files`, `git check-ignore`, generation
rules and the actual verifier. Regenerate with the store's supported command;
commit checksums only where its source contract requires them. A generated,
ignored checksum can belong to the build rather than version control. Verify
that contract before treating an absent checksum diff as stale output.

Readiness checks compatibility with the serving revision rather than demanding the newest schema head. Verify live schema after applying a change; the migration ledger alone does not establish that the intended objects exist.

Keep schema migrations strictly DDL-only (`CREATE`, `ALTER`, `DROP` on tables, indexes, views, types, functions, and policies) and separate from deployment-specific or tenant/product runtime state. Never embed mutable tenant, title, product, or catalogue data (`INSERT INTO` / `UPDATE` on operational configuration, bundle IDs, ad units, pricing, or live-ops schedules) in SQL migration files, and never hardcode per-tenant or per-title state switches in source code to override database state. Use the owning product's supported API/CLI. Where an authorized app-owned state change has no method, a dedicated write role with before/after reads can be the documented operational route; it does not authorize changing migration-ledger rows or bypassing a reconciler or owned platform boundary. Record the reason and replace a temporary route with the proper API when needed. Use the [recovery procedure](security.md#recovery-procedure) for restoration.

## Recovering missing normalized state

Use this procedure when a normalized child row is absent but an older saved
representation may still contain the user's state. Absence is not authoritative
zero, and the existence of an old save does not by itself establish data loss or
its cause.

- **Wrong:** return default zeros on load, then accept that snapshot as a save.
  **Right:** establish whether a valid recovery source exists before presenting
  or accepting a replacement snapshot.
- Initialize only missing canonical rows. Existing rows, including legitimate
  zeros or reductions, remain authoritative; fieldwise maxima are not a general
  recovery or merge policy. Keep the original source unchanged.
- Serialize recovery and every affected writer on the same entity within one
  transaction. Cover load, direct save before first load, settlement and replay.
  Read the current state and validate a submitted snapshot after acquiring that
  lock; a comparison made before waiting can accept a stale regression.
- Preserve the original projection contract: source types, missing/null defaults,
  numeric conversion, finite values and destination bounds. Reject an invalid
  source for the affected record rather than silently clamping or coercing it.
  Require matching cycle identity before restoring daily or other expiring state.
  Do not revive completed erasure or inactive accounts.
- Recover history only under an explicit parsing, duplicate-key, ordering and
  retention contract. An empty canonical history and unexplained gaps in a
  nonempty history need different decisions; do not fill the latter by assumption.
- Compare all protected progress and claim fields in the fresh canonical state.
  A refused stale snapshot must leave unrelated fields unchanged; test legitimate
  forward updates and identical replay as well as regression refusal.

Verify with the actual database and two concurrent connections: observe a real
lock wait in both operation orders, then assert the resulting state. Include
missing rows with valid old data, existing zero rows, malformed and out-of-range
sources, expired cycles, direct save, duplicate settlement and completed erasure.
Keep database tests, deployed API checks and a population census as separate
claims; none alone proves all users were repaired.

## Tests

Choose the smallest test that fails on the defect: examples for finite decisions, properties for broad/conserved state, fuzzing for parsers, differential checks for two implementations and deterministic simulation for concurrency, retry or time. Run a regression against the pre-fix and fixed behavior where practical.

For formatting regressions, type representative expected strings from the
user-visible contract. Deriving the expectation from the formatter under test
repeats its defect. Include the locale where an ambiguous symbol is native,
another supported locale, and relevant signs, zero or grouping boundaries.
For example, a currency-labelled price can require `US$1.99` in `en-US` and
`-US$1.00` for a negative amount. Apply the same independence to date, unit and
identifier formatting. Assert the rendered caller too when its choice of
formatter or options caused the defect; keep broad invariant checks alongside
these examples. Feed raw inputs through the production formatting and ordering code and inspect the rendered result (rows, line breaks, overlaps); a fixture pre-filled with the desired labels proves only the fixture. When multiple strings are valid, derive accepted alternatives
from the contract rather than freezing an incidental library output.

**Wrong:** `expect(renderedPrice).toBe(formatPrice(amount, locale))`.
**Right:** `expect(renderedPrice).toBe('US$1.99')` for a contract requiring that
currency label. A date display regression similarly asserts an independently
specified date string; a transport retry change needs no formatting cases.

Test runtime behavior by calling it. Never write source-grep fake tests (`std::fs::read_to_string("src/...")`, `include_str!("../src/...")`, or `fs.readFileSync("src/...")` asserting substring presence in implementation source) as a substitute for behavioral execution. For a declarative/source contract, use a parser, lint or boundary check suited to that contract. Documentation/code drift checks are useful; exact wording pins and tests that reimplement the same logic are weak signals.

In Rust crates with multiple integration test modules, use a single integration test binary (`tests/integration/main.rs` with `mod <domain>;` submodules under `tests/integration/`) rather than many top-level `tests/*.rs` files, so `cargo test` links one integration binary instead of compiling and linking dozens of separate test executables.

For shell evidence gates, execute the actual script with the runner's shell options and inputs larger than a pipe buffer. Include clean output, missing evidence, and failure matches both early and late. With Bash [`pipefail`](https://www.gnu.org/software/bash/manual/html_node/Pipelines.html), a diagnostic pipeline such as `if grep ... | head -n 20 | grep .; then ...` can miss a known failure: `head` closes early, the first grep receives SIGPIPE, and the condition becomes false. Separate the decision from bounded display, or use a consuming display filter such as `sed -n '1,20p'`. Keep the failure predicate unchanged and prove that output truncation cannot reverse the verdict. Run a negative proof through the enclosing gate as well as its native test runner. A deliberately caught panic can pass the test framework yet fail a log-based gate. Assert the returned error directly, so the outer failure guard stays effective.

A required resource-dependent check fails clearly when the resource is unavailable rather than silently passing. Test selection covers supported configurations. An intentionally excluded or slow test records its reason and a supported execution route; choose scheduling from the workload rather than requiring a daily job or deleting useful coverage when no group exists.

Check SQL against the migrated schema through compiler support where available, generated contracts or database-backed tests for dynamic queries. Share cohesive fixtures and table-driven cases where that improves readability. A query-cost regression asserts statements executed and rows examined, from engine statistics or the query plan, not rows returned: an existence check that returns nothing can still scan the whole table.

Test a distributed artifact in its built environment, including a control that distinguishes the old behavior where applicable. When a shared component changes, list every assembly, profile or bundle that consumes it, including any added on the base branch after yours was cut, carry its source, generated code and runtime resources together, and verify each assembled consumer; one green profile does not prove the others. A selected or checked-in test is not coverage until each runner compiles and executes it: confirm the reported test names or counts include it for every release profile. When a release qualifies pinned source hashes, inject test-only hooks into a disposable copy inside the test job, record the input and final hashes, and fail on input drift; never commit those hooks to the product tree. Keep shell scripts in files and feed them to the container, for example `docker run -i --entrypoint /bin/sh <image> -s < test.sh`. This avoids shell-specific heredoc/command-substitution parsing. Verify the actual runner/image tool capabilities when they matter; `mawk` supports POSIX character classes.

For source included from multiple workspaces, run each consumer's exact
formatting and lint commands. Its edition and configuration can change how
shared bytes are checked; one direct formatter or successful Clippy run does
not cover the others. Keep one source representation that passes every
consumer. Put a suppression's narrow explanation in syntax the checker reads,
such as a Rust lint's `reason` attribute.

**Wrong:** assume a library's successful Clippy run also proves its formatter
accepts a shared helper. **Right:** run both checks from every including
workspace, with its own edition and configuration.

When a fixture detects an unwanted read or side effect, prove both that a
forbidden operation triggers it and that the allowed operation leaves it idle.
For example, a SQL view containing a VOLATILE rejection function may evaluate
it even when its output column is unused. Validate metadata-only reads and row
locks independently before using that view to judge the production projection.

For pooled-resource teardown, check client ownership and server state separately.
A returned close future does not establish that the pool drained every resource.
Before attributing a surviving session to a worker, read the exact driver's close
and return ordering and measure the remaining pool size. Reproduce a return
racing shutdown with a barrier, and retain a negative case in which a genuinely
held connection stays usable after cleanup reports it. Keep a driver workaround
in its version-specific adapter and remove it when the supported upgrade fixes
the ordering; do not hide the failure by terminating unrelated sessions.

## Outbound calls

- Give each remote operation an effective deadline/cancellation policy, configured on the client or request. Reuse clients by connection and security configuration and share retry/redaction policy.
- Avoid holding a database transaction or lock across an external call. Prefer claiming work, committing, calling and then settling when that preserves the invariant.
- Refresh key/token caches without blocking every reader. A refresh failure does not extend a credential's validity or revocation contract.
- Load related rows in set-based queries on a growing list/batch path rather than one query per row.

## Cleanup and review

Use [repository health](../../refactor/references/health.md) to verify unused paths and duplicate authorities before deletion. Before regenerating checked-in generated code, reproduce the committed output unchanged with the pinned, checksum-verified generator and runtime, then change only the input and review the diff. Regenerating a whole data file or workbook to change a few fields is a population-wide change: decode the committed and regenerated tables, keep every field outside the approved change identical, and isolate any pre-existing drift as its own change rather than importing it. A release scoped to one bundle prepares only that bundle's inputs and keeps everything else at the served bytes. Fixtures and admission evidence prepared after unrelated overlays do not attest what shipped, even when the final bundle is byte-identical. Check re-rendered goldens against the merge result CI tests, not the branch alone: compare the exact file set, dimensions and changed regions, because the base may have added cases the branch did not touch. Keep generated distribution sources reproducible when supported consumers need them; remove scratch output and evidence dumps from source, and link claims to their authoritative result.

Resolve a conflict in an additive registry, manifest or allowlist by stable entry identity, not by position. Compare the full entry set before and after the merge. Every entry from both sides should appear exactly once, and no existing key should change its mapping. Where order carries no meaning, keep entries sorted or keyed by identity, and check that in CI. Parallel changes then insert at different points instead of colliding at one shared append point.

Review the failure modes and checks relevant to the change through [prove-it](../../prove-it/SKILL.md). Track throughput and review latency alongside incident/revert rates on a named population and window. A metric change is a signal to investigate, not by itself proof of causation.
