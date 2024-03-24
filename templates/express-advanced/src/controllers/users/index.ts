import { Request, Response } from 'express';
import { fetchUsers } from '@services/user/index.js';
import { AsyncHandler } from 'src/api/middlewares/asyncHandler.js';

export const getUsers: AsyncHandler = async (_req: Request, res: Response): Promise<void> => {
  const users: unknown = await fetchUsers();
  if (!users) throw new Error('No users found.');
  res.status(200).send(users);
};
