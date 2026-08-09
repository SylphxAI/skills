# Evidence brief — language × format efficiency (snapshot 2026-08-09)

Dated measurement snapshot. **Not durable truth.** Refresh protocol at the end.

## Token cost by tokenizer (same meaning, zh vs en)

| Tokenizer family | ratio `r = N_zh / N_en` | Note |
| --- | --- | --- |
| Claude (pre-4.7) | 1.11 – 1.64 | "Chinese tax"; worst 1.64 on business news |
| GPT-4o (o200k) | 1.0 – 1.35 | Some texts < 1 |
| DeepSeek-V3 | down to 0.65 | Chinese cheaper |
| Qwen 3.6 | mostly < 1 | Chinese cheaper |
| Claude Opus 4.7 (new) | zh ~1.00 | English inflated 1.24–1.63; zh flat |

- DeepSeek API official rule: 1 EN char ≈ 0.3 token; 1 zh char ≈ 0.6 token.
- Old Claude 200k window: zh fits 40–70% less content than en.
- Classical Chinese: fewest tokens of all, but reasoning burden rises and
  comprehension drops (token-cheap ≠ total-efficient).

## Language × task success

| Task | Finding |
| --- | --- |
| Coding (SWE-bench Lite) | zh prompts lower success: MiniMax 66.0→61.5; GPT-5.4-mini 36.0→26.1; GLM-5 64.6→55.1 |
| Reasoning (MGSM) | English CoT >= native CoT on GPT-3/PaLM; parity on newer zh-native models |
| Chinese knowledge (HKMMLU) | DeepSeek-V3 74.8 best; GPT-4o 70.3; Claude 3.7 66.7; best model still < 75% and below human testers on Cantonese items |
| DeepSeek-R1 | EN MMLU 90.8; zh C-Eval 91.8; zh math CNMO 78.8 (o1-mini 67.6) |
| Medical QA (2025 SciRep) | ChatGPT-4o 90.4% vs DeepSeek 88.0% overall; per-language deltas not significant |
| Spoken/colloquial queries | ~23% worse than written (SpokenNativQA); dialect further down |

## Thinking language

- EfficientXLang (arXiv 2507.00246): forcing non-English thinking cuts thinking
  tokens 20–40% with no accuracy loss (zh included; zh not the most efficient).
- Think-in-code style: ~1305 vs 2925 tokens, higher accuracy (Pythonic-thinking).
- Thinking language is model-internal: DeepSeek may think in zh even for en
  prompts; you can suggest, not fully control.

## Structure & format

- Bullet lists beat prose/tables/JSON on spatial+planning tasks (NAACL 2025:
  83 vs 53).
- XML tags: attention anchors + instruction/data isolation (Anthropic docs).
- Prompt compression: LLMLingua up to 20x, <2% loss (arXiv 2310.05736).
- Over-structuring output lowers reasoning (Let Me Speak Freely, EMNLP 2024).
- Long-context: English not always best; cross-lingual instruction/context
  mismatch can swing ±20% (OneRuler, arXiv 2503.01996).

## Key sources (retrieved 2026-08-09)

- DeepSeek API docs token usage: api-docs.deepseek.com/quick_start/token_usage/
- GeekPark "中文税" 22-text benchmark: w.geekpark.net/news/363717
- Mythbuster (SWE-bench zh/en): arXiv 2604.14210
- EfficientXLang: arXiv 2507.00246
- MGSM: arXiv 2210.03057 · NAACL 2024 self-translate · EACL 2026 lingua franca
- HKMMLU: arXiv 2505.02177
- DeepSeek-R1 report: arXiv 2501.12948
- Let Me Speak Freely: arXiv 2408.02442
- LLMLingua: arXiv 2310.05736
- ISO 24495-1 / ASD-STE100: see iso-plain-language.md

## Refresh protocol

1. On any model/tokenizer release that affects the target artifact, re-run:
   `5 tasks × {zh, en} × {prose, structured}`.
2. Re-measure `r = N_zh / N_en` for the exact tokenizer in use.
3. Update this file: new filename with new date, keep old snapshots for history.
4. Never delete an old snapshot; retire by moving to `history/` if the repo does.
