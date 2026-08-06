# Requirements-engineering method and sources

Requirements engineering transforms stakeholder and user needs into an agreed,
verifiable contract while preserving the origin and impact of every material
requirement. It does not choose an architecture merely to make the requirements
look complete.

## Requirement quality review

For each requirement, check:

- **necessary** — traceable to an accepted need, authority, interface, or
  material risk;
- **appropriate** — stated at the level owned by the contract, without an
  accidental implementation prescription;
- **unambiguous and singular** — one interpretable obligation, with defined
  terms and conditions;
- **feasible** — not contradicted by physical, authority, platform, or resource
  constraints;
- **consistent** — conflicts and precedence are resolved explicitly;
- **verifiable** — an observation and success boundary can establish whether
  it holds;
- **traceable** — linked backward to need/source and forward to downstream
  design, test, and evidence owners; and
- **maintainable** — stable identity, version, owner, and change impact exist.

## Requirement record

```text
Requirement ID and version:
Normative statement:
Type and lifecycle scope:
Source need / stakeholder / authority:
Rationale and unacceptable alternative:
Conditions, operating envelope, and exceptions:
Observable success boundary and verification method:
Dependencies, interfaces, and conflicts:
Owner and downstream handoff:
Status, assumptions, and unresolved evidence:
```

Use `shall` only for an accepted obligation. Keep stakeholder wishes and
candidate requirements visibly non-binding until their authority, conflict,
feasibility, and validation are resolved. When a quality attribute matters,
define a scenario with source, stimulus, environment, response, and response
measure instead of an adjective.

## Authoritative sources

- ISO/IEC/IEEE, **29148:2018 Systems and software engineering — Life cycle
  processes — Requirements engineering** — processes, information items, and
  characteristics for requirements practice (official catalogue page):
  <https://www.iso.org/standard/72089.html>
- IEEE Standards Association, **IEEE/ISO/IEC 29148-2018** — official standard
  record:
  <https://standards.ieee.org/ieee/29148/6937/>
- NASA, **Systems Engineering Handbook, NASA/SP-2016-6105 Rev 2** — public
  guidance on stakeholder expectations, technical requirements, logical
  decomposition, validation, verification, and traceability:
  <https://www.nasa.gov/reference/systems-engineering-handbook/>
- INCOSE Systems Engineering Handbook, **Requirements Definition** — systems
  engineering context for needs, requirements, validation, and lifecycle
  traceability (publisher record):
  <https://www.wiley.com/en-us/INCOSE+Systems+Engineering+Handbook%3A+A+Guide+for+System+Life+Cycle+Processes+and+Activities%2C+5th+Edition-p-9781119814290>

The ISO/IEC/IEEE standard is the normative method reference when available.
Public summaries and handbooks help application but do not replace licensed
standard text or current external authority.
