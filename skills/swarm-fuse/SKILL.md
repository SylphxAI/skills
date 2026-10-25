---
name: swarm-fuse
description: "Use when a question needs several independent views: multi-domain design, uncertain root cause, architecture trade-offs, or a blocker needing new evidence. Assign orthogonal angles, gather independent findings, and let the accountable owner decide on evidence and record dissent. Not a mandatory ritual before editing or a consensus gate. Do NOT use for clear single-agent work or actively progressing jobs."
---

# Swarm and Fuse: Structured Multi-Angle Deliberation (`swarm-fuse`)

Use this method when a question needs several independent views. It is not a required step before a first proposal or edit: clear work proceeds directly. On a blocked path, change the method immediately; gather other views when they can supply new evidence, not merely because a timer elapsed. The accountable owner decides on evidence and records dissent; unanimity is not required.

This method is **role-neutral**: whoever initiates or leads the discussion acts as the **Facilitator**. Swarming is strictly for **understanding and deciding**; once the decision is made, **execution always goes to a single named writer**.

## When NOT to Swarm (Avoid Over-Engineering)

- **Simple direct questions or clear single-agent tasks**: Answer or execute directly—never run a multi-phase meeting ritual for work that one agent can finish cleanly and that has no design, root-cause, architecture, or writer-assignment question.
- **Actively progressing jobs**: If a build, test suite, or migration has run for 12 minutes and its live log shows normal forward progress, it is **not** stalled—do not trigger a swarm just because the clock passed 10 minutes.

---

## Phase 1: Dynamic Charter (Topic × Participant Roster) & Live Primary Reads

Every discussion has a different scope and a different set of participants. The Facilitator opens with a **3-line Dynamic Charter**:

1. **Lock the Question, Boundary, and Acceptance Criteria**:
   - State the exact question to settle, what is out of scope, and the observable positive/negative acceptance criteria ([`../author-item/SKILL.md`](../author-item/SKILL.md)).
2. **Assign Angles Dynamically by Topic × Participant Context**:
   - Allocate angles based on **what the current problem touches** and **what context/tools each present participant holds** (or, for a broad point-by-point review, have every participant independently evaluate every point before reading others' conclusions):
     - *Cross-functional roster (Product, Engineering, Commercial/Ops)*: Assign each participant their domain boundary (e.g., user experience & parity, system architecture & 10x scale, unit economics & risk score, live production telemetry).
     - *Homogeneous roster (multiple engineering or generalist agents)*: Split by epistemic role—**(a) Propose the simplest complete mechanism**, **(b) Red-Team / Disconfirming Check** (actively hunt for the input, race condition, or edge case that breaks the proposal), and **(c) Live Primary-Source & Code Audit** (read the actual code, database, and external specs)—or run independent full-pass reviews before cross-comparison.
   - **Always assign a Scope Management / Simplification angle**: One participant's job is to ask *"what can we delete, and what is here only because we assumed it was needed?"* This angle explicitly rejects **over-engineering** (unrequested abstractions, queues, gates, compatibility layers, dashboards, or speculative mechanisms with no witnessed failure) and **model-policing** (capping tool rounds, banning sandbox/code-mode on chat turns, injecting canned acknowledgment text, or killing an active stream while reasoning tokens flow). The swarm decides the environment, constraints, and acceptance criteria; the model keeps its own tool choice and reasoning depth ([`../self-challenge/SKILL.md`](../self-challenge/SKILL.md), Separation of Concerns Between Model and Runtime).
3. **Read Live Objects & External Primary Sources in Parallel**:
   - Every participant reads the live objects directly (logs, database via read-only role, PR diff, or external RFC/vendor spec) with a `date -u` timestamp ([`../prove-it/SKILL.md`](../prove-it/SKILL.md)).

---

## Phase 2: Independent Blind Analysis & High-Signal Challenge (Delphi + Red-Team)

To prevent anchoring bias (where the first speaker's framing pulls everyone else into groupthink):

1. **Independent Angles First**: Participants form their findings from primary evidence before converging.
2. **High-Signal Discussion Protocol**:
   - Speak **only** to contribute: **(a) a new verified observation**, **(b) a disconfirming counter-example that changes the decision**, or **(c) a simpler alternative that still passes every acceptance criterion**.
   - **Zero Echo**: Never repeat or paraphrase a point another participant already made, never post status filler, and strictly separate verified observations from hypotheses.
3. **Test Cross-Domain Seams**:
   - Explicitly test where one angle touches another (for example, how a concurrency cap interacts with test timeouts, or how a support lock state interacts with a topic switch).

---

## Phase 3: Converge (Disagree and Commit) & Name One Execution Writer

1. **Synthesize the Simplest Complete Decision**: The Facilitator summarizes the evidence; the accountable owner chooses one coherent design or action plan, recording dissent without waiting for consensus.
2. **Run One Reverse-Challenge Pass**: Verify the synthesized plan against [`../self-challenge/SKILL.md`](../self-challenge/SKILL.md) (Category-Leader Benchmark, YAGNI, 10x/100x Scale & SSOT, Separation of Concerns, and Complete Migration).
3. **Record the Decision & Assign One Writer**:
   - State the final decision, who challenged it (and what changed), any remaining falsifiers to watch, and the **single named execution writer** who carries it through [`../deliver-and-verify/SKILL.md`](../deliver-and-verify/SKILL.md).

---

## Standing Time Rules

- **10-Minute No-Evidence Re-Check**: Change a blocked method immediately; if 10 minutes pass with **zero new primary evidence**, re-check the method or instrument again. This is not a required wait.
- **Immediate Recovery, Latest Re-Check at 30 Minutes**: Change the method as soon as the path is blocked; 30 minutes is the latest re-check, not a required wait. Use a reversible operational workaround within existing grants, record its root-fix follow-up and removal trigger, and remove it once fixed. Products never work around our own engines: the engine owner fixes the gap upstream first. Preserve spending approval, unique user data, auth, tenant isolation, and ledger protections.
