import prompts from 'prompts';
import path from 'path';

import { validateNpmName } from './helpers/validate-pkg.js';
import { onPromptState } from './helpers/misc.js';
import { bold, red } from '@utils/index.js';
import { PackageManager, Template, supportedPMs, supportedTemplates } from '@config/index.js';

/*
 *
 */
export const getProjectName = async (arg1: string): Promise<string> => {
  let projectName = arg1;

  if (!projectName) {
    const res = await prompts({
      onState: onPromptState,
      type: 'text',
      name: 'name',
      message: 'What is your project named?',
      initial: 'my-app',
      validate: (name: string) => {
        const validation = validateNpmName(path.basename(path.resolve(name)));
        if (validation.valid) {
          return true;
        }
        console.error('Invalid project name. Issue(s): ');
        validation.problems.forEach(p => console.error(`- ${p}\n`));
        validation.problems.forEach(p => console.error(`    ${red(bold('*'))} ${p}`));
        process.exit(1);
      },
    });

    if (typeof res.name === 'string') {
      projectName = res.name.trim();
    }
  }
  return projectName;
};

/*
 *
 */
export const getPackageManager = async (pm: string): Promise<PackageManager> => {
  if (supportedPMs.includes(pm as PackageManager)) {
    return pm as PackageManager;
  }
  const { packageManager }: { packageManager: PackageManager } = await prompts({
    onState: onPromptState,
    type: 'select',
    name: 'packageManager',
    message: 'Which package manager do you want to use?',
    choices: [
      { title: 'npm', value: 'npm' },
      { title: 'yarn', value: 'yarn' },
      { title: 'pnpm', value: 'pnpm' },
      { title: 'bun', value: 'bun' },
    ],
    /* No need for validation */
  });

  return packageManager;
};

/*
 *
 */
export const getTemplate = async (temp: string): Promise<Template> => {
  if (supportedTemplates.includes(temp as Template)) {
    return temp as Template;
  }

  const { template }: { template: Template } = await prompts({
    onState: onPromptState,
    type: 'select',
    name: 'template',
    message: 'Which template do you want to use?',
    choices: [
      { title: 'node-basic', value: 'node-basic' },
      { title: 'express-basic', value: 'express-basic' },
      { title: 'express-advanced', value: 'express-advanced' },
    ],
    /* No need for validation */
  });

  return template;
};
