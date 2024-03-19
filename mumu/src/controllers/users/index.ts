import { Request, Response } from 'express';
import { fetchUsers } from '@services/user';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await fetchUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send;
  }
};
