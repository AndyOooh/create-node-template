import { Command } from 'commander';

// import { cyan, green, red, yellow, bold, blue } from 'picocolors';
import { green } from '@utils/index.js';
import packageJson from '../../../package.json' with { type: 'json' };
import { formatDesc } from './helpers/misc.js';
import { validateNpmName } from './helpers/validate-pkg.js';

// import { createApp, DownloadError } from './create-app';
// import ciInfo from 'ci-info';

export const program = new Command(packageJson.name)
  .version(packageJson.version)
  .arguments('[project-directory]') // [] means optional, <> means required
  .usage(`${green('<project-directory>')} [options]`)
  .action((name: string) => {
    const nameTrimmed = name?.trim();
    if (nameTrimmed) {
      const npmNameValidationRes = validateNpmName(nameTrimmed);
      if (!npmNameValidationRes.valid) {
        console.error('Invalid project name. Issue(s): ');
        npmNameValidationRes.problems.forEach((p) => console.error(`- ${p}\n`));
        process.exit(1);
      }
    }

    console.log('🚀  name:', name);
  })
  // .option('--eslint', formatDesc('Initialize with eslint config.'))
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
    '-pm, --package-manager [name]',
    formatDesc(
      'Which package manager to use. You can select any of:\n' +
      '  - npm.\n' +
      '  - yarn.\n' +
      '  - pnpm.\n' +
      '  - bun.'
    )
  )
  .option(
    '--import-alias <alias-to-configure>',
    formatDesc('Specify import alias to use (default "@/*").')
  )
  .option(
    '--reset-preferences',
    formatDesc('Explicitly tell the CLI to reset any stored preferences')
  )
  .allowUnknownOption()
  .parse(process.argv);
