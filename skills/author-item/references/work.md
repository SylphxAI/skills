# Work standard

Trigger: planning, splitting, ordering, estimating, dating, gating, or dispatching work.

Work is ordered and dated by the work system, never by hand judgement: a person
sets only the facts behind an item's score, and the system
computes the order, the dates, and who picks it up next.
Hand ordering drifted every time we tried it; a computed order can be checked
and corrected at its inputs.

## Hard lines

- A critical incident goes first, on any product, ahead of every computed
  order, when the harm is large: money lost or charged wrong, an outage, or a
  data-loss risk that reaches the [impact threshold](priority.md#interrupts),
  or any live security exploit or exposure of personal data, whatever its
  size. A small case is ordered by its score like other work, and is still
  fixed and delivered.
- A live product keeps its players' accounts and paid-order delivery working
  ([games.md](../../self-challenge/references/games.md), [commercial.md](../../self-challenge/references/commercial.md)); no scheduling gate
  or order delays that work, but [ONE PATH](../../self-challenge/references/architecture.md#hard-lines) and the
  [recovery procedure](../../deliver-and-verify/references/security.md#recovery-procedure) still apply.

## Order

Order is [CD3](priority.md#the-measure-value-per-unit-of-cost): **cost of delay per day divided by duration**. [priority.md](priority.md) is the single canonical definition of the formula and its components:

- **Cost of delay per day** = `value + time criticality + enablement` (all in money per day, as defined in [priority.md](priority.md#the-measure-value-per-unit-of-cost)). A blocking item inherits the cost of delay of the items it blocks.
- **Duration (job size)** = the estimated duration in days (or agent-hours converted to days, with p50 and p85 tracked for calibration); a missing estimate uses the measured median for that work class.

Nothing is paused: a low score orders work later, it never stops it. The only
work taken out of computed order is an interrupt and a one-off owner request
that finishes in minutes. Every item shows its score and the inputs that made
it.

## Value, cost and time

The inputs of the order (the price of time, the size of an impact, value per
person, interrupts and support order) are set in [priority.md](priority.md).
Remedy policy lives in [conduct.md](../../self-challenge/references/conduct.md#customers-and-players).

## Dates: computed targets, no deadlines

There is no hand-set deadline. A date is a computed target, except a fixed external event. Targets come
from measured line throughput, queue position, the await critical path and
capacity, calibrated by Monte Carlo (Vacanti, *When Will It Be Done?*),
reported as p50 and p85 and recomputed as the inputs change.
A target at risk is met by more resources or a better method, never by dropping other work.

## Planning and decomposition

The owner plans in its session. Keep tightly coupled work in one outcome.
A large estimate prompts a look for genuine parallelism or separately
verifiable parts; it is never a cap. Split only when a step must merge first or
parallel execution shortens the span, never to encode an implementation
pipeline. Each child has its own acceptance and owner; the parent owner
integrates it. Name interface contracts as constraints or references, not
mandatory contract-first steps or mock deliverables.

Wait through one await on an item, resource, signal, time, answer, verdict,
budget or capacity. Shared files or state are a named dependency; no two
parallel outcomes write them. A real-user maintenance window is an external
constraint; products without real users require no booking. The forecast shows
work and span: more agents help only when the critical path is short (Brent's
theorem; Amdahl's law).

## Lifecycle: stage gates

Every product carries a stage and a written checklist for it (Cooper,
Stage-Gate). A stage orders the work and never holds it.

| Stage | Checklist | Game stages |
| --- | --- | --- |
| Discovery | market research, competitors, ambition, target metrics | concept |
| Definition | vision and PRD (or GDD), feature list, monetisation design | pre-production |
| Design | user flows, UI, design system, developer experience for platform products | pre-production |
| Build | feature-complete at the quality bar: performance on real devices, polish, playtests | production |
| Beta | metrics against the targets set at discovery | alpha, beta, soft launch |
| Launch | store listing, paid paths, promotion, and the pre-launch cleanup list worked ([security.md](../../deliver-and-verify/references/security.md#when-security-work-happens)) | launch |
| Live | live operations | live ops |

Listing, payment, pricing, and promotion work depends on the build and beta
checklists, so the work system ranks it after them. A product without a stage
is ordered by its score alone, and a critical incident is never held.

## Dispatch

Work is pulled by computed rank, not hand-picked. Interrupts go first; ready
resumes and verification use free compute before new starts. A new start must
fit the line's outcome-WIP limit, constraint buffer, shares and compute/spend
caps. WIP is started-but-not-done outcomes: suspension still counts. Set the
WIP limit from measured done per day × target age (Little's Law), not live
claims or the number of free sandboxes.

Shares guarantee capacity and set caps at admission, per line and scope.
In the standard delivery, shares are set from measured started WIP per line and
tunable per charter; outcomes directly under a charter draw KTLO share,
those under an objective draw objective share. Measure shares over started
WIP, including suspended owners. Empty shares lend unused capacity, without
exceeding caps; never preempt to rebalance. Only interrupts bypass WIP and shares.

## Done and review (Stage 3 ATDD Verification)

**Done means verified at the real surface against Stage 1's acceptance test cases.**
Writing code, opening a pull request, or drafting a document is a checkpoint,
never completion. Review depth follows blast radius and risk tier (`deliver-and-verify`):

| Outcome / Change Tier | Pre-merge / Pre-execution Gate | Stage 3 Completion Verdict (= Done) |
| --- | --- | --- |
| Commercial, operational, marketing, or docs/config | Stage 2 self-challenge pass against Stage 1 test cases; CI green where applicable | Author reads back the live published surface, signed agreement, campaign telemetry, or operator state after execution |
| Pre-launch code or internal tooling (no live external users) | Automated CI and Stage 1 acceptance tests green | Merged, deployed, and automated acceptance checks pass on the target environment |
| Tier 2: Money, billing, auth, credential, or secret paths (pre-revenue) | Merge on green automated checks, followed by non-blocking review; revert on real defect | Deployed, user-visible acceptance verified at the live surface, and short soak with zero SLO burn ([priority.md](priority.md)) |
| Tier 3: Live real-user product, or deleting/migrating a real-user data store | Required repository checks green, then the merge queue; independent review in parallel or after merge | Deployed, live user-visible acceptance verified by an independent verifier, and short soak with zero SLO burn ([priority.md](priority.md)) |

When verification fails, findings return to the owning writer in one consolidated
pass. A replacement reads back every consumer on the new mechanism before completion.

### Category-leader benchmark and external standards

When designing or reviewing a product feature, UX flow, commercial/growth
mechanic, or platform capability, name the category leader or external
specification and judge the target end state against it (`self-challenge` Test A).
Routine operational tasks, live mitigations, one-offs, and internal bug fixes
with no external dependency or category benchmark are never held by this rule.
SOTA evidence is the leader's measured result and user-visible capability,
never its internal workflow copied step by step; on an agent product, follow
[product.md](../../self-challenge/references/product.md#designing-for-the-model-that-is-coming).

Keep concepts simple and implementations powerful and deep: no self-imposed
limits, self-invented mechanisms or security theater.
Before adding a mechanism, use the platform we already run if it does the job
(GitHub, Kubernetes/Kueue, Argo, Temporal). A control stays only to stop a named,
observed failure mode; prefer deleting a mechanism to tuning it. A self-invented
throttle, gate, queue or approval without that evidence is a blocking defect.

One pass to the end state: a defect is fixed at its root
cause and for its whole class in the same change, not one symptom per round.
The author finds the cause, searches for the same class across the component
and its siblings, and lands the standard design once. A repeated symptom-only
patch that still does not reach the root-cause end state is itself a defect:
the reviewer returns it as a blocking defect with a request for the root-cause design. A
recorded live mitigation and its named root-fix follow-up are not repeats; the
follow-up is the permanent repair. A review lists every defect it finds in one
pass, so rework is one round, not a drip.

## Rulings, ideas and the record

- **A rule broken once ships with its guard**: a standing rule that was broken
  once ships with the check or default that enforces it, merged and installed.
  A one-off ruling gets no guard (the repository's agent instructions).
- **Authorized deferred work becomes an item**: when an actionable future piece
  of work is decided and deferred, file it as a low-priority item with the trigger that would
  start it rather than leaving it only in a note (do not file items for exploratory questions or rejected alternatives). The work system orders it
  like any other item.
- **One record of work**: the work system is the single
  source of truth for work. No mirror or sync is built just so someone can
  view it elsewhere.
- **A decision says who challenged it and who decided it**: a decision note
  records the decider, and where an owner challenged it, the challenger, whether
  the claim was overturned and the rework it caused; a note with no challenger
  says so.
- **A blocker is read in parallel, then settled by one writer**: a blocker is
  worked by everyone reading the same live objects at once, not passed from
  owner to owner; the owner who stops hearing new evidence changes the method,
  and the accountable owner decides on evidence, records dissent, and names the single writer;
  agreement from every participant is not a gate
  (the repository's agent instructions,
  [swarm-fuse](../../swarm-fuse/SKILL.md)).
- **A claim of absence is a check that runs**: a one-time historical absence check records the exact command and count it returned; when an absence is an ongoing architectural or safety invariant, register a deterministic CI check that re-runs it on every change.

## How it is judged

Every open outcome has WHAT fields, a parent, value inputs, an estimate,
awaits, a computed score and date. Measure started WIP, age, done per day,
cycle time, wait time and shares from one log projection. Rework and cycle time
are compared by item style (`what_only`, `with_references`, `auto_fixed`) and
model. Computed p85 dates are met at least 85% of the time; the gap feeds calibration.

## Ownership and authoring

This is the standard workspace policy, not platform code. Customers
may adopt, change or replace it through the public API.

- **Hierarchy:** charter → objective → outcome. The charter names the
  accountable human owner; one agent owns each outcome end to end under that
  human's scoped, audited, revocable delegated grant (RFC 8693 `act`). KTLO is
  standing work directly under the resource-owning charter, with a capacity share.
- **WHAT only** (the repository's agent instructions): no steps, generated
  plan or model-strength tier. The owner chooses how in its session, never in
  the item. Children exist only
  for genuine parallelism or separately verifiable outcomes, not hand-off steps.
- **Authoring guard:** typed fields separate the four WHAT fields; intake
  auto-fix moves step-like text from acceptance or constraints to non-binding
  references, never rejects the item.
- **Durable ownership:** waits release the sandbox and compute, not the owner.
  Events wake the same session; a verifier FAIL resumes it with findings.
  A failed production verification reopens the same outcome, not a rollback item.
  Only budget exhaustion, two identical failure fingerprints, silence past the
  time given, or an explicit audited reassign changes the owner.

