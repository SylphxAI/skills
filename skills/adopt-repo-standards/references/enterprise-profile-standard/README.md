# enterprise-profile-standard

> Constraint depth owned by `adopt-repo-standards` (not a listing skill). Other workflows open this path when their body says so.

# Enterprise Profile Standard

Policy: versioned enterprise profile contract—apply when managing profile selection.

**Requirement:** apply this standard when the task matches its scope.

Read [references/full-standard.md](references/full-standard.md) for the full
method and predicates. Keep separate from
`enterprise-control-plane-standard` (org-wide control-plane layers and
defaults across repos). Profiles are the **selection packages**; the control
plane owns **where/how** org process is enforced. Do not merge the packages
unless job, artifact, acceptance, and mechanism fully coincide (they do not).

## Method

1. Read [references/full-standard.md](references/full-standard.md) for the full method and predicates.
2. Apply the strongest relevant subset; record material tradeoffs in ADR/tests as required.
3. Prefer schema/test/ADR homes over copying this body into product repos.

## Composition and output

Canonical contract: [`author-skill/references/composition-contract.md`](../../../author-skill/references/composition-contract.md).
## Boundaries

- Does not grant deploy or credential capabilities.
- Does not replace product-local ADRs where those own decisions.

