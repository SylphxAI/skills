#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { catalogBytes, parseFrontmatter, repositoryRoot } from './build-catalog.mjs';

const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SECRET_PATTERNS = [
  /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/,
  /\bsk-[A-Za-z0-9_-]{20,}\b/,
  /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/,
];
const REMOVED_BOUNDARIES = ['admissions', 'benchmarks', 'catalog', 'evals', 'registry', 'retired'];

function walk(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else if (entry.isFile()) files.push(absolute);
  }
  return files.sort();
}

function validateLocalLinks(markdown, file, errors) {
  const pattern = /\[[^\]]*\]\(([^)]+)\)/g;
  for (const match of markdown.matchAll(pattern)) {
    const target = match[1].trim().replace(/^<|>$/g, '');
    if (!target || /^(?:https?:|mailto:|#)/i.test(target)) continue;
    const withoutAnchor = target.split('#')[0];
    if (!withoutAnchor) continue;
    const absolute = path.resolve(path.dirname(file), decodeURIComponent(withoutAnchor));
    if (!existsSync(absolute)) errors.push(`${path.relative(repositoryRoot, file)}: broken link ${target}`);
  }
}

function validateSkill(folder, names, errors) {
  const packageRoot = path.join(repositoryRoot, 'skills', folder);
  const skillFile = path.join(packageRoot, 'SKILL.md');
  if (!existsSync(skillFile)) {
    errors.push(`skills/${folder}: missing SKILL.md`);
    return;
  }
  const markdown = readFileSync(skillFile, 'utf8');
  let parsed;
  try {
    parsed = parseFrontmatter(markdown, `skills/${folder}/SKILL.md`);
  } catch (error) {
    errors.push(error.message);
    return;
  }
  const { values, keys } = parsed;
  const unexpected = keys.filter((key) => !['name', 'description'].includes(key));
  if (unexpected.length) errors.push(`skills/${folder}/SKILL.md: frontmatter only permits name and description`);
  if (!NAME.test(values.name || '')) errors.push(`skills/${folder}/SKILL.md: invalid name`);
  if (values.name !== folder) errors.push(`skills/${folder}/SKILL.md: name must match folder`);
  if (names.has(values.name)) errors.push(`skills/${folder}/SKILL.md: duplicate name ${values.name}`);
  names.add(values.name);
  if (!values.description || values.description.length > 1024) errors.push(`skills/${folder}/SKILL.md: invalid description`);
  if (!/\bUse (?:when|for)\b/i.test(values.description || '')) errors.push(`skills/${folder}/SKILL.md: description needs a Use when/for trigger`);

  for (const file of walk(packageRoot)) {
    const relative = path.relative(repositoryRoot, file);
    const text = readFileSync(file, 'utf8');
    for (const pattern of SECRET_PATTERNS) {
      if (pattern.test(text)) errors.push(`${relative}: looks like a credential`);
    }
    if (/\b(?:TODO|PLACEHOLDER)\s*:/i.test(text)) errors.push(`${relative}: unresolved TODO/PLACEHOLDER marker`);
    if (/\.(?:md|markdown)$/i.test(file)) validateLocalLinks(text, file, errors);
  }

  const openAiMetadata = path.join(packageRoot, 'agents', 'openai.yaml');
  if (existsSync(openAiMetadata)) {
    const yaml = readFileSync(openAiMetadata, 'utf8');
    if (!yaml.includes(`$${folder}`)) errors.push(`skills/${folder}/agents/openai.yaml: default prompt must reference $${folder}`);
  }
}

const errors = [];
for (const removed of REMOVED_BOUNDARIES) {
  if (existsSync(path.join(repositoryRoot, removed))) errors.push(`${removed}/ is outside the Skills source boundary`);
}

const skillFolders = readdirSync(path.join(repositoryRoot, 'skills'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
const names = new Set();
for (const folder of skillFolders) validateSkill(folder, names, errors);

const rootSchema = path.join(repositoryRoot, 'schemas', 'product-artifact-envelope.schema.json');
if (!existsSync(rootSchema)) errors.push('schemas/product-artifact-envelope.schema.json: missing');
else {
  const canonical = readFileSync(rootSchema, 'utf8');
  for (const file of walk(path.join(repositoryRoot, 'skills')).filter((item) => item.endsWith('/product-artifact-envelope.schema.json'))) {
    if (readFileSync(file, 'utf8') !== canonical) errors.push(`${path.relative(repositoryRoot, file)}: shared product envelope drift`);
  }
}

const catalogPath = path.join(repositoryRoot, 'catalog.json');
if (!existsSync(catalogPath) || readFileSync(catalogPath, 'utf8') !== catalogBytes(repositoryRoot)) {
  errors.push('catalog.json is stale; run npm run build:catalog');
}

for (const rootFile of ['README.md', 'PROJECT.md', 'project.manifest.json', 'LICENSE', 'runtime/sylphx-skills.mjs']) {
  const absolute = path.join(repositoryRoot, rootFile);
  if (!existsSync(absolute) || !statSync(absolute).isFile()) errors.push(`${rootFile}: missing`);
}

if (errors.length) {
  console.error(`Skills integrity failed with ${errors.length} finding(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Skills integrity ok: ${skillFolders.length} canonical packages`);
