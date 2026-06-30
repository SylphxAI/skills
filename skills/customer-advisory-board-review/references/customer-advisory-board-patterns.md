# Customer Advisory Board Patterns

## Advisory board state machine

```text
question_defined -> member_criteria_set -> members_invited -> session_planned -> session_run -> insights_synthesized -> decisions_linked -> followup_sent
       |                    |                 |                 |              |                     |                 |
       v                    v                 v                 v              v                     v                 v
 vague_question       biased_panel       declined        agenda_blocked   low_signal          no_decision_link   promise_risk
```

## Rule IDs

- `cab-1` — Start with decisions the board should inform, not a generic desire for feedback.
- `cab-2` — Select members by target segment, use case, maturity, region, company size, and product fit; track bias and missing voices.
- `cab-3` — Separate advisory board, design partner, beta cohort, executive council, creator council, and research panel.
- `cab-4` — Define confidentiality, consent, incentives, recording, attribution, and competitive-sensitivity boundaries.
- `cab-5` — Agendas should mix strategic questions, workflow evidence, prototype review, and prioritization tradeoffs.
- `cab-6` — Capture verbatim evidence, themes, disagreements, account context, and confidence level.
- `cab-7` — Commitments need owner, approved wording, due date, and no implied delivery unless accepted.
- `cab-8` — Follow-up should say what was heard, what will change, what will not, and next opportunity.
- `cab-9` — Use advisory input with market research, product analytics, support feedback, and strategy, not as a vote.
- `cab-10` — Review member health, representation, and value exchange each cycle.

## Decision table

| Format | Best for | Risk | Output |
| --- | --- | --- | --- |
| Executive advisory board | Strategy and category direction | Logo bias | Decision memo input |
| Design partner group | Workflow depth and early validation | Overfitting custom needs | Prototype and requirement evidence |
| Beta cohort | Release readiness and adoption | Support burden | Rollout and feedback report |
| Creator council | Marketplace trust and supply quality | Factional capture | Policy/ranking feedback |
| Research panel | Repeated discovery | Participant fatigue | Research repository themes |

## Advisory checklist

- Decision questions and non-goals are explicit.
- Member selection balances segment fit and bias coverage.
- Confidentiality, consent, incentive, and recording rules are set.
- Agenda creates evidence, tradeoffs, and disagreement capture.
- Commitments are controlled and linked to owners.
- Follow-up closes the loop without false roadmap promises.

## Event schema

Track: `cab_question_defined`, `cab_member_invited`, `cab_member_joined`, `cab_session_scheduled`, `cab_session_completed`, `cab_insight_captured`, `cab_decision_linked`, `cab_followup_sent`, `cab_commitment_created`.

Recommended properties: `board_type`, `segment`, `member_role`, `company_size`, `region`, `decision_area`, `session_topic`, `evidence_type`, `confidence`, `commitment_owner`, `followup_status`, `bias_gap`, `roadmap_linked`.
