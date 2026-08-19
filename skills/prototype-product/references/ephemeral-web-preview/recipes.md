# Deployment recipes

## Existing preview pipeline

Use the repository's preview command or pull-request environment. Pin the exact
candidate revision, apply preview-scoped configuration through the provider's
secret interface, and capture the resulting URL and removal path.

## Temporary static preview

Build the project into its documented output directory and publish that
directory with the selected provider's current static-hosting command. Open the
root route and one route that represents the changed behavior.

## Temporary runtime preview

Deploy through the selected provider's native temporary or preview command.
Keep credentials in the provider's managed configuration and return ownership
or claim links through the authorized channel. Record the provider's stated
expiry and the command that removes the environment.

## Completion

Open the public URL, exercise the changed interaction, inspect browser errors,
and remove the environment when its review purpose ends.
