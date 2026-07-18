# Sylphx Skills

## Purpose

Own SylphxAI's **public** static Agent Skills: binding standards, reusable
procedures, profiles, adapters, references, and the minimal distribution tool
that keeps **Codex, Claude Code, and Grok Build** synchronized.

Public marketing surfaces (README, Discussions, issue templates, repository
About) must stay accurate, scannable, and honest about MIT reuse versus
commercial maintenance value. Prefer human-first copy over internal portfolio
jargon.

## Boundary

This repository owns:

- canonical packages under `skills/<id>/`;
- one deterministic public catalog;
- package validation and Codex / Claude / Grok installation/update adapters;
- public contribution and community entry points proportional to that scope.

It does not own live work, fleet state, runtime effects, customer data,
benchmark execution, model-provider evidence, or product-specific decisions.
Those stay in their operational or product owners.

## Delivery

The repository is public, non-deployable source. A change is complete when the
exact default-branch tree passes `npm test`. Versioned distribution is a
separate release action; changing a Skill does not require a model benchmark or
calendar soak.

## License and product posture

Canonical packages are MIT licensed and intentionally public. Sylphx may sell
managed updates, enterprise/private packages, integrations, verification,
support, and related services without representing public text as exclusive.

