"use strict"

import { Router } from 'express';
import { register } from './../controllers/authControllers/registerController';
import { login } from './../controllers/authControllers/loginController';
import { authMiddleware } from '../middlewares/authMiddleware'
import { userDetails } from '../controllers/authControllers/profileController';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/user', authMiddleware, userDetails);

export default authRouter;