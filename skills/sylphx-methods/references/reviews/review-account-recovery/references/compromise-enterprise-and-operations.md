# Compromise, Enterprise, and Operations

## Benign loss versus compromise

| Dimension | Benign loss | Suspected compromise |
| --- | --- | --- |
| Active sessions | may preserve by scoped policy | assess/revoke/quarantine risky sessions |
| Recovery-channel changes | normal verified update | freeze/review recent or concurrent changes |
| Sensitive actions | standard post-recovery controls | bounded restriction and review |
| Notifications | recovery progress | alert safe old channels and incident route |
| Evidence | minimum assurance | preserve security evidence with access limits |
| Closure | access verified | compromise contained and actions reviewed |

Containment must be proportionate. Universal logout or account freeze can harm users and operations; preserving a stolen session can let the attacker defeat recovery. Decide by session/channel evidence and blast radius.

## Enterprise authority matrix

Separate these facts:

- IdP authenticated identity;
- domain ownership or claim;
- tenant membership and role;
- delegated admin authority;
- legal/account owner;
- billing owner;
- break-glass recovery authority;
- support access authority;
- data/tenant transfer authority.

A valid enterprise recovery names which fact is being restored and which source is canonical. Tenant split/merge, admin dispute, former employee, compromised IdP, or last-admin loss require the enterprise governance owner; recovery must not redefine ownership.

## Post-recovery checklist

- install or restore intended authenticators and recovery methods;
- revoke/rotate affected sessions, refresh tokens, recovery codes, API keys, app passwords, connected apps, and provider links as scoped;
- review email/phone/passkey/MFA/admin changes and high-risk transactions/actions;
- protect safe pre-existing channels; remove attacker-added channels only with evidence;
- apply time-bounded restrictions to transfers, payouts, ownership/admin changes, exports, or credential changes where justified;
- notify safe channels and provide denial/report/appeal path;
- verify access and critical workflows, then release restrictions or route incident/remediation;
- expire unnecessary proof documents and preserve minimum audit evidence.

## Operational evidence

Track recovery attempts, path selection, proof availability/failure, time in state, rightful completion, takeover after recovery, false denials, abandoned flows, support escalation, appeal/reversal, repeated recovery, channel/provider outage, accessibility and locale completion, high-role incidents, and correction time. Sample both successful and failed flows; attackers and locked-out users may not appeal.

Policy changes need replay, adversarial cases, accessibility review, shadow decision comparison, bounded canary, provider-outage test, false approve/deny countermetrics, rollback, and correction for affected accounts.
