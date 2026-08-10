# Critical Analysis Brief — Why does the team keep delivering half-finished migrations?

Method: `analyze-critically` per `SKILL.md`, including the evidence-ledger,
competing-hypothesis matrix, Bayesian update, premortem, and stop-rule
requirements from `references/critical-analysis-method.md` and
`references/bayesian-evidence-updates.md`.

---

## 1. Question and stakes

**Question.** Why does the team keep delivering half-finished migrations?

**Decision.** Whether to re-plan the migration (as an answer to this pattern).

**Stakes.**
- If we re-plan the wrong object — e.g., re-estimating schedule and scope while
  the real failure is an undefined or wrong-boundary "done" — we burn planning
  cost and delay without changing outcomes, and we may institutionalize a
  third round of the same half-finish.
- If we do not re-plan when the pattern is real, we continue accumulating
  dual-path debt, unretired legacy behavior, and unreported production risk;
  each half-finished migration makes the next one harder to verify.
- If we re-plan on the basis of an unquantified anecdote, we may fix a phantom
  while the real driver (e.g., incentives or context loss) stays untouched.

**Boundary.** This brief diagnoses and challenges; it does not perform final
option selection, which belongs to a structured decision record. The
conclusion states what the analysis implies for the re-plan decision and what
evidence should gate it.

**Deadline.** Not specified. The analysis treats the decision as live now, and
recommends one cheap evidence step before committing the re-plan.

---

## 2. Observed facts and evidence quality

### Evidence ledger

| Item | Type | Quality | Effect on analysis |
| --- | --- | --- | --- |
| "The team keeps delivering half-finished migrations" | observation (reported) | single source, retrospective, no definition of "finished", no sample, no date range | the premise itself is the weakest fact; it must be treated as a claim to test, not a settled observation to explain |
| Prior-context instances from the user's environment (memory-derived, not verified this turn, may be stale): (a) multi-OS Rust migration left partial — Linux live refusal proved journal-only guest, full completion unproven; (b) OpenClaw copy-only migration succeeded but Telegram cutover was not completed; (c) provider source work was reported as production delivery before merge/migration/funding/live routing | observation (secondhand, from prior-run memory records, Jul–Aug 2026) | medium as historical records, low as evidence for *this* team's current practice; could be stale | makes the pattern plausible and gives it a mechanism: completion claimed at source/merge layer without live proof |
| "Finished" is undefined in the question itself | missing fact | acquisition cost: low (ask the team) | without it, "half-finished" has no stable meaning across instances; the pattern may be an artifact of inconsistent definitions |
| Base rate of completed migrations (of all migrations started) | missing fact | acquisition cost: low–medium (audit) | determines whether the pattern is systematic or survivorship bias |
| Who declares "done" and at which layer (source merged, ticket closed, live behavior proven, legacy path retired) | missing fact | acquisition cost: low (read past tickets/PRs) | discriminates completion-boundary causes from incentive causes |
| Evidence gates per migration (acceptance tests, post-cutover checks, retirement checks) | missing fact | acquisition cost: low | discriminates verification-gap cause |
| Incentive and accounting structure (what the team is measured on; whether unfinished work is tracked as debt) | missing fact | acquisition cost: medium | discriminates incentive cause |
| Correlation of stalls with personnel/context changes | missing fact | acquisition cost: medium | discriminates context-churn cause |

### Evidence quality summary

Evidence quality is **low**. The core observation is a single, retrospective,
undated claim with no defined completion standard, no sample, and no base
rate. The memory-derived prior-context instances are real recorded examples of
the *same class of failure* in the user's environment, but they are (a) not
verified in this turn, (b) from a bounded time window, and (c) not evidence
that this team's current migration practice is defective. No inference in this
brief is promoted to the facts column; the pattern's reality is itself one of
the competing explanations below.

---

## 3. Competing hypotheses or explanations

Materially distinct, decision-relevant hypotheses. H1–H4 are coexisting
contributors; H5 is the main alternative that would change the action.

