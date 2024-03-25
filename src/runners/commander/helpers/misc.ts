import { InitialReturnValue } from 'prompts';
import checkForUpdate from 'update-check';

import packageJson from '../../../../package.json' with { type: 'json' };
import { cyan, yellow, bold } from '@utils/index.js';

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

export const notifyUpdate = async (packageManager: string): Promise<void> => {
  try {
    const update = checkForUpdate.default(packageJson).catch(() => null);
    const res = await update;
    if (res?.latest) {
      const updateMessage =
        packageManager === 'yarn'
          ? 'yarn global add create-next-app'
          : packageManager === 'pnpm'
          ? 'pnpm add -g create-next-app'
          : packageManager === 'bun'
          ? 'bun add -g create-next-app'
          : 'npm i -g create-next-app';

      console.log(
        yellow(bold('A new version of `create-next-app` is available!')) +
          '\n' +
          'You can update by running: ' +
          cyan(updateMessage) +
          '\n'
      );
    }
    process.exit();
  } catch {
    // ignore error
  }
};
