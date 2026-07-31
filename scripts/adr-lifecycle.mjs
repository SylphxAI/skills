#!/usr/bin/env node
/**
 * Lightweight ADR structural validation for this repository.
 *
 * Not a retrieval control plane. No ApplicableDecisionBundle.
 * Agents use ordinary search/RAG over ADR markdown; this only checks structure.
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

export const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const STATUSES = new Set(['proposed', 'accepted', 'rejected', 'superseded']);
const ALLOWED = new Set([
  'id',
  'status',
  'date',
  'decision_owner',
  'supersedes',
  'amends',
  'scope',
]);

function asStringArray(value) {
  if (value == null || value === '') return [];
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object' && item.id) return String(item.id);
      return String(item);
    });
  }
  return [String(value)];
}

export function idFromFilename(name) {
  return name.replace(/\.md$/i, '');
}

export function parseAdrFrontmatter(markdown, file = 'ADR') {
  const normalized = markdown.replaceAll('\r\n', '\n');
  if (!normalized.startsWith('---\n')) {
    throw new Error(`${file}: missing YAML frontmatter`);
  }
  const end = normalized.indexOf('\n---\n', 4);
  if (end < 0) throw new Error(`${file}: unterminated YAML frontmatter`);
  let values;
  try {
    values = YAML.parse(normalized.slice(4, end), { uniqueKeys: true });
  } catch (error) {
    throw new Error(`${file}: YAML parse failed: ${error.message}`);
  }
  if (!values || typeof values !== 'object' || Array.isArray(values)) {
    throw new Error(`${file}: frontmatter must be a mapping`);
  }
  return { values, body: normalized.slice(end + 5) };
}

export function loadAdrRecords(root = repositoryRoot) {
  const adrRoot = path.join(root, 'docs', 'adr');
  const errors = [];
  if (!existsSync(adrRoot)) return { records: [], errors: ['docs/adr/: missing'] };
  const files = readdirSync(adrRoot).filter((name) => name.endsWith('.md')).sort();
  const records = [];
  for (const name of files) {
    const rel = path.join('docs/adr', name);
    const markdown = readFileSync(path.join(root, rel), 'utf8');
    try {
      const { values } = parseAdrFrontmatter(markdown, rel);
      for (const key of Object.keys(values)) {
        if (!ALLOWED.has(key)) errors.push(`${rel}: unknown frontmatter field ${key}`);
      }
      const filenameId = idFromFilename(name);
      const id = values.id != null ? String(values.id) : filenameId;
      records.push({
        file: rel,
        filename: name,
        id,
        filenameId,
        status: values.status != null ? String(values.status) : '',
        date: values.date != null ? String(values.date) : '',
        decision_owner: values.decision_owner != null ? String(values.decision_owner) : '',
        supersedes: asStringArray(values.supersedes),
        amends: asStringArray(values.amends),
        scope: asStringArray(values.scope),
        markdown,
      });
    } catch (error) {
      errors.push(error.message);
    }
  }
  return { records, errors };
}

export function validateAdrCorpus(records, parseErrors = []) {
  const errors = [...parseErrors];
  const byId = new Map();
  for (const record of records) {
    if (byId.has(record.id)) errors.push(`${record.file}: duplicate id ${record.id}`);
    else byId.set(record.id, record);
    if (record.id !== record.filenameId) {
      errors.push(`${record.file}: id must equal filename stem (${record.filenameId})`);
    }
    if (!STATUSES.has(record.status)) {
      errors.push(`${record.file}: illegal status ${JSON.stringify(record.status)}`);
    }
  }

  for (const record of records) {
    for (const target of [...record.supersedes, ...record.amends]) {
      if (!byId.has(target)) errors.push(`${record.file}: dangling relation target ${target}`);
    }
  }

  for (const record of records) {
    if (record.status !== 'superseded') continue;
    const incoming = records.some((other) => other.supersedes.includes(record.id));
    if (!incoming) {
      errors.push(`${record.file}: status superseded requires another ADR that supersedes it`);
    }
  }

  function detectCycles(field) {
    const adj = new Map(records.map((record) => [record.id, record[field]]));
    const visiting = new Set();
    const visited = new Set();
    function visit(id, stack) {
      if (visiting.has(id)) {
        errors.push(`${field} cycle: ${[...stack, id].join(' -> ')}`);
        return;
      }
      if (visited.has(id)) return;
      visiting.add(id);
      for (const next of adj.get(id) || []) visit(next, [...stack, id]);
      visiting.delete(id);
      visited.add(id);
    }
    for (const id of adj.keys()) visit(id, []);
  }
  detectCycles('supersedes');
  detectCycles('amends');

  const short = new Map();
  for (const record of records) {
    const match = record.id.match(/^(ADR-\d{4})(?:-|$)/);
    if (!match) continue;
    const list = short.get(match[1]) || [];
    list.push(record.filename);
    short.set(match[1], list);
  }
  for (const [locator, names] of short.entries()) {
    if (new Set(names).size > 1) {
      errors.push(`docs/adr/: locator ${locator} used by ${[...new Set(names)].join(', ')}`);
    }
  }

  return { errors, byId };
}

export function checkAdrLifecycle(root = repositoryRoot) {
  const { records, errors: parseErrors } = loadAdrRecords(root);
  const { errors } = validateAdrCorpus(records, parseErrors);
  return { errors, records };
}

if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  const { errors, records } = checkAdrLifecycle();
  if (errors.length) {
    console.error(`ADR structural check failed (${errors.length}):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`ADR structural check ok: ${records.length} records`);
}
