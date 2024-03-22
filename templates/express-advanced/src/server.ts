import express, { Application } from 'express';
import { configVars } from './config';
import { initLoaders } from './loaders';

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
