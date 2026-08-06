# Formal modelling and model checking

Use a small executable model when concurrency, distributed coordination,
authorization, or irreversible effects make scenario tests an unreliable way
to cover the state space.

## Method

1. Model only safety- or liveness-critical state, actions, assumptions, and
   invariants; do not transliterate the implementation.
2. Check bounded state spaces for invariant violations, deadlock, livelock,
   replay, stale authority, and unfair scheduling.
3. Convert counterexamples into implementation tests or monitors.
4. Keep the model and implementation linked through named invariants and
   versioned evidence. A model that is no longer representative is not proof.
5. Stop at the smallest model that changes confidence or design. Formalism
   without a material risk or falsifiable property is ceremony.

## Sources

- Lamport, *Specifying Systems*: <https://lamport.azurewebsites.net/tla/book.html>
- Newcombe et al., *How Amazon Web Services Uses Formal Methods*:
  <https://lamport.azurewebsites.net/tla/formal-methods-amazon.pdf>
