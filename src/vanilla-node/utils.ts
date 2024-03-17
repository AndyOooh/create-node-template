import * as util from 'util';
import * as readline from 'node:readline/promises';
import { exec } from 'node:child_process';
import chalk from 'chalk';

export const { red, blue, cyan, green, yellow, bgRed, underline, magenta, magentaBright } = chalk;

/*
 * Execute command asynchronusly
 */
const execPromise = util.promisify(exec);
export const runCmd = async (command: string): Promise<void> => {
  try {
    const { stdout, stderr } = await execPromise(command);
    console.log(stdout);
    console.log(stderr);
  } catch (error) {
    console.log(error);
  }
};

export const readlinePromise = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function findPackageManagers(): Promise<string[]> {
  const packageManagers: string[] = [];
  const commands = ['yarn --version', 'pnpm --version', 'bun --version'];

  await Promise.all(
    commands.map(async command => {
      try {
        await execPromise(command);
        packageManagers.push(command.split(' ')[0]);
      } catch {}
    })
  );

  return packageManagers;
}
