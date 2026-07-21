# CI Admission Standard

No-human CI admission: presubmit vs postsubmit tiers, risk classification,
preview policy, affected selection, merge-queue integrity, recovery, and gate
hardening.

Composes with:

- [`agent-first-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/agent-first-development-standard/references/full-standard.md)
  for parallel coordination, work packets, and repo adoption.
- [`source-authoring-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/source-authoring-standard/references/full-standard.md) for the exact
  source candidate whose proof may be coalesced only before selection.
- [`ci-runner-capacity-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/ci-runner-capacity-standard/references/full-standard.md) for CI
  compute ownership and queue diagnosis.
- [`frontier-verification-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/frontier-verification-standard/references/full-standard.md)
  for reviewer-confidence backstops.
- [`delivery-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/delivery-standard/references/full-standard.md) for production verification.
- [`parallel-change-integration-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/parallel-change-integration-standard/references/full-standard.md)
  for candidate deduplication, cumulative snapshot verification, scoped green
  watermarks, and parallel recovery under its successor profile.

## CI Pipeline Architecture — Reviewer + Serializer

The PR/merge-queue topology below is the compatibility adapter, not the
only permitted implementation of no-human proof. Under the parallel-change
adapter, when selected by the active profile, remote CI evaluates selected immutable trunk snapshots and advances
scoped green watermarks; it does not run once per speculative attempt or imply
deployment from every default-branch commit. Required proof depth, affected-set
soundness, global gates, flake control, backstops, and recovery remain binding.

When there are no human reviewers and everything ships to production, CI is doing
two jobs that pull in opposite directions, and most CI pain comes from making one
pipeline do both:

- **The reviewer** — the only thing between an agent's diff and production. Wants
  to be **deep** (more gates → more confidence).
- **The integration serializer** — every change queues behind it; its latency
  *is* development velocity. Wants to be **fast**.

The strongest practical design is to **split them into two tiers** and put an autonomous
admission control plane in front of them: fast deterministic admission for the
exact merge candidate, complete postsubmit proof, and machine-selected recovery.
The active delivery profile supplies forge-specific context names and
serialization mechanics; this standard owns the portable admission semantics.

### Gate portfolio discipline

CI executes evidence; it must not become a collection of independently invented
semantic authorities. One material invariant has one proof owner and, where
blocking, one stable fan-in result. Reuse or strengthen that owner before adding
another job, script, report, test, or required context.

A custom gate is justified only when all are true:

- it detects a named material failure inside the declared risk floor;
- existing compiler, type, schema, semantic static analysis, dependency graph,
  and behavior/contract proof do not already detect that failure;
- its input is semantic and authoritative rather than implementation spelling,
  copied reports, or author-asserted status;
- it is deterministic, bounded, low-noise, reproducible on the exact candidate,
  and its marginal risk reduction exceeds CI, maintenance, and coordination cost;
- its owner and durable or temporary lifecycle are explicit.

Do not use unit-test frameworks to scan production source text for required or
forbidden tokens, imports, call order, file placement, or named helpers. Use
compiler/module visibility, AST-aware restricted imports, dependency/build
graphs, package exports, or executable behavior/public-surface contracts.

Migration-only gates additionally declare an exact retirement predicate. Once
the old authority is removed and target behavior is proven, retire parity
workflows, no-old-path scans, migration ledgers, rebind jobs, and duplicated
fixtures. Preserve durable compatibility, migration-safety, and product
behavior proof. Do not add a meta-lint or service to police gate count; bounded
portfolio review and direct deletion own cleanup.

### Autonomous admission control plane

The active profile declares a small stable fan-in surface for risk
classification, exact-candidate admission, postsubmit proof, and recovery
decision. It may collapse these into one context when that is clearer. Branch
protection consumes stable fan-in contexts, never an unbounded list of raw jobs.

### Preview admission policy

Preview environments are runtime evidence, not a universal CI tax. The
admission manifest MUST classify whether a candidate preview is required, skipped, or
optional from trusted changed-surface data.

Require a candidate preview when changed runtime, user-visible, or externally
integrated behavior has a material claim that cannot be proved adequately by
faster exact-candidate tests, rendering, replay, simulation, or an ephemeral
integration environment. High-risk auth, billing, security, migration,
infrastructure, and public-contract changes normally meet that bar. A routine
development-stage behavior change does not require a hosted preview merely
because users could eventually see it.

Skip PR preview for docs/control-plane-only candidates that cannot affect a
running service: prose docs, ADRs, PROJECT/AGENTS files, project manifests,
manifests, repo metadata, comments, typo fixes, link fixes, and other
non-runtime policy/catalog updates. The preview status producer MUST publish
successful `sylphx/preview` and `sylphx/build/preview/<service>` contexts for
these candidates without allocating build, preview, or runtime capacity.

