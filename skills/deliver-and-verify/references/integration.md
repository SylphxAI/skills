# Provider integration

Trigger: calling an outside service, changing queued dispatch or receipt
parsing, or receiving provider webhooks.

Build the integration to survive a slow/unavailable provider and repeated or missed delivery without granting more access than the feature needs.

- Keep secrets in an authorized store and out of source/logs, following [security.md](security.md#hard-lines). Actual gateway, connection and credential-routing choices belong with the owning product.
- Follow [outbound-call discipline](code.md#outbound-calls): effective deadlines, a provider-supported idempotency key for a retryable create/charge, safe bounded backoff and short lock lifetimes. A provider-refusal retry requires affirmative evidence from bounded input matching the provider's error contract, not a negated or lookalike message. Determine which limit caused the refusal before combining waits: unrelated window metadata must not extend its cooldown. Every applicable required wait barrier must be valid and elapsed; one valid retry hint cannot replace a missing mandatory reset, and the latest applicable deadline governs. Preserve the typed refusal cause separately from any uncertain operation effect; reconcile an unknown duplicate-sensitive result before creating another operation. Recovery reads must survive the same client's failure controls: a shared circuit breaker can reject reconciliation locally after a write committed but its acknowledgement was lost. Verify through the production adapter that bounded recovery reaches an authoritative read and compares the intended state without another mutation; use supported recovery within the enclosing deadline, not a breaker bypass. An accepted write can precede its read projection: reconcile the intended and observed versions with bounded, read-only retries rather than replaying the mutation or treating one stale read as a conflict. On timeout or persistent conflict, preserve the successful write receipt and both versions in the reported outcome; tests distinguish delayed convergence from real conflict without increasing the mutation count.
- Unknown effects need reconciliation before replay when duplicates can harm data, money, entitlements or recipients; a permanent one-time marker is not a universal recovery rule. A documented duplicate-safe refresh can retry after the prior request terminates, bounded by provider limits and remaining output validity, preserving the unexpired output and using idempotency only where supported; prove one transient loss recovers before expiry. **Bad:** wait a full output lifetime to avoid an unused duplicate and cause an outage; **Good:** retry a replaceable refresh within its validity budget, while still reconciling an uncertain payment before another charge.
- A one-time credential response needs an execution lifetime long enough for its authorized probe: keep the value in-process, without logging it, across bounded admission reconciliation and corrected read requests rather than rotating merely to reacquire the bytes after a helper exits. Honor the admission contract's retry guidance and attach required request metadata to reads too; a transient admission refusal or malformed probe does not establish a bad credential. Test delayed admission followed by a successful read with the same credential and no additional credential-creation write; unknown writes still follow the duplicate-safety contract above.
- Return a typed missing-permission state with a safe explanation, recovery route and correlation ID when supplied; a resource-scoped optional denial must preserve independently granted work and leave the aggregate outcome independent of resource ordering. A denied optional accelerator can warn and use an already-authorized ordinary path; required admission and explicitly requested protected operations still fail closed. Test mixed granted/denied resources in different orders with ordinary-path fallback blocked where it could mask lost authorization, alongside required-operation refusals; neither blanket failure nor blanket recovery preserves these boundaries.
- Verify webhook authenticity using the provider's contract. Deduplicate by its stable delivery/event identity, persist accepted work before processing and acknowledge within the provider's required window.
- For outcomes needing recovery from dropped delivery, use the provider's supported reconciliation, replay or authoritative API and choose the schedule from the workload/cost. Verify that a missed event is recovered rather than assuming the webhook is the only truth.
- A shared provider quota follows its credential identity across HTTP methods, transports and callers; gating only reads or one adapter leaves other spend outside the reserve. A reserve sized for one account's quota can starve a smaller account, so qualify floors against each supported account limit and retain ordinary-work progress alongside priority protection. Priority floors need reset-aware observations and separate local-deferral, wire-response and uncharged-revalidation counters: a conditional request still needs admission because changed data can return a charged response. Verify the lower-priority stop and higher-priority continuation through actual request entry points at the boundary, alongside provider refusals, reset recovery and credential-isolated revalidation.
- Expensive mutable observations need both freshness and shared-provider cost evidence: an event-watch API implemented as per-watch REST GETs still polls, and a short negative TTL can exhaust a quota while retained negatives hide completion. Prefer batched queries or webhooks with a bounded lost-event backstop; conditional reads need retained ETags and cached bodies so actual revalidation occurs, not merely an `If-None-Match` option. Compare `concurrent pending keys × refreshes/hour × reads/refresh` with the shared budget over the same window, including other callers. Verify completion invalidation, duplicate events, in-flight reads and retained caches across ownership changes without multiplying provider work.
- Request permissions when the feature needs them and keep vendor-specific workarounds at the integration boundary with a removal condition.

A circuit breaker counts distinct attempted operations, not repeated reconciliation of one uncertain attempt, and its refusal scope follows the evidence: a stale per-request observation cannot deny an otherwise authorized shared destination. Test repeated reconciliation counting once and unrelated authorized work continuing, alongside a genuine shared-dependency failure.

## Regional store prices

Matching local catalogues or one home-market tier proves internal consistency,
not equality with a store's territorial prices; the authoritative price key
includes store, SKU, territory and currency, and a partial regional export leaves
unobserved regions unknown. **Wrong:** normalize shared-currency countries to
one price, or borrow another product's same-SKU price after a known territory
contradicts that source. **Right:** bind each write to the correct product/source
row and exact territorial observation, distinguish an explicitly authorized cache
mirror from a store-price repair, and verify that the serving path actually
selects the changed rows.

## Destructive and conditional writes

A Kubernetes DELETE carrying a `DeleteOptions` body ignores the `dryRun`
query parameter: the [API handler](https://github.com/kubernetes/kubernetes/blob/v1.36.4/staging/src/k8s.io/apiserver/pkg/endpoints/handlers/delete.go#L95)
decodes query options only when the body is empty (source read 2026-11-06).
Put `dryRun: ["All"]` in that body with UID/resourceVersion preconditions,
and prove the same identity and version remain with a GET before and after.
**Bad:** treat a successful query-only dry-run as proof of no deletion;
**Good:** verify the exact object still exists after the body-based dry-run.

Verify replay, duplication, dropped delivery and timeout behavior at the affected
contract boundary, including non-empty binary writes when signing or streaming
uses a different path from reads. A successful read does not prove write
compatibility, and sending a precondition does not prove the provider enforces
it: an existing-resource case needs the observed rejection or unchanged version
that establishes the claimed guarantee. **Bad:** infer create-only uploads from
a signed GET and a conditional header; **Good:** verify the uploaded bytes and
repeat against an existing key, distinguishing no-write behavior from a retained
new version. The resulting data stays correct and secrets do not appear in output.

Before/after completeness comparisons use the same endpoint, request scope and
stable key; matching counts can hide one missing object replaced by another.
Cross-endpoint enrichment needs an explicit shared key: array order and similar
names do not establish identity, and unresolved joins remain incomplete.
**Bad:** pair two catalog arrays by position; **Good:** compare each endpoint's
stable-key set and enrich only through an authoritative key join.

Independent outputs from the same source can contain different bytes when
packaging, signing or provenance differs; a successful export therefore does
not establish the published object's digest or size. Bind published metadata
to the exact publication receipt and authoritative remote object, unless the
contract explicitly guarantees byte identity. **Bad:** register a published
package using a parallel archive's descriptor; **Good:** resolve the descriptor
for the returned published digest and reject a different digest.

## Shared dependency features and client policy

A server status or error envelope is also an instruction to deployed callers: a
more precise classification can turn their retry or optional fallback into a
terminal failure. Before changing a status code or error class, inventory deployed
caller versions and trace every status-to-behavior mapping through its real
classifier, including fallback, retry, abort, genuine denial and required-operation
controls; a future client update cannot establish compatibility for clients
already in the field. **Wrong:** test only the new server response; **Right:** prove the
response still selects the intended behavior in deployed client versions.

Enabling a shared dependency feature can change defaults for every consumer,
including clients whose builders did not change. Verify the effective feature
set and each client's response policy through its own entry point; make behavior
explicit where policies differ. **Wrong:** prove automatic decoding on one
downloader and infer that a strict proxy still sees the original encoding
headers; **Right:** pair that success with encoded-response rejection through
the strict proxy after the dependency resolves its full feature set.

## HTTP test doubles and routing

A direct HTTP fake can skip a CLI or proxy's persistent cache: after a process
restart, that adapter may inject its own validator and restore cached bytes under
304 headers even though the caller has no matching page or pagination metadata.
Verify conditional reads through the installed adapter with independent caller
and adapter cache lifetimes, preserving one authority for the body, validator
and continuation metadata. **Bad:** infer cold-start recovery from warm direct-HTTP
tests; **Good:** retain the adapter cache, restart the caller, and prove complete
revalidation and later updates without weakening authentication or quota admission.

Before replacing a remote dependency with a fake, read its endpoints, media
types, credential scope and error envelope. A fake above request construction
can hide an invalid default route even when populated resource routes pass:
exercise empty/default and explicit selectors through the real adapter, with
exact-route fixtures that reject undeclared requests. Verify prepared requests
and redirects per origin, including accepted media types and credential removal
outside the authorized origin; use an authorized read-only live control when
the fake cannot establish provider acceptance. **Bad:** infer compatibility from
a mocked client method returning JSON; **Good:** the fixture rejects the wrong
route, media type and cross-origin credentials, and a real metadata read
confirms the permitted request.

For browser privacy claims, include [browser-added credentials and referrer metadata](https://fetch.spec.whatwg.org/#requests).
A clean payload observed by a transport mock cannot establish whole-request
privacy: verify headers and ambient identity on an actual browser request, with
a positive control showing the fixture observes them when protection is absent.

When management and data traffic use different origins, run distinct fake
listeners and reject a request sent to the wrong one. One permissive listener
can make a wrong production destination pass every test.

An application fake can also intercept requests from the test controller;
a successful fake response does not prove delivery to the target. Verify
controller delivery independently of application fakes and seed suspected
leaked state inside an isolated regression, keeping the product assertions intact.

**Bad:** treat the driver's HTTP 200 as delivered input and revert runtime code.
**Good:** identify which transport received the command and reproduce the
contamination in one test before changing product behavior.

Provider event collections can mix variants with different required fields:
discriminate relevant variants before reading their identity or validating
variant-specific fields. Exercise the production parser with a real heterogeneous
response fixture containing irrelevant variants that legitimately omit those
fields, plus a malformed relevant variant that must be rejected rather than
silently skipped.

Exercise negative cases through the same public entry point that makes the
production decision. Return the provider's real error shape so decoding reaches
the intended branch. Pair a refusal with a permitted request and assert an
observable downstream call or side effect. Also assert that a refused request
makes none. This positive control distinguishes a working guard from a fixture
that rejects every request before reaching it. A scrubbed native body does not
establish that an alternate public proxy filters internal diagnostic headers:
for diagnostic changes, verify status, headers and body through every supported
public response path on success and failure, preserving internal diagnostic
consumers and ordinary public headers. Zero downstream I/O does not
prove a refusal is effect-free when an earlier step reserved capacity: a seeded
reservation ID or disabled allocator skips the ownership transition under test.
For a conservation claim, exercise the actual reservation client against a
boundary double and verify that the original capacity is usable after a
proven-unsent terminal refusal; submitted or uncertain work must retain its
reservation.

**Bad:** one fake host accepts all paths, and a malformed missing-resource
response makes an unrelated decoder error satisfy the expected refusal.
**Good:** separate management and object listeners enforce their routes; a
valid missing-resource response exercises the refusal, while a valid existing
resource reaches the recorded downstream operation.

Keep these checks scoped to the boundaries the change crosses. A local text
formatter needs no HTTP topology fixture. Treat a missing positive control or
wrong error envelope as a fixture defect; retain the production behavior being
verified.

Replaying exact authenticated response bytes with provenance through the real discovery,
classifier and state-changing entry points establishes replay behavior—not live intake.
A reconstructed envelope or an alternate registration path can miss the source's actual
request, dispatch and completion semantics. **Bad:** call a replay or alternate-path
probe end-to-end intake; **Good:** report replay results separately and bind any
live-intake claim to a receipt from the actual source path.

## Final streamed output

Buffered-event tests miss failures introduced during final encoding; verify the
recipient's status, headers and bytes in each supported encoding at its actual
acceptance boundary. A protocol that cannot signal failure after headers defers
success until bounded receipt,
transformation and validation through EOF; a streamed download can send headers
and **unverified prefixes** earlier only when late validation failure prevents a
successfully completed transfer and the consumer rejects incomplete or
digest-mismatched bytes before use. Delayed cache publication does not make those
prefixes verified, while a protocol with defined partial results retains its safe
typed error for later failure. Probe commitment through a real connection—a helper
that collects the body first can hide headers already sent—and preserve semantic
content exactly once across chunk partitions and redundant provider fields.

**Bad:** append an error to interrupted JSON after sending `200`, or call streamed
prefixes verified because nothing entered the cache. **Good:** verify a JSON
protocol's headers remain pending until validation; for a download, force a late
checksum mismatch after headers and assert the real receiver fails the transfer
with no cache entry, alongside a complete matching-download control; for partial
results, verify the final encoded error, retry advice and absence of private
diagnostic sentinels.

Category-wise equality can hide reordered content: equivalence preserves order,
multiplicity and boundaries wherever the source protocol defines them, while
unordered sibling fields follow their own contract rather than a fictitious
global order. Feed both transformed results through the next real consuming
decoder or compiler, retaining opaque state needed for continuation. An
independent negative control changes a contract-defined order while preserving
the old category buckets, so a lossy comparator cannot certify itself.

**Bad:** compare text, reasoning and tool buckets and accept a reordered native
content array. **Good:** compare decoded ordered content to reject that reorder,
while accepting a contract-equivalent permutation of unordered sibling fields.

## Queued work and partial acceptance

An idle worker can be backpressured while durable work remains queued. Recovery
that requires a drained queue needs authoritative emptiness, including deferred
and non-waking entries; a failed read does not establish emptiness. **Bad:** replay
interrupted work because a dispatch pass accepted nothing; **Good:** hold replay
behind deferred real work, verify its identity and order after acceptance resumes,
and retain an empty-queue control that proves legitimate recovery still runs.

Admission proves that work can be queued under the configuration at that
moment. A later worker must resolve a compatible provider for that exact
intent before reserving new spend or recording that submission has started.
An operational pause is complete only when independent initial and recovery
producers and retained queued consumers all observe the effective parsed
configuration, verified through each outer production entrypoint before any
admission or resource acquisition the pause promises to avoid, while enabled
unrelated work remains unchanged. Whether paused work drains or defers follows
an explicit data-retention and acknowledgement contract: retain the original
payload and identity for deferred work, and do not discard queued work merely
because execution is paused.
An empty candidate list produces a recoverable configuration-unavailable
outcome with no provider I/O. Preserve the unsent payload and its identity so
configuration restoration can resume the original work within its expiry and
cancellation rules. A submission with an unknown result still needs
reconciliation; configuration changes do not make repeating it safe.

Before a recovered queued obligation creates a new external effect, resolve its immutable retained policy revision and entry rather than today's selector, then recheck eligibility from the original cutoff against fresh authoritative inventory; contrary evidence terminally reconciles it without issuance. Already committed or unknown effects instead require read-only reconciliation first: later observations alone never authorize cancellation or reissuance.

- **Bad:** gate only the inner dispatch turn, then let a recovery producer or
  queued consumer reach admission and reserve capacity while the dependency is
  unavailable.
- **Good:** exercise queued work with the dependency unavailable through the
  outer production entrypoints; paused producers and consumers perform no
  execution or resource acquisition, enabled unrelated work still runs, and
  restoring configuration submits the retained intent once.

Read response cardinality from the provider contract. A logical operation can
return one aggregate receipt or multiple part receipts. Preserve each part's
status, stable ID and billed amount. Report full success only when all required
parts succeed; retain partial acceptance and account for accepted parts once.
Retry only parts that the provider contract proves were not accepted, using
its supported idempotency and recovery semantics.

Bind generated assessments to the exact request and scope; authoritative request
context owns normalized identity, while mismatched model echoes may prompt
bounded resubmission but must never be silently rewritten to certify unchecked
or stale content. Persistent malformed assessments and exhausted work bounds are
distinct from genuine transport or capacity outages; neither HTTP success nor
workflow completion proves a valid, complete assessment. Preserve earlier
validated results unless later domain evidence revises them; derive the
published outcome from the operation's contract rather than treating all
unfinished work as either success or provider failure. Contrast an
available-but-incomplete response with a true outage at the public entry point,
both with partial results present.

Verify a queued intent after eligible configuration is removed, both with and
without an existing spend reservation, through each outer production entrypoint:
no downstream admission, provider call, new reservation, submission marker or
accepted-usage event; payload and identity are preserved while enabled unrelated
work continues.
Restore configuration and verify that the same intent submits once. For a
multipart response, exercise all-success, middle-part rejection and single-part
cases, including persisted receipts and accounting after another worker pass.
These deferral rules apply before submission; provider acceptance or an unknown
result requires the reconciliation path above.

A stopped worker process can leave a provider job or its steps active, so expected
refusal needs the exact attempt's terminal job and step records, expected outcome
classification and a bounded check that recovery did not create another attempt. Where a
capability is deliberately unavailable, distinguish native initialization refusal before
user work from a later action failure that may still run cleanup; a kill signal or exit
code does not establish either contract. **Bad:** declare refusal after the worker
exits; **Good:** verify provider completion, every step's terminal state and the
intended no-user-work or permitted-cleanup boundary.
