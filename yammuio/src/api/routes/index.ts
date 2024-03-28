import express from 'express';
import { usersRoutes } from './user/index.js';

const router = express.Router();

// router.use('/', authRoutes); // login, logout, sign-up, etc.
router.use('/users', usersRoutes);
// router.use('/posts', postsRoutes);

// TODO: Other routes

export { router as apiRoutes };