Optional previews are allowed only for low-risk content/copy changes where the
classifier can prove no route, rendering path, checkout/onboarding flow,
contract, or runtime config changed. If that proof is absent, fall back to
required preview.

Preview evidence never replaces production deploy proof. `sylphx/preview`
belongs to candidate admission; `sylphx/deploy` and live health/readback belong to the
post-merge deployment lifecycle.

### CI compute ownership

[`ci-runner-capacity-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/ci-runner-capacity-standard/references/full-standard.md) owns CI
compute in full: default Sylphx compute plane, mandatory runner profiles,
profile-ID contract, new-profile process, and pickup/backlog diagnosis —
cited, not restated. A repo-level runner-class exception is an exception
record (see [`agent-first-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/agent-first-development-standard/references/full-standard.md) "Policy And Exception Records") and does not change the
admission model.

The active profile owns the admission-manifest schema and risk-lane vocabulary.
Each lane binds its material controls, such as compatibility, idempotency,
recovery, provenance, workflow integrity, and progressive exposure when a live
risk requires it. Risk classification is a router; a missing required control
fails admission regardless of label or assertion.

### Two-tier pipeline (presubmit fast, postsubmit complete)

- **Presubmit / blocking tier** (PR + merge-queue candidate): the minimum that
  must be green to land — typecheck, lint, affected tests, contract/schema and
  migration-safety gates, the global gate classes below. Optimized for latency.
- **Postsubmit / continuous tier** (on `main` after merge, plus scheduled): the
  **complete affected** run for the merged state — every test/build/eval selected
  by the sound dependency graph for the changed surface, plus scheduled or
  policy-triggered full runs to audit selector misses. Heavy security scans,
  mutation, cross-platform, E2E, and performance run here. Optimized for
  completeness, not latency.
- A presubmit miss is acceptable **only because the postsubmit tier is the
  backstop**: a slipped regression is caught minutes-to-hours after merge by
  exhaustive affected postsubmit + automated culprit-finding/bisection + runtime
  rollback, selective source revert, or forward-fix — never permanently. The
  reference model is a fast soundly selected presubmit plus complete affected
  postsubmit and periodic full audits, not a vendor-specific miss budget.
- Do not pay the heavy suite twice. The merge-queue candidate is the state that
  actually lands (Not-Rocket-Science Rule) and is the authoritative full
  presubmit run; the PR run exists for fast author feedback.
- Do not rebuild release artifacts merely because the stage changes. Where
  policy allows, reuse artifacts by provenance key: repo, base SHA, head SHA(s),
  merge-group SHA, tree/content digest, lockfile/toolchain/container digests,
  lane, and policy version. Squash merge means final `main` SHA may differ from
  the merge-group SHA; content/provenance is the stable key.

### Affected-target selection (speed, never correctness)

Affected/changed-only selection is a **presubmit speed optimization**, with hard
safety conditions:

- **No selection without a postsubmit backstop.** A repo that cannot run a full
  (or periodic full) suite post-merge may not affected-skip at presubmit.
- **Selection safety equals graph completeness.** File/target-level selection is
  safe only where the dependency graph is a *sound over-approximation* of runtime
  deps — explicit declared deps + enforcement that undeclared inputs fail
  (sandbox / remote execution, e.g. Bazel/Buck2). Where the graph is best-effort
  (loose JS/TS via package.json, e.g. Nx/Turborepo), selection MUST stay
  coarse (package/project-level) and is a speed heuristic, **not** a safety
  guarantee.
- **Never affected-skip the global gate classes** — they depend on whole-repo
  state, not on which package owns the diff. Run them on every PR regardless:
  (a) codegen / generated-code drift (`git diff --exit-code`), (b) lockfile /
  dependency integrity, (c) schema / API contract breaking-change checks,
  (d) DB migration safety, (e) secret scanning + a periodic full SAST baseline.
- **Graph-blind change classes force a broad/full run:** reflection / DI /
  dynamic-dispatch-heavy code, lockfile or dependency bumps, build/toolchain/CI
  changes, generated code, and data/config/resource files. A lockfile or
  root-build-config change marks **everything** affected.
- **ML/predictive selection runs on top of the graph candidate set, never below
  it**, is presubmit-only, and must enforce a measured catch-rate threshold
  (Meta PTS: >99.9% of faulty changes). The full affected set still runs
  postsubmit.
- **Affected selection is never a correctness, security, compliance, or contract
  control.** State this so no future gate is placed behind it.
