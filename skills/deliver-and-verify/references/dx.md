# Developer experience

Trigger: changing an API/package, a development/build workflow, browser input or foreground lifecycle, an app-store release, or running a one-off container probe.

Optimize time from a clean environment to a useful verified result. Make failures diagnosable and recovery clear while staying within existing spending and authority limits.

## First useful success

Document the supported prerequisites/revisions, entry command, expected result, and common failure/recovery paths. Keep the entry surface thin and route to deeper material. Resolve the reproducible toolchain and dependency graph from source; record generator inputs for generated output.

Use diagnostics with exact paths/lines and distinguish invalid input, authority denial, conflict, unavailable dependency, limit, cancellation, and unknown effect where recovery differs.

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

A synced source snapshot can contain a synthetic commit without the original
history. For checks that compare commits, preserve the original HEAD and base
graphs, including a base supplied only as a SHA, and prove the requested merge
base remotely; file-only checks keep their existing transfer scope.

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
If a complete replay fails under the application role while the deployed schema
works, compare effective privileges along the failing function call chain in
both databases. Record each differing function, role and privilege, the live
read time and its migration source. A live-only grant is schema drift that can
break a restore. Preserve the clean-replay failure; a separate compatibility
proof may reproduce only the verified live grants while the schema owner fixes
their migration source. Broad fixture grants would hide that missing contract.
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

Before adding a changeset, check the package's `private` field and release exclusions, and follow the repository's existing changelog convention for packages excluded from publishing.

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

For local or remote generation, identify every generation entrypoint and its
outputs from the repository's scripts and CI workflow. In-process tests can reuse
cached modules and hide startup or import-path failures; exercise each changed
generator through its actual entrypoint in a fresh process. Follow canonical
inputs through downstream projections, including web registries, clients and
documentation. The primary compiler may produce only part of the required output.
A lockfile-only install also changes source.

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
- **Private test-fixture paths:** Give each test run its own generated certificates, logs, database files and sockets, including outputs whose library defaults use a shared temporary filename. Configure the output path when another run owns that filename; leave its permissions and files alone. Keep Unix socket paths within the operating system's length limit. If a short alias is needed, verify that the server and connection-URI parser resolve it to the same owned directory before running the suite.
- **Backgrounding long-lived processes from agent tool calls:** In `cd dir && nohup server > log 2>&1 &`, the trailing `&` backgrounds the subshell while leaving the tool's stdout/stderr pipe open until the server exits, hanging the tool call. Redirect the outer subshell explicitly (`(cd dir && exec server) > log 2>&1 < /dev/null &`) or use a supported persistent execution session or process manager. Redirection alone does not prove that a child survives the launching tool call. After that call returns, verify that the process is still running and has produced its first expected sample before reporting the watcher as active. Keep the [missed-event fallback](../../unblock/SKILL.md#missed-completion-events) until delivery is verified. If a tool call hangs after starting a daemon, inspect the wrapper's open file descriptors and close or terminate only the pipe-holding wrapper.
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
per-path blobs with the serving plan, including inherited base inputs and runtime
resources; the difference must equal only the declared change under test.
Bind that proof to the candidate head and serving revision, and refresh it if
either changes: matching counts or passing source tests do not establish scope.

Read how dependency binaries reach the runtime. A copied prebuilt binary needs
both assembly inclusion and permission in the artifact policy when that policy
keeps other dependencies byte-identical. A direct source overlay into a compiled
module can replace that route; require binary synchronization only while those
binaries remain the delivery mechanism. Derive registration from the input to
destination mapping, since their directory names can differ.

