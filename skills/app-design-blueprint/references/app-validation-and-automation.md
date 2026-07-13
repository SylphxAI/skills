# App Validation And Automation

## 1. Evidence labels

- `given` — supplied constraint; identify authority.
- `observed` — direct artifact, telemetry, policy, interview, or test result.
- `assumed` — necessary but unverified input with owner/expiry.
- `hypothesis` — falsifiable relationship between mechanism and outcome.
- `decision` — chosen action under constraints and evidence.

Proof states:

```text
hypothesis
-> design-validated
-> implementation-verified
-> scale-verified
-> production-proven
```

`design-validated` is not shipped code. `implementation-verified` is not scale proof. `scale-verified` requires representative measurement against the declared numeric envelope. `production-proven` requires released identity and observed live behavior.

## 2. KPI tree

Define one north-star outcome only if it represents user value, then use diagnostic and countermetrics:

| Branch | Signals | Countermetrics |
| --- | --- | --- |
| Acquisition/message | qualified visit/install, expectation comprehension | mismatch, bounce, uninstall, misleading claim |
| Activation | first useful result, first saved continuity, successful setup | permission denial, error, abandonment, support |
| Core value | outcome completion, quality, saved effort, repeat depth | rework, undo/error, accessibility exclusion |
| Retention | return by natural cadence, reason, resurrection, depth | notification dependence, fatigue, unhealthy use |
| Collaboration/viral | reciprocal use, recipient activation/value, team depth | spam, block/report, privacy incidents |
| Commercial | intent, purchase, fulfillment, retained net value | refund, chargeback, regret, concentration, support |
| Quality | startup/input/sync/crash/offline/recovery | battery, thermal, data loss, low-end failure |
| Trust | consent, export/delete, support resolution, appeal | complaints, opt-out, enforcement reversal |

Use conditional branches only for selected capabilities. A narrow utility with commerce, collaboration, social spread, or notifications marked `not-applicable` does not acquire those systems to populate a KPI tree; value, quality, accessibility, privacy, safety, and recovery evidence still cover the selected app.

Metric contracts need name, purpose, source, event/schema version, identity and consent behavior, numerator/denominator, exclusions, owner, freshness, tests, and response action. A dashboard without an action contract is observation, not automation.

## 3. Risk-adjusted decision model

Use constrained optimization, not a single unconstrained expected-value score.

### Admission predicate

```text
admitted(action) =
  lawful_and_currently_authorized
  AND safety_and_child_floors_pass
  AND consent_and_privacy_pass
  AND claims_and_user_treatment_are_non_deceptive
  AND blast_radius_is_bounded_and_recoverable
```

An explicitly prohibited platform behavior is not a “warning-priced” experiment. Genuine ambiguity must have a current authority record, interpretation, expiry, bounded cohort, automatic pause, and maximum loss.

For admitted actions compare:

```text
RAV = E[incremental durable user value + contribution + option value]
    - E[fees + infra + fraud + refunds + support + remediation + reputation loss]
    - risk_aversion * CVaR_tail_loss
```

Record uncertainty and correlated portfolio blast radius. Platform account loss, credential compromise, child harm, unlawful data use, and irreversible user-data loss are not linear per-campaign costs.

Human staffing, calendar, implementation cost, missing users, uncertain demand, and speculative or missing ROI evidence do not reduce selected construction scope. They also do not select an irrelevant capability. Real external spend, scarce runtime resources, user attention, authority, and ruin probability still constrain activation.

## 4. Implementation and validation handoff

Produce:

- draft artifact identity or sealed envelope, canonical state owners, and an acyclic dependency graph;
- a complete sweep with one disposition and exact reason per capability;
- complete target behavior, versioned interfaces, automation, and acceptance criteria for every `integrate-now` capability, plus exact integration and proof for `reuse-scale-ready`;
- dependency order, collision points, and typed handoffs to the owning implementation skills or projects;
- small end-to-end slices that verify the riskiest product assumptions without reducing selected final scope;
- migration and compatibility constraints for existing users, data, integrations, and clients;
- a proportionate validation matrix covering behavior, usability, accessibility, localization, privacy, security, performance, failure, and recovery;
- selected-capability availability, contract-ready dormant behavior, degradation, and recovery expectations;
- release-observation requirements and the user-visible rollback, compensation, or forward-fix behavior for failure.

Never invent a digest for a draft or update an upstream blueprint solely to back-reference a downstream specialist. Specialists consume the blueprint directly. When shared orchestration context is required, they may also consume an immutable planning Product Program Manifest revision N; they never mutate or back-reference that revision. Observed-state Product Program Manifest revision N+1 may then index the specialist outputs and their immutable inputs. This revision direction preserves an acyclic graph.

Do not present design intent or self-reported implementation status as observed proof. The handoff must name the evidence needed from the owning implementation and release surfaces, while leaving their CI, branch, deployment, and infrastructure mechanics to those owners.

## 5. Continuous product-learning loop

