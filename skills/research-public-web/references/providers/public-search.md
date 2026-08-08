# Public search & fetch — concrete endpoints

| Source | Endpoint pattern | Auth | Notes |
|---|---|---|---|
| Wikipedia REST | `https://en.wikipedia.org/api/rest_v1/page/summary/{title}` | none | JSON extract + urls |
| MediaWiki opensearch | `https://en.wikipedia.org/w/api.php?action=opensearch&search=` | none | title list |
| HN Algolia | `https://hn.algolia.com/api/v1/search?query=` | none | practitioner signal |
| npm | `https://registry.npmjs.org/{pkg}/latest` | none | version authority |
| crates.io | `https://crates.io/api/v1/crates/{name}` | none | send User-Agent |
| PyPI | `https://pypi.org/pypi/{name}/json` | none | |
| jsDelivr | `https://cdn.jsdelivr.net/npm/{pkg}/…` | none | CDN + file fetch |
| Wayback available | `https://archive.org/wayback/available?url=` | none | |
| Open-Meteo | `https://api.open-meteo.com/v1/forecast?…` | none | non-commercial quotas |
| ipify | `https://api.ipify.org?format=json` | none | egress IP only |
| DDG HTML | `https://html.duckduckgo.com/html/?q=` | none | brittle |

## Method

Query → candidate URLs → fetch primary → excerpt + cite → cross-check.  
On adapter failure, **switch source**, do not infinite retry.
