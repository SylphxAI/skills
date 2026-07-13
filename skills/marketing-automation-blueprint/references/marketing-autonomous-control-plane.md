# Marketing Autonomous Control Plane

## 1. Canonical artifacts

```text
marketing-thesis.yaml
claim-proof-registry reference
audience-consent-policy.yaml
offer-registry reference
channel-capability-inventory.yaml
campaign-spec references
creative-manifest.yaml
lifecycle-policy.yaml
review-feedback-policy reference
measurement-plan.yaml
experiment-spec.yaml
spend-envelope.yaml
fraud-brand-safety-policy.yaml
desired-state-registry.yaml
event/cost/observed-state ledgers
validation/live-readback evidence bundle
incident/recovery runbook
```

All material artifacts are versioned and provenance-linked. Top-level artifacts carry `artifactVersion`, `artifactRevision`, and `artifactState` but never self-hash. Only a reference to an already sealed input carries `artifactDigest` plus `digestRule: sha256-exact-bytes`. Desired state and observed provider state are separate.

## 2. Authority separation

| Role | Can | Cannot |
| --- | --- | --- |
| Proposer | create strategy/campaign/budget candidates | publish, spend, validate itself, raise authority |
| Creative-brief agent | generate concepts, storyboards, channel briefs, variant hypotheses, and stable Product Asset requests | render or localize exact files, publish, alter claims, spend |
| Validator | check truth, rights, consent, policy, economics, telemetry and recovery | promote or edit candidate |
| Promoter/reconciler | apply exact signed candidate inside caps and reconcile | edit spec, raise caps, change claims |
| Watchdog | independently observe and pause globally/surface-specifically | create campaigns or increase spend |
| Causal evaluator | read ledgers, estimate lift/uncertainty, issue evidence | mutate campaigns/spend |
| Recovery agent | pause, drain, correct, compensate and restore last-known-good | expand authority/exposure |

Use separate scoped short-lived identities. Platform tokens, audience export, spend, publishing and analytics access follow least privilege.

## 3. Candidate lifecycle

```text
draft
-> source_and_schema_validated
-> truth_rights_consent_policy_validated
-> measurement_economics_recovery_validated
-> signed_exact_candidate
-> shadow_or_dry_run
-> bounded_canary_with_provider_lease
-> active_bounded
-> scaled | held | paused
-> corrected | superseded | withdrawn
```

Require sticky assignment where experiments need it, maximum exposure/spend step, observation window, hysteresis/cooldown, independent caps, safe missing-signal defaults, atomic policy snapshots, monotonic versions, last-known-good, audit/replay and break-glass global pause.

Paid candidates use short provider-side scheduled end-times/leases and renew only after healthy desired/observed/cost readback. Where available, use upstream prepaid/funding/account limits beyond the campaign account. Maintain separately protected emergency pause credentials; test their revocation and rotation without granting campaign-creation or cap-increase authority.

## 4. Reconciliation loop

```text
desired signed state
-> provider adapter mutation with idempotency
-> durable receipt and async poll
-> observed account/campaign/creative/budget state
-> cost/delivery/conversion reconciliation
-> drift classification
-> repair, pause, quarantine or supersede
-> live landing/deep-link/product readback
```

External APIs can duplicate, reorder, delay, partially apply, silently normalize, reject or change schema. Use locks, retry/backoff, rate limits, pagination, checkpoints and exact provider IDs. A console/operator change invalidates desired-state assumptions until reconciled.

## 5. Automatic pause and recovery

Pause or constrain when:

- claim/price/offer/release/deep-link truth expires or diverges;
- consent, age, territory or sensitive-category policy is unavailable;
- event/cost schema changes, freshness/coverage falls, dedupe fails or attribution drifts;
- spend/bid/cap observed state differs from signed envelope;
- duplicate campaigns, audience overlap or auction self-competition exceed policy;
- landing/product availability, purchase/fulfillment or support fails;
- fraud/IVT, complaint, unsubscribe, refund/chargeback, policy rejection, brand incident or creator-rights issue spikes;
- promoter/token/account behavior becomes unauthorized or unverifiable.

Recovery is surface-specific. Pause new spend/publication, preserve audit and experiment assignment, drain scheduled jobs, retract/correct false creative, revoke audience exports where possible, reconcile costs and grants, compensate affected users/partners when required, and promote only a newly validated candidate.

If the primary provider API or credential is unreachable while delivery/billing may continue: invoke independent emergency authority, stop lease renewal, enforce upstream account/funding caps, disable reachable landing/fulfillment only when doing so cannot harm users or violate commitments, poll through an independent read path, and keep the incident open until provider-observed zero delivery/spend plus billing reconciliation. A successful local state change or failed pause call is not recovery evidence.

## 6. Scale and proof

Every capability declares numeric envelopes:

- campaigns/ad groups/creatives/audiences/accounts/locales/variants;
- API QPS/quota, jobs/queues, content volume and publish cadence;
- daily/lifetime/product/channel/geo/portfolio spend and maximum step;
- event/cost volume, freshness, latency, error, dedupe and reconciliation lag;
- moderation/reply/support/fraud workload and recovery objectives.

`scale-verified` requires exact-candidate load/soak/failure/reconciliation proof. `production-proven` requires observed platform IDs/state, cost truth, live creative/landing/product probes, and downstream outcome readback.

## 7. Official authority record

```text
surface/channel/account/territory/audience:
publisher and canonical URL/section:
API/product/version/scopes/permissions:
effective_at, retrieved_at, expires_at, content_digest:
material requirement or ambiguity:
adapter/policy action and fallback:
test/readback:
```

Refresh automatically on expiry, API error/schema drift, policy notice, account rejection, new territory/audience, provider version change, or incident.

## 8. Complete validation checklist

- Product/claim/offer/release artifact digests match.
- Audience consent, age, territory, suppression and frequency pass.
- Rights, disclosure, locale, accessibility, landing and deep links pass.
- Conversion/cost ledgers are deduplicated, reconciled and fresh.
- Holdout/experiment and causal analysis plan are reserved.
- Independent caps, maximum step, watchdog and global pause pass.
- Fraud, brand, refund, complaint, support and deliverability guardrails pass.
- Exact candidate can be simulated/dry-run and recovered.
- Provider observed state and live product route match desired state.
- No role can propose, validate, promote and attest the same candidate.
- Simulated provider mutation/credential outage proves that leases, upstream caps, emergency authority and independent readback bound spend while pause calls fail.
