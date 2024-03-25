<div align="center" class="banner">
  <img
    src="https://github.com/AndyOooh/create-node-template/assets/60953822/7d340216-a4a0-4aec-af00-d724e1e9c446"
    alt="React Hook Form Logo - React hook custom hook for form validation"
  />
</div>

## Table of Contents

- [Description](#description)
- [Prerequisites](#prerequisites)
- [How to use](#how-to-use)
- [Features](#features)
  - [Node Basic](#node-basic)
  - [Express Basic](#express-basic)
  - [Express Advanced](#express-advanced)
- [References](#references)
- [Notes](#notes)
  - [Logging](#logging)
  - [Monitoring (APM - app performance monitoring)](#monitoring-apm---app-performance-monitoring)

### Description

A CLI template generator for Node.js projects with **modern Typescript configuration**.

### Prerequisites

- Node.js v 16.7.0 or higher (required by experimental `fs.cp` in node-basic)

### How to use

```
npx create-node-template <project-name> --flags
```

1. Select name of project (if not using flag).
2. Select package manager (npm, yarn, pnpm, bun).
3. Select template (node-basic, express-basic, express-advanced).

## Features

### Node Basic

- Import path aliases.
- Eslint flat config file (needs VSCode setting).

### Express Basic

- all features of node-basic
- Express server setup

### Express Advanced

- all features of express-basic
- Express error handling
- Express logging
- Express monitoring

## References

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Express error-handling](https://expressjs.com/en/guide/error-handling.html)
- [ESLint](https://eslint.org/)
- [@typescript-eslint Rules](https://eslint.org/docs/rules/)
- Create Next App GH repo
- NPM docs

## Notes

- node-basic uses Experimental fs.cp.
- VSCode eslint setting for flat config file.

### Logging

- Morgan
- Winston

### Monitoring (APM - app performance monitoring)

- New Relic
- AppDynamics
- Dynatrace
- DataDog (recommended)
- Prometheus
