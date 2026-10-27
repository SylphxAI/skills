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
- A product built for children under 13 checks age before collecting any data
  ([Products for children](#products-for-children)).

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
  future destination, or exclude with a product reason. A catalog entry is not a
  reason to build, and a future capability gets no speculative extension point,
  SDK, permission, telemetry stream, or dormant runtime.
- **Operations are a capability:** every admin read and action is in the
  product's operator API, which agents use; the admin site is its rare-use
  client, and no fixed operator tool is built
  ([agent-first APIs](architecture.md#agent-first-apis-and-operations)).
- **Gating:** tying a capability to tenure, spend, or engagement (VIP tiers,
  loyalty rewards) is a normal business tool. Reachability, recovery, and
  accurate state are part of a finished product.
- **Generic by default:** mechanisms are generic, data-driven and
  language-agnostic; the owner's own usage informs priorities and tests, never
  defaults or code branches. One model serves a capability in every language,
  chosen from public data, with no per-language split. A use case is met by
  adding the missing context, data or tool, not a hardcoded feature.
- **Zero-config, zero-knowledge by default:** a user never needs to know or set
  our infrastructure (clusters, pools, runners, Cells, queues, Dockerfiles); a
  deploy works from the code alone, as on Vercel. The platform derives priority,
  sizing, placement and scaling itself, identically for every tenant. The first-party organization is
  a first-party client with no backdoor: any knob we use, customers get. Configuration
  is an optional advanced layer, never a prerequisite.

## Agent products

An agent product assumes a capable model. Anything pending (a message on any
channel, a due commitment, a helper's result, a failed send) wakes the agent,
which sees all of it together with a recap and decides what to do and where to
reply. Behaviour comes from the system's design, meaning what the agent sees,
when it wakes, and which tools it holds, not from hardcoded routing or
instruction text. Safety is a system property: a privacy check on every send,
fairness so a busy channel cannot starve another, and an alarm instead of a
silent miss.

### Designing for the model that is coming

- **Evidence, not a template.** An external paper, post or open-source project
  supplies empirical benchmark data: what was measured, on which task and
  hardware, and how it compares with the leader. It is never a workflow to
  copy. A multi-step pipeline that exists because an earlier model could not
  plan is data about that model, not a design for ours.
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
sees an agent's words. It states required behaviour and makes no claim about
what is deployed today.

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
- **No reply rules stand in for judgement.** The system runs no reply
  classifier, counts people to decide who answers, forces attendance, caps how
  often the agent may reply, or adds a registry of who may speak. The model
  decides from the facts and its tools.
- **Unified Goal and Promise obligation loop (`working <-> waiting -> kept / dropped`):**
  dispatched work items and assistant self-set goals use one unified mechanism
  (`promises` + `goal_contexts`). When the system dispatches a work item, it
  pre-attaches the promise as the session's active goal at start; when a
  conversational assistant is working and judges that an outcome requires
  multi-step tracking or waiting across time or events (such as monitoring an
  external site to place an order or driving a deployment to completion), the
  model calls the goal/promise tool to attach a goal to its own session. While a
  goal is active, the agent runs one interleaved loop across `working` and
  `waiting` (suspending compute during `waiting`/`sleep` and continuing quietly
  between meaningful changes, as in OpenAI Codex `persistent_mode.md`) with no
  mandatory upfront planner stage and no external `checking` or LLM-reviewer
  gate, until it verifies the outcome against the real environment with an
  observable receipt (`kept`) or records disconfirming evidence when a premise
  is falsified (`dropped`).

This supersedes the older contract in which a direct message, mention, reply or
already-active thread was what woke an agent. It changes when an agent is woken
and how it speaks, and says nothing new about how messages are stored or
delivered. Where any text still states mention-based wake as current behaviour,
this rule governs.

### Returning to a conversation

This rule applies alongside the multi-agent conversation contract above. It
states required behaviour and makes no claim about what is deployed today.

- **No old message bodies.** The system never puts earlier messages into an
  agent's context on its own.
- **One optional pointer.** When the source channel keeps a history the agent
  can read, and the active context holds nothing from that conversation yet, the
  input may carry one short pointer to a history tool the agent can actually
  call. Looking anything up stays the model's choice.
- **Nothing when it does not apply.** A channel with no accessible history, or a
  context that already covers the conversation, gets no pointer.
- **One pointer per conversation.** A conversation carries at most one such
  pointer while it remains in the current context, and the same conversation's
  pointer is never repeated. Another conversation whose readable earlier
  history is missing from the active context gets its own short pointer, scoped
  to that conversation.
- **No thresholds and no second store.** No fixed message count, time gap or age
  decides when a pointer appears, and no lookup is forced. History stays in the
  conversation record that already holds it.
- **Each conversation keeps its own identity.** A pointer is scoped to the
  conversation it belongs to. It never asserts that two conversations are one,
  or that a wider platform hierarchy binds them. The existing connector or
  provider defines a conversation: its account, conversation, and optional
  thread or topic. A room on our platform and a group on an outside service are
  one conversation only where that mapping is explicit; nothing assumes they are
  the same, and no registry of conversations is created.

## Products for children

A product built for children under 13 is designed from the start to qualify for
the stores' children's programmes, because a place in them is how these products
spread:

- **Google Play:** the Families Policy, then Teacher Approved (teachers rate age
  fit, quality, enrichment, and delight; approved apps appear on the Kids tab;
  [Play Console](https://play.google.com/console/about/programs/teacherapproved/)).
  Content spanning age bands suits the youngest declared band.
- **App Store:** the Kids category with its age band: no third-party analytics or
  advertising, and a parental gate before any link out, purchase, or permission.
- **In the product:** no ads; purchases, links out, and settings behind the
  parental gate; no behavioural targeting or promotion addressed to the child;
  contextual, non-identifying events only; age checked before any data is
  collected ([security.md](../../deliver-and-verify/references/security.md)).

## How it is judged

A new user reaches first value in the fewest steps the product allows, and every
material capability has a recorded decision.
