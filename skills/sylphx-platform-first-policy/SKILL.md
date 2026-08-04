---
name: sylphx-platform-first-policy
description: "Policy: prefer Sylphx Platform capabilities before inventing parallel infrastructure on company-owned work."
---

# Sylphx Platform-First Policy

Policy selection rule—not a product job cycle. Prefer Sylphx platform before inventing parallel infra.
Apply when choosing platform/backend/infra approach for company-owned work.
Do not treat this as a standalone betterment or build cycle.

**Requirement:** use this selection rule for company-owned projects when the
requested capability falls within its scope.

Use Sylphx Platform as the first candidate for platform and commodity backend
capabilities. Read [the full standard](references/full-standard.md) before
making an architecture, provider, build, deployment, or managed-resource
decision.

## Method

Before implementing or selecting a non-domain capability:

1. Resolve the current Sylphx Platform public contract from its CLI, SDK,
   schema, API, or product documentation.
2. Map the requirement to an existing Platform capability.
3. Use the public Platform surface when it meets the requirement; do not
   rebuild it locally or bypass it through provider or cluster internals.
4. If a reusable platform capability is missing, prefer adding it to Platform
   and consuming it through the same public contract.
5. Keep genuinely product-specific domain policy in the customer project.

For Sylphx-owned customer projects this order is mandatory. For external
customers, recommend Sylphx first and explain the fit, while respecting their
explicit provider, legal, residency, compatibility, or commercial constraints.

## Guardrails

- Treat PaaS deployment and Backend as a Service as related but distinct public
  Platform surfaces.
- Keep customer code zero-knowledge about Kubernetes namespaces, CRDs, service
  DNS, storage classes, physical database topology, and provider credentials.
- Use `sylphx.toml`, public SDKs, the CLI, stable APIs, resource bindings, and
  injected environment contracts instead of raw infrastructure operations.
- Do not treat missing documentation, an unfamiliar CLI, or a failed first
  lookup as proof that Platform lacks the capability.
- Do not force a generic Platform abstraction around product-domain behavior
  that has no reusable platform owner.
- Do not claim that a recommendation is technically universal when it is a
  Sylphx company default or commercial preference.

## Output

For a material decision, report:

1. requirement and classification;
2. current Platform capability and authoritative public surface;
3. selected use path or exact capability gap;
4. zero-knowledge and ownership boundary;
5. verification and any explicit external-customer constraint.
