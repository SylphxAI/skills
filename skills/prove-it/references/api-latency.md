# API latency evidence

Read this when ranking API routes from access logs, attributing a slow request,
or verifying a before/after tail-latency claim. Use the
[performance standard](../../deliver-and-verify/references/performance.md) to set
journey budgets; this reference establishes what the measurement proves.

❌ **Bad:** “Group ingress rows by request ID, take the maximum duration, drop
errors and bot-looking traffic, then call the lower P99 a user-latency fix.”

✅ **Good:** “Validate the installed parser and one observation boundary, retain
timed failures, freeze the cohort and query, then compare complete windows with
coverage and workload controls. Call the unit access records until a logical-call
join is proved.”

## Prove the population before ranking

1. Save the executable query, UTC read time, requested start/end, instrument,
   installed log format/configuration and relevant source revisions. Verify
   duration units and timer boundaries. Ingress, application and browser elapsed
   times measure different spans.
2. Test the parser against the installed format, including failed/no-upstream
   records. Count candidate, parsed, missing-field and rejected records before
   filtering; a parser that matches only successes can manufacture a good tail.
   Group by authority, HTTP method and canonical route. Strip query strings and
   normalize resource IDs before exporting. Prefer registered route templates;
   check heuristic normalization against actual routes and unknown shapes.
3. Prove logging coverage across the requested window and scope. Retain first/
   last timestamps, counts by time interval, ingestion gaps and positive controls
   using the same instrument/query shape. Extrema alone do not prove continuity.
   Report the observed window and gaps separately from the requested window.
4. Retrieve every eligible group: follow pagination or partition the query and
   reconcile totals. A result at an output cap is not a census. Independently
   count the selected population before route aggregation and reconcile it to
   the grouped total; retain parser, exclusion and duplication counts as well.
   Keep warnings, partial responses and failed attempts; a timeout is not zero.
5. Declare client/workload exclusions before inspecting ranks. A browser-shaped
   user agent is not proof of a human; ordinary browser automation can remain.
   Keep explicit bot/probe exclusions fixed and show a broader sensitivity cohort
   when classification affects the decision. Do not relabel it a human census.

Aggregate and normalize at the source. Export only the fields needed for the
claim; keep raw access rows, request IDs, client addresses, credentials and
customer content out of reports. Check returned route labels for identifiers:
passing today's pattern checks does not guarantee future shapes are safe.

## Choose one observation boundary

Exact duplicate log records and multiple proxy hops are separate mechanisms.
First establish whether identical records are duplicated ingestion, preserving
fields that distinguish real events; remove only verified ingestion duplicates.
Then map authority, upstream address/port,
listener and service/revision to the live topology. A hairpin can traverse the
same proxy twice and produce two valid records for one attempt.

Select a stable, route-independent edge, not whichever hop has the longest
latency. Retain failed/no-upstream records at that edge. Save the complete
upstream-group census, excluded groups and raw-to-selected counts. Check known
traversals where available; unequal hop counts or missing historical topology
leave pairing/coverage uncertain. Current topology and even equal aggregate
counts do not establish historical one-to-one completeness.

A request ID can be reused across calls or attempts. `MAX(duration)` per ID is
not a logical-call census without a proven identity and retry model. Label the
result **distinct selected-edge access records**, not users, calls or actions,
unless a validated join establishes that stronger unit. Retain the same boundary
for follow-up and recheck topology before comparing.

## Keep failures and uncertain tails visible

- Compute P50/P95/P99 over the declared eligible duration population, retaining
  timed failures, cancellations and status-zero/no-response records. Report
  HTTP error and no-response counts alongside it. Missing durations remain
  unknown, never zero. A success-only view is supplementary. Do not average
  per-status, per-Pod or hourly percentiles into a population percentile.
- Declare the ranking rule and its objective before selecting winners. Keep low-
  count routes visible with their counts and uncertainty; do not invent a
  minimum-count cutoff to remove an inconvenient leader. Sparse upper-tail
  observations can leave P99 uncertain even when the query is complete.
- Separate finite-response latency from streaming or intentional wait lifetime
  only after reading the serving route implementation and timer boundary. A
  long duration or suggestive path name does not prove server-sent events (SSE)
  or long polling. Retain excluded groups/counts and measure their appropriate
  contract separately, such as time to first event or poll completion.

