# Critical Analysis Brief — Why does the team keep delivering half-finished migrations?

**Method:** analyze-critically (SKILL.md) with the critical-analysis-method reference.
**Bounded search performed:** workspace contains only SKILL.md (no migration plans, logs, or
repo history available in this run); evidence below is drawn from prior verified delivery
audits recorded in the memory registry (2026-08-04 → 2026-08-10) and is not re-verified
live in this run. No claims about the current migration's plan or the team's process were
directly observed here.

---

## 1. Question and stakes

**Question:** Why does the team keep delivering half-finished migrations?

**Decision relevance:** whether to re-plan the current migration. The answer determines
*what kind of re-plan* is warranted (re-sequencing tasks vs. redefining the terminal and
ownership), and whether re-planning will reproduce the failure.

**Stakes:** Each half-finished migration leaves a live residual (old path still serving,
fleet partially cut over, customer-visible path broken at one hop) that costs more to
repair later than to finish at the time. Wrong diagnosis → re-plan that fixes the wrong
variable, repeated cost, and eroded trust in delivery claims. The decision is reversible
(cheap to re-plan, expensive to keep executing a broken plan), so the analysis should
favor action only when it changes the terminal contract, not when it just re-labels work.

**Boundary:** This brief diagnoses the pattern and its decision relevance; it does not
design the re-plan. It is time-sensitive only in that each extra week of execution under
a terminal-less plan adds residual cost.

---

## 2. Observed facts and evidence quality

### Evidence ledger

