# Developer experience

Trigger: changing an API/package, a development/build workflow, browser input or foreground lifecycle, an app-store release, or running a one-off container probe.

Optimize time from a clean environment to a useful verified result. Make failures diagnosable and recovery clear while staying within existing spending and authority limits.

## First useful success

Document the supported prerequisites/revisions, entry command, expected result, and common failure/recovery paths. Keep the entry surface thin and route to deeper material. Resolve the reproducible toolchain and dependency graph from source; record generator inputs for generated output.

Use diagnostics with exact paths/lines and distinguish invalid input, authority denial, conflict, unavailable dependency, limit, cancellation, and unknown effect where recovery differs.

For repeatedly used sandbox build environments, bake the pinned compiler, SDK
and required system packages into a versioned build image rather than installing
them during every task. Keep build tools separate from minimal runtime images;
project dependencies still resolve from the project's lockfile. Verify a clean
sandbox can compile and run a representative check without an interactive setup
or an inherited host cache. Measure image pull/startup and build time separately;
change the preinstalled set when measured total setup cost or toolchain needs
change ([Docker multi-stage builds](https://docs.docker.com/build/building/multi-stage/),
read 2026-11-05).

## Container builds and probes

Verify the exact Dockerfile and build context in a clean builder. Host tests do
not establish that a build stage contains the tools invoked by locked
dependencies, such as Git, compilers or generators. Install each tool in the
stage that uses it, then boot the resulting image with its declared user and
entrypoint. Exclude generated build trees and unrelated caches with
`.dockerignore` at the effective context root, while retaining required inputs;
check the transferred context size ([Docker build context](https://docs.docker.com/build/building/context/),
read 2026-11-06).

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

Require the requested operation's output as well as its exit status. A client
can exit successfully without receiving a query. For example, verify the
expected metadata columns or an aggregate count; if empty output is legitimate,
request an explicit completion marker. Keep the query within the authorized
data scope, then delete the disposable probe and confirm its absence. A green
container exit with no operation-specific evidence leaves the check unverified.

## Agent-native access

Use supported device authorization for interactive user delegation when the client needs it, following [auth.md](auth.md#agents-clis-and-mcp-clients). Unattended agents use their own scoped machine/workload grant and an authorized secret store. The actual grants and runner/spend policy belong in the repository's instructions; a permitted existing credential does not need a new approval ritual.

## Interfaces and packages

Keep one executable public contract and derive clients where that prevents drift. Use consistent naming, pagination, idempotency, deadlines, and typed errors with safe messages/retry semantics.

A published package states its API, runtimes, and license and follows its versioning contract. Keep published artifacts immutable; version plus platform/build identity and digest distinguishes intentional multi-platform outputs. Test the serialization, ordering, and failure behavior promised to consumers.

### Private package verification

Prove a private release from a fresh consumer with registry-read credentials only, no source checkout, dependency replacement, or populated package cache. Read the published bytes back and match version, digest, and source provenance to the consumer's resolved lockfile. Compile and run a useful consumer case; upload success or dependency resolution alone does not prove it works.

Resolve the pinned toolchain and compiler launchers before replacing `HOME`. Explicitly disable inherited credential helpers for anonymous probes; an empty `HOME` alone does not prove they are anonymous. Give the authenticated consumer only its intended registry credential and exclude unrelated inherited authentication/configuration.

Request the endpoint's expected response format. Distinguish an explicit access denial from a protocol or unsupported-media-type error. Confirm the same object exists with the authorized reader before treating an anonymous denial as privacy evidence. Test refusal of an existing version and mismatched provenance without issuing an overwrite.

If verification fails after publication, preserve the artifacts. Repair the verifier and rerun read-only acceptance against that exact immutable version instead of republishing it.

## Internal development

Follow the [delivery workflow](../SKILL.md): practical targeted checks, publication, iteration on the same branch, and the repository's required merge/release path. State what remains unverified and rerun affected checks after a repair. Independent review does not manufacture a new publication/completion stage.

- **Commands that produce source files:** Before running a package manager or generator through a remote command wrapper, check where its output is written and whether files return to the local checkout. A lockfile-only install still mutates source. Use the supported local mutation mode or retrieve the generated artifacts, then read the local diff before committing. A successful remote exit alone does not establish a local source change. Read-only checks can use the ordinary remote verification path.
- **Dependency audit repairs:** Read the exact advisory ranges, every independent affected lockfile, and effective workspace overrides before choosing versions. An exact root override can keep a vulnerable resolution despite a dependency manifest bump. Update the applicable requirements and overrides together, regenerate each lockfile with its package manager, and run the audit without event-based skips. Keep a required major-version migration separate from a drop-in repair when they verify independently; report unrelated findings without suppressing them.

- **Independent dependency environments:** Install a standalone project's declared dependencies in the same environment as its compiler and tests. A root workspace install or an earlier remote build does not establish that this independent graph is present; [isolated installs](https://bun.com/docs/pm/isolated-installs) restrict packages to declared dependencies (read 2026-11-06). If unrelated dependencies prevent a broad install, use the affected project's lockfile and a pinned compiler for the targeted check while retaining required integration coverage.
- **Remote-tracking refs in single-branch clones:** Before comparing a checkout with its remote base, inspect `remote.<name>.fetch` and verify the exact remote-tracking SHA after fetching. In a single-branch clone, `git fetch origin main` can update `FETCH_HEAD` without updating `origin/main`; use the repository's supported fetch command or an explicit refspec (`git fetch origin main:refs/remotes/origin/main`).
- **Safe worktree cleanup:** Before removing a worktree or clearing a working folder, check unpushed commits and untracked/ignored evidence as well as `git status`. Copy only unique, small receipts (reports, logs, captures, patches), never rebuildable build trees.
- **Private test-fixture paths:** Give each test run its own generated certificates, logs, database files and sockets, including outputs whose library defaults use a shared temporary filename. Configure the output path when another run owns that filename; leave its permissions and files alone. Keep Unix socket paths within the operating system's length limit. If a short alias is needed, verify that the server and connection-URI parser resolve it to the same owned directory before running the suite.
- **Backgrounding long-lived processes from agent tool calls:** In `cd dir && nohup server > log 2>&1 &`, the trailing `&` backgrounds the subshell while leaving the tool's stdout/stderr pipe open until the server exits, hanging the tool call. Redirect the outer subshell explicitly (`(cd dir && exec server) > log 2>&1 < /dev/null &`) or use a process manager. If a tool call hangs after starting a daemon, inspect the wrapper's open file descriptors and close or terminate only the pipe-holding wrapper.
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

## Continuous integration

- Keep the required feedback path fast enough for the workload. Name which checks run on drafts, ready PRs, merge groups, and the default branch, and where expensive/device/integration coverage runs. Concrete job names, rollout modes, and gate labels live with their implementation.
- A required aggregate verdict reflects failure of its required work. Name the failed check in the log or summary, including when the inner command is silent; an exit code alone leaves the failure unidentified. Cleanup and diagnostic jobs can be non-blocking when that is explicit; do not hide a failed required check behind success syntax or missing resources.
- Validate workflow references and their scope. A nonexistent context property evaluates to an empty string; evaluate comparisons using the operator's documented coercion rules. Cross-job values travel through declared outputs and `needs` rather than another job's `steps` context.
- Before editing a workflow file in a product repository, read which workflows run on a push to the default branch and what each one publishes so an infrastructure or cache edit does not unintentionally trigger a production release.
- Bind a verification result to the workflow path or ID, event, branch, exact commit, and run attempt. Display names can be dynamic; accepting or rejecting a run by its title alone can select the wrong execution or refuse the right one.
- Match a browser-test artifact's build configuration to the journey being claimed. A pack that deliberately omits an embedded signing key can establish offline rendering while being unable to authenticate a real guest. Read the build inputs and declared secret bindings before scheduling a live journey, and check the served source revision before creating a synthetic account. For a supported local mode, exercise its first useful action with the service deliberately disabled; separately prove that a configured but unresolved account stays blocked until its record loads. A rendered entry screen or a configuration predicate alone cannot establish either behavior. When a suitable preview is unavailable, use the normal release path and verify its deployed revision; keep offline, preview and live results distinct.
- When a startup regression escaped compilation and unit checks, put the affected interaction into the existing merge gate using the exact candidate artifact. Require its result through the aggregate verdict on both ready PRs and merge groups; a scheduled or post-merge journey only detects damage after admission. Keep the interaction driver and its acceptance predicate shared across these paths, and retain the default-branch check as the delivered-artifact receipt.
- Select affected checks from actual dependencies: imports, subprocesses, generated files, fixtures and direct source-file reads, including consumers in another language or workspace. Before skipping a suite on a path-only diff, search for references to the changed files and directories. A source refactor can break a test elsewhere even when the public behavior stays the same. Update all affected reader and fixture assertions together and run the consuming tests. Shared test helpers inherit each including entrypoint's lint policy, so run those consumers' lint commands too. If the dependency map is incomplete, run the enclosing suite and state its scope.
- For a regression in a separate test binary or behind a database prerequisite, inspect the effective runner filters and setup path. Compilation can succeed while the required integration binary is excluded, and a missing resource can turn every case into an early return. Read the exact-head job's inner report for the named regressions, executed count and skipped count. A configured but unavailable prerequisite fails explicitly; an intentionally resource-free job is separate from the required database proof. Adjust selection at the owning package or runner boundary and verify execution there.
- **Synchronize selective container `COPY` layers and deploy `watch_paths` when changing build script inputs:** When an installer or build script changes which files it reads (for example, switching from `Cargo.toml` to a separate pin or lock file), update every selective `COPY` layer in `Dockerfile*` that runs before that script and every service's `watch_paths` in the deployment manifest; otherwise pre-merge CI against a full checkout passes while post-merge container builds fail or skip releases.
- Derive local formatting checks from the complete changed-file list against the PR base, including module roots, import barrels and manifests. Match CI's file selection, flags and configuration; a pass on implementation files alone leaves other changed files unverified. Recheck when the diff or configuration changes, and preserve CI's generated-file exclusions.
- When inserting or reordering generated collection entries, search consumers by emitted field names, including ignored integration tests and database proofs. Find entries by their stable identity when checking their values; assert positions separately when order itself is part of the contract. An ignored test still consumes the generated shape, so compile it and name the isolated CI proof that remains pending when its database is unavailable locally.
- Share suitable build artifacts/caches. Isolate cache/credential ownership and choose priority-aware capacity from measured use and the repository's priorities.
- Keep time/resource bounds appropriate to the job. Check runner billing against the existing grant: standard public hosted runners are free, while larger runners are billed even for public repositories.
- Quarantine a known flaky test instead of retrying until green. A corrected defect or repaired infrastructure can justify rerunning the affected check; identify what changed.
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
