# Identifiers

Trigger: creating or changing entity IDs, slugs, generated names, credentials or human-entered codes.

Keep stable identity, display names, ordering and secrets distinct. Use one encoding contract and cross-language conformance vectors rather than independent definitions.

## Entity IDs

The default for a new persisted entity is UUIDv7, stored in a native UUID column where supported. RFC 9562 gives it a 48-bit millisecond timestamp plus version/variant and random or monotonic fields. A generator can use sub-millisecond fractions or counters; PostgreSQL 18's `uuidv7()` does. UUIDv7 gives insertion locality, not cross-transaction commit order.

Generate the identity at its owning authority or through the shared SDK when it is needed before insertion. Derive alternate text encodings from the same value. Natural lookup keys and upstream IDs are separate concepts, not automatically duplicate identity authorities.

Keep another system's published identifier unchanged. Preserve customer-held IDs and accepted external forms through an explicit migration contract; moving to a new internal representation does not authorize breaking those references. A new canonical ID for a legacy format needs a mapping or completed consumer migration. Existing UUID values need not be regenerated just to gain ordering.

UUIDv4, ULID, KSUID and coordinated integer IDs have different locality, size and generator tradeoffs. ULID is 128-bit compatible with UUID storage, although it is not UUIDv7; KSUID is 160 bits and does not fit a UUID column. Choose the identifier policy for the owning schema and its consumers.

## Order is the log's, never the id's

For a gap-free durable stream or change feed, use an authoritative commit/log position. Concurrent transactions can generate IDs in one order and commit in another.

For ordinary list pagination, define the sort and unique tie-breaker plus snapshot/concurrency semantics. A composite `(sort_value, id)` key can support a stable list without a new serialization system. Store a separate authoritative timestamp where people need to know when an event occurred.

## The text form: TypeID

Use [TypeID 0.3](https://github.com/jetify-com/typeid/blob/main/spec/README.md) as the default public encoding: a type prefix and a 26-character lowercase Crockford-base32 encoding of the UUID bits. The open specification allows broader prefix forms; a selected API profile can restrict them further.

For a compact default profile, use two-to-five lowercase letters per entity type and keep a registry beside the executable API contract. Derive prefix constants and encoders from that authority. Validate the expected type at ingress and return a stable, documented invalid-ID error. Provider/protocol-defined formats keep their own grammar.

For resource-oriented APIs, [AIP-122](https://google.aip.dev/122) uses plural camelCase collection identifiers and alternating collection/resource segments. TypeID-only segments or a separate UID policy are local choices, not AIP-122 requirements. Slug lookup is distinct from immutable-ID addressing.

## Slugs and generated names

A person-chosen slug is a mutable lookup key or handle. Keep its uniqueness scope and grammar explicit; a useful default is a lowercase DNS-compatible label of up to 40 characters. A free-text display name remains separate.

Define rename/alias retention from the product's external contract. GitHub documents redirects and warns that reuse of the old name breaks them. Keep historical links from resolving to a different entity without an intentional compatibility decision.

Derive internal system names from stable identity where a renameable slug would cause drift. Where underscores are legal, the compact TypeID profile can be used directly. For a DNS-compatible form replace the separator with a hyphen: the five-letter-prefix maximum is 32 characters (5 + 1 + 26). Validate the complete target grammar/length again after appending a purpose suffix.

Keep mutable placement separate from stable identity. A directory or routing authority can change an entity's home without embedding a second location authority in every ID. A customer-facing hostname follows the product's domain contract.

## Credentials

Knowing an entity ID grants no authority. Keep random secret material separate from resource identity; signed tokens can intentionally contain public subject/audience claims.

A useful opaque-token profile has an issuer/type prefix, at least 160 random bits from the OS CSPRNG and optional checksum. A CRC-32 checksum encoded in base62 can help scanning and typo detection; it supplies no authorization. Keep actual issuer prefixes and scanning-registration status with the issuing service.

Store high-entropy opaque tokens as hashes for verification, with constant-time comparison where applicable. Encrypt a secret the issuer must reuse, such as a webhook signing key. Validate signed tokens according to their protocol and protect the signing keys. Show newly issued secret material only through its authorized delivery path; rotate with overlap when the credential contract needs it.

## Codes a person types

Select length, alphabet, lifetime and attempt budget together. RFC 8628 gives an example of eight characters from `BCDFGHJKLMNPQRSTVWXZ` (about 34.5 bits) with a five-attempt budget for its stated guessing probability; these are profile choices, not the only conforming values. Normalize case and readability punctuation as specified by the selected alphabet.

Generate codes freshly from a CSPRNG, not from an entity ID or timestamp. Access-granting single-use codes are credentials: protect their stored representation, expiry and redemption. Longer-lived shared referral/event codes need a collision/uniqueness and redemption contract appropriate to their use.

## Verify the contract

Use shared test vectors across supported SDKs for encoding, expected-prefix parsing, target naming and code/slug validation. Each API owner names its registry and installed checks.

Sources checked 2026-10-30: [RFC 9562](https://www.rfc-editor.org/rfc/rfc9562), [PostgreSQL 18 UUID functions](https://www.postgresql.org/docs/18/functions-uuid.html), TypeID 0.3 and AIP-122 above, [ULID](https://github.com/ulid/spec), [KSUID](https://github.com/segmentio/ksuid), [GitHub rename behavior](https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository), and [GitHub token formats](https://github.blog/engineering/platform-security/behind-githubs-new-authentication-token-formats/).
