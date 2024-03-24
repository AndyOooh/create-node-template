#! /usr/bin/env tsx

import { runner } from '@config/index.js';
import { runWithCommander } from '@runners/commander/index.js';
import { runWithInquirer } from '@runners/inquirer/index.js';
import { runWithNode } from '@runners/vanilla-node/index.js';
import { underline } from '@utils/index.js';

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
