# Formal modeling and model checking

Use a small executable model when concurrency, distributed coordination, authorization, or irreversible effects create a state space larger than scenario tests can cover confidently.

## Method

1. Define the safety and liveness properties that matter to the product.
2. Model the smallest state, actions, environment assumptions, and fairness assumptions needed to express those properties.
3. Explore bounded state spaces for invariant violations, deadlock, livelock, replay, stale authority, and unfair scheduling.
4. Inspect each counterexample as an executable trace and update the design or assumptions.
5. Convert material counterexamples into implementation tests, assertions, or runtime monitors.
6. Link model variables and invariants to their implementation owners using stable domain names.
7. Recheck the model when the corresponding protocol, authority, or recovery behavior changes.

Complete the modeling work when the critical properties are explicit, the selected state space has been explored, and implementation owners can act on every material trace.

## Sources

- Lamport, [Specifying Systems](https://lamport.azurewebsites.net/tla/book.html)
- Newcombe et al., [How Amazon Web Services Uses Formal Methods](https://lamport.azurewebsites.net/tla/formal-methods-amazon.pdf)
