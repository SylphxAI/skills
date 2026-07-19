# Threat-modeling method and sources

Use this reference to choose a proportionate method. Threat modeling is a
design activity: model the system, ask what can go wrong, choose responses, and
define how the response will be verified. A taxonomy is a prompt for coverage,
not a substitute for those steps.

## Method selection

| Need | Useful method | Limitation |
| --- | --- | --- |
| Component and trust-boundary coverage | Data-flow or architecture model plus STRIDE prompts | Category coverage does not prove path feasibility or completeness |
| Attacker-goal decomposition | Attack tree or misuse/abuse cases | Must remain bound to the actual system and evidence |
| Data-focused analysis | Data lifecycle, access, transformation, disclosure, integrity, and availability paths | Can miss control-plane, build, identity, and operational threats if used alone |
| Supply-chain analysis | Build, dependency, artifact, signing, deployment, update, and operator trust chain | Requires current dependency and delivery evidence |
| Control validation | Threat-to-control-to-test traceability | A planned or tested control is not automatically effective in production |

Use more than one view when a material path crosses components, identities,
data, software supply chain, and operations. Keep effort proportional to the
system's exposure and irreversibility.

## Threat record

For each threat record:

```text
Threat ID and title:
Source components / trust boundaries / assets:
Actor, capability, access, and preconditions:
Attack or failure path:
Security property and affected parties:
Consequence and evidence-bounded likelihood:
Existing controls and observed evidence:
Disposition and designed controls:
Enforcement points, dependencies, and bypass assumptions:
Verification and runtime observation:
Residual risk, authority, owner, and review trigger:
```

Prefer ordinal or narrative risk with explicit evidence over multiplying
arbitrary scores. Distinguish inherent exposure, current residual exposure, and
the projected state after unverified controls.

## Primary sources

- OWASP, **Threat Modeling Cheat Sheet** — a practical process centered on
  system modeling, threat identification, mitigations, and review:
  <https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html>
- NIST, **SP 800-154 Initial Public Draft, Guide to Data-Centric System Threat
  Modeling** — a data-focused method; its draft status and narrower scope must
  remain explicit:
  <https://csrc.nist.gov/pubs/sp/800/154/ipd>
- NIST, **SP 800-218, Secure Software Development Framework (SSDF) Version
  1.1** — secure-development practices and outcome language for downstream
  implementation and verification:
  <https://csrc.nist.gov/pubs/sp/800/218/final>
- NIST, **SP 800-30 Rev. 1, Guide for Conducting Risk Assessments** — threat,
  vulnerability, likelihood, impact, uncertainty, and risk framing:
  <https://csrc.nist.gov/pubs/sp/800/30/r1/final>
- Threat Modeling Manifesto — values and principles for continuous,
  collaborative, system-specific threat modeling:
  <https://www.threatmodelingmanifesto.org/>