- **Validate the selector periodically** against a full run (selected-only vs
  all). If the full run catches something selection missed, that is a graph or
  hermeticity defect to fix — selection accuracy is itself a monitored property.
- **Postsubmit exhaustive affected is mandatory before selector trust.** The
  postsubmit affected set must be a superset of presubmit's selected set and
  broad enough to support culprit finding. Scheduled full runs measure what the
  affected graph missed; they do not justify weakening the immediate backstop.

### Required-check wiring (structurally un-skippable)

- A required status check MUST report a real pass/fail on **every** PR and
  **every** merge-queue candidate. Do not gate behind workflow-level `on: paths`
  filters — a path-skipped required check hangs "Pending" forever and blocks
  merge. Filter **inside** a job with `if:` (a skipped job reports success), or
  use a single always-running aggregator gate job ("Merge OK") that fans in the
  real results.
- **Every required check must have a producer that runs on `merge_group`.** A
  required context with no merge-group producer — including an external status
  posted by another system — stalls the queue under ALLGREEN. Conformance audits
  MUST verify trigger wiring (does a workflow emit each required context on
  `merge_group`?), not just merge-queue settings.
- **Every required check must have an active producer.** A context produced only
  by a disabled, inactive, path-skipped, or manually paused workflow is branch
  protection drift. Fix the producer or migrate branch protection to a stable
  fan-in context; do not add repo-specific preview/build workarounds just to
  satisfy stale required checks.
- Prefer one or a few stable aggregator contexts over dozens of raw job names.
  Job names may change; branch protection should not. The aggregator is
  responsible for surfacing the failed lane and linking to the manifest.

### Recovery semantics (source revert is only one path)

Every failure chooses among source revert, runtime rollback, and forward fix.
Source revert is appropriate only when effects, migrations, public contracts,
and later dependent work remain reversible. Runtime rollback restores the last
verified artifact without pretending source has changed. Forward fix is
required when committed external state or compatibility makes rollback unsafe.
The decision and exact recovery proof are machine-visible.

Runtime rollback must also roll back
**derived runtime state**. Semantic caches, prompt/result caches, and
memoized outputs keyed only on inputs will keep serving the reverted
version's outputs after the artifact flips back ("ghost-serving"). Key such
caches by artifact digest / policy version, or invalidate them as an
explicit rollback step; a rollback that leaves stale caches serving is not a
completed rollback.

### Merge-queue signal integrity (flaky tests are the #1 no-human hazard)

A flaky required check is a high-severity signal-integrity failure: it can
stall serialization with no human retry path, and speculative queues amplify
the damage. Required checks therefore need deterministic inputs, explicit
timeouts, capped retries, flake scoring, quarantine with owner/expiry/budget,
culprit attribution, and queue telemetry.

- **Classify red from evidence.** A single failure may be product breakage,
  infrastructure failure, or a flake. Reproduce and attribute it; do not blindly
  convert red into either merge permission or permanent blockage.
- **Blanket retry-until-green is forbidden.** Cap per-test retries (~3) with
  a hard ceiling and a whole-suite circuit breaker; every pass-after-retry is
  a tracked metric. **A 25%-broken test still passes ~99.6% of the time
  under 3 retries** — retries hide real breakage, they do not fix it.
- **Attribution mechanism**: clean-check before gate (a change passes alone
  before entering the speculative queue); re-execute with/without the patch
  to attribute a failure (fails with, passes without ⇒ blame the patch;
  otherwise exonerate as tip-of-tree flake); eject-and-retest rather than
  head-of-line block; status-check timeout so a hung check fails-and-ejects
  instead of hanging forever.
- **Adjudication has a clock, not a committee.** A threshold crossing creates a
  typed flake finding with observed time, test/candidate identity, evidence,
  owner, policy-selected response deadline, quarantine budget/expiry, and
  repair/un-quarantine predicate. Owner resolution uses the project manifest
  and active policy; unresolved mapping is a typed residual, never invented.
  The selected repository/runtime mechanism executes that contract. Missing
  automation remains live work owned by the active coordination authority, not
  timeless prose authorizing a permanent by-hand fallback. Sustained
  quarantine growth is telemetry that the suite, not the test portfolio, is
  wrong.

### Throughput and batch escalation

Per-repo merge throughput is bounded arithmetic — ceiling ≈ batch size ×
86400 / validation-cycle seconds — and portfolio throughput comes from sharding
across repos, not from one heroic queue; the model, worked numbers, and the
escalation ladder (raise batch size → HEADGREEN → split the repo →
speculative scheduling, each with a trigger and prerequisite) are decided in
the merge-throughput-model ADR. Operating rules this standard owns:

