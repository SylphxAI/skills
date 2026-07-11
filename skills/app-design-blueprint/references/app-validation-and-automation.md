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

`design-validated` is not shipped code. `implementation-verified` is not scale proof. `scale-verified` requires exact-candidate measurement against the declared numeric envelope. `production-proven` requires deployed candidate identity and live readback.

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

Human development effort and missing ROI evidence do not reduce construction scope. Real external spend, scarce runtime resources, user attention, authority, and ruin probability still constrain activation.

## 4. Autonomous build graph

Produce:

- product artifact envelope and canonical state owners;
- full target architecture and versioned contracts;
- dependency DAG, parallel lanes, disjoint file/schema/service ownership and collision points;
- verified vertical slices with exact candidate identity;
- migration/compatibility plan using expand/contract where needed;
- contract/property/model/e2e/accessibility/localization/security/load/soak/chaos/recovery tests;
- feature/capability states and dormant-state budget proof;
- GitOps/merge-queue path, signed provenance, canary and live readback;
- rollback for reversible code/config, compensating transitions for committed facts, and forward-fix for irreversible state.

No agent may be sole proposer, validator, promoter, and watchdog. Use scoped short-lived authority; gates and hard floors remain outside candidate mutation authority.

## 5. Continuous product-learning loop

```text
explicit feedback + support + public reviews + behavior + quality + commercial + safety
-> consent-aware normalization and privacy redaction
-> taxonomy, dedupe, cohort/context enrichment and anomaly detection
-> evidence cluster and causal hypothesis
-> candidate issue/design/config/content/model change
-> reproduce/simulate/adversarially test
-> independent validation and exact-candidate gates
-> bounded canary/holdout
-> promote, hold, degrade, compensate, or rollback
-> live readback and customer close-loop
-> versioned learning record
```

Agents may automate triage and candidates; they must preserve raw evidence lineage, uncertainty, dissenting segments, false-positive handling, and privacy. Qualitative signals explain mechanisms; quantitative signals estimate prevalence; controlled experiments estimate causality where feasible.

Do not let a model optimize its own evaluation metric, rewrite consent/entitlement/safety constraints, or silently convert feedback into public claims.

## 6. App availability policy

App availability is deterministic and authority-bounded, not an engagement manipulation controller.

```text
immutable law/safety/consent/child floors
-> platform/territory/device capability
-> identity, permission, role and entitlement
-> semantic prerequisite
-> service health and compatibility
-> available or degraded
```

Presentation may adapt to context, skill, device, and user choice, but cannot deny capability. Require monotonic policy versions, atomic snapshots, cross-device consistency, safe missing-signal defaults, last-known-good behavior, audit/replay, degradation, and a kill switch.

## 7. Validation stages

| Stage | Primary proof | Cannot prove |
| --- | --- | --- |
| Contract/model | state completeness, invariants, dangerous interactions | usability or value |
| Prototype | workflow/comprehension hypothesis | production quality or retention |
| Exact slice | real integration, migration and recovery | whole-product coherence |
| Full candidate | cross-system behavior, platform quality, scale/failure envelope | market success |
| User study/canary | comprehension, usefulness, trust, causal movement in cohort | universal transfer |
| Production readback | live candidate behavior inside observed envelope | future conditions |

For every stage state hypothesis, artifact, cohort/fixture, pass/watch/fail predicates, countermetrics, machine action, and rollback/compensation.

## 8. Complete blueprint template

```text
1. Artifact envelope and evidence ledger
2. User/job/context and falsifiable promise
3. Product objects, state authorities, workflows and information architecture
4. First-value beat map and friction budget
5. Capability portfolio
   - build / availability / presentation / proof
   - scale/failure envelope and exact proof
   - dormant-state budget, migrations, telemetry, recovery
6. Recurring-value and Durable Investment Contract
7. Collaboration/social/sharing and Cross-Promotion Placement Contract
8. Commerce integration and Refund Consequence Contract
9. Release Benefit, review, private feedback and continuous-learning handoffs
10. HTML5/mobile/tablet/desktop/input/offline/sync matrix
11. Accessibility, age modes, i18n/culturalization, security/privacy and SDK matrix
12. Autonomous build DAG, role separation, exact gates and maintenance loop
13. KPI/event/experiment contracts and countermetrics
14. Specialist artifact manifest
15. Validation roadmap, hard blockers, unresolved hypotheses and next proofs
```

## 9. Quality rubric

Score 0 missing/contradictory, 1 plausible/incomplete, 2 evidence-labelled/testable:

1. user, promise and outcome;
2. objects, workflows, IA and recovery;
3. first value and friction;
4. recurring value and durable investment;
5. capability completeness and correct app availability semantics;
6. commerce/social/feedback integration and specialist boundaries;
7. HTML5/platform/input/offline quality;
8. accessibility/i18n/privacy/age/low-end quality;
9. metrics, evidence and causal validation;
10. scale-ready autonomous build, maintenance, recovery and handoffs.

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
