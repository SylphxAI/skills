# Agent observability

Agent-native observability makes decisions and effects diagnosable without
persisting hidden chain-of-thought.

## Trace contract

Correlate a user or machine objective with planning steps, tool calls, model
invocations, delegated runs, retrieved context identities, effects, evidence,
cost, latency, and terminal state. Record structured inputs and outputs only to
the extent permitted by privacy, security, and retention policy.

Each span should expose:

- stable run, parent, agent, tool, and attempt identities;
- model/provider/tool version and material configuration;
- bounded outcome, error class, retry/replan reason, and effect identity;
- token, latency, and cost measures where meaningful;
- links to durable artifacts and redacted evidence rather than hidden reasoning.

Operator views should answer what is running, why it is blocked, which effect
occurred, what evidence supports completion, and how to replay or recover.
Sampling must preserve errors, safety events, and expensive outliers even when
ordinary successful traces are sampled.

## Source

- OpenTelemetry semantic conventions for generative AI systems:
  <https://opentelemetry.io/docs/specs/semconv/gen-ai/>
