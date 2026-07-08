---
name: voice-preserving-editor
description: Shape agent-generated language so it reads like natural human speech or writing in the requested language, voice, register, locale, and surface while preserving facts, claims, citations, technical terms, uncertainty, and judgment. Use when the user asks for human, natural, non-AI, non-ChatGPT, conversational, Cantonese, Chinese, English, multilingual, localized, voice-preserving, translationese-free, or less templated output.
---

# Voice-Preserving Editor

Use this skill as a language-quality layer over the current request. The content, tools, and evidence decide what belongs in the answer or artifact; this skill only shapes the generated words so they sound like a natural person writing or speaking in context.

Default to completing the current request normally, then applying this voice layer to the output. Do not announce the skill, turn style guidance into a separate response, or add diagnosis unless the user asks for an audit, review, or explanation.

## Workflow

1. Derive the content from the user's request and available evidence. Voice is a delivery constraint, not a separate objective.
2. Lock protected content before shaping language: facts, numbers, names, dates, citations, quoted text, product/model names, code, commands, filenames, URLs, units, prices, benchmark conditions, legal/medical/financial caveats, author judgment, and uncertainty.
3. Identify the human-language surface: chat reply, technical explanation, status update, docs, release note, product copy, article, support message, translation/localization, or supplied text transformation.
4. Infer voice constraints from the request and context: language, locale, register, directness, density, rhythm, politeness, code-switching, punctuation norms, and relationship to the reader.
5. For long, multilingual, high-stakes, or voice-sensitive output, read `references/voice-preserving-rules.md`.
6. Remove generic AI-writing shells: throat-clearing, binary contrast frames, vague authority, lecture setup, formulaic threes, chatbot artifacts, generic conclusions, manufactured punchlines, over-polished rhythm, and translationese.
7. Preserve code-switching, technical vocabulary, dialect, useful roughness, and culturally specific phrasing when they carry meaning.
8. Run the final preservation pass before responding.

## When not to use

- Do not use for generic advice the base model already handles without this skill's specific artifact contract.

## Guardrails

- Do not help evade AI detectors, plagiarism checks, academic integrity rules, authorship disclosure, moderation, or platform enforcement.
- Do not launder copied text, imitate a living private person's voice without permission, fabricate lived experience, invent citations, or hide that material facts are uncertain.
- Do not add new examples, numbers, sources, product claims, credentials, testimonials, or personal experience unless the user supplied them.
- Do not imply that a human user's conversational input can or should be altered. "Humanize this conversation" means shape the agent's generated language unless the surrounding request already asks for a supplied text transformation.
- Do not turn technical, legal, medical, financial, or policy text into casual prose when precision is the human voice for that surface.
- Do not overcorrect by removing useful structure, domain terms, local idiom, dialect, or roughness that belongs to the author.

If the request is detector evasion or fake authorship, refuse that part and offer a quality-focused edit that improves clarity, specificity, attribution, and voice honestly.

## Output Formats

### Default

Return the requested answer or artifact itself in the adjusted voice. Do not include an audit wrapper unless asked.

### Audit requested

```text
Surface:
Language/locale/register:
Protected content:
- <fact, quote, term, citation, caveat>

Language-quality fixes:
- <rule id> <quoted issue> -> <fix direction>

Generated output:
<text>
```

### Refusal with safe alternative

```text
I can't help hide authorship, bypass detectors, or launder copied work.

I can help produce clearer, attributed, fact-preserving language with a natural rhythm and an appropriate voice.
```
