# Backend and web technology resolution and verification

The normative profile is [`profile.json`](profile.json). This reference defines
how an agent or control-plane adapter resolves and verifies that contract. It
does not create a second selection source. If this method and the machine
contract disagree, resolution fails closed and the package must be corrected.

`assertions.rules` is the executable rule table and is covered by the profile
content digest. A consumer interprets the schema-defined `kind` values and
their fields. Default keys remain selection and collision identities only;
their spelling, suffixes, rationale, and constraints are never evaluator
instructions.

## Machine resolution

1. Resolve every condition under `selector.matchAll`, then aggregate all
   condition states using the single `selector-outcome` rule's declared
   precedence. The current match-all contract makes an explicit unmatched fact
   decisive over an unrelated unknown fact; permutations produce the same
   outcome. Unknown-only or conflicting input blocks.
2. Read component facts through `assertions.factModel`. For every declared
   component, select exactly one `role-requirement` whose `roles` contains the
   component role. Zero or multiple matches block evaluation.
3. Compare the component implementation with `requiredImplementation`. Resolve
   every declared owned effect through the referenced `effect-classification`
   rule, requiring exactly one class match, then apply the role rule's explicit
   class allowance. A zero match is unknown and multiple matches are ambiguous;
   both block instead of being treated as allowed.
4. Build completion from the single `completion-denominator` rule. Each
   declared component role and each declared owned effect is one denominator
   item; all items must conform. Missing facts or ambiguous role resolution
   emit the rule's blocked outcome.

The current rule table requires Rust for backend roles and
TypeScript/Bun/Next for web roles. It forbids backend-effect ownership by web
roles and TypeScript backend fallback. Those values are read from the profile,
not duplicated in an adapter.

Product repositories project intended component topology through the optional
`architecture.components` map in `project.manifest.json` and bind this Profile
under `architecture.profileBindings` using its exact revision and content
digest. Each unique component id declares its role, implementation,
backend-owner reference, and owned effects. The manifest schema owns only the
generic fact shape; this Profile owns the recognized role/effect meanings.
Missing, stale, or unknown bindings and facts block a selected technology
decision instead of being inferred from filenames. Live deployment and
production status remain Control Plane observations, not repo-authored fields.

## Resolution table

| Observed component | Role/effect classification | Required result |
| --- | --- | --- |
| HTTP API that authorizes a backend operation and mutates a database | backend API plus durable business effect | Rust required |
| Queue consumer or scheduled job with external side effects | worker/background job | Rust required |
| Browser application rendering product state | browser/product web | TypeScript/Bun/Next required |
| Next SSR route that composes UI data without owning backend effects | server-rendered web orchestration | TypeScript/Bun/Next required |
| Next or Bun handler that directly mutates backend storage or decides backend authorization | web process owning a forbidden backend effect | profile violation; move the effect to Rust |
| TypeScript service retained as fallback for an incomplete Rust backend | backend fallback | forbidden; repair Rust |
| Repository containing both Rust services and TypeScript web | multiple declared roles | valid when each role/effect follows its selection |

Transport shape does not decide implementation ownership. An HTTP or RPC boundary may exist on
either side. Ownership follows the semantic role and effects behind the
transport. UI orchestration may validate presentation inputs, shape view data,
manage sessions for rendering, and call backend contracts. It may not become
the durable business-system owner through a convenient server function.

## Resolution state machine

```text
facts-unknown -> blocked
facts-known -> selector-unmatched | selector-matched
selector-matched -> roles-classified
roles-classified -> conforming | violation | ambiguous
ambiguous -> blocked
violation -> rust-fix-required
rust-fix-required -> conforming
```

There is no transition from `violation` to TypeScript backend fallback. A
production defect, parity gap, or missing capability remains a Rust work item.

## Verification checklist

- Record the exact profile id, revision, content digest, and applied assertion
  ids.
- Verify `architecture.profileBindings.technology-stack-profile` matches this
  exact revision and digest; a missing or stale binding is a coverage gap.
- Enumerate applicable `architecture.components` entries and their declared
  service roles; missing entries remain a gap.
- Enumerate database, queue, authorization, external, and background effects.
- Prove each declared effect has exactly one profile classification and one
  allowance for its resolved role; an application-specific unclassified effect
  remains blocked until classified.
- Prove that Rust owns every backend or durable-effect role.
- Prove that TypeScript/Bun/Next components are browser, product-web, SSR, or UI
  orchestration only.
- Search for TypeScript backend fallback, dual-run, shadow, recovery, and
  business-effect paths.
- Compute completion from the machine-declared role/effect denominator and name
  unresolved domains explicitly.
- Keep source admission, product-manifest resolution, deployment, and live
  production proof as separate evidence layers.
- Fail stale or conflicting selectors rather than borrowing a historical
  snapshot or an archived instruction source.

Exceptions never authorize the forbidden language/effect boundary. A typed,
owned, expiring exception may cover a non-core selection detail only when
the profile contract lists that default as exceptable. Expiry fails closed;
renewal needs a new decision and recovery evidence.
