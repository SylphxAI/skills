---
name: voice-preserving-editor
description: Edit and review user-provided drafts so they sound like a specific person, team, publication, or locale while preserving facts, claims, citations, technical terms, uncertainty, and judgment. Use when the user asks to humanize writing, remove AI tone, make text sound natural, preserve voice, de-AI a draft, reduce template language, localize tone, clean translationese, or audit AI-flavored prose across English, Chinese, Cantonese, Japanese, Korean, Spanish, French, German, Portuguese, Arabic, or mixed-language copy.
---

# Voice Preserving Editor

Use this skill to improve already-written text without flattening it into generic polished prose.

Default to the revised text only. Add diagnosis, rule IDs, or before/after notes only when the user asks for an audit, review, or explanation.

## Workflow

1. Identify the draft surface: chat, status update, docs, release note, product copy, technical article, model review, social post, academic/professional text, support message, or translation/localization.
2. Lock protected content before rewriting: facts, numbers, names, dates, citations, quoted text, product/model names, code, commands, filenames, URLs, units, prices, benchmark conditions, legal/medical/financial caveats, author judgment, and uncertainty.
3. Choose the edit mode:
   - `audit-only`: list problems without rewriting.
   - `patch`: remove local AI tells while keeping sentence and paragraph structure.
   - `faithful-rewrite`: rewrite paragraphs while preserving every claim and the original argument order.
   - `structural-rewrite`: reorganize only when the user explicitly allows broader rewriting.
4. For long, multilingual, high-stakes, or voice-sensitive work, read `references/voice-preserving-rules.md`.
5. Remove generic AI-writing shells: throat-clearing, binary contrast frames, vague authority, lecture setup, formulaic threes, chatbot artifacts, generic conclusions, manufactured punchlines, over-polished rhythm, and translationese.
6. Match the intended voice and locale. Preserve code-switching, politeness level, register, punctuation norms, and culturally specific phrasing when they carry meaning.
7. Run the final preservation pass before responding.

## Guardrails

- Do not help evade AI detectors, plagiarism checks, academic integrity rules, authorship disclosure, moderation, or platform enforcement.
- Do not launder copied text, imitate a living private person's voice without permission, fabricate lived experience, invent citations, or hide that material facts are uncertain.
- Do not add new examples, numbers, sources, product claims, credentials, testimonials, or personal experience unless the user supplied them.
- Do not turn technical, legal, medical, financial, or policy text into casual prose when precision is the human voice for that surface.
- Do not overcorrect by removing useful structure, domain terms, local idiom, dialect, or roughness that belongs to the author.

If the request is detector evasion or fake authorship, refuse that part and offer a quality-focused edit that improves clarity, specificity, attribution, and voice honestly.

## Output Formats

### Default rewrite

Return only the revised draft.

### Audit requested

```text
Edit mode:
Language/register:
Protected content:
- <fact, quote, term, citation, caveat>

AI-flavor fixes:
- <rule id> <quoted issue> -> <fix direction>

Revised draft:
<text>
```

### Refusal with safe alternative

```text
I can't help hide authorship, bypass detectors, or launder copied work.

I can edit the draft for clarity, attribution, factual accuracy, natural rhythm, and a voice that matches the provided author sample.
```
