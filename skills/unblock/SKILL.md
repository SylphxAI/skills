---
name: unblock
description: "Use when restoring a task, deployment or CI/build run that has actually stalled or is failing: a promised fix still fails, a call is refused, authority is missing, a runner hits a resource limit, a queue/review stops progressing, or an environment disappears with unpushed work. Use prove-it and challenge for attribution of a past failure without restoration. A job making normal progress or waiting within its documented external cycle needs no intervention."
---

# Unblock Stalled or Failing Work

Use this skill to restore a task, CI run, merge queue entry, or deployment that has actually stalled or failed.

When an environment disappears or is about to be retired, preserve stranded
work using [references/stranded-work.md](references/stranded-work.md) before
resuming delivery or allowing cleanup.

## 1. Verify It Is Actually Blocked

Before intervening, read the live state of the job, queue, or target resource:
1. **Normal progress needs no action:** A build, test suite, or external store review running within its expected duration is not blocked. Do not cancel and restart healthy in-flight work.
2. **Never resend an uncertain mutation blindly:** If a deploy, API call, or payment/grant request timed out or lost its connection, read the target's live timeline or receipt first so you never create duplicate side effects.
3. **Discard self-imposed blocks:** A hypothetical third-party ToS question, an unscored civil risk (`../challenge/references/risk.md`), or a local convention that protects neither user data nor authorized spend is not a real block—proceed directly with the outcome.
4. **Challenge an added prerequisite:** Before repairing a refused step, reread
   the outcome and ask whether that step is required at all. Remove an unrelated
   dependency from this delivery rather than repeatedly repairing it; track the
   independent outcome separately. For example, a UX change that works with the
   current engine version should not wait on an optional version bump whose
   migration fails. Split the bump from the UX change; retain a prerequisite
   when the acceptance cases actually depend on it.


## 2. Diagnose by Failure Class

For a secret-scanner publication refusal, use the
[scanner finding procedure](../deliver-and-verify/references/security.md#secret-scanner-publication-refusals)
to distinguish credentials from verified false positives through the supported publisher.

Read the exact failing job log, exit status, and resource metrics before choosing the action:

| Failure class | Observable signal | Immediate restoration path |
| --- | --- | --- |
| **1. Real code, test, or migration defect** | Deterministic compilation, test, lint, or schema failure on the candidate commit | Fix the root cause on the branch (or quarantine a proven pre-existing flaky test with its tracking issue per `../deliver-and-verify/references/dx.md#continuous-integration`). Never retry a failing test hoping for a pass. |
| **2. Lost runner or infrastructure drop** | Runner lost communication, node OOM/disk full, or aggregate gate timed out with zero failed child checks | Inspect the runner/node health; free disk or restart the wedged daemon if needed, and rerun **only** the lost/incomplete job once for that commit SHA (`../deliver-and-verify/references/dx.md#merge-queue`). |
| **3. Merge queue or bottleneck deadlock** | A fix for the broken queue/CI check is itself stuck behind the broken check or queue | Hold unrelated entries, prioritize the bottleneck's own repair PR through the queue, or apply the supported live operational control first and merge the durable source change right after. |
| **4. Authority, credential, or session challenge** | Missing scope/grant, expired token, or interactive login/CAPTCHA challenge | Reuse existing delegated credentials from the authorized secret store (including in-process secret-reference resolution and automated TOTP), preserve persistent browser profiles (`--user-data-dir` / cookies) so authenticated sessions are never needlessly wiped, and trigger an interactive human browser takeover only when an anti-bot challenge or hardware approval genuinely requires human input. |
| **5. Quota, rate limit, or capacity ceiling** | Provider HTTP `429`, exhausted seat/API quota, or saturated build lock | Pace concurrency to the measured sustainable rate, switch to an approved fallback capacity pool within existing spend limits, or surface the exact measured capacity gap to the budget owner. |

Classify from the newest run on that commit and its first exact error; an older failure may already be superseded. Before rerunning or redispatching, confirm no newer or completed run exists for the same head. A passing source contract or a successful activation does not prove the visible output.

For a lost GitHub Actions job, read its check-run annotations when the log
download is unavailable; a missing log alone does not prove runner failure. If
the job-rerun API refuses because its workflow is still running, preserve healthy
sibling jobs and wait for a workflow-completion event. Then retry only the lost
job once, after reading the current head, attempt and status. Read the new job
and dependent checks afterward. This preserves unrelated successful work while
restoring the failed check without rerunning the whole workflow.

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

## 3. Ship a Reversible Workaround When the Durable Fix Is Slow

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
