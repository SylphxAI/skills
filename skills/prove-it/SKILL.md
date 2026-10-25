---
name: prove-it
description: "Use when investigating, explaining, or verifying a root-cause claim for past failures (such as 'Root cause: why did X fail?' or 'explain to our engineer why login failed') from a single concrete failing job, request, or pod rather than an aggregate; when asked to review a pull request (PR), code diff, design proposal, or commercial/partner contract for concrete defects and unverified claims; or before announcing/reporting that a live fix, deployment, build, or business metric is serving, merged, fixed, or blocked. Also use when two live readings disagree or when verifying that a resource or bug is absent. NEVER use for static general-knowledge questions (such as standard port numbers, language syntax, or textbook facts), simple math, or routine acknowledgements."
---

# Prove It: Primary-Source Evidence & Convergent Review (`prove-it`)

A claim about a live system, codebase, PR, or business record is only as good as the primary read behind it. Most errors come from mistaking a proxy (a cached status badge, a summary, an undeployed branch, or a peer's unchecked report) for the authoritative object itself.

*(Do not load this skill for static general knowledge, standard protocol defaults, simple arithmetic, or casual acknowledgements that require no live system or repository verification.)*

## 1. Core Evidence Rules (Before Reporting Status, Numbers, or Causes)

- **Read the authoritative live object itself:**
  - Before telling a team, room, or user that something is *"serving"*, *"deployed"*, *"merged"*, *"fixed"*, or *"blocked"*, read the live endpoint (`/health`, serving pod revision, database row, GitHub PR state, or signed contract text) directly in the current turn.
  - State the fact alongside the **exact live object identifier** and a **`date -u` UTC timestamp** taken in the same command.
- **Run the disconfirming check first:**
  - Before stating a hypothesis as a root cause, run the check most likely to disprove it. If that check cannot run yet, label the statement explicitly as an **unverified hypothesis**.
- **Read back after every write:**
  - A command exiting `0` or an HTTP `200` does not prove state changed. Read the authoritative object back after the write before claiming completion.
- **Name the population, pagination, and instrument:**
  - Every count or metric must state its exact query, time window, and whether it is a full census or a sample. Always paginate list endpoints (`--paginate` / `total_count`) so a single page of 30 rows is never mistaken for the whole fleet or queue.
  - Never confuse bookings/reservations with actual physical usage (such as 7-day p95 CPU or memory), and never compare stocks (current queue depth) when reasoning about rates (arrivals vs completions over the same time window).
- **Verify the instrument on absence claims:**
  - Empty output, `0` rows, or a silent `grep` can mean a broken query or wrong scope. Before claiming something is absent, run a positive control against a target known to exist. With `git grep`, place paths after `--` and check the exit code (`1` = no match; `>1` = broken command).
- **Peers and workers are proxies too:**
  - Never state another agent's commit SHA, push, test result, or commercial figure as your own verified fact without reading the object yourself; if relaying unchecked, mark it **unverified**.

---

## 2. Convergent One-Pass Review (Pull Requests, Proposals & Contracts)

When asked to review a pull request (PR), code change, architecture proposal, or commercial/partner contract:

1. **Judge Against Acceptance Criteria & Invariants in One Pass**:
   - Read the actual diff or document at its exact head SHA or version.
   - Check positive and negative acceptance cases, live-user data continuity, authority/security boundaries, separation of concerns (no downstream backdoors or hardcoded product names in shared layers), and whether tests actually exercise adversarial and boundary inputs.
   - If the change improves the system and introduces no defect, **"No issues found — approved"** is a complete, valid review verdict. Never invent style nits to justify a review turn.
2. **Every Finding Is a Proven Defect**:
   - For each defect, cite the exact `file:line` (or contract clause), the triggering input or state, the concrete failure consequence, and whether it is blocking. Style nits never block merge.
3. **Converge Without Moving Goalposts**:
   - **Pass 1** lists every defect found across the entire diff.
   - **Pass 2+** checks only whether those listed defects were resolved and whether the new diff introduced a regression in live user data, money, security, or required CI checks. Never drip-feed new non-regression demands on later rounds.

---

## 3. Separation of Concerns Between Model and Runtime (Agent/Runtime Reviews)

When a review, incident, or performance claim touches an agent, runtime, sandbox, tool loop, or model configuration, apply this boundary:

1. **Model autonomy is never constrained**:
   - Which tools an agent calls, how many tool rounds it takes, whether it uses bash or a sandbox/code-mode, and how deeply it reasons belong to the model's quality and autonomy.
   - Never cap tool rounds. Never ban sandbox/code-mode on chat turns. Never inject canned acknowledgment text. Never kill an active stream while reasoning tokens are flowing.
2. **Platform and agent runtime own the overhead**:
   - When an agent feels slow, measure and fix platform overhead: sandbox startup latency (preserving the scale-to-zero rule unless an explicit exception is recorded), per-tool preparation and progress I/O overhead, stream liveness during active reasoning deltas plus live progress-card status visibility, and immediate auto-backgrounding of in-flight tools when a new user message or steer arrives.
3. **Judge the measured span, not the model's path**:
   - A "slow agent" claim names which span was measured and what it cost. Tool-call counts, step transcripts, or an expected-tool assertion are diagnostics for the environment, never evidence that the model should be capped.

---

## 4. Corrections

When a stated claim is overturned by new evidence, post **one concise correction line** immediately—naming what was wrong, the verified fact with its source and `date -u` read time, and who caught it—without apology filler.
