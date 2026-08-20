import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { apply as applySkillFilesystem } from '@deepseek-ai/dsh-skill-filesystem';

const catalogRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'skills');

export const name = 'sylphx-skills';

export const inject = ['skills'];

/**
 * Mount the public catalog as a global skill provider: registers into the
 * global layer of the DSH skill registry, so every agent sees the catalog
 * without project or user skill roots being involved. The provider name is
 * scoped to this bundle; project/user discovery stays untouched.
 */
export function apply(ctx, config = {}) {
  return applySkillFilesystem(ctx, {
    providerName: 'sylphx-catalog',
    includeDefaultRoots: false,
    customSkillDirs: [catalogRoot],
    ...config
  });
}
