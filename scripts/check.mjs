#!/usr/bin/env node

/**
 * Repository integrity for the Sylphx Verified Capabilities open foundation.
 * Validates package shape, progressive-disclosure layout, qualification
 * records, listing budget, secrets hygiene, constitution budget, and
 * catalog freshness.
 */

import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { packageDigest } from '../runtime/package-digest.mjs';
import { catalogBytes, parseFrontmatter, readJson, repositoryRoot } from './build-catalog.mjs';
import {
  FORBIDDEN_INSTRUCTION_PATTERNS,
  incrementalValueEvidenceError,
  qualifiedDigestError,
  suiteForbiddenInstructionFindings,
} from './qualification-integrity.mjs';

const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SECRET_PATTERNS = [
  /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/,
  /\bsk-[A-Za-z0-9_-]{20,}\b/,
  /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/,
];

// Host web search/fetch is a primitive. Skills must not ban it or replace it
// with "open recipes / curl first" as the research method.
export { FORBIDDEN_INSTRUCTION_PATTERNS };

// Codex listing class: ~8k description chars when window unknown.
const CATALOG_DESC_SOFT_MAX = 8000;
const DESCRIPTION_HARD_MAX = 1024;
const SKILL_MD_LINE_SOFT_MAX = 500;
const L0_MAX_CHARS = 6000;

const SCHEMA_FILES = [
  'schemas/qualification-record.schema.json',
  'schemas/eval-suite.schema.json',
];

const REQUIRED_ROOT_FILES = [
  'README.md',
  'PROJECT.md',
  'LICENSE',
  'INSTALL.md',
  'SKILL.md',
  'docs/MODEL.md',
  'docs/NORTH-STAR.md',
  'docs/QUALIFICATION.md',
  'docs/qualification/LEDGER.md',
  'docs/PROMOTION.md',
  'scripts/promote-release.mjs',
  'scripts/run-qualification.mjs',
  ...SCHEMA_FILES,
  'runtime/hooks.mjs',
  'runtime/package-digest.mjs',
  'runtime/reconcile.mjs',
  'runtime/sylphx-skills.mjs',
  'runtime/target-generation.mjs',
  'runtime/constitution.md',
];

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
  // Unclosed link targets: "](" reaching end of line without a closing ")".
  // The link regex above cannot see these, so malformed links stayed invisible.
  const unclosed = /\]\(([^)\n]+)$/gm;
  for (const match of markdown.matchAll(unclosed)) {
    errors.push(`${path.relative(repositoryRoot, file)}: unclosed link target ${match[1].trim().slice(0, 80)}`);
  }
}

