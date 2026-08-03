# Tool-Grounded Execution

Use an action-observation loop whenever progress depends on external or dynamic
state.

1. State the current objective, live hypothesis, and smallest action that can
   advance or discriminate it.
2. Execute the action through the authorized tool boundary.
3. Record the actual observation, subject identity, time, and error state. Never
   infer a tool result from the intended command.
4. Update the plan from the observation; preserve still-valid goals and
   constraints rather than restarting from scratch.
5. Stop, retry, replan, or escalate according to the observed state and declared
   terminal—not according to how many reasoning steps have occurred.

The artifact is an **Action-Observation Trace** containing action, observation,
plan delta, evidence locator, and next state. Store concise durable checkpoints;
never persist hidden chain-of-thought.

Research basis: ReAct couples reasoning with grounded actions and environment
observations: <https://arxiv.org/abs/2210.03629>.
