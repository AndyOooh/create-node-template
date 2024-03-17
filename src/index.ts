#! /usr/bin/env tsx

import { runWithCommander } from './commander';
import { runner } from './config';
import { runWithInquirer } from './inquirer';
import { runWithNode } from './vanilla-node';
import { cyan, magenta, magentaBright, red, underline, yellow } from './vanilla-node/utils';

/**
 * ??
 */
const run = async () => {
  // console.log(`🧪 Running script with: ${underline(red(runner))}`);
  // console.log(`🧪 Running script with: ${cyan.bgMagenta.underline(runner)}`);
  console.log(`Running script with: ${underline.green(runner)}🧪`);
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