function validateQualification(folder, errors) {
  const contractPath = `skills/${folder}/capability.json`;
  if (existsSync(path.join(repositoryRoot, contractPath))) {
    errors.push(
      `${contractPath}: retired house contract; job and procedure live in SKILL.md (agentskills.io). Do not restore.`,
    );
  }

  const qualificationPath = `skills/${folder}/qualification.json`;
  if (existsSync(path.join(repositoryRoot, qualificationPath))) {
    let record;
    try {
      record = readJson(path.join(repositoryRoot, qualificationPath));
    } catch (error) {
      errors.push(`${qualificationPath}: invalid JSON: ${error.message}`);
      return;
    }
    const valid = qualificationSchema(record);
    if (!valid) {
      for (const detail of qualificationSchema.errors || []) {
        errors.push(`${qualificationPath}: ${detail.instancePath || '/'} ${detail.message}`);
      }
    }
    if (record.name !== folder) errors.push(`${qualificationPath}: name must match folder`);
  }

  const qualification = existsSync(path.join(repositoryRoot, qualificationPath))
    ? readJson(path.join(repositoryRoot, qualificationPath))
    : { status: 'unqualified' };

  if (qualification.status === 'qualified') {
    const expires = Date.parse(qualification.expiresAt || '');
    if (!Number.isFinite(expires) || expires <= Date.now()) {
      errors.push(`${qualificationPath}: qualified record must have a future expiresAt`);
    }
    if (!qualification.evidence.every((item) => item.digest && item.uri)) {
      errors.push(`${qualificationPath}: qualified evidence must carry digest and uri`);
    }
    if (!existsSync(path.join(repositoryRoot, `skills/${folder}/evals/suite.json`))) {
      errors.push(`${qualificationPath}: qualified capability requires an eval suite at skills/${folder}/evals/suite.json`);
    }
    for (const item of qualification.evidence) {
      if (!existsSync(path.join(repositoryRoot, item.uri))) {
        errors.push(`${qualificationPath}: evidence uri missing on disk: ${item.uri}`);
      }
    }
    const digestError = qualifiedDigestError(
      qualification,
      packageDigest(path.join(repositoryRoot, 'skills', folder)),
    );
    if (digestError) errors.push(`${qualificationPath}: ${digestError}`);
  }

  const suitePath = path.join(repositoryRoot, `skills/${folder}/evals/suite.json`);
  if (existsSync(suitePath)) {
    try {
      const suite = readJson(suitePath);
      for (const label of suiteForbiddenInstructionFindings(suite)) {
        errors.push(`skills/${folder}/evals/suite.json: eval prompt forbids host web search ("${label}")`);
      }
      const incrementalError = incrementalValueEvidenceError(qualification, suite);
      if (incrementalError) errors.push(`${qualificationPath}: ${incrementalError}`);
    } catch (error) {
      errors.push(`skills/${folder}/evals/suite.json: invalid JSON: ${error.message}`);
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

  validateQualification(folder, errors);

  for (const file of walk(packageRoot)) {
    const relative = path.relative(repositoryRoot, file);
    const text = readFileSync(file, 'utf8');
    for (const pattern of SECRET_PATTERNS) {
      if (pattern.test(text)) errors.push(`${relative}: looks like a credential`);
    }
    for (const pattern of FORBIDDEN_INSTRUCTION_PATTERNS) {
      if (pattern.re.test(text)) {
        errors.push(`${relative}: forbids host web search ("${pattern.label}"); use host search/fetch, keep recipes as known URL/CLI patterns only`);
      }
    }
    if (/\.(?:md|markdown)$/i.test(file)) validateLocalLinks(text, file, errors);
  }
}

const RETIRED_SLOGAN_RE = /Evidence First|Evidence-First|Evidence precedes claims/gi;

export function activeInstructionFiles(root = repositoryRoot) {
  const files = [
    path.join(root, 'runtime/constitution.md'),
    path.join(root, 'docs/policies/PRINCIPLES.md'),
  ];
  const skillsRoot = path.join(root, 'skills');
  if (!existsSync(skillsRoot)) return files.filter((file) => existsSync(file));
  for (const entry of readdirSync(skillsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const skillMd = path.join(skillsRoot, entry.name, 'SKILL.md');
    if (existsSync(skillMd)) files.push(skillMd);
    const refs = path.join(skillsRoot, entry.name, 'references');
    if (existsSync(refs)) {
      files.push(...walk(refs).filter((file) => /\.(?:md|markdown)$/i.test(file)));
    }
  }
  return files;
}

export function retiredSloganMatches(text) {
  return [...new Set(String(text).match(RETIRED_SLOGAN_RE) || [])];
}

export function retiredSloganFindings(root = repositoryRoot) {
  const findings = [];
  for (const file of activeInstructionFiles(root)) {
    const text = readFileSync(file, 'utf8');
    const relative = path.relative(root, file);
    for (const match of retiredSloganMatches(text)) {
      findings.push(`${relative}: retired slogan "${match}"`);
    }
  }
  return findings;
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
    'Search before you act',
    'Claim landed or live',
    'Reversible local work is done when the change is correct',
    'progressive disclosure',
    'Skills do not grant tools',
    'Lead with the answer',
  ];
  for (const phrase of required) {
    if (!text.includes(phrase)) errors.push(`${location}: missing required L0 phrase: ${phrase}`);
  }
  const forbidden = [
    'Evidence First',
    'Evidence precedes claims',
    'evidence discipline',
  ];
  for (const phrase of forbidden) {
    if (text.toLowerCase().includes(phrase.toLowerCase())) {
      errors.push(`${location}: retired phrase must not appear: ${phrase}`);
    }
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
  const qualified = catalog.qualification.qualified;
  if (qualified !== catalog.qualification.qualifiedNames.length) {
    errors.push('catalog qualification projection is inconsistent');
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
  errors.push(...retiredSloganFindings());
  validateCatalogBudget(errors, skillFolders);

  const catalogPath = path.join(repositoryRoot, 'catalog.json');
  if (!existsSync(catalogPath) || readFileSync(catalogPath, 'utf8') !== catalogBytes(repositoryRoot)) {
    errors.push('catalog.json is stale; run npm run build:catalog');
  }

  for (const rootFile of REQUIRED_ROOT_FILES) {
    const absolute = path.join(repositoryRoot, rootFile);
    if (!existsSync(absolute) || !statSync(absolute).isFile()) errors.push(`${rootFile}: missing`);
  }

  return { errors, skillFolders };
}

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const qualificationSchema = ajv.compile(readJson(path.join(repositoryRoot, SCHEMA_FILES[0])));

if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  const { errors, skillFolders } = checkRepository();
  if (errors.length) {
    console.error(`Skills integrity failed with ${errors.length} finding(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  const catalog = JSON.parse(catalogBytes(repositoryRoot));
  console.log(
    `Skills integrity ok: ${skillFolders.length} task skills (${catalog.qualification.qualified}/${catalog.qualification.total} qualified)`,
  );
}
