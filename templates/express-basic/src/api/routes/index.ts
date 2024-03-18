import express from 'express';
import { usersRoutes } from './user';

const router = express.Router();

// router.use('/', authRoutes);
router.use('/users', usersRoutes);
// router.use('/posts', postsRoutes);

export { router as apiRoutes };
