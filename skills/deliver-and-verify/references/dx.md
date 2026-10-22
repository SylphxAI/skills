# Developer experience

Trigger: a developer or agent works with a product, package, or the build
environment, or releases an app-store client.

Goal: optimize useful completion, with correctness and clean recovery. A
developer or agent starting from a clean environment completes the task and
sees the promised result, and CI tells them fast and for free whether the
change works.

## Hard lines

- GitHub spend and runners are in the repository's agent instructions. A larger
  or GPU runner is billed even on a public repository. A private job that needs
  an operating system we do not host is cross-compiled on Linux or stays off.
- Agent access to a service is a device-flow credential a person approved (see
  below); an operator shortcut that skips owner consent is not used.
- A published version number is never rewritten, re-pointed, or reused, so a
  consumer's pin stays trustworthy.

## First useful success

For each supported job, the path from a clean environment to a useful result is
discoverable: prerequisites, supported revisions, commands or calls, expected
result, common failures, and recovery. Keep the repository entry surface thin
and route to deeper material; the slice layout in
[architecture.md](../../self-challenge/references/architecture.md) keeps one feature readable from one place.

## Agent-native access

An agent or CLI gets access the way `gh auth login` does: an OAuth 2.0 Device
Authorization Grant (RFC 8628). The person opens one link, sees who is asking
and for what, and taps Approve. The result is an ordinary scoped, revocable
credential owned by that person, listed where they manage access. Nobody
creates a key by hand, copies it, or files it in a password manager to connect
an agent. Use the platform's device grant where it exists rather than building
one per product. Sign-in, device, and consent pages a product shows its own customers follow
[auth.md](auth.md).

## Interfaces and packages

