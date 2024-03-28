import { existsSync } from 'fs';
import { basename, resolve } from 'path';

import { cyan, getSuccessString, red, unknownHasProperty } from '@utils/index.js';
import { CliOptions } from '@config/index.js';
import { isFolderEmpty } from './helpers/is-folder-empty.js';
import { notifyUpdate } from './helpers/misc.js';
import { getPackageManager, getProjectName, getTemplate } from './helpers/prompts.js';
import { program } from './program.js';
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
  const projectPath = resolve(name);
  const projectName = basename(projectPath);
  const folderExists = existsSync(projectPath);
  if (folderExists && !isFolderEmpty(projectPath, projectName)) {
    console.log('Please make sure the directory is empty before proceeding.');
    process.exit(1);
  }

  const pm = await getPackageManager(packageManager);
  const temp = await getTemplate(template);

  // const preferences = (conf.get('preferences') || {}) as Record<string, boolean | string>;
  // const getPrefOrDefault = (field: string) => preferences[field] ?? defaults[field];
  // conf.set('preferences', preferences);

  try {
    await createApp({
      projectName,
      template: temp,
      packageManager: pm,
      importAlias,
    });
    const succesString = getSuccessString(projectName, template);
    console.log(succesString);

    console.log(`Recommended next steps:`);
    console.log(`1. ${cyan(`cd ${projectName}`)}`);
    console.log(`2. ${cyan('code .')} (VSCode)`);
    console.log(
      `3. ${cyan(packageManager === 'yarn' ? 'yarn dev' : `${packageManager} run dev`)}\n`
    );

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
