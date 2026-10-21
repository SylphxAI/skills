---
name: prove-it
description: "Turn any claim into primary-source evidence before stating it, and run convergent one-pass reviews against Stage 1 acceptance criteria. Use when verifying or before reporting any number, root cause, capacity/usage figure, commercial metric, or status (fixed, merged, live, blocked, absent), whenever two readings disagree, and when performing an independent review of a code, design, or operational change. Use self-challenge to evaluate direction and simplicity; use deliver-and-verify to carry work to completion."
---

# Prove it: primary-source evidence and convergent review

A claim is only as good as the primary read behind it. Most errors come from mistaking a proxy (a cached status, a summary, an assumption, or a peer's unchecked report) for the object itself.

## Core evidence rules (all domains)

- **Run the disconfirming check first:** Before stating a hypothesis as a fact or root cause, run the check most likely to overturn it. If no available check can test it yet, label it explicitly as an **unverified hypothesis**.
- **Read the authoritative object itself:** Read the live service, the actual database row, the deployed revision, the signed commercial text, or the primary specification—never an undeployed branch, a local note, or a cached badge.
- **Read back after every write:** A command exiting `0` or an API returning `200` does not prove the state changed. Read the authoritative object back after the write before reporting success.
- **Name the population and the instrument:** Every number must state its exact query, time window, filter, and whether it is a full census or a sample. Never extrapolate a sample into a universal count, and never confuse bookings/requests with physical usage.
- **Verify the instrument on absence claims:** Empty output, a zero count, or a silent grep can mean a broken query. Before claiming something is absent, run the same query against a target known to exist. With `git grep`, always place paths after `--` and check the exit code (`1` = no match; `>1` = broken command).
- **Mind the cache and the clock:** Read past caches when verifying a fresh change. Take every timestamp from `date -u` in the same command as the read—never from memory.
- **Reconcile conflicting readings:** When two numbers or observations disagree, reconcile their scope, metric definition, and timestamp before acting. Never cherry-pick the convenient reading.
- **Peers and workers are proxies too:** Never state another agent's SHA, push, test result, or commercial figure as your own fact without reading the object yourself; if relaying unchecked, label it explicitly as unverified.

## Independent review (Stage 2 Plan Review & Stage 3 Tier-3 Review)

When asked to review a code change, architecture proposal, commercial agreement, or operational plan:

1. **Review against Stage 1 Acceptance Test Cases in one pass:**
   - Compare the actual diff or proposal at its exact head/version against the Stage 1 positive and negative acceptance criteria, caller boundaries, state transitions, and authority/security checks.
   - A passing test proves only what its assertion covers; check whether adversarial or boundary inputs are actually exercised.
   - If nothing violates the acceptance criteria or introduces a defect, **"No issues found"** is a complete, valid review verdict. Never invent nits to justify the review turn.
2. **Every finding is a proven claim:**
   - State the exact revision/file/line (or clause), the triggering input or state, the concrete failure consequence, and the severity.
   - Distinguish a defect introduced by this change from a pre-existing issue or an optional style suggestion. Nits never block delivery.
3. **Converge without moving goalposts:**
   - The first review pass lists all established defects.
   - Subsequent passes verify only whether those points were resolved and whether the new diff introduced a regression in live user data, money, security, or required checks.
   - The outcome's single writer decides whether to adopt non-blocking suggestions. If fixes keep cycling, step back and run [self-challenge](../self-challenge/SKILL.md) on the design rather than adding review rounds.

## Output

State the fact alongside its exact live object and `date -u` timestamp. Mark anything not directly read as **unverified**. When a stated claim is overturned, post one concise correction line: what was wrong, the verified fact with its source and read time, and who caught it.
