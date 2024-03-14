#! /usr/bin/env node
import inquirer from 'inquirer';
import { inpuQuestions } from './input.js';

console.log('🤡🧪 Helloooo World!');

/**
 * Input prompt example
 */
inquirer.prompt(inpuQuestions).then((answers: Record<string, any>) => {
  console.log(JSON.stringify(answers, null, '  '));
});
