import express, { Application } from 'express';
import { apiRoutes } from '@routes/index.js';
import { resErrorHandler, logErrorHandler } from 'src/api/middlewares/errorHandler.js';

export const expressLoader = (app: Application) => {
  app.get('/status', (req, res) => {
    res.status(200).send('Server is running');
  });

  app.use(express.json());
  app.use('/', apiRoutes);
  app.use(resErrorHandler);
  app.use(logErrorHandler);
  app.use((_req, _res, _next) => {
    const _a = 22;
  });

  return app;
};
