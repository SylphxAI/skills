# Product Quality Loop Contract

## Contents

1. [Control model](#control-model)
2. [Contract structure](#contract-structure)
3. [Quality matrix](#quality-matrix)
4. [Observation, finding, Work, C/B/R, and coverage](#observation-finding-work-cbr-and-coverage)
5. [Scout triggers and research-stop](#scout-triggers-and-research-stop)
6. [Leverage, qualification, and admission](#leverage-qualification-and-admission)
7. [Execution and delivery readback](#execution-and-delivery-readback)
8. [Stop-Audit, idle, wake, and goal complete](#stop-audit-idle-wake-and-goal-complete)
9. [Parallelism and backpressure](#parallelism-and-backpressure)
10. [Reviewer policy](#reviewer-policy)
11. [Loop observability](#loop-observability)
12. [Implementation topology](#implementation-topology)
13. [Worked task shapes](#worked-task-shapes)
14. [Research basis](#research-basis)

## Control model

Continuous product quality is a closed-loop control system over changing
product state. It maximizes **user/business-visible outcome leverage**, not
commit count or micro-polish volume.

```text
north-star outcomes + versioned contract + uncapped engagement goal
  loop:
    research coverage card (5 cells) + VoI deepen + scouts
    -> Candidate C -> admit B + residual R
    -> if B empty and R clean: engagement Stop-Audit -> IDLE (goal complete)
    -> else: execute all B (efficiency bar) -> verify cadence
         -> cycle Stop-Audit -> loop again (re-research)
```

Separate layers:

| Layer | Unit | Terminal |
| --- | --- | --- |
| Betterment **engagement (loop)** | Multi-cycle continuous betterment under one goal | Engagement idle after empty re-scout |
| Betterment **cycle** | One card→B→execute→verify pass | Cycle Stop-Audit then **next cycle** |
| Work execution | One accepted Work Item / Workstream | Delivery terminal + original-oracle |
| Agent-system learning | One recurring agent failure class | Intervention against frozen evidence |

A product defect does not automatically justify a Skill change. Repeated agent
failure does not automatically justify product Work.

**Not the unit of product progress:** one finding, one cosmetic PR, local green.

## Contract structure

The Product Quality Loop Contract records:

| Section | Required semantics |
| --- | --- |
| Subject | project, product release or source revision, environment, capability, surface, journey |
| North-star outcomes | 1–3 measurable user/business outcomes; non-goals |
| Research coverage card | Five cells: evidence or unknown+reason |
| MinOutcomeDelta | Minimum non-floor user/business-visible delta for admission to B |
| Quality intent | promise, hard floor, improvement objective, frontier target, residual |
| Oracle | subject layer, method, decisive result, uncertainty, replay, freshness |
| Signals | change, event, live, schedule, owner request |
| Candidate C | inventory of scored opportunities this research pass |
| Backlog B | admitted Work ordered by leverage under capacity |
| Residual R | not-in-B items with EV/L, blocker class, freshness |
| Finding policy | normalization, identity, dedupe, disposition, invalidation |
| Admission | leverage L, MinOutcomeDelta, ownership, risk, authority, capacity |
| Work handoff | goal, non-goals, acceptance, evidence, delivery terminal |
| Readback | exact delivered subject, original oracle, outcome comparison |
| Stop-Audit | checklist results bound to observation/finding IDs |
| Operation | WIP, budgets, idle/wake, metrics, recovery, harness goal pointer |

The product repository stores the versioned contract or a manifest reference.
Operational records bind the exact contract revision. Advance under predecessor
CAS where applicable.

**Do not** use a freeze-all immutable mega-list as the only plan: B and R update
when evidence or capacity changes (re-admission). **Do** treat clearing B (or
legal rejects) plus anti-lazy R as the cycle bar—not Top-1 only.

## Quality matrix

Model quality as a matrix, not a scalar score:

```text
capability or surface × applicable quality dimension
  -> promise or objective
  -> oracle + required subject layer
  -> latest decisive evidence
  -> freshness
  -> residual or eligible candidate
```

Common dimensions include functional journeys; interaction/visual integrity;
accessibility; SEO/discoverability; performance; compatibility; reliability;
security/privacy; content/brand; art/3D; game systems; operability;
architecture; business packaging; growth/retention; support recovery.

Record `not_applicable` with a semantic reason. Do not collapse a failed floor
into an average score.

Classify each selected cell:

- **hard floor** — unacceptable if failed for declared product state;
- **objective** — measurable north-star-linked target;
- **frontier opportunity** — closes claim-grade gap when L ≥ threshold.

Known uncertainty is a `residual`, not fake green. Applicable cells need oracles.

**Frontier / SOTA language** is forbidden without claim-grade fields: subject,
comparison set, metrics, observation date, uncertainty, evidence. Prefer
“meets target / best among evaluated / residual unknown.” Compose
`evidence-and-claims-standard`.

## Observation, finding, Work, C/B/R, and coverage

### Quality Observation

Immutable evidence: producer/method; exact subject identity; cell; timestamp;
freshness; evidence locator; uncertainty; contract/oracle revision. Missing
evidence is `unknown`. Layer mismatches do not silently satisfy another layer.

### Quality Finding

Normalized interpretation of one or more observations: stable id; dedupe key;
consequence; floor/objective/opportunity; severity; confidence; ownership;
proposed oracle and expected outcome delta; disposition; relations.

`Resolved` requires outcome readback bound to the Work—not ticket close alone.

### Work

Work is an accepted action with exact goal, non-goals, acceptance, risk,
evidence, delivery boundary, and relation to findings/candidates.

- One Work owns one independently terminal **outcome story** (may cover multiple
  findings when one owning cause or one coherent tranche).
- Prefer packaging **high-leverage coherent changes** over atomized polish.
- Several Work items may exist in **B** simultaneously (the cycle executes all).

### Candidate C, backlog B, residual R

| Set | Meaning |
| --- | --- |
| **C** | All scored opportunities from current research/scouts |
| **B** | Admitted subset under leverage + MinOutcomeDelta + authority + capacity—**all** such items that fit the envelope, not only Top-1 |
| **R** | C\B and later discoveries: each has L/EV, blocker class, freshness |

Blocker classes for R (examples): `capacity`, `authority_pending`,
`external_wait`, `below_min_delta`, `negative_ev`, `duplicate`,
`unauthorized_irreversible`, `unverified_non_floor`.

Re-admission: when capacity frees, evidence changes, or blockers clear, promote
R→B without abandoning the engagement for a random micro-scout.

### Quality Coverage

Rebuildable projection of latest decisive observation per selected cell:
`pass`, `fail`, `unknown`, `stale`, `not_applicable`, residuals. Not a second
writable verdict SSOT.

## Scout triggers and research-stop

### Triggers

- **Change-triggered** — affected fast checks on candidate/artifact change  
- **Delivery-triggered** — minimum live readback after release  
- **Event-triggered** — incidents, feedback clusters, advisories, owner signal  
- **Scheduled** — slow-drift surfaces (a11y, SEO, perf budgets, content, …)

### Minimal research coverage card (mandatory, thin)

Before admitting **B**, emit a coverage card. This is **decision-complete**
coverage (enough to rank and admit), **not** universal omniscience.

| # | Cell | Required content |
| --- | --- | --- |
| 1 | North-star outcomes | 1–3 outcomes; how betterment moves them |
| 2 | Primary journeys / surfaces | Critical user paths (or N/A + reason) |
| 3 | Competitive / quality anchor | Comparison set **or** `unknown` + why not needed this cycle |
| 4 | Hard floors | Applicable floors; evidence or `unknown` |
| 5 | Highest known pains / bets | Top support/metrics/owner/code signals |

Each cell: **evidence locator** or **`unknown` + reason + freshness**. Silent
omission is invalid. Incomplete card → cannot admit B; Stop-Audit fails
(`research_card_incomplete`).

Optional deepen (full matrix, specialist reviews, claim-grade frontier) **only
if** VoI says it can change B ranking or idle. Prefer acting at ~70% information
on reversible (Type-2) work; do not wait for 90%+ essays.

### VoI research-stop

**Stop research** when further investigation cannot change B ranking or idle
verdict enough to justify delay. Forbid open-ended “market SOTA essays” with no
comparison set or admission impact. Unknowns go to **R** with freshness—not
fake completeness.

## Leverage, qualification, and admission

### Leverage

```text
L = (expected_outcome_or_frontier_gap_delta × weight × confidence)
    / full_lifecycle_cost
```

Full cost: implementation, integration, verification, operation, collision,
recovery. Historical human typing effort is not the default cost model.

- Difficulty alone does **not** disqualify.
- Ease alone must **not** promote polish over higher-L harder work.
- Compose `decision-quality-standard` for ranking and stop decisions.

### MinOutcomeDelta

The contract declares a minimum user/business-visible delta for **non-floor**
Work. Below-threshold cosmetic work is residual/reject—not B. Hard floors
bypass ordinary opportunity ranking but still obey authority/safety.

### Admission eligibility

```text
reproducible_or_measurable
and material
and actionable
and owned
and novel_or_meaningfully_changed
and has_a_decisive_oracle
and (hard_floor OR (L_positive AND expected_delta ≥ MinOutcomeDelta))
and integration_capacity_available_for_this_item_or_split
```

**Batch rule:** Admit into B **every** candidate that meets the bar under the
current capacity envelope (ordered by L). Do not admit a single easy polish
while other unblocked high-L items remain only because they are harder.

If capacity cannot hold all passers: put overflow in R with `capacity` blocker;
keep the **same engagement/goal**; clear B then promote—not “loop complete.”

Semantic idempotency keys over product, capability, surface, dimension, owning
cause, subject revision. Preserve rejected/duplicate/deferred/residual so
unchanged evidence does not thrash forever.

## Execution and delivery readback

### Efficiency bar (mandatory, thin)

While clearing **B**, maximize outcome throughput:

1. **Parallel default.** Independent B items (no shared mutable conflict) run
   as parallel workstreams unless a written dependency says otherwise.
2. **Shared setup once.** Install, fixture, baseline capture, and env bootstrap
   are done once per cycle and reused—not re-done per micro-item.
3. **Serial only with dependency.** Serial-for-“safety” or “simpler context”
   alone is invalid when items are independent.
4. **L orders sequence, not exclusivity.** Highest L first among serial chains;
   still finish all of B in the cycle.

### Verify cadence (mandatory, thin)

| When | Verify | Not |
| --- | --- | --- |
| Each B item terminal | **Original-oracle** on exact delivered subject | Skip oracle |
| Cycle / Stop-Audit | **One** north-star / outcome (and frontier if claimed) readback | Proxy-only (PR green, local CI) as betterment proof |
| Every commit | Optional risk-based checks only | Full product oracle suite as ceremony |

### Path

```text
admitted B item
  -> claim / autonomous-execution Workstream
  -> specialist diagnosis and implementation
  -> repository-native integration (small commits OK)
  -> exact-candidate verification as needed
  -> delivery owner path as required
  -> original-oracle readback on exact delivered subject
  -> resolve, correct, or residual
```

Word Work for native specialist discovery—not “use all quality Skills.”

**Engineering vs product batching:** DORA-style small commits are allowed.
Product progress is measured at Work and cycle outcome oracles—not commit
count.

Rework is related Work (`rework_of`, `follow_up_of`, `reverts`), not silent
scope shrink of the engagement.

## Stop-Audit, idle, wake, and goal complete

### Cycle vs engagement (normative)

| Boundary | When | Goal API |
| --- | --- | --- |
| **Cycle Stop-Audit** | B cleared + verify cadence for cycle k | **Keep goal active**; open cycle k+1 |
| **Engagement Stop-Audit / idle** | Fresh coverage card/re-scout admits B=∅ and R has no unblocked high-EV | `update_goal(complete)` allowed |

**Loop engineering rule:** after every non-empty cycle, **re-research in the
same run**. One-cycle-and-stop is an anti-pattern. **Illegal:** end the agent
turn with a cycle report and wait for the user (or Goal API) to start k+1 while
engagement is not idle. Outer objective stays product outcomes, not “cycle N.”

### Stop-Audit package (required at cycle end and before engagement idle)

| Test | Fail (blocks idle / complete) |
| --- | --- |
| Research card | Coverage card incomplete or cells silently omitted |
| Residual completeness | Applicable matrix cells stale/`unknown` without residual or floor evidence |
| B clearance | Open B items without delivery proof or legal reject |
| EV leftover | Any R item with EV/L ≥ MinOutcomeDelta and no **qualified** blocker |
| Floor | Hard-floor fail/unknown without active mitigation Work |
| Polish trap | Shipping only cosmetic while higher-L residual unaddressed |
| Authority trap | High-L residual blocked only by owner ask never attempted |
| Evidence class | Stop reasons lack observation/finding IDs (slogans) |
| Verify cadence | Missing per-Work original-oracle or cycle outcome readback |
| Efficiency note | (observability) independent B items run purely serial without dependency—flag thrash |
| Competitor week (optional VoI) | Named high-L competitor-move candidates unblocked and ignored |

Qualified blockers are concrete (authority ticket, external dependency, measured
negative EV after new evidence)—not “maybe over-engineering” or “too hard.”

### Idle predicate (engagement only)

All must hold **after a fresh research coverage card / re-scout** (not merely
after clearing the previous B):

1. Hard floors fresh and decisive;  
2. **This research pass** admits B=∅ (no passers);  
3. R has no unblocked EV/L ≥ MinOutcomeDelta;  
4. Engagement Stop-Audit package recorded (includes the empty-pass card);  
5. Wake catalog durable and explicit.

**Not** idle conditions: product perfect; “we finished cycle 1”; commit quota
filled; agent fatigue; B cleared without re-research.

### Anti-lazy / anti-abuse

- Default = finish B.  
- Reject/stop must be falsifiable.  
- Cannot rebrand difficulty as no value.  
- Cannot use over-engineering as sole reason when an oracle and Δ exist.  
- Cannot idle by ignoring R.

### Wake

Wake on contract-declared signals: change, event, schedule, owner request,
freshness miss, capacity restored, residual blocker cleared. New cycle gets
new/updated research; same product identity; do not silently shrink to last
patch.

### Harness goal

When a Goal API exists: uncapped bind/resume; objective carries idle DoD, EV
policy, contract pointer, next action—not full B as sole SSOT.  
`update_goal(complete)` only with Stop-Audit package. See
[harness-goal-binding.md](harness-goal-binding.md).

## Parallelism and backpressure

- Parallel workstreams over independent surfaces/items in B are encouraged when
  collision cost is acceptable.
- When CI/review/deploy saturates: stop increasing source WIP; clear bottleneck;
  capacity-split keeps engagement id; overflow stays in R with `capacity`.
- Do not use backpressure as fake idle while high-L unblocked work exists.

## Reviewer policy

| Mode | When |
| --- | --- |
| **No continuous independent reviewers** | Ordinary cycle operation |
| Always-on discipline | Oracles, B/R, Stop-Audit, goal complete gate |
| Sparse independent review | Irreversible/public-contract; load-bearing SOTA; **contested** Stop-Audit |

Prefer machine-checkable evidence over reviewer ceremony.

## Loop observability

Measure without reducing quality to one score:

- Δ north-star / frontier gap per cycle;
- B size, clear rate, time-in-B;
- R high-L leftover count (should be zero at idle);
- polish vs high-L Work ratio;
- observation→finding→B conversion;
- original-oracle pass rate;
- Stop-Audit fail reasons;
- research card completeness; VoI stop hits vs open-ended research time;
- parallel vs serial B item ratio (efficiency).

Dashboards are projections, not admission authority.

## Implementation topology

| Concern | Owner |
| --- | --- |
| Static method | this Skill + composed standards |
| Contract / B / R | product source or durable store bound to revision |
| Work/claims (if fleet) | Enact via `enact-work-coordination` |
| Source | Git |
| Engagement recovery | Harness Goal System |
| Live proof | delivery/platform systems |

## Worked task shapes

### High-leverage multi-item cycle

Research → C with 8+ candidates → B admits all five above MinOutcomeDelta under
capacity → R holds three capacity/authority items → execute five Workstreams →
cycle readback → Stop-Audit → continue engagement to promote R or idle.

### Interface stability campaign

Multiple related layout/journey findings share coherent Workstreams in B;
reject pixel-nits below MinOutcomeDelta into R.

### Hard floor interrupt

Accessibility floor fail enters B immediately even if polish residuals exist;
polish does not outrank floors.

### False idle (forbidden)

Agent lands ten cosmetic commits, leaves unblocked checkout-conversion residual
in R, completes goal—**invalid** Stop-Audit (EV leftover + polish trap).

## Research basis

- Product prioritization (RICE / WSJF / cost of delay): maximize value per unit
  time/effort; not ease-first.  
  <https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/>  
  <https://www.scaledagileframework.com/wsjf/>
- Kaizen vs kaikaku: continuous micro-improvement can plateau; breakthrough bets
  remain necessary when activity no longer moves strategic metrics.
- IBM autonomic MAPE-K closed loop with re-plan (not freeze-all waterfall):  
  <https://www.research.ibm.com/publications/an-architectural-blueprint-for-autonomic-computing>
- Deming PDSA: prediction, evidence, learning—not activity repetition:  
  <https://deming.org/explore/pdsa/>
- ISO/IEC 25010 multidimensional quality (not one score):  
  <https://www.iso.org/standard/78176.html>
- Google SRE: monitoring vs actionable work; avoid toil-as-progress:  
  <https://sre.google/sre-book/monitoring-distributed-systems/>
- DORA continuous delivery: small **engineering** batches and fast feedback—not
  a ban on large product programs:  
  <https://dora.dev/capabilities/continuous-delivery/>
- Claim-grade comparative/SOTA discipline: this repository’s
  `evidence-and-claims-standard`.
- W3C ACT, Core Web Vitals, OWASP ASVS, OpenTelemetry as dimension-specific
  oracle families where applicable.

## Anti-patterns (contract-level)

- Micro-polish thrash; commit count as KPI  
- One Work = one cycle  
- Top-1 only while unblocked high-L items remain  
- Freeze-all mega-E immutable program  
- Idle with high-L residual unblocked  
- Ease-first ranking; difficulty-as-veto  
- Continuous reviewer ceremony  
- Research without VoI stop  
- Goal complete without Stop-Audit package  
- SOTA claims without comparison set  
- Shallow research-as-done (no coverage card)  
- Serial busywork on independent B items  
- Full re-verify every commit as ceremony  
- Waiting for 90%+ info on reversible Type-2 work  
