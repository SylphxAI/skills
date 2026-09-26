#!/usr/bin/env bash
# Fail closed if any workflow uses GitHub-hosted runner labels.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
WORKFLOW_DIR="${ROOT}/.github/workflows"
FORBIDDEN_RE='(ubuntu|macos|windows)-(latest|[0-9]+(\.[0-9]+)?)'

if [[ ! -d "${WORKFLOW_DIR}" ]]; then
  echo "check-no-github-hosted-runners: missing ${WORKFLOW_DIR}" >&2
  exit 1
fi

violations=0
while IFS= read -r -d '' file; do
  line_no=0
  while IFS= read -r raw || [[ -n "${raw}" ]]; do
    line_no=$((line_no + 1))
    line="${raw%%#*}"
    trimmed="$(echo "${line}" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')"
    [[ -z "${trimmed}" ]] && continue
    if echo "${trimmed}" | grep -Eq "^runs-on:|^-[[:space:]]+"; then
      if echo "${trimmed}" | grep -Eiq "${FORBIDDEN_RE}"; then
        rel="${file#"${ROOT}/"}"
        echo "VIOLATION: ${rel}:${line_no}: ${trimmed}"
        violations=$((violations + 1))
      fi
    fi
  done <"${file}"
done < <(find "${WORKFLOW_DIR}" -type f \( -name '*.yml' -o -name '*.yaml' \) -print0 | sort -z)

if [[ "${violations}" -gt 0 ]]; then
  echo "FAIL: ${violations} GitHub-hosted runner reference(s)"
  exit 1
fi

echo "PASS: no GitHub-hosted runner labels in .github/workflows"
