# Account Recovery

Assess whether recovery restores the rightful user without becoming a weaker
authentication ceremony or an account-takeover path.

## Method

1. Treat recovery as alternative authentication, not a support exception.
2. Separate claimant statements, observed account behavior, and recovery
   decisions. Distinguish claimant, subject, and tenant.
3. Open [recovery state and proof](recovery-state-and-proof.md) for eligibility,
   channels, proof, cooldowns, and session repair.
4. Open [compromise and enterprise](compromise-enterprise-and-operations.md)
   when takeover, SSO, high-value roles, or support-assisted recovery is in
   scope.
5. Check proportional proof, blast radius, session/credential containment,
   notification of the true owner, appeal, and post-recovery hardening.
6. Support-assisted recovery must not skip proof that the product would require
   of the user.

## Output

Recovery protocol findings: proof ladder, containment, appeal, and owner
actions.
