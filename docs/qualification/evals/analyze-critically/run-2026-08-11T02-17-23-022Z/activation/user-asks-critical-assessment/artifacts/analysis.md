# Critical Analysis Brief — Should the migration be re-planned?

- **Date:** 2026-08-11
- **Scope:** Assessment of the team's repeated delivery of half-finished
  migrations and whether "re-plan the migration" is the right response.
- **Evidence base:** The stated pattern ("the team keeps delivering half-finished
  migrations") plus the workspace state. The workspace contains no migration
  plan, ledger, proof artifacts, or post-mortems — this absence is itself a
  finding and is treated as an observation, not as proof of any specific cause.
- **Method:** analyze-critically (evidence ledger, competing hypotheses,
  premortem, devil's advocate), grounded in the fleet-migration pattern rules
  (`fleet-migration-*`).

---

## 1. Verdict

**Do not re-plan the migration wholesale as the default response. The pattern is
consistent with an execution and definition-of-done failure, which re-planning
does not fix.**

Recommended sequence instead:

1. **Audit first** — freeze the semantic denominator and build a state ledger
   that classifies every slice as `implemented / merged / deployed /
   authority_switched / source_retired` (`fleet-migration-4`, `-14`).
2. **Re-plan only what is structurally broken** — slice boundaries, contract,
   lifecycle choice, or missing terminal criteria. Those parts get a targeted
   re-plan; everything else gets a completion sweep with gates.
3. **Wholesale re-plan is warranted only if the audit finds** that the plan
   never defined terminal states, chose the wrong cutover lifecycle for the
   real risk, sliced on files/line counts instead of observable capabilities
   (`fleet-migration-1`), or has no contract source of truth — because then
   continued execution compounds cost and cannot be salvaged by gates.

Confidence in this verdict: **~65–70%** conditional on the pattern as stated
(see §8 for what would change it). The single largest uncertainty is the unseen
plan's structure.

---

## 2. Question and stakes

**Question:** Given repeated deliveries of half-finished migrations, should the
current migration be re-planned?

**Decision relevance:** Re-planning is not free. A full re-plan consumes team
time, resets ownership and proof state, and — if the failure is actually in
execution discipline — produces the same half-finished result, just with new
documents. Getting this wrong either (a) burns weeks re-planning a migration
that only needed completion gates, or (b) sends teams back to execute a plan
whose structure guarantees another partial delivery.

**Boundary:** This brief assesses whether re-planning is the right *response*,
not the detailed design of the migration itself. It also considers the
adjacent option the question implicitly excludes: stopping the migration
altogether and re-deciding (delete/refactor/retain) rather than re-planning.

---

## 3. Observed facts and evidence quality

| Item | Type | Quality | Effect on analysis |
| --- | --- | --- | --- |
| "The team keeps delivering half-finished migrations" | Observation (stated) | Secondhand, single source, no count or definitions | Constrains hypotheses: failure is repeated, so systemic causes are preferred over one-off mistakes |
| Workspace contains no migration plan, ledger, or proof artifacts | Observation (direct) | High for this workspace; does not prove none exists elsewhere | Favors control-plane failure: state is not being tracked, or artifacts live somewhere inaccessible |
| No definition of "half-finished" was provided | Unknown | High value, cheap to acquire | Without it, "done" is narrative; most failure hypotheses below are distinguishable only once it is defined |
| No post-mortems, diffs, or cutover evidence | Unknown | Acquisition cost moderate | Prevents distinguishing planning vs. execution failure directly |
| Domain base rate: documented common half-finished modes are merged-but-not-switched, implemented-but-not-proven, migrated-but-not-retired, docs-only, scaffold-only | Reference base rate (fleet-migration skill) | Independent of this team | These modes are definition/execution failures, not planning failures — weakens "the plan is wrong" as the leading cause |

**Inference discipline:** The absence of artifacts supports *but does not prove*
a control-plane defect; it is also compatible with a plan that lives in another
tool. Do not let this inference migrate into the facts column.

---

## 4. Competing hypotheses for the repeated half-finished deliveries

| # | Hypothesis | Prior | Would explain "repeated" | Is it fixable by re-planning alone? |
| --- | --- | --- | --- | --- |
| H1 | **Definition-of-done failure** — no shared terminal criteria; "done" means "merged/compiles," so each delivery stops before authority switch and retirement (`fleet-migration-4`, `-12`, `-14`) | High (base rate) | Yes | No — needs gates, not a new plan |
| H2 | **Execution/verification failure** — plan is fine, but teams advance slices on narrative status and stale proof; no proof binding, no invalidation (`fleet-migration-5`, `-6`) | High (base rate) | Yes | No — needs enforced evidence gates and WIP caps (`fleet-migration-15`) |
| H3 | **Structural planning failure** — slices are horizontal scaffolds, sized by lines/repos, no observable job per slice; lifecycle choice wrong (`fleet-migration-1`, `-2`) | Medium | Yes | Yes — this is the case where re-planning is the fix |
| H4 | **Incentive/process failure** — throughput measured by open PRs and started slices; teams rewarded for starting, not finishing | Medium | Yes | No — needs measurement and reward changes |
| H5 | **Wrong migration entirely** — the migration itself should not happen (retain, delete, or local refactor is stronger) | Low-Medium | Partly | No — needs re-decision, not re-planning |

H1 and H2 are mutually consistent contributors (a team without terminal states
also cannot prove completion), and together they are the most likely reading of
"half-finished." H3 is the only hypothesis where wholesale re-planning is the
correct remedy. The recommendation follows: **discriminate before re-planning.**

---

## 5. Discriminating evidence — what to check before deciding

Prioritized, cheapest first. Each observation separates at least one pair of
hypotheses above.

1. **Ask for the ledger:** Does a per-capability state record exist that
   separates implemented, merged, deployed, authority, and retired?
   - Exists, and slices sit at `authority_target` without `source_retired` →
     H1/H2 (finish, don't re-plan).
   - Does not exist → control-plane defect confirmed; build it, then re-judge.
2. **Ask for one completed slice's proof chain:** source/target revisions,
   artifact digest, contract digest, differential corpus, deploy readback
   (`fleet-migration-5`). Absent or "health check passed" only → H2.
3. **Ask what "done" means for one slice.** No terminal criteria → H1; the
   re-plan must start by defining them, not by re-drawing timelines.
4. **Ask what a slice is.** If slices are "create target workspace," "add
   health route," "rewrite 10,000 lines," or folder-only — that is H3, and a
   re-plan of slice boundaries is genuinely required (slice qualification
   table in `fleet-migration-patterns.md`).
5. **Ask how progress is reported.** If it is repo count, PR count, or
   narrative ("looks done"), that is `fleet-migration-14`/`-15` failure — fix
   measurement.
6. **Ask whether a contract source of truth exists and whether shared choke
   points (schema, registry, CI) were serialized** (`fleet-migration-3`, `-10`).
   If parallel teams edited shared contracts concurrently, that explains
   half-finished delivery without any planning failure.

If 1–3 fail, the failure is execution/definition — **completing with gates is
the answer, not re-planning.** If 4–6 fail, the plan structure is the cause and
a targeted re-plan of those elements is justified.

---

## 6. Strongest case for re-planning now (devil's advocate / Team A)

The honest case for "re-plan now" is not weak:

- **Sunk-cost escalation is real.** If the current plan's slices are
  structurally wrong (no observable job, no terminal state), adding gates to
  bad slices produces verified delivery of the wrong architecture. The
  migration-factory guardrail is explicit: a docs/folder/metadata-only slice
  "cannot complete a code-architecture slice" — continuing it is waste.
- **The missing artifacts are themselves a control-plane failure.** A migration
  with no ledger, no proof chain, and no shared contract cannot be executed
  safely by a fleet; the plan is not being *managed*. Re-planning that starts
  by building the control plane (denominator, ledger, contract, proof states)
  is not a ritual — it is the only way to make the next attempt verifiable.
- **Repeated failure changes the prior.** One half-finished migration is bad
  luck; repeated ones mean the process itself is defective, and "just finish
  it" has already been tried N times with the same result. A reset that
  re-scopes, re-baselines expectations, and defines completion is the
  discontinuity the pattern demands.
- **Planning-fallacy base rate:** migration plans are systematically
  over-optimistic; a re-plan that re-baselines schedule and risk on observed
  throughput (verified completions per cycle, not started slices) is cheaper
  than a third unverifiable delivery.

**Concession (Team A's weakest points):** Re-planning only wins if the audit
actually shows structural defects. If the plan is sound and teams merely stop
early, a re-plan spends the same energy as the gates that would have fixed it —
and risks demoralizing teams that correctly understood the work as incomplete
execution. Re-planning cannot fix H1/H2/H4 on its own.

---

## 7. Strongest case against wholesale re-planning (Team B)

- **The leading hypotheses do not implicate the plan.** The documented
  half-finished modes — merged-but-not-switched, implemented-but-not-proven,
  migrated-but-not-retired — are all failures to *finish* a well-formed slice,
  not failures to *design* one. Re-planning addresses none of them.
- **Re-planning without new completion criteria is a simulation.** If the
  re-plan does not add proof-bound states, an evidence gate per slice, and
  retirement criteria, it is the same plan with different dates. That is how a
  team "keeps delivering half-finished migrations" after a re-plan too.
- **The cheapest discriminating tests have not been run.** All six checks in
  §5 cost minutes and none require re-planning. Deciding before running them
  is the planning-fallacy version of confirmation bias: assuming the plan is
  the problem because the plan is the visible artifact.
- **Finish-first preserves proof value.** Slices already at `parity_proven` or
  `authority_target` hold stale-able evidence; a re-plan that re-baselines
  revisions invalidates that proof (`fleet-migration-6`) and forces
  re-verification of work that was correct. Completing and retiring those
  slices captures the value already spent.
- **The strongest alternative is re-decide, not re-plan.** If evidence shows
  the migration should not happen at all, "re-plan" is the wrong lever — the
  decision is to stop. A critical assessment must keep that option alive rather
  than funneling into plan-v2.

---

## 8. Assumptions, failure paths, and calibration

**Assumptions the verdict depends on (most fragile first):**
1. The stated pattern is accurately described and is not, e.g., one bad quarter
   reported as a trend. (Testable: count completions vs. starts per cycle.)
2. "Half-finished" refers to missing terminal states (authority switch,
   retirement) rather than, say, missing business requirements — the latter
   would push toward H3 and toward re-planning.
3. The workspace is the relevant control plane; a plan may legitimately live
   elsewhere, which would weaken the "control-plane failure" reading.

**Premortem — the recommendation failed; what happened:**
- The audit was skipped, gates were bolted onto structurally broken slices, and
  the team verified its way into the wrong architecture → this is the case
  where re-planning was right. *Leading indicator:* slice qualification fails
  (no observable job, no terminal state) but the completion sweep proceeds.
- The re-plan was approved anyway and produced plan-v2 with the same
  narrative-done culture → *leading indicator:* re-plan document contains no
  ledger, no proof schema, no gates.
- The migration was quietly continued and shipped half-finished for the Nth
  time because no one owned the audit → *leading indicator:* no ledger exists
  two weeks after this brief.

**Calibration:**
- Confidence in the factual premises (pattern as stated, workspace state):
  high for the workspace, medium for the pattern's accuracy.
- Confidence that H1–H5 cover the material space: ~80% (missing-hypothesis
  residual: e.g., the "migration" is a data migration, in which case the
  relevant domain is a data runbook, not fleet-migration patterns).
- Confidence in the conclusion conditional on those premises: ~65–70%.
- Confidence that re-planning alone would fix the pattern: low (~20–30%) — it
  fixes only H3, and only if executed as a real re-scope.

---

## 9. What would change the conclusion

The verdict flips to **wholesale re-plan** if any of these are observed:
- The audit shows slices defined on files/lines/repos with no observable
  capability boundary, or no slice has a terminal state defined (H3 confirmed).
- The lifecycle choice (one-step vs. expand-contract) mismatches demonstrated
  live-state risk — e.g., a destructive one-step cutover on a production
  surface that needs expand-contract, or dual-run infrastructure built where
  a one-step cutover was safe.
- No contract source of truth exists and shared choke points were edited
  concurrently (H3/H4 combined), making current work unverifiable at any cost.
- Post-mortems of previous "half-finished" migrations show the plan was
  executed as written and still stopped early — i.e., the plan's definition of
  done was genuinely wrong (H3 over H1/H2).

The verdict strengthens (finish-first) if the audit shows slices at advanced
proof states and the pattern is attributable to no completion gate or WIP cap.

**The single observation most likely to move the conclusion:** the answer to
"what does a completed slice look like, and can you show one from any past
migration?" If the team can define and show one complete proof chain, finish
with gates. If it cannot, the plan — and the definition of done it encodes —
must be rebuilt first.

---

## 10. Action if re-planning is chosen (make it non-ritual)

If the audit triggers a re-plan, the re-plan must include, or it is a ritual:
1. Frozen semantic denominator: capabilities plus behaviors, invariants,
   contracts, surfaces, effects — not files or lines (`fleet-migration-1`).
2. Vertically complete slices: observable job, boundary, target
   implementation, parity proof, authority switch, probe, recovery
   (`fleet-migration-2`, `-11`, `-12`).
3. One contract source of truth; derived bindings/fixtures
   (`fleet-migration-3`), with shared choke points serialized
   (`fleet-migration-10`).
4. Proof-bound state machine with revision/digest binding and forced
   invalidation on drift (`fleet-migration-5`, `-6`, `-13`).
5. Separate reporting of implemented / merged / deployed / authority /
   retired (`fleet-migration-4`, `-14`) and WIP capped by verification
   capacity (`fleet-migration-15`).

**Bottom line:** Re-plan the migration only where evidence says the plan is
the problem. Everywhere else, the fix is a completion regime: define done,
prove it per slice, switch authority, retire the source — and measure
completed throughput, not started work.
