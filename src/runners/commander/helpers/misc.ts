import { InitialReturnValue } from 'prompts';
import checkForUpdate from 'update-check';
// import updateCheck from 'update-check';

// import updateNotifier22 from 'simple-update-notifier';
import updateNotifier1, { NotifyOptions, UpdateNotifier } from 'update-notifier';



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

// export const notifyUpdate = async (packageManager: string): Promise<void> => {

export const notifyUpdate = (packageManager: string): void => {
  try {
    // const update = checkForUpdate.default(packageJson).catch(() => null);
    // const update = await checkForUpdate(packageJson)
    // const res = await update;

    // const res = await checkForUpdate.default(packageJson);
    // const res = await updateCheck.default(packageJson);

    // const res = await updateNotifier({ pkg: packageJson });

    // const res = updateNotifie22({pkg: packageJson}).notify();
    // const res = await updateNotifier22.default({pkg: packageJson})

    // const res = await updateNotifier22.default({pkg: packageJson})

    updateNotifier1({ pkg: packageJson }).notify(); // this shoud be enopugh in itself. check npm docs.

    
    // const notifier: UpdateNotifier = updateNotifier1({ pkg: packageJson });
    // const message: NotifyOptions  = {
    //   message: 'You have a new version of create-next-app available!',
    //   defer: false,
    
    // }
    // notifier.notify(message);
    // const b = 22




    // if (res?.latest) {
    //   const updateMessage =
    //     packageManager === 'yarn'
    //       ? 'yarn global add create-next-app'
    //       : packageManager === 'pnpm'
    //       ? 'pnpm add -g create-next-app'
    //       : packageManager === 'bun'
    //       ? 'bun add -g create-next-app'
    //       : 'npm i -g create-next-app';

    //   console.log(
    //     yellow(bold('A new version of `create-next-app` is available!')) +
    //       '\n' +
    //       'You can update by running: ' +
    //       cyan(updateMessage) +
    //       '\n'
    //   );
    // }

    process.exit();
  } catch (error) {
    const a = 22
    // ignore error
  }
};