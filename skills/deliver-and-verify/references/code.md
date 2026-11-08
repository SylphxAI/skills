# Code conventions

Trigger: writing or changing code, tests, deployment configuration or migrations; changing recovery
references, rollback pins or asynchronous reconcilers.

Make behavior, authority and failure handling visible. Keep one authority for each domain fact; derive clients and models where generation prevents drift.

## Types and boundaries

- Parse untrusted input into typed domain values at ingress, giving identity, money, quantities and units explicit types. Sharing a validator can narrow an existing consumer's accepted input language: derive supported forms from each boundary's parser, normalization and fallback paths, preserving legacy-only forms at their existing boundary unless retirement is explicit. **Wrong:** reuse a new API's canonical-only validator for an existing import; **Right:** prove the import's supported aliases survive while the new API still refuses them. Parser acceptance alone does not establish the narrower grammar required by a security or diagnostic boundary: an accepted IPv6 zone suffix, for example, can contain arbitrary text. Validate permitted components explicitly, pairing rejected suffix sentinels with valid-address controls.
- Model lifecycle states explicitly, handle them exhaustively, and return expected failures as typed values translated at the boundary; transitions that omit actions must still preserve authenticated provenance separately from execution intent. Persistence, inference, user-controlled names, or a verification marker with matching identity cannot authenticate a separately mutable parsed body: privilege elevation binds decision-bearing facts to the exact retained original bytes, event and verifier/hash, or independently proven enrichment. Documented provider-protocol signals may justify scheduling only within positively proven origin scope, so removing one requires an authoritative replacement available at the first actionable decision, not merely after later enrichment. Unknown or tampered proof cannot raise authority, explicit negative facts may lower it, and reuse rechecks current authority despite an earlier positive receipt. Verify those decisions from real provider-shaped inputs through upstream classification, transformations, persistence, reload and every consumer—not just directly seeded records—varying event, repository/fork origin and lookalike names independently, with absent, unknown or tampered provenance alongside an authoritative positive control, explicit contradictory evidence prevailing, and successive transitions with unchanged or changed inputs.
- Pass dependencies explicitly. Keep deterministic decisions and calculations in a pure domain core; place database, HTTP, clock and other I/O in adapters.
- Keep queries, mutations, round-trips and lock lifetimes visible. Organize by capability rather than collecting unrelated helpers into technical-layer folders.

Losslessly retained token spelling does not establish domain equality or
destination representability: derive value-defined comparisons and admission from
the contract and destination type, retaining original bytes separately where required.
**Wrong:** compare decimal spellings or bound only the exponent; **Right:** test
equivalent values with different spellings and combined coefficient/scale limits
through the actual storage driver, while byte-defined identifiers remain distinct.

A configuration rewrite can corrupt untouched caller fields when a serializer
from another format accepts different string escapes or key syntax. Verify the
complete rewritten document with the destination consumer's parser, including
non-ASCII and escaped keys and values, and assert that caller-owned content
survives successive updates and removal of managed settings. **Wrong:** inspect
only the new section or round-trip through the helper's own serializer;
**Right:** parse the emitted configuration through its actual consumer and
compare preserved fields.

A scoped policy waiver suppresses only its local findings: waived input still
updates semantic state, including facts that invalidate earlier assumptions,
while tokenization, parsing and boundary failures remain non-waivable.
If waived input changes how later input is interpreted, model that change or
refuse the affected scope explicitly; never silently authorize the remainder.
Test a scoped linter ignore or validation exception with both state-establishing
and state-invalidating input followed by unwaived input; ordinary prose with no
waiver needs no such handling.

Validate immutable historical records structurally and retain their findings when
time-dependent permissions expire; expired permissions have no authority, but
must not erase the baseline or weaken current-state validation. Test expiry
rollover and removal through the real comparison entrypoint, and regenerate any
registry that attests the checker source when those bytes change.

## Deployment configuration

A shared readiness or admission check must distinguish an intentionally
unconfigured optional capability from a configured capability that is unavailable:
derive configured-versus-absent from the capability's own declaration before
evaluating prerequisites, because prerequisite-gated assembly can silently turn a
configured-but-unusable capability into absence and a false-ready success. Preserve
intentionally absent reduced-scope deployments, but refuse construction/readiness
for a configured capability with a missing, empty, malformed, or non-Unicode
binding rather than treating it as absent. Verify the real environment/declaration
parser through every production constructor or deployment profile (using isolated
subprocess environments for process-global settings), covering absent, invalid,
and loaded declarations plus healthy and failing mandatory upstreams; helper-only
tests miss this boundary.

A reduced-scope preview sharing a backend still needs a declared profile and a
live, serving nonproduction target; absence fails closed, never through a
production default. Bind every origin resolver to positive target identity in
the intended namespace/environment: a production-host denylist misses internal
and recovery aliases, especially when clients forward cookies on mutations.
**Wrong:** block the public production hostname and trust another URL. **Right:**
prove the declared nonproduction target serves, and test every independent
resolver against missing configuration, wrong-environment targets and all
declared production route aliases before forwarding credentials or traffic.

A globally documented runner label or resource tier does not prove a serving
allocation in the target account, organization or region: match the selector,
scope and required memory class against effective desired and served inventories.
If a same-size isolated allocation is not served, preserve the serving allocation
rather than inventing a selector or downsizing to obtain isolation, and state the
remaining contention. **Wrong:** select a catalogued isolated tier that is absent
in the target scope; **Right:** retain the served memory class until scoped
desired and served inventories establish the isolated replacement.

When a resource's size or tier is declaration-owned, change its owning source;
a supported temporary live change also needs a verified reconciliation and
cleanup path. A child's ignore rule can itself be overwritten by its parent's
desired state, so durability depends on the full controller ancestry and each
controller's effective field ownership. Owning software or resource declarations
does not necessarily confer authority over a separate operator's pause/hold intent;
initialization defaults cannot silently resume an existing workload. Verify that
intent survives repeated no-op and changed-input reconciliation while genuinely
new enabled work can start. **Wrong:** add a child ignore and trust
an immediate live read. **Right:** establish what preserves it through parent
reconciliation, then verify the durable source adopts the value and the
temporary exception is removed. Unchanged declarations, generations or digests
do not prove unchanged effective allocations: verify realized per-object state
through every active writer and consumer, preserving field-ownership exclusions
across successive operations. Keep pending intent separate from physical evidence;
missing, stale, unreadable or partial observations cannot justify a
preservation-changing write, while first creation requires authoritative proof of
exact-identity absence and a complete inventory of retained allocations.

When replacing a mutually exclusive configuration variant or retiring fields,
validate the effective update against an existing object with its server defaults
and field ownership: omission can retain another manager's value, and `null` can
become an empty value rather than delete the key. A successful render or apply
does not establish intended absence; verify absent and retained fields through
the actual reconciler and typed consumer. Representation changes must also remain
consumable by later operations that read or reclaim the configuration, not only
by its producer.

