import inquirer from 'inquirer';
import { listInquiry } from './examples/list';

export const runWithInquirer = async () => {
  // Select package manager
  // Select name of project
  // Start node project with -y command using the chosen package manager

  // const questions = inpuQuestions

  // inquirer.prompt(questions).then((answers: Record<string, any>) => {
  //   console.log(JSON.stringify(answers, null, '  '));
  // });

  // const packManagers = packageManagers;
  // console.log('🚀  packManagers:', packManagers);
  const questions = listInquiry;
  const answers: Record<string, any> = await inquirer.prompt(questions);
  console.log(JSON.stringify(answers, null, '  '));
};
