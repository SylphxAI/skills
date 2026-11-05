# Client briefs from backend contracts

Trigger: writing or revising a client UI outcome brief against an existing backend.

A plausible screen can encode the wrong business model. Before defining its
acceptance cases, read the executable schema, handlers and contract tests at a
named revision. Establish the operation's semantics, visibility rules, lifecycle
and available reads. For example, a sealed auction does not expose an ascending
auction's current leading bid merely because that field would suit the layout.

Map each proposed visible value and action to a supported response field or
operation. A UI never invents fields, estimates hidden state or treats an absent
read as a zero. Send missing reads to the contract owner as endpoint requests,
with the consumer need and visibility constraints. Omit the unsupported value
or section until the read exists; do not display fabricated placeholders. Keep
unrelated supported UI usable. Distinguish an unsupported read from a supported
read that failed, which needs its normal recovery state.

Check both directions: known response fields produce the intended UI, while
absent or unauthorized data cannot leak or become an invented value. Record the
contract revision and unresolved endpoint requests in the brief's references.
