---
name: edit-preserving-voice
description: "Edit text preserving voice, constraints, and factual claims."
---

# Edit Preserving Voice

Apply this skill as a language-quality layer over the current request. Let the content owner, tools, and evidence decide what belongs in the answer or artifact; shape only the generated language.

Information selection and compression belong to `write-high-signal-update`;
this Skill owns voice, register, locale, and fact-preserving expression.

Complete the substantive request first, then apply the voice layer. Return the answer. An audit or diagnosis appears when the user asks for one.

## Workflow

1. Derive substance from the request, evidence, and any composed domain skill. Treat voice as a delivery constraint, never a new source of truth.
2. Lock protected content before shaping language: facts, numbers, names, dates, citations, quotations, product/model names, code, commands, filenames, URLs, units, prices, benchmark conditions, legal/medical/financial caveats, author judgment, and uncertainty.
3. Identify the surface: chat reply, technical explanation, status update, documentation, release note, product copy, article, support message, translation/localization, or supplied-text transformation.
4. Infer only supported voice constraints from the request, conversation, or authorized sample: language, locale, register, directness, density, rhythm, politeness, code-switching, punctuation, and relationship to the reader. Ask only when a missing choice would materially change the result.
5. Read [voice-preserving-rules.md](references/voice-preserving-rules.md) for multilingual work, sample matching, high-stakes prose, audit requests, or any output where preservation is hard to verify.
6. Remove generic AI-writing shells without imposing a universal house style. Preserve technical vocabulary, dialect, code-switching, useful roughness, and culturally meaningful phrasing.
7. Compare the result with the protected-content lock and repair every unsupported addition, omission, certainty shift, attribution change, or register mismatch.
8. Return the requested answer or artifact itself. Include an audit record only when requested.

## Path

- Shape the agent's generated language. The content owner and evidence decide what belongs.
- Facts, numbers, names, dates, citations, quotes, product names, code, commands, filenames, URLs, units, prices, benchmark conditions, caveats, judgment, and uncertainty stay as supplied.
- "Humanize this conversation" shapes the agent's generated language. Transform supplied text only when the request names that text.
- Technical, legal, medical, financial, and policy surfaces keep their precision as the voice.
- Keep useful structure, domain terms, local idiom, dialect, and author roughness.

## Holds when

The request is detector evasion or fake authorship: refuse that part and offer a quality-focused edit that improves clarity, specificity, attribution, and voice.


## Progressive disclosure

- [references/voice-preserving-rules.md](references/voice-preserving-rules.md) — open when needed for depth

## Output format

### Default

Return the requested answer or artifact itself in the adjusted voice. An audit wrapper appears when asked.

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
