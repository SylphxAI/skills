# Recovery State and Proof

## Canonical state machine

```text
entry -> request_bound -> context_collected -> proof_in_progress -> decision_pending
  |           |                 |                    |                 |
  v           v                 v                    v                 v
generic_end duplicate/race  compromise_route   proof_unavailable  cooling_or_review
                                                                    |
                  denied_or_appeal <- decision -> approved -> access_transition
                                                        |              |
                                                        v              v
                                                   notify_safe   restricted_recovery
                                                                       |
                                                                       v
                                                        verified -> closed_or_incident
```

Each transition binds request ID, account-safe subject reference, policy version, evidence IDs and event times, decision authority, risk/assurance tier, expiry, communication, and next safe action.

## Proof hierarchy

| Method | Strength question | Main failure mode |
| --- | --- | --- |
| Pre-enrolled recovery code/key | unique, secret, unrevoked, securely stored? | theft or reuse |
| Existing trusted session/device | recent, bound, uncompromised, adequate for impact? | stolen session/device |
| Alternate enrolled authenticator | independent from lost factor? | shared dependency |
| Passkey/platform recovery assertion | exact provider semantics observed? | overtrusting provider claim |
| Enterprise IdP/admin process | proves identity, membership, ownership, or only authentication? | admin/tenant overreach |
| Verified channel possession | channel still controlled by rightful user? | SIM/email takeover |
| Historical account evidence | hard for attacker and not exposed elsewhere? | data-broker/social knowledge |
| Government/organizational document | necessary, current, authentic, jurisdictionally allowed? | privacy burden and forgery |
| Support judgment | evidence-guided and independently authorized? | social engineering/bias |

No method is universally strong. Compose independent methods and decision authority according to impact; do not repeatedly ask for weak correlated facts.

## Recovery path record

```text
path_id, account_and_role_scope, compromise_state, available_channels,
required_assurance, eligible_methods, independence_rule, attempts_and_rate,
cooling, notification_channels, decision_authority, denied_behavior,
fallback, accessibility_locale, evidence_retention, appeal, post_recovery_limits
```

## Safe communication

Use generic anti-enumeration responses before authorization. After safe binding, explain reason category and next step without revealing detection thresholds, hidden account facts, another person's data, or full destination. Send change and denial-report notifications through pre-existing safe channels where possible; a newly changed channel must not be the only notification path.