- Do not raise batch size above 1 until the ADR's batch failure policy is
  active on that repo — including its verification drill (a recorded
  red-batch run on the repo's actual queue configuration in the tuning PR)
  and its attribution, innocent-ordering, and flake-accounting rules.
- Ladder steps are entered on their measured triggers and stepped back down
  when arrival falls; batch-size changes are tuning PRs with the queue
  history cited, not silent setting flips.

### Cross-product edges in delivery paths

A required check may consume another product (a review service, an analysis
engine — any mutual-customer edge). Two invariants keep such an edge from
turning the portfolio's cores-stay-one-way rule into a delivery-time
deadlock:

- **The edge must be shed-able.** The consuming repo documents the degraded
  behavior for when the consumed product is down or slow: fail-open to a
  neutral, terminal conclusion within a bounded timeout, an advisory-first
  default, or a smaller deterministic gate set — documented to the
  [`documentation-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/documentation-standard/references/full-standard.md) runbook bar
  (citing the commands, dashboards, logs, or health checks that prove it). A
  remote-backed or nondeterministic check is never the sole required safety
  gate.
- **Recovery must never route through the consumer.** The consumed product's
  own fix-and-deploy path must not require the consuming repo's delivery
  pipeline to be green. If the two ever couple, the pairing has become a
  mutual boot dependency and violates `P-PORTFOLIO`, however clean the
  API boundary looks.

### Reviewer-confidence layer (mandate by surface)

Tests prove code runs; these prove it is correct enough to merge unseen.
[`frontier-verification-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/frontier-verification-standard/references/full-standard.md)
owns property/model tests, deterministic simulation testing, spec/eval
gates, and automated canary analysis — selection rules, required fields,
and adoption contracts, cited not restated. What it does not cover, mandated
by blast radius here:

- **Diff-scoped mutation testing on high-blast-radius modules** (billing,
  auth, permissions) — the mechanized "did this change weaken the tests?"
  Mutate only changed, covered lines, ≤1 mutant/line; full-repo mutation
  stays optional.
- **Fuzz harness on untrusted-input boundaries** per the
  [`engineering-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/engineering-standard/references/full-standard.md) testing ladder; only
  a bounded seed-corpus regression is the admission gate.
- **An LLM reviewer may be an *additional* confidence gate, never sole or
  hard-blocking.** Its non-determinism makes it the exact flaky-gate class
  Merge-queue signal integrity exists to eliminate, and PR text is an
  injection surface. If used: structured pass/fail rubric with `file:line`
  evidence bound to head SHA, deterministic config, PR text as data never
  instructions, and the same flake/quarantine discipline as any check.

These methods strengthen admission evidence; they do not replace
branch protection, merge queue, postsubmit proof, or recovery.

### Reward-hacking and execution-trace integrity (agents optimize the visible metric)

The gate signal an agent optimizes toward is the gate signal you will
eventually lose. Reward hacking is a benchmarked frontier-model behavior class
(RHB, SpecBench, 2026): under pressure to go green, models take hidden
shortcuts — editing tests, weakening assertions, gaming the visible metric —
while the real objective regresses. Design gates assuming this:

- **A green terminal status is necessary, never sufficient** for high-blast-
  radius admission. The gate must also inspect the candidate's execution
  trace: files changed vs declared scope; edits to tests, fixtures, snapshots,
  thresholds, or gate/workflow config that accompany behavior changes; deleted
  or skipped assertions; unexplained network access or tool calls during
  validation.
- **A change that weakens the checks that judge it routes to the `L5` lane
  automatically**, regardless of diff size — test deletions/skips, coverage or
  threshold loosening, quarantine-list edits, workflow/permission changes. The
  gate-weakening diff itself becomes the primary reviewed object.
- **Validation evidence must be reproducible from the candidate** (commands,
  environment, trace), never author-asserted. An author agent's "tests pass"
  is data, not a control.

### CI backpressure and guarding the gates

- **Cap concurrent open PRs per agent/author.** Unbounded agent PR creation
  starves shared CI/runner capacity; cap at the source (complements
  cluster-level batch admission), auto-labeling/closing excess.
- **Guard the gates.** CI workflow files are production code. Validate them
  through the existing workflow parser/security owner and stable fan-in rather
  than adding one repo-specific meta-check per workflow or incident. A broken
  or injectable gate is material; duplicate gate-policing machinery is not.


## Package checklist

| Rule ID | Check |
| --- | --- |
| `ci-admission-01` | Strongest relevant subset applied |
| `ci-admission-02` | Facts in schema/test/ADR homes |
| `ci-admission-03` | Proof layers separated |
| `ci-admission-04` | Unknown authority fails closed |
| `ci-admission-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
