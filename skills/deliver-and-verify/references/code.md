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

When a resource's size or tier is owned by a declaration (manifest, config file, GitOps source), change the declaration, never the runtime API. An API write the next reconcile reapplies is not durable, and an immediate read of live state cannot prove otherwise; verify after the next reconciliation against the authoritative source. A silent re-expansion on saturated capacity can preempt unrelated workloads.

When replacing a mutually exclusive configuration variant, validate the effective
update against an existing object with its server defaults and field ownership.
Omitting the old variant in desired source may retain its defaulted fields;
a successful render does not prove that the real reconciler can apply the change.

A resource reduction can temporarily require the old and replacement allocations together. Before a restart or rollover on saturated shared capacity, measure the transition peak on eligible placements, including runtime overhead and preemption effects; final-state savings do not prove that the change preserves other live work.

Revenue-critical pods must run at a priority above every routine workload that can be placed on their nodes, and co-dependent pods share one priority so they never pick each other as victims. A node-pinned stateful pod below that priority is one preemption away from an outage that it cannot recover from on a full node.

For a shared runtime setting, render each supported deployment overlay or
release profile before changing live state. A base declaration does not prove
that a consumer receives it: replacement environment lists, arguments or
volume mounts can discard new shared entries. Assert the required effective
values and preserve intentional target-specific omissions; changing replacement
to merging can also import settings that belong only to another target.

Trace each pinned or referenced input through the existing automatic writer's
change trigger, propagation latency and the consumer's read behavior; an initial
deployment does not prove later input changes propagate. **Wrong:** rotate a
Secret and assume a completed Job reruns. **Right:** change only that input and
verify the intended consumer uses its new revision within the declared
propagation time, including CI, merge queue and deployment reconciliation.

An automatic update can discard a temporary compatibility approval while another
consumer still uses it. Exercise successive and unrelated updates during a
migration; retire an old version's approval only after consumers stop selecting
it and its active work and delayed results have drained.

Verify the rendered configuration reaches the deployed process, then exercise
the behavior that consumes it. **Wrong:** find a setting in the shared base and
assume every region inherits it. **Right:** test each assembled target, reproduce
the missing setting before the fix, and read back its live value and behavior.
The same check applies to a game-server profile overriding shared worker
settings. A prose-only edit needs no deployment rendering.

## Transactions and idempotency

Use transactions for atomic invariants and authority-side uniqueness for retryable commands; retry a serialization or optimistic conflict as a whole read-decide-write attempt. Caller-scoped receipts and locks need a nonempty verified identity because credential-specific fields can be absent in another authentication mode. Prove same-caller replay and different-caller isolation for each supported mode; a legacy receipt is eligible only when its original owner is verifiable.

A lock taken only when writing cannot protect a snapshot read before another
writer committed. **Wrong:** lock and replace that stale snapshot. **Right:**
update only owned fields, or read and merge under the same lock and ownership
check, then prove both writers' committed fields survive the real concurrent
entry points.

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
which operation is blocked before releasing the competing transaction. Follow
indirect blockers too: a row-lock queue can place the second operation behind
the first waiter, so counting only direct blockers can miss real contention. A sleep
or eventual success alone does not prove the intended interleaving. Assert the
final conserved state and rollback behavior as well as completion. Apply this
audit to other transactional domains, such as stock reservation and cancellation;
a pure formatter change needs no lock-order proof.

Bound resource use and waits according to the operation's cancellation and recovery contract: capacity, batch size, deadline or durable pending state solve different needs. When a committed fact must cross a boundary, write its publication record with the state change and make consumers duplicate-safe.

In runtimes where futures advance only when polled, awaiting maintenance can
suspend the worker holding the lock it needs. Keep that worker driven, and join
or cancel maintenance with its lifetime; test actual contention and cancellation
rather than eventual completion alone.

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

## Binary output and text storage

