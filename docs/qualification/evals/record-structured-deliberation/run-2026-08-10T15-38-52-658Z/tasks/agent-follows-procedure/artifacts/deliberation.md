# Deliberation Record — Adopt a New Search Engine for Product Search

- Record ID: `DEL-2026-08-10-001`
- Date: 2026-08-10
- Status: **Deliberation closed; decision NOT made — handed to owner**
- Record keeper: Facilitator `F` (neutral; no position, no vote)
- Raw first-round positions, transcripts, and protected evidence are retained in the authorized deliberation store per the visibility rule in §15; this record is the decision-useful projection.

## 1. Question

**I-1 — Should we adopt the shortlisted candidate search engine for product search, replacing the incumbent engine?**

## 2. Scope

**In scope**
- Engine choice for product catalog search on the storefront and search API.
- Conditions of adoption, migration path, reversibility, and the evidence gate.
- Relevance, latency, operational, and cost implications for the search service.

**Out of scope**
- Recommendation/related-products surfaces (separate deliberation).
- Non-catalog search (support docs, admin search).
- Procurement, licensing, and contract negotiation (referenced as an input only).
- Changes to the public query API contract (requires separate approval; compatibility adapter is in scope as a migration mechanism).

**Material constraints**: no search downtime beyond the agreed maintenance window; budget cap per the approved cost envelope; the public query API must remain stable or be protected by a compatibility adapter.

**What this discussion may decide**: the option set, the evidence plan, commitments, and a handoff. It may not itself approve adoption — that is the PM's call (§14).

**Deadline**: decision owner commits to a decision by 2026-08-24, after the evidence gate closes.

**Evidence boundary**: only artifacts locatable in the authorized store (§8) count as evidence; opinions and tenure do not.

## 3. Decision owner

- **PM** — Product Manager. Sole decision owner. `F` has no vote; a majority of participants is not a decision.

## 4. Participants

| ID | Role | Stake |
|---|---|---|
| PM | Product Manager | Decision owner; accountable for search experience and delivery risk |
| E1 | Backend engineer, search service owner | Builds/runs the service; carries migration effort |
| E2 | Engineer, frontend + relevance (query surface, ranking) | Owns query behavior, sort/filter parity, user-facing regression risk |
| DA | Data analyst | Owns evaluation sets, metrics, cost model, and analysis |
| F | Facilitator / record keeper | Neutral; runs protocol, records positions and links |

## 5. Protocol

- **Primary method: IBIS-style argument graph.** Chosen because the dominant failure mode for this decision is proposals and objections getting lost in prose; the record must preserve explicit proposal–reason–objection–rebuttal links (§7).
- **Independence control:** first-round positions were elicited independently — no participant saw another's position, and no proposed consensus or senior answer was revealed before round 1. Participants were assigned distinct evidence responsibilities to reduce correlated answers: E1 (engine capability/ops), E2 (query surface/latency), DA (evaluation/cost).
- **Challenge round: adversarial collaboration** on the single disputed empirical claim (§9), with a pre-registered discriminating test and interpretation rules agreed before results are collected.
- **Two rounds total.** Closed after round 2 because another round could not change the option set or the evidence plan without the gate results; residual dissent is recorded rather than forced to convergence (§11).
- **Not used:** Delphi (expert anchoring is not the dominant failure mode here), majority vote (a vote is not evidence), forced consensus.

## 6. Independently formed positions (round 1)

Each position records confidence and declared assumptions.

### P1 — Adopt the candidate engine now (E1)
- **Confidence:** 0.65.
- **Assumptions:** eval-set result transfers to production traffic; latency target is met by the load-test baseline; the query surface is thin enough for an adapter; ops team can run the new engine without new headcount.

### P2 — Do not adopt; keep the incumbent (E2)
- **Confidence:** 0.55.
- **Assumptions:** incumbent has no measured business regression; a relevance delta on an eval set is not proof of user-visible improvement; migration is effectively costly to reverse once data and pipelines are moved.

