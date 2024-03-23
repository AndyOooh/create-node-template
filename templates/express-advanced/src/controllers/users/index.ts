import { Request, Response } from 'express';
import { fetchUsers } from '@services/user';

export const getUsers = async (_req: Request, res: Response) => {
  const users: unknown = await fetchUsers();
  if (!users) throw new Error('No users found.');
  res.status(200).send(users);
};
