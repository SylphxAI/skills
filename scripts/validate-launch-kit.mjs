import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const repoRoot = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const registryPath = path.join(repoRoot, 'registry', 'skills.json');
const demoPath = path.join(repoRoot, 'examples', 'launch-demos.md');
const launchPlanPath = path.join(repoRoot, 'docs', 'distribution-launch-plan.md');
const launchPostPath = path.join(repoRoot, 'docs', 'public-launch-post.md');

async function main() {
  const errors = [];
  for (const file of [demoPath, launchPlanPath, launchPostPath]) {
    if (!existsSync(file)) errors.push(`${path.relative(repoRoot, file)} is missing`);
  }
  const registry = JSON.parse(await readFile(registryPath, 'utf8'));
  const demos = existsSync(demoPath) ? await readFile(demoPath, 'utf8') : '';
  for (const skill of registry.skills) {
    if (!demos.includes(`\`${skill.name}\``)) errors.push(`examples/launch-demos.md missing ${skill.name}`);
  }
  const launchPlan = existsSync(launchPlanPath) ? await readFile(launchPlanPath, 'utf8') : '';
  for (const required of ['skills.sh', 'SkillsMP', 'ClaudeSkill', 'Cross AI Tools', 'npx skills add SylphxAI/skills']) {
    if (!launchPlan.includes(required)) errors.push(`docs/distribution-launch-plan.md missing ${required}`);
  }
  const launchPost = existsSync(launchPostPath) ? await readFile(launchPostPath, 'utf8') : '';
  for (const required of ['Sylphx Skills', 'npx skills add SylphxAI/skills', 'https://github.com/SylphxAI/skills']) {
    if (!launchPost.includes(required)) errors.push(`docs/public-launch-post.md missing ${required}`);
  }

  if (errors.length) {
    console.error(`Launch kit validation failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`Validated launch kit for ${registry.skills.length} skills`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
