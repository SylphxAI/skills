# Design Space Methods

## Diverge before selecting

Treat generation and selection as different phases. The Design Council's
Double Diamond distinguishes discovery and development from definition and
delivery, and explicitly encourages different answers to a defined problem.
NASA's systems-engineering process likewise treats logical decomposition,
alternative designs, design decisions, and validation as iterative products.

This does not require ceremonial phases. Preserve the useful invariant: do not
let the first plausible implementation become the problem definition or the
only candidate.

## Structure the space

Use dimensions that expose real mechanism choices. Examples include:

- locus of ownership or authority;
- centralized, distributed, replicated, or federated state;
- synchronous, asynchronous, event-driven, reconciled, or batch interaction;
- local, managed, hosted, or customer-operated deployment;
- build, buy, adapt, compose, or eliminate;
- reversible versus irreversible commitment;
- optimization objective and harmed countermetric.

A morphological matrix can combine dimension values, but combinations are
prompts rather than valid designs. Reject incoherent or constraint-breaking
combinations explicitly.

## Generate independent option families

Parallel generation is useful when the lanes are genuinely different:

- minimum-change and lowest-complexity;
- maximum long-term leverage;
- constraint-first or failure-first;
- analogy from a different domain;
- operational simplicity;
- privacy, safety, accessibility, or economic lens;
- adversarial design that avoids the current dominant assumption.

Ask each lane to produce mechanisms, not slogans. Delay cross-lane exposure
until initial concepts exist to reduce anchoring and correlated repetition.

## Map coverage without fake exhaustiveness

Cluster by mechanism and record which dimension combinations were explored,
invalidated, deferred, or not visited. Coverage is sufficient when another
bounded pass has low expected value, not when every combinatorial cell is
filled.

Hand off an option family only with its assumptions, material tradeoffs,
dependencies, reversibility, failure modes, and cheapest discriminating probe.

## Sources

- Design Council, **The Double Diamond**:
  <https://www.designcouncil.org.uk/resources/the-double-diamond/>
- NASA, **Systems Engineering Handbook — 4.0 System Design Processes**:
  <https://www.nasa.gov/reference/4-0-system-design-processes/>
- NASA, **Systems Engineering Handbook** PDF and reference home:
  <https://www.nasa.gov/reference/systems-engineering-handbook/>
