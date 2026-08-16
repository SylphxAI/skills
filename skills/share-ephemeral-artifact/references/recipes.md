# Sharing recipes

## Repository artifact service

Upload through the current CI or release interface, set the shortest useful
retention, and return the artifact page or authenticated download URL.

## Approved object storage

Upload through the product's native storage client. Use authenticated access or
a short-lived signed URL for private material and record the object expiry or
deletion path.

## Public temporary host

Use the host's current documented upload command for public-safe material.
Confirm that the returned URL opens and that the downloaded size matches the
artifact. Return the host's stated retention with the URL.
