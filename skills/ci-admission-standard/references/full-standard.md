# ci-admission-standard (canonical body)

**Authority:** binding Standard Skill package `ci-admission-standard` in `SylphxAI/skills` (`skills/ci-admission-standard/`).

**Cutover:** migrated from Doctrine `standards/ci-admission-standard.md` at digest `sha256:732bc0f590886a0c75cb418623a9bb671a010ba7444907474bcf0113a48a2011` (doctrine `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7`). Doctrine file is alias-only after cutover.

Author here; do not maintain a second prose SSOT.

---

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
- [`roleless-speculative-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/roleless-speculative-development-standard/references/full-standard.md)
  for candidate deduplication, cumulative snapshot verification, scoped green
  watermarks, and roleless recovery under its successor profile.
- ADR-2, ADR-18, ADR-29 — cited throughout, not restated.

## CI Pipeline Architecture — Reviewer + Serializer

The PR/merge-queue topology below is the compatibility adapter, not the
only permitted implementation of no-human proof. Under the roleless speculative
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

The SOTA answer is to **split them into two tiers** and put an autonomous
admission control plane in front of them: fast deterministic admission for the
exact merge candidate, complete postsubmit proof, and machine-selected recovery.
This composes with ADR-2 (merge-queue governance), ADR-18 (no-human industrial
gates), and ADR-29 (Autonomous CI Admission And Recovery); it does not fork
them.

### Autonomous admission control plane

ADR-29 owns the admission contract in full: the four stable fan-in contexts
(`risk-classification/pass`, `trunk-admission/pass`, `postsubmit-proof/pass`,
`recovery-decision/pass`), the single-context fallback, and when embedded
status publication beats a standalone fan-in job — cited, not restated.
Branch protection requires these stable contexts, never raw per-job checks.

### Preview admission policy

Preview environments are runtime evidence, not a universal CI tax. The
admission manifest MUST classify whether a candidate preview is required, skipped, or
optional from trusted changed-surface data.

Require a candidate preview when the candidate changes any runtime, user-visible, or
externally integrated surface: UI rendering, route behavior, API or event
contracts, auth, billing, security policy, deployment/runtime configuration,
infrastructure, migrations, feature-flag defaults, SDK/CLI behavior consumed by
users, or cross-repo contracts. These candidates may still use affected service
selection, but the preview/build capacity decision is explicit and bounded.

Skip PR preview for docs/control-plane-only candidates that cannot affect a
running service: prose docs, ADRs, PROJECT/AGENTS files, `.doctrine/**`
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

ADR-29 owns the admission manifest schema, the `L0`-`L5` risk-lane table,
and the per-lane mandatory controls (expand/contract, idempotency,
progressive rollout, contract compatibility, release provenance, workflow
sanity) — cited, not restated. Risk classification is a router; a missing
control fails `risk-classification/pass` regardless of label or assertion.

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
  rollback, selective source revert, or forward-fix — never permanently.
  Google's TAP runs an affected subset at presubmit (accepting a ~5% miss) and
  **all** affected tests post-submit; this is the reference model.
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

ADR-29's "Recovery Semantics" section owns the three-path decision (source
revert / runtime rollback / forward-fix), when auto-revert is forbidden,
migration/side-effect forward-only rules, and the `trunk-admission/pass`
recovery mode — cited, not restated here.

One rule ADR-29 does not spell out: runtime rollback must also roll back
**derived runtime state**. Semantic caches, prompt/result caches, and
memoized outputs keyed only on inputs will keep serving the reverted
version's outputs after the artifact flips back ("ghost-serving"). Key such
caches by artifact digest / policy version, or invalidate them as an
explicit rollback step; a rollback that leaves stale caches serving is not a
completed rollback.

### Merge-queue signal integrity (flaky tests are the #1 no-human hazard)

A flaky required check is the highest-severity failure in this model: it
stalls the queue with no human to re-run, and speculative queues *amplify*
flakes. At Google scale **~16% of tests show some flakiness and 84% of
pass→fail transitions are flake, not breakage** — a naive "red = block" gate
is wrong most of the time. ADR-29's "Flakes And Queue Health" section owns
the baseline requirement list (deterministic required checks, timeout,
capped retries, flake scoring, quarantine with owner/expiry/budget,
innocent-never-blamed attribution, queue telemetry) — cited, not restated.
What that list does not spell out:

- **Treat red as probabilistic, not binary.** A pass proves no-regression; a
  single failure is a hint. The quarantine threshold is configurable, not
  hard-coded.
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
- **Adjudication has a clock, not a committee.** A test crossing the flake
  threshold enters quarantine within 24 hours of the crossing being noticed
  — no automated flake-scoring event log exists yet to timestamp the
  crossing precisely, so noticing starts the clock (disclosed, not yet
  built). Owner defaults from the matching `boundaries.owns[].name` in the
  project manifest (mapping a test to its bounded context is a judgment
  call today), expiry defaults by policy — the record fields are ADR-29's —
  and un-quarantine follows the same clock once the fix lands. At fleet
  scale even a small flake rate is a daily stream of these decisions, so
  the adjudicator is a mechanism, not a review meeting; an agent may act
  ahead of it for one crossing, but must never become a standing gate other
  work has to wait on. Until the automation ships, the agent observing the
  crossing performs the same adjudication by hand inside the same 24-hour
  clock. Sustained quarantine growth is telemetry that the suite, not the
  fleet, is wrong.

### Throughput and batch escalation

Per-repo merge throughput is bounded arithmetic — ceiling ≈ batch size ×
86400 / validation-cycle seconds — and fleet throughput comes from sharding
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

These methods strengthen the evidence ADR-29 collects; they do not replace
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

### Fleet backpressure and guarding the gates

- **Cap concurrent open PRs per agent/author.** Unbounded agent PR creation
  starves shared CI/runner capacity; cap at the source (complements
  cluster-level batch admission), auto-labeling/closing excess.
- **Guard the gates.** CI workflow files are production code: lint them
  (actionlint / workflow-sanity / a workflow-security scanner) as their own
  required check. A broken or injectable gate is the biggest risk in a no-human
  system.


## Package checklist (Skills cutover)

| Rule ID | Check |
| --- | --- |
| `ci-admission-01` | Strongest relevant subset applied |
| `ci-admission-02` | Facts in schema/test/ADR homes |
| `ci-admission-03` | Proof layers separated |
| `ci-admission-04` | Unknown authority fails closed |
| `ci-admission-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
