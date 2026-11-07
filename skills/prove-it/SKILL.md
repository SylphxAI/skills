---
name: prove-it
description: "Use when investigating a root-cause claim for a past failure; reviewing a PR, diff, proposal or contract for concrete defects; verifying a live status or metric before reporting it; verifying an Android license-tester purchase; verifying time-windowed usage or billing queries; reconciling conflicting readings; or checking that a resource or bug is absent. Use deliver-and-verify to publish or arm a PR. Use unblock to restore currently failing work and challenge to compare designs. Static general knowledge, arithmetic and routine acknowledgements do not need this skill."
---

# Prove it

Support a claim with the authoritative object at the layer being claimed. Cached badges, summaries, undeployed branches and unchecked reports can differ from that object.

## Establish the evidence

- Read mutable status before a new claim that something is serving, deployed, merged, fixed or blocked. Name the object, version or revision, and UTC read time. An immutable object already read in the session can be reused at that exact version and scope.
- Start a failure investigation from a concrete request, job, pod or transaction and its governing code/configuration. Use population measurements to establish scope without substituting an aggregate for the failing event.
- Before presenting a root cause, run the available check most likely to disprove it. If it cannot run, keep the explanation a hypothesis and name the missing check.
- Read the authoritative object back after a mutation before claiming completion. A successful command or response alone establishes only that command's result.
- A passing step proves only what it checked: read the log for the inner result. When display and machine representations intentionally differ, enumerate and assert each surface independently in source and live output (for example, visible text, `tel:` href, JSON-LD `telephone` and analogous structured fields). A correct value on one surface or a whole-output normalization does not prove the others; spaced display text can pass while a machine field incorrectly retains those spaces. A failure in a verifier's own output can mask the real verdict, so keep diagnostics from failed runs. A waiter on checks can hang on one stuck optional check, so list the non-terminal checks yourself when it passes its expected time. For pull request checks and merge claims, use the [current pull request and queue state](#pull-request-checks-and-merge-queue-state).
- Before citing a regression test, confirm that the exact test was discovered and executed in the intended environment. Read selected, passed and skipped counts, including ignored-test enrollment and required setup. A green command selecting zero tests proves nothing. Give independent fixture scenarios distinct resource keys so an earlier success cannot satisfy a later negative case.
- A status list can say working or idle while the opposite is true. To learn whether a worker is moving, read the newest write in its own session or output, and compare times across workers; a stop at the same second across workers points to the platform.
- Before a long read with a time cap, multiply the measured rate by the population, so a cap can't silently end it part-way. Plan the continuation before launch and keep each pass's result separate.
- Before judging a product from an offline render, emulator or reconstruction, compare that method with a real capture of the same scene.
- A blocker in a report is a claim until you open the frame or log behind it. Wording drifts as it passes between reports: a stopped attempt becomes a named obstacle, then a rule, then a request for hardware. Open the evidence before repeating it or setting a rule on it, and first when a person questions it.
- A measurement says what that build and that route did, not what exists. Before saying something is missing or must be built, search the history for it and name which version, path or data the measurement ran on. A capability can be finished and proved while the live pointer still selects the old route.
- For a count or metric, retain the query, window, instrument and population. Rounded displays cannot establish an exact zero: use the underlying counter or receipt at the claimed unit, and read the verifier's result before reporting it. A census reaches the terminal page of every required nested list and distinguishes currently effective entries from scheduled ones; label a sample and its uncertainty. A returned total can cross-check a census where the API defines it, but is not a pagination mechanism. A cached census carries each object's observation time and unresolved stale or negative results; it is not a simultaneous live reading.
- For a historical backlog, distinguish coverage of retained ledger rows, recovery of original messages, prior finite acceptance, current acceptance and execution ownership. A complete retained ledger does not establish complete historical-source recovery. Match the exact source body and time; an alias or nearby message with different content leaves the original unresolved. Overlapping source clauses can describe one outcome, and a completed finite action does not close its unfinished umbrella outcome.
- Resolve repository aliases by the returned repository ID, full name and authoritative URL. A redirect to a legacy repository does not identify a similarly named current repository. A shared commit author does not identify the writer of a branch or its current owner.
- Stop a read batch on its first quota or guard refusal. Preserve completed results and continuation state, respect the reset or supported recovery condition, and resume only what remains needed. Do not continue refused aliases, switch identities or restart a bulk scan to evade the shared limit.
- Distinguish measured physical use from reservations, and stocks from rates over a common window. Inspection can itself refresh indexes, access times or caches; disable optional observer writes when those fields decide eligibility, or record their exact effects separately. **Wrong:** treat a verifier-refreshed timestamp as owner activity. **Right:** preserve the pre-inspection state and distinguish observer changes from the writer being measured.
- An absence claim needs an authoritative full read; otherwise state what was read and what was not. Validate absence queries with a positive control on the same route, scope and credential. A control must remain valid across supported lifecycle states: a known record becoming archived can preserve proof of census coverage while changing its eligibility for action. Test that transition separately from an unavailable or partial census. A token that works for one store, namespace or organization does not prove read access to another, so a 404 or refusal there is not evidence of absence. With `git grep`, put paths after `--` and distinguish no match (exit 1) from a command error (greater than 1). A zero-result reconciliation also needs a fresh source and evidence that the expected population was scanned; stale or empty input can pass vacuously.
  Replaying a missed pre-publication or other incremental check after a mutation
  can silently select nothing because references, cursors or caches have advanced;
  preserve or reconstruct the original selection boundary in an isolated verifier
  using the unchanged supported check, without rolling back live state. A passing
  replay needs evidence of the intended nonempty population, or a calibrated
  control establishing that an empty population is legitimate.
