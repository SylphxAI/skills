#!/usr/bin/env bash
# Install this checkout through a real host CLI, offline and with no login, then
# prove every skills/<name>/SKILL.md landed in the host's plugin cache.
# Usage: tests/host_install.sh claude|codex
# Specs: https://code.claude.com/docs/en/plugin-marketplaces
#        https://developers.openai.com/codex/plugins
set -uo pipefail
host=${1:?usage: host_install.sh claude|codex}
root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
tmp=$(mktemp -d); trap 'rm -rf "$tmp"' EXIT
fail() { echo "FAIL($host): $*" >&2; exit 1; }

case $host in
  claude)
    export CLAUDE_CONFIG_DIR=$tmp/home
    claude plugin validate "$root" || fail "marketplace/plugin manifest did not validate"
    claude plugin marketplace add "$root" --scope user || fail "marketplace add"
    claude plugin install sylphx-skills@sylphx --scope user || fail "plugin install"
    cache=$tmp/home/plugins/cache/sylphx/sylphx-skills
    ;;
  codex)
    export CODEX_HOME=$tmp/home; mkdir -p "$CODEX_HOME"
    codex plugin marketplace add "$root" || fail "marketplace add"
    codex plugin add sylphx-skills@sylphx || fail "plugin add"
    cache=$tmp/home/plugins/cache/sylphx/sylphx-skills
    version=$(python3 -c 'import json,sys;print(json.load(open(sys.argv[1]))["version"])' "$root/.codex-plugin/plugin.json")
    # Codex keys its cache by .codex-plugin/plugin.json version, so a skill change without a bump is not seen.
    [ -d "$cache/$version" ] || fail "no cache dir for plugin version $version"
    cache=$cache/$version
    ;;
  *) fail "unknown host" ;;
esac

# Claude keys its cache by commit: exactly one entry.
[ "$host" = codex ] || { set -- "$cache"/*/; [ $# -eq 1 ] && [ -d "$1" ] || fail "expected one cached plugin dir"; cache=${1%/}; }

n=0
for dir in "$root"/skills/*/; do
  name=$(basename "$dir")
  [ -f "$cache/skills/$name/SKILL.md" ] || fail "skills/$name/SKILL.md missing from installed plugin"
  cmp -s "$dir/SKILL.md" "$cache/skills/$name/SKILL.md" || fail "skills/$name/SKILL.md differs from checkout"
  n=$((n+1))
done
installed=$(find "$cache/skills" -mindepth 2 -maxdepth 2 -name SKILL.md | wc -l)
[ "$installed" -eq "$n" ] || fail "installed $installed skills, checkout has $n"
echo "OK($host): $n skills installed and identical to the checkout"
