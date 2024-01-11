"use strict"
import { Request, Response, Router } from 'express';
import authRouter  from "./router/authRouter";
import userProfileRouter  from "./router/userProfileRouter";


const router = Router();

router.use('/authRouter', authRouter);
router.use('/user', userProfileRouter);

router.use('*', (req: Request, res: Response) => {
    res.status(404);
    res.send("Not found");
})


export default router;