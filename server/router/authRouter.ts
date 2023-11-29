"use strict"

import { Router } from 'express';
import { register } from './../controllers/authControllers/registerController';
import { login } from './../controllers/authControllers/loginController';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login)

export default authRouter;