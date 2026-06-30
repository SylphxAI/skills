import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const repoRoot = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const skillsDir = path.join(repoRoot, 'skills');
const evalsDir = path.join(repoRoot, 'evals');
const REQUIRED_LISTS = ['positive_prompts', 'negative_prompts', 'expected_behavior'];

function parseEvalYaml(text, file) {
  const data = {};
  let currentList = null;
  for (const [index, rawLine] of text.split('\n').entries()) {
    const lineNumber = index + 1;
    const line = rawLine.trimEnd();
    if (!line.trim() || line.trimStart().startsWith('#')) continue;

    const topLevel = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (topLevel) {
      const [, key, value] = topLevel;
      currentList = null;
      if (value === '') {
        data[key] = [];
        currentList = key;
      } else {
        data[key] = value.replace(/^['"]|['"]$/g, '');
      }
      continue;
    }

    const listItem = line.match(/^\s+-\s+(.+)$/);
    if (listItem && currentList) {
      data[currentList].push(listItem[1].trim().replace(/^['"]|['"]$/g, ''));
      continue;
    }

    throw new Error(`${file}:${lineNumber}: unsupported eval YAML shape`);
  }
  return data;
}

async function main() {
  const skillEntries = await readdir(skillsDir, { withFileTypes: true });
  const skillNames = new Set(skillEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name));
  const evalEntries = existsSync(evalsDir) ? await readdir(evalsDir, { withFileTypes: true }) : [];
  const evalFiles = evalEntries.filter((entry) => entry.isFile() && entry.name.endsWith('.eval.yaml')).map((entry) => entry.name).sort();
  const evalSkills = new Set();
  const errors = [];

  for (const fileName of evalFiles) {
    const file = path.join(evalsDir, fileName);
    let data;
    try {
      data = parseEvalYaml(await readFile(file, 'utf8'), file);
    } catch (error) {
      errors.push(error.message);
      continue;
    }

    if (!data.skill) {
      errors.push(`${file}: missing skill`);
      continue;
    }
    if (!skillNames.has(data.skill)) errors.push(`${file}: references unknown skill ${data.skill}`);
    const expectedFileName = `${data.skill}.eval.yaml`;
    if (fileName !== expectedFileName) errors.push(`${file}: eval filename should be ${expectedFileName}`);
    if (evalSkills.has(data.skill)) errors.push(`${file}: duplicate eval for skill ${data.skill}`);
    evalSkills.add(data.skill);

    for (const key of REQUIRED_LISTS) {
      if (!Array.isArray(data[key]) || data[key].length === 0) {
        errors.push(`${file}: ${key} must be a non-empty list`);
      }
    }
  }

  for (const skillName of [...skillNames].sort()) {
    if (!evalSkills.has(skillName)) errors.push(`evals/${skillName}.eval.yaml is missing`);
  }

  if (errors.length) {
    console.error(`Eval validation failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`Validated ${evalFiles.length} eval files for ${skillNames.size} skills`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
