# Coordination protocols

Choose the lightest protocol that matches work coupling and allocation
uncertainty. These are portable patterns, not requirements to add a central
service.

## Shared blackboard

Use a queryable shared state when agents contribute partial facts or hypotheses
whose value depends on later contributions. Entries need provenance,
supersession, and conflict semantics. The blackboard coordinates knowledge; it
must not silently become authority for facts owned elsewhere.

## Contract Net and capability bidding

Use capability-aware bidding when tasks vary materially in required tools,
context, cost, latency, or risk and a coordinator cannot rank candidates from
static metadata alone. Publish the outcome, constraints, acceptance evidence,
and bid dimensions; award atomically; expire unclaimed awards; rebid on changed
facts. Avoid auctions when allocation is obvious or bidding costs more than the
expected gain.

## Dependency-aware scheduling

Represent work as a partial order rather than a fixed role sequence. Run every
independent positive-value item within capacity and integration backpressure;
replan when evidence changes readiness or invalidates a dependency.

## Sources

- Hayes-Roth, *A Blackboard Architecture for Control*:
  <https://doi.org/10.1016/0004-3702(85)90063-3>
- Smith, *The Contract Net Protocol*:
  <https://doi.org/10.1109/TC.1980.1675516>
