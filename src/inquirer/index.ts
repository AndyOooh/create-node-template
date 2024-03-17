import inquirer from 'inquirer';
import { listInquiry } from './examples/list';

export const runWithInquirer = async () => {
  const questions = listInquiry;
  const answers: Record<string, any> = await inquirer.prompt(questions);
  console.log(JSON.stringify(answers, null, '  '));
};
