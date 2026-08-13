---
name: design-skill-evals
description: "Design falsifiable skill evals: same-prompt paired tasks, oracles, harms."
---

# Design Skill Evals

Produce a small eval that can **disprove** whether this exact skill digest
helps on realistic work. Follow public 2026 practice (SkillsBench paired
evaluation, NVIDIA SkillEvaluator Tier 3): same task with and without the
skill; deterministic checks; harm can veto.

## When to use

- You want to claim this package digest improves work
- You need routing/behavior cases and oracles
- Not for writing the skill procedure (`author-skill`) or portfolio
  decisions (`curate-skill-repository`)

## Method

1. Freeze the claim: this digest, this job, this artifact, this harm.
2. Write 2–3 **real user prompts**. Do not name the skill. Do not say
   “read SKILL.md”. Do not leak expected headings or keywords.
3. Run each prompt twice under the same budget: skill installed as the
   condition, and baseline with no skill. Same prompt text both times.
4. Oracle the **artifact or observable decision**, not a leaked template.
   Add at least one **harm** (forbidden tool path, host-search ban, unsafe
   shortcut). Harm fails the claim even if the happy-path oracle passes.
5. File with `scripts/run-qualification.mjs`. Bind `packageDigest`. One
   harness is enough. Extra models are only for a portability claim.
6. If it fails, edit the skill, not the threshold. Any later byte change
   to loaded files invalidates the proof.

## Guardrails

- Qualification is not a use gate. Unqualified packages stay installed.
- An LLM judge is extra evidence, never the only safety oracle.
- Model self-report (“I loaded the skill”) is not injection proof.
- Do not invent house coverage metrics or live yield scores.

## Output

A suite at `skills/<id>/evals/suite.json` plus, if applied, a
`qualification.json` and a run under `docs/qualification/evals/`.

## Filing

`docs/QUALIFICATION.md` and `schemas/eval-suite.schema.json`. Without a
reproducible run the package stays `unqualified`.
