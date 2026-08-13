# Quality North Star — usage, pocket questions, anti-examples

**Industry quality model.** Software product quality is **ISO/IEC 25010**.
Tradeoffs use this repository's nine English principles (Depth · Correctness ·
Simplicity · Evolvability · Observability · Performance & Velocity ·
Reliability · Security · Economy).

**What `q-*` is.** An **internal alias map** onto those industry names, kept
so existing agents and `eng-*` rules still resolve. It is **never** a product
North Star Metric and **never** a product score.

**What this file is.** Operating guide for that alias map: pocket questions,
anti-examples, and how to apply ISO/IEC 25010 / the nine principles on
durable product, design, code, architecture, and ops work.

**What this is not.**

- Not the **Product North Star** for Sylphx Verified Capabilities  
  → that is [`docs/NORTH-STAR.md`](../../../../../docs/NORTH-STAR.md)
  (trusted methods; trust capped by version-scoped evidence).
- Not qualification evidence.
- Not a second universal principles document  
  → principles: [`docs/policies/PRINCIPLES.md`](../../../../../docs/policies/PRINCIPLES.md).
- Not a claim ladder, residual grade, or L0–L6 score.

Normative attribute definitions and IDs:
[full-standard.md](full-standard.md) § Quality North Star.  
Binding rule IDs: [binding-predicates.md](binding-predicates.md).

---

## Why a Quality North Star exists

Agents and humans can satisfy a ticket while leaving a system that is shallow,
incorrect under failure, unobservable, expensive in entropy, or dual-pathed
forever. The Quality North Star exists so durable work is judged against a
**single, ambitious vocabulary**—few enough to remember, deep enough to force
real tradeoffs—without inventing a new slogan list per repo.

**Meta (center of gravity):**

> *Simple concepts, powerful usage.*

Use depth for insight and **integration for simplicity**; compose for maximum
capability; under correctness and security floors, make the system steady,
observable, fast enough, large enough, and changeable—**pricing agent-native
cost**, not person-days.

**Operating set:** Meta + **14 primary** attributes (`q-readability` is a
Maintainability alias).  
**Memory set (9):** Depth · Correctness · Simplicity · Evolvability ·
Observability · Performance & Velocity · Reliability · Security · Economy.

Grow by refining definitions, tests, and anti-examples—not by adding slogan
rows.

---

## How to use (or it stays a wall poster)

| Occasion | Required usage |
| --- | --- |
| **Design review** | Clear **Layer A** (Depth / Simplicity) first. Then scan Layers B/C in **default quality precedence**. Violations need written tradeoff + owner + rollback/review. |
| **PR / design note** | Name **1–2** attributes intentionally strengthened or intentionally sacrificed—not the full table. Attach evidence or residual. |
| **Product / finish** | Depth = one core concept fully resolved end-to-end; Simplicity = fewest concepts covering **maximum** capability (ambition held). |
| **Architecture decision** | Record the rejected shallower option (Depth) and whether composition reduced special cases while holding or expanding coverage (Simplicity). |
| **Cutover / migration** | Evolvability + Economy: sole-writer terminal; dual-path only under `eng-hard-cut-01`; price dual-system **entropy** vs one-time verification/reversal. |
| **Retrospective** | Name which attribute broke → consequence → whether it hardens into a rule ID or residual retirement. |
| **Vocabulary retirement** | Sentences that never guided a decision for six months: delete or merge. Keep few and sharp. |

**Do not** re-author a parallel quality list in product repositories. Link or
apply `q-*` IDs and **prove** them (`eng-quality-01`, `eng-quality-02`).

**Do not** treat a Quality North Star pass as:

- package qualification,
- Product North Star progress,
- or live outcome proof.

---

## Default quality precedence

Absent explicit business counter-instruction
(`eng-quality-precedence-01`):

> **Depth / Simplicity → Correctness → Security → Reliability / Availability /
> Resilience → Observability → Performance / Scalability / Economy →
> Maintainability / Evolvability / Testability**

Rationale (compressed):

1. Optimize before understanding → prepaid incident.
2. Incorrect high availability only accelerates wrongness.
3. Unobserved systems cannot honestly claim stability.
4. Long-term changeability cannot replace “right and safe first.”
5. Intentional inversion records **tradeoff, owner, rollback/review** in the
   smallest durable home (comment / test / ADR / commercial ADR).

Does **not** override legal/safety/ruin floors or Decision Quality / SOTA ends.

---

## Pocket questions (ambitious, not ceremonial)

Use these as a **pre-flight**, not a form to fill with boilerplate.

### Stance

1. **Depth** — Root cause or workaround? Can you state the basis and the
   rejected shallower path?
