"use strict"

import { Router } from 'express';
import { register } from './../controllers/authControllers/registerController';
import { login } from './../controllers/authControllers/loginController';
import { changePassword } from './../controllers/authControllers/profileController';


const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.patch('/profile', changePassword);

export default authRouter;