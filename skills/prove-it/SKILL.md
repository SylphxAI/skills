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
- A passing step proves only what it checked: read the log for the inner result. A failure in a verifier's own output can mask the real verdict, so keep diagnostics from failed runs. A waiter on checks can hang on one stuck optional check, so list the non-terminal checks yourself when it passes its expected time. A watch that fires when checks finish is not a merge: read the pull request's merged state, and its merge-queue entry, from the live API before calling it merged, since a cached view can show an old head.
- A status list can say working or idle while the opposite is true. To learn whether a worker is moving, read the newest write in its own session or output, and compare times across workers; a stop at the same second across workers points to the platform.
- Before a long read with a time cap, multiply the measured rate by the population, so a cap can't silently end it part-way. Plan the continuation before launch and keep each pass's result separate.
- Before judging a product from an offline render, emulator or reconstruction, compare that method with a real capture of the same scene.
- A blocker in a report is a claim until you open the frame or log behind it. Wording drifts as it passes between reports: a stopped attempt becomes a named obstacle, then a rule, then a request for hardware. Open the evidence before repeating it or setting a rule on it, and first when a person questions it.
- A measurement says what that build and that route did, not what exists. Before saying something is missing or must be built, search the history for it and name which version, path or data the measurement ran on. A capability can be finished and proved while the live pointer still selects the old route.
- For a count or metric, retain the query, window, instrument and population. Follow continuation pages for a census; label a sample and its uncertainty. A returned total can cross-check a census where the API defines it, but is not a pagination mechanism.
- Distinguish measured physical use from reservations, and stocks from rates over a common window.
- Validate absence queries with a positive control and the correct scope. With `git grep`, put paths after `--` and distinguish no match (exit 1) from a command error (greater than 1).
- Read a worker's commit, push, test result or commercial record yourself before presenting it as verified. An attributed report can be relayed with its unchecked status clear.

For API route rankings, ingress-log percentiles, slow-request attribution or
before/after latency claims, read [API latency evidence](references/api-latency.md).
It covers parser and coverage controls, duplicate records versus proxy hops,
observation boundaries, failed requests and comparable follow-up windows.

For fleet resource censuses, idle replica floors or claimed capacity releases,
read [fleet capacity evidence](references/fleet-capacity.md). It separates
physical use, controller minima, admitted Pod requests, traffic evidence and
verified release receipts.

For token-use boards, prompt duplication, cache claims or model-cost savings, read
[model-usage.md](references/model-usage.md). It covers response deduplication,
counter semantics, counts-only privacy, comparable before/after work and product
economics.

For Android native launch/recreation ANRs or store-build exposure claims, read
[Android lifecycle and shipped-build evidence](references/android-lifecycle.md).
It separates the destruction handshake, exact dependency, signed artifact and
current publication state.

For app-store rejections, policy declarations, release status or shipped-app
privacy links, read [app store state](references/app-store-state.md). It
separates event approvals, version reviews, Console declarations, public
releases and installed-build evidence.

## Split-binary startup failures

A symbol name does not prove exclusive function ownership. Compiler-folded
functions can serve unrelated callers, including indirect table calls. Before
skipping a compiled module, test the final packed artifact on the affected call
path; a direct-call graph, a hardware capability probe or a renderer-only test
cannot establish that all of its functions are unreachable. If that cannot be
established, loading the module before synchronous title calls is safer than
assuming the probe makes it unnecessary. Measure the added download bytes.

Continue startup tracing across navigation and recovery. **Wrong:** a module
exception proves the page stayed blank. **Right:** record the exception, any
reload, the next document and its eventual readiness separately. Preserve the
strict check's failure even if the user-visible page later recovers. Keep an
original CI artifact, a same-source reconstruction and a live capture as distinct
claims; compressed files on disk do not prove negotiated network transfer sizes.

## Review a change

Read the diff or document at its exact head SHA or version. Judge it against the acceptance cases, supported behavior, data continuity, authority boundaries and relevant tests. A review with no concrete defects is complete; style preferences do not create merge blockers.

For each finding, name the file and line or contract clause, triggering state/input, consequence and severity. A logical counterexample can establish a defect; distinguish it from an untested hypothesis.

Consolidate the first review across the whole change. Later rounds check the fixes and changed code. Report a newly discovered material defect with evidence and explain why it is new; avoid unrelated demands and repeated style rounds.

For agent/runtime claims, use the shared [model/runtime boundary](../self-challenge/SKILL.md). Measure the affected span before changing the environment. Tool counts alone do not justify limiting reasoning or tool access; explicit user cancellation and authorized resource/spend limits remain effective.

When evidence overturns a claim, correct what was wrong, state the bounded verified fact and source/read time, and credit whoever caught it.
