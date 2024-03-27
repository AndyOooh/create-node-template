import Conf from 'conf';
import prompts from 'prompts';

import fs from 'fs';
import path from 'path';

// import { cyan, green, red, yellow, bold, blue } from 'picocolors';
import { cyan, green, red, bold, unknownHasProperty } from '@utils/index.js';
import { getPkgManager } from './helpers/get-pkg-manager.js';
import { isFolderEmpty } from './helpers/is-folder-empty.js';
import { validateNpmName } from './helpers/validate-pkg.js';
import { program } from './program.js';
import { notifyUpdate, onPromptState } from './helpers/misc.js';

const optionsS = program.opts();
// const packageManager = 'npm';
const packageManager = optionsS.useNpm
  ? 'npm'
  : optionsS.usePnpm
  ? 'pnpm'
  : optionsS.useYarn
  ? 'yarn'
  : optionsS.useBun
  ? 'bun'
  : getPkgManager();

let projectPath = '';

export const runWithCommander = async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  /* negate the above */
  const conf = new Conf({ projectName: 'create-node-template' });

  // if (optionsS.resetPreferences) {
  //   conf.clear();
  //   console.log(`Preferences reset successfully`);
  //   return;
  // }

  if (typeof projectPath === 'string') {
    projectPath = projectPath.trim();
  }

  if (!projectPath) {
    const res = await prompts({
      onState: onPromptState,
      type: 'text',
      name: 'path',
      message: 'What is your project named?',
      initial: 'my-app',
      validate: (name: string) => {
        const validation = validateNpmName(path.basename(path.resolve(name)));
        if (validation.valid) {
          return true;
        }
        return 'Invalid project name: ' + validation.problems[0];
      },
    });

    if (typeof res.path === 'string') {
      projectPath = res.path.trim();
    }
  }

  if (!projectPath) {
    console.log(
      '\nPlease specify the project directory:\n' +
        `  ${cyan(program.name())} ${green('<project-directory>')}\n` +
        'For example:\n' +
        `  ${cyan(program.name())} ${green('my-next-app')}\n\n` +
        `Run ${cyan(`${program.name()} --help`)} to see all options.`
    );
    process.exit(1);
  }

  const resolvedProjectPath = path.resolve(projectPath);
  const projectName = path.basename(resolvedProjectPath);

  const validation = validateNpmName(projectName);
  if (!validation.valid) {
    console.error(
      `Could not create a project called ${red(
        `"${projectName}"`
      )} because of npm naming restrictions:`
    );

    validation.problems.forEach(p => console.error(`    ${red(bold('*'))} ${p}`));
    process.exit(1);
  }

  // if (program.example === true) {
  //   console.error('Please provide a template name, otherwise remove the template option.');
  //   process.exit(1);
  // }
  // if (program.example === true) {
  //   console.error(
  //     'Please provide an example name or url, otherwise remove the example option.'
  //   )
  //   process.exit(1)
  // }

  /**
   * Verify the project dir is empty or doesn't exist
   */
  const root = path.resolve(resolvedProjectPath);
  const appName = path.basename(root);
  const folderExists = fs.existsSync(root);

  if (folderExists && !isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  const template = typeof optionsS.template === 'string' && optionsS.template.trim();
  const preferences = (conf.get('preferences') || {}) as Record<string, boolean | string>;
  /**
   * If the user does not provide the necessary flags, prompt them for whether
   * to use TS or JS.
   */
  if (!template) {
    const defaults: typeof preferences = {
      typescript: true,
      eslint: true,
      tailwind: true,
      app: true,
      srcDir: false,
      importAlias: '@/*',
      customizeImportAlias: false,
    };
    const getPrefOrDefault = (field: string) => preferences[field] ?? defaults[field];

    // if (!program.typescript && !program.javascript) {
    //   if (ciInfo.isCI) {
    //     // default to TypeScript in CI as we can't prompt to
    //     // prevent breaking setup flows
    //     program.typescript = getPrefOrDefault('typescript');
    //   } else {
    //     const styledTypeScript = blue('TypeScript');
    //     const { typescript } = await prompts(
    //       {
    //         type: 'toggle',
    //         name: 'typescript',
    //         message: `Would you like to use ${styledTypeScript}?`,
    //         initial: getPrefOrDefault('typescript'),
    //         active: 'Yes',
    //         inactive: 'No',
    //       },
    //       {
    //         /**
    //          * User inputs Ctrl+C or Ctrl+D to exit the prompt. We should close the
    //          * process and not write to the file system.
    //          */
    //         onCancel: () => {
    //           console.error('Exiting.');
    //           process.exit(1);
    //         },
    //       }
    //     );
    //     /**
    //      * Depending on the prompt response, set the appropriate program flags.
    //      */
    //     program.typescript = Boolean(typescript);
    //     program.javascript = !Boolean(typescript);
    //     preferences.typescript = Boolean(typescript);
    //   }
    // }

    // if (!process.argv.includes('--eslint') && !process.argv.includes('--no-eslint')) {
    //   if (ciInfo.isCI) {
    //     program.eslint = getPrefOrDefault('eslint');
    //   } else {
    //     const styledEslint = blue('ESLint');
    //     const { eslint } = await prompts({
    //       onState: onPromptState,
    //       type: 'toggle',
    //       name: 'eslint',
    //       message: `Would you like to use ${styledEslint}?`,
    //       initial: getPrefOrDefault('eslint'),
    //       active: 'Yes',
    //       inactive: 'No',
    //     });
    //     program.eslint = Boolean(eslint);
    //     preferences.eslint = Boolean(eslint);
    //   }
    // }

    // if (!process.argv.includes('--tailwind') && !process.argv.includes('--no-tailwind')) {
    //   if (ciInfo.isCI) {
    //     program.tailwind = getPrefOrDefault('tailwind');
    //   } else {
    //     const tw = blue('Tailwind CSS');
    //     const { tailwind } = await prompts({
    //       onState: onPromptState,
    //       type: 'toggle',
    //       name: 'tailwind',
    //       message: `Would you like to use ${tw}?`,
    //       initial: getPrefOrDefault('tailwind'),
    //       active: 'Yes',
    //       inactive: 'No',
    //     });
    //     program.tailwind = Boolean(tailwind);
    //     preferences.tailwind = Boolean(tailwind);
    //   }
    // }

    // if (!process.argv.includes('--src-dir') && !process.argv.includes('--no-src-dir')) {
    //   if (ciInfo.isCI) {
    //     program.srcDir = getPrefOrDefault('srcDir');
    //   } else {
    //     const styledSrcDir = blue('`src/` directory');
    //     const { srcDir } = await prompts({
    //       onState: onPromptState,
    //       type: 'toggle',
    //       name: 'srcDir',
    //       message: `Would you like to use ${styledSrcDir}?`,
    //       initial: getPrefOrDefault('srcDir'),
    //       active: 'Yes',
    //       inactive: 'No',
    //     });
    //     program.srcDir = Boolean(srcDir);
    //     preferences.srcDir = Boolean(srcDir);
    //   }
    // }

    // if (!process.argv.includes('--app') && !process.argv.includes('--no-app')) {
    //   if (ciInfo.isCI) {
    //     program.app = getPrefOrDefault('app');
    //   } else {
    //     const styledAppDir = blue('App Router');
    //     const { appRouter } = await prompts({
    //       onState: onPromptState,
    //       type: 'toggle',
    //       name: 'appRouter',
    //       message: `Would you like to use ${styledAppDir}? (recommended)`,
    //       initial: getPrefOrDefault('app'),
    //       active: 'Yes',
    //       inactive: 'No',
    //     });
    //     program.app = Boolean(appRouter);
    //   }
    // }

    // if (typeof program.importAlias !== 'string' || !program.importAlias.length) {
    //   if (ciInfo.isCI) {
    //     // We don't use preferences here because the default value is @/* regardless of existing preferences
    //     program.importAlias = defaults.importAlias;
    //   } else if (process.argv.includes('--no-import-alias')) {
    //     program.importAlias = defaults.importAlias;
    //   } else {
    //     const styledImportAlias = blue('import alias');

    //     const { customizeImportAlias } = await prompts({
    //       onState: onPromptState,
    //       type: 'toggle',
    //       name: 'customizeImportAlias',
    //       message: `Would you like to customize the default ${styledImportAlias} (${defaults.importAlias})?`,
    //       initial: getPrefOrDefault('customizeImportAlias'),
    //       active: 'Yes',
    //       inactive: 'No',
    //     });

    //     if (!customizeImportAlias) {
    //       // We don't use preferences here because the default value is @/* regardless of existing preferences
    //       program.importAlias = defaults.importAlias;
    //     } else {
    //       const { importAlias } = await prompts({
    //         onState: onPromptState,
    //         type: 'text',
    //         name: 'importAlias',
    //         message: `What ${styledImportAlias} would you like configured?`,
    //         initial: getPrefOrDefault('importAlias'),
    //         validate: value =>
    //           /.+\/\*/.test(value) ? true : 'Import alias must follow the pattern <prefix>/*',
    //       });
    //       program.importAlias = importAlias;
    //       preferences.importAlias = importAlias;
    //     }
    //   }
    // }
  }

  // try {
  //   await createApp({
  //     appPath: resolvedProjectPath,
  //     packageManager,
  //     // example: example && example !== 'default' ? example : undefined,
  //     // examplePath: program.examplePath,
  //     typescript: program.typescript,
  //     tailwind: program.tailwind,
  //     eslint: program.eslint,
  //     appRouter: program.app,
  //     srcDir: program.srcDir,
  //     importAlias: program.importAlias,
  //   });
  // } catch (reason) {
  //   if (!(reason instanceof DownloadError)) {
  //     throw reason;
  //   }

  //   const res = await prompts({
  //     onState: onPromptState,
  //     type: 'confirm',
  //     name: 'builtin',
  //     message:
  //       `Could not download "${example}" because of a connectivity issue between your machine and GitHub.\n` +
  //       `Do you want to use the default template instead?`,
  //     initial: true,
  //   });
  //   if (!res.builtin) {
  //     throw reason;
  //   }

  //   await createApp({
  //     appPath: resolvedProjectPath,
  //     packageManager,
  //     typescript: program.typescript,
  //     eslint: program.eslint,
  //     tailwind: program.tailwind,
  //     appRouter: program.app,
  //     srcDir: program.srcDir,
  //     importAlias: program.importAlias,
  //   });
  // }
  conf.set('preferences', preferences);

  try {
    // await notifyUpdate(packageManager);
    notifyUpdate();
  } catch (error) {
    console.log();
    console.log('Aborting installation.');

    if (unknownHasProperty(error, 'command')) {
      console.log(`  ${cyan(error.command)} has failed.`);
    } else {
      console.log(red('Unexpected error. Please report it as a bug:') + '\n', error);
    }
    console.log();

    // await notifyUpdate(packageManager);
    notifyUpdate();

    process.exit(1);
  }
};
