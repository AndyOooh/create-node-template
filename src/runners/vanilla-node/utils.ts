import * as util from 'util';
import * as readline from 'node:readline/promises';
import * as fs from 'node:fs/promises';
import { exec } from 'node:child_process';
import { PackageManager, Template, supportedPMs, supportedTemplates } from '@config/index';

/*
 * Execute command asynchronusly
 */
const execPromise = util.promisify(exec);

/*
 *
 */
export const runCmd = async (command: string): Promise<void> => {
  try {
    const { stdout, stderr } = await execPromise(command);
    console.log(stdout);
    console.log(stderr);
  } catch (error) {
    console.log(error);
  }
};

/*
 *
 */
export const readlinePromise = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/*
 *
 */
export async function findPackageManagers(): Promise<PackageManager[]> {
  const packageManagers: PackageManager[] = [];

  await Promise.all(
    supportedPMs.map(async pm => {
      try {
        await execPromise(pm + ' --version');
        packageManagers.push(pm);
      } catch {}
    })
  );

  return packageManagers;
}

/*
 * Used to map package managers to their install commands
 */
export const installCommandMap = {
  npm: 'npm install',
  yarn: 'yarn',
  pnpm: 'pnpm install',
  bun: 'bun install',
};

/*
 * Used with process.argv[2] to get project name
 */
export const getProjectName = async (
  cwd: string,
  currFolder: string,
  name?: string
): Promise<string> => {
  let projectName = name;
  if (!projectName) {
    projectName = await readlinePromise.question(
      `\nYou have not specified a project name.\nPress Enter to create a project in your current folder (${currFolder})\nor enter project name: `
    );
  }
  const foldersInCwd = await fs.readdir(cwd);
  if (foldersInCwd.includes(projectName)) {
    const res = await readlinePromise.question(
      `\nA folder with that name already exists.\nPress Enter to overwrite\nor enter a new project name: `
    );
    projectName = res || projectName;
  }
  return projectName;
};

/*
 *
 */
export const getPackageManager = async (name?: string): Promise<PackageManager> => {
  let packageManager = name as PackageManager;
  while (!packageManager || !supportedPMs.includes(packageManager)) {
    const packageManagers: PackageManager[] = await findPackageManagers();
    // console.log('🚀  packageManagers:', packageManagers);
    const input = await readlinePromise.question(
      `These package managers have been detected on your system:\n${packageManagers
        .map(pm => `- ${pm}`)
        .join('\n')}\nChoose one (press enter for npm): `
    );
    packageManager = (input as PackageManager) || 'npm';
    if (!packageManager || !supportedPMs.includes(packageManager)) {
      console.log('Invalid package manager');
    }
  }
  return packageManager;
};

/*
 *
 */
export const getTemplate = async (name: string): Promise<Template> => {
  let template = name as Template;
  while (!template || !supportedTemplates.includes(template)) {
    const input = await readlinePromise.question(
      `Choose a template from this list:\n${supportedTemplates
        .map(pm => `- ${pm}`)
        .join('\n')}\n press enter for node-basic: `
    );
    template = (input as Template) || 'node-basic';
    if (!template || !supportedTemplates.includes(template)) {
      console.log('Invalid template name');
    }
  }
  return template;
};
