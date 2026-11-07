# Developer experience

Trigger: changing an API/package, a development/build workflow, browser input or foreground lifecycle, an app-store release, or running a one-off container probe.

Optimize time from a clean environment to a useful verified result. Make failures diagnosable and recovery clear while staying within existing spending and authority limits.

## First useful success

Document the supported prerequisites/revisions, entry command, expected result,
and common failure/recovery paths. Keep the entry surface thin and route to
deeper material. A source-version change can raise the compiler minimum even
when the files touched by local patches are unchanged. Read the selected
source's toolchain declarations and keep CI and artifact-build compilers
compatible; checksums and patch applicability do not establish compilability.
Record generator inputs for generated output.

**Wrong:** Update source hashes and accept a passing patch check while the
release image still uses an older compiler. **Right:** Verify the selected
source with the compatible compiler in both CI and the artifact build.

A copied entrypoint is not a complete tool: its dependency files and
wrapper-supplied launch context are inputs too. When running outside the normal
wrapper, derive both from the pinned launcher and verify initialization of the
unchanged entrypoint before expensive work; an initialization refusal establishes
no policy or product verdict.

Local setup can change a check's input population: dependency caches placed
inside a checkout may be scanned as source even when Git ignores them. Keep
rebuildable caches outside that population, or verify the check's exclusions;
failures naming cached third-party files call for correcting input discovery.

Expanding a parent selection can leave nested exclusions effective, so recovery
is established by the complete required descendant inventory while unrelated
selections remain intact. Installer success can describe only attempted actions;
required outputs need their own completeness check, including a missing-output
control that challenges the installer's native status. **Wrong:** accept a parent
directory or a successful installer check as proof; **Right:** compare every
required file or installed capability with its declared inventory.

A generated CLI's repeated-string flag need not decode JSON, and delimiter
splitting can change an argument even when the shell preserves it. Match the
parsed request to the wire schema; whole-request JSON/YAML can preserve arrays
and punctuation that flag parsing would alter.

A schema entry or generated command advertises a request shape, not an
implemented and admitted operation for the effective identity, artifact and
target. Before relying on that route, match the deployed handler and admission
constraints to the required outcome; a public fixture needs a request through
its intended public address and confirmed cleanup, not just an in-instance
response or a declared port. A refusal disproves that route under those inputs,
not every supported route: choose another admitted path, repair the owning
capability, or mark the dependent verification unavailable.

**Wrong:** infer a usable public test service from a create command and port
flag. **Right:** establish the supported deployment path, verify an outside
request and confirm deletion before claiming the fixture worked.

Use diagnostics with exact paths/lines and distinguish invalid input, authority denial, conflict, unavailable dependency, limit, cancellation, and unknown effect where recovery differs. A wrapper’s translated error can hide the cause of a child-command failure; retain the command, exit status and bounded stderr, with secrets redacted, before choosing recovery. When raw diagnostics cannot be safely retained, preserve a known-safe execution stage and finite error code; a missing receipt leaves effects unknown until authoritative reconciliation. Diagnostic collection failures must not replace the original outcome.

A temporary-directory error can originate in a separately configured package
cache. Read the failing child's effective tool home, cache and index paths,
including existing leaf files; writable root directories and a fresh temp path
do not establish update access. Compare the original command under another
execution UID, changing only the suspected path when isolating the cause.

Choose cache sharing from its contents and trust on reuse. Package bytes with
integrity checks can use a shared group; credentials, signing keys and config
need private state. A cached executable or compiler result trusted without
reverification needs a private cache or a trusted single writer. A writable
mixed-home parent permits replacing its private entries even if file modes stay
0600, so grant access only to named content leaves and retain read-only parents.
Setgid preserves a group, not write permission. For shared Git metadata, use
additive access and default POSIX ACLs that preserve the old effective masks and
the original owner's access on future child-created objects; `chgrp` or setgid
alone can revoke sibling access. Verify old contents and future writes under
restrictive umasks with two real UIDs, and report any privilege skip explicitly—a
skipped privileged case is not acceptance. Preserve outside links and active
locks. A declared tool version must either launch or fail clearly after an
install/lock error, rather than silently running another major.

Identity fixtures keep the real UID and primary GID separate; one cannot be
derived from the other. Assert both OS identities, retain an environment where
they differ, and make synthetic fixture UIDs or kinds distinct from the executor's
real identity so the fixture cannot accidentally exercise the current-user path.
**Bad:** return `(current_uid(), current_uid())` or use the executor as a synthetic
other user; **Good:** verify the actual tuple and a distinct synthetic identity.

