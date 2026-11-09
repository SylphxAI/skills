# Verify model usage and waste reductions

Use this reference when reporting token use, prompt duplication, cache efficiency,
quota-related waste, or model cost per completed outcome. Use
[`challenge`](../../challenge/SKILL.md) to choose a design and
[`deliver-and-verify`](../../deliver-and-verify/SKILL.md) to ship its repair.

❌ Bad: Three identical instruction files mean three billed copies; removing two
will save two-thirds of tokens and subscription cost.

✅ Good: Reconstruct one actual request, count complete instruction copies, then
compare provider usage on the same model and effort before and after the fix.
Report bytes, tokens, cache reads and money as different measurements.

## Temporal query evidence

Historical usage belongs to each sample's recorded identity and units, not today's configuration. Conservation tests in the consuming query engine need a mid-window identity change and an absent-versus-zero control; complementary predicates alone do not prove complementary integrals.

A range API can normalize requested boundaries onto a cached evaluation grid. A fixed-window claim therefore depends on the returned timestamps as well as the request: retain both, and use the supported uncached or exact-boundary mode if normalization changes the accepted interval. Freshness also depends on raw sample times before aggregation; a derived expression can replace them with evaluation times. **Bad:** label a boundary-shifted response with the requested UTC window; **Good:** verify returned endpoints with a non-grid-aligned control and keep any remaining boundary uncertainty explicit.

A lazily created counter may be absent on a healthy idle worker, while increments before its first or after its final successful scrape can be lost. Classifier coverage among recorded increments does not establish capture completeness or shared-provider quota attribution: retain the exporter population, lifecycle gaps and the comparison instrument's reset/freshness semantics separately.

## Establish a counts-only population

1. Define the UTC window, allowed agents/products, runtime/model/effort, agent
   class and source. Apply privacy exclusions before reading per-agent data.
   Keep prompts, message text, arguments, personal identifiers and secrets out of
   reports. Use aggregate product reporting rather than row-level customer data.
2. Prefer append-only provider/runtime usage with response ID and timestamp.
   Deduplicate streaming snapshots by response ID, keeping the final usage. Check
   repeated IDs across rotated/resumed files. A step number may restart every
   turn; it is not a unique inference ID. Do not add native usage records and a
   second fallback counter for the same response.
3. Read each source's counter semantics. Some input fields exclude cache reads
   and cache creation; others include them. Normalize total processed input,
   cache-read input, cache-write input and output once, retaining the source
   fields and model/effort. Cache hit rate is cache-read / total processed input,
   not output or all tokens. State whether output includes reasoning.
4. Separate missing, denied, malformed, undated and zero. Do not invent request
   dates from file modification time or attribute historical usage to an agent's
   current runtime/model. Label a partial population; a roster total does not
   turn unreadable sessions into zero usage.
5. Group daily totals by runtime, actual model and agent class. Define class from
   an explicit roster version. Rank distinct consumers, not ten days belonging
   to one consumer. Align work/activity measurements to the same window or state
   the mismatch. Tool counts describe recorded activity, not completed outcomes
   or proof of waste; streaming tool blocks may themselves be duplicated.

## Prove the waste mechanism

- **Instruction duplication:** reconstruct the transmitted request from its
  system and history records. Count complete exact known document revisions,
  longest non-overlapping match first; track shared guidance, role and runtime
  sections separately. Equal files on disk establish configuration only. No
  match among known revisions does not prove missing instructions. Preserve
  genuinely additional local guidance when consolidating shared instructions.
- **Startup:** define the first useful action before measuring it. Join usage up
  to that action, including retries. The first response, first tool call and
  first completed useful outcome are different milestones; do not rename one.
- **Idle wakes:** correlate the event to executor/turn and provider response IDs.
  A reaction notification or member-joined event is not proof of a billed turn.
- **Cache churn:** compare actual stable-prefix identity and provider cache
  counters. A high cache-hit rate can coexist with unnecessarily large input;
  duplicated cached tokens still consume context and processing.
- **Polling/compaction:** identify the concrete calls and their resulting usage
  before naming a cause. Notification counts of rate limits or service failures
  are not a request census, elapsed wait time or evidence of token causation.

## Verify a saving, not a proxy

Compare the same model and effort, matched useful work and equivalent acceptance
results. Keep the baseline and treatment windows explicit. Include failed
attempts and missing-usage coverage; account for retries, cache state and changed
context size. Report total input per turn **and per completed useful unit**, plus
output, latency and cache read/write. A shorter prompt that causes more turns is
not necessarily cheaper.

Input reduction = 1 − (treatment input / comparable baseline input). Use actual
provider counters, not bytes divided by an assumed token ratio. Keep model swaps,
effort reductions, changed tasks and disabled capabilities out of a waste-only
saving. If the repair belongs to another runtime, file the request evidence at
that boundary and keep the before/after result open until it ships.

For money, join product-scoped usage to verified supplier charges and the same
window's paying users or revenue. Preserve currency and refund treatment. State
whether cost is marginal, allocated or invoice-backed. Subscription book values
are not per-token invoices. Missing revenue or payer counts are NM; measured zero revenue makes cost per
revenue dollar undefined, not zero.

## Publish and recur

Publish source, UTC read time, query/window, coverage and remaining NM fields
with the board. An aggregate gateway total cannot be assigned to an agent without
a verified join key. Validate empty queries with a positive control.

Automate at the owning telemetry boundary using a counts-only timestamped export
and idempotent response IDs. A scheduled cloud worker must be able to read that
export and fail visibly on stale/missing coverage. Do not schedule a successful
empty board over inaccessible local sessions. Preserve immutable daily receipts
so later reruns or changed rosters cannot silently rewrite the baseline.
