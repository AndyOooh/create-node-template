import { ErrorRequestHandler } from 'express';

type AppError = {
  status: number;
  message: string;
  shouldLog: boolean;
  details?: string; // Optional, could have call stack or other details.
};

export const resErrorHandler: ErrorRequestHandler = (err: AppError, _req, res, next) => {
  const { status, message, shouldLog } = err;
  /* Send the response to the client */
  res.status(status || 500).json({ message });
  /* If shouldLog is true, call the next error handler */
  if (shouldLog) {
    next(err);
  }
};

export const logErrorHandler: ErrorRequestHandler = (err: AppError, _req, _res, _next) => {
  const { status, message } = err;
  /* Log error to file, slack or some monitoring tool */
  console.log(status, message);
  return;
};