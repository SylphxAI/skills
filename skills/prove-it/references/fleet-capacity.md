# Fleet capacity and idle-workload evidence

Read this when verifying a fleet resource census, an idle replica floor, or a
claim that scaling down released capacity. The result is a measured population
and a separate release verdict. A requested savings target is not evidence that
safe candidates exist.

## Keep the units separate

Report these as different quantities:

- **Physical use:** CPU rate and memory working set over a named window.
- **Declared floor:** the owning controller's idle minimum.
- **Requests:** the admitted Pod resource envelope, including applicable init
  containers, restartable sidecars and runtime overhead.
- **Demand:** business operations or requests distinguished from probes,
  internal calls, retries and transport activity.
- **Released requests:** an authoritative before/after difference after the
  owning source change is deployed. It is not cash saved or a server retired.

Low physical use does not prove a data store is unused, a replica is redundant,
or a retained request envelope is safe to cut. Hardware sizing also needs
headroom, failure domains, demand and service-level objectives; use the
[architecture capacity method](../../challenge/references/architecture.md#shared-capacity-pool).

## Build the census before ranking candidates

1. Read the complete requested population, including system namespaces,
   zero-replica objects and dormant service parents. State which kinds and cells
   are outside it. Keep exact keys, UIDs, source revisions and UTC read times.
2. Separate parent rollups from countable descendants. Join Pod → ReplicaSet →
   Deployment and generated child → owning resource. Validate controller UIDs
   where available. Labels can cover only one role: labelled sentinels do not
   establish coverage of unlabelled primaries and replicas. Reconcile label
   matches with candidates from authoritative binding namespaces and owner
   relations, deduplicating by UID; namespace membership discovers a candidate
   but does not prove ownership in a shared namespace. A name-based historical
   family association is weaker than a UID or time-correct ownership join;
   label it.
3. Resolve the controller that owns the idle floor. Desired replicas can include
   demand. An HPA minimum of one can coexist with an owning event autoscaler's
   idle minimum of zero. A running generated revision is not an additional
   always-on service. Inspect parent and child minima rather than labels alone.
4. Compute requests from assigned, nonterminal Pods, not desired replicas times
   templates. Verify allocated/actuated requests when in-place resizing applies.
   Label a Pod-spec reconstruction instead of claiming exact scheduler-cache
   reservations. Read the primary resource-accounting contract for the relevant
   cluster version; record unsupported Pod-level resource fields explicitly.
5. Join each retained floor to its exact source identity and current binding.
   A static registry gap may be an operator-created child with an owning source
   decision. Record the reason, source and removal condition, or explicit
   unknown. A recorded reason does not prove its necessity remains measured.
6. Keep data stores, live consumers, customer-managed resources and another
   writer's active change visible in the population, with their change boundary
   stated. Do not turn their exclusion into an unexplained missing row.

## Measure without manufacturing zeroes

Choose one authoritative scrape path per cell. Verify named application
containers are present: a container metric can expose host/runtime containers
while omitting a sandboxed application's containers. Deduplicate redundant
scrapes before summing; never add two scrape paths for the same physical use.
Before choosing a path, reconcile it with the node's own CPU total: a node's
containers cannot use more than the node did. A path that exceeds it (a
sandboxed guest's own accounting can run several times past the host) is wrong,
so taking the maximum across paths picks the wrong one too.

For VM or sandbox placement, measure the host Pod/cgroup memory footprint as
well as the guest application's working set: guest cache retained by the VM and
runtime overhead can keep host use high after application use falls. Compare
host and guest observations over the same population and window before reducing
host reservations; a guest-only percentile does not establish host headroom.
Verify that runtime processes and guest backing pages belong to the measured
host cgroups, since a Pod label does not prove whole-VM accounting.

Sum simultaneous Pod/container samples into each workload before taking p95.
The sum of individual p95 values is not the p95 of their sum. Retain the query,
CPU rate interval, sample step, first/last timestamps, sample counts, query
warnings and partial-response status. A sampled working set is not a peak or a
memory limit. A reclaim-node scope can omit the busiest primary or an older,
heavier revision; derive a per-instance safety bound from every serving role
and retained revision on every node, including outside the reclaim scope.
Missing series remain null. An observed-sample p95 with incomplete
coverage is not a fully observed seven-day p95, and cannot establish idle time.

Validate traffic instruments with a known positive control in the same scope.
Keep gateway counters, retained access records and verified business use in
separate fields. Current route associations do not prove historical routing;
missing HTTP routes do not rule out direct, internal, TCP/UDP or session traffic.
Counters that include probes or retries cannot establish zero user demand.
Extrema and sample counts alone do not establish uninterrupted ingestion.

## Challenge and verify the release

❌ **Bad:** “No direct registry row, HPA minimum one and low CPU: stop this
Deployment and count its template requests as savings.”

✅ **Good:** “The generated Deployment belongs to an activation controller with
an exact availability decision. Its desired five replicas include demand; its
idle floor is two. No safe release has been established.”

Rank only candidates whose request arithmetic, owning source, inactivity and
continuity path are established. Disprove the leading false-positive explanation
before a write. Compare the declaration at the live Release commit, managed
desired state and the served resource envelope; a capacity edit is durable only
when its owning source preserves it through the next reconcile. Pending
operations may still carry older frozen inputs, so the newest declaration alone
does not establish what runs next. Use the owning supported source and rollout
path; read the resulting controller, Pod assignment and affected consumer back. Report a failed
release target plainly when no eligible candidate remains. Preserve unknowns
and failed query receipts so the next measurement can change the decision.