## Attribute one concrete slow request

Read the event, serving code and time-correct configuration. Separate edge,
application, authentication, dependency and database spans. Correlation by route
and nearby time alone does not prove that a database event belongs to that
request; verify the join privately without exporting identifying rows.

For a database client, inspect the installed timer implementation
before interpreting elapsed time. Preparation, waiting, network transfer and row
streaming may fall inside the client span. Client elapsed is not proof of server
executor time, a lock wait or a particular blocker. Establish those claims with
a linked server-side observation or keep them hypotheses.

Instrument only the missing discriminating phases. Label shared-pool lookup or
resolution separately from acquiring a connection; a handle-resolution timer
cannot establish acquisition wait. State start/stop points, nesting/overlap,
success/failure and what remains outside the spans. Keep phase names fixed and
record durations/outcomes without secrets, response bodies or error contents.
Test the competing explanation most likely to change the action.

## Verify improvement at the same boundary

Freeze the baseline query, normalization, deduplication, edge, cohort, exclusions,
status policy and percentile method. Correct a broken baseline openly and rerun
both sides with the corrected method rather than silently changing the target.

For a daily-cycle acceptance check, begin a full 24-hour follow-up after verifying
the intended SHA is serving the selected traffic. Retain rollout completion and
window receipts. Run early diagnostics separately; they do not replace that
window. Revalidate parser, topology, coverage and population-count controls. A changed
boundary requires a comparable remeasurement, not an unqualified subtraction.

Compare the same workload and client/hour mixture, or use the fixed-mixture
method below; disclose uncontrolled confounding and changed sample counts.
Separate organic traffic from authorized synthetic fixtures. Finish fixtures
before starting the acceptance window when they cannot be reliably excluded at
the selected boundary. A revision's creation time and source ancestry do not
prove when it began serving all selected traffic. With no eligible demand,
validate logging with a positive control and report **no eligible demand**, not a
latency pass. Missing logs remain a coverage failure, not zero demand. Synthetic
probes can establish functionality and measured phase costs, not an organic tail.

### Compare a fixed workload mixture

Freeze the strata, reference weights and counts before inspecting follow-up
results. Retain the baseline aggregates needed for the comparison before logs
expire: total and per-stratum counts, status policy, query bytes and window.
A later query over the same dates can contain fewer records as retention moves;
use it as a diagnostic, never a silent replacement for the frozen population.
If original stratum weights were not retained, name that evidence gap.

Weight distributions, not percentiles. For stratum `s`, let `w_s` be its frozen
reference share and `F_s(t)` the follow-up empirical cumulative distribution
function (CDF). The standardized CDF is `F_mix(t) = sum_s w_s * F_s(t)`;
obtain its percentile from that CDF, never `sum_s w_s * P95_s`. For a fixed
latency threshold `t`, aggregate counts above it in each stratum and compute
`E_mix(t) = sum_s w_s * (above_s(t) / n_s)`. This needs only safe aggregates,
not exported request-level rows. Match the threshold inequality and quantile
convention to the declared target.

Retain unknown strata. When a positive-weight reference stratum has no follow-up
observations, its distribution is unknown, not zero latency or zero exceedances.
Report unsupported reference weight; any common-support renormalization is a
separate diagnostic with the retained reference weights and their sum disclosed. For example, a stratum
with reference weight `0.6` and `3/20` follow-up records above the target alone
contributes `0.09` to the plug-in exceedance estimate. It does not support an
empirical fixed-mixture P95 pass even if the unadjusted P95 fell. Sparse stratum
samples and estimated weights remain uncertain: a plug-in estimate is neither a
population confidence bound nor proof of a causal regression or unavoidable floor.

Read representative plans and run production-shaped benchmarks to test a query
hypothesis. Record cardinality, history, cache, concurrency and client plan mode
where relevant. A faster rejected rewrite, a tiny fixture, added instrumentation,
or an unchanged synthetic probe does not establish a production fix or measured
latency floor. Preserve authorization, freshness, cache correctness and money-
path invariants under the [delivery contract](../../deliver-and-verify/SKILL.md).
Report the measured result and remaining uncertainty, including a failed target.
