import * as path from 'path';
import * as fs from 'node:fs/promises';
import { getPackageManager, getProjectName, getTemplate } from './utils';

export const runWithNode = async () => {
  const __dirname = import.meta.dirname;
  const templatesPath = path.resolve(__dirname, '../../templates');
  // const contents = await fs.readdir(templatesPath); // just testing

  /* Get inputs (if not set in args) */
  const projectName = await getProjectName(process.argv[2]);
  const packageManager = await getPackageManager(process.argv[3]);
  const template = await getTemplate(process.argv[4]);

  console.log('🚀  projectName:', projectName);
  console.log('🚀  packageManager:', packageManager);
  console.log('🚀  template:', template);
};

// Prompt to choose project type. Default is node basic. Other choices: node advanced, express, express advanced.
// Based on project type we will copy the appropriate template from templates folder to the project folder and create the appropriate package.json file.
