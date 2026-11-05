# Product standard

Trigger: defining a product, its audience and promise, or its capability scope.

A product states a value thesis: the users, the jobs they bring, and the promises
that carry the value. Each promise has an owning journey, a state and recovery
boundary, and a result its user can observe. Utility and service products also
meet [experience.md](experience.md), [growth.md](growth.md), and
[commercial.md](commercial.md); games meet [games.md](games.md); developer
surfaces meet [dx.md](../../deliver-and-verify/references/dx.md).

## Hard lines

- Data is never held hostage and urgency is never false (a countdown that resets,
  a "last one" that is not), because they trade trust for a short-term gain.
- For a child-directed product, minimize data collection and satisfy the
  applicable age-assurance and parental-consent requirements before regulated
  processing ([Products for children](#products-for-children)).

## Practices

- **First value:** value arrives as directly as the product allows. Guest use,
  samples, import, and demonstrations skip the detour. Authentication,
  permission, payment, age or territory controls, and multiplayer coordination
  come first only where the value needs them, with the minimum requested and a
  truthful denial, cancellation, retry, and recovery path. A compulsory tour or
  signup earns its place or goes.
- **Capability scope:** consider the whole destination before cutting work, so an
  essential capability or cross-product dependency is not lost. For each material
  capability, decide: complete now, consume the owning product, keep as a stated
  future destination, or exclude with a product reason. Add supporting
  interfaces when a current consumer or measured delivery need requires them.
- **Operations are a capability:** expose operational actions through the same
  permissioned API used by other clients. Choose a human client for an observed
  operator need ([agent-first APIs](architecture.md#agent-first-apis-and-operations)).
- **Gating:** tying a capability to tenure, spend, or engagement (VIP tiers,
  loyalty rewards) is a normal business tool. Reachability, recovery, and
  accurate state are part of a finished product.
- **Generic by default:** use shared, data-driven mechanisms. Select models
  against the capability's measured tasks and supported languages; apply the
  workspace's chosen model configuration. Add product-specific behaviour when
  the value thesis requires it, at the layer that owns that behaviour.
- **Automatic configuration by default:** infer supported deployment and sizing
  choices, ask for required inputs clearly, and expose advanced configuration
  where it serves a real need. A first-party client uses the same published
  permissions and capabilities offered to other customers.

## Agent products

An agent product gives the model current events, authorized tools and access to
relevant history. Pending messages, due commitments, helper results and failed
sends remain durable until handled. Prompts express the chosen method; the
runtime enforces permissions, private-data boundaries, fair delivery and spend.
Measure missed work and alert on a delivery failure.

### Designing for the model that is coming

- **Assess external methods.** Read their assumptions, task, measurements and
  implementation. Reuse a method when it is the simplest complete mechanism;
  remove stages whose original limitation no longer applies.
- **Thin runtime, full judgement.** The system supplies only what a model
  cannot do for itself: access, delivery, durable state, safety checks and
  tools. It does not encode judgement as fixed steps, routing tables or prompt
  choreography. Assume a stronger model arrives; the architecture improves with
  it instead of capping it.
- **Delete the crutches.** A prompt rule, retry sequence, planner stage or
  scaffold that exists to compensate for a weaker model is removed when the
  model can carry the judgement. A constraint stays only where it still
  prevents a named, observed failure. Safety, privacy, auth and spend limits
  stay enforced by the runtime, never by prompt text.

### How an agent takes part in a conversation

This contract governs multi-agent group conversations.
Receiving is about shared conversations; speaking covers every place a person
sees an agent's words.

- **Receiving is continuous.** Every message an agent is authorized to receive
  reaches the agent as it arrives, whether the agent is idle or already working,
  and whether or not it is mentioned. A mention is information that someone is
  talking to the agent, never the condition that delivers a message. A mention
  never re-delivers a message the agent has already received as a new request.
- **Speaking is the model's choice.** The only way a person sees an agent's
  words is an explicit send action that the model calls, naming the
  conversation and, where one exists, the thread. That holds for every channel:
  groups, direct messages, the web and app chat, and a game player's reply. The
  agent's own text while it works, including its final answer, progress notes
  and intermediate steps, is never sent or echoed to the person on its own. A
  turn that ends without a send action posts nothing, and that silence is a
  valid, complete outcome: no reply-enforcement continuation follows it, and
  nothing nudges attendance or asks for a progress report. Work that is due on
  its own, such as a scheduled task, still runs.
- **The facts come from the system, not from a rule about people.** The
  agent's input states the channel type, who is in the conversation and how
  complete that list is (with the member count), the agent's own role and admin
  rights, and each message's sender, sent time, reply target and mentions.
  Where a fact is unavailable, or the participant list may be incomplete, the
  input marks it as unknown or incomplete rather than filling it in; an
  incomplete list is never completed by guessing who is present.
- **Speaking follows context and authority.** The model decides whether and
  where to speak from the conversation facts and its authorized tools. The
  runtime owns delivery, permission and shared-resource controls.
- **Keep an agent's layers orthogonal, so removing any one leaves the others
  working.** A lower layer never stores a higher layer's id; the higher layer
  holds the association.
  1. *Tools and permissions*: grants attach to tools and are checked when a
     tool runs, independent of the agent's role, its relationships or any outer
     scheduler.
  2. *Session and goal*: any session can pursue a goal on its own, with no
     outer platform and no sub-agents. It loops through working and waiting,
     releasing compute while it waits, with no mandatory planner stage and no
     external reviewer gate. It settles completed with an observable receipt
     from the real environment, or failed with the evidence that disproved a
     premise. A helper the agent delegates to is a child session with narrowed
     grants.
  3. *Relationships*: agents are structurally alike. They differ only by
     reversible state (active, idle, paused, archived) and by edges such as
     parent, peer and group. A parent edge records delegation and completion
     custody; the workspace defines supervisory and escalation authority. A
     group gives shared roster awareness and a channel. History is retained.
  4. *Platform scheduling*: a task queue, when present, is an adapter above the
     session. It starts a session with a goal and grants, ranks and meters the
     work, and settles from the goal's result.

  A platform's own tables, states and names live in that platform's repository.

### Returning to a conversation

Deliver the new event and its conversation identity. Offer an available history
lookup when earlier context would help; the model decides whether to use it.
Avoid injecting redundant history. The connector records the account,
conversation and optional thread, and any explicit mapping to another channel.

## Products for children

Choose distribution programmes for the product's audience and markets. Read the
current store and child-privacy requirements for its declared age bands.

- **Google Play:** apply the [Families Policy](https://support.google.com/googleplay/android-developer/answer/9893335)
  when it covers the target audience. Consider Teacher Approved for the
  distribution opportunity ([programme](https://play.google.com/console/about/programs/teacherapproved/)).
- **App Store:** the [Kids category rules](https://developer.apple.com/app-store/review/guidelines/#kids-category)
  require a parental gate for links out, purchasing opportunities and other
  distractions. They generally exclude third-party analytics and advertising,
  with limited exceptions described in those rules.
- **Product choices:** an ad-free experience, gated settings and non-identifying
  analytics may simplify the product. Distinguish those choices from binding
  requirements; minimize data and apply the consent and age-assurance method in
  [security.md](../../deliver-and-verify/references/security.md).

## How it is judged

A new user reaches first value in the fewest steps the product allows, and every
material capability has a recorded decision.
