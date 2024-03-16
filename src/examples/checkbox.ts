import checkbox, { Separator } from '@inquirer/checkbox';

export const packageManagers = checkbox({
  message: 'Select a package manager',
  choices: [
    { name: 'npm', value: 'npm' },
    { name: 'yarn', value: 'yarn' },
    { name: 'bun', value: 'bun', checked: true },
    { name: 'pnpm', value: 'pnpm', checked: true },
    new Separator(),
    { name: 'pnpm', value: 'pnpm', disabled: true },
    {
      name: 'pnpm',
      value: 'pnpm',
      disabled: '(pnpm is not available)',
    },
  ],
});
