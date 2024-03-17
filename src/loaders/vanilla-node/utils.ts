import * as util from 'util';
import * as readline from 'node:readline/promises';
import { exec } from 'node:child_process';
import chalk from 'chalk';
import { PackageManager, Template, supportedPMs, supportedTemplates } from '@config/index';

export const { red, blue, cyan, green, yellow, bgRed, underline, magenta, magentaBright } = chalk;

/*
 * Execute command asynchronusly
 */
const execPromise = util.promisify(exec);
export const runCmd = async (command: string): Promise<void> => {
  try {
    const { stdout, stderr } = await execPromise(command);
    console.log(stdout);
    console.log(stderr);
  } catch (error) {
    console.log(error);
  }
};

export const readlinePromise = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
 * Used with process.argv[2] to get project name
 */
export const getProjectName = async (name?: string): Promise<string> => {
  let projectName = name;
  while (!projectName || projectName?.length < 3) {
    projectName = await readlinePromise.question('Enter project name: ');
    console.log('🚀  projectName:', projectName);
    if (projectName?.length < 3) console.log('Project name should be more than 2 characters');
  }
  return projectName;
};

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
      console.log('Invalid package manager');
    }
  }
  return template;
};
