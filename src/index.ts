#! /usr/bin/env node
import inquirer from 'inquirer';
import { inpuQuestions } from './examples/input.js';
import { listInquiry } from './examples/list.js';
import checkbox, { Separator } from '@inquirer/checkbox';

console.log('🤡🧪 Helloooo World!');

/**
 * Input prompt example
 */

// const questions = inpuQuestions
// const questions = listInquiry;
// inquirer.prompt(questions).then((answers: Record<string, any>) => {
//   console.log(JSON.stringify(answers, null, '  '));
// });

const answer = checkbox({
  message: 'Select a package manager',
  choices: [
    { name: 'npm', value: 'npm' },
    { name: 'yarn', value: 'yarn' },
    { name: 'bun', value: 'bun', checked: true },
    { name: 'pnpm', value: 'pnpm', checked: true },
    new Separator(),
    { name: 'pnpm', value: 'pnpm', disabled: true },
    {
      name: 'pnpm',
      value: 'pnpm',
      disabled: '(pnpm is not available)',
    },
  ],
});

console.log('🤡🤡 Answer: ', answer);
