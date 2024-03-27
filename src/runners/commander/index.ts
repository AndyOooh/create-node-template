import Conf from 'conf';
import prompts from 'prompts';

import fs from 'fs';
import path from 'path';

import { cyan, green, red, bold, unknownHasProperty } from '@utils/index.js';
// import { getPkgManager } from './helpers/get-pkg-manager.js';
import { isFolderEmpty } from './helpers/is-folder-empty.js';
import { validateNpmName } from './helpers/validate-pkg.js';
import { program } from './program.js';
import { notifyUpdate, onPromptState } from './helpers/misc.js';

export const runWithCommander = async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  /* negate the above */
  const conf = new Conf({ projectName: 'create-node-template' });
  const name = program.processedArgs[0];
  //  trim and check name

  const options = program.opts();
  const { importAlias, useNpm } = options;

  let projectPath: string = name;

  // if (options.resetPreferences) {
  //   conf.clear();
  //   console.log(`Preferences reset successfully`);
  //   return;
  // }

  if (typeof projectPath === 'string') {
    projectPath = projectPath.trim();
  }

  if (!projectPath) {
    const res = await prompts({
      onState: onPromptState,
      type: 'text',
      name: 'path',
      message: 'What is your project named?',
      initial: 'my-app',
      validate: (name: string) => {
        const validation = validateNpmName(path.basename(path.resolve(name)));
        if (validation.valid) {
          return true;
        }
        return 'Invalid project name: ' + validation.problems[0];
      },
    });

    if (typeof res.path === 'string') {
      projectPath = res.path.trim();
    }
  }

  if (!projectPath) {
    console.log(
      '\nPlease specify the project directory:\n' +
        `  ${cyan(program.name())} ${green('<project-directory>')}\n` +
        'For example:\n' +
        `  ${cyan(program.name())} ${green('my-next-app')}\n\n` +
        `Run ${cyan(`${program.name()} --help`)} to see all options.`
    );
    process.exit(1);
  }

  const resolvedProjectPath = path.resolve(projectPath);
  const projectName = path.basename(resolvedProjectPath);

  const validation = validateNpmName(projectName);
  if (!validation.valid) {
    console.error(
      `Could not create a project called ${red(
        `"${projectName}"`
      )} because of npm naming restrictions:`
    );

    validation.problems.forEach(p => console.error(`    ${red(bold('*'))} ${p}`));
    process.exit(1);
  }

  /**
   * Verify the project dir is empty or doesn't exist
   */
  const root = path.resolve(resolvedProjectPath);
  const appName = path.basename(root);
  const folderExists = fs.existsSync(root);

  if (folderExists && !isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  const template = typeof options.template === 'string' && options.template.trim();
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
