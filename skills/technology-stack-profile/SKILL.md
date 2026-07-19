---
name: technology-stack-profile
description: "Apply the required backend and web technology choices by component role and owned effects. Use when choosing, implementing, reviewing, or measuring production backend, API, gateway, worker, controller, runtime, storage, queue, background-job, browser, product-web, SSR, or TypeScript-to-Rust work."
---

# Backend and Web Technology Profile

**Requirement:** apply this profile when its selector matches the repository.

Read the normative [machine profile](references/profile.json) and the
[resolution method](references/resolution-and-verification.md) before making a
technology or completion decision. The JSON contract owns the selection; a
prose or runtime projection that disagrees with it is invalid.

The profile's digest-bound `assertions.rules` table is the only executable
policy vocabulary. Consumers dispatch on each rule's `kind` and fields; they
must not infer policy from default-key suffixes, rationale text, package names,
or hard-coded role lists.

## Method

1. Resolve the profile selector against explicit organization, repository
   lifecycle, and task-surface facts.
2. Classify each component by its service role and owned effects, not by file
   extension, package count, process name, or repository language totals.
3. Resolve the matching role requirement from `assertions.rules`, compare the
   declared implementation, then resolve every owned effect through the
   referenced effect-classification rule and the role's class allowance.
4. Resolve completion only through the declared completion-denominator rule;
   missing facts, unknown or overlapping roles, and zero or multiple effect
   classifications block evaluation.
5. Record repository-local role/effect facts under
   `architecture.components` in the owning product manifest;
   let Control Plane resolve live adoption, exceptions, deployment, and
   organization-wide completion without copying this profile into product repositories.

## Guardrails

- Treat TypeScript product web as an intended production surface, never as a
  Rust migration residual merely because it uses `.ts` or Bun.
- Treat a TypeScript process that owns a backend role or forbidden effect as a
  profile violation even when its API contract matches Rust.
- Fix an incomplete or defective backend in Rust. Do not restore TypeScript as
  fallback, dual-run implementation, shadow production, recovery, or delay tactic.
- Count completion by declared component roles and owned effects. A repository is not
  complete because a source-language count reaches a target.
- Do not silently invent a new role for an ambiguous component. Unknown or
  conflicting resolution fails closed and triggers profile review.

## When not to use

- A language-internal implementation detail that does not change component
  role, owned effects, profile selection, or completion semantics → use the
  engineering standard.
- Live work claims, repository head state, deployment revisions, production
  defects, or organization-wide adoption status → query Control Plane; this static profile
  does not own live state.
- A repository-specific exception or public contract change → author the
  owning decision and typed exception; do not rewrite this profile locally.

## Output format

Report:

1. matched selector facts, typed selector outcome, and profile revision/digest;
2. applied assertion ids, component roles, and effect ownership;
3. required Rust or TypeScript/Bun/Next selection;
4. any forbidden backend effect or fallback;
5. role/effect-based completion evidence and unresolved live-state gaps.
