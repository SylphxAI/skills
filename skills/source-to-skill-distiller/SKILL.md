---
name: source-to-skill-distiller
description: Convert source material into reusable Agent Skill packages by extracting evidence boundaries, mechanisms, workflows, output contracts, multilingual handling, references, evals, and validation gates. Use when users provide notes, documents, PDFs, transcripts, videos, courses, repositories, workflows, chat logs, codebases, or rough methods and ask to create, distill, audit, repair, localize, or package a SKILL.md or installable skill in English, Cantonese, Chinese, Japanese, Korean, Spanish, French, German, Portuguese, Arabic, RTL, or mixed-language sources.
---

# Source To Skill Distiller

## Overview

Use this skill to turn source material into a compact, installable skill package that a future agent can use without rereading the original source. Distill mechanisms, not summaries.

## Resource Guide

- Read `references/source-to-skill-patterns.md` for source intake rules, multilingual handling, mechanism cards, package shape decisions, and validation checklists.
- Use the target repository's own validator, registry generator, catalog generator, and eval conventions before adding new local scripts.

## First Principle

The source is evidence. The skill is the reusable control surface: trigger, decision rules, workflow, output contract, boundaries, and validation.

## Workflow

1. Name the evidence boundary: source paths, links, languages, formats, sections read, sections unavailable, and assumptions.
2. Choose the smallest mode:
   - quick brief: short pasted method or memo;
   - source audit: multiple files, transcripts, repositories, media, or mixed languages;
   - package build: user asks for files, repo changes, installability, or validation;
   - repair: existing skill fails, over-triggers, summarizes, or cannot validate.
3. Extract mechanism cards from the source: trigger, user job, decision rule, procedure, output, quality signal, failure mode, and keep/merge/discard decision.
4. Choose one package shape before writing: single procedural skill by default, one skill with modes when source tasks share a route. Do not create meta skill routers. Put extra knowledge in `references/` or merge into an existing owner skill unless triggers and outputs are truly independent.
5. Author the skill around action: trigger-rich frontmatter, concise workflow, output protocol, boundaries, and linked references. Put long examples, rubrics, language tables, and edge cases in references.
6. Add deterministic helpers only when repeated mechanical work exists. Do not script judgment-heavy synthesis.
7. Add eval and behavior examples: positive prompts, nearby negative prompts, expected behaviors, and artifact-shape assertions.
8. Validate locally, patch validator failures once, and report the exact command results and remaining gaps.

## Multilingual Handling

- Preserve source-language trigger phrases when they are likely future user wording.
- Keep code, commands, identifiers, product names, model names, citations, filenames, URLs, and technical tokens stable across languages.
- Separate source language from output language. A Cantonese source can produce an English public skill, but the evidence boundary should say what was translated, preserved, or normalized.
- For RTL, CJK, locale-specific punctuation, pluralization, politeness level, or code-switching, move the detailed rules into a reference instead of crowding `SKILL.md`.

## Output format

### Source-To-Skill Brief

```text
Source boundary:
Languages and formats:
Root job:
Target users:
Mechanisms kept:
Mechanisms discarded:
Skill shape:
Files to create or patch:
Validation plan:
Open uncertainty:
```

### Mechanism Card

```text
Name:
Source evidence:
Trigger:
User job:
Decision rule:
Procedure:
Output:
Quality signal:
Failure mode:
Skill location:
Keep / merge / discard:
```

### Package Report

```text
Skill name:
Evidence boundary:
Package shape:
Files changed:
Validation run:
Trigger examples:
Negative trigger:
Rollback point:
Residual risks:
```

## Boundaries

- Do not invent details from inaccessible documents, private repos, audio, video, screenshots, or links.
- Do not copy source wording into a public skill except short attributed quotes when licensing and policy allow it.
- Do not turn every chapter, anecdote, or example into a rule. Keep only mechanisms that change future agent behavior.
- Do not create a meta skill router or skill family when one procedural skill with modes or a `references/` section is enough.
- Read `docs/skill-admission-model.md` and `docs/skill-collision-map.md` in the target repository before adding a new standalone skill.
- Do not make a skill depend on private tools, credentials, or hidden chat context.
- Do not publish, push, or claim benchmark quality without the target repository's validation and delivery gates.

## Quality Standard

A finished conversion:

- names what evidence was actually read;
- extracts decisions and failure modes, not only themes;
- gives metadata that can trigger without body context;
- runs without the original source in context;
- includes output contracts and validation signals;
- stores language, examples, and rubrics in references when they would bloat the main file;
- includes positive and negative eval prompts;
- passes structural validation for the target repository;
- reports skipped validation honestly.

## When not to use

- Do not use for generic advice the base model already handles without this skill's specific artifact contract.
