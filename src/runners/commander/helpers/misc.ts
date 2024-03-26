import { InitialReturnValue } from 'prompts';
// import updateCheck from 'update-check';

import updateNotifier from 'update-notifier';

import packageJson from '../../../../package.json' with { type: 'json' }; // prettier cant handle this
// import { cyan, yellow, bold } from '@utils/index.js';

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

export const formatDesc = (description: string): string => {
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
