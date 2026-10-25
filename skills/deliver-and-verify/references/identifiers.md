# Identifiers

Trigger: creating, storing, exposing, or parsing an id, a slug, a generated
name, a credential, or a code a person types - in any repository, for the
platform's records and for a product's own.

Goal: one rule set for every product, so an id means the same thing everywhere,
one implementation serves every language, and an id is never mistaken for a
name or a secret. The platform's migration onto this standard is
`docs/specs/one-platform/identifiers-convergence.md` in the platform repository.

## Hard lines

- A credential is not an id and contains none, so a leaked id reveals no secret
  and a leaked secret reveals no entity. It is stored hashed (or encrypted
  where the issuer must use it) and shown once.
- Knowing an id grants nothing (RFC 9562 §8); an id is never a capability.
- A code that grants access on its own is a credential and is stored hashed.
- Existing customer-held ids are not rewritten (see Exceptions): changing them
  breaks signed history and ids customers hold.

## Entity ids

- **One id per entity**: a UUIDv7 ([RFC 9562 §5.7](https://www.rfc-editor.org/rfc/rfc9562.html#section-5.7)),
  128 bits: a 48-bit millisecond timestamp, then random bits. It is time
  ordered, so B-tree inserts stay local, and it needs no coordination. It is
  an identity, not a clock and not a sequence: two ids in one millisecond are
  not ordered by anything but their random bits. A second
  identifier column for the same entity is a second source of truth.
- **Stored as `uuid`** (16 bytes), not `text`. Primary key
  `id uuid primary key default uuidv7()` (PostgreSQL 18); a reference is
  `<entity>_id uuid`. When the id is needed before the insert (an outbox row,
  an idempotent create), create it with the SDK's `ids` helper. Those two
  RFC 9562 generators are the only sources: UUIDv4, ULID, nanoid, CUID, KSUID,
  Snowflake, sequences, hashes of a seed, and a wrapped UUID
  (`customer-<uuid>`) lose time order, native typing, or the database check.
  The v7 gives insertion locality and identity, not commit order; that comes
  from the log ([order](#order-is-the-logs-never-the-ids)).
- **The database refuses a non-v7 id.** Every `id` column carries the shared
  `enforce_uuidv7_id` trigger (version 7 on insert and on an id change).
- **Why not the others**: UUIDv4 values are inserted at random index positions; a
  [ULID](https://github.com/ulid/spec) is not a valid UUID, so the database can
  neither type nor check it; [KSUID](https://github.com/segmentio/ksuid) is 160
  bits and fits no native type; a [Snowflake](https://blog.x.com/engineering/en_us/a/2010/announcing-snowflake)
  id needs worker coordination and a 64-bit budget; a sequence leaks volume and
  invites enumeration.
- **The id is opaque**: logic does not parse the timestamp out of it
  (RFC 9562 §6.12), and it never stands in for a commit position or a cursor.
- **Request ids** in logs are `req_` TypeIDs over a v7 value and are not stored.
- **Another system's id** (an upstream identity user id in a product, a Stripe customer id)
  is stored as the exact text it was published as, in a `text` column, and is
  never decoded.

## Order is the log's, never the id's

A UUIDv7 sorts into insertion locality, and an identifier is never a commit
order. Between two transactions, a commit order is set by when each one
committed, not by the value it minted: the same millisecond holds thousands of
ids, a transaction that minted first as an early id can commit last, and
concurrent writers interleave. The same applies to an ingested event. When
anything is a chain, a feed, a delta, a "since", or an ordering that a person
can see, it takes its position from a serialized authority - one that decides
and persists order in one place, such as the transaction's own commit position
or an append-only log's offset - and never from sorting ids.

- **A log or event stream** carries an explicit serial position (Postgres
  sequence value under a serialized writer, an outbox `ord`, a log offset) as
  the primary ordering key, alongside the v7 id for identity.
- **Cursor pagination** is on the ordering key, never on a bare timestamp or an
  id's sort, and its value is a unique, monotonic position, so two rows never
  share a cursor and nothing is skipped or repeated at a page boundary.
- **Timestamps are read, not inferred.** Where a person sees "when", the row
  carries a timestamp column taken at the authority, because an id's embedded
  timestamp is rounded to the millisecond and is not a fact about commit.
- The v7 id stays the identity and the key: it is exactly what the B-tree
  wants. It is only never asked to decide what happened first.

## The text form: TypeID

- Outside the database an id has one text form, a
  [TypeID](https://github.com/jetify-com/typeid/blob/main/spec/README.md)
  (spec v0.3): `<prefix>_<suffix>`, the suffix being the same 128 bits as 26
  lowercase Crockford base32 characters, e.g. `prj_01m3jzg7fpek2ayen9cq4bn2ef`.
  It is the Stripe object-id pattern ([Stripe, "Designing APIs for humans:
  object IDs"](https://dev.to/stripe/designing-apis-for-humans-object-ids-3o5a))
  on a standard, lossless encoding. It is used in every API, SDK, CLI, URL,
  log, event, webhook, export, JWT `sub`, and any other system's storage; the
  raw UUID stays inside the owning service's database.
- **Prefixes**: 2-5 lowercase letters (`[a-z]{2,5}`), one per entity type, never
  renamed or reused, unique inside their registry. Each API owner keeps one
  registry, `ids.toml` next to its contracts (the platform's is
  `contracts/ids.toml` in the platform repository), and the SDK generators read it.
- **Resource names** follow [AIP-122](https://google.aip.dev/122):
  `orgs/{org}/projects/{project}/envs/{env}/{collection}/{id}`, every segment a
  TypeID and every collection a snake_case plural. The last segment is the id,
  so there is no `uid` field. The server assigns every id. Declarative tools
  (Terraform, `platform.toml`) find a resource by slug, then address it by id.
- **API boundary**: a field or path segment that takes an id accepts one form,
  a TypeID with that field's prefix. A raw UUID, uppercase or wrong-prefix
  TypeID, slug, or retired form is `400 invalid_id` naming the expected prefix.
  Responses emit TypeIDs only. Slug lookup is its own endpoint
  (`GET /v1/orgs:lookup?slug=acme`) returning the id; console, CLI, and SDK
  resolve there and then address by id.

## Slugs

- A slug exists where a person chooses a handle: an org, a project within its
  org, and a resource a person names in configuration (environment
  `production`, database `main`). It is chosen, not generated: a random slug
  like `wise-span-b4yv35` is a second id pretending to be a name (that form is
  retired).
- Grammar `^[a-z]([a-z0-9-]{0,38}[a-z0-9])?$` (1-40 characters, a valid DNS
  label), unique within its parent, stored lowercase.
- It is mutable: a rename keeps the old slug as a redirect for 90 days, then
  frees it (GitHub's model). Because it can change, it is only a lookup key
  into the id, not a foreign key, resource name segment, API identity, hostname,
  Kubernetes name, database or storage path, secret name, or metric label.
- The free-text `display_name` is separate and may be anything.

## Generated names

A name derived from an entity for a system with its own naming rules uses the
entity's id (a slug can be renamed; a truncated hash collides):

- Where `_` is legal (Postgres identifiers, label values, object keys, OpenBao
  paths) use the TypeID verbatim: `db_01m3j…`.
- Where it is not (DNS labels, Kubernetes names) use the DNS form, `_` replaced
  by `-`: `env-01m3j…`. At most 31 characters; converts back losslessly.
- A child object appends a purpose: `env-01m3j…-web`.
- A customer-facing hostname is a product decision (a custom domain or a
  platform domain the product chose), not derived from a slug.

## Location is not in the id

An entity id carries no Cell, region, or shard. The Placement directory maps an
id to its home Cell, and each Cell holds that map in its snapshot. An embedded
location goes stale when a tenant moves, so a directory is needed anyway and the
embedded copy becomes a second, sometimes-wrong source. AWS can put the region
in an ARN because a resource never changes region; our Cells move tenants.
Stripe, GitHub, and Google ids carry no location. A credential may carry a
location hint, because it is rolled when its home moves and must verify in any
Cell without a lookup.

## Credentials

- **Format**: `<issuer>_<type>_[<mode>_][<handle>_]<secret><checksum>`, the
  GitHub token pattern ([GitHub, "Behind GitHub's new authentication token
  formats"](https://github.blog/engineering/platform-security/behind-githubs-new-authentication-token-formats/)):
  - an issuer and type prefix unique across the company (`sylphx_sk_`,
    `sylphx_pk_`, `sylphx_dc_`), so a scanner can recognise it;
  - `_` separators (outside base62), so a double-click selects the whole token;
  - a secret of at least 160 bits from the OS CSPRNG, base62 with rejection
    sampling (the platform mints 190 bits);
  - a checksum: CRC-32 of everything before it as 6 base62 characters, so a
    typo or non-key is refused without a lookup. It is not a security control.
- An optional non-secret **handle** (random, may start with the home Cell code)
  finds the row; it is not the entity id of the key's resource.
- **Stored** as SHA-256 of the whole token (`bytea`), compared in constant time;
  a high-entropy secret needs no slow hash. A key the issuer must itself use (a
  webhook signing secret) is encrypted at rest instead.
- **Registered** for secret scanning: each secret prefix has a regex in the
  GitHub secret scanning partner program and in `.gitleaks.toml`.
- **Rotation** rolls the credential with an overlap; its format may change
  across a roll, an id's does not.
- The platform (the platform access service) issues customer keys. A product that issues its
  own credentials (sessions, invites) uses its own issuer prefix and these
  rules. A JWT is a credential too; its `sub` is a TypeID.

## Codes a person types

- A code read on one screen and typed on another (device sign-in, pairing)
  follows [RFC 8628 §6.1](https://www.rfc-editor.org/rfc/rfc8628#section-6.1):
  8 characters from `BCDFGHJKLMNPQRSTVWXZ` (about 34.5 bits), shown
  `WDJB-MJHT`, uppercased on input with other characters dropped, from the
  CSPRNG, expiring within 15 minutes, rate limited (RFC 8628 §5.1: 5 wrong
  attempts per code).
- A longer-lived shared code (referral, event join) uses the same alphabet with
  at least 10 characters, a unique index, and rate-limited redemption.
- A code is generated fresh, not cut from an id or a timestamp.

## Exceptions

- **Positions are not ids**: a log offset or ledger sequence (`bigint` from a
  sequence) orders rows and is never exposed as an entity's identity.
- **Formats another standard fixes** stay as that standard says: W3C trace ids,
  OAuth/OIDC values, provider ids, store product ids.
- **In-memory handles** (an engine's entity or asset handle, a cache key) are
  not persisted ids.
- **128-bit values minted before a service's cutover** (UUIDv4, ULID) keep
  their value. Stored as `uuid` and written as a TypeID they have the one form,
  and changing them would change ids customers hold and break signed history
  (hash-chained audit rows, an append-only ledger) for nothing but time
  ordering. A value that is not 128 bits (a hash-derived 130-bit id, a nanoid, a
  slug used as a key) gets a new id. Every new id is v7.

## How it is judged

Every supported external SDK (Rust today, any language added later) ships the
same registered TypeID encoding and the same `ids` module, so an id minted in
one SDK parses byte for byte in another: `new(prefix)`, `encode`, `parse(expected_prefix)`, `dns_name`, and
slug and code validation. A product generates prefix constants from its
`ids.toml` with those helpers and writes no encoder of its own. Every
repository runs the shared `identifiers` action from the shared organization `.github` repository on the
lines a change adds; it fails on a non-v7 id generator (`gen_random_uuid()`,
`uuid4`, `Uuid::new_v4`, `randomUUID`, ULID, nanoid, CUID, KSUID) and on a
`text` or `serial` primary key. A line that must keep one carries
`identifiers: allow <reason>`. The API owner's contract lint checks that every
id field and resource pattern uses a prefix and collection registered in
`ids.toml`, every id column has the v7 check, and every credential prefix has a
scanning regex.
