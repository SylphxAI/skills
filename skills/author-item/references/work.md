# Work standard

Trigger: planning, splitting, ordering, estimating, dating, gating or dispatching work.

An outcome states the result and acceptance tests. Its writer chooses the method,
keeps custody through waits and verifies the result in the target environment.

## Order

Use [cost of delay divided by duration](priority.md#the-measure-value-per-unit-of-cost)
to rank ready work. Record the inputs and uncertainty. A dependency inherits the
value of the work it enables, accounting for shared benefits once. Explicit
scope or pause instructions remain part of the outcome's constraints.

A [critical incident](priority.md#interrupts) can preempt ordinary work when the
cost of waiting exceeds the disruption. Preserve live-user accounts and paid
value throughout the response ([games.md](../../self-challenge/references/games.md)).

## Value, cost and time

[priority.md](priority.md) owns the economic ranking method and interrupt criteria.
[conduct.md](../../self-challenge/references/conduct.md#customers-and-players)
owns customer remedies and communication conduct.

## Dates: computed targets, no deadlines

Forecast delivery from remaining work, dependencies, measured throughput and
available capacity. Show a range when the inputs are uncertain, and update it
when evidence changes. A fixed external event or an explicit requested date is
a real constraint; report a target at risk while there is time to change the
method or capacity. A quick action runs when ready.

## Planning and decomposition

Keep one coherent, independently verifiable result together. Split when parts
can run independently or a prerequisite must be live before the dependent
change. Caller migration and removal of the replaced implementation belong to
the same outcome as the replacement.

Name shared-file or live-state dependencies and assign one writer per target.
Parallel agents help where work is independent. The outcome owner integrates
contributions and records any custody transfer explicitly.

## Lifecycle and dependencies

Use lifecycle stages to describe progress and discover dependencies. Discovery,
design, build and launch work may overlap when their actual prerequisites are
met. Pricing and a paid path belong with the first useful or playable loop, so
the product can earn while depth continues. Store publication follows the
applicable readiness and account requirements.

## Dispatch

Pull ready work by computed rank, with incidents handled under the interrupt
criteria. Use available compute within authorized spend and measured shared
capacity. Finish or resume existing work when that reduces delay. Adjust work
in progress from observed queueing, completion rate and work-item age; a fixed
per-agent or per-line quota needs evidence of the contention it prevents.

Waits retain the writer's custody while releasing resources that the work no
longer needs. An event or scheduled wake resumes the work from its recorded state.

## Done and review (Stage 3 ATDD Verification)

Done means the executing writer verified the acceptance tests at the real
surface and recorded the environment receipt. Review follows the repository's
required checks and normal merge queue.

| Change | Verification |
| --- | --- |
| Documentation or configuration | Read the published content or authoritative configuration back after the write |
| Pre-launch code with no real users | Run the required automated acceptance checks in the target environment |
| Money, authentication or credential paths | Verify the affected authorization and commercial invariants through the supported test surfaces |
| Live-user or data changes | Verify the affected user-visible behavior, account continuity and authoritative data after rollout |

Use an observation window when the acceptance depends on a delayed signal;
derive its length from that signal. An independent audit can run alongside the
work. The executing writer records findings, repairs the same outcome and
verifies again when acceptance fails.

### Category-leader benchmark and external standards

For product or platform design, compare the result with the relevant category
leader or specification using [self-challenge](../../self-challenge/SKILL.md).
Use the actual requirement and affected behavior to choose checks for a routine
operation or internal fix.

Choose the smallest complete mechanism. A control needs a binding constraint or
a witnessed failure and a scope no tighter than that failure. A temporary
operational mitigation names its removal trigger and durable repair. Repair
shared engine gaps upstream and migrate affected callers together.

## Rulings, ideas and the record

- Record decisions and their authority beside the outcome. Distinguish an
  explicit instruction from a suggestion or exploratory question.
- File authorized deferred work with its start condition and economic inputs.
- Keep one authoritative work record, linked from related conversations and PRs.
- Automate prevention for recurring failures when the check is cheaper than
  recurrence. Reuse the owning check rather than adding another gate.
- Seek independent evidence when a blocker needs it. The accountable owner
  decides on evidence, records dissent and names the writer
  ([swarm-fuse](../../swarm-fuse/SKILL.md)).
- Record the command, scope and result for an absence claim. Re-run it when the
  affected code changes if absence is a continuing invariant.

## How it is judged

Work starts from a clear outcome, uses available resources, retains a writer
through waits and ends with verified acceptance. Rank and forecasts can be
explained from their recorded inputs.
