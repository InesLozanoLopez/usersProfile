"use strict"

import { Router } from 'express';
import { userProfile } from './../controllers/usersControllers/userProfile';
import { editProfile } from './../controllers/usersControllers/userProfile';

import multer from 'multer';

import {authMiddleware} from '../middlewares/authMiddleware';
const upload = multer();


const userProfileRouter = Router();

userProfileRouter.post('/profile', upload.single('file'), editProfile);
userProfileRouter.get('/profile', authMiddleware, userProfile);
// authRouter.post('/profile', editProfile);

export default userProfileRouter;