Reservation or preview objects can bypass mutations applied to the eventual
execution object, so matching source templates does not prove they reserve the
same requirements. Bind the reservation to the target's effective admitted
configuration and verify semantic equivalence at the consuming boundary,
ignoring only protocol-defined generated identity. **Bad:** reserve a raw
template, then execute a separately defaulted object; **Good:** derive from
target-side admission and reject a changed scheduling constraint while accepting
equivalent quantity encodings.

A resource reduction can require old and replacement allocations together,
and a parent operator may replace children despite an `OnDelete` child policy.
Read the installed controller's rollout and availability behavior, then measure
transition requests on eligible placements, including runtime overhead and
preemption effects; final-state savings do not establish a safe transition.
**Wrong:** assume the child policy leaves activation to manual restarts.
**Right:** stage source activation against the owning controller's actual rollout
and verify availability without racing it with another replacement mechanism.

HTTP readiness success or a `Ready` pod can precede initial discovery and usable
work; a controller may retire the predecessor on `readyReplicas` while
`minReadySeconds` affects only availability. Bind cutover to the exact field the
installed controller consumes and evidence of completed discovery, with assigned
work usable and legitimate empty assignments accepted, rather than fixed delays,
probe-count timing assumptions or a nonzero-work requirement. Through that
controller, hold startup discovery pending beyond any configured delay and verify
the predecessor remains serving, then release discovery and verify retirement for
both legitimate empty assignments and populated assignments with usable work.

Protect co-dependent stateful and serving-path pods at a shared numeric priority
that routine work eligible on their nodes cannot preempt; keep deliberately
expendable batch work below that tier. `preemptionPolicy: Never` prevents its pod
from evicting others, not from becoming a higher-priority pod's victim, and a new
`globalDefault` does not change historical pods
([Kubernetes priority and preemption](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/),
read 2026-11-07). **Wrong:** declare a protected default or a non-preempting class
and infer live protection; **Right:** update each owning template and verify every
affected pod's admitted numeric priority after its supported replacement,
especially node-pinned last copies.

For a shared runtime setting, render each supported deployment overlay or
release profile before changing live state. A base declaration does not prove
that a consumer receives it: replacement environment lists, arguments or
volume mounts can discard new shared entries. Assert the required effective
values and preserve intentional target-specific omissions; changing replacement
to merging can also import settings that belong only to another target.
Resolve generated targets and consumer references in that rendered output too:
namespace or content-hash rewriting can leave separately valid documents
pointing at different objects. Content-hash rewriting can also change an existing
immutable operation's template even when no execution is intended; retention or
prune settings do not make that update legal. Preserve its template and referenced
generation, or authorize a distinct operation identity rather than rewriting or
replaying the completed operation. **Wrong:** validate a template and its generator
independently; **Right:** resolve the rendered references and dry-run the effective
update against existing objects, proving unchanged immutable templates and no
unintended execution.

Identity-label selectors depend on the producer's propagation contract and every
consumer of the label, not the key's apparent meaning: compare admitted children
with their source, preserving opaque IDs and intentional omissions. A label that
grants access can also select traffic, scheduling or metrics, so verify intended
access and exclusion from unrelated selectors before propagating it.
**Wrong:** copy a service's labels to a worker because its access policy matches;
**Right:** inherit declared identity while proving the worker never joins serving
endpoints, then exercise the access path rather than treating policy eligibility
as working connectivity.

Trace changed inputs through the automatic writer's trigger, propagation time
and consumer read behavior; a new deployment does not establish later updates.
New metadata can also remain unpublished when an unchanged primary value skips
the writer: exercise the real reconciliation entrypoint with old or absent
metadata and an already-correct primary value, preserving that value while
verifying the promised metadata reaches its consumer. **Wrong:** call the new
formatter or force an unrelated state change to make the sample appear.
**Right:** prove both changed and unchanged passes through the normal writer,
with missing and existing metadata, within the declared publication contract.

An automatic update can discard a temporary compatibility approval while another
consumer still uses it. Exercise successive and unrelated updates during a
migration; retire an old version's approval only after consumers stop selecting
it and its active work and delayed results have drained.

A correct helper can receive altered arguments or environment through an
upstream interpreter or PATH selection; verify effective configuration, executable
resolution and process status through the real consumer. **Wrong:** find a setting
in a shared base or pass a helper test and infer the deployed path works.
**Right:** reproduce through each supported assembled target, read back its
deployed values, then prove behavior through the same executable chain; a
prose-only edit needs no runtime proof.

Before taking a device lease or starting expensive acceptance, parse each case's actual
configuration with the production parser and compare effective values and generated/compiled
policy with expectations declared outside the candidate. Artifact hashes establish byte
identity, not semantic intent; flag text can survive while an unknown or misplaced key
silently selects a default. **Bad:** find `enabled = true` in the source. **Good:** correctly
placed true/false controls match declared modes; a misplaced or unknown flag fails
semantic preflight even if the parser accepts it. Corrected inputs require a fresh build
and run, preserving original failed receipts unchanged.

## Transactions and idempotency

Use transactions for atomic invariants and authority-side uniqueness for retryable commands; retry a serialization or optimistic conflict as a whole read-decide-write attempt. Replay uses the same identity equivalence as initial admission, including database collation or canonical aliases; stricter application-string equality can reject an identical retry after its effect committed. Prove an accepted alternate spelling replays the original receipt after configuration removal, with a genuinely different identity as the refusal control. Caller-scoped receipts and locks need a nonempty verified identity because credential-specific fields can be absent in another authentication mode. Prove same-caller replay and different-caller isolation for each supported mode; a legacy receipt is eligible only when its original owner is verifiable.

A committed terminal no-op needs a durable receipt written atomically with its terminal state, binding the verified caller, idempotency key, exact request bytes or their hash, and operation identity; an audit event alone cannot establish replay. Resolve that receipt before mutable policy, catalog, expiry or evidence validation, so exact retries return the stored result while same-caller/key reuse with a changed valid body or operation conflicts; prove expiry, caller isolation, lost-response replay and concurrent lock-wait cases through real entrypoints. A current read after a lock wait can observe a commit that a later snapshot validation still cannot; every decision about that newly observed receipt needs consistent visibility. Test overlapping identical retries under the effective production isolation alongside changed-body conflicts and conserved effects.

An asynchronous request captures its target's stable identity and version at
submission; check eligibility atomically at mutation rather than resolving
mutable UI selection or equating values after an await. Cancellation or newer
intent can prevent mutation, but after an accepted mutation, view cleanup or an
uncommitted replacement ends obsolete presentation authority without revoking the
obligation to complete or compensate coherent durable state and projections; only
conflicting changes to authoritative state or authorization for that exact
committed identity/version supersede completion. **Bad:** abandon an accepted update when its view closes
or a replacement merely starts; **Good:** verify pre-mutation refusal,
post-mutation cleanup, a failed replacement and a newer committed replacement,
preserving coherent state without obsolete navigation or feedback.

