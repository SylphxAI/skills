import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const repoRoot = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const skillsDir = path.join(repoRoot, 'skills');
const registryPath = path.join(repoRoot, 'registry', 'skills.json');
const checkRegistry = process.argv.includes('--check-registry');
const NAME_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;
const LOCAL_LINK_RE = /\[[^\]]+\]\((?!https?:|mailto:|#)([^)]+)\)/g;

function parseFrontmatter(markdown, file) {
  if (!markdown.startsWith('---\n')) throw new Error(`${file}: missing YAML frontmatter`);
  const end = markdown.indexOf('\n---', 4);
  if (end === -1) throw new Error(`${file}: unterminated YAML frontmatter`);
  const raw = markdown.slice(4, end).trim();
  const data = {};
  const keys = [];
  for (const line of raw.split('\n')) {
    if (!line.trim()) continue;
    const index = line.indexOf(':');
    if (index === -1) throw new Error(`${file}: invalid frontmatter line ${line}`);
    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();
    value = value.replace(/^['"]|['"]$/g, '');
    data[key] = value;
    keys.push(key);
  }
  return { data, keys };
}

async function walkFiles(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walkFiles(full));
    if (entry.isFile()) files.push(full);
  }
  return files.sort();
}

function validateLinks(markdown, file, errors) {
  for (const match of markdown.matchAll(LOCAL_LINK_RE)) {
    const raw = match[1].split('#')[0];
    if (!raw) continue;
    const target = path.resolve(path.dirname(file), raw);
    if (!existsSync(target)) {
      errors.push(`${file}: broken local link ${match[1]}`);
    }
  }
}

async function validateSkill(folderName) {
  const folder = path.join(skillsDir, folderName);
  const skillPath = path.join(folder, 'SKILL.md');
  const errors = [];
  if (!existsSync(skillPath)) return [`${folder}: missing SKILL.md`];
  const markdown = await readFile(skillPath, 'utf8');
  let frontmatter;
  try {
    frontmatter = parseFrontmatter(markdown, skillPath);
  } catch (error) {
    return [error.message];
  }
  const { data, keys } = frontmatter;
  const extraKeys = keys.filter((key) => !['name', 'description'].includes(key));
  if (extraKeys.length) errors.push(`${skillPath}: frontmatter may only contain name and description; found ${extraKeys.join(', ')}`);
  if (!data.name || !NAME_RE.test(data.name)) errors.push(`${skillPath}: invalid name ${JSON.stringify(data.name)}`);
  if (data.name !== folderName) errors.push(`${skillPath}: name must match folder ${folderName}`);
  if (!data.description) errors.push(`${skillPath}: missing description`);
  if ((data.description || '').length > 1024) errors.push(`${skillPath}: description exceeds 1024 chars`);
  if (!/\bUse (when|for)\b/i.test(data.description || '')) errors.push(`${skillPath}: description should include concrete Use when/Use for trigger text`);
  if (/TODO|PLACEHOLDER/i.test(markdown)) errors.push(`${skillPath}: contains TODO/PLACEHOLDER`);
  validateLinks(markdown, skillPath, errors);

  const allFiles = await walkFiles(folder);
  for (const file of allFiles) {
    const text = await readFile(file, 'utf8');
    if (/(BEGIN (RSA |OPENSSH |EC |DSA )?PRIVATE KEY|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9_]{20,}|gho_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9]{20,})/i.test(text)) errors.push(`${file}: looks like it may contain a secret`);
    validateLinks(text, file, errors);
  }

  const openaiYaml = path.join(folder, 'agents', 'openai.yaml');
  if (existsSync(openaiYaml)) {
    const yaml = await readFile(openaiYaml, 'utf8');
    if (!yaml.includes(`$${data.name}`)) errors.push(`${openaiYaml}: default prompt should mention $${data.name}`);
  }

  return errors;
}

async function main() {
  const entries = await readdir(skillsDir, { withFileTypes: true });
  const skillFolders = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  const errors = [];
  for (const folder of skillFolders) {
    errors.push(...await validateSkill(folder));
  }

  if (checkRegistry) {
    const before = existsSync(registryPath) ? await readFile(registryPath, 'utf8') : '';
    execFileSync('node', [path.join(repoRoot, 'scripts', 'generate-registry.mjs')], { stdio: 'pipe' });
    const after = await readFile(registryPath, 'utf8');
    if (before !== after) errors.push('registry/skills.json is not up to date; run node scripts/generate-registry.mjs');
  }

  if (errors.length) {
    console.error(`Validation failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`Validated ${skillFolders.length} skills`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
