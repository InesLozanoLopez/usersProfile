'use strict';

import { Router } from 'express';
import { userProfile } from './../controllers/usersControllers/userProfile';
import { editProfile } from './../controllers/usersControllers/userProfile';

import { authMiddleware } from '../middlewares/authMiddleware';

const userProfileRouter = Router();

userProfileRouter.patch('/profile', editProfile);
userProfileRouter.get('/profile', authMiddleware, userProfile);
// authRouter.post('/profile', editProfile);

export default userProfileRouter;
