import express, { Application } from 'express';
import { configVars } from './config/index.js';
import { initLoaders } from './loaders/index.js';

const { port } = configVars;

const startServer = () => {
  try {
    const app: Application = express();
    initLoaders(app);

    app
      .listen(port, () => {
        console.log('Server listening on port: ', port);
      })
      .on('error', (error: Error) => {
        console.log('Error starting server: ', error.message);
      });
  } catch (error) {
    // TODO error-handling
    console.log('🚀  error:', error);
    throw error;
  }
};

startServer();