Exceptional terminal or preservation states, including erasure, bind the full identity equivalence class learned through coalescence or promotion, including each identity's namespace (such as account plus ID), across ordinary writers, retry and replay. Exercise the original pre-transition payload under a discarded old route/key, plus source-only replay and late redelivery, through the real API after persistence reopen or row aging; retain a same-number identity in another namespace and allowed nonterminal enrichment as controls. Cancellation/erasure and late admission must serialize on the same stable owner before the final eligibility snapshot and publication marker; deleting existing markers alone permits later resurrection. Prove both lock orders through real entrypoints and the database wait graph. A historical receipt proves only the operation it records, not today's mutable state, so replay re-reads current state rather than restoring it from the receipt.

A nested helper that acquires a second connection from the caller's finite pool
can starve while the outer transaction holds the available capacity; a larger
test pool or absent optional cache can hide that branch. Reuse the caller's
transaction connection, or finish independent initialization before entering it.
The public-entry test with `max_connections=1` needs an enabled dependency and a
forced cache refresh, alongside separate multi-connection race tests.
**Wrong:** pass with no cache or increase the pool; **right:** exercise the real
refresh path and verify constrained-capacity progress and concurrent correctness.

A catalogue match proves identity, not fulfilment eligibility: before consuming a single-use right, admission and fulfilment share one eligibility predicate for every executable descendant, while absent optional presentation metadata remains harmless. Complete traversal needs explicit depth and work bounds with typed atomic refusal; caching a completed subtree must not hide a longer path or unbounded repeated work. Contrast existing-but-ineligible and missing descendants with valid nested payloads, optional-label omissions and graph-boundary controls, so neither top-level-only checks nor blanket refusal can pass.

A response type with write-only fields can still yield safe metadata; judge the actual serialized answer against its declared field policy at the durable replay boundary, including nested values. If publication is refused after an effect may have committed, preserve the claim or earlier safe receipt so a retry cannot repeat the effect; an atomic refusal instead rolls back the effect. Prove both boundaries through their real entry points, with safe metadata replay as a positive control.

A lock taken only when writing cannot protect an earlier snapshot, and atomic
file replacement cannot serialize another writer that uses a different lock.
**Wrong:** one writer locks and replaces its stale copy of shared configuration.
**Right:** every writer reads and merges only its owned fields under the same
stable transaction lock and ownership check; prove both transaction orders through
the real concurrent entry points, preserving each writer's committed fields.

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
which operation is blocked before releasing the competing transaction. Diagnostic
views can refresh independently, so a cross-view join can hide a live wait;
correlate requester, blocker and resource through the engine's own identities,
with held-wait, no-wait and wrong-owner controls. Follow indirect blockers too:
a row-lock queue can place the second operation behind the first waiter, so
counting only direct blockers can miss real contention. A sleep, eventual success
or empty uncalibrated join alone does not prove the intended interleaving. Assert
the final conserved state and rollback behavior as well as completion.

A sequence-backed feed cursor orders allocation, not commit: a delayed writer
can publish below a cursor already advanced past it. Where consumers resume
strictly after that cursor, serialize every writer for the same feed before
allocation through commit, or establish an equivalent no-skip publication
contract. **Wrong:** assert distinct increasing IDs; **Right:** observe a second
writer blocked behind the first in a real database fixture, then verify commit
order and complete results through the public after-cursor read, including
writers for different event types.

Independent background candidates need discovery and admission rules aligned with
actual dispatch eligibility, with typed outcomes separating deliberate capacity
holds from ineligibility, unmet prerequisites and failed attempts; otherwise an
undispatchable winner can starve later work or other tenants. Isolate failure and
retry state, durably yield selections blocked for other reasons and retain their
retry source until completion or contracted deletion; atomic batches remain a
different contract. Through the public worker or poll entrypoint, verify progress
past those selections, effective capacity holds and completion of an already-scanned
candidate after its inputs change, without an observing read completing the work. A durable idle transition does not atomically stop an in-memory worker: serialize the final pending-work check and stop publication with wake admission. Use barriers to prove a wake committed before stop cannot be consumed by the retiring slot and lost.

A fixed-priority selector can starve eligible notifications or other timers when
one periodic pass exceeds its interval and is overdue again at every selection;
burst-then-idle tests never sustain that contention. Where progress is promised
for every ready work class, verify bounded service across the outer timer and
notification/continuation selection, not just rotation within one branch. Use one
controlled clock to keep all classes ready across slow passes, with idle and
missed-tick controls proving that advancing time neither invents pending
notification work nor creates an undeclared catch-up burst.

Bound resource use and waits according to the operation's cancellation and recovery contract: capacity, batch size, deadline or durable pending state solve different needs. When a committed fact must cross a boundary, write its publication record with the state change and make consumers duplicate-safe.

In runtimes where futures advance only when polled, awaiting maintenance can
suspend the worker holding the lock it needs. Keep that worker driven, and join
or cancel maintenance with its lifetime; test actual contention and cancellation
rather than eventual completion alone.

For durable execution, represent terminal failure through the framework's documented mechanism and test replay. A returned error value and a raised exception can have different persistence semantics; neither is universally correct across frameworks.

Track failure cause separately from certainty about effects: once a request
may have reached its worker, a lost connection, timeout or subsequent worker
death can explain a missing response without proving the command did not run,
and cancellation can release a waiter while noncancellable work continues.
Preserve the unknown outcome, typed cause and original idempotency key; keep
settlement observation attached to the unresolved operation's lifetime,
including idle gaps, and replay or reconcile through the supported contract
without starting a second logical operation. Apply corrective writes only
when observed state diverges from intended state—an authoritative terminal
receipt can resolve an unknown outcome, while a late acknowledgement of
unchanged state must terminate rather than recursively rewrite it; classify a
failure as pre-dispatch rejection only when dispatch was conclusively
prevented, and a controller's terminal status alone does not prove its worker
exited or released its lock.

Verify this boundary through the real transport: have the peer receive the
request, then close the connection before response headers. Assert the typed
cause, unknown effect and a single dispatch after replay. Include a confirmed
terminal result and a rejection before any send as controls. A mock returning
a prebuilt error cannot establish which side of dispatch the failure occurred.

With PgBouncer transaction pooling, a backend connection belongs to the client
only for one transaction. Do not rely on session `SET`, `LISTEN`, temporary
objects or session-level advisory locks across transactions. Post-commit
verification resolves durable objects by stable IDs, not session-local staging;
a missing temporary object after confirmed `COMMIT` is a verifier failure, not
evidence of rollback or permission to resend the mutation. Use transaction-local
settings and transaction-scoped locks where appropriate; route genuinely
session-bound work through a supported session or direct connection. Verify the deployed pool
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

Retention based only on serving or published references can delete artifacts
still owned by an unfinished operation; a count cap may bypass an age grace
period. Read the deployed collector's precedence and protected states, then
verify in-flight delivery, recovery-point availability and expiry of unreferenced
eligible objects while preserving finite cleanup. **Wrong:** fewer objects proves
safe retention; **Right:** the pending artifact survives publication, the rollback
target stays usable and eligible abandoned artifacts expire.

