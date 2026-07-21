---
name: security-threat-modeling
description: "Model security threats for a new or materially changed system, architecture, trust boundary, data flow, integration, privileged action, or deployment, and produce a Threat Model and Security Design Contract. Use when security objectives, attack surfaces, abuse cases, controls, and residual risk must shape design before or during implementation. Do not use for product-wide fraud or incentive abuse, customer assurance claims, penetration-test execution, isolated vulnerability remediation, compliance attestation, or incident response."
---

# Security Threat Modeling

Produce one **Threat Model and Security Design Contract** that connects the
system model to credible threats, controls, verification, and owned residual
risk. Read [references/threat-modeling-method.md](references/threat-modeling-method.md)
before selecting a threat-enumeration technique.

## Method

1. Define the subject, version, environment, intended users, security
   objectives, protected assets, unacceptable outcomes, assumptions, and
   decision boundary. Distinguish observed implementation from proposed design.
2. Model components, identities, data stores, external dependencies, data and
   control flows, privileges, trust boundaries, entry points, administrative
   paths, build/deploy paths, and recovery paths. Link each element to source
   evidence.
3. Derive misuse and abuse cases from attacker goals, capabilities, access,
   incentives, and affected parties. Use STRIDE, attack trees, kill-chain
   thinking, or another taxonomy only as a coverage aid; no taxonomy proves
   completeness.
4. Rank threats using evidence-bounded likelihood, impact, exposure,
   detectability, reversibility, and uncertainty. State missing evidence and
   avoid unsupported numeric precision.
5. Select controls by design principle and threat path: eliminate the path,
   reduce privilege or exposure, prevent, detect, contain, recover, or accept.
   Trace every control to threats, enforcement point, owner, failure mode, and
   bypass assumptions.
6. Define verification that could falsify the control claim: invariant,
   negative test, property/model test, adversarial scenario, code/configuration
   review, scan, penetration-test objective, runtime signal, or recovery drill.
7. Record residual risk, affected parties, compensating controls, decision
   authority, owner, review trigger, expiry where temporary, and safe response
   if assumptions fail. Never let the model accept its own material residual
   risk merely because it authored the design.
8. Revisit the contract when a trust boundary, data class, privilege,
   dependency, deployment topology, exposure, or material threat changes.

## Output contract

Produce a **Threat Model and Security Design Contract** containing:

- subject identity, scope, evidence state, objectives, assets, affected
  parties, unacceptable outcomes, assumptions, and non-goals;
- component/data-flow diagram or graph with identities, privileges, entry
  points, dependencies, and trust boundaries;
- attacker and misuse/abuse cases, including insider, supply-chain,
  compromised-dependency, automation, and operational paths where applicable;
- threat register with source element, preconditions, path, consequence,
  current control, likelihood/impact basis, uncertainty, and disposition;
- control design with enforcement point, owner, failure/degradation behavior,
  recovery, and threat traceability;
- verification matrix with exact claim, method, oracle, environment, and
  required evidence;
- residual-risk decisions, authority, owner, expiry/review trigger, and open
  evidence needs; and
- artifact sensitivity, authorized audiences, storage/access/retention,
  publication prohibition or redacted public derivative, and review of any
  exploit-enabling detail; and
- downstream implementation, assurance, testing, incident, or product-abuse
  handoffs without duplicating their artifacts.

## Integrity rules

- Model the real candidate and environment; a generic checklist is not a
  threat model.
- Treat STRIDE as optional enumeration support, not the definition of threat
  modeling and not evidence that all threats were found.
- Keep security properties explicit: authentication is not authorization,
  encryption is not integrity, logging is not detection, and backup is not
  proven recovery.
- Do not publish exploit-enabling detail beyond the authorized audience.
- Treat the detailed threat model as protected by default. A public assurance
  or learning document is a separate minimum derivative with its own audience,
  redaction and disclosure review; repository visibility alone is not approval.
- Do not call a control effective without implementation and verification
  evidence at the claimed boundary.
- Do not create universal gates or infrastructure when a bounded design
  control closes the material path more cheaply and reliably.

## Boundaries

- `product-abuse-risk-review` owns adaptive fraud, incentive abuse, enforcement,
  appeals, and false-positive economics across a product.
- `security-assurance-operations-review` owns what may truthfully be claimed
  and shown to customers about current controls.
- `engineering-standard` and the owning project implement and test controls;
  this Skill supplies the security design contract.
- `incident-standard` owns active incident classification and response.
- Use privacy, AI-risk, identity, payment, or other domain Skills when their
  specialist contracts are independently required.
