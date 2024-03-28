import chalk from 'chalk';

import * as path from 'path';
// import path from 'path';
import * as fs from 'node:fs/promises';

import * as util from 'util';
// import * as readline from 'node:readline/promises';
import { exec } from 'node:child_process';
// import { PackageManager, Template, supportedPMs, supportedTemplates } from '@config/index.js';
// import { blue, cyan, green, italic, magenta, red, underline, yellow } from '@utils/index.js';
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
  const packageJsonPath = path.join(destPath, 'package.json');
  const packageJson = await fs.readFile(packageJsonPath, 'utf-8');
  const newPackageJson = packageJson.replace(/"name": ".*"/, `"name": "${projectName}"`);
  await fs.writeFile(packageJsonPath, newPackageJson);
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
export const execPromise = util.promisify(exec);

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
