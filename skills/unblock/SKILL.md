---
name: unblock
description: "Use when restoring a task, deployment or CI/build run that has actually stalled or is failing: a promised fix still fails, a call is refused, authority is missing, a runner hits a resource limit, a queue/review stops progressing, a pull request has no CI run after a push, a completion watch stays pending after its target finishes, or an environment disappears with unpushed work. Use prove-it and challenge for attribution of a past failure without restoration. A job making normal progress or waiting within its documented external cycle needs no intervention."
---

# Unblock Stalled or Failing Work

Use this skill to restore a task, CI run, merge queue entry, or deployment that has actually stalled or failed.

When an environment disappears or is about to be retired, preserve stranded
work using [references/stranded-work.md](references/stranded-work.md) before
resuming delivery or allowing cleanup.

## 1. Verify It Is Actually Blocked

Before intervening, read the live state of the job, queue, or target resource:
1. **Normal progress needs no action:** A build, test suite, or external store review running within its expected duration is not blocked. Do not cancel and restart healthy in-flight work. Recovery eligibility belongs to the failure state, not the target ID: re-read the exact state that justified recovery immediately before the write and skip it if that state no longer holds.
2. **Never resend an uncertain mutation blindly:** Follow the [duplicate-safety recovery contract](../deliver-and-verify/references/integration.md#provider-integration): reconcile potentially harmful duplicate effects, while a documented duplicate-safe refresh can recover with bounded serial retries before its output expires.
3. **Discard self-imposed blocks:** A hypothetical third-party ToS question, an unscored civil risk (`../challenge/references/risk.md`), or a local convention that protects neither user data nor authorized spend is not a real block—proceed directly with the outcome.
4. **Challenge an added prerequisite:** Before removing a refused step, compare
   its selection contract and effective input population with the acceptance
   cases. Shared or inherited inputs alone do not show incorrect selection;
   preserve required coverage when setup or execution fails. Track unrelated
   dependencies separately: split an optional engine upgrade from a UX change
   that works on the current version, but retain a required integration check
   whose external dependency fails during setup.
5. **Verify the resource can supply the missing capability:** Before restoring
   a credential or expanding a grant, read the selected account/workspace's
   entitlement and access to the specific model, feature or workload. Successful
   sign-in proves identity, not paid entitlement or usable capacity. Exclude
   a resource with verified incompatible access from that restoration goal;
   keep missing or stale evidence unknown. Route a required purchase to its
   budget owner. Health reports distinguish failed probes from lost capacity
   for the requested capability, so a broken free-tier connection does not
   inflate a paid-capacity deficit.


## 2. Diagnose by Failure Class

A policy-scanner refusal points to a contract; a changed spelling or skipped
local hook proves no compliance. Read the pinned rule, configured file scope and
prescribed helper, then run that exact checker and verify its semantics. An
ownership failure is repaired by keeping product-specific code, tests and
runbooks at their owning product boundary and shared mechanisms configurable,
without widening scanner exclusions.

A guarded read can refuse an entire resource because fields unrelated to the question contain credentials; filtering its output afterward cannot recover the refused bytes. Select the required fields at the provider or CLI before that boundary to restore the bounded read without weakening the guard or expanding access to raw secrets. If a required field itself is protected, use its authorized in-process consumer rather than printing it.

A refusal of recursive directory enumeration is scoped to that operation; it does not by itself establish that explicitly named direct-file reads are unsupported. Stop the refused walk, obtain the owning boundary’s documented named-read contract, and read only the authorized exact files. Guessing aliases, traversing alternate paths or switching identities evades that boundary; declaring all reads unavailable overstates the refusal.

For a secret-scanner publication refusal, use the
[scanner finding procedure](../deliver-and-verify/references/security.md#secret-scanner-publication-refusals)
to distinguish credentials from verified false positives through the supported publisher.

Read the exact failing job log, exit status, and resource metrics before choosing the action:

| Failure class | Observable signal | Immediate restoration path |
| --- | --- | --- |
| **1. Real code, test, or migration defect** | Deterministic compilation, test, lint, or schema failure on the candidate commit | Fix the root cause on the branch (or quarantine a proven pre-existing flaky test with its tracking issue per `../deliver-and-verify/references/dx.md#continuous-integration`). Never retry a failing test hoping for a pass. |
| **2. Lost runner or infrastructure drop** | Runner lost communication, node OOM/disk full, or aggregate gate timed out with zero failed child checks | Inspect the runner/node health and restore the live job or parent operation according to its [current lifecycle state](#parent-operation-recovery). |
| **3. Merge queue or bottleneck deadlock** | A fix for the broken queue/CI check is itself stuck behind the broken check or queue | Hold unrelated entries, prioritize the bottleneck's own repair PR through the queue, or apply the supported live operational control first and merge the durable source change right after. |
| **4. Authority, credential, or session challenge** | Missing scope/grant, expired token, or interactive login/CAPTCHA challenge | Reuse existing delegated credentials from the authorized secret store (including in-process secret-reference resolution and automated TOTP), preserve persistent browser profiles (`--user-data-dir` / cookies) so authenticated sessions are never needlessly wiped, and trigger an interactive human browser takeover only after every zero-human sign-in channel is exhausted: the provider's SSO button for the agent identity, an emailed magic link or code from an inbox the agent reads, an SMS code from the company number's inbox, an API or CLI with existing keys, and a trusted persistent profile. A CAPTCHA widget under one email/password form is not a challenge while another channel on the same page avoids it. **Wrong:** see `captcha_detected` on the password form and page a person. **Right:** try "Continue with Google" or the emailed code first; ask a person only for a challenge every channel shows, or for hardware approval. |
| **5. Quota, rate limit, or capacity ceiling** | Provider HTTP `429`, exhausted seat/API quota, or saturated build lock | Pace concurrency to the measured sustainable rate, switch to an approved fallback capacity pool within existing spend limits, or surface the exact measured capacity gap to the budget owner. |

Aggregate free capacity can hide starvation of jobs that need a whole fit on
a smaller eligible host set: compare their effective requests, reservations
and priorities with the competing jobs on those hosts before adding capacity.
Priority orders new allocations; existing reservations and non-preempting
occupants can still hold the required room, so a priority change alone does not
establish bounded wait. Verify both admission and actual provider pickup under
continued competing demand before introducing an idle reservation or claiming
the starvation is fixed.

Classify from the newest run on that commit and its first exact error; an older failure may already be superseded. Before rerunning or redispatching, confirm no newer or completed run exists for the same head. A passing source contract or a successful activation does not prove the visible output.

### Parent-operation recovery

An idle replacement process proves liveness, not recovery: same-process tests
can retain unsaved payloads that disappear after restart. For restartable work,
compare accepted payload identities and order, acknowledgements and completed-effect
receipts across the failed attempt, durable state and a fresh worker's first
successful continuation; reconcile uncertain effects instead of resending them.
**Bad:** restart and see healthy; **Good:** inject a failure after accepting work,
restart from persisted state, and verify the original work completes without
losing pending input or repeating completed effects.

Recovery must resume the authoritative parent operation; a successful child
retry can belong to an operation already retired or replaced. For a failed
merge-group job, the pull request's timeline, live queue entry and current head
determine whether a job retry can restore progress or normal exact-head
re-enqueueing is needed, because rerunning an ejected group's job does not
re-admit the pull request. **Bad:** treat a green orphan retry as queue recovery;
**good:** verify a live queue entry and its required checks at the current head.

For a lost GitHub Actions job, read its check-run annotations when the log
download is unavailable; a missing log alone does not prove runner failure. If
the job-rerun API refuses because its workflow is still running, preserve healthy
sibling jobs and wait for a workflow-completion event. Then retry only the lost
job once, after reading the current head, attempt and status. Read the new job
and dependent checks afterward. This preserves unrelated successful work while
restoring the failed check without rerunning the whole workflow.

An accepted cancellation can leave an obsolete operation queued and holding its
concurrency slot, so a replacement remains pending. When ordinary cancellation
has failed to reach a terminal state, reconcile the exact obsolete operation and
its replacement before using the provider's documented stronger cancellation;
verify both terminal cancellation and replacement admission afterward.
**Bad:** report capacity released from HTTP 202; **good:** observe the obsolete
run as `completed/cancelled` and its replacement admitted, while preserving
unrelated work.

Primary sources checked 2026-11-07:
[GitHub merge queues](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue)
and [force cancellation after ordinary cancellation is ineffective](https://docs.github.com/en/rest/actions/workflow-runs#force-cancel-a-workflow-run).

### Missing pull-request CI

Before diagnosing an Actions outage or trying to trigger another event, read
the current pull request's head, base, mergeability and disposition, then the
workflow's event types and branch/path filters. Distinguish an absent run from
an admitted run with skipped jobs. An optional preview or a completed check
watch does not establish that the required workflow started.

GitHub suppresses `pull_request` workflows while a pull request has merge
conflicts. Resolve those conflicts through the repository's normal branch
update path, regenerate combined projections if needed, and push normally.
Read the resulting workflow run at the new head before claiming restored CI.
An unknown mergeability result needs a later read, not a conflict diagnosis.
When mergeability and event eligibility are confirmed but no run appears,
investigate event delivery; use a documented retrigger only after reconciling
existing runs. Switching to `pull_request_target` changes the security boundary
and is not a conflict repair.

**Bad:** repeatedly close and reopen a conflicting pull request to start CI.
**Good:** verify mergeability, resolve the conflict, and verify the required run
on the resulting head.

Primary source checked 2026-11-06:
[GitHub workflow events](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#pull_request).

### Missed completion events

A registered watch does not prove that its observer saw the terminal status or
that its notification resumed the waiting worker. Its name also says nothing about
provider cost: inspect the [observer's actual request and quota behavior](../deliver-and-verify/references/integration.md#provider-integration),
backing off at the shared rate-limit floor rather than multiplying per-target GETs.
Retain the target, source revision, baseline, last observed status and expected completion window. For an
unverified event source, keep a timed fallback that reads the target directly.

If the target has finished but the watch still reports pending, read the final
result and resume the remaining work. Cancel the stale watch and use a supported
one-time follow-up; verify that the follow-up actually runs. Reconcile existing
operation receipts before any write, so a lost notification never repeats a
successful merge, deployment or payment. Hand the observer or dispatcher fault
to its owner without restarting healthy work or repairing an unrelated runtime.

### Build wrapper timeouts

A wrapper timeout without compiler or test output establishes no code verdict.
Read the build lease or process status and reconcile an active attempt before
starting another. When the runtime documents or the operator authorizes an
alternate executor, use its supported entrypoint for the affected tests, with
bounded concurrency and a timeout that fits the execution deadline. Check the
shared machine's resource limits; an alternate executor does not override a
quota, spend cap or access refusal. Keep full suites in CI and leave runtime
repairs to their owner. Record the revision, command, exit status and inner test
result so a completed wrapper cannot hide an incomplete check. A healthy build
within its expected duration continues on its existing executor.

### Timeouts under resource contention

Split elapsed time at the boundaries the verifier actually waits for: setup,
preparation, work submission, completion and capture. A mount or load duration
does not measure the whole operation. Retain the last typed readiness state and
timings on failure; a generic loading message does not identify a missing asset.

Compare the same artifact and workload alone and concurrently under the failing
runner's effective CPU quota and affinity. Record its memory limit and observed
usage separately from resource requests or host-wide reservations. Trace the
pending promise or completion event: work that eventually completes under a
longer diagnostic observation differs from a wait that never resolves. Keep the
acceptance deadline unchanged during that diagnostic comparison.

If preparation stays stable while completion time grows with concurrent CPU
workers, size concurrency from available capacity and measured per-worker cost.
Recheck the complete workload with that default, preserving every acceptance
case. If preparation itself dominates, measure it on supported devices and fix
the product's startup path when it misses their budget. A software renderer
consumes CPU; it does not establish hardware-GPU performance.
Measure a hardware browser before claiming a delay is exclusive to software
rendering. Increase a deadline only after legitimate completion times justify
the headroom and the required behavior still satisfies the product's budget.

**Bad:** infer a missing image from a generic timeout and increase the budget.
**Good:** identify the pending completion condition, measure isolated and
concurrent durations, and fix the phase or resource policy the data identifies.

## 3. Ship a Reversible Workaround When the Durable Fix Is Slow

Incremental synchronization can preserve old gaps because it trusts the current
baseline. When restoring incomplete state, choose a mode that can recover data
behind already-known records and verify the required dependency closure,
including historical or private recovery roots in scope, before clearing recovery
metadata. **Bad:** declare recovery from a successful refresh; **good:** prove the
required historical dependencies are present after it.

When live user harm is occurring or the upstream engine/platform fix will take longer than the operational window:
1. **Apply the smallest supported reversible control now:** Use the product's API, feature flag, routing weight, or GitOps sync to restore service immediately while preserving all user data and ledger integrity.
2. **Drive the durable fix to completion:** Open and merge the source repair in the owning repository, verify it live, and remove the temporary workaround in the same delivery cycle.

## 4. Escalate or Switch Method After 10 Minutes Without New Evidence

If 10 minutes of investigation produce no new disconfirming evidence:
- Change the diagnostic angle or launch parallel read-only checks across the competing hypotheses (`../swarm-fuse/SKILL.md`).
- If an external dependency is genuinely unavailable and no workaround exists within current authority, record the exact failing endpoint, timestamp, and error receipt, and hand off or escalate with that concrete evidence.

## 5. Autonomous Skill Distillation Gate (Completion / Exit Gate)

Before declaring an unblocking task or incident restoration complete:
- Check whether resolving the blocker required a **second-attempt detour** (an initial approach hit an undocumented trap and a fallback approach was needed), fixed a **post-ship defect or rework** (an existing verification checklist missed a dimension), or surfaced a **recurring cross-agent blind spot**.
- Whenever any of the three occurred, distill the role-neutral governing mechanism into the owning skill in the shared skills repository following [`../author-skill/SKILL.md`](../author-skill/SKILL.md)—refining the existing skill in place 90% of the time rather than creating fragmented micro-skills—as part of completion, without waiting for a human prompt.
