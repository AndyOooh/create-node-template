import express from 'express';
import { getUsers } from '@controllers/users';
import { asyncHandler } from 'src/api/middlewares/asyncHandler';

const router = express.Router();

router.route('/').get(asyncHandler(getUsers));
// router.route('/').get(getUsers);
// router.route('/').get(async () => 22);
// .post(usersValidator.register, createUser);

export { router as usersRoutes };
