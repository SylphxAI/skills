# Agent Skills model

## Industry meaning

A **Skill** is a specialized **workflow** an agent loads on demand:

- one user-requestable job (discoverable `name` + `description`)
- short procedure body
- optional `references/` / `scripts/` for depth

A Skill is **not**:

- a policy encyclopedia entry or "follow standards" bag
- an engine brand product name
- a domain checklist that only differs by reference tables
- repository documentation under `docs/` (not installed to agents)

## Discovery (the important part)

Hosts select skills from **listing metadata** (`name` + `description`).  
The body and `references/` load **after** selection.

Therefore:

1. Put in the **listing** only jobs a user/agent would intentionally request.
2. Put **constraint depth** (coding standard, delivery rules, verification matrices) under the workflow that applies them: `skills/<that-job>/references/<topic>/`.
3. In the workflow body, name **when** to open each reference. That is how the agent "sees" a standard—not by discovering a skill named after the standard.
4. Do **not** create a skill whose only job is "hold standards."
5. Do **not** put agent-needed method depth only under `docs/` (installer does not ship it).

## Catalog shape

| Kind | Where | Listed? | Installed? |
| --- | --- | --- | --- |
| Workflow | `skills/<job>/` | Yes | Yes |
| Shape / engine / constraint depth | `skills/<job>/references/<topic>/` | No | Yes (with parent skill) |
| Human repo docs | `docs/` | No | No |

## Ownership of constraint packs

Each constraint pack has **one** canonical owner workflow—the job that most naturally *applies* it:

| Pack | Owner workflow |
| --- | --- |
| project-manifest, enterprise-profile, enterprise-control-plane | `adopt-repo-standards` |
| engineering, risk-matched verification, platform-first | `build-product` |
| technology-stack profile | `select-dependency-versions` |
| source-authoring, delivery, CI admission/capacity, parallel-change | `drive-to-delivery` |
| decision-quality | `record-structured-deliberation` |
| evidence-and-claims | `synthesize-evidence-brief` |
| commercial-decision | `compose-product-portfolio` |
| review-solicitation | `run-product-feedback-loop` |
| specification-control-plane | `engineer-testable-requirements` |
| work-coordination | `select-next-work` |
| agent-native, agent-first | `engineer-agent-context` |
| instruction-evolution | `author-skill` |

Other workflows that need the same constraints **link** to the owner path (for example `../drive-to-delivery/references/source-authoring-standard/`). They do not re-list the pack as a skill and should not duplicate the pack tree.

## User-job framing

- "design a product" → `design-product` (+ shape references)
- "build a product" → `build-product` (+ engineering / Keel / verification references)
- "drive this objective to delivery" → `drive-to-delivery` (+ source-authoring / delivery references)
- "adopt baseline into this repo" → `adopt-repo-standards` (+ manifest / profile references)

## Progressive disclosure

1. Listing metadata (budgeted)
2. Skill body when selected
3. References only when the body says so
