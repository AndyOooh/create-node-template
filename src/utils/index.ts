import chalk from 'chalk';

export const {
  italic,
  bold,
  red,
  blue,
  cyan,
  green,
  yellow,
  bgRed,
  underline,
  magenta,
  magentaBright,
} = chalk;

/*
 * Type safe check of property existence on type unknown.
 */
// function hasProperty<T extends object>(
//   obj: unknown,
//   prop: string
// ): obj is T & Record<string, unknown> {
//   return typeof obj === 'object' && obj !== null && prop in obj;
// }

export const unknownHasProperty = <T extends object>(
  obj: unknown,
  prop: string
): obj is T & Record<string, unknown> => {
  return typeof obj === 'object' && obj !== null && prop in obj;
};

/* Not type safe */
// function hasProperty1(obj: unknown, prop: string): boolean {
//   return typeof obj === 'object' && obj !== null && prop in obj;
// }
