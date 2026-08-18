---
name: distill-source-to-skill
description: Distill documentation, repositories, notes, transcripts, or expert material into one installable Agent Skill package while preserving useful mechanisms, authority, licensing, and publication boundaries.
---

# Distill Source To Skill

Turn source material into a concise reusable skill that can perform one
recurring job without the original source remaining in context.

## When to use

- A document, repository, transcript, or mixed corpus should become one
  installable skill package.
- The useful material is a procedure, decision rule, failure mode, or output
  contract rather than a summary.
- An existing package needs source-grounded repair after losing or distorting
  mechanisms.

Use `author-skill` to revise an already understood package in place and
`curate-skill-repository` when the job is portfolio-wide ownership,
collision, merge, split, or retirement.

## Method

1. Name the evidence boundary: exact sources and revisions read, unavailable
   sections, languages and formats, assumptions, sensitivity, audience,
   ownership, license, and publication authority. Access to a private source or
   Git history is not authority to publish it.
2. Select the smallest mode: quick brief, multi-source audit, installable
   package build, or repair of an existing package.
3. Extract mechanism cards. For each candidate record its trigger, user job,
   decision rule, ordered procedure, output, quality signal, failure mode, and
   keep, merge, or discard disposition.
4. Choose one package shape. Default to one procedural skill with optional
   references; split only when the source contains independently requestable
   jobs with distinct accepted artifacts and acceptance authorities.
5. Write concise frontmatter that names the concrete job, artifact, material
   contexts, and closest exclusion. Put the executable procedure, boundaries,
   output contract, and validation signals in `SKILL.md`; move long examples,
   rubrics, locale detail, and edge cases to directly linked references.
6. Add a deterministic helper only for repeated mechanical work. Keep judgment,
   synthesis, and semantic disposition in the method.
7. Add realistic positive, nearby-negative, ambiguous, compound, and
   multilingual behavior examples plus artifact-shape assertions where they
   can falsify the package claim.
8. Validate with the target repository's existing format, link, and script
   checks. Exercise a representative source-independent task, compare its
   result with the original evidence for missing or altered mechanisms, and
   report exact residual gaps.

Read [source-to-skill patterns](references/source-to-skill-patterns.md) for
mechanism-card fields, package-shape choices, multilingual handling, and the
loss-review checklist.

Read [behavior examples](references/behavior-examples.md) when checking route
boundaries and the Source-To-Skill Report artifact.

## Output

Return a **Source-To-Skill Report** containing:

- evidence boundary, languages/formats, authority, license, and publication
  scope;
- root job, target users, package shape, and semantic owner;
- mechanisms kept, merged, discarded, and where each one lives;
- package files, positive and negative behavior examples, and validation run;
- source limitations, residual risk, and rollback point.

## Boundaries

- Source is evidence; the skill is a reusable control surface, not a summary or
  a second source of law.
- Details from unread or unavailable sources remain unknown.
- Secrets, customer data, raw telemetry, private topology, control knobs, and
  hidden identifiers stay out of public packages.
- Generated catalogs, qualification control planes, installers, and host
  routing remain outside a package unless the repository explicitly owns them.
