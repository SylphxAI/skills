---
name: review-account-recovery
description: "Review account recovery and produce one actionable assessment."
---

# review-account-recovery

# Review Account Recovery Review

Produce one **Account Recovery Protocol** that restores the rightful user while resisting account takeover, protecting other tenant members, and preserving a clear appeal and correction path. Recovery is an alternative authentication ceremony, not a weaker support exception.

## Atomic boundary

Own entry, account-safe discovery, claimant/subject/tenant context, recovery eligibility, proportional proof, risk and cooling, channel orchestration, support or enterprise authority, session/credential containment, restoration, notifications, appeals, post-recovery hardening, audit, and operational evidence. Consume authentication/identity architecture, enterprise ownership, abuse controls, support operations, privacy rules, and incident response from their canonical owners.

## Resource routing

- Read `references/recovery-state-and-proof.md` when recovery states, identity signals, channels, proof, cooldowns, or session repair matter.
- Read `references/compromise-enterprise-and-operations.md` for suspected takeover, enterprise/SSO accounts, high-value roles, support-assisted recovery, disputes, incidents, or scaled automation.

## Source verification

Retrieve current identity-provider, passkey/platform, messaging, enterprise, consumer, privacy, and regulatory constraints at execution. Those current authorities define provider guarantees, delivery SLAs, identity-document rules, and jurisdiction-specific recovery requirements.

## Operating rules

1. Separate claimant statements, observed account behavior, current source facts,
   risk inference, and recovery decisions. Distinguish account knowledge, channel
   possession, person or organization authority, device and session history, and
   final recovery authority.
2. Define account type, tenant/workspace, roles and blast radius, enrolled authenticators, usable and lost channels, device/session state, region/age/accessibility context, suspected compromise, assets/data at risk, recovery objective, and irreversible effects.
3. Prevent enumeration and data leakage. Entry and “account not found” behavior, masked destinations, support tooling, logs, and notifications use uniform, privacy-preserving responses that protect whether another person, organization, or hidden account exists.
4. Use an assurance ladder matched to impact. Prefer pre-enrolled recovery credentials, trusted authenticated sessions/devices, passkey/MFA recovery, organization-admin processes, scoped provider assertions, and only then carefully governed alternate evidence. Knowledge questions and easily obtained profile/billing facts are weak signals, not identity proof.
5. Combine independent evidence where risk warrants, but minimize collection. Define provenance, freshness, spoofability, accessibility, privacy purpose, retention/expiry, failure behavior, and legitimate exceptions for every proof method.
6. Separate request, discovery, proof collection, risk decision, cooling/notification, credential reset, session/token handling, sensitive-action restriction, verification, closure, and appeal. Make retries, timeouts, rate limits, duplicate requests, channel changes, provider outages, and abandoned flows explicit.
7. Treat suspected compromise differently from benign loss. Contain active sessions or sensitive actions proportionately, preserve evidence, protect recovery channels from attacker changes, notify safe channels, and route incidents without permanently locking out the rightful user.
8. For enterprise/SSO accounts, distinguish identity-provider authentication, tenant membership, admin ownership, domain authority, break-glass roles, billing/legal owner, and support authority. Each enterprise admin and sales contact retains only its explicit recovery authority.
9. Define post-recovery state: rotate/revoke affected credentials, tokens, sessions, API keys and app passwords as appropriate; review recovery/channel changes and high-risk actions; restore safe access; preserve unaffected sessions only by explicit policy; enforce bounded cool-down on sensitive actions; help enroll resilient authenticators.
10. Communicate without teaching attackers: request received, safe next step, expected review class, changes completed, sessions/credentials affected, sensitive-action limits, how to deny/report/appeal, and support route. Messages contain only verified, recovery-safe account facts and route sensitive details through authenticated support.
11. Build scale-ready automation now: versioned recovery policies, channel adapters, a minimal audit record, orchestration, idempotency, rate and risk controls, accessible and localized alternatives, support workbench, separation of duties, simulation and replay, alerts, incident routing, kill switches, and record expiry. High-risk recovery runs through this controlled system.
12. Measure successful rightful recovery, takeover after recovery, time/effort, abandonment, accessibility/channel failure, false denial, false approval, support escalation, repeat recovery, appeal/reversal, and cohort disparities. Completion rate alone rewards insecure recovery.

## Workflow

### 1. Frame recovery and blast radius

Identify claimant/subject/tenant relationship, lost/usable authenticators and channels, roles/assets, active sessions, suspected compromise, applicable policy, accessibility/language, risk tier, and the exact access or control being restored. Define ruin conditions for false approval and false denial.

### 2. Build the recovery path matrix

For each account/risk/channel state define eligible proof methods, independence, assurance, data minimization, fallback, rate/cool-down, notification, decision authority, and appeal. Explicitly handle no-channel, provider outage, changed phone/email, lost passkey/MFA, social-login loss, minor/guardian, deceased user, and enterprise cases where applicable.

### 3. Design state and containment

Specify anti-enumeration entry, request binding, proof challenges, risk assessment, pending/cooling, support review, approval/denial, credential and session transition, restricted post-recovery state, verification, closure, dispute, and incident transitions with idempotency and recovery.

### 4. Validate adversarially and inclusively

Test SIM/email takeover, stolen device/session, social engineering, insider/admin misuse, replay, race between claimant and attacker, provider outage, account linking, household/shared device, accessibility constraints, international users, stale signals, and support-tool compromise. Preserve enough detail to improve defense without exposing bypass instructions.

### 5. Operate and learn

Define shadow/canary for policy changes, decision samples, security incidents, proof/channel drift, provider health, false approve/deny signals, appeals, compensation/correction, evidence retention/expiry, and source refresh. Route root causes to identity, enterprise access, abuse, support, or security owners.

## Acceptance conditions

Acceptance conditions:

- ownership assurance combines evidence appropriate to the account and impact;
- entry and messaging preserve account, destination, tenant, user, and risk privacy;
- benign loss, suspected compromise, enterprise/SSO, high-impact roles, and
  ownership disputes have distinct paths;
- recovery overrides require scoped authority, evidence, separation of duties, and audit;
- credential reset explicitly handles sessions, tokens, API keys, safe
  notifications, sensitive-action controls, and post-recovery review;
- rightful users have accessible alternatives and appeal with minimized identity evidence;
- idempotency, race/replay protection, rate controls, provider outage behavior,
  evidence expiry, incident routing, and wrong-decision recovery are defined; and
- security, ownership, comprehension, and production-performance claims use
  evidence suited to that layer.

## Output contract

Produce one **Account Recovery Protocol** containing:

1. artifact name and revision, scope, current sources, unresolved facts,
   account, tenant, and role model, claimant and subject context,
   authenticators and channels, compromise state, risk tier, applicable policy,
   and ruin boundaries;
2. recovery eligibility and assurance matrix by account, impact, channel availability, compromise, and enterprise state;
3. proof-method contracts with independence, provenance, freshness, spoofability, privacy/retention, accessibility, fallback, and outage behavior;
4. anti-enumeration entry and the full recovery flow through request,
   verification, decision, cooling, reset, session handling, restriction,
   closure, appeal, and incident handling;
5. decision authority, support and enterprise escalation, separation of duties, reason categories, safe communication, and appeal/correction;
6. credential, passkey/MFA, channel, session/token/key, and post-recovery sensitive-action transition matrix;
7. adversarial, accessibility, localization, replay/race, provider-failure, cohort, shadow/canary, and live-evidence validation plan;
8. scale automation, audit, metrics/countermetrics, alerting, incidents, proof expiry, policy/provider drift, and typed owner handoffs.

The protocol is complete when every claimant state has a next safe action, false approval and false denial are both measured, and a wrong decision can be contained, appealed, and corrected.
