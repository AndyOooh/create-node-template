import express from 'express';
import { getUsers } from '@controllers/users';

const router = express.Router();

router.route('/').get(getUsers);
// .post(usersValidator.register, createUser);

export { router as usersRoutes };
