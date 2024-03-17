#! /usr/bin/env node
import inquirer from 'inquirer';
import { inpuQuestions } from './inquirer/examples/input.js';
import { listInquiry } from './inquirer/examples/list.js';
import { packageManagers } from './inquirer/examples/checkbox.js';
import { runner } from './config/index.js';
import { runWithCommander } from './commander/intex.js';
import { runWithInquirer } from './inquirer/index.js';
import { runWithNode } from './vanilla-node/inde.js';

console.log('🤡🧪 Helloooo World!');

/**
 * Input prompt example
 */
const run = async () => {
  // Select package manager
  // Select name of project
  // Start node project with -y command using the chosen package manager

  // const questions = inpuQuestions
  
  // inquirer.prompt(questions).then((answers: Record<string, any>) => {
  //   console.log(JSON.stringify(answers, null, '  '));
  // });

  // const packManagers = packageManagers;
  // console.log('🚀  packManagers:', packManagers);

  switch (runner) {
    case 'inquirer':
      runWithInquirer();
      break;
    case 'commander':
      runWithCommander();
      break;
    default:
      runWithNode();
  }
};

run();
