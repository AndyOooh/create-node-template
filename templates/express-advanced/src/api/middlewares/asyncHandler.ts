import { Request, Response, NextFunction, RequestHandler } from 'express';

export type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
// export type AsyncHandler = (req: Request, res: Response, next: NextFunction) => void;

/*
 * A wrapper for async functions to catch any errors
 * Use with route handlers
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
 *
 */
export const asyncHandler = (fn: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// export const asyncHandler = (fn: AsyncHandler) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch(reason => {
//       const a = 1;
//       next(reason);
//     });
//     Promise.reject(fn(req, res, next)).catch(reason => {
//       const a = 1;
//       next(reason);
//     });
//   };
// };
