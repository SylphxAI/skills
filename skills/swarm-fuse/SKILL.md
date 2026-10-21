---
name: swarm-fuse
description: "Facilitate multi-angle group deliberation across a team of agents or humans. Use when a problem hits a wall, has stalled for 10+ minutes with no new evidence, spans multiple domains (commercial, operational, product, or architectural), or when collective thinking ('brain trust') is requested. Role-neutral: any agent facilitating frames the Stage 1 criteria and primary sources, gathers independent perspectives, tests cross-domain interactions, and converges into one decision with a single execution writer. Use deliver-and-verify for routine single-writer execution."
---

# Swarm and fuse: structured multi-angle problem solving

When a problem spans domains, has an unknown root cause, or stalls for 10 minutes with no new evidence, parallel independent investigation followed by structured synthesis converges far faster than sequential relays or freeform back-and-forth.

This method is **completely role-neutral**: whoever initiates or facilitates the discussion acts as the **Facilitator** for that topic. Swarming is strictly for **understanding and deciding**; once the decision is made, **execution always goes to a single named writer**.

## Phase 1: Frame the problem, Stage 1 criteria, and primary sources

Before participants propose solutions, the Facilitator establishes a clean frame:

1. **State the exact question and Stage 1 Acceptance Criteria:** What observable outcome must be true at the end, and what are the positive and negative test cases ([author-item](../author-item/SKILL.md))?
2. **Read the live objects in parallel:** Every participant reads the authoritative live objects directly (the failing service/log, the commercial contract text, the campaign metrics, the upstream dependency) with a `date -u` timestamp ([prove-it](../prove-it/SKILL.md)). Separate verified observations from hypotheses.
3. **Read external primary sources live (never from training memory):**
   - Any proposal that depends on an external standard, specification (W3C, IETF RFC/draft), vendor capability, API contract, legal rule, or upstream release must carry a **live dated read of the primary source from the current session** (naming the exact version/date and UTC read time).
   - Training memory, blog summaries, and search snippets are leads to a primary source, never the source itself. Compare what the primary standard says now against what we currently run so any migration is sized from the actual delta.
   - When reading an AI/agent paper or framework, extract its benchmark measurements, failure classes, and evaluation tasks—never copy fixed prompt/planner scaffolding built to compensate for weaker models ([self-challenge](../self-challenge/references/product.md)).

## Phase 2: Independent multi-angle analysis and interaction challenge

To prevent anchoring bias (where the first speaker's framing pulls everyone else into minor edits of a flawed premise):

1. **Independent angles first:** Participants contribute from distinct, orthogonal angles (e.g., commercial/user impact, system boundary & simplicity, failure modes & adversarial cases, operational cost) before converging.
2. **Challenge only what changes the decision:** A challenge must bring either disconfirming primary evidence or a concrete alternative that passes Stage 1 acceptance more simply. Do not repeat another participant's point or post status noise.
3. **Test cross-domain interactions:** Explicitly check the seams where one proposal touches another (for example, how a rate limit affects compile timeouts, or how a support lock rule interacts with a topic change). Individually valid changes frequently fail at their intersection.

## Phase 3: Converge (Stage 2 check) and assign one execution writer

1. **Synthesize one candidate decision:** The Facilitator merges the findings into the single simplest complete design or action plan.
2. **Run one reverse-challenge pass (Stage 2 ATDD check):** Test the synthesized plan against the Stage 1 positive/negative acceptance criteria and the three universal standard tests in [self-challenge](../self-challenge/SKILL.md) (Category-Leader Benchmark, Zero-Unrequested-Mechanism, One-Shot Direct Path).
3. **Record the decision and name one writer:** State the chosen outcome, any remaining falsifiers to watch, and the **single execution writer** who will carry it through [deliver-and-verify](../deliver-and-verify/SKILL.md).

## Standing rules

- **10-minute stall rule:** If 10 minutes pass on a blocker with no new primary evidence, change the investigation method immediately.
- **30-minute resolution cap:** If any wait exceeds 30 minutes, apply an authorized reversible mitigation or parallel route immediately while the lasting fix is converged, and record the removal trigger for any temporary mitigation.
- **Design for 10x and 100x scale:** Present measurements size current capacity; architectural choices must hold at 10x and 100x without redesign.
