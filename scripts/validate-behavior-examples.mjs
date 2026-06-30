import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const repoRoot = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const skillsDir = path.join(repoRoot, 'skills');
const examplesDir = path.join(repoRoot, 'examples', 'behavior');
const REQUIRED_SECTIONS = ['## Positive prompt', '## Weak baseline', '## Skill-shaped output', '## Negative trigger', '## Expected behavior'];

async function main() {
  const skillEntries = await readdir(skillsDir, { withFileTypes: true });
  const skills = skillEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  const errors = [];

  if (!existsSync(examplesDir)) errors.push('examples/behavior is missing');

  for (const skill of skills) {
    const file = path.join(examplesDir, `${skill}.md`);
    if (!existsSync(file)) {
      errors.push(`examples/behavior/${skill}.md is missing`);
      continue;
    }
    const text = await readFile(file, 'utf8');
    if (!text.startsWith(`# ${skill} behavior example\n`)) errors.push(`${path.relative(repoRoot, file)}: title must be '# ${skill} behavior example'`);
    for (const section of REQUIRED_SECTIONS) {
      if (!text.includes(section)) errors.push(`${path.relative(repoRoot, file)}: missing ${section}`);
    }
    if (!text.includes(`skill: ${skill}`)) errors.push(`${path.relative(repoRoot, file)}: must mention skill: ${skill}`);
  }

  const exampleEntries = existsSync(examplesDir) ? await readdir(examplesDir, { withFileTypes: true }) : [];
  const known = new Set(skills);
  for (const entry of exampleEntries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const skill = entry.name.replace(/\.md$/, '');
    if (!known.has(skill)) errors.push(`examples/behavior/${entry.name} references unknown skill ${skill}`);
  }

  if (errors.length) {
    console.error(`Behavior example validation failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`Validated behavior examples for ${skills.length} skills`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