Before concluding a local-mode override is ineffective, check the mode flag's
effective value in a fresh task-runner child; exporting it in the parent shell
does not prove propagation. Strict filtering can discard the flag and silently
restore a default. For controls that do not change task outputs, use version-matched
pass-through configuration rather than content-hashed inputs or globally
loosening filtering ([Turbo configuration](https://github.com/vercel/turborepo/blob/v2.11.10/apps/docs/content/docs/reference/configuration.mdx#globalpassthroughenv),
read 2026-11-06). Verify both control values in fresh child executions, an
unrelated variable still filtered, and unchanged task hashes; cached log replay
is not a new child observation.

A dependency's generic function can be instantiated in its consumer, so a
package-only optimization override may leave the failing machine code unchanged;
bind the diagnosis to the emitting crate and exact linked artifact, rather than
the global profile banner. Use a supported setting—Cargo package overrides have
no environment-variable equivalent—and distinguish reduced stack demand from
rendered correctness or shipping performance
([generics](https://doc.rust-lang.org/cargo/reference/profiles.html#overrides-and-generics),
[package configuration](https://doc.rust-lang.org/cargo/reference/config.html#profilenamepackagename),
read 2026-11-06).

Before a remote submission, verify the effective project, environment and
credential bounds through supported configuration; checkout defaults can select
another target. Scope credentials to that child process and use the
[run-record guidance](turn-boundaries.md#persist-results-before-yielding) for
network policy and recoverable completion.

An offline dependency miss can reflect a different source or cache selected by a
subprocess, even when the required package bytes exist. Compare the failing
subprocess's working directory, tool home and environment with its effective
package source before diagnosing missing artifacts; verify a configuration
repair from that same directory, including a temporary directory outside the
checkout, while preserving caller overrides
([Cargo configuration discovery](https://doc.rust-lang.org/cargo/reference/config.html#hierarchical-structure),
read 2026-11-06).

Faster source checkout or materialization must preserve the graphs and readable
object bodies its consumers need under their final credential state: synthetic
snapshots can lose original history, and a complete commit graph does not prove
historical blobs remain readable. Choose acceptance cases from actual consumer
read paths in the consuming environment, including original HEAD/base graphs,
SHA-only bases and requested merge bases where used; file-only checks keep their
existing transfer scope. Measure checkout or materialization step duration
separately from queue wait, and treat mixed runner/cache samples as observations
rather than matched causal benchmarks.

For repeatedly used sandbox build environments, bake the pinned compiler, SDK
and required system packages into a versioned build image rather than installing
them during every task. Keep build tools separate from minimal runtime images;
project dependencies still resolve from the project's lockfile. Verify a clean
sandbox can compile and run a representative check without an interactive setup
or an inherited host cache. Measure image pull/startup and build time separately;
change the preinstalled set when measured total setup cost or toolchain needs
change ([Docker multi-stage builds](https://docs.docker.com/build/building/multi-stage/),
read 2026-11-05).

Audit native requirements in the locked transitive dependencies' build scripts
and binding generators, including ordinary crates without a `-sys` suffix.
Check headers, linker libraries, configuration executables and compiler-loaded
libraries; finding a package with `pkg-config` alone may miss a later binding or
link failure. Add an image-build probe that exercises those requirements. Then
run the original failing command through the ordinary build route, preserving
its size, architecture and region, and record the selected image digest.
Map distinct template selectors and read their effective pins; success on one
placement does not prove another pool received the published image. Resolve
the public lease name to its authoritative identifier before
matching runtime objects, because display names and runtime labels can differ.

## Container builds and probes

Verify the exact Dockerfile and build context in a clean builder. Host tests do
not establish that a build stage contains the tools invoked by locked
dependencies, such as Git, compilers or generators. Install each tool in the
stage that uses it, then boot the resulting image with its declared user and
entrypoint. Exclude generated build trees and unrelated caches with
`.dockerignore` at the effective context root, while retaining required inputs;
check the transferred context size ([Docker build context](https://docs.docker.com/build/building/context/),
read 2026-11-06).

A matching version and checksum identify an artifact, not the capabilities of its edition or build. Match the published variant to the required inner command; a license or feature refusal is a verifier-selection failure, not evidence that the dependency is broken.

A CLI can fail in configuration or interpreter startup before the requested
program runs; a successful transport-only probe does not establish that program's
execution. Before relying on a privileged effect, prove a harmless operation-specific
result through the actual interpreter, input mode, identity, mounts, environment
and filesystem restrictions, including absent default files, while retaining a
sanitized failure cause. **Bad:** a remote shell exits zero, so assume an embedded
program executes; **Good:** the workload's exact launch chain emits the program's
expected marker using only its declared inputs.

Installed tools do not prove runtime-created devices or mounts exist. Exercise
required capabilities in a fresh instance with its shipping entrypoint and user,
and retain bounded daemon startup logs before that instance ends; a path inside
a destroyed instance cannot supply the missing evidence.

Before relying on a repository-wide image-input guard, compare its discovered
Dockerfiles, build contexts and targets with the builds invoked by CI workflows
and service manifests. Include images built only by a workflow: a passing guard
cannot protect a build it never discovers. For each newly covered image, exercise
the guard against its real `COPY` set and prove that omitting a required local
dependency fails. Keep coverage discovery and dependency validation as separate
assertions so one cannot silently narrow the other.

Before submitting a one-off probe, inspect the final rendered container spec.
When `kubectl run --overrides` replaces the container array, include the image,
command, arguments, environment references, stdin setting and required security
and resource settings together. Check this with `--dry-run=client -o json`;
command-line arguments alone do not establish what survived the override.
For a noninteractive database probe, prefer the client's explicit query option
and attach without stdin. Keep credentials in the cluster through secret
references rather than exporting their values
([kubectl run](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_run/),
read 2026-11-06).

Admission dry runs validate a resource, but do not exercise the client's API
requests; verify the operation under its declared identity, including any
metadata reads before the final request. For example, granting only
`pods/exec` creation leaves `kubectl exec <pod>` unable to read that named Pod;
scoped Pod GET access is also required
([kubectl v1.36.0 source](https://github.com/kubernetes/kubernetes/blob/v1.36.0/staging/src/k8s.io/kubectl/pkg/cmd/exec/exec.go),
read 2026-11-06).

Require the requested operation's output as well as its exit status. A client
can exit successfully without receiving a query. For example, verify the
expected metadata columns or an aggregate count; if empty output is legitimate,
request an explicit completion marker. Keep the query within the authorized
data scope, then delete the disposable probe and confirm its absence. A green
container exit with no operation-specific evidence leaves the check unverified.

## Database test fixtures

An isolated database fixture needs every schema object referenced by its
queries: PostgreSQL resolves joins even when the seeded `CASE` branch does not
use their values. Derive those dependencies from the migration-owned schema
([database boundary tests](code.md#database-boundary-tests)) and run the actual
consuming database test; compilation and parser checks cannot prove resolution.
Compare the test's local setup with CI's phase order: a later migration hook
cannot prepare an earlier test phase. A migrated local database can hide missing
fixture setup; verify the consuming test from the database state available at
its actual CI phase. Fixture isolation must cover every namespace the real query
resolves; a private `search_path` does not isolate schema-qualified objects, so
choose an isolation boundary that contains them too.
If a complete replay fails under the application role while the deployed schema
works, compare effective privileges along the failing function call chain in
both databases. Record each differing function, role and privilege, the live
read time and its migration source. A live-only grant is schema drift that can
break a restore. Preserve the clean-replay failure; a separate compatibility
proof may reproduce only the verified live grants while the schema owner fixes
their migration source. Broad fixture grants would hide that missing contract.
A complete schema replay does not by itself make a fixture legal or active.
Derive fixture values and controlled transitions from the real validator, schema
constraints, and role, privilege and state-transition preconditions, with every
guard enabled; extreme values or times can break a cross-field or ordering
constraint before the intended behavior runs. A small setup-and-transition
control should reach the decision under test, separating invalid or inactive
setup from a behavior failure.
Fixture isolation must hold across the actual executor's processes: a shared
database can couple independent cases through global reconciliation, even when
their row identifiers differ. A process-local mutex does not isolate a
process-per-test runner.

**Wrong:** omit the customer table because the invoice uses guest checkout.
**Right:** include the joined table and execute the invoice projection.

Bootstrap servers can answer a local probe and then stop before the serving
process starts. Read the entrypoint and choose a readiness signal the temporary
process cannot satisfy; a socket-only bootstrap must fail a TCP readiness probe
([PostgreSQL image entrypoint](https://github.com/docker-library/postgres/blob/master/docker-entrypoint.sh),
read 2026-11-06). A successful socket query alone does not establish final-server
readiness.

Locate the failed phase before changing a timeout: service readiness,
connection establishment, schema setup and test execution have different
budgets. Give cold fixture DDL a separate bounded setup connection when it
needs more time; derive its budget from measured setup duration and margin.
Keep the application's connection limits, assertions and scenario timing intact.

Apply connection settings before constructing objects that capture them. For
JDBC, select the catalog before creating or preparing statements, and recreate
statements after changing it: `Connection.setCatalog` does not affect existing
statements ([Java JDBC contract](https://docs.oracle.com/javase/8/docs/api/java/sql/Connection.html#setCatalog-java.lang.String-),
read 2026-11-06). Compile the actual changed setup block with its real imports
and pinned dependencies; an isolated helper can miss ambiguous imported types.
Then run the fixture against its supported database and driver to establish
that setup completes and the existing assertions execute.

Capture bounded server logs and available session diagnostics on every failure
before destroying the disposable database. Retain the original exit status
when diagnostics fail or time out. Exercise readiness, setup and test failures,
plus unavailable diagnostics, and verify capture precedes cleanup. Keep this
diagnostic access scoped to synthetic fixtures and redact credentials.

## Agent-native access

Use supported device authorization for interactive user delegation when the client needs it, following [auth.md](auth.md#agents-clis-and-mcp-clients). Unattended agents use their own scoped machine/workload grant and an authorized secret store. The actual grants and runner/spend policy belong in the repository's instructions; a permitted existing credential does not need a new approval ritual.

## Interfaces and packages

Keep one executable public contract and derive clients where that prevents drift. Use consistent naming, pagination, idempotency, deadlines, and typed errors with safe messages/retry semantics.

A published package states its API, runtimes, and license and follows its versioning contract. Keep published artifacts immutable; version plus platform/build identity and digest distinguishes intentional multi-platform outputs. Test the serialization, ordering, and failure behavior promised to consumers.

When publication requires the selected commit to equal a live branch head, even
documentation-only commits invalidate that identity. Coordinate every writer to
that branch through the authoritative validation boundary, without a standing
freeze beyond it. After a terminal prewrite validation failure, retain its receipt
and use a distinct attempt from reviewed current source only when the executed
steps and authoritative target state prove no publication side effect and an
unused immutable version; never blindly rerun the retired source.

Before adding a changeset, check the package's `private` field and release exclusions, and follow the repository's existing changelog convention for packages excluded from publishing.

Preserve the resolver-generated lockfile bytes as the resolved dependency graph;
never reconstruct transitive dependencies from version logs. A direct requirement
need not equal the selected version: validate it under the resolver's documented
constraints and resolution strategy, not textual equality
([lockfile semantics example](https://docs.unity3d.com/2022.3/Documentation/Manual/upm-conflicts-auto.html),
read 2026-11-06).

Before pinning consumers to a registry or download mirror, verify the live
metadata response shape and canonical archive URL through every redirect to the
final bytes. Derive requests from the actual provider contract rather than a
guessed per-version endpoint or a test fixture's URL layout, and verify a real
package download through the mirror.

For a client failure, read the executable path and version used by the failing
caller before adding another fix. Compare it with the first published release
containing the relevant behavior, then trace the installer's version and checksum
pins. If that release already fixes the failure, update the consumer through its
supported installer and rerun the original command. A published fix does not
update a pinned installation. Keep the checksum pinned with the version; an
automatic update proposal should copy both from the release's checksum artifact
and follow normal review, rather than fetching a new checksum at install time.
Verify the upgraded client's default workflow with the consumer's actual
credential path: a broader maintainer login can hide scope requirements in newly
enabled optional endpoints. A working version command or an explicitly disabled
feature does not establish that the default workflow still succeeds.

### Private package verification

Prove a private release from a fresh consumer with registry-read credentials only, no source checkout, dependency replacement, or populated package cache. Read the published bytes back and match version, digest, and source provenance to the consumer's resolved lockfile. Compile and run a useful consumer case; upload success or dependency resolution alone does not prove it works.

Resolve the pinned toolchain and compiler launchers before replacing `HOME`. Explicitly disable inherited credential helpers for anonymous probes; an empty `HOME` alone does not prove they are anonymous. Give the authenticated consumer only its intended registry credential and exclude unrelated inherited authentication/configuration.

Request the endpoint's expected response format. Distinguish an explicit access denial from a protocol or unsupported-media-type error. Confirm the same object exists with the authorized reader before treating an anonymous denial as privacy evidence. Test refusal of an existing version and mismatched provenance without issuing an overwrite.

If verification fails after publication, preserve the artifacts. Repair the verifier and rerun read-only acceptance against that exact immutable version instead of republishing it.

## Source generation

Generator obligations follow changed inputs, including declarative objects,
even when no generator code changes. Trace those inputs through the repository's
generation and freshness checks to every affected registry, client and document.
An alert's valid dedicated runbook, for example, can still leave its generated
index stale. In-process tests can reuse cached modules and hide startup or
import-path failures; exercise affected generation entrypoints in fresh processes.
A lockfile-only install also changes source.

Requiring a generator's missing output at admission creates a circular
prerequisite: validate canonical inputs and invariant routing before generation,
not that missing output. Post-generation acceptance and ordinary consumer checks
still require complete valid output.

Generated bytes can be writable while their destination directories belong to
another user: archive-mode copying may then fail only on metadata preservation.
Match the copy's metadata requirements to the artifact contract; content-only
source projections need no owner or timestamp changes, while executable or
symlink artifacts must retain their required semantics.

When byte reproducibility is required, repeated builds under one execution
identity do not prove portable determinism; vary plausible ambient inputs and
compare artifact bytes and embedded metadata while preserving intentional source
metadata. Bind each proof receipt to the exact tested generator and input artifact
digests; changes to either require rerunning the affected proof and regenerating
its receipt, not relabelling old evidence.

When extracting generated inputs from a container, resolve logical identities
through declared relationships and schema identifiers; archive member order,
active views and copied headers can select notes or duplicate data. Verify
reordered members and ambiguous lookalikes without changing which logical
records are compiled.

Contract conformance and generated-file freshness are separate: regeneration can
emit consistent clients from an invalid public contract. Run the repository's
actual standards checker as well as its generation check. When generated outputs
include source hashes, format and validate the canonical inputs before generation;
even a whitespace-only source edit invalidates that provenance and requires regeneration.

For a remote generator or package manager, establish how changed files and
deletions return to the publishing checkout. A tar of existing changed paths
omits removals and leaves obsolete generated files.
Use the supported local mutation mode, an output mirror, or a validated deletion
manifest restricted to generator-owned paths.
Inspect the local diff across the expected output directories and run the affected
generation check or consumer assertion before publishing. A successful remote exit
establishes execution there; it does not establish complete local output. Read-only
checks can use the ordinary remote verification path.

Some remote executors snapshot source when they admit a job, not when it is
submitted. Submit from a dedicated worktree and leave it untouched until the
executor reports that it has synced. Bind the receipt to the digest of the synced
tree and the digest of the test script. A receipt that names only a branch or
commit can attest a later local edit that was tested in place of the submitted
head.

When generated files conflict, combine the canonical inputs and regenerate the
complete output set. Choosing one parent's generated file can silently discard
the other's served guarantees. Preserve both revisions and check each parent's
response compatibility when both changed public contracts.

If CI adds a generated commit, inspect that commit and fast-forward the checkout
before further edits. Re-evaluate checks and approvals against the new head;
results tied to the previous head do not authorize the generated delta.

**Wrong:** Publish after the contract compiler succeeds, leaving a downstream
web registry unchanged. **Right:** Run the complete generation chain, return its
outputs, and verify the web consumer's generated-file assertion before publishing.

## Internal development

Follow the [delivery workflow](../SKILL.md): practical targeted checks, publication, iteration on the same branch, and the repository's required merge/release path. State what remains unverified and rerun affected checks after a repair. Independent review does not manufacture a new publication/completion stage.

- **Dependency audit repairs:** Read the exact advisory ranges, every independent affected lockfile, and effective workspace overrides before choosing versions. An exact root override can keep a vulnerable resolution despite a dependency manifest bump. Update the applicable requirements and overrides together, regenerate each lockfile with its package manager, and run the audit without event-based skips. Keep a required major-version migration separate from a drop-in repair when they verify independently; report unrelated findings without suppressing them.

- **Independent dependency environments:** Install a standalone project's declared dependencies in the same environment as its compiler and tests. A root workspace install or an earlier remote build does not establish that this independent graph is present; [isolated installs](https://bun.com/docs/pm/isolated-installs) restrict packages to declared dependencies (read 2026-11-06). If unrelated dependencies prevent a broad install, use the affected project's lockfile and a pinned compiler for the targeted check while retaining required integration coverage.
- **Path dependency changes:** Find every workspace that consumes the changed package or feature, including through another path dependency. Regenerate each affected lockfile with the package manager and verify locked resolution with transitive dependencies included. The package's own tests or metadata produced with `--no-deps` can pass while a consumer's locked compilation fails.
- **Remote-tracking refs in single-branch clones:** Before comparing a checkout with its remote base, inspect `remote.<name>.fetch` and verify the exact remote-tracking SHA after fetching. In a single-branch clone, `git fetch origin main` can update `FETCH_HEAD` without updating `origin/main`; use the repository's supported fetch command or an explicit refspec (`git fetch origin main:refs/remotes/origin/main`).
- **Safe worktree cleanup:** Before removing a worktree or clearing a working folder, check unpushed commits and untracked/ignored evidence as well as `git status`. Copy only unique, small receipts (reports, logs, captures, patches), never rebuildable build trees.
- **Isolated child builds:** Any child that touches files needs its own worktree or private directory, even when its task is described as read-only; never share a Cargo target directory across source revisions. If an export is reported missing while the source defines it, inspect the actual rlib with `nm -g --defined-only` and bind it to the source/target revision before editing code. Stale Cargo fingerprints can reuse an old rlib and produce false missing-export errors; do not change code to appease a stale artifact.
- **Private test-fixture paths:** Give each test run its own generated certificates, logs, database files and sockets, including outputs whose library defaults use a shared temporary filename. Configure the output path when another run owns that filename; leave its permissions and files alone. Keep Unix socket paths within the operating system's length limit. If a short alias is needed, verify that the server and connection-URI parser resolve it to the same owned directory before running the suite.
- **Background processes launched by tools:** Shell `&`/`nohup` can leave a compound command's launcher or inherited tool pipes open, so the call may wait for the child's lifetime. Use a supported persistent execution session or process manager, or on POSIX a [`subprocess.Popen`](https://docs.python.org/3/library/subprocess.html#subprocess.Popen) child with stdin `DEVNULL`, stdout/stderr files, `close_fds=True` and `start_new_session=True`; the launcher must return immediately without waiting for that child. After the call returns, independently verify that the child is still running and has produced its first expected sample before reporting it as active. Keep the [missed-event fallback](../../unblock/SKILL.md#missed-completion-events) until delivery is verified. If a tool call hangs after starting a daemon, inspect the wrapper's open file descriptors and close or terminate only the pipe-holding wrapper.
- **Configuration reload and graceful drain:** Choose configuration reload semantics (dynamic read, atomic snapshot, or rolling restart) to match the service's consistency needs. When stopping a service that lacks a built-in drain path, close ingress first, verify external queues are preserved, wait for active work to reach zero, and then stop the process.
- **Client-verified readiness:** Measure service availability from the moment a real client request or sign-in succeeds, not merely when an orchestrator readiness probe turns green.
- **Time-critical operational windows:** When an operational cutover or mitigation cannot wait for slow CI queues, apply the supported live control first, verify the dry-run and live state, and then merge the durable source change to restore automatic reconciliation.

### Supervised runtime health

When readiness depends on a supervised device, renderer or worker, check its
capability after startup as well as the host process. Use a bounded probe in the
existing active-work reconciliation; it must neither extend idle activity nor
keep unused capacity running. A transport failure alone leaves liveness unknown.

If the runtime fails while its host holds caller files or recovery state, expose
the unavailable capability without deleting that state. Refuse new dependent
work with a typed error before dispatch, while preserving existing file access and
completed request replays. When relaxing a shared admission helper for recovery,
audit every mutating caller, including setup and installation paths. Keep quota
ownership and normal release or expiry accounting consistent with the retained
host. A stateless host can follow its existing replacement policy.

Forward the child's diagnostic output and wait result to retained logs before
the host can disappear, filtering credentials and caller content. Record an
exit code and a signal separately when the supervisor can distinguish them;
label a shell's signal-like status as a convention rather than proof of cause.
Missing logs limit the conclusion; do not substitute a resource or flag change
for evidence of the failure.

Verify with a disposable instance: terminate only the supervised runtime, then
observe management readiness, refusal without dispatch, retained files and
request replays, and centrally readable exit evidence. Release the instance and
confirm cleanup through the normal path.

## Workflow admission

A control protects a witnessed failure or a real invariant within its owning authority. Remove or recalibrate a control that blocks work without protecting either, rather than adding another bypass.

A generic guard derives each target's contract and required verdicts from its
authoritative declarations, distinguishing confirmed absence from failed
discovery instead of imposing the originating target's conventions or substituting
an unrelated approval. Exercise a permitted alternative declaration alongside a
refusal through the real entrypoint, preserving independent exact-candidate
review requirements so fail-closed behavior cannot hide rejection of every
supported target.

Admission follows an operation's resource and effect. Publishing source does not apply a cluster change; CI scheduling and deployment/reconciliation have their own constraints. Keep actual repository holds and writer/rate budgets effective without making unrelated cluster telemetry a publication gate. GitHub merge-queue build concurrency limits `merge_group` builds, not source publication by owner labels.

## Selected release inputs

Before changing a release assembled from a historical base plus explicit files,
trace the publisher's materializer and build command. List the source paths,
assembled destinations, generated artifacts and unchanged dependencies it
actually consumes. A source change elsewhere in the checkout can pass tests
without entering the release. Register the consumed source path in each affected
profile, or use a reviewed exact-path exclusion with a reason. Refuse registered
inputs that no longer exist, including paths left behind by a rename.

A small selector diff can import an entire newer plan. Before merging an
isolated release binding, compare the complete resolved candidate file list and
per-path blobs and file modes with the serving plan, including inherited base
inputs and runtime resources; the difference must equal only the declared change
under test. Resolve the serving selection from its producer's frozen approval,
not the selected source revision's own selector.
Bind that proof to the candidate head and serving revision, and refresh it if
either changes: matching counts or passing source tests do not establish scope.

Read how dependency binaries reach the runtime. A copied prebuilt binary needs
both assembly inclusion and permission in the artifact policy when that policy
keeps other dependencies byte-identical. A direct source overlay into a compiled
module can replace that route; require binary synchronization only while those
binaries remain the delivery mechanism. Derive registration and runtime scope
from the input-to-destination mapping and actual consumers, not plan membership:
an assembly can retain another role's scaffolding. Shared inputs require
registration in every consuming profile without creating false mixed scope.

Keep ordinary source registration separate from release selection. Read the
selector and lock history before requiring every source PR to regenerate a
frozen release binding; validate that binding where the release is selected.
Frozen-release fixtures resolve the plan, inputs and policy at the revisions the
publisher actually consumes; rebinding them to fixture HEAD changes the release
being proved. An unrelated later checkout edit must leave that proof passing,
while drift in a selected input must fail it.
Replay a witnessed omitted-input diff and a known registered diff through the
actual guard, and test both source-overlay and prebuilt routes when supported.

## Bulk mutations

Before bulk cancellation, deletion, closure, re-dispatch, labeling or overwriting,
map each candidate to its real owning object and derive eligibility from
authoritative scope and lifecycle records; provider existence or a nonarchived
search hit does not establish operational membership. Keep declared exclusions
and unresolved mappings out of the write set, and prove both controls against
the operation's eligibility rule: an ineligible object classifies as **keep**,
and an eligible object as **act** (for cleanup, a live object is **keep** and a
stale one is **act**).
Dry-run the full candidate set; stop and investigate if either class takes nearly
all candidates or **keep** is empty, rather than treating uniform agreement as proof.
Mutate at a paced rate and log object IDs, owner mappings, prior state and outcomes
so supported reversals or re-dispatches are possible; preserve unrecoverable data
before destructive action.

**Wrong:** cancel CI runs whose own `head_sha` is absent from open PR heads.
**Right:** for `workflow_run`, resolve the triggering run and its PR through the
event's `workflow_run` payload (including `workflow_run.head_sha`); the downstream
run's own `head_sha` and `head_branch` describe the default branch, not the PR.

Source: [GitHub workflow events](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflow_run), read 2026-11-06.

## Continuous integration

When an expected pull-request workflow has no run, check event eligibility before
changing runners: read the current head, draft/job conditions, mergeability and
configured activity types. GitHub suppresses `pull_request` runs while the PR
has a merge conflict; its default activity types exclude `ready_for_review`.
Resolve a witnessed conflict or add the intended event, then verify a run bound
to the new head. A new workflow absent from the default branch cannot yet be
started with `workflow_dispatch`; repeating that missing-workflow request will
not help. A healthy run already queued or executing needs no restart.

Source: [GitHub workflow events](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows), read 2026-11-06.

PR title/body edits can start `pull_request: edited` workflows and cancel prior
checks through `concurrency.cancel-in-progress`; read the event types and
concurrency before treating metadata as prose alone. While runners are starved,
leave titles and bodies of PRs with CI unchanged and put follow-up links in one
comment on a route without an `issue_comment` CI trigger. **Wrong:** polish a
queued PR's wording and restart its checks; **Right:** preserve the existing run
and comment, preparing required routing metadata before starting CI.

Sources: [GitHub workflow events](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#pull_request)
and [workflow concurrency](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency), read 2026-11-06.

Routing expressions that read `github.event` use the triggering webhook payload;
a later label edit does not change an existing run's routing. Authorized routing
metadata must be present in an eligible event, whose activity type is configured;
verify the resulting run while preserving healthy work already in flight.
**Wrong:** assume a new label moves queued jobs; **Right:** read the event and
routing expression before choosing a supported event with the intended metadata.

Source: [GitHub context](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#github-context), read 2026-11-06.


- Dependency installation alone does not establish test readiness: workspace
  exports may resolve to generated files, and assertions may invoke external
  executables. The package's exports and CI setup identify those prerequisites;
  they belong in the test's own lease, with the production version when an
  evaluator or runtime is part of the claim. A missing module or executable
  leaves behavior untested; source aliases or skipped assertions change the claim.
  **Wrong:** replace a missing published export with a source alias, or install
  a browser in one disposable lease and run its suite in another.
  **Right:** build the exported package and prepare the pinned executables and
  system libraries in the lease that runs the affected tests.
  See [Playwright CI setup](https://playwright.dev/docs/ci), read 2026-11-06.
- Keep required checks fast enough for the workload, with draft, ready, merge-group and default-branch coverage declared beside the workflows. A lifecycle transition can require new checks at the same source revision: exercise it while the predecessor is unfinished, proving the required run is admitted independently while same-stage duplicates preserve the authoritative result. **Wrong:** treat a valid cancellation expression as proof that a queued predecessor released its concurrency group; **Right:** observe both runs, and separate their groups by lifecycle state when cancellation leaves the required run waiting ([GitHub workflow concurrency](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency), read 2026-11-06). Cancellation guards alone do not protect queued work: under GitHub's default one-pending-slot behavior, a stable non-PR group can evict an older pending run even with `cancel-in-progress: false`; unique per-run non-PR groups or an explicitly supported queue preserve those runs. Reusable workflows inherit the caller's `github.workflow`, so a caller and callee sharing that group can cancel or block their own invocation; verify the resolved call graph rather than each block in isolation.
- A required aggregate verdict reflects failure of its required work and identifies the failed check, even when the inner command is silent; explicitly non-blocking cleanup and diagnostics are separate; never mask a required failure with success syntax or a missing resource. A healthy-path pass or dependency edge cannot prove propagation: failure or cancellation may skip an intermediate job that a later aggregate accepts. **Wrong:** infer coverage from an all-green chain; **Right:** witness a required failure reaching a non-passing aggregate through every intermediate boundary, or prove those transitions before reducing the graph.
- A new API lookup in a shared action changes the authority needed by every invoking job, including intermediate aggregate jobs and result producers; granting the final required-check job does not grant its dependencies. Match each invocation to its actual token and effective job/reusable-workflow permissions, adding only missing scopes while preserving required existing grants: a job-level `permissions` map sets unlisted scopes to `none`. **Wrong:** add `checks: read` only to the final aggregate; **Right:** inventory and test every caller that now reads Check Runs under its own effective token ([GitHub permissions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#permissions), read 2026-11-07).
- Reusable workflows inherit the caller's `github` context and hosted-runner billing: a public library does not prove a public caller. For public-only standard hosted routing, require `github.event.repository.visibility == 'public'`; **Wrong:** negate `private` or compare it with `false`, since missing properties and loose equality can admit unknown payloads. Inputs may select standard hosted labels only after that proof, never assert visibility. Verify the entire reusable library—including every `workflow_call` workflow, locally uncalled entrypoints and actions—with a named private caller requesting literal `ubuntu-latest`, a public opt-in, legacy no-input calls and missing repository payloads across PR, push, merge-group, manual and scheduled events; an evaluator that cannot model the exact context property leaves the census unresolved.
  Sources: [reusable workflow context and billing](https://docs.github.com/en/actions/reference/workflows-and-actions/reusing-workflow-configurations), [missing context properties](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts), [expression coercion](https://docs.github.com/en/actions/reference/workflows-and-actions/expressions#operators) and [repository visibility](https://docs.github.com/en/rest/repos/repos#get-a-repository), read 2026-11-06.
- Before publishing a disposable CI probe workflow or consuming bounded external attempts, validate the complete orchestration at its provider-expression and embedded-program boundaries; optional diagnostics must not suppress the measured case. Cross-job values travel through declared outputs and `needs` rather than another job's `steps` context, and missing context properties can change comparisons through empty-string coercion. Runtime acceptance follows the client contract and measurement layer—application-attempt limits do not establish transport-request counts—so retain failed verifier records and distinguish orchestration or assertion failures from the actual client's output and exit status.
- Before editing a workflow file in a product repository, read which workflows run on a push to the default branch and what each one publishes so an infrastructure or cache edit does not unintentionally trigger a production release.
- Bind each verification result to the complete source range, graph/input actually checked, checks executed, workflow path or ID, event, branch, exact commit and run attempt; display titles can change independently. An immutable webhook baseline can be internally consistent yet stale relative to a checked-out synthetic merge, so identify the materialized candidate's graph while preserving intentional event-head, manual-input and merge-queue-entry comparison contracts. **Wrong:** call a historical receipt stale using another baseline, or extend a last-commit/manual pass to the whole PR; **Right:** validate the complete applicable diff against its intended baseline and confirm required steps ran under the relevant event predicates.
- Match a browser-test artifact's build configuration to the journey being claimed. A pack that deliberately omits an embedded signing key can establish offline rendering while being unable to authenticate a real guest. Read the build inputs and declared secret bindings before scheduling a live journey, and check the served source revision before creating a synthetic account. For a supported local mode, exercise its first useful action with the service deliberately disabled; separately prove that a configured but unresolved account stays blocked until its record loads. A rendered entry screen or a configuration predicate alone cannot establish either behavior. When a suitable preview is unavailable, use the normal release path and verify its deployed revision; keep offline, preview and live results distinct.
- When a startup regression escaped compilation and unit checks, put the affected interaction into the existing merge gate using the exact candidate artifact. Require its result through the aggregate verdict on both ready PRs and merge groups; a scheduled or post-merge journey only detects damage after admission. Keep the interaction driver and its acceptance predicate shared across these paths, and retain the default-branch check as the delivered-artifact receipt.
- Derive affected-check selection and skips from complete reader inputs—imports, subprocesses, generated files, fixtures, schemas/registries and direct source reads across languages/workspaces—not test-directory proximity or filename suffixes; discover readers by changed paths and semantic types, fields or commands. Workflow invocation is distinct from inner compilation or test selection: unknown or unreadable dependencies conservatively invoke the check. Consolidating independently triggered workflows preserves their original event/path scope, effective permissions and at least one unfiltered proof where previously promised; identical copied job bodies establish none of these. Recompute those readers and affected checks from the integrated candidate after a base merge or rebase: earlier passes do not cover newly introduced contract consumers. Declarative command edits can preserve execution while breaking exact-text selectors: update reader/fixture assertions together, allowing harmless representation changes without losing behavioral or ordering checks, and run those consumers. Scans can select typed fixtures without naming paths, copied/restored code inherits current repository contracts, and shared helpers inherit each entrypoint's lint policy; run the enclosing suite and state its scope when dependency coverage remains unresolved.
- Narrowing package selection can change resolved features and remove a consumer's gated tests even when the reverse-dependency closure is complete. Preserve the reference suite's resolved configuration while filtering execution, and compare its discovered nonignored test names with terminal execution events; aggregate success or a nonzero count cannot prove coverage. **Wrong:** select every consumer using isolated defaults; **Right:** retain the reference feature graph and require every expected case to execute ([Cargo feature unification](https://doc.rust-lang.org/cargo/reference/features.html#feature-unification), read 2026-11-06).
- Passing unit tests establish only their build configuration: test-only imports or reexports (such as Rust `cfg(test)`) can hide missing symbols in production. Pair affected tests with a compile check of the shipping binary or library using its actual feature set and target. **Wrong:** infer production compilation from a green unit-test build; **Right:** verify the non-test shipping target separately.
- For a regression selected by a target, filter, disabled marker or external prerequisite, trace the discovered inventory through the registered execution route; inventory every disabled test, whatever its stated reason, against the named tests the route actually ran in the required environment. A binary-target run can pass while the regression belongs to the library target; a missing resource can turn every case into an early return. Adjust selection at the owning package or runner boundary and verify execution there: a configured but unavailable prerequisite fails explicitly, while an intentionally resource-free job is separate from the required database proof ([executed-test evidence](../../prove-it/SKILL.md)).
- First execution can expose stale expectations, product defects or fixture drift: distinguish these using the asserted contract and its history, and retain a negative that detects the intended fault after any fixture repair. A reduced fixture establishes only its installed schema and protections; omitted migrations, constraints, triggers, policies and defaults remain stated limitations on the result.
- When a build or release helper changes its direct or transitive inputs, align every consumer's sparse-checkout patterns, selective container `COPY` layers, per-job toolchain setup and deploy `watch_paths` with what it reads or runs. Full-checkout tests or a predecessor's prepared environment can hide missing dependencies; exercise the helper after applying each consuming job's real checkout or copy rules and runtime setup ([Git sparse-checkout](https://git-scm.com/docs/git-sparse-checkout), read 2026-11-06).
- Derive local lint and formatting checks from the complete changed-file list against the PR base, including generated forms, module roots, import barrels and manifests; match each CI check's input selection, flags, configuration and exclusions. Source files and embedded copies can use different validators, so a pass over one form leaves the other unverified even when their bytes match; regenerate affected copies after canonical edits and recheck when inputs change. **Wrong:** infer standalone script validity from a green embedded-shell scanner, or import grouping from a formatter-only pass; **Right:** run each applicable CI validator over its actual input population.
- When inserting or reordering generated collection entries, search consumers by emitted field names, including ignored integration tests and database proofs. Find entries by their stable identity when checking their values; assert positions separately when order itself is part of the contract. An ignored test still consumes the generated shape, so compile it and name the isolated CI proof that remains pending when its database is unavailable locally.
- Share suitable build artifacts/caches. Isolate cache/credential ownership and choose priority-aware capacity from measured use and the repository's priorities.
- Size time/resource bounds to the operation being measured: an enclosing hang ceiling covers the complete enrolled inventory, sequential fixtures and child commands, calibrated from measured runtime on the smallest declared runner plus margin. Preserve inner per-case bounds and correctness assertions; separate independent scenarios into fixtures with named results, but keep a shared deadline when aggregate latency is the acceptance contract. A corpus split preserves the complete input inventory and fail-closed parsing and coverage assertions; report total and slowest-case times so missing work cannot masquerade as a speedup. Check runner billing against the existing grant: standard public hosted runners are free, while larger runners are billed even for public repositories.
- Classify assertions by what they protect when making measurements advisory: runner load can perturb timing, while finite outputs and numerical accuracy bounds may enforce correctness. **Wrong:** remove every numeric assertion because timings are noisy; **Right:** report noisy timings while retaining correctness checks. Quarantine a demonstrated flaky case instead of retrying until green; a named defect or infrastructure repair can justify an affected rerun. Dependency-unavailability decisions can time out on real retry backoff before reaching the assertion: inject the failed resolution into the production decision path while retaining adapter and entrypoint coverage. Measure real waiting when retry timing is itself the acceptance contract.
- Before a local integration proof, read its fixture contract: an empty database
  and a migrated database are different inputs. Select the test runner's supported
  fixture before treating a relation-exists error as a product defect. Check
  scratch-directory ownership and Unix socket path limits; use supported
  per-run overrides for writable, short paths instead of changing shared tools.
- When testing scheduling decisions, give competing callbacks the same controlled clock, including clock reads inside the callbacks. Advance it explicitly to check both overlap suppression and a later interval that must run; suppressing every callback must fail the test. Restore replaced clocks and scheduler functions, then run the enclosing suite to expose leaked state or mismatched time sources. Use real elapsed time when latency or throughput is itself the acceptance contract.

### Browser input and foreground tests

Use trusted browser input when acceptance depends on a browser default action,
such as Tab moving focus. Assert both event cancellation and the resulting
active element; synthetic `KeyboardEvent` dispatch only checks the listener path.
Trusted delivery and an uncancelled event do not prove a native default ran:
calibrate the input bridge against the actual effect in a minimal positive control,
including generated character input when applicable, before attributing its absence
to application code. Exercise that control both after fixture reset and under the
fixture's active mocks: a mocked product transport can acknowledge a driver
request without delivering input. Keep the input driver's control path independent
of mocked product transport, preserving the native default-effect assertion and
behavioral negative when repairing the bridge.
For tab visibility or window blur, change actual browser focus and verify
`document.hidden` and `document.hasFocus()` before judging the application.
Disable automation focus emulation for that scenario, and use a headed browser
when the headless browser does not expose the required transition.

Establish foreground focus before measuring input-induced lifecycle changes,
so startup transitions do not contaminate the measured sequence. Check the
workflow invocation as well as the test file: a standalone trusted-input driver
provides no CI coverage until the workflow runs it against the compiled fixture.

For an interaction that fails after a fresh load, test fresh and returning
browser contexts separately against the production artifact. Record whether
the press precedes hydration or reaches a live handler. Hold and release any
first-session admission request so its cookie write and refresh cannot race
unobserved with the interaction. Check that the same control remains mounted
and retains its state through that refresh; a warm session or development build
can omit the transition entirely. If an early press does not replay, show a
visible readiness state until the control can accept input. Run the same guard
against the failing artifact and the repair before attributing the result.

Arm animation measurement before the action and control animation time while
waiting for lazy content to mount. Measure both the first entrance after a cold
load and a warmed entrance: warming a media-preference effect can hide a first
entrance defect. Require the measured node to exist, distinguish an immediate
endpoint change from interpolation across frames, and use static and missing
content as negative controls. See [reduced-motion acceptance](parity.md#ui-coverage-geometry-and-painted-output)
for the product behavior that these measurements must establish.

**Wrong:** dispatch Tab, manually focus the next button, and report that the
browser exit works. **Right:** press Tab through the browser, check that an
internal destination cancels it, then check that a boundary press moves focus
outside without a manual focus call.

Primary references read 2026-11-06: [UI Events keydown defaults](https://www.w3.org/TR/uievents/#event-type-keydown)
and [Chrome DevTools focus emulation](https://chromedevtools.github.io/devtools-protocol/tot/Emulation/#method-setFocusEmulationEnabled).

## App-store client releases

Read the current store controls and the product's release contract. Identify the artifact, compatibility/data/account effects, and the supported staged or direct rollout path. Choose staging from actual change risk and available telemetry rather than a universal number of percentage steps. Verify installation/update and the affected user journey on the released build; know the store's stop/rollback limits before relying on them.

- **Distinguish container state from public availability:** On App Store Connect and Google Play Console, a release marked ready or completed can still be in review or held by managed publishing. Read the review submission items (`../../prove-it/references/app-store-state.md`) and confirm public installability from the live store listing or version install share.
- **Verify backward and forward compatibility on live upgrades:** When cutting a client build from `main` ahead of an older live version, verify sign-in, purchase delivery, and SDK contracts against the currently serving backend, and test an in-place upgrade from the exact store-published binary so returning users never lose account access or paid entitlements.
- **Bind test builds to their exact binary receipt:** A store or TestFlight build may package an earlier binary or pinned native/SDK overlay than the workflow commit that submitted it. Record both the packaged binary's build receipt and its required server/web dependencies in the release notes.
- **Capture inside the real host app:** Verify SDK sheets and embedded views inside the target host binary rather than relying solely on a standalone component gallery preview.
- **Monitor target-SDK and OS install eligibility:** Track managed-publishing holds, open policy declarations, and target-API restrictions so new users on current OS versions are never blocked from installing.

## Merge queue

Before arming a merge, verify the repository's declared approval requirements
through the [current-head review and check results](../../prove-it/SKILL.md#pull-request-checks-and-merge-queue-state);
provider merge eligibility can leave a required review unenforced.

Use the normal queue with its required checks and existing incident-priority rules. Diagnose a red default branch from its completed failing run and repair the owning cause. Coordinate a bottleneck's own repair so an unrelated hold does not prevent recovery. Keep the actual labels, grants, and runbook beside the queue implementation. Read existing auto-merge settings before changing them; preserve an already-correct request instead of disabling and rearming it merely to restate its current values.

- **Publication and merge intent:** Read the publisher's merge defaults before
  creating or updating a PR that must remain held. Omitting an activation flag
  does not disable default auto-merge, including on an already-ready PR. Supply
  its explicit draft or hold option in that submission, including for a stack opened for review while its
  prerequisite is pending. A feature branch may lack the integration branch's
  required checks and merge immediately when publication enables auto-merge.
  Verify the published PR's head, base, hold and actual merge state. Retain the
  hold until the prerequisite is merged and the PR targets its intended
  integration branch; then follow that branch's required checks and queue.

  **Wrong:** "The title says review, so publishing this stack cannot merge it."
  **Right:** "The publisher enables auto-merge; I submitted an explicit hold and
  verified that the PR remains open on the intended base."

- **Forecasting and lost jobs:** Account for the queue's parallel-build concurrency when estimating wait times. Restore a lost job or ejected entry according to the [current parent-operation lifecycle](../../unblock/SKILL.md#parent-operation-recovery); a successful retry of a retired merge group does not establish queue recovery. A real test failure is fixed or quarantined, never retried.
- **Branch reuse and queue state:** Match workflow runs by exact head SHA rather than branch name alone. Converting a PR to draft does not automatically remove an active merge-queue entry; inspect and dequeue the queue entry explicitly if needed.
- **Avoid redundant branch updates:** Because the merge queue tests each entry against the latest base automatically, do not merge `main` into a conflict-free PR branch—doing so invalidates completed CI checks and restarts the queue wait. Update a branch only to resolve a merge conflict or pull in a newly required base file.

## How it is judged

Measure publication, admission/runner wait, compilation, and test spans separately. Record median/p95, failure/ejection rate, and recovery time on a named population/window. Choose budgets from the workload and objective, and follow the repository's quarantine and rerun rules.

Primary references checked 2026-10-30: [GitHub merge queues](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue), [Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions), [contexts](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts), [expressions](https://docs.github.com/en/actions/reference/workflows-and-actions/expressions), and [job outputs](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/pass-job-outputs).

Primary references checked 2026-11-02: [Git fetch remote-tracking mappings](https://git-scm.com/docs/git-fetch#CRTB) and [GitHub workflow run names](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#run-name). Private-package references read at 19:00 UTC: [Git 2.47.3 credential-helper reset](https://github.com/git/git/blob/v2.47.3/Documentation/gitcredentials.txt) and [Cargo registry authentication](https://doc.rust-lang.org/cargo/reference/registry-authentication.html).
