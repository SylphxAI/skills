# Abuse Model and Control Ladder

## Abuse-path graph

```text
identity_or_access -> eligibility -> action -> provisional_value -> settlement_or_transfer
       |                 |           |              |                  |
       v                 v           v              v                  v
 synthetic/borrowed   evasion    automation     hold/reversal      laundering/repeat
       |
       v
 compromised_legitimate_user -> recovery_and_containment
```

Model the action chain, not only the account. An attacker may rotate accounts while reusing devices, instruments, content, destinations, behavior, or collaborators; a legitimate household or enterprise may legitimately share some of those links.

## Scenario record

```text
scenario_id, actor_and_capability, incentive, preconditions, target_resource,
path_and_transfer, scale_speed, observable_signals, spoofability,
direct_and_downstream_impact, legitimate_lookalikes, current_controls,
detection_delay, reversibility, evidence_confidence, owner
```

## Proportionate control ladder

| Level | Example | Use when | Required recovery |
| --- | --- | --- | --- |
| Product clarity | explain eligibility, prevent accidental duplicate | misuse is often confusion | immediate self-correction |
| Resource shaping | bounded velocity/concurrency/value | burst risk is reversible | transparent retry/reset path |
| Proof of possession | verify channel/instrument/session | linkage matters | alternate accessible method |
| Step-up | stronger identity or intent check | action impact is elevated | safe fallback and data minimization |
| Provisional state | delayed credit, payout, transfer, visibility | outcome needs maturation | exact release clock/status |
| Scoped hold/restriction | freeze threatened resource/action | credible unresolved risk | review, expiry, appeal |
| Specialist review | contextual evidence required | ambiguity or severe impact | SLA and independent authority |
| Suspension | prevent continuing harm | high confidence and reversible containment | appeal/reinstatement |
| Termination/reporting | extreme or repeated established harm | floor/authority satisfied | evidence, notice limits, appeal where applicable |

Never jump to the harshest control because it is easiest to implement. Never distribute punishment across unrelated accounts or value without evidence of linkage and authority.

## Decision state

```text
eligible -> assessed -> allow | shape | challenge | provisional | hold | review
                                                       |            |
                                                       v            v
                                                  released      restrict_or_restore
                                                                    |
                                                                    v
                                                        appeal -> corrected_or_upheld
```

Each transition records policy/rule/model version, input evidence IDs, availability times, decision authority, confidence/uncertainty, action scope/expiry, reason category, communication, and recovery.
