---
name: self-challenge
description: "Run the three-stage ATDD and first-principles challenge checks at four concrete moments: Use when (1) writing or reviewing Stage 1 acceptance criteria, (2) evaluating a Stage 2 plan, design, commercial agreement, operational change, or root-cause claim before execution, (3) verifying Stage 3 completion before reporting any work as fixed or done, and (4) any task or blocker has waited 30 minutes or more. Applies across commercial, operational, growth, product, and engineering work. Use prove-it to verify raw evidence; use deliver-and-verify to execute the work."
---

# Self-Challenge (`self-challenge`)

Run these challenge checks on your own work and on peers' proposals so gaps, weak ambitions, over-complicated mechanisms, and unverified assumptions are caught by us first. This skill is **role-neutral and domain-universal**: it applies equally to commercial/partner negotiations, operations, marketing/growth, product decisions, customer support, and software engineering.

## 1. The Three Universal Standard Tests (Run at Stage 1 & Stage 2)

Every non-trivial outcome and plan is evaluated against three foundational tests:

1. **Test A — Category-Leader Benchmark (When Shaping a Product, Growth/Commercial Mechanic, or Platform Capability)**:
   - When designing or changing a user-facing feature, UX flow, commercial model, growth mechanic, or platform capability, name the **category leader** (the top product, service, or open standard in that category) and cite a **dated primary-source read from the current session** whenever the design relies on an external specification, protocol, law, or vendor API.
   - Ask: *"Does our target acceptance match or beat the category leader on every user-facing dimension, or is it a half-measure?"* The smallest acceptable change for a product surface is the one that reaches the category leader in one step.
   - *(Skip Test A for routine operational chores, internal bug fixes, or mechanical cleanups that do not define a product or platform capability.)*
2. **Test B — Zero-Unrequested-Mechanism Simplification (First-Principles Minimalism)**:
   - Ask: *"What happens if we delete this part?"*
   - Reject every self-imposed limit, unrequested throttle, hand-built queue, approval ritual, compatibility shim, or speculative abstraction that is not required by a witnessed failure mode or a hard constraint.
   - Keep the complexity on our side and hand the user, customer, or partner simplicity.
3. **Test C — One-Shot Direct Path (Complete Class Fix)**:
   - Ask: *"Does this reach the target end state in one delivery and fix the entire failure class across sibling callers, or is it a symptom patch that leaves a second migration behind?"*
   - Where a proven end state exists, build it directly in the first delivery, migrate all callers, and delete the old path.

## 2. The Four Trigger Moments

### Moment 1 — Stage 1: Writing or Reviewing Acceptance Criteria (with `author-item`)
- Are the acceptance criteria written as **observable positive and negative test cases** rather than vague goals or implementation steps?
- For product, growth, commercial, or platform work, does the target meet **Test A (Category-Leader Benchmark)**?

### Moment 2 — Stage 2: Before Committing to a Plan, Design, Agreement, or Root Cause
- **Acceptance Coverage**: Walk through every Stage 1 acceptance test case against the proposed plan (commercial terms, operational runbook, campaign mechanics, or technical architecture). Which test case would still fail under this plan?
- **Disconfirming Check (Root Cause)**: Before claiming a root cause, name one konkrete observation from a single failing job, request, or record, and state what observation would **disprove** your hypothesis. Run the disconfirming check now; if it cannot yet run, keep the claim labeled as a hypothesis.
- **Risk & Economics**: Score any legal, tax, commercial, or operational exposure by `likelihood (1–5) × impact (1–5)` ([references/risk.md](references/risk.md)). Never block on an unscored hypothetical risk.

### Moment 3 — Stage 3: Before Saying Anything Is "Fixed", "Merged", "Live", or "Done"
- Did you verify the outcome at the **real surface** (live production endpoint, actual partner/customer artifact, or committed state read back after the write) rather than stopping at "code written" or "CI triggered"?
- Did you sweep for the same gap across sibling files, endpoints, or workflows and delete the superseded path?

### Moment 4 — The 30-Minute Stall Check
- Whenever any work item, build, review, or external wait has stalled for **30 minutes or more**, stop waiting passively:
  1. Read the live object directly (job log, queue state, process table, partner status).
  2. Ask whether the current path is blocked on a proxy or an unchallenged assumption, and switch to a direct supported path (`unblock`) or group deliberation (`swarm-fuse`).

## 3. Domain Reference Standards (Load Only What Matches the Task)

Load the specific reference file(s) from `references/` that govern the domain you are challenging:

- **Product, UX & User Feedback**:
  - [references/product.md](references/product.md) — Product scope, category-leader parity, and multi-agent conversation participation
  - [references/experience.md](references/experience.md) — UI/UX quality, onboarding, accessibility, localization, and latency feel
  - [references/feedback.md](references/feedback.md) — In-product user feedback loops and friction signals
- **Commercial, Growth, Marketing & Games**:
  - [references/commercial.md](references/commercial.md) — Pricing, plans, checkout, billing transparency, partner terms, and refunds
  - [references/growth.md](references/growth.md) — Acquisition, activation, referral loops, SEO/ASO, and promotion economics
  - [references/mechanics.md](references/mechanics.md) and [references/mechanics-catalogue.md](references/mechanics-catalogue.md) — Proven engagement, progression, monetisation, and retention loops
  - [references/games.md](references/games.md) — Game economy, matchmaking, live-ops continuity, and parity sheets
- **Conduct, Communication & Risk**:
  - [references/conduct.md](references/conduct.md) — External communication, customer/partner stance, legal/regulatory response, and confidentiality
  - [references/agent-voice.md](references/agent-voice.md) — Plain, direct, sharp-friend tone for agent and user-facing copy
  - [references/risk.md](references/risk.md) — Quantitative `5×5` likelihood × impact risk scoring, expected value, and risk of ruin
- **System Architecture & Technology Stack**:
  - [references/architecture.md](references/architecture.md) — On-demand scale-to-zero, platform-first boundaries, durability, and resilience
  - [references/stack.md](references/stack.md) — Reference languages, runtimes, storage engines, and dependency selection