- **H1 — Completion boundary misdefinition.** Migrations are declared
  complete at the wrong layer (code merged, ticket closed, "works locally")
  while live behavior, data backfill, and legacy-path retirement remain.
  Terminal criteria are vague or absent at the start, so "done" is a judgment
  call made by whoever is tired of the work.
  *Decision consequence:* re-planning must redefine the terminal contract, not
  the schedule.
- **H2 — Verification/evidence gap.** Even when criteria exist, no
  discriminating acceptance test or evidence gate can distinguish done from
  half-done. The state is undetectable, so it is unreviewable; nothing fails
  loudly when a migration stops short.
  *Decision consequence:* re-planning must add observable gates (post-cutover
  behavioral checks, legacy-path retirement proof), not more milestones.
- **H3 — Incentive and accounting misalignment.** The team is measured on
  starts and visible progress (velocity, milestone counts, new-work novelty),
  not on completions. Unfinished work carries no cost in any metric or ledger,
  so starting the next migration is individually rational.
  *Decision consequence:* a re-plan that does not change what is counted will
  fail; planning cannot out-compete incentives.
- **H4 — Context and authority churn.** The people who finish a migration are
  not the people who started it; decisions were never recorded, so the tail
  requires re-discovery that no one is budgeted to do. Work stalls as
  abandoned rather than consciously declared done.
  *Decision consequence:* re-planning should add context preservation and
  named completion ownership, not more phases.
- **H5 — Base-rate and selection artifact (opposing).** The pattern is
  overstated: finished migrations are unremarkable and invisible, failures are
  memorable and retold; the sample is selected toward failure. The true
  unfinished ratio is unknown and may be low; the "keep delivering" part of
  the claim may be noise.
  *Decision consequence:* re-planning would be theater; the correct action is
  no structural change.

Missing-hypothesis risk is retained: there may be a cause not listed (e.g.,
external scope pressure from above, or tooling that makes the last 10% of
migration work disproportionately expensive). It is carried as residual
uncertainty in the posterior.

---

## 4. Discriminating evidence

### Competing-hypothesis matrix

| Expected observation | H1 boundary | H2 verification | H3 incentives | H4 churn | H5 artifact |
| --- | --- | --- | --- | --- | --- |
| "Done" declared at merge/ticket close, defects reopened after | consistent | consistent | consistent | neutral | neutral |
| No terminal predicate written at migration start | consistent | consistent | consistent | neutral | neutral |
| Reviewers cannot state the live-completion predicate for a migration | neutral | consistent | consistent | neutral | neutral |
| Post-completion defects cluster in backfill/retirement (the unverified layer) | consistent | consistent | neutral | neutral | neutral |
| Metrics count starts/milestones; completions invisible in dashboards | neutral | neutral | consistent | neutral | neutral |
| Stalls correlate with personnel/context changes; no recorded decisions | neutral | neutral | neutral | consistent | neutral |
| Unfinished ratio (vs. defined-done) is low; anecdotes cluster around recent failures | neutral | neutral | neutral | neutral | consistent |
| Completed migrations have no surviving record of their completion evidence | neutral | consistent | consistent | neutral | consistent |

### Prioritized diagnostic evidence (cheap first)

1. **Completion audit (highest value, low cost).** Take the last 5–10
   migrations; pre-commit one terminal predicate per migration (live behavior
   proven + legacy path retired); measure the finished ratio. Also record, for
   each unfinished one, who declared it done and at which layer.
   - High unfinished ratio → H1/H2/H3 live; H5 weakens.
   - Low ratio → H5 leads; re-plan not warranted.
2. **Layer-of-done inspection.** Where was "done" declared: source/merge,
   staging, or live proof? Strongly separates H1 from H5.
3. **Terminal predicate at start.** Did any migration begin with a written,
   testable completion predicate? Separates H1 (absent) from H2 (present but
   unenforced).
4. **Stall-correlation check.** For each unfinished migration: did the owner
   change, and are decisions recorded? Separates H4.
