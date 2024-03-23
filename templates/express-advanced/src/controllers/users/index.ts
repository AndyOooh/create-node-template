import { Request, RequestHandler, Response } from 'express';
import { fetchUsers } from '@services/user';
import { AsyncHandler } from 'src/api/middlewares/asyncHandler';

export const getUsers: AsyncHandler = async (_req: Request, res: Response): Promise<void> => {
  const users: unknown = await fetchUsers();
  if (!users) throw new Error('No users found.');
  res.status(200).send(users);
};
