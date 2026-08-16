---
name: distill-source-to-skill
description: Distill documentation, repositories, notes, transcripts, or expert material into one installable Agent Skill package while preserving useful procedures, authority, and licensing boundaries.
---

# Distill Source To Skill

Turn source material into a concise reusable skill that can perform the recurring job on its own.

## Method

1. Confirm the source, owner, revision, visibility, license, intended users, and publication boundary.
2. Identify concrete recurring requests, expected outcomes, specialized procedures, domain terms, failure modes, and reusable resources.
3. Separate authoritative facts from examples, commentary, history, and source-specific structure.
4. Choose one requestable job with an independently useful result.
5. Write a verb-led skill name and a description that says what the skill does and when it applies.
6. Put the essential procedure in `SKILL.md` and detailed domain material in directly linked references.
7. Add scripts for repeatable deterministic work and assets for files used in outputs.
8. Synthesize in original language appropriate to the skill's audience while retaining required attribution and license notices.
9. Run included scripts, resolve links, and exercise the package on a representative request using the intended source-independent workflow.
10. Compare the result with the original source for missing mechanisms, altered meaning, sensitive leakage, and attribution accuracy.

Read [Source-to-skill patterns](references/source-to-skill-patterns.md) for source selection, package shapes, and knowledge-preservation checks.

## Output

Return the package path, one-line job, source and license summary, knowledge placed in each resource, representative task result, and remaining source limitation.
