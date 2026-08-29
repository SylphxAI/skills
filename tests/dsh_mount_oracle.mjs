#!/usr/bin/env node
import { existsSync, realpathSync } from 'node:fs';
import { register } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

register('./dsh_loader.mjs', import.meta.url);

const here = dirname(fileURLToPath(import.meta.url));
const modulePath = resolve(process.argv[2] ?? join(here, '..', 'lib', 'dsh', 'index.js'));
const catalogRoot = resolve(process.argv[3] ?? join(here, '..', 'skills'));

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function sameDir(left, right) {
  if (existsSync(left) && existsSync(right)) {
    return realpathSync(left) === realpathSync(right);
  }
  return resolve(left) === resolve(right);
}

if (!existsSync(modulePath)) {
  fail(`DSH module is missing: ${modulePath}`);
}

const mod = await import(pathToFileURL(modulePath).href);
const filesystem = await import('@deepseek-ai/dsh-skill-filesystem');

if (!Array.isArray(mod.inject) || mod.inject.length !== 1 || mod.inject[0] !== 'skills') {
  fail('DSH module may depend on the host skills service only');
}

if (typeof mod.apply !== 'function') {
  fail('DSH module must export apply()');
}

const ctx = { oracle: true };
mod.apply(ctx, {});

if (filesystem.calls.length !== 1) {
  fail('DSH apply() must register exactly one filesystem skill provider');
}

const mounted = filesystem.calls[0];
if (mounted.ctx !== ctx) {
  fail('DSH apply() must pass the host context through');
}

const config = mounted.config ?? {};
if (config.includeDefaultRoots !== false) {
  fail('DSH module must not add host default skill roots');
}

const dirs = config.customSkillDirs;
if (!Array.isArray(dirs) || dirs.length !== 1) {
  fail('DSH module must mount only the catalog skills/ directory');
}

if (!sameDir(dirs[0], catalogRoot)) {
  fail('DSH module must point catalogRoot at skills/');
}
