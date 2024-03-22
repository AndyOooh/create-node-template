// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

/* NB: "eslint.experimental.useFlatConfig": true, is required in VSCode for tseslint.config*/

export default tseslint.config(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  eslint.configs.recommended,
  // ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  // ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  /* This block is required for type checked */
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // ignores: ['node_modules', 'dist', 'templates'],
    ignores: ['node_modules', 'dist', 'templates/node-basic', 'templates/express-basic'],
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-useless-catch': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    },
  }
);
