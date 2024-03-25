export const runner: 'node' | 'inquirer' | 'commander' = 'commander';

export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';
export type Template = 'node-basic' | 'node-advanced' | 'express-basic' | 'express-advanced';

export const supportedPMs: PackageManager[] = ['npm', 'yarn', 'pnpm', 'bun'];
export const supportedTemplates: Template[] = [
  'node-basic',
  // 'node-advanced',
  'express-basic',
  'express-advanced',
];
