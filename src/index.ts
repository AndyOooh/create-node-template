#! /usr/bin/env node
import inquirer from 'inquirer';
import { inpuQuestions } from './examples/input.js';
import { listInquiry } from './examples/list.js';
import { packageManagers } from './examples/checkbox.js';

console.log('🤡🧪 Helloooo World!');

/**
 * Input prompt example
 */
const main = async () => {
  // Select package manager
  // Select name of project
  // Start node project with -y command using the chosen package manager

  // const questions = inpuQuestions
  const questions = listInquiry;
  const answers: Record<string, any> = await inquirer.prompt(questions);
  console.log(JSON.stringify(answers, null, '  '));
  // inquirer.prompt(questions).then((answers: Record<string, any>) => {
  //   console.log(JSON.stringify(answers, null, '  '));
  // });

  // const packManagers = packageManagers;
  // console.log('🚀  packManagers:', packManagers);
};

main();
