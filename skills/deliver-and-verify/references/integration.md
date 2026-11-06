# Provider integration

Trigger: calling an outside service, changing queued dispatch or receipt
parsing, or receiving provider webhooks.

Build the integration to survive a slow/unavailable provider and repeated or missed delivery without granting more access than the feature needs.

- Keep secrets in an authorized store and out of source/logs, following [security.md](security.md#hard-lines). Actual gateway, connection and credential-routing choices belong with the owning product.
- Follow [outbound-call discipline](code.md#outbound-calls): effective deadlines, a provider-supported idempotency key for a retryable create/charge, safe bounded backoff and short lock lifetimes. Identify and inspect an unknown in-flight result before creating another operation. An accepted write can precede its read projection: reconcile the intended and observed versions with bounded, read-only retries rather than replaying the mutation or treating one stale read as a conflict. On timeout or persistent conflict, preserve the successful write receipt and both versions in the reported outcome; tests distinguish delayed convergence from real conflict without increasing the mutation count.
- A one-time credential response needs an execution lifetime long enough for its authorized probe: keep the value in-process, without logging it, across bounded admission reconciliation and corrected read requests rather than rotating merely to reacquire the bytes after a helper exits. Honor the admission contract's retry guidance and attach required request metadata to reads too; a transient admission refusal or malformed probe does not establish a bad credential. Test delayed admission followed by a successful read with the same credential and no additional credential-creation write; unknown writes still follow the reconciliation rule above.
- Return a typed missing-permission state with a safe explanation, recovery route and correlation ID when supplied; a resource-scoped optional denial must preserve independently granted work and leave the aggregate outcome independent of resource ordering. A denied optional accelerator can warn and use an already-authorized ordinary path; required admission and explicitly requested protected operations still fail closed. Test mixed granted/denied resources in different orders with ordinary-path fallback blocked where it could mask lost authorization, alongside required-operation refusals; neither blanket failure nor blanket recovery preserves these boundaries.
- Verify webhook authenticity using the provider's contract. Deduplicate by its stable delivery/event identity, persist accepted work before processing and acknowledge within the provider's required window.
- For outcomes needing recovery from dropped delivery, use the provider's supported reconciliation, replay or authoritative API and choose the schedule from the workload/cost. Verify that a missed event is recovered rather than assuming the webhook is the only truth.
- Expensive mutable observations need both freshness and shared-provider cost evidence: a short negative TTL can exhaust a quota, while retaining a negative answer can hide completion. Compare `concurrent pending keys × refreshes/hour × reads/refresh` with the shared budget over the same window, including other callers, and evaluate completion invalidation with a bounded lost-event backstop. Verify duplicate events, in-flight reads and retained caches across ownership changes, so invalidation remains effective without multiplying provider work.
- Request permissions when the feature needs them and keep vendor-specific workarounds at the integration boundary with a removal condition.

Verify replay, duplication, dropped delivery and timeout behavior for the affected contract. The resulting data stays correct and secrets do not appear in output.

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

Enabling a shared dependency feature can change defaults for every consumer,
including clients whose builders did not change. Verify the effective feature
set and each client's response policy through its own entry point; make behavior
explicit where policies differ. **Wrong:** prove automatic decoding on one
downloader and infer that a strict proxy still sees the original encoding
headers; **Right:** pair that success with encoded-response rejection through
the strict proxy after the dependency resolves its full feature set.

## HTTP test doubles and routing

Before replacing a remote dependency with a fake, read its declared endpoints,
request shape and error envelope; preserve the boundaries relevant to the change,
including [browser-added credentials and referrer metadata](https://fetch.spec.whatwg.org/#requests)
for browser privacy claims. A clean payload observed by a transport mock cannot
establish whole-request privacy: verify headers and ambient identity on an actual
browser request, with a positive control showing the fixture observes them when
protection is absent.

When management and data traffic use different origins, run distinct fake
listeners and reject a request sent to the wrong one. One permissive listener
can make a wrong production destination pass every test.

Exercise negative cases through the same public entry point that makes the
production decision. Return the provider's real error shape so decoding reaches
the intended branch. Pair a refusal with a permitted request and assert an
observable downstream call or side effect. Also assert that a refused request
makes none. This positive control distinguishes a working guard from a fixture
that rejects every request before reaching it. Zero downstream I/O does not
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

## Final streamed output

Buffered-event tests miss failures introduced during final encoding; verify the
recipient's status, headers and bytes in each supported encoding at the protocol's
irreversible commit boundary. A complete-document contract commits success only
after bounded receipt, transformation and validation through EOF; a protocol with
defined partial results can stream earlier, preserving committed status/headers
and using its safe typed error for later failure. Probe commitment itself—a test
helper that collects the body before returning can hide headers already sent—and
preserve semantic content exactly once across chunk partitions and redundant
provider fields.

**Bad:** append an error to interrupted JSON after sending `200`, or infer the
wire contract from an intermediate buffer. **Good:** hold an upstream document
mid-body and verify response headers remain pending, then release or interrupt
it; separately verify a partial-result protocol's final encoded error, retry
advice and absence of private diagnostic sentinels after content has arrived.

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

Admission proves that work can be queued under the configuration at that
moment. A later worker must resolve a compatible provider for that exact
intent before reserving new spend or recording that submission has started.
An empty candidate list produces a recoverable configuration-unavailable
outcome with no provider I/O. Preserve the unsent payload and its identity so
configuration restoration can resume the original work within its expiry and
cancellation rules. A submission with an unknown result still needs
reconciliation; configuration changes do not make repeating it safe.

- **Bad:** a queued shipping-label job loses its compatible carrier and falls
  through to an unconditional call to another configured carrier.
- **Good:** the worker makes no carrier call, keeps the job pending, then
  submits the original job after a compatible route returns.

Read response cardinality from the provider contract. A logical operation can
return one aggregate receipt or multiple part receipts. Preserve each part's
status, stable ID and billed amount. Report full success only when all required
parts succeed; retain partial acceptance and account for accepted parts once.
Retry only parts that the provider contract proves were not accepted, using
its supported idempotency and recovery semantics.

When a workflow can finish with partial knowledge, distinguish transport
availability, domain completion and validated partial results through aggregation
and final publication: an exhausted work bound is not a provider outage, and a
successful HTTP response is not proof of complete work. Preserve earlier
validated results unless later domain evidence revises them; derive the
published outcome from the operation's contract rather than treating all
unfinished work as either success or provider failure. Contrast an
available-but-incomplete response with a true outage at the public entry point,
both with partial results present.

Verify a queued intent after eligible configuration is removed, both with and
without an existing spend reservation: no provider call, new reservation,
submission marker or accepted-usage event; payload and identity preserved.
Restore configuration and verify that the same intent submits once. For a
multipart response, exercise all-success, middle-part rejection and single-part
cases, including persisted receipts and accounting after another worker pass.
These deferral rules apply before submission; provider acceptance or an unknown
result requires the reconciliation path above.
