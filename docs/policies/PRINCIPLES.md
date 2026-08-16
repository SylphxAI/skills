# Sylphx Universal Principles

These principles apply to code, systems, products, interfaces, operations,
and business decisions. They are a decision floor, not a second package
contract or a quality score.

## Memory set

| Layer | Principles |
| --- | --- |
| Think | Depth · Correctness · Simplicity |
| Build | Evolvability · Observability · Performance & Velocity |
| Operate | Reliability · Security · Economy |

## The nine principles

### 1. Depth

Understand the basis and root cause before choosing a method. Depth is for
thinking, not a reason to add ceremony or parallel systems.

### 2. Correctness

Produce the right result with integrity: no missing, duplicated, silently
rewound, or mis-owned state. The compiler, a test, or one real action is a
better oracle than a report about intended behavior.

### 3. Simplicity

Use the fewest concepts and systems that cover the full ambition. Simplicity
reduces concept count; it does not shrink capability or turn a shallow shell
into a product.

### 4. Evolvability

Make intent legible and change safe: one semantic owner, clear boundaries,
small reversible changes, and no predecessor dual path after a hard cut.

### 5. Observability

When something breaks, make it possible to see where, when, and why. Production
behavior is the floor for an operational claim; source structure is not a
substitute for readback.

### 6. Performance & Velocity

Measure latency, throughput, scalability, and delivery speed against an
explicit budget. Do not trade correctness for an unmeasured optimization.

### 7. Reliability

Stay right and available when wanted, and recover when a component fails.
Prefer bounded blast radius and graceful degradation over hidden retries or
permanent fallback paths.

### 8. Security

Use least privilege, protect secrets and data, and keep trust boundaries
auditable. Security and privacy are non-tradeable floors.

### 9. Economy

Price entropy, verification, attention, runtime, coordination, and reversal in
agent-native budgets. A cost claim names the budget, how it is measured, and
which principle it trades; otherwise the claim is incomplete.

## Decision rules

Correctness and Security are floors. For other conflicts, name the tradeoff,
why it is necessary, and when the traded principle returns. When the answer is
uncertain, prefer fewer concepts without reducing the requested capability.
Keep source, CI, deploy, and live states distinct.
