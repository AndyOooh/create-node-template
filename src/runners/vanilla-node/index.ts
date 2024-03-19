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

export const runWithNode = async () => {
  try {
    const __dirname = import.meta.dirname; // path to current file (not iuncluding the file name)
    const cwd = process.cwd(); // path to current working directory (shell. not including the source code file path)
    const currFolder = path.basename(cwd);

    const templatesPath = path.resolve(__dirname, '../../../templates');
    const [arg1, arg2, arg3] = process.argv.slice(2);

    /* Get inputs (if not set in args) */
    const projectName = await getProjectName(cwd, currFolder, arg1);
    const packageManager = await getPackageManager(arg2);
    const template = await getTemplate(arg3);

    /* Create paths and copy template to destination*/
    const destPath = projectName ? path.join(cwd, projectName) : cwd;
    const templatePath = path.join(templatesPath, template);
    await fs.cp(templatePath, destPath, { recursive: true });

    /* Modify package.json.name */
    await renameProject(projectName, destPath);

    /* Install deps */
    const instalCommand = installCommandMap[packageManager];
    console.log(`Installing dependencies with ${green(packageManager)}...`);
    await runCmd(`cd ${projectName} && ${instalCommand}`);
    console.log(`Dependencies installed ${green('successfully')}.`);

    const succesString = getSuccessString(projectName, template);
    console.log(succesString);

    console.log(`Recommended next steps:`);
    console.log(`1. ${cyan(`cd ${projectName}`)}`);
    console.log(`2. ${cyan('code .')} (VSCode)`);
    console.log(`3. ${cyan(`tsx run dev`)}\n`);
  } catch (error) {
    console.log('🚫 Something went wrong, error: ', error);
  }
};
