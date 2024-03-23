import express, { Application } from 'express';
import { apiRoutes } from '@routes/index';
import { resErrorHandler, logErrorHandler } from 'src/api/middlewares/errorHandler';

export const expressLoader = (app: Application) => {
  app.get('/status', (req, res) => {
    res.status(200).send('Server is running');
  });

  app.use(express.json());
  app.use('/', apiRoutes);
  app.use(resErrorHandler);
  app.use(logErrorHandler);
  app.use((req, res, next) => {
    const a = 22;
  });

  return app;
};
