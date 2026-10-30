---
name: prove-it
description: "Use when investigating a root-cause claim for a past failure; reviewing a PR, diff, proposal or contract for concrete defects; verifying a live status or metric before reporting it; reconciling conflicting readings; or checking that a resource or bug is absent. Use unblock to restore currently failing work and self-challenge to compare designs. Static general knowledge, arithmetic and routine acknowledgements do not need this skill."
---

# Prove it

Support a claim with the authoritative object at the layer being claimed. Cached badges, summaries, undeployed branches and unchecked reports can differ from that object.

## Establish the evidence

- Read mutable status before a new claim that something is serving, deployed, merged, fixed or blocked. Name the object, version or revision, and UTC read time. An immutable object already read in the session can be reused at that exact version and scope.
- Start a failure investigation from a concrete request, job, pod or transaction and its governing code/configuration. Use population measurements to establish scope without substituting an aggregate for the failing event.
- Before presenting a root cause, run the available check most likely to disprove it. If it cannot run, keep the explanation a hypothesis and name the missing check.
- Read the authoritative object back after a mutation before claiming completion. A successful command or response alone establishes only that command's result.
- For a count or metric, retain the query, window, instrument and population. Follow continuation pages for a census; label a sample and its uncertainty. A returned total can cross-check a census where the API defines it, but is not a pagination mechanism.
- Distinguish measured physical use from reservations, and stocks from rates over a common window.
- Validate absence queries with a positive control and the correct scope. With `git grep`, put paths after `--` and distinguish no match (exit 1) from a command error (greater than 1).
- Read a worker's commit, push, test result or commercial record yourself before presenting it as verified. An attributed report can be relayed with its unchecked status clear.

## Review a change

Read the diff or document at its exact head SHA or version. Judge it against the acceptance cases, supported behavior, data continuity, authority boundaries and relevant tests. A review with no concrete defects is complete; style preferences do not create merge blockers.

For each finding, name the file and line or contract clause, triggering state/input, consequence and severity. A logical counterexample can establish a defect; distinguish it from an untested hypothesis.

Consolidate the first review across the whole change. Later rounds check the fixes and changed code. Report a newly discovered material defect with evidence and explain why it is new; avoid unrelated demands and repeated style rounds.

For agent/runtime claims, use the shared [model/runtime boundary](../self-challenge/SKILL.md). Measure the affected span before changing the environment. Tool counts alone do not justify limiting reasoning or tool access; explicit user cancellation and authorized resource/spend limits remain effective.

When evidence overturns a claim, correct what was wrong, state the bounded verified fact and source/read time, and credit whoever caught it.