### P3 — Adopt only after a pre-registered evidence gate (DA)
- **Confidence:** 0.7.
- **Assumptions:** the gate is cheap relative to the cost of a wrong adoption; relevance, latency, and cost are all knowable in two weeks; inconclusive results must default to no adoption.

## 7. Argument map (IBIS)

Nodes are identified and explicitly targeted. Format: `ID — node (author) → target`.

### Positions (target: I-1)
- **P1** — Adopt the candidate engine now (E1).
- **P2** — Do not adopt; keep the incumbent (E2).
- **P3** — Adopt after a pre-registered evidence gate (DA).

### Arguments for P1
- **A1** (E1) → P1 — Measured relevance improvement on the evaluation set (NDCG@10, top-2000 queries). *Disputed — see D1.*
- **A2** (E1) → P1 — Capability fit: typo tolerance, facets, and ranking controls remove custom code the incumbent needs.
- **A3** (E1) → P1 — Lower operating cost: fewer nodes and less storage than the incumbent at current scale. *Disputed — see D3.*
- **A4** (E1) → P1 — Query surface is thin; an adapter layer preserves the API and isolates the cutover.

### Objections to P1 / its arguments
- **O1** (DA) → A1 — Eval set is skewed to popular queries; tail and zero-result queries are unrepresented, so the headline gain may not generalize.
- **O2** (E2) → P1 — P95 latency under peak shape is unmeasured; search is on the critical path and the SLA is non-negotiable. *Disputed — see D2.*
- **O3** (E2) → A4 — Migration cost is understated: reindex pipeline, relevance re-tuning, monitoring, and runbook work are not in A4's estimate.
- **O4** (DA) → A3 — Cost model omits migration, dual-run, and re-tuning labor; operating-cost comparison alone is not TCO. *Disputed — see D3.*
- **O5** (E2) → P1 — Behavior regressions (sort options, filters, pagination) are not covered by the eval set.
- **O6** (E2) → P1 — No demonstrated business regression from the incumbent; replacing a working system carries opportunity cost. *Disputed — see D4.*

### Rebuttals (targeting the objections above)
- **R1** (E1) → O1 — Add tail and zero-result queries to the eval set and accept both NDCG@10 and p(no-result); the corrected set is the gate input.
- **R2** (E1) → O2 — The load test is already scoped and cheap; include P95 and error-rate targets in the gate.
- **R3** (E1) → O3 — Dual-run behind a feature flag bounds blast radius and rollback is a config revert, offsetting migration labor.
- **R4** (E1) → O5 — The adapter plus contract tests makes the API surface diff explicit, not implicit.

### Arguments for P2
- **A5** (E2) → P2 — No measured conversion or revenue regression attributable to the incumbent. *Disputed — see D4.*
- **A6** (E2) → P2 — Relevance complaint volume is flat-to-declining over the last two quarters. *Disputed — see D4.*
- **A7** (DA) → P2, P3 — The switch is effectively costly to reverse after data reindex and team learning, so adoption needs a gate or a business reason to proceed.

### Rebuttals to P2
- **R5** (E1) → A6 — The complaint tracker only captures surfaced complaints; degradation of tail queries is invisible there (DA to verify with the tracker data).

### Arguments for P3
- **A8** (DA) → P3 — The discriminating experiment is cheap and the decision is reversible at this stage; evidence is the binding constraint.
- **A9** (E2) → P3 — Pre-registered interpretation rules convert the dispute into an agreed test rather than advocacy.
- **A10** (DA) → P3 — Relevance, latency, and cost unknowns are exactly the gate inputs; all three are measurable in two weeks.

