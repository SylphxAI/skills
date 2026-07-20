# Sylphx Skills

## Purpose

Own SylphxAI's **public** static Agent Skills: binding standards, reusable
procedures, profiles, adapters, references, compact runtime constitution, and
the minimal distribution mechanism that installs and keeps **Codex, Claude
Code, and Grok Build** synchronized.

Public marketing surfaces (README, Discussions, issue templates, repository
About) must stay accurate, scannable, and honest about MIT reuse versus
commercial maintenance value. Prefer short answer-first copy over internal
portfolio jargon.

## Boundary

This repository owns:

- canonical packages under `skills/<id>/`;
- one deterministic public catalog;
- the agent-owned repository + `install this` contract, root discovery Skill,
  compact runtime constitution, mandatory AutoSync, and canonical Sylphx SaaS
  Control Plane enrollment;
- package validation and Codex / Claude / Grok installation/update adapters;
- public contribution and community entry points proportional to that scope.

It does not own live work, organization-wide adoption state, runtime effects, customer data,
benchmark execution, model-provider evidence, or product-specific decisions.
Those stay in their operational or product owners.

## Delivery

The repository is public, non-deployable source. A change is complete when the
exact default-branch tree passes `npm test` and the public package contains the
declared installation surfaces. Changes to the install contract additionally
require isolated fresh-context evidence for every authenticated supported
runtime; an unavailable provider is recorded as a typed gap, not a false pass.
Versioned distribution is a separate release action; changing an ordinary
Skill does not require a model benchmark or calendar soak.

## License and product posture

Canonical packages are MIT licensed and intentionally public. Sylphx may sell
managed updates, enterprise/private packages, integrations, verification,
support, and related services without representing public text as exclusive.
