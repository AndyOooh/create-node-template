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
  try {
    console.log(`Running script with: ${underline.green(runner)}🧪`);
    
    switch (runner) {
      case 'inquirer':
        await runWithInquirer();
        break;
      case 'commander':
        await runWithCommander();
        break;
      default:
        await runWithNode();
    }
    process.exit(0);
  } catch (error) {
    console.error('Something went wrong:', error);
    process.exit(1);
  }
};

run();
