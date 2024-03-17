import * as path from 'path';
import * as fs from 'node:fs/promises';
// import * as util from 'util';
// import { execSync } from 'child_process';
import { findPackageManagers, readlinePromise, runCmd } from './utils';
import { supportedPMs } from '@config/index';

const __dirname = import.meta.dirname;
const templatesPath = path.resolve(__dirname, '../../templates');
const contents = await fs.readdir(templatesPath);

export const runWithNode = async () => {
  let projectName = process.argv[2];
  // while (!projectName || projectName?.length < 3) {
  //   projectName = await readlinePromise.question('Enter project name: ');
  //   console.log('🚀  projectName:', projectName);
  //   if (projectName?.length < 3) console.log('Project name should be more than 2 characters');
  // }
  // Prompt to choose package manager. Npm should be default. Other choices: yarn, pnpm, bun
  let packageManager = process.argv[3];
  while (!packageManager || !supportedPMs.includes(packageManager)) {
    const packageManagers = await findPackageManagers();
    console.log('🚀  packageManagers:', packageManagers);
    packageManager = await readlinePromise.question(
      `These package managers have been detected on your system:\n${packageManagers
        .map(pm => `- ${pm}`)
        .join('\n')}\nChoose one (press enter for npm): `
    );

    if (packageManager === '') packageManager = 'npm';
    if (!packageManager || !supportedPMs.includes(packageManager)) {
      console.log('Invalid package manager');
    }
  }
  // let packageManager = process.argv[3] || 'yarn'
  // while (!['npm', 'yarn', 'pnpm', 'bun'].includes(packageManager)) {
  //   packageManager = await readlinePromise.question('Choose package manager (npm, yarn, pnpm, bun): ');
  //   if (!['npm', 'yarn', 'pnpm', 'bun'].includes(packageManager)) console.log('Invalid package manager');
  // }

  console.log('🚀  packageManager:', packageManager);
  console.log('🚀  projectName:', projectName);
};

// Prompt to choose project type. Default is node basic. Other choices: node advanced, express, express advanced.
// Based on project type we will copy the appropriate template from templates folder to the project folder and create the appropriate package.json file.
