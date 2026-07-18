---
name: fleet-engineering-profile
description: "Apply the binding Sylphx fleet language and effect boundary. Use when choosing, implementing, reviewing, or measuring production backend, API, gateway, worker, controller, runtime, storage, queue, background-job, browser, product-web, SSR, or TypeScript-to-Rust work."
---

# Fleet Engineering Profile

**Authority: binding** (`packageKind: profile`, lifecycle `active`).

Read the normative [machine profile](references/profile.json) and the
[resolution method](references/resolution-and-verification.md) before making a
language-authority or completion decision. The JSON contract is the semantic
authority; a prose or runtime projection that disagrees with it fails closed.

## Method

1. Resolve the profile selector against explicit organization, repository
   lifecycle, and task-surface facts.
2. Classify each component by its service role and owned effects, not by file
   extension, package count, process name, or repository language totals.
3. Apply Rust authority to production backend and durable-effect roles. Apply
   TypeScript/Bun/Next authority to browser, product-web, SSR, and UI
   orchestration roles.
4. Reject web ownership of backend database mutation, durable queues, business
   effects, backend authorization decisions, or a TypeScript backend fallback.
5. Record repository-local role/effect facts in the owning product manifest;
   let Control Plane resolve live adoption, exceptions, deployment, and fleet
   convergence without copying this profile into product repositories.

## Guardrails

- Treat TypeScript product web as an intended production surface, never as a
  Rust migration residual merely because it uses `.ts` or Bun.
- Treat a TypeScript process that owns a backend role or forbidden effect as a
  profile violation even when its API contract matches Rust.
- Fix an incomplete or defective backend in Rust. Do not restore TypeScript as
  fallback, dual-run authority, shadow production, recovery, or delay tactic.
- Count completion by declared roles and observed effects. A repository is not
  complete because a source-language count reaches a target.
- Do not silently invent a new role for an ambiguous component. Unknown or
  conflicting resolution fails closed and triggers profile review.

## When not to use

- A language-internal implementation detail that does not change component
  role, owned effects, fleet selection, or completion semantics → use the
  engineering standard.
- Live work claims, repository head state, deployment revisions, production
  defects, or fleet adoption status → query Control Plane; this static profile
  does not own live state.
- A repository-specific exception or public contract change → author the
  owning decision and typed exception; do not rewrite this profile locally.

## Output format

Report:

1. matched selector facts and profile revision/digest;
2. component roles and effect ownership;
3. binding Rust or TypeScript/Bun/Next selection;
4. any forbidden backend effect or fallback;
5. role/effect-based completion evidence and unresolved live-state gaps.
