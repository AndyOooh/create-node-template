import { Request, Response, NextFunction } from 'express';

type AppError = {
  status: number;
  message: string;
};

export const errorHandler = (err: AppError, req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err;
  return res.status(status).json({ message });
};