```text
selected and available feedback + support + reviews + behavior + quality + commercial + safety
-> consent-aware normalization and privacy redaction
-> taxonomy, dedupe, cohort/context enrichment and anomaly detection
-> evidence cluster and causal hypothesis
-> candidate issue/design/config/content/model change
-> reproduce/simulate/adversarially test
-> evidence review against declared acceptance gates
-> bounded canary/holdout
-> promote, hold, degrade, compensate, or rollback
-> live readback and customer close-loop
-> versioned learning record
```

Agents may automate triage and candidates; they must preserve raw evidence lineage, uncertainty, dissenting segments, false-positive handling, and privacy. Qualitative signals explain mechanisms; quantitative signals estimate prevalence; controlled experiments estimate causality where feasible.

Do not let a model optimize its own evaluation metric, rewrite consent/entitlement/safety constraints, or silently convert feedback into public claims.

## 6. App availability policy

Only `integrate-now` and `reuse-scale-ready` capabilities enter the app availability controller. `contract-ready`, `not-applicable`, and `floor-blocked` remain absent from the user experience and runtime rather than masquerading as gated integrated features. Selected app availability is deterministic and authority-bounded, not an engagement manipulation controller.

```text
immutable law/safety/consent/child floors
-> platform/territory/device capability
-> identity, permission, role and entitlement
-> semantic prerequisite
-> service health and compatibility
-> available or degraded
```

Presentation may adapt to context, skill, device, and user choice, but cannot deny a selected capability through level, tenure, streak, churn risk, spend, arbitrary onboarding completion, or engagement score. Require monotonic policy versions, atomic snapshots, cross-device consistency, safe missing-signal defaults, last-known-good behavior, audit/replay, degradation, and a kill switch.

## 7. Validation stages

| Stage | Primary proof | Cannot prove |
| --- | --- | --- |
| Contract/model | state completeness, invariants, dangerous interactions | usability or value |
| Prototype | workflow/comprehension hypothesis | production quality or retention |
| Exact slice | real integration, migration and recovery | whole-product coherence |
| Full candidate | selected cross-system behavior, platform quality, scale/failure envelope | market success |
| User study/canary | comprehension, usefulness, trust, causal movement in cohort | universal transfer |
| Production readback | live candidate behavior inside observed envelope | future conditions |

For every stage state hypothesis, artifact, cohort/fixture, pass/watch/fail predicates, countermetrics, machine action, and rollback/compensation.

## 8. Complete blueprint template

```text
1. Draft artifact identity or sealed envelope and evidence ledger
2. User/job/context and falsifiable promise
3. Product objects, state authorities, workflows and information architecture
4. First-value beat map and friction budget
5. Capability portfolio
   - disposition and exact reason
   - complete selected target / build / availability / presentation / proof
   - scale/failure envelope and exact proof for selected capabilities
   - zero-cost boundary, dormant state, migrations, telemetry, recovery as applicable
6. Selected recurring-value, Durable Investment and Experience Expression contracts
7. Collaboration/social/sharing disposition and, when selected, Cross-Promotion Placement Contract
8. Monetization disposition and, when selected, Value Exchange, commerce integration and Refund Consequence contracts
9. Release Benefit, review, private feedback and continuous-learning dispositions and conditional handoff requests
10. Selected HTML5/mobile/tablet/desktop/input/offline/sync matrix and dispositions for unselected adapters
11. Accessibility, applicable age modes, i18n/culturalization, security/privacy and selected-SDK matrix
12. Implementation dependency DAG, typed handoffs, validation evidence and maintenance automation
13. KPI/event/experiment contracts and countermetrics
14. Specialist handoff-request manifest; exact inputs bind
    `fulfillsHandoffId`, with digest fields only for sealed inputs
15. Validation roadmap, hard blockers, unresolved hypotheses and next proofs
```

## 9. Quality rubric

Score 0 missing/contradictory, 1 plausible/incomplete, 2 evidence-labelled/testable:

1. user, promise and outcome;
2. objects, workflows, IA and recovery;
3. first value and friction;
4. recurring value and durable investment;
5. exhaustive sweep, defensible dispositions, selected capability completeness and correct app availability semantics;
6. selected commerce/social/feedback integration, exact non-applicable reasons and specialist boundaries;
7. selected HTML5/platform/input/offline quality and defensible adapter dispositions;
8. accessibility/i18n/privacy/applicable-age/low-end quality;
9. metrics, evidence and causal validation;
10. scale-ready implementation, maintenance, recovery and handoffs.

A forward-test candidate should reach at least 17/20 with no hard-gate failure. The rubric evaluates the blueprint, not whether the product will succeed.

## 10. Authority record

```text
surface and product capability:
platform/storefront/territory/audience:
publisher and canonical URL/section:
effective_at, retrieved_at, expires_at, content_digest:
material requirement or ambiguity:
policy action, fallback and tests:
```

Refresh living authority before release or risk-sensitive automation. Static URLs in the skill are discovery routes only.
