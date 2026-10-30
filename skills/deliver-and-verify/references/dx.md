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

## Internal development

Follow the [delivery workflow](../SKILL.md): practical targeted checks, publication, iteration on the same branch and the repository's required merge/release path. State what remains unverified and rerun affected checks after a repair. Independent review does not manufacture a new publication/completion stage.

Choose local or existing remote build capacity from measured feedback cost and authorized resource use. A local single-host tool can be built, checked and activated in its target environment when that is its supported release path.

Choose configuration reload semantics from the service's availability/consistency need: dynamic reads, a snapshot or controlled restart can each fit a different setting. Make the update behavior explicit and test the affected path. Routine health is deterministic and cheap; an authorized model/provider correctness test is a separate operation with its own purpose and budget.

## Workflow admission

A control protects a witnessed failure or a real invariant within its owning authority. Remove or recalibrate a control that blocks work without protecting either, rather than adding another bypass.

Admission follows an operation's resource and effect. Publishing source does not apply a cluster change; CI scheduling and deployment/reconciliation have their own constraints. Keep actual repository holds and writer/rate budgets effective without making unrelated cluster telemetry a publication gate. GitHub merge-queue build concurrency limits `merge_group` builds, not source publication by owner labels.

## Continuous integration

- Keep the required feedback path fast enough for the workload. Name which checks run on drafts, ready PRs, merge groups and the default branch, and where expensive/device/integration coverage runs. Concrete job names, rollout modes and gate labels live with their implementation.
- A required aggregate verdict reflects failure of its required work. Cleanup and diagnostic jobs can be non-blocking when that is explicit; do not hide a failed required check behind success syntax or missing resources.
- Validate workflow references and their scope. A nonexistent context property evaluates to an empty string; evaluate comparisons using the operator's documented coercion rules. Cross-job values travel through declared outputs and `needs` rather than another job's `steps` context.
- Select affected checks and share suitable build artifacts/caches. Isolate cache/credential ownership and choose priority-aware capacity from measured use and the repository's priorities.
- Keep time/resource bounds appropriate to the job. Check runner billing against the existing grant: standard public hosted runners are free, while larger runners are billed even for public repositories.
- Quarantine a known flaky test instead of retrying until green. A corrected defect or repaired infrastructure can justify rerunning the affected check; identify what changed.

## App-store client releases

Read the current store controls and the product's release contract. Identify the artifact, compatibility/data/account effects and the supported staged or direct rollout path. Choose staging from actual change risk and available telemetry rather than a universal number of percentage steps. Verify installation/update and the affected user journey on the released build; know the store's stop/rollback limits before relying on them.

## Merge queue

Use the normal queue with its required checks and existing incident-priority rules. Diagnose a red default branch from its completed failing run and repair the owning cause. Coordinate a bottleneck's own repair so an unrelated hold does not prevent recovery. Keep the actual labels, grants and runbook beside the queue implementation.

## How it is judged

Measure publication, admission/runner wait, compilation and test spans separately. Record median/p95, failure/ejection rate and recovery time on a named population/window. Choose budgets from the workload and objective, and follow the repository's quarantine and rerun rules.

Primary references checked 2026-10-30: [GitHub merge queues](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue), [Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions), [contexts](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts), [expressions](https://docs.github.com/en/actions/reference/workflows-and-actions/expressions) and [job outputs](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/pass-job-outputs).
