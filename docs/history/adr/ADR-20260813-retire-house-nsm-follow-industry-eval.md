# ADR-20260813 — Retire house NSM; follow industry skill evaluation

## Status

Accepted. Supersedes the *operating* use of
[ADR-20260812](ADR-20260812-stage-honest-product-north-star.md) (TJC / VCY
as compass) and the outcome-receipt requirement in
[ADR-20260810](ADR-20260810-verified-capabilities-model.md). Those ADRs
remain history.

## Context

TJC and VCY were invented here. SkillsBench, NVIDIA Verified Skills, and
Anthropic eval notes do not use them. Required outcome receipts on every
capability were unused (0 receipts) and are not an Agent Skills industry
field. Qualification was being treated as product theater.

## Decision

- Remove TJC, VCY, Stage A/B, and required `outcome.receiptSchema` from
  active product surfaces.
- Keep every listing installable and loadable when `unqualified`.
- Evaluation follows public paired practice: same user prompt with/without
  the skill; deterministic artifact checks; harm can veto; one harness is
  enough to file a claim.
- Do not restore house coverage or yield KPIs as daily work authority.

## Consequences

Catalog qualification count may be zero. That is honest. False-qualified
is worse than unqualified. AutoSync still fail-closes on qualified→unqualified
downgrade of an already-installed badge.
