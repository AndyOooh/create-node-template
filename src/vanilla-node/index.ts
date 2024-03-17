import * as util from 'util';
import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';

export const runWithNode = async () => {
    // check if project-name is provided
    // If not promt for project-name
    // Prompt to choose package manager. Npm should be default. Otehr choices: yarn, pnpm, bun
    // Prompt to choose project type. Default is node basic. Other choices: node advanced, express, express advanced.
    // Based on project type we will copy the appropriate template from templates folder to the project folder and create the appropriate package.json file. 



  if (process.argv.length < 3) {
    // prompt for project-name
    console.log('Please provide a project name');
    return;
  }
};
