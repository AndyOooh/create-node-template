import { Command } from 'commander';

// import { cyan, green, red, yellow, bold, blue } from 'picocolors';
import { green } from '@utils/index.js';
import packageJson from '../../../package.json' with { type: 'json' };
import { formatDesc } from './helpers/misc.js';

// import { createApp, DownloadError } from './create-app';
// import ciInfo from 'ci-info';

let projectPath = '';

export const program = new Command(packageJson.name)
  .version(packageJson.version)
  .arguments('[project-directory]')
  .usage(`${green('<project-directory>')} [options]`)
  .action((name: string) => {
    projectPath = name;
  })
  .option('--eslint', formatDesc('Initialize with eslint config.'))
  .option(
    '--import-alias <alias-to-configure>',
    formatDesc('Specify import alias to use (default "@/*").')
  )
  .option('--use-npm', formatDesc('Explicitly tell the CLI to bootstrap the application using npm'))
  .option(
    '--use-pnpm',
    formatDesc('Explicitly tell the CLI to bootstrap the application using pnpm')
  )
  .option(
    '--use-yarn',
    formatDesc('Explicitly tell the CLI to bootstrap the application using Yarn')
  )
  .option('--use-bun', formatDesc('Explicitly tell the CLI to bootstrap the application using Bun'))
  .option(
    '-t, --template [name]',
    formatDesc(
      'Which template to bootstrap the app with. You can use any of:\n' +
        '  - node-basic: A basic Node.js app.\n' +
        '  - express-basic: A basic Express.js app.\n' +
        '  - express-advanced: An advanced Express.js app with ready for production.'
    )
  )
  .option(
    '--reset-preferences',
    formatDesc('Explicitly tell the CLI to reset any stored preferences')
  )
  .allowUnknownOption()
  .parse(process.argv);
