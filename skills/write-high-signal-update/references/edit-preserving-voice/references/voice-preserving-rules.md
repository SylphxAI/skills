# Voice-Preserving Language Rules

This reference defines language-quality rules for generated text so it reads like natural human speech or writing in context. It is not a detector-evasion playbook. Use it after the underlying content is clear.

## Contents

- [Rule IDs](#rule-ids)
- [Output boundary table](#output-boundary-table)
- [Generated output lens](#generated-output-lens)
- [Preservation checklist](#preservation-checklist)
- [Pattern sweep](#pattern-sweep)
- [Multilingual rules](#multilingual-rules)
- [Voice sample extraction](#voice-sample-extraction)
- [Safety boundary table](#safety-boundary-table)
- [Audit record schema](#audit-record-schema)
- [Final checklist](#final-checklist)

## Rule IDs

- `voice-1` — Content before tone. The current request and evidence decide what belongs in the output; this skill only shapes how generated language is expressed.
- `voice-2` — Preserve judgment. Keep the author's stance, uncertainty, irritation, enthusiasm, skepticism, and first-hand observations when the source includes them.
- `voice-3` — Fix patterns, not identity. Remove template structures and filler without sanding away dialect, technical vocabulary, local idiom, or useful roughness.
- `voice-4` — Match the surface. A chat reply, technical doc, release note, model review, academic abstract, support message, and social post should not converge into one house style.
- `voice-5` — Preserve truth before style. Lock facts, claims, numbers, names, dates, citations, quotes, code, commands, URLs, product names, model names, prices, benchmarks, and caveats before shaping wording.
- `voice-6` — Treat voice samples as constraints. Derive sentence rhythm, paragraph starts, punctuation habits, pronoun use, code-switching, register, and recurring quirks from the sample. Do not intensify quirks into parody.
- `voice-7` — Remove AI shells. Target generic framing, binary contrast, vague authority, formulaic threes, lecture colon, chatbot artifacts, generic conclusions, manufactured punchlines, over-polished symmetry, and meta-commentary.
- `voice-8` — Keep attribution honest. If a claim has no source, either preserve the uncertainty, ask for a source, or remove the authority wrapper. Never invent a citation, study, customer quote, or personal experience.
- `voice-9` — Localize language, not personality. Preserve politeness level, script direction, punctuation norms, honorifics, dialect markers, and culturally specific phrasing where they carry meaning.
- `voice-10` — Target generated language. User input is context and instruction; the controllable artifact is whatever text the agent is producing for the current request.
- `voice-11` — Final audit before return. Check preservation, voice fit, locale fit, remaining AI shells, invented content, and unsafe authorship or detector-evasion framing.

## Output Boundary Table

| Current content situation | Apply this skill to | Avoid |
| --- | --- | --- |
| Agent is answering, explaining, reporting, or discussing | The wording of the generated answer | Changing content, facts, or evidence |
| Agent is producing docs, copy, status, support text, or an article | The generated artifact's voice, rhythm, and locale fit | Flattening the artifact into one generic house style |
| User supplied text and the request asks for transformation | The generated output derived from that text | Adding claims, sources, or experiences not in the request context |
| User asks for a language audit | The diagnosis of AI-shaped patterns and concrete improvement directions | Rewriting unless the user asked for rewritten output |
| Request is detector evasion, laundering, fake authorship, or fabricated experience | A refusal plus honest clarity/attribution alternative | Helping bypass detectors or hide authorship |

## Generated Output Lens

Use this lens on any generated prose.

1. Settle the content first. Voice is a delivery constraint, not a replacement for substance.
2. Match the requested language, register, density, and directness where appropriate. Cantonese, Chinese, English, and mixed technical phrasing are all valid when context calls for them.
3. Treat user input as context unless the request explicitly asks for a transformed output derived from supplied text.
4. Remove agent tells from the reply: canned acknowledgement, excessive apology, "as an AI", roadmap filler, moralizing prefaces, generic summary endings, and performative humility.
5. Preserve technical precision. A concise engineering answer can still sound human; casualness is not always the right voice.
6. Before sending, silently reread the reply and cut any sentence that exists only to announce what the answer will do.

## Preservation Checklist

Use this checklist before and after editing:

- Facts: dates, numbers, measurements, prices, locations, versions, model names, product names, company names.
- Technical truth: code, APIs, commands, filenames, paths, configs, benchmarks, test conditions, failure modes.
- Argument: thesis, order of reasoning, support, caveats, counterpoints, scope limits, confidence level.
- Author voice: first-person claims, lived testing, explicit judgment, hedges, local idiom, recurring phrasing.
- Attribution: quotations, citations, links, named sources, screenshots, quoted user feedback, study names.
- Format: headings, lists, tables, code blocks, markdown links, locale-specific punctuation, right-to-left direction.
- Risk: legal, medical, financial, policy, security, safety, privacy, or academic-integrity implications.

## Pattern Sweep

Scan for these same-class issues across the generated output, not just the first obvious sentence:

| Pattern class | Signals | Preferred fix |
| --- | --- | --- |
| Agent self-prelude | "I understand", "great question", "let me clarify", "happy to help" | Start with the answer or the correction |
| Generic opening | "in today's world", "let's dive in", "here's why", "值得注意的是" | Start with the concrete subject, event, or claim |
| Binary contrast shell | "not X but Y", "不是 A，而是 B", "no longer X, now Y" | State the actual claim directly |
| Lecture colon | "the key is:", "my conclusion is:", "原因很简单：" | Use a normal sentence or a concrete inventory |
| Vague authority | "experts say", "research shows", "业内认为" | Name the source, downgrade uncertainty, or remove |
| Formulaic threes | Three neat adjectives, three benefits, three abstract values | Keep the natural number of points |
| Chatbot artifact | "hope this helps", "as an AI", "knowledge cutoff", "great question" | Delete unless quoted as source material |
| Empty conclusion | "in conclusion", "the future is bright", "这说明..." | End on a fact, action, consequence, or specific judgment |
| Manufactured punchline | Aphorism, slogan, dramatic one-line ending | Replace with the actual claim or observation |
| Over-polish | Same-length sentences, balanced paragraphs, uniform transitions | Vary rhythm according to the author's sample |
| Translationese | Calqued connectors, long noun chains, unnatural passive voice | Rewrite into local sentence order and register |

## Multilingual Rules

| Language or script | Preserve | Watch for | Fix |
| --- | --- | --- | --- |
| English | Domain terms, author rhythm, contractions if natural, deliberate dashes if the sample uses them | Signposting, em dash overuse, passive actor hiding, rule-of-three polish, fake-candid openers | Name actors, cut announcements, vary cadence, keep the author's punctuation profile |
| Simplified or Traditional Chinese | Technical tokens, named models, author judgment, colloquial force, Chinese punctuation norms | 二元对比壳、讲义腔、路标词、空总结、伪洞察词、英译中长定语 | 直接给事实或判断，保留术语，删掉姿态层 |
| Cantonese | 粵語語氣、句尾助詞、code-switching、繁簡偏好、香港/廣東語境 | 被改成普通書面中文、過度正經、AI 式「總括而言」 | 保留自然口吻，減少模板句，避免把作者聲口改散 |
| Japanese | です/ます vs だ register, honorifics, kanji/kana balance, product names | 〜することができます overuse, excessive polite padding, literal English order | Pick one register, shorten helper verbs, keep honorific intent |
| Korean | 합니다/해요/한다 level, honorifics, spacing, Sino-Korean technical terms | Generic formal essay tone, overuse of "중요합니다", flattened politeness | Keep speech level consistent, replace generic importance claims with specifics |
| Spanish | tú/usted/vosotros/ustedes, gender and number agreement, regional vocabulary | Literal English connectors, "es importante destacar", marketing adjectives | Use local register, keep agreement, cut announcement phrases |
| French | tu/vous, gender agreement, formal vs conversational register, typography spacing | Calqued English order, "il est important de noter", abstract nouns | Use French-native flow, reduce nominalizations |
| German | Sie/du, compound nouns, case agreement, directness level | Long nominal chains, English import syntax, generic "wichtig ist" | Split only where useful, preserve precise compounds, name the actor |
| Portuguese | você/tu/o senhor, Brazilian vs European terms, gender agreement | Generic "é importante ressaltar", English-shaped sequence | Keep variant consistent, state claims directly |
| Arabic or other RTL scripts | RTL direction, Modern Standard vs dialect, honorifics, religious/cultural phrases when source uses them | Flattening dialect into generic MSA, losing punctuation direction, invented idiom | Preserve register and script behavior; localize cautiously |
| Mixed-language technical copy | English API/model/tool tokens, code, commands, model names, community jargon | Translating identifiers, replacing product names with generic pronouns | Keep tokens stable and explain only when needed |

## Voice Sample Extraction

When the user gives a sample, extract constraints instead of copying phrases:

| Dimension | Ask | Apply |
| --- | --- | --- |
| Sentence rhythm | Short, long, mixed, clipped, flowing? | Match distribution, not exact sentences |
| Paragraph entry | Context first, claim first, anecdote first, data first? | Start paragraphs the same way when it fits |
| Pronouns | I, we, you, no pronouns, team voice? | Preserve author relationship with reader |
| Punctuation | Commas, parentheses, semicolons, dashes, CJK marks? | Keep the sample's normal punctuation, not a generic ban list |
| Code-switching | Which terms stay in English or another language? | Keep natural switches and technical tokens |
| Roughness | Does the author leave mild asymmetry or blunt judgment? | Do not over-smooth it away |

## Safety Boundary Table

| Request | Response |
| --- | --- |
| "Make this pass an AI detector" | Refuse evasion; offer an honest quality edit focused on specificity, attribution, clarity, and voice |
| "Talk to me like a person" | Shape the generated reply; keep the content and facts from context |
| "Rewrite copied text so it looks original" | Refuse laundering; offer a summary, citation-aware paraphrase, or original outline |
| "Make it sound like this private person" | Ask for permission or use a user-provided authorized style brief; otherwise offer generic register guidance |
| "Add real-sounding experience" | Do not invent; ask for the user's real notes or mark placeholders |
| "Add citations" | Add placeholders or ask for sources; never fabricate |
| "Hide that AI helped" | Do not assist deception; edit for quality without authorship claims |

## Audit Record Schema

Use this compact schema when the user wants a review:

```text
surface:
language_register:
protected_spans:
  - kind:
    text:
    reason:
issues:
  - rule_id:
    quote:
    severity: low | medium | high
    fix:
final_checks:
  preservation: pass | risk
  invented_content: none | risk
  detector_evasion: none | refused
  locale_fit: pass | risk
```

## Final Checklist

- The generated output keeps every required fact, caveat, and author judgment.
- The voice sounds like the source or sample, not like a universal editor.
- The language register matches the surface and locale.
- No new facts, sources, examples, data, credentials, or experience were invented.
- AI shells were removed across the whole output, not only in the first paragraph.
- The response does not promise detector evasion or fake authorship.