Keep ordinary source registration separate from release selection. Read the
selector and lock history before requiring every source PR to regenerate a
frozen release binding; validate that binding where the release is selected.
Replay a witnessed omitted-input diff and a known registered diff through the
actual guard, and test both source-overlay and prebuilt routes when supported.

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
- Keep required checks fast enough for the workload, with draft, ready, merge-group and default-branch coverage declared beside the workflows. A lifecycle transition can require new checks at the same source revision: exercise it while the predecessor is unfinished, proving the required run is admitted independently while same-stage duplicates preserve the authoritative result. **Wrong:** treat a valid cancellation expression as proof that a queued predecessor released its concurrency group; **Right:** observe both runs, and separate their groups by lifecycle state when cancellation leaves the required run waiting ([GitHub workflow concurrency](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency), read 2026-11-06).
- A required aggregate verdict reflects failure of its required work. Name the failed check in the log or summary, including when the inner command is silent; an exit code alone leaves the failure unidentified. Cleanup and diagnostic jobs can be non-blocking when that is explicit; do not hide a failed required check behind success syntax or missing resources.
- Validate workflow references and their scope. A nonexistent context property evaluates to an empty string; evaluate comparisons using the operator's documented coercion rules. Cross-job values travel through declared outputs and `needs` rather than another job's `steps` context.
- Before editing a workflow file in a product repository, read which workflows run on a push to the default branch and what each one publishes so an infrastructure or cache edit does not unintentionally trigger a production release.
- Bind a verification result to the workflow path or ID, event, branch, exact commit, and run attempt. Display names can be dynamic; accepting or rejecting a run by its title alone can select the wrong execution or refuse the right one.
- Match a browser-test artifact's build configuration to the journey being claimed. A pack that deliberately omits an embedded signing key can establish offline rendering while being unable to authenticate a real guest. Read the build inputs and declared secret bindings before scheduling a live journey, and check the served source revision before creating a synthetic account. For a supported local mode, exercise its first useful action with the service deliberately disabled; separately prove that a configured but unresolved account stays blocked until its record loads. A rendered entry screen or a configuration predicate alone cannot establish either behavior. When a suitable preview is unavailable, use the normal release path and verify its deployed revision; keep offline, preview and live results distinct.
- When a startup regression escaped compilation and unit checks, put the affected interaction into the existing merge gate using the exact candidate artifact. Require its result through the aggregate verdict on both ready PRs and merge groups; a scheduled or post-merge journey only detects damage after admission. Keep the interaction driver and its acceptance predicate shared across these paths, and retain the default-branch check as the delivered-artifact receipt.
- Select affected checks from actual dependencies: imports, subprocesses, generated files, fixtures and direct source-file reads, including consumers in another language or workspace. Before skipping a suite on a path-only diff, search for references to the changed files and directories. A source refactor can break a test elsewhere even when the public behavior stays the same. Update all affected reader and fixture assertions together and run the consuming tests. Shared test helpers inherit each including entrypoint's lint policy, so run those consumers' lint commands too. If the dependency map is incomplete, run the enclosing suite and state its scope.
- Passing unit tests establish only their build configuration: test-only imports or reexports (such as Rust `cfg(test)`) can hide missing symbols in production. Pair affected tests with a compile check of the shipping binary or library using its actual feature set and target. **Wrong:** infer production compilation from a green unit-test build; **Right:** verify the non-test shipping target separately.
- For a regression selected by a target, filter, disabled marker or external prerequisite, trace the discovered inventory through the registered execution route; inventory every disabled test, whatever its stated reason, against the named tests the route actually ran in the required environment. A binary-target run can pass while the regression belongs to the library target; a missing resource can turn every case into an early return. Adjust selection at the owning package or runner boundary and verify execution there: a configured but unavailable prerequisite fails explicitly, while an intentionally resource-free job is separate from the required database proof ([executed-test evidence](../../prove-it/SKILL.md)).
- First execution can expose stale expectations, product defects or fixture drift: distinguish these using the asserted contract and its history, and retain a negative that detects the intended fault after any fixture repair. A reduced fixture establishes only its installed schema and protections; omitted migrations, constraints, triggers, policies and defaults remain stated limitations on the result.
- **Synchronize selective container `COPY` layers and deploy `watch_paths` when changing build script inputs:** When an installer or build script changes which files it reads (for example, switching from `Cargo.toml` to a separate pin or lock file), update every selective `COPY` layer in `Dockerfile*` that runs before that script and every service's `watch_paths` in the deployment manifest; otherwise pre-merge CI against a full checkout passes while post-merge container builds fail or skip releases.
- Derive local formatting checks from the complete changed-file list against the PR base, including module roots, import barrels and manifests. Match CI's file selection, flags and configuration; a pass on implementation files alone leaves other changed files unverified. A formatter-only pass can omit import/export grouping, so use CI's check command to verify it. Recheck when the diff or configuration changes, and preserve CI's generated-file exclusions.
- When inserting or reordering generated collection entries, search consumers by emitted field names, including ignored integration tests and database proofs. Find entries by their stable identity when checking their values; assert positions separately when order itself is part of the contract. An ignored test still consumes the generated shape, so compile it and name the isolated CI proof that remains pending when its database is unavailable locally.
- Share suitable build artifacts/caches. Isolate cache/credential ownership and choose priority-aware capacity from measured use and the repository's priorities.
- Size time/resource bounds to the operation being measured: an enclosing test deadline includes every sequential fixture and child command. Independent scenarios need separate fixtures and named results under the existing per-case bound; keep a shared deadline when aggregate latency is the acceptance contract. Check runner billing against the existing grant: standard public hosted runners are free, while larger runners are billed even for public repositories.
- Classify assertions by what they protect when making measurements advisory: runner load can perturb timing, while finite outputs and numerical accuracy bounds may enforce correctness. **Wrong:** remove every numeric assertion because timings are noisy; **Right:** report noisy timings while retaining correctness checks. Quarantine a demonstrated flaky case instead of retrying until green; a named defect or infrastructure repair can justify an affected rerun.
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

