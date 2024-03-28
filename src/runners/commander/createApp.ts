import { join, dirname, resolve } from 'path';
import { cp } from 'node:fs/promises';

import { PackageManager, Template } from '@config/index.js';
import { cyan, green, installCommandMap, renameProject, runCmd } from '@utils/index.js';
import { isWriteable } from './helpers/misc.js';

type CreateAppParams = {
  projectName: string;
  template: Template;
  packageManager: PackageManager;
  importAlias?: string;
};

export const createApp = async ({
  projectName,
  template,
  packageManager,
  importAlias,
}: CreateAppParams): Promise<void> => {
  try {
    const cwd = process.cwd(); // path to current working directory (shell. not including the source code file path)
    const destPath = join(cwd, projectName);

    if (!(await isWriteable(dirname(destPath)))) {
      console.error(
        'The application path is not writable, please check folder permissions and try again.'
      );
      console.error('It is likely you do not have write permissions for this folder.');
      process.exit(1);
    }

    const __dirname = import.meta.dirname; // path to current file (not iuncluding the file name)
    const templatesPath = resolve(__dirname, '../../../templates');
    const templatePath = join(templatesPath, template);

    /* Copy template to destination*/
    await cp(templatePath, destPath, { recursive: true });

    /* Modify package.json.name */
    await renameProject(projectName, destPath);

    /* Install deps */
    const instalCommand = installCommandMap[packageManager];
    console.log(`Installing dependencies with ${green(packageManager)}...`);
    await runCmd(`cd ${projectName} && ${instalCommand}`);
    console.log(`Dependencies installed ${green('successfully')}.`);
  } catch (error) {
    console.log('🚫 Something went wrong, error: ', error);
  }
};
