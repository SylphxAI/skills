# Deliberation Methods

## Choose the protocol

| Situation | Method | Why |
| --- | --- | --- |
| Expert estimates may be anchored by others | Delphi-style independent rounds | Preserve initial independence, then expose controlled feedback |
| Proposals and objections are being lost in prose | IBIS-style argument graph | Link issues, positions, reasons, and objections explicitly |
| Two credible camps disagree on an empirical claim | Adversarial collaboration | Agree on the disputed question and discriminating evidence before testing |
| Many agents produce correlated answers | Partitioned evidence or hypotheses | Create actual informational diversity instead of vote inflation |
| Decision is reversible and evidence is cheap | Short round plus experiment | Replace further rhetoric with a discriminating observation |

Do not combine every protocol by default. Select the method that addresses the
dominant failure mode.

## Independent-first Delphi

1. Ask the same neutral question and request assumptions plus confidence.
2. Collect answers before showing any participant the others' responses.
3. Summarize the distribution, reasons, and evidence without naming a preferred
   result.
4. Return the summary for revision and require reasons for material changes.
5. Stop when another round has low expected value; report the distribution and
   dissent rather than forcing convergence.

Independence is weakened when agents share the same retrieved corpus, prompt,
model prior, or generated draft. Assign different evidence sources or
hypotheses where correlated error matters.

## IBIS-style argument graph

Represent:

- **Issue** — a precise question requiring resolution;
- **Position** — a candidate response or proposal;
- **Argument for** — a reason or evidence supporting a position;
- **Argument against** — an objection, counterexample, cost, or violated
  constraint; and
- **Response** — a rebuttal, qualification, modification, or evidence request.

Every node needs an identifier and explicit target. A transcript may remain as
source evidence, but the graph is the decision-useful projection.

## Adversarial collaboration

Before investigation, opposing participants should jointly specify:

- the narrow disputed claim;
- observations each side predicts;
- an agreed method or evidence source;
- interpretations that would count for or against each position; and
- how inconclusive results will be represented.

The objective is a jointly trusted test, not victory or artificial agreement.

## Common failure modes

- **Premature synthesis:** a facilitator proposes a polished answer before
  independent positions exist.
- **Majority laundering:** repeated or correlated votes are reported as
  evidence.
- **False balance:** a poorly supported position receives equal weight merely
  because it exists.
- **Argument detachment:** objections are listed without the proposal or premise
  they challenge.
- **Consensus pressure:** dissent disappears from the record although the
  underlying uncertainty remains.
- **Infinite workshop:** another round is run without a plausible path to
  changing the decision or evidence plan.

## Research basis

This method draws on:

- Dalkey and Helmer's experimental Delphi work on structured, anonymous expert
  feedback: <https://doi.org/10.1287/mnsc.9.3.458>
- Rittel and Webber's account of wicked problems and argumentative planning:
  <https://doi.org/10.1007/BF01405730>
- Conklin and Begeman's gIBIS implementation of issue-based argumentation:
  <https://doi.org/10.1145/62266.62278>
- Kahneman and Klein's adversarial collaboration on conditions for expert
  intuition: <https://doi.org/10.1037/a0016755>
- Lorenz and colleagues' evidence that social influence can reduce diversity
  without improving collective accuracy:
  <https://doi.org/10.1073/pnas.1008636108>

These sources motivate the controls; none makes consensus a truth oracle.
