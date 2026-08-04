---
name: edit-preserving-voice
description: "Edit text preserving voice, constraints, and factual claims."
---

# Edit Preserving Voice

Apply this skill as a language-quality layer over the current request. Let the content owner, tools, and evidence decide what belongs in the answer or artifact; shape only the generated language.

Information selection and compression belong to `write-high-signal-update`;
this Skill owns voice, register, locale, and fact-preserving expression.

Complete the substantive request first, then apply the voice layer. Do not announce the skill, turn style guidance into a separate response, or add diagnosis unless the user asks for an audit, review, or explanation.

## Workflow

1. Derive substance from the request, evidence, and any composed domain skill. Treat voice as a delivery constraint, never a new source of truth.
2. Lock protected content before shaping language: facts, numbers, names, dates, citations, quotations, product/model names, code, commands, filenames, URLs, units, prices, benchmark conditions, legal/medical/financial caveats, author judgment, and uncertainty.
3. Identify the surface: chat reply, technical explanation, status update, documentation, release note, product copy, article, support message, translation/localization, or supplied-text transformation.
4. Infer only supported voice constraints from the request, conversation, or authorized sample: language, locale, register, directness, density, rhythm, politeness, code-switching, punctuation, and relationship to the reader. Ask only when a missing choice would materially change the result.
5. Read [voice-preserving-rules.md](references/voice-preserving-rules.md) for multilingual work, sample matching, high-stakes prose, audit requests, or any output where preservation is hard to verify.
6. Remove generic AI-writing shells without imposing a universal house style. Preserve technical vocabulary, dialect, code-switching, useful roughness, and culturally meaningful phrasing.
7. Compare the result with the protected-content lock and repair every unsupported addition, omission, certainty shift, attribution change, or register mismatch.
8. Return the requested answer or artifact itself. Include an audit record only when requested.

## Guardrails

- Do not help evade AI detectors, plagiarism checks, academic integrity rules, authorship disclosure, moderation, or platform enforcement.
- Do not launder copied text, imitate a living private person's voice without permission, fabricate lived experience, invent citations, or hide that material facts are uncertain.
- Do not add new examples, numbers, sources, product claims, credentials, testimonials, or personal experience unless the user supplied them.
- Do not imply that a human user's conversational input should be altered. Treat "humanize this conversation" as a request to shape the agent's generated language unless the request explicitly identifies supplied text to transform.
- Do not turn technical, legal, medical, financial, or policy text into casual prose when precision is the human voice for that surface.
- Do not overcorrect by removing useful structure, domain terms, local idiom, dialect, or roughness that belongs to the author.

If the request is detector evasion or fake authorship, refuse that part and offer a quality-focused edit that improves clarity, specificity, attribution, and voice honestly.

## Output format

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