5. **Metric experiment (if affordable).** Start counting completions and debt;
   observe behavior. If behavior changes, H3 is confirmed — and no amount of
   re-planning substitutes for it.
6. **Reopened-defect rate** in the first weeks after "completion" per
   migration. High rate corroborates H1/H2 at the layer where evidence is
   missing.

### Bayesian update basis

- **Prior basis.** Base rates for the *pattern being real*: planning-fallacy
  and integration-project tail literature (Flyvbjerg-class) make systematic
  migration under-completion common; the user's recorded prior instances (this
  brief's evidence ledger) make the pattern plausible in this environment.
  Prior: P(pattern real, not artifact) ≈ 0.60–0.75.
- **Observation updates (qualitative, single source ⇒ correlated).**
  - The undated, undefined, single-source claim: weakly favors H5 over H1–H4
    (claims without definitions are cheap to make); strength: small.
  - Memory-derived instances (source-level work reported as delivery; live
    proof missing): favors H1/H2; strength: moderate, but secondhand and
    possibly stale; one prior, not independent samples.
  - Absence of any completion audit or base-rate record: neutral-to-favors
    H2/H5.
- **Dependence caveats.** All current evidence traces to one reporting stream
  (the user's/team's own retrospective). It is not N independent observations;
  it must not be multiplied as such.
- **Posterior ranking (range, deliberately wide).**
  1. H1 Completion boundary misdefinition: 30–40%
  2. H2 Verification/evidence gap: 20–30%
  3. H5 Base-rate/selection artifact: 15–25%
  4. H3 Incentive/accounting misalignment: 10–20%
  5. H4 Context/authority churn: 5–15%
  Composite H1+H2 (completion claimed without discriminating live proof):
  ≈ 55–65% conditional on the pattern being real.
- **Sensitivity.** If the audit shows a low unfinished ratio, H5 jumps to the
  leading position and H1–H4 collapse. If the audit shows a high ratio with
  "done" declared at merge, H1 becomes dominant. The ranking is fragile by
  design until the audit runs — which is exactly why the audit is the gate.

---

## 5. Strongest case for and against the leading conclusion

**Leading conclusion:** the pattern is real, and the dominant mechanism is a
composite of H1 (completion defined at the wrong boundary) and H2 (no
discriminating verification), with H3 (incentives) as an amplifier. H4 is a
secondary contributor; H5 remains live until the audit.

**Strongest case for.**
- The mechanisms are individually common and well documented: merge-to-live
  gaps, "last 10% is 80% of the work," and unverified completion are a known
  failure class, not an exotic one.
- The user's own recorded history contains concrete instances of exactly this
  shape (source-level work reported as delivery; live refusal proving a
  migration incomplete) — consistent, though secondhand, evidence that the
  mechanism exists in this environment.
- No rival hypothesis in the set explains the memory-derived instances as
  well: H5 does not explain why *specific recorded* migrations were declared
  done while live proof was missing; H1/H2 do.