Use the normal queue with its required checks and existing incident-priority rules. Diagnose a red default branch from its completed failing run and repair the owning cause. Coordinate a bottleneck's own repair so an unrelated hold does not prevent recovery. Keep the actual labels, grants, and runbook beside the queue implementation. Read existing auto-merge settings before changing them; preserve an already-correct request instead of disabling and rearming it merely to restate its current values.

- **Publication and merge intent:** Read the publisher's merge defaults before
  submitting a change that must remain held. Supply its explicit draft or hold
  option in that submission, including for a stack opened for review while its
  prerequisite is pending. A feature branch may lack the integration branch's
  required checks and merge immediately when publication enables auto-merge.
  Verify the published PR's head, base, hold and actual merge state. Retain the
  hold until the prerequisite is merged and the PR targets its intended
  integration branch; then follow that branch's required checks and queue.

  **Wrong:** "The title says review, so publishing this stack cannot merge it."
  **Right:** "The publisher enables auto-merge; I submitted an explicit hold and
  verified that the PR remains open on the intended base."

- **Forecasting and lost jobs:** Account for the queue's parallel-build concurrency when estimating wait times. If a required job is marked lost by the runner host (`self-hosted runner lost communication`) or an aggregate gate times out with zero failed child checks, inspect the run first: if no rerun is already in flight, the PR's writer reruns only that lost job once for the current head SHA. A real test failure is fixed or quarantined, never retried.
- **Branch reuse and queue state:** Match workflow runs by exact head SHA rather than branch name alone. Converting a PR to draft does not automatically remove an active merge-queue entry; inspect and dequeue the queue entry explicitly if needed.
- **Avoid redundant branch updates:** Because the merge queue tests each entry against the latest base automatically, do not merge `main` into a conflict-free PR branch—doing so invalidates completed CI checks and restarts the queue wait. Update a branch only to resolve a merge conflict or pull in a newly required base file.
- **Timeline-based ejection diagnosis:** When a PR is ejected from the merge queue, read the `removed_from_merge_queue` event reason in the PR timeline before acting; for a `checks_timed_out` ejection on an unchanged green head, re-enqueue once through the normal path.

## How it is judged

Measure publication, admission/runner wait, compilation, and test spans separately. Record median/p95, failure/ejection rate, and recovery time on a named population/window. Choose budgets from the workload and objective, and follow the repository's quarantine and rerun rules.

Primary references checked 2026-10-30: [GitHub merge queues](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue), [Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions), [contexts](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts), [expressions](https://docs.github.com/en/actions/reference/workflows-and-actions/expressions), and [job outputs](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/pass-job-outputs).

Primary references checked 2026-11-02: [Git fetch remote-tracking mappings](https://git-scm.com/docs/git-fetch#CRTB) and [GitHub workflow run names](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#run-name). Private-package references read at 19:00 UTC: [Git 2.47.3 credential-helper reset](https://github.com/git/git/blob/v2.47.3/Documentation/gitcredentials.txt) and [Cargo registry authentication](https://doc.rust-lang.org/cargo/reference/registry-authentication.html).