A state validator can block the recovery that supplies its missing inputs;
authorization and prerequisites for recovery still apply before repair.
Restore those inputs through the supported path before applying the validator
to its full original selection and declaring success.
**Bad:** test a new guard only on healthy state; **good:** prove a recoverable
damaged input reaches repair with the guard enabled, while a recovered but
invalid input still fails.

A completion marker proves only the work and writer it identifies; a stale,
foreign-owned or malformed marker must neither suppress required repair nor
abort unrelated reconciliation. Exercise state left by previous writers and
preserve unknown data or outside references when rebuilding that evidence.

## Publication time and expiry

When the contract promises a lifetime from becoming ready or being granted,
set expiry in the same atomic update that publishes that state, after slow
capture, generation or transfer completes. Use one authoritative timestamp for
related fields. Keep the start of work separately when the API needs it.
An absolute deadline or a lifetime explicitly measured from the request keeps
that origin; publication and retries must not extend it.

Renewable inactivity deadlines and absolute lifetime limits are different
contracts: timeout supervision and fresh downstream work share the current
inactivity deadline, capped by any immutable authority horizon.
**Wrong:** give a new command the remaining absolute lifetime while its supervisor
can expire sooner; **right:** derive its timeout from the remaining inactivity
window and preserve a replay's original keyed request.
Verify that new progress advances the shared deadline, heartbeats and replay do
not, and a fresh dispatch near expiry stays within the current window.

For short-lived safety or authorization receipts, measure the complete path
from the qualifying observation to the guarded action, including client startup
and transport setup. Read-only setup may happen beforehand if the final
observation still verifies the exact target and state; extending receipt validity
to hide setup time weakens the safety contract.

A bounded side task can still cross into a periodic worker's narrow due window;
a clock read from before that task is stale when choosing the next wait.
Recompute eligibility after side work and before sleeping, preserving slot
deduplication. Drive a side task across the window boundary with a controlled
clock and prove the due slot runs once while an already-completed slot stays
suppressed.

