---
name: unblock
description: "Use when actively unblocking or restoring a currently stuck, blocked, or failing task, deployment, or CI/build run (for example: 'done but still can't log in', 'diagnose and restore a 403/500 deployment', a refused API/CLI call, a missing permission or credential, a red or stuck CI/merge queue, an out-of-disk or memory runner limit, or a multi-day external review wait). Checks the runner, environment, and instrument first before blaming the model, places fixes at the owning upstream boundary without downstream hacks or upstream backdoors, and restores progress immediately. For pure root-cause attribution of past failures without an active restoration action ('Root cause: why did X fail?'), use prove-it and self-challenge. Do NOT use when a routine build or job is still making normal log progress."
---

# Unblock: Immediate Diagnosis, Boundary Placement & Recovery (`unblock`)

Waiting passively is the most expensive failure mode. The moment any task stops moving—or when something claimed *"done"* / *"deployed"* still fails for a real user or operator—take one decisive diagnostic and recovery step immediately. Record timestamps with `date -u`.

## 1. Check the Environment, Runner, and Instrument First (Before Blaming Code or Models)

Read the exact error code, exit status, or refusal from the live source ([`../prove-it/SKILL.md`](../prove-it/SKILL.md))—never act on a badge or summary:

- **Is the environment, sandbox, or runner the real cause?**
  - Check cgroup memory ceilings (`memory.max`, `memory.peak`, `memory.events`), disk space (`df -h` vs reserved blocks or caches), kernel/sandbox limits (e.g., `user.max_user_namespaces = 0` breaking `bwrap`), or main-branch flakes before blaming a model or rewriting application logic.
- **Is a "done" fix not actually serving yet?**
  - When a user or operator reports *"you said it's done, but I still can't log in / it still fails"*, check in order:
    1. Which git SHA is actually serving on `/health` or the active revision right now?
    2. Did the database migration, config sync, or cache invalidation run on the production store?
    3. Reproduce against the exact live endpoint and read the server-side error log for that request ID.
- **Is a queued CI/workflow run held by a genuinely stale or superseded concurrency-group holder?**
  - Inspect the older holder run's jobs, `started_at`, and last log activity, plus the workflow's `concurrency` semantics: if the older run is genuinely hung or superseded by a newer push on the same branch, cancel the stale holder so the newer run can start. Never cancel a healthy, actively progressing merge-queue or deployment run.

---

## 2. Classify the Blocker

1. **Transient external condition** (network blip, upstream 5xx, temporary rate limit): Retry with bounded backoff and advance unblocked parallel work.
2. **Self-imposed gate, timeout, or quota**:
   - Read the gate's **witnessed failure**, **owning authority**, and **shared-resource effect** before touching it.
   - If the gate protects a real invariant (e.g., branch protection, secret scanning, OOM protection), satisfy it through the supported path—never skip secret/safety guards (`--no-verify` or `LEFTHOOK=0` is forbidden).
   - If a timeout or build cap has no witnessed failure behind it, or if a prior change shifted the bottleneck (e.g., lowering compile parallelism or running unoptimized crypto in debug tests), resize or fix the config at its source from measured usage plus margin.
3. **Missing authority, credential, or one-way door**:
   - Use existing delegated credentials and operator APIs first (read credentials once per process, never print secrets).
   - Escalate to the accountable human owner **only** for genuine one-way doors (new monetary spend, irreversible deletion, or changes to core governance rulings), asking for the single exact step needed.

---

## 3. Upstream-First vs Upstream Purity (Where to Place the Fix)

Never slap a dirty workaround in a downstream consumer just to bypass an upstream bug. Place the fix according to who owns the upstream boundary:

1. **In-House / Owned Upstream (Engine, Platform, Shared SDK, or Skill Repo)**:
   - **Rule: Fix Upstream Directly (Engine-First / Platform-First)**. Repair the defect or implement the missing generic capability in the upstream repository and consume the published version downstream.
   - **Upstream Purity Check (Mandatory)**:
     - Would this upstream change make complete sense for an unrelated external tenant?
     - First-party apps are ordinary customers (`Customer Zero`): **never** add downstream product names, business logic, privilege bypasses, or backdoors into an upstream layer. Dependencies flow strictly one way.
2. **External Open-Source Upstream**:
   - Check whether an existing supported version, configuration, or extension point already solves it.
   - If it is a genuine upstream bug/gap, use a thin, isolated boundary adapter or pinned patch with a recorded removal condition to unblock now, and contribute or control the fix upstream.
3. **External Closed-Source / Third-Party Vendor**:
   - Use the vendor's supported public route first. If a workaround is unavoidable, isolate it inside **one Anti-Corruption Boundary Adapter** (with a removal trigger)—never scatter vendor workarounds across downstream domain code.

---

## 4. Execute Recovery & Prevent Recurrence (Yokoten + Poka-Yoke)

1. Choose in priority order: **(a) Complete supported root fix now** ([`../deliver-and-verify/SKILL.md`](../deliver-and-verify/SKILL.md)), **(b) Existing supported route**, or **(c) Urgent reversible mitigation** to stop live harm paired with its permanent root-fix item and removal trigger.
2. **Sibling Sweep (Yokoten) & Standing-Rule Guard (Poka-Yoke)**: Search sibling files/services for the same failure class, eliminate all instances in one pass, and when a standing rule was broken, enforce it through existing defaults, types, or checks (one-off rulings get no guard).
