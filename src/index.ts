#! /usr/bin/env node

import { runWithCommander } from './commander';
import { runner } from './config';
import { runWithInquirer } from './inquirer';
import { runWithNode } from './vanilla-node';

/**
 * ??
 */
const run = async () => {
  console.log(`🧪 Running script with: ${runner}`);
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
