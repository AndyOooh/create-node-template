import * as path from 'path';
import * as fs from 'node:fs/promises';
import {
  getPackageManager,
  getProjectName,
  getSuccessString,
  getTemplate,
  installCommandMap,
  renameProject,
  runCmd,
} from './utils';
import { cyan, green } from '@utils/index';

// TODO: Let user pick PM and template frpm numbers instead of typing it out.

export const runWithNode = async () => {
  try {
    const __dirname = import.meta.dirname; // path to current file (not iuncluding the file name)
    const cwd = process.cwd(); // path to current working directory (shell. not including the source code file path)
    const currFolder = path.basename(cwd);

    const templatesPath = path.resolve(__dirname, '../../../templates');
    const [arg1, arg2, arg3] = process.argv.slice(2);
    // const contents = await fs.readdir(templatesPath); // just testing

    /* Get inputs (if not set in args) */
    const projectName = await getProjectName(cwd, currFolder, arg1);
    const packageManager = await getPackageManager(arg2);
    const template = await getTemplate(arg3);

    /* Create paths and copy template to destination*/
    const destPath = projectName ? path.join(cwd, projectName) : cwd;
    const templatePath = path.join(templatesPath, template);
    await fs.cp(templatePath, destPath, { recursive: true });
    await renameProject(projectName, destPath);

    /* Create/modify package.json */

    /* Install deps */
    const instalCommand = installCommandMap[packageManager];

    console.log(`Using ${green(packageManager)}`);
    console.log(`Installing dependencies...`);
    await runCmd(`cd ${projectName} && ${instalCommand}`);
    console.log('\nDependencies installed successfully.');

    const succesString = getSuccessString(projectName, template);
    console.log(succesString);
  } catch (error) {
    console.log('🚫 Something went wrong, error: ', error);
  }
};