**Strongest case against (devil's advocate).**
- H1/H2/H3 are generic and can be asserted of almost any team; a generic
  mechanism asserted about an unquantified pattern is unfalsified, not proven.
- The only direct observation is one undefined retrospective claim. With no
  base rate, the same evidence supports H5 with less machinery: people
  remember failures and forget quiet completions.
- The memory-derived instances are a different team/period (Jul–Aug 2026,
  other repos) and may be stale; they prove a past event, not a current
  tendency.
- Re-planning under this conclusion risks the same category error the brief
  identifies: producing a more detailed plan without changing the definition
  of done or the evidence gates — i.e., half-finishing the re-plan.

---

## 6. Assumptions and failure paths

### Key assumptions (ranked by sensitivity)

1. **Causes are addressable by planning.** Load-bearing: if H3 (incentives)
   or H4 (churn) dominates, re-planning plans will not fix the cause. Most
   fragile; test first via the audit and metric review.
2. **"Half-finished" has a stable meaning across instances.** If definitions
   vary, the observed pattern is partly a measurement artifact.
3. **The migration under the re-plan decision resembles the historical ones.**
   A different kind of migration (different team, scope, or risk profile)
   invalidates historical causes.
4. **A completion audit is feasible.** Requires pre-committing terminal
   predicates and access to past tickets/PRs/live state; if records are
   absent, that absence is itself H2 evidence but makes the audit harder.

### Failure paths (premortem — the re-plan fails)

- The re-plan re-estimates dates and phases; completion criteria remain
  vague; the same half-finished outcome recurs with a new Gantt chart. The
  re-plan itself becomes the visible deliverable, satisfying H3's incentive
  structure.
- The audit is conducted without pre-committed predicates, produces a
  hand-waved ratio, and is itself half-finished — the pattern reproduces in
  the diagnostic.
- Re-planning adds process overhead (gates, reviews) that slows finishing,
  and the team responds by gaming the new gates (declaring success at the
  first checkable layer).
- The team re-plans on the anecdote alone, the true base rate is low, and the
  cost lands on a phantom; meanwhile the real cause (e.g., context loss) is
  untouched.
- Leading indicators to watch: re-plan documents with no change to the
  completion contract; audit without pre-committed predicates; new milestones
  but no new evidence; unfinished migration count unchanged after the re-plan.

---

## 7. Conclusion and calibrated confidence

**Conclusion.** The pattern is probably real and probably driven primarily by
completion being defined at the wrong boundary (source/merge instead of
live-proof plus legacy retirement) and verified without discriminating gates,
with incentive misalignment amplifying it. Confidence in the factual premises
is **low** (single undefined claim, secondhand history); confidence that the
hypothesis set covers the material space is **moderate** (H1–H5 plus retained
missing-cause residual); conditional on the premises, confidence in the
composite leading cause is **moderate** (60–70%). Unconditioned, the
posterior mass on the composite is roughly **35–50%** because the pattern
itself is unquantified (H5 holds 15–25%).

**Decision implication (re-plan or not).**
- Re-plan **now, but the right object**: the migration's *completion contract
  and evidence gates* — a written, testable terminal predicate per layer
  (live behavior proven, legacy path retired, data reconciled) and a gate
  that refuses "done" without it. Confidence this is the correct object:
  moderate (60–70%).
- Do **not** re-plan primarily for schedule/scope re-estimation: confidence
  that this addresses the leading causes: low (20–35%).
- Gate the commitment on the completion audit (Section 4, item 1): it is
  cheap and can reverse the conclusion. If the audit shows a high unfinished
  ratio, proceed with the completion-contract re-plan; if low, stop and treat
  the pattern as an artifact.

**Stop rule.** The analysis stops here: the next highest-value observation
(the completion audit) is cheap, decision-moving, and requires team records
not available to this brief. Per the method, when a cheap discriminating
observation could reverse a material conclusion, analysis yields to evidence
collection rather than more speculation.

---

## 8. What would change the conclusion

- **Audit shows a low finished ratio** (e.g., ≥80% meet a pre-committed
  predicate): H5 becomes leading; the correct action is no re-plan and a
  communication fix (stop retelling failures as the norm).
- **Unfinished items cluster at one layer** (e.g., all in data backfill or
  all in dual-path retirement): the composite decomposes; the fix targets
  that layer's evidence gate, not the whole plan.
- **"Done" was declared at merge in most cases**: H1 is confirmed dominant;
  re-planning should rewrite the terminal contract and add a live-proof gate.
- **Terminal predicates existed but were unenforced**: H2 dominates; the fix
  is enforcement and review, not new criteria.
- **Stalls correlate with owner/context changes**: H4 dominates; the fix is
  context preservation and named completion ownership, and the re-plan should
  include it.
- **Adding completion metrics changes behavior**: H3 is confirmed; re-planning
  alone is useless and the accounting structure must change.
- **The migration under decision differs in kind** from the historical ones
  (new team, new scope, new risk profile): historical causes do not transfer;
  the analysis must be redone for that migration.
