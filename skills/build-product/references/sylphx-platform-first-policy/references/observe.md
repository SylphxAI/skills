# Observe and prove

How to see what an app did on Sylphx Platform.

Logs, metrics, traces, errors, audit, and Evidence Artifacts are the
Observability family (Witness). Every customer Operation should be traceable
from request → Resource generation → receipt → telemetry → Evidence.

## Do this

1. Use the public logs/status/evidence surfaces (`sylphx logs`, `sylphx status`,
   generated telemetry APIs) for the project and environment.
2. Correlate with the Operation id and Artifact digest from the deploy or job.
3. For product errors, send exceptions through the Platform error/telemetry
   path so they share tenancy and release identity.
4. Close a maintain cycle when the original failing oracle is green or the
   residual owner is named.

## Done

A specific Operation or request can be found, its terminal result named, and
the customer-visible effect confirmed or honestly marked missing.
