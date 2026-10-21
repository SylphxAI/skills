---
name: unblock
description: "Restore progress the moment any work stops. Use when blocked by a refused API/CLI call, a missing permission or credential, a red or stuck CI/build/deploy, a capacity or disk-space limit, a stalled external partner or vendor dependency, or an unclear owner. Classify the real blocker from the live source, verify it is not a proxy, and take the cleanest supported path immediately. Use swarm-fuse when the root cause is unknown across domains; use self-challenge to evaluate the lasting fix."
---

# Unblock: immediate diagnosis and progress recovery

Waiting is the most expensive failure mode. The moment any task—engineering, operational, commercial, or growth—stops moving, take one decisive diagnostic and recovery step immediately. Record timestamps with `date -u`.

## 1. Read the exact refusal from the live source

Never act on a summary, a generic error badge, or a second-hand report ([prove-it](../prove-it/SKILL.md)). Read the exact error code, refusal message, or stalled state from the live component and classify it into one of five categories:

- **Transient external condition** (network blip, upstream 5xx, temporary rate limit, slot contention): Retry with bounded backoff and advance parallel work in the meantime.
- **Self-imposed rule, gate, or configuration** (a timeout, quota, allowlist, hook, build cap, or internal check):
  - Read the gate's **witnessed failure**, its **owning authority**, and its **shared-resource effect** before touching it.
  - A gate is not defective merely because it refused work: if it protects a real invariant (such as preventing unreviewed changes on a protected path or preventing OOM kills), satisfy the requirement through the supported path.
  - If a limit has no witnessed failure behind it, or if a previous change shifted the bottleneck (e.g., lowering build parallelism without resizing the job timeout), fix the configuration at its source once from measured usage plus margin.
- **Missing authority, credential, or one-way door:**
  - Use existing authorized credentials and delegated access paths first (reading credentials once per process, never printing secrets).
  - Escalate to the accountable human decision-maker **only** for genuine one-way doors (new monetary spend, irreversible data/resource deletion, unapproved commercial commitments, or changes to standing governance rulings), asking for the single exact step needed.
- **External dependency or another area's blocker** (a partner reply, an app-store review, an upstream service):
  - Link the blocker to the blocked outcome so it inherits the priority score, notify the owning party in one concise message, and immediately advance unblocked parallel work or prepare the local integration so zero work remains once the dependency clears.
- **Impossible as literally phrased:**
  - State the exact physical, legal, or protocol reason with primary evidence and propose the closest achievable outcome that satisfies the user's underlying goal.

## 2. Verify the block is real (not a broken instrument)

Before routing around a block, confirm the reading itself is valid ([prove-it](../prove-it/SKILL.md)):
- Is `Available: 0` on a disk caused by actual file usage, rebuildable caches, or filesystem reserved blocks?
- Is a "missing deploy" actually an image build still in progress or a failed compile step in the build job log?
- Is a peer session "offline" because of a quota issue, or because a helper path in its config broke?

## 3. Execute the cleanest supported recovery path

Choose in strict priority order:
1. **The complete supported root fix**, delivered and verified now ([deliver-and-verify](../deliver-and-verify/SKILL.md)).
2. **An existing supported route** that achieves the same Stage 1 acceptance outcome cleanly.
3. **An urgent reversible mitigation** to stop live harm immediately, paired in the same delivery (or linked root-fix item) with its removal trigger and clean-up verification.

Never bypass hard safety, spend, secret, or data-continuity boundaries, and never overwrite another active writer's worktree.

## 4. Prevent recurrence

When a blocker could hit the next agent or workflow, fold the root fix into the owning tool, configuration, or reference standard once so the entire failure class is eliminated.
