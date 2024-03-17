import * as util from 'util';

/*
 * Execute command asynchronusly
 */
const exec = util.promisify(require('child_process').exec);
export const runCmd = async (command: string): Promise<void> => {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log(stderr);
  } catch (error) {
    console.log(error);
  }
};
