# Skill Repository Curation Patterns

## The value test

Assess each skill in this order:

1. **Recurring job** — Would a user intentionally ask for this work again?
2. **Independent artifact** — Can the output be accepted without reopening a
   broader sibling skill?
3. **Knowledge delta** — Does the package contain decisions, checks, failure
   modes, or procedures that a capable base agent would not reliably infer?
4. **Routing boundary** — Can realistic positive, near-neighbour negative,
   abstention, and compound prompts distinguish it?
5. **Content quality** — Can an agent execute it without hidden context,
   invented tools, or rereading the source material?
6. **Maintenance reason** — Is there a present user, owner, or product reason
   to keep the route accurate?

A skill can be valuable before formal benchmarks exist, but its evidence state
must remain honest. Presence in a repository is not adoption or behavior proof.

## Content review

A strong package usually has:

- frontmatter that names concrete trigger language and nearby exclusions;
- one bounded job and a deliverable another agent can consume;
- a short procedure with decisions in execution order;
- explicit uncertainty, authority, and safety boundaries;
- references for detailed methods, matrices, examples, and volatile facts;
- scripts only for deterministic repeated work;
- positive and negative routing examples that resemble real requests.

Common failure modes:

- a topic summary with no reusable procedure;
- a generic project plan wrapped in skill language;
- mandatory control-plane, GitOps, attestation, or automation boilerplate that
  is unrelated to the user's job;
- overlapping skills differentiated only by nouns or headings;
- static volatile requirements presented as current authority;
- a long SKILL.md that loads every edge case for every request;
- references that repeat the entry point instead of adding depth.

## Collision decisions

Use job and artifact—not topic—as the merge test.

| Relationship | Decision |
| --- | --- |
| Same topic, different accepted artifacts | Keep both; clarify triggers and handoff |
| Same job and artifact, one package strictly stronger | Merge into the clearer owner |
| Shared sub-method only | Keep both; reference a canonical shared source if useful |
| Broad orchestrator and narrow specialist | Keep only if the orchestrator owns a distinct composition artifact |
| Generic advice with no knowledge delta | Retire without inventing a replacement |
| Plausible route with unknown demand or method | Time-box an investigation; do not publish a shell |

Before a merge, map every unique decision rule, state machine, failure mode,
example, helper, and eval assertion to its destination. If that map is
ambiguous, the merge is not ready.

## Repository shape

Prefer the repository's existing conventions. At minimum, installation should
have an unambiguous entry point per skill and retired names should not remain
discoverable. A README or generated catalog can help people browse, but it is a
projection—not the reason a skill is valuable.

Public versus private is normally simple:

- public repositories may be cloned or installed by anyone under their license;
- private repositories require ordinary repository access;
- neither choice requires a bespoke marketplace or control plane;
- repository visibility does not replace licensing, provenance, or secret
  handling.

## Curation report

For each route, record:

- name;
- realistic request;
- primary artifact;
- unique mechanisms;
- nearest neighbours;
- content problems;
- keep, rewrite, merge, retire, or investigate;
- exact files and validation affected.

End with a small collision map and an absorption map for actual merges. Keep
delivery truth separate: content patched, checks passed, committed, merged,
published, and install-verified are different states.
