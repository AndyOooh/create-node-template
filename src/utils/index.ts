import chalk from 'chalk';

import { join } from 'path';
import { readFile, writeFile } from 'node:fs/promises';

import { promisify } from 'util';
import { exec } from 'node:child_process';
import { PackageManager, Template } from '@config/index.js';
export * from './typescript-utils.js';

export const {
  italic,
  bold,
  red,
  blue,
  cyan,
  green,
  yellow,
  bgRed,
  underline,
  magenta,
  magentaBright,
} = chalk;

/*
 *
 */
export const renameProject = async (projectName: string, destPath: string) => {
  const packageJsonPath = join(destPath, 'package.json');
  const packageJson = await readFile(packageJsonPath, 'utf-8');
  const newPackageJson = packageJson.replace(/"name": ".*"/, `"name": "${projectName}"`);
  await writeFile(packageJsonPath, newPackageJson);
};

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
 * Execute command asynchronusly
 */
export const execPromise = promisify(exec);

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
export const getSuccessString = (projectName: string, template: Template) => {
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

export const logRecNextSteps = (projectName: string, packageManger: PackageManager) => {
  console.log(`Recommended next steps:`);
  console.log(`1. ${cyan(`cd ${projectName}`)}`);
  console.log(`2. ${cyan('code .')} (VSCode)`);
  console.log(`3. ${cyan(packageManger === 'yarn' ? 'yarn dev' : `${packageManger} run dev`)}\n`);
};