Process output is bytes. Define its text projection before publishing it to a
text column, JSON payload, event or checkpoint. Valid UTF-8 alone is insufficient:
PostgreSQL `jsonb` rejects `\u0000` because its text representation cannot store
the zero code point ([PostgreSQL JSON types](https://www.postgresql.org/docs/18/datatype-json.html),
read 2026-11-06). JSON escaping alone does not remove that character.

Apply one projection contract at the durable publication boundary, including
stdout, stderr and nested tool results. If the interface permits replacement
text, report sanitization and replacement counts while preserving exit status,
cancellation and truncation. Where exact bytes matter, use a bounded binary
field/artifact or an explicit encoding such as base64. A persistence failure
after a command completes must not cause that command to execute again.

**Wrong:** decode bytes with UTF-8 replacement and assume every resulting string
fits the database. **Right:** test the destination's character contract, publish
the permitted projection once, and distinguish it from the original bytes.
Execute a command emitting an actual zero byte and invalid UTF-8, verify its
stored and returned result, then run another command. Include ordinary Unicode,
literal backslash escape text, stderr and completed nonzero exits as controls.
A serializer-only test cannot prove the database accepted the event.

## Execution environment recovery

- **Phenomenon:** A partial capture (such as a Git-only bundle) omits untracked notes, ignored files, or paths outside the repository; staging on a different filesystem fails `rename(2)` with `EXDEV`; applying capture size caps during restore blocks valid compressed archives.
- **Invariants:** Select the newest complete recovery source by authoritative completion order and verify restored bytes against that chosen source. When advancing a full archive with a newer partial capture, preserve paths outside the partial capture's scope rather than deleting them to force a match. Stage temporaries on the destination filesystem or inside reserved metadata storage before atomic rename, and bound restore materialization by destination quota rather than capture-time per-file encoding limits.

## Controller handover

- **Phenomenon:** Changing a parent resource's owner selector stops the old controller from reconciling, which can leave old generated children (routes, jobs, credentials) serving indefinitely or cause concurrent deletion of replacement children.
- **Invariants:** Inventory generated children by authoritative ownership metadata. For populated serving resources, verify replacement readiness and membership before withdrawing the old controller's children, and bind deletion preconditions (`UID`/version) to the old owner so concurrent replacements are never deleted.

## Recovery references and desired state

- **Phenomenon:** Providers often validate zero-weight/inactive target references and reject the entire spec if one optional recovery/warm-up target does not yet exist; lagging status reads can overwrite a pending rollback intent if observed state is copied back into desired state.
- **Invariants:** Keep provider existence, desired intent, and observed serving state distinct. Verify a target exists before emitting a reference to it, and preserve pending rollback/rollout intent until the matching operation is observed applied.

## Publication time and expiry

When the contract promises a lifetime from becoming ready or being granted,
set expiry in the same atomic update that publishes that state, after slow
capture, generation or transfer completes. Use one authoritative timestamp for
related fields. Keep the start of work separately when the API needs it.
An absolute deadline or a lifetime explicitly measured from the request keeps
that origin; publication and retries must not extend it.

For short-lived safety or authorization receipts, measure the complete path
from the qualifying observation to the guarded action, including client startup
and transport setup. Read-only setup may happen beforehand if the final
observation still verifies the exact target and state; extending receipt validity
to hide setup time weakens the safety contract.

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

Database replay and compilation do not establish admission by a migration safety
guard. For new or copied SQL, read and run the delivery path's pinned guard on the
actual candidate; explicit DDL keeps known target objects inspectable, and a
contract reference must name a real released prerequisite.

Before copying an older migration, read the actual runner's transaction, timeout
and partial-resume contract. A resumed file can
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

- **Phenomenon:** When a normalized child row is absent on load while an older saved representation still holds the user's progress, returning default zeros on load and accepting a subsequent client save permanently overwrites the user's real progress with zeros.
- **Invariants:** Absence of a normalized row is not authoritative zero. Before returning or accepting a default snapshot, check whether a valid recovery source exists and initialize only missing canonical rows within a serialized transaction (leaving existing canonical rows, including legitimate zeros or completed erasures, untouched).

## Database boundary tests

Execute changed SQL through the production driver, including parameter encoding
and result decoding, against a disposable database built from the complete
migrations. Use the application's effective role and verify the database version,
role and relevant column types in the test. A migration-only privilege proof
precedes fixture grants: copying live permissions into setup can hide missing
migration grants. Required access follows the effective caller and reachable
operation across invoker, definer and trigger-event boundaries; a source
reference or table privilege alone does not establish an application-role call.

Focused fixtures keep fast checks small, but preserve the real enum/domain types,
required functions and relations. When changing a fixture's type, update and run
every affected seed, bind and decode path. Include a migrated-schema regression
that distinguishes the original failure; a simplified fixture alone cannot
establish compatibility with the deployed schema.

**Wrong:** substitute TEXT for an enum and convert failed decoding into a business
default. **Right:** execute the actual query under the application role, preserve
the column type, and verify the intended typed decode or explicit SQL conversion.
Propagate unexpected encoding and decoding errors. A contract's missing-value
default does not make an unreadable value equivalent to absence.

Sweep related projections and parameters for the same mismatch. Before removing
a suppressed error, identify the fallback it previously supplied and which live
decisions will change when the stored value is used. Verify that exposure before
publishing the correction.

## Tests

Choose the smallest test that fails on the defect: examples for finite decisions, properties for broad/conserved state, fuzzing for parsers, differential checks for two implementations and deterministic simulation for concurrency, retry or time. Run a regression against the pre-fix and fixed behavior where practical.

Workflow policy evaluators can mistake a literal in an unreachable branch for
an allocated runner when unsupported syntax falls back to string matching.
Evaluate each declared trigger and inherited reusable-call context with the
host engine's truthiness and logical operand values. Unknown labels or inputs
represent every reachable outcome; an event field known to be absent is a
different state. Each reachable allocation must satisfy the existing policy,
and an unresolved selected expression needs a refusal naming the construct.
Extending the evaluator does not authorize extending a rule to other events.
For GitHub Actions, use the [official expression semantics](https://docs.github.com/en/actions/reference/workflows-and-actions/expressions)
(read 2026-11-06). Verify exact consumer selectors with wildcard filters,
mixed triggers, both unknown-label branches, a static forbidden allocation and
an unsupported expression through the shipped checker entrypoint.

**Wrong:** find a PR-pool literal anywhere in a selector and reject its merge
run. **Right:** prove the merge event selects its permitted pool, and check
both label-dependent PR outcomes under the rules that apply to PRs.

Concurrency assertions should distinguish the mechanism from scheduler latency: observe wake reasons, probe counts per wait and resource ownership at barriers, and keep benchmark timings separate from generous progress deadlines unless timing itself is the contract. When acknowledgements or rechecks can emit valid repeated status events, consume them until the terminal result under one deadline while preserving subsequent frames; a trace showing timely completion with extra status messages falsifies an exact-count assertion, which should be replaced rather than marked flaky. **Wrong:** require exactly one wait event and a tight shared-runner latency; **right:** accept valid repeated waits, assert the terminal outcome and test notification versus fallback through observable causes.

An adapted reference executable can repeat an adapter defect even when its core source is untouched; pin source/configuration, make boundary substitutions explicit, and qualify it against independently recorded outcomes when available. Compare the same computation stage, separating later modifiers, and keep missing inputs unknown: exact known-input matches and compatibility across possible inputs support different claims. **Wrong:** infer a missing input from the expected result and count it as an exact match; **right:** report the unknown stratum separately until independent evidence resolves that input.

For destructive work planned from shared references, test another live reference
changing after discovery: a successful conditional deletion validates only the
object removed, not the references left behind. Verify the final deletion set
while preserving the original early-stopping behavior and measuring added I/O.

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

A negative test can pass for the wrong failure when setup refuses before the
injected fault. Assert the specific typed refusal or root cause, print the full
error chain on mismatch, and verify that substituting an unrelated fault makes
the assertion fail. **Wrong:** accept `is_err()` or a wrapper's generic “check
failed”; **right:** require the changed-price refusal after a passing baseline,
while a stale-heartbeat refusal fails that same assertion.

Before asserting that state was lost, prove the precondition held. The fixture reached the intended screen or route, the element is present and laid out, and the initial input was accepted and reads back. A getter that returns an empty value for an absent node is not evidence of loss. Fix the fixture before touching product retention, then compare after the unrelated change.

Test runtime behavior by calling it. Never write source-grep fake tests (`std::fs::read_to_string("src/...")`, `include_str!("../src/...")`, or `fs.readFileSync("src/...")` asserting substring presence in implementation source) as a substitute for behavioral execution. For a declarative/source contract, use a parser, lint or boundary check suited to that contract. Documentation/code drift checks are useful; exact wording pins and tests that reimplement the same logic are weak signals.

In Rust crates with multiple integration test modules, use a single integration test binary (`tests/integration/main.rs` with `mod <domain>;` submodules under `tests/integration/`) rather than many top-level `tests/*.rs` files, so `cargo test` links one integration binary instead of compiling and linking dozens of separate test executables.

For shell evidence gates, execute the actual script with the runner's shell options and inputs larger than a pipe buffer. Include clean output, missing evidence, and failure matches both early and late. With Bash [`pipefail`](https://www.gnu.org/software/bash/manual/html_node/Pipelines.html), a diagnostic pipeline such as `if grep ... | head -n 20 | grep .; then ...` can miss a known failure: `head` closes early, the first grep receives SIGPIPE, and the condition becomes false. Separate the decision from bounded display, or use a consuming display filter such as `sed -n '1,20p'`. Keep the failure predicate unchanged and prove that output truncation cannot reverse the verdict. Run a negative proof through the enclosing gate as well as its native test runner. A deliberately caught panic can pass the test framework yet fail a log-based gate. Assert the returned error directly, so the outer failure guard stays effective.

Distinguish a required resource-dependent check from an optional suite: the former fails when setup is absent, while the latter retains its documented behavior without the fixture. For optional tests, verify both states and require the fixture at the proof's invocation boundary; a green skip does not establish that database, browser or external-service assertions ran. An intentionally excluded or slow test records its reason and supported execution route, with scheduling chosen from the workload.

Share cohesive fixtures and table-driven cases where that improves readability.
A query-cost regression asserts statements executed and rows examined, from engine statistics or the query plan, not rows returned: an existence check that returns nothing can still scan the whole table.

When changing a shared eligibility or availability rule, trace its consumers
and verify each public contract for temporary unavailability, permanent denial
and recovery. An execution refusal can be correct while discovery or retry
metadata regresses; missing recovery evidence remains unknown.

**Wrong:** a stock-exhaustion test blocks checkout, so assume search visibility
and restock advice still satisfy their contracts. **Right:** exercise checkout
and search with depleted and recovered stock, and verify any advertised restock
time against the available evidence.

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

Use [repository health](../../refactor/references/health.md) to verify unused paths and duplicate authorities before deletion. Before regenerating data or code, establish the authoritative baseline from the selected or deployed artifact; a checked-in snapshot can already drift. Prove preservation with the pinned, checksum-verified generator, an independent decoder and the actual consuming runtime, while validating current declarations separately; an older runtime model does not justify weakening the current schema. Compare the full decoded population, including secondary records, formulas and cached values where relevant, allow only declared changes, and name representation-only differences. A release scoped to one bundle prepares only that bundle's inputs and keeps everything else at the served bytes. Fixtures and admission evidence prepared after unrelated overlays do not attest what shipped, even when the final bundle is byte-identical. Check re-rendered goldens against the merge result CI tests, not the branch alone: compare the exact file set, dimensions and changed regions, because the base may have added cases the branch did not touch. Keep generated distribution sources reproducible when supported consumers need them; remove scratch output and evidence dumps from source, and link claims to their authoritative result.

Resolve a conflict in an additive registry, manifest or allowlist by stable entry identity, not by position. Compare the full entry set before and after the merge. Every entry from both sides should appear exactly once, and no existing key should change its mapping. Where order carries no meaning, keep entries sorted or keyed by identity, and check that in CI. Parallel changes then insert at different points instead of colliding at one shared append point.

Review the failure modes and checks relevant to the change through [prove-it](../../prove-it/SKILL.md). Track throughput and review latency alongside incident/revert rates on a named population and window. A metric change is a signal to investigate, not by itself proof of causation.
