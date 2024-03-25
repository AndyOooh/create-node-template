/*
 * Type safe check of property existence on type unknown.
 */
export const unknownHasProperty = <T extends object>(
    obj: unknown,
    prop: string
  ): obj is T & Record<string, unknown> => {
    return typeof obj === 'object' && obj !== null && prop in obj;
  };
  