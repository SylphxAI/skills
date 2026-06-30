import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const repoRoot = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const skillsDir = path.join(repoRoot, 'skills');
const readmePath = path.join(repoRoot, 'README.md');
const skillsShPath = path.join(repoRoot, 'skills.sh.json');

function diff(expected, actual) {
  const actualSet = new Set(actual);
  return expected.filter((item) => !actualSet.has(item));
}

async function main() {
  const entries = await readdir(skillsDir, { withFileTypes: true });
  const skills = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  const errors = [];

  const readme = await readFile(readmePath, 'utf8');
  const readmeSkills = [...readme.matchAll(/\.\/skills\/([a-z0-9-]+)\/SKILL\.md/g)].map((match) => match[1]).sort();
  const missingFromReadme = diff(skills, readmeSkills);
  const unknownInReadme = diff(readmeSkills, skills);
  if (missingFromReadme.length) errors.push(`README.md missing skills: ${missingFromReadme.join(', ')}`);
  if (unknownInReadme.length) errors.push(`README.md references unknown skills: ${unknownInReadme.join(', ')}`);

  const skillsSh = JSON.parse(await readFile(skillsShPath, 'utf8'));
  const groupedSkills = [];
  for (const group of skillsSh.groupings || []) {
    if (!group.title) errors.push('skills.sh.json group missing title');
    if (!group.description) errors.push(`skills.sh.json group ${group.title || '<untitled>'} missing description`);
    if (!Array.isArray(group.skills)) errors.push(`skills.sh.json group ${group.title || '<untitled>'} missing skills list`);
    else groupedSkills.push(...group.skills);
  }

  const duplicates = groupedSkills.filter((skill, index) => groupedSkills.indexOf(skill) !== index).sort();
  const missingFromSkillsSh = diff(skills, groupedSkills);
  const unknownInSkillsSh = diff(groupedSkills, skills);
  if (duplicates.length) errors.push(`skills.sh.json contains duplicate skills: ${[...new Set(duplicates)].join(', ')}`);
  if (missingFromSkillsSh.length) errors.push(`skills.sh.json missing skills: ${missingFromSkillsSh.join(', ')}`);
  if (unknownInSkillsSh.length) errors.push(`skills.sh.json references unknown skills: ${unknownInSkillsSh.join(', ')}`);

  if (errors.length) {
    console.error(`Catalog validation failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`Validated catalog coverage for ${skills.length} skills`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