- Keep source assertions, continuous integration (CI) enrollment and executed results separate. Read a worker's commit, push, test result or commercial record yourself before presenting it as verified; a writer's run remains attributed evidence, not the reviewer's own execution. An attributed report can be relayed with its unchecked status clear.

Before treating a continuity mismatch as lost state, verify that entity identity,
units and balance basis agree, including whether rows represent separate instances.
An unlogged debit can reproduce an earlier balance, so the writer and independent
event history must support attribution. **Wrong:** “Both grants started at zero,
so the first was lost.” **Right:** “Each grant creates a separate inventory
instance; the shared item type does not identify one balance chain.”

For async wrong-target writes, source refusal versus on-disk tamper,
real-recorder conformance, evaluate-only support claims or converging retry and
fallback mechanisms, read [code boundary tests](../deliver-and-verify/references/code.md).
For missing exports present in source or cross-UID permission fixtures, read
[build and fixture isolation](../deliver-and-verify/references/dx.md).

For agent workspace cleanup, instruction freshness, retained/searchable history
or uncertain tool mutations, read [agent runtime evidence](references/agent-runtime.md).
It separates source, generated files, session context, raw retention, search
coverage and actual runtime execution.

For API route rankings, ingress-log percentiles, slow-request attribution or
before/after latency claims, read [API latency evidence](references/api-latency.md).
It covers parser and coverage controls, duplicate records versus proxy hops,
observation boundaries, failed requests and comparable follow-up windows.

For fleet resource censuses, historical worker concurrency, idle replica floors or claimed capacity releases,
read [fleet capacity evidence](references/fleet-capacity.md). It separates
physical use, controller minima, admitted Pod requests, traffic evidence and
verified release receipts.

For token-use boards, prompt duplication, cache claims, model-cost savings, or
verification of time-windowed usage or billing queries, read
[model-usage.md](references/model-usage.md). It covers historical classification,
query conservation, response deduplication, counter semantics, counts-only privacy,
comparable before/after work and product economics.

For Android native launch/recreation ANRs or store-build exposure claims, read
[Android lifecycle and shipped-build evidence](references/android-lifecycle.md).
It separates the destruction handshake, exact dependency, signed artifact and
current publication state.

