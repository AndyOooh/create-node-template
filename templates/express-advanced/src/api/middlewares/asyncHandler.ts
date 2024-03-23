import { Request, Response, NextFunction } from 'express';

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

/*
 * A wrapper for async functions to catch any errors
 * Use with route handlers
 */
export const asyncHandler =
  (fn: AsyncHandler) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

/*
 *
 */
// export const asyncHandler = (fn: AsyncHandler) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch(next);
//   };
// };
