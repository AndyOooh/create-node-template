import * as fs from 'node:fs/promises';

import { InitialReturnValue } from 'prompts';
import updateNotifier from 'update-notifier';

import packageJson from '../../../../package.json' with { type: 'json' }; // prettier cant handle this

export const onPromptState = (state: {
  value: InitialReturnValue;
  aborted: boolean;
  exited: boolean;
}) => {
  if (state.aborted) {
    // If we don't re-enable the terminal cursor before exiting
    // the program, the cursor will remain hidden
    process.stdout.write('\x1B[?25h');
    process.stdout.write('\n');
    process.exit(1);
  }
};

export const formatOptionDescription = (description: string): string => {
  return `

      ${description}
    `;
};

export const notifyUpdate = (): void => {
  try {
    updateNotifier({ pkg: packageJson }).notify(); // this shoud be enpugh in itself. check npm docs.

    process.exit();
  } catch (error) {
    const a = 22;
    // ignore error
  }
};




export async function isWriteable(directory: string): Promise<boolean> {
  try {
    await fs.access(directory, (fs.constants || fs).W_OK)
    return true
  } catch (err) {
    return false
  }
}
