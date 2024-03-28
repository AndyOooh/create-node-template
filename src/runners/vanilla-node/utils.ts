import * as util from 'util';
import * as readline from 'node:readline/promises';
import * as fs from 'node:fs/promises';
import path from 'path';
import { exec } from 'node:child_process';
import { PackageManager, Template, supportedPMs, supportedTemplates } from '@config/index.js';
import {
  blue,
  cyan,
  execPromise,
  green,
  italic,
  magenta,
  red,
  underline,
  yellow,
} from '@utils/index.js';

/*
 *
 */
export const readlinePromise = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
      await execPromise(pm + ' --version');
      packageManagers.push(pm);
    })
  );
  return packageManagers;
}

/*
 *
 */
export const getPackageManager = async (name?: string): Promise<PackageManager> => {
  let packageManager = name as PackageManager;
  while (!supportedPMs.includes(packageManager)) {
    const packageManagers: PackageManager[] = await findPackageManagers();
    const input = await readlinePromise.question(
      `\nThese package managers have been detected on your system:\n${packageManagers
        .filter(pm => pm !== 'npm')
        .map((pm, index) => `${index + 1} - ${pm}`)
        .join('\n')}\n\nSelect a ${underline('number')} or press Enter for ${blue('npm')}: `
    );
    packageManager = input === '' ? 'npm' : packageManagers[+input - 1] || null;
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
    template = input === '' ? 'node-basic' : supportedTemplates[+input] || null;
    if (!template) {
      console.log('Invalid template name');
    }
  }
  console.log(`Creating project with template: ${yellow(template)} \n`);
  return template;
};