For guest continuity across a signed app update, read
[guest continuity](../deliver-and-verify/references/auth.md#prove-guest-continuity).
It binds the installed artifacts and uses a server-backed identity marker when the
game UI exposes no account ID; a default balance alone cannot establish continuity.

For app-store rejections, policy declarations, release status or shipped-app
privacy links, read [app store state](references/app-store-state.md). It
separates event approvals, version reviews, Console declarations, public
releases and installed-build evidence.

For Android license-tester purchases, Play refunds, missing entitlements, or
server-delivery claims, read
[Play purchase evidence](references/play-purchases.md). It separates the provider
refund reason, application failure, verified ownership, grant and store completion.

## Pull request checks and merge-queue state

Bind check evidence to the current pull request, exact head, workflow run and
required-check decision. A commit-level check list can include successful runs
from another pull request at the same SHA. Those results establish what ran;
they do not by themselves establish the current pull request's merge eligibility.
If the provider still expects a required check, preserve that refusal separately
from the earlier passing result and follow the current required-check path.

GitHub [commit statuses](https://docs.github.com/en/rest/commits/statuses) and
[Check Runs](https://docs.github.com/en/rest/checks/runs) expose distinct
populations: an approval absent from `commits/<sha>/check-runs` may be present
in `commits/<sha>/status`. Resolve a named context through both surfaces at the
same head, retaining producer and timestamp; aggregate success on either
surface establishes neither the other's result nor the PR's merge eligibility.

Read the repository's live required check contexts and workflow disposition
before attributing a blocked merge to one red check. An installed App's empty
queued Check Suite does not establish an active producer or a merge requirement;
derive requirements from the branch's effective rules and PR refusal, and
establish producer activity separately. An advisory failure is a
defect to assess independently, not evidence that it prevents merging. A draft
may intentionally run admission alone: skipped jobs then establish neither a
failed ready run nor successful ready verification. Bind the verdict to the
ready pull request's authoritative run and required aggregate.

A provider can accept `neutral` or `skipped` checks while a required review has
incomplete coverage; derive approval requirements from the repository's declared
merge contract as well as its effective rules. When that contract requires a
review, verify the named producer's explicit `success`, complete reported scope
and current head; `completed`, zero findings or a separate approval do not
substitute. Keep advisory reviews advisory.

**Wrong:** "CI passed and the completed review has zero findings, so enqueue."
**Right:** "The review is neutral with unreviewed paths; its required success is
still missing."

Source read 2026-11-07: [GitHub required status checks accept successful, skipped or neutral results](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches#require-status-checks-before-merging).

Automatic merge being enabled records intent. Read the live queue entry to
establish enqueueing, and the pull request's merged state and merge SHA to
establish merging. Failure and queue membership are independent: an
`UNMERGEABLE` entry can remain queued and enter later combined groups. A
removal claim needs a fresh authoritative membership check, not a failed verdict.
Neither a completed-check watch nor a successful enable
request proves either transition. Restore stalled work through [unblock](../unblock/SKILL.md)
without bypassing required checks or repeatedly resubmitting an unchanged refusal.

**Wrong:** "The previous pull request passed at this SHA, so its replacement is
ready to merge." **Right:** "That run passed; the replacement still expects its
required check and has no queue entry."

## Shared status projections

When a dashboard or provider check conflicts with a source event, trace one
source event through its owner, attempt, durable receipt and displayed object.
A shared display name may combine unrelated owners. A missing exact build may
be carried by a successor; prove that relationship before calling intake lost.

Execution success and goal attainment need separate evidence: a safely completed
operation can leave its goal unresolved, while an improving aggregate can conceal
a failed step. When changing execution health, preserve the unmet goal's metric
or alert independently. For an overdue-outcome alert, identify active work and the
last completed work before choosing the age clock; verify an actual firing
instance or an evaluator case against the witnessed failure.

If changing projection identity or omitting irrelevant results, check required
status consumers and test two owners on one source revision, a second attempt
after a terminal failure, and unknown relevance becoming known. An already
published pending object needs a terminal result. A retry updates its attempt;
a new attempt has distinct history. An actual operation can exist even when
its automatic trigger would have been irrelevant.

**Wrong:** "One neutral check proves no environment needed a deployment."
**Right:** "That check belongs to this owner and attempt; inspect the affected
owner's durable outcome before attributing the result."

## Verify effective entrypoint behavior

Before inferring a runtime defect from an omitted argument, read the full callee
and relevant wrappers, including defaults, environment fallbacks and input
transformations. A capture mock proves the call wiring it observes. Replacing a
callee that resolves configuration removes that behavior from the test; the
mock cannot establish which policy the real execution applies.

**Wrong:** “The caller omitted the optional event argument, so the policy is
inactive.” **Right:** “The mock captured an omitted argument; the real callee
may resolve it from the environment. Test the shipped path before concluding.”

Response evidence also depends on request headers and API version: a default
CLI response can differ from the failing caller's negotiated payload. Exercise
that caller's decoder with empty and populated responses, distinguishing valid
empty encodings from malformed envelopes.

Providers can normalize display fields while retaining different immutable or
signed bytes. Bind integrity claims to the contract's authoritative payload,
with a valid display transformation and a meaning-changing mutant as controls;
trimming both sides can conceal the difference the verifier must detect.

**Wrong:** "The CLI returns `items: []`, so the worker sees an empty list."
**Right:** "The worker's `Accept` header yields `items: null`; verify its decoder
on that response while preserving malformed-response refusal."

## Resolve retained payloads before checking fields

Before counting stored events with a missing field, read how the consumer loads
the effective payload. Resolve offloaded bodies, reference records and fallback
precedence the same way. An inline projection or offload marker establishes only
what that representation contains. Distinguish an absent field from an unavailable
body, and validate the query with a known event stored in the same form.

**Wrong:** “The compact event row has no visibility field, so every retained event
lost it.” **Right:** “The consumer loads the referenced body first; count missing
visibility in those resolved bodies and report unresolved references separately.”

Resolve conflicting readings with a fresh subprocess invoking the unmodified
published entrypoint in the relevant real environment. Bind the receipt to the
immutable revision and loaded artifact hash; record the command, relevant
non-secret configuration, exit status and diagnostic output. Run a positive
control and an adversarial negative through that same entrypoint, preserving
the fallback behavior under investigation. A direct callee test or rewritten
local copy does not establish the published entrypoint's behavior.

Keep unexpected success as disconfirming evidence, including when the verifier's
own assertion expected failure. Correct the causal claim and affected decisions
from the actual result; do not turn the verifier's failed expectation into a
runtime failure or change the artifact to force the expected verdict.

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

Read the diff or document at its exact head SHA or version. Judge it against the acceptance cases, supported behavior, data continuity, authority boundaries and relevant tests. A review covering the requested source with no concrete defects is complete; style preferences do not create merge blockers.

For each finding, name the file and line or contract clause, triggering state/input, consequence and severity. A logical counterexample can establish a defect; distinguish it from an untested hypothesis.

Consolidate the first review across the whole change. Later rounds check the fixes and changed code. Report a newly discovered material defect with evidence and explain why it is new; avoid unrelated demands and repeated style rounds.

For agent/runtime claims, use the shared [model/runtime boundary](../challenge/SKILL.md). Measure the affected span before changing the environment. Tool counts alone do not justify limiting reasoning or tool access; explicit user cancellation and authorized resource/spend limits remain effective.

When evidence overturns a claim, correct what was wrong, state the bounded verified fact and source/read time, and credit whoever caught it.

### Pull request review receipts

Unread automated findings can invalidate an independent PASS, and a stricter
error path can break clients that depended on a fallback.

- Before any PASS, list every exact-head automated finding from review check output, annotations and inline comments, marking each real with evidence or rebutted with the exact code that disproves it; unresolved real findings prevent PASS.
- Refresh the live head and its automated output in the same UTC minute you sign; a moved head voids the verdict.
- If that head has no automated review, state that with the UTC read time and label the verdict a source receipt (source review only), not an arming receipt (review supporting merge activation).
- For each fallback or soft-failure path removed or tightened, name who used it and whether they still have a working path; treat comments justifying a fallback as invariants.