### Objections to P3 and rebuttals
- **O7** (E1) → P3 — A gate delays value and duplicates work if the candidate is obviously better; run the checks in parallel with cutover preparation.
- **O8** (E1) → P3 — Live A/B on search is noisy in low-traffic categories; the gate may be inconclusive.
- **R6** (DA) → O7 — The gate reuses the already-planned load-test window; net delay is at most two weeks, while a wrong adoption costs a quarter.
- **R7** (DA) → O8 — Pre-register inconclusive handling: if any gate is inconclusive, do not adopt; supplement with shadow traffic and synthetic tail queries. No second unplanned round.

## 8. Evidence used, disputed claims, missing discriminating evidence

### Evidence locators (protected source)
| ID | Claim addressed | Locator | Status |
|---|---|---|---|
| E-1 | Relevance delta (A1 vs O1) | `protected://search-eval/2026-07-31-run3` | **Disputed**; validity questioned |
| E-2 | P95 latency / peak shape (O2) | `protected://ops/loadtest/2026-06-baseline` | Partial; candidate not yet loaded |
| E-3 | Cost model (A3 vs O4) | `protected://fin/cost-model-search-v2` | **Disputed**; assumptions differ |
| E-4 | Complaint trend (A6 vs R6) | `protected://support/search-complaints-2026H1` | **Disputed**; trend interpretation differs |
| E-5 | Query-surface inventory (A4/O3) | `protected://search/query-surface-inventory` | Agreed |
| E-6 | License/compliance review | `protected://legal/search-engine-license-review` | Agreed; pending procurement sign-off |

### Disputed claims
- **D1 — Relevance delta generalizes.** Pro side predicts the corrected eval holds; the skeptical side predicts the gain shrinks to noise on tail queries.
- **D2 — Latency at peak.** Pro side predicts P95 within the SLA on the candidate traffic shape; skeptical side predicts regression beyond the agreed 15% tolerance.
- **D3 — Total cost of ownership.** Pro side predicts 3-year TCO at or below incumbent; skeptical side predicts higher once migration and tuning labor are included.
- **D4 — Incumbent business impact.** Pro side claims hidden tail degradation; skeptical side claims no measured regression and flat complaint volume.

### Missing discriminating evidence (will be produced by the gate in §9)
Corrected evaluation on the full query distribution; load-test results on the candidate; an agreed-assumption 3-year TCO; verified complaint trend. No other missing evidence was identified that would change the option set.

## 9. Challenge round — adversarial collaboration

**Disputed claim (jointly narrowed):** "The candidate engine delivers a material, generalizable relevance improvement over the incumbent at acceptable peak latency and total cost."

**Predictions agreed before testing:**
- Pro side (E1): corrected-eval NDCG@10 ≥ +8% **and** P95 within 15% of incumbent at peak shape **and** 3-year TCO ≤ incumbent.
- Skeptical side (E2, DA): corrected-eval gain ≤ +3%, **or** latency regression beyond 15%, **or** TCO higher under agreed assumptions — any one suffices.

**Agreed method:** pre-registered corrected evaluation (tail + zero-result + holdout queries), load test on the candidate traffic shape, and a cost-model review under jointly agreed assumptions. DA runs the analysis; E1 and E2 audit; no participant interprets their own result.

**Interpretation rules:** adopt only if all three gates pass; inconclusive on any gate ⇒ no adoption, with at most one re-run on expanded traffic. The record notes explicitly: no vote, rhetoric, or seniority substitutes for these results.

**Status:** gate not yet run — it is the next action handed off in §14.

## 10. Position changes (round 2) and causes

- **E1 (P1 → P1′):** narrowed "adopt now" to "adopt now with the gate as a *parallel* check and a two-week cap; rollback if any gate fails." **Cause:** conceded the eval-set critique (O1) after the adversarial-collaboration design; still disputes sequencing (gate as precondition vs parallel check).
- **E2 (P2):** retained "do not adopt," softened to "no adoption unless the gate includes business-metric evidence (conversion/CTR on shadow traffic), not relevance metrics alone." **Cause:** agreed a pre-registered test is informative, but maintains O6 is the decisive unknown.
- **DA (P3):** retained unchanged. **Cause:** position already matches the agreed gate; nothing new to adopt.
- **PM:** no position taken in either round; owner holds the decision until the handoff (§14).

