---
name: unblock
description: "Use when restoring a task, deployment or CI/build run that has actually stalled or is failing: a promised fix still fails, a call is refused, authority is missing, a runner hits a resource limit, or a queue/review stops progressing. Use prove-it and self-challenge for attribution of a past failure without restoration. A job making normal progress or waiting within its documented external cycle needs no intervention."
---

# Unblock

When progress has stalled or a promised result fails, inspect one live failing object and take the most useful recovery step. Continue independent work during normal asynchronous waits. Record UTC read times and use [prove-it](../prove-it/SKILL.md) for evidence.

## Inspect the failing boundary

Read the exact error, status and relevant code/configuration. Check the environment and instrument before blaming application logic or a model: memory ceilings/events, disk, sandbox limits and main-branch flakes can explain the failure.

If a shipped fix still fails, read the serving revision, relevant migration/config/cache state, and the request's server-side result. For a held CI run, inspect the holder's jobs and live activity with the workflow's concurrency semantics. Cancel a genuinely stale/superseded holder through supported controls; preserve healthy progressing work.

For agent latency, apply the shared [model/runtime boundary](../self-challenge/SKILL.md) and measure the span that grew. Tool counts alone do not justify reducing reasoning/tool access. Keep user cancellation and actual authorized limits effective.

## Choose a supported recovery

- For a transient condition, use bounded provider-supported backoff when repeating is safe, and advance independent work. For a provider write returning HTTP 500/502, read the remote state and provider status page before blaming local tools. An unchanged remote state means the failed write does not consume a one-attempt recovery allowance: retry about every five minutes unless the provider specifies another interval, reading state first and stopping once the change takes. A timed-out write has an unknown effect and may arrive late; reconcile it before resending, following the [external-mutation discipline](../deliver-and-verify/SKILL.md#execute-and-verify).
- For a refusing gate, read its witnessed failure, authority and shared-resource effect. Keep effective checks for real invariants; repair a miscalibrated timeout/cap at its owning configuration from measured use plus margin. Judge the control by its function rather than a flag's spelling, without adding a generic bypass.
- Use existing delegated access first. Ask for a missing grant, ambiguous decision or new unauthorized spend only when needed; do not repeat an approval already given. Before destructive work, identify authoritative data and preserve unique or uncertain data/recovery sources. Proven-unused resources without user/personal data need no manufactured backup.
- Prefer a complete supported repair or existing supported route. A reversible operational workaround can restore progress within existing grants; record the durable fix and removal condition and remove the workaround when replaced. It does not grant new spend or data-destructive authority.

### Accepted queue work without progress

When accepted external queue work shows no progress, inspect its timeline,
assignment and shared queue (the full population when queryable). Distinguish a
stall from healthy work or a documented waiting cycle; elapsed time alone does
not establish a failure or a provider deadline.

- Compare the delay cost of preserving acceptance and position with losing
  acceptance/order, failed re-admission and repeated work. Acceptance is valuable,
  but preserving it indefinitely is not free.
- If the comparison favors intervention, use one bounded, documented lifecycle
  attempt, such as ordinary removal and rejoining at the unchanged reviewed
  revision. A supported lifecycle is not a diagnosis-specific repair guarantee;
  keep required checks and guards effective.
- Preserve the prior identity and evidence. Follow the
  [external-mutation discipline](../deliver-and-verify/SKILL.md#execute-and-verify):
  read the live state/timeline before each write, verify each resulting state,
  and reconcile an in-flight or unknown effect instead of resending it.
- Verify downstream progress. New progress does not prove the internal cause.
  If the attempt fails, change the method or seek new evidence instead of
  repeating resets or identical diagnostics.

❌ **Bad:** Preserve an unassigned entry indefinitely because it was accepted.
✅ **Good:** Price the waiting and re-admission costs, try one supported lifecycle
when justified, and verify the result without claiming a root cause.

### An agent that reports working but has stopped

`working` only says the agent's process is alive. Read the last line of its transcript and that file's time. A last line that is an unanswered tool call, older than the command could need, means one call has hung, commonly a shell wrapper that outlived a background server it started. Terminate that wrapper only, leave the server and the session alone, and confirm the transcript moves.

Run this check from something that does not need its owner to be idle. A check that fires only when its owner is free misses hangs during the owner's busiest hours.

❌ **Bad:** Trust `working` for seven hours because the agent's schedules look healthy.
✅ **Good:** Read the transcript's last line and time, release the one wrapper, and confirm the agent resumed.

### A wait names who ends it

Before leaving a worker waiting on a signal (capacity cleared, a release published, a decision), name who sends it and when. Otherwise give the worker a read it can run itself at a set time. A wait with no sender never ends.

### Human steps through a tool

Before sending a person a link or control page, open it yourself and confirm it connects and that its input works on a harmless control, and bring the target screen back fresh. A person's time on a dead link costs more than the check. Refuse to issue a link the platform can't serve, and fix that gap in the platform.

Keep all operational complexity on the agent side: never clear browser cookies or open a fresh logged-out profile on an already-authenticated site, never visit vendor billing pages unnecessarily, and never ask the user to forward verification codes or click login prompts when a persistent profile, CLI/API token, licence file, or automated inbox/credential store (`op://` / `op-otp://`) can complete the flow autonomously.

## Place the durable fix

An owned engine, platform or shared SDK gets the generic repair upstream; its downstream products consume the published capability without privileged exceptions or business rules in the shared layer. For an external dependency, first check supported versions/configuration/extensions. If needed, isolate a pinned patch or boundary adapter, track its removal and contribute upstream where practical.

Verify the repaired behavior at its actual surface through [deliver-and-verify](../deliver-and-verify/SKILL.md). Search the affected scope for the same failure class; repair it or hand separately owned instances to their writer. Prefer proportionate prevention through existing defaults, types or checks.
