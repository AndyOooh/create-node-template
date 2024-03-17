import * as util from 'util';
import * as readline from 'node:readline/promises';
import { exec } from 'node:child_process';

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