## 11. Agreements, unresolved objections, dissent

**Agreements**
- AG1: the pre-registered gate (corrected eval + load test + TCO) is the smallest useful evidence step.
- AG2: any adoption must preserve the query API or ship a compatibility adapter (A4/R4 uncontested).
- AG3: any adoption must be reversible (feature-flag dual-run; rollback = config revert).
- AG4: the PM is the decision owner; no vote.

**Unresolved objections**
- O6 — no demonstrated business regression from the incumbent: unresolved; E2 calls it decisive, and DA notes the gate measures relevance/latency/cost, not conversion directly. Mitigation agreed: add click-through read on shadow traffic if feasible.
- O8 — gate noise in low-traffic categories: partially resolved by the pre-registered inconclusive rule; E1 still objects that shadow CTR will be too sparse in two weeks.

**Dissent (recorded as information, not process failure)**
- E2 dissents from any adoption before business-metric evidence and will not support an ops cutover on relevance metrics alone.
- E1 dissents from treating the gate as a precondition rather than a parallel check and would accept only a two-week cap on it.

## 12. Commitments and owners

| # | Commitment | Owner | Due |
|---|---|---|---|
| C1 | Corrected eval set + pre-registered protocol (tail, zero-result, holdout) | DA | 2026-08-14 |
| C2 | Load test on candidate traffic shape (P95, error rate) + reindex dry-run | E1 | 2026-08-18 |
| C3 | Query API contract/behavior diff + rollback runbook | E2 | 2026-08-18 |
| C4 | 3-year TCO re-run under agreed assumptions | DA | 2026-08-18 |
| C5 | Decision on adoption, with reasons recorded | PM | 2026-08-24 |

## 13. Unresolved questions

- **UQ1:** Does the gate include a live CTR/conversion read, or relevance metrics only? (DA and E2 disagree; PM to rule.)
- **UQ2:** Is the gate a precondition (DA, P3) or a parallel check with rollback (E1, P1′)? (Sequencing trade — PM to rule after C2 results.)
- **UQ3:** Who owns the search latency SLA after migration? (E2 raised; needed to make O2 actionable.)
- **UQ4:** License/support lifecycle terms for the candidate (E2; requires procurement input outside this deliberation — referenced via E-6).

## 14. Handoff

Deliberation is closed: another round would not change the option set (`P1′` adopt-now-with-parallel-gate / `P2` reject / `P3` gated-adopt) or the evidence plan without gate results.

**Handed to PM (decision owner):**
1. Decide among P1′ (fastest time-to-value, bounded by rollback), P3 (evidence as precondition), and P2 (retain incumbent) by 2026-08-24, after reviewing C1–C4.
2. Rule on UQ1 and UQ2 when commissioning the gate.
3. Record the decision and its reasons in the durable decision record (ADR) once made; this deliberation record is the input, not the decision.

**Handed as work items (already committed):** C1–C4 evidence gate; C5 decision. Distribution entering the gate: E1 — P1′; E2 — P2; DA — P3. Residual dissent per §11 is preserved for the owner's review.

## 15. Audience classification, protected locators, shareable projection

- **Audience:** Internal, restricted — participants plus engineering leadership. Attribution is preserved (no anonymity needed; no hierarchy-conformity risk observed). Retention: per authorized deliberation store policy.
- **Protected-source locators:** §8 locators (`protected://…`) remain in the authorized store and are not reconstructable from this record.
- **Shareable projection (authorized):** "We evaluated replacing the incumbent product search engine. Three positions were considered — adopt immediately, keep the incumbent, and adopt after a pre-registered evidence gate. The team agreed on a two-week gate covering corrected relevance evaluation, load-tested latency, and a 3-year total cost model, with the query API preserved and a rollback path. No adoption has been decided; the PM decides by 2026-08-24."
