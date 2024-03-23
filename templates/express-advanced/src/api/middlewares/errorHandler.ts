import { ErrorRequestHandler } from 'express';

type AppError = {
  status: number;
  message: string;
  shouldLog: boolean;
  details?: string; // Optional, could have call stack or other details.
  type? : string; // Optional, could be used to categorize errors
  isOperational?: boolean; // Optional, could be used to determine if error is operational or not
};

/*
 * Sends client reponse for all errors
 * If shouldLog is true, calls next error handler to log the error
 */
export const resErrorHandler: ErrorRequestHandler = (err: AppError, _req, res, next) => {
  // type, details might be useful
  const { status, message, shouldLog } = err;
  res.status(status || 500).json({ message });
  if (shouldLog) {
    next(err);
  }
};

export const logErrorHandler: ErrorRequestHandler = (err: AppError, _req, _res, _next) => {
  const { status, message } = err;
  /* TODO: Log error to file, slack or some monitoring tool */
  console.log(status, message);
  return;
};
