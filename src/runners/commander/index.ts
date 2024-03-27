import Conf from 'conf';
import prompts from 'prompts';

import fs from 'fs';
import path from 'path';

import { cyan, green, red, bold, unknownHasProperty } from '@utils/index.js';
import { isFolderEmpty } from './helpers/is-folder-empty.js';
import { validateNpmName } from './helpers/validate-pkg.js';
import { program } from './program.js';
import { notifyUpdate, onPromptState } from './helpers/misc.js';

export const runWithCommander = async (): Promise<void> => {
  const conf = new Conf({ projectName: 'create-node-template' });
  let name = program.processedArgs[0] as string;

  //  trim and check name
  if (!name?.trim()) {
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
        // return 'Invalid project name: ' + validation.problems[0];
        console.error('Invalid project name. Issue(s): ');
        validation.problems.forEach(p => console.error(`- ${p}\n`));
        validation.problems.forEach(p => console.error(`    ${red(bold('*'))} ${p}`));
        process.exit(1);
      },
    });

    if (typeof res.name === 'string') {
      name = res.name.trim();
    }
  }

  // const options = program.opts();
  const { template, importAlias, packageManager, resetPreferences } = program.opts();

  if (resetPreferences) {
    conf.clear();
    console.log(`Preferences reset successfully`);
    return;
  }

  const resolvedProjectPath = path.resolve(name);
  const projectName = path.basename(resolvedProjectPath);

  /**
   * Verify the project dir is empty or doesn't exist
   */
  const folderExists = fs.existsSync(resolvedProjectPath);
  if (folderExists && !isFolderEmpty(resolvedProjectPath, projectName)) {
    process.exit(1);
  }

  let packMan = packageManager;
  if (!packageManager) {
    const res = await prompts({
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
      // validate: (pm: string) => {
      //   if (['npm', 'yarn', 'pnpm', 'bun'].includes(pm)) {
      //     return true;
      //   }
      //   return 'Invalid package manager';
      //   // process.exit(1);
      // },
    });

    if (typeof res.packageManager === 'string') {
      packMan = res.packageManager;
    }
  }
  // TDOD: prompt for pm
  // TODO: prompt for template

  let temp = template;
  if (!template) {
    const res = await prompts({
      onState: onPromptState,
      type: 'select',
      name: 'template',
      message: 'Which template do you want to use?',
      choices: [
        { title: 'node-basic', value: 'node-basic' },
        { title: 'express-basic', value: 'express-basic' },
        { title: 'express-advanced', value: 'express-advanced' },
      ],
    });

    if (typeof res.template === 'string') {
      temp = res.template;
    }
  }

  // const template = typeof options.template === 'string' && options.template.trim();
  const preferences = (conf.get('preferences') || {}) as Record<string, boolean | string>;
  /**
   * If the user does not provide the necessary flags, prompt them for whether
   * to use TS or JS.
   */
  if (!template) {
    const defaults: typeof preferences = {
      typescript: true,
      eslint: true,
      tailwind: true,
      app: true,
      srcDir: false,
      importAlias: '@/*',
      customizeImportAlias: false,
    };
    const getPrefOrDefault = (field: string) => preferences[field] ?? defaults[field];

    conf.set('preferences', preferences);

    // TODO: create project.

    try {
      // await notifyUpdate(packageManager);
      notifyUpdate();
    } catch (error) {
      console.log();
      console.log('Aborting installation.');

      if (unknownHasProperty(error, 'command')) {
        console.log(`  ${cyan(error.command)} has failed.`);
      } else {
        console.log(red('Unexpected error. Please report it as a bug:') + '\n', error);
      }
      console.log();

      // await notifyUpdate(packageManager);
      notifyUpdate();

      process.exit(1);
    }
  }
};
