"use strict"

import { Router } from 'express';
import { register } from './../controllers/authControllers/registerController';

const authRouter = Router();

authRouter.post('/register', register);

export default authRouter;