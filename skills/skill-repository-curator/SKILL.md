---
name: skill-repository-curator
description: Curate a public or private Agent Skills repository by auditing skill usefulness, trigger precision, procedure quality, overlap, composition, progressive disclosure, and retirement. Use when creating, cleaning up, consolidating, or reviewing a repository of skills. Do not use to author one skill from source material, evaluate one skill experimentally, or build a runtime tool marketplace.
---

# Skill Repository Curator

Make a skills repository more useful by improving the skills themselves. The
primary unit is a recurring user job with an independently useful artifact—not
a folder, topic, governance mechanism, or generated catalog row.

## Workflow

1. Establish the repository boundary, intended users, public/private visibility,
   supported skill format, and exact candidate tree. Treat visibility as a
   distribution choice, not the product.
2. Read the repository curation patterns reference. Inventory installable
   skills from their actual entry points and record each skill's trigger, job,
   artifact, unique method, nearest neighbours, references, and validation.
3. Test every route for value: a realistic recurring request, a distinct
   deliverable, non-obvious reusable method, clear positive and negative
   triggers, and a maintenance reason.
4. Inspect the content, not only metadata. Check whether SKILL.md is concise and
   executable, long knowledge is progressively disclosed, examples are concrete,
   scripts automate only mechanical work, and unavailable authority or tools are
   not implied.
5. Compare neighbouring skills by job and artifact. Keep both when their
   deliverables differ; merge only when one route can accept the other's full
   job without ambiguity. Map every unique rule, state, example, and test before
   deleting the absorbed route.
6. Choose keep, rewrite, merge, retire, or investigate. Give every change a
   content reason and an exact file-level action. Preserve a simple tombstone or
   migration note when repository conventions require one.
7. Update routing examples and run the repository's existing structural and
   behavioral checks. Report generated or delivery work separately; do not add
   infrastructure merely to make the curation look complete.

## Resource guide

- Read references/repository-curation-patterns.md for the value test, content
  smells, collision decisions, and absorption method.
- Run scripts/check_skill_folder.py only for a quick folder/frontmatter check;
  it is not behavior, demand, or quality proof.

## When not to use

- Use source-to-skill-distiller when one bounded source needs to become one
  skill package.
- Use skill-eval-designer when the primary artifact is a falsifiable routing or
  behavior evaluation for an existing skill.
- Use a runtime/plugin architecture when the product executes tools, APIs,
  credentials, billing, or permissioned actions; a skill is procedural content.

## Guardrails

- Do not optimize for skill count, folder symmetry, line count, or topic coverage.
- Do not merge skills merely because they mention the same domain; compare the
  requested job, artifact, acceptance authority, and unique mechanisms.
- Do not keep generic wrappers that add no procedure beyond ordinary reasoning.
- Do not turn a normal public/private repository into a control-plane project
  unless the user explicitly asks for that infrastructure and it is necessary.
- Do not claim current demand, behavior, adoption, or superiority from authored
  examples, local installation, or repository presence.
- Do not delete unique knowledge before its destination is explicit and checked.

## Output format

Repository boundary and users:

Portfolio verdict:

Skill decisions:

| Skill | Job | Artifact | Unique value | Collision | Decision | Exact change |
| --- | --- | --- | --- | --- | --- | --- |

Absorption map:

- old mechanism or test -> canonical destination

Missing or weak capabilities:

Validation run:

Delivery state and unresolved evidence:
