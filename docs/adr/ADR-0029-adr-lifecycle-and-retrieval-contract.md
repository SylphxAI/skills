---
id: ADR-0029-adr-lifecycle-and-retrieval-contract
status: superseded
date: 2026-07-31
decision_owner: SylphxAI
supersedes: []
amends: []
scope:
  - documentation-authority
---

# ADR-0029: ADR Lifecycle and Retrieval Contract

## Context

Portfolio repositories accumulate ADRs faster than agents can treat “every
accepted file” as current law. Human garden reviews and narrative registries do
not scale under agent-native, no-human-in-loop execution. At the same time,
naive filters such as `accepted ∩ not-superseded ∩ loose scope` erase amendment
composition, selector semantics, supersession persistence, and unknown
metadata—or invent merged prose as a second law.

`documentation-standard` already owns durable documentation altitude and the
rule that ADRs hold decisions rather than mutable implementation status.
`specification-control-plane-standard` already owns machine gates for durable
facts. This decision makes the ADR lifecycle and retrieval contract explicit,
executable, and atomic for this repository.

## Decision

1. **Name.** The portfolio contract is the **ADR Lifecycle and Retrieval
   Contract**. It extends `documentation-standard` (semantics) and
   `specification-control-plane-standard` (normalized schema, resolver output,
   reference checker). No parallel `adr-garden-*` Skill is created.

2. **Writable authority.** Repo-owned ADR records are the only writable
   decision authority for “why this durable choice exists.” Derived graph,
   index, and merged summaries are rebuildable projections only.

3. **Authored status.** Source status is exactly `proposed | accepted |
   rejected`. Effective `superseded` is **derived** from outgoing
   `supersedes` edges. Inverse relations are generated only.

4. **Typed scope.** `typed_scope` is a selector object:
   - AND across declared facets;
   - OR within values of the same facet;
   - omitted facet on the selector = unconstrained;
   - task missing a facet the selector declares = unresolved;
   - unknown `custom.*` namespace required by a selector = unresolved, never
     silently ignored.
   Canonical facets: `repository`, `capability_id`, `component_id`, `surface`,
   plus namespaced `custom.<ns>.*`. `decision_key` is top-level only (never a
   second copy under `typed_scope`).

5. **Decision mode.** `decision_mode: complementary | exclusive`. Exclusive
   requires `decision_key`. Complementary ADRs may share scope without conflict.

6. **ApplicableDecisionBundle.** The resolver returns ordered **source
   references** (base + amendments), supersession edges, unresolved/excluded
   sets, and provenance digests. It does **not** synthesize authoritative
   merged decision prose. Agents read the ordered source files.

7. **Amendment order.** Bases precede their amendment DAG. Lexicographic id
   orders only semantically independent peers for stable serialization. Sibling
   amendments that overlap the same `decision_key` / material exclusive scope
   without an explicit `amends` chain are unresolved; newly introduced
   ambiguity hard-fails admission.

8. **Supersession.** Unqualified `supersedes` is full supersession in the
   superseder’s applicable scope. Partial supersession requires a machine
   `decision_key` (or typed partial selector). Prose that claims partial
   supersession without machine selector is unresolved, not silent full
   supersede. A supersession edge authored by an accepted, scope-matching
   record does not disappear because the superseder is later superseded
   (no resurrection of earlier targets).

9. **Unknown effects.** Unresolved sources that may own the same exclusive
   `decision_key` or change the task’s material action block that decision
   slice. Adjacent/historical/non-intersecting unresolved sources warn only.
   Inability to decide intersection blocks that decision’s applicability, not
   the whole repository.

10. **Write path.** Classify material durable decision first; if not material,
    update executable authority only. If material, resolve existing graph
    (`unchanged | amend | supersede | new`), write the decision record, then
    implement. Material semantic edits use new independently addressable
    records; in-place edits are non-semantic only.

11. **Atomic Skills cutover.** Landing this contract in `SylphxAI/skills`
    execute-hard-cutovers every existing ADR metadata record, ships schema/resolver/checker,
    and replaces the numeric short-locator-only ADR check inside existing
    `npm test` in the **same candidate**. Dual retrieval semantics are
    forbidden. Product-repo adapters are out of scope for completion.

12. **Default serialization.** New ADRs use Markdown + YAML frontmatter
    carrying the normalized fields. Product-specific parsers are legacy
    adapters only.

## Consequences

- Agents retrieve applicable decisions as a deterministic bundle over an exact
  source revision instead of loading every accepted ADR as law.
- Implementation, delivery observation, live behavior, and Work remain outside
  ADR authority (code/schema/tests, Git/CI/artifacts, GitOps/runtime, Enact).
- Amendment composition is explicit and replayable without LLM-merged law.
- Migration cost is paid once in Skills; fleet adoption remains separate work.

## Verification

- Structural checker: identity, authored status, `decision_owner`, typed_scope,
  relations, cycles, exclusive owners.
- Resolver fixtures assert exact base ids, amendment order, and excluded reason
  codes for representative tasks.
- Exact replay: same inputs → same `input_digest` / `resolver_artifact_digest`.
- `npm test` fails on dual metadata, dangling relations, or resurrection bugs
  covered by fixtures.
