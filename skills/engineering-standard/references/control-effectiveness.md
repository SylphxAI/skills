# Control-effectiveness verification

This is a general engineering verification method; CI and frontier systems compose it.

The existence of a validator, policy, alert, or recovery path is not evidence
that it controls the failure it claims to control.

## Method

1. Name the threat or failure and the expected detection, prevention, or
   recovery behavior.
2. Inject a safe representative fault or mutation at the controlled boundary.
3. Verify that the control reacts through the real path, within the declared
   time, and without relying on the test harness to manufacture success.
4. Verify a clean case to catch always-fail controls and inspect collateral
   effects.
5. Retain the minimal mutation/fault as a regression and record environments
   where the control was not exercised.

Prefer mutation testing for test-suite sensitivity and fault injection for
runtime resilience. Production experiments require bounded blast radius and
the active delivery authority; local verification cannot grant it.

## Sources

- Jia and Harman, *An Analysis and Survey of the Development of Mutation
  Testing*: <https://doi.org/10.1109/TSE.2010.62>
- Basiri et al., *Chaos Engineering*: <https://doi.org/10.1109/MS.2016.60>
