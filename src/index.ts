#! /usr/bin/env node
import inquirer from 'inquirer';
import { inpuQuestions } from './examples/input.js';
import { listInquiry } from './examples/list.js';
import { answer } from './examples/checkbox.js';

console.log('🤡🧪 Helloooo World!');

/**
 * Input prompt example
 */

// const questions = inpuQuestions
// const questions = listInquiry;
// inquirer.prompt(questions).then((answers: Record<string, any>) => {
//   console.log(JSON.stringify(answers, null, '  '));
// });



console.log('🤡🤡 Answer: ', answer);
