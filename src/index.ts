#! /usr/bin/env tsx

import { runWithCommander } from '@runners/commander';
import { runWithInquirer } from '@runners/inquirer';
import { runWithNode } from '@runners/vanilla-node';
import { runner } from './config';
import { underline } from './utils';

/**
 * CLI entry point
 * runMode decides which implementation to run
 * Choices are: vanilla-node, inquirer, commander
 */
const run = async (runMode: string) => {
  try {
    console.log(`\nRunning script with: ${underline.green(runMode)}🧪...`);

    switch (runMode) {
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

void run(runner);
