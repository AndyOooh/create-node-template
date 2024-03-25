<div align="center" class="banner">
  <img
    src="https://github.com/AndyOooh/create-node-template/assets/60953822/7d340216-a4a0-4aec-af00-d724e1e9c446"
    alt="React Hook Form Logo - React hook custom hook for form validation"
  />
</div>

[![npm version](https://img.shields.io/npm/v/update-check.svg)](https://www.npmjs.com/package/create-node-template)
[![install size](https://packagephobia.now.sh/badge?p=update-check)](https://packagephobia.now.sh/result?p=create-node-template)

<!-- [![npm downloads](https://img.shields.io/npm/dm/react-hook-form.svg?style=for-the-badge)](https://www.npmjs.com/package/create-node-template)
[![npm](https://img.shields.io/npm/dt/react-hook-form.svg?style=for-the-badge)](https://www.npmjs.com/package/create-node-template)
[![npm](https://img.shields.io/npm/l/react-hook-form?style=for-the-badge)](https://github.com/AndyOooh/create-node-template/blob/master/LICENSE) -->

<!-- ### Description -->

A CLI template generator for Node.js projects with **modern Typescript configuration**.

### Table of Contents

- [Prerequisites](#prerequisites)
- [How to use](#how-to-use)
- [Features](#features)
  - [Node Basic](#node-basic)
  - [Express Basic](#express-basic)
  - [Express Advanced](#express-advanced)
- [References](#references)

### Prerequisites

- Node.js v 16.7.0 or higher (required by experimental `fs.cp` in node-basic).
- [tsx](https://www.npmjs.com/package/tsx) global install recommended.

### How to use

```
npx create-node-template <project-name> --flags
```

Arguments and [flags](#flags) are optional.

## Features

### Node Basic

- Import path aliases.
- Eslint flat config file (requires VSCode setting).

### Express Basic

- all features of node-basic
- Express server setup

### Express Advanced

- all features of express-basic
- Express error handling
- Express logging
- Express monitoring

### Flags

- -t, --template
- -pm. --package-manager

## References

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Express error-handling](https://expressjs.com/en/guide/error-handling.html)
- [ESLint](https://eslint.org/)
- [@typescript-eslint Rules](https://eslint.org/docs/rules/)
- Create Next App GH repo
- NPM docs