| Item | Type | Quality | Effect on analysis |
| --- | --- | --- | --- |
| W4/serverless half-cutover (2026-08-06): `SPIRON_WORKER_TASK_CONSUMERS=0`, worker `min_instances=0` while Platform sole-claim still called worker-bound `/internal/w4-stream-execute`; 0/0 replicas, no Service endpoints; API health 200 while Telegram silent | observation | high (dated, cross-checked runtime state) | constrains H1/H4/H5: completion was declared at a layer that did not include the customer path |
| Telegram silence end-to-end (2026-08-10): Spiron and Data Edge repaired, Gateway certified model lane still blocked; no customer reply | observation | high (cross-project trace) | constrains H4: local subsystem completion ≠ migration completion across boundaries |
| Knative STZ fleet wave (2026-08-09/10): PR #5952 `8b141abec…` merged; `mobileapp-staging` api/sdk showed ksvc Ready, routes, deployment at zero, public 200; merged controller image not proven live; health probes blocked clean idle→0; fleet-wide completion explicitly "partial" | observation | high (SHA, per-service state) | constrains H1/H3: bounded canary was reported as the proven wave, fleet terminal separate |
| SportBet PR #5887 / `FEATURE_SCHEMA=v8-rpr-ts` (2026-08-10): RPR/TS "smoke equality" was data absence (`rpr_today=-1`), not feature value; historical coverage failed | observation | high (schema/coverage audit) | constrains H3: shallow checks produced false completion signals |
| Completed migrations exist with the same team: Data Endpoint clean-break (`0e38c80`, `c3a3750`, AUTH-before-ROLE, `/fabric/metrics`), Keel R0 contract proof, Ozyrix sole adapters live, Spiron clean-break sealed, Telegram hard-cut verified | observation | high (per-case evidence chains) | constrains H-capability: the team finishes when the terminal is defined and enforced |
| Repeated recorded lessons: "source merge ≠ live promotion", "HTTP 200 is not completion", "scorecard is time-bounded", "bounded canary ≠ fleet completion", "one-hop repair ≠ end-to-end recovery" | observation (of team's own post-mortems) | medium-high (self-reported, consistent across many independent incidents) | constrains H1/H3: the failure mode is known and re-occurred anyway |
| User's own standing preferences: uncapped objectives, "do not reduce the vision", keep the full terminal objective active across handoffs | observation | high (repeated, direct) | constrains H5: some "partial" states are deliberate checkpoints of an uncapped objective |
| Team process data (planning docs, task assignment, deadlines, incentive structure, who owns completion) | unknown | n/a | bounds H2 and H4-ownership claims; not directly observed |
| Current migration's plan document and terminal definition | unknown | n/a | bounds decision relevance; not present in workspace |

### Quality and selection effects

- Facts are memory-derived from prior verified rollouts, not re-verified in this run.
  They are specific (PRs, SHAs, dates) but may be stale for current state; treat as
  strong historical signal, not live status.
- Base rate is uncertain and **selection-biased**: memory records audits, and audits were
  triggered by suspicion of incompleteness. We cannot infer "the team *usually* half-
  finishes" from a sample selected for problems. What is defensible: the pattern is
  recurrent across 6+ independent incidents in one week, and completed cases prove the
  team can finish.
- No direct evidence about incentives, bandwidth, or personnel churn — hypotheses that
  depend on those are necessarily weaker.

---

## 3. Competing hypotheses or explanations

Material, decision-relevant hypotheses (contributing causes can coexist; only H5 is the
opposing explanation):

- **H1 — Terminal defined at the wrong layer.** Migrations are planned with "done"
  meaning source merged / CI green / bounded canary / local health, not the full
  migration terminal (whole fleet, predecessor retired, live customer-path soak).
  Half-finished deliveries are finished *by the plan's own definition*.
- **H2 — Attention/incentive structure.** Work stops at the first layer that is
  locally verifiable because the next task, merge, or visible milestone pulls attention
  away; durable completion (soak, retirement, evidence) has low visibility and no
  assigned reward or owner.
- **H3 — Verification gap masquerading as completion.** The team lacks per-layer
  evidence tooling for the migration boundary (source / CI / deploy / live / soak), so
  shallow proxies (HTTP 200, health checks, smoke equality, green scorecard) are taken
  as proof. "Half-finished" is a measurement artifact: they believe it is done.
- **H4 — Custody failure across boundaries.** Migrations span multiple owners
  (Spiron / Platform / Data Edge / Gateway; controller + service rows + routes + pods).
  Each owner declares their hop complete; no single accountable owner enforces the
  end-to-end chain, so the migration is owned everywhere and nowhere.
- **H5 — Status quo / opposing explanation.** The migrations are *not* half-finished as
  a defect: "partial" is the correct current state of deliberately uncapped or bounded-
  wave objectives, and the pattern is inflated by auditing only the problematic cases.
  What looks like "keeps delivering half-finished" is bounded checkpointing plus
  selection bias; the fix is reporting honesty, not re-planning.

H1 and H4 are mutually reinforcing (an ownerless boundary produces layer-level
definitions); H3 is the mechanism that lets H1/H4 pass; H2 is a plausible accelerant;
H5 is the strongest alternative reading and must not be dismissed, because the user's
own standing preference is uncapped objectives with checkpoints.

---

## 4. Discriminating evidence

| Expected observation | H1 (definition) | H2 (incentives) | H3 (verification) | H4 (custody) | H5 (status quo) |
| --- | --- | --- | --- | --- | --- |
| Completion announced at merge/canary/health, with remaining layers explicitly untested | consistent | consistent | consistent | consistent | inconsistent (would be labeled checkpoint) |
| Same team completes when terminal is crisply contracted (Data Endpoint, Keel, Ozyrix) | inconsistent (predicts universal partiality) | neutral | neutral | neutral | consistent |
| Residuals live at *different* systems than the announcing one (Telegram: Gateway blocked after Spiron/Data Edge repaired) | consistent | neutral | consistent | **strongly consistent** | neutral |
| Post-mortems already name the exact gap ("source merge ≠ live promotion"), yet it recurs within days | consistent (plan unchanged) | consistent (process unchanged) | **strongly consistent** (known but unbuilt) | neutral | neutral |
| "Done" claims rest on checks that cannot see the missing layer (0/0 worker, no endpoints, health 200) | consistent | neutral | **strongly consistent** | consistent | inconsistent |
| User explicitly demands uncapped terminals and bounded waves | neutral | neutral | neutral | neutral | **strongly consistent** |

**Reading:** the observations that discriminate best are (a) the same team *does* finish
when the terminal is a written contract, and (b) residuals recur at boundaries between
owners with layer-local proof only. Together they favor **H1 + H4 with H3 as mechanism**:
the plan's terminal and the ownership of that terminal are missing, and verification
tooling is too shallow to expose it. H5 is partially supported (checkpoint framing is
real) but cannot explain the cases where a bounded checkpoint was *reported as the
completion* of the whole migration — that is reporting error, which H5 predicts away.
H2 is plausible but has no direct evidence either way, so it stays as residual risk, not
a ranked cause.

---

## 5. Strongest case for and against the leading conclusion

**Leading conclusion:** The team keeps delivering half-finished migrations because the
migration terminal is defined and owned at the wrong boundary. Success is declared at
the first layer that is locally verifiable (source, CI, canary, local health), the
remaining layers (fleet rollout, predecessor retirement, live customer-path soak) have
no single accountable owner, and verification tooling is too shallow to mark the gap —
so "half-finished" is systematically misreported as "done".

**Strongest case for (Team A):**
- Every documented incident fits: W4 declared at config/health while the execute
  callback still pointed at a 0/0 worker; STZ wave declared at ksvc/route/200 while the
  controller image and clean idle→0 were unproven; Telegram recovery declared per-hop
  while the customer path stayed blocked; RPR/TS equality was data absence.
- The same team completes when the contract exists (Data Endpoint, Keel, Ozyrix,
  sealed Spiron cut): capability and intent are not the limiting factors; the terminal
  definition and its single owner are. The discriminating variable across cases is
  whether an end-to-end evidence chain was contracted up front.
- Re-planning therefore has a clear, testable target: write the terminal contract
  (all layers, all fleet, predecessor retired, soak criterion, evidence chain, named
  owner) before executing; that alone changes the observed failure pattern.

**Strongest case against (Team B):**
- The evidence is retrospective and selection-biased: we audited failures, so we
  "observe" failures. Completed migrations may be the norm and the half-finished ones
  the survivorship-heavy exception.
- The user's own uncapped-objective preference means some partial states are *by
  design* checkpoints of an open terminal — calling them "half-finished migrations" may
  mislabel a deliberate bounded-wave strategy, and a re-plan could shrink the vision
  (which the user has explicitly forbidden).
- H2 (attention/incentives) and organizational causes have zero direct evidence here;
  if the real cause is bandwidth or ownership churn, a terminal contract alone will not
  finish the migration.

---

## 6. Assumptions and failure paths

**Key assumptions (most fragile first):**
1. Prior-incident evidence is accurate and representative (risk: memory drift; mitigated
   by dated PRs/SHAs, but not re-verified live).
2. The current migration resembles past ones (untested — its plan was not available in
   this workspace).
3. Completion failures are definition/ownership failures rather than capability or
   staffing failures (partially tested by the completed cases).
4. Reporting was the problem, not the objective itself (H5 remains alive).

**Premortem — the re-plan fails if:**
- It re-sequences per-hop work but keeps per-layer "done" definitions and no end-to-end
  owner → same half-finished delivery, now with a longer plan.
- It shrinks the terminal to a bounded canary and calls that the objective → repeats the
  exact "bounded ≠ fleet" mistake recorded in the STZ wave.
- It adds reporting/process ceremony without building the per-layer evidence chain →
  more overhead, same blindness (the team already *knows* the lessons and still recurred).
- It is built on the un-refreshed memory facts and the current state has drifted (e.g.,
  controller already promoted, Gateway lane already certified) → re-planning solves a
  problem that no longer exists.

**Failure paths of not re-planning:** residual costs compound (dual paths, stale
ownership labels, silent customer path, scorecards that expire), and each new migration
copies the previous incomplete template.

---

## 7. Conclusion and calibrated confidence

**Conclusion:** The recurrent half-finished deliveries are best explained by **H1 + H4
with H3 as mechanism** — the migration terminal is defined at a layer too shallow to be
the real terminal, no single owner enforces the end-to-end chain, and verification
tooling cannot expose the missing layers. H5 (bounded checkpoints of an uncapped
objective, inflated by audit selection) is a real and partially supported alternative
and must be handled by separating *checkpoint reporting* from *completion claims* rather
than by abandoning the uncapped objective. Re-planning is warranted, but only a re-plan
that changes the terminal contract and names an end-to-end owner is worth doing;
re-sequencing alone would reproduce the pattern.

**Calibrated confidence (decomposed):**
- Confidence in the factual premises (incidents occurred as recorded): **0.85** — dated
  and cross-checked, but memory-derived, not refreshed live.
- Confidence that considered hypotheses cover the material space: **0.65–0.70** — no
  direct process, incentive, or staffing data; a missing-organizational-cause risk.
- Confidence in the conclusion conditional on those premises: **0.70**.
- Overall: **moderate-to-high (~0.60–0.70)**, stated as a range because the weakest link
  is coverage (unknown process/capability variables), not the observed facts.

---

## 8. What would change the conclusion

- **The current migration's plan** already containing a terminal contract and a named
  end-to-end owner → the decision relevance drops; the pattern would then point to
  execution, and re-planning becomes unnecessary.
- **Direct planning/process evidence** (tickets, plans, acceptance criteria) showing the
  terminal was defined and still missed → shifts the cause from H1/H4 to execution,
  capability, or H2.
- **Evidence on incentives/attention** (e.g., task handoffs at merge, no one assigned to
  soak/retirement) → promotes H2 to a co-leading cause and changes what the re-plan must
  fix.
- **A base-rate measurement** (e.g., census of all migrations with completion status,
  not just audited failures) showing most migrations complete → weakens the premise
  itself and elevates H5/framing.
- **Live refresh of the specific residuals** (controller image promotion, Gateway lane
  certification, worker callback path) showing any of them now closed → narrows or
  shifts the pattern before the re-plan is committed.

The single most valuable cheap check before deciding: **read the current migration's
plan and acceptance criteria, and ask who owns the customer-visible terminal.** That
observation discriminates H1/H4 from H5 directly and costs minutes.
