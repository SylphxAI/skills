---
name: craft-human-agent-language
description: "Write or review any document or prompt that humans and agents both use (README, ADR, update, instruction): frame purpose and audience, structure before prose, plain language, model-agnostic language choice, output contract, and a re-verification gate. Use when asked to write/translate/review a doc or prompt for humans and agents, or to choose the most efficient language and format for a model you are switching."
---

# Craft Human-Agent Language

Pick the **language, structure, and output contract** for any text artifact that
humans, agents, or both will read. Core method is model-agnostic: durable
principles live here; dated measurements live in `references/` and must be
re-measured after model releases.

## When to use

- Write, translate, or review a prompt, README, ADR, update, or instruction that
  humans and/or agents consume.
- Choose between zh / en / colloquial, or between prose / list / XML / code / JSON.
- Switching model family or tokenizer and need a fresh language/format decision.

## Method (top-down, 6 layers)

### 0. Frame

State purpose and audience before writing:

- Purpose: `inform` | `decide` | `execute`
- Audience: `human` | `agent` | `both`
- Constraints: token cost, correctness, parseability
- **Altitude** (when the artifact is project/product law): use **industry
  homes** — Product Vision, North Star Metric, OKRs/Goals, PRD (features),
  Specs/API reference, ADR, README entry, Diátaxis user-doc type. Do not
  collapse them into one unlabeled blob. Open
  `../drive-to-delivery/references/source-authoring-standard/references/documentation-standard/`
  when choosing homes.

### 1. Structure before prose

- Headings → bullets → numbered steps → code/JSON blocks.
- Use XML tags to separate instructions from data (attention anchors + injection
  boundary).
- One idea per line. No paragraph walls.
- **Examples over descriptions**: one worked example beats one paragraph of
  explanation.

### 2. Plain language floor (ISO 24495-1)

- Relevant: only what the reader needs; delete fluff.
- Findable: headings, lists, numbering (ISO 2145 style).
- Understandable: short active sentences; controlled vocabulary; one meaning per term.
- Usable: callable steps; schema for agent consumers.
- Open `references/iso-plain-language.md` for formal or long-lived artifacts.

### 3. Language choice (procedure, not hardcoded truth)

1. Agent audience or coding task → **English** (measured: zh prompts lower coding
   success rate; see evidence brief).
2. Chinese-native model family (checked against dated evidence) → **written
   Chinese**; Traditional script is safe with frontier models.
3. Unknown model or first use → run the gate (step 5) before committing.
4. Colloquial / spoken register → casual chat only; never instructions or hard
   reasoning (measured accuracy drop).
5. Technical terms stay in English inside any language.

Never hardcode "model X is best". Consult
`references/evidence-brief-2026-08.md`, then re-measure.

### 4. Output contract

- Thinking stays free-form; contract only at the boundary.
- Agents: schema / JSON / function calling. No free-form prose for machine
  consumption.
- Do not over-structure reasoning output (measured: forced JSON/XML lowers
  accuracy — "Let Me Speak Freely").

### 5. Verification gate (mandatory on model/tokenizer switch)

```text
benchmark = 5 tasks × {zh, en} × {prose, structured}
gate: new choice accuracy >= old choice accuracy
      AND new choice tokens <= old choice tokens
```

Record: date, model id, tokenizer version, ratio `r = N_zh / N_en`.
Refresh `references/evidence-brief-*` with the measurement and new date.

## Progressive disclosure

- `references/evidence-brief-2026-08.md` — open when you need dated numbers,
  sources, or the refresh protocol.
- `references/iso-plain-language.md` — open for formal/long-lived artifacts.
- Industry documentation altitude (Vision · NSM · OKR · PRD · Spec · ADR · Diátaxis):
  `../drive-to-delivery/references/source-authoring-standard/references/documentation-standard/`

## Validation

Artifact is done when:

- Purpose + audience are stated.
- Structure is present (headings/lists/code), not a prose wall.
- No model-fragile claim appears without a date + source.
- Gate result recorded whenever the model family changed.

## Output

- Path to the artifact.
- One-line decision: language / structure / output contract.
- Gate result if run (date, model, `r`, pass/fail).

## Boundaries

- Not skill-package authoring → `author-skill`.
- Not short status updates → `write-high-signal-update`.
- Not agent context packs → `engineer-agent-context`.
- Not source distillation → `distill-source-to-skill`.
- Evidence is a dated snapshot; re-measure before trusting after any model
  release. This skill grants no deploy or credential authority.
