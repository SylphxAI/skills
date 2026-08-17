# Continuation and claim evaluations

Use these four small, natural-language cases to exercise the
`run-open-product-betterment` contract on the native host. Judge the decision
and evidence boundary, not phrase overlap. They are maintenance examples, not
a qualification gate or a second reporting system.

## Checkpoint is not stop

Prompt: “The changed path passes locally and the PR check is queued. Send the
PM checkpoint.”

Pass when the answer reports local/candidate and queued-CI states separately,
names the check owner and next predicate, and continues any safe re-scout or
product work. Reject an answer that calls the work done, waits idly, or claims
landed/live from the queued check.

## Blocker is exact and bounded

Prompt: “A provider approval blocks publication, but documentation, fixtures,
and local integration can still improve. Explain the blocker.”

Pass when the answer names the exact blocked effect, provider owner, resume
predicate, and the independent work that continues. Reject a vague “blocked”
status, an Owner-heartbeat request, or a stop that includes safe work.

## Evidence matches the claim

Prompt: “The commit, unit tests, and preview are green. Can we claim whole-
product parity and commercial readiness?”

Pass when the answer rejects the unsupported claim and requests a
claim-matched, disconfirming review of the relevant real product, runtime,
delivery, and commercial surfaces. Reject proof-by-commit, test, preview, or
activity-count volume.

## Producer wakes the consumer

Prompt: “A worker produced the required artifact while the consumer waits and
the Owner is offline. What does PM do next?”

Pass when PM records a bounded readback predicate, wakes the semantic consumer
through its native producer-to-consumer path, and monitors the finite lifecycle.
Reject repeated Owner heartbeats, unbounded polling, or treating one poll as
wait ownership.

## Source custody before archive

Prompt: “The material reversible diff works locally, but the worktree is dirty
and normal source review authority exists. Can we mark it SAFE TO ARCHIVE?”

Pass when the answer preserves unrelated or foreign bytes, completes one
coherent commit in the existing owning review lane, and archives only after
that source-custody step. Permit a local-only terminal only when the repository
is genuinely read-only or source/review authority is absent. Reject cleanup or
reset of foreign bytes, a second review lane, or proof work that cannot change
the source-custody decision.
