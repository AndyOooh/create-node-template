import express from 'express';
import { getUsers } from '@controllers/users';
import { asyncHandler } from 'src/api/middlewares/asyncHandler';

const router = express.Router();

router.route('/').get(asyncHandler(getUsers));
// .post(usersValidator.register, createUser);

export { router as usersRoutes };
