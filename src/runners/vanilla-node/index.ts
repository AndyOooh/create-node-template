import * as path from 'path';
import * as fs from 'node:fs/promises';
import { getPackageManager, getProjectName, getTemplate } from './utils';

export const runWithNode = async () => {
  const __dirname = import.meta.dirname;
  const templatesPath = path.resolve(__dirname, '../../templates');
  const [arg1, arg2, arg3] = process.argv.slice(2);
  // const contents = await fs.readdir(templatesPath); // just testing

  /* Get inputs (if not set in args) */
  const projectName = await getProjectName(arg1);
  const packageManager = await getPackageManager(arg2);
  const template = await getTemplate(arg3);
  // TODO: Let user pick PM and template frpm numbers instead of typing it out.

  console.log('🚀  projectName:', projectName);
  console.log('🚀  packageManager:', packageManager);
  console.log('🚀  template:', template);
};

// Prompt to choose project type. Default is node basic. Other choices: node advanced, express, express advanced.
// Based on project type we will copy the appropriate template from templates folder to the project folder and create the appropriate package.json file.
