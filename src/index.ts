#! /usr/bin/env tsx

import { runWithCommander } from '@runners/commander';
import { runWithInquirer } from '@runners/inquirer';
import { runWithNode } from '@runners/vanilla-node';
import { runner } from './config';
import { underline } from './utils';

/**
 * ??
 */
const run = async () => {
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
