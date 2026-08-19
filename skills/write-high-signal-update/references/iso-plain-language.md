# ISO & controlled-language mapping for human–agent documents

## ISO 24495-1:2023 Plain Language (four governing principles)

| Principle | Plain meaning | Agent-facing practice |
| --- | --- | --- |
| Relevance | Readers get what they need | Delete fluff; keep only task context |
| Findability | Readers find what they need | Headings, lists, numbering (ISO 2145 style) |
| Understandability | Readers understand what they find | Short active sentences; one meaning per term |
| Usability | Readers use the information | Callable steps; schema for agent consumers |

Scope note: applies to printed/digital text; does not cover token cost, model
choice, or agent contracts — use the skill method for those layers.

## ASD-STE100 Simplified Technical English (controlled natural language)

- Active voice; one instruction per sentence.
- Approved vocabulary with one meaning per term.
- No unnecessary synonyms or jargon.
- Short sentences, logical structure.

Why it matters here: STE's "controlled vocabulary = less ambiguity" is the same
mechanism that improves LLM comprehension (ambiguity, not brevity, is the cost).

## ISO 2145:1978 — numbering of divisions/subdivisions

- Establishes `1 / 1.1 / 1.1.1` numbering. Proof that structured hierarchy is a
  cross-era baseline for human documents; use it for long artifacts.

## IEC/IEEE 82079-1 / ISO/IEC/IEEE 26514 (reference)

- 82079-1: instructions-for-use — purpose, information quality, management.
- 26514:2022: software user documentation design/development process.
- Useful for product manuals and software docs; not needed for one-shot prompts.

## Status (retrieved 2026-08-09)

- No mature ISO standard for LLM prompt/document language policy exists.
  ISO/IEC 42001 / 5338 govern AI management and lifecycle, not writing craft.
- Treat ISO/STE as the human-document floor, not the human–agent ceiling.
