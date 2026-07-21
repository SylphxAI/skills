---
name: source-to-skill-distiller
description: "Create or repair one installable Agent Skill package from supplied source material. Use only when the requested output is a SKILL.md or Skill package and the job needs mechanism extraction, evidence/publication boundaries, workflow, output contract, references, multilingual handling, evals, or validation. Do not use for ordinary summarization, translation, documentation, repository review, or code work."
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

1. Name the evidence boundary: source paths, links, languages, formats, sections
   read, sections unavailable, assumptions, sensitivity, intended audience,
   license, and publication authority. Access to a private source or history is
   not authority to publish it.
2. Choose the smallest mode:
   - quick brief: short pasted method or memo;
   - source audit: multiple files, transcripts, repositories, media, or mixed languages;
   - package build: user asks for files, repo changes, installability, or validation;
   - repair: existing skill fails, over-triggers, summarizes, or cannot validate.
3. Extract mechanism cards from the source: trigger, user job, decision rule, procedure, output, quality signal, failure mode, and keep/merge/discard decision.
4. Choose one package shape before writing: single procedural skill by default,
   one skill with modes when source tasks share a route. Do not create meta
   skill routers. Put extra knowledge in `references/` or merge into an existing
   owner unless the recurring jobs, independently accepted artifacts, and
   acceptance authorities are distinct.
5. Author the skill around action: concise front-loaded metadata naming the
   job, artifact, material contexts, and nearby exclusions; then a focused
   workflow, output protocol, boundaries, and linked references. Keywords are
   semantic anchors, not a list to stuff. Put long examples, rubrics, language
   tables, and edge cases in references.
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
- Before writing a public package, remove or safely generalize secrets,
  customer/personal data, raw telemetry, private topology/process/migration
  state, control knobs, security-sensitive details, and other non-public
  identifiers. Redaction must preserve the reusable mechanism without making
  the hidden source reconstructable.
- Do not turn every chapter, anecdote, or example into a rule. Keep only mechanisms that change future agent behavior.
- Do not create a meta skill router or skill family when one procedural skill with modes or a `references/` section is enough.
- Do not assume a long body repairs weak discovery metadata: current Codex and
  Claude select from `name` and `description` before loading the body and may
  shorten or omit descriptions under catalog pressure; verify other runtimes
  against their own documented behavior.
- Read the target repository's contributing contract and existing package descriptions before adding a new standalone skill; preserve one clear semantic owner and avoid near-neighbour routing collisions.
- Do not make a skill depend on private tools, credentials, or hidden chat context.
- Do not publish, push, or claim benchmark quality without the target repository's validation and delivery gates.

## Quality Standard

A finished conversion:

- names what evidence was actually read;
- records the intended audience, sensitivity, license, and publication
  authority for reused material;
- extracts decisions and failure modes, not only themes;
- gives compact semantic metadata that can route without body context;
- runs without the original source in context;
- includes output contracts and validation signals;
- stores language, examples, and rubrics in references when they would bloat the main file;
- includes positive and negative eval prompts;
- passes structural validation for the target repository;
- reports skipped validation honestly.

## When not to use

- Use `skill-repository-curator` when the job is repository-wide content
  curation, collision resolution, consolidation, or retirement rather than one
  bounded conversion.
- Use `skill-eval-designer` when the package already exists and the primary deliverable is a falsifiable routing/behavior evaluation.
- Do not use this workflow for a plain summary, translation, or knowledge-base note when no reusable procedure and independent trigger/output are required.