- A public service has one executable contract; clients are generated from it
  ([agent-first APIs](../../self-challenge/references/architecture.md#agent-first-apis-and-operations)).
  Methods use consistent naming, pagination, idempotency, deadlines, and errors;
  an error carries a stable code, a safe message, and whether a retry is safe.
- A published package states its public API, supported runtimes, and license,
  and follows semantic versioning. Test what it promises: old and new encodings
  for a serialized format, ordering and failure behavior for a concurrent API.
- One number maps to one artifact, source identity, and immutable byte set. A
  development line stays below `1.0` until the product declares its first
  stable public contract.

## Internal development (Inner Loop first, Outer Loop once)

Separate the **Inner Loop** (local edit, compile, unit/integration test, and local dev-server / end-to-end verification in seconds) from the **Outer Loop** (PR, clean-room CI, merge queue, and production rollout). Every change is iterated and verified end-to-end in the local Inner Loop until the complete outcome passes with zero defects; never use remote CI as a compiler or debugger (CI-driven debugging), and never split one fix across multiple trial-and-error PRs. Local single-host / dev-machine tools are built, verified, and updated directly in place without waiting on a remote CI/release round-trip; shared and production services enter the Outer Loop once after local verification succeeds so a single coherent outcome lands as one batch and deploys once.

Common workflows (bootstrap, edit, build and test, integration, release,
recovery) are reproducible and easy to diagnose. A clean environment resolves
the toolchain and its integrity-bearing lock graph from the repository alone.
Generated output names its source and generator inputs. Where shared
workstations are resource-constrained, heavy builds and test suites run
through dedicated remote or CI build capacity with a published latency
budget per check (named beside the command) measured like any other wait.
Linters, formatters, and test
runners emit diagnostics with exact file paths and line numbers, and a failure
distinguishes invalid input, authority denial, conflict, unavailability, a
limit, cancellation, and an unknown effect where that affects recovery.

A setting that can change is read when it is used, from synced config, never
from start-up environment, so changing it needs no restart or window. No synthetic health probe or uptime check spends model tokens: health comes
from deterministic probes and real traffic, and unit/integration correctness
uses deterministic fixtures or mocked upstreams.

The design of a new platform capability or dev machine tool names the industry
reference it follows, such as a Kubernetes API or a GitHub feature, or says
why none fits. Check the reference once at design, not again as a pull-request
body gate.

## Workflow admission

A workflow guard protects a named failure we have seen or a hard line (money,
real-player accounts and data, secrets, irreversible deletes, or an actual
provider limit). Record that evidence with the guard. A rule that blocks our
own work without protecting either is removed or rewritten, not given another
bypass.

Admission follows the operation's resource and effect. Publishing a branch or
opening a pull request does not apply a cluster change: CI owner-label counts,
cluster alerts and unavailable cluster telemetry do not hold source publication.
Retain exact-head checks, repository hooks, explicit source holds and actual
GitHub rate/write budgets. CI execution uses its own scheduler; a deployment
hold applies only to the affected component's deploy/apply operation while the
condition holds. This separation grants no new deployment authority.

Industry reference: [GitHub merge queues](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue)
cap concurrent `merge_group` builds, not branch publication by
owner label. Source-queue regression fixtures must prove that full owner counts
and unavailable telemetry do not stop publication, while SHA mismatches,
explicit source holds and actual writer budgets still stop it.

## Continuous integration

- Merging is optimistic. A ready pull request runs the
  affected full suite; a draft and a merge group run only the fast gate (5
  minutes or less; a pull request touching migrations adds migration lint and
  the database-backed tests). The full suite runs after the merge on the
  default branch, with flake quarantine, a culprit bisect and an automatic
  revert, and release deploys only verified commits. A red default branch
  counts only a completed failure of the verifying run, not a cancelled or
  superseded one. Work only the full suite needs (long integration, device, or
  browser matrices) runs only there.
- While the default branch is red, `main-red-gate` admits reverts, pull
  requests labelled `main-red-fix`, and live-outage fixes labelled
  `queue-jump:outage`. In `enforce` mode it refuses other merge groups only
  while a newer verifying run on the default branch is unfinished or an open,
  non-draft revert or fix pull request exists. Otherwise it admits with a
  warning so recovery can progress. The gate fails open when verification
  history or pull request data is unavailable or inconclusive. The starter
  ships in `observe` mode: it reports what it would refuse without refusing
  anything; enable `enforce` after observing merge groups, including a red
  default branch. The implementation and adoption recipe live in
  the shared organization CI workflow.
- Operator `until` dates (holds, quarantines, expiries) do not turn the default
  branch red: a guard fails only on a date added or extended past its limit,
  and a daily workflow removes expired ones.
- CI regenerates generated artifacts; our dev machine does not do it by hand.
- A pull request on a critical path (a queue jump, a deliverable, an incident
  fix) runs the same checks CI runs through the remote build lease, and
  publishes as soon as that is quick enough to beat a CI round trip; a
  feedback loop slower than CI is not a shortcut, so the change publishes and
  CI confirms. This is a speed aid, never a wait before pushing.
- Path filters skip unaffected jobs; builds share one compiled artifact
  (`nextest archive`, one `next build`); caches are saved where later runs can
  restore them.
- A step can fail or is deleted. `|| true`, `continue-on-error`, `|| echo`, and
  echo-only steps on a required path report green without checking anything,
  and a step that needs a secret fails when it is missing.
- Every reference in a workflow resolves: `steps.<id>` names a step its own job
  defines, `needs.<job>` a job that exists. An unresolved reference reads as
  null, so the comparison it feeds stays false and the step it guards skips
  green. `steps.` is job-scoped, so cross-job values travel through `outputs:`
  and `needs.<job>.outputs`; the repository's contract suite pins resolution per
  job.
- One aggregate status check is required on the merge queue, and every job sets
  a `timeout-minutes`.
- CI capacity is allocated by priority, not an equal split or reserved slice:
  one pool, every organization treated alike (SylphxAI included, as our own
  customer), job classes ranked verify and deploy, then merge gate, ready pull
  requests, drafts, scavenger work. Runner memory requests follow measured use.
- Tenant repositories take CI from the the shared organization `.github` repository template: notify mode
  on the organization's own `GITHUB_TOKEN`, one cache bucket per organization
  that does not share Cloud's cache key.

## Menu of options

- Run a job on our own runners, or on a standard hosted runner when the repository is public (the repository's agent instructions).
- Give an agent a device-flow credential a person approved, not a key made by hand.
- Ship a client with one staged store step, or straight to 100% when the build changes no runtime, dependency, login, account or data (app-store rollout).
- On Apple, use the store's fixed phased release; on a store that supports one staged step, do not add extra percentage steps. Server changes use canary then full, not this client soak.

## App-store client releases

Follow the app-store rollout runbook.

## Merge queue

Follow the merge-queue runbook. A flaky test is quarantined, never retried, and a queue jump is only for a live customer-facing outage, a live exploit, or a red main that blocks the queue (the repository's agent instructions).

## How it is judged

The time from a push to a merged change is read as four spans, not one
number: **upload** (source offered to the code host), **admission** (the
change queued and the runner attached), **compile** (the toolchain resolved
and the build made) and **test** (the required checks run). Each carries a
median and p95, and a slow queue is read against the span that grew, so the
fault lands on the step that owns it instead of on the change that waited.
Merge-group targets, reported daily:

| Measure | Target |
| --- | --- |
| Groups that fail (ejection rate) | under 5% |
| Enqueue to merge, median | under 30 min |
| Enqueue to merge, p95 | under 90 min |
| Jumps | at most 1 a day |
| Retries of a failed entry | 0 |
| A test that fails without a change | quarantined with a named owner within 24 h |
