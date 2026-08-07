#!/usr/bin/env node

/**
 * Repository integrity for an industry-shaped Agent Skills catalog.
 * Validates package shape, progressive-disclosure layout, listing budget,
 * secrets hygiene, constitution budget, and catalog freshness.
 */

import { createHash } from 'node:crypto';
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

// Codex listing class: ~8k description chars when window unknown.
const CATALOG_DESC_SOFT_MAX = 8000;
const DESCRIPTION_HARD_MAX = 1024;
const SKILL_MD_LINE_SOFT_MAX = 500;
const L0_MAX_CHARS = 6000;

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
    if (!existsSync(absolute)) {
      errors.push(`${path.relative(repositoryRoot, file)}: broken link ${target}`);
    }
  }
}

function validateSkill(folder, names, errors) {
  const packageRoot = path.join(repositoryRoot, 'skills', folder);
  const skillPath = path.join(packageRoot, 'SKILL.md');
  if (!existsSync(skillPath)) {
    errors.push(`skills/${folder}: missing SKILL.md`);
    return;
  }

  let parsed;
  try {
    parsed = parseFrontmatter(readFileSync(skillPath, 'utf8'), `skills/${folder}/SKILL.md`);
  } catch (error) {
    errors.push(error.message);
    return;
  }

  const { values, keys } = parsed;
  const unexpected = keys.filter((key) => !['name', 'description'].includes(key));
  if (unexpected.length) {
    errors.push(`skills/${folder}/SKILL.md: frontmatter only permits name and description`);
  }
  if (!NAME.test(values.name || '')) errors.push(`skills/${folder}/SKILL.md: invalid name`);
  if (values.name !== folder) errors.push(`skills/${folder}/SKILL.md: name must match folder`);
  if (names.has(values.name)) errors.push(`skills/${folder}/SKILL.md: duplicate name ${values.name}`);
  names.add(values.name);

  const description = values.description || '';
  if (!description || description.length > DESCRIPTION_HARD_MAX) {
    errors.push(`skills/${folder}/SKILL.md: invalid description`);
  }

  const body = readFileSync(skillPath, 'utf8');
  const lines = body.split('\n').length;
  if (lines > SKILL_MD_LINE_SOFT_MAX) {
    errors.push(
      `skills/${folder}/SKILL.md: exceeds ${SKILL_MD_LINE_SOFT_MAX}-line industry soft limit (${lines}); move depth to references/`,
    );
  }

  // Forbid obsolete portfolio ontology markers in live skill packages.
  const forbiddenMarkers = [
    'compose delivery-standard',
    'package class',
    'Policy packs',
    'soft composition',
    '*-standard',
    'meta-router skill',
  ];
  const lower = body.toLowerCase();
  for (const marker of forbiddenMarkers) {
    if (lower.includes(marker.toLowerCase())) {
      errors.push(`skills/${folder}/SKILL.md: obsolete portfolio marker: ${marker}`);
    }
  }

  const openaiYaml = path.join(packageRoot, 'agents', 'openai.yaml');
  if (!existsSync(openaiYaml)) {
    errors.push(`skills/${folder}/agents/openai.yaml: missing`);
  }

  for (const file of walk(packageRoot)) {
    const relative = path.relative(repositoryRoot, file);
    const text = readFileSync(file, 'utf8');
    for (const pattern of SECRET_PATTERNS) {
      if (pattern.test(text)) errors.push(`${relative}: looks like a credential`);
    }
    if (/\.(?:md|markdown)$/i.test(file)) validateLocalLinks(text, file, errors);
  }
}

function validateRuntimeConstitution(errors) {
  const location = 'runtime/constitution.md';
  const absolute = path.join(repositoryRoot, location);
  if (!existsSync(absolute) || !statSync(absolute).isFile()) {
    errors.push(`${location}: missing`);
    return;
  }
  const text = readFileSync(absolute, 'utf8');
  if (text.length > L0_MAX_CHARS) {
    errors.push(`${location}: exceeds hard L0 ceiling ${L0_MAX_CHARS} chars (got ${text.length})`);
  }
  const required = [
    'SylphxAI/skills',
    'Evidence precedes claims',
    'Done means delivered',
    'progressive disclosure',
    'Skills do not grant tools',
    'Lead with the answer',
  ];
  for (const phrase of required) {
    if (!text.includes(phrase)) errors.push(`${location}: missing required L0 phrase: ${phrase}`);
  }
}

function validateCatalogBudget(errors, skillFolders) {
  const catalog = JSON.parse(catalogBytes(repositoryRoot));
  if (catalog.count !== skillFolders.length) {
    errors.push(`catalog count ${catalog.count} != skill folders ${skillFolders.length}`);
  }
  let descChars = 0;
  for (const skill of catalog.skills) {
    descChars += String(skill.description || '').length;
    if (String(skill.description || '').length > DESCRIPTION_HARD_MAX) {
      errors.push(`catalog skill ${skill.name}: description over ${DESCRIPTION_HARD_MAX}`);
    }
  }
  if (descChars > CATALOG_DESC_SOFT_MAX) {
    errors.push(
      `catalog description sum ${descChars} exceeds Codex ~${CATALOG_DESC_SOFT_MAX} char listing class; shorten descriptions or retire packages with semantic evidence (not count targets)`,
    );
  }
}

export function checkRepository() {
  const errors = [];
  const skillFolders = readdirSync(path.join(repositoryRoot, 'skills'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const names = new Set();
  for (const folder of skillFolders) validateSkill(folder, names, errors);
  validateRuntimeConstitution(errors);
  validateCatalogBudget(errors, skillFolders);

  const catalogPath = path.join(repositoryRoot, 'catalog.json');
  if (!existsSync(catalogPath) || readFileSync(catalogPath, 'utf8') !== catalogBytes(repositoryRoot)) {
    errors.push('catalog.json is stale; run npm run build:catalog');
  }

  for (const rootFile of [
    'README.md',
    'PROJECT.md',
    'LICENSE',
    'INSTALL.md',
    'SKILL.md',
    'docs/MODEL.md',
    'runtime/hooks.mjs',
    'runtime/package-digest.mjs',
    'runtime/reconcile.mjs',
    'runtime/sylphx-skills.mjs',
    'runtime/target-generation.mjs',
    'runtime/constitution.md',
  ]) {
    const absolute = path.join(repositoryRoot, rootFile);
    if (!existsSync(absolute) || !statSync(absolute).isFile()) errors.push(`${rootFile}: missing`);
  }

  return { errors, skillFolders };
}

if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  const { errors, skillFolders } = checkRepository();
  if (errors.length) {
    console.error(`Skills integrity failed with ${errors.length} finding(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`Skills integrity ok: ${skillFolders.length} task skills`);
}
