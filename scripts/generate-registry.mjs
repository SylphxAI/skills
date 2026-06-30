import { readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const repoRoot = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const skillsDir = path.join(repoRoot, 'skills');
const registryPath = path.join(repoRoot, 'registry', 'skills.json');

function parseFrontmatter(markdown, file) {
  if (!markdown.startsWith('---\n')) throw new Error(`${file}: missing frontmatter`);
  const end = markdown.indexOf('\n---', 4);
  if (end === -1) throw new Error(`${file}: unterminated frontmatter`);
  const raw = markdown.slice(4, end).trim();
  const data = {};
  for (const line of raw.split('\n')) {
    if (!line.trim()) continue;
    const index = line.indexOf(':');
    if (index === -1) throw new Error(`${file}: invalid frontmatter line ${line}`);
    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();
    value = value.replace(/^['"]|['"]$/g, '');
    data[key] = value;
  }
  return data;
}

async function listExisting(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort();
}

async function main() {
  const entries = await readdir(skillsDir, { withFileTypes: true });
  const skills = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.isDirectory()) continue;
    const folder = path.join(skillsDir, entry.name);
    const skillPath = path.join(folder, 'SKILL.md');
    if (!existsSync(skillPath)) continue;
    const markdown = await readFile(skillPath, 'utf8');
    const frontmatter = parseFrontmatter(markdown, skillPath);
    const references = await listExisting(path.join(folder, 'references'));
    const scripts = await listExisting(path.join(folder, 'scripts'));
    const agents = await listExisting(path.join(folder, 'agents'));
    skills.push({
      name: frontmatter.name,
      description: frontmatter.description,
      status: 'preview',
      path: path.posix.join('skills', entry.name),
      references,
      scripts,
      agents,
    });
  }

  const registry = {
    schemaVersion: 1,
    generatedBy: 'scripts/generate-registry.mjs',
    skills,
  };
  await writeFile(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
  console.log(`Wrote ${path.relative(repoRoot, registryPath)} with ${skills.length} skills`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
