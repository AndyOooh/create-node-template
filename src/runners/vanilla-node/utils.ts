import * as util from 'util';
import * as readline from 'node:readline/promises';
import * as fs from 'node:fs/promises';
import path from 'path';
import { exec } from 'node:child_process';
import { PackageManager, Template, supportedPMs, supportedTemplates } from '@config/index';
import { blue, cyan, green, italic, magenta, red, underline, yellow } from '@utils/index';

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
      `\nYou have not specified a project name.\n${underline(
        'Press Enter'
      )} to create a project in your current folder (${underline.bold(
        currFolder
      )})\nOr enter a ${blue('project name')}: `
    );
  }
  const foldersInCwd = await fs.readdir(cwd);
  if (foldersInCwd.includes(projectName)) {
    const res = await readlinePromise.question(
      `\nA folder with that name already exists.\nPress Enter to overwrite\nOr enter a new project ${blue(
        'name'
      )}: `
    );
    projectName = res || projectName;
  }
  return projectName;
};

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
      } catch (error) {
        throw error;
      }
    })
  );

  return packageManagers;
}

/*
 *
 */
export const getPackageManager = async (name?: string): Promise<PackageManager> => {
  let packageManager = name as PackageManager;
  while (!packageManager || !supportedPMs.includes(packageManager)) {
    const packageManagers: PackageManager[] = await findPackageManagers();
    const input = await readlinePromise.question(
      `\nThese package managers have been detected on your system:\n${packageManagers
        .filter(pm => pm !== 'npm')
        .map((pm, index) => `${index + 1} - ${pm}`)
        .join('\n')}\n\nSelect a ${underline('number')} or press Enter for ${blue('npm')}: `
    );
    packageManager = input === '' ? 'npm' : (packageManagers[+input - 1] as PackageManager) || null;
    if (!packageManager) {
      console.log(`\nInvalid selection. You must input a number. Try again.`);
    }
  }
  console.log(`You have selected: ${yellow(packageManager)} \n`);
  return packageManager;
};

/*
 *
 */
export const getTemplate = async (name?: string): Promise<Template> => {
  let template = name as Template;
  while (!template || !supportedTemplates.includes(template)) {
    const input = await readlinePromise.question(
      `\nSelect a template from this list (${underline('input number')}):\n${supportedTemplates
        .filter(temp => temp !== 'node-basic')
        .map((temp, index) => `${index + 1} - ${temp}`)
        .join('\n')}\n\nOr press Enter for ${blue('node-basic')}: `
    );
    template = input === '' ? 'node-basic' : (supportedTemplates[+input] as Template) || null;
    if (!template) {
      console.log('Invalid template name');
    }
  }
  console.log(`Creating project with template: ${yellow(template)} \n`);
  return template;
};

/*
 *
 */
export const renameProject = async (projectName: string, destPath: string) => {
  const packageJsonPath = path.join(destPath, 'package.json');
  const packageJson = await fs.readFile(packageJsonPath, 'utf-8');
  const newPackageJson = packageJson.replace(/"name": ".*"/, `"name": "${projectName}"`);
  await fs.writeFile(packageJsonPath, newPackageJson);
};

/*
 *
 */
export const getSuccessString = (projectName: string, template: string) => {
  const emoji = '🦉';
  const chars = 53;
  const extraChars = projectName.length + template.length;
  const hashString = Array.from({ length: extraChars + chars })
    .map(el => '#')
    .join('');

  const successString = `
${cyan(hashString)}
${emoji} ${green('Success!')} Created new project ${yellow.bold(
    projectName
  )} using template: ${yellow.italic(template)} ${emoji}
${cyan(hashString)}
`;
  return successString;
};

/* Test */
// const projectName = 'my-new-project';
// const template = 'node-basic';
// console.log(getSuccessString(projectName, template));
