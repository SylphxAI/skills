# Build Cycle for Password-Reset Email Delivery

## Journey gap

Reliable password-reset email delivery for all users after the last release is not fully achieved; approximately 10% of users encounter delivery failures.

## Owning boundary

The owning boundary for this capability lies within the email delivery system, specifically the configurations and delivery logs related to password-reset emails.

## Vertical slice

A vertical slice should focus on the entire path for password-reset email delivery, from request initiation to successful delivery acknowledgment. The implementation should address SMTP configurations, error handling, and user notification upon failure.

## Original oracle

Original oracles include successful delivery confirmations from the SMTP server, logs indicating successful dispatch, and validation checks for user accounts to verify that email addresses are correctly formatted and registered.

## Local vs landed vs live

Local work on this capability may involve simulating password resets and reviewing logs. Landed changes would include code updates and configuration adjustments integrated into the staging environment, while live claims pertain to the real-world user experiences and metrics post-deployment.

## Residuals

Residuals may include documented instances of delivery failures, configuration discrepancies in the email system, and required adjustments in user experience related to password reset notification flows.
