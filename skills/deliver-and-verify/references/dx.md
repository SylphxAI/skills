# Developer experience

Trigger: changing an API/package, a development/build workflow or an app-store release.

Optimize time from a clean environment to a useful verified result. Make failures diagnosable and recovery clear while staying within existing spending and authority limits.

## First useful success

Document the supported prerequisites/revisions, entry command, expected result and common failure/recovery paths. Keep the entry surface thin and route to deeper material. Resolve the reproducible toolchain and dependency graph from source; record generator inputs for generated output.

Use diagnostics with exact paths/lines and distinguish invalid input, authority denial, conflict, unavailable dependency, limit, cancellation and unknown effect where recovery differs.

## Agent-native access

Use supported device authorization for interactive user delegation when the client needs it, following [auth.md](auth.md#agents-clis-and-mcp-clients). Unattended agents use their own scoped machine/workload grant and an authorized secret store. The actual grants and runner/spend policy belong in the repository's instructions; a permitted existing credential does not need a new approval ritual.

## Interfaces and packages

Keep one executable public contract and derive clients where that prevents drift. Use consistent naming, pagination, idempotency, deadlines and typed errors with safe messages/retry semantics.

A published package states its API, runtimes and license and follows its versioning contract. Keep published artifacts immutable; version plus platform/build identity and digest distinguishes intentional multi-platform outputs. Test the serialization, ordering and failure behavior promised to consumers.

### Private package verification

Prove a private release from a fresh consumer with registry-read credentials only, no source checkout, dependency replacement or populated package cache. Read the published bytes back and match version, digest and source provenance to the consumer's resolved lockfile. Compile and run a useful consumer case; upload success or dependency resolution alone does not prove it works.

Resolve the pinned toolchain and compiler launchers before replacing HOME. Explicitly disable inherited credential helpers for anonymous probes; an empty HOME alone does not prove they are anonymous. Give the authenticated consumer only its intended registry credential and exclude unrelated inherited authentication/configuration.

Request the endpoint's expected response format. Distinguish an explicit access denial from a protocol or unsupported-media-type error. Confirm the same object exists with the authorized reader before treating an anonymous denial as privacy evidence. Test refusal of an existing version and mismatched provenance without issuing an overwrite.

If verification fails after publication, preserve the artifacts. Repair the verifier and rerun read-only acceptance against that exact immutable version instead of republishing it.

## Internal development

Follow the [delivery workflow](../SKILL.md): practical targeted checks, publication, iteration on the same branch and the repository's required merge/release path. State what remains unverified and rerun affected checks after a repair. Independent review does not manufacture a new publication/completion stage.

Before comparing a checkout with its remote base, inspect `remote.<name>.fetch` and verify the exact remote-tracking SHA after the fetch. In a single-branch clone, `git fetch origin main` can update `FETCH_HEAD` without updating `origin/main`; use the repository's supported fetch command or an explicit source-to-destination refspec when the tracking ref is required.

Before removing a worktree or clearing a working folder, check unpushed commits and ignored files as well as `git status`; a clean status says nothing about ignored evidence. Size a preservation job before it starts, and copy only what is unique and small: reports, logs, captures and patches, never rebuildable trees.

Start a long-running local server from an agent tool call so the call can return. In `cd dir && nohup server > log 2>&1 &`, the `&` backgrounds the whole list as a subshell that keeps the tool's output pipe open until the server exits, so the call never returns and the session hangs without an error. Redirect the outer job instead: `(cd dir && exec server) > log 2>&1 < /dev/null &`, or use the repository's process manager. If a session's last entry is a shell call that started a server, read that process's open file descriptors. A wrapper holding a pipe is the hang, and stopping only the wrapper releases the call while the server keeps running.

Choose local or existing remote build capacity from measured feedback cost and authorized resource use. A local single-host tool can be built, checked and activated in its target environment when that is its supported release path.

Choose configuration reload semantics from the service's availability/consistency need: dynamic reads, a snapshot or controlled restart can each fit a different setting. Make the update behavior explicit and test the affected path. Routine health is deterministic and cheap; an authorized model/provider correctness test is a separate operation with its own purpose and budget.

A service with no drain path can still stop cleanly. Close input at the outermost door, confirm which queues live outside the process and survive, wait until its activity goes flat, then stop it. Put the drain path in the next version, not in the one already running.

Count a service as open when a real client gets through, not when the orchestrator reports it ready. A front door can pass its readiness probe and still refuse clients until the application logs that it accepts them, which can take close to a minute after a restart. Read that line, or complete one sign-in, before telling anyone the stop is over, and report the time from that moment.

A fixed stop window does not wait for its own pull requests. When the source path is slow, make the change with the supported live control, dry-run it, then merge the same change and restore automatic reconciliation afterwards. A prerequisite such as "merged by a set time" that protects no hard limit is a self-imposed gate: remove it rather than slip the window.

## Workflow admission

A control protects a witnessed failure or a real invariant within its owning authority. Remove or recalibrate a control that blocks work without protecting either, rather than adding another bypass.

Admission follows an operation's resource and effect. Publishing source does not apply a cluster change; CI scheduling and deployment/reconciliation have their own constraints. Keep actual repository holds and writer/rate budgets effective without making unrelated cluster telemetry a publication gate. GitHub merge-queue build concurrency limits `merge_group` builds, not source publication by owner labels.

## Continuous integration

- Keep the required feedback path fast enough for the workload. Name which checks run on drafts, ready PRs, merge groups and the default branch, and where expensive/device/integration coverage runs. Concrete job names, rollout modes and gate labels live with their implementation.
- A required aggregate verdict reflects failure of its required work. Cleanup and diagnostic jobs can be non-blocking when that is explicit; do not hide a failed required check behind success syntax or missing resources.
- Validate workflow references and their scope. A nonexistent context property evaluates to an empty string; evaluate comparisons using the operator's documented coercion rules. Cross-job values travel through declared outputs and `needs` rather than another job's `steps` context.
- Before editing a workflow file in a product repository, read which workflows run on a push to the default branch and what each one publishes. A runner or cache change to a file that triggers a production release ships that release on merge, even when nobody intended one.
- Bind a verification result to the workflow path or ID, event, branch, exact commit and run attempt. Display names can be dynamic; accepting or rejecting a run by its title alone can select the wrong execution or refuse the right one.
- Select affected checks and share suitable build artifacts/caches. Isolate cache/credential ownership and choose priority-aware capacity from measured use and the repository's priorities.
- Keep time/resource bounds appropriate to the job. Check runner billing against the existing grant: standard public hosted runners are free, while larger runners are billed even for public repositories.
- Quarantine a known flaky test instead of retrying until green. A corrected defect or repaired infrastructure can justify rerunning the affected check; identify what changed.

## App-store client releases

Read the current store controls and the product's release contract. Identify the artifact, compatibility/data/account effects and the supported staged or direct rollout path. Choose staging from actual change risk and available telemetry rather than a universal number of percentage steps. Verify installation/update and the affected user journey on the released build; know the store's stop/rollback limits before relying on them.

Read what players can install, not the release's status. On either store, a release marked in progress, completed or ready to publish can still be in review or held by managed publishing. Read the release page and publishing overview, then confirm exposure from a second source such as the public listing or the install share by version. A version record's creation date says when the container was made: read its review submissions before saying whether it was submitted, rejected or approved.

A fix build cut from current main can carry every change made since the version players run. When the live version is old, read what the new build changes in sign-in, purchase delivery and SDK pins, and check each against the live server before promoting it. A client that waits for a server grant the live service doesn't provide yet takes the money and grants nothing. Prove account continuity with an in-place upgrade from the exact published build. If the new line isn't ready, ship the urgent fix as a minimal patch on the published version's source instead.

A store or TestFlight submission can package a binary built earlier than the workflow commit it runs on. Before anyone tests a build for a fix, or before saying a build lacks one, read the packaged binary's own build receipt: its base commit plus any pinned overlays (SDK versions, native bridges) layered on top. Neither the submit run's head nor the base commit's date alone tells you what's inside. Also list the server or hosted pieces the fix needs; a client fix can be in the binary and still fail because its web or server half isn't live. Put both in the build's test notes.

A preview of an SDK or hosted screen drawn in a component gallery shows the page, not how the host app presents it. Full screen versus a card over the game is decided by the native presentation call, so a gallery preview can be approved while the shipped build opens something different. Before showing a screen as the design, capture it inside the real host app on the target build, or label it a mock and list the presentation as unverified.

Before promising a date, read each title's managed-publishing setting, open policy declarations and compatibility restrictions. A live build below the store's target level can keep updating existing players while new players on recent OS versions can't install at all, so that gap is a growth defect even with no error reports.

## Merge queue

Use the normal queue with its required checks and existing incident-priority rules. Diagnose a red default branch from its completed failing run and repair the owning cause. Coordinate a bottleneck's own repair so an unrelated hold does not prevent recovery. Keep the actual labels, grants and runbook beside the queue implementation. Read existing auto-merge settings before changing them; preserve an already-correct request instead of disabling and rearming it merely to restate its current values.

A queue that builds one entry at a time makes total wait the sum of every entry ahead, so read its parallel-build setting before forecasting a release. A required job can also be lost: the scheduler treats it as finished while the host still shows it queued. Read one exact job's assignment history before waiting on it further; a job that never ran can be cancelled and rerun without being a retried test.

A branch name can be reused, so a run's branch and pull-request fields can point at an old merged PR while the run belongs to a live one. Before calling a run superseded or cancelling it, compare its head SHA with the current head of every open PR on that branch. Turning a PR into a draft does not take it out of the queue: read its queue entry and dequeue it directly.

A merge queue builds each entry on the latest base itself, so a pull request that is only behind its base, with no conflict, needs no update. Merging the base into it restarts every finished check and sends it back through the CI queue. Update a branch only for a conflict or when it needs a file that is new on the base.

A job GitHub marks as lost ("self-hosted runner lost communication") has no test verdict, and neither has an aggregate gate that timed out while no real check failed. Read the run first: if automation has already asked for a rerun, follow that attempt and do not resend. Otherwise the pull request's own writer reruns only that job, once per head, after reading the head and the check list, and reports a second loss with the job and runner. A failing test is different: it is fixed or quarantined, never retried.

Before naming why an entry left the queue, read the removal event and its reason in the pull request's timeline. A check that reports after the removal did not cause it. For a `checks_timed_out` removal with an unchanged head, one normal re-enqueue by the writer is the supported recovery.

## How it is judged

Measure publication, admission/runner wait, compilation and test spans separately. Record median/p95, failure/ejection rate and recovery time on a named population/window. Choose budgets from the workload and objective, and follow the repository's quarantine and rerun rules.

Primary references checked 2026-10-30: [GitHub merge queues](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue), [Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions), [contexts](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts), [expressions](https://docs.github.com/en/actions/reference/workflows-and-actions/expressions) and [job outputs](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/pass-job-outputs).

Primary references checked 2026-11-02: [Git fetch remote-tracking mappings](https://git-scm.com/docs/git-fetch#CRTB) and [GitHub workflow run names](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#run-name). Private-package references read at 19:00 UTC: [Git 2.47.3 credential-helper reset](https://github.com/git/git/blob/v2.47.3/Documentation/gitcredentials.txt) and [Cargo registry authentication](https://doc.rust-lang.org/cargo/reference/registry-authentication.html).
