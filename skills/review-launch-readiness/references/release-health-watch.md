# Release Health Watch

Use a launch watch when the real release uses bounded exposure, a staffed
release window, or a canary. Tie every signal to an owner action.

## Watch definition

For each material signal, record:

- exact candidate, rollout state, and user journey;
- source, freshness, baseline, and relevant segments;
- expected behavior and uncertainty;
- owner action for healthy, harmful, and missing data;
- recovery, customer communication, and readback.

Useful signal areas include:

| Area | Examples |
| --- | --- |
| Release mechanics | released identity, rollout percentage, update adoption, store state |
| Reliability | startup, crash, hang, latency, resource use, sync, save integrity |
| Critical journeys | login, onboarding, create, save, export, search, collaboration |
| Money and access | checkout, grant, restore, entitlement, refund, account access |
| Trust | consent, privacy, accessibility, safety, child and age behavior |
| Product outcome | first value, completion, retention, claim match |
| Support | ticket themes, incident themes, duplicate contacts, known issues |

Choose segments that can hide materially different outcomes, such as exact
version, platform, channel, region, plan, entitlement, device, or migration
path. Preserve small severe cohorts in the decision.

## Operating action

Read the exact candidate after release. Expand exposure when the changed paths
behave within their declared conditions. Hold, recover, or withdraw the
affected exposure when a material harm signal appears. Missing or contradictory
data keeps the affected exposure bounded while its source owner restores a
trustworthy readback.

After recovery, verify the user path again and place any lasting correction in
the owning product test, runbook, or communication source.
