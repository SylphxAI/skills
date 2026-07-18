#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function parseFrontmatter(markdown, file = 'SKILL.md') {
  if (!markdown.startsWith('---\n')) throw new Error(`${file}: missing YAML frontmatter`);
  const end = markdown.indexOf('\n---\n', 4);
  if (end < 0) throw new Error(`${file}: unterminated YAML frontmatter`);

  const values = {};
  const keys = [];
  for (const line of markdown.slice(4, end).split('\n')) {
    if (!line.trim()) continue;
    const colon = line.indexOf(':');
    if (colon < 1) throw new Error(`${file}: invalid frontmatter line ${JSON.stringify(line)}`);
    const key = line.slice(0, colon).trim();
    let value = line.slice(colon + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    keys.push(key);
    values[key] = value;
  }
  return { values, keys };
}

export function buildCatalog(root = repositoryRoot) {
  const skillsRoot = path.join(root, 'skills');
  const folders = readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const skills = folders.map((folder) => {
    const relativePath = `skills/${folder}/SKILL.md`;
    const absolutePath = path.join(root, relativePath);
    if (!existsSync(absolutePath)) throw new Error(`${relativePath}: missing`);
    const { values } = parseFrontmatter(readFileSync(absolutePath, 'utf8'), relativePath);
    return {
      name: values.name,
      description: values.description,
      path: relativePath,
    };
  });

  return {
    schemaVersion: 1,
    source: 'skills/*/SKILL.md',
    count: skills.length,
    skills,
  };
}

export function catalogBytes(root = repositoryRoot) {
  return `${JSON.stringify(buildCatalog(root), null, 2)}\n`;
}

function main() {
  const output = path.join(repositoryRoot, 'catalog.json');
  const next = catalogBytes(repositoryRoot);
  if (process.argv.includes('--check')) {
    const current = existsSync(output) ? readFileSync(output, 'utf8') : '';
    if (current !== next) {
      console.error('catalog.json is stale; run npm run build:catalog');
      process.exit(1);
    }
    console.log(`catalog.json is current (${buildCatalog().count} skills)`);
    return;
  }
  writeFileSync(output, next);
  console.log(`wrote catalog.json (${buildCatalog().count} skills)`);
}

if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) main();

