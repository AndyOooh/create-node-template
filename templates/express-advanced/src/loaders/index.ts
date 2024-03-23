import { Application } from 'express';
import { expressLoader } from './express';

export const initLoaders = (app: Application) => {
  expressLoader(app);
  console.log('Express Intialized');

  // ... Add more loaders, e.g. agenda, Redis, Mongoose, etc.
};
