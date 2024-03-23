import { Request, Response, NextFunction, RequestHandler } from 'express';

export type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

/*
 * A wrapper for async functions to catch any errors
 * Use with route handlers
 * Issue with async/await: Express expects route handler to return a void, this return Promise<void>.
 * Only an issue bc eslint rule no-misused-promises.
 */

// export const asyncHandler =
//   (fn: AsyncHandler) => async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await fn(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   };

/*
 * Does the same as the above function but returns void instead of Promise<void>.
 */
export const asyncHandler = (fn: AsyncHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