2. **Simplicity** — After “simplifying,” did capability shrink? If yes, you
   have not found the basis yet. Can one integrated system cover more than
   these parallel ones?

### Floors

3. **Correctness** — What is the oracle? Can we re-run and see the
   postcondition at the real layer (artifact → check → live)?
4. **Security** — Who can touch this? Blast radius of a stolen credential?
   Secrets in source/logs/manifests?

### Operate under stress

5. **Reliability / Availability / Resilience** — If one part dies, what does
   the user see, and how long until healthy? Is wrong-but-up forbidden?
6. **Observability** — In minutes, not days: signal → locus → cause?
7. **Performance / Scalability** — SLO / load shape? What happens at 2× and
   ~10×? Measured or hoped?

### Sustain and pay

8. **Maintainability / Evolvability / Testability** — How many places move for
   the next real requirement? After hard-cut, one clear authority? Falsifiable
   automated oracles?
9. **Economy** — Which **agent-native** budget (entropy, verification,
   attention, runtime, coordination, reversal)? How measured? Which principle
   traded? (Person-days alone = incomplete.)

### Precedence

10. If default precedence is inverted, are reason, owner, and rollback written?

---

## Anti-examples (failure atlas)

| Attribute | Typical failure |
| --- | --- |
| **Depth** | Framework “best practice” copy without failure modes or a rejected simpler path; shallow multi-concept residue sold as “coverage” |
| **Simplicity** | Cut edge cases for cleanliness; fewer-features cosplay; god abstraction that forced *more* special cases; false unification of incompatible concerns |
| **Correctness** | High-throughput writes that silently drop data; 200 OK with wrong body; green tests that never issue the real action |
| **Security** | Admin surface secured only by obscurity; secrets in repo or logs; trust boundary added without threat model |
| **Reliability** | Always HTTP 200 with errors buried; side effects without idempotency; workers without durable transitions |
| **Availability** | Single point of failure; users as pager; “uptime” while serving wrong answers |
| **Resilience** | Infinite retry stampede kills the dependency; no bulkhead; recovery that corrupts state |
| **Performance** | Micro-optimize with no budget; report mean latency only; cost ignored |
| **Scalability** | All state pinned to one machine; “just add nodes/K8s” as architecture; premature full distribution with no partition story |
| **Economy** | “Saved eng time” as the whole cost story; counting only build cost while ignoring verification, entropy, attention, coordination, reversal; calendar scarcity used to keep permanent dual paths |
| **Observability** | Logs without correlation; alerts with no owner action; dashboards as success theater |
| **Maintainability** | Clever one-liners no one can safely edit; unreadability sold as depth; god modules; unowned dual paths |
| **Evolvability** | Business detail leaks every layer; swapping a store rewrites all callers; forever flags; dual writers as steady state |
| **Testability** | Logic locked in non-injectable statics; coverage vanity; source-string change-detector tests as durable product contracts |

---

## Worked application patterns

### A. Small pure-logic change

- In scope often: `q-correctness`, `q-testability` (± `q-maintainability`).
- Evidence: unit/property oracle on exact candidate; no canary essay required.

### B. New trust boundary or privileged action

- In scope: `q-security`, `q-correctness`, `q-observability` (+ threat model
  via `model-security-threats` when blast is material).
- Evidence: deny-by-default, least privilege, audit path, negative tests.

### C. Queue / worker / money path

- In scope: `q-reliability`, `q-resilience`, `q-correctness`, `q-observability`,
  often `q-economy` (reversal, verification).
- Evidence: idempotency, timeout/retry budget, durable transitions, recovery
  drill proportionate to risk.

### D. Cutover / predecessor retirement

- In scope: `q-evolvability`, `q-correctness`, `q-economy` (entropy),
  `eng-hard-cut-01/02`, `eng-product-dual-ban-01`.
- Evidence: destination sole writer, predecessor retired, dual only under
  risk-class gates—not calendar fear.

### E. Docs-only / skill package authoring

- In scope: `q-depth`, `q-simplicity`, `q-maintainability` (legibility),
  `q-economy` (attention/entropy of the instruction surface).
- Still **not** Product North Star progress unless qualification or install
  truth moved.

---

## Center (for agents and humans)

> Use depth for insight, integration for simplicity, composition for maximum
> capability; under correctness and security, make the system steady,
> observable, fast enough, large enough, and changeable — pricing agent-native
> cost, not person-days.

**Operating set = Meta + 14 primary attributes**  
**Memory set = Meta + 9 principles-aligned names**

When Product North Star and Quality North Star both appear in one task:

1. Product North Star decides whether the **capability/trust** work is the
   right job.
2. Quality North Star decides whether the **engineering artifact** is good
   enough to land.
3. Qualification / receipts decide whether **trust and outcomes** may be
   claimed externally.
