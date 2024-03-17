#! /usr/bin/env node
import { runner } from './config/index.js';
import { runWithCommander } from './commander/intex.js';
import { runWithInquirer } from './inquirer/index.js';
import { runWithNode } from './vanilla-node/inde.js';

console.log('🤡🧪 Helloooo World!');

/**
 * ??
 */
const run = async () => {
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
