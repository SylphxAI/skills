#!/usr/bin/env python3
"""Check the canonical glossary and retired uses in repository Markdown.

Historical labels are data in the glossary, never a second list in this check.
Ambiguous English words are checked in context, not banned indiscriminately.
"""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
GLOSSARY = ROOT / 'skills/clear-writing/references/terminology.md'

# These are legitimate domain uses, not exceptions for legacy instructions.
DOMAIN_USES = (
    r'Animal Crossing', r'landing[ -]pages?', r'ranked ladder',
    r'differential test harness', r'multi-month denominator',
)


def glossary_rows(text):
    rows = []
    for number, line in enumerate(text.splitlines(), 1):
        if not line.startswith('| ') or line.startswith(('| Historical', '| ---')):
            continue
        cells = [c.strip() for c in line.strip('|').split('|')]
        if len(cells) != 4 or not all(cells):
            raise ValueError(f'glossary:{number}: expected four nonempty cells')
        if not re.fullmatch(r'\[[^\]]+\]\(https://[^\s)]+\)', cells[2]):
            raise ValueError(f'glossary:{number}: missing named HTTPS source')
        rows.append(cells)
    if not rows:
        raise ValueError('glossary: no mappings')
    return rows


def patterns(rows):
    for historical, _, _, _ in rows:
        # Parentheses qualify a historical use, and are not part of its spelling.
        for alias in re.split(r'[,;]', re.sub(r'\([^)]*\)', '', historical)):
            alias = alias.strip()
            if alias.startswith('the R0-R3'):
                yield re.compile(r'\bR[0-3]\b', re.I)
            elif alias:
                yield re.compile(r'(?<!\w)' + re.escape(alias) + r'(?!\w)', re.I)


def verify(root=ROOT):
    glossary = root / GLOSSARY.relative_to(ROOT)
    try:
        rows = glossary_rows(glossary.read_text())
    except ValueError as error:
        return [str(error)]
    retired = list(patterns(rows))
    errors = []
    for path in sorted(root.rglob('*.md')):
        if path == glossary or '.git' in path.parts:
            continue
        for number, line in enumerate(path.read_text().splitlines(), 1):
            # Preserve exact public links/identifiers; these are not prose labels.
            prose = re.sub(r'https://[^\s)]+', '', line)
            # Only membership and billing uses of a seat are valid.
            if not re.search(r'runner.{0,20}\bseat\b|\bseat\b.{0,20}runner', prose, re.I):
                prose = re.sub(r'\bseat\b', '', prose, flags=re.I)
            for valid in DOMAIN_USES:
                prose = re.sub(valid, '', prose, flags=re.I)
            for pattern in retired:
                match = pattern.search(prose)
                if match:
                    errors.append(f'{path.relative_to(root)}:{number}: retired use: {match[0]}')
    return errors


if __name__ == '__main__':
    errors = verify()
    if errors:
        print('\n'.join(errors), file=sys.stderr)
        sys.exit(1)
    print('PASS: glossary mappings have sources; 0 retired uses outside the glossary.')
