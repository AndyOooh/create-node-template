import express, { Application } from 'express';
import { apiRoutes } from '@routes/index';

export const expressLoader = async (app: Application) => {
  app.get('/status', (req, res) => {
    res.status(200).send('Server is running');
  });

  app.use(express.json());
  app.use('/', apiRoutes);
  //   app.use(errorHandler);

  return app;
};
