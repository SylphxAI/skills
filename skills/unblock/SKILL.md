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

- For a transient condition, use bounded provider-supported backoff when repeating is safe, and advance independent work.
- For a refusing gate, read its witnessed failure, authority and shared-resource effect. Keep effective checks for real invariants; repair a miscalibrated timeout/cap at its owning configuration from measured use plus margin. Judge the control by its function rather than a flag's spelling, without adding a generic bypass.
- Use existing delegated access first. Ask for a missing grant, ambiguous decision or new unauthorized spend only when needed; do not repeat an approval already given. Before destructive work, identify authoritative data and preserve unique or uncertain data/recovery sources. Proven-unused resources without user/personal data need no manufactured backup.
- Prefer a complete supported repair or existing supported route. A reversible operational workaround can restore progress within existing grants; record the durable fix and removal condition and remove the workaround when replaced. It does not grant new spend or data-destructive authority.

## Place the durable fix

An owned engine, platform or shared SDK gets the generic repair upstream; its downstream products consume the published capability without privileged exceptions or business rules in the shared layer. For an external dependency, first check supported versions/configuration/extensions. If needed, isolate a pinned patch or boundary adapter, track its removal and contribute upstream where practical.

Verify the repaired behavior at its actual surface through [deliver-and-verify](../deliver-and-verify/SKILL.md). Search the affected scope for the same failure class; repair it or hand separately owned instances to their writer. Prefer proportionate prevention through existing defaults, types or checks.
