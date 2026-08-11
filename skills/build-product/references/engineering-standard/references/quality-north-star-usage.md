# Quality North Star — usage, pocket questions, anti-examples

Open when applying the North Star in design review, PR/design notes, finish
passes, architecture tradeoffs, or retrospectives. Normative definitions and
IDs live in [full-standard.md](full-standard.md) § Quality North Star and
[binding-predicates.md](binding-predicates.md).

## How to use (or it stays a wall poster)

| Occasion | Usage |
| --- | --- |
| **Design review** | Layer A (Depth / Simplicity) first; then scan B/C in conflict precedence. Violations need written tradeoff + rollback/review. |
| **PR / design doc** | Name 1–2 attributes intentionally strengthened or intentionally sacrificed—not the full table. |
| **Product / finish** | Depth = one core concept fully resolved; Simplicity = fewest concepts covering maximum capability (ambition held). |
| **Architecture decision** | Record rejected shallower option (Depth) and whether composition reduced special cases while holding or expanding coverage (Simplicity). |
| **Retrospective** | Name which attribute broke → consequence → whether it hardens into a rule. |
| **Retirement of wording** | Sentences that never guide a decision for six months: delete or merge; keep few and sharp. |

Do not re-author a parallel quality list in product repos. Link or apply `q-*`
IDs and prove them.

## Pocket seven questions

1. Deep enough? Can fewer concepts cover *more* capability by composition?
2. Correct? Are security boundaries clear?
3. When it fails, is blast radius contained—and is the system observable?
4. Fast and large enough? Where are budgets and measurement points?
5. Which agent-native cost budget is saved (entropy, verification, attention,
   runtime, coordination, or reversal), how is it measured, and which
   principle is traded? (Economy — not person-days)
6. Six months later: still changeable and testable?
7. If default quality precedence is violated, are reason and rollback written?

## Anti-examples (quick table)

| Attribute | Typical failure |
| --- | --- |
| Depth | Reused a framework “best practice” without naming failure modes or a rejected simpler path |
| Simplicity | Cut features/edge cases for cleanliness; fewer-features cosplay; or one god abstraction that forced more special cases |
| Correctness | High-throughput writes that silently drop data |
| Security | Admin surface exposed, secured only by “nobody knows the URL” |
| Reliability | Always HTTP 200 with errors buried in body and no monitor |
| Availability | Single point of failure, no health discovery; users are the pager |
| Resilience | Infinite retry stampede kills the dependency |
| Performance | Micro-optimize with no budget; report only mean latency |
| Scalability | All state pinned to one-machine memory; “just add nodes” |
| Economy | “Saving dev effort” / person-days as the cost story; no agent-native budget, measurement, or traded principle; counting only build cost while ignoring verification, entropy, attention, coordination, and reversal |
| Observability | Logs without trace id; alerts with no owner action |
| Maintainability | Clever one-liners no one can safely edit; unreadability sold as depth |
| Evolvability | Business detail leaks every layer; swapping a store rewrites callers |
| Testability | Logic locked in non-injectable static singletons; coverage without contract oracles |

## Center (for agents and humans)

> Use depth for insight, integration for simplicity, composition for maximum
> capability; under correctness and security, make the system steady,
> observable, fast enough, large enough, and changeable — pricing agent-native
> cost, not person-days.

**Operating set = Meta + 14 primary attributes** (`q-readability` is a
Maintainability alias; `q-economy` = agent-native entropy/verification/
attention/runtime/coordination/reversal cost).
**Memory set = Meta + 9 (深正簡 · 改觀快 · 穩安平).** Grow by refining definitions
and anti-examples—not by adding slogan rows.
