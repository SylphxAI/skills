---
name: model-security-threats
description: Model security threats and controls for a system, feature, or trust boundary before implementation or material change.
---

# Model Security Threats

Connect the real system boundary to credible attacker paths, owned controls, verification, and residual-risk authority.

## Method

1. Define the subject, version, environment, users, security objectives, protected assets, unacceptable outcomes, assumptions, and decision owner.
2. Model components, identities, data stores, dependencies, data and control flows, privileges, entry points, administrative paths, build and deployment paths, recovery, and trust boundaries.
3. Derive abuse cases from attacker goals, capabilities, access, incentives, and affected parties. Use STRIDE, attack trees, or another taxonomy as a coverage aid.
4. Rank threats using likelihood, impact, exposure, detectability, reversibility, and uncertainty grounded in the current system.
5. Select controls that eliminate a path, reduce privilege or exposure, prevent, detect, contain, recover, or explicitly accept risk.
6. Assign each control an enforcement point, owner, failure behavior, bypass assumptions, and recovery path.
7. Define an adversarial test, invariant, property test, model, code or configuration review, scan, penetration objective, runtime signal, or recovery exercise for each material control claim.
8. Assign residual risk to an authorized decision owner with affected parties, compensating controls, review trigger, and expiry for temporary acceptance.
9. Revisit the model when trust, data class, privilege, dependency, topology, exposure, or attacker capability changes.

Read [Threat modeling method](references/threat-modeling-method.md) for detailed system modeling, threat enumeration, prioritization, and control design.

For Sylphx products, the company
[security and privacy standard](https://github.com/SylphxAI/owner/blob/main/standards/security.md)
owns threat-model triggers and data classes; this skill owns the executable
modeling method.

## Output

Return the system and trust-boundary model, assets, attacker paths, ranked threats, controls and owners, verification methods, residual-risk decisions, sensitivity classification, and implementation handoff.

Use `run-incident-response` for active incidents and the owning implementation skill to build selected controls.
