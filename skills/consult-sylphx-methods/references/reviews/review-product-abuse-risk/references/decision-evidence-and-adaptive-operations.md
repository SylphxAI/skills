# Decision Evidence and Adaptive Operations

## Signal contract

For each signal specify source/owner, entity and event time, availability delay, definition/version, population coverage, missing value, expected direction, stability, privacy purpose/retention/access, spoofability, legitimate lookalikes, bias risk, incident/outage behavior, and validation history.

Signals are evidence inputs, not verdicts. Device, network, payment, behavior, graph, content, velocity, identity, support, and historical-outcome signals have different error and attack properties. Preserve their lineage.

## Evidence and action table

| Evidence state | Permitted action shape | Example fail behavior |
| --- | --- | --- |
| missing/unavailable | low-impact cap or safe pending state | degrade rather than terminate |
| weak/single signal | reversible friction or observation | allow with bounded exposure |
| corroborated risk | scoped provisional/hold/challenge | timed review and appeal |
| established event | proportionate enforcement and recovery | preserve correction path |
| severe ongoing harm | rapid containment within authority | independent after-action review |

## Evaluation set

Include confirmed positives with adjudication provenance, confirmed legitimate hard cases, ambiguous/appealed cases, new-user cold starts, high-value legitimate users, accessibility/privacy constraints, compromised accounts, household/enterprise sharing, provider outages, data lag, coordinated groups, synthetic variants, and temporal holdout periods. Weight by customer and resource impact, not only case count.

Metrics: loss prevented and displaced, precision/recall only with label caveats, false-positive/negative impact, challenge completion, hold time, appeal/reversal, reinstatement correctness, legitimate value/conversion, support load, latency/cost, cohort disparities, attacker adaptation time, and incident severity. Never collapse all to one “fraud rate.”

## Change protocol

1. version policy, signal, rule/model, threshold, reason, action map, and expected effect;
2. replay historical cases with temporal separation and leakage checks;
3. run shadow mode and compare actions/outcomes by cohort;
4. canary with exposure/value caps and hard halt conditions;
5. monitor delayed outcomes, appeals, support, conversion, and displacement;
6. promote, tune, degrade, or roll back; restore/correct affected users;
7. preserve evidence and refresh scenarios without publishing bypass detail.

## Appeals as quality evidence

Appeals sample only users able and willing to appeal. Track inaccessible or abandoned appeals, complaints, support contacts, silent churn, and sampled non-appellants. Do not train directly on enforcement labels or appeal outcomes without correcting selection and policy feedback loops.
