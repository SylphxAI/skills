import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const repoRoot = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const skillsDir = path.join(repoRoot, 'skills');

const STRUCTURE_CHECKS = [
  { name: 'rule id', re: /`[a-z0-9-]+-[0-9]+`/i },
  { name: 'markdown decision table', re: /\|\s*---\s*\|/ },
  { name: 'state machine', re: /state machine|->/i },
  { name: 'event schema', re: /event schema|events?:/i },
  { name: 'checklist', re: /checklist|readiness matrix|coverage matrix/i },
];

async function listMarkdownFiles(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  return entries.filter((entry) => entry.isFile() && entry.name.endsWith('.md')).map((entry) => path.join(dir, entry.name)).sort();
}

async function main() {
  const entries = await readdir(skillsDir, { withFileTypes: true });
  const skills = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  const errors = [];

  for (const skill of skills) {
    const referenceDir = path.join(skillsDir, skill, 'references');
    const references = await listMarkdownFiles(referenceDir);
    if (!references.length) {
      errors.push(`skills/${skill}: missing references/*.md; public skills need progressive-disclosure depth`);
      continue;
    }
    for (const file of references) {
      const text = await readFile(file, 'utf8');
      const matched = STRUCTURE_CHECKS.filter((check) => check.re.test(text)).map((check) => check.name);
      if (!matched.length) {
        errors.push(`${path.relative(repoRoot, file)}: add at least one structured artifact: rule IDs, decision table, state machine, event schema, or checklist`);
      }
    }
  }

  if (errors.length) {
    console.error(`Reference quality validation failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`Validated reference quality for ${skills.length} skills`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
