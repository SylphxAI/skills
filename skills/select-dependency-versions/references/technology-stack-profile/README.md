# technology-stack-profile

> Constraint depth owned by `select-dependency-versions` (not a listing skill). Other workflows open this path when their body says so.

# Backend, Web, Contract, Interoperability, and Database Migration Profile

Policy/profile pin—not a product job cycle. Apply as stack constraints on matching repos.
Apply when implementing or reviewing stack choices for a matching repository.
Agents do not “run a cycle” of this package; they apply its constraints while doing another job.

**Requirement:** apply this profile when its selector matches the repository.
**Scale rule:** always apply the maximum-scale method. Repository size, language
count, headcount, and “early stage” do not fork the stack.

Read the normative [machine profile](references/profile.json) and the
[resolution method](references/resolution-and-verification.md) before making a
technology or completion decision. The JSON contract owns the selection; a
prose or runtime projection that disagrees with it is invalid.

The profile's digest-bound `assertions.rules` table is the only executable
policy vocabulary. Consumers dispatch on each rule's `kind` and fields; they
must not infer policy from default-key suffixes, rationale text, package names,
or hard-coded role lists.

For the stable architecture and protocol exceptions behind the selected stack,
read the engineering standard's
[cross-platform contract architecture](../../../build-product/references/engineering-standard/references/cross-platform-contract-architecture.md).

For A→B system cutover, data backfill, and dual-write bans, open
[`execute-hard-cutover/references/database-cutover-and-migration.md`](../../../execute-hard-cutover/references/database-cutover-and-migration.md).

## Method

1. Resolve the profile selector against explicit repository lifecycle and
   task-surface facts. Organization/fleet membership is not a selector gate;
   commercial and multi-tenant repositories match without a company allowlist.
2. Classify each component by its service role and owned effects, not by file
   extension, package count, process name, or repository language totals.
3. Resolve the matching role requirement from `assertions.rules`, compare the
   declared implementation, then resolve every owned effect through the
   referenced effect-classification rule and the role's class allowance.
4. Resolve completion only through the declared completion-denominator rule;
   missing facts, unknown or overlapping roles, and zero or multiple effect
   classifications block evaluation.
5. For a public, cross-runtime, cross-repository, or independently versioned
   API/SDK boundary, resolve the `contract-stack-requirement`. Use its one
   Protobuf/Buf contract, Rust server, protocol family, and exact platform
   client selection. An unlisted client platform blocks until this Profile is
   reviewed; it does not author a local stack.
6. Resolve the `interoperability-stack-requirement`: use CloudEvents around
   schema-owned cross-boundary integration-event payloads and OpenTelemetry at
   adapter/bootstrap telemetry boundaries. Keep local domain events native and
   raw operator evidence protected.
7. For relational product databases, schema changes, migration apply, or
   schema-coupled backfill, resolve the `database-migration-stack-requirement`:
   Atlas is the sole production schema applicator; versioned migrations; ban
   ORM push to live DBs and second migration runners; CI requires ephemeral
   full-history replay plus a destructive/data-depend gate; pin OS/arch-matching
   Atlas CLI for apply images.
8. Resolve package versions at implementation time with
   `select-dependency-versions`; the Profile selects package families and
   responsibilities, not stale version numbers.
9. Record repository-local role/effect facts under
   `architecture.components` in the owning product manifest;
   let the live work system resolve live adoption, exceptions, deployment, and
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
- Do not create a REST, GraphQL, TypeScript, Flutter, Swift, Kotlin, or SDK model
  that independently copies the selected cross-runtime contract.
- Keep generated wire types at interfaces/adapters. They are not capability
  domain models, UI state objects, or persistence authorities.
- Keep server state, local UI state, offline state, and backend business truth
  in their declared owners. A state-management library does not merge them.
- Do not let a CloudEvents envelope re-author its schema-owned payload, wrap
  every local domain event, or substitute for ordering/idempotency/replay.
- Do not import OpenTelemetry SDK types into domain policy or expose protected
  telemetry through an unintended public/customer response.
- Do not choose a different migration engine because the repository is “small,”
  Rust-only, TypeScript-only, or early-stage. One fleet method.
- Do not use `drizzle-kit push`, `prisma db push`, or equivalent against non-
  disposable databases. Do not run a second production migration applicator
  beside Atlas.
- Schema multi-step inside the destination system is not a second product stack.
  Permanent dual product systems remain forbidden under hard-cut predicates.

## Output format

Report:

1. matched selector facts, typed selector outcome, and profile revision/digest;
2. applied assertion ids, component roles, and effect ownership;
3. required Rust or TypeScript/Bun/Next selection;
4. applied contract-stack assertion, selected protocol and client libraries;
5. applied event-envelope and telemetry assertion;
6. applied database-migration assertion, Atlas apply/CI contract, and any ban
   violations (second migrator, ORM push, unpinned CLI);
7. any forbidden backend effect, fallback, duplicated contract, unlisted
   client, event-payload fork, or telemetry-boundary violation;
8. role/effect-based completion evidence and unresolved live-state gaps.
