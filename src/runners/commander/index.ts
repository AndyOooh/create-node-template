import fs from 'fs';
import path from 'path';

import { cyan, red, unknownHasProperty } from '@utils/index.js';
import { isFolderEmpty } from './helpers/is-folder-empty.js';
import { program } from './program.js';
import { notifyUpdate } from './helpers/misc.js';
import { getPackageManager, getProjectName, getTemplate } from './prompts.js';
import { CliOptions } from '@config/index.js';
import { createApp } from './createApp.js';

export const runWithCommander = async (): Promise<void> => {
  // const conf = new Conf({ projectName: 'create-node-template' });
  const nameOrEmptyString = (program.processedArgs[0] as string) || '';

  /* trim and check name */
  const name = await getProjectName(nameOrEmptyString);
  const { template, importAlias, packageManager, resetPreferences }: CliOptions = program.opts();

  // if (resetPreferences) {
  //   conf.clear();
  //   console.log(`Preferences reset successfully`);
  //   return;
  // }

  /**
   * Verify the project dir is empty if it already exists
   */
  const projectPath = path.resolve(name);
  const projectName = path.basename(projectPath);
  const folderExists = fs.existsSync(projectPath);
  if (folderExists && !isFolderEmpty(projectPath, projectName)) {
    console.log('Please make sure the directory is empty before proceeding.');
    process.exit(1);
  }

  const pm = await getPackageManager(packageManager);
  const temp = await getTemplate(template);

  // const preferences = (conf.get('preferences') || {}) as Record<string, boolean | string>;

  /**
   * If the user does not provide the necessary flags, prompt them for whether
   * to use TS or JS.
   */

  // const getPrefOrDefault = (field: string) => preferences[field] ?? defaults[field];

  // conf.set('preferences', preferences);

  // TODO: create project.

  try {
    await createApp({
      projectName,
      template: temp,
      packageManager: pm,
      importAlias,
    });
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
};
