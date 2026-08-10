# Deliberation Record: Adopt a New Search Engine for Product Search

- **Status:** Decision made (conditional adoption), pending benchmark gate
- **Date:** 2026-08-10
- **Question:** Should we replace the current product search engine with a new engine, and under what conditions?
- **Scope:** Product search across the storefront (query parsing, ranking, faceting, autocomplete). Out of scope: catalog data pipeline, sitewide site search, analytics.
- **Decision owner:** Product Engineering Lead (final authority)
- **Participants:** Search team lead, backend engineer, product manager, data/ML engineer, platform/ops engineer
- **Protocol:** IBIS-style argument graph (issue, positions, arguments for/against, responses); positions collected independently before group discussion
- **Visibility:** Internal record; shareable summary for stakeholders, no protected evidence included

## 1. Context

Current product search is served by the in-house engine built on the existing
index service. Recent complaints (relevance on long-tail queries, faceting
latency under load) and a rising maintenance cost prompted the question of
whether a newer, off-the-shelf engine would serve the product better.

## 2. Positions (independent first round)

| ID | Position | Proponent |
| --- | --- | --- |
| P1 | Keep the current engine and invest in tuning (relevance, caching, sharding) | Search team lead |
| P2 | Adopt a new search engine (candidate: modern off-the-shelf engine) for product search | Backend engineer |
| P3 | Adopt the new engine in a phased rollout behind a flag, with a hard benchmark gate | Data/ML engineer |

## 3. Argument map

### Issue I1: Should product search move to the new engine?

- **For P2 (adopt):**
  - A1: The new engine provides relevance features (typographical tolerance,
    synonym handling, relevance scoring) that the current engine lacks, closing
    the long-tail query gap reported in recent tickets.
  - A2: Operational load is lower: managed indexing, built-in replication, and
    simpler tuning reduce the maintenance burden on the search team.
- **Against P2 (keep current):**
  - O1: Migration risk: catalog data, ranking behavior, and facet configuration
    differ; a cutover could regress the top 50 most-searched queries without
    notice (Search team lead).
  - O2: Cost: new engine adds a new runtime and index storage; the current
    engine is already paid for and understood.
- **Responses:**
  - R1 (to O1): Run both engines side by side and compare against a recorded
    query corpus; cut over only when the new engine meets the benchmark gate on
    the same holdout queries (Data/ML engineer).
  - R2 (to O2): The added runtime cost is offset by removing in-house relevance
    maintenance; validate with a two-week pilot before committing (Backend
    engineer).

### Issue I2: If adopted, how do we roll out?

- **For P3 (phased, gated):**
  - A3: A benchmark gate (p95 latency, relevance score on holdout set, no
    regression on top queries) makes the decision reversible and evidence-based.
  - A4: A feature flag allows instant fallback to the current engine if live
    metrics regress.
- **Against P3:**
  - O3: Running two engines in parallel doubles index-sync and monitoring
    complexity during the transition (Platform/ops engineer).
- **Response:**
  - R3 (to O3): The parallel period is bounded (two weeks pilot, then cutover
    or rollback); no dual-engine path is kept after the decision date.

## 4. Evidence used

- Support tickets and query logs from the last 90 days showing the long-tail
  relevance gap and faceting latency at peak load.
- Vendor benchmark docs for the candidate engine (relevance, latency, index
  size); treated as vendor claims, not independent measurements.
- Effort estimate from the search team for tuning the current engine vs.
  migrating (both are material; tuning is cheaper short-term, migration is
  cheaper over 12 months).

## 5. Disputed claims and missing evidence

- **Disputed:** whether the new engine's default ranking actually beats the
  current engine on our catalog's query distribution. Vendor docs do not cover
  our corpus.
- **Missing discriminating evidence:** a measured comparison of both engines on
  the same holdout query set (relevance judgments, p95 latency, index size).
- **Agreed next evidence step:** build the holdout set (top 200 queries +
  sampled long-tail) and run the side-by-side benchmark.

## 6. Position changes

- Backend engineer (P2) updated to P3 after the ops objection: adoption is
  still the goal, but gated and reversible.
- Search team lead (P1) retained the position but accepted the benchmark as the
  deciding evidence; no longer blocks evaluation.
- No position changed solely on the vendor benchmark; the deciding factor was
  the agreed holdout experiment.

## 7. Agreements and dissent

- **Agreed:** the decision should be driven by the benchmark gate, not by
  vendor claims or preference; the pilot is time-boxed.
- **Resolved objection:** O1 (silent regression) is addressed by the side-by-side
  comparison and feature flag.
- **Unresolved / minority view:** Platform/ops engineer continues to flag the
  dual-engine complexity as the main risk and prefers tuning the current engine
  if the benchmark is within a small margin of the new engine (i.e., do not
  migrate on a tie).

## 8. Decision

**Decision owner (Product Engineering Lead) decided: adopt the new search
engine for product search, contingent on the benchmark gate passing.** If the
gate passes, proceed to phased rollout behind a feature flag with a bounded
cutover date. If the gate fails, keep the current engine and apply the tuning
plan instead. A tie result goes to keeping the current engine (minority view
upheld as the conservative default).

## 9. What happens next

| Action | Owner | Deadline | Exit criteria |
| --- | --- | --- | --- |
| Build holdout query set (top 200 + long-tail sample) with relevance judgments | Data/ML engineer | 2026-08-14 | Reviewable query list committed |
| Run side-by-side benchmark (relevance, p95 latency, index size) on both engines | Backend engineer | 2026-08-19 | Benchmark report with per-query results |
| Review benchmark against the gate and confirm or revert the decision | Product Engineering Lead | 2026-08-20 | Decision recorded in this file |
| If adopted: pilot behind feature flag, then cutover | Backend engineer + ops | 2026-08-27 | Live metrics match benchmark; flag off for old engine |
| If gate fails: execute current-engine tuning plan | Search team lead | 2026-09-03 | Measured relevance/latency improvement |

Open questions: final ranking-tuning budget if the new engine wins by a small
margin, and whether autocomplete migrates in the same release or the next one.
