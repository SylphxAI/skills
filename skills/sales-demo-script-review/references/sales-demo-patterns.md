# Sales Demo Patterns

## Demo state machine

```text
pre_call_research -> discovery_open -> tailored_narrative -> proof_demo -> objection_handling -> next_step_committed -> follow_up_sent
        |                  |                    |             |                   |
        v                  v                    v             v                   v
 no_fit_found      pain_not_confirmed     proof_gap      technical_followup   deal_stalled
```

## Rule IDs

- `demo-script-1` — Start with buyer role, pain, current workaround, and desired outcome.
- `demo-script-2` — Make the demo a story of before, friction, product moment, proof, and next step.
- `demo-script-3` — Discovery should confirm pain and success criteria before feature claims.
- `demo-script-4` — Use the fewest screens or steps needed to prove the outcome.
- `demo-script-5` — Tailor proof: executives need business impact, users need workflow fit, developers need integration truth, IT needs control and risk evidence.
- `demo-script-6` — Objection handling must cite real proof or create a follow-up, not bluff.
- `demo-script-7` — Mark unsupported roadmap, compliance, integration, or performance claims as not committed.
- `demo-script-8` — Every demo ends with a concrete next step: pilot, technical review, security packet, stakeholder meeting, or close-lost reason.
- `demo-script-9` — Follow-up should restate pain, proof shown, open questions, owners, and date.
- `demo-script-10` — Capture demo outcomes to improve positioning, product gaps, docs, and enterprise readiness.

## Persona decision table

| Buyer | Demo emphasis | Proof | Avoid | Next step |
| --- | --- | --- | --- | --- |
| Founder/CEO | Strategic wedge and speed | Before/after business flow | Deep settings tour | Pilot or decision call |
| Product leader | User workflow and metrics | Activation/retention use case | Unsupported roadmap promises | Success criteria workshop |
| Developer champion | API/SDK/CLI path | Working integration and docs | Hand-wavy architecture | Technical trial |
| IT/security reviewer | Admin, identity, audit, data | Trust packet and controls | Overstated compliance | Security review |
| Finance buyer | Cost, risk, payback | ROI model with assumptions | Fake precision | Commercial review |
| Marketplace creator | Publishing, discovery, payouts | Creator journey and analytics | Platform vanity metrics | Creator onboarding |

## Demo checklist

- One buyer outcome controls the script.
- Discovery questions are explicit and timeboxed.
- Demo data is realistic, safe, and non-confidential.
- Each proof point has source, screenshot, metric, or live action.
- Objection responses separate true now, possible later, and not supported.
- Follow-up owner and date are captured before ending.

## Event schema

Track: `demo_scheduled`, `demo_persona_identified`, `discovery_pain_captured`, `demo_proof_step_completed`, `buyer_objection_logged`, `proof_gap_identified`, `next_step_committed`, `demo_followup_sent`, `pilot_started`, `deal_closed_lost_reason_logged`.

Minimum properties: account segment, buyer role, pain category, demo version, proof asset, objection category, commitment type, owner, deadline, and outcome.
