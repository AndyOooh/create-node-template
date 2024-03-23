# Create-node-template

## Description

This project is a template for creating a new node project. It is a CLI tool that will create a new project with the following features:

## Table of Contents

## Prerequisites

- Node.js v 16.7.0 or higher (required by experimental ``fs.cp`` in node-basic)

## How to use

```
npx create-node-template <project-name> --flags
```

1. Select name of project (if not using flag).
2. Select package manager (npm, yarn, pnpm, bun).
3. Select template (node-basic, express-basic, express-advanced).

## References

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Express error-handling](https://expressjs.com/en/guide/error-handling.html)
- [ESLint](https://eslint.org/)
- [@typescript-eslint Rules](https://eslint.org/docs/rules/)
- Create Next App GH repo
- NPM docs

### Logging

- Morgan
- Winston

### Monitoring (APM - app performance monitoring)

- New Relic
- AppDynamics
- Dynatrace
- DataDog (recommended)
- Prometheus

## Notes

- node-basic uses Experimental fs.cp.
- VSCode eslint setting for flat config file.