In PostgreSQL, `now()` and `CURRENT_TIMESTAMP` name the transaction start.
Moving them to the final update of a long transaction still consumes the new
resource's retention. Use the final statement's `statement_timestamp()` or
capture one `clock_timestamp()` value for the publication update; repeated wall
clock calls can disagree within a statement
([PostgreSQL 18 date/time functions](https://www.postgresql.org/docs/18/functions-datetime.html),
read 2026-11-06).

**Wrong:** set a report's download expiry before generating and storing it.
**Right:** publish its ready state and full promised availability atomically.
Through the real entry point, work lasting at least the minimum retention must
still publish a ready, gettable, usable resource with its full promised lifetime;
an absolute-deadline control keeps its original origin.
For scheduling tests, couple producer lifetime, controller convergence and caller
deadline: derive effective eligibility across message, route and resource
constraints from their issuing events, not a late assertion clock or one storage
field. Fresh single, repeated and burst arrivals across independent contention domains must
exercise production lifecycle and expiry predicates, proving deadline-bound
progress while failed-head cleanup coexists with surviving and next-feasible-head
progress; pre-aged records, hardcoded deletion or single-head success can hide
lost work or excessive serialization. Match the claim to the observed resource
boundary: aggregate pool-model success does not establish per-node feasibility
or a reservation guarantee without evidence at those boundaries.
Prove refusal while the interval is still unexpired and recovery after expiry,
with enough margin that the refusal probe cannot pass after the deadline.
Use persistence-representable timestamps and verify encode/store/decode round
trips separately from runtime boundaries; a mocked application clock cannot
establish database-clock behavior.

**Wrong:** require one message timestamp to remain future after slow settlement.
**Right:** verify the effective interval from its issuing event, with a pre-expiry
refusal and later recovery; check timestamp encoding separately.

## Migrations

An upgrade history may depend on schema or roles predating its earliest retained
file; before choosing a fresh preview database, prove empty-target bootstrap
through the supported runner with its required ownership and privilege model.
**Wrong:** replace a role-checking wrapper to make a pooled application role run
production migrations. **Right:** verify the supported baseline and migration
role on an empty target; if unavailable, choose a declared reduced-scope profile
or explicit not-applicable result without weakening production role or isolation
guards.

Keep migration history truthful: do not record an unverified migration as applied. Follow the repository's supported migration-history procedure; a missing schema object is repaired through the owning migration mechanism.

Database replay and compilation do not establish admission by a migration safety
guard, and a green schema-snapshot check can omit migration history: compare
guarded paths and effective per-file dialects with the actual migration runners.
Add any missing shared-engine routing as an opt-in that preserves existing
defaults before enrolling consumer scopes, and read and run the delivery path's
pinned guard on the actual candidate. Explicit DDL keeps known target objects
inspectable, and a contract reference must name a real released prerequisite.

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

An output subset need not contain the dependencies needed to evaluate its rows:
a timestamp filter can remove the true predecessor while leaving a plausible,
non-null earlier row. Define adjacency from the authoritative ordering over the
necessary history before restricting scored rows; time-based pruning needs a
proven ordering guarantee or comparison with full-history evaluation.
**Wrong:** trust a non-null `LAG` over a recent slice. **Right:** place an
intermediate event outside that slice and independently assert its successor's
predecessor, exposing both hidden violations and invented gaps.

Execute changed SQL through the production driver, including parameter encoding
and result decoding, against a disposable database built from the complete
migrations. Connection strings are consumer-specific protocols: acceptance by a
generic URL parser does not establish the endpoint, option precedence or decoded
credential bytes another driver uses. **Wrong:** validate once and reuse the URL
unchanged across clients; **right:** exercise each actual parser with independently
specified targets and reserved-character credentials, including raw escape-looking
text that exposes accidental double decoding. Use the application's effective role
and verify the database version, role and relevant column types in the test. A migration-only privilege proof
precedes fixture grants: copying live permissions into setup can hide missing
migration grants. Required access follows the effective caller and reachable
operation across invoker, definer and trigger-event boundaries; a source
reference or table privilege alone does not establish an application-role call.

Derive mutation targets from authoritative ownership, not enumeration or sort
order or matching content: a foreign object can have the same schema and values
as an owned target. Through the production mutation path, vary names, layout and order
with those plausible foreign objects present, proving both their preservation
and the required owned output. For catalog-driven cleanup, also derive
independently removable objects and deletion order from authoritative dependency
metadata, and verify completed cleanup and usable post-reset state under the
actual cleanup identity, plus rollback after a late failure when atomicity is
promised.
**Bad:** sort every catalog entry by name and count rollback as recovery;
**Good:** respect owner-managed dependents and prove dependency-safe completion,
subsequent use and failure atomicity.

For parameterized SQL performance across broad and keyed selectors, a fast
custom plan or empty result can hide generic-plan cardinality errors, repeated
scans and join products. Measure populated cases through the consuming driver's
prepared-statement behavior under the effective role and row-level security
(RLS), comparing generic and custom execution plans where supported; inspect
actual rows, loops and buffers as well as latency. A set-based source or
`GROUP BY` does not prove an aggregate executes once: optimizer inlining and
cardinality choices can repeat it. Aggregate reuse is established by actual
loops × per-loop work and populated timing, not source shape. `MATERIALIZED`
prevents aggregate reexecution, but correlated scans of an unindexed materialized
pool can still be quadratic. Empty-result distributions
can reject every candidate upstream or reach costly downstream branches before
later predicates reject them all; identical output cardinality does not establish
comparable work coverage. When only existence is needed, joining then
deduplicating can enumerate every matching pair; verify bounded match work in the
actual plan, while preserving multiplicity when all pairs are required. Performance
evidence includes reachable repeated scans and function calls, distinguishing
repeated function planning from execution cost where applicable, plus cold/warm
timings that account for cost-triggered work such as compilation. An enabled
execution-feature setting does not establish runtime availability; verify that
availability in the measured environment.

When adding a variant, asset or status to a pipeline with evaluate-only and
effectful modes, prove an authorised durable round trip for each distinct source
of provenance: admission, schema constraints, commit, reload and downstream
consumer encoding. A variant with no attachment or entitlement can still require
authenticated policy metadata; adapting a populated fixture bypasses its real
admission path. **Wrong:** accept a variant from evaluate-only or manually seeded
records; **Right:** carry its selected provenance through the real consumer,
with missing-metadata refusals separate from authorised success.

Revoking an owner's ordinary privileges does not prove workload immutability:
[PostgreSQL 15.19 FK checks](https://github.com/postgres/postgres/blob/REL_15_19/src/backend/utils/adt/ri_triggers.c)
look up referenced rows as that table's owner with `FOR KEY SHARE`, which
[requires `UPDATE` privilege](https://www.postgresql.org/docs/15/sql-select.html)
and can fail after owner self-revocation even when the workload has `INSERT`.
Preserve owner capabilities required by internal FK/trigger paths while keeping
`PUBLIC` revoked and the workload a separate nonowner without owner membership
or grant options; adding a trigger or role solely to preserve owner
self-revocation obscures the actual boundary.
**Wrong:** infer append-only behavior from owner ACLs or successful reads.
**Right:** retain the real FK and record the migration-only ACL result before
fixture grants; then prove a valid nonowner `INSERT` under the declared, scoped
workload grants after complete fresh and upgrade migrations, alongside denied
workload mutations and denied `SET ROLE` to the owner.

A successful read can be policy-filtered even when it returns no warning or
error; counts, maxima and metadata inventories establish completeness only for
the effective observer's proven visibility scope, including indirect dependencies.
**Wrong:** infer no objects or missing rows from an empty privileged wrapper or a
matching filtered count. **Right:** use a known hidden object or row to distinguish
the limited observer from a full-scope control, and preserve an explicit unknown
result when scope cannot be proved.

Cross-engine SQL needs populated differential cases that distinguish rounding,
NULL/JSON behavior and collations; successful creation or empty SELECTs cannot
establish output parity. Collation can arrive through a function argument before
any table comparison, so the effective caller context belongs in the test as
well as the migrated column definitions. Source-version behavior determines an
explicit conversion: accepting extra precision or adding a tolerance can change
the contract rather than preserve it.

Focused fixtures keep fast checks small, but preserve the real enum/domain types,
required functions and relations. When changing a fixture's type, update and run
every affected seed, bind and decode path. Include a migrated-schema regression
that distinguishes the original failure; a simplified fixture alone cannot
establish compatibility with the deployed schema.

**Wrong:** substitute TEXT for an enum and convert failed decoding into a business
default. **Right:** execute the actual query under the application role, preserve
the column type, and verify the intended typed decode or explicit SQL conversion.
Propagate unexpected encoding and decoding errors. A contract's missing-value
default does not make an unreadable value equivalent to absence: a successful
bulk read can collapse per-item type or access failures into missing values.
Prove that distinction through the real adapter with both a corrupt/wrong-type
item and a genuinely absent item before deriving defaults or healthy metrics.

Sweep related projections and parameters for the same mismatch. Before removing
a suppressed error, identify the fallback it previously supplied and which live
decisions will change when the stored value is used. Verify that exposure before
publishing the correction.

## Tests

Tightening lexical match boundaries can remove accidental matches in opaque data while also losing meaningful compound names or aliases; acceptance needs both false-positive rejection and false-negative preservation cases drawn from the supported vocabulary. **Wrong:** prove only standalone words still match and embedded noise does not; **Right:** also exercise supported compounds and aliases as complete names, with adjacent-alphanumeric noise controls. Restoring a known compound does not justify accepting arbitrary prefixes, suffixes or camelCase fragments.

Stateful integration fixtures can interfere through shared effective decision keys even when their rows or transactions are unique; give independent cases distinct keys at the full scope read by production, preserving intentional sharing within a scenario. When retry, fallback or queued callbacks can converge on the same state, assert the target mechanism's effect immediately at the intended ordering boundary, before yielding to work that could mask the defect and without the observation itself repairing state. Independently check final state after queued work settles, including delayed settlement across an idle gap and a slow repair that leaves state unchanged; disabling only the target must fail its unchanged boundary assertion while the enabled control passes. A fallback completing work cannot prove retry ran; a pure formatter has no competing repair to isolate.

Test control traffic can be swallowed by the same transport a fixture mocks, and resetting a counter does not remove installed observation hooks. Keep the control channel independent and reuse or remove persistent instrumentation explicitly; calibrate zero, one and multiple effects across repeated cases. Passing each case alone does not establish that they work together in one session.

For mutation testing, use one mutation per retained contract boundary, run the complete boundary suite once unchanged as the passing control, then run each mutation only against its intended boundary. Build every mutated copy in an output directory unique to that copy, separate from the unchanged control and every other mutation; a shared build cache can silently reuse the unmutated binary. Record exact selected and executed case inventories and require each mutation to fail its target's unchanged assertion with typed evidence; compiler, fixture or setup failures are INVALID, not kills. For example, a run using one shared `CARGO_TARGET_DIR` discovered 162 tests where the mutated source should have discovered 151; discard that verdict as INVALID and rebuild the mutant in its own directory. Mutation runs are a one-off proof cited by receipt hash, never a standing CI workflow or registered test.

Derive conformance vectors' expected outcomes from the contract or specification
before reading the implementation; a green suite whose expected outcomes copy an
overbroad refusal proves agreement with the defect. A subset parser used by a
guard must distinguish supported grammar from unknown constructs rather than
reinterpret unsupported structured syntax as opaque data. Exercise
semantics-preserving representations and explicit refusal of unsupported
constructs through the real policy consumer, with valid opaque-data controls
that remain accepted. A retryable provider outcome
is not permission to dispatch again: after a durable submission marker, recovery
is GET-only. A test that drives marked recovery through the unsent
`queued`/send path can demand a duplicate POST and still pass; contrast it with
an unmarked pre-admission throttle that remains queued and retryable. Run those
vectors against the real implementation, asserting emitted POSTs, refusals,
ordering, verdicts and resulting counts. Exact clock values require a declared
recorder history;
synthetic vectors must not freeze incidental timing or internal call sequences.

An overlap or uniqueness check over derived ancestry needs tests through the
production resolver: prefilled ancestor IDs bypass traversal, and stopping at
the first matching root cannot prove no other match exists. Flattening
recursively shared payloads need not transfer identity: where the contract
distinguishes a direct parent from a transitive root, one-edge tests cannot
expose that choice, whether in inherited permissions, configuration or
provenance. **Wrong:** prefill ancestors or test only a one-edge link/reducer;
**Right:** derive expected outcomes from the contract or reference
implementation and exercise the public entrypoint, proving nested matching
roots refuse before writes while independent roots and non-matching ancestors
remain permitted, and, where that identity distinction exists, use a
distinguishing three-node chain with a valid no-inheritance control if
supported.

Choose the smallest test that fails on the defect: examples for finite decisions, properties for broad/conserved state, fuzzing for parsers, differential checks for two implementations and deterministic simulation for concurrency, retry or time. Run a regression against the pre-fix and fixed behavior where practical. Separately passing deferred handlers can still reverse accepted intent when host events and UI callbacks queue before one presentation update; verify the combined path preserves accepted event order without navigation cancelling or replaying business work already in flight. **Bad:** test modal open and dismiss separately, allowing a deferred open to reopen it after an accepted dismiss. **Good:** exercise both accepted orders before the same update through the mounted UI, asserting the final visibility and preservation of pending business work. Failure feedback can precede the committed state that makes recovery actionable, so assert restored state and control readiness at the notification itself, then exercise the next action without an extra settling wait. **Bad:** wait for a retry control to enable after an error toast; **Good:** prove it is enabled when the toast fires, retry succeeds, and in-flight duplicates still cannot dispatch.

Repeated matching reads of mutable metadata prove stability during that interval,
not which source produced an earlier transformed artifact. **Wrong:** reread the
current source twice and authorize an older output; **right:** bind immutable
inputs or reconstruct each authorized source's output in its immutable context
and require equality. Test a replacement source that stays unchanged throughout
validation, alongside unchanged-source and independently changed batch-position
controls; churn-only tests cannot expose this gap.

Cache-key or content-digest equality proves only the inputs represented by that
key or digest; independently authoritative policy omitted from it still governs
every reuse path, including fallback hits. A negative regression with the
optimization disabled or no eligible cached result cannot expose a policy bypass:
keep the optimization enabled, supply a genuine eligible hit, and vary the
omitted policy so reuse must be refused. Pair it with a valid-hit positive
control so disabling reuse entirely cannot pass as the fix.

An optional selector's omitted or empty value can be a valid mode with its own
required outputs. Test that mode through the real entrypoint and assert those
outputs as well as status: a swallowed error can keep the enclosing workflow
green while forcing an expensive fallback. Keep malformed nonempty inputs as
negative cases rather than weakening their validation.

For before/after comparisons of derived state, preserve each version's source
inputs while giving both sides equivalent dependency availability and preparation
policy; one-sided enrichment can fabricate changes in untouched entities.
Exercise an unchanged entity that shares a changed entity's dependencies through
the actual comparator, with a genuinely changed or removed entity as a
distinguishing control. **Wrong:** enrich only one side and call the resulting
gap lost state; **Right:** unchanged entities remain equal while real differences
still surface.

Normalization or projection used to validate an exact declaration may erase only
contract-defined differences: removing a subtree can also erase undeclared text,
tails or container metadata, just as stripping whitespace can change a quoted
literal interpreted by the consumer. Compare or independently validate that
remaining state before removal, pairing permitted layout/delta changes with
meaning-changing payloads at the removal boundary. **Wrong:** drop an entire
container after checking its declared children; **right:** preserve literal
values and undeclared surrounding state while accepting only the declared delta.

Source-closure checks—whether every declared source exists in the published
tree—default-deny the untracked or ignored source inventory, with exact
per-invocation waivers, rather than accumulating syntactic exceptions. Hand-written
cross-language declaration resolution can miss missing sources and falsely refuse
valid code; test `.gitignore`, `info/exclude`, `core.excludesFile`, custom extensions,
and generated-file and declared-dependency directory controls.

Compiler context explains why syntactic exceptions cannot establish closure:

- Module roots follow contextual rules rather than filenames; token kind and
  preceding control/member context distinguish regex from division, a quoted
  `"+"` from an operator, and member `.return` from control flow.
- Binding inventories distinguish runtime writes from annotation-only bindings
  and read/delete targets while respecting nested scopes; a refusal naming the
  wrong unresolved target is still a resolution defect.
- A token-tree exemption needs positive proof of the declared exempt construct;
  a valid non-exempt form reusing its operator still contains declarations that
  cannot be skipped.

For guards enforcing syntax behavior, put a real state mutation after every
supported control opener and exercise allowed and forbidden forms through
[the installed checker](../../prove-it/SKILL.md#verify-installed-entrypoint-behavior).
Cross-dialect keywords need separate controls, so a harmless idiom in one language
cannot exempt a destructive statement in another.

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

Concurrency assertions should distinguish the mechanism from scheduler latency: observe wake reasons, probe counts per wait and resource ownership at barriers, and keep benchmark timings separate from generous progress deadlines unless timing itself is the contract. A fixture that releases a resource after probing it no longer controls availability: retain ownership through the decision, or assert the permitted replacement rather than a particular resource identity. **Wrong:** require reuse of a released port on a shared runner; **right:** transfer an owned reservation for the reuse control and hold the original resource occupied for the replacement control. When acknowledgements or rechecks can emit valid repeated status events, consume them until the terminal result under one deadline while preserving subsequent frames; a trace showing timely completion with extra status messages falsifies an exact-count assertion, which should be replaced rather than marked flaky. **Wrong:** require exactly one wait event and a tight shared-runner latency; **right:** accept valid repeated waits, assert the terminal outcome and test notification versus fallback through observable causes.

For process-lifetime tests, a runtime's exit notification need not be the contract: bounded observation of authoritative process state can establish termination (including a zombie if reaping is not required), with a live-process control proving the observer still refuses nontermination. A child's ready marker does not prove its parent's signal handler or cleanup region is ready; the synchronization evidence must come from the component whose behavior the test exercises. Raw monotonic timestamps from different runtimes may have different origins: correlate observations with UTC and measure durations within each clock domain, without treating a missing stage event as evidence of when or why that stage failed.

A fixture's execution placement is part of its input: nested tool calls may select
a different host or sandbox than their enclosing call. Bind placement explicitly
through the actual nested entrypoint and verify that the child reaches the fixture's
files or listener; an outer placement setting alone does not prove that path.

A bounded retry around temporary-profile cleanup is a workaround: descendants can still write after the direct child exits. Run the child in its own process group and wait for the whole group before removing the profile; never retry a test assertion.

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
from the contract rather than freezing an incidental library output. Width-dependent
wrapping can split a required phrase without changing its words; normalize layout
whitespace in content assertions across relevant renderer settings. Preserve exact
whitespace when layout or bytes are the contract.

A component's active provider can disagree with a global compatibility setting
for locale, theme or account state. Exercise context-dependent output under the
real provider with deliberately different global state; mocking both to agree
hides which authority the component actually reads.

**Wrong:** `expect(renderedPrice).toBe(formatPrice(amount, locale))`.
**Right:** `expect(renderedPrice).toBe('US$1.99')` for a contract requiring that
currency label. A date display regression similarly asserts an independently
specified date string; a transport retry change needs no formatting cases.

Source-API refusal and out-of-band tamper detection prove different boundaries and need separate fixture routes and assertions. Exercise forbidden writes through the source API; construct tamper directly on disk and assert its detection/count independently. **Bad:** require the API to accept a forbidden write to seed a tamper count; **Good:** retain the API refusal and seed the tamper fixture without that API.

A negative test can pass for the wrong failure when setup refuses before the
injected fault. Assert the specific typed refusal or root cause, print the full
error chain on mismatch, and verify that substituting an unrelated fault makes
the assertion fail. For expected compiler failures, match machine-readable diagnostic
codes plus the intended source/API identity, never compiler English wording.
**Wrong:** accept `is_err()` or a wrapper's generic “check failed”; **right:** require
the changed-price refusal after a passing baseline, while a stale-heartbeat refusal
fails that same assertion.

When a parser promises contextual errors, test invalid input through flattened
and dynamically named maps as well as ordinary typed nesting: intermediate
buffering can preserve values while losing the source path. Assert the offending
section, named entry and key through the production entrypoint, with a valid entry
as a control. **Wrong:** accept any deserialization error; **right:** an invalid
field under a named entry identifies that entry, not only its parent table.

Before attributing state loss or duplicate work to product code, prove the fixture
reached the intended state through the real lifecycle: accepted or cursor-advanced
work may remain incomplete and legitimately trigger recovery. Use completed and
interrupted controls that read back their distinct state before the measured
action; repair setup without suppressing legitimate recovery. For UI retention,
establish a present, laid-out element with accepted input before comparison; an
absent node's empty getter is not evidence of loss.

A safety or dependency predicate can be correct while discovery or routing never
selects it; differential preservation checks include reference-only identities,
since iterating only surviving candidates hides deleted working capabilities.
Test disappearance and retained-but-broken behavior independently; an explicit
removal waiver suppresses only the local disappearance finding for an actually
removed identity. Preserve each independent reason for selection: historical
comparison coverage does not limit explicit requested assertions about objects
outside that population. Offline tests that omit verb, subresource, identity or old-object
fields establish only their modeled requests; verify alternative supported routes
through actual selection and enforcement, with permitted controls and the intended
denial. **Wrong:** infer a debug-update ban from create tests, or skip a requested
permission change because its account is absent from the old audit sample.
**Right:** exercise the alternate update route and requested objects inside and
outside comparison coverage, proving fulfilled requests pass and unfulfilled
requests fail without expanding collateral comparisons.

A helper's refusal or dry-run guarantee can disappear in public mode dispatch or
exit-status translation. Exercise allowed and refused cases through the assembled
entrypoint, asserting effects, structured output and the enclosing caller's status.
**Wrong:** count `valid: false` with exit status 0 as a rejected command; **right:**
when the command promises rejection, refusal exits nonzero without mutation while
a valid dry run exits 0 without mutation.

Test runtime behavior by calling it. Never write source-grep fake tests (`std::fs::read_to_string("src/...")`, `include_str!("../src/...")`, or `fs.readFileSync("src/...")` asserting substring presence in implementation source) as a substitute for behavioral execution. For a declarative/source contract, use a parser, lint or boundary check suited to that contract. Documentation/code drift checks are useful; exact wording pins and tests that reimplement the same logic are weak signals.

Reproduce test selection on CI's runtime version: a newer local runtime can accept selectors the deployed runner rejects. For example, `node --test tests` fails to resolve the directory on Node 22, while explicit file globs such as `node --test tests/*.test.js` work; verify discovered names/counts rather than inferring execution from an exit code ([Node 22 test runner](https://nodejs.org/docs/latest-v22.x/api/test.html#running-tests-from-the-command-line), read and reproduced 2026-11-07).

In Rust crates with multiple integration test modules, use a single integration test binary (`tests/integration/main.rs` with `mod <domain>;` submodules under `tests/integration/`) rather than many top-level `tests/*.rs` files, so `cargo test` links one integration binary instead of compiling and linking dozens of separate test executables.

For shell evidence gates, execute the actual script with the runner's shell options and inputs larger than a pipe buffer. Include clean output, missing evidence, and failure matches both early and late. With Bash [`pipefail`](https://www.gnu.org/software/bash/manual/html_node/Pipelines.html), a diagnostic pipeline such as `if grep ... | head -n 20 | grep .; then ...` can miss a known failure: `head` closes early, the first grep receives SIGPIPE, and the condition becomes false. Separate the decision from bounded display, or use a consuming display filter such as `sed -n '1,20p'`. Keep the failure predicate unchanged and prove that output truncation cannot reverse the verdict. Run a negative proof through the enclosing gate as well as its native test runner. A deliberately caught panic can pass the test framework yet fail a log-based gate. Assert the returned error directly, so the outer failure guard stays effective.

Runtime fixtures must compile and lint in the repository's compile-only configurations without runtime-only setup; passing configured execution does not establish that contract. At execution, a required resource-dependent check fails clearly when setup is absent, while an optional suite retains its documented behavior without the fixture. For optional tests, verify both states and require the fixture at the proof's invocation boundary; a green skip does not establish that database, browser or external-service assertions ran. An intentionally excluded or slow test records its reason and supported execution route, with scheduling chosen from the workload.

Share cohesive fixtures and table-driven cases where that improves readability, but vary independently treated fields independently in allowed and refused cases unless the contract guarantees equality; matching tenant and owner values can hide a boundary defect. Correct raw producer values do not prove composition: verify each consumer API’s effective defaults, sentinel interpretation and overrides before aggregation, retaining raw state wherever the producer’s own contract requires it. **Wrong:** sum an unset sentinel with a real sibling weight and let it cancel valid capacity, or globally clamp producer values; **right:** exercise the composed consumer with asymmetric unset and explicit values, varying independent properties separately and preserving legitimate negatives under their contracts.
When several implementations or adapters claim one behavioral contract, preserve
the authoritative cases’ identities, multiplicity, units and expected outcomes
across the changed boundaries; a locally reconstructed equivalent can erase the
distinguishing failure. Shared regex text can still classify differently because
runtimes vary in flags/defaults and matching units—Unicode code points, UTF-16
code units or grapheme clusters—so preserve astral, combining-character and
line-separator boundaries through actual matcher consumers; when disagreement
would grant an inspection exemption, retain inspection. **Wrong:** deduplicate
repeated transaction records before running a shared refusal case, then claim
parity; **right:** preserve both records and exercise the real persistence or
transport adapter as well as the pure decision.
A read-cost regression measures actual provider requests or database statements and work examined across the complete consumer lifecycle, including follow-on generation or validation, through the real adapters using request counters, engine statistics or query plans; rows returned and cache-friendly helper mocks do not establish that bound. For immutable-input caches, distinguish authoritative absence, successful incomplete evidence that may be retained only as unknown, and retryable failures that must not become immutable cached answers or suppress later retry. Pair reuse and downstream-cost controls with truncated responses and transient failures through those adapters, so a helper-only saving cannot hide repeated reads or turn incomplete evidence into absence.

A public caller can turn an inner typed refusal, unavailable dependency or malformed
response into successful empty data and destructive local reconciliation; zero
network calls do not prove refusal, unchanged local state or a nonzero enclosing
status. Exercise the assembled entrypoint for caller-visible refusal and preservation
of all protected data and metadata, contrasting missing/unusable input with a
validated authoritative empty snapshot that must still perform permitted removals.
For shared eligibility or availability rules, verify each public contract for temporary
unavailability, permanent denial and recovery, including discovery and retry
metadata; missing recovery evidence remains unknown.

**Wrong:** a save helper refuses correctly, but save-and-exit closes the editor
and discards pending input. **Right:** exercise refusal and success through every
side-effecting caller, preserving pending input on refusal and checking any
advertised discovery or recovery behavior against the available evidence.

Test a distributed artifact in its built environment, including a control that distinguishes the old behavior where applicable. For Android artifacts, DEX type/string references and dependency version markers do not establish that a required class is defined; verify its definition in the shipped DEX. Static initialization (`<clinit>`, including Kotlin object initialization) can fail before a method's guard executes, so trace initialization before attributing an observed refusal to that guard. Test preparation (smoke patches, dependency stripping or stubbed clients) must not affect a store-bound build; verify the required class definitions and absence of smoke-only markers in the exact uploaded artifact rather than a separately rebuilt test artifact. When a shared component changes, list every assembly, profile or bundle that consumes it, including any added on the base branch after yours was cut, carry its source, generated code and runtime resources together, and verify each assembled consumer; one green profile does not prove the others. A selected or checked-in test is not coverage until each runner compiles and executes it: confirm the reported test names or counts include it for every release profile. When a release qualifies pinned source hashes, inject test-only hooks into a disposable copy inside the test job, record the input and final hashes, and fail on input drift; never commit those hooks to the product tree. After a preimage change, inspect and compile the final transformed consumer and verify its intended behavior; zero-context patch applicability does not establish semantic correctness. Keep shell scripts in files and feed them to the container, for example `docker run -i --entrypoint /bin/sh <image> -s < test.sh`. This avoids shell-specific heredoc/command-substitution parsing. Verify the actual runner/image tool capabilities when they matter; `mawk` supports POSIX character classes.

**Wrong:** treat an authentication refusal as proof of an empty-configuration guard because the DEX contains the SDK name. **Right:** verify the required class definitions in the uploaded DEX, distinguish any initializer failure from the guard, and check that smoke-only substitutions did not reach that artifact.

For source included from multiple workspaces, compatibility depends on each
consumer's pinned dependencies, compiler configuration and ambient declarations;
a narrowed check with substitute declarations proves only that narrower boundary.
A passing runtime test or type assertion does not establish that its mock matches
the host's complete type, so the consumer's exact compilation, formatting and lint
checks remain the compatibility verdict. Capability-absence fixtures also depend
on the host's property descriptors: a native member can be non-configurable in
one runtime. A scoped replacement of the dependency can model absence without
reconfiguring that member; the unchanged production fallback and a subsequent
capability-present control establish behavior and fixture cleanup. Keep one source representation that
passes every consumer, with any suppression's narrow explanation in syntax the
checker reads, such as a Rust lint's `reason` attribute.

**Wrong:** accept an SDK test because its fetch mock runs and compiles against a
handwritten fetch declaration. **Right:** also compile with the consumer's real
runtime declarations and test-library overloads; a callable global may require
static members that the mock omitted. Likewise, one workspace's successful Clippy
run does not prove another workspace's formatter accepts their shared source.

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

- Give each remote operation an effective deadline/cancellation policy. One wall-clock budget covers admission, every fallback source and attempt, backoff including `Retry-After`, reconciliation and durable/terminal receipts, below the shortest caller timeout with completion margin. Clamp waits and requests to the remaining budget and enforce an outer hard timeout around the whole chain; neither a per-attempt timeout nor a retry-start cutoff bounds the last in-flight unit. **Bad:** give every mirror a fresh retry budget or let a server delay extend it; **Good:** prove combined exhaustion and oversized `Retry-After` finish within the unchanged caller deadline, with cancellation resumable from acknowledged durable state. Reuse clients by connection and security configuration and share retry/redaction policy.
- Avoid holding a database transaction or lock across an external call. Prefer claiming work, committing, calling and then settling when that preserves the invariant.
- Refresh key/token caches without blocking every reader. A refresh failure does not extend a credential's validity or revocation contract.
- Load related rows in set-based queries on a growing list/batch path rather than one query per row.

## Cleanup and review

Use [repository health](../../refactor/references/health.md) to verify unused paths and duplicate authorities before deletion. Before regenerating data or code, establish the authoritative baseline from the selected or deployed artifact; a checked-in snapshot can already drift. Prove preservation with the pinned, checksum-verified generator, an independent decoder and the actual consuming runtime, while validating current declarations separately; an older runtime model does not justify weakening the current schema. Compare the full decoded population, including secondary records, formulas and cached values where relevant, allow only declared changes, and name representation-only differences. A release scoped to one bundle prepares only that bundle's inputs and keeps everything else at the served bytes. Fixtures and admission evidence prepared after unrelated overlays do not attest what shipped, even when the final bundle is byte-identical. Check re-rendered goldens against the merge result CI tests, not the branch alone: compare the exact file set, dimensions and changed regions, because the base may have added cases the branch did not touch. Keep generated distribution sources reproducible when supported consumers need them; remove scratch output and evidence dumps from source, and link claims to their authoritative result.

Recorded conflict resolutions can apply cleanly after their assumptions have changed. **Wrong:** accept a cached resolution because the file parses. **Right:** compare its behavior with both current parents, reconcile changed acceptance conditions explicitly, and run the affected checks; an obsolete assertion or helper call can survive an otherwise clean merge.

Resolve a conflict in an additive registry, manifest or allowlist by stable entry identity, not by position. Compare the full entry set before and after the merge. Every entry from both sides should appear exactly once, and no existing key should change its mapping. Where order carries no meaning, keep entries sorted or keyed by identity, and check that in CI. Parallel changes then insert at different points instead of colliding at one shared append point.

Review the failure modes and checks relevant to the change through [prove-it](../../prove-it/SKILL.md). Track throughput and review latency alongside incident/revert rates on a named population and window. A metric change is a signal to investigate, not by itself proof of causation.
