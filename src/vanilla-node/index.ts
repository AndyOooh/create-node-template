import * as path from 'path';
// import * as util from 'util';
// import * as fs from 'fs';
// import { execSync } from 'child_process';

import { readlinePromise, runCmd } from './utils';

const templatesPath = path.join(__dirname, 'templates');

export const runWithNode = async () => {
  let projectName = process.argv[2];
  console.log('🚀  projectName:', projectName);
  if (!projectName) {
    projectName = await readlinePromise.question('Enter project name: ');
    console.log('🚀  projectName:', projectName);
    // prompt for project-name and save it to projectName
  }
  // If not promt for project-name
  // Prompt to choose package manager. Npm should be default. Other choices: yarn, pnpm, bun
  // Prompt to choose project type. Default is node basic. Other choices: node advanced, express, express advanced.
  // Based on project type we will copy the appropriate template from templates folder to the project folder and create the appropriate package.json file.
};
